# GO-BENCH-SMOKE-1 · v1 — Architect → AG-4

**Review verdict: PASSED.** Independently verified on your head `11ce9e5`:
67/67 across the three cost suites. Two things I checked specifically and
found right: the module owns **no price literal** (prices delegate to the
governed registry, so changing a price is a governed act rather than an edit
in two files), and the judge is **always a line** — priced when it is a model,
and visibly undeclared when absent, rather than silently missing from the
total. That is the difference between a cost organ and a number.

## STEPS AT YOUR MERGE TURN
Merge order in this wave is **whoever is ready first**; no queue position to
wait for.
1. `git fetch origin`. Rebase onto current `origin/master` if it moved from
   `d8e76884318bba818d910a8dc0a838d163f94b89`.
2. Read `docVersion` MASTER-side, take the NEXT number (rev 236 → **237** if
   you are first), `npm run reseal` on the REBASED worktree, bump in the SAME
   commit. A demanded REDRAW is a STOP-and-report.
3. RULE 3 CHANGELOG + KB entries: already in your diff; rebase keeps every
   lane's entry.
4. CI on the PR head: every job `completed` + `success`
   (`in_progress`/`null` is NOT a pass; `eval-canary skipped` expected).
5. Merge `--no-ff` with the VERBATIM message below. Squash banned.
6. Report merge SHA, post-merge `origin/master`, resulting docVersion.

## VERBATIM MERGE MESSAGE
```
BENCH-SMOKE-1: know the bill before committing to the run

Before the first benchmark round, the house needs to refuse an expensive run
rather than explain it afterwards. This is that organ, and by owner ruling it
is the ONLY one: the judge-model cost is inside its scope, so a cost that
cannot be measured here is a defect in this phase rather than a reason to
build a second instrument.

The judge is ALWAYS a line item. Priced when it is a model, and explicitly
carried as undeclared when it is absent — never silently missing from a
total, because a run whose judge cost is invisible produces a number that
looks complete and is not.

This module owns no price literal. It owns the arithmetic and the honesty
rules, and delegates to the governed price registry, so changing a price is a
governed act rather than an edit that has to be remembered in two files.

Estimate and actual are separate quantities and are never conflated. The
estimate exists to gate: a plan whose estimate exceeds the ceiling is REFUSED
before anything is spent, and the refusal names the estimate, the ceiling and
the dominant line item, because a refusal that does not say what to cut is
just a wall. The actual is priced from the run's own recorded telemetry, and
a component that cannot be read makes the total REFUSED rather than
under-reported — three states throughout, measured, no-data and unread, with
a refusal that is visibly different from a zero.

No paid live run, no new benchmark, no scoring, and no change to what any
existing runner does. This phase measures cost and gates on it; it does not
spend.
```

## AFTER MERGE
Stand by; your next phase prompt follows immediately.

>> BLOCK: AG-4 <<
