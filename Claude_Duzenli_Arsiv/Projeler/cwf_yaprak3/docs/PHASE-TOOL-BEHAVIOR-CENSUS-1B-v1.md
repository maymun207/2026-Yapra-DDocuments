# PHASE-TOOL-BEHAVIOR-CENSUS-1B · v1 — Wave 3 · Lane AG-1 (A / heavy / seal token)

<!-- Self-contained (S54-3 / D-2). You cannot see the Claude project; everything
     you need is in this file + the repo. Item #10 (SOTA gate key K2). 1A shipped
     R1 + record + R5 write-side (flag OFF) at merge 1b7f8dd. THIS phase ships
     R2 + R3 + R4 and TURNS THE KEY: gate 1/7 → 2/7. -->

## PRECONDITION (S47-1)
Start from a FRESH FULL clone of `maymun207/cwf_yaprak`, branch from
`origin/master`. Wave-3 floor at prompt time: `1b7f8dd9490b8943e730e4e4175223385ec54dae`
(docVersion rev 240 · 73 migrations, top `20260812200000` · drift 7/7).
If `origin/master` has moved past that hash when you start or while you work,
that is EXPECTED (three sibling lanes merge in this wave, order = whoever is
ready): rebase onto current `origin/master` and re-run your checks. Every write
uses an ABSOLUTE path (S80-1).

## CONTEXT — what 1A left you (read these before writing anything)
- `api/cwf/_lib/backends/toolBehaviorCensus.ts` — the R1 runner (plan → call →
  observe → persist). Its header EXPLICITLY declares 1B's two open consequences:
  a tool once `unread` stays `unread` until the next connect, and nothing diffs
  the mirror against the live definition set. You are closing exactly those.
- `api/cwf/_lib/backends/toolProbePlan.ts` — planner; `DEFAULT_PROBE_BUDGET =
  {maxProbes:25, maxCalls:40}`; families `zero_arg|empty_array|specimen`;
  ADR-011 exposure gate (only READ-annotated entry-point tools, `via_gateway=false`;
  gateway inner tools are structurally out — F189, keep it that way).
- `api/cwf/_lib/backends/toolBehaviorRecord.ts` — observer (`sketchShape`,
  value-free).
- `api/cwf/_lib/persistence/repositories/ToolBehaviorCensusRepository.ts` —
  42P01-silent posture (missing table = silent no-op write / honest null read).
- Table `public.tool_behavior_census` (migration `20260812200000`): unique
  `(backend_id, tool_name, via_gateway)`; `outcome in ('ok','error','unread')`
  CHECK-closed; `probed_at` + `(backend_id, probed_at desc)` index created
  in 1A PRECISELY so 1B does not fire a second migration at that table.
- `api/cwf/_lib/backends/censusToolDoc.ts` — R5 write side, behind
  `toolCensus.composeEnabled` (floor 0, published nowhere). Its header ties
  error-silence to "R3 does not exist yet".
- `api/cwf/_lib/backends/catalogSync.ts` — `CatalogSyncOptions.runBehaviorCensus`
  (only the on-connect hook passes true) and `includeSlowLayers` (only the
  30-min cron passes true). The cron endpoint is `api/admin/backend-health.ts`
  (calls `syncBackendCatalog(server, toolsRepo, { includeSlowLayers: true })`).
- Staleness-gate pattern to mirror: `entityDiscoverySync.ts`
  (`SLOW_LAYER_MIN_INTERVAL_MS`, per-layer budget, unreadable timestamp ⇒ stale,
  never-throws rider posture).
- `backend_tools.input_schema` is the mirrored schema (R4's diff source).
- Known 1B input (register, verbatim): probe budget 25 vs ARMES ~97
  read-annotated tools ⇒ the catalog is PARTIALLY censused today. R3 is also the
  coverage healer — see priority P1 below.

## THE OWNER'S RULES YOU IMPLEMENT (design note, binding — deviation = owner-ruling violation)
- **R2 — runtime positive-experience ledger.** Every production-turn SUCCESS of
  a tool by the weak model is recorded per tool. A tool WITHOUT positive
  experience must remain DISTINGUISHABLE from one with it.
- **R3 — cron re-discovery + FRESH.** Discovery is not once: a periodic pass
  (rider on the existing 30-min health cron) re-runs the census under its own
  staleness gate and its own (small) budget. Rule verbatim: every tool without
  positive experience is marked FRESH and RE-PROBED — a first probe's failure is
  not a permanent verdict.
- **R4 — backend evolution is caught.** The cron diffs the mirror against the
  live definition set: new tool → full probe; changed schema → re-probe;
  previously failed → already in R3's fresh cycle. A fixed API rises to
  "works" on its own — nobody touches anything by hand.
- ADR-009 zero-tenant-literal: census code contains NO backend or tool name.
- BUG-020 is law: no unasked burst against a customer's MES. The refresh budget
  is deliberately a fraction of the connect budget.

## GOALS

**G1 — Migration (Wave-3 slot-1, the wave's ONLY migration).**
File: `supabase/migrations/20260813090000_tool_experience_and_fingerprint.sql`.
You AUTHOR it; you NEVER apply it (ADR-005 two-door rule; the Operator applies
via `supabase db push`). Idempotent (`if not exists`; revoke is naturally
idempotent). Contents:
1. `alter table public.tool_behavior_census add column if not exists
   schema_fingerprint text;` + column comment: the sha-256 hex of the tool's
   CANONICALISED `input_schema` (sorted keys, no whitespace) AS PLANNED FROM at
   probe time; NULL = NOT MEASURED (pre-1B rows) and NULL is never treated as a
   mismatch (MEASURE-READ-HONESTY-1 — you cannot claim "changed" without a
   baseline).
2. `create table if not exists public.tool_experience (backend_id text not null,
   tool_name text not null, via_gateway boolean not null default false,
   positive_count bigint not null default 0, last_positive_at timestamptz not null,
   primary key (backend_id, tool_name, via_gateway));`
   FENCE-FIRST immediately after CREATE: `enable row level security` with ZERO
   policies, then `revoke select, insert, update, delete, truncate ... from
   public, anon, authenticated` (the full-grantee lesson). Comments on table +
   every column, in the 1A migration's voice. `backend_id`/`tool_name` plain
   text, NO FK, NO CHECK (identity is DATA, ADR-009 v1_1).
3. ADR-014: classify `tool_experience` in the SAME commit —
   `shared/dbConstants.ts`: add to `DB_TABLES` and `TABLE_PERSISTENCE_CLASS`
   with class **`operational.control`** (phase-brief ruling: a COUNTER the
   system reads to decide behaviour — R3 reads it to choose what to re-probe.
   It is NOT a mirror of the external system and NOT learned authority; an
   installation re-EARNS experience, per ADR-010). The existing Gate A breaks CI
   in both directions if you skip this — do not skip it.
4. Security standing rule: add a `tool_experience` PROBES row to
   `scripts/verifyGrants.ts` + a CI coverage test
   `api/cwf/__tests__/toolExperienceGrants.test.ts` (mirror
   `toolBehaviorCensusGrants.test.ts`).

**G2 — R2 writer (turn side).**
- New repo: `api/cwf/_lib/persistence/repositories/ToolExperienceRepository.ts`
  — 42P01-silent posture verbatim from ToolBehaviorCensusRepository; one
  `batchUpsert(rows)` (increment `positive_count`, set `last_positive_at=now`)
  and one read shape for R3/G4 (`experienceForBackend(backendId)`).
- Accumulate per turn, flush ONCE per turn: in `stageTools.ts`, at the EXACT
  point `recordToolOutcome` already computes `toolError` (so "success" can
  never mean two things — read the module's own law), on `!toolError`
  accumulate `(toolName, server.backend_id, via_gateway?)` into a turn-local
  map on `ctx`. NOTE: `ToolOutcomeLedger` (toolOutcomes.ts) is BUG-005-bounded
  and carries no per-success names — do NOT extend it; add a SEPARATE ctx
  field (names + backend ids only; never arguments, never payloads).
  `via_gateway`: derive from the same dispatch information the call site
  already has for the census's namespace rule; if the seam genuinely cannot
  tell, record `false` and say so in a comment — do not invent a second
  dispatch model.
- Flush post-stream (the existing post-turn seam in `stageStream.ts` /
  memory-distill neighbourhood): fire-and-forget, `.catch` swallowed, NEVER
  delays or fails the turn; one log line `[ToolExperience] flushed=<n>`;
  zero writes when the map is empty (no-op turns cost nothing).

**G3 — R3 refresh engine (new `api/cwf/_lib/backends/toolCensusRefresh.ts`).**
- Wiring: `CatalogSyncOptions` gains `runCensusRefresh?: boolean` (default
  false); ONLY `api/admin/backend-health.ts` passes `true` — same structural
  cadence guard as `includeSlowLayers`, stated in the same voice. Rider order
  inside one cron invocation: catalog sync (mirror now current) → refresh.
  Rider posture: never throws, never changes syncBackendCatalog's return
  contract, per-backend isolation.
- Selection, in strict priority, all under budget:
  **P1** mirror READ-annotated entry-point tool with NO census row (coverage
  healer for the 25-vs-97 gap) →
  **P2** census row whose `schema_fingerprint` is NON-NULL and ≠ current mirror
  fingerprint (R4 change; NULL is never a mismatch) →
  **P3 FRESH** rows with zero positive experience (no `tool_experience` row or
  `positive_count=0`), oldest `probed_at` first, and only when `probed_at` is
  older than `REFRESH_MIN_INTERVAL_MS` (code const; pick the
  entityDiscoverySync magnitude — hours, not minutes — and justify the number
  in a comment). Unreadable timestamp ⇒ stale (the existing pattern).
- Budget: `REFRESH_BUDGET: ProbeBudget = { maxProbes: 8, maxCalls: 12 }` per
  backend per cycle — code const, comment citing BUG-020 and the connect
  budget it deliberately undercuts.
- Probing REUSES the 1A engine (refactor `toolBehaviorCensus.ts` internals to
  accept a tool subset + budget; do NOT duplicate the plan/observe/persist
  path — a copied engine is a second model that will drift).
- The probe writer now also computes+stores `schema_fingerprint` (canonical
  sha-256 of the schema it planned from) — on connect-census AND refresh paths.
- The probe writer touches PROBE columns only; the experience writer touches
  EXPERIENCE rows only. Column/row disjointness is tested (G5).
- Log line (a brake that fires silently has not been built):
  `[CensusRefresh] backend=<id> considered=<n> p1=<n> p2=<n> p3=<n> probed=<n>
  flips=<n> skippedInterval=<n> budgetStop=<bool>` where `flips` counts rows
  whose outcome changed `error|unread → ok` — R4's "rises on its own", visible.

**G4 — R5 truth maintenance (no behaviour change).**
`censusToolDoc.ts`: update the header paragraph that ties error-silence to
"R3 does not exist" — R3 now exists; error-speech remains OFF as a deliberate
policy pending the flag-publish decision (owner's), not as a missing organ.
Make the experience dimension AVAILABLE to the compose join (a tool with
positive experience is distinguishable in the rendered note) — still fully
dark: flag floors 0, zero reads at the floor, no prompt byte changes at this
merge. Do not publish anything.

**G5 — Tests (all in your own new files; run `npx vitest run <files>` +
`npm run typecheck:api`).**
- Refresh selection unit tests: P1>P2>P3 order; interval gate; budget stop
  mid-list; NULL-fingerprint never P2.
- Fingerprint stability: key-order permutation of the same schema ⇒ same hash;
  changed schema ⇒ different hash.
- Writer disjointness BOTH directions: a refresh upsert leaves experience
  untouched; an experience upsert leaves probe columns untouched.
- R2 parity: the success predicate used by the accumulator equals the one
  `recordToolOutcome` receives — build the expectation by CALLING the shared
  seam, never by hand-writing a parallel truth (S95 lane law: a test that
  cannot disagree with the code verifies nothing).
- Flush: one batched write per turn; empty map ⇒ zero calls; repository throw
  never propagates.
- Grants coverage test (G1.4).
- **Birth proof (S93-1) — the organ's first real measurement inside the
  phase:** an integration test with a mock MCP server seeds a mirror of three
  tools (one unprobed, one fingerprint-changed, one prior `error` + zero
  experience + stale) → one refresh pass fires P1+P2+P3, respects the budget,
  records exactly one `flip`, and the asserted log line carries the real
  counts.

## OUT OF SCOPE (do not touch)
`package.json` · `vercel.json` (the cron rider needs NO new cron entry) ·
`.github/workflows/**` · any file under `scripts/` except `verifyGrants.ts` ·
`api/cwf/_lib/replay/**` · `docs/relay/**` except your own report · publishing
any governed row. Sibling lanes this wave own: scripts/checkTenantZero.ts +
harness-honesty files (AG-2), scripts/relayAudit.ts + relay-audit files (AG-3),
frame-forcefit lens files (AG-4). Your diff must not intersect theirs.

## SEAL LAW (S95-1 + Footgun-6 — the wave law, follow it exactly)
NEVER bump docVersion during build. If `npm run check:doc-drift` goes red from
your own new files under the Architecture Map glob: press ONE provisional
reseal as the LAST build commit, message
`chore(seal): PROVISIONAL reseal for CI — DROP AT MERGE`. At your merge turn
(after GO, not before): drop that commit, rebase onto current `origin/master`,
READ docVersion from master, take the next number, `npm run reseal` in the
rebased tree, bump in the SAME commit. If anything asks you to REDRAW the
architecture map: STOP and report. You hold this wave's real seal token —
sibling lanes carry provisional seals only.

## DELIVERY (S91 completeness gate)
- Branch **`phase/tool-behavior-census-1b`** · PUSH to origin · open a **PR
  against master** (CI on the PR head is the sole test arbiter, S37-2).
- Report: **`docs/relay/PHASE-TOOL-BEHAVIOR-CENSUS-1B-report.md`** containing:
  `git diff --name-only origin/master...HEAD` VERBATIM in a fence · what each
  goal shipped, with the birth-proof test named · the partial-coverage
  arithmetic RESTATED with live numbers you computed (mirror read-tool count vs
  census row count on armes — read, never recall) · the two **S63-1
  post-deploy proof reads** stated for the Architect to carry into GO/Operator:
  (i) next cron cycle's `[CensusRefresh]` Vercel log line with `probed>0`,
  (ii) `tool_experience` row count > 0 after one production turn (Operator
  read) · any deviation from this prompt, by name.
- Then **STOP**. No merge without the Architect's GO (which arrives with the
  verbatim merge message and tail anchor). Migration is Operator-applied after
  merge — never by you.

<!-- END · PHASE-TOOL-BEHAVIOR-CENSUS-1B-v1 -->
