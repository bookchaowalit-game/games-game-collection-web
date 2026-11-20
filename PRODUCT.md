# Book Arcade — Product Brief

*Phase 3 identity doc for `bookchaowalit-game-collection-frontend`, written as part of the Book UI Portfolio redesign program (solo-empire workspace: docs/systems/book-design-system.md — not part of this repo).*

## Who is this for

Someone who lands here from bookchaowalit's portfolio or GitHub — curious what the
game-dev side of the work looks like. They should be able to play a complete,
small game quickly and understand that the arcade grows one experiment at a time.

## Problem this solves

The collection needs real playable proof points rather than a static gallery or
an oversized promise to build every genre at once. Neon Harvest, Signal Shift,
Gridline, Midnight Market, Pulse Parade, Card Cascade, Last Light, Goal Line, Echo Chamber, Pocket Foundry, Lantern Route, and Prism Drift now
establish twelve bounded loops — action, logic, tactical strategy, business
simulation, rhythm timing, roguelite deck-building, survival crafting, sports
arcade, horror deduction, automation, interactive narrative, and gravity
platforming — that
can be tested, replayed, and extended.

## What a visitor should accomplish in 60 seconds

Play one of the twelve games in under a minute, understand the current build
status, and leave with one clear next action: replay a game, watch the build on
GitHub, or move on to another project in the portfolio. **Success is a small real
game with an honest next step.**

## What makes it different from a generic template

- No fictional "coming soon" filler pretending to be a game. Neon Harvest,
  Signal Shift, Gridline, Midnight Market, Pulse Parade, Card Cascade, Last Light,
  Goal Line, Echo Chamber, Pocket Foundry, Lantern Route, and Prism Drift are real playable slices, while the select screen,
  high scores, and future games remain explicitly planned.
- Arcade-cabinet visual language (marquee-style pixel type used sparingly,
  coin-slot/press-button micro-interactions on the primary CTA) instead of a
  generic SaaS card grid.
- The cross-portfolio "More projects" directory (already built, genuinely
  useful) is kept and restyled instead of thrown away — it's real
  infrastructure, not template filler.

## Color & typography

- **Domain accent: Game — `#9A3DBE` light / `#C766E8` dark** (magenta-leaning
  purple, distinct from the AI-domain violet used elsewhere in the portfolio),
  from the shared Book Design System doc (solo-empire workspace: docs/systems/book-design-system.md — not part of this repo).
- **Display/marquee face:** `Press Start 2P` (pixel arcade font) — used only
  for the wordmark, section eyebrows, and the primary CTA label. Never for
  paragraph text; an 8-bit face is illegible at body size.
- **Body face:** Geist Sans (kept from the existing scaffold — it's a
  reasonable, legible default once it's not the *only* typographic choice).
- **Numbers:** mono, tabular — for a future high-score/build-count feel.

## Interaction signature

- Primary CTA has a "press-in" micro-interaction (translate + shadow drop on
  `:active`) instead of a generic hover-lift — it should feel like pressing an
  arcade button, not clicking a SaaS button.
- Cards in the status grid get a faint marquee-glow on hover
  (`motion-safe` only — no animation at all under `prefers-reduced-motion`).

## Real content used on this page

The page now links to twelve deterministic client-side games: Neon Harvest, an
arcade action game with keyboard and touch controls; Signal Shift, a circuit
logic puzzle with a hint and reset loop; Gridline, a turn-based tactical game
with pursuit AI; Midnight Market, a five-day business simulation with stock,
pricing, demand, cash, and reputation choices; and Pulse Parade, a rhythm game
with timing windows and combo scoring; and Card Cascade, a four-room roguelite
deck-builder with energy, enemy intent, and card rewards; and Last Light, a
six-night survival crafting game with resource pressure and shelter upgrades; and
Goal Line, a five-shot sports arcade game about reading the keeper and choosing
the right corner and height; and Echo Chamber, a horror deduction game about
exploring six rooms, spending sanity on evidence, and naming the true source; and
Pocket Foundry, an automation puzzle about placing machines into a connected
production chain and shipping three cycles; Lantern Route, an interactive
narrative about carrying a lantern through five chapters with branching endings;
and Prism Drift, a gravity-shifting platformer about collecting prisms and
reaching an exit.
The homepage still separates shipped games from the remaining arcade
infrastructure so the build status stays verifiable.

## Status

v12 shipped as the twelfth playable-game slice after the Book UI Portfolio Phase 6
flagship pass (2026-08-04). First of the two "blank-slate" Tier A repositories
to be redesigned — see the
[Phase 1 audit](https://claude.ai/code/artifact/840ec7d5-df97-4bf4-9fad-67155c3b1d50)
for how it was picked.

## Known limits

- Shared Reader shell, not changed here (2026-11-20 review): with text-only zoom at 200% (Firefox, ~768px) the
  sticky top bar wraps to two lines but `scroll-padding-top` stays 64px, so "All games" can land a heading
  partly under the bar; and in the light theme, when the 92%-opaque bar scrolls over the dark Neon Harvest
  board, its muted tagline drops to about 4.33:1. Both belong to `app/reader-shell.css` and are fixed at
  the source shell, then synced.
