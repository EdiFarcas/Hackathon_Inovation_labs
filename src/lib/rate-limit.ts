type Entry = {
  count: number;
  resetAt: number;
};

const ipStore = new Map<string, Entry>();

export function isRateLimited(ipKey: string, maxHits = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = ipStore.get(ipKey);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ipKey, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxHits) {
    return true;
  }

  entry.count += 1;
  ipStore.set(ipKey, entry);
  return false;
}
