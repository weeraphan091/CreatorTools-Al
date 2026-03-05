import Link from "next/link";
import type { ToolConfig } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolConfig;
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="card p-5">
      <h3 className="text-lg font-semibold text-slate-900">{tool.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
      <Link
        href={`/tools/${tool.slug}`}
        className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Open Tool
      </Link>
    </article>
  );
}
