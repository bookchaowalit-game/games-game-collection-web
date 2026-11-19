import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  MARKET_DAYS,
  TARGET_CASH,
  advanceToNextDay,
  calculateDemand,
  canOpenMarket,
  openMarket,
  type MarketState,
} from "../lib/midnight-market.ts";

describe("Midnight Market rules", () => {
  it("makes demand respond to price and reputation", () => {
    const day = MARKET_DAYS[0];

    assert.ok(calculateDemand(day, 6, 2) > calculateDemand(day, 10, 0));
  });

  it("opens one day, sells stock, and moves to the summary", () => {
    const state = {
      ...INITIAL_STATE,
      selectedPrep: "standard" as const,
      selectedPrice: 8,
    };
    const next = openMarket(state);

    assert.equal(next.phase, "summary");
    assert.equal(next.day, 1);
    assert.ok(next.lastReport);
    assert.ok(next.cash > state.cash);
  });

  it("does not open when the stall cannot afford prep", () => {
    const state = { ...INITIAL_STATE, cash: 0 };

    assert.equal(canOpenMarket(state), false);
    assert.deepEqual(openMarket(state), state);
  });

  it("advances from a summary back to planning", () => {
    const summary = openMarket(INITIAL_STATE);
    const next = advanceToNextDay(summary);

    assert.equal(next.phase, "planning");
    assert.equal(next.day, 1);
    assert.equal(next.lastReport, null);
  });

  it("has a winning full-prep route from the starting budget", () => {
    let state: MarketState = { ...INITIAL_STATE, selectedPrep: "full", selectedPrice: 8 };

    for (let day = 0; day < MARKET_DAYS.length; day += 1) {
      state = openMarket(state);
      if (state.phase === "summary") {
        state = advanceToNextDay(state);
      }
    }

    assert.equal(state.phase, "won");
    assert.ok(state.cash >= TARGET_CASH);
  });
});
