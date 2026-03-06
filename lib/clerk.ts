const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || "";
const secret = process.env.CLERK_SECRET_KEY?.trim() || "";

export const CLERK_CLIENT_ENABLED = Boolean(publishable);
export const CLERK_SERVER_ENABLED = Boolean(publishable && secret);
export const CLERK_ENABLED = CLERK_CLIENT_ENABLED;

