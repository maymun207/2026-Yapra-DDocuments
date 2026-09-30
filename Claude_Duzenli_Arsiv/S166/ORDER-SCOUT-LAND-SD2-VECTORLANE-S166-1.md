<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-SD2-VECTORLANE-S166-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:05Z
PRECONDITION: master fb28343ea332e98aa588bf73acc0762c84e1d9dc (or a descendant after PR 650 lands); AG-4 opens a PR from phase/sd2-brake-notice-grouped-count-s165-1 at 2bea820041c6ccd02d722c5cc47cd7499ef7d1b0 (NOTICE-SD2-OPEN-PR-S166-1); AG-1 opens a PR from phase/vectorlane-fake-timers-s165-2 at 68224cda2649237989afc37f3dfaba109eebb180 (NOTICE-VECTORLANE-OPEN-PR-S166-1). Master ruleset: strict_required_status_checks_policy = false (owner, measured 18:58Z) — the two PRs land in parallel, no update-branch needed.
ON-DISAGREEMENT: if either head differs from the sha above, or a PR's diff has files other than the ones listed, STOP for THAT PR and report the values you read; the other PR continues.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ), CWF-S166-PLAN-v2 item one (1a) · §12.8 · §13.11. ADVERSARY: same subjects as ORDER-SCOUT-PREREVIEW-SD2-S165-1 and ORDER-SCOUT-PREREVIEW-VECTORLANE-S165-1 (loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1) — review = tree equality + CI.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (both PRs in parallel; each one independently)
1. NAMED wait (every 2 min, ≤ 10) for the two PRs; print number + head (40-hex) each.
2. SHAPE: SD2 = 13 files, vectorLane = 3 files (report + manifest included); each ONE commit whose parent is fb28343ea332e98aa588bf73acc0762c84e1d9dc. For SD2 compare the diff against the content your pre-review GREEN'd (SD2 pre-review + DELTA1); for vectorLane against 4af0f6995682fb9864d880dcd246ba962d617206 — name every difference or print "no difference".
3. CI at each head by FULL sha, zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12) — quote `[merge-guard] VERDICT`; changes, build (24.x), rule26, relay corpus, report-schema; eval-canary SKIPPED named. A red names its step and the SKIPPED steps; a COLLISION red names the other PR.
4. Green → post adversary/scout success on that head. NAMED wait for the landing: master every 60 s, ≤ 10. Print for each landed PR: merge sha (40-hex) and `merged_by.login` (tells whether auto-merge armed with the owner's new ADF_MERGE_TOKEN: maymun207 = yes, github-actions[bot] = no). Not landed after 10 → print mergeable_state + auto-merge state and STOP for that PR (the Architect sends the owner a ⚡).
5. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-SD2-VECTORLANE-S166-1, first line per PR `ADVERSARY-VERDICT: GREEN|RED pr=<n> head=<40-hex> · LANDED merge=<40-hex> by=<login>` (or NOT-LANDED + the one reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SCOUT-STATUS-LAND-SD2-VECTORLANE-S166-1.md". Post the reply the moment the FIRST PR lands (a partial reply), then a second reply when the other resolves. Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
BUDGET: if a command asks for a permission you cannot pass, write it in the reply and stop — do not wait silently.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-SD2-VECTORLANE-S166-1
