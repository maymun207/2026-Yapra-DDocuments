# PHASE-METRIC-REGISTRY-DATA-1 · v1  (lane AG-1)

PRECONDITION (S47-1): origin/master == c1e3f5f99ac7a36fb8c6ccf4ff7c2cc99d8dd95b,
docVersion rev 222, 517 test files, 68 migrations, 13 ADRs, origin phase/* == 27.
Verify from a FRESH FULL CLONE before anything (RULE 25). If any differs, STOP
and report; do not adapt.

BINDING CARRIERS: `cwf-design-METRIC-REGISTRY-DATA-1-v1` AND its amendment
`…-v1_1`. Read BOTH. Where they differ, v1_1 wins. Owner ruling S90 (register
v94 §1 H1) is the law; the Architect's recon is the map; the CODE is truth.

EXPECTED SHAPE: ZERO migrations · ZERO Operator steps · ZERO governed publishes
by hand · NO new table, endpoint or permission. Reseal IS REQUIRED (below).

---

## STEP 0 · HOUSEKEEPING (do first, report, then proceed)

0a. In the PRIMARY working dir, bring it current with `git fetch && git merge
    --ff-only origin/master`. Use `--ff-only`, NOT `reset --hard`: the tree is
    clean today, and a command that STOPS when it is not is the correct one.

0b. Delete the local-only label `rescue/chore-mcp-supabase-ro-f75b1f9`. Its
    commit f75b1f9 is an ancestor of origin/master (Architect verified with
    `merge-base --is-ancestor`); nothing unique is lost.

0c. `docs/relay/PHASE-ROUTE-DERIVE-1-MERGE-report.md:105` carries a ⚠ line
    saying the S63-1 proof is "BLOCKED until an Operator provisions
    SELF_SEED_ACTOR_EMAIL". That is FALSE and has been since 2026-08-09 18:01
    TR. APPEND (never rewrite history) a dated DISCHARGED marker carrying the
    measured evidence: four `armes.tool_category` drafts (factory · material ·
    production · transfer) written 15:00:58–15:01:00Z, ALL with a non-null
    `created_by`; `rule_audit` since deploy holds 4 `create` and ZERO
    `publish`. Reason it must be fixed IN THE REPO: the stale line survives a
    lane refresh and already re-infected one lane within the hour.

## G1 · THE KIND FAMILY AND THE RESOLVER (no migration)

G1a. Mint `<backendId>.metric_registry` kinds GENERICALLY: a `KIND_REGISTRY`
     entry per non-system backend + `isMetricRegistryKind` + a
     `metric_registry.kinds` `kindsOnly` SEED_DOMAINS row. Copy the
     `tool_category.kinds` entry's shape verbatim (selfSeedReconciler.ts:148).
     NO per-backend literal anywhere.

G1b. `resolveMetricRegistry` — a sibling of `knowledge/resolveToolCategories.ts`
     in POSTURE, not a new pattern: enabled `public.backends` rows (system lane
     excluded), UNION of published rows across the turn's active backends,
     `repo.configured === false` ⇒ FLOOR, catch ⇒ last-known/floor. NEVER throws
     into the turn.

G1c. The resolved shape:
     `{ ids: string[]; aliasesById: Record<string,string[]>;
        categoryHintsById: Record<string,string[]>;
        source: 'governed' | 'floor' | 'stale' }`
     Order is DETERMINISTIC = row key order, and the code SAYS SO at the site.

G1d. THE PLATFORM FLOOR IS EMPTY. Not a fallback trio, not a comment promising
     one. `ids: []`. A bank must never see `oee`, including during an outage.

## G2 · THE ARMES SEED (ABSENCE-ONLY)

An armes-scoped seed module (three ids + aliases + fire's `categoryHints:
['quality']`), self-seeded by the reconciler as
`{ domain: 'armes.metric_registry', backendId: 'armes', instances: … }` — the
`system.plan_template` pattern verbatim, including the rule_audit witness rows.
ABSENCE-ONLY: the reconciler never rewrites an existing row.

## G3 · THE ARMOR TAKES ITS VOCABULARY

G3a. `armorIrFrame(raw, vocab)` — the second parameter is REQUIRED. An optional
     parameter with a default is the hard-code at the type level; do not.
     `deriveCandidateCategories(frame, vocab)` likewise.

G3b. Empty slice ⇒ `keptMetrics = []` and EVERY raw word lands on
     `metricsSurface` (BEYAN). The drops ARITHMETIC stays byte-identical in
     shape (irFrame.ts's own comment explains why — obey it).

G3c. CALL-SITE CENSUS TEST (the F185 `learnBrakeCallSites.test.ts` pattern):
     every production call site under `api/**` must pass the vocabulary, WITH a
     floor assertion — a scan that finds ZERO sites FAILS (S66-1). The 8 known
     sites: semanticRouter.ts:315 · admin/bench/gate.ts:67 ·
     admin/bench/armor.ts:104,142 · replay/clarificationLens.ts:564,606 ·
     replay/routeShadowLens.ts:378. Do not trust that list — DERIVE it.

G3d. REPLAY RULING (read before writing): the two replay lenses re-armor STORED
     historical frames. They pass the SAME live-resolved vocabulary, AND the
     lens output CARRIES `vocabSource`, so a re-judgment of history is never
     presented as the original verdict. A lens that re-armors silently would be
     asserting a fact about a turn that never happened that way.

## G4 · THE GUARD FAILS CLOSED (the phase's sharpest byte)

G4a. `requestedMetric` (groundingCheck.ts:464) iterates the slice in the stated
     deterministic order; `METRIC_ALIASES` reads become `aliasesById`.

G4b. `resolveLearnCorpus` (toolCategories.ts:631) reads the slice.

G4c. F156 (`METRIC_VOCAB_WORDS` / `isMetricVocabWord`, toolCategories.ts:936):
     when `vocabSource !== 'governed'`, the guard REFUSES TO LEARN. Fail-closed,
     not fail-open. MUTATION REQUIRED: flip it to fail-open ⇒ a named test dies.

G4d. Preserve the RULE 5 polarity law's REASONING as a comment at the new guard
     site, with the sentence that discharges it: `vocabSource` ended the
     condition it depended on. Deleting a law without recording why is how the
     next session re-litigates it.

## G5 · TRUST SURFACE + BENCH (per-backend truth)

G5a. `api/admin/backend-trust.ts`: `allowedMetrics = published registry rows
     (FOR THAT BACKEND) ∪ grants`. The GET list and the PUT/DELETE 422
     validation both resolve PER `backendId`. ⚠ NAMED BEHAVIOUR CHANGE: granting
     `oee` to a backend whose registry lacks it now 422s. That is the ruling's
     whole point; do not soften it, and state it in the report.

G5b. `knowledge/reference/backendTrust.ts:59` references the armes seed module's
     ids (one source), never the deleted constant.

G5c. `api/admin/bench/armor.ts:100` `VOCABULARY` resolves server-side per
     backend. `src/components/admin/BenchTab.tsx:136` is a COMMENT naming
     METRIC_IDS — updating that ONE comment line is your ONLY permitted edit
     under `src/**`. AG-2 holds `src/**` this wave; touching anything else there
     is the collision this session has already paid for twice.

## G6 · THE SWEEP AND ITS HONEST BOUNDARY

G6a. DELETE `shared/metricVocab.ts` and `METRIC_IDS`/`MetricId` from
     `shared/dbConstants.ts:337-342`. `MetricId` becomes `string`.

G6b. The DEAD import `FIRE_ROUTING_SYNONYMS` (toolCategories.ts:19) dies with
     the file, as does its test pin (metricVocab.test.ts:36).

G6c. EXIT CRITERION: `grep -rn "METRIC_IDS\|METRIC_ALIASES\|FIRE_ROUTING_SYNONYMS"`
     over `api shared src` (tests excluded) returns ONLY the armes seed module.
     DIRECT references only — this grep DOES NOT reach the F214 fence.

G6d. OUT OF SCOPE BY NAME: `toolCategories.ts:164–490`, the generated
     `[F214-FLOOR-SYNC]` block, still holds `'oee'` (:169) and
     `'scrap'`/`'ıskarta'` (:381–382) as literals. DO NOT TOUCH IT and DO NOT
     hand-edit inside the fence. Record it in the report as
     `ROUTING-FLOOR-BACKEND-1`, the named successor. A phase that quietly fixed
     three literals here would claim a victory its evidence does not carry.

## G7 · SEPARATELY DROPPABLE — W-034 (own commit, last)

Mint the missing `tool_annotation` kind family the same generic way
(`tool_annotation.kinds` kindsOnly). Production evidence: the ROUTE-DERIVE cron
reports `failed=4` on every tick because `superset.tool_annotation` and
`honestbench.tool_annotation` do not exist. ⚠ CONSEQUENCE, state it plainly:
after this, those four DRAFTS will actually be staged (drafts only — the gated
publish path is untouched). Put this in ONE commit at the END so the Architect
can reject it with `git reset --hard HEAD~1` and lose nothing else.

## DOC / RESEAL — PRE-ORDERED (S90-2)

This phase edits `shared/**`, `api/cwf/_lib/**`, `api/cwf/_lib/toolCategories.ts`,
`api/cwf/_lib/knowledge/**` and `api/admin/**`. Four tabs map those areas:
Architecture Map · LLM Control Surface · Request Lifecycle · Governance Model.
THE SEAL WILL MOVE — that is expected, ordered in advance, and not a finding.
Mint the next docVersion and reseal in a SEPARATE commit. Do NOT write "rev N
stands" anywhere.

## MUTATIONS (minimum; each names its killing test)

1. Platform floor seeded with the armes trio instead of empty.
2. Vocabulary parameter made optional-with-default.
3. Empty slice: a raw metric word discarded instead of beyan-captured.
4. `categoryHints` dropped from the fire row (the quality surface must die).
5. F156 guard flipped to fail-open under `vocabSource='floor'`.
6. `allowedMetrics` computed globally instead of per-backend.
7. Self-seed made to overwrite an existing row (ABSENCE-ONLY violation).

Run each; report survivors as findings, never as noise.

## STOP-FOR-REVIEW

Stop after G6 (+G7 as its own commit). Report: measured suite before→after in
the SAME fresh clone; every mutation with its killing test; the exit-criterion
grep OUTPUT pasted; the G5a behaviour change named; doc-drift result and the
resealed rev; and anything you found that this brief did not anticipate —
especially if it contradicts the brief. Two lanes independently caught my last
brief's error; that is the standard.
