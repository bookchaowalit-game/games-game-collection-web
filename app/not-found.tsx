import Link from "next/link";
import { ArcadeFrame } from "@/components/arcade";
import { EmptyState, ReaderHead } from "@/components/reader-shell";

export default function NotFound() {
  return (
    <ArcadeFrame>
      <ReaderHead eyebrow="Page not found" title="This part of the arcade does not exist" lede="No page lives at this address. It is probably a stale link to a game that has not shipped yet." />
      <EmptyState title="Where to next" action={<Link className="rs-button" href="/">Back to the arcade</Link>}>
        The front page lists every game you can play.
      </EmptyState>
    </ArcadeFrame>
  );
}
