export const PUBLIC_PREFIX = '/arena-fps';

/** Normalize root and canonical subpath requests to a dist-relative path. */
export function normalizePublicPath(pathname, search = '') {
  if (pathname === PUBLIC_PREFIX) {
    return { redirect: `${PUBLIC_PREFIX}/${search}`, pathname: '/' };
  }
  return {
    redirect: null,
    pathname: pathname.startsWith(`${PUBLIC_PREFIX}/`)
      ? pathname.slice(PUBLIC_PREFIX.length)
      : pathname,
  };
}

