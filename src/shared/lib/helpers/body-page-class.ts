export function getBodyPageClass(pathname: string): string {
  const slug =
    pathname
      .split('?')[0]
      .replace(/^\/+|\/+$/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'home';

  return `page-${slug}`;
}
