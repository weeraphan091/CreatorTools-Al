import { SignIn } from "@clerk/nextjs";
import { CLERK_ENABLED } from "@/lib/clerk";

export default function SignInPage() {
  if (!CLERK_ENABLED) {
    return (
      <div className="card p-8 text-sm text-slate-700">
        Authentication is not configured. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  );
}

