import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import AffiliateBlock from "@/components/AffiliateBlock";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/lib/site";
import { getTemplateBySlug, templatePages } from "@/lib/templates";
import { getToolBySlug } from "@/lib/tools";

type TemplatePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return templatePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const page = getTemplateBySlug(params.slug);
  if (!page) {
    return {
      title: "Template Not Found",
      description: "This template page does not exist.",
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [page.keyword],
    alternates: {
      canonical: `/templates/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}/templates/${page.slug}`,
    },
  };
}

export default function TemplateDetailPage({ params }: TemplatePageProps) {
  const page = getTemplateBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const tool = getToolBySlug(page.toolSlug);

  return (
    <div className="space-y-6">
      <section className="card p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{page.keyword}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{page.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{page.description}</p>
        {tool ? (
          <Link
            href={`/tools/${tool.slug}`}
            className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Use {tool.title}
          </Link>
        ) : null}
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Quick Optimization Checklist</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {page.tips.map((tip) => (
            <li key={tip} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdBanner slot={`${page.title} Banner`} />
        <AffiliateBlock title="Affiliate Offer: Creator Marketing Toolkit" />
      </div>

      {tool ? (
        <FAQSection
          title={`${tool.title} FAQ`}
          items={tool.faqs}
        />
      ) : null}
    </div>
  );
}
