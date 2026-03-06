const ALLOWED_CRAWLERS = [
  "googlebot",
  "adsbot-google",
  "google-inspectiontool",
  "bingbot",
  "duckduckbot",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
];

const BLOCKED_BOT_SIGNATURES = [
  "sqlmap",
  "nikto",
  "nmap",
  "masscan",
  "zgrab",
  "acunetix",
  "nessus",
  "dirbuster",
  "gobuster",
  "crawler4j",
  "httpclient",
  "python-requests",
  "scrapy",
];

const SUSPICIOUS_URL_PATTERNS = [
  "<script",
  "%3cscript",
  "union+select",
  "union%20select",
  "drop+table",
  "wp-admin",
  "../",
  "..%2f",
];

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export function isAllowedCrawler(userAgent: string) {
  const normalized = userAgent.toLowerCase();
  return ALLOWED_CRAWLERS.some((crawler) => normalized.includes(crawler));
}

export function isBlockedBot(userAgent: string) {
  const normalized = userAgent.toLowerCase();
  return BLOCKED_BOT_SIGNATURES.some((signature) => normalized.includes(signature));
}

export function isSuspiciousRequestUrl(pathname: string, search: string) {
  const target = `${pathname}${search}`.toLowerCase();
  return SUSPICIOUS_URL_PATTERNS.some((pattern) => target.includes(pattern));
}

export function hasValidJsonContentType(contentType: string | null) {
  if (!contentType) {
    return false;
  }
  return contentType.toLowerCase().includes("application/json");
}

export function getRequestBodyLength(contentLengthHeader: string | null) {
  const parsed = Number(contentLengthHeader || "0");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
