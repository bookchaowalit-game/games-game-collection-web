import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import PulseParadeGame from "./game-client";

export const metadata: Metadata = {
  title: "Pulse Parade — Book Arcade",
  description:
    "A compact rhythm game: hit four timing lanes, build a combo, and keep the parade moving.",
  alternates: { canonical: gamePath("pulse-parade") },
};

export default function PulseParadePage() {
  return (
    <GamePage
      slug="pulse-parade"
      lede="Keep a midnight parade alive by catching each note at the line. Find the rhythm, build a combo, and turn timing into momentum."
      facts={[
        { label: "Genre", value: "Rhythm · Timing · Casual" },
        { label: "Controls", value: "A / S / D / F or tap a lane" },
        { label: "Build note", value: "Game 005 adds timing windows and combo scoring." },
      ]}
    >
      <PulseParadeGame />
    </GamePage>
  );
}
