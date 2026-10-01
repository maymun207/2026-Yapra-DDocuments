<!-- relay-audit: v1 kind=card -->
CARD-SMALL-FIXES-S169-1-v1

STATUS: v1 for scout pre-review (§12.1, NEW subjects); v2 goes to AG-1.
LANE (after pre-review): AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 card" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T05:27Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (6f545ba826349564b9da3ad37317930d05bf7e5c). Architect read at that sha (gh contents): scripts/mail-wait.mjs:232 `const DEFAULT_BUDGET_MIN = 40;`, :246 usage line "(default 40)", :315 budgetMin from `--budget-min`, EXIT_NO_MAIL = 3 (:125, returned :958 and :2429); scripts/laneSlip.mjs:74 `ci` field regex accepts only "<run id> <verdict>" or UNMEASURED; scripts/authorityMatrix.d.mts declares no canonicalConformanceDocument.
ON-DISAGREEMENT: if the code is not as described, quote what is and stop.
WHY: register 202, 204, 206 (S169). Plain words: (202) the harness stops any background command at 120 min, so a lane that asks mail-wait for 480 min goes deaf at 120; (204) the test reaches a new export through a cast because its type declaration is missing; (206) the slip refuses the honest line "ci: dispatched (not watched)" that the new no-CI-watch rule asks for.
AUTHORITY: OWNER-APPROVAL-S169-PLAN-1 ("onay S169-plan", 2026-10-01 08:26 TSİ).
NO CRON TASK. GRAFT FIRST: graft/scripts/mail-wait*, graft/scripts/laneSlip*, graft/scripts/authorityMatrix*, graft/.graph/wiring.json; `git grep` only for what graft does not index. SECURITY: never print, echo, printenv or cat any environment variable; never print the publishable key.
UI/UX (§13.3): none — lane plumbing and types; say so in the report.

## WORK
F1 (202). mail-wait: a `--budget-min` above 110 is CLAMPED to 110 and prints once `[mail-wait] budget clamped to 110 min (the harness stops background commands at 120)`. The default (40) does not change. On EXIT_NO_MAIL print one final line `[mail-wait] NO-MAIL: run this command again now to keep listening`. Tests: 480 → 110 + the line; 60 → 60, no line; default unchanged; NO-MAIL line printed exactly once on exit 3, never on 0/other codes.
F2 (204). scripts/authorityMatrix.d.mts declares `canonicalConformanceDocument(doc: string): string`; api/cwf/__tests__/authorityMatrix.test.ts uses a named import instead of the namespace cast. No assertion changes. typecheck:api once.
F3 (206). laneSlip `ci` accepts `dispatched (not watched)` as a third form (an UNMEASURED-class statement: CI was started, not read). Usage line (:240) names it. Tests: the three forms pass; a bare `ci: dispatched` without "(not watched)" is refused FW006; the existing forms unchanged.
REPORT RULE (merge guard + relay corpus refuse without it): line 1 of the report is `<!-- relay-audit: v1 kind=report -->`; exactly ONE `## FILE-FENCE` section (`FILE-FENCE:` + one `- <path>` per changed file = `git diff --name-only origin/master...HEAD`); `## CLAIMS` and `## DIFF` sections; no 7–39 hex in prose (full 40-hex or none); no run ids in prose. The FIRST commit carries code + report + fence; the fence never grows after it (FENCE-GREW). Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` before the first push.
FENCE: scripts/mail-wait.mjs · scripts/laneSlip.mjs · scripts/authorityMatrix.d.mts · api/cwf/__tests__/authorityMatrix.test.ts · their test files (name them) · docs/relay/SMALL-FIXES-S169-1-AG1-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). Worktree `phase/small-fixes-s169-1` at master.
2. F1–F3 + tests + report (with fence); first commit + push + `gh pr create --base master` within 15 min. Print PR number + head 40-hex.
3. Slip SLIP-CARD-SMALL-FIXES-S169-1 ("ci: UNMEASURED dispatched (not watched)"). Remove worktree. Back to mail-wait --budget-min 110.
BUDGET: whole card ≤ 45 min. A refused command → slip it, never route around it.
FORBIDDEN: changing DEFAULT_BUDGET_MIN; any write on --read or the poll; --force; paths outside the fence; merging; cron; printing an environment value.

END · CARD-SMALL-FIXES-S169-1-v1
