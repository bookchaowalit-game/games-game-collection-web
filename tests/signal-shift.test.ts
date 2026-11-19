import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  INITIAL_BOARD,
  SOLUTION_BOARD,
  alignOneTile,
  getHintIndex,
  getReachableTiles,
  getTileMask,
  isSolved,
  rotateTile,
} from "../lib/signal-shift.ts";

describe("Signal Shift rules", () => {
  it("recognizes the complete solved network", () => {
    assert.equal(isSolved(SOLUTION_BOARD), true);
    assert.equal(getReachableTiles(SOLUTION_BOARD).size, 16);
  });

  it("starts scrambled and rotates a tile clockwise", () => {
    assert.equal(isSolved(INITIAL_BOARD), false);

    const next = rotateTile(INITIAL_BOARD, 1);
    assert.notDeepEqual(next, INITIAL_BOARD);
    assert.notEqual(getTileMask(next[1]), getTileMask(INITIAL_BOARD[1]));
  });

  it("does not rotate locked source and core tiles", () => {
    assert.equal(rotateTile(INITIAL_BOARD, 0), INITIAL_BOARD);
    assert.equal(rotateTile(INITIAL_BOARD, 12), INITIAL_BOARD);
  });

  it("aligns one incorrect tile at a time through the hint", () => {
    const hintIndex = getHintIndex(INITIAL_BOARD);
    assert.ok(hintIndex >= 0);

    const next = alignOneTile(INITIAL_BOARD, hintIndex);
    assert.equal(next[hintIndex].rotation, (INITIAL_BOARD[hintIndex].rotation + 1) % 4);
  });

  it("can reach the solution by applying gentle hints repeatedly", () => {
    let board = INITIAL_BOARD;
    let hintCount = 0;

    while (!isSolved(board) && hintCount < 64) {
      const hintIndex = getHintIndex(board);
      assert.ok(hintIndex >= 0);
      board = alignOneTile(board, hintIndex);
      hintCount += 1;
    }

    assert.equal(isSolved(board), true);
    assert.ok(hintCount > 0);
  });
});
