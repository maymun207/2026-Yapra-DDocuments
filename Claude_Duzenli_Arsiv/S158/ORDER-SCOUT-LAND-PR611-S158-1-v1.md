<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR611-S158-1-v1

LANE: scout (scout-1 window, which just wrote the C2 review; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S158, bridge clock 2026-09-23T07:44Z
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (plan step 2: shared clone guard lands on scout GREEN plus CI GREEN); owner's words "bunun birdaha olmamasi icin onlem al !", 2026-09-23 08:07 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary landing review of PR 611 (CARD-SHARED-CLONE-GUARD-S157-1-v2, AG-2) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-23T07:44Z, Architect bridge, GitHub API: PR 611 open, head a4d232e28e62acf700001a01b3e8b07b6d1e8f2c, ahead 2 behind 0 of master 2d7087bff1eda24b6224c2fbd9a9d987061dec7d, auto-merge armed; 8 files: .claude/boot/foreman.md, .claude/boot/free.md, .claude/boot/producer.md, CLAUDE.md, api/cwf/__tests__/laneBootOneCommand.test.ts, docs/relay/SHARED-CLONE-GUARD-S157-1-AG2-report.md, scripts/laneBoot.mjs, scripts/laneClose.mjs.
MEASURED: actions/runs?head_sha=<head>: total 4, Auto-merge landing, report-schema, Relay corpus, Build and Test all success; commit statuses: Vercel success, NO adversary/scout.
READ: AG-2 slips SLIP-SHARED-CLONE-GUARD-S157-1 and SLIP-PR611-RED-S158-1 (bus 07:41Z): D1-D7 built, D8 print-only; the earlier red was the report's grammar only.
SELF-INVALIDATION: dies if PR 611 is closed or its head is not the head above or a descendant. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print git ls-remote for master and refs/pull/611/head (full 40-hex).
2. REVIEW the diff against card v2 D1-D8 (the card is in the doc repo, Claude_Duzenli_Arsiv/S158/CARD-SHARED-CLONE-GUARD-S157-1-v2.md). Hostile questions: (a) no automatic delete, checkout, reset or clean of any file in the shared clone anywhere in the diff; (b) --porcelain resolution survives a double-space path (D1); (c) any stderr or non-zero exit is SHARED-CLONE-UNMEASURED and moves nothing (D2); (d) a failed ff prints FF-FAILED and never retries (D3); (e) the boot snapshot lives inside .git (D5); (f) the report's FILE-FENCE: QUOTE it; every changed path is inside it; (g) QUOTE the merge guard's own lines from this PR's Build and Test log.
3. Read CI at the CURRENT head by full sha; a zero read twice; SKIPPED is named.
4. If 1-3 are clean and every other required context is green: post adversary/scout on that head; print whether master moved after your post. If the harness refuses the POST, print the refusal class verbatim and stop.
REPLY (on the bus): SCOUT-STATUS-LAND-PR611-S158-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=611 head=<40-hex>`, then findings, quoted guard lines and FILE-FENCE, CI runs by name, whether the status was posted, master sha after, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR611-S158-1-v1
