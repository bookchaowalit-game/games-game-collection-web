# 02 — Use cases

Status: **done**. ไม่มี auth ในโค้ด (ไม่มี middleware, session, cookie) ดังนั้น actor มีแค่ anonymous visitor, MCP client,
automation (CI / deploy smoke) และ owner (ผ่าน Git เท่านั้น ไม่มี admin UI)

```mermaid
flowchart LR
  Visitor(["Anonymous visitor"])
  Agent(["MCP client / AI agent"])
  Crawler(["Search or social crawler"])
  Smoke(["Deploy smoke workflow"])
  Owner(["Owner via Git"])

  subgraph Arcade["Book Arcade - game-collection.bookchaowalit.com"]
    UC1["UC-01 Browse home and build status"]
    UC2["UC-02 Play one of 12 games"]
    UC3["UC-03 Reset / replay a run"]
    UC4["UC-04 Browse More projects directory"]
    UC5["UC-05 Follow the build on GitHub"]
    UC6["UC-06 List games via MCP list_games"]
    UC7["UC-07 Read sitemap, robots, OG images"]
    UC8["UC-08 Check /api/health commit marker"]
    UC9["UC-09 Ship a new game"]
  end

  Visitor --> UC1
  Visitor --> UC2
  Visitor --> UC3
  Visitor --> UC4
  Visitor --> UC5
  Agent --> UC6
  Crawler --> UC7
  Smoke --> UC8
  Smoke --> UC1
  Owner --> UC9
  UC2 -. "include" .-> UC3
```

Sources: `app/page.tsx`, `app/games/*/page.tsx`, `app/more-projects/page.tsx`, `app/api/mcp/route.ts`, `lib/mcp.ts`, `app/api/health/route.ts`, `app/sitemap.ts`, `public/robots.txt`, `app/opengraph-image.tsx`, `app/games/*/opengraph-image.tsx`, `scripts/deploy-smoke.sh`, `README.md` (adding a game)

| UC | Actor | Entry point | Notes |
|---|---|---|---|
| UC-01 | Visitor, Smoke | `/` | hero buttons + cards render from `GAMES` |
| UC-02 | Visitor | `/games/<slug>` (12 slugs) | keyboard (4 games มี keydown handler) หรือ click/touch |
| UC-03 | Visitor | reset/play-again button ใน client | ทุก lib module มี `reset*` หรือ `INITIAL_STATE` |
| UC-04 | Visitor | `/more-projects` | link ออกไป `*.vercel.app` ของ sibling apps |
| UC-05 | Visitor | link `github.com/bookchaowalit-game/bookchaowalit-game-collection-frontend` | ชื่อ repo เก่า (ดู Open questions) |
| UC-06 | MCP client | `POST /api/mcp` | `initialize`, `ping`, `tools/list`, `tools/call list_games` |
| UC-07 | Crawler | `/sitemap.xml`, `/robots.txt`, `opengraph-image` | sitemap URL ใช้ `SITE_URL` |
| UC-08 | Deploy smoke | `GET /api/health` | `{status, service, commit}` |
| UC-09 | Owner | `git push` main | ดู 18-git-release-workflow.md |

## Open questions

- ลิงก์ "Source" ชี้ชื่อ repo เก่า `bookchaowalit-game-collection-frontend` — ยัง redirect ไปที่ `games-game-collection-web` หรือไม่ (ไม่ได้ตรวจ)
