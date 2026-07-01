import type { ReactNode } from "react";

const TONES = {
  /** Primary page canvas. */
  base: "bg-base",
  /** Heavier band for mood shifts (problem, proof, final CTA). */
  deep: "bg-deep",
  /** Palette-B light conversion band (pricing, FAQ, forms). */
  light: "bg-light",
} as const;

/**
 * Full-bleed section shell: band background + the shared content container.
 * `data-tone` drives the light-band focus-ring override in globals.css.
 * Every scroll section gets an `id` so the seo-spec jump links resolve.
 */
export function Section({
  id,
  tone = "base",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: keyof typeof TONES;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone === "light" ? "light" : "dark"}
      className={[TONES[tone], className ?? ""].filter(Boolean).join(" ")}
    >
      <div
        className={[
          "mx-auto w-full max-w-6xl px-6 py-[clamp(4.5rem,9vw,7rem)] sm:px-10",
          containerClassName ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
