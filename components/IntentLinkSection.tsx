import Link from "next/link";
import type { IntentLink } from "@/lib/intentLinks";

type IntentLinkSectionProps = {
  title: string;
  links: IntentLink[];
};

const typeLabel: Record<IntentLink["type"], string> = {
  tool: "Tool",
  blog: "Blog",
  template: "Template",
  "use-case": "Use Case",
};

export default function IntentLinkSection({ title, links }: IntentLinkSectionProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="card p-6">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.type}`}
            href={link.href}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
          >
            <span className="block">{link.label}</span>
            <span className="mt-1 block text-xs font-normal text-slate-500">{typeLabel[link.type]}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
