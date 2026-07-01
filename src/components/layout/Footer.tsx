import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Global footer: the crawl safety net (seo-spec section 5). All seven
 * top-level pages, the three guides with descriptive anchors, the NAP line
 * (byte-identical to schema; email omitted until set in constants), and the
 * privacy link. No social icons, no phone, ever.
 */

const PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries/hvac", label: "HVAC business automation" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const GUIDE_LINKS = [
  {
    href: "/guides/hvac-tasks-to-automate",
    label: "HVAC tasks to automate first",
  },
  {
    href: "/guides/manual-data-entry-cost",
    label: "The real cost of manual data entry",
  },
  {
    href: "/guides/what-is-automation-consultant",
    label: "What is an automation consultant?",
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
    <footer className="border-t border-hairline/60 bg-deep">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.4fr]">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-[24rem] text-sm leading-relaxed text-muted">
              The other tools of the trade. Automation for upper-Midwest shops.
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

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline/50 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm text-faint">{nap}</p>
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
