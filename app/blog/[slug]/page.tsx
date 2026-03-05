import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AffiliateBlock from "@/components/AffiliateBlock";
import AdBanner from "@/components/AdBanner";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
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
        <AdBanner slot={`Blog Post Banner - ${post.title}`} />
        <AffiliateBlock title="Creator Monetization Toolkit" />
      </div>
    </article>
  );
}
