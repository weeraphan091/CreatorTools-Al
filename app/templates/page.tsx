import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site";
import { templatePages } from "@/lib/templates";

export const metadata: Metadata = {
  title: "AI Content Templates",
  description:
    "Browse SEO-focused AI template pages for YouTube titles, TikTok captions, hooks, bios, ad headlines, and more.",
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "AI Content Templates | ViralHookLab.com",
    description: "Long-tail AI generator templates designed to rank and convert.",
    url: "/templates",
  },
};

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Templates", href: "/templates" },
        ]}
      />
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">AI Templates for Creators and Marketers</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Use these long-tail template pages to quickly generate platform-specific marketing copy and content ideas.
        </p>
      </section>

      <AdBanner slot="Templates Top Banner" adSlotId={siteConfig.ads.templatesIndex} />

      <section className="grid gap-4 md:grid-cols-2">
        {templatePages.map((page) => (
          <article key={page.slug} className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{page.keyword}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{page.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{page.description}</p>
            <Link
              href={`/templates/${page.slug}`}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Open Template
            </Link>
          </article>
        ))}
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Need more keyword coverage?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Explore additional long-tail use cases by industry and audience segment.
        </p>
        <Link
          href="/use-cases"
          className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Browse Use Cases
        </Link>
      </section>
    </div>
  );
}
