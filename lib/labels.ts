// Client-safe display labels (no server-only imports, so usable in client
// components too). Category → Italian label, shared by the interest card,
// explorer and detail page.
import type { InterestCategory } from "./content";

export const CATEGORY_LABEL: Record<InterestCategory, string> = {
  gym: "palestra",
  gaming: "gaming",
  music: "musica",
  movies: "film",
  other: "altro",
};
