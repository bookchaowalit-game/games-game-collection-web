import { GAME_COUNT } from "./games.ts";

export type StageStatus = "done" | "progress" | "planned";

export type Stage = {
  label: string;
  detail: string;
  status: StageStatus;
};

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

/** "twelve" for 12; digits once words stop reading well (21+). */
export function countWord(n: number): string {
  return Number.isInteger(n) && n >= 0 && n < NUMBER_WORDS.length
    ? NUMBER_WORDS[n]
    : String(n);
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "A, B, and C" (Oxford comma, as in the original copy). */
export function listTitles(titles: readonly string[]): string {
  if (titles.length <= 1) return titles.join("");
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`;
}

/** "Twelve games are live" / "One game is live", from the catalog size. */
export function honestyCopy(count: number = GAME_COUNT): string {
  return count === 1
    ? "One game is live"
    : `${capitalize(countWord(count))} games are live`;
}

/** Homepage "what's actually live" paragraph, derived from the catalog. */
export function liveSummary(count: number = GAME_COUNT): string {
  const shipped = count === 1 ? "One game is" : `${capitalize(countWord(count))} games are`;
  return `${shipped} shipped and playable. The arcade is now moving from game-by-game releases toward a dedicated select screen.`;
}

/** Honest build-in-public roadmap, derived from the game catalog. */
export const STAGES: Stage[] = [
  {
    label: "Visual identity & shell",
    detail: "Design tokens, homepage, and honest status — this page.",
    status: "done",
  },
  {
    label: `${capitalize(countWord(GAME_COUNT))} playable ${GAME_COUNT === 1 ? "game" : "games"}`,
    detail: `${capitalize(countWord(GAME_COUNT))} small ${GAME_COUNT === 1 ? "game" : "games"} shipped end to end; each one is in the list above.`,
    status: "done",
  },
  {
    label: "Full arcade",
    detail: `${honestyCopy()}; a dedicated select screen and high scores are next.`,
    status: "progress",
  },
];

export const STATUS_LABEL: Record<StageStatus, string> = {
  done: "Shipped",
  progress: "In progress",
  planned: "Planned",
};

/** True only when at least one playable game stage is marked done. */
export function hasShippedGame(stages: Stage[] = STAGES): boolean {
  return stages.some(
    (stage) =>
      stage.status === "done" &&
      /playable game|full arcade/i.test(stage.label),
  );
}
