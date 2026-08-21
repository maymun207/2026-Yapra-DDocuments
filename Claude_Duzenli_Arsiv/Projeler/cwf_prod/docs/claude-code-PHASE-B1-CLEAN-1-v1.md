# PHASE B1-CLEAN-1 — close BLOCK 1's three carved IR-3 riders
**claude-code-PHASE-B1-CLEAN-1-v1 · rev 1 · 2026-07-22 · Architect: Claude · Executor: AG · MUST-FOLLOW: cwf-master-plan-v5_2**

Closes the three IR-3 riders AG carved out of PR #98 without reporting (F134,
F146, enrichment 4th-tier). Landing these makes **BLOCK 1 fully closed** — spine
(K1 + IR-3 flip live-confirmed + IR-4 contract) is already done; these are the
listed riders. Small, surgical; NOT a re-open of the flip.

> PLATINUM: no manual configuration introduced; F146 reads live basis provenance
> already stamped by IR-3; enrichment sentence is governed copy. Owner touchpoint
> = relay + the merge go, nothing mechanical.

## §P · PRECONDITION (S47-1) + PROFILE
Valid ONLY while `origin/master == 866924c5808d8215c4a66f0e9914607c0a6a0139`
(rev 129). On mismatch STOP and report actual state. **FULL ceremony profile**
(touches `api/**` grounding + `src/**` UI). Unique workdir (S56-1). Branch:
`b1-clean-1`. Grep pre-flight from `package.json` (S32-1). CI-green is the merge
precondition (S37-2/S56-2).

## §G · GATED SUB-PHASES

**G1 · F134 — LEDGER-ONLY, zero code.**
F134's IR-era obligation was "revisit at IR-3/IR-4 design; capture the Path B
mid-turn-complement contract" (register v55 §4, v52 §1). **IR-4 satisfied it**:
`cwf-ir-taxonomy-design-v3` §9 invariant 7 states "F134 is the mid-turn
complement" of the pre-turn IR ladder. The F134 **build** (the mid-turn tool-set
expansion meta-tool) stays **PARKED for Path B** (post-BLOCK-7). Action: write
NO code for F134. In the `.agents` CHANGELOG note exactly: *"F134 IR-era
obligation SATISFIED@IR-4 (taxonomy-v3 §9 inv-7); F134 build stays PARKED for
Path B."* Confirm in the report that zero F134 code was owed.

**G2 · F146 — probe per-layer attribution lens.**
Surface: `src/components/admin/RoutingTab.tsx` (the Tool Matching probe — the
W-3 lens/membership-dots probe). Now that IR-3 stamps `basis` live
(`frame`|`union`|`keyword`), extend the probe so it shows **all three ladder
rungs' provenance at once** — for a probed query, which categories the FRAME
tier derives (via `deriveCandidateCategories`), which the SEMANTIC tier (SR1)
matches, and which the KEYWORD floor matches — side by side, so a human can see
per-layer attribution rather than only the final merged set.
- Register spec (verbatim intent): *"probe context + per-layer attribution lens
  — all three rungs' provenance at once (IR-3 era); the probe computes NO sticky
  today (the R3 retreat)."* Keep that caveat HONEST — the probe does NOT compute
  sticky; label the attribution as pre-sticky (empty≠zero: don't fabricate a
  sticky contribution the probe didn't compute).
- Deterministic + read-only: the probe calls the SAME pure functions the live
  path uses (`deriveCandidateCategories`, `routeKeywordLayer`); it does NOT run
  an LLM turn. If the semantic-tier rung requires a live router call the probe
  can't cheaply make, show the frame + keyword rungs and mark the semantic rung
  "requires a live turn" honestly — do NOT fake it.
- **SMALL-EDIT GUARD:** if F146 needs a NEW endpoint or is larger than a
  component-local edit (+ maybe a pure helper), **STOP and report** — it re-homes
  to BLOCK 5, do NOT force-fit. Report which.

**G3 · enrichment 4th-tier sentence.**
`shared/dbConstants.ts` `TRUST_TIER` has FOUR tiers: `system_of_record` ·
`reporting_mirror` · `enrichment` · `unverified`. Locate the trust-tier →
attribution/grounding **sentence copy** (candidates: `api/cwf/_lib/knowledge/
reference/backendTrust.ts`, `api/cwf/_lib/backends/trustRegistry.ts`, or the
grounding attribution builder). Confirm the `enrichment` tier is **missing its
attribution sentence** (the other tiers have one). Add the sentence shown **when
a backend of the `enrichment` trust tier contributes data** to an answer —
register spec: *"enrichment 4th-tier sentence when that tier activates."* The
sentence must honestly convey the enrichment tier's meaning (supplementary /
enriching data, NOT a system-of-record authority) consistent with the Data
Authority panel's tier semantics. If the copy is governed (DB row), add the
floor/reference entry; if it's code copy, add it there.
- **SMALL-EDIT GUARD:** same as G2 — if it turns out to require a schema/gate
  change, STOP and report.

**G3-rider (trivial):** `semanticRouter.ts:~176` docblock comment "DRAFT enums
(routing/irFrame.ts §2) pending K1 ratification" is now stale (K1 ratified,
enums are 6-action final). Correct it to reflect ratified state. One line.

**G4 · Seal.** Reseal per living-doc lock-step (mapped files touched → rev 130).
`.agents` CHANGELOG entry: the three riders closed (F134 ledger + F146 + enrichment)
+ the stale comment + **"BLOCK 1 FULLY CLOSED"**. Full suite via CI (whole job
green, single attempt — S55-1).

## §V · SELF-VERIFY (paste literal evidence)
1. Anchor rev-parse. 2. Head SHA + PR # + WHOLE CI job green.
3. G1: CHANGELOG F134 note; confirm zero F134 code.
4. G2: the probe now renders frame/semantic/keyword per-layer attribution;
   test proving it uses the pure functions (no LLM); the sticky-honesty label.
   OR the STOP-and-report verdict if it exceeded the small-edit guard.
5. G3: the enrichment-tier sentence added; grep proving all 4 TRUST_TIER values
   now carry a sentence; a test asserting the enrichment sentence renders when
   that tier activates. OR the STOP-and-report verdict.
6. G3-rider: stale comment corrected (grep).
7. Reseal rev. 8. PLATINUM + freeze-independence (no golden dependency; no
   prompt.segment touched).

## §M · REPORT & MERGE
Push, open PR, post §V. Do NOT merge until Architect FAST-GATE review → GO.
Merge message (verbatim):

`Merge PHASE B1-CLEAN-1: close IR-3 riders — F134 ledger (satisfied@IR-4) + F146 probe per-layer attribution + enrichment 4th-tier sentence + stale-comment fix → BLOCK 1 FULLY CLOSED`

Then delete branch `b1-clean-1`.

<!-- END · claude-code-PHASE-B1-CLEAN-1-v1 · rev 1 · 2026-07-22 -->
