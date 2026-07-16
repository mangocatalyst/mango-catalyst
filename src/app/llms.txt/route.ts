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

## Industries
- [HVAC](${u("/industries/hvac-automation")})
- [Plumbing](${u("/industries/plumbing-automation")})
- [Roofing](${u("/industries/roofing-automation")})
- [Construction](${u("/industries/construction-automation")})
- [Handyman](${u("/industries/handyman-automation")})
- [Snow plowing](${u("/industries/snow-plowing-automation")})
- [Landscaping](${u("/industries/landscaping-automation")})

## Platforms
- [ServiceTitan](${u("/programs/servicetitan")})
- [Zapier](${u("/programs/zapier")})
- [Slack](${u("/programs/slack")})
- [Google Workspace](${u("/programs/google-workspace")})
- [Everything else](${u("/programs/everything-else")})
- [MN-ITS](${u("/mn-its")})
- [Owner Dashboard](${u("/dashboards")}): the whole shop on one page, refreshed hourly from ServiceTitan; includes a clickable fake-data demo.
- [AI](${u("/ai")}): where AI fits in the builds and where it doesn't.

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
