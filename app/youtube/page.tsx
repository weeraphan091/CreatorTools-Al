import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { categories } from "@/lib/categories";
import { tools } from "@/lib/tools";

const category = categories.find((item) => item.id === "youtube")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
  alternates: { canonical: category.href },
  openGraph: {
    title: `${category.seoTitle} | ViralHookLab.com`,
    description: category.seoDescription,
    url: category.href,
  },
};

export default function YouTubeCategoryPage() {
  const categoryTools = tools.filter((tool) => tool.categoryId === "youtube");

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.label, href: category.href }]} />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">{category.seoTitle}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{category.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/youtube-title-generator"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Open a YouTube tool
          </Link>
          <Link
            href="/tools"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            View all tools
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">YouTube tools</h2>
        <p className="mt-2 text-sm text-slate-600">Title angles, hooks, and channel ideas to improve CTR and discovery.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

