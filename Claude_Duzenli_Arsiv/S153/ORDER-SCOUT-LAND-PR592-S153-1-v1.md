<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR592-S153-1-v1

LANE: scout (whichever scout window is free first; scout-1 keeps PR 590 first)
fanout: personalized (one lane, one body)
FROM: Architect, S153, bus clock about 2026-09-21T21:30Z
OWNER APPROVAL: OWNER-APPROVAL-S152-LANDINGS-1 (named list of seven landings, 2026-09-22 00:04 TSI) names DIGEST-SPAN-CAP: it lands on scout GREEN plus CI GREEN with no further question.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: take code context from graft first (graft ask --source, graft grep, graft callers); raw grep only for what graft does not index. Your status carries a GRAFT line listing the graft commands you ran.
WHAT: adversary review of the digest span-cap code on PR 592 (CARD-DIGEST-SPAN-CAP-S152-1-v2, your own RED-v1 edits M1 and R1-R6 applied), then the adversary/scout status on the head that will land. Closes register item 54 (F-S152-DIGEST-SPAN-CAP-DROPS-TAIL-SILENTLY-1).

## PREMISE
MEASURED: 2026-09-21T21:14:35Z, AG-4's slip SLIP-DIGEST-SPAN-CAP-S152-1 on the bus: branch phase/digest-span-cap-s152-1, head 8909df209289bbfcf5fe6879f7cb353d0e3d07d1, PR 592, off floor 9cb7fefc947745bec1fdd97aff62d58c34c47919; CI runs Build and Test, Relay corpus, report-schema, Auto-merge landing all QUEUED at slip time; local build green incl doc-drift, suite 737 files green, tenant-zero OK.
MEASURED: the slip says TAIL_KEEP=5 ring; spansTruncated has its own type; halving keeps the tail plus a first-span floor; panel line plus gap marker; plant reds; doc-drift two tabs updated and resealed.
MEASURED: the slip's ORDER 0 finding: tool-loop spans (ai.*, cwf.mcp.tool, cwf.grounding) land under stage key '10' (ancestry from cwf.stage.10.stream) and nothing maps to '11', so the '11' readers find no bucket on live turns.
UNMEASURED: CI conclusions at the head; whether PR 590 or PR 591 landed first and moved master.
SELF-INVALIDATION: dies if PR 592 is closed or its branch is replaced.
ON-DISAGREEMENT: if any value above DIFFERS from your own re-measurement, YOUR READING WINS: print both, continue with the measured value, and name the difference in your status.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and `git ls-remote origin refs/heads/phase/digest-span-cap-s152-1` (full 40-hex both). If the branch head is not 8909df209289bbfcf5fe6879f7cb353d0e3d07d1, diff the two heads and say what moved before anything else.
2. REVIEW THE CODE at the branch head: the diff against master in every non-doc file. Hostile questions: (a) at the cap, is the TAIL kept (the last TAIL_KEEP spans) and the head kept down to the first-span floor, with no span silently dropped: every dropped span is counted in spansTruncated and shown as a gap marker in the panel? (b) is the client type that feeds the renderer (your M1) updated, and does a digest UNDER the cap render byte-identically to before? (c) the halving loop: can it ever drop the tail or loop forever on a single oversized span? Measure with a fixture, do not reason. (d) the ORDER 0 finding: is it only reported, or did the PR change any '10'/'11' mapping? A mapping change outside the card is RED. Name every reader of stage key '11' by graft callers. (e) any vocabulary word, category, backend or tenant name in new code or fixtures (AGNOSTIC-1)? (f) the doc-drift reseal: reseal digests equal the gate's reported values?
3. Read CI at the CURRENT head by the full 40-hex sha (actions runs by head_sha; read a zero TWICE). Name each run and its conclusion; a SKIPPED job is named, never folded into green.
4. If steps 1-3 are clean AND every required CI context is green at the current head: post the adversary/scout status on that head. If CI is still running or master moved and the PR needs a merge: post nothing, write your status with the review verdict and the state, and stop; the Architect re-orders.
REPLY (on the bus): SCOUT-STATUS-LAND-PR592-S153-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=592 head=<40-hex>`, then the findings, the CI runs by name, whether the status was posted, and the GRAFT line. If the bus write is refused (register item 17), print the whole status in your window so the owner can relay it.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR592-S153-1-v1
