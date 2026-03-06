# Rollback SOP

Use this runbook when production is unstable after a release.

## 1) Immediate Containment

1. Pause further deploys.
2. Mark incident start time and affected flows (auth, generate, credits, payments).
3. If payment/webhooks are impacted, keep Stripe webhook endpoint active but stop new risky code deploys.

## 2) Application Rollback

1. In Vercel, redeploy the last known good production deployment.
2. Verify:
   - `/api/health` (coarse status)
   - sign-in
   - `/tools/...` generate
   - `/pricing` checkout button rendering

## 3) Database Rollback Strategy

1. Prefer forward-fix migrations.
2. If rollback is required:
   - disable newly introduced code paths using env feature flags
   - then run SQL rollback for non-destructive objects only
3. Never delete billing rows during incident response.

## 4) Stripe/Webhook Safety

1. Keep webhook idempotency table intact.
2. Replay failed Stripe events from dashboard only after service health is restored.
3. Confirm each replayed event appears exactly once in logs.

## 5) Exit Criteria

Incident can be closed when:
- Generate succeeds for free and paid users
- Credits decrement correctly with no double charge
- Checkout, renewal, and portal all work
- Error rate returns to normal baseline
