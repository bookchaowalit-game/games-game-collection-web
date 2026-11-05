# Local Noto Sans Thai

The Thai fallback face is self-hosted and loaded through `next/font/local`, so builds and
visitors do not request Google Fonts for it (ADR-0007 thai-font; the floor forbids runtime CDN fonts).

- File: `NotoSansThai-Variable.woff2` (variable, weight 100-900, width 62.5-100)
- Source: the official variable Noto Sans Thai, converted losslessly to WOFF2. Same file as
  `bookchaowalit/web-starter` `app/fonts/NotoSansThai-Variable.woff2`, pinned to Google Fonts commit
  `2750b521bd22ce141f12617194ab0e04cf5d12d5` (source TTF SHA-256
  `5a1c559bb539583c8a1fd99d1c5b9491e5e14478c9cd2bd0970d5c3096cc9ef8`).
- WOFF2 SHA-256: `1818fefa9e7b12ce86654fc3bab74a7abdf905324a251ce74647505eda5cf6a3`
- Licence: SIL Open Font License 1.1, see `OFL.txt`.
