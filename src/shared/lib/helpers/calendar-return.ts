const CALENDAR_RETURN_KEY = 'calendarReturnPath';

const isCalendarPath = (path: string) => path === '/calendar' || path.startsWith('/calendar/');

const isSafeReturnPath = (path: string) =>
  path.startsWith('/') && !path.startsWith('//') && !path.includes('://') && !isCalendarPath(path);

export const rememberCalendarReturn = (path: string, search = '') => {
  if (typeof window === 'undefined' || isCalendarPath(path)) return;

  const nextPath = `${path}${search}`;
  if (!isSafeReturnPath(nextPath)) return;

  try {
    sessionStorage.setItem(CALENDAR_RETURN_KEY, nextPath);
  } catch {
    // ignore storage errors
  }
};

export const getCalendarReturnPath = () => {
  try {
    const stored = sessionStorage.getItem(CALENDAR_RETURN_KEY);
    if (stored && isSafeReturnPath(stored)) return stored;
  } catch {
    // ignore storage errors
  }

  return '/';
};
