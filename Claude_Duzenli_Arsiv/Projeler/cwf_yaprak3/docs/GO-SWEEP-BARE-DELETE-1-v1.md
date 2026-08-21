# GO-SWEEP-BARE-DELETE-1 · v1 — Architect → AG-2

**Review verdict: PASSED.** Independently verified on your head `77ac48a`:
27/27 green on a clean tree, and I re-ran your M2 myself — planting a regressed
`learning_wipe` reds the gate naming function, table and file:line. The
effective-body/history distinction, the CTE trap control (e6), the reverse
control (d3), and the live `pg_proc` oracle agreeing 29/28/1/0 are exactly the
standard. Excellent work.

## R1 · MERGE ORDER CHANGED BY OWNER RULING — you are THIRD, not first
Order is now: `#24 LINE-RESOLUTION-DIAGNOSIS-1` (**merged**, `32c0222`,
docVersion rev 234) → `#22 CORPUS-LINE-FILL-1` (in its merge turn, mints
rev 235) → **you (#41)** → `#40 PERSISTENCE-CLASS-1`. Your §8 item 1 is
superseded: you do NOT wait for AG-1. Wait for CORPUS-LINE-FILL-1 on master.

## R2 · RULE 3 flag — RULING: KEEP both files
RULE 3 outranks the brief's ∅ prediction; the brief's intersection line was my
shorthand for "no code collision", not a bar on standing-law docs. Your
isolated single commit is the right shape. AG-1's diff does not touch
`.agents/**` for CHANGELOG purposes in a way that conflicts — and if it does,
you rebase onto it, so it lands on you as you said.

## R3 · Residuals — ruling
`TRUNCATE` and bare `UPDATE`: both measured zero today, both real classes,
both OUTSIDE this phase's shipped gate. I am NOT extending the gate inside
this phase (scope discipline). They enter the register by name as
**SWEEP-BARE-WRITE-2** (candidate, one small phase, extends `findBareDeletes`
to both verbs). Your instrument is the reason it will be cheap.

## R4 · F222 live-state correction — ACCEPTED, and thank you
The `20260812160000` apply HAS landed (72 applied, ledger top matches, live
body carries `where true`). The standing "production still degraded" claim is
stale and I am correcting the register. What remains is the owner-hand Restore
witness only. Reporting a contradicted claim outside your lane was correct.

## STEPS AT YOUR MERGE TURN (in order)
1. Poll: `git fetch origin && git log --oneline -1 origin/master` must name
   CORPUS-LINE-FILL-1. Do not start before that.
2. Rebase onto the new origin/master. No migration restamp (you authored none).
3. Re-run `check:doc-drift` POST-rebase. If — and only if — it then demands a
   reseal: reseal on the rebased worktree, read docVersion master-side, take
   the NEXT number, same commit. A demanded REDRAW is a STOP-and-report.
4. Push; CI on PR head must be `completed` + `success` on every job
   (`in_progress`/`null` is NOT a pass; `eval-canary skipped` is expected).
5. Merge `--no-ff` with the VERBATIM message below. Squash banned.
6. Report merge SHA, post-merge `origin/master`, resulting docVersion.

## VERBATIM MERGE MESSAGE
```
SWEEP-BARE-DELETE-1: the whole house, not just the organ

S94's outage taught that a WHERE-less full-table DELETE inside a SECURITY
DEFINER body applies in silence and dies at runtime under this database's
safeupdate preload. FIX-2 pinned the two snapshot bodies. This extends the
watch to every effective definer body in the ledger, and answers by
measurement the question FIX-2 entered into the register as UNMEASURED.

Zero offenders. No migration ships. The phase delivers the gate alone — and
the zero is measured, not assumed: the gate was planted with a bare DELETE and
seen to name it, then regressed against the real learning_wipe body that took
production down, before any green from it was trusted. Had this gate existed,
20260812120000 could not have shipped.

The unit of judgment is the EFFECTIVE body, never a historical file. The walk
tracks the latest definition per full signature in filename order and honours
DROP FUNCTION, because history legitimately contains superseded bare deletes —
three of them, in fact — and a file-scanning gate would red on exactly the
material that immutable-migration law forbids editing. The reverse control is
what makes last-definition-wins an asserted property rather than a
coincidence: a clean body superseded by a bare one reds.

Census, computed rather than inherited: 72 migrations walked, 37 definitions
in history, 3 DROP FUNCTION statements honoured, 29 effective bodies of which
28 are SECURITY DEFINER. The brief's file-level count of the marker is not a
proxy for the body count in either direction — the phrase appears heavily in
prose and in comment-on-function literals, and only 11 files contribute an
effective definer body. The ledger also transiently held a genuine overload,
so signature-keyed tracking is exercised by the real tree rather than by
theory alone.

The closest call in the sweep is the purge CTE, whose WHERE sits on the
following line inside a with-clause: a line-scoped scan calls it bare, and a
naive statement scan lets a genuinely bare CTE delete borrow an outer WHERE.
Both directions are pinned by control. Dynamic SQL is surfaced rather than
silently passed over, and the finder that reports zero of it carries its own
positive control.

An independent oracle agrees exactly: a read-only census of live pg_proc
returns the same 29 / 28 / 1 / 0, validating the parser's DROP handling and
last-write-wins reduction against something that knows nothing about this
code. One measurement failure on the way there was caught and reported rather
than banked — an empty result from a misplaced word boundary, visibly a
measurement failure and not a zero, because a floor query had already counted
four bodies mentioning delete.

Two new files, 910 insertions, zero deletions, zero existing bytes touched.
No migration, no governed write, no runtime surface, no production behaviour
change. TRUNCATE and bare UPDATE are measured zero today but stand outside
this gate's shipped scope, and enter the register by name rather than being
assumed clean.
```

## AFTER MERGE
Stand by; your next phase prompt follows immediately.

>> BLOCK: AG-2 <<
