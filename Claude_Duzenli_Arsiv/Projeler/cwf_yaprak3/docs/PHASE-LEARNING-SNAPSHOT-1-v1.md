# PHASE PROMPT · LEARNING-SNAPSHOT-1 · v1

<!-- PHASE-LEARNING-SNAPSHOT-1-v1 · 2026-08-11 · S93. Walk item #2 — the FIRST
     of the seven SOTA-gate keys. Owner ruling H4 + S93 ratification of design
     v1_2 (R-1 migration · R-2 in-phase live proof · R-3 clean-agent semantics
     · §2.5 owner panel). SELF-CONTAINED (S91-4): you cannot read Claude
     project files — everything binding is embedded here. -->

>> BLOCK: AG-1 <<

## 0 · PRECONDITION

```
git clone <origin> && git rev-parse origin/master
# MUST print: 0d622de514ab28fa88df5bc17f6e39244bf78027
```
Mismatch ⇒ STOP and report. Full clone only (never `--depth`). Branch:
`phase/learning-snapshot-1` · PUSH to origin · Report:
`docs/relay/PHASE-LEARNING-SNAPSHOT-1-report.md` · Open a PR against master
(CI runs on the PR head). No squash anywhere.

⚠ **PARALLEL LANE (S88-1/S92-1):** AG-2 runs PHASE-FLOOR-RESYNC-1 concurrently.
Source fences are DISJOINT, but `docVersion` is ONE scalar: mint the next rev
normally in your reseal, state the number in your report, and DO NOT assume it
survives the merge — the GO will carry second-merger orders (S92-1).

## 1 · WHY (measured 2026-08-11 live, not inherited)

Owner's sentence: *"Imagine I rebuild Chat-with-your-Factory from scratch —
how do I carry today's learning over? I must be able to wipe ALL learning, and
restore past learning back, versioned."* AgentBeats additionally REQUIRES per
rule: stateless entry per run, zero cross-run memory, a full state-reset
mechanism, and `task_id` namespacing for concurrent runs. Without this organ
the platform cannot be entered; it is SOTA-gate key 1 of 7.

The learned layer today — SIX tables, **1,047 rows**, none snapshot-able:

| table | rows | PK | scope |
|---|---|---|---|
| `episodes` | 214 | id uuid | user_id + conversation_id |
| `semantic_memory` | 12 | id uuid | user_id |
| `entity_registry` | 796 | id uuid | backend_id + layer |
| `router_proposals` | 20 | **keyword (bare)** | global |
| `backend_authority` | 3 | (backend_id, metric) | global/backend |
| `tool_category_cache` | 2 | **keyword (bare)** | global |

`task_id`: **0 hits** in api/shared (verified at the anchor). The governed
layer (`domain_rules`) is already versioned/audited — OUT OF SCOPE. The shape
source for wipe is `api/admin/routing-cache.ts`: delete + ONE epoch bump +
audit row are INSEPARABLE (C-D) — copy that discipline, do not invent.
`semantic_memory` was MISSING from the earlier inventory — which is why the
scope list must be mechanical, not hand-maintained (§2.2).

## 2 · SCOPE

### 2.1 · Migration — AUTHOR ONLY, never apply (ADR-005: Operator `db push`)
ONE migration file, header comment `AUTHORED, Operator-pending`:
- **`learning_snapshots`**: `id uuid pk default gen_random_uuid()` ·
  `name text not null` · `created_at timestamptz not null default now()` ·
  `created_by uuid not null` · `manifest jsonb not null` ·
  `payload jsonb not null`. RLS ON, ZERO policies; REVOKE ALL (incl. SELECT)
  from public, anon AND authenticated explicitly (the all-grantees pattern).
  Add the `shared/grantPolicy.ts` SERVER_ONLY row + `shared/dbConstants.ts`
  DB_TABLES entry, both with `AUTHORED, Operator-pending` provenance comments.
- **`episodes.task_id text null`** + partial index
  `(user_id, task_id) where task_id is not null`.
- **`semantic_memory.task_id text null`** + same index pattern.
- **Three SQL functions**, SECURITY DEFINER, EXECUTE revoked from
  public/anon/authenticated, granted to service_role only:
  - `learning_snapshot_take(p_name text, p_actor uuid) returns jsonb` — ONE
    transaction: serialize all six tables into `payload` (use
    `to_jsonb(t.*)` row arrays so restore round-trips losslessly via
    `jsonb_populate_recordset`); `manifest` = per-table counts DERIVED from
    the payload arrays (single source, never counted separately); insert;
    return `{id, manifest}`.
  - `learning_wipe(p_actor uuid, p_reason text) returns jsonb` — ONE
    transaction: DELETE from all six, counts captured from the deletes
    themselves (`GET DIAGNOSTICS` / RETURNING); ONE epoch bump on the
    routing cache meta row; audit rows (`routing_audit` 'clear' with
    deletedCount for tool_category_cache; `memory_audit` row carrying the
    per-table count map for the rest). Any count unreadable ⇒ RAISE (abort
    whole transaction) — never record 0 for an unmeasured delete
    (MEASURE-READ-HONESTY-1).
  - `learning_restore(p_snapshot_id uuid, p_actor uuid) returns jsonb` — ONE
    transaction: the wipe trio + `jsonb_populate_recordset` inserts per
    table + audit rows NAMING the snapshot id; return restored per-table
    counts. All-or-nothing by construction.

### 2.2 · `LEARNED_TABLES` — one mechanical source
A single exported const (in `shared/dbConstants.ts`, beside DB_TABLES) listing
exactly the six table names. The endpoint and every test read THIS. Coverage
tripwire test: each learned-layer write door (memoryDistill→episodes ·
SemanticMemoryRepository→semantic_memory · ToolCacheRepository learn→
tool_category_cache · RouterProposalsRepository→router_proposals ·
backend_authority observation door→backend_authority · entity discovery→
entity_registry) is asserted to target a LEARNED_TABLES member — a new
learned table that skips the list turns the suite RED.

### 2.3 · `ctx.taskId` — one flag, both meanings (R-3, ratified)
- New OPTIONAL request field `taskId` on POST /api/cwf/chat
  (validate `^[A-Za-z0-9_-]{1,64}$`; invalid ⇒ 422 naming the field), threaded
  to `ctx.taskId`. Today no caller sets it (the future A2A server, #18, will).
- **taskId PRESENT ⇒ the four GLOBAL learn doors REFUSE** — every turn-time
  write path into tool_category_cache / router_proposals / backend_authority /
  entity_registry is gated. Locate each door; if a table has NO turn-time
  write door, do not add dead code — PIN that fact with a test instead. The
  refusal is VISIBLE: the `turn_done` ledger payload gains an additive key
  `cleanAgent: { taskId: <id>, skipped: [<door>...] }` — ABSENT when no
  taskId (empty≠zero), never an empty object on a normal turn.
- **User-scoped memory NAMESPACES:** `episodes` and `semantic_memory` writes
  carry `task_id`; retrieval (episodic + semantic + routine) filters to the
  SAME task_id when present, and to `task_id IS NULL` when absent. Within-task
  multi-turn memory works; cross-task is zero; the production NULL path is
  BYTE-IDENTICAL to today (regression-pinned).

### 2.4 · Endpoint `api/admin/learning-snapshot.ts`
Gated on ONE new permission `learning:manage` (`shared/permissions.ts`,
super_admin ● — the trust:manage precedent; covers read too: snapshot content
is a dump of the learned layer).
- GET: live counts for the six tables (a failed count ⇒ that entry
  `{count:null, unreadable:true}` — NEVER 0) + snapshot list
  (id · name · created_at · created_by · manifest — the LIST never returns
  payload) + recent related audit rows.
- POST `{action:'take', name}` · `{action:'restore', snapshotId, confirmName}`
  · `{action:'wipe', confirmText}`. The server RE-CHECKS confirmName ===
  snapshot.name (and confirmText for wipe) — defense in depth beyond the UI.
  Each action = ONE `.rpc()` call (the TS layer must never orchestrate
  multi-step writes — pinned by test; atomicity lives in the SQL function).
  Response echoes the RPC's MEASURED return.

### 2.5 · Owner panel (ratified §2.5) — same phase, `src/components/admin/**`
New admin section "Öğrenme Görüntüleri":
- LEFT: live-count card for the six tables; `unreadable` renders as its own
  state, visually distinct from 0 (empty≠zero at the render layer).
- RIGHT: snapshot list (name · date · who · manifest counts).
- Actions: *Anlık görüntü al* (name input) · per-row *Geri yükle* ·
  *Temiz sıfırlama*. Both destructive actions open a dialog that (a) shows
  per-table impact from the manifest/live counts, (b) requires TYPING the
  snapshot name (wipe: a fixed confirm word shown in the dialog) — button dead
  until it matches. Results render from the endpoint's measured numbers; the
  live card refreshes; recent audit rows visible in the section.
- Clean-agent is NOT a toggle here — the panel only DISPLAYS task activity
  (`skipped:clean-agent` ledger rows). No internal identifiers (ADR/RULE/
  phase names) in user-facing copy; copy in Turkish, matching the panel's
  existing voice.

## 3 · OUT OF SCOPE — do not touch
Governed layer (`domain_rules` et al.) · any forgetting policy
(MEMORY-HYGIENE-Q is a separate ruled item) · entity discovery mechanics
(ADR-009 — the snapshot COVERS entity_registry, never changes how it is
produced) · applying the migration (Operator-only) · golden/prompt publishes
(freeze) · `messages` (C1: zero writes) · the A2A server itself (#18).

## 4 · TESTS (each pinned by a named mutation)
1. Take is single-call/single-transaction: TS layer makes ONE rpc; manifest
   equals payload-derived counts (mutation: derive manifest separately ⇒ dies).
2. Coverage tripwire (§2.2) — remove a table from LEARNED_TABLES ⇒ named
   test red.
3. Wipe counts are measured; the unreadable-count path ABORTS (mutation:
   fold unreadable to 0 ⇒ dies).
4. Restore is one rpc; partial-restore orchestration impossible in TS
   (mutation: split into two calls ⇒ dies).
5. Clean-agent zero-write + POSITIVE CONTROL: with taskId a learn write
   produces zero rows AND the ledger `skipped` entry; without taskId the SAME
   write produces a row (S66-1 — a path that never wrote proves nothing).
6. task isolation: two fake concurrent tasks never see each other's episodes/
   semantic rows; NULL production path byte-identical (regression pin).
7. `cleanAgent` ledger key ABSENT on a normal turn (empty≠zero).
8. Endpoint: confirmName server-side check (mutation: drop ⇒ dies); list
   never carries payload.
9. Panel: destructive button dead until the typed name matches (mutation:
   drop the check ⇒ named e2e/unit dies); unreadable count renders distinct
   from 0.

## 5 · GATES
- `typecheck:api`: BOTH tsconfig projects run SEPARATELY, both exit codes
  reported (root `npx tsc --noEmit` is FAKE GREEN — files:[]).
- Full unsharded vitest; CI on the PR head is the sole arbiter.
- `check:tenant-zero` green; do NOT copy `.env.local` into the worktree
  (it scans gitignored files — W-037).
- `rule26` e2e: the panel's three states (empty list · populated ·
  destructive dialog) @1280 and @1024, zero clip.
- Mapped areas touched (turn/**, persistence/**, api/admin/**, src/**) ⇒
  `npm run reseal`, mint the next docVersion, verify `check:doc-drift` green
  in worktree AND head modes. State the minted rev in the report (S92-1
  caveat above).

## 6 · REPORT (`docs/relay/PHASE-LEARNING-SNAPSHOT-1-report.md`)
Anchor + head SHA discipline (head not self-transcribed) · per-project
typecheck exits · suite before/after · touched files with one-line rationale ·
migration file path + explicit "NOT APPLIED — Operator-pending" line · every
deviation NAMED (ratified or reverted at review, never silent) · minted
docVersion · TAIL ANCHOR printed literally:
`TAIL: LEARNING-SNAPSHOT-1 v1 complete`

## 7 · AFTER (not your steps)
Merge via GO (second-merger orders included there) → Operator applies the
migration (`supabase db push`, G-gates, idempotence probe, verifyGrants incl.
the three functions under HARDEN-FN-PROBE-1) → the S93-1 LIVE PROOF, owner-
consented: `learning_snapshot_take('s93-birth')` on the real 1,047-row layer,
manifest vs live counts 6/6, then `learning_restore` FROM THAT SAME snapshot —
byte-identical round-trip, audit rows written. The organ measures on its
birthday, and the measurement is verified.

<!-- END · PHASE-LEARNING-SNAPSHOT-1-v1 -->
