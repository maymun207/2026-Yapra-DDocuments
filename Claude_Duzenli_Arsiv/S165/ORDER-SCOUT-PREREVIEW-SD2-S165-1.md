<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-SD2-S165-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). Thank you for SCOUT-STATUS-REVIEW-CARD-VECTORLANE-S165-1 — building and running the design was worth more than any opinion; v2 with Δ-A and your P3 is on the bus to AG-1 with your row as its seal.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:33Z
PRECONDITION: branch phase/sd2-brake-notice-grouped-count-s164-2 on origin at 1ef841865dc786ea527331dc6adbaa6a441f5908 (AG-4; parent 61e7f368604ffdd86b8841d9063e540641d42efc). If it differs, STOP and report both shas.
WHY: SD2 (register 156; registers 61, 50) is built on CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v2 plus the Architect's ruling NOTICE-SD2-D7-RULING-S165-1 (doc repo S165/), which WITHDREW a scout-reviewed design point: the "not all" clause stays code-pinned in toolCallCapMessage instead of becoming a prompt.segment row. A ruling that changes a reviewed design goes to the scout (A-REC-S164-2). PRE-REVIEW ONLY: no status, no landing.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) — SD2 is plan item 4 · §12.1 · §12.8.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git fetch origin phase/sd2-brake-notice-grouped-count-s164-2 master`; print both heads (40-hex).
2. vs CURRENT master (763a54bc551572137276afa6cc55446e80c934cc or later): `git merge-tree --write-tree <master> 1ef841865dc786ea527331dc6adbaa6a441f5908` → every conflicted path; reseal needed at the slot?
3. THE RULING: judge NOTICE-SD2-D7-RULING-S165-1 on its merits. Its premises: burstBrakeMessage.ts declares the text deterministic and test-pinned; segmentIds.ts closes the id set; promptRevFrom hashes every id so a 21st segment moves every turn's promptRev. Verify each by file:line at master. Is keeping the clause in code a trap (e.g. does any reader treat that text as governed data, does any eval scorer read promptRev per clause)? GREEN or RED with bytes.
4. CARD FIDELITY: for each of your SD2 deltas in SCOUT-STATUS-REVIEW-CARD-SD-S164-1 (Δ6–Δ9) and the card's D1–D4, GREEN or RED at the head with file:line. Confirm the injectable-clause parameter and the {{REFUSED_COUNT}} substitution path are GONE (no dead branch, §12.6) and SD2-9 pins count 0 → today's sentence byte-identical.
5. The report docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md: EXACTLY ONE `FILE-FENCE:` line + `- <path>` lines equal to the diff vs its parent (merge-base scripts/mergeGuard.mjs: blocks, problems, diff-not-fence, fence-not-diff). No bare 7–39 hex in prose.
6. SCRATCH worktree at the head: touched suites (inlineAggregates, burstGuardReporting, partialRead, groundingCheck, perToolCapCount) + typecheck:api; quote summaries. PLANT: sum only the first group → SD2-3 red; revert.
7. CI-only gates at the PR (Build and Test, Relay corpus, report-schema, rule26; eval-canary SKIPPED): name any predictable trip.
8. scout_reply (p_from 'scout-1') as SCOUT-STATUS-PREREVIEW-SD2-S165-1, first line `PREREVIEW-VERDICT: GREEN|RED branch=phase/sd2-brake-notice-grouped-count-s164-2 head=1ef841865dc786ea527331dc6adbaa6a441f5908`, each RED delta paste-ready. Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-PREREVIEW-SD2-S165-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
BACKUP DUTY: if, while you run this, PR 647 is CI-green with NO adversary/scout status for more than 20 minutes (CI went green 07:22:12Z), stop this pre-review, run ORDER-SCOUT-LAND-PR647-S165-1's steps as backup lander with a collision guard (read the head's statuses first; if scout-2's status is there, post nothing), reply SCOUT-STATUS-LAND-PR647-BACKUP-S165-1, then resume.
FORBIDDEN: no status posted (except under BACKUP DUTY), no edit, push, merge by hand, re-run, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-SD2-S165-1
