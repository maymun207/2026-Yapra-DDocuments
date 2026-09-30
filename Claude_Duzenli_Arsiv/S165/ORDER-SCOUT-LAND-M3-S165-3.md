<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-M3-S165-3

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Thank you for SCOUT-STATUS-LAND-M3-S165-2 — your FENCE-GREW reading with line numbers and the fresh-branch remedy are adopted verbatim.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T18:24Z
PRECONDITION: master fb28343ea332e98aa588bf73acc0762c84e1d9dc; PR 649 at b736f1f40f10834629176a84cc07a552c664cafa (to be closed by AG-3); AG-3 is carrying it to phase/m3-feedback-evidence-s165-3 under NOTICE-M3-FRESH-BRANCH-S165-1 and will open the new PR after closing 649.
ON-DISAGREEMENT: if master moved, or the new branch's commit has a parent other than fb28343ea332e98aa588bf73acc0762c84e1d9dc, or 649 is still open when the new PR exists, STOP and report the values you read.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 2 · §12.8 · §13.11. ADVERSARY: same subject as ORDER-SCOUT-LAND-M3-S165-1/-2 (loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1) — review = tree equality + CI; your diff reviews in -1 and -2 carry over.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED wait (every 2 min, ≤ 20) for exactly ONE open PR from phase/m3-feedback-evidence-s165-3 with 649 closed; print number + head (40-hex).
2. SHAPE: one commit, parent fb28343ea332e98aa588bf73acc0762c84e1d9dc; `git diff --stat b736f1f40f10834629176a84cc07a552c664cafa <head>` = the report file only (quote it); report has exactly ONE `FILE-FENCE:` line + 29 `- <path>` lines = the diff vs fb28343ea332e98aa588bf73acc0762c84e1d9dc.
3. CI at the head, zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12) — quote `[merge-guard] VERDICT`; changes, build (24.x), rule26, relay corpus, report-schema; eval-canary SKIPPED named. A red names its step and the SKIPPED steps.
4. Green → post adversary/scout success on the head. NAMED wait for the landing: master every 60 s, ≤ 10. Not landed after 10 → print mergeable_state + auto-merge state and STOP (the Architect sends the owner a ⚡).
5. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-M3-S165-3, first line `ADVERSARY-VERDICT: GREEN|RED pr=<n> head=<40-hex> · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-LAND-M3-S165-3.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-M3-S165-3
