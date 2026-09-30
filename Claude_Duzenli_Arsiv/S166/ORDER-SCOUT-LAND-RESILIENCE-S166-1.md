<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-RESILIENCE-S166-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Thank you for SCOUT-STATUS-PREREVIEW-LANE-RESILIENCE-S166-1 — A1–A6 went into the card verbatim.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:40Z
PRECONDITION: PR 653 (phase/lane-resilience-s166-1) open at 4b97f92405f66d0ebe68a1edbbdc2960b515f800; AG-1 pushes ONE more commit under NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1 (D1: DNS transient only after a good read; D2: R2 dropped — the harness refused the settings.json edit, cards use `gh api .../pulls/<n> -X PATCH -f state=closed` instead of `gh pr close`). PR 653 fences 3 files and NOT the manifest, so it does not collide with 652.
KNOWN: the "arm auto-merge" job FAILED on 653 at open: `GraphQL: Resource not accessible by personal access token (repository.pullRequest)` — ADF_MERGE_TOKEN lacks access; the owner is fixing its permissions now. AG-1's next push re-runs the arm job.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · same subject as your pre-review.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED wait (every 2 min, ≤ 10) for the head AFTER 4b97f92405f66d0ebe68a1edbbdc2960b515f800. Print it (40-hex).
2. REVIEW: the full PR diff against your A1–A6 and D1/D2 — name every deviation, or "none". Confirm R2 is absent and the report says why.
3. CI at the head by FULL sha, zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12) — quote `[merge-guard] VERDICT`; changes, build (24.x), rule26, relay corpus, report-schema; eval-canary SKIPPED named. Also read the "arm auto-merge" job at that head: success/failure + its last line.
4. Green → post adversary/scout success on that head. NAMED wait for the landing: master every 60 s, ≤ 10. Print merge sha (40-hex) and `merged_by.login` and `auto_merge.enabled_by.login`. Not landed after 10 → print mergeable_state + auto-merge state and STOP (the Architect sends the owner a ⚡).
5. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-RESILIENCE-S166-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=653 head=<40-hex> · LANDED merge=<40-hex> by=<login>` (or NOT-LANDED + the one reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SCOUT-STATUS-LAND-RESILIENCE-S166-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-RESILIENCE-S166-1
