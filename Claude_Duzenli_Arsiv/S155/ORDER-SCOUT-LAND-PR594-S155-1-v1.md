<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR594-S155-1-v1

LANE: scout (whichever scout window is free first)
fanout: personalized (one lane, one body)
FROM: Architect, S155, bus clock about 2026-09-22T15:35Z
OWNER APPROVAL: S155 plan approval "onay" 18:03 TSI (item 30 lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary review of PR 594 (CARD-LANE-FETCH-PROXY-S155-1-v2, AG-4) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-22T15:34Z, Architect bridge, GitHub API pulls/594: open, head f592bce014f827a8f2140d43c87cba41b3382141, base fdb0df24d0b9dd288223fec55da4185f4ca62382, mergeable true, mergeable_state blocked.
MEASURED: 2026-09-22T15:34Z, actions/runs?head_sha=f592bce014f827a8f2140d43c87cba41b3382141, read twice: total 4; report-schema, Relay corpus, Auto-merge landing completed success; Build and Test in_progress.
UNMEASURED by the Architect, RELAYED from AG-4 slip SLIP-LANE-FETCH-PROXY-S155-1 (bus 15:32:20Z): proof in a proxied window (unmodified mail-wait READ-FAILED, this head DIGEST-OK, no prefix); plant 5 red; local build 5 gates + full suite green; dark: laneWrite pg/TCP out of scope, a2aClient and vectorLiveProof routed but not classified, tsx IPC EPERM.
SELF-INVALIDATION: dies if PR 594 is closed or its head is not f592bce014f827a8f2140d43c87cba41b3382141 or a descendant.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and the PR branch head (full 40-hex).
2. REVIEW the diff against master in every non-doc file, against your own RED status on v1 (bus 2026-09-22T15:07:41Z). Hostile questions: (a) is the routing at module load of the rpc modules or one shared helper, reached by every importer you named (archivePush, authoritySnapshot, factoryState, laneSlip, census, claimRoster), and never in a CLI main; (b) with no proxy variable set, is behaviour byte-identical to master; NO_PROXY honoured; API-absent prints a named class; (c) can any output print a proxy URL or userinfo, and does the planted-userinfo test prove it cannot; (d) "proxy set but unused" classified before DNS; READ-FAILED still the third value; (e) no new dependency; any backend, vendor or tenant name added. Then re-read your own order without an env prefix at this head if your window is proxied, and say which branch that proves.
3. Read CI at the CURRENT head by full sha; read a zero twice; SKIPPED is named.
4. If 1-3 are clean and every required context is green: post adversary/scout on that head. Otherwise post nothing and write your status.
REPLY (on the bus): SCOUT-STATUS-LAND-PR594-S155-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=594 head=<40-hex>`, then findings, CI runs by name, whether the status was posted, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR594-S155-1-v1
