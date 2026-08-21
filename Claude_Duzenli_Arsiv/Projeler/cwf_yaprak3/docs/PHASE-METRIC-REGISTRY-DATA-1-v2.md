# PHASE-METRIC-REGISTRY-DATA-1 · v2 — CONTINUATION  (lane AG-1)

Amends `PHASE-METRIC-REGISTRY-DATA-1 · v1` (S37-1). v1's gates G1, G2, G3a/b/d,
G5c and G7 are BUILT and typecheck in the production project; this version
finishes G4, G5a, G5b, G6, the tests, the mutations and the reseal.

**⚠ THE v1 BRIEF NAMED TWO BINDING CARRIERS YOU CANNOT READ.** You reported that
`cwf-design-METRIC-REGISTRY-DATA-1-v1` and `-v1_1` are not in the repo and not
reachable from your lane. **You were right and the brief was wrong** — those are
Claude-project artifacts, invisible to you. That is a D-2 ONE-RELAY violation by
the Architect. **§0 below embeds everything from them that binds you.** Nothing
outside this file is required reading.

---

## §0 · THE RULINGS THAT BIND THIS PHASE (embedded — this is the carrier now)

**R0 · The owner ruling (S90, verbatim substance).** Backend-specific deed words
(armes's `oee · fire · throughput`) must not live hard-coded in the codebase. Any
backend connects → is probed and verified → after observed maturity the deed is
assigned by the system itself, with an admin surface on top if needed. *"If this
system ran at an insurance company, what does OEE mean? What does FIRE mean in
banking?"*

**R1 · The split.** MECHANISM (the per-backend ledger, publish gates, BEYAN
capture, deterministic ordering/folding/dedupe) is STRUCTURE → stays in code.
The WORDS and their ALIASES are backend FIELD-DATA → move to governed rows.

**R2 · Platform floor is EMPTY.** `ids: []`. Not a fallback trio, not a comment
promising one. A bank must never see `oee`, including during an outage.

**R3 · `MetricId` is `string`.** A closed compile-time union IS hard-coding at
the type level.

**R4 · Turn resolution.** The vocabulary slice = union of published registry rows
across the turn's ACTIVE backends, resolved with the same posture as
`resolveToolCategories.ts` — enabled `public.backends` rows, system lane
excluded, unconfigured/outage ⇒ floor, never throws into the turn.
`vocabSource: 'governed' | 'floor' | 'stale'`.

**R5 · The polarity law is DISCHARGED, not ignored.** `shared/metricVocab.ts`'s
header says the module must never become a governed row, because *detectors that
can be silenced by data are not detectors*. That fear was CORRECT when written.
It is dischargeable now because `vocabSource` (GATE-SILENCE-VISIBILITY-1, merged
`5d92d81`) ended the condition it depended on: a silenced detector and a clean
one are no longer byte-identical. **Preserve the reasoning as a comment at the
new guard site, with the sentence that discharges it.** Deleting a law without
recording why is how the next session re-litigates it.

**R6 · NAMED EXCLUSION.** `api/cwf/_lib/toolCategories.ts:164–490` — the generated
`[F214-FLOOR-SYNC]` block — still holds `'oee'` (:169) and `'scrap'`/`'ıskarta'`
(:381–382) as LITERALS, plus 12 ceramic categories and ~100 armes tool names. It
is both the outage fallback and the text rendered into the router-fallback prompt.
**DO NOT TOUCH IT. DO NOT hand-edit inside the fence.** It is `ROUTING-FLOOR-BACKEND-1`,
a named successor phase. Your exit grep cannot reach it and must not be widened
to pretend it did.

**R7 · S89 reconciliation.** "Tapu-anahtarlığı sökülmez" is NOT violated: the
mechanism is preserved and multiplied per backend; only the ADDRESS moves, by
owner ruling. "Beyan liste değildir" is untouched — the registry is the
OFFICIAL-id ledger, never a beyan store, and BEYAN coverage WIDENS (an empty
registry means everything is beyan).

---

## §1 · PRECONDITION (S47-1 / RULE 25) — THE GROUND MOVED

Verify from a FRESH FULL CLONE:

| Property | Required |
|---|---|
| `origin/master` | **`d32482feaf5803cce5183ab5cf4c371cc3bdee64`** (was `c1e3f5f` — AG-2's STAGE-CARD-COVERAGE-1 merged) |
| `docVersion` | rev 222 |
| test files | **518** |
| migrations · ADRs | 68 · 13 |
| `origin/phase/*` | 29 |
| your branch | `phase/metric-registry-data-1` @ `90468cc` |

**FIRST ACTION: merge master into your branch** (`git merge origin/master`), and
compute EVERYTHING afterwards on the combined tree. AG-2 touched only
`src/components/admin/**` — disjoint from your files, so this should be a clean
merge with no conflicts. Reason this is ordered rather than left to merge time:
S90's lesson is that reseal hashes and suite figures computed on a stale anchor
are figures about a tree nobody will ship.

---

## §2 · G3-FIX · THE 217 TYPE ERRORS

`tsc -p tsconfig.api.test.json` reports 217 errors, nearly all
`Property 'metricVocab' is missing … RouterPolicy` at test-side policy literals
plus `Expected 2 arguments, but got 1` at bench-test armor calls.

**That enumeration is the design working** — a required parameter makes the
compiler list every consumer. Fix them.

⚠ **DO NOT solve this by making the parameter optional-with-a-default.** That is
mutation #2 on the list below, and it re-introduces the hard-code at the type
level (R3). A shared test fixture (`metricVocabFixture()` returning the armes
trio, plus an `emptyVocab()`) is the obvious move.

## §3 · G4 · THE GUARD FAILS CLOSED — the phase's sharpest byte

G4a. `requestedMetric` (**`groundingCheck.ts:465`** — 464 is its comment, your
     finding 6, corrected) iterates the slice; `METRIC_ALIASES` reads become
     `aliasesById`.

G4b. `resolveLearnCorpus` (`toolCategories.ts:631`) reads the slice.

G4c. **F156** (`METRIC_VOCAB_WORDS` / `isMetricVocabWord`, `toolCategories.ts:936`):
     when `vocabSource !== 'governed'`, the guard **REFUSES TO LEARN**.
     Fail-closed, not fail-open. Refusing to learn is reversible; a contaminated
     `tool_category_cache` is not — F185 measured it regrow 2 → 19 rows in hours.
     **MUTATION REQUIRED:** flip it to fail-open ⇒ a named test dies.

G4d. The R5 comment, at the new guard site.

## §4 · G4e · ORDERING — ARCHITECT RULING ON YOUR FINDING 3

You found it and you were right: `getPublishedRules` issues no `ORDER BY`, the
retired constant's order was DECLARATION order (`oee, fire, throughput`), and
key-sorting gives (`fire, oee, throughput`) — so a query naming both `oee` and
`fire` would change which metric `requestedMetric` returns. That feeds the
scope-divergence authority check, so it is a real behaviour change, not cosmetics.

**RULING: the registry row carries an explicit `order` integer, and the armes
seed preserves today's declaration order (`oee`=1, `fire`=2, `throughput`=3).**

Rationale: alphabetical key order is determinism BY ACCIDENT, and it silently
changed a live verdict. An explicit field makes the order DATA (a bank orders its
own metrics), keeps armes byte-par with pre-phase behaviour, and satisfies G1c's
"deterministic, and the code says so" without inheriting an arbitrary collation.
Payload becomes `{ id, order, aliases[], categoryHints?, label? }`.

This amends the design note's §4.1 payload shape; the Architect carries that
amendment. **Pin the armes ordering with a test.**

## §5 · G5 · TRUST SURFACE (per-backend truth)

G5a. `api/admin/backend-trust.ts:107` and `:121`:
     `allowedMetrics = published registry rows (FOR THAT BACKEND) ∪ grants`.
     Both the GET list and the PUT/DELETE 422 validation resolve PER `backendId`.
     ⚠ **NAMED BEHAVIOUR CHANGE:** granting `oee` to a backend whose registry
     lacks it now **422s**. That is the ruling's whole point — do not soften it,
     and state it in the report.

G5b. `knowledge/reference/backendTrust.ts:59` references the armes seed module's
     ids (one source), never the deleted constant.

G5c is already built. While you are in `api/admin/bench/armor.ts`, fix the stale
comment at **:85-91** you reported (it says a FIX "adds" `metricsSurface`; that
FIX has landed). Doc-rot, one edit, name it in the report.

## §6 · G6 · THE SWEEP — WIDENED PER YOUR FINDING 2

G6a. DELETE `shared/metricVocab.ts` and `METRIC_IDS`/`MetricId` from
     `shared/dbConstants.ts:337-342`. `MetricId` becomes `string`.

G6b. The dead import `FIRE_ROUTING_SYNONYMS` (`toolCategories.ts:19`) dies with
     the file, as does its test pin (`shared/__tests__/metricVocab.test.ts:36`).

G6c. **`scripts/verifyBackendTrust.ts` imports `METRIC_IDS` at four sites** —
     outside `api shared src`, so the v1 exit criterion could pass while
     `npm run build` breaks. **Your finding, accepted: the sweep and the exit
     grep both WIDEN to include `scripts/`.**

G6d. **EXIT CRITERION (corrected):**
     `grep -rn "METRIC_IDS\|METRIC_ALIASES\|FIRE_ROUTING_SYNONYMS"` over
     `api shared src scripts` (tests excluded) returns ONLY the armes seed
     module. Paste the OUTPUT in the report, not a claim about it.

## §7 · G7 · KEEP IT LAST

W-034 is built and was the final commit. After this phase's work lands it will no
longer be last. **Move it back to the tip** so `git reset --hard HEAD~1` still
drops it and loses nothing else — its separate-droppability was the whole point.
Its stated consequence stands: after it ships, the four drafts the cron reports
as `failed=4` will actually be STAGED (drafts only; the gated publish path is
untouched).

## §8 · DOC / RESEAL — SEVEN TABS, PRE-ORDERED

Your finding 5 corrected the brief: **seven tabs drift, not four.** The three the
v1 brief missed — Runtime Topology, Agent Control Plane, Stage Cards — come in via
`api/cwf/_lib/turn/stageClarify.ts`, which G3a required editing and which the
brief's tab mapping did not account for.

**Reseal all seven and mint `docVersion` rev 223, in a SEPARATE commit.** The seal
WILL move; that is ordered in advance and is not a finding. Do not write
"rev 222 stands" anywhere. AG-2's merge minted nothing, so 223 is yours and
uncontested (S90-1).

## §9 · MUTATIONS — ALL SEVEN, each naming its killing test

1. Platform floor seeded with the armes trio instead of empty.
2. Vocabulary parameter made optional-with-default.
3. Empty slice: a raw metric word discarded instead of beyan-captured.
4. `categoryHints` dropped from the fire row (the quality surface must die).
5. F156 guard flipped to fail-open under `vocabSource='floor'`.
6. `allowedMetrics` computed globally instead of per-backend.
7. Self-seed made to overwrite an existing row (ABSENCE-ONLY violation).

Plus, from §4: **8. the armes `order` field removed** ⇒ the ordering pin dies.

A mutation that was not run is not a survivor and not a kill. Report it as
nothing, exactly as you did last time.

## §10 · CALL-SITE CENSUS — YOUR COUNT, NOT MINE

The v1 brief said "8 sites in 6 files" and listed seven. **You derived nine** —
seven `armorIrFrame` plus two `deriveCandidateCategories` sites the brief never
named (`toolCategories.ts:1351`, `stageClarify.ts:458`). **Your number is the
one.** The census test (F185 `learnBrakeCallSites.test.ts` pattern) derives the
list and carries the S66-1 floor assertion: a zero-site scan FAILS.

## §11 · DELIVERY — the completeness gate the v1 brief omitted

1. Branch: **`phase/metric-registry-data-1`** (existing). **PUSH it.**
2. Report: **`docs/relay/PHASE-METRIC-REGISTRY-DATA-1-report.md`** — amend the
   existing file (append a `## v2` section; do not rewrite the v1 record, it is a
   faithful account of an incomplete state and stays). Commit and push.
3. **Open/refresh a PR against `master`** so CI runs on the PR head.
4. **STEP 1, blocking, at report time:** read CI **by conclusion** on the
   **FULL 40-character** head SHA —
   `GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=<40-char>`.
   ⚠ A SHORT sha returns an EMPTY `workflow_runs` array, which is
   indistinguishable at a glance from "CI never ran" — AG-2 hit exactly this and
   the v1 GO caused it. Cross-check `refs/pull/<n>/merge` exists before
   concluding anything, because a CONFLICTED PR also produces zero runs.
   `in_progress` or `null` is NOT a pass.

## §12 · STOP-FOR-REVIEW

Stop when §2–§8 are complete. Report: the merge-of-master result; measured suite
before→after **on the combined tree in the same fresh clone**; all eight
mutations with their killing tests; the §6d exit-grep OUTPUT pasted; the G5a
behaviour change named; the doc-drift result and rev 223; the CI run id and its
conclusion; and anything this brief still gets wrong.

Your v1 report set the standard: where a measurement did not exist you wrote that
it did not exist, and you refused a destructive act ordered on a false premise.
Both were correct. Hold that line.
