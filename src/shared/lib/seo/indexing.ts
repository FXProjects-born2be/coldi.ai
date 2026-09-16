export const isSearchIndexable = () =>
  process.env.VERCEL_ENV === 'production' && process.env.VERCEL_GIT_COMMIT_REF !== 'dev';
