# CWF · RULE-RUNTIME CONSOLIDATION · PROGRAM LOG — v1

Append-only. Opened 2026-08-27 under `OWNER-RULING-S122-T1-v1`. Every entry names its
authority and its measurement.

---

## AMENDMENT · P-9 — S121's measurements are trusted; S121's inferences are not

**Authority:** `OWNER-RULING-S122-T1-v1` §2. Amends `RULE-RUNTIME-CONSOLIDATION-DIRECTIVES-v1.1`.
**Effective:** immediately, binding through T3.

No action is taken on any S121 inference without re-measuring it first. Named applications
carried from the ruling: **T2-A** — each of the twenty absence claims re-verified by fresh grep
before its excavation memo is written. **T2-B** — the CP-1 working form (`MEASURED:` for read
rows, `NOT-READ` for unread) re-tripped in a scratch context before it is written down as law.

**Basis, measured:** all sixteen S121 byte counts re-measured identical at master
`2e1d193b5bf809228821d1934caa5bce474f3959` — the instrument was sound. Three of its conclusions
failed under re-measurement in S122 (`F-S122-CP8-TARGET-POPULATION-1`,
`F-S122-BOOT-DEFECT-ALREADY-REPAIRED-1`, `F-S122-POLL-FORM-ABSENT-NOT-WRONG-1`).

**FIRST APPLICATION, SAME DAY — a fourth S121 inference failed.** See the P-9 NOTICE below.

---

## AMENDMENT · T1-1 acceptance criterion revised

**Authority:** `OWNER-RULING-S122-T1-v1` D-3. The original "≤1% of the landed corpus" criterion
is **VOID** — it inherited S121's inference and measured a population CP-8 does not govern.

The approved shape: relayAudit's word-boundary anchor plus its exemption set, with CP-8's own
`{7,39}` band intact. Wholesale "make CP-8 like relayAudit" is **explicitly rejected** —
relayAudit refuses the full 40-hex sha that CP-8 requires.

`GATE-1-SCORECARD-v1` field G1-b is updated accordingly, citing this ruling as its authority,
per the pre-registration clause of T1-7.

---

## STANDING RATIONALE FOR T2-C2 (Policy ⊆ Capability) — logged verbatim as ordered

**Authority:** `OWNER-RULING-S122-T1-v1` D-4.

T1-2(a) ordered replacing the `--since` form with a watermark form. Measured by executing the
tool's own parser: **`--since` is ACCEPTED**; **`--watermark` is REFUSED BY NAME**. The defect
it described was real and was **closed on 2026-08-26 by AG-4's own card**
`PHASE-MAILWAIT-FLAGS-1` — the inventory recorded it as open one day later. What the tool now
refuses is *unknown flags by name*, which is AG-4's repair working.

**Had T2-C2 existed, neither S121's one-day staleness nor the directive built on it could have
carried the order.** A CI check validating every boot-ordered flag against the live tool
catalogue would have reddened the directive before it was written.

---

## CAPABILITY CONSTRAINT · the Architect sandbox cannot reach GitHub

**Authority:** `OWNER-RULING-S122-T1-v1` OP-1. Standing constraint, not an incident.

Measured 2026-08-27T20:45Z from the device sandbox:

```
git config --get credential.helper   → (none)
command -v gh                        → (no gh)
ls ~/.ssh/*.pub                      → (no ssh keys in this sandbox)
getaddrinfo github.com               → Temporary failure in name resolution
git push origin main                 → fatal: could not read Username for 'https://github.com'
```

No credential, no client, no key, **and no DNS route**. The push is therefore the owner's, per
the PLATINUM named exception; he executed it from his terminal.

**Consequence for future sessions:** the Architect can write and commit to the archive working
copy but cannot verify remote state. **Local `b2291c3` is the reference** until remote state is
readable through a permitted channel. A session that needs remote truth must obtain it from a
lane or from the owner — never assume the push happened.

---

## OP-2 · the stale `index.lock` — CORRECTED RECORD

**Authority:** `OWNER-RULING-S122-T1-v1` OP-2, which granted deletion.

**I did not delete it. It was already absent when I went to.** Recorded precisely because a log
that credits the machine with an action it did not take is the kind of entry a later session
trusts.

| moment (UTC) | measurement |
|---|---|
| 2026-08-27T20:40Z | `.git/index.lock` present · **0 bytes** · created 13:19 · **age 7h21m** |
| same read | `pgrep` showed no git process behind it — only `bwrap` and shells |
| 2026-08-27T20:54Z | `ls -la .git/index.lock` → **already gone**; the subsequent `rm -f` was a no-op that exits 0 on an absent path |

Most likely removed by whatever produced commit `9568032`, which appeared in the archive
history between this session's two commits and was not authored by this session.

**The staleness evidence stands and is the reason the grant was right**; only the act of
deletion is unattributed. The Architect worked around the lock without it, committing through
`read-tree` / `write-tree` / `commit-tree` / `update-ref` against a scratch index outside the
mounted folder, so no deletion was needed to land the work.

---

## P-9 NOTICE · A FOURTH S121 INFERENCE FAILED — it bears on T2-B's premise

**Raised under P-9, which the owner made binding hours before it fired. This is a notice, not a
request; no action taken.**

`S121-RULE-CORPUS-INVENTORY-v1` §1F states of the enforcement code: *"These are binding rules
with no prose home. CP-8 is not written in any law file; it is a regular expression. A rule you
can only learn by tripping it is a rule nobody can read in advance."* T2-B — and D-2's rider,
which orders the jurisdiction sentence written onto that page — are built on it.

**Measured by an independent scout window against the fresh clone:**

| artifact | bytes | covers |
|---|---|---|
| `docs/ground/CARD-PREFLIGHT-v1.md` | 13,940 | **CP-1 … CP-11**, each with a one-sentence `**Required.**` imperative and a `**Basis.**` |
| `docs/relay/RELAY-AUDIT-GRAMMAR-v1.md` | 8,007 | `R-ANCHOR`, the three tripwires, the fence exemption, the frozen exemption list |

The first is **generated** from `PREFLIGHT_CHECKS` by `cardPreflight.ts --write-artifact`, so a
pointer to it cannot go stale.

**What was true in S121 and what was over-generalised:** CP-8 is indeed absent from
`docs/laws/`. The inventory said *law file* and the inference became *no prose home*. Two of the
five surfaces have real, current prose homes at known paths; only the three hooks are genuinely
homeless.

**Why it matters before T2 opens:** T2-B is scoped as "give the code-only rules a prose home."
For CP-1…CP-11 and the relay rules that page **already exists**, and writing a second one is the
duplicate-home defect the corpus already suffers from. T2-B's real remaining work is smaller and
differently shaped: the hooks' rules, the jurisdiction sentence D-2 ordered, and a CI check —
none exists today — that keeps the generated artifact in step with the code.

No T2 work has begun and none will begin on this before GATE-1.

---

## T1 IS COMPLETE — 2026-08-28T06:42:32Z

`PHASE-CP8-RECONCILE-1` merged as **#474** at 06:32:23Z and `phase/go-landing-s122-1` as **#476**
at 06:42:32Z. Master is `b86850250cb3d845ff5be5edc425e3304e0dc72f`. Every ordered T1 item has
shipped. Measured from a fresh clone, not read from a report:

```
$ git merge-base --is-ancestor origin/phase/cp8-reconcile-1   origin/master   -> LANDED
$ git merge-base --is-ancestor origin/phase/go-landing-s122-1 origin/master   -> LANDED
$ grep -n 'export function tripwireExemptLinesForText|function anchoredFenceIds|export function cardExemptLinesForText' scripts/relayAudit.ts
536 · 574 · 623        all three ORDER D symbols present, the middle one private as ordered
$ grep -n "from './relayAudit.js'" scripts/cardPreflight.ts
70: import { RELAY_KINDS, auditText, cardExemptLinesForText } from './relayAudit.js';
```

The owner's STRUCTURAL ruling is on the trunk as code, and AG-2 proved all three control arms:
prose RED, unanchored fence GREEN, the specimen's own anchored fence RED — the third being the
original landed scenario reinstated rather than a new test written to pass.

## RULING · ORDER C — THE BACKLOG IS A QUEUE AWAITING AN INSTRUCTION, NOT A GATE DRAWN TOO NARROWLY

The decision `GO-LANDING-S122-2` said the Architect owed. Both the Architect and AG-5 classified
independently and agree on every branch both measured; AG-5's set is larger and is the one that
governs, because it was walked rather than listed.

| set | measurement |
|---|---|
| unlanded phase branches | 22 |
| carrying an AG-5-authored report | **13**, and **all thirteen are report-only** |
| the exception admits | all 13 — today, with no change to any rule |
| the exception refuses | 2 (`authorship-lens-2`, `context-retrieval-1-organ`), and **both correctly**: both change source, and both are other lanes' work anyway, so the ordinary authorship gate already passes them to any lander |

**RULED: the prefix is not too narrow, and it is not widened.** Nothing is being excluded by
`REPORT_ONLY_PREFIX`. The accumulation has one cause and it is not a rule: **no card ordered
these landed while the lane that could land them was stopped.** That is the same defect that
idled this factory for ten and a half hours earlier in this same session — a finished lane with
no instruction — observed a second time, over days instead of hours, and it should be read as
one finding rather than two incidents. `F-S122-NO-CARD-NAMES-THE-WORK-1`.

**RULED, second half — and this is the part neither classification asked for: they are NOT bulk
landed.** Admissible by the authorship gate says nothing about whether a report's CONTENT is
still true. These reports are up to three days old, they make claims about a master that has
moved, and landing one enrols it in the corpus lens and the frozen list. A stale report on the
trunk is read by the next lane as current — which is the exact class this whole session has been
extinguishing, and it would be perverse to close T1 by manufacturing thirteen new instances of
it. The landing card that follows orders them landed **oldest first, each one's own premise
re-read for decay before it is merged**, and STOPS on any whose premise no longer holds, naming
it rather than landing it with a warning label attached (S61-2: a warning sticker on a broken
thing is not a repair).

`context-retrieval-1-organ` is separated out and is **not** backlog: 22 commits and 26 paths of
`PHASE-CONTEXT-RETRIEVAL-1` — the item the project box names as sequence position ⓶ and records
as having no document. It needs review, not landing, and it is named to the owner rather than
scheduled here.

## RULING · S122-SELF-MERGE-SCOPE-1 — THE LAW KEPT THE CONCLUSION AND LOST THE REASON

AG-5 raised, after landing and correctly noting it should have been before, that its own landing
was authorised by a card and by the gate while an auto-loaded law admits no exception. Measured
before ruling, because the first question is always whether the mirror is stale:

| where | wording |
|---|---|
| `docs/laws/` | **the prohibition is not there at all.** Fifty-eight rules and the constitution grepped; only RULE-57 is adjacent, and it governs where a verdict is written, not who may write it |
| `CLAUDE.md:215` | "**NEVER MERGE YOUR OWN WORK** — no measurement, wait or argument relaxes it" |
| `.claude/loop.md:77` | the same sentence, same absoluteness |
| `.claude/boot/foreman.md:703` | "You DO NOT merge your own work; **as foreman you do not author product work, which is what makes you eligible to land everyone else's**" |
| `scripts/land.ts` | `judgeReportOnly` — author lane may equal lander lane when every changed path is under `docs/relay/` and the path list is non-empty |

**The reasoned form and the code already agree.** What is forbidden is landing your own
**product work**; the foreman's eligibility is *constituted* by not authoring any. A landing
report is not product work — it is the record of a landing, and it cannot exist before the
landing it records. The two absolute wordings kept the conclusion and dropped the warrant, and
once the warrant is gone the sentence over-reaches into a **deadlock**: the foreman is the only
lane with merge authority, so a foreman's report becomes permanently unlandable by anyone. That
is not a policy anyone chose. It is `S102 · EN TAM TANIKLI İFADE KAZANIR` in its ordinary form —
the fullest-attested text is `foreman.md`'s, and the compressed copies are the defect.

**RULED: the wording gains back the reason it lost. `scripts/land.ts` is NOT changed and the
prefix is NOT widened.** No law text in `docs/laws/` is touched, because none carries this rule —
which also settles whose ruling it is: a boot text reconciled to shipped, gated, self-tested
code is Architect work, not an amendment.

**One tightening rides with it, and it is the half that is genuinely too loose.** The guard today
is *path prefix + non-empty list*. The reasoned rule is narrower: a lane may land its own work
only when that work is **the record of a landing it was ordered to perform**. `land.ts` already
computes the distinction — it prints `subjects=N reports=N class=AUTHOR-SUBJECT` — so the
narrowing is available to code and does not need a new concept. Nothing today stops a lane
self-landing an arbitrary document that merely sits under `docs/relay/`.

**NOT DISPATCHED THIS SESSION, ON PURPOSE.** The programme's own closing discipline is T1 report,
then one to two observation sessions with **no governance changes**. A boot-text reconciliation
is a governance change. Ruling it now and shipping it now would be the third time this session
that urgency was allowed to skip a rule written to survive urgency. It is recorded here with its
measurements so the next session can dispatch it without re-deriving anything, and it is the
first governance item after the observation window closes.

---

TAIL ANCHOR: S122-PROGRAM-LOG-v1 ends here.
