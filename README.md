# ViralHookLab.com

A full AI tools website built with **Next.js 14 App Router**, **TypeScript**, **TailwindCSS**, and **Gemini/OpenAI APIs**.

## Features

- 10 AI content generation tools with dynamic routes
- `/api/generate` endpoint using `gpt-4o-mini`
- API rate limiting and in-memory result caching to control OpenAI cost
- Blog system with SEO metadata per post
- 30+ blog posts across creator marketing keyword clusters
- Template landing pages for long-tail SEO keyword targeting
- Programmatic use-case pages for audience + tool keyword combinations
- 600+ programmatic use-case pages generated (with auto quality scoring)
- Automatic `noindex` filter for low-quality long-tail pages
- Technical SEO: `robots.txt`, `sitemap.xml`, JSON-LD schema, canonicals
- Breadcrumb schema + intent-based internal linking
- Trust pages: contact, privacy, terms, editorial policy
- SEO keyword map page at `/seo-keyword-map`
- RSS feed at `/feed.xml`
- Analytics + AdSense script support via environment variables
- Security hardening: HTTP security headers, middleware bot filtering, input sanitization, strict CORS, and API rate limiting
- Homepage, tools listing, tool details, blog, and about pages
- Reusable components (Navbar, Footer, ToolCard, GeneratorForm, ResultList, AdBanner)
- Monetization-ready blocks for Google AdSense and partner recommendations
- Server actions example for newsletter signup
- Mobile responsive, modern SaaS card layout

## Tool Routes

- `/tools/youtube-title-generator`
- `/tools/tiktok-caption-generator`
- `/tools/ai-hook-generator`
- `/tools/instagram-bio-generator`
- `/tools/ad-headline-generator`
- `/tools/blog-title-generator`
- `/tools/product-description-generator`
- `/tools/brand-name-generator`
- `/tools/slogan-generator`
- `/tools/call-to-action-generator`

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

Generation provider priority:

1. `GEMINI_API_KEY` (or `GOOGLE_API_KEY`)
2. `OPENAI_API_KEY`
3. Fallback sample results (if no key is set)

## Security Controls Included

- Strict HTTP headers configured in `next.config.js`:
  - `Content-Security-Policy`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Strict-Transport-Security`
- Input sanitization and suspicious-pattern validation in server actions and API routes
- IP-based rate limiting in both `middleware.ts` and `/api/generate`
- CORS allowlist and origin validation via `ALLOWED_ORIGINS`
- Basic anti-bot and suspicious-request filtering in middleware
- Anti-spam checks for API payloads (content-type, honeypot field, request timestamp)

## Traffic + Monetization Setup

1. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.
2. Configure GA4 and connect `NEXT_PUBLIC_GA_ID`.
3. Enable AdSense and set `NEXT_PUBLIC_ADSENSE_CLIENT`.
4. Set `NEXT_PUBLIC_ADSENSE_SLOT_*` values in environment variables to render real ad units.
5. Publish new template/blog pages weekly to grow long-tail organic traffic.
6. Expand `lib/useCases.ts` with new audiences to create additional indexable pages quickly.

## Deploy

Deploy directly to Vercel. This project is ready for standard Next.js deployment.
