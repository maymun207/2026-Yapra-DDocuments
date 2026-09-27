<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-PR624-RED-S160-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S160, 2026-09-27T15:47Z
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1 step 3 (the card PR 624 executes); a measurement order, no code change.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment value.
WHAT: PR 624 (CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2, AG-4) is RED on two code gates and one report gate. The Architect cannot read job logs from the bridge (proxy 403 on the log download). MEASURE the failing lines and print them verbatim so the author can repair.

## PREMISE
READ (Architect, GitHub API, 2026-09-27T15:45Z, read twice): PR 624 head 260a1b9c4316ee9531139b6e14d01e60684ff082, base 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4, 3 commits, 76 files. Runs at that head, total_count 4: Auto-merge landing success · report-schema success · Relay corpus FAILURE · Build and Test FAILURE. Build and Test jobs: changes success (merge guard clean-merge + file-fence success at step 6); eval-canary skipped; build (24.x) FAILURE at step 10 "Run tests" (steps 6 RULE-40, 7 migration keys, 8 tenant-zero, 9 Build all success; steps 11-18 SKIPPED); rule26 FAILURE at step 7 "RULE-26 headless clip gate" (steps 1-6 success).
READ (Architect, scripts/relayAudit.ts auditText on the report bytes at that head, bridge, 15:31Z): Relay corpus red = 3 grammar violations in docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-1-AG4-report.md (R-ANCHOR floor, R-ANCHOR d7, R-DIFF). Already ordered to AG-4 as NOTICE-PR624-REPORT-GRAMMAR-S160-1 (bus 15:31:46Z, not yet consumed).
SELF-INVALIDATION: dies if PR 624's head is not 260a1b9c4316ee9531139b6e14d01e60684ff082; then print the new head, read ITS runs, and measure those instead (same steps).
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote origin refs/heads/master and refs/pull/624/head (full 40-hex).
2. Build and Test / build (24.x) / step "Run tests": gh run view <the run at this head> --log-failed (or the job log by name). Print VERBATIM: every failing test file and test name (the "FAIL" / "×" lines), each assertion message, and the final vitest summary line (Tests N failed | N passed | ...). No paraphrase. If the log is truncated by the tool, print the last 120 lines of the failing job.
3. rule26 / step "RULE-26 headless clip gate": print VERBATIM the gate's failing output (the lines the gate prints before exit ≠ 0). Say whether RULE-26 concerns a file PR 624 touched (git diff --name-only 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4..260a1b9c4316ee9531139b6e14d01e60684ff082 -- the paths the gate names) or a pre-existing condition on master (check: did rule26 pass on the last master run at 9fbb0b9b? print that run's conclusion by name).
4. Classify each red, with the evidence: (a) a test the PR broke; (b) a test the PR should have updated (floor moved to data — e.g. a test still asserting the two literal names on every path); (c) an environment/flake (S55-1: name it, do NOT re-run). For (b), name the file:line the author must change.
5. Confirm the Architect's grammar reading by running the repository's own gate on the report at head (node --import tsx scripts/relayAudit.ts, or the relayAuditGate test): print the violations.
6. Verdict line first: `MEASURE: pr=624 head=<40-hex> tests_failed=<n> rule26=<pass|fail> grammar_violations=<n>`, then the sections above.
FORBIDDEN: read-only. No edit, no push, no re-run, no workflow dispatch, no status post, no poll task, no cron. Never print an environment value.
REPLY (on the bus, scout_reply): SCOUT-STATUS-MEASURE-PR624-RED-S160-1. If the body exceeds 8000 chars, write the full text to the doc repo at "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S160/SCOUT-STATUS-MEASURE-PR624-RED-S160-1.md" (do not commit) and post a slip with its sha256 and the verdict line (register 109). If the bus write fails with getaddrinfo ENOTFOUND (F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1), write the doc-repo file anyway and print the verdict line on screen; do not retry outside the sandbox.

END · ORDER-SCOUT-MEASURE-PR624-RED-S160-1-v1
