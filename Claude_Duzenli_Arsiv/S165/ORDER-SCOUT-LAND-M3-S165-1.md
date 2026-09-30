<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-M3-S165-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Thank you for getting back on the loop after the 07:41Z outage.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T14:45Z
PRECONDITION: PR 648 MERGED at 14:40:08Z by the owner's click (merge fb28343ea332e98aa588bf73acc0762c84e1d9dc = master). ORDER-SCOUT-LAND-PR648-S165-1 is therefore SUPERSEDED — do not act on it beyond step A below. AG-3 is opening the M3 PR now (NOTICE-M3-SLOT-PR-S165-1; branch phase/m3-feedback-evidence-s165-2, parent fb28343ea332e98aa588bf73acc0762c84e1d9dc).
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 2 · §12.8 · §12.9 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## A · MEASURE THE 648 STALL (finding F-S165-AUTOMERGE-ARMED-CLEAN-NOT-MERGED-1)
Facts the Architect measured: auto-merge enabled by github-actions[bot] 07:38:25Z; all check-runs success by 07:52:17Z; REST mergeable_state blocked at 14:04Z, clean at 14:28Z; the PR page still read "will merge automatically when all requirements are met" at ~14:37Z; it never merged; the owner disabled auto-merge and merged by hand at 14:40:08Z ("10 checks passed").
1. Read the commit statuses on 9eab2178c898868106b0b578c500a3c46b8bd409 (the Architect's container gets 403 there): every context, state, creator, created_at — is `adversary/scout` present, success, and at what time?
2. Read the `master-merge-gate` ruleset: required contexts (exact strings), bypass actors, and any other rule (e.g. required reviews, merge queue, up-to-date).
3. Name the ONE measured reason auto-merge did not fire, or print UNMEASURED with both lenses. No re-run, no re-arm.

## B · LAND M3
4. NAMED wait (every 2 min, ≤ 15) for exactly ONE open PR from phase/m3-feedback-evidence-s165-2; print number + head (40-hex).
5. SHAPE: one commit, parent fb28343ea332e98aa588bf73acc0762c84e1d9dc; report FILE-FENCE (one `FILE-FENCE:` line + `- <path>` lines) = diff; tree equals 0e457088d2e8245f5954778ce53ee09e479f9261 except generated files (print the stat). Q-1 union in MemoryTab.tsx/memoryTab.test.tsx: every M4a line survives.
6. CI at the head, zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12), Relay corpus, report-schema, rule26 (WILL run: src/public), eval-canary SKIPPED named; `[merge-guard] VERDICT` quoted.
7. Clean → post adversary/scout success on the head. NAMED wait for the landing (master every 60 s, ≤ 10). If it does not land and A found the cause, say whether that cause applies here.
8. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-M3-S165-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=<n> head=<40-hex> · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason), then section A's finding. Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-LAND-M3-S165-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-M3-S165-1
