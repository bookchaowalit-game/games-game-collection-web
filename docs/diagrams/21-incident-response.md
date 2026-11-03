# 21 — Incident response

Status: **done** (flow จาก channel จริงที่มี; ไม่มี on-call — owner คนเดียวตาม RUNBOOK.md)

```mermaid
flowchart TD
  subgraph Detect
    D1["Sentry error alert"]
    D2["deploy-smoke failure in GitHub Actions"]
    D3["CI failure on main"]
    D4["Visitor or owner notices - no uptime probe"]
  end
  D1 --> T["Triage by owner"]
  D2 --> T
  D3 --> T
  D4 --> T
  T --> Q{"Production broken?"}
  Q -->|"yes"| RB["Vercel rollback to previous Ready deployment"]
  Q -->|"no"| FX["Fix on main - test first, owner TDD standard"]
  RB --> FX
  FX --> CI["ci.yml green"]
  CI --> DEP["Vercel Git deploy"]
  DEP --> SMK["deploy-smoke verifies commit"]
  SMK --> PM["Postmortem - no template or folder in repo"]
```

Sources: `RUNBOOK.md` (Owner: "Solo operator … No multi-person on-call"; Rollback section), `.github/workflows/deploy-smoke.yml`, `.github/workflows/ci.yml`, `lib/sentry.ts`, `specs/README.md` (owner ADR-0004 TDD + SDD in architecture-docs, not 08-adr/ADR-0004 here), 20-observability.md

## Open questions

- Sentry alert ส่งไปที่ใด (email / Telegram)? ไม่มี config ใน repo
- postmortem เก็บที่ไหน — repo นี้ไม่มี `docs/incidents/` หรือ template
- severity levels / ระยะเวลาตอบสนองยังไม่ได้กำหนด
