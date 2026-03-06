"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import PricingCheckoutButton from "@/components/PricingCheckoutButton";

type Plan = "starter" | "agency" | "topup100";

type Props = {
  plan: Plan;
  label: string;
  signInLabel?: string;
  className?: string;
  signInClassName?: string;
};

const SIGN_IN_REDIRECT = "/sign-in?redirect_url=" + encodeURIComponent("/pricing");

export default function PricingPlanCta({
  plan,
  label,
  signInLabel,
  className,
  signInClassName,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <span className={className} aria-busy="true">
        …
      </span>
    );
  }

  if (!isSignedIn) {
    return (
      <Link href={SIGN_IN_REDIRECT} className={signInClassName ?? className}>
        {signInLabel ?? "Sign in to subscribe"}
      </Link>
    );
  }

  return (
    <PricingCheckoutButton
      plan={plan}
      label={label}
      className={className}
    />
  );
}
