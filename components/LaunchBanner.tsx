import Link from "next/link";

export default function LaunchBanner() {
  return (
    <div className="border-b border-brand-200 bg-brand-50">
      <div className="container-shell flex flex-col gap-1 py-2 text-center text-sm text-brand-900 sm:flex-row sm:items-center sm:justify-center">
        <span className="font-semibold">🚀 Launch Special: Get 50% OFF all Pro Plans for a limited time!</span>
        <Link href="/pricing" className="font-semibold text-brand-700 hover:text-brand-600">
          View pricing →
        </Link>
      </div>
    </div>
  );
}

