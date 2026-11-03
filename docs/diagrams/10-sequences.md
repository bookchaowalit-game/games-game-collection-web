# 10 — Sequences

Status: **done**. 4 request path ที่สำคัญ

## S1 — เปิดหน้าเกมและเล่นหนึ่ง run

```mermaid
sequenceDiagram
  actor V as Visitor
  participant CDN as Vercel edge CDN
  participant P as Prerendered /games/slug
  participant C as game-client.tsx
  participant L as lib game module
  V->>CDN: GET /games/card-cascade
  CDN-->>V: HTML + JS (static, x-vercel-cache HIT)
  V->>C: hydrate client component
  C->>L: INITIAL_STATE
  V->>C: click or key input
  C->>L: transition e.g. playCard(state, i)
  L-->>C: next state with phase
  C-->>V: re-render HUD role=status
  alt phase is won or lost
    V->>C: PLAY AGAIN / reset
    C->>L: resetCascade()
  end
```

Sources: `app/games/card-cascade/page.tsx`, `app/games/card-cascade/game-client.tsx`, `lib/card-cascade.ts`, `curl -I` บน live site (2026-11-03: `server: Vercel`, `x-vercel-cache: HIT`)

## S2 — MCP `tools/call list_games`

```mermaid
sequenceDiagram
  participant A as MCP client
  participant R as /api/mcp route - Edge
  participant H as lib/mcp.ts handleRpc
  participant G as lib/games.ts
  A->>R: POST JSON-RPC body
  alt body is not JSON
    R-->>A: 400 error -32700 Parse error
  else valid JSON
    R->>H: handleRpc(message)
    alt invalid request shape
      H-->>R: error -32600
    else method tools/call name list_games
      H->>G: GAMES.map(number, title, summary, path)
      H-->>R: result content text JSON
    else unknown method
      H-->>R: error -32601
    end
    alt message has no id - notification
      R-->>A: 202 no body
    else
      R-->>A: 200 JSON-RPC response
    end
  end
```

Sources: `app/api/mcp/route.ts`, `lib/mcp.ts`, `tests/mcp.test.ts`, live `tools/list` call 2026-11-03

## S3 — Deploy smoke หลัง Vercel deploy

```mermaid
sequenceDiagram
  participant VC as Vercel
  participant GH as GitHub deployment_status
  participant W as deploy-smoke.yml
  participant S as scripts/deploy-smoke.sh
  participant Site as game-collection.bookchaowalit.com
  VC->>GH: deployment Production state success
  GH->>W: trigger deployment_status
  W->>S: run with EXPECTED_SHA
  S->>Site: GET / expects "Book Arcade"
  loop up to 20 attempts, 15 s apart
    S->>Site: GET /api/health?smoke=ts
    Site-->>S: status ok, commit short sha
  end
  S->>Site: GET /games/card-cascade expects "Card Cascade"
  S-->>W: exit 0 or 1 with ::error
```

Sources: `.github/workflows/deploy-smoke.yml`, `scripts/deploy-smoke.sh`, `app/api/health/route.ts`

## S4 — Runtime error ไป Sentry

```mermaid
sequenceDiagram
  participant B as Browser or server runtime
  participant SDK as @sentry/nextjs
  participant SC as lib/sentry.ts scrubEvent
  participant SE as Sentry
  B->>SDK: uncaught error or onRequestError
  alt NEXT_PUBLIC_SENTRY_DSN unset
    SDK-->>B: disabled, nothing sent
  else DSN set
    SDK->>SC: beforeSend(event)
    SC-->>SDK: event without request, user, extra, breadcrumbs, frame vars, query strings
    SDK->>SE: send error event
  end
```

Sources: `instrumentation.ts`, `instrumentation-client.ts`, `lib/sentry.ts`, `tests/sentry.test.ts`
