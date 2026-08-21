# PHASE-SNAPSHOT-PORTABILITY-1 · v1

<!-- Architect-authored · S94 · walk item #39 (owner-ratified this session) ·
     single lane (AG). Cut against master AFTER #38 merged AND its migration was
     applied live. Self-contained (S91-4): every binding clause embedded. -->

## PRECONDITION (S47-1)

Fresh full clone. `git rev-parse origin/master` MUST print
`d114a717d40928ef1af48eceb91daf0a8de19b22` (or a later commit whose only delta
is relay documentation — if different, report SHA + `git log --oneline -3`
before proceeding). Branch: **`phase/snapshot-portability-1`** cut from fresh
origin/master (S93-2: dead worktrees stay dead).

## THE OWNER RULING THIS PHASE SERVES

Two products, one file format:
**(P-A)** the learned layer exported OUT of the database it protects — today a
snapshot dies with its DB. **(P-B)** a NEW installation boots empty and is
seeded from an older installation's file ("brain transplant" — the EAIP
prerequisite). And one S94 owner-scenario ruling: **rollback stops being
one-way** (SAFETY-TAKE below).

## WHAT EXISTS ON THIS MASTER (Architect recon at d114a71 — verify, don't trust)

`api/admin/learning-snapshot.ts` — six actions in an `ACTIONS` const (:83):
take/restore/wipe/delete/keep/purge. `LearningSnapshotRepository` — one
`.rpc()` per act via private `callRpc`. `shared/learningSnapshot.ts` — confirm
matchers + typed results, single home. SQL side (migrations `20260811120000` +
`20260811160000`, BOTH applied, BOTH untouchable history): five SECURITY
DEFINER functions, service-role-only; the take function auto-suffixes name
collisions via insert-and-catch with the unique index as arbiter.
`EXPECTED_SUPABASE_PROJECT_REF` lives at `shared/dbConstants.ts:1078`.
Live state: ONE snapshot (`s93-birth-3`, canonical, 1060 rows); two
`learning_snapshot_delete` audit rows written this morning by the owner.

**Known divergence, now MANDATORY to converge:** the applied `20260811120000`
differs from the repo file by ~13 lines (`delete … where true` vs `delete …`,
semantically identical). Standing F-S93 ruling: the first phase to touch those
function bodies re-emits the reviewed text. **This phase replaces
`learning_restore` (SAFETY-TAKE), so the convergence is no longer optional —
your new migration's `create or replace` bodies are the reviewed text.**

**Confirmed defect folded in (F-S94-RECENT-OPS-VOCAB-GAP):**
`LearningTab.tsx` ~:469 labels audit actions with a hand-written ternary that
knows only the S93 vocabulary — the owner's two deletions this morning are in
the ledger but INVISIBLE in "Recent operations". The label map must derive
from the shared action vocabulary (one spelling of one rule); an unknown
action renders its raw name rather than being silently mislabeled. Check
whether `listAudit` also FILTERS actions (recon item b).

## THE COMMITTED DESIGN (argue only from evidence)

### 1 · The file: `*.cwf-learn.json.gz`
gzip over one JSON envelope:
`{ format:"cwf-learn/1", exportedAt, source:{installation, docVersion},
snapshot:{id,name,createdAt}, manifest, sha256, payload }`.
`sha256` = hex over the UTF-8 bytes of `JSON.stringify(payload)` exactly as
the exporter wrote them. `source.installation` = the project ref (compare
against `EXPECTED_SUPABASE_PROJECT_REF` at import). Node `zlib`/`crypto`, no
new dependencies. ~133 kB live — single request, no streaming, no chunking.

### 2 · EXPORT — a NAMED fence relaxation, one door, audited in SQL
S93's wall: payload never crosses to a browser (client SELECT revoked, list
endpoint manifest-only). Export breaches it BY DESIGN, exactly once:
* New SECURITY DEFINER `learning_snapshot_export_read(id, actor)` returning
  payload + header AND writing the `learning_snapshot_export` audit row in the
  same transaction — the ledger write lives in SQL beside the act, like every
  sibling.
* Endpoint action `export`: builds the envelope, gzips, returns as a download.
* EVERY other surface stays manifest-only — pinned by the existing tests plus
  one NEW negative control asserting the list/read paths cannot reach payload.
* Panel copy at the button says plainly (TR/EN) that the file contains all
  users' memory verbatim and must be guarded accordingly. D-12: no internal
  identifiers in copy. ⚠ voiceGate is BLIND to admin panels (verified S94) —
  hand-check every string against its forbidden patterns.

### 3 · IMPORT — never writes the six tables; lands as a snapshot row
Endpoint action `import` (file as base64 in the POST body): gunzip → parse →
format check → **sha256 over the payload bytes as received** → manifest
RE-DERIVED from payload server-side and compared to the file's own manifest
(the file's manifest is never trusted as the count) → then new SECURITY
DEFINER `learning_snapshot_import(name, payload, source, actor)` inserts a
NORMAL snapshot row + `learning_snapshot_import` audit row. Name collisions:
the SAME auto-suffix rule as take — factor the suffix loop into one internal
SQL helper (`_learning_snapshot_free_name(base)`) used by take AND import
(replace take's body to call it; one spelling of one rule), pinned by a test
that both resolve collisions identically. Landing is non-destructive → no
typed confirm. A landed foreign-source snapshot is RESTORABLE only if
`source.installation` matches this installation (refusal names both refs);
seed mode is the path for foreign files.

### 4 · SEED — the transplant, empty-target-only
New SECURITY DEFINER `learning_seed_from_snapshot(id, include_authority,
actor)`:
* **Refuses unless the target learned tables are EMPTY** — a transplant into a
  brain that has already learned is a merge problem this phase does not
  pretend to solve; the refusal says so (own SQLSTATE, 409 at the endpoint —
  follow #38's LS-code pattern).
* Writes ONLY the seed-transportable subset. Until #40 (the persistence-class
  registry) exists, that subset is an explicit constant in
  `shared/learningSnapshot.ts` — `episodes` NEVER (user-private; foreign users
  don't exist), `entity_registry` NEVER (re-discovered, ADR-009: a transported
  mirror is a stale hand-off wearing a machine's clothes),
  `backend_authority` ONLY when `include_authority` (a grant silences a
  detector; imported grants are imported silenced detectors — never silent,
  never default), `tool_category_cache` + `router_proposals` +
  `semantic_memory` YES (the brain). Mark the constant as superseded-by-#40 in
  a comment AND in the report — a disclosed hand list, not a hidden one.
* Per-backend row validation, skip-and-count by backend id in the result;
  if EVERY row would skip, REFUSE — seeding nothing while reporting success is
  the lie this codebase legislates against (empty≠zero).
* Typed confirm sentence NAMES the mode and, when set, the authority flag.
* One transaction, `GET DIAGNOSTICS` counts, one `learning_seed` audit row.

### 5 · SAFETY-TAKE — rollback stops being one-way
`learning_restore` AND `learning_seed_from_snapshot` begin, inside their own
transaction, by snapshotting the CURRENT state under `pre-restore-<utc-ts>` /
`pre-seed-<utc-ts>` (collision → the shared suffix helper), `keep=false`.
* `memory_audit` gains a nullable `safety_snapshot_id uuid` column; the
  restore/seed audit row records the safety snapshot it created — one row
  tells the whole story.
* A take must NEVER trigger a safety-take (structurally true — pin it), and
  repeated restores must not silently fill the table — auto-snapshots are
  purgeable under #38's retention; a test names this interaction.
* Replacing `learning_restore`'s body = re-emit the reviewed text (the F-S93
  convergence, per above).

### 6 · Migration (ONE new file, AUTHORED not applied — ADR-005)
CHECK widens by THREE (`learning_snapshot_export` / `learning_snapshot_import`
/ `learning_seed`) · `safety_snapshot_id` column · the suffix helper · replace
take · replace restore · the three new functions · service-role-only EXECUTE
throughout · idempotent second apply (zero rows). ⚠ Do NOT edit
`20260811120000` or `20260811160000` — applied migrations are untouchable
history; convergence happens ONLY inside your new file's `create or replace`
bodies.

### 7 · Repository + endpoint + panel
One `.rpc()` per new act, matching the class posture. Panel: export button per
§2 · import flow (file picker → base64 → result showing the ASSIGNED name
incl. suffix and, for foreign files, the honest "seed-only" state) · seed
dialog behind its confirm · the recent-ops label fix (§ defect above) · all
copy TR/EN via `t()`, D-12, hand-checked.

### 8 · Proofs in-tree (minimum set; mutation controls must each RED a named test)
Round trip: export → tamper ONE byte → import REFUSES showing both hashes;
untampered → lands, auto-suffix observed, payload byte-equal to source row ·
manifest forged in file → refusal (server re-derivation is the arbiter) ·
seed on non-empty → refuses · seed writes authority WITHOUT the flag → red ·
`episodes`/`entity_registry` present in a seeded target → red · safety-take
removed from restore → red · take triggering a safety-take → red ·
recent-ops label map reverted to a hand list → red (structural: assert the map
is built FROM the shared vocabulary) · export path reachable without
`learning:manage` → red.

## STEP 1 — RECON before any edit (S65-1; derive, record in report)
(a) `git rev-parse origin/master`; (b) does `listAudit` (SQL or repo) FILTER
action values — if yes, the two delete rows' invisibility has TWO causes, fix
both; (c) payload key-order stability through your export→import stringify
path — prove the sha comparison is byte-stable with a test, don't argue it;
(d) Vercel body-size limit vs the base64 envelope (~180 kB) on this project's
runtime; (e) every consumer of the take function's return shape (you are
replacing its body — behaviour must stay byte-identical, characterization
test first); (f) baseline test counts + drift-gate state. Divergence from
premises → STOP, report.

## GATES
`typecheck` + `typecheck:api` (both projects) · full suite · tenant-zero ·
doc-drift. The Governance Model tab narrates `memory_audit`'s closed action
vocabulary and this phase widens it AGAIN (+3): per S94's own precedent that
is a **CONTENT redraw** (v11), never a hash-only pass — pre-ordered here so
there is no judgement call. Other tabs hash-only unless the gate says
otherwise; a demanded REDRAW elsewhere → stop and report. docVersion SET to
**rev 232**.

## WHAT DONE MEANS (S93-1 · S63-1 — named now, executed after Operator apply)
The birth proof is the owner's END-TO-END RITUAL through the real panel, in
one sitting: take fresh snapshot → EXPORT, seal verified externally → WIPE
(the first production wipe in this installation's history) → RESTORE from the
fresh snapshot (byte-compare) → observe the SAFETY-TAKE auto-snapshot that
restore created → RE-IMPORT the exported file, suffix observed, payload
byte-equal. The Architect independently reads counts/audits/hashes at every
step and holds a hand-pulled copy of all six tables during the destructive
window. The transplant half (seed into a genuinely separate installation)
stays unprovable until installation #2 exists — named residual, carried in
the register, per SOTA-1 shape.

## DELIVERABLES (all four)
1. Branch pushed to origin.
2. Report at `docs/relay/PHASE-SNAPSHOT-PORTABILITY-1-report.md`: recon
   (a)–(f) · migration's FENCE-first self-review · the seed-subset constant
   flagged as #40-superseded · every deviation NAMED · birth proof listed as
   owed · counts before/after · mutation table.
3. PR against master (CI on the PR head).
4. STOP at push+PR+report. No merge, no apply — Operator gets its own relay.
