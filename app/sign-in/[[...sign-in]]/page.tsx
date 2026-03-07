import { SignIn } from "@clerk/nextjs";
import { CLERK_ENABLED } from "@/lib/clerk";

type Props = { searchParams?: Promise<{ redirect_url?: string }> | { redirect_url?: string } };

export default async function SignInPage(props: Props) {
  if (!CLERK_ENABLED) {
    return (
      <div className="card p-8 text-sm text-slate-700">
        Authentication is not configured. Set <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
        <code>CLERK_SECRET_KEY</code>.
      </div>
    );
  }
  const params = await Promise.resolve(props.searchParams ?? {});
  const redirectUrl =
    typeof params?.redirect_url === "string" && params.redirect_url.startsWith("/")
      ? params.redirect_url
      : "/tools";
  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="flex justify-center">
        <SignIn fallbackRedirectUrl={redirectUrl} />
      </div>
      <p className="text-center text-xs text-slate-500">
        If sign-in does not work, try another browser or allow cookies for this site.
      </p>
    </div>
  );
}

