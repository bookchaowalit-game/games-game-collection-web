import assert from "node:assert/strict";
import { describe, it } from "vitest";
import {
  BOARD_SIZE,
  PLAYER_SIZE,
  TARGETS,
  collectTargets,
  getHazardPosition,
  movePlayer,
  overlaps,
} from "../lib/neon-harvest.ts";

describe("Neon Harvest rules", () => {
  it("normalizes diagonal movement and keeps the player on the board", () => {
    const next = movePlayer({ x: 50, y: 50 }, { x: 1, y: 1 }, 1, 10);

    assert.equal(Math.round(next.x * 100) / 100, 57.07);
    assert.equal(Math.round(next.y * 100) / 100, 57.07);

    const corner = movePlayer({ x: 50, y: 50 }, { x: -1, y: -1 }, 100, 10);
    assert.equal(corner.x, PLAYER_SIZE / 2);
    assert.equal(corner.y, PLAYER_SIZE / 2);
    assert.equal(BOARD_SIZE, 100);
  });

  it("collects an overlapping target only once", () => {
    const first = collectTargets({ x: TARGETS[0].x, y: TARGETS[0].y }, TARGETS, new Set());
    const second = collectTargets({ x: TARGETS[0].x, y: TARGETS[0].y }, TARGETS, first);

    assert.equal(first.size, 1);
    assert.deepEqual(second, first);
  });

  it("keeps moving sentries inside the board", () => {
    const hazard = { id: 1, x: 50, y: 50, size: 7, driftX: 40, driftY: 40, phase: 0 };

    for (const time of [0, 1, 10, 100]) {
      const position = getHazardPosition(hazard, time);
      assert.ok(position.x >= hazard.size / 2 && position.x <= BOARD_SIZE - hazard.size / 2);
      assert.ok(position.y >= hazard.size / 2 && position.y <= BOARD_SIZE - hazard.size / 2);
    }
  });

  it("uses axis-aligned hitboxes for gameplay collisions", () => {
    assert.equal(
      overlaps({ x: 10, y: 10, size: 7 }, { x: 13, y: 10, size: 5 }),
      true,
    );
    assert.equal(
      overlaps({ x: 10, y: 10, size: 7 }, { x: 20, y: 10, size: 5 }),
      false,
    );
  });
});
