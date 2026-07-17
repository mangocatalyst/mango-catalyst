import Link from "next/link";
import { SITE, INDUSTRY_LINKS, PROGRAM_LINKS } from "@/lib/constants";
import { Wordmark } from "@/components/ui/Wordmark";
import { FooterBackdrop } from "@/components/layout/FooterBackdrop";

/**
 * Global footer: the crawl safety net (seo-spec section 5). All top-level
 * pages, the programs column (platforms + MN-ITS Helper, 2026-07-06),
 * the three guides with descriptive anchors, the NAP line
 * (byte-identical to schema; email omitted until set in constants), and the
 * privacy link. No social icons, no phone, ever.
 */

const PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/dashboards", label: "Owner Dashboard" },
  { href: "/ai-consultant", label: "AI Consulting" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const GUIDE_LINKS = [
  {
    href: "/guides/hvac-tasks-to-automate",
    label: "HVAC Tasks To Automate First",
  },
  {
    href: "/guides/manual-data-entry-cost",
    label: "The Real Cost Of Manual Data Entry",
  },
  {
    href: "/guides/what-is-automation-consultant",
    label: "What Is An Automation Consultant?",
  },
  {
    href: "/guides/hvac-owner-dashboard",
    label: "What An Owner Dashboard Should Show",
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition-colors hover:text-ink"
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const nap = [SITE.name, `${SITE.city}, ${SITE.region}`, SITE.email]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="relative overflow-hidden border-t border-hairline/60 bg-deep">
      {/* The Chart Sheet backdrop: aria-hidden decoration behind the links. */}
      <FooterBackdrop />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-[24rem] text-sm leading-relaxed text-muted">
              The other tools of the trade. Automation for Upper Midwest shops.
            </p>
          </div>

          <nav aria-label="Pages">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-faint">
              Pages
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PAGE_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-faint">
              Industries
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {INDUSTRY_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Platforms">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-faint">
              Platforms
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PROGRAM_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </nav>

          <nav aria-label="Guides">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-faint">
              Guides
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {GUIDE_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          {/* data-footer-nap: FooterLive parks the chart's Duluth dot just left of this line. */}
          <p data-footer-nap className="text-sm text-faint">
            {nap}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="text-[0.8rem] text-faint">
              We use privacy-friendly analytics. No creepy tracking, no ad
              networks.
            </p>
            <Link
              href="/privacy"
              className="text-[0.8rem] text-faint underline underline-offset-4 transition-colors hover:text-muted"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
