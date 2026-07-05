import Link from "next/link";
import type { Project } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { ArrowIcon, GitHubIcon } from "./icons";

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    wip: { label: "in corso", dot: "bg-accent" },
    completed: { label: "completato", dot: "bg-accent2" },
  } as const;
  const { label, dot } = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const { demo, github } = project.links;

  return (
    // Outer is a container (not an <a>) so the demo/github links below can be
    // real anchors without invalid nested <a>. The title link stretches over
    // the card body to keep the whole surface clickable.
    <article className="group relative flex flex-col rounded-lg border border-border bg-surface/40 p-5 transition-colors hover:border-accent/50">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
          <Link href={`/projects/${project.slug}`} className="before:absolute before:inset-0">
            {project.title}
          </Link>
        </h3>
        <ArrowIcon className="h-4 w-4 shrink-0 text-muted transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <div className="mt-2">
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline" className="bg-bg/40 font-normal text-muted/90">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      {project.stack.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {project.stack.length > 5 && <li>+{project.stack.length - 5}</li>}
        </ul>
      )}

      {(demo || github) && (
        <div className="relative z-10 mt-4 flex gap-4 border-t border-border pt-3 text-muted">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — demo`}
              className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-accent"
            >
              <ArrowIcon className="h-3.5 w-3.5" /> demo
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — code (GitHub)`}
              className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-3.5 w-3.5" /> code
            </a>
          )}
        </div>
      )}
    </article>
  );
}
