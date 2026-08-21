# CWF — Session Graph KB · v48

<!-- CWF-SESSION-GRAPH-KB-v48 · rev 48 · 2026-07-17 · Supersedes v47.
     Adds Chapter S49. Chapters ≤S48 live in v47 and earlier — unchanged. -->

## Chapter S49 — "The day the brain turned on" (2026-07-17)

**Arc in one line:** one session carried the semantic router from evidence design
to live production — lens authored, built, run on real specimens, merged, the
single param flip published, and the first real user turn routed semantically
with the first machine proposal landing six seconds later.

### 1 · W3a authoring — the trap named before it could bite
The phase prompt was written against live master with every anchor grep-verified
(S46-3). The verification paid immediately: proposal emission does NOT live in
`routeSemantica` — it fires inside `resolveToolCategories` on path='semantic'
(toolCategories.ts:740). A replay arm calling the production function with an
enabled policy would have written machine rows into router_proposals BEFORE the
enable, violating "replay never writes" and "the table stays empty until W3" in
one stroke. C-EMIT was born as the phase's first binding constraint: the replay
router arm calls `routeSemantica` directly, proposals are REPORT-ONLY.

### 2 · Build, sequencing correction, and the identity fence firing live
AG shipped W3a.1/W3a.2 clean (three deviations, all flagged-not-improvised, all
accepted: estimate-not-metering, no backend axis on RecordedTurn, replay.ts as
the registration point). The Architect's remote read found NOTHING pushed —
report-only claims — and issued the standing correction: real tokens ride only a
CI-green, FAST-GATE-reviewed PR head. Then the fence fired for real:
`resolveActorByEmail` refused `maymun207@gmail.com` — no auth.users row. AG
stopped instead of improvising; the Operator lane confirmed production holds
exactly one admin identity (`ksadmin@ardictech.com`, 12 users total). The S43-4
constraint ("a real resolved row, never a fallback") was validated by its own
refusal path, in production, before a single token moved.

### 3 · The run and the honest reading
24/24 specimens, reps=3, 72 router calls, 48,444 tokens of a 1.5M consent —
against a 38M standing replay quota, ordinary replay, freeze-clean. Numbers:
coverage 71.6% (A) vs 71.0% (B), fully-covered 8/24 vs 27/72, Wilson intervals
overlapping, floor rate 0/72, 20 real proposal keywords (glazur, oee, KB7,
superset, fire). The reading that mattered was structural: specimens are
recorded SUCCESSFUL turns — turns the keyword floor already served — so the
metric is a non-regression test by construction. Parity plus a 0/72 floor rate
means "enabling is safe," not "the router adds nothing"; the upside lives in the
queries keyword routing MISSES, which this population structurally undersamples.
Mid-run, the machinery caught a real defect: replay_audit's miss_policy CHECK
rejected the 'n/a' placeholder — born-loud (S41-1), fixed with a documented
nominal placeholder, one gated backfill, regression-pinned (F130, closed within
the session). Both ledger-hygiene items (pre-run CI proof, dry-run output) were
demanded retroactively and turned out captured live, in-order — no gap.

### 4 · W3b — two STOPs, both the Architect's fault, both the system working
The enable was a data publish, not a deploy. It took three attempts, and both
failures were authoring errors on the Architect's side: (1) the job file lacked
the loader-required `promptSegments[]` (superseded as v1_2 per the immutability
rule); (2) "expected UPDATE" misread plan vocabulary — CREATE/UPDATE means
"is there a draft of YOURS to reuse" (findOwnDraft), not a published-row diff.
AG held on both, correctly, changing nothing unilaterally. The publish itself:
`[Gate] verdict=published`, rule 236ad3c7 v2 value=1, the self-seeded v1
(value 0) archived by the unconditional supersede — zero golden contact,
zero spend, `stage=-`. Lesson S49-1 was minted: expectation lines and query
lines are literals an agent will act on — verify them from code/schema, never
guess. (Its second instance arrived hours later: the F125 seal query guessed
router_proposals column names; the Operator mapped and disclosed.)

### 5 · The window opens — three seals in one turn
The owner threw one natural question ("Can you bring the list of active alarms
in a table format?"). One log window delivered:
`[Route] path=semantic latency_ms=1071 matched=[machine] dropped=0
proposals=[alarms]` (F124 sealed — and router.enabled=1 source:db proven by
behavior, since the floor is 0 and the semantic path cannot run on it);
`[MCP Mirror] served 145 defs … (live-fallback: 0)` (the standing warm-path
watch sealed on a natural turn); and six seconds later the first MACHINE row in
router_proposals — keyword=alarms, suggested_category=machine, status=pending —
promoting the table to LIVE-VERIFIED (F125). The user-facing turn was
indistinguishable from the day before: one query, the right tool, an honest
empty-list answer with the advisory strip — exactly the "enable is invisible,
the armor floors on any failure" design promise. Bonus evidence for the
retirement decision: the learned map STILL wrote stopwords ("you", "bring",
"table", "format?") on the same semantic turn — the F123 guard filters at load
only. F126 (first non-empty 05:00Z digest) waits for tomorrow.

### 6 · Lessons that outlive the session
- Naming the emission-site trap AT authoring is what a code-verified anchor pass
  is FOR — the constraint existed before the code that could violate it.
- A refusal path that fires correctly in production (identity fence, job loader,
  plan mismatch, miss_policy CHECK) is the governance working, four times over.
- Specimen populations define what a metric CAN say: recorded successes make
  coverage a non-regression test. Say so in the evidence, or the evidence lies
  by omission.
- S49-1: every literal an agent will act on — expectations, queries, column
  names — is verified from code/schema first. Guessing costs round-trips at
  best and false STOPs at worst.
- S47-1 preconditions absorbed a genuine relay-crossing (AG answered a stale
  instruction mid-correction) with zero damage — the third session in a row the
  mechanism has paid for itself.

**Floor at close:** master b563046 · rev 107 · 2714/275 · **ROUTER LIVE**
(rule 236ad3c7 v2) · router_proposals LIVE-VERIFIED, 1 pending machine row ·
W3c window open: F126 + retirement decision remain.

<!-- END · CWF-SESSION-GRAPH-KB-v48 · rev 48 · 2026-07-17 -->
