<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR613-S158-1-v1

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S158, bridge clock 2026-09-23T09:57Z
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (plan step 4: G2 lands on scout GREEN plus CI GREEN); OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (the owner's top rule).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary landing review of PR 613 (CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v4, AG-1; successor of PR 612 under RULING-PR612-FENCE-S158-1) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-23T09:57Z, Architect bridge, GitHub API: PR 613 open, branch phase/armes-g2-knowledge-as-data-s156-2, head 0d350fcedc336a290ded373501a8d893d5b30261; PR 612 closed. Master 0b14ef3bf6cea0296a02e28aa11e9ec224a6043b.
MEASURED: actions/runs?head_sha=<head>: total 4; report-schema, Relay corpus, Auto-merge landing success; Build and Test in progress with job changes (the merge guard) SUCCESS, build (24.x) and rule26 running, eval-canary SKIPPED.
READ: AG-1 slip SLIP-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1: local build 5 gates green, suite 11119/0, typecheck:api clean, parity DIFFS 0, ORDER 2 live store plan CLEAN (0 changed, 0 claim-firing, 0 absent/missing/reclaim); STOP sites named for DB changes (metric-authority key at 3 sites; superset routing-hint row text).
SELF-INVALIDATION: dies if PR 613 is closed or its head is not the head above or a descendant. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print git ls-remote for master and refs/pull/613/head (full 40-hex).
2. REVIEW against card v4 (doc repo Claude_Duzenli_Arsiv/S158/CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v4.md) and your own v3 delta E1..E9. Hostile questions: (a) ORDER 12 count, case-sensitive: run it at the head and QUOTE the output; any line beyond the NAMED RESIDUAL and ORDER 7's STOP sites is RED; (b) FAIL-CLOSED: no-DB-configured = outage, zero rows = normal path (E1, E3), the turn reads its own context copy (E2); (c) no user-visible function removed; (d) data/backends JSON imported statically, no fs read on the turn path (E7); (e) the report's FILE-FENCE: QUOTE it; every changed path is inside it; QUOTE the merge guard's own lines (FENCE-GREW ok, fence classes); (f) git diff between PR 612's head ce9efcbf50488b37cacb6b3d164fe803a2f30fb9 and this head touches only the report's fence (RULING step 3).
3. Read CI at the CURRENT head by full sha; a zero read twice; SKIPPED is named. If Build and Test is still running, re-read the run (no poll task; at most 12 reads, 90 s apart), then continue.
4. If 1-3 are clean and every other required context is green: post adversary/scout on that head; print whether master moved after your post. If the harness refuses the POST, print the refusal class verbatim and stop.
REPLY (on the bus): SCOUT-STATUS-LAND-PR613-S158-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=613 head=<40-hex>`, then findings, the ORDER 12 output, quoted guard lines and FILE-FENCE, CI runs by name, whether the status was posted, master sha after, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR613-S158-1-v1
