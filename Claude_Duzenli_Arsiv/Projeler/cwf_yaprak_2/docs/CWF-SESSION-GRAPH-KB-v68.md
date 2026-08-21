# CWF — Session Graph KB · v68
<!-- CWF-SESSION-GRAPH-KB-v68 · 2026-07-29 · S69. Supersedes v67.
     This is the SHAPE of the work, not the ledger. The ledger is
     cwf-open-items-register-v70. -->

## S69 in one line

**Four merges, one governed clean, five Architect premise errors — and the day's real lesson was that
a law list read at session start does not fire at the moment of use.**

---

## The arc

S69 opened with one branch in flight (`phase/catalog-write-lock-1-g4`, pushed and unmerged) and closed
with master at `42e4839b`, zero branches in flight, zero pending migrations.

```
475b0417  (open)   →  de0cc0f7  CATALOG-WRITE-LOCK G4+G5
                   →  d6d7fa7e  F185-GUARD-1
                   →  56706089  F209-CHART-AXIS-1
                   →  42e4839b  F199-EMPTY-LAYER-1   (close)
```

Plus a governed data operation through the gated admin UI: the learned map cleared from 25 rows to 2,
epoch 11 → 12.

---

## The four shapes worth carrying

### 1 · A guard whose exclusion sources answered the wrong question

The learn guard's designed exclusions caught **4 of 23** contaminated keys, and the reason generalises
past this codebase: **both sources answered a WHOLE-SURFACE question while the input was a SINGLE
TOKEN.** A time resolver that switches over `bu hafta` and `önceki vardiya` cannot classify `haftalık`
or `vardiyasında`, no matter how long the list grows. When a classifier and its input disagree about
grain, extending the classifier is motion without progress.

The fix inverts the polarity: stop denying from an unbounded world, start admitting from a bounded
integration. **The vocabulary users type is unbounded and changes without telling you; the tool corpus
is bounded by the integration and grows with the backend.** That is ADR-009's degree test one layer
down.

### 2 · A specification that contained its own defect

The inverted corpus had four terms and one of them was **our own routing config**. The gate caught it —
3 admitted against a ceiling of 2 — and the Author lane refused to merge, refused to widen a deny clause
to rescue the number, and escalated with per-admit provenance instead.

The sharp form of the defect is not "tautology". It is that admitting a word BECAUSE it is an authored
routing keyword **licensed the automatic path to overwrite a curated decision**: `tüketim` is authored
in `production` and had been learned as `[metrics, factory, employee]`, zero overlap.

**Pre-registration is what made this recoverable.** The criterion's own remedy clause was "the corpus
definition is too wide", and the only thing it forbade was widening a deny clause. Narrowing the corpus
was the sanctioned response, not a criterion adjustment — and the honesty test was asked out loud:
*would I drop this term if the gate had passed?* Yes, because `tüketim`'s zero overlap stood
independently of the count.

### 3 · A defect class that recurred three times in one day

- The stopword list held `dun`; the tokenizer produced `dün`. Two sides of one comparison, written
  separately.
- `tool_category_cache` holds `hattının`; `router_proposals` holds `hattinin`. Two doors to one map,
  normalising separately.
- The Accept button's enabled-condition carries a fallback; its action-condition does not. One control,
  two conditions, written separately.

**S69-3** was minted from the third, but the family is the point: *when the same decision is expressed
twice, the expressions drift, and the drift is silent.*

### 4 · Code that shipped into a path that does not execute

F199 fixed a real defect and landed **dark**. `router.frameRouting = 0`, so
`computeTurnClarification` returns null before any of the new code runs. The 12 EQUIPMENT frames used
as justification were observe-only extractions that never reach the gate.

The Author lane found this and contradicted the brief with the live value rather than building to the
claim. The merge still went ahead — the fix is correct and costs nothing while dark — but the value
statement changed from *savings* to *insurance*, which is F187's lesson applied again.

**Register v70 §6 now exists so that "is this reachable?" is a lookup, not a memory.**

---

## Why the equipment layer is empty (the answer the system gave us itself)

One production log line, from a routine cron tick:

```
[EntityDiscovery] backend=armes layer=equipment tool=getEntities SKIPPED
reason=required-param-no-default param=showAll
```

`getEntities` declares `showAll` REQUIRED and publishes no machine-readable default. The sync refuses
to guess a value from prose, because that would be a hand-authored fact — ADR-009 and ADR-010, applied
by a machine, at 16:01 on a Wednesday, with the reasoning written into the log line.

**The shape to carry: a well-built system explains its own gaps if you read its logs instead of its
documentation.** The Architect had been about to write a phase brief specifying a column that does not
exist.

---

## The three lanes in S69

**Author (AG)** caught three Architect errors: the missing relay, the impossible n=2 condition, and the
dark gate. It also refused to trust its own prose — wrote "tree-shaken out" in a docblock, checked it,
found it false, fixed its own module and reported the pre-existing leak it found without fixing it.
**That is S65-2 applied to one's own writing, and it is the highest-value behaviour observed this
session.**

**Operator (Gemini)** produced five-gate and six-gate read reports, correctly reported an actual value
against a mis-specified expectation rather than mechanically failing it, and confirmed a column the
Architect believed absent was in fact absent.

**Architect (Claude)** made five premise errors, minted six laws, and — more usefully — conceded that
minting laws has a demonstrated failure rate, since two of the five errors violated laws that were
already written.

---

## The mechanism change that came out of S69

A rule is unbreakable only when all three hold:

- **(a)** it is a REQUIRED FIELD of a produced artifact, not a thing to remember
- **(b)** that field carries a fact another lane can INDEPENDENTLY RE-DERIVE
- **(c)** that lane is OBLIGED TO STOP when it is absent or wrong

The tail anchor has never been violated because it satisfies all three. The law list satisfies none —
it is prose, read once, at the wrong moment.

Hence the **PREMISE BLOCK** (bootstrap §7): from S70 every phase prompt opens with reachability,
provenance and satisfiability as filled fields, and the Author is obliged to stop if any is empty,
self-referential, or contradicted by what it reads.

---

## Numbers worth remembering

- The learned map reached **164 rows** before the 2026-07-26 clear and **23 more** in the 2.7 days
  after. With learning braked the accumulation rate is now **zero**. The brake, not the clean, is what
  makes a clean durable.
- `[LearnCorpus] corpus loaded: 167 tools, 796 entities` — 167 = 141 ARMES + 26 Superset; 796 = 17
  factories + 779 lines. Both match independently derived counts exactly.
- EQUIPMENT is the **4th most common** frame object (12 of 129 over nine days), against a register that
  claimed it never appears.
- F209's arithmetic: 580px of plot ÷ 12 labels = 48px each, for text needing ~60px. The collision was
  computable from two constants and was never computed.

<!-- END · CWF-SESSION-GRAPH-KB-v68 · 2026-07-29 · S69 -->
