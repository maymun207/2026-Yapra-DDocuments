<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR633-S162-1

LANE: scout (scout-1 window)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T19:25Z
OWNER APPROVAL: OWNER-APPROVAL-S162-PLAN-1; OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: PR 633 (AG-3, branch phase/e1b-ka-fixture-backend-s162-3, head ebda839afc9da4951a039f27456023e76081113e) is the ONLY open PR. It is E1-b (K-A fixture harness), SUPERSEDING PR 630 whose content you have NOT reviewed before as a landing; the CARD was reviewed (SCOUT-STATUS-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1) and v2 applied the delta. Measured by the Architect at 19:22Z: 1 commit, 16 files, auto-merge armed, `changes` job (merge guard) SUCCESS, Build and Test in progress. Verify the landing shape, read CI, post adversary/scout if clean.

## STEPS
1. `git fetch origin` · `git ls-remote origin refs/pull/633/head refs/heads/master` read twice, print both. Expected head ebda839afc9da4951a039f27456023e76081113e and master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26; if either moved, print both and STOP (RED: moved).
2. `git log --format='%H %P' origin/master..ebda839afc9da4951a039f27456023e76081113e` → expected exactly ONE commit with ONE parent = 7b54180d (no merge commit). Quote.
3. `git diff --name-only origin/master...ebda839afc9da4951a039f27456023e76081113e` (16 paths) vs the ```scope``` fence in docs/relay/E1B-KA-FIXTURE-BACKEND-S161-1-AG3-report.md at head — print both sets and both differences (expected ∅ ∅). Content check vs the old head: `git diff --stat fcafd59df4e088920d5540d3ddbcc8968c69f2fa ebda839afc9da4951a039f27456023e76081113e` — expected: the report's FRESH-BRANCH lines, 7 manifest lastSyncedCommit stamps, 5 facts.json run-identity stamps (AG-3 regenerated gen:arch-facts at master; say if any FACT or DIGEST moved — that would be RED).
4. Content review of what you have NOT reviewed as code before, ≤60 s per file (S43-2 fast gate; security-relevant = full read): api/cwf/_lib/testing/fixtureMcpServer.ts, api/cwf/_lib/replay/kaExam.ts, kaExam.exam.ts, vitest.exam.config.ts, the two fixture JSONs (invented backends only — `git grep -n -E "armes|Armes|ARMES"` over the 16 paths must not show a NEW real backend name), .github/workflows/nightly-compat.yml diff (no new secret, no new trigger outside nightly), data/gates/backend-names-baseline.json diff (only system/code 857→859 + the kaExam.exam.ts attribution; ruling NOTICE-PR630-BASELINE-RULING-S162-1). RED only on a named byte.
5. `npm run check:backend-names` at head → quote (expected OK). If the sandbox blocks tsx, say PREFLIGHT-UNMEASURED and rely on CI's step.
6. CI at ebda839afc9da4951a039f27456023e76081113e by full sha, read twice (S101-L1). Expected 4 workflows: Auto-merge landing · report-schema · Relay corpus · Build and Test — all success; name skipped jobs (eval-canary is skipped by design). Quote the merge-guard VERDICT line. If Build and Test is in_progress: NAMED wait — print `WAITING Build and Test at ebda839a… <time>`, `sleep 120`, re-read; at most SIX times; then continue or print "CI PENDING after 12 min" and go to step 8 without posting.
7. If steps 1–6 are clean and CI 4/4 success: post adversary/scout success on ebda839afc9da4951a039f27456023e76081113e; then ONE read of master: print whether auto-merge landed and the merge sha.
8. REPLY with scout_reply as SCOUT-STATUS-LAND-PR633-S162-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=633 head=ebda839afc9da4951a039f27456023e76081113e` (or `CI PENDING`). If the bus write is refused, write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SCOUT-STATUS-LAND-PR633-S162-1.md" and print its sha256. Then STOP (you cannot --take; the Architect boots you per order).
FORBIDDEN: no edit, no push, no merge, no re-run, no dispatch, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR633-S162-1
