 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/viral-hooks", label: "Viral Hooks" },
  { href: "/templates", label: "Templates" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-shell">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="text-base font-bold text-slate-900 sm:text-lg">
            ViralHookLab<span className="text-brand-600">.com</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>

          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-600">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {isMenuOpen ? (
          <nav className="border-t border-slate-200 py-3 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
