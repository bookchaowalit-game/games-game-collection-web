import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old per-app portfolio list now lives on the main site (permanent: Next answers 308).
  async redirects() {
    return [{ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true }];
  },
};

export default nextConfig;
