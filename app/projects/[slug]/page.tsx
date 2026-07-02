import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} — Lorenzo`, description: project.summary };
}

const STATUS_LABEL = { wip: "in corso", completed: "completato" } as const;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const links = Object.entries(project.links) as [string, string][];

  return (
    <article>
      <Link href="/projects" className="font-mono text-sm text-muted transition-colors hover:text-fg">
        ← progetti
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-2 font-mono text-sm text-muted">{STATUS_LABEL[project.status]}</p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{project.summary}</p>
      </header>

      {project.stack.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted/80">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded border border-border px-2 py-0.5">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {links.map(([kind, url]) => (
            <a
              key={kind}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              {kind} ↗
            </a>
          ))}
        </div>
      )}

      <p className="mt-12 border-t border-border pt-6 font-mono text-sm text-muted/70">
        Descrizione completa in arrivo.
      </p>
    </article>
  );
}
