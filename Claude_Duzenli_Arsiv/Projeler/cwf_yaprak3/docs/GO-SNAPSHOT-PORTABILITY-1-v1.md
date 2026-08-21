# GO-SNAPSHOT-PORTABILITY-1 · v1

<!-- Architect-authored · S94 · walk item #39 · authorizes MERGE ONLY of
     phase/snapshot-portability-1 (head 7494544) into master. Single lane.
     RULE-25 review completed twice: the base build (0d5bbb8) and the FIX delta
     (7494544), both byte-read from fresh checkouts, with a live pg_constraint
     census by the Architect that triggered FIX-1.
     ⚠ NO migration apply is authorized here — the Operator relay follows. -->

## STATE PRECONDITION (S47-1)

* `origin/master` = `d114a717d40928ef1af48eceb91daf0a8de19b22`
* `origin/phase/snapshot-portability-1` = `7494544e66c6a967c396e670b85a0ef7fb6fd894`

Either differs → STOP, report both SHAs.

## RULINGS ON THE RECORD (verified, not re-asked)

* **D1 RATIFIED with corrected mechanism** — user-scoped tables
  (`episodes`, `semantic_memory` = `TASK_NAMESPACED_TABLES`) never transport.
  Live truth: their `user_id` FKs EXIST, so a foreign seed would fail loudly,
  not plant silently — conclusion identical, premise corrected in the report.
* **D2, D3, D4 RATIFIED.** D3 corrected the Architect's own racy helper shape
  (select-then-insert loses the exact property auto-suffix exists for) — the
  whole-loop helper is right. D4's cost is accepted and NAMED: between this
  deploy and the Operator apply, restore 503s loudly ("organ not installed
  yet") — the standing dark-merge posture; the Operator relay is cut
  immediately after this merge confirms.
* **FIX-1 VERIFIED**: border-strip on the JSONB with a MEASURED count (an
  unreadable count refuses the whole seed), the DDL-derived census test with
  its S66-1 positive control, the realistic resolved-proposal fixture on real
  Postgres, and the seed SQL's own guard that it never reads `auth.users`.
* **Register entries born here**: `F-S94-FK-CENSUS` — root cause the
  generalizable law: *`information_schema` is a PRIVILEGE-FILTERED view; an
  empty result is not an empty schema; censuses use `pg_catalog` or DDL text.*
  And the honesty note for the owner's transplant expectation: today's
  portable brain = `tool_category_cache` + `router_proposals` (+authority by
  flag); the semantic layer stays home as user-private. Future tenant-shared
  learned tables (Graph-KB and kin) thicken the transplant, and #40 classifies
  them at birth.

## STEP 1 — CI VERDICT (BLOCKING; print, never summarise)

1. Query with the FULL SHA:
   `/repos/maymun207/cwf_yaprak/actions/runs?head_sha=7494544e66c6a967c396e670b85a0ef7fb6fd894`
   Run the S91-6 control (short SHA → expect empty) alongside.
2. Confirm the PR's merge ref is clean.
3. PRINT run id, conclusion, per-job list verbatim. `eval-canary` skipped on a
   PR is structural — recorded as skipped, never counted as passed.

Not green / unverifiable → STOP, report.

## STEP 2 — MERGE

Fresh clone (S93-2). `git fetch origin && git checkout master &&
git reset --hard origin/master`. Merge the branch **`--no-ff`** with the
verbatim message below from a FILE (`git merge -F <path>`). No edits — not a
word, not a line-break. Confirm the merged tree prints
`rev 232 · 2026-08-12` by printing it. Push master.

## STEP 3 — TAIL ANCHOR (print, never assume)

`git rev-parse origin/master` · `git log --oneline -3` · the docVersion line ·
`git status --porcelain` (MUST be empty) · post-merge master CI: query the
merge SHA, print run id + conclusion + jobs (eval-canary runs on master —
record its verdict and its `scoredReps/failedReps` line for the Architect's
S63-1 chain; offer no ruling).

## STEP 4 — CLOSING SWEEP

No uncommitted files anywhere · delete the phase branch from origin only after
the merge is confirmed on origin/master · report the production deployment if
visible (the Architect independently confirms READY/production at the merge
SHA) · append the MERGED section to the report, history unedited.

## STEP 5 — OWED AFTER YOUR WORK ENDS (none of it yours)

1. **Operator apply** of `20260812120000_snapshot_portability.sql` — separate
   relay, S93-3 embedded. Until then: export/import/seed/restore 503 loudly.
2. **The owner's end-to-end ritual** (both #39 birth proof and the owner's
   requested test, one sitting): fresh take → export + external seal check →
   WIPE (first in this installation's history) → restore (byte-compare +
   safety-take observed) → re-import (suffix observed, payload byte-equal).
   The Architect reads every step independently and holds a hand-pulled copy
   of all six tables through the destructive window.
3. The transplant half stays unprovable until installation #2 exists — carried
   in the register by name, SOTA-1 shape.

After STEP 4: STOP. No new phase.

---

## THE MERGE MESSAGE — VERBATIM, DO NOT EDIT

```
merge: PHASE-SNAPSHOT-PORTABILITY-1 — the learned layer stops dying with its database

Until now every snapshot lived inside the database it protects, so the failure
that would make a snapshot precious would also destroy it. This merge gives the
learned layer a life outside: one gzip envelope, format cwf-learn/1, sealed by
a sha256 the importer re-derives over the payload bytes as received and a
manifest the server recomputes rather than trusts. Export is the ONE designed
breach of the S93 wall that payload never crosses to a browser — a single
SECURITY DEFINER door that writes its own audit row in the same transaction,
while every list and read surface stays manifest-only under a negative
control.

A file never writes the six tables. It lands as an ordinary snapshot row
through the same collision-safe naming the take path uses — the suffix loop is
now one shared helper whose INSERT is itself the test of freeness, because a
select-then-insert shape would have reintroduced exactly the race auto-suffix
exists to kill. Restoring a foreign file is refused by name: the restore
function now REQUIRES the caller's installation ref, no default, because a
defaulted fence is a skipped fence — the repository supplies the compile-time
constant and a test pins that no request value can ever reach the comparison.
The cost is honest: between deploy and apply, restore refuses loudly as
not-yet-installed, this organ's standing posture.

A transplant into a fresh installation writes only what is meaningful there.
The seed refuses a non-empty layer outright — merging brains is a problem this
phase does not pretend to solve. Per-table classes decide what crosses:
routing cache and proposals travel; authority travels only behind its own
typed flag, because a grant silences a detector and imported grants are
imported silenced detectors; episodes and semantic memory never travel — they
are user-private, keyed to people who do not exist on the other side; entity
topology never travels — the target re-discovers its own backends, and a
transported mirror is a stale hand-off wearing a machine's clothes.

Rollback stops being one-way. Restore and seed begin, inside their own
transaction, by snapshotting the CURRENT state, and the audit row names the
safety snapshot it created — a wrong rollback is thereafter recoverable, the
discarded present parked rather than destroyed.

The review caught a false measurement before it could ship a defect. The
build's FK census reported zero foreign keys across the learned layer;
pg_constraint reports five. The gap was not carelessness but a quiet law of
the tool: information_schema's constraint views are privilege-filtered and
return an EMPTY SET, not an error, for tables the querying role does not own.
An empty result read as an empty schema is the exact empty-versus-unread
confusion this codebase legislates against, found living inside a census. The
law generalizes and is recorded: constraint censuses use the catalog or the
DDL text, never information_schema. The defect it hid: router_proposals is
transportable but resolved_by is a real FK to auth.users, so one resolved
proposal in a realistic file would have aborted an entire transplant on a
column incidental to it. Now identity is nulled at the border and the act is
counted — strippedResolverIdentity is always present, zero is a measured
zero, and a strip count that cannot be read refuses the seed rather than
recording an unmeasured one. A DDL-derived census test makes the rule
structural: any learned table referencing auth.users must be classed
never-transported or border-stripped, or the suite reds.

Also closed in passing, both latent: migration-body tests now resolve the
LAST definition of a replaced function instead of silently verifying
superseded history, and the memory_audit CHECK test pins the effective
constraint plus never-drops-a-value. Recent operations in the panel stop
lying by omission: the ledger read and the label map both derive from the
shared action vocabulary, an unknown action renders its raw name, and the two
deletions the owner performed this morning become visible retroactively.

One migration, AUTHORED not applied (ADR-005): three new audit actions, a
safety_snapshot_id column, the shared naming helper, take and restore
re-emitted as the reviewed text (closing the known applied-vs-reviewed
divergence), three new SECURITY DEFINER functions, service-role-only
throughout. Zero new permissions, zero new params, zero new endpoints. Tests
6712 -> 6814 across 533 files. Governance Model redrawn v11 for the third
widening of a closed vocabulary; the other tabs' hashes moved for derived
reasons only. docVersion rev 232. Every mutation control caught, including
the two whose first-attempt survival exposed unreachable-guard assertions and
the border-strip reversal.

DONE IS NOT DONE AT MERGE. Owed: the Operator apply, then the owner's
end-to-end ritual — take, export, seal-check, the first wipe in this
installation's history, restore with its safety snapshot observed, re-import
byte-equal. The transplant half waits, by name, for an installation #2 to
exist.
```
