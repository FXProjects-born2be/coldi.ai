/**
 * System status management for primary/reserve mode switching
 *
 * Status values:
 * - 'primary': Normal operation mode
 * - 'reserve': Reserve mode (fallback)
 */

export type SystemStatus = 'primary' | 'reserve';

const SUSPEND_CHECK_URL = 'https://aitassistance.app.n8n.cloud/webhook/suspend_check';
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds

// Global variable to store system status
// Defaults to 'primary' if not set
// Note: This is reset on each serverless function cold start,
// but will be updated by the cron job every 10 minutes
let systemStatus: SystemStatus | null = null;

/**
 * Get current system status
 * Returns 'primary' as default if status hasn't been set yet
 */
export function getSystemStatus(): SystemStatus {
  // If status hasn't been initialized, default to primary
  // The cron job will update it within 10 minutes
  return systemStatus ?? 'primary';
}

/**
 * Set system status
 */
export function setSystemStatus(status: SystemStatus): void {
  systemStatus = status;
  console.log(`[System Status] Changed to: ${status}`);
}

/**
 * Check if system is in reserve mode
 */
export function isReserveMode(): boolean {
  return systemStatus === 'reserve';
}

/**
 * Get Retell phone number based on current status
 */
export function getRetellPhoneNumber(): string {
  return isReserveMode() ? '+447893936700' : '+447401271428';
}

/**
 * Get footer phone number based on current status
 */
export function getFooterPhoneNumber(): string {
  return isReserveMode() ? '+447427898400' : '+441299667777';
}

/**
 * Get SMS send code webhook URL based on current status
 */
export function getSmsSendCodeWebhookUrl(): string {
  if (isReserveMode()) {
    return (
      process.env.TWILIO_SEND_CODE_ENDPOINT_RESERVE ||
      'https://aitassistance.app.n8n.cloud/webhook/sms-for-site-reserve'
    );
  }
  return (
    process.env.TWILIO_SEND_CODE_ENDPOINT ||
    'https://aitassistance.app.n8n.cloud/webhook/sms-for-site-new'
  );
}

/**
 * Get SMS verify code webhook URL based on current status
 */
export function getSmsVerifyCodeWebhookUrl(): string {
  if (isReserveMode()) {
    return (
      process.env.TWILIO_VERIFY_CODE_ENDPOINT_RESERVE ||
      'https://aitassistance.app.n8n.cloud/webhook/sms-for-site-verify-reserve'
    );
  }
  return (
    process.env.TWILIO_VERIFY_CODE_ENDPOINT ||
    'https://aitassistance.app.n8n.cloud/webhook/sms-for-site-verify'
  );
}

/**
 * Check suspend status from external webhook
 * Updates systemStatus based on the response
 * This function is called on-demand to ensure fresh status
 */
export async function checkSuspendStatus(): Promise<SystemStatus> {
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(SUSPEND_CHECK_URL, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[System Status] HTTP error! status: ${response.status}`);
      // On HTTP error, switch to reserve mode
      setSystemStatus('reserve');
      return 'reserve';
    }

    const data = await response.json();
    console.log('[System Status] Suspend check response:', data);

    // Check response result
    const result = data?.result;

    if (result === 'ok') {
      // Account is active - switch to primary mode
      setSystemStatus('primary');
      return 'primary';
    } else if (result === 'error') {
      // Account is suspended - switch to reserve mode
      setSystemStatus('reserve');
      return 'reserve';
    } else {
      // Unknown response format - switch to reserve mode for safety
      console.warn('[System Status] Unknown response format:', data);
      setSystemStatus('reserve');
      return 'reserve';
    }
  } catch (error) {
    // Timeout or network error - switch to reserve mode
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[System Status] Request timeout (>30s)');
    } else {
      console.error('[System Status] Error checking suspend status:', error);
    }
    setSystemStatus('reserve');
    return 'reserve';
  }
}
