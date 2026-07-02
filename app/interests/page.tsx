import type { Metadata } from "next";
import { getAllInterests } from "@/lib/content";
import InterestCard from "@/components/InterestCard";

export const metadata: Metadata = {
  title: "Interessi — Lorenzo",
  description: "Cosa faccio fuori dallo schermo.",
};

export default function InterestsPage() {
  const interests = getAllInterests();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Interessi</h1>
        <p className="mt-3 max-w-xl text-muted">Fuori dallo schermo — palestra, gaming, musica e altro.</p>
      </header>

      {interests.length === 0 ? (
        <p className="text-muted">Ancora niente qui. A breve.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {interests.map((interest) => (
            <InterestCard key={interest.slug} interest={interest} />
          ))}
        </div>
      )}
    </div>
  );
}
