# S117-SESSION-NOTES-v3 · closing record

Written WHOLE at 2026-08-25 10:55Z (13:55 TSİ), master `50ba7d7e`. Supersedes v1 and v2.
Governance artefacts are written whole, never patched (A-REC-S101-7).

---

## 1 · WHAT LANDED — thirteen into master, plus one into its own base

`#391 · #389 · #392 · #393 · #386 · #384 · #394 · #396 · #397 · #398 · #399 · #400 · #401`
into `master`, and **`#390` into `phase/context-retrieval-1`** — which is why master never
moved for it, and why I missed it for half an hour. `F-S117-LANDING-COUNT-WATCHES-MASTER-ONLY-1`:
a counter that only watches master misses every stacked request.

Two landings were judged by the second authorship lens rather than by commit subjects
(`AUTHOR-REPORT`, `AUTHOR-REPORT-CORROBORATED`) — the first time this factory landed work
whose subjects named no lane at all.

## 2 · DEFECTS FOUND AND CLOSED, ALL ON THE SAME DAY

| finding | what it was | closed by |
|---|---|---|
| `F-S117-FOREMAN-RAN-A-STALE-GATE-1` | the foreman's shared clone was **34 commits behind**; every refusal class printed all night came from a gate that no longer existed, reported in the present tense | #396 — the gate now prints its own revision and REFUSES when it cannot vouch for its own rules. It caught its own author's drift within an hour of landing. |
| `F-S117-LAND-ASSUMES-MASTER-BASE-1` | five expressions hardcoded `origin/master`; `baseRefName` was **requested and then discarded** by a parse taking `headRefOid` alone | #396 — proven end to end when #390 landed into a branch that was not master and step 7 proved the RIGHT ref |
| `F-S117-ANCHOR-HID-A-CARD-1` (6 instances) | `created_at > anchor` never returns the row sitting AT the anchor; lanes printed `read OK · zero rows` over a non-empty box. One card sat invisible 459 seconds. | #392 — `>=` plus id dedup, plus a count over the SAME predicate cross-examining every zero read |
| `F-S117-MAIL-VERB-NEEDS-TWO-CONNECTIONS-1` | "read a card, then mark it consumed" exists in NEITHER connection alone. `relay_mark_consumed` had taken 42501 on every delivery **since the file existed — not one stamp had ever landed** | #392 / #394 |
| `F-S117-LAND-ANCESTRY-NEEDS-THE-HEAD-OBJECT-1` | ancestry refused `UNMEASURED` because the clone lacked the head object; the foreman performed the remedy **by hand three times** | #398 |
| `F-S117-LAND-STATUS-VS-CHECKS-1` | every JOB green and the commit STATUS still pending (Vercel). `empty ≠ zero` in a CI costume | adopted into the drain ritual |
| `F-S117-CI-DIET-REASON-FALSIFIED-1` | a correct rule defended by a falsifiable reason | #392 |
| `F-S117-CARD-AND-LANE-PASS-IN-FLIGHT-1` | five cards of mine asserted a state that had stopped being true — by 11 seconds, 33 seconds, 6.5 minutes, and twice by more | #400/#401 — preflight CP-9/10/11, run by the RECEIVING LANE |
| `F-S117-DEAD-LANE-REF-NOT-RECLAIMABLE-1` | a window that dies without releasing leaves its address unreclaimable by design | #397/#399 — declared silence, candidate notice, human confirmation |

## 3 · THE LAW OF THE DAY · `F-S117-LIVENESS-IS-POSITIVE-ONLY-1`

**Every liveness lens this factory owns is positive-only.** A fresh heartbeat, a moved ref, a
posted bus row, a `consumed_at` stamp — each proves ALIVE at an instant. **Not one proves DEAD.**
The heartbeat in particular measures the POLL LOOP, not the agent: `F-S117-HEARTBEAT-MEASURES-POLLING-NOT-LIVENESS-1`.

AG-2's counterexample, from the wire: AG-3's last heartbeat `04:47:22Z`, its commit `1e154696`
at **`05:00:10Z` — thirteen minutes later.** A 900-second threshold would have certified it dead
about two minutes after it committed.

**FOUR STATES, not two.** `BUSY` · `DEAD` · **`LOOP-DEAD`** (agent alive, poller stopped — AG-5,
105 minutes: *"I did not declare that silence because I did not know it was happening"*) ·
**`HUNG`** (agent present, not progressing — AG-3, recovered by the owner with ESC + `continue`).
**The last two are visible only from outside**, and neither can be covered by a declaration a
lane makes about itself.

**Consequence, and it is not a defeat:** the only lens that can see a stopped window is a person
looking at it. That is the one place S102-YASA-1's *real-world witness* is irreducible. **The
factory NAMES a candidate; a human CONFIRMS.** Consent, not operation.

## 4 · THE ARCHITECT'S ERRORS — six, all measured by lanes

1. **`A-REC-S117-CARD-SUBJECT-GRAMMAR-OMITTED-1`** — no card ever stated the land gate's subject grammar, so four CI-green requests refused AUTHOR-UNKNOWN. My remembered version of the rule was also wrong.
2. **`A-REC-S117-BRANCH-ATTRIBUTION-ASSERTED-1`** — attributed two branches to AG-4 from memory; the bus held the answer (both cards addressed to AG-2, 20:08Z the day before). **Cost: AG-4 committed on AG-2's branch in good faith, and #387 is still blocked on the two-lane tie that created.**
3. **`A-REC-S117-LIVENESS-ASSERTED-FROM-ONE-LENS-1`** — certified AG-3 dead from one stale heartbeat while it was working, escalated it to the owner, obtained a destructive approval on a false premise. The deletion ran at `06:01:40Z`; my withdrawal is stamped `06:01:51Z` — **eleven seconds late.** A live lane lost its address.
4. **`A-REC-S117-NO-DAMAGE-INFERRED-FROM-CURRENT-STATE-1`** — I then told the owner four times that the push had never run, because I read the ref present at 06:02Z. **A repaired state is byte-identical to an unbroken one** (`F-S117-ABSENCE-OF-DAMAGE-IS-NOT-PROOF-OF-NO-DAMAGE-1`).
5. **`A-REC-S117-FENCE-ABSENCE-ASSERTED-1`** — carried "the budget fence never fires" across two sessions unmeasured. It had fired seven consecutive days. My probe window was also wrong: **a probe timed outside the observed distribution manufactures the answer it was sent to find.**
6. **`A-REC-S117-TOOL-ERROR-STRING-TAKEN-AS-MEASUREMENT-1`** — `gh` said "cannot update due to conflicts"; three `merge-tree` rehearsals in three directions produce the identical tree with no conflicted path. A tool's error string is a claim.

**And the number I asked for: of my last ten cards, ZERO would pass the card preflight that
already existed.** CP-7 0/10 · CP-11 0/10 · CP-2 2/10. A rule its author fails ten times out of
ten while believing he follows it is the case for moving the check to the reader — which is what
#401 does.

## 5 · THREE HOLES LEFT OPEN, DELIBERATELY

- **`F-S117-REF-READING-CONFLICT-UNEXPLAINED-1`** — AG-5 deleted `lane/AG-3` at 06:01:40Z and measured it absent; I measured it PRESENT at `5cd6ddb1` at 06:02, 06:38, 06:55 and 07:16Z, and absent again at 07:45Z. AG-3 testifies it never re-pushed, falsifying the only reconciling hypothesis. **No account explains it.** Not closed with replica lag or any other unmeasured story.
- **`F-S117-UPDATE-BRANCH-EXIT-1-UNEXPLAINED-1`** — git says the merge is clean in every direction; GitHub says it cannot update the branch.
- **`F-S117-ROUTE-DERIVE-G3-RED-UNEXPLAINED-1`** — #402 red on one test of 10,105. AG-2 ran it 16 times across 3 lenses, zero reproductions, **and ruled OUT the timeout repair on evidence**: the whole file completes in ~1s against a 5000ms budget, so the timeout is not the constraint. A real race and a genuine assertion failure both remain live, separable only under CI-grade load. Its own sentence: *"the repair I was closest to making would have been wrong."*

## 6 · THE TWO DECISIONS THAT DEFINE THE DAY

**AG-5 refused to re-run a red** that was the last blocker on the last open request, with the
session closing, on a failure that looked exactly like a flake. It listed every incentive against
itself first, then refused, citing law rather than preference. **AG-2's measurement then vindicated
it**: the obvious repair was measurably wrong and would have buried the cause under a landing.

**Two owner asks were refused on PLATINUM grounds** and never reached the owner: a standing
`git filter-branch` permission for autonomous lanes (the gate learned to read instead — cost: one
card, permissions left behind: none), and a ~480-row `consumed_at` backfill (replaced by a per-lane
watermark from `factory_state.changed_at` — no column, no migration, not one historical row written).

## 7 · OWNER STATE

- **Budget: 8 consecutive red days, hypothesis (1) — the budget genuinely violates the fence.** Refuted against miscalibration on four independent grounds, including that the suite partially recovered when the world was fixed. Two persistent failures: projected monthly spend exceeds the stop threshold (two independently sourced estimates), and **no warning notification between baseline and stop carries a subscriber** — *"silence before a stop is the defect this fence exists to prevent."* Owner ruling: **watch today, no action.** Standing exception: if the stop actually fires, tell them immediately — nothing else will.
- **Claude Code hangs: no report filed, by owner decision.** Two cases kept for the next one: AG-3 `HUNG` (~05:00–08:00Z, recovered by ESC + `continue`); AG-5 `LOOP-DEAD` (poller did not fire 06:00–07:45Z, agent alive throughout, unaware).
- **Standing rule adopted from AG-4:** a transcript is a PUBLICATION. If the next read would put a secret into an artefact, the lane STOPS and asks for a card.

## 8 · CARRIED FORWARD

| item | state |
|---|---|
| `#387` `phase/context-retrieval-1` | blocked on AUTHOR-UNKNOWN (13 subjects, 11 tokenless, 3 reports naming 2 lanes). Everything ahead of authorship green. |
| `#402` `phase/lens-author-set-1` | AUTHOR-SET lens, RED on the unexplained test above. Measured: it makes #387 landable **by AG-5 and by nobody else**. |
| `lane/AG-3` | absent; ordinary claim walk authorized, unexercised |
| `phase/authorship-lens-2` | AG-3's, superseded for the base-ref content, untouched |

Lanes AG-2 · AG-4 · AG-5 parked with pollers running. AG-3 cannot write; status left in its box.
