import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * Standalone amber text link with the arrow glyph. Dark bands only (amber
 * text passes AA on navy; on light bands use .inline-link-light instead).
 */
export function ArrowLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2 font-medium text-amber transition-colors hover:text-amber-hi",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      <ArrowIcon className="transition-transform group-hover:translate-x-[3px]" />
    </Link>
  );
}
