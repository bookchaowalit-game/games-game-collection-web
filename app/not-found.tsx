import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-ink">
      <p className="font-pixel text-xs tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold">
        This part of the arcade doesn&apos;t exist.
      </h1>
      <p className="mt-2 max-w-sm text-ink-dim">
        No page lives at this address — probably a stale link to a game that
        hasn&apos;t shipped yet.
      </p>
      <Link
        href="/"
        className="font-pixel mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-4 text-xs tracking-wider text-accent-ink shadow-sm transition-transform motion-safe:active:translate-y-0.5 motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        ▶ BACK TO START
      </Link>
    </main>
  );
}
