import { isDisposableEmail } from 'disposable-email-domains-js';

export function checkDisposableEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  return isDisposableEmail(email);
}
