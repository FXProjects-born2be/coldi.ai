# Налаштування Twilio Verify API для SMS верифікації

## Переваги Twilio Verify API

- ✅ **Вбудоване управління кодами** - Twilio сам генерує та зберігає коди
- ✅ **Автоматичне rate limiting** - захист від зловживань
- ✅ **Підтримка багатьох країн** - глобальне покриття
- ✅ **Надійність** - інфраструктура Twilio
- ✅ **Проста інтеграція** - менше коду, менше помилок

## Крок 1: Встановити Twilio SDK

```bash
pnpm add twilio
```

## Крок 2: Створити Verification Service в Twilio

### Варіант A: Через Twilio Console (рекомендовано)

1. Увійдіть в [Twilio Console](https://console.twilio.com/)
2. Перейдіть до **Verify** → **Services**
3. Натисніть **Create new Service**
4. Введіть **Friendly Name** (наприклад, "Coldi.ai Verification")
5. Скопіюйте **Service SID** (починається з `VA...`)

### Варіант B: Через API

```bash
curl -X POST https://verify.twilio.com/v2/Services \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
  -d FriendlyName="Coldi.ai Verification"
```

## Крок 3: Налаштувати змінні оточення в Vercel

Додайте наступні змінні в Vercel Dashboard → Settings → Environment Variables:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Або використовуйте API Key (рекомендовано для production):**

```
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=your_api_secret_here
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Примітка:** Якщо використовуєте API Key, потрібно оновити код в `route.ts`, щоб використовувати API Key замість Account SID + Auth Token.

## Крок 4: Використання нового роуту

Новий роут доступний за адресою: `/api/sms/verify-twilio`

### Відправка коду:

```typescript
const response = await fetch('/api/sms/verify-twilio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '+1234567890' }),
});
```

### Перевірка коду:

```typescript
const response = await fetch('/api/sms/verify-twilio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '+1234567890', code: '123456' }),
});
```

## Порівняння з поточним підходом

| Функція | Поточний (webhook) | Twilio Verify API |
|---------|-------------------|-------------------|
| Генерація кодів | Власна логіка | Twilio |
| Зберігання кодів | Supabase | Twilio |
| Rate limiting | Власна логіка | Вбудований |
| Валідація номерів | Власна логіка | Twilio |
| Обробка помилок | Власна логіка | Twilio |
| Залежності | n8n webhook | Пряма інтеграція |

## Міграція з поточного роуту

1. Оновіть компоненти форм, щоб використовувати `/api/sms/verify-twilio` замість `/api/sms/verify-code`
2. Можна видалити таблиці `sms_verification_codes` та `sms_rate_limits` з Supabase (якщо не використовуються в інших місцях)
3. Видаліть залежність від n8n webhook

## Документація Twilio

- [Twilio Verify API Overview](https://www.twilio.com/docs/verify/api)
- [Verify SMS Overview](https://www.twilio.com/docs/verify/quickstarts/sms)
- [Error Codes](https://www.twilio.com/docs/api/errors)

