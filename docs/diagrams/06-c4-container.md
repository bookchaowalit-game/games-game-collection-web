# 06 — C4 Container

Status: **done**. ทุก container อยู่ใน Next.js project เดียวบน Vercel; ไม่มี database หรือ service แยก

```mermaid
C4Container
  title Book Arcade - containers
  Person(visitor, "Visitor")
  System_Ext(agent, "MCP client")
  System_Ext(sentry, "Sentry")
  System_Boundary(vp, "Vercel project bookchaowalit-game-collection-frontend") {
    Container(static, "Static pages", "Next.js 16 App Router, prerendered", "/, /more-projects, 12 /games/slug, sitemap.xml, OG PNGs")
    Container(browser, "Game client bundle", "React 19 client components", "game-client.tsx per game plus lib rules, Sentry browser SDK")
    Container(mcp, "MCP route", "Edge runtime", "POST /api/mcp, stateless JSON-RPC")
    Container(health, "Health route", "Node.js function, force-dynamic", "GET /api/health returns commit")
  }
  Rel(visitor, static, "GET pages", "HTTPS")
  Rel(static, browser, "Loads JS")
  Rel(agent, mcp, "POST JSON-RPC")
  Rel(browser, sentry, "Error events when DSN set")
  Rel(health, sentry, "onRequestError via instrumentation.ts")
```

Sources: `package.json` (next 16.4.2, react 19.2.3, @sentry/nextjs ^11.8.0), `app/api/mcp/route.ts` (`runtime = "edge"`), `app/api/health/route.ts` (`dynamic = "force-dynamic"`), `instrumentation.ts`, `instrumentation-client.ts`, `app/opengraph-image.tsx`, `app/games/*/opengraph-image.tsx`, `app/sitemap.ts`, UPGRADE-PLAN pass 3 (OG PNGs static at build)

## Open questions

- runtime ของ server-side Sentry ใน Edge route (`/api/mcp`) — `instrumentation.ts` init แบบเดียวกันทุก runtime ไม่ได้แยก `NEXT_RUNTIME`; ยังไม่ยืนยันว่า edge errors ถึง Sentry
