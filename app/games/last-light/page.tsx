import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import LastLightGame from "./game-client";

export const metadata: Metadata = {
  title: "Last Light — Book Arcade",
  description:
    "A compact survival crafting game: gather scrap, protect your shelter, and endure six nights.",
  alternates: { canonical: gamePath("last-light") },
};

export default function LastLightPage() {
  return (
    <GamePage
      slug="last-light"
      lede="Hold a small shelter together for six nights. Scavenge, craft, reinforce, or rest — every useful choice changes what the dark can take."
      facts={[
        { label: "Genre", value: "Survival · Crafting · Resource Management" },
        { label: "Controls", value: "Choose one action, then end the night" },
        { label: "Build note", value: "Game 007 adds survival pressure and crafting trade-offs." },
      ]}
    >
      <LastLightGame />
    </GamePage>
  );
}
