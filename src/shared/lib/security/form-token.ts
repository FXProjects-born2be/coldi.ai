import { createHmac, randomBytes } from 'crypto';

const SECRET =
  process.env.FORM_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-dev-secret';
const PRE_TOKEN_TYPE = 'pre';
const FINAL_TOKEN_TYPE = 'final';
const MIN_DELAY_MS = 8_000;
const MAX_TOKEN_AGE_MS = 10 * 60 * 1000; // 10 minutes
const MIN_INTERACTIONS = 3;

type PreTokenPayload = {
  type: typeof PRE_TOKEN_TYPE;
  sid: string;
  formId: string;
  iat: number;
};

type FinalTokenPayload = {
  type: typeof FINAL_TOKEN_TYPE;
  sid: string;
  formId: string;
  iat: number;
  fat: number; // finalized-at timestamp
  interactions: number;
};

export type InteractionProof = {
  scrollCount: number;
  mouseMoveCount: number;
  keypressCount: number;
  focusCount: number;
};

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('base64url');
}

function encodeToken(data: object): string {
  const json = JSON.stringify(data);
  const payload = Buffer.from(json).toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function decodeToken<T>(token: string): T | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  const expectedSig = sign(payload);
  if (signature !== expectedSig) return null;

  try {
    const json = Buffer.from(payload, 'base64url').toString('utf-8');
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function issuePreToken(formId: string): string {
  const payload: PreTokenPayload = {
    type: PRE_TOKEN_TYPE,
    sid: randomBytes(16).toString('hex'),
    formId,
    iat: Date.now(),
  };
  return encodeToken(payload);
}

export function finalizeToken(
  preToken: string,
  interactions: InteractionProof
): { token: string } | { error: string } {
  const pre = decodeToken<PreTokenPayload>(preToken);

  if (!pre) {
    return { error: 'Invalid pre-token signature' };
  }

  if (pre.type !== PRE_TOKEN_TYPE) {
    return { error: 'Wrong token type' };
  }

  const age = Date.now() - pre.iat;

  if (age < MIN_DELAY_MS) {
    return {
      error: `Too fast. Wait at least ${MIN_DELAY_MS / 1000}s (elapsed: ${Math.round(age / 1000)}s)`,
    };
  }

  if (age > MAX_TOKEN_AGE_MS) {
    return { error: 'Pre-token expired' };
  }

  const totalInteractions =
    interactions.scrollCount +
    interactions.mouseMoveCount +
    interactions.keypressCount +
    interactions.focusCount;

  if (totalInteractions < MIN_INTERACTIONS) {
    return {
      error: `Not enough interactions (got ${totalInteractions}, need ${MIN_INTERACTIONS})`,
    };
  }

  const payload: FinalTokenPayload = {
    type: FINAL_TOKEN_TYPE,
    sid: pre.sid,
    formId: pre.formId,
    iat: pre.iat,
    fat: Date.now(),
    interactions: totalInteractions,
  };

  return { token: encodeToken(payload) };
}

export function verifyFinalToken(
  token: string,
  expectedFormId: string
): { valid: true; sid: string; interactions: number } | { valid: false; error: string } {
  const data = decodeToken<FinalTokenPayload>(token);

  if (!data) {
    return { valid: false, error: 'Invalid token signature' };
  }

  if (data.type !== FINAL_TOKEN_TYPE) {
    return { valid: false, error: 'Wrong token type' };
  }

  if (data.formId !== expectedFormId) {
    return { valid: false, error: 'Form ID mismatch' };
  }

  const tokenAge = Date.now() - data.iat;
  if (tokenAge > MAX_TOKEN_AGE_MS) {
    return { valid: false, error: 'Token expired' };
  }

  const delay = data.fat - data.iat;
  if (delay < MIN_DELAY_MS) {
    return { valid: false, error: 'Token delay too short' };
  }

  return { valid: true, sid: data.sid, interactions: data.interactions };
}
