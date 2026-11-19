import type { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { GAMES } from "@/lib/games";

// Every game page and social card, with the canvas game clients stubbed out (their rules are in lib/).
vi.mock("next/og", () => ({
  ImageResponse: class {
    constructor(readonly element: ReactElement, readonly init: { width: number; height: number }) {}
  },
}));
for (const game of GAMES) vi.doMock(`@/app/games/${game.slug}/game-client`, () => ({ default: () => <div>{`${game.slug}-client`}</div> }));

describe("game routes", () => {
  it("each page renders its game inside the Reader frame, and each social card names its game", async () => {
    for (const game of GAMES) {
      const page = await import(`@/app/games/${game.slug}/page`);
      const html = renderToString(<page.default />);
      expect(html, game.slug).toContain(`<h1>${game.title}</h1>`);
      expect(html, game.slug).toContain(`${game.slug}-client`);
      expect(page.metadata.alternates.canonical).toBe(`/games/${game.slug}`);
      const og = await import(`@/app/games/${game.slug}/opengraph-image`);
      expect(og.alt).toContain(game.title);
      const card = og.default() as { element: ReactElement };
      expect(renderToString(card.element)).toContain(game.title);
    }
  });

  it("the site social card is generated", async () => {
    const og = await import("@/app/opengraph-image");
    const card = og.default() as unknown as { element: ReactElement; init: { width: number } };
    expect(card.init.width).toBe(1200);
    expect(renderToString(card.element)).toContain("playable games");
  });

  it("the game card renderer refuses an unknown slug", async () => {
    const { gameOgAlt, renderGameOgImage } = await import("@/lib/game-og");
    expect(gameOgAlt("nope")).toBe("Book Arcade");
    expect(() => renderGameOgImage("nope")).toThrow(/Unknown game slug/);
  });
});

describe("MCP route", () => {
  const post = async (body: string) => {
    const { POST } = await import("@/app/api/mcp/route");
    return POST(new Request("https://x.test/api/mcp", { method: "POST", body }) as never);
  };
  it("answers a call, acknowledges a notification and rejects bad JSON", async () => {
    expect((await (await post(JSON.stringify({ jsonrpc: "2.0", id: 4, method: "initialize" }))).json()).id).toBe(4);
    expect((await post(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }))).status).toBe(202);
    expect((await post("{bad")).status).toBe(400);
  });
});
