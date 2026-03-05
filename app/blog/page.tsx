import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read practical growth guides, marketing hooks, and copywriting ideas for creators.",
  openGraph: {
    title: "CreatorTools AI Blog",
    description: "Creator-focused growth and marketing playbooks.",
  },
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">CreatorTools AI Blog</h1>
        <p className="mt-3 text-slate-600">Actionable guides to help you grow faster with better content.</p>
      </section>

      <AdBanner slot="Blog Index Banner" />

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
    </div>
  );
}
