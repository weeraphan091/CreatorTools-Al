import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import { getFeaturedUseCases } from "@/lib/useCases";

export const metadata: Metadata = {
  title: "AI Tools",
  description: "Browse all 20 AI generators for creators, marketers, and businesses.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "ViralHookLab.com Tools",
    description: "Generate titles, hooks, bios, ads, CTAs, and more with free AI tools.",
    url: "/tools",
  },
};

export default function ToolsPage() {
  const useCases = getFeaturedUseCases(9);
  const toolsByCategory = categories.map((category) => ({
    category,
    items: tools.filter((tool) => tool.categoryId === category.id),
  }));

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
        ]}
      />
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">All AI Tools</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Pick a generator, enter your topic, and instantly get 5 high-converting ideas.
        </p>
      </section>

      <AdBanner slot="Tools Listing Banner" adSlotId={siteConfig.ads.toolsListing} />

      <section className="space-y-10">
        {toolsByCategory.map(({ category, items }) => (
          <div key={category.id} className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{category.label}</h2>
                <p className="mt-1 text-sm text-slate-600">{category.seoDescription}</p>
              </div>
              <Link href={category.href} className="text-sm font-semibold text-brand-700 hover:text-brand-600">
                View {category.label} page →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Need long-tail SEO angles?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use our template hub with niche pages like creator, ecommerce, and ad campaign use cases.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/templates"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Open Templates
          </Link>
          <Link
            href="/use-cases"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Open Use Cases
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Popular Long-Tail Landing Pages</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((page) => (
            <Link
              key={page.slug}
              href={`/use-cases/${page.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {page.searchTerm}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
