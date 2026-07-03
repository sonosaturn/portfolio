import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import Markdown from "@/components/Markdown";

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
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: project.title, description: project.summary, url, type: "article" },
  };
}

const STATUS = {
  wip: { label: "in corso", dot: "bg-accent" },
  completed: { label: "completato", dot: "bg-accent2" },
} as const;

const LINK_LABEL: Record<string, string> = {
  demo: "demo",
  github: "code",
  other: "link",
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const status = STATUS[project.status];
  const links = Object.entries(project.links) as [string, string][];

  return (
    <article>
      <Link href="/projects" className="font-mono text-sm text-muted transition-colors hover:text-fg">
        ← progetti
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden />
            {status.label}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={project.date.toISOString().slice(0, 10)}>{formatDate(project.date)}</time>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>

        {project.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-surface/40 px-2.5 py-0.5 text-xs text-muted/90"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {project.stack.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded border border-border px-2 py-0.5">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map(([kind, url]) => (
              <a
                key={kind}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-3 py-1.5 text-sm text-accent transition-colors hover:border-accent/50"
              >
                {LINK_LABEL[kind] ?? kind} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      {project.cover && (
        // ponytail: plain <img> — covers may be remote URLs; next/image would
        // need per-domain config. Swap to next/image if covers become local-only.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover}
          alt={`${project.title} — copertina`}
          className="mt-8 w-full rounded-lg border border-border"
        />
      )}

      <hr className="mt-10 border-border" />

      <div className="mt-8">
        <Markdown>{project.body}</Markdown>
      </div>
    </article>
  );
}
