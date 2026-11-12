"use client";

import { useState } from "react";
import {
  INITIAL_STATE,
  MARKET_DAYS,
  PREP_OPTIONS,
  PRICE_OPTIONS,
  TARGET_CASH,
  advanceToNextDay,
  canOpenMarket,
  getPrepOption,
  openMarket,
  resetMarket,
  type MarketState,
} from "@/lib/midnight-market";

function money(value: number): string {
  return `$${value}`;
}

function MarketSummary({ state }: { state: MarketState }) {
  const report = state.lastReport;

  if (!report) {
    return null;
  }

  return (
    <div className="market-summary">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {state.phase === "won" || state.phase === "lost" ? "SEASON COMPLETE" : "DAY COMPLETE"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{report.dayName}</h2>
      <p className="mt-2 text-sm text-ink-dim">{report.mood}</p>

      <div className="market-report-grid">
        <div>
          <span>Demand</span>
          <strong>{report.demand}</strong>
        </div>
        <div>
          <span>Sold</span>
          <strong>{report.sold}</strong>
        </div>
        <div>
          <span>Revenue</span>
          <strong>{money(report.revenue)}</strong>
        </div>
        <div>
          <span>Prep cost</span>
          <strong>-{money(report.cost)}</strong>
        </div>
        <div>
          <span>Leftover</span>
          <strong>{report.leftover}</strong>
        </div>
        <div>
          <span>Cash now</span>
          <strong>{money(report.cashAfter)}</strong>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-ink-dim">
        {report.leftover > 0
          ? `You carried ${report.leftover} unsold cups into the night. Forecasts are useful, but waste still costs momentum.`
          : "Clean sell-through. The queue emptied at exactly the right time."}
      </p>
    </div>
  );
}

export default function MidnightMarketGame() {
  const [state, setState] = useState<MarketState>(INITIAL_STATE);
  const currentDay = MARKET_DAYS[Math.min(state.day, MARKET_DAYS.length - 1)];
  const selectedPrep = getPrepOption(state.selectedPrep);
  const isPlanning = state.phase === "planning";

  const choosePrep = (id: MarketState["selectedPrep"]) => {
    if (isPlanning) {
      setState((currentState) => ({ ...currentState, selectedPrep: id }));
    }
  };

  const choosePrice = (price: number) => {
    if (isPlanning) {
      setState((currentState) => ({ ...currentState, selectedPrice: price }));
    }
  };

  const open = () => {
    setState((currentState) => openMarket(currentState));
  };

  const nextDay = () => {
    setState((currentState) => advanceToNextDay(currentState));
  };

  const reset = () => {
    setState(resetMarket());
  };

  return (
    <section aria-label="Midnight Market game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">DAY</span>
          <strong>{Math.min(state.day + 1, MARKET_DAYS.length)}/{MARKET_DAYS.length}</strong>
        </div>
        <div>
          <span className="game-hud__label">CASH</span>
          <strong>{money(state.cash)}</strong>
        </div>
        <div>
          <span className="game-hud__label">REP</span>
          <strong>{state.reputation}/5</strong>
        </div>
      </div>

      {isPlanning && (
        <>
          <div className="market-forecast">
            <div>
              <p className="font-pixel text-xs tracking-widest text-accent">TONIGHT&apos;S READ</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{currentDay.name}</h2>
              <p className="mt-2 text-sm text-ink-faint">{currentDay.mood}</p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink-dim">{currentDay.forecast}</p>
          </div>

          <div className="market-choice-group">
            <div className="market-choice-heading">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">1. Choose prep</span>
              <span className="text-xs text-ink-faint">Cash: {money(state.cash)}</span>
            </div>
            <div className="market-choice-grid">
              {PREP_OPTIONS.map((option) => (
                <button
                  aria-pressed={state.selectedPrep === option.id}
                  className={`market-choice${state.selectedPrep === option.id ? " market-choice--selected" : ""}`}
                  key={option.id}
                  onClick={() => choosePrep(option.id)}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <span>{option.stock} cups · {money(option.cost)}</span>
                  <small>{option.detail}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="market-choice-group">
            <div className="market-choice-heading">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">2. Set price</span>
              <span className="text-xs text-ink-faint">Target: {money(TARGET_CASH)}</span>
            </div>
            <div className="market-price-grid">
              {PRICE_OPTIONS.map((price) => (
                <button
                  aria-pressed={state.selectedPrice === price}
                  className={`market-price${state.selectedPrice === price ? " market-price--selected" : ""}`}
                  key={price}
                  onClick={() => choosePrice(price)}
                  type="button"
                >
                  {money(price)}
                </button>
              ))}
            </div>
          </div>

          <div className="market-decision">
            <p className="text-sm text-ink-dim">
              {selectedPrep.stock} cups at {money(state.selectedPrice)} each · prep costs {money(selectedPrep.cost)}
            </p>
            <button className="game-button" disabled={!canOpenMarket(state)} onClick={open} type="button">
              OPEN STALL
            </button>
          </div>
        </>
      )}

      {state.phase === "summary" && (
        <>
          <MarketSummary state={state} />
          <div className="market-decision">
            <p className="text-sm text-ink-dim">Next forecast arrives after you close the stall.</p>
            <button className="signal-button signal-button--primary" onClick={nextDay} type="button">
              NEXT DAY
            </button>
          </div>
        </>
      )}

      {(state.phase === "won" || state.phase === "lost") && (
        <>
          <MarketSummary state={state} />
          <div className={`market-result market-result--${state.phase}`}>
            <p className="font-pixel text-xs tracking-widest text-accent">
              {state.phase === "won" ? "SHOP IS A HIT" : "SHOP CLOSED"}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink-dim">
              {state.phase === "won"
                ? `You finished with ${money(state.cash)} and beat the ${money(TARGET_CASH)} target.`
                : `You finished with ${money(state.cash)}. The next season needs a sharper plan.`}
            </p>
            <button className="signal-button signal-button--primary mt-4" onClick={reset} type="button">
              PLAY AGAIN
            </button>
          </div>
        </>
      )}

      <div className="market-footer">
        <span>Start with {money(INITIAL_STATE.cash)}</span>
        <span>Goal: {money(TARGET_CASH)}</span>
        <button className="market-reset" onClick={reset} type="button">Reset season</button>
      </div>
    </section>
  );
}
