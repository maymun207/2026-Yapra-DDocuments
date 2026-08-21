# GO · M1F3-DOCFLIP-1 · MERGE · v1
<!-- GO-M1F3-DOCFLIP-1-MERGE-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     RULE-25 from a fifth fresh clone (/home/claude/s80r4). Computed (D-3). -->

## §1 · VERDICT: **GO**

## §2 · RE-DERIVED INDEPENDENTLY

| Claim | My result |
|---|---|
| branch head | `2a706cb5bd781a7683dcdbf1f4832c7d07f17a69` ✓ |
| anchored | `--is-ancestor origin/master` **YES** on `d599b8b2`, one commit ahead |
| migrations | **67 → 67** ✓ |
| `supabase/` diff is comment-only | verified by filtering the `+/-` side for non-comment, non-blank lines: **zero** ✓ — not taken from the report |
| `evalGate.ts` | diff **0 lines** ✓ |
| `REFERENCE_INSTANCES` | diff **0 lines** ✓ — the §2 fence held |
| test files | **438**, counted myself ✓ |
| docVersion | `rev 186` ✓ |
| prune | remotes are exactly `master` + the two by-design stale branches ✓ |

**G2.5 produced a registry, not a patch.** The ternary at `rules.ts:51` is now
`REFERENCE_POOLS`, a keyed table with three entries — `PROMPT_SEGMENT`,
`AGENT_PARAM`, `ROUTER_PROMPT` — and a header stating the ADR-009 reason the
*other* kinds legitimately have none: governed content is published through the
gate, never floor-seeded, so *"no reference instance"* is the true answer there
and must stay. **An affordance that invented a floor would be worse than one
that admits it has none.** That is the right shape: the census turned into a data
structure the next kind can join, not a second special case.

**G2's census found three, not one.** I counted the emit sites myself: **seven
call sites across six files**. The two beyond the named one are the substantive
find — `route-proposals-summary` and, more seriously, **`eval-ci`, a monthly
spend fence that caught its error, logged it, and recorded nothing.** A fence
whose failures are invisible is a fence you cannot audit.

## §3 · THE THREE DECISIONS YOU ASKED FOR

**1 · `GOVERNANCE-SIGNALS-1` — minted correctly, and it dies inside Block 1.**
Band 4 was worse than I reported: its status row had *borrowed*
`OMURGA-SIGNALS-1`, an item that owns deploy/CI/observability. That item will
close green one day while the governance counters stay unowned — a deferral
pointing at someone else's work is not a deferral, it is a hiding place. Minting
a distinct name was right.

**Placement: it is NOT a Block-2 item.** Rollout item **1.5 ·
`PHASE-M1F4-HEALTH-SURFACE-2`** builds all six of band 4's rows from tables that
already exist. `GOVERNANCE-SIGNALS-1` therefore goes on the board with an
explicit retirement condition: **retired by 1.5's merge.** It is a placeholder
with an expiry, not a debt.

**2 · The prose staleness — a real blind spot in a gate we trust.**
`runtime-topology` said the emitter fires from "three catch sites"; after the
sweep it is five, and the tab's mapped areas did not change, so `check:doc-drift`
could not see it. The guard hashes **code**; a number living in **prose** is
outside its reach by construction.

> **S80-5 (RULING).** A count stated in a mapped tab's prose is unguarded. Doc
> prose describes RELATIONSHIPS, not quantities. If a quantity must appear, it
> is pinned by a test or it will go stale silently — the drift gate hashes code
> and cannot see it.

**3 · The cost arrow — the sharpest thing in this hand-back.**
1.4's cost row drew its trend from `d.turns` under a cost label, and
`HealthDayPointView` carries no per-day cost at all. The number was present,
measured, non-null, correctly guarded — and simply **the wrong quantity.**

Every honesty law this program has built checks *whether* a number is known:
empty≠zero, MEASURE-READ-HONESTY-1, the gray-card law, `minN`. **Not one of them
checks WHICH number it is.** A category error passes all of them wearing a green
arrow.

> **S80-4 (RULING).** Our defence stack verifies that a rendered number is
> KNOWN. It does not verify that it is the RIGHT number. Every card that binds a
> label to a series must pin that binding in a test — the label and the field it
> reads, asserted together. A wrong quantity is invisible to every empty-state
> law we have.

Removing the arrow rather than re-pointing it was the correct call: there is no
per-day cost to point at, and inventing one to keep an arrow would have been the
fabrication the whole program exists to prevent.

## §4 · MERGE INSTRUCTION

**STEP 1 — CI is the arbiter (S37-2).** Open a PR from `phase/m1f3-docflip-1`.
Report the PR run as what it produces (×4 + `eval-canary` skipped by the
`push || workflow_dispatch` fence) and the master push run's real ×5. **Do not
translate either into "5/5".** Report both run ids.

**STEP 2 — merge `--no-ff`** (squash banned) with the message below,
**byte-verbatim**; push; report the remote master hash.

```
Merge PHASE-M1F3-DOCFLIP-1: the record catches up, and three gates learn to see

The DOC-FLIP that closes rollout item 1.4, plus four defects the Health tab's
first live day exposed in its own foundations.

The reset affordance was inoperable for every governed param. rules.ts resolved
its pool from referenceSchema.instances, and referenceData.ts never imported
agentParams at all, so "Reset to code floor" answered "No reference instance for
this key" for all 33 of them while the floor sat in a different array. The
census tabled all 29 kinds and found a second gap nobody had named, router.prompt.
The ternary became a keyed registry, and the kinds that legitimately have NO code
floor still answer honestly — an affordance that invented a floor would be worse
than one that admits it has none.

The measurement-failure census found three uninstrumented sites, not the one the
brief named. turn-trace-digest-cleanup did not catch at all; route-proposals-summary
and eval-ci both caught, logged, and recorded nothing — and eval-ci is a MONTHLY
SPEND FENCE. A fence whose failures leave no trace is a fence nobody can audit.

Two defects were the Architect's, from 1.4, and are recorded as such. The p95 row
drew a coloured trend from a single sample while its two siblings correctly
abstained; minN now gates the colour and the arrow, never the number. And the
cost row drew its trend from d.turns under a cost label, when HealthDayPointView
carries no per-day cost at all — not under-evidenced, THE WRONG QUANTITY. Every
honesty law here checks whether a number is known; none check which number it is.
The arrow was removed rather than re-pointed, because there was nothing correct
to point it at.

S80-3 now lives in the code: once a governed param is PUBLISHED, changing its
code floor is INERT. Runtime resolution is DB-first and the reconciler's
ABSENCE-ONLY LAW never republishes an existing row. The floor is the seed, the
reset target and the outage floor — never the live value.

And a staleness no gate could see: runtime-topology's prose said "three catch
sites" when it is five. The drift guard hashes code, so a count living in prose
is structurally invisible to it.

ZERO migrations (67 -> 67, the only supabase/ diff is comments) · ZERO governed
publishes · ZERO writes to messages · REFERENCE_INSTANCES untouched.
436/4861 -> 438/4895 · rule26 121 passed, 0 flaky, first attempt · reseal rev 185 -> 186.
```

**TAIL ANCHOR (S61-3):** ends at `reseal rev 185 -> 186.` — a shorter copy means
the relay truncated; request it again before merging.

**STEP 3 — prune** `phase/m1f3-docflip-1` after the merge (verify ancestry
first). Architect-authorized.

## §5 · WHAT COMES NEXT, IMMEDIATELY

`PHASE-M1F4-HEALTH-SURFACE-2-v1_1` is already written and travels with this GO.
Its anchor is a **property, not a hash**: master must have two parents and one of
them must be `2a706cb5bd781a7683dcdbf1f4832c7d07f17a69`. Start it the moment
that holds — no further Architect round is needed between the two.

<!-- END · GO-M1F3-DOCFLIP-1-MERGE-v1 -->
