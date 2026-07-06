# One-Shot Kickoff (drafted 2026-07-01)

**Status: DRAFT, awaiting Bryan's go.** This is the runbook that starts the website build. The role briefs carry the detail; this file only sequences them. Source of truth on WHAT: `00-canonical-brief.md`. On PROCESS: `BUILD-PLAN.md` (staging + effort map). Doc set settled 2026-07-01 after a 4-round red-team loop (final round clean); records in `build/out/`.

## Kickoff

Bryan says **"run the one-shot"** (or pastes this file). Mango orchestrates in Claude Code with model Fable 5, workflow orchestration on. Bryan's go AUTHORIZES the preconditions below, including the two pushes.

## Preconditions (Mango executes at kickoff, in order)

1. wip-commit the untracked stubs on `seo-foundation` (never destroy uncommitted work).
2. Push `seo-foundation` to origin (`github.com/mangocatalyst/mango-catalyst`); Vercel builds previews from pushed branches.
3. Cal.com env var set if the account exists; otherwise the honest fallback ships (non-blocking).
4. Headshot source photo if available (type-only About ships without it).

## Phase A: one workflow invocation (tournament + specs)

| Work | Agents | Effort |
|---|---|---|
| Hero tournament | 4 builders, one per direction A to D in `build/out/hero-direction-options.md`, each a real rendered hero on its own branch off `seo-foundation` (worktree isolation), pushed for live previews | **MAX** |
| Section-palette mocks | 1 agent, one conversion band in branding-doc option A (all-dark) and B (light bands), on the preview | HIGH |
| Judge panel | 3 judges score the hero variants against `frontend-design` + the anti-slop bar (brief: `03-design.md` hard constraints); variants failing a majority die before Bryan sees them | HIGH |
| SEO spec (01) | 1 agent per `01-seo.md`, output `build/out/seo-spec.md` | HIGH |
| Copy (02) | 1 agent per `02-copy.md` (MF-1/2/3 rewrites, sweeps, FAQ, guides from scratch, privacy), output `build/out/copy/` | HIGH |

All agents: model Fable, self-verify per their brief before handoff.

## PAUSE: Bryan's picks (the one human gate)

Bryan picks from live preview renders: **hero direction**, **section palette**, and the **display-font veto** (Fable's pick + one alternate, surfaced in `build/out/design-notes.md`). Picks recorded in design-notes.md per `03-design.md`. Never defaulted.

## Phase B: second workflow invocation (build to green)

| Work | Agents | Effort |
|---|---|---|
| Winning hero polish + design tokens lock | 1 agent | **MAX** |
| Pages fan-out | 1 agent per remaining page/route per `03-design.md`, inheriting tokens + components | HIGH |
| Fable red team (05) | per `05-redteam-site.md`, against the pushed preview | HIGH |
| Integrator (06) | master verification loop until green, cap 5, per `06-integrator.md` | HIGH |
| Hero re-touch | only if the red team flags the hero | **MAX** |

Preview URLs read back from GitHub deployment statuses (Vercel CLI is unauthenticated; see BUILD-PLAN deploy mechanics).

## After the workflows

- GPT half of 05: Bryan-visible agent-duo session (explicitly outside the one-shot, per `orchestration.md`).
- Done = 06 auto-checks green AND red-team must-fix list empty. Then **HOLD for LLC**; production deploy only after formation (and GBP + NAP verify per D9).
