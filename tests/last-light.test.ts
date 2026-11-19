import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  NIGHT_FORECASTS,
  STARTING_BATTERIES,
  advanceToNextNight,
  canTakeAction,
  chooseAction,
  resetLastLight,
  resolveNight,
} from "../lib/last-light.ts";

describe("Last Light rules", () => {
  it("starts with a planning state and a readable first forecast", () => {
    assert.equal(INITIAL_STATE.phase, "planning");
    assert.equal(INITIAL_STATE.night, 0);
    assert.equal(NIGHT_FORECASTS[0].name, "Ashfall Outskirts");
  });

  it("allows affordable actions and rejects unavailable crafting", () => {
    assert.equal(canTakeAction(INITIAL_STATE, "reinforce"), true);
    assert.equal(canTakeAction({ ...INITIAL_STATE, scrap: 2 }, "craft-battery"), false);
  });

  it("applies a chosen action and consumes one battery for night defense", () => {
    const state = chooseAction(INITIAL_STATE, "reinforce");
    const next = resolveNight(state);

    assert.equal(next.phase, "summary");
    assert.equal(next.shelter, INITIAL_STATE.shelter + 1);
    assert.equal(next.batteries, STARTING_BATTERIES - 1);
    assert.ok(next.lastReport);
    assert.equal(next.lastReport?.batteryUsed, true);
  });

  it("moves a summary into the next planning night", () => {
    const summary = resolveNight(INITIAL_STATE);
    const next = advanceToNextNight(summary);

    assert.equal(next.phase, "planning");
    assert.equal(next.night, 1);
    assert.equal(next.lastReport, null);
  });

  it("does not resolve a night when the selected action is unaffordable", () => {
    const state = chooseAction(INITIAL_STATE, "craft-battery");
    const unaffordable = { ...state, scrap: 2 };
    const next = resolveNight(unaffordable);

    assert.deepEqual(next, unaffordable);
  });

  it("loses when a night reduces health to zero", () => {
    const state = {
      ...INITIAL_STATE,
      health: 1,
      batteries: 0,
      shelter: 0,
      warmth: 0,
      selectedAction: "scavenge" as const,
    };
    const next = resolveNight(state);

    assert.equal(next.phase, "lost");
    assert.equal(next.health, 0);
  });

  it("has a winning resource route from the starting shelter", () => {
    let state = INITIAL_STATE;
    const actions = [
      "scavenge",
      "craft-battery",
      "reinforce",
      "craft-battery",
      "rest",
      "rest",
    ] as const;

    for (const action of actions) {
      state = resolveNight(chooseAction(state, action));
      if (state.phase === "summary") {
        state = advanceToNextNight(state);
      }
    }

    assert.equal(state.phase, "won");
    assert.equal(state.night, 6);
  });

  it("keeps reset as the original planning baseline", () => {
    assert.deepEqual(resetLastLight(), INITIAL_STATE);
  });
});
