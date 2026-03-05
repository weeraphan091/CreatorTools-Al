"use server";

export async function joinNewsletterAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();

  if (!email || !email.includes("@")) {
    return;
  }

  // Placeholder for DB/CRM integration.
  await new Promise((resolve) => setTimeout(resolve, 400));
}
