<!-- relay-audit: v1 kind=card -->
CARD-LANE-NO-POLLER-S145-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
SUPERSEDES CARD-LANE-NO-POLLER-S145-1-v1, which the scout returned RED (SCOUT-STATUS-REVIEW-CARD-LANE-NO-POLLER-S145-1-v1).
Every numbered scout defect is answered below; the scout's findings are recorded by name (S112-YASA-1).
OWNER APPROVAL: OWNER-APPROVAL-S145-PLAN-1 ("onay", 2026-09-20 09:38 TSI), plan item 1.
BRANCH: phase/lane-no-poller-s145-1 · PUSH: yes · REPORT: docs/relay/LANE-NO-POLLER-S145-1-AG4-report.md · PR: yes.
Work in your own worktree for this branch, never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is 33ebbee70bcd7e198ec4a01fdf5fb8532202d2d9 at 2026-09-20T07:35Z | MEASURED: git ls-remote origin refs/heads/master | floor |
| the four boots and CLAUDE.md still carry the poll-task instruction | MEASURED: git grep -n -i "poll task" origin/master -- CLAUDE.md .claude/boot | premise |

Evidence below is quoted from SCOUT-STATUS-REVIEW-CARD-LANE-NO-POLLER-S145-1-v1, section 2, byte for byte.

```evidence:floor
origin/master=33ebbee70bcd7e198ec4a01fdf5fb8532202d2d9, read 2026-09-20T07:35Z (git ls-remote origin refs/heads/master).
```

```evidence:premise
git grep -n -i "poll task" origin/master -- <the four files> -> 9 lines, non-empty. Every line number the card cites is ACCURATE: CLAUDE.md:72,78 · producer.md:233,497 · foreman.md:558 · free.md:271.
```

## PREMISE
MEASURED: git ls-remote origin refs/heads/master -> the master sha in the CLAIMS table, scout read 2026-09-20T07:35Z
MEASURED: git grep -n -i "poll task" origin/master -- CLAUDE.md .claude/boot -> 9 lines (CLAUDE.md:72,78 · producer.md:7,17,233,235,497 · foreman.md:558,560 · free.md:271 by the scout's union of both lenses), scout read 2026-09-20T07:35Z
MEASURED: scout grep -> two further retired-mechanism references outside the boots: .claude/commands/claim.md:46-48 and .claude/loop.md:22
MEASURED: scout read -> the tick-based liveness apparatus (scripts/factoryState.mjs:719 and :853-890, api/cwf/__tests__/silenceContractAddendum.test.ts) is already dark: no boot orders a lane to write NEXT-TICK-BY
SELF-INVALIDATION: this premise DECAYS the moment any file in the scope fence below changes on master.

## SCOPE
```scope
- CLAUDE.md
- .claude/boot/producer.md
- .claude/boot/foreman.md
- .claude/boot/free.md
- .claude/commands/claim.md
- .claude/loop.md
- api/cwf/__tests__/ (only a test that asserts poll text, if one exists or is added)
- docs/relay/LANE-NO-POLLER-S145-1-AG4-report.md
```

## ORDERS
1. In CLAUDE.md, producer.md, foreman.md and free.md replace the poll-task section, and only it, with this rule, BYTE-IDENTICAL in all four:
   "NO POLL TASK. A lane creates no poll, cron or scheduled task (OWNER-RULING-S143-OPERATING-MODEL-1). The owner starts a lane by naming its card; the lane reads relay_inbox for THAT card only, does it, writes its slip to the bus, and stops. If a poll or cron task exists in this window, delete it and print the list showing it gone. COUNTERMAND READ: immediately before any destructive or irreversible step, the lane reads relay_inbox once for rows addressed to it created after its card; a countermand found there wins and the lane stops. This single synchronous read replaces the poller's re-read for ADDITION 2's dwell."
   KEEP producer.md:7 and :17 ("do not create a poll task" in the gate-probe section): they already agree with the rule (scout item 8).
   Reword every later sentence that refers to the poller (producer.md:497 "Stop polling" and its kind) to match the rule; leave no dangling reference.
2. In .claude/commands/claim.md:46-48 and .claude/loop.md:22 reword the poller references so they describe the card-per-session model; they create no task today, so this is text only.
3. Search with the WIDE lens, not the vocabulary lens: git grep -n -i -E "poll task|poller|CronCreate|scheduled task" -- scripts/ api/ .github/ docs/laws/ .claude/ CLAUDE.md. For each hit decide and name in the report: (a) asserts the OLD instruction -> update it to assert the new rule; (b) CI-internal polling (deploy-convergence, vector-diagnose, cron schedules) -> untouched, listed; (c) the dark tick apparatus (factoryState.mjs, mail-wait.mjs [HEARTBEAT], claimRoster.ts:21, silenceContractAddendum.test.ts) -> untouched, listed as DARK BY THE OWNER'S RULING. Lane liveness is read from output, never from a beat (project instructions 12.11).
4. Add or update ONE test that fails if any file under CLAUDE.md or .claude/ instructs a lane to create a poll, cron or scheduled task, and passes on the NO POLL TASK rule text.

## FALSIFIER
Run and paste: git grep -n -i -E "poll task|poller|CronCreate|scheduled task" -- CLAUDE.md .claude
Every printed line must be either the NO POLL TASK rule text itself or producer.md:7/:17; any other line is RED. This checks the PURPOSE, so a spelling like "create your poll task" cannot slip past it (scout item 6: the v1 falsifier missed 8 of 9 lines and had zero coverage of free.md).
Plant: put the old CLAUDE.md "Create your own poll task as your first action" sentence back, show the order-four test goes RED, restore.
Then npm run build (all five gates) and the suite, locally; report counts as "local, at <40-hex head>"; push; open the PR.

## SHARED SURFACES
The six instruction files in the scope fence, read by every lane at boot. No script behaviour changes.

## DECISION RIGHTS
The owner approved the removal (plan item 1). The rule wording and the COUNTERMAND READ are the Architect's; the scout's review may correct them. The dark tick apparatus is not removed by this card; removing it is a separate item the owner decides.

## ON DIFFERENCE
If your re-measurement DIFFERS from the premise (a file moved, a line number shifted, a hit the premise does not list), the re-measurement wins: act on the file as it stands, and list every difference in the report. If a scoped file no longer carries any poll text, report it and skip it.

FORBIDDEN: no behaviour change in scripts/*.mjs or *.ts beyond text assertions and the order-four test; no file outside the scope fence; no merge; no adversary/scout post on your own head; no poll, cron or scheduled task while doing this card.

END · CARD-LANE-NO-POLLER-S145-1-v2
