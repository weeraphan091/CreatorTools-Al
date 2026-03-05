import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllUseCasePages } from "@/lib/useCases";

const allUseCasePages = getAllUseCasePages();

export const metadata: Metadata = {
  title: "AI Tool Use Cases",
  description:
    "Explore long-tail AI generator use cases by niche and industry. Find pages for creators, ecommerce, SaaS, agencies, and more.",
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    title: "AI Tool Use Cases | CreatorTools AI",
    description:
      "Find use-case pages for YouTube titles, TikTok captions, hooks, bios, ad copy, and conversion-focused CTAs.",
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Use Cases", href: "/use-cases" },
        ]}
      />
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">Programmatic SEO Use Cases</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Browse long-tail pages built around high-intent combinations of tools and audiences. These pages are
          designed to match specific search queries and direct users to the right generator.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Total landing pages: <span className="font-semibold text-slate-700">{allUseCasePages.length}</span>
        </p>
      </section>

      <AdBanner slot="Use Cases Listing Banner" />

      <section className="grid gap-4 md:grid-cols-2">
        {allUseCasePages.map((page) => (
          <article key={page.slug} className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{page.searchTerm}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{page.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{page.description}</p>
            <Link
              href={`/use-cases/${page.slug}`}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Open Use Case
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
