<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-SD1-S167-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:42Z
PRECONDITION: PR 655 open, phase/sd1-numeric-grouping-exempt-s166-1 at f6d26f00e1d0776e8f0daf485ab54826c9f64627 (AG-4, SLIP-NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1 at 20:38Z); master 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 (PR 654, the seal — RULE-20 is now a per-PR DIAGRAM-ATTEST; Vercel production READY at that sha).
ON-DISAGREEMENT: if the head moved, review the head you read and name it.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 2) · register 166. SAME subject as the SD1 card already reviewed (re-carry after 654), so the review standard is the SD1 card plus NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1.
NO CRON TASK. GRAFT: graft first (`graft ask`, `graft callers`, graft/ node cards, graft/.graph/wiring.json); your reply carries a `GRAFT:` line naming what you used. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — adversary review of the RE-CARRY, then land
1. Print PR 655's head (40-hex), its files, and the first commit's FILE-FENCE; every changed path inside the first fence (FENCE-GREW).
2. REVIEW the carry (AG-4's slip names the risky joins): (a) grounding files: BOTH SD2's per-tool brake hunks (PR 652) AND SD1's numeric-grouping exemption present — quote the lines; (b) manifest: taken from master, NO SD1 edit, no lastSyncedCommit/mappedContentSha field reintroduced; (c) dbConstants / kinds / selfSeedReconciler: additive, nothing of master's dropped; (d) kinds.test pins: every old pin still live, the one new pin measured; (e) the report carries DIAGRAM-ATTEST lines for every tab the PR touches — this is the FIRST code PR under the new RULE-20, so quote the `[check:doc-drift]` lines from CI and say whether the attest step RAN (not "ATTEST NOT RUN"); (f) no backend hard-code introduced (§13.1): no backend or vendor name in a code path.
3. CI at the head by FULL sha, a zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12) — quote `[merge-guard] VERDICT` and the `[check:doc-drift]` lines; Relay corpus, report-schema; eval-canary SKIPPED named.
4. Green + review GREEN → post adversary/scout success on that head. NAMED wait for the landing: master every 60 s, ≤ 10. Print merge sha, merged_by.login, auto_merge.enabled_by.login. Not landed after 10 → print mergeable_state + auto-merge state and STOP.
5. Review RED → post nothing; reply with every defect as a paste-ready sentence for AG-4.
6. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-SD1-S167-1, first line `[scout-1]`, second line `ADVERSARY-VERDICT: GREEN|RED pr=655 head=<40-hex> · LANDED merge=<40-hex> by=<login>` (or NOT-LANDED + reason), and a `GRAFT:` line. Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/SCOUT-STATUS-LAND-SD1-S167-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-SD1-S167-1
