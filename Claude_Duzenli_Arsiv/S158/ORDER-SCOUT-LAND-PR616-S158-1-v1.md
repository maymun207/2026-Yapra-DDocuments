<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR616-S158-1-v1

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T04:34Z
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (40c C2 lands on scout GREEN plus CI GREEN); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
WHAT: adversary landing review of PR 616 (CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v2, AG-1, bus 2026-09-23T07:46:56Z) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: GitHub API 2026-09-26T04:31Z: master 5e0b13c8d60c296ac0e203a3d5e39ba4935ce138 (PR 614 merge); PR 616 open, non-draft, head 8ecf873ce2c5f02136fbaaaba3b2bc6364797582; actions/runs?head_sha=<head>: Build and Test success (attempt 2, re-run after #615 closed, per RULING-PR616-PR617-S158-1), Relay corpus, report-schema, Auto-merge landing success.
READ: AG-1 slip SLIP-PR616-MASTER-MERGE-S158-1: merged master no-ff; manifest took master's bytes + reseal (13 seal lines); stageTools auto-merged; no hand-edit; build 5 gates green; suite 11172 pass, 1 local timing failure (vectorLane admission) that CI passed.
SELF-INVALIDATION: dies if PR 616's head is not the head above or a descendant. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/616/head (full 40-hex).
2. REVIEW against card v2 (doc repo Claude_Duzenli_Arsiv/S158/CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v2.md, or the bus row by name): the K24 trace fields (derived, hints, offeredByBackend) are observational only — no routing decision changes; empty ≠ zero on each field; no ARMES name added outside data (case-sensitive grep over the fence, quote it); no user-visible function removed; FILE-FENCE quoted, every changed path vs master inside it (--name-status, rename sources included); QUOTE the merge guard's VERDICT line on the green run.
3. CI at the CURRENT head by full sha; a zero read twice; SKIPPED named.
4. If clean: post adversary/scout success on that head; print whether master moved after.
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-LAND-PR616-S158-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=616 head=<40-hex>`. If the bus write is refused, print the full reply and the exact error line and stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR616-S158-1-v1
