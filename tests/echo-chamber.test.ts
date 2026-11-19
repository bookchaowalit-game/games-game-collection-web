import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  EVIDENCE_OPTIONS,
  INITIAL_STATE,
  ORIGIN_ROOM,
  SANITY_START,
  investigate,
  moveToRoom,
  nameSource,
  resetEchoChamber,
  selectRoom,
} from "../lib/echo-chamber.ts";

describe("Echo Chamber rules", () => {
  it("starts in the foyer with a full sanity meter", () => {
    assert.equal(INITIAL_STATE.currentRoom, "foyer");
    assert.equal(INITIAL_STATE.sanity, SANITY_START);
    assert.deepEqual(INITIAL_STATE.visited, ["foyer"]);
    assert.equal(INITIAL_STATE.phase, "investigating");
  });

  it("only allows movement through connected rooms", () => {
    assert.equal(moveToRoom(INITIAL_STATE, "archive").currentRoom, "archive");
    assert.deepEqual(moveToRoom(INITIAL_STATE, "attic"), INITIAL_STATE);
  });

  it("records one clue per evidence type and spends sanity once", () => {
    const first = investigate(INITIAL_STATE, EVIDENCE_OPTIONS[0].id);
    const duplicate = investigate(first, EVIDENCE_OPTIONS[0].id);

    assert.equal(first.sanity, SANITY_START - 1);
    assert.equal(first.evidence.length, 1);
    assert.deepEqual(duplicate, first);
  });

  it("marks clues from the attic as decisive", () => {
    const attic = moveToRoom(moveToRoom(INITIAL_STATE, "archive"), ORIGIN_ROOM);
    const clue = investigate(attic, "voice");

    assert.equal(clue.lastObservation?.decisive, true);
    assert.match(clue.lastObservation?.text ?? "", /before you finish/i);
  });

  it("wins after marking the true source", () => {
    let state = moveToRoom(moveToRoom(INITIAL_STATE, "archive"), ORIGIN_ROOM);
    state = investigate(state, "voice");
    state = investigate(state, "air");
    state = investigate(state, "reflection");
    state = selectRoom(state, ORIGIN_ROOM);
    state = nameSource(state);

    assert.equal(state.phase, "won");
    assert.equal(state.selectedRoom, ORIGIN_ROOM);
    assert.equal(state.evidence.filter((record) => record.decisive).length, 3);
  });

  it("loses after naming a visited decoy", () => {
    const state = nameSource(selectRoom(INITIAL_STATE, "foyer"));

    assert.equal(state.phase, "lost");
    assert.match(state.message, /wrong room/i);
  });

  it("keeps the source report available when sanity reaches zero", () => {
    let state = INITIAL_STATE;
    for (const kind of ["voice", "air", "reflection"] as const) {
      state = investigate(state, kind);
    }
    state = moveToRoom(state, "archive");
    state = investigate(state, "voice");
    state = investigate(state, "air");
    state = investigate(state, "reflection");
    state = moveToRoom(state, ORIGIN_ROOM);
    state = investigate(state, "voice");
    state = selectRoom(state, ORIGIN_ROOM);

    assert.equal(state.sanity, 0);
    assert.equal(state.phase, "investigating");
    assert.equal(nameSource(state).phase, "won");
  });

  it("resets to the original investigation", () => {
    const changed = investigate(moveToRoom(INITIAL_STATE, "archive"), "voice");

    assert.deepEqual(resetEchoChamber(), INITIAL_STATE);
    assert.notDeepEqual(changed, INITIAL_STATE);
  });
});
