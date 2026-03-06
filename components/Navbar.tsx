 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { categories } from "@/lib/categories";
import CreditsNav from "@/components/CreditsNav";
import { CLERK_ENABLED } from "@/lib/clerk";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Tools" },
  { href: "/pricing", label: "Pricing" },
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
            <div className="group relative">
              <button type="button" className="inline-flex items-center gap-1 hover:text-brand-600" aria-haspopup="menu">
                Categories
                <span className="text-xs" aria-hidden>
                  ▼
                </span>
              </button>
              <div className="invisible absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  >
                    <span className="font-semibold">{category.label}</span>
                    <span className="mt-1 block text-xs font-normal text-slate-500">{category.seoTitle}</span>
                  </Link>
                ))}
              </div>
            </div>

            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-600">
                {item.label}
              </Link>
            ))}

            {CLERK_ENABLED ? (
              <>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    Sign in
                  </Link>
                </SignedOut>
                <SignedIn>
                  <CreditsNav />
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>

        {isMenuOpen ? (
          <nav className="border-t border-slate-200 py-3 md:hidden">
            <div className="grid gap-2">
              <div className="rounded-lg bg-slate-50 px-2 py-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Categories</p>
                <div className="mt-2 grid gap-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-brand-700"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 rounded-lg bg-slate-50 px-2 py-2">
                {CLERK_ENABLED ? (
                  <>
                    <SignedOut>
                      <Link
                        href="/sign-in"
                        className="block rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Sign in
                      </Link>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center justify-between">
                        <CreditsNav />
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </SignedIn>
                  </>
                ) : (
                  <Link
                    href="/sign-in"
                    className="block rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
