import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Home section 4, copy verbatim from build/out/copy/home.md.
 * Honesty gate: MN-ITS anchor + capability areas + method. No employer
 * names or implications, no magnitudes, no fabricated testimonials.
 */

const PRACTICE: { lead: string; body: string }[] = [
  {
    lead: "A real build I shipped:",
    body: "I built a browser extension that automates medical claim data entry into Minnesota's provider billing portal. It's privacy-first by design: everything runs on the user's own machine, so sensitive data never leaves the building. Different industry, same problem: repeated portal work, sensitive data, and staff losing hours to typing. The same pattern fits dispatch boards, supply-house receipts, warranty registration, and job closeout.",
  },
  {
    lead: "A method, not a pitch.",
    body: "Discovery, plan, build. I find the one task that keeps stealing hours, I write down exactly what will change, and I build the smallest version that proves it.",
  },
  {
    lead: "Platforms I work in every day:",
    body: "ServiceTitan, Zapier, Google Workspace. If your tool has an API, I can probably connect it.",
  },
];

export function CredibilityBar() {
  return (
    <Section id="proof" tone="deep">
      <SectionHeading
        title="Built by someone who ran service operations"
        lead={
          "Mango Catalyst is one person who ran service operations inside a real service business and builds automation the way an operator would, not the way a salesman would. I'm not a software company. I ran the scheduling, the dispatch, the phones, the customer messes, and the daily numbers. Same problems you have: too many small tasks, not enough people, owners doing paperwork at night. So I started building my way out of it, and the building stuck."
        }
      />

      <div className="mt-8 flex items-center gap-5">
        <Image
          src="/bryan-koop-mango-catalyst.webp"
          alt="Illustrated portrait of Bryan, founder of Mango Catalyst"
          width={192}
          height={192}
          className="size-[6.3rem] shrink-0 rounded-full bg-white"
        />
        <p className="max-w-[44rem] leading-relaxed text-body">
          <strong className="font-semibold text-ink">{"I'm Bryan."}</strong>{" "}
          {"Mango Catalyst is one person, and that person is me. You talk to me, you work with me, and I build and watch everything myself."}
        </p>
      </div>

      <p className="mt-10 font-semibold text-ink">
        What that looks like in practice:
      </p>

      <ul className="mt-5 grid gap-5 md:grid-cols-3">
        {PRACTICE.map((item) => (
          <li key={item.lead} className="flex">
            <Card className="p-6">
              <p className="font-semibold text-ink">{item.lead}</p>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-body">
                {item.body}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[44rem] border-l-2 border-amber pl-5 leading-[1.65] text-body lg:max-w-[52rem] lg:text-[1.2rem]">
        <strong className="font-semibold text-ink">The honest part: </strong>
        {
          "Mango Catalyst is new, so I'm not going to show you a wall of five-star reviews I don't have yet. What I can do is walk you through, on the call, exactly how I'd scope the busywork burning your evenings: what the work looks like now, which part can run itself, and what stays human. You'll see how I think before you spend a dollar."
        }
      </p>

      <ArrowLink href="/about" className="mt-8">
        {"Who you're working with"}
      </ArrowLink>
    </Section>
  );
}
