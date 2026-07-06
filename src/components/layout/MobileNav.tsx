"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { calTarget, CAL_CONFIG } from "@/lib/cal";

/**
 * The one interactivity island in the site chrome: the mobile nav toggle.
 * The desktop nav and every link also exist as server-rendered HTML in the
 * Navbar; this panel is progressive enhancement for small screens.
 */
export function MobileNav({
  links,
  cta,
}: {
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface"
      >
        <svg
          viewBox="0 0 24 24"
          width={22}
          height={22}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          aria-hidden
          focusable={false}
        >
          {open ? (
            <path d="M5 5l14 14M19 5 5 19" />
          ) : (
            <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-hairline bg-deep px-6 pt-2 pb-6 shadow-[0_16px_32px_rgba(10,17,32,0.5)]"
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href} className="border-b border-hairline/50">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-[1.05rem] text-body transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {(() => {
          const target = calTarget();
          const calAttrs = target
            ? { "data-cal-link": target.link, "data-cal-config": CAL_CONFIG }
            : {};
          return (
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-5 w-full"
              data-cta="primary"
              {...calAttrs}
            >
              {cta.label}
            </a>
          );
        })()}
      </div>
    </div>
  );
}
