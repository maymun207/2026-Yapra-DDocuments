<!-- relay-audit: v1 kind=card -->
AMEND-VECTOR-ORIGIN-REPAIR-S145-1-v1

LANE: AG-4
FROM: Architect, S145, 2026-09-20T05:36Z
AMENDS: CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2 (your PR 587). Same subject, same branch, same PR. Not a new card.
OWNER APPROVAL: OWNER-APPROVAL-S144-PLAN-1 (landing of this card). A defect repair on the PR being landed is inside it.
PRECONDITION: git ls-remote origin refs/heads/phase/vector-origin-repair-s144-1 prints
34d768a2a924ab83b2cfea664df16cf369b320c2. If it moved, STOP and print it.

WHY: the scout returned RED on that head (bus row SCOUT-STATUS-REVIEW-PR587-S145-1, 05:27:46Z) and posted
adversary/scout=failure. The Architect REPRODUCED it independently (jq-1.7, the program copied from lines 331-337):
  `$A | getpath(.)` - the pipe rebinds `.` to $A, so getpath receives an object, and jq exits 5
  "Path must be specified as an array". The plan proof (line 345) and the post-write proof (line 459) cannot run.
  Under the runner default bash -e the job dies at (e) with no ::error:: line; without -e, CHANGED=0 takes the
  ALREADY-REPAIRED branch and the job goes GREEN having written nothing.
Architect measured the fix on fixtures: bound form returns exactly Origins.Items.1.DomainName and
Origins.Items.2.DomainName on the stale->new pair, nothing on identical inputs, and names every changed path
(Enabled, Id, Quantity, DomainName) on an unrelated config.

DO, on the same branch, one commit, push:
1. diffpaths.jq line 335 -> `| map(. as $p | select( ($A | getpath($p)) != ($B | getpath($p)) ))`
2. Before the CHANGED==0 branch (355-359): assert that exactly one origin with Id "$TARGET_ORIGIN_A" and exactly one with
   Id "$TARGET_ORIGIN_B" exist in /tmp/cfg-old.json; otherwise ::error::STOP naming which is missing, exit 1.
   "Already repaired" may be printed only when both exist AND both already carry $PUBDNS.
3. Add `set -e` beside `set -o pipefail` in every run: body of steps (e) and the post-write proof, so a jq failure is a
   named red with the file's own ::error:: text, not a silent runner abort.
4. Test lens that EXECUTES the program: extract the diffpaths.jq heredoc from the parsed workflow (not a retyped
   copy), run it with the system jq against three fixtures - stale pair -> exactly the 2 DomainName paths; identical
   pair -> empty; targets absent -> step 2's stop fires. Plant the old `getpath(.)` form and show the test goes RED.
   If jq is not on the CI runner, the test says so and fails; it does not skip silently.
5. Report: append an AMENDMENT section to docs/relay/VECTOR-ORIGIN-REPAIR-S144-1-AG4-report.md (your own file).

FORBIDDEN: no other file; no dispatch; no merge; no adversary/scout post on your own head.
REPLY (on the bus): SLIP-VECTOR-ORIGIN-REPAIR-S145-1-AG4-AMEND with the new 40-hex head, local test counts, and
the plant-RED line. The Architect then sends the scout to re-read that head.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 059f071b-083a-4aa3-8e18-173fb8740f5c
```
SEAL NOTE: exempt because this amendment carries no new design - it is the scout's own prescribed fix from that
verdict row, same subject as the scout-GREEN card v2. The scout still judges the resulting HEAD (adversary/scout is
required on every head), so review is not skipped, only not duplicated on the order text.

END · AMEND-VECTOR-ORIGIN-REPAIR-S145-1-v1
