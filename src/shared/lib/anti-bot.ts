/**
 * Anti-bot protection utilities
 * Provides rate limiting, honeypot detection, IP tracking, and comprehensive logging
 */

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max requests per IP per hour
const RATE_LIMIT_SHORT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_SHORT_MAX_REQUESTS = 3; // Max requests per IP per minute

// In-memory stores (in production, consider using Redis or similar)
const ipRequestLog = new Map<string, number[]>();
const emailRequestLog = new Map<string, number[]>();
const phoneRequestLog = new Map<string, number[]>();

// Honeypot field names (should be random-looking but consistent)
const HONEYPOT_FIELD_NAMES = ['website_url', 'company_website', 'business_url'];

export type BotDetectionResult = {
  isBot: boolean;
  reason?: string;
  blocked: boolean;
};

export type RequestMetadata = {
  ip: string;
  userAgent: string | null;
  referer: string | null;
  timestamp: number;
  formType: 'call' | 'lead' | 'pricing';
  data: Record<string, unknown>;
};

/**
 * Extract client IP from request headers
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

  return (
    forwardedFor?.split(',')[0]?.trim() ||
    realIp ||
    cfConnectingIp ||
    // @ts-expect-error - Next Request may expose ip depending on runtime
    request.ip ||
    'unknown'
  );
}

/**
 * Normalize phone number for rate limiting
 */
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Normalize email for rate limiting
 */
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Check if request should be blocked based on rate limiting
 */
function checkRateLimit(
  log: Map<string, number[]>,
  key: string,
  maxRequests: number,
  windowMs: number,
  now: number
): boolean {
  if (!key || key === 'unknown') {
    return false;
  }

  const previous = log.get(key) ?? [];
  const recentRequests = previous.filter((timestamp) => now - timestamp < windowMs);

  if (recentRequests.length >= maxRequests) {
    log.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  log.set(key, recentRequests);
  return false;
}

/**
 * Check honeypot fields - if any are filled, it's likely a bot
 */
export function checkHoneypot(data: Record<string, unknown>): BotDetectionResult {
  for (const fieldName of HONEYPOT_FIELD_NAMES) {
    const value = data[fieldName];
    if (value && typeof value === 'string' && value.trim().length > 0) {
      return {
        isBot: true,
        reason: `Honeypot field "${fieldName}" was filled`,
        blocked: true,
      };
    }
  }
  return { isBot: false, blocked: false };
}

/**
 * Check rate limits for IP, email, and phone
 */
export function checkRateLimits(ip: string, email?: string, phone?: string): BotDetectionResult {
  const now = Date.now();

  // Check short-term rate limit (1 minute)
  if (
    checkRateLimit(ipRequestLog, ip, RATE_LIMIT_SHORT_MAX_REQUESTS, RATE_LIMIT_SHORT_WINDOW_MS, now)
  ) {
    return {
      isBot: true,
      reason: `Too many requests from IP ${ip} in short time window`,
      blocked: true,
    };
  }

  // Check long-term rate limit (1 hour)
  if (checkRateLimit(ipRequestLog, ip, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS, now)) {
    return {
      isBot: true,
      reason: `Too many requests from IP ${ip} in long time window`,
      blocked: true,
    };
  }

  // Check email rate limit
  if (email) {
    const normalizedEmail = normalizeEmail(email);
    if (
      checkRateLimit(
        emailRequestLog,
        normalizedEmail,
        RATE_LIMIT_MAX_REQUESTS,
        RATE_LIMIT_WINDOW_MS,
        now
      )
    ) {
      return {
        isBot: true,
        reason: `Too many requests from email ${normalizedEmail}`,
        blocked: true,
      };
    }
  }

  // Check phone rate limit
  if (phone) {
    const normalizedPhone = normalizePhone(phone);
    if (
      checkRateLimit(
        phoneRequestLog,
        normalizedPhone,
        RATE_LIMIT_MAX_REQUESTS,
        RATE_LIMIT_WINDOW_MS,
        now
      )
    ) {
      return {
        isBot: true,
        reason: `Too many requests from phone ${normalizedPhone}`,
        blocked: true,
      };
    }
  }

  return { isBot: false, blocked: false };
}

/**
 * Check for suspicious patterns in data
 */
export function checkSuspiciousPatterns(data: Record<string, unknown>): BotDetectionResult {
  // Check for common bot patterns
  const name = data.name as string | undefined;
  const fullName = data.fullName as string | undefined;

  // Email pattern check removed - allows random test emails

  // Check for suspicious name patterns
  const userName = name || fullName;
  if (userName) {
    // Very short names or only numbers
    if (userName.trim().length < 2) {
      return {
        isBot: true,
        reason: `Suspicious name pattern: ${userName}`,
        blocked: false,
      };
    }
  }

  return { isBot: false, blocked: false };
}

/**
 * Check User-Agent for suspicious patterns
 */
export function checkUserAgent(userAgent: string | null): BotDetectionResult {
  if (!userAgent) {
    return {
      isBot: true,
      reason: 'Missing User-Agent header',
      blocked: false, // Don't block, just flag
    };
  }

  const ua = userAgent.toLowerCase();
  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'curl',
    'wget',
    'python-requests',
    'postman',
    'insomnia',
    'httpie',
  ];

  for (const pattern of botPatterns) {
    if (ua.includes(pattern)) {
      return {
        isBot: true,
        reason: `Suspicious User-Agent pattern: ${pattern}`,
        blocked: false, // Don't block, just flag
      };
    }
  }

  return { isBot: false, blocked: false };
}

/**
 * Comprehensive bot detection
 */
export function detectBot(
  request: Request,
  data: Record<string, unknown>,
  formType: 'call' | 'lead' | 'pricing'
): BotDetectionResult {
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');
  const timestamp = Date.now();

  // Check honeypot first (most reliable)
  const honeypotCheck = checkHoneypot(data);
  if (honeypotCheck.blocked) {
    logBotAttempt({
      ip,
      userAgent,
      referer,
      timestamp,
      formType,
      data,
      isBot: true,
      reason: honeypotCheck.reason,
      blocked: true,
    });
    return honeypotCheck;
  }

  // Check rate limits
  const email = (data.email as string) || undefined;
  const phone = (data.phone as string) || undefined;
  const rateLimitCheck = checkRateLimits(ip, email, phone);
  if (rateLimitCheck.blocked) {
    logBotAttempt({
      ip,
      userAgent,
      referer,
      timestamp,
      formType,
      data,
      isBot: true,
      reason: rateLimitCheck.reason,
      blocked: true,
    });
    return rateLimitCheck;
  }

  // Check suspicious patterns
  const suspiciousCheck = checkSuspiciousPatterns(data);
  const userAgentCheck = checkUserAgent(userAgent);

  const isBot = suspiciousCheck.isBot || userAgentCheck.isBot;
  const reasons: string[] = [];
  if (suspiciousCheck.reason) reasons.push(suspiciousCheck.reason);
  if (userAgentCheck.reason) reasons.push(userAgentCheck.reason);

  // Log all attempts (both bots and legitimate users)
  logBotAttempt({
    ip,
    userAgent,
    referer,
    timestamp,
    formType,
    data,
    isBot,
    reason: reasons.length > 0 ? reasons.join('; ') : undefined,
    blocked: false, // Don't block on suspicious patterns alone
  });

  return {
    isBot,
    reason: reasons.length > 0 ? reasons.join('; ') : undefined,
    blocked: false,
  };
}

/**
 * Log bot attempts and all form submissions
 */
function logBotAttempt(
  metadata: RequestMetadata & { isBot: boolean; reason?: string; blocked: boolean }
): void {
  const logEntry = {
    timestamp: new Date(metadata.timestamp).toISOString(),
    ip: metadata.ip,
    userAgent: metadata.userAgent,
    referer: metadata.referer,
    formType: metadata.formType,
    isBot: metadata.isBot,
    blocked: metadata.blocked,
    reason: metadata.reason,
    data: {
      // Log sanitized data (remove sensitive info if needed)
      email: metadata.data.email,
      name: metadata.data.name || metadata.data.fullName,
      phone: metadata.data.phone ? '***' + String(metadata.data.phone).slice(-4) : undefined, // Only last 4 digits
      industry: metadata.data.industry,
      company: metadata.data.company,
      // Log honeypot fields to see if they were filled
      honeypotFields: HONEYPOT_FIELD_NAMES.reduce(
        (acc, field) => {
          acc[field] = metadata.data[field] || null;
          return acc;
        },
        {} as Record<string, unknown>
      ),
    },
  };

  // Log to console (in production, you might want to send to a logging service)
  if (metadata.isBot || metadata.blocked) {
    console.warn('[BOT DETECTED]', JSON.stringify(logEntry, null, 2));
  } else {
    console.log('[FORM SUBMISSION]', JSON.stringify(logEntry, null, 2));
  }
}

/**
 * Clean up old entries from rate limit logs (call periodically)
 */
export function cleanupRateLimitLogs(): void {
  const now = Date.now();
  const maxAge = RATE_LIMIT_WINDOW_MS * 2; // Keep entries for 2x the window

  [ipRequestLog, emailRequestLog, phoneRequestLog].forEach((log) => {
    for (const [key, timestamps] of log.entries()) {
      const filtered = timestamps.filter((timestamp) => now - timestamp < maxAge);
      if (filtered.length === 0) {
        log.delete(key);
      } else {
        log.set(key, filtered);
      }
    }
  });
}

// Cleanup every 2 hours
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitLogs, 2 * 60 * 60 * 1000);
}
