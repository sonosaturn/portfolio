// Single source for site-wide metadata and social links. Edit here, not in
// components.

export const site = {
  name: "Lorenzo",
  role: "CS student",
  tagline: "building AI memory systems & context engineering",
  location: "Sapienza, Roma",
  email: "gentilezzalorenzo1@gmail.com",
  // Production URL — base for canonical/OG/sitemap. Update here if a custom
  // domain is connected on Vercel.
  url: "https://portfolio-navy-eight-65.vercel.app",
  socials: {
    github: "https://github.com/sonosaturn",
    instagram: "https://instagram.com/sonosaturn.dev",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Progetti" },
  { href: "/interests", label: "Interessi" },
] as const;
