"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  INITIAL_STATE,
  LANE_KEYS,
  NOTE_PATTERN,
  NOTE_TRAVEL_MS,
  TARGET_HITS,
  getAccuracy,
  getNoteProgress,
  hitPulse,
  startPulse,
  tickPulse,
  type NoteLane,
  type PulseState,
} from "@/lib/pulse-parade";

function judgementCopy(judgement: PulseState["lastJudgement"]): string {
  if (judgement === "perfect") {
    return "PERFECT";
  }

  if (judgement === "good") {
    return "GOOD";
  }

  if (judgement === "miss") {
    return "MISS";
  }

  return "WAIT FOR THE BEAT";
}

function outcomeCopy(state: PulseState): string {
  if (state.phase === "won") {
    return `You kept the parade moving with a ${state.maxCombo} note max combo.`;
  }

  return `You landed ${state.hits} of ${NOTE_PATTERN.length} notes. Find the pulse and run it again.`;
}

export default function PulseParadeGame() {
  const [state, setState] = useState<PulseState>(INITIAL_STATE);
  const stateRef = useRef<PulseState>(INITIAL_STATE);

  const syncState = useCallback((nextState: PulseState) => {
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const begin = useCallback(() => {
    syncState(startPulse());
  }, [syncState]);

  const pressLane = useCallback(
    (lane: NoteLane) => {
      syncState(hitPulse(stateRef.current, lane));
    },
    [syncState],
  );

  useEffect(() => {
    if (state.phase !== "playing") {
      return undefined;
    }

    let frame = 0;
    let previousTime = performance.now();

    const update = (now: number) => {
      const delta = now - previousTime;
      previousTime = now;
      const current = stateRef.current;
      const nextState = tickPulse(current, current.elapsedMs + delta);

      stateRef.current = nextState;
      setState(nextState);

      if (nextState.phase === "playing") {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, [state.phase]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (target instanceof HTMLElement && ["BUTTON", "A"].includes(target.tagName)) {
        return;
      }

      if (event.key === " " && stateRef.current.phase !== "playing") {
        event.preventDefault();
        begin();
        return;
      }

      const laneIndex = LANE_KEYS.indexOf(event.key.toUpperCase() as (typeof LANE_KEYS)[number]);

      if (laneIndex < 0 || stateRef.current.phase !== "playing") {
        return;
      }

      event.preventDefault();
      pressLane(laneIndex as NoteLane);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [begin, pressLane]);

  const accuracy = getAccuracy(state);
  const isPlaying = state.phase === "playing";
  const isFinished = state.phase === "won" || state.phase === "lost";

  return (
    <section aria-label="Pulse Parade game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">SCORE</span>
          <strong>{state.score}</strong>
        </div>
        <div>
          <span className="game-hud__label">COMBO</span>
          <strong>{state.combo}x</strong>
        </div>
        <div>
          <span className="game-hud__label">ACCURACY</span>
          <strong>{accuracy}%</strong>
        </div>
      </div>

      {!isPlaying && !isFinished && (
        <div className="pulse-intro">
          <p className="font-pixel text-xs tracking-widest text-accent">SYNC THE CITY</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Catch the pulse.</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-dim">
            Press A / S / D / F when a note reaches the line. Land eight notes to
            keep the parade alive.
          </p>
          <button className="game-button mt-6" onClick={begin} type="button">
            START SET
          </button>
        </div>
      )}

      {isPlaying && (
        <>
          <p className="pulse-instructions">
            Hit the matching lane at the line. Keyboard: A / S / D / F · Tap a lane on mobile.
          </p>

          <div aria-label="Pulse Parade timing lanes" className="pulse-board">
            {LANE_KEYS.map((key, laneIndex) => (
              <button
                aria-label={`Lane ${key}`}
                className={`pulse-lane pulse-lane--${key.toLowerCase()}`}
                key={key}
                onClick={() => pressLane(laneIndex as NoteLane)}
                type="button"
              >
                <span aria-hidden="true" className="pulse-lane__key">{key}</span>
                <span aria-hidden="true" className="pulse-lane__track">
                  {NOTE_PATTERN.map((note, index) => {
                    const progress = getNoteProgress(note, state.elapsedMs);
                    const visible =
                      note.lane === laneIndex &&
                      state.judgements[index] === "pending" &&
                      state.elapsedMs >= note.atMs - NOTE_TRAVEL_MS &&
                      progress <= 1;

                    if (!visible) {
                      return null;
                    }

                    return (
                      <span
                        aria-hidden="true"
                        className="pulse-note"
                        key={note.id}
                        style={{ top: `${8 + progress * 76}%` }}
                      />
                    );
                  })}
                  <span className="pulse-lane__hitline" />
                </span>
              </button>
            ))}
          </div>

          <p className={`pulse-feedback pulse-feedback--${state.lastJudgement ?? "idle"}`} role="status">
            {judgementCopy(state.lastJudgement)}
          </p>
        </>
      )}

      {isFinished && (
        <div className={`pulse-result pulse-result--${state.phase}`} role="status">
          <p className="font-pixel text-xs tracking-widest text-accent">
            {state.phase === "won" ? "SET COMPLETE" : "BEAT LOST"}
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-dim">{outcomeCopy(state)}</p>
          <div className="pulse-stats">
            <span><strong>{state.perfects}</strong> perfect</span>
            <span><strong>{state.goods}</strong> good</span>
            <span><strong>{state.misses}</strong> miss</span>
          </div>
          <button className="signal-button signal-button--primary mt-4" onClick={begin} type="button">
            PLAY AGAIN
          </button>
        </div>
      )}

      <div className="pulse-footer">
        <span>{NOTE_PATTERN.length} notes · {NOTE_TRAVEL_MS / 1000}s lead-in</span>
        <span>Goal: {TARGET_HITS} hits</span>
        <button className="market-reset" onClick={() => syncState(INITIAL_STATE)} type="button">
          Reset set
        </button>
      </div>
    </section>
  );
}
