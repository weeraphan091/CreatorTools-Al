import { CLERK_ENABLED } from "@/lib/clerk";
import SignUpWithFallback from "@/components/SignUpWithFallback";

export default function SignUpPage() {
  if (!CLERK_ENABLED) {
    return (
      <div className="card p-8 text-sm text-slate-700">
        Authentication is not configured. Set <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
        <code>CLERK_SECRET_KEY</code>.
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <SignUpWithFallback />
    </div>
  );
}

