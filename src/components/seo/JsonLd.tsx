/**
 * Renders a JSON-LD <script> in the initial HTML so Google AND non-JS AI
 * crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) see the structured
 * data. This is a Server Component on purpose: do NOT add "use client".
 *
 * `data` is our own server-built object (never user input), but we still escape
 * "<" to "<" per the Next.js JSON-LD guide as XSS insurance in case a field
 * ever carries fetched/user content.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
