const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://viralhooklab.com";

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google-analytics.com https://clerk.viralhooklab.com https://*.clerk.accounts.dev https://challenges.cloudflare.com",
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google-analytics.com https://clerk.viralhooklab.com https://*.clerk.accounts.dev https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://clerk.viralhooklab.com https://*.clerk.accounts.dev",
  "img-src 'self' data: blob: https://www.google-analytics.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://*.g.doubleclick.net https://clerk.viralhooklab.com https://*.clerk.accounts.dev https://img.clerk.com",
  "font-src 'self' data: https://clerk.viralhooklab.com https://*.clerk.accounts.dev",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://pagead2.googlesyndication.com https://clerk.viralhooklab.com https://*.clerk.accounts.dev https://*.clerk.services https://challenges.cloudflare.com",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://clerk.viralhooklab.com https://*.clerk.accounts.dev https://accounts.viralhooklab.com https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
];

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_SITE_URL: SITE_URL,
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
