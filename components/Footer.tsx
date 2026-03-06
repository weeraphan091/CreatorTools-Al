import Link from "next/link";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
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
        <p>Built with Next.js 14, TailwindCSS, and AI APIs.</p>
      </div>
    </footer>
  );
}
