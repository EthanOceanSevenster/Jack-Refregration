import type { NextConfig } from "next";

/**
 * Where the Next.js server reaches Django.
 *
 * The browser only ever talks to this origin: /api/* is proxied through to
 * Django, so the site is same-origin and no CORS headers are involved.
 */
function backendOrigin(): string {
  const raw = (process.env.API_URL ?? "http://localhost:8100").trim();
  const withScheme = /^https?:\/\//.test(raw) ? raw : `http://${raw}`;
  return withScheme.replace(/\/$/, "");
}

const nextConfig: NextConfig = {
  // Django's URLs all end in a slash, and Next strips it while matching.
  skipTrailingSlashRedirect: true,
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
  async rewrites() {
    return [{ source: "/api/:path+", destination: `${backendOrigin()}/api/:path+/` }];
  },
};

export default nextConfig;
