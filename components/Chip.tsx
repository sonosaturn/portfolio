"use client";

// Shared filter chip used by the projects and interests explorers.
export default function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-border text-muted hover:border-accent/40 hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
