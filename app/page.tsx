import Link from "next/link";
import { ArcadeFrame, SOURCE_URL, gameMeta } from "@/components/arcade";
import { ReaderHead, Tags } from "@/components/reader-shell";
import { GAMES, gamePath } from "@/lib/games";
import { STAGES, STATUS_LABEL, honestyCopy, liveSummary } from "@/lib/roadmap";

const [first] = GAMES;

export default function Home() {
  return (
    <ArcadeFrame>
      <ReaderHead
        eyebrow="Built in public"
        title="A small arcade of games, built one playable idea at a time"
        lede={`${honestyCopy()}. Each new game adds one mechanic, genre or experiment to the collection.`}
      >
        <Link className="rs-button" href={gamePath(first.slug)}>Play {first.title}</Link>
        <a className="rs-plain" href="#games">See all {GAMES.length} games</a>
        <a className="rs-plain" href={SOURCE_URL}>Follow the build</a>
      </ReaderHead>

      <section id="games" aria-labelledby="games-title">
        <h2 id="games-title" className="ga-title">All games</h2>
        <ul className="rs-list ga-cards" role="list" data-layout="cards">
          {GAMES.map((game) => (
            <li key={game.slug}>
              <article className="rs-entry">
                {/* eslint-disable-next-line @next/next/no-img-element -- the generated title card is already a fixed-size PNG */}
                <img className="ga-thumb" src={`${gamePath(game.slug)}/opengraph-image`} alt={`${game.title} title card`} width={1200} height={630} loading="lazy" decoding="async" />
                <h3><Link className="rs-entry-link" href={gamePath(game.slug)}>{game.title}</Link></h3>
                <p className="rs-entry-meta">{gameMeta(game.number)}</p>
                <p className="rs-entry-summary">{game.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="live-title">
        <h2 id="live-title" className="ga-title">What is live right now</h2>
        <p className="ga-lede">{liveSummary()}</p>
        <ol className="rs-list ga-stages" role="list">
          {STAGES.map((stage, i) => (
            <li key={stage.label}>
              <article className="rs-entry">
                <h3>{stage.label}</h3>
                <p className="rs-entry-meta">Step {i + 1} of {STAGES.length}</p>
                <p className="rs-entry-summary">{stage.detail}</p>
                <Tags tags={[STATUS_LABEL[stage.status]]} label="Status" />
              </article>
            </li>
          ))}
        </ol>
      </section>
    </ArcadeFrame>
  );
}
