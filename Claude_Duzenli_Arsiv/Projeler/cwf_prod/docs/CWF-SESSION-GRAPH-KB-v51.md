# CWF — Session Graph KB · v51

<!-- CWF-SESSION-GRAPH-KB-v51 · rev 51 · 2026-07-19 · Adds S52. Supersedes v50.
     Narrative memory: what happened and WHY, for a future session's intuition.
     The register (v54) is the item ledger; this is the story. -->

## S52 (2026-07-19) — "The oscilloscope ships, the window opens, IR-0 is born"

**Arc 1 — SC-1 lands in three acts.** AG delivered SET-CONTEXT-1 CI-green on PR
#73; FAST-GATE passed (auth via TELEMETRY_READ_ALL, C1 read-only, ADD-1/2/3 all
point-grepped, stage-09's underspecified prompt reconstruction accepted as a
DISCLOSED judgment — as-of walk + byte-verify + honest divergence, our
guess-never-looks-like-an-answer family). Merge landed at a82c2a2 with the
Architect's verbatim message. AG's completion report then silently omitted Steps
2+3 — ONE fresh clone exposed both migration STATUS lines still "Operator-pending"
and 7 stale branches alive. Re-instructed; the addendum (3da9966) flipped BOTH
DOC-FLIPs (comment-only proven independently twice) and branch hygiene restored
remote to master-only. Lesson re-sealed: reports describe intentions; trees
describe reality.

**Arc 2 — a ruling issued, then retracted (S52-1).** AG's report mentioned
verifying DB facts over a read-only Supabase connection. The Architect ruled it
out-of-lane from MEMORY — then AG's two respectful questions forced a read of the
definition site: RULE 30/S43-4 codifies AG's mode as "Developer, DB read-only via
supabase-ro" and defines raw access as WRITES. Ruling RETRACTED same-session;
AG's conduct recorded as exemplary (disclosure + pushback = the F122/F123 refusal
instinct working). Durable law minted: **lane rulings only from definition sites,
never summaries** — code-is-ground-truth binds the Architect first.

**Arc 3 — IR-0 opens.** The owner had run a parallel design session ("Konuşmanın
detaylı incelenmesi") producing the IR architecture: constrained-LLM normalizer →
closed-vocabulary frame → deterministic everything downstream; model-agnostic by
requirement (small self-hosted LLMs, on-prem/defense); Path A deterministic core /
Path B retrieval over CANONICAL terms for future SAP/IoT-Ignite federation. The
Architect examined it, ratified three decisions with the owner: **K1** draft-now /
ratify-after-evidence, **K2** skip the SR1-primary intermediate flip (one flip
ceremony: IR-3 frame-primary; ladder frame→semantic→keyword), **K3** alias kind
backend-scoped (tenancy composes above backends, never invented early). Then
minted `cwf-ir-taxonomy-design-v1` DRAFT grounded in the live master: 7 generic
actions × 13 domain objects (orthogonality chosen FOR forward-fit — objects
extend, actions close early), derivation table 56/91 with fall-through as a
stamped metric, COMMAND structurally aligned to the allowWrite exposure lane.
SC-1's ADD-1/ADD-2 telemetry — designed in that same parallel session — went live
in prod this day: **the ~2-week ROUTING-ARCH evidence window opened 2026-07-19**
(review ~2026-08-02); IR-0 §8's ratification checklist prices itself from real
traffic for free.

**Arc 4 — the owner's screenshot becomes a phase.** Tool Matching's Proposals
card (fat with real router evidence — the design-time-empty trap) crushed the
workbench: one flex-1 region absorbing all squeeze, siblings sized by content,
no viewport budget model. PANEL-RESIZE-1: a hand-rolled VSplit primitive (pure
clampSplitRatio — floors or proportional degrade, RULE 26 by construction;
persisted ratio; separator a11y; dbl-click reset) + criterion-driven adoption.
**The criterion beat the Architect's guesses:** Inspect/Replay/Governance all
skipped on inspection; ProvidersTab was the real second match. Shipped f1c40d8;
owner finger-tested on live prod (screenshot: divider visible, layout sane).

**Arc 5 — two-surface hygiene + a rescue.** Remote verified single-branch; AG's
local attested clean; 56/56 stale local branches proven ancestors and deleted.
Three untracked publish-job JSONs surfaced — GOLDEN FREEZE artifacts whose only
copies lived on AG's disk. Disposition: s45 deleted (already archived);
S50-viz4 + W3b re-emitted verbatim by AG → parser-validated + sentinel-checked
by the Architect → filed. W3b (router.enabled=1) marked obsolescence-candidate
per K2. Honest bar recorded: byte-identity to deleted originals unprovable;
semantic fidelity is the standard.

**Session close state:** master f1c40d8 · docVersion rev 113 · 294 files / 2893
tests · drift OK · zero pending migrations · remote+local clean · SC-2 design
note delivered, §2 owner gate open → S53 starts there.

<!-- Sessions S51 and earlier: see KB v50 and prior. Chain preserved by version. -->

<!-- END · CWF-SESSION-GRAPH-KB-v51 · rev 51 · 2026-07-19 -->
