---
title: "Book Arcade — KPI and Instrumentation Plan"
status: approved
created: 2026-10-22
updated: 2026-10-22
description: "How the arcade would know visitors play its games, and what is missing to measure it."
template: architecture-docs templates/sdlc/kpi-and-instrumentation-plan.md
---

# Book Arcade — KPI and Instrumentation Plan

## Document control

| Field | Value |
|---|---|
| Product | bookchaowalit-game/games-game-collection-web (https://game-collection.bookchaowalit.com) |
| Version / status | 0.1 / **approved** (2026-10-24) — no analytics installed; nothing measured yet |
| Metric owner | Owner (bookchaowalit) |
| AI maker | Claude Code (Wave 3 session, 2026-10-22) |
| Analytics source of truth | none yet (decision needed, ADR-0005 default stack); Sentry for errors once a DSN is set |
| Next review | 2026-11-15 (Milestone M1) |

## KPI tree

PRODUCT.md defines success as "play one of the twelve games in under a minute".

```text
OBJ-01 A portfolio visitor plays a complete small game within a minute
  └─ KPI-O-01 Visits that start a game run / visits
       ├─ KPI-L-01 Median time from landing to first game start
       ├─ KPI-L-02 Runs finished (game over or win) / runs started
       └─ KPI-G-01 Client error events per 1,000 runs (Sentry)
```

## KPI definitions

| KPI ID | Type | Formula | Source | Baseline | Target | Status |
|---|---|---|---|---|---|---|
| KPI-O-01 | outcome | visits with `game_run_started` / visits | analytics tool (not installed) | not yet measured | ≥ 30% by 2026-12-31 | planned |
| KPI-L-01 | leading | median(`game_run_started`.time − first page view time) per visit | analytics tool | not yet measured | ≤ 60 s | planned |
| KPI-L-02 | leading | `game_run_finished` / `game_run_started` | analytics tool | not yet measured | set after baseline | planned |
| KPI-G-01 | guardrail | Sentry error events / runs × 1000 | Sentry + analytics | not yet measured | must not rise after a release | planned |

Below 100 visits in a period a rate is reported as "not measurable".

## Event and data specification

| Event | Trigger | Properties | Personal data? | Status |
|---|---|---|---|---|
| `game_run_started` | First input in a game | `game` (slug) | no | planned |
| `game_run_finished` | Game over or win screen | `game`, `outcome`, `duration_s` | no | planned |

Use a cookieless tool or wait for consent before sending events. No free text, names or scores tied to a person.

## Instrumentation verification (before G10)

Not started: no events exist yet. Check 6 (baselines) is waived until the analytics tool is chosen; dated action:
decide the tool by 2026-11-15.

## Approval (2026-10-24)

| Field | Value |
|---|---|
| Checker | independent Claude reviewer subagent (`solo:solo-reviewer`, Sonnet, read-only, no maker context) |
| Approver | AI approval under the owner's process (approvals by the owner or AI with evidence; maker and checker are different agents). Recorded by Claude session oa-remainder on the owner's instruction "ทำที่เหลือให้หน่อย" (2026-10-24) |
| Verdict | **approved** |
| Evidence | No game_run_* or analytics code; Sentry wired (lib/sentry.ts, instrumentation*.ts); all events and KPIs marked planned. |
