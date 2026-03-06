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

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL?.trim() || "";
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || "";

function sweepExpiredEntries(now: number) {
  for (const [entryKey, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(entryKey);
    }
  }
}

async function checkRateLimitWithRedis({
  key,
  limit,
  windowMs,
}: CheckRateLimitParams): Promise<CheckRateLimitResult | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;

  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const now = Date.now();
  const redisKey = `ratelimit:${key}`;

  const response = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["EXPIRE", redisKey, windowSeconds, "NX"],
      ["TTL", redisKey],
    ]),
    cache: "no-store",
  });

  if (!response.ok) return null;
  const payload = (await response.json().catch(() => null)) as
    | { result?: Array<{ result?: unknown }> }
    | null;
  const resultRows = payload?.result;
  if (!resultRows || resultRows.length < 3) return null;

  const count = Number(resultRows[0]?.result || 0);
  const ttl = Number(resultRows[2]?.result || windowSeconds);
  if (!Number.isFinite(count) || count <= 0) return null;

  const resetAt = now + Math.max(1, ttl) * 1000;
  const allowed = count <= limit;
  const remaining = Math.max(0, limit - count);
  return { allowed, remaining, resetAt };
}

export async function checkRateLimit({
  key,
  limit,
  windowMs,
}: CheckRateLimitParams): Promise<CheckRateLimitResult> {
  const distributed = await checkRateLimitWithRedis({ key, limit, windowMs }).catch(() => null);
  if (distributed) return distributed;

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
