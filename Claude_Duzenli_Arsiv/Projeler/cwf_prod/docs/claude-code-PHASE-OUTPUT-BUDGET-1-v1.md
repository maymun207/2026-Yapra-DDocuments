# PHASE `OUTPUT-BUDGET-1` — the answer stops starving for the thought (F105)

<!-- claude-code-PHASE-OUTPUT-BUDGET-1-v1 · rev 1 · 2026-07-14 · S43 finale, parallel with
     the first live golden run. Branch `output-budget-1` from origin/master. FAST-GATE
     review · NO migration · CI-green = merge precondition.
     PLATINUM: both knobs are governed L1 params (DB-first, floor fallback, clamped,
     admin-tweakable by CHOICE) — zero redeploys, zero owner steps; AG runs the seed
     itself post-merge (S43-4; interim until SELF-SEED-1).
     EVIDENCE (trace 0cfc7efd, 2026-07-14 16:50): [LLMFinish] finishReason=length
     output=8188 reasoning=7846 — gemini-2.5-flash spent 96% of the output ceiling on
     internal reasoning; the A3 answer truncated mid-table. -->

## 1 · BINDING CONSTRAINTS
1. Two new L1 params in the EXISTING `agent.param` lane (registry + fieldSpec + seed +
   clamp + `source:db|floor` stamping — mirror `agent.maxToolRounds`, the family's latest):
   - `agent.maxOutputTokens` — seed **16384**, clamp **[4096, 65536]**.
   - `agent.thinkingBudget` — seed **2048**, clamp **[0, 8192]**; applied ONLY where the
     provider supports it (gemini `thinkingConfig.thinkingBudget`); others ignore it
     SILENTLY-gracefully (no warning spam).
2. Gateway applies both per-call. `[Params]` log line + the OTel span + telemetry stamp
   gain both keys with their sources (PARAM-GOV-1 pattern, byte-consistent).
3. `finishReason` lands in telemetry (if not already) and `finishReason=length` upgrades
   the `[LLMFinish]` line with a visible `TRUNCATED` marker — born loud, greppable.
4. NO retry/behavior logic this phase — OBS-3 machinery untouched (a length-retry is a
   separate future decision, not smuggled in here).
5. Eval-gate untouched · C1 · no migration · seeds via `npm run seed:agent-params`
   (AG-executed post-merge, S43-4; paste both runs — second must be `0 inserted`).

## 2 · TESTS (RED-first where marked)
- Params resolve DB-first with code floor when absent; clamps enforced.
- Gemini path carries `thinkingConfig.thinkingBudget` + `maxOutputTokens` (fixture call
  shape assert); anthropic/openai paths unchanged byte-shape except maxOutputTokens.
- RED-first: a `finishReason=length` fixture → telemetry field present + `TRUNCATED`
  marker in the log line (absent on anchor).
- `[Params]` line includes both new keys with sources.

## 3 · SELF-VERIFY (paste)
Anchor/branch/PR/CI · empty-diff on gate & OBS-3 files · test outputs · both seed runs ·
sample `[Params]` + `TRUNCATED` lines from a local fixture run · tsc/typecheck/drift(reseal
if a mapped file moved — S34-1 budget).

## 4 · MERGE (verbatim, after CI green + Architect GO)
`git merge --no-ff output-budget-1 -m "Merge OUTPUT-BUDGET-1: the answer stops starving for the thought"`

<!-- END · claude-code-PHASE-OUTPUT-BUDGET-1-v1 · rev 1 · 2026-07-14 -->
