# PHASE-PLANNER-0-FIX-1 · v2 — the armor keeps the word, and the gate earns its jurisdiction

<!-- PHASE-PLANNER-0-FIX-1-v2 · 2026-08-09 · S89 · Architect → AG-1.
     SUPERSEDES v1 (S37-1) — v1 was never relayed; build from THIS file only.
     What changed v1→v2: the owner ratified FOUR rulings this session and all
     four are now load-bearing pins: (K1) BEYAN capture · (KY) the
     GATE-JURISDICTION LAW, four articles · (K3) FULL-FAN persistence, token
     brake is the ONLY brake · discipline lines ride with routine seeds.
     Plus: STEP A of v1 (the owed merge report) is already PAID (`a8fd8db` +
     `fe06ed6` correction) — no STEP A here.
     Branch: phase/planner-0-fix-1 · base = origin/master. -->

## PRECONDITION
```
git fetch origin && git rev-parse origin/master
```
Expected `fe06ed6efd2a69d8c6d685ef36605db9a7501820`, or a docs-only descendant
(prove with `git diff --stat fe06ed6..origin/master` — relay files only).
Code-bearing drift: STOP, report.

## THE WITNESS (canonical fixture — Architect-read from live telemetry, S89)
User: "Granit fabrikası için son 7 günün doğalgaz tüketimini getirir misin?"
(fresh conversation; cachedInputTokens=0; historyTrimmedChars=0).
- `ir_frame`: `QUERY_METRIC / FACTORY / metrics:[] / drops:{metrics:1} /
  entity_ref:["Granit fabrikası"] / time:"son 7 günün" / HIGH` — the classifier
  DID emit the metric word; `armorIrFrame` (irFrame.ts:87) dropped it and
  recorded only a COUNT.
- `turn_done.planner`: `{mode:live, plan:true, steps:5, replans:1,
  template:"routine"}` — plan rode routine-seeded; the drift gate fired ONCE.
- One search_tools call (ok, 628 chars) → finishReason=stop → capability
  denial ("yeteneğim bulunmamaktadır").

Defects (owner-adjudicated this session):
**D1** the gate judged a plan-COMPLIANT call off-frame — plan step 1 orders a
metric-word-only search with NO entity in the string; the gate's evidence was
entity∪metrics with metrics empty-by-drop, so obeying the plan was the ONLY
way to look off-frame. **D2** the armor had the word in hand and destroyed it.
**D3** the routine seed displaced the floor's search discipline entirely.
**D4 (owner law)** the gate held no admissible evidence yet judged anyway —
başıbozuk bekçi.

## THE FOUR RULINGS (verbatim pins — violating any is STOP-FOR-REVIEW)
**K1 · BEYAN (owner: "beyan yakalama onaylıyorum").** Out-of-vocabulary metric
words are CAPTURED, not destroyed: per-turn, from the user's own sentence,
`time.surface` polarity — recorded free text, never interpreted, never
enum-checked, never a maintained list.
**KY · GATE-JURISDICTION LAW (owner-ratified, four articles).** Every
enforcing/nudging gate: (1) NAMES its evidence preconditions at its definition
site; (2) VERIFIES that evidence exists before judging; (3) with no evidence,
does NOT judge — no nudge, no block; (4) **silence is RECORDED** — "yetkim
yoktu" and "baktım, temizdi" are two different visible statements
(empty≠zero applied to gates).
**K3 · FULL-FAN persistence (owner: "dibine kadar; token count'a takılır en
kötüsü").** The plan's search fan runs to exhaustion — TR word → EN/synonym →
flat-backend parameter probe — before an honest "bulamadım". NO second
attempt-counter organ exists or is added; the turn token brake is the ONLY
brake. The law is "denemeden pes etme", not "asla pes etme".
**Discipline-with-routine.** The floor's search-discipline lines are LAW
lines, not steps: on a routine-seeded plan they ride AFTER the verbatim
routine steps, before `PLAN_REPLAN_LAW`.

## BUILD
1. **`routing/irFrame.ts`** — `armorIrFrame` RETAINS what it drops:
   `IrFrame.metricsSurface: string[]` = out-of-vocab metric strings,
   element-wise, order preserved, SET-deduped, trimmed, empties discarded;
   in-vocab entries NOT duplicated into it. `drops.metrics` arithmetic
   byte-identical to pre-fix (observability continuity with the S89 witness
   row). Absent/invalid raw ⇒ `[]`.
2. **`turn/planner.ts`** —
   a. Union everywhere a metric word is consumed: `frameEchoLine`, the metric
      slot of `PLAN_SLOTS`, template anchor wording, `frameTokens` ⇒ all read
      `metrics ∪ metricsSurface` (vocab first, surface after, dedup).
   b. **Jurisdiction (KY):** define the gate's evidence at its definition
      site — a doc block naming the law + `export function gateEvidence(frame)`
      returning the admissible token set (`metrics ∪ metricsSurface ∪
      entity_ref`, normalized). `makeIsFrameToken` (planner.ts:389) becomes
      jurisdiction-aware: empty evidence ⇒ the gate returns NO-JURISDICTION
      and the nudge path is structurally unreachable (article 3). The nudge
      fires only under jurisdiction AND zero evidence-token contact.
   c. **Recorded silence (article 4):** the `[Planner]` line gains
      `gate=<active|no-jurisdiction>`; `turn_done.planner` gains additive
      `gate: 'active'|'no-jurisdiction'` and keeps `replans`. A
      no-jurisdiction turn logs `replan=0 gate=no-jurisdiction` — visibly
      distinct from "watched, clean" (`replan=0 gate=active`).
   d. **Bench contract (AG-2 consumes this EXACT export — do not rename):**
      `export function judgeGateStep(frame: IrFrame | null, argsJson: string):
      { verdict: 'on-frame' | 'off-frame' | 'no-jurisdiction';
        matchedToken?: string; evidence: string[] }`
      — pure, deterministic, the SINGLE implementation the runtime nudge path
      also calls (ONE-ORGAN: the bench must exercise production bytes, so the
      runtime must route through this same function).
   e. **K3 in the floor:** QUERY_METRIC floor step text mandates the full fan
      explicitly (TR word alone → its EN/synonym → flat-backend parameter
      probe → only then honest not-found); no counters, no new params.
   f. **Discipline-with-routine (D3):** routine-seeded compose = routine steps
      verbatim → discipline LAW lines → `PLAN_REPLAN_LAW`.
3. Tests/types only as required. Telemetry SHAPE additive-only.

## GATES (D-5 both directions; witness turn = canonical fixture)
G1 · Armor: out-of-vocab retained verbatim; in-vocab not duplicated; drops
     byte-identical on identical input; REVERSE: pre-fix armor reds the
     retention assertion.
G2 · Compose union: witness frame ⇒ echo contains `doğalgaz`, metric slot
     present, anchor references the surface word; vocab+surface frames union
     both; determinism pins byte-stable.
G3 · Jurisdiction: (i) witness fixture post-fix ⇒ evidence non-empty, the
     single `doğalgaz` search arg is ON-frame, ZERO nudges; (ii) a frame with
     no metrics, no surface, no entities ⇒ `no-jurisdiction`, nudge
     structurally silent, chip records it; REVERSE: evidence present + args
     touching nothing ⇒ exactly one nudge (`gate=active replan=1`).
G4 · judgeGateStep: table-driven — on-frame names `matchedToken`; off-frame
     returns full `evidence`; no-jurisdiction returns `evidence:[]`; runtime
     nudge path PROVEN (test) to call judgeGateStep, not a twin.
G5 · Routine+discipline: routine steps verbatim first AND law lines after;
     REVERSE: steps-only compose reds; template-seeded compose unchanged
     except G2's union.
G6 · Fan text: QUERY_METRIC floor contains the three fan stages in order and
     NO attempt-counter vocabulary; grep-pinned.
G7 · All existing byte-identity pins (frameless / enabled=0 / absent-param /
     non-turn callers) pass untouched.

## CI + REPORT (STOP-FOR-REVIEW; do NOT merge)
lint · typecheck:api · build · full test (exact arithmetic over the master
baseline you read — state it) · check:doc-drift worktree AND CI=1 head ·
check:tenant-zero (witness word in TESTS via split-fragment fixtures, the
established lens-safe pattern). Push branch +
`docs/relay/PHASE-PLANNER-0-FIX-1-report.md`: per-gate test names · the
witness-fixture compose VERBATIM (echo line + discipline lines visible) · a
judgeGateStep verdict table for the three G3 cases · diffstat · PR-head CI
run id by CONCLUSION · deviations named. New spans: expected "yeni span: yok".
S88-1: AG-2 is building the BENCH against the judgeGateStep contract above;
merges are SEQUENCED at GO time — yours lands FIRST. Do not touch
`src/**` or `api/admin/**`.

<!-- END · PHASE-PLANNER-0-FIX-1-v2 -->
