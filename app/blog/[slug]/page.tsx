import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateBlock from "@/components/AffiliateBlock";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogJsonLd from "@/components/BlogJsonLd";
import IntentLinkSection from "@/components/IntentLinkSection";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getIntentMatchedLinks } from "@/lib/intentLinks";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import { getFeaturedUseCases } from "@/lib/useCases";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

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

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
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

  const intentLinks = getIntentMatchedLinks({
    query: `${post.title} ${post.description} ${post.content.join(" ")}`,
    excludeHrefs: [`/blog/${post.slug}`],
    limit: 8,
  });

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
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdBanner slot={`Blog Post Banner - ${post.title}`} adSlotId={siteConfig.ads.blogPost} />
        <AffiliateBlock title="Creator Monetization Toolkit" />
      </div>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Try the Tools Mentioned in This Guide</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 6).map((tool) => (
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
