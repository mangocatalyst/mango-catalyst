/**
 * The concrete "for example" lines under each service. They lived on the home
 * ServiceGrid until 2026-09-02 (audit item 7): home now summarises and links,
 * /services carries the depth. Keys are the card anchors on /services.
 * Phrased as things we build, never as client case studies (00 honesty gate).
 */
export const SERVICE_EXAMPLES: Record<string, string[]> = {
  invoicing: [
    "Supply-house receipt emails matched line by line to the right purchase order in your CRM, for every vendor you buy from.",
    "Yesterday's financials pulled into one morning summary instead of five screens.",
  ],
  leads: [
    "Hang-ups and abandoned calls classified automatically in your phone system, so your booking rate reflects what actually happened.",
    "Open estimates that follow themselves up until they get an answer.",
  ],
  scheduling: [
    "A dedicated channel per job in your team chat, the right people added automatically, and the photos and messages in it archived back onto the job record when it closes.",
    "Digital install and truck load sheets the crew fills from a phone, saving field time and still printing clean for the shop.",
  ],
  reporting: [
    "Install-quality scorecards per technician: recalls, go-backs, and the hours spent fixing them, built from your CRM and payroll.",
    "A dispatch-board dashboard on the office TV that refreshes itself.",
  ],
  equipment: [
    "Every unit you install logged with model and serial, and registered with the manufacturer automatically, portal or not.",
    "A master equipment sheet that fills itself in as the trucks roll.",
  ],
  portals: [
    "Portal forms pre-filled from saved presets, with your staff reviewing and clicking submit.",
    "One-keystroke shortcuts for the actions your office repeats all day inside the tools you already use.",
  ],
};
