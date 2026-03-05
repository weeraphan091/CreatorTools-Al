import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="container-shell flex flex-col gap-3 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CreatorTools AI. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/sitemap.xml" className="hover:text-brand-600">
            Sitemap
          </Link>
          <Link href="/robots.txt" className="hover:text-brand-600">
            Robots
          </Link>
          <p>Built with Next.js 14, TailwindCSS, and OpenAI.</p>
        </div>
      </div>
    </footer>
  );
}
