import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import GoalLineGame from "./game-client";

export const metadata: Metadata = {
  title: "Goal Line — Book Arcade",
  description:
    "A compact sports arcade game: read the keeper, choose your shot, and score three goals from five penalties.",
  alternates: { canonical: gamePath("goal-line") },
};

export default function GoalLinePage() {
  return (
    <GamePage
      slug="goal-line"
      lede="Read the keeper, pick a corner and height, then take five penalties under stadium pressure. Score three goals to win the shootout."
      facts={[
        { label: "Genre", value: "Sports · Arcade · Timing" },
        { label: "Controls", value: "Choose a corner and height, then shoot" },
        { label: "Build note", value: "Game 008 adds sports timing and keeper reads." },
      ]}
    >
      <GoalLineGame />
    </GamePage>
  );
}
