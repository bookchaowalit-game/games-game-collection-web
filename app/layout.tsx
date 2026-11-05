import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Thai fallback (ADR-0007 thai-font): Latin glyphs come from Geist, Thai from this face.
// Self-hosted in app/fonts (see app/fonts/README.md), so no build-time Google Fonts request.
const notoSansThai = localFont({
  src: "./fonts/NotoSansThai-Variable.woff2",
  weight: "100 900",
  variable: "--font-noto-sans-thai",
  display: "swap",
});

// Used sparingly — wordmark, eyebrows, and the primary CTA only.
// Never for paragraph text; an 8-bit face is illegible at body size.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Arcade — games, built in public",
  description:
    "A small arcade of games by bookchaowalit, built in public. See what's shipped, what's next, and follow the build.",
  keywords: ["Book Arcade", "bookchaowalit", "indie games", "game dev", "build in public"],
  authors: [{ name: "bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "bookchaowalit",
  publisher: "bookchaowalit",
  metadataBase: new URL(SITE_URL),
  // Pages override this with their own path; see lib/games.ts.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bookchaowalit.com",
    title: "Book Arcade — games, built in public",
    description: "A small arcade of games by bookchaowalit, built in public.",
    siteName: "Book Arcade",
    // Image comes from app/opengraph-image.tsx (generated at build time).
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Arcade — games, built in public",
    description: "A small arcade of games by bookchaowalit, built in public.",
    creator: "@bookchaowalit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Font variables go on <html>, not <body>: the app's @theme and :root values read them there.
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} ${pressStart.variable}`}
    >
      <body className="antialiased">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
