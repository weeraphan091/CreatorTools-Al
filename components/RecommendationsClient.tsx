"use client";

import { trackEvent } from "@/lib/analytics";

type Recommendation = {
  title: string;
  description: string;
  href: string;
  category: string;
};

const recommendations: Recommendation[] = [
  {
    title: "Vercel",
    description: "Fast Next.js hosting with preview deployments and edge features.",
    href: "https://vercel.com",
    category: "Hosting",
  },
  {
    title: "Google Search Console",
    description: "Essential for indexing, CTR optimization, and query research.",
    href: "https://search.google.com/search-console",
    category: "SEO",
  },
  {
    title: "Google Analytics (GA4)",
    description: "Track conversions like generate clicks, saves, shares, and outbound clicks.",
    href: "https://analytics.google.com",
    category: "Analytics",
  },
  {
    title: "Canva",
    description: "Create thumbnails, carousels, and social templates quickly.",
    href: "https://www.canva.com",
    category: "Design",
  },
  {
    title: "Notion",
    description: "Build a content system: hook library, ideas backlog, and publishing calendar.",
    href: "https://www.notion.so",
    category: "Workflow",
  },
  {
    title: "Ahrefs Webmaster Tools",
    description: "Lightweight SEO auditing and link insights for early-stage growth.",
    href: "https://ahrefs.com/webmaster-tools",
    category: "SEO",
  },
];

export default function RecommendationsClient() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {recommendations.map((item) => (
        <article key={item.title} className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{item.category}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer sponsored"
            onClick={() => trackEvent("outbound_recommendation_click", { label: item.title, category: item.category })}
            className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Visit site
          </a>
        </article>
      ))}
    </section>
  );
}

