# Forms Control API - Postman Setup Guide

## Проблема: Vercel Security Checkpoint (429)

Якщо ви отримуєте `429 Too Many Requests` з HTML сторінкою "Vercel Security Checkpoint", це означає, що Vercel блокує запит на рівні платформи ДО того, як він дійде до нашого коду.

## Рішення для Postman

### Варіант 1: Додати правильні Headers (Рекомендовано)

У Postman додайте наступні headers:

1. **Authorization** (якщо `FORMS_CONTROL_SECRET` встановлено):
   ```
   Authorization: Bearer YOUR_SECRET_TOKEN
   ```

2. **User-Agent** (щоб Vercel не визначав Postman як бота):
   ```
   User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
   ```

3. **Referer** (опціонально):
   ```
   Referer: https://staging.coldi.ai/
   ```

4. **Origin** (опціонально):
   ```
   Origin: https://staging.coldi.ai
   ```

### Варіант 2: Налаштувати Vercel Firewall Rules

Якщо проблема залишається, налаштуйте Vercel Firewall Rules:

1. Перейдіть до Vercel Dashboard → Ваш проект → Settings → Firewall
2. Створіть нове правило:
   - **Path**: `/api/forms-control`
   - **Action**: Allow
   - **Condition**: IP whitelist (ваші IP адреси) або User-Agent contains "Postman"

### Варіант 3: Використовувати Vercel Protection Bypass (якщо увімкнено)

Якщо у вашому проекті увімкнено Deployment Protection:

1. Перейдіть до Vercel Dashboard → Ваш проект → Settings → Deployment Protection
2. Згенеруйте Bypass Secret
3. Додайте header у Postman:
   ```
   x-vercel-protection-bypass: YOUR_BYPASS_SECRET
   ```

## Правильна конфігурація Postman

### GET /api/forms-control

**Method**: `GET`  
**URL**: `https://staging.coldi.ai/api/forms-control`

**Headers**:
```
Authorization: Bearer YOUR_SECRET_TOKEN (якщо встановлено)
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

### POST /api/forms-control

**Method**: `POST`  
**URL**: `https://staging.coldi.ai/api/forms-control?action=enable`

**Headers**:
```
Authorization: Bearer YOUR_SECRET_TOKEN (якщо встановлено)
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Referer: https://staging.coldi.ai/
Origin: https://staging.coldi.ai
```

**Body** (опціонально, якщо не використовуєте query params):
```json
{
  "action": "enable"
}
```

## Перевірка

Після налаштування ви повинні отримати JSON відповідь замість HTML сторінки Security Checkpoint:

**Успішна відповідь**:
```json
{
  "success": true,
  "status": "enabled",
  "message": "Forms are now enabled"
}
```

**Помилка авторизації**:
```json
{
  "error": "Unauthorized"
}
```

## Troubleshooting

1. **429 Too Many Requests**: Додайте User-Agent header
2. **403 Bot detected**: Перевірте Authorization token
3. **401 Unauthorized**: Перевірте, чи правильно встановлено `FORMS_CONTROL_SECRET` та чи передаєте правильний токен
