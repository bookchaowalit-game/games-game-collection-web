# 05 — C4 Context

Status: **done**

```mermaid
C4Context
  title Book Arcade - system context
  Person(visitor, "Visitor", "Anonymous player from portfolio or GitHub")
  Person(owner, "Owner", "Solo developer, pushes to main")
  System_Ext(agent, "MCP client", "AI agent calling list_games")
  System(arcade, "Book Arcade", "Next.js site with 12 client-side games")
  System_Ext(vercel, "Vercel", "Hosting, Git integration, CDN")
  System_Ext(github, "GitHub", "Repo, Actions CI and deploy smoke")
  System_Ext(sentry, "Sentry", "Error reporting when DSN set")
  System_Ext(gfonts, "Google Fonts", "Geist, Geist Mono, Press Start 2P via next/font at build")
  System_Ext(siblings, "Sibling apps", "Other bookchaowalit apps on vercel.app")
  Rel(visitor, arcade, "Plays games", "HTTPS")
  Rel(agent, arcade, "JSON-RPC POST /api/mcp", "HTTPS")
  Rel(owner, github, "git push main")
  Rel(github, vercel, "Git integration triggers build")
  Rel(vercel, arcade, "Hosts")
  Rel(arcade, sentry, "Scrubbed error events")
  Rel(gfonts, arcade, "Font files self-hosted at build")
  Rel(visitor, siblings, "Follows More projects links")
  Rel(github, arcade, "deploy-smoke GETs")
```

Sources: `app/layout.tsx` (`next/font/google`), `app/api/mcp/route.ts`, `instrumentation.ts`, `instrumentation-client.ts`, `lib/sentry.ts`, `app/more-projects/page.tsx`, `.github/workflows/ci.yml`, `.github/workflows/deploy-smoke.yml`, `specs/001-shared-ci-sentry/spec.md` §4, `vercel inspect` (aliases, 2026-11-03)

## Open questions

- Sentry project ใดรับ event ของ repo นี้ (Vercel มี `NEXT_PUBLIC_SENTRY_DSN` ใน Production — ตรวจจากชื่อตัวแปรเท่านั้น ไม่ได้ดูค่า)
