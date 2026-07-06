import { SITE } from "@/lib/constants";
import { Section } from "@/components/layout/Section";
import { BookButton } from "@/components/booking/BookButton";

/**
 * Home section 8, copy verbatim from build/out/copy/home.md. The loudest
 * amber moment on the page: deep band, display headline with the spark
 * full stop, one CTA. The email fallback renders only once SITE.email is
 * set (constants discipline: never publish a guessed address).
 */
export function CTABlock() {
  return (
    <Section id="book" tone="deep">
      <div aria-hidden className="h-[3px] w-10 bg-amber" />
      <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2.4rem,1.5rem+3.6vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
        {"Let's find the thing that's eating your week"}
        <span
          aria-hidden
          className="ml-[0.12em] inline-block size-[0.14em] rounded-full bg-amber"
        />
      </h2>

      <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[50rem] lg:text-[1.2rem]">
        {
          "One 15-minute call. You tell me what's driving you nuts, I tell you straight whether it can be automated and roughly what that looks like. No pitch deck, no pressure. If I don't think I can save you real time, I'll say so on the call."
        }
      </p>

      <div className="mt-9">
        <BookButton arrow>Book a 15-Minute Fit Call</BookButton>
        {SITE.email ? (
          <p className="mt-4 text-sm text-faint">
            {"Prefer email? Reach me at "}
            <a href={`mailto:${SITE.email}`} className="inline-link">
              {SITE.email}
            </a>
            {"."}
          </p>
        ) : null}
      </div>
    </Section>
  );
}
