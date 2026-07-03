"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/lib/content";
import { pluralize } from "@/lib/format";
import Chip from "./Chip";
import ProjectCard from "./ProjectCard";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  wip: "in corso",
  completed: "completato",
};

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  // Tags present in the data, de-duplicated, stable order.
  const tags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.tags))].sort(),
    [projects],
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (status === null || p.status === status) &&
          (tag === null || p.tags.includes(tag)),
      ),
    [projects, status, tag],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={status === null} onClick={() => setStatus(null)}>
            tutti
          </Chip>
          {(["wip", "completed"] as ProjectStatus[]).map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {STATUS_LABEL[s]}
            </Chip>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={tag === null} onClick={() => setTag(null)}>
              # tutti
            </Chip>
            {tags.map((t) => (
              <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
                {t}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <p className="mb-6 font-mono text-xs text-muted/70">
        {pluralize(filtered.length, "progetto", "progetti")}
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted">Nessun progetto con questi filtri.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
