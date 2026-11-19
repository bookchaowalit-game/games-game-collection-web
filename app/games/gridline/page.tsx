import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import GridlineGame from "./game-client";

export const metadata: Metadata = {
  title: "Gridline — Book Arcade",
  description:
    "A compact tactical strategy game: capture three beacons while sentries patrol the grid.",
  alternates: { canonical: gamePath("gridline") },
};

export default function GridlinePage() {
  return (
    <GamePage
      slug="gridline"
      lede="Capture three beacons on a tactical grid. Sentries move every other turn, so every step changes the board around you."
      facts={[
        { label: "Genre", value: "Strategy · Tactical · Turn-based" },
        { label: "Controls", value: "Click a move or use arrows / WASD" },
        { label: "Build note", value: "Game 003 adds turn order and pursuit AI." },
      ]}
    >
      <GridlineGame />
    </GamePage>
  );
}
