/**
 * Email domain verification utilities
 * Checks if email is from a free email provider (requires SMS verification)
 */

// List of common free email providers
const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'icloud.com',
  'yandex.com',
  'gmx.com',
  'zoho.com',
  'live.com',
  'msn.com',
  'inbox.com',
  'fastmail.com',
  'tutanota.com',
  'mail.ru',
  'qq.com',
  '163.com',
  'sina.com',
  'rediffmail.com',
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  '10minutemail.com',
  'throwaway.email',
  'temp-mail.org',
  'mohmal.com',
  'dispostable.com',
  'getnada.com',
  'mintemail.com',
  'sharklasers.com',
  'spamgourmet.com',
  'trashmail.com',
  'emailondeck.com',
  'fakeinbox.com',
  'mytrashmail.com',
  'spamhole.com',
  'spamtraps.com',
  'tempr.email',
  'tmpmail.org',
  'yopmail.com',
  'zoemail.com',
];

/**
 * Extract domain from email address
 */
export function extractEmailDomain(email: string): string | null {
  const parts = email.toLowerCase().trim().split('@');
  if (parts.length !== 2) {
    return null;
  }
  return parts[1];
}

/**
 * Check if email is from a free email provider
 */
export function isFreeEmailDomain(email: string): boolean {
  const domain = extractEmailDomain(email);
  if (!domain) {
    // If we can't parse the email, assume it's not free (safer)
    return false;
  }

  // Check exact match
  if (FREE_EMAIL_DOMAINS.includes(domain)) {
    return true;
  }

  // Check for subdomains of free providers (e.g., mail.yahoo.com)
  return FREE_EMAIL_DOMAINS.some((freeDomain) => domain.endsWith(`.${freeDomain}`));
}

/**
 * Check if email requires SMS verification
 */
export function requiresSmsVerification(email: string): boolean {
  return isFreeEmailDomain(email);
}
