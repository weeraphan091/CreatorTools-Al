import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Tools",
  description: "Browse all 10 AI generators for creators, marketers, and businesses.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "CreatorTools AI Tools",
    description: "Generate titles, hooks, bios, ads, CTAs, and more with free AI tools.",
    url: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">All AI Tools</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Pick a generator, enter your topic, and instantly get 5 high-converting ideas.
        </p>
      </section>

      <AdBanner slot="Tools Listing Banner" />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Need long-tail SEO angles?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use our template hub with niche pages like creator, ecommerce, and ad campaign use cases.
        </p>
        <Link
          href="/templates"
          className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Open Templates
        </Link>
      </section>
    </div>
  );
}
