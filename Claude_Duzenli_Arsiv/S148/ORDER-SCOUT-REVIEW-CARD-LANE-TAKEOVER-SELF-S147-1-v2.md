<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v2

LANE: scout
fanout: personalized (one lane, one body)
FROM: Architect, S148, 2026-09-20T10:50Z
OWNER APPROVAL: OWNER-APPROVAL-S145-PLAN-1 (plan item 3) + bootstrap v150 section 4 (item 15 v2 -> scout).
NO POLL OR CRON TASK. Bekleme dongusu yok. This is the only order for this window; when its status is written, stop.

WHAT: adversarial review of v2 of the card you held RED (your SCOUT-STATUS-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v1, bus 2026-09-20T09:39:56Z). Card body = the bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
MEASURED: 2026-09-20T10:50Z, sha256sum of the card file in the doc repo: sha256 = 400c89c01f1488bf196c919d13fe4fd8d5b57ddf8979229cb4f41738d0d15f1e (12472 bytes).
ON-DISAGREEMENT: if your sha256 of the extracted body differs, print both and review the bytes you extracted; the difference is a finding.

## PREMISE

MEASURED: 2026-09-20T10:50Z, cardPreflight --check on the card file in the owner clone: GREEN, every check. That is GRAMMAR, not review (12.1).
UNMEASURED: whether v2 answers D1-D5 and the decayed premise, and whether it opens a new hole - that is your review.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching the card's scope fence, or if a v3 appears.

## ORDERS

1. Run the repository card gate on the extracted bytes, every check; print the result (node --import tsx/esm if npx tsx hits EPERM; NODE_USE_ENV_PROXY=1 for node fetch).
2. Attack from the primary sources. For EACH of your v1 defects (premise decay, D1, D2, D3, D4, D5) say ANSWERED or NOT, with file:line. Hostile questions for v2: (a) can the ownness file be satisfied by a window that does NOT hold the address - e.g. two windows sharing one Claude Code ancestor, a reused pid after reboot, a stale file whose nonce still equals the held sha after a crash? (b) is (pid, start time) of an ancestor process readable from a lane sandbox at all, and is ORDER 0's STOP-and-keep-2-5 fallback safe? (c) does ORDER 1(d), passing the typed flag's lane as selfLane on the owner path, recreate the same-variable defect? (d) does ORDER 3's move to plain --once as birth read reintroduce F-S117-FOREMAN-BACKLOG-BLIND-1 (the row AT the anchor)? (e) anything in v2 already built on master (12.6)?
3. Verdict: GREEN first line exactly
   ADVERSARY-VERDICT: GREEN card=CARD-LANE-TAKEOVER-SELF-S147-1-v2 sha256=<sha256 of the body>
   or RED with each defect by file:line and the change that would make it GREEN.
FORBIDDEN: read-only. No status post, no edit, no poll task, no cron. Never print an environment value (use npm run env:presence, not env).
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v2.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-LANE-TAKEOVER-SELF-S147-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
SUPERSEDES CARD-LANE-TAKEOVER-SELF-S147-1-v1, which the scout held RED (SCOUT-STATUS-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v1, bus 2026-09-20T09:39:56Z, defects D1-D5 plus a decayed premise). Every order below answers a named defect. NEW subject content, so it returns to the scout first (12.1); no gate lift is claimed.
OWNER APPROVAL: OWNER-APPROVAL-S145-PLAN-1 (plan item 3, self-takeover boot rule) and bootstrap v150 section 4 ("15 v2 (design ownness proof -> scout)").
BRANCH: phase/lane-takeover-self-s147-1 · PUSH: yes · REPORT: docs/relay/LANE-TAKEOVER-SELF-S147-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report (F-S147-REPORT-ON-PR-LESS-BRANCH-NEVER-GATED-1).
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch the scope fence below. If a descendant touches it, STOP and print the commit.
ON-DISAGREEMENT: if any line number or behaviour below differs from what you measure at the head, YOUR READING WINS: print both, and the difference is a finding in the report.

THE PROBLEM, in plain words. After /clear the same lane window re-boots its OWN address and today the owner must type --confirm-takeover by hand. The owner ruled (OWNER-RULING-S145-SELF-TAKEOVER-1) the lane may confirm its OWN address itself. v1 tried to do that from the lane argument; the scout proved the lane argument is an assertion, not evidence, and that the one function built to tell OWN from OTHER (classifyDestructive) is fed the same variable twice at the takeover call site. v2 first builds the missing evidence, then lets the lane confirm ONLY when that evidence is present. When it is absent, behaviour is byte-for-byte today's: the owner types the flag.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master and production are the PR 588 merge | MEASURED: Vercel list_deployments target=production READY + git log origin/master in the owner clone, 2026-09-20T10:17Z | floor |
| the cited lines at master | MEASURED: git show over the floor sha in the owner clone, 2026-09-20T10:27Z and 10:42Z | lines |

```evidence:floor
production READY: meta.githubCommitSha 20c1651c3fb59b48490670ffefed02099d684ed9 (Merge pull request #588)
owner-clone origin/master 20c1651c3fb59b48490670ffefed02099d684ed9; the six record merges after it change only docs/relay/ (vercel-ignore skipped their builds)
PR 588 diff from 33ebbee70bcd7e198ec4a01fdf5fb8532202d2d9: .claude/boot/foreman.md free.md producer.md, .claude/commands/claim.md, .claude/loop.md, CLAUDE.md, api/cwf/__tests__/noPollTask.test.ts, one relay report
```

```evidence:lines
scripts/laneBoot.mjs:119  const { lane, confirm } = opts;   (lane comes from argv)
scripts/laneBoot.mjs:180  STOP: no --confirm-takeover ... a person types: --confirm-takeover
scripts/laneBoot.mjs:182  if (confirm.lane !== lane || confirm.heldNonce !== heldNonce)
scripts/laneBoot.mjs:195  planTakeover(... by: 'owner (typed --confirm-takeover)')
scripts/laneBoot.mjs:236  deps.reclaim(lane, lane, deadNonce)   (row write AFTER push + read-back)
scripts/laneBoot.mjs:252  'PATH-B takeover confirmed by a typed flag'
scripts/laneBoot.mjs:304  dwellVerdict({ ..., targetLane: lane, selfLane: lane, ... })
scripts/factoryState.mjs:1031-1043  classifyDestructive: DWELL iff selfLane === targetLane, else PROPOSE_ONLY
supabase/migrations/20260825153000_factory_recovery.sql:104-131  factory_reclaim: SELECT..INTO without FOR UPDATE, then UPDATE with no nonce predicate in WHERE
.claude/boot/producer.md:285-300  birth read taught as --once --since <iso>; says bare --since is ACCEPTED and degrades
scripts/mail-wait.mjs:263 flag('since'), :617 comment "still teaches a birth read keyed on --since", :629 sinceVerdict
.claude/boot/free.md:85  "Do not check out, do not fast-forward, do not create a worktree."
CLAUDE.md:306  close hygiene already orders git worktree list + remove + prune
```

## PREMISE

MEASURED: 2026-09-20T10:27Z, git diff --name-only over the PR 588 range named in `floor`: touches CLAUDE.md and three boots inside this card's fence; every line cited in `lines` was RE-READ at the floor sha after that movement, so the premise is measured at the head, not carried.
MEASURED: 2026-09-20T10:42Z, git show <floor sha>:scripts/factoryState.mjs lines 1031-1043 and the factory_reclaim migration lines 104-131, as quoted in `lines`.
UNMEASURED: whether a lane window's process ancestry identifies the SAME Claude Code process before and after /clear. ORDER 0 measures it; ORDER 1 is gated on the result.
UNMEASURED: whether the scout's shape 3 (--since <iso> refused exit 2 when a watermark exists) holds at the head; the scout measured it at the floor sha and ORDER 3 re-measures it.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching scripts/laneBoot.mjs, scripts/mail-wait.mjs, scripts/factoryState.mjs, CLAUDE.md or .claude/boot/**.

## ORDERS

ORDER 0 - MEASURE THE WINDOW'S IDENTITY (answers D1; measure-only, no code). From inside laneBoot's runtime, walk the parent-process chain (process.ppid, then ps -o ppid=,lstart=,comm= -p <pid>) until the Claude Code process. Print the chain. The candidate window identity is the pair (that process's pid, its start time). Write the pair to a probe file under the per-user state home you choose (outside the repository tree; never under a path git tracks). The owner /clears this window at the end of this card anyway; the NEXT boot of AG-4 prints the chain again and compares with the probe file, and that comparison is recorded in THAT boot's slip. In THIS card's report, state whether a Claude Code ancestor with a readable start time exists at all. If none exists, or ps is refused by the sandbox, STOP ORDER 1, keep ORDERS 2-5, and print the seam.

ORDER 1 - OWNNESS PROOF, then self-confirm (answers D1 and D2). Only if ORDER 0 found the ancestor:
(a) At every successful claim (PATH A and PATH B, after read-back AND after the row write succeeds), write an ownness file keyed by the window identity: { lane, nonce_sha, identity_pid, identity_start }.
(b) At boot, compute selfLane from that file ONLY: the file for the CURRENT window identity exists, its lane equals the address, and its nonce_sha equals the heldNonce this run measured. Otherwise selfLane is null. argv and the printed held sha are NEVER a source of selfLane.
(c) Consent has exactly two sources: the ownness proof, or the owner's typed --confirm-takeover (today's check at :182, unchanged). With neither, STOP exactly as today at :180 (text may add one line telling the lane its proof was absent and why).
(d) :304 passes the MEASURED selfLane (or, when consent came from the owner's typed flag, the lane named by that typed flag) as selfLane; targetLane stays lane. The two values are independently sourced.
(e) `by` at :195 and the slip line at :252 are derived from the consent source: `self (ownness proof, OWNER-RULING-S145-SELF-TAKEOVER-1)` or `owner (typed --confirm-takeover)`. Never a constant.
(f) Every other check stays in effect byte-identically: CANDIDATE notice, dwell, lease pinned to the held sha, no bare --force, read-back.
(g) producer.md and foreman.md passages on takeover say: the lane runs its own boot; a proof-backed own-address takeover proceeds; any other case STOPS and reports. free.md is NOT touched by this order (the scout holds no address).

ORDER 2 - HALF-TAKEOVER HEAL (answers D4). First MEASURE with the existing laneBoot harness: plant a row-write failure after a successful push and print the resulting state. Then: after a failed reclaim, re-read the row; if it still holds the dead nonce, retry the SAME factory_reclaim call ONCE with the SAME dead nonce; never fall back to writeLane or factory_claim (factory_claim admits a CLOSED or absent row and would clobber). If it still fails, exit FAULT printing the one exact recovery call (scripts/factoryState.mjs reclaim with lane, dead nonce, new nonce). The ref-THEN-row order does NOT change: the ref push is the serialiser (the server elects one winner; the loser stops at NON-FAST-FORWARD or TWIN before any row write), and factory_reclaim's check-then-act is not atomic, so writing the row first would expose it. State this in a code comment at the retry. A CAS migration is OUT OF SCOPE for this card (supabase/migrations/ is not in the fence); name it in the report as the follow-up it is.

ORDER 3 - --since, all three shapes (answers D5). Re-measure first: `--since=<iso>`, bare `--since`, `--since <iso>` with a watermark present; print exit codes. Then: bare `--since` is REFUSED by name, non-zero, like `--since=<iso>`. And the boots stop teaching `--since <iso>` as the birth read: producer.md:285-300 and the equivalent passages in foreman.md (around :608-610) and free.md (around :209) teach plain `--once` as the birth read (its watermark predicate is the stronger one) and state in one line that all --since shapes except a well-formed `--since <iso>` are refused. The warning paragraph in producer.md is REPLACED by that statement, not deleted ahead of it. No script passes --since to mail-wait (scout's grep); do not change the five lens scripts with their own parsers.

ORDER 4 - OWN WORKTREE (answers D3). BOX READ FIRST: immediately before any push that moves a lane ref and before any git worktree remove, re-read your box and print it. Add ONE line, byte-identical, to CLAUDE.md section 5 and to producer.md and foreman.md only: "OWN WORKTREE. A producing lane builds every branch in its own worktree (git worktree add off origin/master), never in the main worktree another lane uses; close-time removal is CLAUDE.md section 8." free.md is excluded (free.md:85 forbids a scout worktree and stays). The removal half is NOT restated.

ORDER 5 - TESTS, failing-first, each proven by planting the fault it guards and removing the plant: (a) proof present, same identity, same nonce, CANDIDATE -> CLAIMED, by=self; (b) proof present but nonce differs -> STOP, no self-consent; (c) proof for another identity -> STOP; (d) no proof, owner typed flag -> CLAIMED, by=owner (today's path intact); (e) at :304 the dwell receives a selfLane that is not the argv variable (the silenceContractAddendum.test.ts:321-340 separation is EXTENDED, never weakened); (f) planted row-write failure -> one same-nonce retry, never factory_claim, then healed or FAULT with the recovery call; (g) bare --since -> non-zero, refusal named; (h) the ORDER 4 line byte-identical in its three files and absent from free.md.

ORDER 6 - Branch off current master, ONE pull request, --no-ff history, never a squash. npm run build (all five gates; reseal in the SAME commit if doc-drift maps a file) and the suite, locally; print counts, naming them as local results on an unsynchronised head. Report at the path above on the SAME branch; the report follows the landing and never gates it (12.8). Slip with the forty-hex head.

## FALSIFIER

If ORDER 0 finds no stable window identity, ORDER 1 is NOT built and the report says so; ORDERS 2-5 still land. If any path lets selfLane equal the target without the ownness file for the current identity, STOP and print it. If healing ORDER 2 would require the row write before the push is proven, STOP. If any existing laneBoot, mail-wait or silenceContract test must be weakened (not extended) to pass, STOP and name it.

## SHARED SURFACES

```scope
- scripts/laneBoot.mjs
- scripts/mail-wait.mjs
- scripts/factoryState.mjs (read; a helper for the ownness file may live here)
- CLAUDE.md
- .claude/boot/producer.md
- .claude/boot/foreman.md
- .claude/boot/free.md (ORDER 3 --since passage only)
- tests beside the existing laneBoot / mail-wait / silenceContract tests
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/relay/LANE-TAKEOVER-SELF-S147-1-AG4-report.md
```

## DECISION RIGHTS

You choose the ownness file's home (outside the repo tree) and format, the identity walk's exact commands, test file homes and names, and the retry's shape within ORDER 2's limits. You may refuse on evidence this card did not anticipate. FORBIDDEN: no merge, no adversary/scout post on your own head, no poll or cron task, no migration.

END · CARD-LANE-TAKEOVER-SELF-S147-1-v2
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v2
