import Link from "next/link";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, softwareApplicationLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IndustryHero } from "@/components/industries/IndustryHero";
import { LocalOnlyArt } from "@/components/industries/TradeArt";

/**
 * MN-ITS Helper product page (added 2026-07-06, Bryan's call: PHI carve-out
 * removed, the extension offered openly). This is the ONE owned build from
 * the canonical brief, so first-person product claims are in bounds here.
 * Every capability claim below traces to the extension repo README or its
 * test suite (local-only enforced by an automated no-egress test).
 */

const PATH = "/mn-its";
const DESCRIPTION =
  "MN-ITS Helper is a Chrome extension that fills MN-ITS Professional Claim forms from saved per-client presets, then stops at the review screen. Local-only by design: claim data never leaves your machine.";

export const metadata = pageMetadata({
  title: "MN-ITS Helper: Claim Entry That Stays on Your Machine",
  path: PATH,
  description: DESCRIPTION,
});

const FEATURES: { lead: string; text: string }[] = [
  {
    lead: "Fills the claim screens from per-client presets.",
    text: "Place of service, service counts, procedure code, modifiers: saved once per client, filled every time, instead of retyped every billing cycle.",
  },
  {
    lead: "Bills date ranges or picked days.",
    text: "Consecutive mode runs first date to last date. Individual mode lets your biller pick specific days on a calendar. Per client, not one-size-fits-all.",
  },
  {
    lead: "Handles multiple locations and logins.",
    text: "Each location keeps its own MN-ITS login, and passwords stay where they already live, in Chrome's own password manager. The extension never stores them.",
  },
  {
    lead: "Always stops at the review screen.",
    text: "The extension fills; a person submits. Your biller sees the completed claim exactly as MN-ITS will receive it and clicks submit themselves, every single time.",
  },
  {
    lead: "Backs up its own settings, encrypted.",
    text: "Client presets export as an encrypted backup file, so a new machine or a bad day doesn't mean rebuilding every client by hand.",
  },
];

const PRIVACY_POINTS: string[] = [
  "No servers, no account, nothing to sign into. The extension is a folder in Chrome on your machine.",
  "Client presets are stored locally in your browser. Claim data goes exactly one place: the MN-ITS portal your biller is already using.",
  "The extension makes no outside network calls, and that rule is enforced by an automated test in its build process, not by a promise in a policy document.",
  "Nobody at Mango Catalyst can see your clients' information. The software isn't built to send it anywhere, including to me.",
];

export default function MnItsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          softwareApplicationLd({
            name: "MN-ITS Helper",
            description: DESCRIPTION,
            url: `${SITE.url}${PATH}`,
          }),
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: "MN-ITS Helper", url: `${SITE.url}${PATH}` },
          ]),
        )}
      />

      <main>
        <IndustryHero
          title="MN-ITS billing, without the retyping"
          intro="If your office bills Minnesota Health Care Programs through MN-ITS, somebody spends hours every cycle typing the same client information into the same Professional Claim screens. MN-ITS Helper is a Chrome extension that fills those screens from saved per-client presets, then stops at the review screen so a person checks and submits. It's the one product I've built and shipped on my own, and it's local-only by design: claim data never leaves your machine."
          art={<LocalOnlyArt className="w-full" />}
        />

        <Section id="features" tone="deep">
          <SectionHeading
            title="What it does"
            lead="It automates the typing, not the judgment. The claim your biller submits is one they've looked at:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-7">
            {FEATURES.map((feature) => (
              <li key={feature.lead} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-[3px] w-6 flex-none bg-amber"
                />
                <p className="leading-[1.65] text-muted">
                  <strong className="font-semibold text-ink">
                    {feature.lead}
                  </strong>{" "}
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="privacy">
          <SectionHeading
            title="Your clients' data never leaves your machine"
            lead="Most billing tools want your data on their servers. This one was built the opposite way on purpose:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {PRIVACY_POINTS.map((point) => (
              <li key={point.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{point}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] xl:max-w-[52rem] xl:text-[1.2rem]">
            {
              "That's not a compliance feature bolted on afterward. It's the architecture: software that handles sensitive information should keep it on the machine it came from."
            }
          </p>
        </Section>

        <Section id="who" tone="deep">
          <SectionHeading title="Who it's for" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-body xl:max-w-[52rem] xl:text-[1.2rem]">
            {
              "Home care agencies, waiver service providers, therapy practices, and any Minnesota office that bills through MN-ITS and is tired of the retyping. It runs in Chrome on the computers your billers already use, and setup is measured in minutes, not weeks."
            }
          </p>
        </Section>

        <Section id="where-to-start" tone="light">
          <SectionHeading tone="light" title="Want to see it on your screens?" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 xl:max-w-[52rem] xl:text-[1.2rem]">
            {
              "Book the 15-minute call and bring a sample claim. We'll walk through what your billing cycle looks like, and whether the extension fits it, before you commit to anything. Curious what else can run itself? Here's "
            }
            <Link href="/services" className="inline-link-light">
              the full list of what I build
            </Link>
            {"."}
          </p>
        </Section>

        <Section id="book" tone="deep">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
            {
              "One 15-minute call. Bring your billing cycle, and I'll tell you straight whether the retyping can disappear."
            }
          </p>
          <div className="mt-9">
            <Button href="/contact" arrow>
              Book a 15-minute fit call
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
