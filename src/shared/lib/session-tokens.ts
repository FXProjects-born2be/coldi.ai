/**
 * Session token management for securing secondary API routes
 * Tokens are generated after successful main route validation and required for secondary routes
 */

type SessionToken = {
  token: string;
  expiresAt: number;
  used: boolean;
};

// In-memory store for session tokens (cleared on server restart)
const tokenStore = new Map<string, SessionToken>();

// Token TTL: 5 minutes
const TOKEN_TTL_MS = 5 * 60 * 1000;

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
 * Generate a new session token
 * @returns Session token string
 */
export function generateSessionToken(): string {
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
 * Validate and consume a session token
 * @param token - Session token to validate
 * @returns true if token is valid and was successfully consumed, false otherwise
 */
export function validateAndConsumeSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const sessionData = tokenStore.get(token);

  if (!sessionData) {
    return false;
  }

  // Check if token is expired
  if (sessionData.expiresAt < Date.now()) {
    tokenStore.delete(token);
    return false;
  }

  // Check if token was already used
  if (sessionData.used) {
    return false;
  }

  // Mark token as used and delete it
  tokenStore.delete(token);

  return true;
}

/**
 * Clean up expired tokens (manual cleanup, also done automatically)
 */
export function cleanupExpiredTokens(): void {
  const now = Date.now();
  for (const [token, data] of tokenStore.entries()) {
    if (data.expiresAt < now || data.used) {
      tokenStore.delete(token);
    }
  }
}
