"use client";

import { useState } from "react";
import {
  AIM_OPTIONS,
  GOAL_TARGET,
  HEIGHT_OPTIONS,
  INITIAL_STATE,
  SHOT_COUNT,
  SHOT_FORECASTS,
  advanceToNextShot,
  resetGoalLine,
  selectAim,
  selectHeight,
  takeShot,
  type Aim,
  type GoalLineState,
  type ShotHeight,
} from "@/lib/goal-line";

function aimLabel(aim: Aim): string {
  return AIM_OPTIONS.find((option) => option.id === aim)?.label ?? aim;
}

function heightLabel(height: ShotHeight): string {
  return HEIGHT_OPTIONS.find((option) => option.id === height)?.label ?? height;
}

function ShotSummary({ state }: { state: GoalLineState }) {
  const shot = state.lastShot;

  if (!shot) {
    return null;
  }

  return (
    <div className={`goal-summary goal-summary--${shot.goal ? "goal" : "save"}`}>
      <p className="font-pixel text-xs tracking-widest text-accent">
        SHOT {shot.round + 1} / {SHOT_COUNT}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">{shot.goal ? "GOAL!" : "SAVED!"}</h2>
      <p className="mt-2 text-sm text-ink-dim">{shot.message}</p>
      <div className="goal-report-grid">
        <div><span>Your aim</span><strong>{aimLabel(shot.aim)}</strong></div>
        <div><span>Height</span><strong>{heightLabel(shot.height)}</strong></div>
        <div><span>Keeper read</span><strong>{aimLabel(shot.keeperAim)} · {heightLabel(shot.keeperHeight)}</strong></div>
      </div>
    </div>
  );
}

function Outcome({ state, onReset }: { state: GoalLineState; onReset: () => void }) {
  const won = state.phase === "won";

  return (
    <div className={`goal-result goal-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "FINAL WHISTLE" : "SHOOTOUT LOST"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">
        {won ? "The stadium erupts." : "The gloves held."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">
        Final score: {state.goals} goals, {state.saves} saves. {GOAL_TARGET} goals were needed.
      </p>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        PLAY AGAIN
      </button>
    </div>
  );
}

export default function GoalLineGame() {
  const [state, setState] = useState<GoalLineState>(INITIAL_STATE);
  const isPlanning = state.phase === "planning";
  const isFinished = state.phase === "won" || state.phase === "lost";
  const forecast = SHOT_FORECASTS[Math.min(state.round, SHOT_FORECASTS.length - 1)];

  const chooseAim = (aim: Aim) => {
    setState((currentState) => selectAim(currentState, aim));
  };

  const chooseHeight = (height: ShotHeight) => {
    setState((currentState) => selectHeight(currentState, height));
  };

  const shoot = () => {
    setState((currentState) => takeShot(currentState));
  };

  const nextShot = () => {
    setState((currentState) => advanceToNextShot(currentState));
  };

  const reset = () => {
    setState(resetGoalLine());
  };

  return (
    <section aria-label="Goal Line game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">SHOT</span>
          <strong>{Math.min(state.round + 1, SHOT_COUNT)}/{SHOT_COUNT}</strong>
        </div>
        <div>
          <span className="game-hud__label">GOALS</span>
          <strong>{state.goals}</strong>
        </div>
        <div>
          <span className="game-hud__label">TARGET</span>
          <strong>{GOAL_TARGET}</strong>
        </div>
      </div>

      {isPlanning && (
        <>
          <div className="goal-forecast">
            <div>
              <p className="font-pixel text-xs tracking-widest text-accent">READ THE KEEPER</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Penalty {state.round + 1}</h2>
              <p className="mt-2 text-sm text-ink-faint">{forecast.crowd}</p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink-dim">{forecast.hint}</p>
          </div>

          <div className="goal-choice-group">
            <p className="goal-choice-heading">1. Choose your corner</p>
            <div className="goal-aim-grid">
              {AIM_OPTIONS.map((option) => (
                <button
                  aria-pressed={state.selectedAim === option.id}
                  className={`goal-aim${state.selectedAim === option.id ? " goal-aim--selected" : ""}`}
                  key={option.id}
                  onClick={() => chooseAim(option.id)}
                  type="button"
                >
                  <strong aria-hidden="true">{option.symbol}</strong>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="goal-choice-group">
            <p className="goal-choice-heading">2. Choose your height</p>
            <div className="goal-height-grid">
              {HEIGHT_OPTIONS.map((option) => (
                <button
                  aria-pressed={state.selectedHeight === option.id}
                  className={`goal-height${state.selectedHeight === option.id ? " goal-height--selected" : ""}`}
                  key={option.id}
                  onClick={() => chooseHeight(option.id)}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <span>{option.detail}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="goal-decision">
            <p className="text-sm text-ink-dim">
              {aimLabel(state.selectedAim)} · {heightLabel(state.selectedHeight)}
            </p>
            <button className="game-button" onClick={shoot} type="button">
              TAKE SHOT
            </button>
          </div>
        </>
      )}

      {state.phase === "summary" && (
        <>
          <ShotSummary state={state} />
          <div className="goal-decision">
            <p className="text-sm text-ink-dim">The next read is waiting at the spot.</p>
            <button className="signal-button signal-button--primary" onClick={nextShot} type="button">
              NEXT SHOT
            </button>
          </div>
        </>
      )}

      {isFinished && (
        <>
          <ShotSummary state={state} />
          <Outcome onReset={reset} state={state} />
        </>
      )}

      <div className="goal-footer">
        <span>{SHOT_COUNT} penalties · score {GOAL_TARGET} to win</span>
        <button className="market-reset" onClick={reset} type="button">Reset shootout</button>
      </div>
    </section>
  );
}
