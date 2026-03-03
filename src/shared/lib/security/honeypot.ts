/**
 * Read a honeypot field value from the DOM.
 * Honeypot fields are hidden inputs that bots fill but humans don't.
 */
export function getHoneypotValue(fieldName: string): string {
  return document.querySelector<HTMLInputElement>(`input[name="${fieldName}"]`)?.value || '';
}
