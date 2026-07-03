import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Progetto";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const status = project?.status === "completed" ? "completato" : "in corso";
  return renderOg({
    eyebrow: `progetto · ${status}`,
    title: project?.title ?? "Progetto",
    subtitle: project?.summary ?? "",
  });
}
