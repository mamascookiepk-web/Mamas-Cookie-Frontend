/**
 * Lightweight, dependency-free JWT helpers for the client.
 * We only ever READ the payload here (never trust it for security) — the
 * backend still verifies the signature on every request. This is purely so the
 * UI can tell when a token has expired and drop the stale logged-in state.
 */

function decodePayload(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * True when the token is missing, malformed, or past its `exp` claim.
 * A token with no `exp` is treated as valid (never expires client-side).
 */
export function isTokenExpired(token) {
  if (!token) return true;
  const payload = decodePayload(token);
  if (!payload) return true;
  if (!payload.exp) return false;
  return payload.exp * 1000 <= Date.now();
}
