import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import NeonHarvestGame from "./game-client";

export const metadata: Metadata = {
  title: "Neon Harvest — Book Arcade",
  description:
    "A compact arcade game: collect every spark before time runs out, while avoiding the sentries.",
  alternates: { canonical: gamePath("neon-harvest") },
};

export default function NeonHarvestPage() {
  return (
    <GamePage
      slug="neon-harvest"
      lede="Move the courier, collect all twelve sparks, and stay clear of the sentries before the 45-second round ends."
      facts={[
        { label: "Genre", value: "Arcade · Action · Casual" },
        { label: "Controls", value: "WASD / arrows / touch pad" },
        { label: "Build note", value: "Game 001 is intentionally small and replayable." },
      ]}
    >
      <NeonHarvestGame />
    </GamePage>
  );
}
