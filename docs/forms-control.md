# Forms Control API

System for managing form availability on the website.

## API Endpoints

### GET /api/forms-control
Get current forms status.

**Response:**
```json
{
  "status": "enabled" | "disabled",
  "enabled": true | false
}
```

### POST /api/forms-control
Set forms status (enable/disable).

**Authorization:**
- Header: `Authorization: Bearer <FORMS_CONTROL_SECRET>`
- Or set the environment variable `FORMS_CONTROL_SECRET` for protection

**Request Body:**
```json
{
  "action": "enable" | "disable"
}
```

**Or via query parameter:**
```
POST /api/forms-control?action=disable
```

**Response:**
```json
{
  "success": true,
  "status": "enabled" | "disabled",
  "message": "Forms are now enabled"
}
```

## Usage

### Disable all forms:
```bash
curl -X POST https://your-domain.com/api/forms-control \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"action": "disable"}'
```

### Enable all forms:
```bash
curl -X POST https://your-domain.com/api/forms-control \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"action": "enable"}'
```

### Check status:
```bash
curl https://your-domain.com/api/forms-control
```

## Setup

1. Create the `system_config` table in Supabase (use `docs/system_config_table.sql`)

2. Add environment variable (optional for protection):
   ```
   FORMS_CONTROL_SECRET=your-secret-token
   ```

## Protected API Routes

The following API routes automatically check forms status:
- `/api/request-call` - call request form
- `/api/request-lead` - lead request form
- `/api/request-pricing` - pricing request form

If forms are disabled, all requests to these endpoints return status `503` with a blocking message.

## Technical Details

- Status is stored in the `system_config` table in Supabase
- Caching is used for 1 minute for optimization
- Forms are enabled by default (`enabled`)
