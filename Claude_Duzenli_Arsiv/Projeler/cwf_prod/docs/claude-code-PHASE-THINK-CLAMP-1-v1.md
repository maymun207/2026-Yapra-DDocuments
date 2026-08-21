# PHASE THINK-CLAMP-1 — widen the thinking-budget clamp, guard the F105 ratio

<!-- claude-code-PHASE-THINK-CLAMP-1-v1 · rev 1 · 2026-07-14 · Architect: Claude (S44)
     Profile: FULL by the letter (api/** touch) but small — one decl + one resolver guard + tests.
     Owner decision: double the agent.thinkingBudget clamp ceiling (F109). -->

**PLATINUM compliance:** the widened ceiling and the ratio guard are both governed/derived at
runtime from published params — no env, no redeploy to exercise them; the guard is loud, never
silent; zero manual steps.

## 0 · Why

Tonight's A3 pair proved the mechanism twice: thinkingBudget=2048 → reasoning pinned at 2047,
answer self-truncated at 2.8k tokens (incomplete report); published 8192 → reasoning 8188,
answer 10.7k, report complete. Reasoning saturates whatever cap it gets (F109) — the owner wants
headroom: clamp max 8192 → 16384.

**The hidden trap (do not skip):** on the gemini family, reasoning tokens spend from INSIDE the
maxOutputTokens ceiling (the F105 incident trace: output=8188 of an 8192 ceiling, 7846 of it
reasoning). A published thinkingBudget equal to maxOutputTokens re-creates F105 by publish.
The guard below makes that structurally impossible — loudly, never silently.

## 1 · Pre-flight

```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master     # MUST print 905cef2b1541dea78fbd60da76b2b8d664252f5a — else STOP, report
grep -n "THINKING_BUDGET" api/cwf/_lib/knowledge/reference/agentParams.ts
grep -n "thinkingBudget" api/cwf/_lib/knowledge/resolveAgentParams.ts
```
Branch: `think-clamp-1` off master.

## 2 · Changes (exactly these)

1. **Decl (`reference/agentParams.ts`):** `THINKING_BUDGET` max `8_192` → `16_384`. Rewrite the
   decl comment: retire the "half the seeded maxOutputTokens ceiling" static rationale (a
   cross-param claim two independent publishes can break — the F106 lesson) and document the
   RUNTIME guard as the invariant's new home, plus the gemini inside-the-output-ceiling fact
   with the F105 trace reference.
2. **Ratio guard (`resolveAgentParams.ts`):** after both params resolve, the EFFECTIVE
   thinkingBudget = `Math.min(resolved.thinkingBudget, Math.floor(resolved.maxOutputTokens / 2))`.
   When the cap binds, the param's SOURCE tag gains a visible suffix — `<origSource>+capped`
   (e.g. `db+capped`) — so the `[Params]` log line and the configFingerprint stamp both show it.
   NEVER silently: a capped value with an unmarked source is the swallowed-override family
   (S39/S40/CANARY-CAP lineage). The uncapped published value is NOT mutated in the DB — the cap
   is a read-time derivation.
3. **No other file changes** except tests + (if the drift gate demands) a manifest reseal —
   flag the reseal explicitly as in CANARY-CAP-1.

## 3 · Tests

- Decl pin: THINKING_BUDGET max === 16_384.
- Guard math: (thinking 16384, output 16384) → effective 8192, source `db+capped`;
  (thinking 8192, output 32768) → effective 8192, source `db` (no suffix — the cap must not
  fire when slack exists); (thinking 2048 floor, output 16384) → untouched.
- `[Params]` line surfaces the `+capped` suffix (extend the existing paramsLogLine test).
- configFingerprint source stamp carries the suffix (extend the existing test).
- Exact-shape lockstep updates where `ResolvedParams`' behavior is pinned — same discipline
  as OUTPUT-BUDGET-1's tripwire edits.

## 4 · Self-verify + handoff

`git diff --stat` file list = decl + resolver + tests (+ manifest if resealed). Push, open the
PR, report the PR URL — unsharded CI on the head is the arbiter. Architect FAST-GATE review +
verbatim merge message follow at GO. NOTE for the owner (put it in your report verbatim):
*"To actually run thinking at 16384, publish agent.maxOutputTokens=32768 FIRST — the guard
will otherwise cap thinking at half the current output ceiling, loudly."*

<!-- END · claude-code-PHASE-THINK-CLAMP-1-v1 · rev 1 · 2026-07-14 -->
