import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}", "components/**/*.tsx", "lib/**/*.{ts,tsx}"],
      // The twelve game clients are canvas/keyboard UIs; their rules live in lib/<game>.ts, which is covered.
      exclude: ["app/games/*/game-client.tsx"],
      thresholds: { lines: 92 },
    },
  },
});
