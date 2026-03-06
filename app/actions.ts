"use server";

import {
  containsSuspiciousInput,
  isValidEmailInput,
  sanitizeEmailInput,
} from "@/lib/security/input";

export async function joinNewsletterAction(formData: FormData) {
  const email = sanitizeEmailInput(String(formData.get("email") || ""));

  if (!email || !isValidEmailInput(email) || containsSuspiciousInput(email)) {
    return;
  }

  // Placeholder for DB/CRM integration.
  await new Promise((resolve) => setTimeout(resolve, 400));
}
