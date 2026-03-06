import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAllowedOriginForRequest } from "@/lib/security/cors";
import { checkRateLimit } from "@/lib/security/rateLimit";
import {
  getClientIp,
  getRequestBodyLength,
  isAllowedCrawler,
  isBlockedBot,
  isSuspiciousRequestUrl,
} from "@/lib/security/request";

const API_WINDOW_MS = 10 * 60 * 1000;
const API_LIMIT = Number(process.env.API_RATE_LIMIT_GLOBAL || "120");
const API_MAX_BODY_BYTES = Number(process.env.API_MAX_BODY_BYTES || "20000");

function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export default clerkMiddleware((_, request) => {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const userAgent = request.headers.get("user-agent") || "";

  if (isSuspiciousRequestUrl(pathname, search)) {
    return forbidden("Suspicious request blocked.");
  }

  if (isBlockedBot(userAgent) && !isAllowedCrawler(userAgent)) {
    return forbidden("Blocked automated traffic.");
  }

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const method = request.method.toUpperCase();
  if (pathname === "/api/health" && method === "GET") {
    return NextResponse.next();
  }
  if (!["POST", "OPTIONS"].includes(method)) {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit({
    key: `mw:api:${ip}`,
    limit: API_LIMIT,
    windowMs: API_WINDOW_MS,
  });

  if (!rate.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000));
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
    response.headers.set("Retry-After", String(retrySeconds));
    return response;
  }

  const bodyLength = getRequestBodyLength(request.headers.get("content-length"));
  if (bodyLength > API_MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
    return forbidden("Cross-site API request blocked.");
  }

  if (method === "POST") {
    const isWebhook = pathname.startsWith("/api/webhooks/");
    const isCheckout = pathname === "/api/stripe/checkout";
    if (isWebhook) {
      return NextResponse.next();
    }

    const origin = request.headers.get("origin");
    const allowedOrigin = getAllowedOriginForRequest(origin);
    if (process.env.NODE_ENV === "production" && !origin) {
      const referer = request.headers.get("referer");
      const isSameSiteCheckout = isCheckout && referer && (() => {
        try {
          return new URL(referer).origin === request.nextUrl.origin;
        } catch {
          return false;
        }
      })();
      if (!isSameSiteCheckout) {
        return forbidden("Missing origin header.");
      }
    }

    if (origin && !allowedOrigin) {
      return forbidden("Origin is not allowed.");
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|feed.xml|opengraph-image|twitter-image).*)",
  ],
};
