# PHASE-PLANNER-0 · v1 — the decision layer: frame→plan binding + re-plan gate

<!-- PHASE-PLANNER-0-v1 · 2026-08-09 · S89 · Architect: Claude (Opus 5) → AG.
     ONE self-contained relay (D-2). Design authority: cwf-design-PLANNER-0-v1
     (owner-visible; its pins are restated here in full — you need no other file).
     Branch: phase/planner-0 · base = origin/master, EQUALITY PROVEN (S82-4). -->

## PRECONDITION (S47-1) — verify, do not assume
```
git rev-parse origin/master        # MUST print 19e84206eb84a8f… (…3c25e0a5afb6d8179cff)
git log -1 --pretty=%s origin/master   # "docs(relay): the MERGE report for CHART-SERIES-IDENTITY-1 …"
```
If either differs: STOP, report, wait. docVersion on master reads **rev 217**.
Suite baseline **500 files / 5986 tests** (CI-arbitrated, run 31289369079).

## WHY (the byte diagnosis you are fixing — trace `af5dbe5f`, read live S89)
Frame extraction was PERFECT (`QUERY_METRIC/FACTORY/[oee]/"Granit fabrikası"/
"son 8 günün"/HIGH`, drops 0/0/0) and the model still spent all 12 calls
(2 distinct tools, 10 repeats) chasing the PREVIOUS turn's doğalgaz subject
until `burst_guard_turn_tokens` fired at 316,552 (217,232 of it CACHED history;
this turn's results were only 17,315 chars). The funnel read green on all five
fields because **no gate compares the trajectory to the frame, and the model
receives zero forward guidance when no routine matches** (`procedureRulesRetrieved:0`).
You are building the missing decision layer — deterministic, additive, advisory.

## HARD PINS (violating any one is a STOP-FOR-REVIEW)
P1 · **No new LLM call.** Plan structure = deterministic code over `ctx.irFrame`;
     plan text = governed rows over a tenant-zero code floor. ONE planner organ
     (A23 will extend it; never build a second decision center).
P2 · **Byte-identity when inert.** `irFrame == null` ⇒ zero plan bytes ⇒ the
     composed messages are byte-identical to today (test-pinned). Gateway callers
     that do not pass the new params are byte-identical (absent-param posture —
     the BurstGuard `stopWhen` precedent).
P3 · **Cache-prefix law.** The plan block rides the USER message as the FOURTH
     self-delimited block on `ctx.memorySliceBlock` (after episodic → routine →
     dossier; `memoryRetrieve.ts:553-557` join, `stagesModel.ts:226-243` compose).
     NEVER into the system prompt.
P4 · **Advisory only (ADR-001/ADR-012).** The re-plan gate ADDS one reminder
     message at most `planner.replanNudgeMax` times; it never rewrites args,
     never blocks a call, fails OPEN on any doubt. Label the valve POLICY at its
     definition site (R-1).
P5 · **No contact:** gateway protocol rules (P6.7-A/P6.8 stand) · eval-gate ·
     `messages` writes (C1) · `router.frameRouting` (stays dark; you READ the
     frame, you do not flip routing) · `COMMAND` action gets NO floor template
     (ADR-011 posture).
P6 · **Tenant-zero floor.** The code-floor templates carry STRUCTURE only —
     no Kale/KB7 vocabulary, no domain nouns, no metric synonym lists in code.
     Domain vocabulary is DATA (governed rows; the machine-v5 boundary).
     `check:tenant-zero` must pass with zero new exclusions.

## STEP 0 — INSTALLED-TYPE VERIFICATION (the S82 repairToolCall pattern)
Before writing code: `npm ci`, then prove in the INSTALLED `ai@^6.0.184` types
that `streamText` accepts a per-step preparation hook (`prepareStep`) able to
prepend/inject a message (or equivalent per-step messages control) for the NEXT
step. Paste the type excerpt into the report. If the hook does not exist in the
installed types: the nudge degrades to OBSERVE-ONLY (accounting via
`onStepFinish`; chip still reports `replan=…` with `mode=dark`) — say so in the
report and proceed; do NOT upgrade `ai`.

## BUILD — file map (create/touch ONLY these; anything else = report first)
1. **`api/cwf/_lib/turn/planner.ts` (NEW)** —
   `derivePlan(frame: IrFrame|null, routine: OfferedRoutine|null): TurnPlan|null`
   (routine ⇒ plan seed: its steps verbatim + framing/re-plan lines from the
   floor; else template by EXACT `frame.action`; slots `{entity_ref}` `{metrics}`
   `{time.surface}` — missing slot ⇒ slot line omitted, never a placeholder);
   `composePlanBlock(plan): string` with delimiters
   `[PLAN — başlangıç] / [PLAN — son]`, first line the FRAME ECHO
   (`Konu: <action>/<object> · <entities> · <metrics> · <time>`), last line the
   re-plan law sentence; deterministic ordering throughout (the
   `composeRoutineBlock` discipline). Export `PLAN_BEGIN/PLAN_END` consts.
2. **Floor templates** — in `planner.ts` (or a sibling `plannerFloor.ts`):
   one per action in {QUERY_METRIC, QUERY_STATUS, QUERY_EVENTS, QUERY_MASTER,
   COMPARE}. QUERY_METRIC floor MUST encode, generically: single-core-token
   search of the METRIC word · cross-language/synonym fan of that word ·
   never append entity names to the search string · entity filtering
   client-side over the result list · on empty BI surface, probe the flat
   backend's parameter tools · answer the frame's named subject.
3. **Governed kind** — `kinds.ts`: register SOFT kind
   `SYSTEM_KIND_IDS.PLAN_TEMPLATE = 'system.plan_template'` (locked:false,
   SOFT class like routing_hint), payload `{steps: string[]}` (+ optional
   `note`); read path DB-first over the floor with ABSENCE-ONLY self-seed
   (the `routingHints.ts`/selfSeedReconciler precedent — a human row is never
   overwritten). **ZERO migrations** (`domain_rules` is generic).
4. **Wire the block** — `memoryRetrieve.ts`: extend the outcome join to
   `[episodic, routine, dossier, plan]`; extend the ONE `[Memory]`/`[Planner]`
   logging as below. `stagesModel.ts` untouched except that the block arrives
   via the SAME `ctx.memorySliceBlock` (P3 ⇒ likely zero diff there; if a diff
   is needed, justify in the report).
5. **Gateway hook (additive)** — `llm/gateway.ts`: optional params
   `{plannerNudge?: {frameEchoLine: string, maxNudges: number,
   isFrameToken(argsJson: string): boolean}}`; when present AND STEP-0 proved
   the hook: from step 2 on, if NO tool call so far satisfied
   `isFrameToken(stringifiedArgs)`, inject ONE reminder
   (`frameEchoLine + ' — plana dön.'`), at most `maxNudges` per turn.
   Normalization for `isFrameToken` lives in `planner.ts` (lowercase,
   diacritic-fold, substring over entity_ref+metrics tokens ≥3 chars) — the
   gateway stays dumb.
6. **Params (L1 `agentParams`)** — `planner.enabled` (boolean, floor **1**;
   0 ⇒ derivePlan returns null ⇒ P2 byte-identity) ·
   `planner.replanNudgeMax` (int, floor 1, clamp [0,2]) ·
   `turn.historyCharBudgetPerMessage` (int, floor 24000, clamp [4000,120000]).
7. **History budget** — `stagesModel.ts:234` map: any HISTORY message whose
   content exceeds the budget is MIDDLE-truncated to budget with marker
   `[... geçmiş mesaj kırpıldı: N karakter — tam içerik ekranda ...]`
   (N = omitted count, exact). Current message, memory blocks, system prompt:
   NEVER. Additive `efficiency.historyTrimmedChars` in `turn_done`.
8. **Telemetry/logs** — ONE new console line per turn (never two):
   `[Planner] plan=<0|1> template=<key|routine|none> steps=<n> replan=<n> mode=<live|dark>`;
   additive `turn_done.planner = {plan, template, replans, historyTrimmedChars?}`;
   gateway span attrs for the nudge (FULL-TRACE: the plan block itself is span
   I/O at the compose site).

## GATES (each = code + test(s); D-5 both directions where it applies)
G1 · Frameless turn ⇒ byte-identical composed messages (snapshot pin) AND
     `planner.enabled=0` ⇒ same pin (two inert paths, one truth).
G2 · Template selection EXACT on action; unknown/COMMAND ⇒ null; routine
     present ⇒ routine steps verbatim in the block (seed law).
G3 · Slot instantiation deterministic; missing slots omitted; block ordering
     stable across runs (sort/tie-break pinned).
G4 · Nudge fires on the `af5dbe5f` SHAPE (fixture: frame with oee/Granit
     tokens; 12 args none matching) exactly once with maxNudges=1 — and D-5
     reverse: same fixture with ONE on-frame call ⇒ silent; maxNudges=0 ⇒
     silent with `replan=0`.
G5 · History budget: boundary (== budget ⇒ untouched), over-budget ⇒ marker
     with EXACT omitted N, current-message immunity, memory-block immunity.
G6 · `check:tenant-zero` green over the new floor (zero exclusions added);
     grep the floor file for the eight tokens in the test itself (positive
     control: seed a fake tenant token in a fixture copy and show the check
     RED — S66-1).
G7 · Gateway absent-param byte-identity: existing gateway tests pass untouched;
     one new test proves `prepareStep` absent ⇒ options object deep-equals
     pre-phase shape.

## CI + REPORT (STOP-FOR-REVIEW; do NOT merge)
Run lint · typecheck:api · build · full `npm test` · `check:doc-drift`
(worktree AND CI=1 head) · `check:tenant-zero`. Push `phase/planner-0` +
`docs/relay/PHASE-PLANNER-0-report.md`: STEP-0 type excerpt · file-by-file
diffstat · every gate's test name(s) · suite arithmetic (500/5986 + yours,
additive, per S37-2 the PR-head CI run id read by CONCLUSION with the
"eval-canary skipped-by-design" wording, not "5/5") · the exact composed plan
block for the af5dbe5f fixture (verbatim) · any deviation from this file,
named. New spans: declare the stage-card bucket for anything new
("yeni span: yok" satisfies it). The Architect reviews from a fresh clone
(RULE-25) and issues GO with the merge message; migrations: NONE, Operator:
NONE, publishes: NONE in-phase (A1 hint archive is POST-merge, owner-hand,
in the GO block).

<!-- END · PHASE-PLANNER-0-v1 -->
