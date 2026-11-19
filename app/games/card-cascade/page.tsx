import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import CardCascadeGame from "./game-client";

export const metadata: Metadata = {
  title: "Card Cascade — Book Arcade",
  description:
    "A compact roguelite deck-builder: play cards, read enemy intent, and build a run across four rooms.",
  alternates: { canonical: gamePath("card-cascade") },
};

export default function CardCascadePage() {
  return (
    <GamePage
      slug="card-cascade"
      lede="Build a compact battle deck across four rooms. Read the enemy intent, spend your energy, and choose the right reward for the next fight."
      facts={[
        { label: "Genre", value: "Roguelite · Deck-building · Strategy" },
        { label: "Controls", value: "Click cards, then end the turn" },
        { label: "Build note", value: "Game 006 adds deck-building and enemy intent." },
      ]}
    >
      <CardCascadeGame />
    </GamePage>
  );
}
