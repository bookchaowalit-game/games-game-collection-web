"use client";

import { useState } from "react";
import {
  ACTION_OPTIONS,
  INITIAL_STATE,
  MAX_SHELTER,
  MAX_WARMTH,
  NIGHT_COUNT,
  NIGHT_FORECASTS,
  advanceToNextNight,
  canTakeAction,
  chooseAction,
  getActionOption,
  resetLastLight,
  resolveNight,
  type LastLightState,
  type SurvivalAction,
} from "@/lib/last-light";

function ResourceCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="light-resource">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function NightSummary({ state }: { state: LastLightState }) {
  const report = state.lastReport;

  if (!report) {
    return null;
  }

  const action = getActionOption(report.action);

  return (
    <div className="light-summary">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {state.phase === "won" || state.phase === "lost" ? "SEASON COMPLETE" : "NIGHT SURVIVED"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{report.nightName}</h2>
      <p className="mt-2 text-sm text-ink-dim">You chose {action.label.toLowerCase()}.</p>

      <div className="light-report-grid">
        <div><span>Threat</span><strong>{report.threat}</strong></div>
        <div><span>Battery</span><strong>{report.batteryUsed ? "Used" : "Empty"}</strong></div>
        <div><span>Damage</span><strong>{report.damage}</strong></div>
        <div><span>Health</span><strong>{report.healthAfter}</strong></div>
        <div><span>Warmth</span><strong>{report.warmthAfter}</strong></div>
        <div><span>Shelter</span><strong>{report.shelterAfter}/{MAX_SHELTER}</strong></div>
      </div>

      <p className="mt-5 text-sm leading-6 text-ink-dim">
        {report.damage === 0
          ? "The shelter held. Every resource bought you another quiet hour."
          : `The night took ${report.damage} health. The next forecast is already moving in.`}
      </p>
    </div>
  );
}

function Outcome({ state, onReset }: { state: LastLightState; onReset: () => void }) {
  const won = state.phase === "won";

  return (
    <div className={`light-result light-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "BEACON FOUND" : "LIGHTS OUT"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">
        {won ? "The rescue line saw you." : "The shelter went dark."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">
        {won
          ? "Six nights survived. The signal is strong enough to bring someone home."
          : `You reached night ${Math.min(state.night + 1, NIGHT_COUNT)} with no health left.`}
      </p>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        PLAY AGAIN
      </button>
    </div>
  );
}

export default function LastLightGame() {
  const [state, setState] = useState<LastLightState>(INITIAL_STATE);
  const isPlanning = state.phase === "planning";
  const isFinished = state.phase === "won" || state.phase === "lost";
  const forecast = NIGHT_FORECASTS[Math.min(state.night, NIGHT_FORECASTS.length - 1)];

  const selectAction = (action: SurvivalAction) => {
    setState((currentState) => chooseAction(currentState, action));
  };

  const endNight = () => {
    setState((currentState) => resolveNight(currentState));
  };

  const nextNight = () => {
    setState((currentState) => advanceToNextNight(currentState));
  };

  const reset = () => {
    setState(resetLastLight());
  };

  return (
    <section aria-label="Last Light game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">NIGHT</span>
          <strong>{Math.min(state.night + 1, NIGHT_COUNT)}/{NIGHT_COUNT}</strong>
        </div>
        <div>
          <span className="game-hud__label">HEALTH</span>
          <strong>{state.health}/{state.maxHealth}</strong>
        </div>
        <div>
          <span className="game-hud__label">BATTERIES</span>
          <strong>{state.batteries}</strong>
        </div>
      </div>

      {isPlanning && (
        <>
          <div className="light-forecast">
            <div>
              <p className="font-pixel text-xs tracking-widest text-accent">TONIGHT&apos;S FORECAST</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{forecast.name}</h2>
              <p className="mt-2 text-sm text-ink-faint">{forecast.mood} · threat {forecast.threat}</p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink-dim">{forecast.detail}</p>
          </div>

          <div className="light-resources">
            <ResourceCard label="Scrap" value={String(state.scrap)} detail="build material" />
            <ResourceCard label="Warmth" value={`${state.warmth}/${MAX_WARMTH}`} detail="cold penalty at 1" />
            <ResourceCard label="Shelter" value={`${state.shelter}/${MAX_SHELTER}`} detail="reduces threat" />
          </div>

          <div className="light-action-heading">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">Choose one move</span>
            <span className="text-xs text-ink-faint">Then face the night</span>
          </div>
          <div className="light-action-grid">
            {ACTION_OPTIONS.map((option) => {
              const available = canTakeAction(state, option.id);
              const selected = state.selectedAction === option.id;

              return (
                <button
                  aria-pressed={selected}
                  className={`light-action${selected ? " light-action--selected" : ""}`}
                  disabled={!available}
                  key={option.id}
                  onClick={() => selectAction(option.id)}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <span>{option.detail}</span>
                </button>
              );
            })}
          </div>

          <div className="light-decision">
            <p className="text-sm text-ink-dim">
              Selected: <strong>{getActionOption(state.selectedAction).label}</strong>
            </p>
            <button className="game-button" disabled={!canTakeAction(state, state.selectedAction)} onClick={endNight} type="button">
              END NIGHT
            </button>
          </div>
        </>
      )}

      {state.phase === "summary" && (
        <>
          <NightSummary state={state} />
          <div className="light-decision">
            <p className="text-sm text-ink-dim">The next forecast arrives after you check the shelter.</p>
            <button className="signal-button signal-button--primary" onClick={nextNight} type="button">
              NEXT NIGHT
            </button>
          </div>
        </>
      )}

      {isFinished && (
        <>
          <NightSummary state={state} />
          <Outcome onReset={reset} state={state} />
        </>
      )}

      <div className="light-footer">
        <span>{NIGHT_COUNT} nights · choose, prepare, endure</span>
        <button className="market-reset" onClick={reset} type="button">Reset shelter</button>
      </div>
    </section>
  );
}
