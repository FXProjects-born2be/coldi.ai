'use client';
import { useEffect } from 'react';

export default function RetellWidget() {
  useEffect(() => {
    // прибираємо старі інстанції/сесії
    /*try {
      Object.keys(localStorage).forEach(
        (k) => k.toLowerCase().includes('retell') && localStorage.removeItem(k)
      );
      Object.keys(sessionStorage).forEach(
        (k) => k.toLowerCase().includes('retell') && sessionStorage.removeItem(k)
      );
    } catch {}*/

    //localStorage.clear();

    document
      .querySelectorAll('script[src*="retellai.com/retell-widget.js"]')
      .forEach((el) => el.remove());

    if (document.getElementById('retell-widget'))
      document.getElementById('retell-widget')?.remove();

    const s = document.createElement('script');
    s.id = 'retell-widget';
    s.type = 'module';
    s.src = 'https://dashboard.retellai.com/retell-widget.js';

    s.setAttribute('data-public-key', 'key_4de8a6b5fc1b379407dee79de075');
    s.setAttribute('data-agent-id', 'agent_63b56595436752aa00582d2ad9');
    s.setAttribute('data-agent-version', '5');
    s.setAttribute('data-title', 'Chat with us!');
    s.setAttribute('data-recaptcha-key', '6Ldzfc0rAAAAAECsL-e1IGCcwDiDmRkM8EaPB03h');
    s.setAttribute('data-color', '#4268ff');
    s.setAttribute('data-logo-url', 'https://coldi.ai/icon.png');
    s.setAttribute('data-bot-name', 'Victoria');
    s.setAttribute('data-show-ai-popup', 'true');
    s.setAttribute('data-show-ai-popup-time', '5');
    s.setAttribute('data-popup-message', 'Hi! Have a question? I can help.');
    s.setAttribute('data-auto-open', 'false');
    s.setAttribute('data-use-shadow-dom', 'true');

    document.head.appendChild(s);

    console.log(document.getElementById('retell-widget')?.outerHTML);
  }, []);

  return null;
}
