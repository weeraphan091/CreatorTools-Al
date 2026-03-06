# Stability Guardrails

This project is now operated in stability-first mode.

## Rules

1. No new feature work until core stability phases are complete.
2. Every PR must pass:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
3. Production deploys only from `main`.
4. Database changes must be backward-compatible first, cleanup in a later migration.
5. Any payment/webhook change requires replay-safe idempotency checks before release.

## Required Smoke Checks Before Merge

1. Sign in works and returns to tool page.
2. Tool generation works for signed-in user.
3. Out-of-credits flow shows paywall modal.
4. Checkout opens Stripe and returns to pricing page.
5. Stripe webhook updates tier/credits.
6. Customer portal opens for paid users.

## Deployment Gate

Do not deploy if any smoke check fails or if CI fails.
