<!-- relay-audit: v1 kind=card -->
CARD-SCOUT-ACK-S167-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 card" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:08Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master`. At 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64, scripts/mail-wait.mjs:441-447 (ACK BY REPLY) and :1029-1044 (`takesByStamp`, `ackByReplyLine`, `takeDelivery`): a claimable address (AG-n) stamps consumed_at at delivery; a non-claimable address (scout-1, scout-2) stamps NOTHING and is acknowledged only by its FINAL scout_reply (`replyAckClause`).
ON-DISAGREEMENT: if those lines are not what you read, quote what is and stop.
WHY: owner, 2026-10-01 00:04 TSİ: "her scout ve ag okumaya basladiginda karti ben okudum diyemez mi?" A scout is invisible from pickup to its final reply (15–30 min). S167 measured the cost: scout-2's background waiter never woke for a 20:29Z order and the Architect could only learn it from the owner's screenshot 25 minutes later. Plain words: when a scout starts a job, nobody can tell; only when it finishes.
AUTHORITY: OWNER-APPROVAL-S167-SCOUT-ACK-1 ("onay scout-ack", 2026-10-01 00:05 TSİ) · §12.1 NEW subject → scout pre-review before this card is sent.
```evidence:adversary
ADVERSARY: PENDING
why: scout-1 pre-reviews this card under ORDER-SCOUT-PREREVIEW-SCOUT-ACK-S167-1; sent only as v2 carrying the verdict.
```
FENCE ORDER: CARD-SESSION-TOKEN-S167-1 (AG-4) also edits scripts/mail-wait.mjs. THIS card lands FIRST; SESSION-TOKEN opens its PR only after this one is on master (A-REC-S166-1: one file, one PR at a time).
NO CRON TASK. GRAFT: graft first; the slip carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — lane plumbing; `architect:open` / the bus is the surface. Say so in the report.

## WORK (push-first)
K1. PICKED-UP AT DELIVERY, WRITTEN BY THE MACHINE: in `takeDelivery`, for a non-claimable address, post ONE `from_lane` row through the SAME write path a scout's scout_reply uses (name it, file:line): artifact_name `PICKED-UP-<card artifact>`, reply_to = the card id, body = `[<address>] PICKED-UP <artifact> at <ISO> window=<token or UNMEASURED>`. Print `[mail-wait] [PICKED-UP] <artifact> posted (<row id>)`. A write failure prints `[mail-wait] [PICKED-UP] <artifact> NOT POSTED (<reason>)` and delivery continues — the card is never withheld because the ack failed.
K2. THE PICKUP IS NOT THE FINAL ACK: `replyAckClause` must keep treating the card as open until the scout's REAL reply exists — a `PICKED-UP-*` row does NOT drop the card from the box (otherwise a scout that dies after pickup silently loses its card). Name how you distinguish them (artifact prefix) and pin it in a test.
K3. `architect:open` (or the Architect's bus read): a card with a PICKED-UP row and no final reply after its BUDGET line prints `SCOUT-OVERDUE <address> <artifact> picked <ISO>`.
TESTS: scout delivery → exactly one PICKED-UP post (retry path included, no double post); AG delivery → unchanged (stamp, no PICKED-UP) byte-identical to today; PICKED-UP alone → card still in box; PICKED-UP + final reply → card dropped; write failure → delivery still happens; planted fault: remove the K2 prefix check → the "PICKED-UP alone" test goes red.
FENCE: scripts/mail-wait.mjs · its tests (name them) · the architect:open script if K3 lives there · docs/relay/SCOUT-ACK-S167-1-AG1-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-sa -b phase/scout-ack-s167-1 <master sha>`.
2. K1–K3 + tests; first commit + push + `gh pr create --base master` within 10 minutes; proofs after (new tests + existing mailWait* ONCE each; typecheck:api ONCE).
3. Report, commit (`git commit -F <file>`), push. Slip SLIP-CARD-SCOUT-ACK-S167-1 (bus; `[AG-1]`, `GRAFT:` line). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 45 min. A permission you cannot pass → slip it and stop.
FORBIDDEN: changing AG-n delivery behaviour; --force; paths outside the fence; merging; migration; cron; printing an environment value.

END · CARD-SCOUT-ACK-S167-1
