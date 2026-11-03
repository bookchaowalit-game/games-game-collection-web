# Core 22 SDLC diagram pack — games-game-collection-web

ชุดภาพ 22 รายการตาม SDLC Diagram Catalog v2 (knowledge-base `knowledge/tech/core-cs/sdlc-diagram-catalog.md`)
วาดจากโค้ดและ config ของ repo นี้ ณ `origin/main` `1d9124c` (2026-10-24) — live: https://game-collection.bookchaowalit.com (Tier A)
ทุก diagram มี `Sources:` และสิ่งที่ไม่รู้อยู่ใน "Open questions" ของไฟล์นั้น. ข้อมูล live (Vercel, GitHub API, `curl`) เก็บเมื่อ 2026-11-03

| # | Item | Status | File | Sources read |
|---|---|---|---|---|
| 01 | Business process (As-Is / To-Be) | done | [01-business-process.md](01-business-process.md) | PRODUCT.md, README, UPGRADE-PLAN, KPI-PLAN, app/page.tsx, lib/games.ts, workflows |
| 02 | Use cases | done | [02-use-cases.md](02-use-cases.md) | app routes, api routes, lib/mcp.ts, sitemap, robots, deploy-smoke.sh |
| 03 | User flows | done | [03-user-flows.md](03-user-flows.md) | app/page.tsx, game pages + clients, 12 lib modules, not-found |
| 04 | Traceability (RTM) | done | [04-traceability.md](04-traceability.md) | PRODUCT.md, SPEC-001, UPGRADE-PLAN, KPI-PLAN, all tests, ci.yml |
| 05 | C4 Context | done | [05-c4-context.md](05-c4-context.md) | layout, api routes, instrumentation, more-projects, workflows, vercel inspect |
| 06 | C4 Container | done | [06-c4-container.md](06-c4-container.md) | package.json, route runtimes, OG routes, instrumentation |
| 07 | C4 Component | done | [07-c4-component.md](07-c4-component.md) | imports in app/ and lib/ |
| 08 | ADRs (retro-documented) | done | [08-adr/](08-adr/) — [0001](08-adr/ADR-0001-nextjs-app-router-static-first.md), [0002](08-adr/ADR-0002-catalog-single-source-of-truth.md), [0003](08-adr/ADR-0003-vercel-git-deploy-ci-not-gating.md), [0004](08-adr/ADR-0004-no-persistence-no-accounts.md), [0005](08-adr/ADR-0005-sentry-errors-only-scrubbed.md) | package.json, lib, tests, workflows, SPEC-001, Deployments API, vercel ls |
| 09 | ERD | not_applicable (no persisted data; static model shown for reference) | [09-erd.md](09-erd.md) | lib/games.ts, lib/roadmap.ts, lib/sitemap-entries.ts, lib/mcp.ts, grep for storage |
| 10 | Sequences | done | [10-sequences.md](10-sequences.md) | card-cascade page/client/lib, mcp route + lib, deploy-smoke, sentry |
| 11 | State machines | done | [11-state-machines.md](11-state-machines.md) | all 12 lib game modules, neon-harvest + pulse-parade + signal-shift clients, roadmap.ts |
| 12 | API & integrations | done | [12-api-integration.md](12-api-integration.md) | api routes, mcp.ts, sitemap, robots, OG, layout fonts, instrumentation |
| 13 | Threat model | done | [13-threat-model.md](13-threat-model.md) | routes, next.config.ts, sentry.ts, workflows, osv-scanner.toml, .gitignore, live headers, branch protection API |
| 14 | Backup & DR | done (no data; DR = redeploy) | [14-backup-dr.md](14-backup-dr.md) | RUNBOOK.md, SPEC-001, deploy-smoke.yml, vercel ls / env ls |
| 15 | CI/CD pipeline | done | [15-cicd-pipeline.md](15-cicd-pipeline.md) | ci.yml, deploy-smoke.yml, platform-ci-workflows ci-node.yml + security.yml @87dc5e1, gh run list/view |
| 16 | Deployment | done | [16-deployment.md](16-deployment.md) | vercel project inspect / inspect / env ls, route runtimes, SPEC-001 §4, live /api/health |
| 17 | Test coverage matrix | done | [17-test-coverage-matrix.md](17-test-coverage-matrix.md) | 17 test files (108 tests run), deploy-smoke.sh, ci.yml |
| 18 | Git & release workflow | done | [18-git-release-workflow.md](18-git-release-workflow.md) | git log / branch / tag, branch protection API, workflows, vercel ls |
| 19 | Service dependency map | done | [19-service-dependency-map.md](19-service-dependency-map.md) | package.json, layout, sentry, ci.yml, more-projects |
| 20 | Observability | done | [20-observability.md](20-observability.md) | instrumentation, sentry.ts, health route, workflows, KPI-PLAN, platform-uptime-worker targets.ts |
| 21 | Incident response | done | [21-incident-response.md](21-incident-response.md) | RUNBOOK.md, workflows, sentry.ts, specs/README.md |
| 22 | DORA | done (2 of 5 cannot compute) | [22-dora.md](22-dora.md) | vercel ls, GitHub Deployments API, gh run list, git log |

## Reused docs (ลิงก์ ไม่คัดลอก)

- Product brief: [PRODUCT.md](../../PRODUCT.md) — ใช้ใน 01, 04
- Upgrade backlog: [docs/UPGRADE-PLAN.md](../UPGRADE-PLAN.md) — To-Be ใน 01, gaps ใน 04/16/17
- KPI / events: [docs/measurement/KPI-PLAN.md](../measurement/KPI-PLAN.md) — ใช้ใน 01, 04, 20
- Spec: [specs/001-shared-ci-sentry/spec.md](../../specs/001-shared-ci-sentry/spec.md) — ใช้ใน 04, 08, 16

## Key findings from drawing

- Sitemap / robots / canonical ใช้ `SITE_URL = https://bookchaowalit.com` แต่ live host คือ `game-collection.bookchaowalit.com` — live `/sitemap.xml` ชี้ URL ผิด host (UPGRADE-PLAN P0 ยังเปิด)
- SPEC-001 §4 "Deployment gap" ล้าสมัย: Vercel Git integration deploy `1d9124c` สำเร็จเมื่อ 2026-10-24 และ deploy-smoke ผ่าน
- `main` ไม่มี branch protection; CI ไม่ gate deploy
- ไม่อยู่ใน uptime worker targets; ไม่มี analytics (KPI ทั้งหมด planned)
- RUNBOOK.md เป็น template ทั่วไป ไม่ตรงกับ repo (กล่าวถึง Docker / DB / git tag)

## Validate

```bash
node ~/work/core22/tools/validate.mjs docs/diagrams/*.md docs/diagrams/08-adr/*.md
```
