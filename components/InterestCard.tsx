import Link from "next/link";
import type { Interest } from "@/lib/content";
import { ArrowIcon } from "./icons";

const CATEGORY_LABEL: Record<Interest["category"], string> = {
  gym: "palestra",
  gaming: "gaming",
  music: "musica",
  movies: "film",
  other: "altro",
};

export default function InterestCard({ interest }: { interest: Interest }) {
  return (
    <Link
      href={`/interests/${interest.slug}`}
      className="group block rounded-lg border border-border bg-surface/40 p-5 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
            {interest.title}
          </h3>
          <span className="mt-1 block font-mono text-xs text-muted">
            {CATEGORY_LABEL[interest.category]}
          </span>
        </div>
        <ArrowIcon className="h-4 w-4 shrink-0 text-muted transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{interest.summary}</p>
    </Link>
  );
}
