import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Creator Marketing Blog",
  description:
    "Actionable growth guides, hook formulas, and copywriting frameworks for creators and marketers using AI tools.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Creator Marketing Blog | ViralHookLab.com",
    description: "Creator-focused growth and marketing playbooks with practical templates and examples.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">ViralHookLab.com Blog</h1>
        <p className="mt-3 text-slate-600">Actionable guides to help you grow faster with better content.</p>
      </section>

      <AdBanner slot="Blog Index Banner" adSlotId={siteConfig.ads.blogIndex} />

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">How to use these guides</h2>
          <p className="mt-2 text-sm text-slate-600">
            Each post is designed to be used with a generator. Pick a topic, generate variants, and test the best
            performers in your titles, hooks, captions, or ad creatives.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Start with one goal (CTR, watch time, leads, sales).</li>
            <li>Generate 10+ variants, then shortlist 3 for testing.</li>
            <li>Reuse winners across platforms to compound results.</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Open the AI Tools
            </Link>
            <Link
              href="/templates"
              className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Browse Templates
            </Link>
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Quality & transparency</h2>
          <p className="mt-2 text-sm text-slate-600">
            We aim to publish useful, testable playbooks and keep pages updated as platform behaviors change.
          </p>
          <Link
            href="/editorial-policy"
            className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            Read our editorial policy →
          </Link>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card p-6">
            <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Read Article
            </Link>
          </article>
        ))}
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">More SEO Landing Pages</h2>
        <p className="mt-2 text-sm text-slate-600">
          Looking for long-tail search pages? Explore template pages built around high-intent keyword variations.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/templates"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Browse Templates
          </Link>
          <Link
            href="/use-cases"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Browse Use Cases
          </Link>
        </div>
      </section>
    </div>
  );
}
