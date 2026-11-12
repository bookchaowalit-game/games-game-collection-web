"use client";

import { useEffect, useState } from "react";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  INITIAL_STATE,
  LEVEL_LAYOUT,
  TOTAL_PRISMS,
  moveHorizontal,
  resetPrismDrift,
  shiftGravity,
  type DriftState,
  type Gravity,
} from "@/lib/prism-drift";

function cellLabel(cell: string, collected: boolean): string {
  if (cell === "#") {
    return "Solid wall";
  }
  if (cell === "P" && !collected) {
    return "Uncollected prism";
  }
  if (cell === "E") {
    return "Exit gate";
  }
  if (cell === "X") {
    return "Hazard seam";
  }
  return "Open drift lane";
}

function cellSymbol(cell: string, isPlayer: boolean, gravity: Gravity, collected: boolean): string {
  if (isPlayer) {
    return gravity === "up" ? "▲" : "▼";
  }
  if (cell === "#") {
    return "";
  }
  if (cell === "P" && !collected) {
    return "✦";
  }
  if (cell === "E") {
    return "◎";
  }
  if (cell === "X") {
    return "×";
  }
  return "";
}

function Outcome({ state, onReset }: { state: DriftState; onReset: () => void }) {
  const won = state.phase === "won";

  return (
    <div className={`drift-result drift-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "PRISM ARRAY ALIGNED" : "DRIFT INTERRUPTED"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">
        {won ? "The gate opens." : "The seam wins this run."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">{state.message}</p>
      <div className="drift-final-stats">
        <span>{state.collected.length}/{TOTAL_PRISMS} prisms</span>
        <span>{state.moves} moves</span>
        <span>Gravity {state.gravity}</span>
      </div>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        DRIFT AGAIN
      </button>
    </div>
  );
}

export default function PrismDriftGame() {
  const [state, setState] = useState<DriftState>(INITIAL_STATE);
  const isPlaying = state.phase === "playing";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key.toLowerCase();
      if (!["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s", "r"].includes(key)) {
        return;
      }

      event.preventDefault();
      setState((currentState) => {
        if (key === "r") {
          return resetPrismDrift();
        }
        if (key === "arrowleft" || key === "a") {
          return moveHorizontal(currentState, -1);
        }
        if (key === "arrowright" || key === "d") {
          return moveHorizontal(currentState, 1);
        }
        return shiftGravity(currentState, key === "arrowup" || key === "w" ? "up" : "down");
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const move = (delta: -1 | 1) => {
    setState((currentState) => moveHorizontal(currentState, delta));
  };

  const gravity = (direction: Gravity) => {
    setState((currentState) => shiftGravity(currentState, direction));
  };

  const reset = () => {
    setState(resetPrismDrift());
  };

  return (
    <section aria-label="Prism Drift game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">PRISMS</span>
          <strong>{state.collected.length}/{TOTAL_PRISMS}</strong>
        </div>
        <div>
          <span className="game-hud__label">MOVES</span>
          <strong>{state.moves}</strong>
        </div>
        <div>
          <span className="game-hud__label">GRAVITY</span>
          <strong>{state.gravity === "up" ? "↑ UP" : "↓ DOWN"}</strong>
        </div>
      </div>

      <div className="drift-brief">
        <div>
          <p className="font-pixel text-xs tracking-widest text-accent">SHIFT THE WORLD</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Find the clean line</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-ink-dim">{state.message}</p>
        </div>
        <div className={`drift-status drift-status--${state.phase}`}>
          <span>{state.phase === "playing" ? "DRIFTING" : state.phase.toUpperCase()}</span>
          <small>{state.lastAction}</small>
        </div>
      </div>

      <div
        aria-label="Prism Drift level"
        className="drift-board"
        role="group"
        style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, index) => {
          const x = index % GRID_WIDTH;
          const y = Math.floor(index / GRID_WIDTH);
          const cell = LEVEL_LAYOUT[y][x] ?? "#";
          const isPlayer = state.player.x === x && state.player.y === y;
          const collected = state.collected.includes(index);
          const className = [
            "drift-cell",
            cell === "#" ? "drift-cell--wall" : "drift-cell--open",
            cell === "P" && !collected ? "drift-cell--prism" : "",
            cell === "E" ? "drift-cell--exit" : "",
            cell === "X" ? "drift-cell--hazard" : "",
            isPlayer ? "drift-cell--player" : "",
          ].filter(Boolean).join(" ");

          return (
            <div
              aria-label={isPlayer ? `Player on ${cellLabel(cell, collected)}` : cellLabel(cell, collected)}
              className={className}
              key={index}
              role="img"
            >
              <span aria-hidden="true">{cellSymbol(cell, isPlayer, state.gravity, collected)}</span>
            </div>
          );
        })}
      </div>

      <div className="drift-legend" aria-label="Level legend">
        <span><i className="drift-legend__swatch drift-legend__swatch--player" /> You</span>
        <span><i className="drift-legend__swatch drift-legend__swatch--prism" /> Prism</span>
        <span><i className="drift-legend__swatch drift-legend__swatch--exit" /> Exit</span>
        <span><i className="drift-legend__swatch drift-legend__swatch--hazard" /> Hazard</span>
      </div>

      <div className="drift-controls" aria-label="Prism Drift controls">
        <button aria-label="Shift gravity up" className="drift-control drift-control--up" disabled={!isPlaying} onClick={() => gravity("up")} type="button">↑</button>
        <button aria-label="Move left" className="drift-control drift-control--left" disabled={!isPlaying} onClick={() => move(-1)} type="button">←</button>
        <button aria-label="Shift gravity down" className="drift-control drift-control--down" disabled={!isPlaying} onClick={() => gravity("down")} type="button">↓</button>
        <button aria-label="Move right" className="drift-control drift-control--right" disabled={!isPlaying} onClick={() => move(1)} type="button">→</button>
      </div>
      <p className="drift-instructions">Arrow keys or WASD · ↑/W and ↓/S shift gravity · R resets</p>

      {!isPlaying && <Outcome onReset={reset} state={state} />}

      <div className="drift-footer">
        <span>9×7 level · {TOTAL_PRISMS} prisms · gravity is your jump</span>
        <button className="market-reset" onClick={reset} type="button">Reset drift</button>
      </div>
    </section>
  );
}

