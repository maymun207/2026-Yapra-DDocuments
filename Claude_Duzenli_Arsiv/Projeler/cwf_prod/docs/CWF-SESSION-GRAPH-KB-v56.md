# CWF — Session Graph KB · v56
<!-- CWF-SESSION-GRAPH-KB-v56 · 2026-07-22 · Closes S57 ("GATE-0 SEAL + K1 GATE
     PASSED + IR-3 LAUNCHED"). Follows v55_2 (S56 reconstruction). -->

## SESSION S57 — one line
Boot floor `0636fd3` (S56 close, via bootstrap v55) → close floor `bad00f4`
rev 128. **Three merges (SYNTH-TRAFFIC-1 full arc + GATE0-UI-BATCH-1) + GATE-0
SEALED + K1 §8 ANSWERED + taxonomy DECISION A ratified + IR-3 authored &
handed to AG.**

## MERGE LINEAGE
`0636fd3` → `7d31793`(PR#95 SYNTH-TRAFFIC-1) → `4415d64`(PR#96 DOC-FLIP) →
`bad00f4`(PR#97 GATE0-UI-BATCH-1). IR-3 in flight (not merged).

---

## THE DECISION GRAPH

### 1 · SYNTH-TRAFFIC-1 — full arc, closed + live
Merge (PR#95, S56-2 evidence run 29858555514 whole-job green) → Operator applied
migration (`fjbrkimwvtpwoxhziidh`, G1–G5 clean, 2nd-push no-op idempotent) →
corpus seeded via a real chat-turn warm (`[SynthTrafficSeed] … id=410f8e35…`) →
owner Start → injector LIVE-VERIFIED (`{active:true, injected:5, framesRecorded:5,
tokensToday:2000}`, fresh-DB read no warm-lag, empty≠zero 5=5) → DOC-FLIP (PR#96,
verifyGrants 54/0 +2 deny-probes, STATUS flip). The K1 data motor.

### 2 · GATE0-UI-BATCH-1 — board-walk batch, GATE-0 (b)
Card 14 walked (owner's insight: "candidate-memory preview even without memory" →
F-BW10). Seven findings F-BW01/02/03/04/08/09/10 in ONE client-only phase (PR#97):
context persist+auto-select, collapsed defaults, digest legend, dedupe,
render-decision derived view, card-14 preview under honest banner. AG-A deviations
ACCEPTED on review: rule26 locator `getByRole('listitem')`→`ol > li` (stronger
structural invariant) + FIX-2 scoped 60s timeout (real root-cause not bare rerun,
S55-1 clean). Rebased onto `4415d64`, CI green first attempt. **Board-walk 00–14
COMPLETE.**

### 3 · GATE-0 SEALED
Owner walked the batched UI → "UI su anda gayet iyi" = **UI clean.** GATE-0 (a)
PANE-SCROLL-2 + (b) board-walk+batch + (c) owner word — all three done. Release
track's first gate closed.

### 4 · K1 §8 — the data gate, ANSWERED
The ~Aug 2 date was an Architect estimate; the real gate is DATA (v5_2 §3-D
early-pull). Path: injector ran → hit the 200k ceiling at exactly 500 frames
(F-BW12: ceiling uses a 400-token ESTIMATE, not real usage — over-conservative,
misleading log). Owner instinct ("dur, netleştirelim") was RIGHT: volume was the
wrong axis. Taxonomy read of 520 frames: enum-drop **3.45%** (healthy,
backward-compat proven), confidence **93% HIGH**, but **QUERY_TOPOLOGY + COMMAND =
ZERO traffic** (corpus was all-QUERY). Targeted 8-utterance gapfill set (4
TOPOLOGY + 4 COMMAND) added — but produced 0 frames until owner separately
published `activeSetId` (F-BW13: add-set ≠ active-set, diagnosed via set_id read).
Second read: **COMMAND 100% correct (14/14)** ✓; **QUERY_TOPOLOGY 1/4** — 3
classified as QUERY_MASTER (incl. the taxonomy's OWN topology examples "zon
listesi"/"tesis listesi"). Router can't separate them live.

### 5 · Taxonomy DECISION A — owner-ratified
The TOPOLOGY/MASTER boundary is the real K1 ratification decision ("enum names =
permanent vocabulary"). Architect recommended A (merge) on three evidences:
(1) router can't separate them live, (2) the `(action×object)→category` derivation
gives BOTH the identical `factory` category — the distinction is routing-inert,
(3) no downstream code branches on TOPOLOGY. **Owner ratified A: merge
QUERY_TOPOLOGY into QUERY_MASTER → 6 actions.** K1 §8 ANSWERED (COMMAND proven +
TOPOLOGY resolved by ratification).

### 6 · IR-3 authored
Tree-check surfaced a surprise (S54-1 honesty): the derivation table is NOT in
code, only in the design doc — IR-3 must BUILD it, not just flip. Also found:
IR-2's `computeClarification` + `resolveEntityAlias` shipped but wired to nobody.
IR-3 phase (`claude-code-PHASE-IR-3-v1`) = 6 gated sub-phases: G0 K1-A enum merge
(3 sites), G1 build `deriveCategories.ts` (deterministic, no LLM), G2 THE FLIP
(frame→semantic→keyword primary, governed by reversible `router.frameRouting`
param, ships DARK), G3 clarification active + ALT-D (COMMAND×F80 honest message =
empty≠zero routing family's 4th member), G4 `router.prompt` governed re-publish
(owner consent-class, S54-4; floor serves until published), G5 riders
(F134/F146/F147 + stale comment + enrichment), G6 seal. Freeze-independent
(`router.prompt` ≠ `prompt.segment`). Handed to AG at S57 close.

### 7 · Rule-book position check (owner-requested)
Re-read v5_2 in full mid-session. Confirmed: plan NOT deviated — K1 pulled early
exactly as §3-D allowed. Full forward path re-shared: IR-3 → IR-4 → BLOCK 2
Superset → 3 Memory → 4 RAG → 5 cleanup+FREEZE-LIFT → 6 docs → 7 close → Path B
adjacent.

---

## KEY VERIFIED FACTS
- Floor `bad00f4` rev 128; ~3392 tests/325 files.
- 660 synthetic frames recorded (v1: 630, gapfill: 30). Injector STOPPED by owner
  at close (K1 answered).
- The derivation table is NOT in code (IR-3 builds it). IR-2 clarification/alias
  built-but-unwired (IR-3 activates).
- Router prompt is DB-governed (`system.router_prompt`, `resolveRouterPromptTemplate`,
  floor `ROUTER_PROMPT_FLOOR`); IR-3's enum change needs a governed re-publish.
- Architect premise-error honesty this session: none new (the "AG-A merged before
  report" worry was a relay-latency false alarm, withdrawn).

## S57 LAWS / RULINGS
- **Taxonomy DECISION A** (owner-legislated): QUERY_TOPOLOGY folds into
  QUERY_MASTER — 6 actions. Enum values that are both indistinguishable in live
  traffic AND routing-inert do not earn a slot in the permanent vocabulary.
- No new process law; S56-1/S56-2, S54-x, S55-1, PLATINUM all held and applied.

## WHERE THE PROGRAM SITS (S57 close = S58 boot)
GATE-0 SEALED. BLOCK 1: K1 answered, IR-3 in flight (AG), IR-4 pending. BLOCKS
2–7 not started. Path B queued after BLOCK 7. GOLDEN FREEZE engaged (lifts BLOCK
5). Deferred: F-BW11/12/13. Owner surface = relay until IR live.

<!-- END · CWF-SESSION-GRAPH-KB-v56 · 2026-07-22 -->
