import type { Metadata } from "next";
import Link from "next/link";
import { gameCounterLabel, gamePath } from "@/lib/games";
import SignalShiftGame from "./game-client";

export const metadata: Metadata = {
  title: "Signal Shift — Book Arcade",
  description:
    "A compact logic puzzle: rotate the circuit tiles until every cell connects from source to core.",
  alternates: { canonical: gamePath("signal-shift") },
};

export default function SignalShiftPage() {
  return (
    <main id="main-content" className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="inline-flex min-h-6 items-center font-pixel text-[10px] tracking-widest text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            BOOK ARCADE
          </Link>
          <span className="font-mono text-xs text-ink-faint">{gameCounterLabel(2)}</span>
        </nav>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <section className="py-12 sm:py-16">
          <Link
            href="/"
            className="text-sm text-ink-dim underline decoration-border underline-offset-4 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Back to the arcade
          </Link>
          <p className="mt-10 font-pixel text-[9px] tracking-[0.2em] text-accent">
            SECOND PLAYABLE GAME
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Signal Shift
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-dim">
            Rotate the circuit tiles until every cell is powered from the source
            to the core. Solve it in as few moves as you can.
          </p>
        </section>

        <SignalShiftGame />

        <section className="mt-10 grid gap-4 border-t border-border pt-8 text-sm text-ink-dim sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Genre</p>
            <p className="mt-2 text-ink">Puzzle · Logic · Casual</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Controls</p>
            <p className="mt-2 text-ink">Click or tap a tile to rotate</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Build note</p>
            <p className="mt-2 text-ink">Game 002 adds a deterministic puzzle loop.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
