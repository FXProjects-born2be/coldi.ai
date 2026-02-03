# Data Flow — coldi.ai

Текстовий опис архітектури та потоків даних.

---

## Загальна архітектура

Користувач заходить на сайт по HTTPS (порт 443). Трафік може проходити через Cloudflare (DDoS, WAF, rate limiting, SSL), потім потрапляє в Vercel Edge Network. Vercel обслуговує Next.js: фронтенд (React), API routes (serverless functions) та статичні файли.

Сайт розміщений на Vercel; зовні доступні лише HTTP/HTTPS. SSH та прямий доступ до БД не використовуються.

---

## Основні форми та API

### Call Request (`/api/request-call`)

Користувач відправляє POST з даними форми (name, email, phone, industry, company, scenario, agent, turnstileToken) та honeypot-полями (website_url, company_website, business_url).

Порядок перевірок: перевірка, чи увімкнені форми (Supabase `system_config`); перевірка Vercel BotID (якщо бот — 403); читання body; бот-детекція через `detectBot`: honeypot, rate limit по IP/email/phone, підозрілі патерни та User-Agent (при блоці — 429 і лог [RATE LIMIT EXCEEDED] або [BOT DETECTED]); перевірка Cloudflare Turnstile; у відповіді — дані для подальших викликів `/api/retell-call` та `/api/hubspot-lead`.

### Lead Request (`/api/request-lead`)

Аналогічно: POST з полями форми та turnstileToken. Перевірки: forms status, BotID, detectBot (honeypot, rate limit, patterns), Turnstile. У відповіді — дані для виклику `/api/hubspot-lead`.

### Pricing Request (`/api/request-pricing`)

Та сама схема: forms status, BotID, detectBot, Turnstile, повернення даних для виклику `/api/hubspot-lead`.

---

## Другорядні API (після відправки форми)

Клієнт викликає їх після успішної відправки форми.

- **`/api/retell-call`** — перевірка BotID, перевірка forms status, виклик Retell AI API для ініціації дзвінка.
- **`/api/hubspot-lead`** — BotID, forms status, відправка ліда в HubSpot Forms API.

---

## SMS-верифікація

**`/api/sms/send-code`**  
POST: phone, turnstileToken, csrfToken. Перевірка BotID (без авторизації), валідація та споживання CSRF-токена, отримання webhook URL з system status, генерація 6-значного коду, збереження в Supabase (sms_codes), відправка SMS через Twilio. Якщо BotID визначає бота — 403 (запити з сторінки мають мати BotID-заголовки).

**`/api/sms/verify-code`**  
POST: phone, code. Перевірка коду в Supabase, перевірка терміну дії та що код не використаний, позначення як використаний, повернення статусу. Детальне логування (IP, user-agent, referer, email, phone) для аналітики.

---

## Адмін та службові API

**`/api/forms-control`**  
GET — поточний статус форм (enabled/disabled) з Supabase.  
POST — встановлення статусу (action: enable/disable). Авторизація через заголовок `Authorization: Bearer <API_SECRET>` або `FORMS_CONTROL_SECRET`; якщо секрет заданий і токен невірний — 401. BotID для цього ендпоінта не перевіряється (bypass), щоб можна було керувати формами з Postman або інших інструментів.

**`/api/save-article`**  
POST з multipart/form-data: file, metadata (JSON з originalArticle, title, category). Авторизація: `Authorization: Bearer <SAVE_ARTICLE_SECRET | API_SECRET>`. Завантаження файлу в Supabase Storage (bucket images), запис поста в таблицю posts. Без валідного токена — 401.

**`/api/retell-tg-notification`**  
Webhook від Retell: POST з JSON (event, call, retell_llm_dynamic_variables, recording_url тощо). Авторизацію вимкнено — ендпоінт приймає запити без Bearer. Обробка лише події `call_analyzed`; витягуються ім’я, email, phone, recording_url; відправка повідомлення (і при наявності — аудіо) в Telegram. Детальне логування кожного запиту (IP, user-agent, referer, origin) та помилок.

---

## Vercel Firewall

Правила брандмауера виконуються на краю мережі Vercel **до** потрапляння запиту в Next.js (API routes та серверний код). Можна налаштовувати дії за шляхом, країною, IP тощо.

**Рекомендовані правила:**

- **`/api/forms-control`** — правило з дією **Bypass** (пропуск без блокування), щоб GET/POST до цього ендпоінта не блокувались Vercel Bot Protection та іншими правилами. Це дозволяє керувати формами з Postman, скриптів або інших інструментів без браузера з BotID.
- Решту API та сторінок залишають під захистом за замовчуванням (Bot Protection, rate limiting тощо — за налаштуваннями проєкту в Vercel).

Правила Firewall мають пріоритет над кодом: якщо правило блокує запит, він не дійде до `checkBotId()` та логіки маршрутів.

---

## Захист та логування

**BotID (Vercel)**  
У request-call, request-lead, request-pricing, retell-call, hubspot-lead, sms/send-code, sms/verify-code використовується `checkBotId()`. Якщо заголовки BotID відсутні або запит визначено як бот — 403. Для форм з сторінки клієнт має ініціалізувати BotID (instrumentation-client.ts) і робити fetch з тих же доменів, щоб заголовки додавались.

**Анти-бот (anti-bot.ts)**  
У формах request-call, request-lead, request-pricing викликається `detectBot()`: перевірка honeypot-полів; rate limit по IP (3 за хвилину, 5 за годину), по email та phone (5 за годину); підозрілі патерни (наприклад, дуже коротке ім’я); User-Agent. При перевищенні ліміту повертається 429 і пишеться лог **[RATE LIMIT EXCEEDED]** з типом ліміту (ip_short, ip_long, email, phone), formType, IP, замаскованими email/phone, user-agent, referer та параметрами ліміту.

**Turnstile**  
У формах перевіряється turnstileToken через Cloudflare Turnstile API. При невалідному або відсутньому токені — помилка валідації.

---

## Зовнішні сервіси

- **Supabase** — HTTPS; таблиці: system_config, sms_codes, hubspot_notifications, posts; конфіг та коди.
- **Retell AI** — HTTPS; створення дзвінків та webhook для call_analyzed (retell-tg-notification).
- **HubSpot** — HTTPS; відправка лідов через Forms API.
- **Cloudflare Turnstile** — HTTPS; верифікація капчі.
- **Twilio** — HTTPS; відправка SMS (через webhook з system status).
- **Telegram** — HTTPS; бот для нотифікацій з Retell (retell-tg-notification).

---

## Порти та протоколи

Вхідний трафік: HTTPS 443, HTTP 80 (редирект на HTTPS).  
Вихідний: лише HTTPS 443 до Supabase, Retell, HubSpot, Cloudflare Turnstile, Twilio, Telegram. SSH та прямі порти до БД не використовуються.
