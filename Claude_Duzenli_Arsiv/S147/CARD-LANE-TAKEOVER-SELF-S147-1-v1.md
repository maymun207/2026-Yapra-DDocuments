<!-- relay-audit: v1 kind=card -->
CARD-LANE-TAKEOVER-SELF-S147-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
A PROCESS card on a NEW subject (register item 15 + OWNER-RULING-S145-SELF-TAKEOVER-1 + the own-worktree rule); it goes to the scout first (12.1). No gate lift is claimed.
OWNER APPROVAL: OWNER-APPROVAL-S145-PLAN-1 ("onay", 2026-09-20 09:38 TSI), plan item 3 (self-takeover boot rule), and bootstrap v148 section 4 ("item 15 + self-takeover + own-worktree (one card)").
BRANCH: phase/lane-takeover-self-s147-1 · PUSH: yes · REPORT: docs/relay/LANE-TAKEOVER-SELF-S147-1-AG4-report.md · PR: yes.
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch the scope below. If a descendant touches it, STOP and print the commit.
ON-DISAGREEMENT: if any line number or behaviour below differs from what you measure at the head, YOUR READING WINS: print both, and the difference is a finding in the report.

THE PROBLEM, three seams in the lane boot and one missing rule.
(1) SELF-TAKEOVER. After /clear, a lane re-booting its OWN address lands in PATH B and laneBoot.mjs stops with "To take this address a person types: --confirm-takeover". The owner ruled (OWNER-RULING-S145-SELF-TAKEOVER-1) that the lane itself may confirm the takeover of its OWN address with the held sha the notice prints. Today that typing is the owner's hand-work (S102-YASA-1 / PLATINUM).
(2) HALF-TAKEOVER ORDERING (F-S143-HALF-TAKEOVER-LEAVES-A-DEAD-NONCE-1). laneBoot.mjs pushes the new nonce to the ref, reads it back, and only THEN writes the row (reclaim naming the dead nonce). In S143 AG-4 ended with the ref on the new nonce and the row still on the dead one; every later factory_state write returned FW001 until factory_reclaim was run by hand.
(3) --since WITH NO VALUE. producer.md:309-325 records that mail-wait accepts `--since` with no value and silently degrades to a watermark read — the backlog blindness the birth read exists to avoid.
(4) OWN WORKTREE. The rule "work in your own worktree" lives only in the Architect's boot text, not in the lanes' own files.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the PR 588 merge, production building from it | MEASURED: Vercel list_deployments target=production, 2026-09-20T09:24Z | floor |
| the laneBoot, mail-wait and worktree lines cited in PREMISE | MEASURED: git show / git grep over origin/master in the owner clone, 2026-09-20T09:25Z | premise-lines |

```evidence:floor
production deployment meta.githubCommitSha 20c1651c3fb59b48490670ffefed02099d684ed9 (Merge pull request #588), state BUILDING at 2026-09-20T09:24Z
owner-clone origin/master ref (lane-refreshed, before PR 588) 33ebbee70bcd7e198ec4a01fdf5fb8532202d2d9
```

```evidence:premise-lines
scripts/laneBoot.mjs:180  STOP: no --confirm-takeover. Absence is refusal. To take this address a person types: --confirm-takeover ...
scripts/laneBoot.mjs:232-238  row write (reclaim naming dead nonce / factory_claim) AFTER push + read-back; FAULT text "the ref is ours; the certificate is half-written"
scripts/mail-wait.mjs:263  since: flag('since', undefined)
.claude/boot/producer.md:60 and .claude/boot/foreman.md:75  "take your own worktree off origin/master" (for reading the boot only)
```

## PREMISE

MEASURED: 2026-09-20T09:25Z, git show origin/master:scripts/laneBoot.mjs in the owner clone (the ref named in `floor`; master has since moved by PR 588, which touched only .md boots and one test): the STOP text at :180, the push at :220-230, the row write after read-back at :232-238 with the comment "the ref is ours; the certificate is half-written".
MEASURED: 2026-09-20T09:25Z, git grep -n "since" origin/master -- scripts/mail-wait.mjs: flag('since', undefined) at :263, sinceVerdict at :629.
MEASURED: 2026-09-20T09:25Z, git grep -n -i worktree origin/master -- CLAUDE.md .claude/boot: producer.md:60 and foreman.md:75 say "take your own worktree off origin/master" for reading the boot; no line orders a lane to BUILD in its own worktree.
UNMEASURED: the exact failure in S143's half-takeover (which call failed and why). ORDER 2 measures it with a planted failure before changing anything.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching scripts/laneBoot.mjs, scripts/mail-wait.mjs, CLAUDE.md or .claude/boot/**.

## ORDERS

ORDER 1 - SELF-TAKEOVER. A lane may pass --confirm-takeover for its OWN address (the lane argument equals the address being taken). Every existing safety check stays byte-identical in effect: the sha must equal the one this run measured, the notice must be CANDIDATE, the dwell runs, the lease pins the held sha, no bare --force. Change the STOP text at :180 so it tells the LANE the exact flag to run; record the confirmer as `self (OWNER-RULING-S145-SELF-TAKEOVER-1)` in the plan's `by` and in the boot slip's `card:` line (today it says "confirmed by a typed flag"). Update producer.md:198-205 and the equivalent passages in foreman.md and free.md to say the lane runs the flag itself on its own address, and still STOPS and reports on any other address.

ORDER 2 - ORDERING. First MEASURE: with the existing test harness for laneBoot, plant a row-write failure after a successful push and print what state results. Then make the half state heal itself: after a failed row write, re-read the row; if it still holds the dead nonce, retry the same reclaim ONCE; if it still fails, exit FAULT printing the one exact recovery call (`scripts/factoryState.mjs reclaim` naming the lane, the dead nonce and the new nonce). The ref-then-row order may change only if you prove in the report that the new order leaves no half state the old one did not.

ORDER 3 - --since. `--since` with NO value is REFUSED by name and exits non-zero, exactly like `--since=<iso>`. Update producer.md:309-325 to match (the passage explaining the quiet failure becomes a one-line statement that both malformed shapes are refused).

ORDER 4 - OWN WORKTREE. BOX READ FIRST: immediately before any push that moves a lane ref and before any git worktree remove, re-read your box (node scripts/mail-wait.mjs AG-4 --once) and print it; a card minted since may change the order. Add to CLAUDE.md and the three boots, byte-identical on ONE line in each: "OWN WORKTREE. A lane builds every branch in its own worktree (git worktree add off origin/master), never in the main worktree another lane uses, and removes it (git worktree remove, then prune) after its PR lands."

ORDER 5 - TESTS, failing-first: (a) self-confirm on own address with the measured sha and a CANDIDATE notice -> CLAIMED, slip says self; (b) confirm naming ANOTHER address -> STOP unchanged; (c) planted row-write failure -> one retry, then either healed or FAULT with the recovery call printed; (d) `--since` with no value -> non-zero exit, refusal named; (e) the ORDER 4 line byte-identical in all four files. Prove each by planting the fault the test guards, then remove the plant.

ORDER 6 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (all five gates; reseal in the SAME commit if doc-drift maps a file) and the suite, locally; print counts. Report at the path above; the report follows the landing and never gates it (12.8). Slip with the forty-hex head.

## FALSIFIER

If laneBoot.mjs cannot tell its OWN address from another (the lane argument and the address are not both known at :150), STOP and print the seam. If healing ORDER 2 would require the row write to run before the push is proven, STOP and print both orders with their half states. If any existing laneBoot or mail-wait test must be weakened (not extended) to pass, STOP and name it.

## SHARED SURFACES

```scope
- scripts/laneBoot.mjs
- scripts/mail-wait.mjs
- CLAUDE.md
- .claude/boot/producer.md
- .claude/boot/foreman.md
- .claude/boot/free.md
- tests beside the existing laneBoot / mail-wait tests (or api/cwf/__tests__/)
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/relay/LANE-TAKEOVER-SELF-S147-1-AG4-report.md
```

## DECISION RIGHTS

You choose the test file homes and names, the retry mechanism's shape in ORDER 2, and whether ORDER 1 needs a separate flag beyond --confirm-takeover (only if the own-address check cannot be expressed otherwise). You may refuse on evidence this card did not anticipate. FORBIDDEN: no merge, no adversary/scout post on your own head, no poll or cron task.

END · CARD-LANE-TAKEOVER-SELF-S147-1-v1
