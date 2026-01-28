import { initBotId } from 'botid/client/core';

// Define the paths that need bot protection.
// These are paths that are routed to by your app.
// These can be:
// - API endpoints (e.g., '/api/checkout')
// - Server actions invoked from a page (e.g., '/dashboard')
// - Dynamic routes (e.g., '/api/create/*')

try {
  initBotId({
    protect: [
      {
        path: '/api/request-call',
        method: 'POST',
      },
      {
        path: '/api/request-lead',
        method: 'POST',
      },
      {
        path: '/api/request-pricing',
        method: 'POST',
      },
      {
        path: '/api/retell-call',
        method: 'POST',
      },
      {
        path: '/api/hubspot-lead',
        method: 'POST',
      },
      {
        path: '/api/sms/send-code',
        method: 'POST',
      },
      {
        path: '/api/sms/verify-code',
        method: 'POST',
      },
    ],
  });
  console.log('[BOTID] BotID initialized successfully');
} catch (error) {
  console.error('[BOTID] Error initializing BotID:', error);
}
