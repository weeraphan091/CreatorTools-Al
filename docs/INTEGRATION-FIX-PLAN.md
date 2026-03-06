# Root Cause Analysis & Fix Plan: Clerk, Supabase, Stripe

## 1. Root causes identified

### A. **Profile must exist before `billing_customers` insert (CRITICAL – fixed)**

- **Schema:** `billing_customers.user_id` has a foreign key to `profiles(user_id)`.
- **Flow:** Checkout and Customer Portal call `getOrCreateStripeCustomerId()`, which **upserts into `billing_customers`**. If the user has no row in `profiles` (e.g. webhook missed or they never hit a page that calls `/api/profile/ensure`), the insert fails with an FK violation.
- **Fix applied:** Call `ensure_profile` (via `supabaseAdminRpc("ensure_profile", ...)`) **before** `getOrCreateStripeCustomerId` in:
  - `app/api/stripe/checkout/route.ts`
  - `app/api/stripe/customer-portal/route.ts`

### B. **Customer Portal had no error handling (CRITICAL – fixed)**

- **Issue:** `app/api/stripe/customer-portal/route.ts` had no try/catch. Any throw from `stripe()`, `getOrCreateStripeCustomerId()`, or `supabaseAdmin()` produced an unhandled 500 and a generic “Something went wrong” in production.
- **Fix applied:** Wrapped the handler in try/catch and redirect to `/pricing?error=portal` on failure. Also ensure profile before creating/loading Stripe customer.

### C. **Clerk “needs_client_trust” on satellite domain (CONFIG – not code)**

- **Issue:** With a satellite domain (e.g. `clerk.viralhooklab.com`), Clerk’s Client Trust feature can return `needs_client_trust not supported yet` and 429s during sign-in.
- **Fix:** In **Clerk Dashboard → Updates**, disable **Client Trust** until Clerk supports it for satellite domains. No code change.

### D. **Server Component / layout errors (MITIGATED)**

- **Issue:** Production showed “An error occurred in the Server Components render” with no message. Likely causes: `ClerkProvider` with empty/undefined `publishableKey`, or metadata with invalid values.
- **Fixes already in place:** Layout uses `clerkKey?.trim()` and only wraps with `ClerkProvider` when non-empty; metadata `verification.google` is spread only when set; `app/error.tsx` and `app/global-error.tsx` exist to catch and display errors.

### E. **Throwing helpers used by API routes**

- **`supabaseAdmin()`** – throws if `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` are missing.
- **`stripe()`** – throws if `STRIPE_SECRET_KEY` is missing.
- **`getStripePriceMapping()`** – throws if any of the three Stripe price env vars are missing.
- **`getCreditsSnapshot()` / `deductOneCredit()`** – throw if Supabase RPC fails.

Routes that use these now either guard (e.g. checkout checks Stripe env and price mapping before use) or wrap in try/catch (checkout, customer-portal, generate, webhooks). Credits API has a fallback path (ensure_profile + default snapshot).

---

## 2. Step-by-step fix plan (in order)

### Step 1: Ensure profile before Stripe customer (DONE)

- In **checkout** and **customer-portal**, call `ensure_profile` before `getOrCreateStripeCustomerId`.
- Prevents FK violation when a logged-in user has no `profiles` row yet.

### Step 2: Harden Customer Portal (DONE)

- Wrap the entire Customer Portal GET handler in try/catch.
- On success: redirect to Stripe portal URL.
- On failure: redirect to `/pricing?error=portal` (or sign-in if unauthenticated).

### Step 3: Clerk Dashboard (manual)

- In Clerk Dashboard → **Updates**, disable **Client Trust** to avoid `needs_client_trust not supported yet` and related 429s on sign-in with satellite domain.

### Step 4: Environment variables (verify)

- Use **GET /api/health** and ensure all checks pass (`ok: true`, `failedKeys: []`).
- Required for integrations:
  - Clerk: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`
  - Supabase: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
  - Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STARTER_MONTHLY`, `STRIPE_PRICE_AGENCY_MONTHLY`, `STRIPE_PRICE_TOPUP_100`

### Step 5: Webhooks (already correct)

- **Clerk webhook** (`/api/webhooks/clerk`): subscribes to `user.created`, calls `ensure_profile`. No change needed.
- **Stripe webhook** (`/api/webhooks/stripe`): already in try/catch; handles `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`. No change needed.

### Step 6: Optional – defensive checks elsewhere

- **Generate route:** Already inside a top-level try/catch; Supabase/credit errors surface as 500 with “Unable to generate results.” Optional: log `error.digest` or message server-side for debugging.
- **Credits route:** Already has ensure_profile fallback and default snapshot on double failure. No change needed.

---

## 3. Integration flow summary

```
User sign-up → Clerk → webhook user.created → ensure_profile(profiles)
                         ↓
User visits site → CreditsNav / any auth page → /api/profile/ensure (if needed)
                         ↓
User clicks Subscribe → /api/stripe/checkout
  → auth() → ensure_profile → getOrCreateStripeCustomerId (profiles must exist)
  → stripe().checkout.sessions.create → return url
                         ↓
User pays → Stripe → webhook checkout.session.completed / invoice.payment_succeeded
  → setTierAndMonthlyCredits / addLifetimeCredits / upsertBillingCustomer
                         ↓
User opens Customer Portal → /api/stripe/customer-portal
  → auth() → ensure_profile → getOrCreateStripeCustomerId → stripe().billingPortal.sessions.create → redirect
```

---

## 4. Files changed in this fix

- `app/api/stripe/checkout/route.ts` – import `supabaseAdminRpc`, call `ensure_profile` before `getOrCreateStripeCustomerId`.
- `app/api/stripe/customer-portal/route.ts` – import `supabaseAdminRpc`, call `ensure_profile` first; wrap handler in try/catch; redirect to sign-in when unauthenticated; redirect to `/pricing?error=portal` on failure.

No changes to Clerk, Supabase, or Stripe SDK versions or to other API routes beyond the above.
