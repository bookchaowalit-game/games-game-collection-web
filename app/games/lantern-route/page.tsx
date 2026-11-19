import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import LanternRouteGame from "./game-client";

export const metadata: Metadata = {
  title: "Lantern Route — Book Arcade",
  description:
    "A compact interactive narrative game: guide a lantern through five chapters and choose what reaches the lighthouse.",
  alternates: { canonical: gamePath("lantern-route") },
};

export default function LanternRoutePage() {
  return (
    <GamePage
      slug="lantern-route"
      lede="Carry a lantern through five chapters of rain, bridges, and choices. Protect your supplies, keep trust alive, and decide what the lighthouse should see."
      facts={[
        { label: "Genre", value: "Interactive Narrative · Choice · Resource Management" },
        { label: "Controls", value: "Choose one story action per chapter" },
        { label: "Build note", value: "Game 011 adds branching narrative and multiple endings." },
      ]}
    >
      <LanternRouteGame />
    </GamePage>
  );
}
