import type { Metadata } from "next";
import { getAllInterests } from "@/lib/content";
import InterestsExplorer from "@/components/InterestsExplorer";

export const metadata: Metadata = {
  title: "Interessi",
  description: "Cosa faccio fuori dallo schermo — palestra, gaming, musica e altro.",
  alternates: { canonical: "/interests" },
  openGraph: { title: "Interessi", description: "Cosa faccio fuori dallo schermo.", url: "/interests" },
};

export default function InterestsPage() {
  const interests = getAllInterests();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Interessi</h1>
        <p className="mt-3 max-w-xl text-muted">Fuori dallo schermo — palestra, gaming, musica e altro.</p>
        <p className="mt-2 font-mono text-xs text-accent/80">work in progress — presto qui degli articoli.</p>
      </header>

      {interests.length === 0 ? (
        <p className="text-muted">Ancora niente qui. A breve.</p>
      ) : (
        <InterestsExplorer interests={interests} />
      )}
    </div>
  );
}
