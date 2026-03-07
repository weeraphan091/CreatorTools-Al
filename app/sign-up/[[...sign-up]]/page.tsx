import Link from "next/link";
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
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="card p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-3 text-slate-600">
          Sign up to save your generated hooks, titles, and copy so you can reuse them later. Your account lets you
          access your results from any device and keeps your swipe file in one place.
        </p>
        <p className="mt-3 text-slate-600">
          Free accounts get a daily credit allowance for our AI tools. If you need more generations, you can upgrade
          to a paid plan for a larger monthly credit pool or buy one-time top-up credits. All tools remain free to try
          with no sign-up required; creating an account is optional and gives you the ability to save and sync.
        </p>
        <p className="mt-3 text-slate-600">
          After you sign up, we will redirect you back to the tools so you can continue generating. If you prefer to
          browse without an account, you can use any generator as a guest; your results will stay in the browser until
          you close the tab. For more on credits and plans, see our{" "}
          <Link href="/pricing" className="font-medium text-brand-700 hover:text-brand-600">
            Pricing
          </Link>{" "}
          page.
        </p>
        <p className="mt-3 text-slate-600">
          We use industry-standard authentication to keep your account secure. Your email is only used for sign-in and
          account recovery; we do not sell your data. By creating an account you agree to our{" "}
          <Link href="/terms" className="font-medium text-brand-700 hover:text-brand-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="font-medium text-brand-700 hover:text-brand-600">
            Privacy Policy
          </Link>
          .
        </p>
      </header>
      <section className="flex justify-center">
        <SignUpWithFallback />
      </section>
    </div>
  );
}

