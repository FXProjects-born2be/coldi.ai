import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const HUBSPOT_API_TOKEN = process.env.HUBSPOT_API_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Toggle to enable/disable HubSpot check. Set to false to skip HubSpot verification and send directly to Telegram
const ENABLE_HUBSPOT_CHECK = false;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Check required environment variables
    if (ENABLE_HUBSPOT_CHECK && !HUBSPOT_API_TOKEN) {
      console.error('HUBSPOT_API_TOKEN is required when HubSpot check is enabled');
      return NextResponse.json(
        { status: 'error', message: 'Configuration error: HUBSPOT_API_TOKEN missing' },
        { status: 500 }
      );
    }
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Required environment variables are not configured');
      return NextResponse.json(
        { status: 'error', message: 'Configuration error' },
        { status: 500 }
      );
    }

    // Get all unprocessed notifications that are ready to be processed (process_at <= now)
    const now = new Date().toISOString();
    const { data: notifications, error: fetchError } = await supabase
      .from('hubspot_notifications')
      .select('*')
      .eq('processed', false)
      .lte('process_at', now);

    if (fetchError) {
      console.error('Error fetching notifications:', fetchError);
      return NextResponse.json({ status: 'error', message: fetchError.message }, { status: 500 });
    }

    if (!notifications || notifications.length === 0) {
      return NextResponse.json({ status: 'success', processed: 0 });
    }

    let processedCount = 0;
    let errorCount = 0;

    // Process each notification
    for (const notification of notifications) {
      console.log('Processing notification:', notification);
      try {
        // HubSpot check (can be disabled by setting ENABLE_HUBSPOT_CHECK to false)
        if (ENABLE_HUBSPOT_CHECK) {
          // Format email for URL: encodeURIComponent properly encodes @ as %40
          const encodedEmail = encodeURIComponent(notification.email);

          // Check if contact exists in HubSpot
          const hubspotUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${encodedEmail}?idProperty=email&properties=email`;

          const hubspotRes = await fetch(hubspotUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${HUBSPOT_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          });

          if (!hubspotRes.ok) {
            console.error(
              `HubSpot contact check failed for ${notification.email}:`,
              hubspotRes.status,
              await hubspotRes.text()
            );
            // Mark as processed even if failed to avoid retrying forever
            await supabase
              .from('hubspot_notifications')
              .update({ processed: true, error: 'HubSpot check failed' })
              .eq('id', notification.id);
            errorCount++;
            continue;
          }
        }

        // Send Telegram notification (always sent, regardless of HubSpot check)
        const telegramMessage = `New hot lead from the site!\n\nName: ${notification.name}\nEmail: ${notification.email}\nPhone: +${notification.phone}\n\n@monika_farkas\n@goldsor\n@JacobAiris\n@MDTTDMT`;

        /*let telegramMessage = `New hot lead from the site!\n\nName: ${notification.name}\nEmail: ${notification.email}`;
        if (notification.phone) {
          telegramMessage += `\nPhone: +${notification.phone}`;
        }
        telegramMessage += `\n\n@monika_farkas @goldsor @JacobAiris`;*/

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramMessage,
            }),
          }
        );

        if (!telegramRes.ok) {
          const telegramError = await telegramRes.text();
          console.error(`Telegram notification failed for ${notification.email}:`, telegramError);
          await supabase
            .from('hubspot_notifications')
            .update({ processed: true, error: 'Telegram notification failed' })
            .eq('id', notification.id);
          errorCount++;
          continue;
        }

        // Mark as processed successfully
        await supabase
          .from('hubspot_notifications')
          .update({ processed: true })
          .eq('id', notification.id);
        processedCount++;
        console.log(`Successfully processed notification for ${notification.email}`);
      } catch (error) {
        console.error(`Error processing notification ${notification.id}:`, error);
        await supabase
          .from('hubspot_notifications')
          .update({
            processed: true,
            error: error instanceof Error ? error.message : 'Unknown error',
          })
          .eq('id', notification.id);
        errorCount++;
      }
    }

    return NextResponse.json({
      status: 'success',
      processed: processedCount,
      errors: errorCount,
      total: notifications.length,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
