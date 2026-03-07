import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import ToolCard from "@/components/ToolCard";
import { categories } from "@/lib/categories";
import { absoluteUrl, truncateMetaTitle } from "@/lib/site";
import { tools } from "@/lib/tools";

const category = categories.find((item) => item.id === "seo-marketing")!;

const metaTitle = truncateMetaTitle(category.seoTitle);
export const metadata: Metadata = {
  title: metaTitle,
  description: category.seoDescription,
  alternates: { canonical: category.href },
  openGraph: {
    title: `${metaTitle} | ViralHookLab.com`,
    description: category.seoDescription,
    url: category.href,
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: category.seoDescription,
  },
};

export default function SeoMarketingCategoryPage() {
  const categoryTools = tools.filter((tool) => tool.categoryId === "seo-marketing");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.seoTitle,
    description: category.seoDescription,
    numberOfItems: categoryTools.length,
    itemListElement: categoryTools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.title,
      url: absoluteUrl(`/tools/${tool.slug}`),
    })),
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.label, href: category.href }]} />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">{category.seoTitle}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{category.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/google-business-profile-description-ai"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Open an SEO & Marketing tool
          </Link>
          <Link
            href="/tools"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            View all tools
          </Link>
        </div>
      </section>

      <section className="card p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Why SEO & Marketing Copy Matters</h2>
        <p className="mt-3 text-slate-600">{category.expandedIntro}</p>
        <p className="mt-4 text-slate-600">
          Use the tools below to generate meta descriptions, local SEO copy, and lead magnet ideas in seconds. Align
          your copy with search intent and improve CTR from search results and landing pages.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">SEO & Marketing Tools</h2>
        <p className="mt-2 text-sm text-slate-600">
          Meta descriptions, local SEO, lead magnets, user personas, and Quora answers.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="card p-8">
        <h2 className="text-2xl font-semibold text-slate-900">How to Use These Tools</h2>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-slate-600">
          <li>Choose a tool for your goal — meta descriptions, local SEO profiles, lead magnets, or personas.</li>
          <li>Enter your page URL, business info, or keyword and click Generate to get 5 optimized results.</li>
          <li>Pick the best output, fine-tune it for your brand, and deploy it on your site or listing.</li>
          <li>Track organic traffic, click-through rates, and conversions, then generate new variations to keep improving.</li>
        </ol>
      </section>

      <FAQSection title={`${category.label} AI Tools — FAQ`} items={category.faqs} />

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Related Resources</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/blog" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-brand-500 hover:text-brand-700">Blog</Link>
          <Link href="/templates" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-brand-500 hover:text-brand-700">Templates</Link>
          <Link href="/use-cases" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-brand-500 hover:text-brand-700">Use Cases</Link>
          <Link href="/tools" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-brand-500 hover:text-brand-700">All Tools</Link>
        </div>
      </section>
    </div>
  );
}
