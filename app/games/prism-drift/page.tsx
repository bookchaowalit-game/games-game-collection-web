import type { Metadata } from "next";
import Link from "next/link";
import { gameCounterLabel, gamePath } from "@/lib/games";
import PrismDriftGame from "./game-client";

export const metadata: Metadata = {
  title: "Prism Drift — Book Arcade",
  description:
    "A compact gravity-shifting platformer: collect three prisms, avoid the seam, and drift into the exit.",
  alternates: { canonical: gamePath("prism-drift") },
};

export default function PrismDriftPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="inline-flex min-h-6 items-center font-pixel text-xs tracking-widest text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            BOOK ARCADE
          </Link>
          <span className="font-mono text-xs text-ink-faint">{gameCounterLabel(12)}</span>
        </nav>
      </header>

      <main id="main-content" className="mx-auto max-w-4xl px-6 pb-20">
        <section className="py-12 sm:py-16">
          <Link
            href="/"
            className="text-sm text-ink-dim underline decoration-border underline-offset-4 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Back to the arcade
          </Link>
          <p className="mt-10 font-pixel text-xs tracking-[0.2em] text-accent">
            TWELFTH PLAYABLE GAME
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Prism Drift
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-dim">
            Drift through a tiny gravity-bending level. Collect every prism,
            use the rails as your platforms, and find the exit before the red seam does.
          </p>
        </section>

        <PrismDriftGame />

        <section className="mt-10 grid gap-4 border-t border-border pt-8 text-sm text-ink-dim sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Genre</p>
            <p className="mt-2 text-ink">2D Platformer · Gravity Puzzle · Time Trial</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Controls</p>
            <p className="mt-2 text-ink">Arrow keys or WASD; gravity is your jump</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Build note</p>
            <p className="mt-2 text-ink">Game 012 adds a grid-based platformer loop with deterministic gravity.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

