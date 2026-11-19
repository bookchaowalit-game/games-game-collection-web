import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  TOTAL_PRISMS,
  moveHorizontal,
  resetPrismDrift,
  shiftGravity,
} from "../lib/prism-drift.ts";

describe("Prism Drift rules", () => {
  it("starts at the lower rail with three prisms to collect", () => {
    assert.deepEqual(INITIAL_STATE.player, { x: 1, y: 5 });
    assert.equal(INITIAL_STATE.gravity, "down");
    assert.equal(INITIAL_STATE.collected.length, 0);
    assert.equal(TOTAL_PRISMS, 3);
  });

  it("uses upward gravity to lift through and collect the first prism", () => {
    const state = shiftGravity(INITIAL_STATE, "up");

    assert.deepEqual(state.player, { x: 1, y: 1 });
    assert.equal(state.collected.length, 1);
    assert.equal(state.phase, "playing");
  });

  it("completes the intended route after collecting all prisms", () => {
    let state = shiftGravity(INITIAL_STATE, "up");
    state = moveHorizontal(state, 1);
    state = moveHorizontal(state, 1);
    state = moveHorizontal(state, 1);
    state = moveHorizontal(state, 1);
    state = shiftGravity(state, "down");
    state = shiftGravity(state, "up");
    state = moveHorizontal(state, 1);
    state = moveHorizontal(state, 1);

    assert.equal(state.phase, "won");
    assert.equal(state.collected.length, TOTAL_PRISMS);
    assert.equal(state.lastAction, "Exit reached");
  });

  it("loses when the player drifts into the hazard seam", () => {
    let state = moveHorizontal(INITIAL_STATE, 1);
    state = moveHorizontal(state, 1);

    assert.equal(state.phase, "lost");
    assert.match(state.message, /red seam/i);
  });

  it("keeps the player in place when a wall blocks movement", () => {
    const state = moveHorizontal(INITIAL_STATE, -1);

    assert.deepEqual(state.player, INITIAL_STATE.player);
    assert.equal(state.moves, 0);
    assert.equal(state.lastAction, "Wall blocked");
  });

  it("resets a run with fresh mutable collections", () => {
    const state = resetPrismDrift();

    assert.notEqual(state, INITIAL_STATE);
    assert.notEqual(state.player, INITIAL_STATE.player);
    assert.notEqual(state.collected, INITIAL_STATE.collected);
    assert.equal(state.phase, "playing");
    assert.equal(state.moves, 0);
  });
});

