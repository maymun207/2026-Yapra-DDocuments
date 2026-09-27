<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR623-S160-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S160, 2026-09-27T05:27Z
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1, the owner's words "PLani onayliyorum" (2026-09-27 08:06 TSI), plan step 1 (PR 623 landing); OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 ("onay nightly 22/24"); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary landing review of PR 623 (CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v2, AG-1, register item 104) on the head that will land, and the adversary/scout status on it.

## PREMISE
READ: AG-1 slip SLIP-PR623-MASTER-MERGE-S160-1 (bus 2026-09-27T05:24:51Z): branch phase/nightly-compat-floor-22-s159-1, head 069add4c7e707c8a08bfd2c826ce283294424b0e = "Merge remote-tracking branch 'origin/master'" (--no-ff of master b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f, no conflict); local: five build gates GREEN, no reseal needed, suite 753 files / 11247 passed / 4 expected fail / 1 skipped, typecheck:api exit 0. Prior head ba74a7d6f8c4e914c3a2e6d124495338e2a75a65 had all four PR workflows success (2026-09-26T17:08:44Z) and a branch workflow_dispatch of Nightly Compatibility SUCCESS (2026-09-26T16:46:33Z, the card's ORDER 4 measurement).
READ (Architect, GitHub API, 2026-09-27T05:26Z, read twice): actions/runs at head 069add4c7e707c8a08bfd2c826ce283294424b0e total_count 4: Auto-merge landing success, Relay corpus success, report-schema success, Build and Test IN PROGRESS (created 05:24:00Z). PR mergeable_state "blocked" while Build and Test runs. Master b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f.
SELF-INVALIDATION: dies if PR 623's head is not 069add4c7e707c8a08bfd2c826ce283294424b0e or master is not b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/623/head (full 40-hex).
2. REVIEW on the PR head, quoting bytes (the diff against master is the card's four surfaces plus the merge commit):
   a. .github/workflows/nightly-compat.yml: matrix node-version is exactly [22.x, 24.x]; the comment lines that named 20.x now name 22.x/24.x and cite OWNER-RULING-S159-NIGHTLY-FLOOR-22-1; cron, fetch-depth, the coverage job and its floor are byte-identical to master (git diff master..HEAD -- that file: quote every hunk).
   b. api/cwf/__tests__/envProxy.test.ts: exactly the two tests (INVALID-CONFIG at ~:97, ROUTED at ~:147) carry it.skipIf(typeof http.setGlobalProxyFromEnv !== 'function') tied to the REAL module, with the API name and "v25.4.0, v24.14.0" in the name or a sibling comment; no other test in the file changed; scripts/envProxy.mjs and mergeGuard.test.ts untouched (git diff --stat master..HEAD).
   c. Report docs/relay/NIGHTLY-COMPAT-FLOOR-22-S159-1-AG1-report.md: quote the FILE-FENCE and confirm every changed path is inside it; quote the dispatch-run per-job lines it carries (22.x "envProxy.test.ts (30 tests | 2 skipped)", 24.x "envProxy.test.ts (30 tests)", coverage green) and say whether they are quoted from a run by full head sha.
   d. No backend, vendor or tenant name added (case-sensitive grep over added lines; quote the count); no test deleted; no change to build-test.yml or the coverage floor.
   e. QUOTE the merge guard VERDICT line on the Build and Test run at this head, once that run has completed.
3. CI at the CURRENT head by full sha: read actions/runs?head_sha=069add4c7e707c8a08bfd2c826ce283294424b0e; if Build and Test is still in_progress, read the run's jobs once more after they complete (a bounded read of that one run, not a poll loop); a zero read twice; every SKIPPED job named by workflow/job NAME (never a run id in prose). Do not dispatch anything: the Nightly Compatibility measurement on this branch was already taken at ba74a7d6 and the merge commit touches none of the card's four files (confirm by git diff ba74a7d6f8c4e914c3a2e6d124495338e2a75a65..069add4c7e707c8a08bfd2c826ce283294424b0e --stat -- .github/workflows/nightly-compat.yml api/cwf/__tests__/envProxy.test.ts; expected empty; print it).
4. If clean and all four PR workflows are success: post adversary/scout success on that head; then ONE read (no wait loop) of master: print whether auto-merge landed and the merge sha if it did. If Build and Test fails: RED with the failing step by name and the skipped steps named; do not re-run (S55-1).
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-LAND-PR623-S160-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=623 head=<40-hex>`. If the bus write is refused, print the full reply and the exact error line and stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no workflow dispatch, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR623-S160-1-v1
