import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The board must fit under the sticky 52px Reader top bar on short landscape screens (say 1366x600),
// so every spot the player can reach is visible at once and the arrow keys never need to scroll.
describe("Neon Harvest board sizing", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const block = css.slice(css.indexOf("/* Neon Harvest: fit the board"));

  it("caps the board width by the viewport height left under the sticky bar, keeping 16:10", () => {
    expect(block.startsWith("/* Neon Harvest: fit the board")).toBe(true);
    expect(block).toMatch(/@media \(min-width: 641px\) \{\s*\.neon-board \{[^}]*width: min\(100%, calc\(\(100svh - 52px - 24px\) \* 16 \/ 10\)\);/);
    expect(block).toMatch(/\.neon-board \{[^}]*margin-inline: auto;/);
    expect(css).toMatch(/\.neon-board \{[^}]*aspect-ratio: 16 \/ 10;/);
  });

  it("keeps the 16:10 board within 548px of height at 1366x600", () => {
    const vw = 1366, vh = 600, column = Math.min(1120, vw) - 64; // Reader column minus its gutters
    const width = Math.min(column, (vh - 52 - 24) * 16 / 10);
    expect(width / 1.6).toBeLessThanOrEqual(vh - 52);
  });
});
