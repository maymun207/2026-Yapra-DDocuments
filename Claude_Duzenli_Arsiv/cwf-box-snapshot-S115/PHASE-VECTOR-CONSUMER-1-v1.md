# PHASE-VECTOR-CONSUMER-1 · v1 — the open valve gets its first reader

LANE: AG-3 · SESSION: S106 · ITEM: #75 (which ABSORBS #66's remaining half — the
gauge reader; the priority queue itself is ALREADY LANDED at commit 3820e940,
measured, 15 tests green. Do not rebuild it.)

## PRECONDITION (S47-1 — verify before ANY work; mismatch = STOP and report)
- Fresh full clone. `git rev-parse origin/master` MUST print
  `d3644c9e25608e51a20e240edde9ce68813d75da`.
- `public/architecture/manifest.json` docVersion MUST read `rev 277`.
- Governed rows (read-only; do NOT write): `vector.enabled`=1 v2 published,
  `vector.engine`='qdrant' v2 published, `vector.indexRatePerSec`=5 v1
  published — all `kind_id='agent.param'` (NOT `system.agent_param`), column is
  `key` (NOT `rule_key`). Empty result = wrong lens, not absence.

## WHY THIS PHASE EXISTS (one paragraph, measured facts only)
The valve opened in S105 (both keys v2 published) but NOTHING in production
reads it: `resolveAgentParams.ts` contains zero occurrences of `vector`, and
`resolveVectorLane` is invoked only by tests and two proof scripts — all three
hardcode their config. Governance truth changed; production behaviour changed
zero bytes. Consequence carried from S105: production's 0
`VectorEngineUnreachableError` count is STRUCTURAL, not a liveness measurement.
This card wires the governed rows to the lane and lands the FIRST consumer.
⚠ THE VALVE IS ALREADY OPEN: this card reaches live behaviour WITHOUT a further
owner approval gate. That is why ROLLBACK is named inside this card (see §R).

## MEASURED SEAMS (Architect read these at d3644c9e; re-verify, then build)
- `api/cwf/_lib/knowledge/reference/agentParams.ts:131-141` — the three keys
  exist as named constants: VECTOR_ENABLED / VECTOR_ENGINE /
  VECTOR_INDEX_RATE_PER_SEC.
- `api/cwf/_lib/vectorLane/resolveVectorLane.ts:62-73` — `VectorLaneConfig`
  { enabled, engine, indexRatePerSec? }; `:174` the synchronous resolver;
  `:214` conditional-spread `admission` (S105 F-2 repair — keep it).
- `api/cwf/_lib/vectorLane/admission.ts` — createAdmission + snapshot();
  landed by PHASE-VECTOR-ONBOARD-DRIP-1 (commit 3820e940). Queries drain to
  exhaustion before index work; throttle applies to index class only.
- `api/cwf/_lib/vectorLane/qdrantEngine.ts:339` — every encode already runs
  through `opts.admission.run(cls, …)` when admission is present.
- `api/cwf/_lib/turn/stageClarify.ts:72,306` — today's Resolve seam: imports
  resolveEntityRef and calls it at `:306`; the governed-alias-wins merge order
  lives in this file (its own header says so). This is A23 ③ Resolve's
  present-day body; the consumer lands HERE, not beside it.
- Pattern precedent for the resolver you will write:
  `resolveSyntheticTrafficPolicy.ts` / `resolveShiftBoundaries.ts` — both
  import `fetchSystemParamRows` from `resolveAgentParams.js`, db > code-floor,
  outage falls to the floor.

## REQUIREMENTS (gated; every mechanism sentence above is line-measured)

R1 · GOVERNED READER. New `api/cwf/_lib/knowledge/resolveVectorPolicy.ts`
following the fetchSystemParamRows precedent. Resolves the three keys into a
`VectorLaneConfig`. Floors: enabled=0, engine='incumbent',
indexRatePerSec=VECTOR_INDEX_RATE_FLOOR. Outage → floor (an outage can never
turn the lane ON). sessionTweakable stays false — the resolver must not read
session overrides for these keys.

R2 · ONE LANE PER PROCESS. A composition-root accessor (e.g.
`getVectorLane()`) that resolves policy and constructs the lane ONCE per
config-triple per process, memoized. Reason is structural, from admission.ts's
own header: a queue constructed per call orders nothing. If the governed
triple changes, the next accessor call rebuilds; the old admission's counters
are allowed to die with it (state that in a comment — it is a decision, not an
oversight).

R3 · FIRST CONSUMER, INSIDE RESOLVE. In `stageClarify.ts`, when the lane
resolves `status:'on'`: run ONE vector query for the turn's unresolved entity
surfaces against the corpus collection (read `vectorLane/corpora.ts` first and
use its naming; do NOT invent a collection name). Polarity law (ADR-001,
resolveEntityRef's own header): vector hits are OBSERVATIONS — governed alias
wins, deterministic exact/prefix/fuzzy tiers win, and AMBIGUOUS IS REPORTED,
NEVER GUESSED AMONG is untouchable. The vector result may only contribute
candidate SUGGESTIONS where the deterministic path returned `unresolved`
(askOnUnresolved's suggestion surface is the natural mouth). It must never
flip a verdict kind. HONEST-EMPTY IS A LEGITIMATE ANSWER: the corpus may be
empty until #81 lands — an empty hit list is a reading, not an error, and must
not degrade the turn.

R4 · FULL-TRACE. The vector consumer is a stage-visible read: INPUT (surfaces,
collection, topK) + OUTPUT (hits or honest-empty, and `admission.snapshot()`
taken after the query) recorded in the turn trace, Langfuse + panel, secrets
scrubbed only. The snapshot in the span IS the DRIP gauge's first reader —
S98-L4 discharged by name.

R5 · OFF-PATH BYTE-IDENTITY (falsifier, both directions). With the floor
config (enabled=0) the turn pipeline's behaviour and trace are byte-identical
to today — assert structurally (the off arm constructs nothing). Positive
control: with enabled=1+qdrant and a stubbed engine, the consumer runs and the
span carries the snapshot. A red-capable proof: break the wire (e.g. drop the
snapshot from the span) and show the test names the miss; restore; byte-same.

R6 · L-ADAY-4. Any new optional field you declare must have a consumer or a
falsifier in this same phase. No silently-compiling measurement surfaces.

R7 · NO SECOND SHAPE. Do not re-declare BuiltEngine/VectorLaneConfig inline
anywhere (the S105 `VectorLaneDeps.engines` lesson: an inline copy narrowed
the union and hid the field). Import the types.

## §R · ROLLBACK, NAMED (this card ships live without a further gate)
Rollback is ONE governed publish, no deploy: `vector.enabled` → new version,
value 0, published (same path that opened it; actor ksadmin). Trigger: owner
says "geri sar" → Architect orders it. Behaviour returns to the floor
byte-identically — that is exactly what R5 proves in advance. Write this
paragraph verbatim into your report's header.

## GATES (S91 completeness — all four, no substitutes)
(a) branch `phase/vector-consumer-1` · (b) push to origin · (c) report at
`docs/relay/PHASE-VECTOR-CONSUMER-1-report.md` with an evidence fence carrying
the card's id+bytes+md5, every R-item's proof, and the R5 red-capable run ·
(d) PR to master; CI runs on PR head (S37-2). Blocking step 1 of any GO will
be CI verification via `/actions/runs?head_sha=<SHA>` (never
`/commits/<SHA>/check-runs`). docVersion: if your diff touches a mapped
surface, DOC-FLIP + reseal in its own full-disclosure commit (RULE-20);
provisional seal single-file (S101-L2).

## FENCES
No migrations. No writes to domain_rules. No terraform. No touching
admission.ts's ordering logic (it is landed and proven; you are wiring, not
reworking). No changes to resolveEntityRef's tier order or polarity. scripts/
tests live under `api/cwf/__tests__` (vitest does not cover `scripts/**`).

TAIL-ANCHOR: PHASE-VECTOR-CONSUMER-1-v1 · expected master parent
d3644c9e25608e51a20e240edde9ce68813d75da · report names every measured line it
re-verified. END OF CARD.
