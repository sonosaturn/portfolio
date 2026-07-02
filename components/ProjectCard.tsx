import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArrowIcon } from "./icons";

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    wip: { label: "in corso", dot: "bg-amber-400" },
    completed: { label: "completato", dot: "bg-accent" },
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
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border border-border bg-surface/40 p-5 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <ArrowIcon className="h-4 w-4 shrink-0 text-muted transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <div className="mt-2">
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted/80">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {project.stack.length > 5 && <li>+{project.stack.length - 5}</li>}
        </ul>
      )}
    </Link>
  );
}
