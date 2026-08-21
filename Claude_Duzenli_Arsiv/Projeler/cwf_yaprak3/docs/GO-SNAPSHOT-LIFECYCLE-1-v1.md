# GO-SNAPSHOT-LIFECYCLE-1 · v1

<!-- Architect-authored · S94 · walk item #38 · authorizes the MERGE ONLY of
     phase/snapshot-lifecycle-1 into master. Single lane — no second-merger
     ceremony. RULE-25 review completed by the Architect from a fresh checkout
     at a968131: byte-read of the migration's auto-suffix loop, the FOR UPDATE
     delete guard, the purge count-check inversion pin, the audit-survival
     test, and the governance-model redraw carrying the three new action
     names. The owner independently witnessed CI run #591 green on PR #191.

     ⚠ THIS RELAY DOES NOT AUTHORIZE THE MIGRATION APPLY. The Operator lane
     receives its own relay AFTER the merge is confirmed. Do not apply, do not
     instruct anyone to apply, do not run supabase db push. -->

## STATE PRECONDITION (S47-1 — verify, do not assume)

* `origin/master` = `a7600997d3c28445dc5218eabe6a00a22bc5a03e`
* `origin/phase/snapshot-lifecycle-1` = `a968131eee8c5c3d84582a1675f359578c80fd6c`

If either differs, STOP and report both observed SHAs.

## WHAT THE ARCHITECT VERIFIED INDEPENDENTLY (not re-asked)

Recounted from a fresh checkout of your branch: docVersion `rev 231` (SET) ·
531 test files · 70 migrations · the new migration is a NEW file
(`20260811160000_snapshot_lifecycle.sql`) and the applied `20260811120000` has
a ZERO-line diff — untouchable history honoured · the take function's
collision loop lets the unique index arbitrate (insert → catch
unique_violation → increment → retry) and returns the assigned name · delete
reads FOR UPDATE and refuses a kept row with its own SQLSTATE · purge's
confirmed count CHECKS the delete and never STEERS it (pinned negatively) ·
the S93 restore audit row survives deletion of its subject · the
governance-model diagram genuinely carries `learning_snapshot_delete` /
`_purge` / `_keep` (content redraw, not a hash pass).

**Deviations: ALL THIRTEEN ACCEPTED.** Three called out by name:

* **D4 (auditing the non-destructive keep flip)** — the arguable one, and the
  ruling is that you were right: a ledger that records the destruction but not
  the removal of the guard that forbade it has a hole exactly where an
  investigator would look. Ratified as designed.
* **Custom SQLSTATEs (LS001/LS002/LS003)** — accepted; a refusal that
  surfaces as a 409 with its own code is honest, a refusal dressed as an
  outage is not.
* **The backfill RENAMES rather than deletes** — accepted and singled out for
  praise: the two synthetic rows are the phase's own birth proof and must die
  through the real panel under real audit, not silently inside a migration
  nobody watched. This is S93-1 discipline applied to cleanup itself.

**Also carried forward, recorded now:** the mutation-harness self-catch
(vitest 4 dropped `--reporter=basic`; the "did tests actually run?" guard
fired 16/16 and prevented a perfect false green) enters the register as
**F-S94-MUTATION-HARNESS-REPORTER** — a house-wide footgun for every future
mutation run, not just this phase's.

## STEP 1 — CI VERDICT (BLOCKING; print, do not summarise)

The owner witnessed run **#591** green on PR **#191**. Independently confirm
and RECORD it:

1. Query by the FULL 40-character SHA (short SHA returns an empty array
   indistinguishable from "never ran" — S91-6):
   `/repos/maymun207/cwf_yaprak/actions/runs?head_sha=a968131eee8c5c3d84582a1675f359578c80fd6c`
2. Cross-check `refs/pull/191/merge` exists and is clean.
3. PRINT run id, conclusion, and the per-job list verbatim in the merge
   report. `eval-canary` skipping on a PR is structural, recorded as skipped,
   never folded into the pass count.

Not green, or the query cannot be validated → STOP and report.

## STEP 2 — MERGE

From a FRESH clone (S93-2 — the phase worktree is dead; your local master was
observed 7 behind origin, which is exactly why):

* `git fetch origin && git checkout master && git reset --hard origin/master`
* Merge `origin/phase/snapshot-lifecycle-1` with **`--no-ff`** (squash banned)
  using the verbatim message below, from a FILE (`git merge -F <path>` —
  `-F -` does not read stdin).
* Do not edit the message. Not a word, not a line-break.
* Single-lane merge: docVersion is already rev 231 on the branch; confirm the
  MERGED tree still prints `rev 231 · 2026-08-11` — by printing it.
* Push master.

## STEP 3 — TAIL ANCHOR (S61-3 — print, never assume)

* `git rev-parse origin/master` (full 40 chars)
* `git log --oneline -3 origin/master`
* the docVersion line from `public/architecture/manifest.json`
* `git status --porcelain` → MUST be empty
* Post-merge master CI: query the MERGE commit's SHA, print run id +
  conclusion + jobs (eval-canary runs on master — record its verdict).

## STEP 4 — CLOSING SWEEP

* No uncommitted file anywhere in any checkout (S93 hygiene).
* Delete `phase/snapshot-lifecycle-1` from origin only AFTER the merge is
  confirmed present on origin/master.
* Report the production deployment if visible; the Architect independently
  confirms READY/production at the merge SHA.

## STEP 5 — WHAT THIS MERGE DOES **NOT** FINISH (read carefully)

The organ is merged DARK: until the Operator applies
`20260811160000_snapshot_lifecycle.sql`, the new panel actions will fail
against a database that lacks the functions. That is expected and correct —
merge-then-apply is this project's standing order (ADR-005). Three things are
OWED after your work ends, none of them yours:

1. **Operator apply** — separate Architect-authored relay, carrying S93-3's
   three sentences and FENCE-first gates.
2. **Birth proof through the real panel** (S93-1) — the owner deletes the two
   synthetic rows. ⚠ THE TRAP YOUR OWN REPORT FLAGGED, restated so the relay
   chain cannot lose it: the backfill renamed the rows, so the two names to
   type are **`s93-birth`** and **`s93-birth-2`**; the CANONICAL row
   (`d16f6636…`) now answers to **`s93-birth-3`** and MUST SURVIVE.
3. **`learning.snapshotRetentionMax` publish decision** — the bound currently
   serves from the code floor (500). Whether to publish a governed value is an
   owner decision the Architect will surface separately; per S80-3, editing
   the constant after a publish is inert, so the decision precedes any future
   retuning.

After STEP 4: STOP. Do not start another phase. The next prompt comes from the
Architect.

---

## THE MERGE MESSAGE — VERBATIM, DO NOT EDIT

```
merge: PHASE-SNAPSHOT-LIFECYCLE-1 — a typed confirmation that can identify its own target

The snapshot organ shipped in S93 with a safety ritual keyed on names and no
rule that names be unique. Live proof of the gap sat in the table itself:
three rows all answering to s93-birth, so an operator typing the confirmation
proved intent but never target. The ritual was honest only because the id
travelled alongside it. This merge makes the name mean one row — and it ships
uniqueness in the same migration as the delete it licenses, because building
the destructive act first would have built a ceremony that cannot identify
what it destroys.

A collision is resolved, not rejected. The take function appends -2, -3, and
returns the name it actually assigned — the first unattended consumer of
snapshots is a benchmark harness, and a naming accident must not become a
failed run. The unique index is the arbiter: the insert itself proves the name
was free, a violation is caught and the loop moves on, so two concurrent takes
of one name both succeed on different names with no lock choreography. The
suffix ceiling is stated twice, in SQL and in shared constants, and the two
statements are pinned against each other by a test.

Delete is one snapshot, one transaction, one audit row naming what it cost —
the deleted row's own manifest rides in the ledger, so a reader sees what a
deletion removed rather than only that it happened. A kept row refuses with
its own SQLSTATE; the row is read FOR UPDATE so a concurrent protection flip
cannot slip between the check and the delete. Nothing cascades: the S93
restore audit row still names its deleted source, which is why snapshot_id
was never a foreign key, and a test now holds that promise down permanently.

Purge has no cron and no TTL — it happens when a human asks, bounded to the
newest N with kept rows never candidates, and the preview and the act select
from the same function so they cannot name different sets. The operator's
confirmed count checks the delete and never steers it: the count re-derives
server-side inside the transaction, and a list that moved between preview and
confirm aborts with nothing deleted rather than silently applying to a
different set. A purge that would delete nothing is refused as not an act to
confirm.

The two synthetic s93-birth rows are renamed by the backfill, not deleted by
it — they are this phase's own birth proof and must die through the real
panel under real audit, not inside a migration nobody watched. The canonical
row survives as s93-birth-3.

Found while verifying: the mutation harness's own are-tests-running guard
fired on all sixteen runs because vitest 4 removed a reporter flag — under a
harness without that guard, sixteen mutations would have read as sixteen
clean survivals. Recorded as a standing footgun, not buried. And the
Governance Model tab took a content redraw rather than a hash pass: it
narrates memory_audit's closed action vocabulary, which S93 had already
widened once under a hash-only reseal, and a governed vocabulary must not
drift twice without ever being written down.

One migration, AUTHORED not applied (ADR-005): unique name index, keep
column, the CHECK widened by three actions, four new SECURITY DEFINER
functions, service-role-only execute, verifyGrants extended. The organ merges
dark until the Operator applies. Tests 6644 -> 6712 across 531 files; 16/16
mutations killed; docVersion rev 231. Sixteen deviations and flags named in
the report, zero silent.

DONE IS NOT DONE AT MERGE. Owed: the Operator apply, then the birth proof
through the real panel — the owner deletes s93-birth and s93-birth-2, the
canonical s93-birth-3 survives, and the audit rows say exactly that.
```

---

## AFTER THE MERGE

Append a MERGED section to
`docs/relay/PHASE-SNAPSHOT-LIFECYCLE-1-report.md` (history unedited): the CI
verdicts verbatim (PR head AND master), PR number, tail anchor, sweep result,
deploy SHA if visible. Then STOP.
