import type { ReactNode } from "react";
import { ArticleHeader, Pager, Reader, ReaderFoot, ReaderTop, neighbours } from "@/components/reader-shell";
import { GAMES, GAME_COUNT, findGame, gamePath } from "@/lib/games";

export const SOURCE_URL = "https://github.com/bookchaowalit-game/games-game-collection-web";
export const CONTACT_EMAIL = "bookchaowalit.work@gmail.com";

/** Top bar, the page in <main id="main">, and the Reader footer (with an email contact link). */
export function ArcadeFrame({ children }: { children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop name="Book Arcade" tagline="Games, built in public" links={[{ href: "/#games", label: "All games" }, { href: SOURCE_URL, label: "Source" }]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot
        source={SOURCE_URL}
        links={[{ href: `mailto:${CONTACT_EMAIL}`, label: `Contact (email ${CONTACT_EMAIL})` }]}
        note="Every game runs in your browser. No accounts, and nothing you play is sent anywhere."
      />
    </Reader>
  );
}

/** "Game 3 of 12". */
export function gameMeta(number: number, total: number = GAME_COUNT): string {
  return `Game ${number} of ${total}`;
}

export type GameFact = { label: string; value: string };

/** One game page: the article head, the game itself, three facts, and previous / next games. */
export function GamePage({ slug, lede, facts, children }: { slug: string; lede: string; facts: GameFact[]; children: ReactNode }) {
  const game = findGame(slug);
  if (!game) throw new Error(`Unknown game: ${slug}`);
  const { previous, next } = neighbours(GAMES, game.number - 1);
  return (
    <ArcadeFrame>
      <ArticleHeader back={{ href: "/#games", label: "All games" }} title={game.title} lede={lede} meta={[gameMeta(game.number)]} />
      <div className="ga-game">{children}</div>
      <dl className="ga-facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Pager
        label="More games"
        previous={previous ? { href: gamePath(previous.slug), title: previous.title, label: "Previous game" } : undefined}
        next={next ? { href: gamePath(next.slug), title: next.title, label: "Next game" } : undefined}
      />
    </ArcadeFrame>
  );
}
