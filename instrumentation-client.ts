import { initBotId } from 'botid/client/core';

// Define the paths that need bot protection.
// These are paths that are routed to by your app.
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
  ],
});
