import Link from "next/link";
import { Fragment } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { BookButton } from "@/components/booking/BookButton";
import { Wordmark } from "@/components/ui/Wordmark";
import { INDUSTRY_LINKS, PROGRAM_LINKS } from "@/lib/constants";

/** Slim global nav per the seo-spec linking plan (section 5). */
const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/dashboards", label: "Dashboard" },
  { href: "/ai-consultant", label: "AI Consulting" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

const CTA = { href: "/contact#book", label: "Book a 15-Minute Fit Call" };

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline/60 bg-base/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10"
      >
        <Link
          href="/"
          className="rounded-sm"
          aria-label="Mango Catalyst, home"
        >
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link, index) => (
              <Fragment key={link.href}>
                <li>
                  <Link
                    href={link.href}
                    className="text-[0.925rem] text-body transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
                {index === 0 && (
                  <>
                    <li>
                      <NavDropdown label="Industries" links={INDUSTRY_LINKS} />
                    </li>
                    <li>
                      <NavDropdown label="Platforms" links={PROGRAM_LINKS} />
                    </li>
                  </>
                )}
              </Fragment>
            ))}
          </ul>
          <BookButton href={CTA.href} size="sm">
            {CTA.label}
          </BookButton>
        </div>

        <MobileNav
          links={NAV_LINKS}
          cta={CTA}
          industries={INDUSTRY_LINKS}
          platforms={PROGRAM_LINKS}
        />
      </nav>
    </header>
  );
}
