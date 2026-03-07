import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateBlock from "@/components/AffiliateBlock";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogJsonLd from "@/components/BlogJsonLd";
import IntentLinkSection from "@/components/IntentLinkSection";
import { blogPosts, getBlogPostBySlug, getContentBlocks, getContentText } from "@/lib/blog";
import { getIntentMatchedLinks } from "@/lib/intentLinks";
import { siteConfig, truncateMetaTitle } from "@/lib/site";
import { tools } from "@/lib/tools";
import type { ContentBlock } from "@/lib/blog";
import { getFeaturedUseCases } from "@/lib/useCases";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

function ContentBlockNode({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-8 text-xl font-semibold text-slate-900">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-6 text-lg font-semibold text-slate-900">{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "image":
      return (
        <figure className="my-6">
          {block.src ? (
            <img src={block.src} alt={block.alt} className="w-full rounded-lg border border-slate-200" />
          ) : (
            <div
              className="flex min-h-[200px] items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-500"
              role="img"
              aria-label={block.alt}
            >
              {block.alt}
            </div>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post could not be found.",
    };
  }

  const title = truncateMetaTitle(post.title);
  return {
    title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  const featuredUseCases = getFeaturedUseCases(6);

  if (!post) {
    notFound();
  }

  const contentBlocks = getContentBlocks(post);
  const contentText = getContentText(post);
  const intentLinks = getIntentMatchedLinks({
    query: `${post.title} ${post.description} ${contentText}`,
    excludeHrefs: [`/blog/${post.slug}`],
    limit: 8,
  });

  const toolsFromSlugs =
    post.toolSlugs?.length > 0
      ? post.toolSlugs
          .map((s) => tools.find((t) => t.slug === s))
          .filter((t): t is (typeof tools)[number] => t != null)
      : [];
  const toolsToShow = toolsFromSlugs.length > 0 ? toolsFromSlugs : tools.slice(0, 6);

  return (
    <article className="space-y-6">
      <BlogJsonLd title={post.title} description={post.description} slug={post.slug} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <header className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
        <p className="mt-3 text-slate-600">{post.description}</p>
      </header>

      <section className="card space-y-4 p-8 leading-7 text-slate-700">
        {contentBlocks.map((block, index) => (
          <ContentBlockNode key={index} block={block} />
        ))}
        <p className="text-slate-600">
          For more angles and ready-made prompts, try our free AI tools and use-case pages. Each tool generates five
          variations so you can test what works best for your audience.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdBanner slot={`Blog Post Banner - ${post.title}`} adSlotId={siteConfig.ads.blogPost} />
        <AffiliateBlock title="Creator Monetization Toolkit" />
      </div>

      {post.faqs && post.faqs.length > 0 && (
        <>
          <section className="card p-6" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>
            <dl className="mt-4 space-y-4">
              {post.faqs.map((faq, i) => (
                <div key={i}>
                  <dt className="font-medium text-slate-900">{faq.question}</dt>
                  <dd className="mt-1 text-slate-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              }),
            }}
          />
        </>
      )}

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Try the Tools Mentioned in This Guide</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {toolsToShow.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">More Long-Tail Use Cases</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {featuredUseCases.map((useCase) => (
            <Link
              key={useCase.slug}
              href={`/use-cases/${useCase.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {useCase.searchTerm}
            </Link>
          ))}
        </div>
      </section>

      <IntentLinkSection title="Related Resources by Search Intent" links={intentLinks} />
    </article>
  );
}
