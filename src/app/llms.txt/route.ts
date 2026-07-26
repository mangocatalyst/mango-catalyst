import { SITE } from "@/lib/constants";

/**
 * /llms.txt — a plain-text map of the site for AI answer engines (the AEO
 * counterpart to sitemap.xml). Built from SITE so the summary and service area
 * never drift from the metadata source of truth. Content only; no invented
 * claims. Extend the section lists as pages ship.
 */
const u = (path: string) => `${SITE.url}${path}`;

const BODY = `# ${SITE.name}

> ${SITE.description} Based in ${SITE.city}, ${SITE.region}; serving ${SITE.areaServed.join(", ")}.

## Core
- [Home](${u("/")}): what Mango Catalyst does and who it is for.
- [About](${u("/about")}): the operator behind the work.
- [Services](${u("/services")}): the automation work, scope, and how engagements run.
- [FAQ](${u("/faq")}): common questions on scope, pricing, and process.
- [Contact](${u("/contact")}): book a 15-minute fit call.
- [AI Consulting](${u("/ai-consultant")}): two one-hour sessions, $500 flat, credited toward setup if a build starts within 60 days; no retainer.

## Industries
- [HVAC](${u("/industries/hvac-automation")})
- [Plumbing](${u("/industries/plumbing-automation")})
- [Electrical](${u("/industries/electrical-automation")})
- [Roofing](${u("/industries/roofing-automation")})
- [Construction](${u("/industries/construction-automation")})
- [Restoration](${u("/industries/restoration-automation")})
- [Septic and well](${u("/industries/septic-well-automation")})
- [Handyman](${u("/industries/handyman-automation")})
- [Snow plowing](${u("/industries/snow-plowing-automation")})
- [Landscaping](${u("/industries/landscaping-automation")})

## Platforms
- [ServiceTitan](${u("/programs/servicetitan")})
- [Zapier](${u("/programs/zapier")})
- [Slack](${u("/programs/slack")})
- [Google Workspace](${u("/programs/google-workspace")})
- [Everything else](${u("/programs/everything-else")})
- [MN-ITS](${u("/mn-its")}): a local-only Chrome extension that fills MN-ITS Professional Claim forms from saved per-client presets and stops at the review screen. Priced by clients billed per month: $65 for up to 4, $120 for 8, $220 for 16, $300 for 24, custom above that. 30-day free trial, no card.
- [Dashboards](${u("/dashboards")}): two ServiceTitan-fed products, each with a clickable fake-data demo. The owner dashboard puts the whole shop on one page, refreshed hourly; standalone at $795 setup, $125 a month, no retainer required. The commission tracker computes every tech's pay line from ServiceTitan, gives each tech a portal, and exports approved periods to payroll; setup plus a small monthly, quoted on a call.

## Guides
- [HVAC tasks to automate](${u("/guides/hvac-tasks-to-automate")})
- [The cost of manual data entry](${u("/guides/manual-data-entry-cost")})
- [What is an automation consultant](${u("/guides/what-is-automation-consultant")})
- [What an HVAC owner dashboard should show](${u("/guides/hvac-owner-dashboard")})
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
