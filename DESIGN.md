# DESIGN

Floor: [ADR-0007 design floor 1.0.0](https://github.com/bookchaowalit/architecture-docs/blob/main/design-floor/FLOOR.md), checked by `design-floor.json` (15 routes, widths 320 / 375 / 390 / 768 / 1440) in the `design-floor` CI job.

## Tokens

The vendored `app/design-floor/tokens.css` (`css-vars` 1.0.0) is unchanged. This app's values live in `app/globals.css` and are mapped onto the floor names in `app/app-theme.css`. Dark mode: **yes**, from the OS setting (`prefers-color-scheme`) through the app's own variables; there is no `data-theme` switch.

| Floor token | Light | Dark | App source |
|---|---|---|---|
| `--color-bg` | `#f4f5f2` | `#15171b` | `--paper` |
| `--color-surface` | `#ffffff` | `#1c1f24` | `--paper-raised` |
| `--color-fg` | `#16181c` | `#ecede9` | `--ink` |
| `--color-fg-muted` | `#575c60` | `#a5aaac` | `--ink-dim` |
| `--color-accent` / `--color-focus` | `#9a3dbe` | `#c766e8` | `--accent` |
| `--color-accent-fg` | `#ffffff` | `#1c1424` | `--accent-ink` |
| `--color-border` | `#dbded7` | `#2c3036` | `--border` |
| `--color-danger` | `#c4452a` | `#e2704e` | `--danger` |
| `--color-success` | `#176b4c` | `#3eba8a` | `--good` |

App-only colours used for text (all at least 4.5:1 on the surfaces they sit on): `--ink-faint` `#63696c` light / `#8f9497` dark; `--warn` `#7d5a12` light / `#dcac4f` dark.

Fonts: `--font-sans` is Geist (Latin) followed by Noto Sans Thai (Thai fallback, `next/font/google`, loaded on `<html>`). Geist Mono and Press Start 2P stay as they were.

Radii (kept at the app's Tailwind values): `--radius-sm` `0.25rem`, `--radius-md` `0.375rem`, `--radius-lg` `0.5rem`.

Line-height: body `1.7` (`--leading-thai`), text sizes `1.7`, `text-2xl` and up `1.35` (`--leading-thai-heading`).

Content language: English. `<html lang="en">`. There is no Thai copy on the site today, so Thai-specific checks pass on the fallback face alone.

Waivers: none.

## Behaviour

- Skip link: the first Tab stop on every route goes to `#main-content`, the `<main>` of each page.
- Reduced motion: the game pages and the home page honour `prefers-reduced-motion` through `motion-reduce` and `motion-safe` classes and the `@media (prefers-reduced-motion: reduce)` blocks in `app/globals.css`. The `reduced-motion` floor rule passes on every route with no waiver.
- Game routes need no waiver: no route has animation that the floor flags.
