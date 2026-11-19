import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { GAME_COUNT } from "../lib/games.ts";
import { RPC_ERRORS, handleRpc } from "../lib/mcp.ts";

describe("MCP handler", () => {
  it("answers initialize with protocol and server info", () => {
    const res = handleRpc({ jsonrpc: "2.0", id: 1, method: "initialize" });
    assert.ok(res && "result" in res);
    const result = res.result as { protocolVersion: string; serverInfo: { name: string } };
    assert.equal(result.protocolVersion, "2024-11-05");
    assert.equal(result.serverInfo.name, "book-arcade");
  });

  it("lists the list_games tool", () => {
    const res = handleRpc({ jsonrpc: "2.0", id: "a", method: "tools/list" });
    assert.ok(res && "result" in res);
    const tools = (res.result as { tools: { name: string }[] }).tools;
    assert.deepEqual(tools.map((t) => t.name), ["list_games"]);
  });

  it("returns the real game catalog from tools/call", () => {
    const res = handleRpc({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name: "list_games", arguments: {} },
    });
    assert.ok(res && "result" in res);
    const content = (res.result as { content: { type: string; text: string }[] }).content;
    assert.equal(content[0].type, "text");
    const games = JSON.parse(content[0].text) as { path: string }[];
    assert.equal(games.length, GAME_COUNT);
    assert.ok(games.every((g) => g.path.startsWith("/games/")));
  });

  it("rejects unknown tools with invalid params", () => {
    const res = handleRpc({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "nope" } });
    assert.ok(res && "error" in res);
    assert.equal(res.error.code, RPC_ERRORS.invalidParams);
  });

  it("uses method-not-found for unknown methods and echoes the id", () => {
    const res = handleRpc({ jsonrpc: "2.0", id: 9, method: "resources/list" });
    assert.ok(res && "error" in res);
    assert.equal(res.error.code, RPC_ERRORS.methodNotFound);
    assert.equal(res.id, 9);
  });

  it("rejects malformed requests", () => {
    for (const bad of [null, [], "x", { id: 1, method: "ping" }, { jsonrpc: "2.0", id: 1 }]) {
      const res = handleRpc(bad);
      assert.ok(res && "error" in res, JSON.stringify(bad));
      assert.equal(res.error.code, RPC_ERRORS.invalidRequest);
    }
  });

  it("does not answer notifications", () => {
    assert.equal(handleRpc({ jsonrpc: "2.0", method: "notifications/initialized" }), null);
  });
});
