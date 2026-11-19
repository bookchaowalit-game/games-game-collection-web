import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import SignalShiftGame from "./game-client";

export const metadata: Metadata = {
  title: "Signal Shift — Book Arcade",
  description:
    "A compact logic puzzle: rotate the circuit tiles until every cell connects from source to core.",
  alternates: { canonical: gamePath("signal-shift") },
};

export default function SignalShiftPage() {
  return (
    <GamePage
      slug="signal-shift"
      lede="Rotate the circuit tiles until every cell is powered from the source to the core. Solve it in as few moves as you can."
      facts={[
        { label: "Genre", value: "Puzzle · Logic · Casual" },
        { label: "Controls", value: "Click or tap a tile to rotate" },
        { label: "Build note", value: "Game 002 adds a deterministic puzzle loop." },
      ]}
    >
      <SignalShiftGame />
    </GamePage>
  );
}
