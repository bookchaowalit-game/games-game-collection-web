import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  advanceTurn,
  getAvailableMoves,
  getNeighbors,
  isWall,
  nextStepToward,
  samePosition,
} from "../lib/gridline.ts";

describe("Gridline rules", () => {
  it("keeps walls blocked and returns adjacent walkable moves", () => {
    assert.equal(isWall({ row: 1, column: 1 }), true);
    assert.equal(isWall({ row: 0, column: 0 }), false);
    assert.deepEqual(getNeighbors({ row: 5, column: 0 }), [
      { row: 4, column: 0 },
      { row: 5, column: 1 },
    ]);
    assert.equal(getAvailableMoves(INITIAL_STATE).length, 2);
  });

  it("rejects illegal actions without consuming a turn", () => {
    const result = advanceTurn(INITIAL_STATE, {
      type: "move",
      position: { row: 4, column: 1 },
    });

    assert.equal(result.changed, false);
    assert.equal(result.state.turn, 0);
  });

  it("captures a beacon and moves sentries on every second turn", () => {
    const state = {
      ...INITIAL_STATE,
      player: { row: 2, column: 0 },
      enemies: [{ row: 0, column: 0 }],
      beacons: [{ row: 2, column: 1 }],
    };

    const first = advanceTurn(state, {
      type: "move",
      position: { row: 2, column: 1 },
    });
    assert.equal(first.captured, true);
    assert.equal(first.state.turn, 1);
    assert.equal(samePosition(first.state.enemies[0], state.enemies[0]), true);
  });

  it("finds a route around obstacles", () => {
    const step = nextStepToward({ row: 0, column: 0 }, { row: 2, column: 1 });

    assert.equal(samePosition(step, { row: 1, column: 0 }), true);
  });

  it("can finish a one-beacon scenario", () => {
    const state = {
      ...INITIAL_STATE,
      player: { row: 5, column: 0 },
      enemies: [],
      beacons: [{ row: 4, column: 0 }],
    };
    const result = advanceTurn(state, {
      type: "move",
      position: { row: 4, column: 0 },
    });

    assert.equal(result.state.phase, "won");
    assert.equal(result.state.beacons.length, 0);
  });

  it("has a winning route from the published starting layout", () => {
    const route = [
      { row: 5, column: 1 },
      { row: 5, column: 2 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 4, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 2 },
      { row: 3, column: 2 },
      { row: 3, column: 1 },
    ];
    let state = INITIAL_STATE;

    for (const position of route) {
      state = advanceTurn(state, { type: "move", position }).state;
    }

    state = advanceTurn(state, { type: "wait" }).state;

    for (const position of [
      { row: 2, column: 1 },
      { row: 2, column: 0 },
      { row: 1, column: 0 },
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 0, column: 3 },
      { row: 0, column: 4 },
      { row: 0, column: 5 },
    ]) {
      state = advanceTurn(state, { type: "move", position }).state;
    }

    assert.equal(state.phase, "won");
    assert.equal(state.turn, 19);
  });
});
