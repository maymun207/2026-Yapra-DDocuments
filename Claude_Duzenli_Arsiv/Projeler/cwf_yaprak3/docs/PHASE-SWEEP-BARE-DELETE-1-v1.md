# PHASE-SWEEP-BARE-DELETE-1 · v1 — walk item #41

<!-- Architect-authored · S95 · lane AG-2. Self-contained. Extends the S94
     FIX-2 structural gate (organ-only) to the WHOLE house. -->

## PRECONDITION (S47-1)
Fresh FULL clone; `git rev-parse origin/master` MUST print
`d8f33f80a5ba3c76fa710e0c73918664f0ffd979`. Else STOP and report.

## LANE / BRANCH / REPORT / PR (S91 completeness gate)
- Lane: **AG-2**. Branch: **`phase/sweep-bare-delete-1`** off origin/master.
- PUSH to origin, OPEN A PR against master (CI on PR head, S37-2).
- Report: **`docs/relay/PHASE-SWEEP-BARE-DELETE-1-report.md`**.
- Merge only on Architect GO with verbatim message. `--no-ff`; squash banned.

## WAVE CONTEXT (S88-1) — READ CAREFULLY
AG-1 runs `phase/persistence-class-1` in parallel and **merges FIRST**.
**Your fence:** ONE new test file
`api/cwf/__tests__/effectiveBodiesBareDelete.test.ts` (+ its small parser
helper if needed, colocated) and AT MOST one NEW migration (only if the sweep
finds a live offender). **You must NOT touch:** `shared/**`, Health/admin
surfaces, ADR files, or any existing test file — including
`learningSnapshotMigration.test.ts` (AG-1-adjacent territory; your gate is a
NEW file that supersedes nothing).
**Rebase protocol (S90-1):** after AG-1's merge lands, `git fetch` + rebase
onto new origin/master BEFORE your merge; if you authored a migration, RESTAMP
it at rebase time to a timestamp strictly greater than the then-current ledger
top; re-run the drift gate post-rebase and reseal only then if it demands.
Report MUST include `git diff --name-only origin/master..HEAD` verbatim — the
Architect intersects it with AG-1's list; expected intersection: ∅ (plus, at
most, the seal manifest — which is exactly why you reseal only POST-rebase).

## BACKGROUND LAWS (embedded — you cannot see project files)
- **S94-1 (environment-relative semantics):** this database's `authenticator`
  role preloads `safeupdate`; a WHERE-less full-table DELETE dies at runtime
  even inside SECURITY DEFINER, while migrations (applied as postgres) pass
  silently. Canonical full-table delete here is `delete from <t> where true;`.
- **S94 FIX-2 gate (organ-only today):** the snapshot organ's two bodies are
  pinned to the `where true` form in `learningSnapshotMigration.test.ts`.
- **Applied migrations are immutable history (all 72).** You NEVER edit an
  existing migration. A defective EFFECTIVE body is fixed by a NEW migration
  re-issuing `CREATE OR REPLACE FUNCTION` with the corrected text.

## BUILD
1. **Effective-body computer:** walk `supabase/migrations/*.sql` in filename
   order; for every `CREATE [OR REPLACE] FUNCTION`, track the LATEST body per
   function identity (schema.name; treat overloads by full signature if any
   exist — report if you find overloads). DROP FUNCTION removes it from the
   effective set. The unit of judgment is the **EFFECTIVE body**, never a
   historical file — history legitimately contains superseded bare DELETEs
   and MUST NOT red.
2. **The gate (standing test, new file):** across ALL effective
   SECURITY DEFINER bodies (measured universe at anchor: 24 files carry the
   marker — your walk recomputes this, D-3), a full-table DELETE — i.e.
   `delete from <table>` followed by `;` with no WHERE — is RED, naming
   function + table. `delete ... where true` passes. `delete ... where <expr>`
   passes. Non-SECURITY-DEFINER bodies: OUT of scope for the gate verdict but
   COUNTED in the report (one line: how many exist, how many carry bare
   deletes) so the Architect can judge whether a follow-up is warranted.
3. **Sweep + fix:** run the gate. If offenders exist in effective bodies,
   author ONE new migration re-issuing each offending body with `where true`
   (byte-minimal diff: ONLY the delete lines change — prove with a
   comments-stripped body diff in the report). If ZERO offenders: no
   migration; the phase ships the gate alone and the report states the
   measured zero with the S66-1 positive control below.
4. **Mutation controls (D-5, both directions + innocent case):**
   (a) plant a scratch effective body with a bare full-table DELETE → RED
   naming it; (b) the `where true` form → GREEN; (c) a WHERE-clause delete →
   GREEN; (d) a superseded historical bare delete whose replacement is clean
   → GREEN (this is the assertion that the gate reads EFFECTIVE, not
   history); (e) parser oddity control (quoted identifiers / `$$` vs `$body$`
   dollar-quoting) handled.
5. **If a migration ships → Operator apply is a SEPARATE relay** the
   Architect will author post-GO (ADR-005: `supabase db push` only; fence
   `fjbrkimwvtpwoxhziidh`). Do not instruct the Operator yourself.

## BIRTH PROOF (S93-1)
The gate is seen to FAIL before trusted: transcripts of (a) and (d) above +
the S66-1 positive control (clean tree passes, printing the effective-body
count and SECURITY DEFINER count it walked).

## REPORT MUST CONTAIN
Effective-body census (count per category, computed) · offender list (or the
measured zero) · body-diff proof if migration authored · full diff name-list ·
test deltas · drift-gate output post-rebase · `>> BLOCK: AG-2 <<` tail with
branch head SHA.

## DO-NOT
No edits to existing migrations or existing tests · no `shared/**` · no
Vercel CLI in clones · absolute paths in scratch writes (S80-1) · no Operator
instructions from your lane.

<!-- END · PHASE-SWEEP-BARE-DELETE-1-v1 -->
