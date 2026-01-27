# Data Flow Diagram - coldi.ai

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                                   │
│                    (HTTPS/443, HTTP/80)                                  │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE (Optional)                             │
│  • DDoS Protection                                                       │
│  • WAF (Web Application Firewall)                                        │
│  • Rate Limiting                                                         │
│  • SSL/TLS Termination                                                   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE NETWORK                              │
│                    (Next.js Serverless Functions)                        │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │   Frontend   │ │  API Routes  │ │  Static      │
        │   (React)    │ │  (Next.js)   │ │  Assets      │
        └──────────────┘ └──────┬───────┘ └──────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
```

## Main Form Submission Flow

### 1. Call Request Form (`/api/request-call`)

```
User Browser
    │
    │ POST /api/request-call
    │ { name, email, phone, industry, company, scenario, agent, turnstileToken }
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel Function: /api/request-call                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 1. Check Forms Status (Supabase)                      │  │
│  │    └─> GET system_config WHERE key='forms_enabled'   │  │
│  │                                                       │  │
│  │ 2. Bot Detection                                      │  │
│  │    ├─> Honeypot Check (website_url, etc.)            │  │
│  │    ├─> Rate Limiting (IP, email, phone)              │  │
│  │    └─> Suspicious Patterns (name length, etc.)        │  │
│  │                                                       │  │
│  │ 3. Cloudflare Turnstile Verification                  │  │
│  │    └─> POST https://challenges.cloudflare.com/...    │  │
│  │                                                       │  │
│  │ 4. Generate Submission Code                          │  │
│  │    └─> INSERT INTO submission_codes (Supabase)       │  │
│  │                                                       │  │
│  │ 5. Send Email (SendGrid)                             │  │
│  │    └─> POST https://api.sendgrid.com/v3/mail/send   │  │
│  │                                                       │  │
│  │ 6. Return submissionCode                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
    │
    │ submissionCode
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Client-side: Secondary API Calls                           │
│  ┌──────────────────────┐  ┌──────────────────────────┐   │
│  │ POST /api/retell-call │  │ POST /api/hubspot-lead  │   │
│  │ + submissionCode     │  │ + submissionCode        │   │
│  └──────────┬───────────┘  └──────────┬───────────────┘   │
└─────────────┼──────────────────────────┼───────────────────┘
              │                          │
              ▼                          ▼
    ┌─────────────────┐        ┌─────────────────┐
    │ Retell AI API   │        │ HubSpot API     │
    │ (Phone Calls)   │        │ (CRM)           │
    └─────────────────┘        └─────────────────┘
```

### 2. Lead Request Form (`/api/request-lead`)

```
User Browser
    │
    │ POST /api/request-lead
    │ { fullName, email, phone, industry, company, monthlyLeadVolume, 
    │   primaryGoal, message, turnstileToken }
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel Function: /api/request-lead                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 1. Bot Detection                                      │  │
│  │ 2. Turnstile Verification                            │  │
│  │ 3. Generate Submission Code (Supabase)               │  │
│  │ 4. Send Email (SendGrid)                              │  │
│  │ 5. Return submissionCode                              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
    │
    │ submissionCode
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Client-side: POST /api/hubspot-lead                       │
│  └─> Validate submissionCode                               │
│  └─> POST HubSpot Forms API                                │
└─────────────────────────────────────────────────────────────┘
```

### 3. Pricing Request Form (`/api/request-pricing`)

```
User Browser
    │
    │ POST /api/request-pricing
    │ { name, email, phone, website, message, plan, turnstileToken }
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel Function: /api/request-pricing                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 1. Bot Detection                                      │  │
│  │ 2. Turnstile Verification                            │  │
│  │ 3. Generate Submission Code (Supabase)               │  │
│  │ 4. Send Email (SendGrid) - if email provided          │  │
│  │ 5. Return submissionCode                              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
    │
    │ submissionCode
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Client-side: POST /api/hubspot-lead                       │
└─────────────────────────────────────────────────────────────┘
```

## SMS Verification Flow

```
User Browser
    │
    │ POST /api/sms/send-code
    │ { phone, turnstileToken, csrfToken }
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel Function: /api/sms/send-code                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 1. Verify Turnstile Token                             │  │
│  │ 2. Verify CSRF Token                                  │  │
│  │ 3. Check System Status (Supabase)                     │  │
│  │ 4. Generate 6-digit SMS Code                         │  │
│  │ 5. Store Code in Supabase (sms_codes table)          │  │
│  │ 6. Send SMS via Twilio API                           │  │
│  │    └─> POST https://api.twilio.com/2010-04-01/...    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

User Browser
    │
    │ POST /api/sms/verify-code
    │ { phone, code, turnstileToken }
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel Function: /api/sms/verify-code                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 1. Verify Turnstile Token                             │  │
│  │ 2. Check Code in Supabase                             │  │
│  │ 3. Verify Code Matches & Not Expired                  │  │
│  │ 4. Mark Code as Used                                  │  │
│  │ 5. Return Verification Status                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## External Services Integration

### Supabase (Database)
- **Connection**: HTTPS
- **Endpoints**: `grqtgrzdalvrywluyqxe.supabase.co`
- **Tables Used**:
  - `system_config` - Forms status, demo status
  - `submission_codes` - One-time codes for API security
  - `sms_codes` - SMS verification codes
  - `hubspot_notifications` - Notification tracking

### Retell AI (Phone Calls)
- **Connection**: HTTPS
- **Endpoint**: `https://api.retellai.com/v2/create-phone-call`
- **Authentication**: Bearer Token (API Key)
- **Purpose**: Initiate AI phone calls

### HubSpot (CRM)
- **Connection**: HTTPS
- **Endpoint**: `https://api.hsforms.com/submissions/v3/integration/submit/...`
- **Purpose**: Lead management and tracking

### Cloudflare Turnstile (CAPTCHA)
- **Connection**: HTTPS
- **Endpoint**: `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- **Purpose**: Bot protection

### Twilio (SMS)
- **Connection**: HTTPS
- **Endpoint**: `https://api.twilio.com/2010-04-01/Accounts/.../Messages.json`
- **Purpose**: SMS verification for free email domains

### SendGrid (Email)
- **Connection**: HTTPS
- **Endpoint**: `https://api.sendgrid.com/v3/mail/send`
- **Purpose**: Admin notifications

## Security Layers

1. **Cloudflare** (Optional)
   - DDoS Protection
   - WAF Rules
   - Rate Limiting
   - SSL/TLS

2. **Vercel Edge Network**
   - Geographic distribution
   - Automatic SSL
   - Edge caching

3. **Application Layer**
   - Bot Detection (honeypot, rate limiting, patterns)
   - Cloudflare Turnstile verification
   - CSRF Token validation
   - Submission Code system (prevents direct API calls)

4. **Database Layer**
   - Supabase Row Level Security (RLS)
   - Service Role Key (server-side only)

## Data Flow Summary

### Inbound Traffic
- **Protocol**: HTTPS (443) / HTTP (80)
- **Source**: User browsers
- **Destination**: Vercel Edge Network → Next.js Functions

### Outbound Traffic
- **Protocol**: HTTPS (443)
- **Destinations**:
  - Supabase (Database)
  - Retell AI (Phone calls)
  - HubSpot (CRM)
  - Cloudflare Turnstile (CAPTCHA)
  - Twilio (SMS)
  - SendGrid (Email)

### Internal Processing
- Bot detection (in-memory rate limiting)
- Form status checks (Supabase cache)
- Submission code generation/validation (Supabase)
- Email validation (external API, if enabled)

## Ports and Protocols

| Service | Protocol | Port | Direction | Purpose |
|---------|----------|------|-----------|---------|
| User Browser → Vercel | HTTPS | 443 | Inbound | Web traffic |
| User Browser → Vercel | HTTP | 80 | Inbound | Redirect to HTTPS |
| Vercel → Supabase | HTTPS | 443 | Outbound | Database queries |
| Vercel → Retell AI | HTTPS | 443 | Outbound | Phone call API |
| Vercel → HubSpot | HTTPS | 443 | Outbound | CRM integration |
| Vercel → Cloudflare Turnstile | HTTPS | 443 | Outbound | CAPTCHA verification |
| Vercel → Twilio | HTTPS | 443 | Outbound | SMS sending |
| Vercel → SendGrid | HTTPS | 443 | Outbound | Email sending |

## No Direct Access Required
- **SSH**: Not applicable (serverless architecture)
- **Database Direct Access**: Not exposed (Supabase managed)
- **Other Protocols**: Only HTTPS/HTTP needed
