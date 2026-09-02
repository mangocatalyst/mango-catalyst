import type { Screenshot } from "@/components/ui/Lightbox";

/**
 * The product stills, captured nightly by demo/capture-screens.sh and shared by
 * every page that shows the product (/dashboards, home, the ServiceTitan
 * program page, the owner-dashboard guide, the ServiceTitan trade pages).
 */
/** 2880x1800 is the capture size in demo/capture-screens.sh (1440x900 at 2x). */
const SHOT = { width: 2880, height: 1800 } as const;

export const OWNER_SHOTS: Screenshot[] = [
  {
    ...SHOT,
    src: "/dashboards/owner-dashboard-operations.png",
    alt: "The owner dashboard Operations tab: revenue, work in progress, uncollected invoices, and today's appointment counts",
    caption:
      "Operations: the 6 AM read. Yesterday's revenue, today's book, and the money already sold or already invoiced.",
  },
  {
    ...SHOT,
    src: "/dashboards/owner-dashboard-sales.png",
    alt: "The owner dashboard Sales tab: team sold totals, unsold estimates, and a card per salesperson with close rates",
    caption:
      "Sales: what the team sold, what is still on the table, and a card per person with their close rate.",
  },
  {
    ...SHOT,
    src: "/dashboards/owner-dashboard-financial.png",
    alt: "The owner dashboard Financial tab: month to date invoiced, collected, and a list of invoices with an open balance",
    caption:
      "Financial: invoiced against collected, then the list of open balances oldest first.",
  },
];

export const WHITEBOARD_SHOTS: Screenshot[] = [
  {
    ...SHOT,
    src: "/dashboards/install-whiteboard.png",
    alt: "The install whiteboard: one row per sold install, with a shared checkbox for each step from permit to payment",
    caption:
      "One row per sold install. The steps ServiceTitan can prove tick themselves; the rest the crew ticks as they go.",
  },
];

export const COMMISSION_SHOTS: Screenshot[] = [
  {
    ...SHOT,
    src: "/dashboards/commission-master.png",
    alt: "The commission tracker office view: a card per earner listing every commission line with its basis, rate and amount",
    caption:
      "The office view: every earner, every line, and the invoice each one was computed from.",
  },
  {
    ...SHOT,
    src: "/dashboards/commission-portal.png",
    alt: "A technician's own commission portal: their lines for the pay period, with approve and dispute checkboxes",
    caption:
      "What a tech sees: their own lines and nobody else's, with a tick for approve and a tick for dispute.",
  },
];
