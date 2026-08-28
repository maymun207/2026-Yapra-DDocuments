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

## OWNER RULING · S122 · E-1 / E-2 / PB / R-1 / WINDOW — RECEIVED 2026-08-28

**E-1 · RULED OPTION A**, five riders. The exception exists by the owner's ruling and only by it.
Scope: a lane may land **the record of a landing that was ordered to it**, mechanically the
distinction `land.ts` already computes PLUS an artifact-type guard limiting it to landing-report
artifacts. R-i mechanism before prose · R-ii four prose homes (foreman boot · producer boots ·
hook text · the H13 page) · R-iii every use emits a named `factory_events` row, counted at every
gate · R-iv PLATINUM-BREACH-S122-1 stands · R-v the #476 landing is RATIFIED, no revert. Option B
declined, kept as the named fallback if the event count ever shows scope creep.

**MY SELF-GRANTED VERSION WAS THE BREACH; THIS GRANTED VERSION IS NOT** — and the distinction is
the whole content of `RULING-S120`. Recorded here because the retraction and the grant look
identical in outcome and are opposite in authority.

**E-2 · DEFER, a fresh session executes.** v3's read-only shape is APPROVED AND FROZEN. I do not
cut this card again. The executing session measures each of the nine claims before sending — the
shape was never the defect. `A-REC-S122-ARCHITECT-PRECISION-DECAY-1` acknowledged as a measured
finding; its countermeasure is ruled MECHANICAL, not moral, and parks to GATE-1: the pre-dispatch
preflight becomes an unskippable hook, so haste has nothing left to skip.

**PB · SEEN, stands.** Two measured positives go to GATE-1 with it, and both are the review layer
working above its design point: a scout window refused an Architect **verdict** rather than a
card, and AG-2 rejected the mis-sent row **by digest before being told**. Governance in this
factory now runs in both directions.

**R-1 · CLOSED AS MEASURED.** 7 → 6. The six residual tokens are scanned BY DESIGN. The "nothing
in this factory gates a prediction" lesson is a P-9 extension CANDIDATE for GATE-1 and is **not
ruled now** — recorded so the next session does not act on it as though it were.

**WINDOW · P-6 OPENS AT THE NEXT SESSION.** One to two ordinary sessions, no governance changes,
metrics logged per session. The queue and AG-1's card supply are ordinary work inside it.
`phase/context-retrieval-1-organ` is HELD un-reviewed and is the FIRST GATE-1 agenda item.

### MEASURED AGAINST THE RULING, AND TWO ANSWERS ARE OWED BEFORE THE QUEUE MOVES

Measured at master `b86850250cb3d845ff5be5edc425e3304e0dc72f`, each of the thirteen branches by
the artifact it adds:

```
GO- prefixed        execute-landing-1 · landing-plan-1
GO- prefixed, MIXED ruling-s120-factory-stop-1 — adds a GO- report AND a RULING- report
landing records,    s119-landing-order-1 · -2 · -3 · -4 · trunk-green-land-1 ·
not GO- prefixed    backlog-landing-order-1
not landing records nightly-compat-red-1 · ref-sweep-remeasure-1 (+ a -plan.md) ·
                    ruling-s120-spend-and-gate-consent-1 · s118-lane-sweep-2-ag5-report
```

**THE RULING SAYS THE THIRTEEN UNBLOCK; THE SCOPE IT DEFINES DOES NOT ADMIT THIRTEEN.** On the
NAME class the queue is two branches and one mixed; on the SEMANTIC reading — the record of a
landing ordered to the lane — it is about eight. Not thirteen either way. This is exactly what
R-i forces into code, and how R-i is written decides the queue's size. **Owner answer owed; not
resolved here.**

Second: R-i says mechanism first, and the mechanism is a `land.ts` predicate change plus boot,
hook and page text plus a telemetry write. **That is a governance change, and the window forbids
governance changes.** Either R-i is exempt from the window or the queue waits for GATE-1.
**Owner answer owed; not resolved here.**

Two smaller findings, measured so the riders are costed before they are ordered:

* **R-ii's H13 page has no landed home.** H13 exists only in `ADF-ARCHITECTURE-v2`, which has
  never landed; `docs/design/ADF-ARCHITECTURE-v1.html` IS in the tree. So R-ii implies v2 lands
  there — which answers a question parked since yesterday, by implication. Not assumed.
* **R-iii needs no migration.** `public.factory_events` exists with `lane_addr` accepting `AG-5`
  and `new_state` free text, and its `factory_events_subject` CHECK is satisfied by a lane-addressed
  row. The cost is a write path through the existing factory write channel, inside R-i's work —
  not a schema change and not an Operator relay.

---

## E1-AMENDMENT-1 — OWNER ADDENDUM, LOGGED 2026-08-28

**A-1 · SCOPE IS THE SEMANTIC READING.** A landing-report artifact is one documenting the
EXECUTION of a landing ORDERED to that lane by card. `land.ts:1255/1293`'s `AUTHOR-SUBJECT`
classification is the seam; **filename prefix is NOT the test** — the "GO-landing report path
class" parenthetical was illustration, and where it diverges the definition sentence governs. A
branch qualifies only if EVERY artifact it adds is in scope. The four standing-measurement
reports are OUTSIDE, deliberately: they are AG-5's own observations, not records of ordered,
gated acts, and the exception's rationale does not reach them. Their landing path is a NAMED
GATE-1 design question — *the foreman standing-report path* — and is not resolved.

**A-2 · R-i WAITS. THE WINDOW STAYS CLEAN.** The exception's LEGAL effect is in force now (the
grant, R-iv, R-v). Its STEEL — the `land.ts` predicate, the boot/hook/page sentences, the
`factory_events` write — is the FIRST work order out of the GATE-1 sitting, and the qualifying
queue drains immediately after it lands. Nothing in ordinary window operation needs the
exception; only records wait.

**A-3 · `ADF-ARCHITECTURE-v2` LANDS AT GATE-1, alongside R-i**, and its landing card states
explicitly that the landing IS the owner's ratification of v2. The **H2 direction — what may
serve as the source of BINDING law, deterministic set versus vector retrieval — STAYS OPEN**, to
be decided at the GATE-1 sitting together with the context-retrieval branch review; any resulting
change is `v2_1` under `S37-1`. **v2 lands as the measured record of what IS**, not as a decision
about what should be.

### THE OWNER'S OWNED CORRECTION — LOGGED BECAUSE THE CLASS IS SUBSTRATE-INDEPENDENT

The ruling's sentence *"the 13-branch queue unblocks"* carried an earlier count into a ruling
without re-measuring what the queue contained. The owner named it as his own and asked that it be
logged **so the record shows the error class is not a property of the Architect.** It is the same
class as `F-S112-GATE-TALLY-STALE-1`, as my own stale instrument table, as my `backlog` fence
wrong in both directions, and as nine fence claims in one card written three times.

`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1` — *the dominant failure mode of this
factory is a number that travelled between carriers without being re-derived, and it is committed
by every actor in it, owner included.* This is the single most useful thing the session produced
about the class, because it removes the last comfortable explanation: it is not fatigue, not
model, not lane discipline. **It is that nothing gates a number on its way into a carrier.**

### THE QUALIFYING QUEUE, MEASURED ARTIFACT BY ARTIFACT — AND MY "~8" WAS WRONG TOO

Measured at master `b86850250cb3d845ff5be5edc425e3304e0dc72f` by reading each report's own
opening rather than its filename, which is what A-1 requires:

```evidence:queue
IN SCOPE, landable as they stand
  execute-landing-1            "Eight landings, in a sitting the freeze opened"
  backlog-landing-order-1      "ONE landed, then STOPPED at the canary"
  trunk-green-land-1           "the trunk is GREEN, the canary fired once and passed"
  ruling-s120-factory-stop-1   BOTH artifacts are landing-execution records — "the boot fix
                               is on the trunk" and "the queue drained to three landings and
                               one gate refusal". NOT MIXED. NO SPLIT NEEDED.

IN SCOPE, blocked by a SECOND gate that has nothing to do with the exception
  s119-landing-order-1 · -2 · -3 · -4
                               all four are execution records — "eight landed", "four landed,
                               three refused", "three landed", "THE TRUNK IS RED. NOTHING
                               LANDED" (a refusal is an execution outcome). But none carries a
                               relay-audit header, so governed=false, and none appears in
                               RELAY-AUDIT-EXEMPT-HISTORY-v1.txt, whose additions are FROZEN.
                               The corpus gate reds on any relay .md that is neither.

OUT OF SCOPE — and this one is MY correction, not the owner's
  landing-plan-1               "Twenty-two open pull requests measured with the landing
                               script's own DRY RUN. Six are landable." No landing was
                               executed. It is a survey, the same class as the four the owner
                               excluded by name — and I had counted it IN when I said "about
                               eight".

OUT OF SCOPE by owner ruling
  nightly-compat-red-1 · ref-sweep-remeasure-1 ·
  ruling-s120-spend-and-gate-consent-1 · s118-lane-sweep-2
```

**THE QUEUE IS FOUR NOW AND FOUR MORE PENDING A REMEDY — not "~8".** Both the owner's thirteen
and my eight were unmeasured, in opposite directions, in consecutive documents about the danger
of unmeasured counts. Recorded exactly that way.

**A SECOND GATE-1 QUESTION, NAMED NOT RESOLVED.** The four `S119` reports are in scope and cannot
land as they stand. Adding a header to a submitted artifact runs into `S37-1` — a submitted
artifact is immutable and a correction is a new version — and the exempt list is frozen against
additions. That is adjacent to the foreman standing-report path question A-1 already parked, and
it belongs beside it on the GATE-1 agenda rather than being solved by whoever notices it first.

### STATE AT SESSION CLOSE

```
IN FORCE     the exception's legal effect · R-iv (the breach stands) · R-v (#476 ratified)
WAITING      R-i steel · ADF-ARCHITECTURE-v2 landing · the qualifying queue — all GATE-1
FROZEN       PHASE-LEDGER-DECAY-SWEEP-1-v3, read-only shape approved, executed by a fresh
             session that measures its nine claims before sending
HELD         phase/context-retrieval-1-organ, un-reviewed, FIRST GATE-1 agenda item
OPEN         the H2 direction — binding law from a deterministic set or from vector
             retrieval — decided at GATE-1 with the context-retrieval review; any change
             is v2_1 under S37-1
NEXT         the P-6 observation window opens at the next session. No governance changes.
             Metrics logged per session. Next contact: the scorecard, or P-4.
```

---

TAIL ANCHOR: S122-PROGRAM-LOG-v1 ends here.
