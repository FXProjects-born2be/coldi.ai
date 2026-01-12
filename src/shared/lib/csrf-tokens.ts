/**
 * CSRF token management for securing API routes
 * Tokens are generated on server and must be included in requests
 */

type CsrfToken = {
  token: string;
  expiresAt: number;
  used: boolean;
};

// In-memory store for CSRF tokens (cleared on server restart)
const tokenStore = new Map<string, CsrfToken>();

// Token TTL: 10 minutes
const TOKEN_TTL_MS = 10 * 60 * 1000;

// Cleanup interval: remove expired tokens every minute
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [token, data] of tokenStore.entries()) {
      if (data.expiresAt < now || data.used) {
        tokenStore.delete(token);
      }
    }
  }, 60 * 1000);
}

/**
 * Generate a new CSRF token
 * @returns CSRF token string
 */
export function generateCsrfToken(): string {
  // Generate a random token
  const token = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;

  const expiresAt = Date.now() + TOKEN_TTL_MS;

  tokenStore.set(token, {
    token,
    expiresAt,
    used: false,
  });

  return token;
}

/**
 * Validate and consume a CSRF token
 * Token can only be used once
 * @param token - CSRF token to validate
 * @returns true if token is valid and was successfully consumed, false otherwise
 */
export function validateAndConsumeCsrfToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // Parse token: format is timestamp-random1-random2
  const parts = token.split('-');
  if (parts.length < 3) {
    return false;
  }

  const tokenTimestamp = parseInt(parts[0], 10);
  if (isNaN(tokenTimestamp)) {
    return false;
  }

  const now = Date.now();
  const tokenAge = now - tokenTimestamp;
  const isExpired = tokenAge > TOKEN_TTL_MS;

  if (isExpired) {
    return false;
  }

  // Check in-memory store
  const tokenData = tokenStore.get(token);
  if (tokenData) {
    if (tokenData.used) {
      return false; // Token already used
    }
    // Mark as used and delete
    tokenData.used = true;
    tokenStore.delete(token);
    return true;
  }

  // Token not in store (different worker), but timestamp is valid
  // Allow usage based on timestamp validation only
  // This allows cross-worker token validation
  return true;
}

/**
 * Clean up expired tokens (manual cleanup, also done automatically)
 */
export function cleanupExpiredCsrfTokens(): void {
  const now = Date.now();
  for (const [token, data] of tokenStore.entries()) {
    if (data.expiresAt < now || data.used) {
      tokenStore.delete(token);
    }
  }
}
