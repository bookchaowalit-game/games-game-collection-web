import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import PrismDriftGame from "./game-client";

export const metadata: Metadata = {
  title: "Prism Drift — Book Arcade",
  description:
    "A compact gravity-shifting platformer: collect three prisms, avoid the seam, and drift into the exit.",
  alternates: { canonical: gamePath("prism-drift") },
};

export default function PrismDriftPage() {
  return (
    <GamePage
      slug="prism-drift"
      lede="Drift through a tiny gravity-bending level. Collect every prism, use the rails as your platforms, and find the exit before the red seam does."
      facts={[
        { label: "Genre", value: "2D Platformer · Gravity Puzzle · Time Trial" },
        { label: "Controls", value: "Arrow keys or WASD; gravity is your jump" },
        { label: "Build note", value: "Game 012 adds a grid-based platformer loop with deterministic gravity." },
      ]}
    >
      <PrismDriftGame />
    </GamePage>
  );
}
