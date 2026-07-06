import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";

/** Shared .btn class builder, reused by BookButton (a plain <a> popup CTA). */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
} = {}) {
  return [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    size === "sm" ? "btn-sm" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

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
  return (
    <Link href={href} className={buttonClasses({ variant, size, className })} data-cta={variant}>
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}
