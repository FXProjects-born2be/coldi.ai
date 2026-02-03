# Data Flow — coldi.ai

Plain-text description of architecture and data flows.

---

## Overall Architecture

Users reach the site over HTTPS (port 443). Traffic may pass through Cloudflare (DDoS, WAF, rate limiting, SSL), then hits the Vercel Edge Network. Vercel serves Next.js: frontend (React), API routes (serverless functions), and static assets.

The site is hosted on Vercel; only HTTP/HTTPS are exposed. SSH and direct database access are not used.

---

## Main Forms and APIs

### Call Request (`/api/request-call`)

The client sends a POST with form data (name, email, phone, industry, company, scenario, agent, turnstileToken) and honeypot fields (website_url, company_website, business_url).

Check order: whether forms are enabled (Supabase `system_config`); Vercel BotID check (if bot — 403); read body; bot detection via `detectBot`: honeypot, rate limit by IP/email/phone, suspicious patterns and User-Agent (on block — 429 and log [RATE LIMIT EXCEEDED] or [BOT DETECTED]); Cloudflare Turnstile verification; response returns data for subsequent calls to `/api/retell-call` and `/api/hubspot-lead`.

### Lead Request (`/api/request-lead`)

Same pattern: POST with form fields and turnstileToken. Checks: forms status, BotID, detectBot (honeypot, rate limit, patterns), Turnstile. Response returns data for calling `/api/hubspot-lead`.

### Pricing Request (`/api/request-pricing`)

Same flow: forms status, BotID, detectBot, Turnstile, response returns data for calling `/api/hubspot-lead`.

---

## Secondary APIs (After Form Submit)

The client calls these after a successful form submission.

- **`/api/retell-call`** — BotID check, forms status check, call to Retell AI API to initiate the call.
- **`/api/hubspot-lead`** — BotID, forms status, submit lead to HubSpot Forms API.

---

## SMS Verification

**`/api/sms/send-code`**  
POST: phone, turnstileToken, csrfToken. BotID check (no auth), validate and consume CSRF token, get webhook URL from system status, generate 6-digit code, store in Supabase (sms_codes), send SMS via Twilio. If BotID identifies a bot — 403 (requests from the page must include BotID headers).

**`/api/sms/verify-code`**  
POST: phone, code. Verify code in Supabase, check expiry and that code is not used, mark as used, return status. Detailed logging (IP, user-agent, referer, email, phone) for analytics.

---

## Admin and Utility APIs

**`/api/forms-control`**  
GET — current forms status (enabled/disabled) from Supabase.  
POST — set status (action: enable/disable). Authorization via header `Authorization: Bearer <API_SECRET>` or `FORMS_CONTROL_SECRET`; if secret is set and token is invalid — 401. BotID is not checked for this endpoint (bypass), so forms can be controlled from Postman or other tools.

**`/api/save-article`**  
POST with multipart/form-data: file, metadata (JSON with originalArticle, title, category). Authorization: `Authorization: Bearer <SAVE_ARTICLE_SECRET | API_SECRET>`. Upload file to Supabase Storage (bucket images), insert post into posts table. Without valid token — 401.

**`/api/retell-tg-notification`**  
Webhook from Retell: POST with JSON (event, call, retell_llm_dynamic_variables, recording_url, etc.). Authorization disabled — endpoint accepts requests without Bearer. Only handles `call_analyzed` event; extracts name, email, phone, recording_url; sends message (and audio if present) to Telegram. Detailed logging of each request (IP, user-agent, referer, origin) and errors.

---

## Vercel Firewall

Firewall rules run on the Vercel edge **before** the request reaches Next.js (API routes and server code). You can configure actions by path, country, IP, etc.

**Recommended rules:**

- **`/api/forms-control`** — rule with action **Bypass** (allow without blocking) so GET/POST to this endpoint are not blocked by Vercel Bot Protection or other rules. This allows controlling forms from Postman, scripts, or other tools without a browser with BotID.
- Leave the rest of the API and pages under default protection (Bot Protection, rate limiting, etc. — per project settings in Vercel).

Firewall rules take precedence over code: if a rule blocks a request, it never reaches `checkBotId()` or route logic.

---

## Security and Logging

**BotID (Vercel)**  
Used in request-call, request-lead, request-pricing, retell-call, hubspot-lead, sms/send-code, sms/verify-code via `checkBotId()`. If BotID headers are missing or the request is classified as a bot — 403. For forms from the page, the client must initialize BotID (instrumentation-client.ts) and perform fetch from the same origins so headers are added.

**Anti-bot (anti-bot.ts)**  
In request-call, request-lead, request-pricing forms, `detectBot()` is called: honeypot field checks; rate limit by IP (3 per minute, 5 per hour), by email and phone (5 per hour); suspicious patterns (e.g. very short name); User-Agent. On limit exceeded returns 429 and logs **[RATE LIMIT EXCEEDED]** with limit type (ip_short, ip_long, email, phone), formType, IP, masked email/phone, user-agent, referer, and limit parameters.

**Turnstile**  
Forms verify turnstileToken via Cloudflare Turnstile API. Invalid or missing token — validation error.

---

## External Services

- **Supabase** — HTTPS; tables: system_config, sms_codes, hubspot_notifications, posts; config and codes.
- **Retell AI** — HTTPS; creating calls and webhook for call_analyzed (retell-tg-notification).
- **HubSpot** — HTTPS; submitting leads via Forms API.
- **Cloudflare Turnstile** — HTTPS; captcha verification.
- **Twilio** — HTTPS; sending SMS (via webhook from system status).
- **Telegram** — HTTPS; bot for Retell notifications (retell-tg-notification).

---

## Ports and Protocols

Inbound: HTTPS 443, HTTP 80 (redirect to HTTPS).  
Outbound: HTTPS 443 only to Supabase, Retell, HubSpot, Cloudflare Turnstile, Twilio, Telegram. SSH and direct DB ports are not used.
