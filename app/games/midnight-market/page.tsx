import type { Metadata } from "next";
import { GamePage } from "@/components/arcade";
import { gamePath } from "@/lib/games";
import MidnightMarketGame from "./game-client";

export const metadata: Metadata = {
  title: "Midnight Market — Book Arcade",
  description:
    "A compact business simulation: plan stock, set prices, and grow a night market stall over five days.",
  alternates: { canonical: gamePath("midnight-market") },
};

export default function MidnightMarketPage() {
  return (
    <GamePage
      slug="midnight-market"
      lede="Run a tiny night-market stall for five days. Read the forecast, buy stock, set your price, and turn a small cash float into a living shop."
      facts={[
        { label: "Genre", value: "Simulation · Business · Tycoon" },
        { label: "Controls", value: "Choose prep and price, then open" },
        { label: "Build note", value: "Game 004 adds economy and management choices." },
      ]}
    >
      <MidnightMarketGame />
    </GamePage>
  );
}
