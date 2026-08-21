# GO-M1P0-COUNT-HONESTY-MERGE · v1
<!-- GO-M1P0-COUNT-HONESTY-MERGE-v1 · 2026-08-02 · S78 · Architect: Claude.
     RULE-25 review PASSED on an independent fresh clone: branch head
     1d97fcc6f0bef329beed8c76d96e0256fdf2d7e9 = ONE commit, parent 29e4965f ·
     guard contract byte-read · ledger abort hunk byte-read (generic err.name
     catch is compliant — 500 names CountUnavailableError, zero audit writes) ·
     in-scope folds ZERO remaining · innocent column folds 2+2 byte-unchanged ·
     417 test files counted · docVersion rev 178 · positive+negative controls
     present with correct assertions. Zero migrations, zero governed writes —
     no consent line required (CEREMONY LAW). -->

## STEP 1 — BLOCKING: CI on the branch head
Verify the unsharded CI run on `1d97fcc6f0bef329beed8c76d96e0256fdf2d7e9`
is status=completed AND conclusion=success (S37-2: CI is the sole test
arbiter; `in_progress`/null is NOT a pass). Paste run id + conclusion.
If not green: STOP, report, no merge.

## STEP 2 — merge, --no-ff, message VERBATIM (S30-2)
```
Merge PHASE-M1P0-COUNT-HONESTY-1: a count that could not be measured is no
longer a zero — the guard throws, and the ledger stays honest

The finding came from a measurement tool obeying its own laws: a wrong-table
HEAD control in this morning's recon returned silent green (HTTP 204,
count null, error null — PostgREST's error JSON has no body to travel in),
and the same bodiless failure shape lived at seven fold sites in production
code, worst of all feeding `scanned` into the memory_audit ledger.

exactCountOrThrow is the whole fix: a query error OR a null count throws the
named CountUnavailableError; a successful count — including a REAL 0 —
passes through byte-honest. The in-repo precedent was routeShadowLens's
readAllExact, which always had this posture; the guard extracts it for every
count-only read. The census (19 head:true sites, 15 folds) swept every
in-scope site including one delta beyond the Architect's floor
(verifyRules.ts), while the four innocent COLUMN folds
(retrieval_count/deleted_count/scanned_count) stand byte-unchanged — the
lens fired in both directions.

The ledger path earns its own law: on a failed scan count the forget tick
ABORTS LOUDLY — error logged, 500 naming the error, NO memory_audit row
fabricated. The 1A-era "missing table degrades to 0/0" branch is deliberately
RETIRED: a missing ledger-feeding table is now a scream, never a stamped
zero. Delete-first/append-second ordering (C1 family) untouched.

Tests +6 (+1 file): the guard's POSITIVE CONTROL (bodiless 204 throws), the
tick's NEGATIVE CONTROL (scan failure → 500, zero audit writes), and
real-0 pass-through. Suite 417 files / 4648 tests green on a re-proven
416/4642 baseline; tsc clean; reseal rev 177 → 178, check:doc-drift 7/7,
check:tenant-zero ZERO on the committed tree.

This is master rollout plan item 1.0 — the first stone of the health
dashboard's "honesty violations = 0" card: the violation class is now
structurally impossible at every count site.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

## STEP 3 — push master; report `git rev-parse origin/master` (the new hash).
## STEP 4 — delete branch `phase/m1p0-count-honesty-1` (remote); confirm
`git ls-remote --heads origin` shows master alone.

Report back in ONE paste: CI run id+conclusion · new master hash · branch
list. Post-merge proof read (S63-1) is the Architect's: tomorrow's 03:40Z
`[MemoryForget] deleted=N scanned=M` line read from production logs proves
the success path unchanged.

TAIL ANCHOR (S61-3): this block ends at the line below.
— END · GO-M1P0-COUNT-HONESTY-MERGE-v1 —
