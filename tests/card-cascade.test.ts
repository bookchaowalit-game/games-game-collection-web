import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  ROOM_COUNT,
  chooseReward,
  endTurn,
  getCardDefinition,
  playCard,
  startCascade,
} from "../lib/card-cascade.ts";

describe("Card Cascade rules", () => {
  it("starts a run with a three-card hand and three energy", () => {
    const state = startCascade();

    assert.equal(state.phase, "playing");
    assert.equal(state.hand.length, 3);
    assert.equal(state.energy, 3);
    assert.equal(state.deck.length, 3);
  });

  it("spends energy and sends a played card to the discard pile", () => {
    const state = startCascade();
    const next = playCard(state, 0);

    assert.equal(next.energy, state.energy - getCardDefinition("strike").cost);
    assert.equal(next.enemy.hp, state.enemy.hp - getCardDefinition("strike").damage);
    assert.equal(next.hand.length, 2);
    assert.equal(next.discard[next.discard.length - 1], "strike");
  });

  it("blocks incoming intent and draws a fresh hand on end turn", () => {
    const state = { ...startCascade(), block: 2 };
    const next = endTurn(state);

    assert.equal(next.hp, state.hp - (state.enemy.intent - state.block));
    assert.equal(next.block, 0);
    assert.equal(next.turn, 2);
    assert.equal(next.hand.length, 3);
  });

  it("offers a deck-building reward after clearing a room", () => {
    const state = {
      ...startCascade(),
      enemy: { ...startCascade().enemy, hp: 7 },
      hand: ["strike"] as const,
      energy: 1,
    };
    const cleared = playCard(state, 0);

    assert.equal(cleared.phase, "reward");
    assert.equal(cleared.room, 0);
    assert.equal(cleared.rewardOptions.length, 2);

    const next = chooseReward(cleared, cleared.rewardOptions[0]);

    assert.equal(next.phase, "playing");
    assert.equal(next.room, 1);
    assert.equal(next.enemy.hp, next.enemy.maxHp);
    assert.equal(next.hand.length, 3);
  });

  it("ends the run when damage reduces HP to zero", () => {
    const state = { ...startCascade(), hp: 1, block: 0 };
    const next = endTurn(state);

    assert.equal(next.phase, "lost");
    assert.equal(next.hp, 0);
    assert.equal(next.hand.length, 0);
  });

  it("wins after clearing the final room", () => {
    const started = startCascade();
    const state = {
      ...started,
      room: ROOM_COUNT - 1,
      enemy: { ...started.enemy, hp: 7 },
      hand: ["strike"] as const,
      energy: 1,
    };
    const next = playCard(state, 0);

    assert.equal(next.phase, "won");
    assert.equal(next.enemy.hp, 0);
  });

  it("keeps the ready state immutable on reset baseline", () => {
    assert.equal(INITIAL_STATE.phase, "ready");
    assert.equal(INITIAL_STATE.room, 0);
    assert.deepEqual(INITIAL_STATE.hand, []);
  });
});
