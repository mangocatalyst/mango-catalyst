import type { ReactNode } from "react";

/**
 * Raised panel. Dark bands: surface fill, hairline border, navy-tinted
 * shadow (never pure black, matte brand rule). Light bands: white card on
 * bg-light, per the palette-B treatment. `accent` adds the 1px amber top
 * border that draws the eye (pricing card).
 */
export function Card({
  tone = "dark",
  accent = false,
  className,
  children,
}: {
  tone?: "dark" | "light";
  accent?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const skin =
    tone === "light"
      ? "border-border-lt bg-surface-lt shadow-[0_8px_24px_rgba(10,17,32,0.08)]"
      : "border-hairline bg-surface shadow-[0_8px_24px_rgba(10,17,32,0.4)]";

  return (
    <div
      className={[
        "rounded-xl border",
        skin,
        accent ? "border-t-amber" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
