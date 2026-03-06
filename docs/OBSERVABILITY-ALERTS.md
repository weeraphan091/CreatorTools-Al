# Observability and Alerts

## Structured Logging

JSON logs are emitted with:
- `ts`
- `level`
- `message`
- correlation fields (for example `userId`, `requestId`, `eventId`)

Key log sources:
- Generate API failures and rate limits
- Stripe webhook duplicate and failure paths

## Minimum Alerts (recommended)

1. `generate.unhandled_error` > 2% of generate requests in 5 minutes
2. `stripe.webhook.failed` > 0 in 10 minutes
3. `stripe.webhook.duplicate` unusual spikes (may indicate replay storm)
4. 429 rate > baseline over 15 minutes

## Rate Limiting

`lib/security/rateLimit.ts` now supports distributed limiting when these envs are set:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Without them, it falls back to in-memory limits.

## Incident Triage

1. Confirm auth health (`/api/health` with token in production).
2. Check webhook error logs with `eventId`.
3. Validate credit state from Supabase (`profiles`, `credit_ledger`, `processed_webhooks`).
4. Replay failed Stripe events only after root cause fix.
