<!-- relay-audit: v1 kind=card -->
CARD-OPEN-PR-K32-S163-1

LANE: AG-1 (in mail-wait; branch phase/k32-routing-obligation-s163-1 = 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42, parent ed033de062dfc869850a35e40f1b39094dd24ea3)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:15Z
SHAPE: this is the "NOTICE-OPEN-PR-K32-S163-1" your card promised, cut as a CARD because the live adversary gate refuses a notice that carries an ORDERS section (AG007, measured 04:05Z).
SEAL: EXEMPT with ack = scout-2's review row of this subject (SCOUT-STATUS-REVIEW-CARD-K32-S163-1), practice 136.
```evidence:adversary
ADVERSARY: EXEMPT
ack: fa4f90a9-9e15-4113-8c45-2f4bc4f0add5
```
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 6 · §12.8 / §13.11 (one open PR; the slot is free) · CARD-K32-BASELINE-RULING-S163-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## MEASURED BY THE ARCHITECT (owner's clone, remote-tracking refs refreshed by the lanes, 06:12Z)
```evidence:queue
origin/master = ee12161ecad43b338489e85fcb73df1e08aa8ac0 (Merge pull request #636, scout loop, landed 04:29Z)
files changed ed033de0..ee12161e  ∩  files changed ed033de0..6783a4ae  = EMPTY SET
PR 636 landed -> no open PR is expected
```
Your commit does not need a fresh branch: its parent is one merge behind master and no file overlaps. Open the PR from phase/k32-routing-obligation-s163-1 as it stands.

## ORDERS
1. `gh pr list --state open --json number,headRefName` → expected EMPTY. If any PR is open: STOP and slip it (one open PR at a time).
2. `git ls-remote origin refs/heads/phase/k32-routing-obligation-s163-1` → 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 (moved → STOP).
3. Open the PR: base master, head phase/k32-routing-obligation-s163-1. Body: card name CARD-K32-ROUTING-OBLIGATION-S163-1-v2, the baseline ruling line, "no migration", DARK list from your report (K1 budget · K34 gate · PLAN constraint · replay lenses).
4. CI by the FULL 40-hex head (`gh api "repos/{owner}/{repo}/actions/runs?head_sha=6783a4ae6e060ae4e40eb2e0fd9249c99458dc42"`, zero read twice, §12.10); Build and Test ≈18 min — named waits, at most 12 × 2 min.
5. SLIP-OPEN-PR-K32-S163-1 (bus + fallback S163/): PR number, 40-hex head, each workflow with conclusion, `[merge-guard] VERDICT` line. Back to mail-wait. Do NOT merge (the scout lands it).
FORBIDDEN: a merge commit; any push to the branch (the reviewed bytes are 6783a4ae); merging; cron; printing an environment value.

END · CARD-OPEN-PR-K32-S163-1
