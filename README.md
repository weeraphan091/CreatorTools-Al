# CreatorTools AI

A full AI tools website built with **Next.js 14 App Router**, **TypeScript**, **TailwindCSS**, and **OpenAI API**.

## Features

- 10 AI content generation tools with dynamic routes
- `/api/generate` endpoint using `gpt-4o-mini`
- Blog system with SEO metadata per post
- Homepage, tools listing, tool details, blog, and about pages
- Reusable components (Navbar, Footer, ToolCard, GeneratorForm, ResultList, AdBanner)
- Monetization placeholders for Google Adsense and affiliate blocks
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

Create `.env.local`:

```bash
OPENAI_API_KEY=your_openai_api_key
```

If no API key is present, the API route returns fallback sample results.

## Deploy

Deploy directly to Vercel. This project is ready for standard Next.js deployment.
