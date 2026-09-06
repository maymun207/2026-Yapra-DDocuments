<!-- relay-audit: v1 kind=card -->
# CARD-LANE-POSSESSION-1 · v1 — a read that stamps another lane alive: reproduce it, split the heartbeat off the inspection, and make one refusal say what it measured

A scout window holding NO address ran `node scripts/mail-wait.mjs AG-1 --once` to look for a card,
and that ordinary read **wrote a live heartbeat for AG-1** at 2026-09-02T22:41:49.772Z. It
disclosed the write in full and did not repair it, because a scout writes nothing and a second
write is not a remedy. `AG-1` now carries a heartbeat no window earned.

`CLAUDE.md` §1a makes the state table **the single source of truth for which lanes are alive**.
That signal is forgeable by any reader, which means every coordination decision resting on it —
is this address free, is that sibling alive, may I claim here — rests on a value a stranger can
write. This card does not repair the forged row on that lane, and it changes none of the coordination functions
named in the `verb` fence.

## WHAT IS ALREADY KNOWN, SO THAT NOTHING HERE IS RE-DISCOVERED

The residue is NAMED IN THE SOURCE, in `scripts/mail-wait.mjs`'s `readCard` header, written under
`PHASE-READ-NEVER-WRITES-1`: *"`laneNonce(lane)` reads `refs/heads/lane/<lane>` off the git
server, and that ref is PUBLIC — every window can read every lane's nonce. So
`factory_assert_nonce` proves the address is CLAIMED; it has never proven WHO is calling."* The
same header carries a standing instruction: that residue **must not be closed by weakening the
verb** — the database refusal is the LAST line, not the first.

**What is NEW, and what makes this a card rather than a known limitation:** that header argues the
residue is survivable because taking another lane's mail became *"a deliberate, named act instead
of a side effect of looking"*. On the CARD-READ path that is true — `--take` is required. **On the
POLL path it is false.** `--once` needs no flag, is the ordinary way to look at any lane's box, and
writes a heartbeat for whatever address is on the command line. `PHASE-READ-NEVER-WRITES-1` closed
one door in this file and left its sibling open, and the scout walked through it by accident while
doing its job.

## PREMISE

MEASURED: 2026-09-03T04:21:49Z, `git rev-parse master` and `git rev-parse origin/master` in the owner's shared clone over the Architect's bridge shell under GIT_OPTIONAL_LOCKS=0 — the checked-out `master` reads the older of the two shas in the `where` fence and `origin/master` reads the newer; the shared checkout is three commits behind and YOUR BRANCH IS CUT FROM `origin/master`, never from the checkout.
MEASURED: 2026-09-03T04:21:49Z, `git status --porcelain` in that clone — exactly one line, ` M docs/ground/authority-conformance.latest.md`, which is the OWNER'S OWN unstaged edit and is NOT yours to stage, discard or carry into any commit; any OTHER line is a STOP.
MEASURED: 2026-09-03T04:21:49Z, `grep -n heartbeat scripts/mail-wait.mjs` — the poll path's heartbeat is written at the site the `sites` fence names, from an `await import('./factoryState.mjs')` calling `heartbeat(lane)`, where `lane` reached the process from `argv`.
MEASURED: 2026-09-03T04:21:49Z, `sed -n '161,179p' scripts/factoryState.mjs` — `laneNonce(lane)` runs `git ls-remote origin refs/heads/lane/<lane>`, accepts any forty-character lowercase hex answer, and on the empty answer returns the reason string quoted in the `label` fence.
MEASURED: 2026-09-03T04:2xZ, `pg_get_functiondef` over `factory_assert_nonce` and `factory_heartbeat` on the project fence `fjbrkimwvtpwoxhziidh` — the guard compares the presented nonce to `factory_state.nonce_sha` and nothing else; it is NULL-safe in both directions and it is CORRECT AS WRITTEN for what it can know. This card changes NO database function.
MEASURED: 2026-09-02T22:41:49.772Z, the scout's own disclosed transcript — `node scripts/mail-wait.mjs AG-1 --once` from a window holding no address moved `AG-1`'s `heartbeat_at`; that is the fault this card reproduces before it repairs anything.
DECAYS on the next commit to `origin/master`, and on any edit to `scripts/mail-wait.mjs` or `scripts/factoryState.mjs` from anywhere. Re-read all five readings at ORDER A; the shas are the fastest tell.
ON-DISAGREEMENT: if `origin/master` differs from CLAIMS, or either source file's heartbeat or `laneNonce` shape differs from the `sites` and `label` fences, or `git status` shows any line but the owner's one edit — do NOT edit and do NOT push. Print what you read and file the report on the fallback channel; a fix aimed at code the card never measured is a fix nobody reviewed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| `origin/master` is `d8895114744dbb23ba5633d726a0814cfe0468d5` and the shared checkout is three commits behind it at `245e90a24f58be8134a0558b7fc570d598621d90` | MEASURED: git rev-parse master and git rev-parse origin/master at 2026-09-03T04:21:49Z, and git rev-list --count between them | where |
| the poll path writes a heartbeat for whatever address arrived in argv, with no flag and no possession test | MEASURED: grep -n heartbeat scripts/mail-wait.mjs at 2026-09-03T04:21:49Z, reading the call site and its four printed outcomes | sites |
| `laneNonce` proves only that a public ref EXISTS, while its refusal text claims the window does not HOLD the address | MEASURED: sed -n '161,179p' scripts/factoryState.mjs at 2026-09-03T04:21:49Z, reading the ls-remote call, the forty-hex test and the reason string | label |
| the database guard compares the presented nonce to the stored one and can know nothing further, so it is correct as written and is NOT this card's subject | MEASURED: pg_get_functiondef over factory_assert_nonce and factory_heartbeat on the project fence at 2026-09-03T04:2xZ | verb |
| the residue was already named in this repository's own source, with a standing instruction not to cure it by weakening the verb | MEASURED: sed -n '795,850p' scripts/mail-wait.mjs at 2026-09-03T04:2xZ, reading the readCard header written under PHASE-READ-NEVER-WRITES-1 | prior |
| a non-holding window moved AG-1's heartbeat_at through an ordinary --once read | MEASURED: the scout's disclosed transcript, artifact_name SCOUT-CARD-REVIEW-CARD-ARCHIVE-PUSH-S129-1-verdict on the bus, and factory_state's forged row on that lane carrying that instant | fault |
| whether any artifact distinguishes a window that CLAIMED an address from one that merely names it, inside one shared clone | NOT-READ | ORDER D exists to enumerate this and report; the Architect has not measured it and will not guess it, because a possession proof invented at a desk is the defect this card is about |

```evidence:where
clone   /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra -  Codes/cwf_yaprak
        (note the DOUBLE SPACE in "Yapra -  Codes"; in a bridge shell this is $HOME/mnt/cwf_yaprak)
origin/master  d8895114744dbb23ba5633d726a0814cfe0468d5   <- CUT YOUR BRANCH FROM THIS
master (shared checkout)  245e90a24f58be8134a0558b7fc570d598621d90   <- three behind; do not build on it
branch  phase/lane-possession-1
```

```evidence:sites
scripts/mail-wait.mjs, the poll path's heartbeat block — the shape, not the line numbers, is
what you match, because the numbers move:

    const { heartbeat } = await import('./factoryState.mjs');
    const r = await heartbeat(lane);
    if (r.ok)        console.log(`[mail-wait] [HEARTBEAT] ${lane} at ${...}`);
    else if (r.fenced) console.log(`[mail-wait] [HEARTBEAT] not recorded — ${r.reason}`);
    else             console.error(`[mail-wait] [HEARTBEAT] FAILED for ${lane}: ${r.reason}`);

`lane` reaches this function from `argv`. RULE-42 requires exactly that and the readCard header
already records the consequence: the address is an ASSERTION the process cannot check.
```

```evidence:label
scripts/factoryState.mjs, laneNonce — the reason string on the empty-answer branch:

    `no ref refs/heads/lane/${lane} on origin — this window does not hold that address`

The first half is what the command measured. The second half is a claim about the CALLER that
`git ls-remote` cannot support: the ref is public and every window can read it.
```

```evidence:verb
The coordination functions on the project fence, enumerated so that "none of them" names its
members: factory_assert_nonce · factory_claim · factory_heartbeat · factory_reclaim ·
factory_set_mode · factory_write_lane · relay_post_from_lane. THIS CARD CHANGES NONE OF THEM.

factory_assert_nonce compares factory_state.nonce_sha for the row to the presented value and
raises FW001 on mismatch or on either side being null. factory_heartbeat calls it, then moves
heartbeat_at and updated_at and deliberately not changed_at, and writes no event row.
Both are correct for what they can know. THIS CARD CHANGES NEITHER.
```

```evidence:prior
scripts/mail-wait.mjs, readCard header, under PHASE-READ-NEVER-WRITES-1:

    "The nonce cannot supply the missing proof either. `laneNonce(lane)` reads
     `refs/heads/lane/<lane>` off the git server, and that ref is PUBLIC -- every
     window can read every lane's nonce. So `factory_assert_nonce` proves the
     address is CLAIMED; it has never proven WHO is calling."

    "That residue is NOT closed here and must not be closed by weakening the verb --
     the card is explicit that the database refusal is the LAST line, not the first.
     What changes is that taking another lane's mail is now a deliberate, named act
     instead of a side effect of looking."

The last sentence is TRUE of the card-read path and FALSE of the poll path. That gap is this
card's whole subject.
```

```evidence:fault
Reported by the scout, from a window holding no address, in its verdict on the bus:

    node scripts/mail-wait.mjs AG-1 --once
    [mail-wait] [HEARTBEAT] AG-1 at 2026-09-02T22:41:49.772Z

factory_state's AG-1 lane row carries that heartbeat instant, written by a caller that claimed
nothing. The scout did not repair it and neither does this card.
```

## ORDER A — READ THE BOX FRESH, THEN RE-MEASURE ALL FIVE PREMISE READINGS

Read your own box directly by `created_at` before anything else; a row addressed to you newer than
this card is a STOP until you have acted on it. Then re-take every reading in the PREMISE and
print each beside the command that produced it: the two shas, `git status --porcelain`, the
heartbeat call site, `laneNonce`'s reason string. Any mismatch is the ON-DISAGREEMENT arm.

## ORDER B — REPRODUCE THE FAULT BEFORE REPAIRING IT

Plant the fault in the thing the guard guards, not in a fixture that resembles it. Write a test
that proves a process which has claimed NOTHING can move another lane's `heartbeat_at` through the
ordinary `--once` path. **It must FAIL against the code as it stands — a test that passes before
the fix proves nothing** — and it must pass after ORDER C. Name in your report which address the
test exercises and how it avoids writing to a lane a live window may hold; a test that forges a
heartbeat on a real working lane to prove forgery is possible has committed the harm it measures.

## ORDER C — SPLIT THE HEARTBEAT OFF THE INSPECTION, THE WAY `--take` WAS SPLIT OFF `--read`

The heartbeat becomes a property of the DELIVERY path, never of a LOOK. `--once` on its own
performs the read and does NOT write a heartbeat; it prints the third value —
`[HEARTBEAT-SKIPPED] inspection, not delivery` — because a silently skipped write and a
successful one must never look alike. The window's own poll loop keeps its heartbeat.

**This is decidable and it is the only thing here that is.** It is a fact about the invocation,
not an inference about identity — the same ground `PHASE-READ-NEVER-WRITES-1` stood on when it
refused to pass "the holding address" down under a more reassuring name. Choose the flag or the
entry point that expresses it and NAME your choice in the report with the reason; do not invent a
possession check.

Then fix the label in `laneNonce`: the refusal says what the command measured — that no such ref
exists on origin — and drops the clause about what this window holds. **A label that overstates
its computation is this factory's dominant defect wearing a helpful voice**, and the conformance
report already carries two siblings of it.

Nothing else in either file changes. **No database function is touched. No migration. The AG-1
row is not repaired** — repairing a forged row is a separate act with its own authority and it is
not in this card.

## ORDER D — ENUMERATE WHAT COULD EVER PROVE POSSESSION, AND REPORT IT

Do not build it. In one shared clone, list what a window that WON an address has and a window that
merely names it does not — and for each candidate say plainly whether a sibling window in the same
clone could also produce it. If the honest answer for every candidate is "yes, a sibling could",
say so: **that is a finding, not a failure**, and it tells the next card that possession needs
something minted at claim time rather than something read afterwards. This section produces prose
and no code.

## ORDER E — BRANCH, PUSH, REPORT, OPEN THE PULL REQUEST — AND STOP THERE

Branch `phase/lane-possession-1` cut from `origin/master`. Push early and keep pushing. Report at
`docs/relay/LANE-POSSESSION-1-<your-address>-report.md`, the address being the one YOU won from the
server — this card does not name your ordinal, because a template that hard-codes one is wrong
every time the lane changes (`F-S129-CARD-TEMPLATE-CARRIED-A-LANE-ORDINAL-1`, filed against this
card's own predecessor). Open the pull request with `gh pr create --base master`.

**Then STOP. You do not land this.** `gh pr merge` is fenced in every window by design, and
`npm run land` classifies AUTHOR-SUBJECT — a lane landing its own authored work is exactly the ⑤
merge-authority question whose steel is not built. Landing is the owner's and the foreman's, and
this card ends at an open PR with green checks read from the PR head.

## ORDER F — THE CHANNEL THAT SURVIVES A NO

If any premise reading disagrees, or the test cannot be written without forging a heartbeat on a
lane that may be held, or the split cannot be expressed without inventing a possession check:
write the report anyway, leave the branch pushed and the PR unopened, and file the bus row
`from_lane` with artifact name `LANE-POSSESSION-1-<your-address>-report`. A named refusal closes
this card as completely as a merge would.

## FALSIFIER

This card is wrong if `origin/master` differs from CLAIMS; if the heartbeat call site or
`laneNonce`'s reason string differ from the `sites` and `label` fences; if `git status` shows any
line but the owner's single edit; or if the ORDER B test PASSES before ORDER C is applied — that
last one would mean the fault does not exist as described and everything after it is unfounded.
Second arm: **a fix whose test was written after it is a fix nobody falsified** — the failing run
appears in the report, with its output, before the passing one.

## SHARED SURFACES

Two files, `scripts/mail-wait.mjs` and `scripts/factoryState.mjs`, plus your report and one test.
No database function, no migration, no governed row, no git configuration, no file in the archive
repository, and not one byte of `docs/ground/authority-conformance.latest.md`, which carries the
owner's own unstaged edit. No deletions. Spend: ordinary CI on the PR head. The `eval-canary` job
in `.github/workflows/build-test.yml` carries `if: false` under the freeze recorded in
`docs/ops/CANARY-FROZEN.md`, so no model spend fires; if you observe it running, that is a STOP
and a finding.

## DECISION RIGHTS

The owner ordered this work next, by name, after the scout's disclosure. Under SOTA-1's symmetry
clause the Architect states plainly that **this item advances no `cwf-sota-definition` criterion**
and recommends it be recorded as a PREREQUISITE beside `G-4`: both are instruments that make a
measurement trustworthy, and `C1` — *"measured, not argued"* — is worth nothing if the measurement
can be written by a stranger. That classification is the owner's to rule and is not yours.

You decide nothing about whether the split should happen and everything about whether the world
matches this card well enough to make it. If ORDER D's honest answer is that no possession proof
exists in a shared clone, say so and stop; do not invent one to finish the card.

BODIES: `PLATINUM` · `S102-YASA-1` · `S61-2` · `TOTAL-45` · `empty ≠ zero` (a skipped heartbeat
and a written one are different facts and are printed differently) · `RULE-42`.

fanout: personalized

```deliverables
branch: phase/lane-possession-1
report: docs/relay/LANE-POSSESSION-1-<your-address>-report.md
```

TAIL ANCHOR: CARD-LANE-POSSESSION-1-v1 ends here.
