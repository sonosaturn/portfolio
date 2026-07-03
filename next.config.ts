import type { NextConfig } from "next";

// Content Security Policy. This is a static (SSG) site with no user input and
// no runtime data fetching, so the policy can be tight. 'unsafe-inline' stays
// on script-src/style-src because Next injects inline bootstrap scripts and we
// use inline style attributes (e.g. the --i stagger var) — an SSG page can't
// carry a per-request nonce without turning dynamic. img-src allows data: for
// inline SVGs; add remote hosts here if project covers ever point off-site.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
