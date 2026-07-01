/**
 * The logo: a lowercase Inter wordmark plus one amber spark dot, the brand's
 * memory hook (branding spec: no literal fruit, no wrench, no gear). The dot
 * echoes the hero H1's spark.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-baseline text-[1.05rem] font-semibold tracking-tight text-ink",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      mango catalyst
      <span
        aria-hidden
        className="ml-[0.18em] inline-block size-[0.3em] rounded-full bg-amber"
      />
    </span>
  );
}
