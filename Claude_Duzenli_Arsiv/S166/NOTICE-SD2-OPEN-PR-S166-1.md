<!-- relay-audit: v1 kind=notice -->
NOTICE-SD2-OPEN-PR-S166-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:05Z
PRECONDITION: master fb28343ea332e98aa588bf73acc0762c84e1d9dc; phase/sd2-brake-notice-grouped-count-s165-1 at 2bea820041c6ccd02d722c5cc47cd7499ef7d1b0 (ONE commit, parent = that master, 13 files — measured by the Architect via the GitHub compare API at 18:58Z). No re-pick is needed: your carry is already on the current master.
ON-DISAGREEMENT: if your own `git ls-remote origin` shows either sha different, STOP and report the values you read.
WHY: the owner turned OFF "require branches to be up to date" on the master ruleset (measured strict=false at 18:58Z), so PRs with disjoint fences now land in PARALLEL. SD2 opens now, beside PR 650 (M3).
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ), CWF-S166-PLAN-v2 item one (1a) · §12.8 · §13.11. ADVERSARY: carried content already pre-reviewed (ORDER-SCOUT-PREREVIEW-SD2-S165-1 + NOTICE-SD2-DELTA1-S165-1); scout-1 lands with a tree-equality review.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (push-first: nothing to build, nothing to test — CI is the certificate)
1. `git ls-remote origin refs/heads/master refs/heads/phase/sd2-brake-notice-grouped-count-s165-1` — print.
2. `gh pr create --base master --head phase/sd2-brake-notice-grouped-count-s165-1 --title "AG-4: SD2 — per-tool brake, grouped payload sum + groupCounts (carried onto fb28343e)" --body-file <file>` — body: the report path docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md and "NOTICE-SD2-OPEN-PR-S166-1". Print the PR number.
3. Slip SLIP-NOTICE-SD2-OPEN-PR-S166-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-NOTICE-SD2-OPEN-PR-S166-1.md"): PR number + head 40-hex. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: steps 1–3 take ≤ 3 minutes. If any command asks for a permission you cannot pass, write that fact in the slip and stop — do not wait silently.
FORBIDDEN: any commit, any edit, --force, merging, cron, printing an environment value.

END · NOTICE-SD2-OPEN-PR-S166-1
