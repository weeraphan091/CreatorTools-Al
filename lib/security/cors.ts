import { siteConfig } from "@/lib/site";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function parseAllowedOriginsFromEnv() {
  const envValue = process.env.ALLOWED_ORIGINS || "";
  return envValue
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map(trimTrailingSlash);
}

export function getAllowedOrigins() {
  const defaults = [siteConfig.url, process.env.NEXT_PUBLIC_SITE_URL || ""]
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map(trimTrailingSlash);

  return Array.from(new Set([...parseAllowedOriginsFromEnv(), ...defaults]));
}

export function getAllowedOriginForRequest(origin: string | null) {
  if (!origin) {
    return null;
  }

  const normalizedOrigin = trimTrailingSlash(origin);
  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(normalizedOrigin) ? normalizedOrigin : null;
}

export function buildCorsHeaders(origin: string | null) {
  const allowedOrigin = getAllowedOriginForRequest(origin);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
    "Access-Control-Max-Age": "3600",
    Vary: "Origin",
  };

  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
  }

  return headers;
}
