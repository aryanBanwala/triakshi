export function setWithExpiry<T>(key: string, value: T, ttlMs: number) {
  const payload = { value, expiresAt: Date.now() + ttlMs };
  sessionStorage.setItem(key, JSON.stringify(payload)); // sessionStorage on purpose
}

export function getWithExpiry<T>(key: string): T | null {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    const { value, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      sessionStorage.removeItem(key);
      return null;
    }
    return value as T;
  } catch {
    sessionStorage.removeItem(key);
    return null;
  }
}
