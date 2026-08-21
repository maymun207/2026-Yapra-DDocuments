# PHASE-STEP-EFFICIENCY-1 · v1 — LANE: AG-2

<!-- 2026-08-08 · S87 · Architect (Opus 5) → AG-2. Rollout 2F.3 (bucket v25 #3).
     Criterion: §10 iç ölçüt (Memp 28.9→22.3 is CONTEXT, never a target here).
     DUAL-LANE SESSION: AG-1 runs PHASE-SEMANTIC-MEMORY-1 in parallel.
     YOUR TERRITORY: `stageStream.ts` flush-side turn_done payload, `scripts/`,
     report tests under `api/cwf/__tests__/`. YOU DO NOT TOUCH
     `memoryDistill.ts`, `memoryRetrieve.ts`, persistence repositories, or any
     migration — that is AG-1's fence. Migrations: ZERO. Operator: ZERO.
     Second merge carries combined reseal + both CHANGELOG entries (GO will
     choreograph). Branch: phase/step-efficiency-1. -->

## §BASE · PROOF FIRST
Fresh worktree; `git rev-parse origin/master` MUST print
`e650f0f4274240e5f88d01c30ca7131cac94d492` (rev 212, 493/5772). Deviation ⇒
STOP. Absolute paths (S80-1). **Compute-not-assert opening read (D-1, yours
to perform):** before writing code, read three days of `turn_done` ledger
rows and REPORT their per-day counts vs `message`-type counts — the funnel
stands on ledger completeness (PHASE-LEDGER-COMPLETE-1 claimed it; you
verify it, we do not assume it). If turn_done coverage is materially
incomplete, STOP-AND-REPORT with the numbers.

## §WHY · MEASUREMENT ONLY — the lens refusal is binding
This phase MEASURES step efficiency and per-stage funnel losses; it changes
NO behaviour, tunes NO knob. The `memoryAbLens` REFUSAL posture applies
verbatim: no counterfactual quality claims, no "efficiency verdict" — the
report prints numbers with their honest absence classes and stops. K5-i
(owner-ratified S87) is the shape: per-stage CONDITIONAL losses over the
turn pipeline (CodeMonkeys funnel pattern). The existing
`[TurnEfficiency]` line (RESULT-BUDGET G3) stays BYTE-IDENTICAL — its "one
line, no new table" clause is honored by carrying the record on the
EXISTING `turn_done` ledger event, additively.

## §G1 · RECORD — additive `turn_done` payload keys (no schema change)
At the flush site that already builds the turn_done insert
(stageStream.ts, payload.kind='turn_done'), add two additive jsonb keys,
every field derived from a NAMED existing ctx source (pin each in a
comment; hand-derivation banned):
```
efficiency: { calls, distinctTools, repeatedCalls, resultChars, storedResults }
  — the FIVE numbers the [TurnEfficiency] line already computes, from the
    same expressions (extract a tiny pure helper both call; the log line's
    bytes do not change).
funnel: {
  frame:     'present' | 'absent'                       — ctx.irFrame != null
  discovery: 'hit' | 'none' | 'not-run'                 — from the discovery/route ctx flag that exists; if none exists, 'not-recorded' (do NOT invent a source; report which)
  tools:     'ok' | 'failed' | 'none'                   — toolLedger calls/failures
  grounding: 'ok' | 'failed' | 'did-not-run'            — outcome.signals.groundingOk true/false/null — null MAPS TO 'did-not-run', never to ok (empty≠zero on a verdict)
  render:    'landed' | 'gap' | 'n/a'                   — landing signals (fetchedNotDrawn / absenceWithoutEnumeration); no viz intent ⇒ 'n/a'
}
```
Every enum carries an explicit honest-absence member; a missing upstream
field becomes its named absence value, never a default-looking success.

## §G2 · REPORT — `npm run report:efficiency`
Script under `scripts/` (its TESTS under `api/cwf/__tests__/` — the vitest
include law), reading `telemetry_events` turn_done rows for a date range:
- **Pagination to exhaustion** — PostgREST caps at 1000 with no truncation
  signal (standing law); page or aggregate SQL-side; a >1000 fixture test
  pins it.
- Output: per-day turn counts · steps-per-turn distribution (calls,
  repeatedCalls) · the K5-i conditional funnel: of turns with
  frame=present, what share reached discovery=hit; of those, tools=ok; of
  those, grounding=ok; of those, render=landed — each stage conditioned on
  the previous, absences reported as their own named rows, never folded
  into failure or success.
- **Reference set pinned BY NAME:** turns `58f1a8b3 · 9d80df71 · 0f4902e5 ·
  3e0e63b0 · e4f20cdb · d5835e62` printed as a labelled block (the S86
  natural session + the S87 witness pair) — the before/after anchor the
  next phases will be judged against.
- Tri-state discipline: a row whose payload lacks the new keys prints
  `not-recorded` (pre-phase rows must be visibly pre-phase).

## §G3 · TESTS (S82-5 · D-5)
Field-derivation truth table (every enum member reachable; groundingOk=null
⇒ 'did-not-run' pinned) · shared-helper pin (log line bytes unchanged —
snapshot) · funnel conditional math pins · pagination >1000 pin ·
not-recorded pin · mutation both directions: (a) map null grounding to
'ok' ⇒ truth-table reds; (b) drop pagination loop ⇒ >1000 fixture reds.
**Span-card declaration (standing S87 discipline): expected report line
"yeni span: yok".**

## §CI · §REPORT · STOP
Five gates green (canary per S86-2 if it runs). Report:
`docs/relay/PHASE-STEP-EFFICIENCY-1-report.md` — §BASE verbatim INCLUDING
the ledger-completeness opening read numbers, per-gate diffs, both mutation
runs, a SAMPLE report run over the last 3 days pasted in full, span line,
falsification check (can the funnel print success for an absent stage?),
push branch, STOP for RULE-25 + GO. Merge `--no-ff --cleanup=strip`.

<!-- END · PHASE-STEP-EFFICIENCY-1 · v1 -->
