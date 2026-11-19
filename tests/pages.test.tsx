import type { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
  Press_Start_2P: () => ({ variable: "pixel" }),
}));
vi.mock("next/font/local", () => ({ default: () => ({ variable: "noto-thai" }) }));

import { GamePage, gameMeta } from "@/components/arcade";
import GridlinePage from "@/app/games/gridline/page";
import NeonHarvestPage from "@/app/games/neon-harvest/page";
import PrismDriftPage from "@/app/games/prism-drift/page";
import RootLayout, { metadata } from "@/app/layout";
import NotFound from "@/app/not-found";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { GAMES } from "@/lib/games";
import nextConfig from "@/next.config";

vi.mock("@/app/games/gridline/game-client", () => ({ default: () => <div>gridline-game</div> }));
vi.mock("@/app/games/neon-harvest/game-client", () => ({ default: () => <div>neon-game</div> }));
vi.mock("@/app/games/prism-drift/game-client", () => ({ default: () => <div>prism-game</div> }));

describe("home", () => {
  const html = renderToString(<Home />);

  it("has one h1, one filled CTA to the first game and plain links to the list and the source", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/class="rs-button"/g)).toHaveLength(1);
    expect(html).toContain('class="rs-button" href="/games/neon-harvest"');
    expect(html).toContain('href="#games"');
    expect(html).toContain('href="https://github.com/bookchaowalit-game/games-game-collection-web"');
    expect(html).not.toContain("bookchaowalit-game-collection-frontend");
    expect(html).not.toContain("▶");
  });

  it("lists every game once as a card with a lazy title-card image and alt text", () => {
    for (const game of GAMES) {
      expect(html).toContain(`href="/games/${game.slug}">${game.title}</a>`);
      expect(html).toContain(`src="/games/${game.slug}/opengraph-image" alt="${game.title} title card"`);
    }
    expect(html.match(/loading="lazy"/g)).toHaveLength(GAMES.length);
  });

  it("shows the roadmap with honest text statuses and no list of game names", () => {
    expect(html).toContain("Twelve playable games");
    expect(html).toContain("Shipped");
    expect(html).toContain("In progress");
    expect(html).not.toMatch(/Neon Harvest, Signal Shift/);
  });

  it("links the hub, privacy, status and the contact email in the footer", () => {
    for (const href of ["https://bookchaowalit.com/", "https://bookchaowalit.com/privacy", "https://monitor.bookchaowalit.com/", "mailto:bookchaowalit.work@gmail.com"]) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(html).toContain("Contact (email bookchaowalit.work@gmail.com)");
  });
});

describe("game pages", () => {
  it("wrap the game in the Reader frame with meta, facts and previous/next", () => {
    const html = renderToString(<GridlinePage />);
    expect(html).toContain("<h1>Gridline</h1>");
    expect(html).toContain("Game 3 of 12");
    expect(html).toContain("gridline-game");
    expect(html).toContain("<dt>Controls</dt>");
    expect(html).toContain('href="/games/signal-shift" rel="prev"');
    expect(html).toContain('href="/games/midnight-market" rel="next"');
  });

  it("first and last games have one neighbour", () => {
    expect(renderToString(<NeonHarvestPage />)).not.toContain('rel="prev"');
    expect(renderToString(<PrismDriftPage />)).not.toContain('rel="next"');
  });

  it("refuses an unknown slug", () => {
    expect(() => renderToString(<GamePage slug="nope" lede="" facts={[]}><p /></GamePage>)).toThrow("Unknown game: nope");
    expect(gameMeta(2, 5)).toBe("Game 2 of 5");
  });
});

describe("site", () => {
  it("404 keeps the frame and links home", () => {
    const html = renderToString(<NotFound />);
    expect(html).toContain('class="rs-top"');
    expect(html).toContain('class="rs-foot"');
    expect(html).toContain('href="/"');
  });

  it("layout puts the font variables on <html> and metadata uses the site's own domain", () => {
    const html = renderToString(<RootLayout><main /></RootLayout>) as string;
    expect(html).toMatch(/^<html lang="en" class="geist geist-mono noto-thai pixel"/);
    expect(String(metadata.metadataBase)).toBe("https://game-collection.bookchaowalit.com/");
    expect(robots().sitemap).toBe("https://game-collection.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://game-collection.bookchaowalit.com");
  });

  it("/more-projects redirects to the portfolio hub for good", async () => {
    expect(await nextConfig.redirects!()).toEqual([{ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true }]);
  });
});

export type { ReactElement };
