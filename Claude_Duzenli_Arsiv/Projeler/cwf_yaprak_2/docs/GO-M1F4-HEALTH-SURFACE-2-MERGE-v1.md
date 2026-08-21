# GO · M1F4-HEALTH-SURFACE-2 · MERGE · v1
<!-- GO-M1F4-HEALTH-SURFACE-2-MERGE-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     RULE-25 from a sixth fresh clone (/home/claude/s80r5). Computed (D-3).
     This is the LAST build merge in Block 1. -->

## §1 · VERDICT: **GO**

No residual findings. This is the first phase in the block to come back clean.

## §2 · RE-DERIVED INDEPENDENTLY

| Claim | My result |
|---|---|
| branch head | `4d41ffdeaac7451a73649ba74bc43689e5d1437f` ✓ |
| anchored | `--is-ancestor origin/master` **YES** on `7de3eb6f`, one commit ahead |
| migrations | **67 → 67**, `supabase/` diff **0 lines** ✓ |
| `evalGate.ts` | **0 lines** ✓ |
| `REFERENCE_INSTANCES` | **0 lines** ✓ |
| test files | **440**, counted myself ✓ |
| docVersion | `rev 187` ✓ |
| C1 LAW | the one `messages` touch is `.select('id').eq('role','assistant').in('trace_id', chunk)` — a **read**, and a chunked one ✓ |
| **coverage list** | parsed `HEALTH_SPEC_ITEMS` myself: **31 items · 26 `data` · 5 `deferred` · ids unique** — identical to the reported table, derived independently ✓ |

**The instrument is real, and it is a module, not a comment.** `HEALTH_SPEC_ITEMS`
lives in `healthCoverage.ts`; the test mounts the tab and walks it. Two guards I
did not ask for and should have:

* **unique-id assertion** — *"a duplicate would let one node satisfy two items"*.
  That is the exact hole a coverage list develops as it grows, and it is closed
  before it opened.
* **band coverage** — every band present in the list, so a whole band cannot
  vanish between the spec and the walk.

Three mutations prove the gate reds and each **names the item it lost**
(`band 0 · hero-withheld`, `guven-tenant-zero-ci … MUST name OMURGA-SIGNALS-1`,
`band 4 · bilgi-entity-registry`). A coverage test that fails without saying what
it lost is a coverage test nobody will maintain.

## §3 · THE TWO FLAGS

**1 · `git diff` does not see untracked files — and this one deserves a ruling.**
The first constraint pass reported *"no `messages` access"* while the new,
still-untracked repository contained one. The C1 law held (it is a read), but
**the check was falsely green.** Every "diff is zero" proof in this program has
the same shape, and this is the first time anyone has named the hole in it.

> **S80-6 (RULING).** A constraint proven by `git diff` against a working tree is
> proven only over TRACKED files. An untracked new file is invisible to it, so a
> "zero diff" claim from an unstaged tree is not evidence. Stage first, or prove
> the constraint against a pushed commit.

Scope, stated so it is neither over- nor under-claimed: the Architect's RULE-25
reviews are **not** exposed — they run in a fresh clone against a pushed commit,
where nothing is untracked. The hole is real for author-side, working-tree
checks, and that is where it fired.

**2 · Band 2's error classes rendered only in the empty branch.** A window WITH
errors displayed nothing at all — the `§4` item *new-error-classes* was live and
broken, not merely missing. It was invisible for exactly the reason the rest of
the gap was: **no coverage proof existed.**

The instrument found a live defect on the day it was built. That is the whole
argument for G7 in one line.

## §4 · WHAT THIS CLOSES

* `GOVERNANCE-SIGNALS-1` — **retired**, asserted absent from the whole surface,
  and its two DOC-FLIP tests flipped to assert the retirement. A placeholder with
  an expiry, honoured. Nothing to carry to the board.
* Band 4, band 5's three, band 6's forget tick, backend health, W2.4, the
  👎→golden conversion (rendered **2 / 37**, with its denominator).
* Five deferrals, every one quoting `OMURGA-SIGNALS-1`.

## §5 · MERGE INSTRUCTION

**STEP 1 — CI is the arbiter (S37-2).** PR from `phase/m1f4-health-surface-2`.
Report the PR run as what it produces (×4 + `eval-canary` skipped) and the master
push run's real ×5. Both run ids. Do not translate either into "5/5".

**STEP 2 — merge `--no-ff`** (squash banned), message **byte-verbatim**, push,
report the remote master hash.

```
Merge PHASE-M1F4-HEALTH-SURFACE-2: the dashboard stops losing its own spec

Rollout item 1.5, and the last build item in Block 1.

1.4 shipped the Health tab and roughly half the design note's §4 band contents
were neither rendered nor named. That was a defect in the brief, not the work:
the brief listed the bands and never demanded a coverage proof, and the
self-verify had no item for it. What was asked for was built; what was not asked
for went missing quietly.

The instrument that stops it recurring is HEALTH_SPEC_ITEMS — a module, not a
comment — walked by a test that mounts the tab. 31 items: 26 rendered with data,
5 rendered as deferrals naming OMURGA-SIGNALS-1, and NEITHER = 0. Three mutations
prove it reds, and each names the item it lost, because a coverage test that
fails without saying what it lost is one nobody maintains. It also asserts its own
ids are unique, since a duplicate would let one node satisfy two items.

It found a live defect the day it was built. Band 2 rendered its error-class list
only in the EMPTY branch, so a window containing errors displayed nothing at all
— the §4 item was not missing, it was broken, and invisible for exactly the
reason the rest of the gap was.

W2.4 now watches. health_turn_daily_series has carried withheld_turns since 1.3b
— the whole denominator argument was about making the honest-withhold class
countable — and the surface had never shown it. It renders a STRUCTURAL zero
today, because computeTurnClarification no-ops while router.frameRouting is dark,
and the card says which kind of zero it is. It will be watching before A23 flips
that, rather than after.

Backend health was the one band-1 signal needing no external integration and it
had been left out; an unchecked backend now reads "never checked" rather than
borrowing silence. The 👎→golden conversion renders 2 of 37 — a count without its
denominator is not a fact. GOVERNANCE-SIGNALS-1 is retired and asserted absent
from the whole surface: a placeholder with an expiry, honoured.

And a hole in a check this program leans on everywhere: git diff does not see
UNTRACKED files, so a "zero diff" constraint proof over an unstaged tree can be
falsely green. It was, once, before staging. Stage first, or prove against a
pushed commit.

ZERO migrations (67 -> 67, supabase/ diff 0 lines) · ZERO governed publishes ·
ZERO writes to messages, the one touch is a chunked select.
438/4895 -> 440/4927 · rule26 125 passed, 0 flaky, first attempt · reseal rev 186 -> 187.
```

**TAIL ANCHOR (S61-3):** ends at `reseal rev 186 -> 187.` — a shorter copy means
the relay truncated; request it again before merging.

**STEP 3 — prune** `phase/m1f4-health-surface-2` after the merge (ancestry first).
Architect-authorized. The two by-design stale remotes stay.

## §6 · AFTER THIS, BLOCK 1 OWES EXACTLY TWO THINGS

1. **W-M1F2A-1** — the 00:00–02:00Z watch. Architect-only, no owner work, no AG
   work. It can only be observed while the injector is WRITING, which is the
   first window after the daily ceiling resets.
2. **The closing artefacts** — register v83 · KB v79 · bootstrap v79. Architect.

No migration, no Operator step, no external dependency beyond the clock.

<!-- END · GO-M1F4-HEALTH-SURFACE-2-MERGE-v1 -->
