"use client";

import { useState } from "react";
import {
  BLUEPRINT_OPTIONS,
  CYCLE_LIMIT,
  GRID_CELLS,
  INITIAL_STATE,
  MINE_INDEX,
  SHIPMENT_INDEX,
  TARGET_SHIPMENTS,
  advanceCycle,
  evaluateFactory,
  placeTile,
  removeTile,
  resetPocketFoundry,
  runCycle,
  selectBlueprint,
  type Blueprint,
  type FactoryTile,
  type PocketFoundryState,
} from "@/lib/pocket-foundry";

function tileSymbol(tile: FactoryTile): string {
  if (tile === "mine") {
    return "◈";
  }
  if (tile === "shipment") {
    return "⌁";
  }
  if (tile === "conveyor") {
    return "→";
  }
  if (tile === "smelter") {
    return "♨";
  }
  if (tile === "press") {
    return "▣";
  }
  return "+";
}

function tileLabel(tile: FactoryTile): string {
  return tile === "empty" ? "Empty slot" : `${tile} tile`;
}

function blueprintLabel(blueprint: Blueprint): string {
  return BLUEPRINT_OPTIONS.find((option) => option.id === blueprint)?.label ?? blueprint;
}

function RunSummary({ state }: { state: PocketFoundryState }) {
  const run = state.lastRun;

  if (!run) {
    return null;
  }

  return (
    <div className={`foundry-summary${run.shipped ? " foundry-summary--shipped" : ""}`}>
      <p className="font-pixel text-xs tracking-widest text-accent">CYCLE {run.cycle} / {CYCLE_LIMIT}</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{run.shipped ? "Shipment cleared." : "The line stalled."}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-dim">{run.message}</p>
      <div className="foundry-report-grid">
        <div><span>Chain</span><strong>{run.ready ? "Online" : "Offline"}</strong></div>
        <div><span>Route</span><strong>{run.routeLength ? `${run.routeLength} tiles` : "No route"}</strong></div>
        <div><span>Shipments</span><strong>{state.shipments}/{TARGET_SHIPMENTS}</strong></div>
      </div>
    </div>
  );
}

function Outcome({ state, onReset }: { state: PocketFoundryState; onReset: () => void }) {
  const won = state.phase === "won";

  return (
    <div className={`foundry-result foundry-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "FACTORY ONLINE" : "FACTORY OFFLINE"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">
        {won ? "The pocket foundry is humming." : "The deadline reached the loading bay."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">
        {state.shipments} shipments cleared in {state.cycle} cycles. {state.message}
      </p>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        REBUILD LINE
      </button>
    </div>
  );
}

export default function PocketFoundryGame() {
  const [state, setState] = useState<PocketFoundryState>(INITIAL_STATE);
  const evaluation = evaluateFactory(state.tiles);
  const isPlanning = state.phase === "planning";
  const route = new Set(evaluation.route);

  const chooseBlueprint = (blueprint: Blueprint) => {
    setState((currentState) => selectBlueprint(currentState, blueprint));
  };

  const handleCell = (index: number) => {
    setState((currentState) => {
      if (currentState.tiles[index] === "empty") {
        return placeTile(currentState, index);
      }
      return removeTile(currentState, index);
    });
  };

  const run = () => {
    setState((currentState) => runCycle(currentState));
  };

  const nextCycle = () => {
    setState((currentState) => advanceCycle(currentState));
  };

  const reset = () => {
    setState(resetPocketFoundry());
  };

  return (
    <section aria-label="Pocket Foundry game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">CYCLE</span>
          <strong>{Math.min(state.cycle + 1, CYCLE_LIMIT)}/{CYCLE_LIMIT}</strong>
        </div>
        <div>
          <span className="game-hud__label">SHIPMENTS</span>
          <strong>{state.shipments}/{TARGET_SHIPMENTS}</strong>
        </div>
        <div>
          <span className="game-hud__label">BLUEPRINT</span>
          <strong>{blueprintLabel(state.selectedBlueprint)}</strong>
        </div>
      </div>

      {isPlanning ? (
        <>
          <div className="foundry-brief">
            <div>
              <p className="font-pixel text-xs tracking-widest text-accent">SHAPE THE LINE</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Build a working chain</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-ink-dim">{state.message}</p>
            </div>
            <div className={`foundry-status${evaluation.ready ? " foundry-status--ready" : ""}`}>
              <span>{evaluation.ready ? "READY" : "NOT READY"}</span>
              <small>{evaluation.ready ? `${evaluation.route.length} tiles online` : evaluation.reason}</small>
            </div>
          </div>

          <div className="foundry-blueprint-heading">
            <p>Choose a blueprint</p>
            <span>Click a built tile to remove it</span>
          </div>
          <div className="foundry-blueprints">
            {BLUEPRINT_OPTIONS.map((option) => {
              const count = state.inventory[option.id];
              return (
                <button
                  aria-pressed={state.selectedBlueprint === option.id}
                  className={`foundry-blueprint${state.selectedBlueprint === option.id ? " foundry-blueprint--selected" : ""}`}
                  disabled={count <= 0}
                  key={option.id}
                  onClick={() => chooseBlueprint(option.id)}
                  type="button"
                >
                  <strong aria-hidden="true">{option.symbol}</strong>
                  <span>{option.label}</span>
                  <small>{option.detail}</small>
                  <em>{count} left</em>
                </button>
              );
            })}
          </div>

          <div className="foundry-grid" aria-label="Factory grid">
            {Array.from({ length: GRID_CELLS }, (_, index) => {
              const tile = state.tiles[index];
              const fixed = index === MINE_INDEX || index === SHIPMENT_INDEX;
              const cellClass = [
                "foundry-cell",
                tile === "empty" ? "foundry-cell--empty" : "foundry-cell--built",
                fixed ? "foundry-cell--fixed" : "",
                route.has(index) ? "foundry-cell--route" : "",
              ].filter(Boolean).join(" ");

              return (
                <button
                  aria-label={`${tileLabel(tile)} at grid position ${index + 1}`}
                  className={cellClass}
                  disabled={fixed}
                  key={index}
                  onClick={() => handleCell(index)}
                  type="button"
                >
                  <strong aria-hidden="true">{tileSymbol(tile)}</strong>
                  <span>{fixed ? tile.toUpperCase() : tile === "empty" ? "BUILD" : "REMOVE"}</span>
                </button>
              );
            })}
          </div>

          <div className="foundry-decision">
            <p className="text-sm text-ink-dim">{evaluation.ready ? "The line is ready to run." : "Fill the gaps, then run the cycle."}</p>
            <button className="game-button" onClick={run} type="button">RUN CYCLE</button>
          </div>
        </>
      ) : state.phase === "summary" ? (
        <>
          <RunSummary state={state} />
          <div className="foundry-decision">
            <p className="text-sm text-ink-dim">The next cycle gives you another chance to tune the line.</p>
            <button className="signal-button signal-button--primary" onClick={nextCycle} type="button">NEXT CYCLE</button>
          </div>
        </>
      ) : (
        <>
          <RunSummary state={state} />
          <Outcome onReset={reset} state={state} />
        </>
      )}

      <div className="foundry-footer">
        <span>4×4 grid · 8 cycles · {TARGET_SHIPMENTS} shipments to win</span>
        <button className="market-reset" onClick={reset} type="button">Reset foundry</button>
      </div>
    </section>
  );
}
