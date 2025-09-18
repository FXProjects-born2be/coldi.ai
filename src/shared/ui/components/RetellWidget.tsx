'use client';

import { useEffect } from 'react';

export default function RetellWidget() {
  useEffect(() => {
    if (document.getElementById('retell-widget')) return;

    const s = document.createElement('script');
    s.id = 'retell-widget';
    s.src = 'https://dashboard.retellai.com/retell-widget.js';
    s.type = 'module';

    s.dataset.publicKey = 'key_f863f9c8a125ea6bcbf5ed16ce54';
    s.dataset.agentId = 'agent_63b56595436752aa00582d2ad9';
    s.dataset.agentVersion = '0';
    s.dataset.title = 'Chat with us!';
    s.dataset.recaptchaKey = '6Ldzfc0rAAAAAECsL-e1IGCcwDiDmRkM8EaPB03h';
    s.dataset.color = '#4268ff';
    s.dataset.logoUrl = 'https://coldi.ai/icon.png';
    s.dataset.botName = 'Victoria';
    s.dataset.showAiPopup = 'true';
    s.dataset.showAiPopupTime = '5';
    s.dataset.popupMessage = 'Hi! Have a question? I can help.';
    s.dataset.autoOpen = 'false';

    s.dataset.useShadowDom = 'true';

    document.body.appendChild(s);
  }, []);

  return null;
}
