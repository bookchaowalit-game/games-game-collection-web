# 01 — Business process (As-Is / To-Be)

Status: **done**. ภาพจากโค้ด `origin/main` `1d9124c` (2026-10-24); live: https://game-collection.bookchaowalit.com

## As-Is (จากโค้ดวันนี้)

Book Arcade เป็น static-first Next.js site: visitor เข้าหน้า home → เลือกเกม → เล่นในเบราว์เซอร์ทั้งหมด (pure rule modules ใน `lib/<game>.ts`)
ไม่มี account, ไม่มี backend data, ไม่มี high score — จบเกมแล้ว state หายเมื่อออกจากหน้า (React `useState` เท่านั้น)
งานฝั่ง owner คือเพิ่มเกมใหม่ทีละเกมผ่าน catalog `lib/games.ts` + route folder ซึ่ง `tests/games.test.ts` บังคับให้ครบ

```mermaid
flowchart LR
  subgraph Visitor
    V1["Land on / from portfolio or GitHub"] --> V2["Read hero + build-status ladder"]
    V2 --> V3["Click PLAY or Open game"]
    V3 --> V4["Play in browser - client-side rules"]
    V4 --> V5{"won or lost"}
    V5 -- "PLAY AGAIN / Reset" --> V4
    V5 -- "Back to the arcade" --> V2
    V2 --> V6["More projects directory"]
    V2 --> V7["Source on GitHub"]
  end
  subgraph Owner["Owner - solo"]
    O1["Write lib game module + tests"] --> O2["Add entry to lib/games.ts"]
    O2 --> O3["Add app/games/slug route, client, OG image"]
    O3 --> O4["Push to main"]
    O4 --> O5["CI: lint, typecheck, test, build, security"]
    O4 --> O6["Vercel Git deploy to Production"]
    O6 --> O7["Deploy smoke checks live site"]
  end
  subgraph Agents["AI agents"]
    A1["MCP client calls /api/mcp list_games"]
  end
```

Sources: `app/page.tsx`, `app/games/*/page.tsx`, `app/games/*/game-client.tsx`, `lib/games.ts`, `lib/roadmap.ts`, `tests/games.test.ts`, `app/api/mcp/route.ts`, `lib/mcp.ts`, `.github/workflows/ci.yml`, `.github/workflows/deploy-smoke.yml`, `README.md`

## To-Be (จาก PRODUCT.md, README, docs/UPGRADE-PLAN.md, docs/measurement/KPI-PLAN.md เท่านั้น)

```mermaid
flowchart LR
  T1["Visitor lands"] --> T2["Dedicated select screen - planned"]
  T2 --> T3["Play game"]
  T3 -->|"game_run_started - planned event"| AN["Analytics tool - not chosen"]
  T3 --> T4{"Finish run"}
  T4 -->|"game_run_finished - planned event"| AN
  T4 --> T5["Local high score in localStorage - planned P1"]
  T5 --> T2
  T3 -. "errors" .-> SE["Sentry"]
```

Sources: `PRODUCT.md` (Status, 60-second goal), `README.md` (Stage 3: select screen + high scores), `docs/UPGRADE-PLAN.md` (P1 high scores in `localStorage`, P2 Playwright smoke), `docs/measurement/KPI-PLAN.md` (events `game_run_started` / `game_run_finished`, KPI-O-01)

## Open questions

- เลือก analytics tool ตัวไหน (KPI-PLAN กำหนดตัดสินใจภายใน 2026-11-15) และ cookieless หรือ consent-gated
- select screen เป็นหน้าแยก (`/games`?) หรือแทนที่ home — ไม่มี spec
- `SITE_URL` (`lib/site.ts`) = `https://bookchaowalit.com` แต่ live host คือ `game-collection.bookchaowalit.com` (UPGRADE-PLAN P0) — To-Be ควรใช้ domain ไหน
