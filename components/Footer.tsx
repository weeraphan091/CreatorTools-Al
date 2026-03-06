import Link from "next/link";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/tools", label: "Tools" },
  { href: "/viral-hooks", label: "Viral Hooks" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/top-results", label: "Saved Results" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="container-shell space-y-4 py-8 text-sm text-slate-600">
        <div className="space-y-1">
          <p>© 2026 ViralHookLab. All rights reserved.</p>
          <p>Operated by Seventy Eight Co., Ltd.</p>
          <p>Tax ID: 0205565023848</p>
          <p>
            Contact:{" "}
            <a className="font-medium text-brand-700 hover:text-brand-600" href="mailto:support@viralhooklab.com">
              support@viralhooklab.com
            </a>
          </p>
        </div>
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
