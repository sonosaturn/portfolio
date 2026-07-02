// Single source for site-wide metadata and social links. Edit here, not in
// components.

export const site = {
  name: "Lorenzo",
  role: "CS student",
  tagline: "building AI memory systems & context engineering",
  location: "Sapienza, Roma",
  email: "gentilezzalorenzo1@gmail.com",
  socials: {
    github: "https://github.com/sonosaturn",
    // TODO(lorenzo): confermare handle Instagram reale
    instagram: "https://instagram.com/sonosaturn",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Progetti" },
  { href: "/interests", label: "Interessi" },
] as const;
