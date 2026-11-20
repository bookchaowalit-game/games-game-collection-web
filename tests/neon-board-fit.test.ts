import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const rules = (selector: string) =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, sel]) => sel.split(",").map((s) => s.trim()).includes(selector))
    .map(([, , body]) => body);

describe("Neon Harvest layout", () => {
  // The game maps positions and hit boxes as percentages of the board while the sprites are rem-sized, so the
  // board must never be shrunk to fit short screens: sprites would outgrow their hit boxes and clip at the edge.
  it("keeps the board at full column width with its 20rem floor (no viewport-height shrink)", () => {
    const board = rules(".neon-board");
    expect(board.some((body) => /aspect-ratio: 16 \/ 10;/.test(body) && /min-height: 20rem;/.test(body))).toBe(true);
    for (const body of board) {
      expect(body).not.toMatch(/svh|vh\b|vh\)/);
      expect(body).not.toMatch(/min-height: 0/);
    }
  });

  it("keeps the start and replay button at a 44px minimum target", () => {
    expect(rules(".game-button").some((body) => /min-height: 44px;/.test(body))).toBe(true);
  });

  it("lets the long footer email link wrap instead of pushing the page sideways", () => {
    expect(rules('.rs-foot a[href^="mailto:"]').some((body) => /overflow-wrap: anywhere;/.test(body))).toBe(true);
  });
});
