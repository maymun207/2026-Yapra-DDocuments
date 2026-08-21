# GO · LEARNING-SNAPSHOT-1 · v1

>> BLOCK: AG-1 <<

RULE-25 review complete. Verdict: **GO.** Deviations D1–D7 **RATIFIED as
built** — revert nothing. You are the **FIRST merger**; AG-2 merges after you
with S92-1 duties.

## STEP 1 (BLOCKING) · CI re-verification on the PR head
On PR #188 confirm the checks on the head are green per check (never a
wrapper): `build (20.x)` · `build (22.x)` · `coverage` · `rule26` — 4/4
success; `eval-canary` skipped (expected). Known F-BW01 rule26 flake ⇒ one
ordered rerun authorized; any other red ⇒ STOP and report.

## STEP 2 · Merge
```
git rev-parse origin/master   # MUST print 0d622de514ab28fa88df5bc17f6e39244bf78027
git checkout master && git pull --ff-only
git merge --no-ff phase/learning-snapshot-1 -m "merge: PHASE-LEARNING-SNAPSHOT-1 — the learned layer becomes snapshot-able, wipe-able and restore-able

Six tables and 1,047 rows of learning could not be carried, erased or brought
back; AgentBeats cannot even enter a platform without stateless runs and a
reset. This merge makes the learned layer one named, versioned row: an atomic
snapshot/wipe/restore trio in SQL (counts measured from the deletes
themselves, unreadable aborts), a mechanical LEARNED_TABLES scope so the next
memory table cannot be forgotten the way semantic_memory was, ctx.taskId as
one flag meaning both clean-agent (the four global learn doors refuse,
visibly) and task namespacing (within-task memory works, cross-task is zero,
the NULL production path byte-identical under NULLS NOT DISTINCT), a
learning:manage-gated endpoint and an owner panel whose wipe demands a typed
sentence, re-checked server-side. Migration AUTHORED, Operator-pending
(ADR-005). SOTA-gate key 1 of 7. rev 228."
git push origin master
```
No squash. Report the merge SHA back as your final line. If master is not
`0d622de` at checkout, STOP and report (AG-2 must NOT have merged before you).

## STEP 3 · After push — nothing else is yours
The Operator applies the migration next (separate relay, already cut); AG-2
executes the second-merger protocol; the S93-1 birth proof runs on the live
layer after apply.

TAIL: GO LEARNING-SNAPSHOT-1 v1 — merge authorized (first merger)
