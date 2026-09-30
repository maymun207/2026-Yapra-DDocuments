<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-SEAL-S166-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). First line of every message: `[scout-1]` (NOTICE-SAY-YOUR-NAME-S166-1).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T20:10Z
PRECONDITION: PR 654 open, phase/seal-no-shared-lines-s166-1 at d4e441ec3cf9e6238c765cdd08d3814dc0e47439 (AG-3, SLIP-CARD-SEAL-NO-SHARED-LINES-S166-1 at 20:08Z); master a3ce7b0c1b1ba39d559d034e2c18fb938799a76c; auto_merge armed by maymun207 (the owner's ADF_MERGE_TOKEN works — first PR armed with it).
ON-DISAGREEMENT: if the head moved, review the head you read and name it.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · OWNER-RULING-S166-RULE20-ATTEST-1 ("RULE-20 attest degisikligini onayliyorum", 22:13 TSİ) · your SCOUT-STATUS-PREREVIEW-SEAL-S166-1 (A1–A6) is the review standard.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — full adversary review of the IMPLEMENTATION, then land
1. Print PR 654's head (40-hex), its files, and the first commit's FILE-FENCE. FENCE-GREW risk: every changed path must be inside the first fence.
2. REVIEW against CARD-SEAL-NO-SHARED-LINES-S166-1-v2 S1–S9 + your A1–A6: (a) S1 uses `--no-renames` and merge-base with the PR base; attest tab names match exactly; every touched tab printed; (b) S2 build mode prints `ATTEST NOT RUN` under CI-without-base AND VERCEL and never fails a shallow clone; (c) S3 manifest has no lastSyncedCommit/mappedContentSha; (d) S4 reseal prints retired and exits 0; (e) S5 resealPaths() returns [] while docDriftCore keeps ROOT/MANIFEST exports; (f) S6 BASE_SHA reaches the Build step; (g) S7 RULE-20 amended, not shortened, history line kept, AGENTS mirror, ruling cited; (h) index.html badge fixed; (i) tests cover the listed cases; (j) the PR's own report carries DIAGRAM-ATTEST lines for the tabs it touches. PLANT ONE FAULT mentally: name the one input that would let a mapped change merge without a diagram review, or say none exists.
3. CI at the head by FULL sha, zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12) — quote `[merge-guard] VERDICT` AND the `[check:doc-drift]` lines (it must RUN S1 on this PR); changes, build (24.x), rule26, relay corpus, report-schema; eval-canary SKIPPED named.
4. Green + review GREEN → post adversary/scout success on that head. NAMED wait for the landing: master every 60 s, ≤ 10. Print merge sha, merged_by.login, auto_merge.enabled_by.login. Not landed after 10 → print mergeable_state + auto-merge state and STOP.
5. Review RED → post nothing; reply with every defect as a paste-ready sentence for AG-3.
6. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-SEAL-S166-1, first line `[scout-1]`, second line `ADVERSARY-VERDICT: GREEN|RED pr=654 head=<40-hex> · LANDED merge=<40-hex> by=<login>` (or NOT-LANDED + reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SCOUT-STATUS-LAND-SEAL-S166-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-SEAL-S166-1
