'use client';

import { useEffect } from 'react';

export default function BotIdClient() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    console.log('[BOTID] Starting BotID initialization from client component...');

    // Dynamically import and initialize BotID
    import('botid/client/core')
      .then(({ initBotId }) => {
        try {
          console.log('[BOTID] BotID module loaded, initializing...');
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
              // Add page routes to help BotID track requests from specific pages
              {
                path: '/call-request',
                method: 'GET',
              },
              {
                path: '/lead-request',
                method: 'GET',
              },
            ],
          });
          console.log('[BOTID] BotID initialized successfully from client component');
          console.log('[BOTID] BotID should now intercept fetch requests to protected endpoints');

          // Store a flag that BotID is initialized
          (window as { __BOTID_INITIALIZED__?: boolean }).__BOTID_INITIALIZED__ = true;
        } catch (error) {
          console.error('[BOTID] Error initializing BotID from client component:', error);
        }
      })
      .catch((error) => {
        console.error('[BOTID] Failed to load BotID client module:', error);
      });
  }, []);

  return null;
}
