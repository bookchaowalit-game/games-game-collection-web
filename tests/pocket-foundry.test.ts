import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  MINE_INDEX,
  SHIPMENT_INDEX,
  TARGET_SHIPMENTS,
  advanceCycle,
  evaluateFactory,
  placeTile,
  removeTile,
  resetPocketFoundry,
  runCycle,
  selectBlueprint,
} from "../lib/pocket-foundry.ts";

describe("Pocket Foundry rules", () => {
  it("starts with a mine, a shipment bay, and six available builds", () => {
    assert.equal(INITIAL_STATE.tiles[MINE_INDEX], "mine");
    assert.equal(INITIAL_STATE.tiles[SHIPMENT_INDEX], "shipment");
    assert.deepEqual(INITIAL_STATE.inventory, { conveyor: 4, smelter: 1, press: 1 });
    assert.equal(INITIAL_STATE.shipments, 0);
  });

  it("places a selected blueprint and consumes one inventory item", () => {
    const state = placeTile(INITIAL_STATE, 1);

    assert.equal(state.tiles[1], "conveyor");
    assert.equal(state.inventory.conveyor, 3);
    assert.equal(placeTile(state, MINE_INDEX), state);
  });

  it("supports removing a machine and refunding its blueprint", () => {
    const placed = placeTile(INITIAL_STATE, 1);
    const removed = removeTile(placed, 1);

    assert.equal(removed.tiles[1], "empty");
    assert.equal(removed.inventory.conveyor, 4);
    assert.equal(removeTile(INITIAL_STATE, SHIPMENT_INDEX), INITIAL_STATE);
  });

  it("rejects a route without both processing steps", () => {
    let state = INITIAL_STATE;
    for (const index of [1, 2, 3, 7]) {
      state = placeTile(state, index);
    }
    state = selectBlueprint(state, "smelter");
    state = placeTile(state, 11);

    const evaluation = evaluateFactory(state.tiles);
    assert.equal(evaluation.ready, false);
    assert.match(evaluation.reason, /smelter and one press/i);
  });

  it("finds a complete route through the smelter and press", () => {
    let state = INITIAL_STATE;
    state = placeTile(state, 1);
    state = selectBlueprint(state, "smelter");
    state = placeTile(state, 2);
    state = selectBlueprint(state, "press");
    state = placeTile(state, 3);
    state = selectBlueprint(state, "conveyor");
    state = placeTile(state, 7);
    state = placeTile(state, 11);

    const evaluation = evaluateFactory(state.tiles);
    assert.equal(evaluation.ready, true);
    assert.ok(evaluation.route.includes(2));
    assert.ok(evaluation.route.includes(3));
  });

  it("ships three cycles and wins the foundry", () => {
    let state = INITIAL_STATE;
    state = placeTile(state, 1);
    state = selectBlueprint(state, "smelter");
    state = placeTile(state, 2);
    state = selectBlueprint(state, "press");
    state = placeTile(state, 3);
    state = selectBlueprint(state, "conveyor");
    state = placeTile(state, 7);
    state = placeTile(state, 11);

    for (let cycle = 0; cycle < TARGET_SHIPMENTS - 1; cycle += 1) {
      state = runCycle(state);
      state = advanceCycle(state);
    }
    state = runCycle(state);

    assert.equal(state.shipments, TARGET_SHIPMENTS);
    assert.equal(state.phase, "won");
    assert.equal(state.lastRun?.shipped, true);
  });

  it("loses after exhausting cycles without a connected line", () => {
    let state = INITIAL_STATE;
    for (let cycle = 0; cycle < 8; cycle += 1) {
      state = runCycle(state);
      if (state.phase === "summary") {
        state = advanceCycle(state);
      }
    }

    assert.equal(state.phase, "lost");
    assert.equal(state.shipments, 0);
  });

  it("resets to the original empty line", () => {
    const changed = placeTile(INITIAL_STATE, 1);

    assert.deepEqual(resetPocketFoundry(), INITIAL_STATE);
    assert.notDeepEqual(changed, INITIAL_STATE);
  });
});
