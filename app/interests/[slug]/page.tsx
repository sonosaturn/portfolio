import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllInterests, getInterestBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/labels";
import Markdown from "@/components/Markdown";

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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <span className="text-accent">{CATEGORY_LABEL[interest.category]}</span>
          <span aria-hidden>·</span>
          <time dateTime={interest.date.toISOString().slice(0, 10)}>{formatDate(interest.date)}</time>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{interest.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{interest.summary}</p>

        {interest.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {interest.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-surface/40 px-2.5 py-0.5 text-xs text-muted/90"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {interest.cover && (
        // ponytail: plain <img> — covers may be remote URLs; next/image would
        // need per-domain config. Swap to next/image if covers become local-only.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={interest.cover}
          alt={`${interest.title} — copertina`}
          className="mt-8 w-full rounded-lg border border-border"
        />
      )}

      <hr className="mt-10 border-border" />

      <div className="mt-8">
        <Markdown>{interest.body}</Markdown>
      </div>
    </article>
  );
}
