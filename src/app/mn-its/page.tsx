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
import { DemoVideo, Shot } from "@/components/mnits/DemoMedia";

/**
 * MN-ITS Helper product page (added 2026-07-06, Bryan's call: PHI carve-out
 * removed, the extension offered openly; reworked 2026-07-09 into a
 * watch-then-walk-through tutorial with a clicks/keystrokes tally). This is
 * the ONE owned build from the canonical brief, so first-person product
 * claims are in bounds here. Every capability claim below traces to the
 * extension repo README or its test suite (local-only enforced by an
 * automated no-egress test).
 *
 * TALLY DERIVATION. Counted the same way the extension's own productivity
 * counter counts (mnits-extension fill-flow.js trackStats: text field = 1
 * click, dropdown = 2 clicks, button = 1 click, characters = typed value
 * length), walking the fill flow for a claim with 20 service dates:
 *   header, pages 2-5: 14 clicks, ~30 characters
 *     p2 Continue(1); p3 subscriber(1)+DOB(1)+Search(1)+Continue(1);
 *     p4 PoS dropdown(2)+PCN(1)+DxType dropdown(2)+DxCode(1)+Add(1)+
 *     Continue(1); p5 Continue(1). Chars: ID 8 + DOB 10 + PCN ~6 + PoS 2 +
 *     DxType ~1 + DxCode 3.
 *   each service line, page 6: 12 clicks, ~38 characters
 *     dateFrom(1)+dateTo(1)+PoS dropdown(2)+procedure(1)+mod1(1)+mod2(1)+
 *     dx pointer dropdown(2)+charge(1)+units(1)+Save/View(1). Chars:
 *     dates 20 + PoS 2 + procedure 5 + mods 4 + pointer 1 + charge ~6 +
 *     units 1.
 *   20 lines: 14 + 240 = 254 clicks, 30 + 760 = ~790 characters.
 * Copy rounds to "about 250 clicks and 790 keystrokes".
 */

const PATH = "/mn-its";
const DESCRIPTION =
  "MN-ITS Helper is a Chrome extension that fills MN-ITS Professional Claim forms from saved per-client presets, then stops at the review screen. Local-only by design: claim data never leaves your machine.";

export const metadata = pageMetadata({
  title: "MN-ITS Helper: Claim Entry That Stays on Your Machine",
  path: PATH,
  description: DESCRIPTION,
});

type Step = {
  title: string;
  body: string;
  shot: { src: string; alt: string };
  chip?: string;
};

const STEPS: Step[] = [
  {
    title: "Save each client once",
    body: "In the extension's options, enter what never changes: member ID, date of birth, diagnosis and procedure codes, modifiers, place of service, units, charge amount. That's the last time anyone types it.",
    shot: { src: "mn-its/preset-form.png", alt: "the client preset form" },
    chip: "One-time setup, about two minutes per client.",
  },
  {
    title: "Open a claim and pick your client",
    body: "Log into MN-ITS the way you already do and start a Professional Claim. Click the Helper icon and pick the client from your list.",
    shot: { src: "mn-its/popup-client.png", alt: "the popup with a client selected" },
  },
  {
    title: "Pick the days you're billing",
    body: "Consecutive mode takes a first and last date. Individual mode gives you a calendar to tap specific days, with a per-day unit count when a day differs. Whichever mode, these are the last clicks you make for a while.",
    shot: { src: "mn-its/popup-calendar.png", alt: "the calendar with days selected" },
  },
  {
    title: "Click Start and watch it type",
    body: "Pages 2 through 6 fill themselves: subscriber lookup, claim header, diagnosis, then one service line for every day you picked. A status banner narrates each step as it lands.",
    shot: { src: "mn-its/line-fill.png", alt: "a service line mid-fill" },
    chip: "What you just skipped on a 20-day claim: about 250 clicks and 790 keystrokes.",
  },
  {
    title: "It stops at review. You submit.",
    body: "The extension never clicks submit. Your biller sees the completed claim exactly as MN-ITS will receive it, checks it, and submits it themselves. Every single time.",
    shot: { src: "mn-its/review-stop.png", alt: "the review screen where the extension stops" },
    chip: "The part that stays human.",
  },
];

const ALSO: { lead: string; text: string }[] = [
  {
    lead: "Handles multiple locations and logins.",
    text: "Each location keeps its own MN-ITS login, and passwords stay where they already live, in Chrome's own password manager. The extension never stores them.",
  },
  {
    lead: "Backs up its own settings, encrypted.",
    text: "Client presets export as an encrypted backup file, so a new machine or a bad day doesn't mean rebuilding every client by hand.",
  },
  {
    lead: "Keeps score.",
    text: "A running counter in the extension's options shows every click and keystroke it has typed on your behalf since the day you installed it.",
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

        <Section id="see-it-work" tone="light">
          <SectionHeading
            tone="light"
            title="Watch it fill a claim"
            lead="A real Professional Claim, filled start to review screen. No narration needed: the typing you're not doing is the whole pitch."
          />
          <DemoVideo
            src="mn-its/demo.mp4"
            poster="mn-its/demo-poster.png"
            caption="Recorded on a live claim with the extension's built-in demo mask on: client information is blurred by the software before the screen is ever captured."
          />
        </Section>

        <Section id="how-to-use-it" tone="light" containerClassName="pt-0">
          <SectionHeading
            tone="light"
            title="How to use it"
            lead="Five steps, and only the first one happens more than zero times per claim after setup:"
          />
          <ol className="mt-12 grid gap-14">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid items-start gap-6 lg:grid-cols-[1fr_26rem] lg:gap-12"
              >
                <div>
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden
                      className="font-display text-[1.6rem] font-bold text-navy-2/50"
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-display text-[1.35rem] font-bold uppercase tracking-[0.015em] text-navy">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-[1.65] text-navy-2">{step.body}</p>
                  {step.chip ? (
                    <p className="mt-4 inline-block rounded-md bg-navy px-4 py-2 text-[0.9rem] font-semibold text-ink">
                      {step.chip}
                    </p>
                  ) : null}
                </div>
                <Shot src={step.shot.src} alt={step.shot.alt} />
              </li>
            ))}
          </ol>
        </Section>

        <Section id="the-math" tone="light" containerClassName="pt-0">
          <div className="max-w-[52rem] border-t border-border-lt pt-12">
            <p className="font-display text-[clamp(1.7rem,1.1rem+2vw,2.6rem)] font-bold uppercase leading-[1.12] tracking-[0.015em] text-balance text-navy">
              One 20-day claim: about 790 keystrokes and 250 clicks, down to
              about five clicks.
            </p>
            <p className="mt-5 max-w-[44rem] leading-[1.65] text-navy-2">
              Now multiply by every client, every billing cycle. You don't have
              to take the math on faith: the extension keeps its own running
              count of every click and keystroke it types for you, and you can
              watch it grow in its options page.
            </p>
            <p className="mt-4 max-w-[44rem] text-[0.9rem] leading-[1.6] text-muted-lt">
              Counted the way the extension's productivity counter counts: one
              click per field, two per dropdown, characters as typed, on a
              Professional Claim with twenty service dates.
            </p>
          </div>
        </Section>

        <Section id="also" tone="deep">
          <SectionHeading
            title="Also in the box"
            lead="The parts a two-minute demo doesn't show:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-7">
            {ALSO.map((feature) => (
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
          <p className="mt-10 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "That's not a compliance feature bolted on afterward. It's the architecture: software that handles sensitive information should keep it on the machine it came from."
            }
          </p>
        </Section>

        <Section id="who" tone="deep">
          <SectionHeading title="Who it's for" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-body lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "Home care agencies, waiver service providers, therapy practices, and any Minnesota office that bills through MN-ITS and is tired of the retyping. It runs in Chrome on the computers your billers already use, and setup is measured in minutes, not weeks."
            }
          </p>
        </Section>

        <Section id="where-to-start" tone="light">
          <SectionHeading tone="light" title="Want to see it on your screens?" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 lg:max-w-[52rem] lg:text-[1.2rem]">
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
              Book a 15-Minute Fit Call
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
