ORDER-SCOUT-REVIEW-CARD-LANE-NO-POLLER-S145-1-v1

LANE: scout
FROM: Architect, S145, 2026-09-20T06:45Z
OWNER APPROVAL: OWNER-APPROVAL-S145-PLAN-1 ("onay", 2026-09-20 09:38 TSI) - plan item 1.
TAKE THIS ONLY AFTER ORDER-SCOUT-REVIEW-PR587-S145-2-v1 is answered, in a fresh /clear session.
PRECONDITION: none on master beyond the card's own.

WHAT: adversarial review of the card below - a NEW subject, so it comes to you first (12.1). Card body = the bytes
AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
sha256 = e3c4c4f680245a0db750191cb114a90bc0639742fbc9a75fc79531f21a64c40b (3032 bytes).
DO: 1. run the repository card gate on those bytes, every check. 2. Attack the premise from the primary sources
(CLAUDE.md, .claude/boot/producer.md, .claude/boot/foreman.md, .claude/boot/free.md, and any test or gate that pins
their poll text). Hostile questions: (a) is there any OTHER file or script that creates or instructs a poll task
(scripts/*, .claude/**, docs/laws/**)? (b) does removing the poller break a gate, test, or the land/auto-merge route?
(c) does anything else in the lanes depend on a poll task existing (e.g. a heartbeat reader, a liveness check)?
3. Verdict: GREEN first line exactly `ADVERSARY-VERDICT: GREEN card=CARD-LANE-NO-POLLER-S145-1-v1 sha256=<sha256 of the body>`,
or RED with each defect by file:line.
FORBIDDEN: read-only. No status post, no edit, no poll task, no cron.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-NO-POLLER-S145-1-v1.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-LANE-NO-POLLER-S145-1-v1

LANE: AG-4
fanout: personalized
A PROCESS card on a NEW subject; it goes to the scout first (12.1).
OWNER APPROVAL: OWNER-APPROVAL-S145-PLAN-1 ("onay", 2026-09-20 09:38 TSI).
BRANCH: phase/lane-no-poller-s145-1 · PUSH: yes · REPORT: docs/relay/LANE-NO-POLLER-S145-1-AG4-report.md · PR: yes.
PRECONDITION: origin/master is 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 or a descendant; the four files below still
carry the poll-task instruction (git grep -n -i "poll task" on them is non-empty). If not, STOP and print both.

THE PROBLEM. The owner ended lane pollers in S143 (OWNER-RULING-S143-OPERATING-MODEL-1, 2026-09-20 06:12 TSI: no
2-minute AG pollers; the owner tells a window "kartini oku"; the Architect reads the bus on its own timer). The ruling
reached only the Architect's carriers. The lanes' own instructions still order a poller, and the boot text says
"apply CLAUDE.md", so every /clear re-creates one (F-S145-LANE-CLAUDE-MD-STILL-ORDERS-A-POLLER-1). Architect READ at
master 7572c3bb, git grep:
  CLAUDE.md:72 "Create your own poll task as your first action" · CLAUDE.md:78 "THE POLLER HAS NO BUDGET"
  .claude/boot/producer.md:233-261 (CronCreate */2) and :497 · .claude/boot/foreman.md:558-566 · .claude/boot/free.md:271

ORDERS:
1. In each of the four files, replace the poll-task section (and only it) with this rule, verbatim in all four:
   "NO POLL TASK. A lane creates no poll, cron or scheduled task (OWNER-RULING-S143-OPERATING-MODEL-1). The owner
   starts a lane by naming its card; the lane reads relay_inbox for THAT card only, does it, writes its slip to the
   bus, and stops. If a poll or cron task exists in this window, delete it and print the list showing it gone."
   Keep every other paragraph; where later text refers to the poller (e.g. producer.md:497 "Stop polling"), reword
   it to match the rule instead of leaving a dangling reference.
2. Find every test, gate or script that asserts the OLD poll text (git grep for "poll task", "POLLER HAS NO BUDGET",
   "CronCreate" across scripts/, api/, .github/, docs/laws/). Update each to assert the NEW rule and the ABSENCE of
   any instruction to create a poll task. Name each in the report; if none exist, say so with the grep.
3. FALSIFIER, run and paste: git grep -n -i -E "create (your own )?poll task|POLLER HAS NO BUDGET|CronCreate" --
   CLAUDE.md .claude/boot  -> must print nothing. Plant: put the old CLAUDE.md:72 sentence back and show the
   updated test/gate goes RED; restore.
4. npm run build (all five gates) and the suite, locally; report counts; push; open the PR.

FORBIDDEN: no behaviour change in scripts/*.mjs or *.ts beyond text assertions; no other file; no merge; no
adversary/scout post on your own head; do not create a poll task while doing this card.

DECISION RIGHTS: the owner approved the removal (plan item 1). The exact wording of item 1 is the Architect's and
may be corrected by the scout's review.

END · CARD-LANE-NO-POLLER-S145-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-NO-POLLER-S145-1-v1
