import type { Metadata } from "next";
import Link from "next/link";
import { gameCounterLabel, gamePath } from "@/lib/games";
import CardCascadeGame from "./game-client";

export const metadata: Metadata = {
  title: "Card Cascade — Book Arcade",
  description:
    "A compact roguelite deck-builder: play cards, read enemy intent, and build a run across four rooms.",
  alternates: { canonical: gamePath("card-cascade") },
};

export default function CardCascadePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="inline-flex min-h-6 items-center font-pixel text-[10px] tracking-widest text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            BOOK ARCADE
          </Link>
          <span className="font-mono text-xs text-ink-faint">{gameCounterLabel(6)}</span>
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
          <p className="mt-10 font-pixel text-[9px] tracking-[0.2em] text-accent">
            SIXTH PLAYABLE GAME
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Card Cascade
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-dim">
            Build a compact battle deck across four rooms. Read the enemy intent,
            spend your energy, and choose the right reward for the next fight.
          </p>
        </section>

        <CardCascadeGame />

        <section className="mt-10 grid gap-4 border-t border-border pt-8 text-sm text-ink-dim sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Genre</p>
            <p className="mt-2 text-ink">Roguelite · Deck-building · Strategy</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Controls</p>
            <p className="mt-2 text-ink">Click cards, then end the turn</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Build note</p>
            <p className="mt-2 text-ink">Game 006 adds deck-building and enemy intent.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
