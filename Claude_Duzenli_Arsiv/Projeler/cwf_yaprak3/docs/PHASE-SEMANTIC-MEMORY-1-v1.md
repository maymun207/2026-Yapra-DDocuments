# PHASE-SEMANTIC-MEMORY-1 · v1 — LANE: AG-1

<!-- 2026-08-08 · S87 · Architect (Opus 5) → AG-1. Rollout 2F.2 (bucket v25 #2,
     owner trigger fired this session). Criterion: LongMemEval · Gaia2.
     DUAL-LANE SESSION: AG-2 runs PHASE-STEP-EFFICIENCY-1 in parallel.
     YOUR TERRITORY: memory organ files + ONE migration. YOU DO NOT TOUCH
     `stageStream.ts`, `scripts/`, or any efficiency/telemetry surface — that is
     AG-2's fence. Merge order is choreographed at GO; the SECOND merge carries
     the combined-tree reseal + both CHANGELOG entries (S86 double-merge pattern).
     Branch: phase/semantic-memory-1. Migrations: ONE (Operator-applied,
     ADR-005 `supabase db push` only). -->

## §BASE · PROOF FIRST
Fresh worktree from origin/master; `git rev-parse origin/master` MUST print
`e650f0f4274240e5f88d01c30ca7131cac94d492` (docVersion rev 212, suite 493/5772).
Deviation ⇒ STOP-AND-REPORT. Absolute paths (S80-1). Targeted-run fallback
legitimate if declared; merge arbiter stays unsharded CI (S37-2).

## §WHY · THE DESIGN, EMBEDDED — and the ONE-ORGAN contract (this section IS
the "ortak tasarım notu" the bucket demands; GRAPH-KB-1 builds on it later)

The memory organ now has an episodic layer (1A/1B) and a procedural layer
(2F.1, merged `af53fbc`, witnessed). What is missing is the SEMANTIC layer:
durable, entity-centred knowledge about how THIS user works — which entities
they return to, under which frames, with which proven chains. Today
`episodes.entities` carries raw surfaces only (`memoryDistill.ts:236`), so
every turn rediscovers the user's world from keyword overlap.

**THE ONE-ORGAN CONTRACT (binding on GRAPH-KB-1 / 2D.3):**
1. **One identity space.** Entity identity = the canonical key
   `{backendId, layer, externalId}` where resolvable against the discovered
   mirror (`entity_registry`, ADR-009 v1_1 — descriptor-driven, zero
   per-backend literals), and `{surface}` where not. ONE resolver module owns
   this mapping; both the user-semantic store (this phase) and the tenant
   graph store (GRAPH-KB-1) import it. Nobody else re-implements matching
   (JOIN LAW: name-only matching stays forbidden; parent guard rides the
   resolver where layers require it).
2. **Two tables, one schema shape.** User-private facts and tenant graph are
   SEPARATE TABLES — the synthetic/real precedent is law: a privacy split is
   a table boundary, never a field. GRAPH-KB-1 later adds the tenant table +
   edges over the SAME identity space; it does not touch this phase's table.
3. **Memory changes what the agent FINDS, never what it KNOWS** (M-MEM2,
   byte-intact): no grounding imports, no knowledge-warm writes, dossier
   text framed as retrieval hint, never data.

**Deterministic v1, named exclusion (D-7 Q7):** v1 facts are OBSERVED-USAGE
aggregates — computable at flush from ctx alone, no LLM call, no new failure
class. LLM-extracted assertion facts ("user said X means Y") are EXCLUDED BY
NAME: they need their own eligibility, cost fence and judge; re-entry =
`SEMANTIC-MEMORY-2`, trigger = a measured dossier-recall gap after
STEP-EFFICIENCY-1's funnel exists (measurement-gated, not convenience-
deferred; the LongMemEval criterion this phase advances is proven by the
dossier layer itself).

## §G1 · STORE — ONE migration: `semantic_memory`
Columns: `id uuid pk` · `user_id uuid not null` · `entity_key jsonb not null`
(the resolver's output verbatim: canonical or surface form) ·
`entity_surface text not null` (display) · `stats jsonb not null`
(`{turns, firstSeen, lastSeen, frames: {"ACTION/OBJECT": count}, timeKeys:
{"last_3_days": count}, procedureTurnIds: [≤3 newest]}`) · `created_at` ·
`updated_at`. Unique `(user_id, entity_key)`. RLS: owner-only, the episodes
posture verbatim. SECURITY STANDING RULE applies in-phase: revoke from
public+anon+authenticated explicitly, a verifyGrants probe row, and a CI
coverage test — three-way classified (42501=PASS / no-error=LEAK /
other=INCONCLUSIVE-fail), never silent-green.

## §G2 · WRITE — deterministic upsert at flush
In the existing flush `allSettled` (chat.ts seam), AFTER episode distill:
for each surface in the turn's `frame.entity_ref`, resolve via the organ
resolver, upsert the dossier row (increment counters, merge frame/timeKey
histograms, append procedure turnId when `decision.procedure` was written).
**Eligibility = the 2F.1 SUCCESS-ONLY conjunction verbatim** (import the
same predicate; do not restate it — one definition, two callers). Ineligible
turn ⇒ zero semantic writes (honest absence). `[MemoryWrite]` line gains
` semantic=N` (same line, one more field). No raw payloads, no asked text
beyond the surface itself.

## §G3 · READ — the [VARLIK BELLEĞİ] block
In `retrieveMemory`, one NEW bounded read: `semantic_memory` by
`(user_id, entity_key)` for the CURRENT frame's resolved refs, k≤2, only
when `ctx.irFrame` exists (no frame ⇒ no read ⇒ no block). Compose a third
delimited block after the routine block:
`[VARLIK BELLEĞİ — başlangıç/son]`, ≤2 lines, each
`- «surface» · N tur · son: <date> · sık çerçeve: ACTION/OBJECT · sık zaman: <key>`,
lead sentence: "Bu kullanıcının geçmiş etkileşim istatistikleri (bağlam
ipucudur; veri kaynağı DEĞİLDİR)". Kill-switch shared: `retrievalTopK` 0 ⇒
this read never happens. `[Memory]` line gains ` dossier=N`. SSE payload
gains `dossierOffered` beside `routineOffered` (additive; no new chip
state). Tenant-zero: block literals carry ZERO tenant vocabulary.

## §G4 · TESTS (S82-5 real seams · D-5 both directions)
Resolver contract table (canonical hit / surface fallback / parent-guard
case) shared-module pinned so GRAPH-KB-1 inherits it · eligibility-import
pin (deleting one conjunct in the SHARED predicate reds BOTH 2F.1 and this
phase's tables — quote both) · upsert math pins (histogram merge, ≤3
procedure ids, idempotent re-upsert) · RLS three-way probe · block compose
pin + honest-absence pins (no frame / no rows / switch-0) · isolation grep
extension · mutation controls: (a) drop eligibility ⇒ truth-table reds,
(b) drop key match in read ⇒ mismatch test reds. **Span-card declaration
(standing S87 discipline): list every NEW span this phase creates and its
card bucket `00–14` in the report — expected line: "yeni span: yok".**

## §OPERATOR (relayed by the owner AFTER your report, before GO)
ONE migration file, FENCE-first ordering, idempotence probe, verifyGrants
run — Operator applies via `supabase db push` only; you never apply it.

## §CI · §REPORT · STOP
Five gates green (canary read per S86-2 if it runs). Report:
`docs/relay/PHASE-SEMANTIC-MEMORY-1-report.md` — §BASE verbatim, per-gate
diffs file:line, both mutation runs, resolver-contract evidence, RLS probe
output, span declaration line, falsification check (can any test offer a
dossier from an ineligible turn?), push branch, then STOP for Architect
RULE-25 review + GO. Merge will be `--no-ff --cleanup=strip`.

<!-- END · PHASE-SEMANTIC-MEMORY-1 · v1 -->
