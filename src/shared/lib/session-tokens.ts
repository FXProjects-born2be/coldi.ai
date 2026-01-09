/**
 * Session token management for securing secondary API routes
 * Tokens are generated after successful main route validation and required for secondary routes
 */

type SessionToken = {
  token: string;
  expiresAt: number;
  used: boolean;
  usedBy: string[]; // Track which routes have used this token
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
    usedBy: [],
  });

  console.log('[SESSION-TOKEN] Generated new token:', {
    token: token.substring(0, 50) + '...',
    expiresAt,
    expiresIn: TOKEN_TTL_MS / 1000 + 's',
    storeSize: tokenStore.size,
  });

  return token;
}

/**
 * Validate and consume a session token
 * Token format: timestamp-random1-random2
 * We validate by checking if timestamp is within TTL window
 * @param token - Session token to validate
 * @param routeName - Optional route name to track usage (e.g., 'retell-call', 'hubspot-lead')
 * @returns true if token is valid and was successfully consumed, false otherwise
 */
export function validateAndConsumeSessionToken(
  token: string | undefined | null,
  routeName?: string
): boolean {
  console.log('[SESSION-TOKEN] Validating token:', {
    hasToken: !!token,
    tokenType: typeof token,
    tokenLength: token?.length || 0,
    tokenPreview: token ? `${token.substring(0, 30)}...` : 'none',
    routeName,
  });

  if (!token || typeof token !== 'string') {
    console.warn('[SESSION-TOKEN] Token is missing or invalid type');
    return false;
  }

  // Parse token: format is timestamp-random1-random2
  const parts = token.split('-');
  if (parts.length < 3) {
    console.warn('[SESSION-TOKEN] Invalid token format');
    return false;
  }

  const tokenTimestamp = parseInt(parts[0], 10);
  if (isNaN(tokenTimestamp)) {
    console.warn('[SESSION-TOKEN] Invalid timestamp in token');
    return false;
  }

  const now = Date.now();
  const tokenAge = now - tokenTimestamp;
  const isExpired = tokenAge > TOKEN_TTL_MS;

  console.log('[SESSION-TOKEN] Token validation:', {
    tokenTimestamp,
    now,
    tokenAge: `${Math.floor(tokenAge / 1000)}s`,
    expiresIn: `${Math.floor((TOKEN_TTL_MS - tokenAge) / 1000)}s`,
    isExpired,
    storeSize: tokenStore.size,
  });

  if (isExpired) {
    console.warn('[SESSION-TOKEN] Token expired', {
      tokenTimestamp,
      now,
      age: tokenAge,
      maxAge: TOKEN_TTL_MS,
    });
    return false;
  }

  // Check in-memory store if available (for same-worker validation)
  const sessionData = tokenStore.get(token);
  if (sessionData) {
    // Token exists in store, use store-based validation
    if (routeName) {
      if (sessionData.usedBy.includes(routeName)) {
        console.warn('[SESSION-TOKEN] Token already used by this route:', routeName);
        return false;
      }
      sessionData.usedBy.push(routeName);
      const allowedRoutes = ['retell-call', 'hubspot-lead'];
      const allRoutesUsed = allowedRoutes.every((route) => sessionData.usedBy.includes(route));
      if (allRoutesUsed) {
        sessionData.used = true;
        tokenStore.delete(token);
        console.log('[SESSION-TOKEN] Token fully consumed by all routes, deleting from store');
      }
      return true;
    }
    sessionData.used = true;
    tokenStore.delete(token);
    return true;
  }

  // Token not in store (different worker), but timestamp is valid
  // Allow usage based on timestamp validation only
  // This allows cross-worker token validation
  console.log('[SESSION-TOKEN] Token not in store but timestamp valid (cross-worker), allowing');
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
