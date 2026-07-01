# Orchestration — how to run the build

Read `BUILD-PLAN.md` for the why. This is the how. Same role-briefs run two ways.

## Dependency order

```
00 brief ──► 04 GPT challenges the brief ──► fold MUST-FIX back into 00
                                                      │
                                                      ▼
                                            01 SEO/AEO architect
                                                      │
                                                      ▼
                                            02 Copywriter
                                                      │
                                                      ▼
                                            03 Design/UI build  (on the kept SEO foundation)
                                                      │
                                                      ▼
                                            05 Red team: Fable + GPT in parallel
                                                      │
                                                      ▼
                                            06 Integrator: verification loop until green (cap 5)
                                                      │
                                                      ▼
                                            HOLD for LLC ──► production deploy
```

Hard gates: do not start 01 until 04's MUST-FIX items are folded into 00. Do not call it done until 06's master checklist is green AND the red-team MUST-FIX list is empty.

## Role 04 disposition + what the one-shot covers (decided by Bryan 2026-07-01)

**Role 04 is SATISFIED, do not re-run.** The 2026-06-26 GPT pass produced MF-1/MF-2/MF-3, which are folded into `00`; the doc set was then adversarially re-verified three more times (2026-06-30 consensus, plus the two 2026-07-01 MOC red-team rounds, ~130 agents). Skip step 2 of "start here" below.

**The one-shot covers:** roles 01, 02, 03, the Fable half of 05, and 06's auto-loop, run to a pushed Vercel preview, per the staging + effort map in `BUILD-PLAN.md` (hero tournament at MAX effort, rest at HIGH). **Explicit human steps outside the one-shot:** Bryan's mockup picks (hero direction + section palette, the stage-1 PAUSE), the GPT half of 05, and the sign-offs in 06's human-judged checklist.

## Run model A — manual (works today)

Open each Fable role in Claude Code with this repo + the vault on disk (so it can read the source docs). Walk the order above, pasting each `0X-*.md` brief in turn and letting it write its output into `build/out/`. The two red-team passes:
- 04 and the GPT half of 05 run in a ChatGPT/Codex window (paste the brief + the artifact named in the brief).
- The Fable half of 05 runs in Claude Code against the preview.

## Run model B — workflow (when you want it hands-off)

A Claude Code workflow fans the Fable roles out (`model: fable`) along the pipeline, shells out to Codex for the external red-team passes, and implements 06 as a literal loop-until-green with the cap-5 escalation. Trigger it with "ultracode" / "use a workflow" so it has the orchestration opt-in. The role-briefs are the agent prompts; the workflow just sequences them.

## When Fable 5 is back — start here

1. Skim `00-canonical-brief.md`. Confirm the open-config items (booking link, form endpoint, logo, display font, email).
2. Run 04 (GPT challenges the brief). Fold MUST-FIX into 00.
3. Walk 01 → 02 → 03.
4. Run 05 (both models). 
5. Run 06 until green. It deploys to PREVIEW and holds production for the LLC.

Outputs land in `build/out/`. Nothing goes live until the LLC is formed.
