# PHASE-SNAPSHOT-LIFECYCLE-1 · v1

<!-- Architect-authored · S94 · walk item #38 (rollout v3_1) · single lane (AG).
     Cut against master AFTER #4 merged. Self-contained: AG lanes cannot read
     Claude project files (S91-4), so every binding clause is embedded here. -->

## PRECONDITION (S47-1 — verify before any work)

Fresh full clone of `maymun207/cwf_yaprak`. `git rev-parse origin/master` MUST
print `a7600997d3c28445dc5218eabe6a00a22bc5a03e` (or a later commit whose only
delta is relay documentation — if it differs, report the observed SHA and the
`git log --oneline -3` before proceeding).

Branch: **`phase/snapshot-lifecycle-1`**, cut from that fresh `origin/master`.
S93-2: the previous phase's worktree is DEAD — never reuse one, never commit to
a local master.

## WHAT EXISTS TODAY (Architect recon, run live on this master — verify, don't trust)

LEARNING-SNAPSHOT-1 (S93) shipped the organ: `public.learning_snapshots`
(RLS on, zero policies, all client grants revoked), three SECURITY DEFINER
entry points (`learning_snapshot_take` / `learning_wipe` / `learning_restore`),
one endpoint `api/admin/learning-snapshot.ts` with exactly three POST actions
(`take` / `restore` / `wipe`), `LearningSnapshotRepository` where each action is
exactly one `.rpc()`, `shared/learningSnapshot.ts` (the single home of
`WIPE_CONFIRM_SENTENCE` and the two confirm-matchers), and the owner panel in
`src/components/admin/LearningTab.tsx`.

**What is missing, measured live:**

* `learning_snapshots.name` has **no uniqueness constraint of any kind**.
* There is **no delete action** anywhere — endpoint, repository or SQL.
* There is **no retention concept**.
* Live consequence right now: **three rows all named `s93-birth`**, identical
  manifests, created 09:10:23 / 09:11:58 / 09:12:17Z. Two were synthetic-actor
  trial takes (`created_by 00000000-0000-4000-a000-000000000093`); the canonical
  one is `d16f6636-cd41-4db2-ae35-e0d7373795ed`, taken by a real user. They are
  harmless history, and removing them is this phase's first real act.

## THE DIAGNOSIS — why these three are ONE phase, not three chores

The register lists "name uniqueness / confirmed delete / retention" as if they
were independent. They are not, and building them in that order would ship a
hazard.

**The destructive confirmations in this organ are keyed on the snapshot NAME.**
`restoreConfirmMatches(typed, snapshotName)` requires the operator to type the
name of the snapshot they are restoring — a real safety ritual, and the same
shape any delete confirmation would naturally take. But a name that three rows
answer to cannot carry that ritual: the operator types `s93-birth`, the check
passes, and *which* row they meant was never established by what they typed. It
is safe today only because the id travels alongside — i.e. the confirmation is
currently decorative on the ambiguous axis, and the panel shows three rows a
human cannot tell apart.

So: **uniqueness is the PRECONDITION that makes a typed delete confirmation
mean anything.** Build the delete first and you build a ceremony that cannot
identify its own target. That ordering is binding for this phase.

## THE COMMITTED DESIGN — three rulings, argue with them only from evidence

### R1 · Uniqueness is enforced in the DB and resolved by AUTO-SUFFIX, not rejection

A unique index on `name`. `learning_snapshot_take` resolves a collision itself
by appending a numeric suffix (`s93-birth`, `s93-birth-2`, `s93-birth-3`) and
**returns the name it actually assigned**, which the endpoint returns and the
panel displays.

*Why not reject:* the first real consumer of unattended snapshots is a
benchmark harness (walk item #18, A2A). A take that fails on a name collision
turns a naming accident into a failed run. *Why the return value is not
optional:* silently storing a different name than the caller asked for is a lie
unless the caller is told — the assigned name is part of the result, and a test
pins that a suffixed take reports its suffix.

The suffix search must be safe under concurrency: two simultaneous takes of the
same name must both succeed with different names, never deadlock and never both
land on `-2`. Solve it inside the function (retry on unique violation is
acceptable and probably simplest); pin it with a test that exercises the
collision path, not just the happy path.

### R2 · Delete is per-snapshot, typed-confirmed by NAME, and audited

A fourth SECURITY DEFINER function (`learning_snapshot_delete`) and a fourth
endpoint action, following the existing shape exactly: one transaction, one
`.rpc()` in the repository, one audit row.

* The confirmation is the **snapshot's own name**, typed, verified **server-side**
  — reuse `restoreConfirmMatches` rather than authoring a second matcher (RULE 1:
  one spelling of one rule). It is **not** the full `WIPE_CONFIRM_SENTENCE`:
  that sentence is scoped to erasing the whole learned layer, and reusing it for
  a narrower act would train the operator to type it casually, which weakens the
  wipe ritual itself.
* `memory_audit.action` is CHECK-constrained to four values today
  (`episode_delete`, `forget_tick`, `learning_wipe`, `learning_restore`). The
  new variant requires **altering that CHECK** — so this phase carries a
  migration and an Operator step. Do not route around it.
* The migration's own comment already anticipated this phase: the restore audit
  row names its source snapshot and is *deliberately not a foreign key* so that
  "the ledger must keep naming a snapshot that a later cleanup deletes". Honour
  that: deleting a snapshot must NOT cascade, orphan or rewrite any audit row.
  Pin it with a test — take, restore from it, delete it, and assert the restore
  audit row still names the deleted id.

### R3 · Retention is a BOUND with an explicit purge — never an automatic deletion

There is no cron, no TTL, no unattended destruction. Concretely:

* A `keep boolean not null default false` column. A kept snapshot can never be
  purged and cannot be deleted without first being un-kept (two acts, deliberately).
* A purge action that deletes the oldest **unkept** snapshots down to a bound,
  requiring a typed confirmation that names **the exact count** it will delete —
  and the count is re-derived server-side at execution, so a list that moved
  between preview and confirm refuses rather than deleting a different set.
* The bound is a governed `agent.param`, self-seeded through the existing
  reconciler if that costs no migration; if it would, use a code constant and
  say so in the report. **Its floor must be permissive** (a large number), never
  a tight one: an outage must not make the system newly destructive.

*Why no automatic purge:* a snapshot is the only artifact from which the learned
layer can be reconstructed, and each is 133 kB live — there is no storage
pressure to trade against. Unattended deletion of the sole restore point, to
solve a problem nobody has, is not a feature.

### First job (S93-1 BIRTH PROOF — binding law, embedded)

*Every organ that produces a measurement must produce and verify its first real
measurement inside the phase that ships it. "Built" is not done; "measured, and
the measurement verified" is done.*

This phase's birth proof, run post-deploy through the **real panel** by the
owner or through the real endpoint (never raw SQL): the two synthetic
`s93-birth` rows are deleted, `d16f6636-cd41-4db2-ae35-e0d7373795ed` survives,
one audit row per delete exists naming the deleted id, and the restore audit row
written in S93 still names its source. Name this in the report as owed; the
Architect will order it in the GO relay.

## THE WORK

1. **Migration** (AUTHORED, Operator-pending — you do NOT apply it; ADR-005:
   migrations run only via `supabase db push` by the Operator lane): unique index
   on `name`, `keep` column, the CHECK widening, `learning_snapshot_delete`,
   the purge function, and the suffix logic inside `learning_snapshot_take`.
   ⚠ **Do not edit `20260811120000_learning_snapshots.sql`.** An applied
   migration is untouchable history. New file, new timestamp.
   ⚠ Known and RULED: the applied version of that file diverges from the repo by
   ~13 lines (`delete … where true` vs `delete …`, semantically identical in
   Postgres). It is **not to be corrected** — but if your new functions touch
   those same bodies, re-emit the reviewed text opportunistically and say so.
2. **Repository**: `deleteSnapshot`, `purge`, `setKeep` — one `.rpc()` each, no
   second write path, matching the existing class's posture.
3. **Endpoint**: the three new actions, each one call, each typed-confirmed
   server-side where destructive. Keep the action vocabulary in the one existing
   constant.
4. **Shared** (`shared/learningSnapshot.ts`): any new type/constant lands here,
   not duplicated client-side.
5. **Panel** (`LearningTab.tsx`): the assigned name shown after a take (including
   its suffix), a keep toggle, per-row delete with its typed confirm, and the
   purge with its count-naming confirm. **D-12 (embedded):** user-visible copy
   carries NO internal identifiers — no phase names, no ADR/RULE numbers, no
   table or column names, no `learning_wipe`. Bilingual TR/EN in the panel's
   existing `t(tr, en)` voice.
   ⚠ **Do not rely on `voiceGate` to catch copy mistakes.** Verified this
   session: that test scans the stage registry and one string in `TweakTab`, and
   reads no admin panel. Hand-check every string against its FORBIDDEN patterns.
6. **Proofs**: behavioural tests for each action; the concurrency-collision test
   (R1); the audit-survives-delete test (R2); the moved-list refusal test (R3);
   and mutation controls — at minimum, removing the unique index, deriving the
   purge count from the client instead of re-deriving it, and letting a `keep`
   row be purged must each RED a named test.

## STEP 1 — RECON before any edit (S65-1)

Derive and record: (a) `git rev-parse origin/master`; (b) the exact current
CHECK constraint on `memory_audit.action` and every writer of that table;
(c) whether any consumer anywhere reads a snapshot BY NAME rather than by id
(if one exists, R1 changes its meaning — report before building);
(d) whether the self-seed reconciler can provision a new `agent.param` with zero
migration on this tree; (e) baseline test-file/test counts and drift-gate state.
Any divergence from this prompt's premises: STOP and report.

## GATES

`typecheck` (src) AND `typecheck:api` (separate projects, BOTH) · full suite ·
`check:tenant-zero` · `check:doc-drift`. docVersion **SET explicitly** to
**rev 231** (never inherited). A migration adding a table-level capability may
justify more than a hash-only reseal — if the drift gate demands a REDRAW,
do it and say which tab and why; do not force hash-only to keep the diff small.

## DELIVERABLES (all four, none optional)

1. Branch `phase/snapshot-lifecycle-1` **pushed to origin**.
2. Report at **`docs/relay/PHASE-SNAPSHOT-LIFECYCLE-1-report.md`**, committed on
   the branch: recon (a)–(e) · the migration's gate-by-gate self-review
   (FENCE-first: RLS, grants, CHECK, idempotence) · every deviation NAMED with
   reasoning — a silent deviation is a fence violation · the birth proof listed
   as owed · test counts before/after · mutation table.
3. **A PR against master** so CI runs on the PR head.
4. STOP after push + PR + report. No merge. **No migration apply** — that is the
   Operator lane's exclusive door, and the Architect writes that relay.
