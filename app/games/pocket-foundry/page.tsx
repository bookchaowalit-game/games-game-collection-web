import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import PocketFoundryGame from "./game-client";

export const metadata: Metadata = {
  title: "Pocket Foundry — Book Arcade",
  description:
    "A compact automation game: place conveyors, a smelter, and a press to ship three production cycles.",
  alternates: { canonical: gamePath("pocket-foundry") },
};

export default function PocketFoundryPage() {
  return (
    <GamePage
      slug="pocket-foundry"
      lede="Turn a tiny 4×4 grid into a working production chain. Place the machines, keep the line connected, and ship three cargo cycles before time runs out."
      facts={[
        { label: "Genre", value: "Automation · Production · Puzzle" },
        { label: "Controls", value: "Choose blueprints, place machines, run cycles" },
        { label: "Build note", value: "Game 010 adds production chains and grid planning." },
      ]}
    >
      <PocketFoundryGame />
    </GamePage>
  );
}
