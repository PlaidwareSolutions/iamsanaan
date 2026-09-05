/**
 * Routes that open with a LocalNav (the apple.com product-page pattern).
 * On these, the global nav scrolls away on desktop and carries no call to
 * action — the local nav is the single sticky bar with the single button.
 */
export function hasLocalNav(pathname: string) {
  return /^\/products(\/|$)/.test(pathname) || /^\/services\/[^/]+$/.test(pathname);
}
