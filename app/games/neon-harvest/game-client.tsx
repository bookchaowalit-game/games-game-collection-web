"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  HAZARDS,
  ROUND_SECONDS,
  START_POSITION,
  TARGETS,
  collectTargets,
  getHazardPosition,
  movePlayer,
  overlaps,
  type Vector,
} from "@/lib/neon-harvest";

type Phase = "ready" | "playing" | "won" | "lost";

const ZERO_DIRECTION: Vector = { x: 0, y: 0 };

function positionStyle(position: Vector) {
  return {
    left: `${position.x}%`,
    top: `${position.y}%`,
  };
}

export default function NeonHarvestGame() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [position, setPosition] = useState<Vector>(START_POSITION);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [collectedIds, setCollectedIds] = useState<ReadonlySet<number>>(new Set());

  const phaseRef = useRef<Phase>("ready");
  const positionRef = useRef<Vector>(START_POSITION);
  const directionRef = useRef<Vector>(ZERO_DIRECTION);
  const collectedRef = useRef<Set<number>>(new Set());
  const elapsedRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const finishRound = useCallback((nextPhase: Exclude<Phase, "ready" | "playing">) => {
    phaseRef.current = nextPhase;
    directionRef.current = ZERO_DIRECTION;
    setPhase(nextPhase);
  }, []);

  const startRound = useCallback(() => {
    phaseRef.current = "playing";
    positionRef.current = START_POSITION;
    directionRef.current = ZERO_DIRECTION;
    collectedRef.current = new Set();
    elapsedRef.current = 0;
    setPosition(START_POSITION);
    setCollectedIds(new Set());
    setElapsedSeconds(0);
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") {
      return;
    }

    let lastFrame = performance.now();

    const tick = (now: number) => {
      if (phaseRef.current !== "playing") {
        return;
      }

      const deltaSeconds = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      const nextElapsed = Math.min(elapsedRef.current + deltaSeconds, ROUND_SECONDS);
      const nextPosition = movePlayer(
        positionRef.current,
        directionRef.current,
        deltaSeconds,
      );
      const nextCollected = collectTargets(
        nextPosition,
        TARGETS,
        collectedRef.current,
      );
      const collectedChanged = nextCollected.size !== collectedRef.current.size;
      const hazardHit = HAZARDS.some((hazard) =>
        overlaps(
          { ...nextPosition, size: 7 },
          { ...getHazardPosition(hazard, nextElapsed), size: hazard.size },
        ),
      );

      positionRef.current = nextPosition;
      collectedRef.current = nextCollected;
      elapsedRef.current = nextElapsed;
      setPosition(nextPosition);
      setElapsedSeconds(nextElapsed);

      if (collectedChanged) {
        setCollectedIds(nextCollected);
      }

      if (hazardHit) {
        finishRound("lost");
        return;
      }

      if (nextCollected.size === TARGETS.length) {
        finishRound("won");
        return;
      }

      if (nextElapsed >= ROUND_SECONDS) {
        finishRound("lost");
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [finishRound, phase]);

  useEffect(() => {
    const pressedKeys = new Set<string>();

    const updateDirection = () => {
      const left = pressedKeys.has("arrowleft") || pressedKeys.has("a");
      const right = pressedKeys.has("arrowright") || pressedKeys.has("d");
      const up = pressedKeys.has("arrowup") || pressedKeys.has("w");
      const down = pressedKeys.has("arrowdown") || pressedKeys.has("s");

      directionRef.current = {
        x: Number(right) - Number(left),
        y: Number(down) - Number(up),
      };
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (["arrowleft", "arrowright", "arrowup", "arrowdown", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        pressedKeys.add(key);
        updateDirection();
      }

      // Let Enter/Space activate a focused link or form field (the skip link included).
      const target = event.target as HTMLElement | null;
      const onControl = target?.closest("a[href], input, select, textarea") != null;

      if ((key === "enter" || key === " ") && !onControl && phaseRef.current !== "playing") {
        event.preventDefault();
        startRound();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key.toLowerCase());
      updateDirection();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [startRound]);

  const holdDirection = (nextDirection: Vector) => {
    directionRef.current = nextDirection;
  };

  const releaseDirection = () => {
    directionRef.current = ZERO_DIRECTION;
  };

  const timeLeft = Math.max(0, Math.ceil(ROUND_SECONDS - elapsedSeconds));
  const hazardPositions = HAZARDS.map((hazard) => getHazardPosition(hazard, elapsedSeconds));

  return (
    <section aria-label="Neon Harvest game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">SPARKS</span>
          <strong>{collectedIds.size}/{TARGETS.length}</strong>
        </div>
        <div>
          <span className="game-hud__label">TIME</span>
          <strong>{timeLeft}s</strong>
        </div>
      </div>

      <div className="neon-board" role="application" aria-label="Neon Harvest play area">
        <div className="neon-board__legend" aria-hidden="true">
          <span>COLLECT</span>
          <span>AVOID</span>
        </div>

        {TARGETS.map((target) => {
          const collected = collectedIds.has(target.id);

          return (
            <span
              aria-hidden="true"
              className={`neon-spark${collected ? " neon-spark--collected" : ""}`}
              key={target.id}
              style={positionStyle(target)}
            />
          );
        })}

        {HAZARDS.map((hazard, index) => (
          <span
            aria-hidden="true"
            className="neon-sentry"
            key={hazard.id}
            style={positionStyle(hazardPositions[index])}
          />
        ))}

        <span
          aria-hidden="true"
          className="neon-player"
          style={positionStyle(position)}
        />

        {phase !== "playing" && (
          <div className="neon-overlay">
            <p className="font-pixel text-[10px] tracking-widest text-accent">
              {phase === "ready" ? "READY?" : phase === "won" ? "ROUND CLEAR" : "ROUND OVER"}
            </p>
            <p className="mt-4 max-w-xs text-center text-sm leading-6 text-white/75">
              {phase === "ready"
                ? "Collect every spark. The sentries move, so keep moving too."
                : phase === "won"
                  ? "Perfect harvest. Run it again and beat your route."
                  : collectedIds.size > 0
                    ? `You harvested ${collectedIds.size} sparks. Find a safer line next time.`
                    : "The sentries got you before the harvest began."}
            </p>
            <button className="game-button mt-6" onClick={startRound} type="button">
              {phase === "ready" ? "START ROUND" : "PLAY AGAIN"}
            </button>
          </div>
        )}
      </div>

      <div className="game-controls" aria-label="Touch controls">
        <button
          aria-label="Move up"
          className="game-control game-control--up"
          onPointerDown={() => holdDirection({ x: 0, y: -1 })}
          onPointerUp={releaseDirection}
          onPointerLeave={releaseDirection}
          onPointerCancel={releaseDirection}
          type="button"
        >
          ↑
        </button>
        <button
          aria-label="Move left"
          className="game-control game-control--left"
          onPointerDown={() => holdDirection({ x: -1, y: 0 })}
          onPointerUp={releaseDirection}
          onPointerLeave={releaseDirection}
          onPointerCancel={releaseDirection}
          type="button"
        >
          ←
        </button>
        <button
          aria-label="Move down"
          className="game-control game-control--down"
          onPointerDown={() => holdDirection({ x: 0, y: 1 })}
          onPointerUp={releaseDirection}
          onPointerLeave={releaseDirection}
          onPointerCancel={releaseDirection}
          type="button"
        >
          ↓
        </button>
        <button
          aria-label="Move right"
          className="game-control game-control--right"
          onPointerDown={() => holdDirection({ x: 1, y: 0 })}
          onPointerUp={releaseDirection}
          onPointerLeave={releaseDirection}
          onPointerCancel={releaseDirection}
          type="button"
        >
          →
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-ink-faint">
        Keyboard: WASD or arrow keys · Touch: hold a direction
      </p>
    </section>
  );
}
