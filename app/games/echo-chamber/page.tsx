import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import EchoChamberGame from "./game-client";

export const metadata: Metadata = {
  title: "Echo Chamber — Book Arcade",
  description:
    "A compact horror deduction game: explore six rooms, collect impossible evidence, and name where the echo begins.",
  alternates: { canonical: gamePath("echo-chamber") },
};

export default function EchoChamberPage() {
  return (
    <GamePage
      slug="echo-chamber"
      lede="Explore a house with six rooms and one impossible source. Spend your sanity on evidence, follow the map, and name the room that answers first."
      facts={[
        { label: "Genre", value: "Horror · Deduction · Exploration" },
        { label: "Controls", value: "Enter rooms, inspect clues, mark a source" },
        { label: "Build note", value: "Game 009 adds exploration tension and deduction." },
      ]}
    >
      <EchoChamberGame />
    </GamePage>
  );
}
