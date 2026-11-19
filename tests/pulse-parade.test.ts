import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  GOOD_WINDOW_MS,
  INITIAL_STATE,
  NOTE_PATTERN,
  ROUND_END_MS,
  getAccuracy,
  hitPulse,
  startPulse,
  tickPulse,
} from "../lib/pulse-parade.ts";

describe("Pulse Parade rules", () => {
  it("starts with a clean timed set", () => {
    const state = startPulse();

    assert.equal(state.phase, "playing");
    assert.equal(state.judgements.every((judgement) => judgement === "pending"), true);
    assert.equal(state.elapsedMs, 0);
  });

  it("awards a perfect hit inside the tight timing window", () => {
    const state = { ...startPulse(), elapsedMs: NOTE_PATTERN[0].atMs };
    const next = hitPulse(state, NOTE_PATTERN[0].lane);

    assert.equal(next.lastJudgement, "perfect");
    assert.equal(next.perfects, 1);
    assert.equal(next.hits, 1);
    assert.equal(next.combo, 1);
    assert.ok(next.score > 0);
  });

  it("marks overdue notes as misses and breaks the combo", () => {
    const state = { ...startPulse(), combo: 3, elapsedMs: NOTE_PATTERN[0].atMs + GOOD_WINDOW_MS + 1 };
    const next = tickPulse(state, state.elapsedMs);

    assert.equal(next.misses, 1);
    assert.equal(next.combo, 0);
    assert.equal(next.lastJudgement, "miss");
  });

  it("ignores the wrong lane without consuming the note", () => {
    const state = { ...startPulse(), elapsedMs: NOTE_PATTERN[0].atMs };
    const next = hitPulse(state, 3);

    assert.equal(next.hits, 0);
    assert.equal(next.misses, 0);
    assert.equal(next.judgements[0], "pending");
  });

  it("wins when the player lands every note", () => {
    let state = startPulse();

    for (const note of NOTE_PATTERN) {
      state = hitPulse({ ...state, elapsedMs: note.atMs }, note.lane);
    }

    state = tickPulse(state, ROUND_END_MS);

    assert.equal(state.phase, "won");
    assert.equal(state.hits, NOTE_PATTERN.length);
    assert.equal(getAccuracy(state), 100);
  });

  it("loses a set with no hits", () => {
    const state = tickPulse(startPulse(), ROUND_END_MS);

    assert.equal(state.phase, "lost");
    assert.equal(state.misses, NOTE_PATTERN.length);
    assert.deepEqual(INITIAL_STATE.phase, "ready");
  });
});
