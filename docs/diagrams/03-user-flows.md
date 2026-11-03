# 03 — User flows

Status: **done**. Role เดียวที่มี UI คือ anonymous visitor; flow มาจาก routes ใน `app/` และ phase ของแต่ละเกม

## Flow A — Landing → play → replay

```mermaid
flowchart TD
  A["/ home"] --> B{"Choose"}
  B -->|"PLAY title button or Open game card"| G["/games/slug page"]
  B -->|"More projects"| M["/more-projects"]
  B -->|"FOLLOW THE BUILD / Source"| GH["GitHub - external"]
  B -->|"bookchaowalit.com footer"| P["Portfolio - external"]
  G --> H["Read header GAME 00N / 012, intro, controls"]
  H --> S["Start - first input or START ROUND"]
  S --> L["Game loop - lib rules update client state"]
  L --> E{"phase won or lost"}
  E -->|"PLAY AGAIN / Reset"| S
  E -->|"Back to the arcade"| A
  M -->|"external card link"| X["Sibling app on vercel.app"]
  A -.-> NF["Unknown path - app/not-found.tsx 404"]
```

Sources: `app/page.tsx`, `app/games/card-cascade/page.tsx` (โครงหน้าเหมือนกันทั้ง 12 เกม), `app/games/neon-harvest/game-client.tsx`, `app/more-projects/page.tsx`, `app/not-found.tsx`, `lib/games.ts` (`gameCounterLabel`)

## Flow B — Game interaction styles

```mermaid
flowchart LR
  subgraph Realtime["Real-time loop - requestAnimationFrame"]
    R1["Neon Harvest - move, collect, avoid hazards, 45 s"]
    R2["Pulse Parade - hit A S D F lanes in timing window"]
  end
  subgraph Turn["Turn based - button or key per action"]
    T1["Gridline - move on 6x6 grid, enemies chase"]
    T2["Prism Drift - move and flip gravity"]
    T3["Card Cascade - play cards, end turn, pick reward"]
    T4["Signal Shift - rotate tiles, hint, reset"]
  end
  subgraph Plan["Plan then resolve - planning to summary"]
    P1["Midnight Market - 5 days"]
    P2["Last Light - 6 nights"]
    P3["Goal Line - 5 shots"]
    P4["Pocket Foundry - up to 8 cycles"]
  end
  subgraph Choice["Choice driven"]
    C1["Echo Chamber - explore rooms, gather evidence, name source"]
    C2["Lantern Route - 5 chapters of story choices"]
  end
```

Sources: `lib/neon-harvest.ts` (`ROUND_SECONDS = 45`), `lib/pulse-parade.ts` (`LANE_KEYS`), `lib/gridline.ts` (`GRID_SIZE = 6`), `lib/prism-drift.ts`, `lib/card-cascade.ts`, `lib/signal-shift.ts`, `lib/midnight-market.ts`, `lib/last-light.ts` (`NIGHT_COUNT = 6`), `lib/goal-line.ts` (`SHOT_COUNT = 5`), `lib/pocket-foundry.ts` (`CYCLE_LIMIT = 8`), `lib/echo-chamber.ts`, `lib/lantern-route.ts`; keydown handlers ใน `app/games/{gridline,neon-harvest,prism-drift,pulse-parade}/game-client.tsx`

## Open questions

- ไม่มี UI-level test (Playwright เป็น P2 ใน UPGRADE-PLAN) จึงยืนยัน flow ได้จากโค้ดเท่านั้น ไม่ใช่จากการรันจริงใน pack นี้
