/**
 * Submission code management for securing secondary API routes
 * Codes are generated on main route submission and validated on secondary routes
 * Codes are stored in Supabase and validated against email + phone
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Code TTL: 5 minutes
const CODE_TTL_MS = 5 * 60 * 1000;

// Allowed routes that can use the code
const ALLOWED_ROUTES = ['retell-call', 'hubspot-lead'];

/**
 * Generate a new submission code
 * @param email - User email
 * @param phone - User phone number
 * @returns Submission code string
 */
export async function generateSubmissionCode(email: string, phone: string): Promise<string> {
  // Generate a random code
  const code = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;

  const expiresAt = new Date(Date.now() + CODE_TTL_MS).toISOString();

  try {
    const { error } = await supabase.from('submission_codes').insert({
      code,
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      expires_at: expiresAt,
      used_routes: [],
    });

    if (error) {
      console.error('[SUBMISSION-CODE] Error generating code:', error);
      throw error;
    }

    console.log('[SUBMISSION-CODE] Generated new code:', {
      code: code.substring(0, 50) + '...',
      email: email.substring(0, 20) + '...',
      expiresAt,
    });

    return code;
  } catch (error) {
    console.error('[SUBMISSION-CODE] Failed to generate code:', error);
    throw error;
  }
}

/**
 * Validate and mark submission code as used for a specific route
 * @param code - Submission code to validate
 * @param email - User email to verify
 * @param phone - User phone to verify
 * @param routeName - Route name that is using the code
 * @returns true if code is valid and was successfully marked as used, false otherwise
 */
export async function validateAndMarkSubmissionCode(
  code: string | undefined | null,
  email: string | undefined | null,
  phone: string | undefined | null,
  routeName: string
): Promise<boolean> {
  console.log('[SUBMISSION-CODE] Validating code:', {
    hasCode: !!code,
    hasEmail: !!email,
    hasPhone: !!phone,
    routeName,
  });

  if (!code || !email || !phone) {
    console.warn('[SUBMISSION-CODE] Missing required fields');
    return false;
  }

  if (!ALLOWED_ROUTES.includes(routeName)) {
    console.warn('[SUBMISSION-CODE] Invalid route name:', routeName);
    return false;
  }

  try {
    // Find code in database
    const { data, error } = await supabase
      .from('submission_codes')
      .select('*')
      .eq('code', code)
      .eq('email', email.toLowerCase().trim())
      .eq('phone', phone.trim())
      .single();

    if (error || !data) {
      console.warn('[SUBMISSION-CODE] Code not found or mismatch:', {
        error: error?.message,
        hasData: !!data,
      });
      return false;
    }

    // Check if code is expired
    const expiresAt = new Date(data.expires_at).getTime();
    if (expiresAt < Date.now()) {
      console.warn('[SUBMISSION-CODE] Code expired', {
        expiresAt,
        now: Date.now(),
      });
      // Delete expired code
      await supabase.from('submission_codes').delete().eq('code', code);
      return false;
    }

    // Check if this route has already used the code
    const usedRoutes = (data.used_routes as string[]) || [];
    if (usedRoutes.includes(routeName)) {
      console.warn('[SUBMISSION-CODE] Code already used by this route:', routeName);
      return false;
    }

    // Mark route as used
    const updatedUsedRoutes = [...usedRoutes, routeName];

    // Check if all allowed routes have used the code OR if hubspot-lead is used (for forms without retell)
    // For forms that only use hubspot-lead (request-lead, request-pricing), delete code after hubspot-lead
    // For forms that use both (request-call), delete code after both are used
    const allRoutesUsed = ALLOWED_ROUTES.every((route) => updatedUsedRoutes.includes(route));
    const hubspotUsed = updatedUsedRoutes.includes('hubspot-lead');
    const shouldDelete =
      allRoutesUsed || (hubspotUsed && !updatedUsedRoutes.includes('retell-call'));

    if (shouldDelete) {
      // Delete code after all required routes have used it
      const { error: deleteError } = await supabase
        .from('submission_codes')
        .delete()
        .eq('code', code);

      if (deleteError) {
        console.error('[SUBMISSION-CODE] Error deleting code:', deleteError);
      }

      console.log('[SUBMISSION-CODE] Code fully consumed, deleted', {
        usedRoutes: updatedUsedRoutes,
        reason: allRoutesUsed ? 'all routes used' : 'hubspot-only form completed',
      });
    } else {
      // Update code with new used route
      const { error: updateError } = await supabase
        .from('submission_codes')
        .update({ used_routes: updatedUsedRoutes })
        .eq('code', code);

      if (updateError) {
        console.error('[SUBMISSION-CODE] Error updating code:', updateError);
        return false;
      }

      console.log('[SUBMISSION-CODE] Code validated and marked as used for route:', routeName, {
        usedRoutes: updatedUsedRoutes,
      });
    }

    return true;
  } catch (error) {
    console.error('[SUBMISSION-CODE] Error validating code:', error);
    return false;
  }
}

/**
 * Delete submission code (cleanup after successful completion)
 * @param code - Submission code to delete
 */
export async function deleteSubmissionCode(code: string): Promise<void> {
  try {
    const { error } = await supabase.from('submission_codes').delete().eq('code', code);
    if (error) {
      console.error('[SUBMISSION-CODE] Error deleting code:', error);
    } else {
      console.log('[SUBMISSION-CODE] Code deleted:', code.substring(0, 30) + '...');
    }
  } catch (error) {
    console.error('[SUBMISSION-CODE] Error deleting code:', error);
  }
}
