# ADR-0005 — Sentry errors only, scrubbed, opt-in by DSN

- Status: **accepted (retro-documented)** 2026-11-03 (implemented ตาม SPEC-001)

## Decision

ใช้ `@sentry/nextjs` ทั้ง browser/Node/Edge ด้วย options เดียว: เปิดเมื่อมี `NEXT_PUBLIC_SENTRY_DSN`, ไม่มี tracing, ไม่มี breadcrumbs,
`sendDefaultPii: false`, `beforeSend: scrubEvent` (ลบ request/user/extra/frame vars, เหลือ contexts os/runtime/browser/device/app, ตัด query string)

## Evidence

- `lib/sentry.ts`, `instrumentation.ts` (`onRequestError = Sentry.captureRequestError`), `instrumentation-client.ts`
- `tests/sentry.test.ts` (6 tests), SPEC-001 AC-01/AC-02, commit `ec0ba2e`
- Vercel env (names only, 2026-11-03): `NEXT_PUBLIC_SENTRY_DSN` ใน Production

Sources: `lib/sentry.ts`, `instrumentation.ts`, `instrumentation-client.ts`, `tests/sentry.test.ts`, `specs/001-shared-ci-sentry/spec.md`, `vercel env ls`
