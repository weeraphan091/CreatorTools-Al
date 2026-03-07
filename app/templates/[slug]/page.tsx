import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import AffiliateBlock from "@/components/AffiliateBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import IntentLinkSection from "@/components/IntentLinkSection";
import { getIntentMatchedLinks } from "@/lib/intentLinks";
import { siteConfig, truncateMetaTitle } from "@/lib/site";
import { getTemplateBySlug, templatePages } from "@/lib/templates";
import { getToolBySlug } from "@/lib/tools";
import { getUseCasesByTool } from "@/lib/useCases";

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

  const title = truncateMetaTitle(page.seoTitle);
  return {
    title,
    description: page.seoDescription,
    keywords: [page.keyword],
    alternates: {
      canonical: `/templates/${page.slug}`,
    },
    openGraph: {
      title,
      description: page.seoDescription,
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
  const relatedUseCases = tool ? getUseCasesByTool(tool.slug, 6) : [];
  const intentLinks = getIntentMatchedLinks({
    query: `${page.title} ${page.description} ${page.keyword}`,
    excludeHrefs: [`/templates/${page.slug}`],
    limit: 8,
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Templates", href: "/templates" },
          { label: page.title, href: `/templates/${page.slug}` },
        ]}
      />
      <section className="card p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{page.keyword}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{page.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{page.description}</p>
        <p className="mt-3 max-w-3xl text-slate-600">
          Use this template when you need a proven structure for {page.title.toLowerCase()} without starting from
          scratch. It suits creators, marketers, and small teams who want to ship quality copy fast. The checklist
          below helps you optimize each element before you publish or run ads.
        </p>
        <p className="mt-3 max-w-3xl text-slate-600">
          Open the linked tool to generate five variations at once. Compare the options, mix the best parts if needed,
          and reuse the template for future projects so you stay consistent and fast.
        </p>
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
        <AdBanner slot={`${page.title} Banner`} adSlotId={siteConfig.ads.templateDetail} />
        <AffiliateBlock title="Affiliate Offer: Creator Marketing Toolkit" />
      </div>

      {tool ? (
        <FAQSection
          title={`${tool.title} FAQ`}
          items={tool.faqs}
        />
      ) : null}

      {relatedUseCases.length > 0 ? (
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Related Industry Use Cases</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {relatedUseCases.map((item) => (
              <Link
                key={item.slug}
                href={`/use-cases/${item.slug}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <IntentLinkSection title="Intent-Matched Content Cluster" links={intentLinks} />
    </div>
  );
}
