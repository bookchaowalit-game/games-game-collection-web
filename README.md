# Book Arcade

## Archived twin decision — 2026-10-15 (BOO-197)

This repository remains canonical. The former website-owner alias resolves to
[`bookchaowalit-website/games-game-collection-web`](https://github.com/bookchaowalit-website/games-game-collection-web),
which GitHub currently reports as archived. Compare its source commit
[`df7ff62ffa6e7ad04c3556cfb837b3e3af32fd21`](https://github.com/bookchaowalit-website/games-game-collection-web/tree/df7ff62ffa6e7ad04c3556cfb837b3e3af32fd21)
against this repository's pre-note commit
`45f1db544ffe9c6f595b192823bb0ca0eee590e4` (17 versus 97 tracked files).
The older 16-file inventory predates the twin's added `LICENSE`.

| Twin-only content or difference | Decision / current port state |
|---|---|
| `DESIGN.md` (20 lines); cabinet-archive redesign `06822d683341523bb7fe24de2ae49161a33974fe`, dated 2026-08-23 | Retain as archived design reference; the file is absent here |
| `app/page.tsx` (40 lines): third-party game library, search/status filters, add/eject and `game-collection-v2` localStorage | Not ported. This is a personal library tracker; canonical Book Arcade ships playable original games |
| `app/globals.css`, `app/layout.tsx`: archive-paper/cabinet palette, DM Serif Display/DM Mono and cabinet composition | Not ported; keep the canonical arcade visual system |
| `README.md`, `PRODUCT.md` | Distinct twin product/design narrative; preserve in archived history rather than replacing the canonical brief |
| `app/more-projects/page.tsx` | Different sibling-directory presentation; no unique library capability to migrate |
| `package.json`, `package-lock.json`, `tsconfig.json` | Configuration differences, not unique product content; no dependency/config copy |

The other seven tracked files are byte-identical boilerplate/assets (including
`LICENSE`), not evidence that the cabinet redesign was ported. **Decision:
retain the archived twin as historical reference; migrate no unique feature in
this step.** No content was invented in the twin, respecting canonical-twins
registry rule 3. This note records the unique-content decision; it does not
claim a new deployment, public-link migration, archive action or owner release
approval. The twin was not edited or unarchived.

A small arcade of games by [bookchaowalit](https://bookchaowalit.com), built in
public. The first twelve playable games, **Neon Harvest**, **Signal Shift**,
**Gridline**, **Midnight Market**, **Pulse Parade**, **Card Cascade**, **Last
Light**, **Goal Line**, **Echo Chamber**, **Pocket Foundry**, **Lantern Route**, and
**Prism Drift**, are now shipped. The homepage tracks the remaining arcade layer as planned work instead of
hiding behind a vague "coming soon" promise. See [`PRODUCT.md`](./PRODUCT.md)
for the product brief.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
├── page.tsx           # homepage: hero, build-status ladder, game links
├── games/neon-harvest/    # first playable arcade game
├── games/signal-shift/    # second playable puzzle game
├── games/gridline/        # third playable tactical game
├── games/midnight-market/ # fourth playable simulation game
├── games/pulse-parade/    # fifth playable rhythm game
├── games/card-cascade/    # sixth playable roguelite game
├── games/last-light/      # seventh playable survival game
├── games/goal-line/       # eighth playable sports game
├── games/echo-chamber/    # ninth playable horror deduction game
├── games/pocket-foundry/  # tenth playable automation game
├── games/lantern-route/   # eleventh playable interactive narrative game
├── games/prism-drift/     # twelfth playable gravity platformer game
├── not-found.tsx       # 404 in the same Reader frame
├── reader-shell.css    # shared Reader shell (copied byte for byte, see READER.md)
├── api/mcp/             # read-only MCP endpoint: `list_games` tool
├── sitemap.ts           # generated from lib/games.ts
└── globals.css          # Reader shell import, plus the arcade tokens the game panels use
components/
├── reader-shell.tsx     # shared Reader shell pieces
└── arcade.tsx           # ArcadeFrame (top bar + footer) and GamePage (head, game, facts, previous/next)
lib/
├── games.ts             # game catalog (source of truth for sitemap, headers, MCP)
├── <game>.ts            # pure rules for each game, unit-tested in tests/
└── mcp.ts, site.ts, roadmap.ts
```

## Checks

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

CI (`.github/workflows/ci.yml`) runs the same four commands. Tests run in Vitest with a 92% line gate
(the canvas game clients are excluded; their rules in `lib/<game>.ts` are covered). Adding a game means
adding it to `lib/games.ts`; `tests/games.test.ts` fails until the route folder, social card, page slug
and canonical path all exist. `/more-projects` redirects permanently (308) to https://bookchaowalit.com/.

Design tokens follow the shared Book Design System doc (solo-empire workspace: docs/systems/book-design-system.md — not part of this repo) —
ink/paper neutrals plus one domain accent (`Game`, magenta-purple). Since 2026-11-19 the page frame
(home, game page heads, 404) uses the shared Reader shell in Geist; the `Press Start 2P` pixel face
and the arcade tokens stay only inside the game panels. The home page has one filled CTA (Play Neon
Harvest), plain links to the game list and the source, and one card per game with its generated title
card (`/games/<slug>/opengraph-image`) as a lazy-loaded thumbnail.

## Status

Stage 1 (visual identity & shell) shipped 2026-08-04. Stage 2 (playable game
layer) shipped with Neon Harvest, Signal Shift, Gridline, Midnight Market,
Pulse Parade, Card Cascade, Last Light, Goal Line, Echo Chamber, Pocket Foundry,
Lantern Route, and Prism Drift. Stage 3 (full arcade) is in progress
— the select screen and high scores remain next.
