import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/Button";
import { calTarget, CAL_CONFIG } from "@/lib/cal";

/**
 * Booking CTA. Renders a plain <a> (NOT next/link) on purpose: the Cal embed
 * intercepts clicks on [data-cal-link] via a document-level handler, so a plain
 * anchor lets it open the popup with no competing SPA navigation. Progressive
 * enhancement: with no JS, or no NEXT_PUBLIC_CAL_URL, it's just a link to
 * /contact#book (the inline booker). data-cta keeps it in the CtaTracker net.
 */
export function BookButton({
  href = "/contact#book",
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
}: {
  href?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const target = calTarget();
  const calAttrs = target
    ? { "data-cal-link": target.link, "data-cal-config": CAL_CONFIG }
    : {};

  return (
    <a
      href={href}
      data-cta={variant}
      {...calAttrs}
      className={buttonClasses({ variant, size, className })}
    >
      {children}
      {arrow && <ArrowIcon />}
    </a>
  );
}
