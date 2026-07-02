import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllInterests, getInterestBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllInterests().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const interest = getInterestBySlug(slug);
  if (!interest) return {};
  return { title: `${interest.title} — Lorenzo`, description: interest.summary };
}

const CATEGORY_LABEL = {
  gym: "palestra",
  gaming: "gaming",
  music: "musica",
  movies: "film",
  other: "altro",
} as const;

export default async function InterestDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const interest = getInterestBySlug(slug);
  if (!interest) notFound();

  return (
    <article>
      <Link href="/interests" className="font-mono text-sm text-muted transition-colors hover:text-fg">
        ← interessi
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{interest.title}</h1>
        <p className="mt-2 font-mono text-sm text-muted">{CATEGORY_LABEL[interest.category]}</p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{interest.summary}</p>
      </header>

      <p className="mt-12 border-t border-border pt-6 font-mono text-sm text-muted/70">
        Descrizione completa in arrivo.
      </p>
    </article>
  );
}
