type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type CheckRateLimitParams = {
  key: string;
  limit: number;
  windowMs: number;
};

type CheckRateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

const globalStore = globalThis as unknown as {
  securityRateLimitStore?: Map<string, RateLimitEntry>;
};

const store = globalStore.securityRateLimitStore ?? new Map<string, RateLimitEntry>();
globalStore.securityRateLimitStore = store;

function sweepExpiredEntries(now: number) {
  for (const [entryKey, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(entryKey);
    }
  }
}

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: CheckRateLimitParams): CheckRateLimitResult {
  const now = Date.now();

  // Keep memory bounded over time.
  if (store.size > 5000) {
    sweepExpiredEntries(now);
  }

  const current = store.get(key);
  if (!current || current.resetAt < now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  };
}
