# Налаштування SMS верифікації для Vercel

## Що зберігається в Supabase

SMS коди тепер зберігаються в **Supabase PostgreSQL базі даних**, а не в пам'яті сервера. Це працює на Vercel serverless.

## Крок 1: Створити таблиці в Supabase

1. Відкрийте Supabase Dashboard → SQL Editor
2. Виконайте SQL з файлу `supabase-sms-codes-migration.sql`:

```sql
-- Create table for SMS verification codes
CREATE TABLE IF NOT EXISTS sms_verification_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE
);

-- Create index on phone for fast lookups
CREATE INDEX IF NOT EXISTS idx_sms_codes_phone ON sms_verification_codes(phone);
CREATE INDEX IF NOT EXISTS idx_sms_codes_expires_at ON sms_verification_codes(expires_at);

-- Create table for SMS rate limiting
CREATE TABLE IF NOT EXISTS sms_rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  last_sms_sent TIMESTAMPTZ NOT NULL,
  attempts_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on phone for fast lookups
CREATE INDEX IF NOT EXISTS idx_sms_rate_limits_phone ON sms_rate_limits(phone);
```

## Крок 2: Перевірити змінні оточення

Переконайтеся, що в Vercel є такі змінні:
- `NEXT_PUBLIC_SUPABASE_URL` - URL вашого Supabase проекту
- `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key (не anon key!)

## Крок 3: Очищення застарілих кодів (опціонально)

Можна додати cron job для автоматичного очищення застарілих кодів. Створіть файл `src/app/api/cron/cleanup-sms-codes/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Delete expired or verified codes
    const { error } = await supabase
      .from('sms_verification_codes')
      .delete()
      .or('expires_at.lt.' + new Date().toISOString() + ',verified.eq.true');

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Cleaned up SMS codes' });
  } catch (error) {
    console.error('Error cleaning up SMS codes:', error);
    return NextResponse.json({ error: 'Failed to cleanup' }, { status: 500 });
  }
}
```

Потім налаштуйте Vercel Cron Job для виклику цього endpoint кожні 30 хвилин.

## Де зберігаються коди?

- **Таблиця:** `sms_verification_codes` в Supabase PostgreSQL
- **Таблиця rate limiting:** `sms_rate_limits` в Supabase PostgreSQL
- **Місце:** Supabase Cloud (не в браузері, не в cookies, не в localStorage)
- **Доступ:** Тільки через API з Service Role Key

## Як це працює:

1. Користувач натискає "Send Verification Code"
2. Сервер генерує 6-значний код
3. Код зберігається в `sms_verification_codes` таблиці в Supabase
4. SMS відправляється через вебхук
5. Користувач вводить код
6. Сервер перевіряє код з бази даних
7. Після верифікації код позначається як `verified = true`

## Переваги:

✅ Працює на Vercel serverless  
✅ Коди зберігаються між запитами  
✅ Не втрачаються при перезапуску сервера  
✅ Rate limiting працює правильно  
✅ Автоматичне очищення застарілих кодів

