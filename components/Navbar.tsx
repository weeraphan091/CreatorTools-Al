import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-slate-900">
          CreatorTools <span className="text-brand-600">AI</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
