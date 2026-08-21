# ROUTE-GOV-1 FIX-1 — the mirror joins the grant registry; the gate's evidence becomes auditable

<!-- claude-code-ROUTE-GOV-1-FIX-1-v1 · rev 1 · 2026-07-14 · Session 43.
     Pre-merge fix round on the OPEN branch `route-gov-2` (PR #34). Anchor = the
     branch head the Architect reviewed: 2a890ba. Push to the SAME branch; CI must
     re-run green on the NEW head — that re-green is the merge precondition (S37-2).
     Everything else in the Architect's review PASSED: engine byte-discipline, one
     migration, fail-closed gate checks, turn-path cleanliness, 2280/230 recount,
     drift [OK] rev 75. Scope here is EXACTLY the three items below — nothing else
     moves. The migration file does NOT change (constraint: exactly ONE migration,
     already satisfied). -->

---

## GAP-1 (BLOCKING) · `backend_tools` is invisible to the grant registry

**Finding:** `shared/grantPolicy.ts` and `scripts/verifyGrants.ts` contain zero
references to `backend_tools`. The anti-drift guard
(`api/cwf/__tests__/verifyGrantsProbes.test.ts`) only enforces probe coverage for
tables **classified in grantPolicy.ts** — an unclassified new table passes it
vacuously. That is how the suite stayed green while the standing rule ("every new
server-only table gets a verifyGrants probe row in-phase plus CI coverage") and
spec §3.A.1 went unmet.

**Fix:**
1. Classify `backend_tools` in `shared/grantPolicy.ts` under the server-only
   family (the same class `golden_specimens` / `backend_trust_audit` carry — grep
   and match, do not guess the constant name).
2. Add the `backend_tools` PROBES row in `scripts/verifyGrants.ts`, mirroring the
   **latest** server-only probe row's exact shape and expected-denial encoding
   (S30-1: cite the newest member of the family — `backend_trust_audit` — never an
   older one).
3. No test file edits should be needed: once classified, the existing coverage
   test DEMANDS the probe row — run it and paste the pass. (If it does not bite
   without the probe row, stop and report — that would mean the guard is weaker
   than reviewed.)

## GAP-2 (BLOCKING) · spec §3.B.4.e — the verdict must record the catalog it checked against

**Finding:** `catalogCount` / `catalogHash` appear nowhere on the branch. The gate
decides against a catalog snapshot, but the decision's evidence is unrecorded — a
forensic replay of "why did this publish pass/fail" cannot know which catalog the
gate saw.

**Fix (pure, minimal):**
1. In `evalGate.ts`, when `catalog` is present, compute once:
   `catalogCount = catalog.names.size`;
   `catalogHash = sha256(sortedNames.join('\n')).slice(0, 12)` — deterministic,
   pure (sort first; the Set has no order).
2. Expose it on the `runGate` result (e.g. `catalog?: { count: number; hash: string }`)
   without touching stage order or any existing field.
3. In `governance.ts`, merge it into the audit `detail` on BOTH paths where a
   gate verdict is recorded: the gate-fail REJECT insert and the success PUBLISH
   insert (absent when `catalog` was not assembled — non-armes backends stay
   byte-identical).
4. Tests: (a) same name-set ⇒ same hash, different set ⇒ different hash;
   (b) a gate-fail audit detail fixture carries `{ catalogCount, catalogHash }`;
   (c) a non-armes publish audit detail carries neither (unchanged shape).

## NOTE-1 (comment accuracy — fold in, one line)

`governance.ts`'s degrade comment claims "every OTHER kind's publish is
unaffected." Once tool_category/tool_annotation rows exist in the PUBLISHED
candidate, an EMPTY catalog fails **any** ARMES publish with "sync first" (the
gate block keys on the candidate — correctly, RULE 31 needs that). Reword the
comment to state this precisely, noting the realistic occurrence is only the
seed→sync owner window where "sync first" is the honest, actionable answer.

*(Recorded, no action: the stage-drafts button living in RulesTab instead of next
to the sync button is an ACCEPTED deviation — review-flow adjacency.)*

---

## SELF-VERIFY (paste each)
1. `git diff --name-only 2a890ba..HEAD` — expected: `shared/grantPolicy.ts`,
   `scripts/verifyGrants.ts`, `api/cwf/_lib/knowledge/gate/evalGate.ts`,
   `api/cwf/_lib/knowledge/governance.ts`, plus test files ONLY. The migration
   path must be ABSENT from the diff.
2. The coverage-test bite: output of the verifyGrantsProbes suite run.
3. The three GAP-2 tests green; full local run (shards fine — CI is the arbiter).
4. New head SHA on `route-gov-2` + confirmation CI re-triggered.

<!-- END · claude-code-ROUTE-GOV-1-FIX-1-v1 · rev 1 · 2026-07-14 -->
