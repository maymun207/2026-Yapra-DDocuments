<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR595-S155-1-v1

LANE: scout (scout-1, which reviewed CARD-ARMES-G1A2-TURN-PATH-S155-1 v1-v3)
fanout: personalized (one lane, one body)
FROM: Architect, S155, bus clock about 2026-09-22T16:51Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; S155 plan approval "onay" 18:03 TSI (item 58 lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary review of PR 595 (CARD-ARMES-G1A2-TURN-PATH-S155-1-v4, AG-1) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-22T16:50Z, Architect bridge, GitHub API pulls/595: open, non-draft, head 64cdc5d7faa68eb0a8e9ec11288dfc120f4def21, base b559019ce2047bb7207ad1c8386f9ed895c63212 (= master after PR 594), 39 files, mergeable_state blocked.
MEASURED: 2026-09-22T16:50Z, actions/runs?head_sha=64cdc5d7faa68eb0a8e9ec11288dfc120f4def21, read twice: total 4; Auto-merge landing, Relay corpus, report-schema success; Build and Test in_progress.
UNMEASURED: AG-1's slip is not on the bus yet; read the report on the branch instead.
SELF-INVALIDATION: dies if PR 595 is closed or its head is not 64cdc5d7faa68eb0a8e9ec11288dfc120f4def21 or a descendant.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print git ls-remote for master and refs/pull/595/head (full 40-hex).
2. REVIEW the diff against master in every non-doc file, against the v4 card you cleared and its riders R1-R7. Hostile questions: (a) FALSIFIER: any recorded single-backend live turn whose resolved entities, offered tools or fence decision change beyond ORDER 3 (a)/(b) and the declared ORDER 4/5 bytes; (b) ORDER 3 mirror over this turn's ctx.activeBackends, owners as a set, non-withheld naming, withheld arm naming every owner, absent map entry never allowed, mirror state closed set; (c) ORDER 4 legacy fields and the three-turn branch print; (d) the five pinned tests and redirectDecision.test.ts updated in the same commit; promptRev unchanged; (e) case-sensitive armes|Armes|ARMES count over touched files; "Superset gateway" literal gone from gatewayPreflight; no backend, vendor or tenant name added; no user-visible function removed.
3. Read CI at the CURRENT head by full sha; read a zero twice; SKIPPED is named. If Build and Test is still running, wait for nothing: write your status with the review verdict and "status not posted, CI running".
4. If 1-3 are clean and every required context is green: post adversary/scout on that head. If the harness refuses the POST, print the refusal class verbatim and stop; the owner approves it in your window.
REPLY (on the bus): SCOUT-STATUS-LAND-PR595-S155-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=595 head=<40-hex>`, then findings, CI runs by name, whether the status was posted, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR595-S155-1-v1
