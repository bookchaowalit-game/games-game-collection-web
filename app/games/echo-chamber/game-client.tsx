"use client";

import { useState } from "react";
import {
  ECHO_ROOMS,
  EVIDENCE_OPTIONS,
  INITIAL_STATE,
  getRoom,
  investigate,
  moveToRoom,
  nameSource,
  resetEchoChamber,
  selectRoom,
  type EchoState,
  type EvidenceType,
  type RoomId,
} from "@/lib/echo-chamber";

function roomLabel(roomId: RoomId): string {
  return getRoom(roomId).name;
}

function evidenceLabel(kind: EvidenceType): string {
  return EVIDENCE_OPTIONS.find((option) => option.id === kind)?.label ?? kind;
}

function Observation({ state }: { state: EchoState }) {
  const observation = state.lastObservation;

  if (!observation) {
    return null;
  }

  return (
    <div className={`echo-observation${observation.decisive ? " echo-observation--decisive" : ""}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        NEW RECORDING · {roomLabel(observation.roomId)}
      </p>
      <h2 className="mt-3 text-xl font-semibold text-ink">{evidenceLabel(observation.kind)}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-dim">{observation.text}</p>
    </div>
  );
}

function Outcome({ state, onReset }: { state: EchoState; onReset: () => void }) {
  const won = state.phase === "won";

  return (
    <div className={`echo-result echo-result--${won ? "won" : "lost"}`} role="status">
      <p className="font-pixel text-xs tracking-widest text-accent">
        {won ? "SIGNAL LOCATED" : "SIGNAL LOST"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">
        {won ? "The house falls quiet." : "The house keeps your voice."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-dim">{state.message}</p>
      <p className="mt-2 text-sm text-ink-faint">
        {state.evidence.length} recordings collected · {state.sanity} sanity remaining
      </p>
      <button className="signal-button signal-button--primary mt-5" onClick={onReset} type="button">
        ENTER AGAIN
      </button>
    </div>
  );
}

export default function EchoChamberGame() {
  const [state, setState] = useState<EchoState>(INITIAL_STATE);
  const currentRoom = getRoom(state.currentRoom);
  const isInvestigating = state.phase === "investigating";
  const canInspect = isInvestigating && state.sanity > 0;

  const enterRoom = (roomId: RoomId) => {
    setState((currentState) => moveToRoom(currentState, roomId));
  };

  const inspect = (kind: EvidenceType) => {
    setState((currentState) => investigate(currentState, kind));
  };

  const markRoom = (roomId: RoomId) => {
    setState((currentState) => selectRoom(currentState, roomId));
  };

  const report = () => {
    setState((currentState) => nameSource(currentState));
  };

  const reset = () => {
    setState(resetEchoChamber());
  };

  return (
    <section aria-label="Echo Chamber game" className="game-panel">
      <div className="game-hud" role="status" aria-live="polite">
        <div>
          <span className="game-hud__label">SANITY</span>
          <strong>{state.sanity}/7</strong>
        </div>
        <div>
          <span className="game-hud__label">RECORDINGS</span>
          <strong>{state.evidence.length}</strong>
        </div>
        <div>
          <span className="game-hud__label">ROOM</span>
          <strong>{currentRoom.name}</strong>
        </div>
      </div>

      {isInvestigating && (
        <>
          <div className="echo-atmosphere">
            <div>
              <p className="font-pixel text-xs tracking-widest text-accent">THE HOUSE IS LISTENING</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{currentRoom.name}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-ink-dim">{currentRoom.description}</p>
            </div>
            <p className="echo-message">{state.message}</p>
          </div>

          <div className="echo-section-heading">
            <p>Move through the house</p>
            <span>{state.visited.length}/6 rooms mapped</span>
          </div>
          <div className="echo-room-grid">
            {ECHO_ROOMS.map((room) => {
              const isCurrent = room.id === state.currentRoom;
              const isVisited = state.visited.includes(room.id);
              const canEnter = currentRoom.connections.includes(room.id);
              const isSelected = state.selectedRoom === room.id;

              return (
                <article className={`echo-room${isCurrent ? " echo-room--current" : ""}${isVisited ? " echo-room--visited" : ""}`} key={room.id}>
                  <div className="echo-room-heading">
                    <span className="echo-room-symbol" aria-hidden="true">{room.symbol}</span>
                    <div>
                      <h3>{room.name}</h3>
                      <p>{isCurrent ? "You are here" : isVisited ? "Mapped" : "Unmapped"}</p>
                    </div>
                  </div>
                  <div className="echo-room-actions">
                    <button
                      className="echo-room-button"
                      disabled={isCurrent || !canEnter}
                      onClick={() => enterRoom(room.id)}
                      type="button"
                    >
                      {isCurrent ? "CURRENT" : canEnter ? "ENTER" : "OUT OF REACH"}
                    </button>
                    {isVisited && (
                      <button
                        aria-pressed={isSelected}
                        className={`echo-mark-button${isSelected ? " echo-mark-button--selected" : ""}`}
                        onClick={() => markRoom(room.id)}
                        type="button"
                      >
                        {isSelected ? "MARKED" : "MARK SOURCE"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="echo-section-heading echo-section-heading--actions">
            <p>Spend sanity to collect evidence</p>
            <span>{state.sanity > 0 ? `${state.sanity} scans left` : "No scans left"}</span>
          </div>
          <div className="echo-action-grid">
            {EVIDENCE_OPTIONS.map((option) => {
              const recorded = state.evidence.some(
                (record) => record.roomId === state.currentRoom && record.kind === option.id,
              );

              return (
                <button
                  className="echo-action"
                  disabled={!canInspect || recorded}
                  key={option.id}
                  onClick={() => inspect(option.id)}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <span>{option.detail}</span>
                  <small>{recorded ? "RECORDED" : canInspect ? "-1 SANITY" : "UNAVAILABLE"}</small>
                </button>
              );
            })}
          </div>

          <Observation state={state} />

          <div className="echo-evidence-log">
            <div className="echo-section-heading">
              <p>Evidence log</p>
              <span>Trust the impossible detail</span>
            </div>
            {state.evidence.length === 0 ? (
              <p className="echo-empty">No recordings yet. The first room is waiting.</p>
            ) : (
              <ul>
                {state.evidence.map((record) => (
                  <li key={`${record.roomId}-${record.kind}`}>
                    <span>{roomLabel(record.roomId)}</span>
                    <strong>{record.text}</strong>
                    {record.decisive && <small>IMPOSSIBLE</small>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="echo-decision">
            <p className="text-sm text-ink-dim">
              {state.selectedRoom
                ? `Marked source: ${roomLabel(state.selectedRoom)}`
                : "Mark a visited room before naming the source."}
            </p>
            <button className="game-button" disabled={!state.selectedRoom} onClick={report} type="button">
              NAME SOURCE
            </button>
          </div>
        </>
      )}

      {!isInvestigating && <Outcome onReset={reset} state={state} />}

      <div className="echo-footer">
        <span>Six rooms · one true source · finite sanity</span>
        <button className="market-reset" onClick={reset} type="button">Reset investigation</button>
      </div>
    </section>
  );
}
