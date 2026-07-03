"use client";

import { useMemo, useState } from "react";
import type { Interest, InterestCategory } from "@/lib/content";
import { pluralize } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/labels";
import Chip from "./Chip";
import InterestCard from "./InterestCard";

export default function InterestsExplorer({ interests }: { interests: Interest[] }) {
  const [category, setCategory] = useState<InterestCategory | null>(null);

  // Categories actually present in the data, in a stable order.
  const categories = useMemo(
    () => [...new Set(interests.map((i) => i.category))],
    [interests],
  );

  const filtered = useMemo(
    () => interests.filter((i) => category === null || i.category === category),
    [interests, category],
  );

  return (
    <div>
      {/* Bridges the heading order between the page h1 and the card h3s. */}
      <h2 className="sr-only">Elenco interessi</h2>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Chip active={category === null} onClick={() => setCategory(null)}>
            tutte
          </Chip>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {CATEGORY_LABEL[c]}
            </Chip>
          ))}
        </div>
      )}

      <p className="mb-6 font-mono text-xs text-muted">
        {pluralize(filtered.length, "voce", "voci")}
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted">Nessuna voce con questo filtro.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((interest) => (
            <InterestCard key={interest.slug} interest={interest} />
          ))}
        </div>
      )}
    </div>
  );
}
