import type { Metadata } from "next";
import Link from "next/link";
import { gameCounterLabel, gamePath } from "@/lib/games";
import EchoChamberGame from "./game-client";

export const metadata: Metadata = {
  title: "Echo Chamber — Book Arcade",
  description:
    "A compact horror deduction game: explore six rooms, collect impossible evidence, and name where the echo begins.",
  alternates: { canonical: gamePath("echo-chamber") },
};

export default function EchoChamberPage() {
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
          <span className="font-mono text-xs text-ink-faint">{gameCounterLabel(9)}</span>
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
            NINTH PLAYABLE GAME
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Echo Chamber
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-dim">
            Explore a house with six rooms and one impossible source. Spend your
            sanity on evidence, follow the map, and name the room that answers first.
          </p>
        </section>

        <EchoChamberGame />

        <section className="mt-10 grid gap-4 border-t border-border pt-8 text-sm text-ink-dim sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Genre</p>
            <p className="mt-2 text-ink">Horror · Deduction · Exploration</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Controls</p>
            <p className="mt-2 text-ink">Enter rooms, inspect clues, mark a source</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Build note</p>
            <p className="mt-2 text-ink">Game 009 adds exploration tension and deduction.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
