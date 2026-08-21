# GO-DISCOVERY-EXTEND-2-v1

<!-- relay-audit grammar v1 · kind=go · wave=4 · lane=D · S97 ·
     Architect-authored · immutable (S37-1). SEQUENCED: this GO executes ONLY
     after PHASE-FRAME-ON-ALL-PATHS-1's merge has landed on origin/master. -->

**PRECONDITION (S47-1):** `origin/master` is a DESCENDANT of
`243090898ba26dd796e21479e569d9230033054c` whose log contains the merge
subject `merge: PHASE-FRAME-ON-ALL-PATHS-1` (the lane-A merge). If that
subject is absent, STOP and wait — do not merge first. Your branch
`origin/phase/discovery-extend-2` at `725832d`, untouched.

**Review verdict (Architect, fresh clone):** TREE present · `.agents`
0-deletion · new/extended suites 70/70 re-run green · relayAudit zero
violations · migration audited: zero DELETEs (the three textual hits are two
comments + the REVOKE line, which correctly names public+anon+authenticated —
the all-grantees law) · `discovered_via NOT NULL` provenance constraint
verified · three out-of-fence files (persistence/index.ts · grantPolicy.ts ·
verifyGrants.ts) ACCEPTED as standing-security-rule-forced, including the
composite-PK probe note honouring HARDEN-FN-PROBE-1. **RULING:
`operational.mirror` UPHELD** — an edge row is an observation of the external
system (ADR-001), and a learning-snapshot restore must not time-travel the
observed world; your reminder test is hereby a LAW PIN (if #25 needs edges in
the learned snapshot, that red test names the owed organ work). The two extra
key columns are ACCEPTED. `F-S97-REGISTRY-PARENT-OVERWRITE` is recorded as a
named finding on the registry, not this phase's debt.

## STEP 1 — CI GATE (BLOCKING)
Unsharded CI on the PR #208 head: `conclusion=="success"` on the completed
run. `in_progress`/`queued`/`null` is NOT a pass.

## STEP 2 — MERGE TURN (S96 choreography)
On clean local master at the post-A tip: build the integration line locally,
REBASING onto that tip and EXCLUDING your provisional seal `725832d…` by SHA
(origin branch never rewritten — S96-1; if the rebase meets ANY conflict
outside the `.agents` union seam, STOP and report before resolving). Re-run
the full suite + typecheck on the rebased line (S95 rebase-class rule: a
clean rebase is a claim, the suite is the reading). TRUE RESEAL: read
docVersion from master, next number, reseal+bump one commit (S95-1); any
narrative drift demand: STOP (S90-2). Then `git merge --no-ff` with this
VERBATIM message:

```
merge: PHASE-DISCOVERY-EXTEND-2 — the containment edge gets a birth, a death and a source (entity_topology_edges, ABSENCE-ONLY: absence is stamped with a timestamp, never deleted, and unasked is not gone; every row traces to a parsed payload or a declared-value-space probe — ADR-009, zero hand-authored topology; class operational.mirror BY RULING, with a planted red test naming the organ work owed if Graph-KB ever claims these rows for the learned snapshot; the registry's silent single-parent overwrite is now a named finding instead of a vanishing fact)
```

**TAIL ANCHOR (S61-3):** the merge commit's first parent MUST be the exact
post-A tip you verified in the PRECONDITION, and you STATE that SHA in your
report. Master moved again: STOP and report.

Push master. Close PR #208 with the house comment.

## STEP 3 — REPORT (one paste to the owner)
New master tip SHA · the post-A tip you anchored on · derived rev · CI
conclusion string · seal-absence confirmation · restated reminder that the
MIGRATION IS NOT APPLIED — the Operator turn (ADR-005) follows with
`OPERATOR-DISCOVERY-EXTEND-2-v1`, and until its G-gates pass, the edge organ
is merged but UNBORN (S96-2: no verdict windows open).

## AFTER STEP 3: STOP.
<!-- END · GO-DISCOVERY-EXTEND-2-v1 -->
