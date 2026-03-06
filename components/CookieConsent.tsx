"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "viralhooklab_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-6">
      <p className="text-sm text-slate-600">
        We use cookies to improve your experience, serve personalized ads via Google AdSense, and
        analyze traffic. By clicking &quot;Accept,&quot; you consent to our use of cookies. See our{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-700 hover:text-brand-600">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={reject}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={accept}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Accept all cookies
        </button>
      </div>
    </div>
  );
}
