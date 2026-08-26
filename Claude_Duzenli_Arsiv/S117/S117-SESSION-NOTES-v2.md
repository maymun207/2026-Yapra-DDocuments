# S117-SESSION-NOTES-v2 · the night the factory drained, and what it cost to learn how

Written mid-session at 2026-08-25 06:25Z (09:25 TSİ), master `1dfbdab6`, while four lanes work.
Supersedes v1. Written WHOLE, not patched (A-REC-S101-7).

---

## 1 · WHAT LANDED — seven, with the gate that judged them named

| # | branch | author lane | how authorship was read |
|---|---|---|---|
| 391 | `phase/ci-required-absent-1` | AG-2 | subject token |
| 389 | `phase/kademe3-small-wave-1` | AG-3 | subject token, after a rebuild |
| 392 | `phase/mail-anchor-fix-1` | AG-2 | subject token |
| 393 | `phase/authorship-lens-2` | AG-3 | subject token |
| 386 | `phase/factory-boot-2-live-proof-done` | AG-2 | **AUTHOR-REPORT** — first landing by the second lens |
| 384 | `phase/factory-boot-2-live-proof-rerun` | AG-2 | **AUTHOR-REPORT-CORROBORATED** |
| 394 | `phase/mail-consumed-baseline-1` | AG-2 | subject token |

⚠ **Every refusal CLASS printed before ~05:30Z came from a gate 34 commits stale** (§3). The
landings stand — each rehearsed a tree, verified the landed tree equal, and saw the base move;
those are repository facts, independent of the checker's revision. The classes do not.

---

## 2 · THE LAW OF THE NIGHT · F-S117-LIVENESS-IS-POSITIVE-ONLY-1

Measured by AG-2 after the Architect's false death certificate (§4).

**Every liveness lens this factory owns is POSITIVE-ONLY.** Each proves ALIVE at an instant;
not one proves DEAD.

| lens | rules out | does NOT rule out |
|---|---|---|
| `heartbeat_at` fresh | dead-at-that-instant | nothing when stale — it fires per TICK, so it measures the POLL LOOP, not the agent |
| other lanes' heartbeats | "the heartbeat path is broken" | the disputed hypothesis. Decoration; it cannot see the subject |
| `changed_at` / state transitions | dead-at-that-instant | same defect one level up — a lane deep in one card never transitions |
| **the WIRE — a ref that moved** | dead-at-that-instant, and it needs the AGENT to act, not just the loop | nothing when unmoved — a lane in recon has nothing to push |
| bus rows posted | dead-at-that-instant | nothing when silent |
| `consumed_at` stamp | the lane read a card | nothing when absent |
| the process table | nothing about a peer — local, different process, possibly different machine | everything |

**Silence is the absence of evidence and this factory has no lens that converts it into evidence
of absence.** `empty ≠ zero`, applied to time.

**CONSEQUENCE, and it is not a defeat.** The only lens that can see a stopped window is OUTSIDE
the machine — a person looking at it. That is not a PLATINUM violation; it is the one place where
S102-YASA-1's *real-world witness* is irreducible. A machine cannot see whether another machine is
alive. **The factory NAMES a candidate; a human CONFIRMS.** Consent, not operation.

The design ordered from it: **declared silence** (a lane posts what it is doing and how long it
expects to be quiet — silence INSIDE a declaration means nothing; silence PAST one is an anomaly,
never an authorization), a **candidate notice** printing all three readings, and reclamation behind
one human word. Named openly: a lane that dies with no human watching stays held until someone looks.

AG-2's counterexample, from the wire and independent of the owner's screen:
AG-3 last heartbeat `04:47:22Z` · AG-3 commit `1e154696` at **`05:00:10Z`, thirteen minutes later**
· still working at `06:09Z`. A 900-second threshold would have certified it dead ~2 minutes AFTER
it committed.

---

## 3 · FINDINGS

**F-S117-FOREMAN-RAN-A-STALE-GATE-1** — the foreman's shared clone was 34 commits behind; `npm run
land` runs from it, so every class printed all night came from a gate that no longer exists,
reported in the present tense. Found by the foreman measuring ITSELF mid-drain, after a refusal of
#387 showed no second-lens output at all — not a lens declining, no lens in the binary. Repair, in
its own words: **a gate certifies a TREE; it must also say WHICH GATE.** Delivered by AG-4 in the
strict reading — the gate refuses when it cannot vouch for its own rules.

**F-S117-ANCHOR-HID-A-CARD-1** (6 measured instances) — the poller's anchor advanced to a card's
exact `created_at`, and `created_at > anchor` never returns the row sitting AT the anchor. Lanes
printed `read OK · zero new rows` over a non-empty box. Caught only by a second lens (the table
count). One card sat invisible 459 seconds. Repaired in #392: `>=` plus id-level dedup, plus a
count over the SAME predicate cross-examining every zero read.

**F-S117-MAIL-VERB-NEEDS-TWO-CONNECTIONS-1** — the capability "read a card, then mark it consumed"
exists in NEITHER connection alone: `supabase-ro` can SELECT the table and takes 42501 on the verb;
`cwf_lane` can EXECUTE the verb and takes 42501 on the table. `mail-wait.mjs` held one, so
`relay_mark_consumed` had taken 42501 on every delivery **since the file existed — not one stamp
ever landed.** The grants are not broken; they are complementary by design and nothing told the caller.

**F-S117-LAND-ASSUMES-MASTER-BASE-1** — five expressions hardcode `origin/master`; `baseRefName` is
REQUESTED at the one `gh pr view` and then discarded by a parse that takes `headRefOid` alone. So a
reader skimming for "does it know about bases" finds a yes and nothing that decides consults it.
LABEL-IS-NOT-THE-COMPUTATION, inside the gate that enforces it. Live case: #390 is stacked. The
dangerous half is step 7 — it proves a landing by re-reading `origin/master`, so a stacked landing
either fails while correct or passes while measuring a landing that never happened.

**F-S117-LAND-STATUS-VS-CHECKS-1** — every JOB green and the commit STATUS still pending (Vercel).
Check-runs and statuses are two surfaces; "all checks completed" is not "ready". `empty ≠ zero` in
a CI costume. Adopted into the drain ritual: wait on the STATUS as well as the CHECKS, at the full sha.

**F-S117-LAND-ANCESTRY-NEEDS-THE-HEAD-OBJECT-1** — after `update-branch` moves a head, the clone
lacks the object and ancestry refuses `UNMEASURED`. The gate behaved WELL (it printed UNMEASURED
with its reason rather than defaulting), but the foreman performed the remedy BY HAND three times —
a remedy performed by hand three times is a defect with a workaround.

**F-S117-REWRITE-ORPHANS-STAMP-1** — a history rewrite orphans any provenance stamp naming a
rewritten commit, so "rebuild the subjects" and "change nothing" cannot both hold once a stamped
artifact is in the tree. The repair is a RE-MEASUREMENT (re-run the generator); hand-typing a sha
into a provenance field is the precise act `check:ground` exists to catch.

**F-S117-DEAD-LANE-REF-NOT-RECLAIMABLE-1** — both boots define the death certificate as `CLOSED`
row PLUS released ref, and a dead holder can complete neither half. The ordinary walk answers
`NO-ADDRESS-FREE` and stops; takeover needs the released half. Still open — see §2 for the shape
of the answer.

**F-S117-CI-DIET-REASON-FALSIFIED-1** (closed in #392) — the workflow defended a correct rule with
a falsified reason ("a skipped job reports no context at all"; measured, a job skipped by a
job-level `if:` DOES report a context). *A correct rule resting on a falsifiable reason is a rule
that gets "corrected" by whoever checks the reason and not the rule.*

**F-S117-JEST-DOM-SETUP-GAP-1** — 404 `toBeInTheDocument` failures, reproduced in a clean worktree
carrying none of the session's edits. Not ours.

**F-S117-ARCHITECT-WATCH-CARRIES-STALE-VERDICTS-1** (new, 06:25Z) — an Architect watch fired 15
minutes late carrying the falsified "AG-3 died" framing and a finding name already withdrawn. Same
class as the project box's §9: a frozen snapshot read in the present tense. **Discipline: a watch
body is a list of things to MEASURE, never a set of facts.**

---

## 4 · THE ARCHITECT'S OWN ERRORS

**A-REC-S117-BRANCH-ATTRIBUTION-ASSERTED-1** — attributed `phase/context-retrieval-1` and
`-organ` to AG-4 from memory. The bus held the answer: both governing cards were addressed to
**AG-2** at 2026-08-24 20:08Z. AG-3's lens resolved them to AG-2 and FLAGGED the disagreement
rather than adopting either reading — a lens that silently picked the card's answer could not
correct its own instructions; one that silently picked its own would be unauditable. **Cost:** AG-4
committed on AG-2's branch in good faith, putting an AG-4 report header on the tree, and #387 now
refuses AUTHOR-UNKNOWN on a two-lane tie that is a TRUE fact about the tree.

**A-REC-S117-LIVENESS-ASSERTED-FROM-ONE-LENS-1** — certified AG-3 dead from one stale heartbeat,
escalated it to the owner as an action item, obtained a destructive approval on that false premise,
and carded the ref release. **The push never ran** (withdrawn 2m48s later; `lane/AG-3` verified
intact at `5cd6ddb1`). What caught it: the owner's screen. The unused lens: the wire. Downstream
cost: AG-4 was given AG-3's card, never saw the withdrawal (it was in a long turn — the same
phenomenon), and finished all three items; the work was reinstated rather than discarded, and AG-3
lost only its recon.

**A-REC-S117-CARD-SUBJECT-GRAMMAR-OMITTED-1** — no card ever stated the land gate's subject
grammar, so four CI-green requests refused AUTHOR-UNKNOWN. The Architect's own remembered version
of the rule was ALSO wrong ("before the first two colons"; measured: before the FIRST colon,
exactly one token, all non-merge subjects agreeing).

**Standing correction, adopted:** attribution and liveness are MEASURED from the bus and the wire
before a card is cut — never asserted. And a silent lane is reported as UNMEASURED, never as dead.

---

## 5 · RULINGS THAT NOW STAND

- **The subject-rewrite path is CLOSED.** `git filter-branch` was refused by the harness classifier
  twice. The owner-permission escape was REFUSED as a design: a standing destructive-history grant
  for autonomous lanes so a gate could keep reading a field it should not depend on is the PLATINUM
  failure. The gate learned to read instead. Cost: one card. Permissions left behind: none.
- **Two owner asks were refused on PLATINUM grounds** (the `filter-branch` grant; the ~480-row
  `consumed_at` backfill — replaced by a per-lane watermark from `factory_state.changed_at`, which
  AG-2 arrived at by refuting the Architect's own proposed floor with numbers).
- **Treadmill authorization** (foreman merges `origin/master` itself) — narrowed to requests whose
  `baseRefName` is MEASURED to be `master`. Merge only, never rebase, never force, stop on conflict.
  Never used: the gate's own `update-branch` served every case.
- **AUTHOR-SET semantics** (ordered, not yet built): the gate does not need the author, only the
  answer to *is the author the lander?* A candidate SET that does not contain the lander answers it
  completely. PASS when the lander is in none; REFUSE when in any.
- **No report is ever removed from a tree to turn a refusal green.** Deleting evidence is the one
  repair never available.

---

## 6 · OPEN AT THIS WRITING

| item | state |
|---|---|
| `#387` | HELD — AUTHOR-UNKNOWN on a true two-lane tie; waits on AUTHOR-SET (AG-3) |
| `#390` | FROZEN — stacked base; unfreezes when AG-4's gate branch lands |
| `phase/land-gate-self-knowledge-1` (AG-4, `9d5e86f4`) | 3 commits, in CI |
| `phase/lane-death-certificate-1` (AG-2, `778ad59c`) | PR #395 CLOSED by AG-2 — premise falsified; redesign ordered |
| `phase/authorship-lens-2` (AG-3, `70be7849`) | superseded for the base-ref content; leave alone |
| shared-clone fast-forward | still owed by AG-5, and now blocks its own lander under AG-4's strict gate |

**Next owner decision, not yet put:** the redesigned dead-lane rule (declared silence + candidate
notice + one human confirmation). The earlier approval was given against a falsified premise and
does NOT carry.
