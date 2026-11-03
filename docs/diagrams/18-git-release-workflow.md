# 18 — Git & release workflow

Status: **done**. Trunk-based: commit ตรงบน `main`; มี merge ครั้งเดียว (`be6c570` จาก `claude/untitled-session-bhlj06`, 2026-10-01); ไม่มี tag/release; main ไม่มี branch protection

```mermaid
gitGraph
  commit id: "c61122d init 2026-02-22"
  commit id: "8295852 SEO 2026-02-28"
  commit id: "416d150 polish 2026-08-11"
  commit id: "ce76fa2 2026-09-09"
  branch claude/untitled-session-bhlj06
  checkout claude/untitled-session-bhlj06
  commit id: "8e90066 catalog"
  commit id: "aecd529 OG cards"
  commit id: "6d65f00 next bump"
  checkout main
  merge claude/untitled-session-bhlj06 id: "be6c570 merge"
  commit id: "875dad5 Sentry + shared CI"
  commit id: "e02b96e next 16.4.2"
  commit id: "bd9b0fc deploy smoke"
  commit id: "1d9124c KPI approved - prod"
```

```mermaid
flowchart LR
  DEV["Local or agent worktree branch"] -->|"merge locally or commit on main"| MAIN["main"]
  MAIN -->|"push"| CI["ci.yml - informational, not required"]
  MAIN -->|"push"| VG["Vercel Git deploy"]
  VG --> PROD["Production"]
  PROD --> SMK["deploy-smoke.yml"]
  CLI["vercel deploy --prod - CLI, used 2026-10-13 and 2026-10-23"] -.-> PROD
```

Sources: `git log origin/main` (26 commits), `git branch -r`, `git tag` (empty), `gh api …/branches/main/protection` (404 not protected), `.github/workflows/*.yml`, `specs/001-shared-ci-sentry/spec.md` §4, `vercel ls`

หมายเหตุ: gitGraph แสดงเฉพาะ commit เด่น ไม่ใช่ทุก commit; ลำดับ commit บน branch ตาม `git log` (บาง commit อื่นไม่ได้แสดง)

## Open questions

- deploy 2026-10-23 ไม่มี GitHub deployment record → น่าจะเป็น CLI deploy แต่ไม่ทราบ commit ที่ deploy
- PR flow (`pull_request` trigger) มีใน ci.yml แต่ยังไม่เคยมี PR run ใน history
