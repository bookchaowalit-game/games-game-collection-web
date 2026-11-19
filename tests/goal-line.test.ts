import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  AIM_OPTIONS,
  GOAL_TARGET,
  INITIAL_STATE,
  SHOT_COUNT,
  SHOT_FORECASTS,
  advanceToNextShot,
  resetGoalLine,
  selectAim,
  selectHeight,
  takeShot,
} from "../lib/goal-line.ts";

describe("Goal Line rules", () => {
  it("starts with five shots and a planning state", () => {
    assert.equal(INITIAL_STATE.phase, "planning");
    assert.equal(SHOT_COUNT, 5);
    assert.equal(INITIAL_STATE.goals, 0);
  });

  it("scores when aim or height beats the keeper read", () => {
    const state = selectHeight(selectAim(INITIAL_STATE, "right"), "high");
    const next = takeShot(state);

    assert.equal(next.phase, "summary");
    assert.equal(next.goals, 1);
    assert.equal(next.saves, 0);
    assert.equal(next.lastShot?.goal, true);
  });

  it("records a save when the keeper matches both dimensions", () => {
    const forecast = SHOT_FORECASTS[0];
    const state = selectHeight(selectAim(INITIAL_STATE, forecast.keeperAim), forecast.keeperHeight);
    const next = takeShot(state);

    assert.equal(next.saves, 1);
    assert.equal(next.goals, 0);
    assert.equal(next.lastShot?.goal, false);
  });

  it("advances a summary back to the next planning shot", () => {
    const summary = takeShot(INITIAL_STATE);
    const next = advanceToNextShot(summary);

    assert.equal(next.phase, "planning");
    assert.equal(next.round, 1);
    assert.equal(next.lastShot, null);
  });

  it("wins a shootout with three goals", () => {
    let state = INITIAL_STATE;

    for (const forecast of SHOT_FORECASTS) {
      const aim = AIM_OPTIONS.find((option) => option.id !== forecast.keeperAim)?.id ?? "left";
      state = takeShot(selectHeight(selectAim(state, aim), forecast.keeperHeight));
      if (state.phase === "summary") {
        state = advanceToNextShot(state);
      }
    }

    assert.equal(state.phase, "won");
    assert.ok(state.goals >= GOAL_TARGET);
  });

  it("loses when the final score misses the target", () => {
    let state = INITIAL_STATE;

    for (const forecast of SHOT_FORECASTS) {
      state = takeShot(selectHeight(selectAim(state, forecast.keeperAim), forecast.keeperHeight));
      if (state.phase === "summary") {
        state = advanceToNextShot(state);
      }
    }

    assert.equal(state.phase, "lost");
    assert.equal(state.goals, 0);
  });

  it("keeps the reset baseline intact", () => {
    assert.deepEqual(resetGoalLine(), INITIAL_STATE);
  });
});
