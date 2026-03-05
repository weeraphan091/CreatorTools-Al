"use client";

import { useFormStatus } from "react-dom";

type NewsletterFormProps = {
  action: (formData: FormData) => Promise<void>;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Joining..." : "Join Newsletter"}
    </button>
  );
}

export default function NewsletterForm({ action }: NewsletterFormProps) {
  return (
    <form action={action} className="mt-4 flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 placeholder:text-slate-400 focus:ring"
      />
      <SubmitButton />
    </form>
  );
}
