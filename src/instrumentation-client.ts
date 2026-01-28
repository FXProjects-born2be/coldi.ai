import { initBotId } from 'botid/client/core';

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
