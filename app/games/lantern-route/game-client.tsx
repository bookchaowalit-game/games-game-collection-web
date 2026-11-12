"use client";

import { useState } from "react";
import {
  INITIAL_STATE,
  STORY_SCENES,
  chooseStoryChoice,
  currentScene,
  isChoiceAvailable,
  resetLanternRoute,
  type LanternState,
  type ResourceEffects,
  type ResourceKey,
  type StoryChoice,
} from "@/lib/lantern-route";

const RESOURCE_LABELS: Record<ResourceKey, string> = {
  supplies: "supplies",
  trust: "trust",
  light: "light",
};

function effectsText(effects: ResourceEffects): string {
  return (Object.entries(effects) as [ResourceKey, number][])
    .filter(([, amount]) => amount !== 0)
    .map(([resource, amount]) => `${amount > 0 ? "+" : ""}${amount} ${RESOURCE_LABELS[resource]}`)
    .join(" · ");
}

function requirementsText(choice: StoryChoice): string {
  if (!choice.requires) {
    return "No requirement";
  }

  return `Needs ${(Object.entries(choice.requires) as [ResourceKey, number][])
    .map(([resource, amount]) => `${amount} ${RESOURCE_LABELS[resource]}`)
    .join(" + ")}`;
}

function Outcome({ state, onReset }: { state: LanternState; onReset: () => void }) {
  const won = state.phase === "won";
  const title = state.ending === "beacon"
    ? "The whole coast sees you."
    : state.ending === "flame"
      ? "One light finds its way home."
      : "The road disappears behind the rain.";

  return (
    <div className={`lantern-result lantern-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "A STORY COMPLETED" : "THE ROAD ENDS"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">{state.message}</p>
      <div className="lantern-final-stats">
        <span>{state.supplies} supplies</span>
        <span>{state.trust} trust</span>
        <span>{state.light} light</span>
      </div>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        WALK THE ROUTE AGAIN
      </button>
    </div>
  );
}

export default function LanternRouteGame() {
  const [state, setState] = useState<LanternState>(INITIAL_STATE);
  const scene = currentScene(state);
  const isPlaying = state.phase === "playing";

  const choose = (choiceId: string) => {
    setState((currentState) => chooseStoryChoice(currentState, choiceId));
  };

  const reset = () => {
    setState(resetLanternRoute());
  };

  return (
    <section aria-label="Lantern Route game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">CHAPTER</span>
          <strong>{Math.min(state.sceneIndex + 1, STORY_SCENES.length)}/{STORY_SCENES.length}</strong>
        </div>
        <div>
          <span className="game-hud__label">SUPPLIES</span>
          <strong>{state.supplies}</strong>
        </div>
        <div>
          <span className="game-hud__label">TRUST</span>
          <strong>{state.trust}</strong>
        </div>
        <div>
          <span className="game-hud__label">LIGHT</span>
          <strong>{state.light}</strong>
        </div>
      </div>

      {isPlaying ? (
        <>
          <div className="lantern-story">
            <p className="font-pixel text-xs tracking-widest text-accent">{scene.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">{scene.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink-dim">{scene.text}</p>
            <p className="lantern-message">{state.message}</p>
          </div>

          <div className="lantern-choice-heading">
            <p>Choose what the road remembers</p>
            <span>{state.history.length} choices made</span>
          </div>
          <div className="lantern-choice-grid">
            {scene.choices.map((choice) => {
              const available = isChoiceAvailable(state, choice);
              const outcome = effectsText(choice.effects);

              return (
                <button
                  className={`lantern-choice${available ? "" : " lantern-choice--locked"}`}
                  disabled={!available}
                  key={choice.id}
                  onClick={() => choose(choice.id)}
                  type="button"
                >
                  <strong>{choice.label}</strong>
                  <span>{choice.detail}</span>
                  <small>{outcome || "No resource change"}</small>
                  <em>{requirementsText(choice)}</em>
                </button>
              );
            })}
          </div>

          <div className="lantern-history">
            <div className="lantern-choice-heading">
              <p>Your route so far</p>
              <span>The lantern keeps score</span>
            </div>
            {state.history.length === 0 ? (
              <p className="lantern-empty">The first choice is still yours.</p>
            ) : (
              <ol>
                {state.history.map((record, index) => (
                  <li key={`${record.sceneId}-${record.choiceId}`}>
                    <span>0{index + 1}</span>
                    <strong>{record.label}</strong>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      ) : (
        <Outcome onReset={reset} state={state} />
      )}

      <div className="lantern-footer">
        <span>5 chapters · 3 resources · many endings</span>
        <button className="market-reset" onClick={reset} type="button">Reset story</button>
      </div>
    </section>
  );
}
