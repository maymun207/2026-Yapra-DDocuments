<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR593-S154-1-v1

LANE: scout (whichever scout window is free first)
fanout: personalized (one lane, one body)
FROM: Architect, S154, bus clock about 2026-09-22T12:33Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1 plus S154 plan approval "onayliyorum" 06:40 TSI (item 58 G1 lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary review of PR 593 (CARD-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1-v2, AG-1) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-22T12:32Z, Architect bridge, GitHub API pulls/593: open, head d23bde41100167caf97a7e0b02661915bba87690, base 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4, mergeable true, mergeable_state blocked.
MEASURED: 2026-09-22T12:32Z, actions/runs?head_sha=d23bde41100167caf97a7e0b02661915bba87690: total 4, Build and Test, Relay corpus, report-schema, Auto-merge landing all completed success; commit status Vercel success; no adversary/scout status.
RELAYED: AG-1 slip SLIP-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1 (bus 10:23:55Z): eval-canary SKIPPED; dark items D1 MemoryTab/RoutingTab call sites touched although the card's ORDER 7 excluded them, D2 two workflows need a backend input, D3 a BACKEND_IDS seed line.
SELF-INVALIDATION: dies if PR 593 is closed or its head is not d23bde41100167caf97a7e0b02661915bba87690 or a descendant.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and the PR branch head (full 40-hex).
2. REVIEW the diff against master in every non-doc file. Hostile questions: (a) FALSIFIER of the card: does any change alter a system-prompt, tool-description or tool-result byte, or which tools a live turn is offered? (b) backendOf UNASSIGNED and its three callers behave as ORDER 1 says, with tests; (c) no user-visible function removed; the MemoryTab and RoutingTab changes (dark D1): do they keep the collision check and the routing edit working for today's backend; (d) the two workflows (dark D2): does a workflow now fail for want of a backend input, and is that a lost function; (e) any backend, vendor or tenant name ADDED in code; count `git grep -n -E "armes|Armes|ARMES"` over the touched files and compare with master.
3. Read CI at the CURRENT head by full sha; read a zero twice; SKIPPED is named.
4. If 1-3 are clean and every required context is green: post adversary/scout on that head. Otherwise post nothing and write your status.
REPLY (on the bus): SCOUT-STATUS-LAND-PR593-S154-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=593 head=<40-hex>`, then findings, CI runs by name, whether the status was posted, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR593-S154-1-v1
