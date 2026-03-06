import Link from "next/link";

const primaryLinks = [
  { href: "/use-cases", label: "Use Cases" },
  { href: "/templates", label: "Templates" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/editorial-policy", label: "Editorial Policy" },
];

const technicalLinks = [
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/robots.txt", label: "Robots" },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="container-shell space-y-4 py-8 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} CreatorTools AI. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-4 text-xs text-slate-500 md:flex">
          {technicalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </div>
        <p>Built with Next.js 14, TailwindCSS, and AI APIs.</p>
      </div>
    </footer>
  );
}
