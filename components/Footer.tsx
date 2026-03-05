import Link from "next/link";

export default function Footer() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="container-shell flex flex-col gap-3 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CreatorTools AI. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/use-cases" className="hover:text-brand-600">
            Use Cases
          </Link>
          <Link href="/templates" className="hover:text-brand-600">
            Templates
          </Link>
          <Link href="/sitemap.xml" className="hover:text-brand-600">
            Sitemap
          </Link>
          <Link href="/feed.xml" className="hover:text-brand-600">
            Feed
          </Link>
          <Link href="/robots.txt" className="hover:text-brand-600">
            Robots
          </Link>
          <p>Built with Next.js 14, TailwindCSS, Gemini/OpenAI{commitSha ? ` • ${commitSha}` : ""}.</p>
        </div>
      </div>
    </footer>
  );
}
