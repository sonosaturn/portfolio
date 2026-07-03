// Small display helpers shared across pages.

// Italian singular/plural for a count: pluralize(1, "progetto", "progetti")
// → "1 progetto"; pluralize(3, ...) → "3 progetti". Fixes "1 progetti".
export function pluralize(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 ? singular : plural}`;
}

// Date → "giugno 2026" (month + year is enough for a portfolio).
export function formatDate(date: Date): string {
  return date.toLocaleDateString("it-IT", { year: "numeric", month: "long" });
}
