import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "vitest";
import { GAMES } from "../lib/games.ts";
import {
  STAGES,
  STATUS_LABEL,
  countWord,
  hasShippedGame,
  honestyCopy,
  listTitles,
  liveSummary,
} from "../lib/roadmap.ts";

describe("game collection roadmap honesty", () => {
  it("marks the first playable game shipped only after a real ship", () => {
    assert.equal(hasShippedGame(), true);
    const playable = STAGES.find((s) => /playable game/i.test(s.label));
    assert.ok(playable);
    assert.equal(playable?.status, "done");
  });

  it("exposes honest status labels", () => {
    assert.equal(STATUS_LABEL.done, "Shipped");
    assert.equal(STATUS_LABEL.planned, "Planned");
    assert.match(honestyCopy(), /Twelve games are live/i);
  });
});

describe("roadmap copy follows the catalog size", () => {
  it("spells counts and pluralizes", () => {
    assert.equal(honestyCopy(1), "One game is live");
    assert.equal(honestyCopy(13), "Thirteen games are live");
    assert.equal(honestyCopy(25), "25 games are live");
    assert.equal(countWord(0), "zero");
    assert.equal(countWord(-1), "-1");
  });

  it("lists titles with an Oxford comma", () => {
    assert.equal(listTitles(["A"]), "A");
    assert.equal(listTitles(["A", "B"]), "A and B");
    assert.equal(listTitles(["A", "B", "C"]), "A, B, and C");
  });

  it("names the game count in the roadmap, not every title (the cards list them)", () => {
    const playable = STAGES.find((s) => /playable game/i.test(s.label));
    assert.equal(playable?.label, `${honestyCopy().split(" ")[0]} playable games`);
    for (const game of GAMES) {
      assert.ok(!playable?.detail.includes(game.title), `${game.title} should not be repeated in the roadmap`);
    }
    assert.match(liveSummary(), new RegExp(`^${honestyCopy().split(" ")[0]} games are shipped`));
  });

  it("keeps the homepage free of hard-coded game counts", () => {
    const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
    assert.doesNotMatch(page, /\b(Twelve|twelve|12) games\b/);
    assert.ok(page.includes("liveSummary()"));
  });
});
