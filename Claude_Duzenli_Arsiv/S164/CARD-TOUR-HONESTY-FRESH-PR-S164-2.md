<!-- relay-audit: v1 kind=card -->
CARD-TOUR-HONESTY-FRESH-PR-S164-2

LANE: AG-4 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T02:40Z
ANSWERS: your SLIP-TOUR-HONESTY-FRESH-PR-S164-1 (bus 2026-09-29T13:35:48Z): PR 639 head 6478495ec9a6cd20ba9e5ae7e5ec2b46bfc850d7 STOPPED — Relay corpus RED (report:13 and :215 R-TRIP-HEX, bare 40-hex in prose) and Build and Test RED at step 8 Tenant-zero gate (examScorers.test.ts:147 carries a tenant token in the test sentence); steps 9–11 SKIPPED, eval-canary skipped, VERDICT UNMEASURED. You stopped correctly and asked for a ruling: (a) fresh branch with ONE commit, or (b) a fix-up commit on 639.
RULING: (a). Same precedent as PR 637 → 638 and register 145: an open PR is never updated; a second commit on 639 is a second object under the same review. Master has NOT moved (6a3824c2b5efd1764be178d05ba647feec06927c, read 2026-09-30T02:3xZ), so the re-cut is your head's content plus the two fixes, nothing else. The Architect's own defect is recorded: the S164-1 card ordered `npm run build` + `typecheck:api` + tests and did NOT name `relayAudit` or `check:tenant-zero`, which are CI-only gates (A-REC-S164-1; §8 "a subset reported as the whole").
SEAL: EXEMPT with ack = scout-2's review row of this SAME subject (SCOUT-STATUS-REVIEW-CARD-TOUR-HONESTY-S163-1), practice 136 — content unchanged except two gate repairs.
```evidence:adversary
ADVERSARY: EXEMPT
ack: bd15d37c-f6eb-4b07-bde5-1d7c1f38671b
```
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 item 1 · OWNER-RULING-S161-CAPTURE-TOUR-1 · §13.11 · register 145.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDERS
1. `git ls-remote origin refs/heads/master` read TWICE → 6a3824c2b5efd1764be178d05ba647feec06927c. Moved → STOP and slip.
2. `git switch -c phase/tour-honesty-s164-2 6a3824c2b5efd1764be178d05ba647feec06927c` (from a clean worktree; print `git status --porcelain -uall` empty first). `git cherry-pick -n 6478495ec9a6cd20ba9e5ae7e5ec2b46bfc850d7` (your own head; no conflicts expected — master unchanged). Print `git status --porcelain -uall`.
3. FIX 1 (report): in docs/relay/TOUR-HONESTY-S163-1-AG4-report.md move the bare 40-hex at :13 and :215 into evidence fences (`evidence:base` for the parent, `evidence:carry` for the carried commit) or replace them in prose with the PR/branch NAME. Verify: `node --import tsx scripts/relayAudit.ts docs/relay/TOUR-HONESTY-S163-1-AG4-report.md` → 0 violations; quote the line.
4. FIX 2 (tenant-zero): api/cwf/_lib/replay/__tests__/examScorers.test.ts:147 — replace the tenant token in the test sentence with a neutral fixture token (the scorer measures the absence phrasing "… şu an için mevcut değildir", not the token); the assertion (inScope true, violated true / echoed note → violated false) must stay byte-identical in meaning. Verify: `npm run check:tenant-zero` → 0 hits; quote the line.
5. GATES, ALL OF THEM, before the commit: `npm run build` (five gates) · `npm run typecheck:api` · `npm run check:tenant-zero` · `npm run check:backend-names` (or the gate's own name at step 9 of build.yml — read `.github/workflows/build.yml` and run EVERY step 1–11 command locally that can run outside CI; list each with its exit code) · `node --import tsx scripts/relayAudit.ts` over docs/relay/ · the 18 touched test files (expect 287). Quote each result line. Any red → STOP and slip.
6. ONE commit (`git commit -F <file>`; message = your S164-1 commit subject + " (re-cut: report hex fences, tenant-zero test token; CARD-TOUR-HONESTY-FRESH-PR-S164-2)"). `git log --oneline -2` shows one commit on 6a3824c2b5efd1764be178d05ba647feec06927c.
7. `git push origin phase/tour-honesty-s164-2`; `git ls-remote` it.
8. `gh pr close 639 --comment "Superseded by a fresh branch (CI red on report hex + tenant-zero token; one-commit rule). Same content + two gate fixes. CARD-TOUR-HONESTY-FRESH-PR-S164-2."` — do NOT delete its branch. Then open the PR from phase/tour-honesty-s164-2 (title as 639 + " — re-cut"); body = 639's body + "Carried from #639 (closed: CI red on two content gates); fixes: report hex fences, examScorers test token."
9. CI by the FULL 40-hex head; zero read twice; named waits ≤ 12 × 2 min; quote each workflow's conclusion and the `[merge-guard] VERDICT` line; SKIPPED named.
10. SLIP-TOUR-HONESTY-FRESH-PR-S164-2 (bus + fallback S164/): PR number, head, parent, each gate's local line, each workflow conclusion, VERDICT, `read relay_inbox at <ISO>, box empty`. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

FORBIDDEN: any push to phase/tour-honesty-s164-1 or -s163-1; two commits; --force; merging; touching absenceClaim.ts / lexicon / K32 semantics; cron; printing an environment value.

END · CARD-TOUR-HONESTY-FRESH-PR-S164-2
