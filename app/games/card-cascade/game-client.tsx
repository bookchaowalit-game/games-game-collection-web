"use client";

import { useState } from "react";
import {
  HAND_SIZE,
  INITIAL_STATE,
  MAX_ENERGY,
  ROOM_COUNT,
  STARTING_HP,
  canPlayCard,
  chooseReward,
  endTurn,
  getCardDefinition,
  playCard,
  startCascade,
  type CardCascadeState,
  type CardId,
} from "@/lib/card-cascade";

function hpPercent(state: CardCascadeState): number {
  return Math.round((state.hp / state.maxHp) * 100);
}

function enemyPercent(state: CardCascadeState): number {
  return Math.round((state.enemy.hp / state.enemy.maxHp) * 100);
}

function CardButton({
  cardId,
  disabled,
  onClick,
}: {
  cardId: CardId;
  disabled: boolean;
  onClick: () => void;
}) {
  const card = getCardDefinition(cardId);

  return (
    <button
      aria-label={`${card.label}, cost ${card.cost}. ${card.detail}`}
      className={`cascade-card cascade-card--${cardId}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className="cascade-card__cost">{card.cost}</span>
      <strong>{card.label}</strong>
      <span>{card.detail}</span>
    </button>
  );
}

function Outcome({ state, onReset }: { state: CardCascadeState; onReset: () => void }) {
  const won = state.phase === "won";

  return (
    <div className={`cascade-result cascade-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "RUN COMPLETE" : "RUN ENDED"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">
        {won ? "The cascade is yours." : "The deck needs another run."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">
        {won
          ? `Four rooms cleared with ${state.score} points.`
          : `You reached room ${state.room + 1} with ${state.hp} HP left.`}
      </p>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        PLAY AGAIN
      </button>
    </div>
  );
}

export default function CardCascadeGame() {
  const [state, setState] = useState<CardCascadeState>(INITIAL_STATE);
  const isPlaying = state.phase === "playing";

  const start = () => setState(startCascade());
  const reset = () => setState(INITIAL_STATE);

  const selectCard = (handIndex: number) => {
    setState((currentState) => playCard(currentState, handIndex));
  };

  const finishTurn = () => {
    setState((currentState) => endTurn(currentState));
  };

  const selectReward = (cardId: CardId) => {
    setState((currentState) => chooseReward(currentState, cardId));
  };

  return (
    <section aria-label="Card Cascade game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">ROOM</span>
          <strong>{Math.min(state.room + 1, ROOM_COUNT)}/{ROOM_COUNT}</strong>
        </div>
        <div>
          <span className="game-hud__label">HP</span>
          <strong>{state.hp}/{STARTING_HP}</strong>
        </div>
        <div>
          <span className="game-hud__label">SCORE</span>
          <strong>{state.score}</strong>
        </div>
      </div>

      {state.phase === "ready" && (
        <div className="cascade-intro">
          <p className="font-pixel text-xs tracking-widest text-accent">BUILD THE RUN</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Play the right card.</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-dim">
            Spend energy to attack or shield. End the turn to reveal a new hand,
            then add one card after every room you clear.
          </p>
          <button className="game-button mt-6" onClick={start} type="button">
            START RUN
          </button>
        </div>
      )}

      {isPlaying && (
        <>
          <div className="cascade-arena">
            <div className="cascade-enemy">
              <div className="cascade-panel-heading">
                <span className="font-pixel text-xs tracking-widest text-accent">ENEMY INTENT</span>
                <span className="cascade-intent">{state.enemy.intent}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{state.enemy.name}</h2>
              <div aria-label={`${state.enemy.hp} of ${state.enemy.maxHp} enemy HP`} className="cascade-health" role="progressbar" aria-valuemax={state.enemy.maxHp} aria-valuemin={0} aria-valuenow={state.enemy.hp}>
                <span style={{ width: `${enemyPercent(state)}%` }} />
              </div>
              <p className="mt-2 text-xs text-ink-faint">{state.enemy.hp} / {state.enemy.maxHp} HP · attacks for {state.enemy.intent}</p>
            </div>

            <div className="cascade-player">
              <div className="cascade-panel-heading">
                <span className="font-pixel text-xs tracking-widest text-accent">YOUR STATUS</span>
                <span className="cascade-shield">{state.block} shield</span>
              </div>
              <div className="cascade-health cascade-health--player" aria-label={`${state.hp} of ${state.maxHp} player HP`} role="progressbar" aria-valuemax={state.maxHp} aria-valuemin={0} aria-valuenow={state.hp}>
                <span style={{ width: `${hpPercent(state)}%` }} />
              </div>
              <p className="mt-2 text-xs text-ink-faint">{state.hp} / {state.maxHp} HP · turn {state.turn}</p>
              <p className="mt-4 text-sm leading-6 text-ink-dim">{state.message}</p>
            </div>
          </div>

          <div className="cascade-energy" aria-label={`${state.energy} of ${MAX_ENERGY} energy`}>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">Energy</span>
            <div className="cascade-energy__pips">
              {Array.from({ length: MAX_ENERGY }, (_, index) => (
                <span aria-hidden="true" className={index < state.energy ? "cascade-energy__pip cascade-energy__pip--full" : "cascade-energy__pip"} key={index} />
              ))}
            </div>
            <strong>{state.energy}/{MAX_ENERGY}</strong>
          </div>

          <p className="cascade-hand-label">Choose a card · {state.hand.length} in hand</p>
          <div className="cascade-hand">
            {state.hand.map((cardId, handIndex) => (
              <CardButton
                cardId={cardId}
                disabled={!canPlayCard(state, handIndex)}
                key={`${cardId}-${handIndex}`}
                onClick={() => selectCard(handIndex)}
              />
            ))}
          </div>

          <div className="cascade-actions">
            <button className="signal-button signal-button--primary" onClick={finishTurn} type="button">
              END TURN
            </button>
            <span className="text-xs text-ink-faint">Deck {state.deck.length} · Discard {state.discard.length}</span>
          </div>
        </>
      )}

      {state.phase === "reward" && (
        <div className="cascade-reward">
          <p className="font-pixel text-xs tracking-widest text-accent">ROOM CLEARED</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Choose one card.</h2>
          <p className="mt-3 text-sm leading-6 text-ink-dim">
            Add one new tool to your deck before the next room. You also recover 4 HP.
          </p>
          <div className="cascade-reward-grid">
            {state.rewardOptions.map((cardId) => (
              <CardButton cardId={cardId} disabled={false} key={cardId} onClick={() => selectReward(cardId)} />
            ))}
          </div>
        </div>
      )}

      {(state.phase === "won" || state.phase === "lost") && <Outcome onReset={reset} state={state} />}

      <div className="cascade-footer">
        <span>4 rooms · {HAND_SIZE}-card hands · {MAX_ENERGY} energy</span>
        <button className="market-reset" onClick={reset} type="button">Reset run</button>
      </div>
    </section>
  );
}
