import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Progetti",
  description: "I progetti che costruisco — dal più recente.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Progetti", description: "I progetti che costruisco.", url: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Progetti</h1>
        <p className="mt-3 max-w-xl text-muted">Cosa costruisco — dal più recente.</p>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted">Ancora niente qui. A breve.</p>
      ) : (
        <ProjectsExplorer projects={projects} />
      )}
    </div>
  );
}
