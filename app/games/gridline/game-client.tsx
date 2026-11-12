"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GRID_SIZE,
  INITIAL_STATE,
  MAX_TURNS,
  advanceTurn,
  getAvailableMoves,
  isWall,
  positionKey,
  samePosition,
  type GridlineState,
  type Position,
  type TurnAction,
} from "@/lib/gridline";

function tokenForCell(state: GridlineState, position: Position): "player" | "enemy" | "beacon" | null {
  if (samePosition(state.player, position)) {
    return "player";
  }

  if (state.enemies.some((enemy) => samePosition(enemy, position))) {
    return "enemy";
  }

  if (state.beacons.some((beacon) => samePosition(beacon, position))) {
    return "beacon";
  }

  return null;
}

function outcomeCopy(state: GridlineState): string {
  if (state.phase === "won") {
    return `All beacons captured in ${state.turn} turns.`;
  }

  if (state.turn >= MAX_TURNS) {
    return "The signal faded before the route was complete.";
  }

  return "A sentry reached your position. Re-plan the route and try again.";
}

export default function GridlineGame() {
  const [state, setState] = useState<GridlineState>(INITIAL_STATE);
  const stateRef = useRef<GridlineState>(INITIAL_STATE);

  const performAction = useCallback((action: TurnAction) => {
    const result = advanceTurn(stateRef.current, action);

    if (result.changed) {
      stateRef.current = result.state;
      setState(result.state);
    }
  }, []);

  useEffect(() => {
    const directionMap: Record<string, Position> = {
      arrowup: { row: -1, column: 0 },
      w: { row: -1, column: 0 },
      arrowright: { row: 0, column: 1 },
      d: { row: 0, column: 1 },
      arrowdown: { row: 1, column: 0 },
      s: { row: 1, column: 0 },
      arrowleft: { row: 0, column: -1 },
      a: { row: 0, column: -1 },
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === " " || key === "spacebar") {
        event.preventDefault();
        performAction({ type: "wait" });
        return;
      }

      const direction = directionMap[key];

      if (!direction) {
        return;
      }

      event.preventDefault();
      performAction({
        type: "move",
        position: {
          row: stateRef.current.player.row + direction.row,
          column: stateRef.current.player.column + direction.column,
        },
      });
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [performAction]);

  const reset = () => {
    stateRef.current = INITIAL_STATE;
    setState(INITIAL_STATE);
  };

  const availableMoves = new Set(getAvailableMoves(state).map(positionKey));
  const remainingBeacons = state.beacons.length;

  return (
    <section aria-label="Gridline game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">BEACONS</span>
          <strong>{3 - remainingBeacons}/3</strong>
        </div>
        <div>
          <span className="game-hud__label">TURN</span>
          <strong>{state.turn}/{MAX_TURNS}</strong>
        </div>
      </div>

      <p className="tactical-instructions">
        Reach the gold beacons. Blue is you, red is a sentry, and walls cannot be
        crossed. Sentries move every two turns.
      </p>

      <div
        aria-label="Gridline tactical board"
        className="tactical-grid"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const position = {
            row: Math.floor(index / GRID_SIZE),
            column: index % GRID_SIZE,
          };
          const key = positionKey(position);
          const wall = isWall(position);
          const token = tokenForCell(state, position);
          const available = availableMoves.has(key);

          return (
            <button
              aria-label={wall ? `Wall, row ${position.row + 1}, column ${position.column + 1}` : `Row ${position.row + 1}, column ${position.column + 1}${available ? ", move here" : ""}`}
              className={`tactical-cell${wall ? " tactical-cell--wall" : ""}${available ? " tactical-cell--available" : ""}${token ? ` tactical-cell--${token}` : ""}`}
              disabled={wall || state.phase !== "playing" || !available}
              key={key}
              onClick={() => performAction({ type: "move", position })}
              type="button"
            >
              {token && (
                <span aria-hidden="true" className={`tactical-token tactical-token--${token}`}>
                  {token === "player" ? "◆" : token === "enemy" ? "●" : "✦"}
                </span>
              )}
              <span aria-hidden="true" className="tactical-cell__coord">
                {position.row + 1},{position.column + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="tactical-actions">
        <button
          className="signal-button signal-button--primary"
          disabled={state.phase !== "playing"}
          onClick={() => performAction({ type: "wait" })}
          type="button"
        >
          WAIT
        </button>
        <button className="signal-button" onClick={reset} type="button">
          RESET
        </button>
      </div>

      {state.phase !== "playing" && (
        <div className={`tactical-result tactical-result--${state.phase}`} role="status">
          <p className="font-pixel text-xs tracking-widest text-accent">
            {state.phase === "won" ? "ROUTE COMPLETE" : "SIGNAL LOST"}
          </p>
          <p className="mt-3 text-sm text-ink-dim">{outcomeCopy(state)}</p>
          <button className="signal-button signal-button--primary mt-4" onClick={reset} type="button">
            PLAY AGAIN
          </button>
        </div>
      )}

      <p className="mt-5 text-center text-xs text-ink-faint">
        Keyboard: arrows / WASD · Space: wait one turn
      </p>
    </section>
  );
}
