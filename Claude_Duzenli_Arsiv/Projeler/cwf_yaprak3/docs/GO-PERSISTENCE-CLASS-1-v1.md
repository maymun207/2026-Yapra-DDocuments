# GO-PERSISTENCE-CLASS-1 · v1 — Architect → AG-1

**Review verdict: PASSED.** Independently verified on your head `889f46a`:
54/54 across the five suites, and I ran BOTH directions myself rather than
reading your transcripts — planting `scratch_unclassified_thing` reds four
tests with `UNCLASSIFIED TABLE(S): scratch_unclassified_thing`, and deleting
the `EPISODES` manifest row reds three with `expected 48 to be 49` plus the
named table. The characterization suite (9/9) confirms `LEARNED_TABLES` is
byte-equal to `tablesOfClass('learned.')`. The gate is a gate.

## R1 · The merge-order inversion — MY error, not yours (A-REC-S95-2)
The brief said "#40 merges FIRST"; the owner then ordered ready work ahead of
in-flight work, and I did not relay that change to your lane. You paid for it
with two extra rebases and a CONFLICTING push with zero CI runs. Recorded
against me. Your §0 conclusion is adopted as law: **an in-lane reseal is only
safe for the lane that actually merges first, and no lane can know that from
inside itself** — WAVE-SEAL LAW now reads "reseal at the merge turn, on the
rebased worktree, never on build".

## R2 · You are LAST in this wave — and master has NOT moved since `6ab9cea`
Current `origin/master` = `6ab9cea30ba089f6dbcd005d7d16e0b05bf8974b`,
docVersion **rev 235**. You take **rev 236**. All three other lanes are
merged; nothing is queued behind you. If master is still `6ab9cea` when you
start, no further rebase is needed.

## STEPS
1. `git fetch origin`. If `origin/master` ≠ `6ab9cea…`, repeat your own
   procedure (rebase → re-read docVersion master-side → bump → reseal on the
   REBASED worktree) and report the new numbers.
2. Confirm CI on the PR head is `completed` + `success` on every job
   (`in_progress`/`null` is NOT a pass; `eval-canary skipped` is expected).
3. Merge `--no-ff` with the VERBATIM message below. Squash banned.
4. Report merge SHA, post-merge `origin/master`, resulting docVersion, and the
   final census count as printed by the S66-1 positive control.

## VERBATIM MERGE MESSAGE
```
PERSISTENCE-CLASS-1: every table declares a persistence class at birth

ADR-014. The defect this closes is a shape, not an incident: three separate
organs answered "which tables does this operation touch?" with three
hand-written lists, and a hand-written list is a promise that someone will
remember. Snapshot scope, seed scope and export scope are now DERIVED from a
declared class per table, and LEARNED_TABLES is no longer a list at all — it
is tablesOfClass('learned.'), pinned byte-for-byte against its former contents
so day one changes no behaviour whatsoever.

The census is TOTAL over 49 tables and the vocabulary is closed at the type
level: ten classes, no free strings, extension only by amending the ADR. The
gate runs in BOTH directions — a table a migration creates without a class
reds naming it, and a manifest entry with no creating migration reds as a
ghost. The walk computes the FINAL migration set rather than the union, so a
DROPped table stops being expected, and the odd-but-valid CREATE TABLE forms
are pinned by control rather than assumed away.

Gate B reads the live catalogue, and its most important property is how it
fails. information_schema is privilege-filtered: ask as a role that owns
nothing and it returns an empty set cheerfully, with no error. A band
reporting that as "0 drift" would be quiet and wrong, which is worse than
loud and wrong. So zero rows is UNREAD, never zero: liveTotal, unclassified
and missing go null together with the reason carried verbatim, one state
rather than three fields that can disagree. empty is not zero, on the newest
surface in the house as much as on the oldest.

The SQL function scope is pinned to the derived learned set, so widening the
learned layer without re-emitting the functions now reds instead of shipping
a snapshot that silently misses a table. The export path asserts from the
same registry that nothing outside learned.* can enter a cwf-learn/1 payload
and that secret tables are unreachable by construction, with a planted
negative control proving the refusal fires.

Zero migrations. supabase/ untouched. The classification is the whole
deliverable, and it is now the precondition every service-layer phase
inherits: a table born after today either declares what it is, or CI says so.
```

## AFTER MERGE
Stand by; your next phase prompt follows immediately.

>> BLOCK: AG-1 <<
