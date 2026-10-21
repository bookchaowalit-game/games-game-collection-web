---
title: "SPEC-001 — Shared CI, security scan and Sentry error reporting"
status: implemented
tags: [spec, sdd, tdd, ci, sentry]
created: 2026-10-22
updated: 2026-10-22
description: "Run the arcade's checks on the shared CI with the security scan, and report runtime errors to Sentry without personal data."
---

# SPEC-001 — Shared CI, security scan and Sentry error reporting

Standard: ADR-0004 (TDD + SDD). Plan: Big Loop Plan 2026-10-21, Wave 3 items 4 and 5.

## Document control

| Field | Value |
|---|---|
| Spec ID / version | SPEC-001 / 1.0 |
| Status | implemented |
| Repository | bookchaowalit-game/games-game-collection-web |
| Owner (maker) | Claude Code (Wave 3 session) |
| Approver | Owner (bookchaowalit) |

## 1. Problem and intent

- **Problem:** CI was a hand-written job with no security scan, and runtime errors in the twelve games were invisible.
- **Outcome:** the same checks (lint, typecheck, 103 tests, build) run on the shared workflow, plus the security scan;
  errors reach Sentry when a DSN is configured, with no request or user data.

## 2. Behaviour — scenarios

| AC | Given / When / Then | Test |
|---|---|---|
| AC-01 | Sentry is off without `NEXT_PUBLIC_SENTRY_DSN` | `tests/sentry.test.ts` |
| AC-02 | With a DSN: errors only (no tracing, trace headers, breadcrumbs or transactions); request, user, extra and frame locals stripped | `tests/sentry.test.ts` |
| AC-03 | CI runs `ci-node.yml` (tests required) and `security.yml`, pinned to v1.1.1 `87dc5e1` | GitHub Actions run for this change |
| AC-04 | The games render as before | UI review: five pages at 375/768/1440 compared with the previous build |

## 3. Interfaces and data

| Interface | Change |
|---|---|
| Environment | `NEXT_PUBLIC_SENTRY_DSN` (optional, Vercel project env var, never committed) |
| Dependencies | `@sentry/nextjs` ^11; lockfile refresh; `osv-scanner.toml` ignores braces GHSA-vfj7-8cjw-p6xm (dev-only, no fix) until 2027-01-17 |

## 4. Deployment gap

https://game-collection.bookchaowalit.com is the Vercel project `bookchaowalit-game-collection-frontend`. Its Git link still
names the pre-transfer repository `bookchaowalit/bookchaowalit-game-collection-frontend`; the last Git deployment was
2026-02-28 and production (commit 95d8a10) was deployed by CLI on 2026-10-13. No deploy workflow is added. Owner action:
reconnect the Vercel Git integration to `bookchaowalit-game/games-game-collection-web` or approve a CLI deploy, then set the DSN.
