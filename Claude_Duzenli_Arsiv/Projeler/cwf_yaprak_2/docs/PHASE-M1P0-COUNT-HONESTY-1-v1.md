# PHASE-M1P0-COUNT-HONESTY-1 · v1
<!-- PHASE-M1P0-COUNT-HONESTY-1-v1 · 2026-08-02 · S78 · Architect: Claude.
     Closes finding HEAD-COUNT-SILENT-204-1 (repo rider). Master rollout plan
     item 1.0 — the FIRST item of the MEASURE-1 block, owner-ratified today.
     Lane: AG (Author). ONE self-contained relay per DOCTRINE D-2.
     Zero migrations · zero governed writes · zero publishes · pure code. -->

## PRECONDITION (S47-1)
`git rev-parse origin/master` must print
`29e4965fd5d3654593d19a06b0221e03112d7a38`. If not, STOP and report the hash.

## THE FINDING (context, embedded)
A supabase-js `{ count: 'exact', head: true }` query can fail BODILESSLY:
HTTP 204, `count: null`, `error: null` — PostgREST's error JSON has no body
to travel in. Proven live today during RECON-TENANT-CONSOLE-POSTURE-1
(wrong-table HEAD control returned silent green; the identical GET errored
with PGRST205). Call sites that fold `count ?? 0` therefore convert a FAILED
measurement into a stamped zero — a direct violation of the empty≠zero law.
Worst instance: the memory forget-tick writes `scanned: count ?? 0` into the
`memory_audit` governance LEDGER — the ledger can record "0 scanned" for a
tick whose count never succeeded.

## ARCHITECT-COMPUTED CENSUS (fresh clone @ 29e4965f, this session — your §0
re-verifies and OWNS the final list; if your census finds MORE sites, they
are IN scope; my list is a floor, not a ceiling)
`grep -rn "head: true"` (repositories):
- UsersRepository.ts:46 → fold at :49 (`return count ?? 0`)
- EpisodesRepository.ts:333, :445, :452 → folds at :345/:347
  (`scanned: count ?? 0` — THE LEDGER PATH)
- GoldenRunsRepository.ts:202 → fold at :206
- SyntheticRunsRepository.ts:78 → fold at :81
- RouterProposalsRepository.ts:128–130 → folds at :138–140
- ReplayAuditRepository.ts:90 → locate its fold in your census

## LENS DEFINITION — binding, self-tested both directions (D-5)
IN scope: a null `count` returned by a PostgREST count QUERY, folded to 0.
NOT in scope (innocent cases — must remain untouched):
- Column-value folds like `retrieval_count ?? 0` (Episodes :129/:204) or
  `row.deleted_count ?? 0` (MemoryAudit :144/:145) — a null COLUMN is data,
  not a failed measurement.
- A count query that SUCCEEDS with 0 rows — real zero stays zero.

## BINDING CONSTRAINTS
1. ONE shared helper (persistence layer; name/shape yours) with the
   contract: query error OR `count === null` → THROW with a named error;
   a successful count (including real 0) → the number. Every in-scope call
   site routes through it. No site may catch the throw and resurface 0.
2. Ledger path (forget tick): on count failure the tick ABORTS LOUDLY —
   error logged, NO memory_audit row fabricated for that tick. C1 LAW and
   append-only posture untouched.
3. Ops/panel paths (users, golden, synthetic, router stats, replay audit):
   the throw propagates to an explicit error state; the UI/endpoint may show
   an error, never a fabricated 0.
4. No behavior change on the success path — byte-honest counts flow as
   before; suite stays green minus the new tests you add.

## GATES
- **G0** — fresh FULL clone (--depth banned, S76-1); precondition hash;
  YOUR OWN census (grep both patterns, paste output) reconciled against the
  Architect list above; any delta named before code.
- **G1** — helper + all in-scope call-site swaps. Innocent-case proof: a
  grep showing column-`?? 0` folds byte-unchanged.
- **G2** — tests: (a) POSITIVE CONTROL — helper under a mocked
  `{count:null,error:null}` result THROWS (prove the guard can fire);
  (b) forget-tick negative control — mocked null count → tick aborts, zero
  memory_audit writes; (c) real-count pass-through incl. real-0 preserved.
- **G3** — full suite green (from 416 files / 4642 tests, growing by your
  new tests); `tsc` clean; CHANGELOG + KB entry per RULE 3; reseal ONLY if
  a mapped file changed (check, don't assume).
- **STOP-FOR-REVIEW** — push branch `phase/m1p0-count-honesty-1`, NO merge.
  Report: census paste · file list · test deltas with names · suite totals ·
  branch head sha. Architect RULE-25 review gates the merge.

TAIL ANCHOR (S61-3): this prompt ends at the line below.
— END · PHASE-M1P0-COUNT-HONESTY-1-v1 —
