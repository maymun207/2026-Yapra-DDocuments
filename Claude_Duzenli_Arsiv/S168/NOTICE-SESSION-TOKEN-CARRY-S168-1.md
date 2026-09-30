<!-- relay-audit: v1 kind=notice -->
NOTICE-SESSION-TOKEN-CARRY-S168-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`.
fanout: personalized (one lane, one body)
FROM: Architect, S168, 2026-09-30T22:16Z
PRECONDITION: master 731c1ee412432b2c5e96f1966793c00f00ec27e2 (PR 656 TEST-ROOT landed 22:09:45Z). PR 658 (phase/session-token-s167-1) open at d8c2fe4062a056744fd4868a93060b496c30f7c2. PR 659 (AG-3, INBUCKET) open at e3889ccd1c5ada3dae14a817e51714fb23e40c34.

MEASURED (Architect ran the merge-base's scripts/mergeGuard.mjs on the bridge, same arguments as CI, base 1f694e1ff47d84d6e7b321e332446519f443b1f0):
- PR 658: `[merge-guard] FAIL NO-FENCE — 0 FILE-FENCE: blocks among the changed report files (docs/relay/SESSION-TOKEN-S167-1-AG4-report.md); exactly one is required` → `VERDICT RED — NO-FENCE`. Also Relay corpus step 5 (relayAuditGate) FAILED at d8c2fe40.
- PR 659: fence ok, timeline ok, `FAIL COLLISION — UNMEASURED: the fence of lower-numbered #658 cannot be read … YIELDED-TO #658 … close it or fence it, and this PR goes green on its next push`. So 658 is also what holds 659 red.

RULING (one path): the first commit of 658 had no report, so a fence added now cannot be "held by the first fence" (FENCE-GREW). 658 is closed and SESSION-TOKEN is carried onto a FRESH branch as ONE commit (code + report + FILE-FENCE), as bootstrap v175 §2.1 says. CLOSE 658 FIRST — that alone unblocks 659.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (SESSION-TOKEN) · A-REC-S167-4 (report rides in the first commit) · §12.12 (you repair your own artefact).
NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable. GRAFT FIRST for any code context.
IF BLOCKED: write the blocker to the bus as your slip (status BLOCKED, the exact refused command and message) and return to mail-wait. NEVER stop in the window waiting for input — the Architect cannot see your window.

## STEPS
1. Close 658 NOW: `gh api repos/maymun207/cwf_yaprak/pulls/658 -X PATCH -f state=closed`, then `gh pr comment 658 --body "SUPERSEDED-BY carry (NOTICE-SESSION-TOKEN-CARRY-S168-1): report had no FILE-FENCE in the first commit"`. Do not delete the branch.
2. `git ls-remote origin refs/heads/master` (twice; expect 731c1ee412432b2c5e96f1966793c00f00ec27e2 or a descendant). Branch `phase/session-token-s168-1` from it.
3. Bring the CODE of 658 over byte-equal: `git diff 1f694e1ff47d84d6e7b321e332446519f443b1f0 d8c2fe4062a056744fd4868a93060b496c30f7c2 -- . ':!docs/relay'` applied onto the new branch (`git apply --3way`). If anything conflicts with TEST-ROOT (656), resolve it and SAY which file in the report.
4. Report docs/relay/SESSION-TOKEN-S168-1-AG4-report.md: line 1 `<!-- relay-audit: v1 kind=report -->`, ## CLAIMS, ## DIFF, exactly ONE `FILE-FENCE:` line listing every changed path including the report itself; no 7–39-hex in prose or anchored fences. Carry your S167 evidence into it.
5. Before committing, run ONCE each and quote the tail lines: `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` (must pass — this is what failed on 658) · the tests you touched · `npm run typecheck:api`.
6. ONE commit (`git commit -F <file>`), push, `gh pr create --base master` (NOT draft).
7. Slip SLIP-NOTICE-SESSION-TOKEN-CARRY-S168-1 on the bus: `[AG-4]`, 658 closed yes/no, new PR number + head 40-hex, the step-5 tails, `GRAFT:`, `PROMPTS:`. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: ≤ 20 minutes.
FORBIDDEN: editing phase/session-token-s167-1; --force; merging; `--delete-branch`; cron; printing an environment value.

END · NOTICE-SESSION-TOKEN-CARRY-S168-1
