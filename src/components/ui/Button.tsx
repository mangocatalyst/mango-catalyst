import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * The site button. Primary is the amber CTA: amber fill with DEEP NAVY text,
 * never white on amber (brand spec non-negotiable, 1.89:1 fail). Ghost is the
 * one secondary action, dark bands only. Styles live in globals.css (.btn).
 */
export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    size === "sm" ? "btn-sm" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}
