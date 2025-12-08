import { initBotId } from 'botid/client/core';

// Define the paths that need bot protection.
// These are paths that are routed to by your app.
try {
  const botIdInstance = initBotId({
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
    ],
  });

  console.log('[BOTID CLIENT] BotID initialized successfully', botIdInstance);
} catch (error) {
  console.error('[BOTID CLIENT] Error initializing BotID:', error);
}
