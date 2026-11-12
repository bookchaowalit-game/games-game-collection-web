"use client";

import { useState } from "react";
import {
  CONNECTION_BITS,
  INITIAL_BOARD,
  TILE_SEGMENTS,
  alignOneTile,
  getHintIndex,
  getReachableTiles,
  getTileMask,
  isSolved,
  rotateTile,
  type Tile,
} from "@/lib/signal-shift";

type SignalTileProps = {
  tile: Tile;
  index: number;
  connected: boolean;
  solved: boolean;
  onRotate: (index: number) => void;
};

function tileLabel(tile: Tile, index: number): string {
  const name = tile.role === "source" ? "source" : tile.role === "goal" ? "core" : "circuit";
  return `${name} tile ${index + 1}${tile.locked ? ", locked" : ", click to rotate"}`;
}

function SignalTile({ tile, index, connected, solved, onRotate }: SignalTileProps) {
  const mask = getTileMask(tile);

  return (
    <button
      aria-label={tileLabel(tile, index)}
      className={`signal-tile signal-tile--${tile.role ?? "node"}${connected ? " signal-tile--connected" : ""}`}
      disabled={tile.locked || solved}
      onClick={() => onRotate(index)}
      type="button"
    >
      <svg aria-hidden="true" className="signal-tile__svg" viewBox="0 0 100 100">
        {TILE_SEGMENTS.filter((segment) => (mask & segment.bit) !== 0).map((segment) => (
          <line
            key={segment.bit}
            x1="50"
            x2={segment.x2}
            y1="50"
            y2={segment.y2}
          />
        ))}
        <circle cx="50" cy="50" r="12" />
      </svg>
      <span aria-hidden="true" className="signal-tile__number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="sr-only">
        {tile.role === "source"
          ? "Source"
          : tile.role === "goal"
            ? "Core"
            : (mask & CONNECTION_BITS.up) !== 0
              ? "Powered tile"
              : "Unpowered tile"}
      </span>
    </button>
  );
}

export default function SignalShiftGame() {
  const [board, setBoard] = useState<readonly Tile[]>(INITIAL_BOARD);
  const [moves, setMoves] = useState(0);
  const connected = getReachableTiles(board);
  const solved = isSolved(board);
  const hintIndex = getHintIndex(board);

  const rotate = (index: number) => {
    if (solved) {
      return;
    }

    const nextBoard = rotateTile(board, index);

    if (nextBoard !== board) {
      setBoard(nextBoard);
      setMoves((currentMoves) => currentMoves + 1);
    }
  };

  const alignOne = () => {
    if (solved || hintIndex < 0) {
      return;
    }

    setBoard(alignOneTile(board, hintIndex));
    setMoves((currentMoves) => currentMoves + 1);
  };

  const reset = () => {
    setBoard(INITIAL_BOARD);
    setMoves(0);
  };

  return (
    <section aria-label="Signal Shift game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">POWERED</span>
          <strong>{connected.size}/16</strong>
        </div>
        <div>
          <span className="game-hud__label">MOVES</span>
          <strong>{moves}</strong>
        </div>
      </div>

      <p className="signal-instructions">
        Rotate every tile until the source powers the entire network. Green lines
        are connected; the core is the final tile at the bottom-left.
      </p>

      <div aria-label="Signal Shift circuit board" className="signal-grid">
        {board.map((tile, index) => (
          <SignalTile
            connected={connected.has(index)}
            index={index}
            key={index}
            onRotate={rotate}
            solved={solved}
            tile={tile}
          />
        ))}
      </div>

      <div className="signal-actions">
        <button
          className="signal-button signal-button--primary"
          disabled={solved || hintIndex < 0}
          onClick={alignOne}
          type="button"
        >
          ALIGN ONE
        </button>
        <button className="signal-button" onClick={reset} type="button">
          RESET
        </button>
      </div>

      {solved && (
        <div className="signal-win" role="status">
          <p className="font-pixel text-xs tracking-widest text-accent">NETWORK ONLINE</p>
          <p className="mt-3 text-sm text-ink-dim">
            Complete circuit in {moves} moves. Reset and chase a cleaner solve.
          </p>
        </div>
      )}

      <p className="mt-5 text-center text-xs text-ink-faint">
        Tip: use ALIGN ONE if you want a gentle nudge, not the whole solution.
      </p>
    </section>
  );
}
