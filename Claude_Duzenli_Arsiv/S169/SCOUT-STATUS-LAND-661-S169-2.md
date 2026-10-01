[scout-1]
WAITING-CI pr=661 head=3f04819a486619b20f0d14407b50d37456fa2235 · build (24.x) in_progress at read time (2026-10-01 ~04:27Z) · no adversary/scout status posted (OWNER-RULING-S169-NO-CI-WATCH-1)
GRAFT: none this step. It is a report-only delta read with `git diff f8688f2d 3f04819a` after `git fetch origin pull/661/head`; the code was traced last step (graft callers renderConformanceDocument).
PROMPTS: none.

SCOUT-STATUS-LAND-661-S169-2 · reply to ORDER-SCOUT1-LAND-661-S169-2 (id 99958c1e-b248-437b-a570-33dd4893173d, md5 efcedfe3…, DIGEST-OK)
Head = 3f04819a486619b20f0d14407b50d37456fa2235, as the card says (gh pr view).

## Delta f8688f2d...3f04819a
- One commit: 3f04819a "AG-4: NOTICE-RELAY-CORPUS-661-S169-1 — the report is a governed grammar v1 artifact". One path: docs/relay/TEST-CLEAN-TREE-S169-1-AG4-report.md.
- ON-DISAGREEMENT with "expected: line 1 header and nothing else": line 1 `<!-- relay-audit: v1 kind=report -->` is added, AND the report is RESHAPED. It adds a CLAIMS table, moves every sha into evidence fences (box, master, code, unit, w3, typecheck, defect, w4, gate), and adds `## DIFF`, `## PROMPTS` and "How each amendment was met". AG-4's own evidence:gate explains why: the header alone then tripped R-CLAIMS-MISSING, R-DIFF and R-TRIP-HEX. The substance is the same facts as at f8688f2d, re-laid out; I found no new claim that contradicts the code.
- CODE: zero change. scripts/authorityMatrix.mjs and authorityMatrix.test.ts are untouched in the delta, so the GREEN code review of f8688f2d carries. The FILE-FENCE still lists the same 3 paths.

## CI at 3f04819a486619b20f0d14407b50d37456fa2235 (full sha)
- relay corpus (grammar v1): success · changes: success · report-schema: success · arm auto-merge: success · Vercel Preview Comments: success.
- build (24.x): in_progress, so NOT read and NOT counted.
- SKIPPED (named, not green): rule26, eval-canary.

## Status
Nothing posted on 3f04819a. The failure on f8688f2d stays on that sha only. Re-send the order when build (24.x) completes; the review half is done, and GREEN + green build → success.
