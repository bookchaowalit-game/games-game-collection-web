# 19 — Service dependency map

Status: **done**. Runtime dependency น้อยมาก: ไม่มี DB, ไม่มี API ภายนอกที่ถูกเรียกตอน request

```mermaid
flowchart LR
  ARC["Book Arcade"]
  subgraph Runtime["Runtime - request path"]
    VCDN["Vercel CDN + functions - hard dependency"]
    DNS["DNS for bookchaowalit.com subdomain"]
  end
  subgraph Optional["Runtime - soft"]
    SEN["Sentry ingest - errors only, fails open"]
  end
  subgraph BuildTime["Build time"]
    NPMR["npm registry - package-lock.json"]
    GF["Google Fonts - next/font download"]
    VB["Vercel build - Node 24.x"]
  end
  subgraph Delivery["Delivery"]
    GH["GitHub repo + Actions"]
    PCW["bookchaowalit/platform-ci-workflows @87dc5e1"]
  end
  subgraph Links["Outbound links only - no runtime call"]
    SIB["sibling bookchaowalit-*.vercel.app"]
    GHL["github.com source link"]
    PORT["bookchaowalit.com portfolio"]
  end
  ARC --> VCDN
  DNS --> VCDN
  ARC -.-> SEN
  VB --> NPMR
  VB --> GF
  GH --> PCW
  GH --> VB
  ARC -.-> SIB
  ARC -.-> GHL
  ARC -.-> PORT
```

Sources: `package.json`, `package-lock.json`, `app/layout.tsx` (`next/font/google`), `lib/sentry.ts`, `instrumentation*.ts`, `.github/workflows/ci.yml`, `app/more-projects/page.tsx`, `app/page.tsx`, `vercel project inspect`

## Open questions

- DNS ของ `bookchaowalit.com` อยู่ที่ provider ใด (Cloudflare?) — ไม่มีหลักฐานใน repo
