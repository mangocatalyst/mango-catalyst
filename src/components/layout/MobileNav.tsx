"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { calTarget, CAL_CONFIG } from "@/lib/cal";
import { ChevronDownIcon } from "@/components/ui/icons";

/**
 * The one interactivity island in the site chrome: the mobile nav toggle.
 * The desktop nav and every link also exist as server-rendered HTML in the
 * Navbar; this panel is progressive enhancement for small screens.
 */
export function MobileNav({
  links,
  cta,
  industries,
  platforms,
}: {
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
  industries: readonly { href: string; label: string }[];
  platforms: readonly { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  // One state for both nested disclosures: opening one collapses the other,
  // and closing the panel resets a single value.
  const [openGroup, setOpenGroup] = useState<
    "industries" | "platforms" | null
  >(null);

  const groups = [
    { key: "industries", panelId: "mobile-industries", label: "Industries", links: industries },
    { key: "platforms", panelId: "mobile-platforms", label: "Platforms", links: platforms },
  ] as const;

  // Every close path funnels through here so no nested disclosure survives
  // the panel closing out from under it.
  const close = useCallback(() => {
    setOpen(false);
    setOpenGroup(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? close() : setOpen(true))}
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
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-hairline bg-deep px-6 pt-2 pb-6 shadow-[0_16px_32px_rgba(10,17,32,0.5)]"
      >
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <Fragment key={link.href}>
              <li className="border-b border-hairline/50">
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-3.5 text-[1.05rem] text-body transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
              {index === 0 &&
                groups.map((group) => (
                  <li key={group.key} className="border-b border-hairline/50">
                    <button
                      type="button"
                      aria-expanded={openGroup === group.key}
                      aria-controls={group.panelId}
                      onClick={() =>
                        setOpenGroup((value) =>
                          value === group.key ? null : group.key,
                        )
                      }
                      className="flex w-full items-center justify-between py-3.5 text-[1.05rem] text-body transition-colors hover:text-ink"
                    >
                      {group.label}
                      <ChevronDownIcon
                        width={16}
                        height={16}
                        className={`motion-safe:transition-transform motion-safe:duration-150 ${
                          openGroup === group.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <ul
                      id={group.panelId}
                      hidden={openGroup !== group.key}
                      className="pb-1"
                    >
                      {group.links.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="block pl-4 py-2.5 text-body transition-colors hover:text-ink"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </Fragment>
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
              onClick={close}
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
