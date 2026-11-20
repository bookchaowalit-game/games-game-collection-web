import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// On short landscape screens the timer HUD and the whole board must show together under the sticky Reader
// top bar, so every spot the player can reach is visible and the arrow keys never need to scroll.
// Rendered sizes (Chromium): top bar 52px, scroll-padding-top 64px, HUD 38px tall (one line plus 1rem padding).
const SCROLL_PADDING_TOP = 64;
const HUD_HEIGHT = 38;
const READER_COLUMN = (vw: number) => Math.min(1120, vw) - 2 * Math.min(32, Math.max(16, vw * 0.04)) - 2 * 32;

describe("Neon Harvest board sizing", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const block = css.slice(css.indexOf("/* Neon Harvest: fit the timer HUD"));
  const rule = block.match(/@media \(min-width: 641px\) \{\s*\.neon-board \{([^}]*)\}/)?.[1] ?? "";
  const offset = Number(rule.match(/calc\(\(100svh - (\d+)px\) \* 16 \/ 10\)/)?.[1] ?? NaN);

  it("sizes the board from the svh left under the bar and the HUD, keeping 16:10 and no min-height", () => {
    expect(rule).toContain("margin-inline: auto;");
    expect(rule).toMatch(/min-height: 0;/);
    expect(css).toMatch(/\.neon-board \{[^}]*aspect-ratio: 16 \/ 10;/);
    expect(offset).toBeGreaterThanOrEqual(SCROLL_PADDING_TOP + HUD_HEIGHT);
  });

  for (const [vw, vh] of [[1366, 600], [844, 390], [650, 350]]) {
    it(`fits the timer and the whole board under the bar at ${vw}x${vh}`, () => {
      const width = Math.min(READER_COLUMN(vw), (vh - offset) * 16 / 10);
      expect(SCROLL_PADDING_TOP + HUD_HEIGHT + width / 1.6).toBeLessThanOrEqual(vh);
    });
  }
});
