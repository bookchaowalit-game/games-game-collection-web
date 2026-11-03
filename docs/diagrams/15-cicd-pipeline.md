# 15 — CI/CD pipeline

Status: **done**. 2 workflows ใน repo + 2 reusable workflows จาก `bookchaowalit/platform-ci-workflows` @ `87dc5e1` (v1.1.1); runner = GitHub-hosted `ubuntu-24.04` (public repo)

```mermaid
flowchart TD
  subgraph Triggers
    P["push main"]
    PR["pull_request"]
    WD["workflow_dispatch"]
    DS["deployment_status from Vercel"]
  end
  subgraph CI["Game Collection CI - ci.yml, concurrency ci-ref, cancel in progress"]
    WEB["job web: ci-node.yml"]
    SEC["job security: security.yml"]
  end
  subgraph WebSteps["web / node - Node 22"]
    W1["checkout + detect package manager"] --> W2["setup-node + npm ci"]
    W2 --> W3["Lint - eslint"] --> W4["Typecheck - tsc --noEmit"]
    W4 --> W5["Test - node --test, require-tests true"] --> W6["Build - npm run build"]
  end
  subgraph SecJobs["security - parallel jobs"]
    S1["gitleaks"]
    S2["semgrep p/default"]
    S3["osv-scanner + osv-scanner.toml"]
    S4["trivy-fs HIGH,CRITICAL vuln,misconfig"]
  end
  P --> CI
  PR --> CI
  WD --> CI
  WEB --> W1
  SEC --> S1
  SEC --> S2
  SEC --> S3
  SEC --> S4
  subgraph CD["Deploy - outside GitHub Actions"]
    VG["Vercel Git integration builds main"] --> VP["Production alias"]
  end
  P --> VG
  VP --> DS
  DS --> SMK["Deploy smoke - deploy-smoke.yml, if state success and env Production*"]
  WD --> SMK
  SMK --> SS["scripts/deploy-smoke.sh: /, /api/health commit, /games/card-cascade"]
```

Sources: `.github/workflows/ci.yml`, `.github/workflows/deploy-smoke.yml`, `scripts/deploy-smoke.sh`, `platform-ci-workflows/.github/workflows/ci-node.yml@87dc5e1` และ `security.yml@87dc5e1` (อ่านผ่าน GitHub API 2026-11-03), job names จาก `gh run view` ของ run ล่าสุด (`web / node (.)`, `security / gitleaks|semgrep|osv-scanner|trivy-fs`)

## Run history (ทั้งหมดที่ GitHub เก็บ, 2026-11-03)

- `Game Collection CI`: 12 runs บน push main ตั้งแต่ 2026-08-11 ถึง 2026-10-24 — ทั้งหมด `success`
- `Deploy smoke`: 1 run (2026-10-24 `1d9124c`, `deployment_status`) — `success`

Sources: `gh run list -R bookchaowalit-game/games-game-collection-web -L 100`

## Open questions

- ไม่มี coverage gate (`coverage-threshold` ไม่ได้ตั้ง; test runner เป็น node --test ไม่ใช่ vitest/jest จึงใช้ gate ของ ci-node ไม่ได้ตรง ๆ)
