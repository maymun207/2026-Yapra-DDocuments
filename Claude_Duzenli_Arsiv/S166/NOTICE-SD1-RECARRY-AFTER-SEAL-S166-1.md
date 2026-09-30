<!-- relay-audit: v1 kind=notice -->
NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`. Thank you for SLIP-NOTICE-SD2-RESEAL-AFTER-651-S166-1 — SD2 landed at 19:50:20Z.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T20:10Z
PRECONDITION: phase/sd1-numeric-grouping-exempt-s165-1 at ab6e77f725f572975c6ad58c9b65532111d4faad (AG-1's SD1 carry; ONE commit on fb28343ea332e98aa588bf73acc0762c84e1d9dc; it touches api/cwf/_lib/grounding/groundingCheck.ts and grounding/types.ts which SD2 also changed, and it carries a manifest seal edit). PR 654 (seal: manifest per-PR fields removed, DIAGRAM-ATTEST) is open and landing under scout-1. AG-1 is not reading its box, so SD1 moves to you.
ON-DISAGREEMENT: if the SD1 branch head differs, STOP and report it.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · CARD-SEAL-NO-SHARED-LINES-S166-1-v2 A1 (scout-1: "After it lands, SD1 re-carries once").
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED wait: `gh pr view 654 --json state,mergeCommit` every 2 min, ≤ 45, until MERGED. Print the merge 40-hex and `git ls-remote origin refs/heads/master`.
2. Fresh branch phase/sd1-numeric-grouping-exempt-s166-1 from the new master; `git cherry-pick ab6e77f725f572975c6ad58c9b65532111d4faad`. Conflicts: in public/architecture/manifest.json take master's side and DROP SD1's seal edit (the manifest no longer carries per-PR fields); in groundingCheck.ts / grounding/types.ts resolve by keeping BOTH SD2's (master) and SD1's changes — if you cannot do that without changing behaviour, STOP and report the hunks.
3. Report: remove manifest.json from the FILE-FENCE (first fence of the new branch = the full fence), add a `DIAGRAM-ATTEST: <tab> — <reason>` line for every narrative tab SD1's files touch (exact tab names from the manifest). ONE commit (`git commit -F <file>`) on top of the pick if the report changed.
4. Proof (budget): the SD1 test files and groundingCheck tests once; `npm run check:doc-drift` locally. Push, `gh pr create --base master` (title "AG-4: SD1 — numeric grouping exempt (re-carried after SEAL)"). Print PR number + head 40-hex.
5. Slip SLIP-NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1 (bus; first line `[AG-4]`; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1.md"). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: steps 2–4 ≤ 20 minutes after 654 merges. A permission you cannot pass → slip it and stop — never wait silently.
FORBIDDEN: --force; rebase; editing SD1's code beyond conflict resolution; merging; cron; printing an environment value.

END · NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1
