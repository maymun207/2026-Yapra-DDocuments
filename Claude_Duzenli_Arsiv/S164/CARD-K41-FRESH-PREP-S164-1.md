<!-- relay-audit: v1 kind=card -->
CARD-K41-FRESH-PREP-S164-1

LANE: AG-1 (in mail-wait; M1 landed as PR 641)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:15Z
SUBJECT: carry K41 (CARD-K41-ROUTER-KNOB-SPLIT-S163-1-v2, AG-2's branch phase/k41-router-knob-split-s163-1 = e2cb64c00f7b820472b0d1e0e3f74f8a1e4745c7, base ed033de062dfc869850a35e40f1b39094dd24ea3, report docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md) onto a fresh branch off CURRENT master. Measured by the Architect 03:57Z: that branch is 1 commit ahead, 6 behind, 22 files; master has since taken K32 (PR 638), TOUR-HONESTY (PR 640) and M1 (PR 641), and K41 shares 7 files with K32.
SEAL: EXEMPT with ack = scout-2's review row of this SAME subject (SCOUT-STATUS-REVIEW-CARD-K41-S163-1), practice 136 — content unchanged except carrying and the two rulings below.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 76260570-24be-4319-a44a-8b696d197af7
```
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 (K41 after M2) · OWNER-APPROVAL-S163-K41-1 · register 143, 145 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## RULINGS ON AG-2's TWO OPEN QUESTIONS (its slip, bus row 2d1e1f8e-77e6-4ae0-8d83-0238680b6cb1)
R1 · routeDecisionMatrix drops keywordArmAdded after asserting it null, and the master golden hash is unchanged → ACCEPTED: the matrix is the frozen legacy arm; the new field lives in the stage-07 trace only. Keep the null assertion.
R2 · the card's :107/:110 pointed at stage 03 but the entry landed on stage 07 → ACCEPTED: routing knobs belong to stage 07; the card's line cite was wrong (Architect's defect, recorded).

## ORDERS
1. `git ls-remote origin refs/heads/master` read TWICE; print it (expect 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 or later). Clean worktree (`git status --porcelain -uall` empty, printed).
2. `git switch -c phase/k41-router-knob-split-s164-1 <that master>`; `git cherry-pick -n e2cb64c00f7b820472b0d1e0e3f74f8a1e4745c7`. Resolve every conflict IN THE PICK, keeping master's K32 / TOUR-HONESTY / M1 behaviour intact and adding K41's; print `git diff --stat --cached` and name each conflicted file with the side you kept per hunk. Seal conflicts: `git checkout --theirs` the generated file then reseal (practice 127).
3. GATES, ALL: `npm run build` (five gates; reseal if drift, regenerated files join the fence) · `npm run typecheck:api` · `npm run check:rule24` · `npm run check:migration-versions` · `npm run check:tenant-zero` · `npm run check:backend-names` · `node --import tsx scripts/relayAudit.ts` over docs/relay/ · the K41 test files + every K32 / TOUR-HONESTY / M1 test file the pick touched. Quote each result line. Sandbox listen EPERM failures are named as such, not counted as green.
4. Report: update the K41 report (same path) with a CARRIED section: new base, conflicts and resolutions, R1/R2 as RULED, gate lines. No bare 7–39 hex in prose.
5. ONE commit, parent = the master of step 1 (`git log --format='%H %P' -1`). `git push origin phase/k41-router-knob-split-s164-1`; `git ls-remote` it.
6. DO NOT OPEN A PR YET — the one PR slot belongs to M2 (AG-3). Slip SLIP-CARD-K41-FRESH-PREP-S164-1 (bus + fallback S164/): branch, 40-hex head, parent, gate lines, conflicted files. The Architect sends the open-PR notice when M2 lands; if master moves before that, the notice says re-cut or rebase-free re-pick.
7. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.

FORBIDDEN: pushing to AG-2's branch or deleting it; a merge commit; two commits; --force; opening a PR; flipping router.matrixReplace / keywordArmAllPaths (owner, Rules UI, after landing); cron; printing an environment value.

END · CARD-K41-FRESH-PREP-S164-1
