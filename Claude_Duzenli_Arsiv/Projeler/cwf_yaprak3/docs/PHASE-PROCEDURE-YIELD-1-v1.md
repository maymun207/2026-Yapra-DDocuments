# PHASE-PROCEDURE-YIELD-1 · v1 — LANE: AG-1 — a routine must have CAUGHT something

<!-- 2026-08-08 · S87 · Architect → AG-1. 2F.1-FIX, owner-approved this session.
     Born from F-S87-4, witnessed live TODAY: turns e0751b56/1103c5a8 searched,
     found ZERO everywhere, declined honestly — every detector green — and their
     blind chains were distilled as "proven routines" and OFFERED to the next
     turn (routine=1 on 1103c5a8). A routine that caught nothing teaches nothing.
     Second defect, same rows: gateway turns record WRAPPER names only
     (search_tools/call_tool ×N) — a chain with no inner names carries no signal.
     DUAL-LANE: AG-2 runs PHASE-READY-EDIT-TRUTH-1 (admin-UI). YOUR territory:
     turn pipeline (memoryDistill/memoryRetrieve/toolResult/stageTools) + tests.
     DO NOT touch src/components/admin/** or api/admin/**. Second merge carries
     combined reseal + both CHANGELOGs (S87 pattern, third time today).
     Branch: phase/procedure-yield-1. Migrations: ZERO. Operator: ZERO. -->

## §BASE
Fresh worktree; `git rev-parse origin/master` MUST print
`4b828993985ce461cfb5f232865fe4fe75e07c9a` (rev 214; suite base = the master
run's count — record it verbatim from your baseline run). Absolute paths.
Deviation ⇒ STOP.

## §G1 · THE YIELD SIGNAL — computed where the counts already exist
D-1 in-phase: the per-result element/record counts are computed at the
`[ToolResult]` log site (`api/cwf/_lib/toolResult.ts:~438` family). Add a tiny
ctx accumulator there — `ctx.toolYield = { resultsWithRecords: number }` —
incremented when a result's parsed count (`records`/`elements`/`total`) is
**> 0**. Pin the exact source expressions in comments (computed-not-asserted);
an envelope whose count is 0 or unparseable increments NOTHING (empty≠zero —
a JSON envelope of an empty list is not yield). No behavior change anywhere
else; this is a counter.

## §G2 · ELIGIBILITY GAINS THE YIELD CONJUNCT — one definition, all callers
`procedureEligible` (the SHARED predicate — 2F.1 and SEMANTIC-MEMORY both call
it) gains: `&& (ctx.toolYield?.resultsWithRecords ?? 0) > 0 || <viz landed>`
where `<viz landed>` = the landing-signals read the funnel already uses
(`fetchedNotDrawn === false && carriesVizMacro`-equivalent — reuse the ONE
existing derivation, do not re-implement; if the clean reuse is the funnel
helper, import it). Truth-table rows for the new conjunct both ways: a
zero-yield-all-green turn (today's e0751b56 shape, trace named in the test)
is INELIGIBLE; a landed-chart turn with records is ELIGIBLE. NOTE the
deliberate consequence and pin it: **zero-yield turns now also write no
semantic dossier delta** (the shared predicate gates both) — that is intended:
"hat bazında"-class junk dossiers die at the same door.

## §G3 · GATEWAY INNER NAMES + THE v2 RETIREMENT
1. `distillProcedure` steps: when `toolName === 'call_tool'` and the scrubbed
   args carry `name`, the step records `gateway:<innerName>` (e.g.
   `gateway:list_charts`); `search_tools` stays itself. No raw payloads —
   the inner NAME only, already client-visible via SSE.
2. Bump `procedure.v` to **2**. `selectRoutine` offers **only `v >= 2`** —
   today's two poisoned v1 routines (and every pre-fix row) retire silently,
   no deletion, no migration, no Operator. Pin both directions: a v1 row is
   never offered; a v2 row is.

## §G4 · TESTS (S82-5 · D-5)
Yield accumulator pins (count>0 increments; 0/unparseable doesn't) ·
eligibility truth table extension (both new rows) · shared-predicate coupling
pin re-quoted (one deleted conjunct reds procedure AND semantic tables) ·
inner-name pin (`gateway:list_charts` appears; raw args don't) · v-filter pin
both ways · compose pin updated if the routine line renders inner names ·
mutation controls: (a) drop the yield conjunct ⇒ e0751b56-shape test reds;
(b) drop the v-filter ⇒ v1-offered test reds. Span declaration: expected
"yeni span: yok". `[MemoryWrite]`/`[Memory]` lines unchanged in shape.

## §CI · §REPORT · STOP
Five gates; canary per S86-2 if it runs. Report
`docs/relay/PHASE-PROCEDURE-YIELD-1-report.md`: §BASE verbatim · per-gate
diffs · both mutations · the e0751b56/1103c5a8 fixture assertions quoted ·
falsification check (can a zero-yield turn still distill?) · push · STOP for
RULE-25 + GO. Merge `--no-ff --cleanup=strip`.

<!-- END · PHASE-PROCEDURE-YIELD-1 · v1 -->
