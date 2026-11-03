# 11 — State machines

Status: **done**. ทุกเกมมี lifecycle (`phase`) ใน lib หรือ client; ไม่มี entity ที่ persist
ทุกเกมมี reset ที่กลับไปสถานะเริ่มต้น (ไม่วาดซ้ำในทุกภาพ)

## Plan → resolve games (Midnight Market, Last Light, Goal Line, Pocket Foundry)

```mermaid
stateDiagram-v2
  [*] --> planning
  planning --> summary: resolve step and more steps remain
  summary --> planning: advanceToNext
  planning --> won: final step meets target
  planning --> lost: final step misses target or failure
  won --> planning: reset
  lost --> planning: reset
```

เงื่อนไขจริง: Midnight Market `openMarket` — หลังวันสุดท้าย `cash >= TARGET_CASH (420)` = won; Last Light `resolveNight` — `health <= 0` = lost, ครบ `NIGHT_COUNT (6)` = won;
Goal Line `takeShot` — ครบ `SHOT_COUNT (5)` แล้ว `goals >= GOAL_TARGET (3)` = won; Pocket Foundry `runCycle` — `shipments >= 3` = won (ได้ก่อน cycle สุดท้าย), `cycle >= CYCLE_LIMIT (8)` = lost

Sources: `lib/midnight-market.ts`, `lib/last-light.ts`, `lib/goal-line.ts`, `lib/pocket-foundry.ts`

## Card Cascade

```mermaid
stateDiagram-v2
  [*] --> ready
  ready --> playing: startCascade
  playing --> playing: playCard, endTurn with hp above 0
  playing --> reward: enemy hp 0 and not last room
  reward --> playing: chooseReward
  playing --> won: enemy hp 0 in room 4
  playing --> lost: endTurn and hp at or below 0
  won --> ready: resetCascade
  lost --> ready: resetCascade
```

Sources: `lib/card-cascade.ts` (`CascadePhase`, `ROOM_COUNT = 4`)

## Real-time games (Neon Harvest, Pulse Parade)

```mermaid
stateDiagram-v2
  [*] --> ready
  ready --> playing: START ROUND / startPulse
  playing --> won: Neon all targets collected, Pulse hits at least 8 at round end
  playing --> lost: Neon hazard hit or 45 s, Pulse fewer than 8 hits
  won --> playing: PLAY AGAIN
  lost --> playing: PLAY AGAIN
  won --> ready: Pulse reset to INITIAL_STATE
  lost --> ready: Pulse reset to INITIAL_STATE
```

Sources: `app/games/pulse-parade/game-client.tsx` (`syncState(INITIAL_STATE)`), `app/games/neon-harvest/game-client.tsx` (`type Phase`, `finishRound`), `lib/neon-harvest.ts` (`ROUND_SECONDS`), `lib/pulse-parade.ts` (`tickPulse`, `TARGET_HITS = 8`, `ROUND_END_MS`)

## Move / choice games (Gridline, Prism Drift, Lantern Route, Echo Chamber)

```mermaid
stateDiagram-v2
  [*] --> active
  active --> active: valid move or choice
  active --> won: Gridline last beacon, Prism exit with all prisms, Lantern beacon or flame ending, Echo names attic
  active --> lost: Gridline caught or 28 turns, Prism hits seam X, Lantern lost ending, Echo wrong room
  won --> active: reset
  lost --> active: reset
```

`active` = `playing` (Gridline, Prism Drift, Lantern Route) หรือ `investigating` (Echo Chamber)

Sources: `lib/gridline.ts` (`advanceTurn`, `MAX_TURNS = 28`), `lib/prism-drift.ts`, `lib/lantern-route.ts` (`chooseStoryChoice`, `LanternEnding`), `lib/echo-chamber.ts` (`nameSource`, `ORIGIN_ROOM = "attic"`)

## Signal Shift (ไม่มี phase field)

```mermaid
stateDiagram-v2
  [*] --> unsolved
  unsolved --> unsolved: rotateTile or alignOneTile
  unsolved --> solved: isSolved(board)
  solved --> unsolved: reset to INITIAL_BOARD
```

Sources: `lib/signal-shift.ts`, `app/games/signal-shift/game-client.tsx`

## Roadmap stage status (ข้อมูลคงที่)

```mermaid
stateDiagram-v2
  [*] --> planned
  planned --> progress
  progress --> done
```

`StageStatus = "done" | "progress" | "planned"` — เปลี่ยนโดยแก้โค้ด ไม่มี runtime transition. Sources: `lib/roadmap.ts`
