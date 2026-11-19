import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_STATE,
  STORY_SCENES,
  chooseStoryChoice,
  currentScene,
  isChoiceAvailable,
  resetLanternRoute,
} from "../lib/lantern-route.ts";

describe("Lantern Route rules", () => {
  it("starts with a warm lantern and five chapters", () => {
    assert.equal(INITIAL_STATE.phase, "playing");
    assert.equal(INITIAL_STATE.supplies, 4);
    assert.equal(INITIAL_STATE.trust, 2);
    assert.equal(INITIAL_STATE.light, 3);
    assert.equal(STORY_SCENES.length, 5);
    assert.equal(currentScene(INITIAL_STATE).id, "gate");
  });

  it("applies a choice and records the chapter history", () => {
    const state = chooseStoryChoice(INITIAL_STATE, "mend-gate");

    assert.equal(state.sceneIndex, 1);
    assert.equal(state.supplies, 3);
    assert.equal(state.trust, 3);
    assert.deepEqual(state.history[0], {
      sceneId: "gate",
      choiceId: "mend-gate",
      label: "Mend the gate",
    });
  });

  it("blocks a choice when its resource requirement is missing", () => {
    const finalScene = STORY_SCENES[STORY_SCENES.length - 1];
    const beacon = finalScene.choices.find((choice) => choice.id === "light-beacon");
    assert.ok(beacon);

    const exhausted = { ...INITIAL_STATE, light: 2, sceneIndex: STORY_SCENES.length - 1 };
    assert.equal(isChoiceAvailable(exhausted, beacon), false);
    assert.deepEqual(chooseStoryChoice(exhausted, "light-beacon"), exhausted);
  });

  it("wins by protecting the route and lighting the beacon", () => {
    let state = INITIAL_STATE;
    for (const choice of ["mend-gate", "share-grain", "tie-rope", "shelter", "light-beacon"]) {
      state = chooseStoryChoice(state, choice);
    }

    assert.equal(state.phase, "won");
    assert.equal(state.ending, "beacon");
    assert.equal(state.history.length, 5);
    assert.match(state.message, /hundred small lights/i);
  });

  it("supports a smaller flame ending when trust survives", () => {
    let state = INITIAL_STATE;
    for (const choice of ["mend-gate", "trade-flame", "tie-rope", "signal-cliff", "carry-flame"]) {
      state = chooseStoryChoice(state, choice);
    }

    assert.equal(state.phase, "won");
    assert.equal(state.ending, "flame");
    assert.match(state.message, /one flame/i);
  });

  it("loses when every early choice abandons the route", () => {
    let state = INITIAL_STATE;
    for (const choice of ["take-road", "pass-silent", "ford-dark", "race-storm", "turn-back"]) {
      state = chooseStoryChoice(state, choice);
    }

    assert.equal(state.phase, "lost");
    assert.equal(state.ending, "lost");
    assert.match(state.message, /storm folds/i);
  });

  it("resets to the first chapter", () => {
    const changed = chooseStoryChoice(INITIAL_STATE, "take-road");

    assert.deepEqual(resetLanternRoute(), INITIAL_STATE);
    assert.notDeepEqual(changed, INITIAL_STATE);
  });
});
