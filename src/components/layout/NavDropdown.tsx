"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

/**
 * Header disclosure dropdown (WAI-ARIA disclosure navigation, click to open).
 * Mirrors MobileNav's proven shape: a button with aria-expanded / aria-controls
 * and a plain-link panel gated by `hidden`. Deliberately NOT a menu widget:
 * no role="menu", no arrow-key roving, native Tab order walks the links. The
 * desktop-only island; every link is still server-rendered in the footer, so
 * with no JS all trade pages stay reachable.
 */
export function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: readonly { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Outside pointerdown closes; the listener lives only while open.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        // Focus leaving the wrapper entirely (Tab past the last link) closes it.
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 text-[0.925rem] text-body transition-colors hover:text-ink"
      >
        {label}
        <ChevronDownIcon
          width={14}
          height={14}
          className={`motion-safe:transition-transform motion-safe:duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full mt-3 min-w-[13rem] rounded-lg border border-hairline bg-deep py-2 shadow-[0_16px_32px_rgba(10,17,32,0.5)]"
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-[0.925rem] text-body transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
