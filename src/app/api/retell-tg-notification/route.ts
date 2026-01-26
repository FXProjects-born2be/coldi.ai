import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// List of supported country codes
/*const SUPPORTED_COUNTRY_CODES = [
  '+52',
  '+1',
  '+44',
  '+54',
  '+55',
  '+56',
  '+43',
  '+32',
  '+359',
  '+385',
  '+357',
  '+420',
  '+45',
  '+372',
  '+33',
  '+49',
  '+30',
  '+36',
  '+354',
  '+353',
  '+39',
  '+371',
  '+370',
  '+352',
  '+377',
  '+31',
  '+47',
  '+48',
  '+351',
  '+34',
  '+46',
  '+41',
  '+972',
  '+965',
  '+974',
  '+966',
  '+65',
  '+886',
  '+66',
  '+90',
  '+971',
  '+61',
  '+91',
];*/

type RetellWebhookPayload = {
  event: string;
  call?: {
    call_id?: string;
    call_status?: string;
    to_number?: string;

    retell_llm_dynamic_variables?: {
      first_name?: string;
      last_name?: string;
      customer_name?: string;
      email?: string;
      phone_number?: string;
      country_code?: string;
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

    // Log the full incoming request
    console.log('=== Retell Webhook Request ===');
    console.log('Full request body:', JSON.stringify(body, null, 2));

    // Only process call_analyzed events
    if (body.event !== 'call_analyzed') {
      console.log(`Event ignored: ${body.event}`);
      return NextResponse.json({ status: 'success', message: 'Event ignored' });
    }

    if (!body.call || !body.call.retell_llm_dynamic_variables) {
      console.error('Missing call data or dynamic variables');
      return NextResponse.json(
        { status: 'error', message: 'Missing call data or dynamic variables' },
        { status: 400 }
      );
    }

    const { first_name, last_name, customer_name, email, phone_number } =
      body.call.retell_llm_dynamic_variables;
    const recordingUrl = body.call.recording_url;
    const toNumber = body.call.to_number;
    const countryCode = body.call.retell_llm_dynamic_variables?.country_code || null;

    // Build name: use first_name (with last_name if available) or customer_name
    let name = 'N/A';
    if (first_name) {
      name = [first_name, last_name].filter(Boolean).join(' ') || first_name;
    } else if (customer_name) {
      name = customer_name;
    }

    // Log extracted data
    console.log('=== Extracted Data ===');
    console.log('Event:', body.event);
    console.log('Name:', name);
    console.log('First Name:', first_name);
    console.log('Last Name:', last_name);
    console.log('Customer Name:', customer_name);
    console.log('Email:', email);
    console.log('Phone Number (from dynamic vars):', phone_number);
    console.log('To Number (from call):', toNumber);
    console.log('Country Code:', countryCode);
    console.log('Recording URL:', recordingUrl);
    console.log('Call ID:', body.call?.call_id);
    console.log('Call Status:', body.call?.call_status);
    console.log('========================');

    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Missing email in dynamic variables' },
        { status: 400 }
      );
    }

    // Format phone number: use to_number from call, or fallback to phone_number from dynamic variables
    const phoneNumber = toNumber || phone_number;
    const phone = phoneNumber
      ? phoneNumber.startsWith('+')
        ? phoneNumber
        : `+${phoneNumber}`
      : 'N/A';

    // Check if country code is supported
    const formattedCountryCode = countryCode
      ? countryCode.startsWith('+')
        ? countryCode
        : `+${countryCode}`
      : null;

    console.log('Formatted Country Code:', formattedCountryCode);

    /*const isSupported = formattedCountryCode
      ? SUPPORTED_COUNTRY_CODES.includes(formattedCountryCode)
      : true; // If no country code provided, assume supported*/

    const isSupported = true;

    console.log('Is Supported:', isSupported);

    // Create Telegram message
    let telegramMessage: string;
    if (!isSupported) {
      // Unsupported country: send message without audio
      telegramMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nCountry code blocked for outbound calls\n\n@monika_farkas\n@goldsor\n@JacobAiris\n@Natalie_Marten`;

      // For unsupported countries, send text message only (no audio)
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

      console.log(`Successfully sent blocked country notification for ${email}`);
      return NextResponse.json({ status: 'success', message: 'Webhook processed' });
    }

    // Supported country: use standard message
    telegramMessage = `New hot lead from the site!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n@monika_farkas\n@goldsor\n@JacobAiris\n@Natalie_Marten`;

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
