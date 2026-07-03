import { site } from "@/lib/site";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name} — ${site.role}`;

export default function Image() {
  return renderOg({
    eyebrow: `~ ${site.role.toLowerCase()} · ${site.location.toLowerCase()}`,
    title: `Ciao, sono ${site.name}.`,
    subtitle: `${site.role}, ${site.tagline}.`,
  });
}
