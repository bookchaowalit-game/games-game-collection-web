# ADR-0004 — ไม่มี persistence, account หรือ personal data

- Status: **accepted (retro-documented)** 2026-11-03

## Decision

เกมเก็บ state ใน React state เท่านั้น ไม่มี database, `localStorage`, cookie, auth หรือ API ที่เขียนข้อมูล
MCP endpoint เป็น read-only catalog

## Evidence

- `grep localStorage|sessionStorage|cookie|fetch(` ใน `app/`, `lib/` → ไม่พบ (มีแค่ comment ใน `lib/sentry.ts`)
- `package.json` ไม่มี DB/ORM/auth dependency
- `lib/mcp.ts`: "read-only catalog data only; no user data, no side effects"
- `docs/UPGRADE-PLAN.md` P1: high scores "(`localStorage`, wrapped in try/catch)" ยังเป็น backlog

Sources: `app/**`, `lib/**`, `package.json`, `lib/mcp.ts`, `docs/UPGRADE-PLAN.md`

## Consequences

- ไม่มีข้อมูลต้อง backup (ดู 14-backup-dr.md); attack surface เล็ก
- ถ้าเพิ่ม high score ต้องทบทวน ADR นี้
