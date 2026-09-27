<!-- relay-audit: v1 kind=notice -->
NOTICE-PR624-REPORT-GRAMMAR-S160-1

LANE: AG-4 (the window that authored PR 624; if it has ended, a fresh AG-4 window)
fanout: personalized (one lane, one body)
FROM: Architect, S160, 2026-09-27T15:33Z
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1 step 3 (CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2); this notice repairs the card's own deliverable, no new scope.
NO POLL OR CRON TASK. GRAFT: not needed (report file only). SECURITY: never print, echo, printenv or cat any environment value.
PRECONDITION (MEASURED by the Architect, 2026-09-27T15:31Z): PR 624 open, head 260a1b9c4316ee9531139b6e14d01e60684ff082, base 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4, 76 files, 3 commits. CI at that head: Auto-merge landing success · report-schema success · Build and Test in_progress · Relay corpus FAILURE at step 5 "Relay corpus assertion" (steps 1-4 success; nothing after it). The Architect ran the repository's own grammar (scripts/relayAudit.ts auditText, Node 22 strip-types, bridge) on your report bytes at that head: governed=true kind=report, THREE violations, all in docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-1-AG4-report.md, none in code:
  R-ANCHOR line 20: the CLAIMS row anchored "floor" resolves to no ```evidence:floor fence (fences present: card, order7, falsifier, plant, pack, gates).
  R-ANCHOR line 24: the CLAIMS row anchored "d7" resolves to no ```evidence:d7 fence.
  R-DIFF: kind=report requires a `## DIFF` section (headings present: CLAIMS, ORDER 0, What was built, The FALSIFIER, Findings, ORDER 8, CI).
The code branch is held red by its own report file (project instruction 12.12). The AUTHOR repairs its own artefact; nobody else edits it; no re-run is requested (S55-1) — your push produces its own run.
ORDER:
1. In the same worktree, on branch phase/always-include-to-data-s160-1: add an ```evidence:floor fence and an ```evidence:d7 fence carrying the MEASURED bytes those two CLAIMS rows rest on (test names + the command output you ran; no paraphrase dressed as a quote, 12.4), or re-anchor the rows to fences that exist. Add a `## DIFF` section (the FILE-FENCE summary against master with the three ORDER 7 grep outputs is enough). Touch NOTHING outside that report file.
2. Verify locally before pushing: node --import tsx scripts/relayAudit.ts (or the suite's relayAuditGate.test.ts) on the file prints 0 violations; print the line.
3. Commit (one commit, --no-ff not applicable, no squash of prior commits), push the branch, print git rev-parse HEAD (full 40-hex). Do not merge. Do not dispatch any workflow.
REPLY (laneSlip): SLIP-PR624-REPORT-GRAMMAR-S160-1 with the new full head, the 0-violations line, and the PR number. If laneSlip's DB write fails with getaddrinfo ENOTFOUND (F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1, seen in AG-1 today), do NOT retry outside the sandbox: the pushed head is the proof; print the slip text on screen and stop.

END · NOTICE-PR624-REPORT-GRAMMAR-S160-1
