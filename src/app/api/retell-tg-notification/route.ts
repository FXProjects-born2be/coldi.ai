import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

type RetellWebhookPayload = {
  event: string;
  call?: {
    retell_llm_dynamic_variables?: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone_number?: string;
    };
    recording_url?: string;
  };
};

export async function POST(request: Request) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Required environment variables are not configured');
      return NextResponse.json(
        { status: 'error', message: 'Configuration error' },
        { status: 500 }
      );
    }

    const body: RetellWebhookPayload = await request.json();

    // Only process call_analyzed events
    if (body.event !== 'call_analyzed') {
      return NextResponse.json({ status: 'success', message: 'Event ignored' });
    }

    if (!body.call || !body.call.retell_llm_dynamic_variables) {
      return NextResponse.json(
        { status: 'error', message: 'Missing call data or dynamic variables' },
        { status: 400 }
      );
    }

    const { first_name, last_name, email, phone_number } = body.call.retell_llm_dynamic_variables;
    const recordingUrl = body.call.recording_url;

    // Build name from first_name and last_name
    const name = [first_name, last_name].filter(Boolean).join(' ') || 'N/A';

    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Missing email in dynamic variables' },
        { status: 400 }
      );
    }

    // Format phone number (add + if not present)
    const phone = phone_number
      ? phone_number.startsWith('+')
        ? phone_number
        : `+${phone_number}`
      : 'N/A';

    // Create Telegram message similar to the existing one
    const telegramMessage = `New hot lead from the site!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n@monika_farkas\n@goldsor\n@JacobAiris`;

    // If recording_url is available, send audio with message as caption
    if (recordingUrl) {
      try {
        // Download the audio file from the URL
        const audioResponse = await fetch(recordingUrl);
        if (!audioResponse.ok) {
          console.error(`Failed to download audio from ${recordingUrl}:`, audioResponse.status);
          // Fallback to text message if audio download fails
          const messageRes = await fetch(
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

          if (!messageRes.ok) {
            const messageError = await messageRes.text();
            console.error(`Telegram message failed for ${email}:`, messageError);
            return NextResponse.json(
              { status: 'error', message: 'Failed to send Telegram message' },
              { status: 500 }
            );
          }
        } else {
          const audioBuffer = await audioResponse.arrayBuffer();

          // Create FormData to send the audio file with message as caption
          const formData = new FormData();
          const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' });
          formData.append('chat_id', TELEGRAM_CHAT_ID);
          formData.append('audio', audioBlob, 'recording.wav');
          formData.append('caption', telegramMessage);

          const audioRes = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendAudio`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!audioRes.ok) {
            // If sendAudio fails, try sendDocument as fallback
            const documentFormData = new FormData();
            documentFormData.append('chat_id', TELEGRAM_CHAT_ID);
            documentFormData.append('document', audioBlob, 'recording.wav');
            documentFormData.append('caption', telegramMessage);

            const documentRes = await fetch(
              `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
              {
                method: 'POST',
                body: documentFormData,
              }
            );

            if (!documentRes.ok) {
              // Final fallback: send text message only
              const messageRes = await fetch(
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

              if (!messageRes.ok) {
                const errorText = await messageRes.text();
                console.error(`Telegram audio/document/message failed for ${email}:`, errorText);
                return NextResponse.json(
                  { status: 'error', message: 'Failed to send Telegram message' },
                  { status: 500 }
                );
              }
            } else {
              console.log(`Successfully sent audio as document with caption for ${email}`);
            }
          } else {
            console.log(`Successfully sent audio with caption for ${email}`);
          }
        }
      } catch (audioError) {
        console.error(`Error processing audio for ${email}:`, audioError);
        // Fallback to text message if audio processing fails
        const messageRes = await fetch(
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

        if (!messageRes.ok) {
          const messageError = await messageRes.text();
          console.error(`Telegram message failed for ${email}:`, messageError);
          return NextResponse.json(
            { status: 'error', message: 'Failed to send Telegram message' },
            { status: 500 }
          );
        }
      }
    } else {
      // No recording URL, send text message only
      const messageRes = await fetch(
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

      if (!messageRes.ok) {
        const messageError = await messageRes.text();
        console.error(`Telegram message failed for ${email}:`, messageError);
        return NextResponse.json(
          { status: 'error', message: 'Failed to send Telegram message' },
          { status: 500 }
        );
      }
    }

    console.log(`Successfully processed Retell webhook for ${email}`);
    return NextResponse.json({ status: 'success', message: 'Webhook processed' });
  } catch (error) {
    console.error('Retell webhook error:', error);
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
