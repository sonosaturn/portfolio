import Link from "next/link";
import { getAllProjects, getAllInterests } from "@/lib/content";
import { site } from "@/lib/site";
import { pluralize } from "@/lib/format";
import ProjectCard from "@/components/ProjectCard";
import { ArrowIcon } from "@/components/icons";

export default function Home() {
  const featured = getAllProjects({ featured: true });
  const projectCount = getAllProjects().length;
  const interestCount = getAllInterests().length;

  const entrances = [
    { href: "/projects", label: "Progetti", desc: "Cosa costruisco", count: pluralize(projectCount, "progetto", "progetti") },
    { href: "/interests", label: "Interessi", desc: "Fuori dallo schermo", count: pluralize(interestCount, "voce", "voci") },
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* Hero */}
      <section>
        <p className="rise font-mono text-sm text-accent" style={{ "--i": 0 } as React.CSSProperties}>
          ~ {site.role.toLowerCase()} · {site.location.toLowerCase()}
        </p>
        <h1
          className="rise mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Ciao, sono {site.name}.
        </h1>
        <p
          className="rise mt-5 max-w-xl text-lg leading-relaxed text-muted"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {site.role}, {site.tagline}. Questo sito è il mio hub: progetti e interessi,
          scritti in chiaro.
        </p>
      </section>

      {/* Section entrances */}
      <section className="grid gap-4 sm:grid-cols-2">
        {entrances.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="group flex flex-col justify-between gap-8 rounded-lg border border-border p-6 transition-colors hover:border-accent/50"
          >
            <div className="flex items-start justify-between">
              <span className="text-xl font-medium text-fg transition-colors group-hover:text-accent">
                {e.label}
              </span>
              <ArrowIcon className="h-5 w-5 text-muted transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted">{e.desc}</span>
              <span className="font-mono text-xs text-muted/70">{e.count}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">In evidenza</h2>
            <Link href="/projects" className="text-sm text-muted transition-colors hover:text-fg">
              tutti i progetti →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
