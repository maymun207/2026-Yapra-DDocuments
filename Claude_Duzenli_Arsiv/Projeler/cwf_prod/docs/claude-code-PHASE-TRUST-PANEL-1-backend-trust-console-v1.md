# claude-code · PHASE TRUST-PANEL-1 — Backend Trust Console · v1

<!-- claude-code-PHASE-TRUST-PANEL-1-backend-trust-console-v1 · rev 1 · 2026-07-09
     Design source of truth: cwf-trust-panel-1-design-v1.md (owner-ratified incl. §2:
     personal-draft REJECTED for authority; parity = A3 lens read-preview + mandatory
     pre-commit authorityDiff modal + reset-to-reference).
     Anchor: origin/master 24cc1ef · 1503 tests / 152 files / docVersion rev 56 / drift [OK].
     ONE clarifying question budget. Execute the spec; do not redesign. -->

## §1 · PRE-FLIGHT (hard — abort on any failure)
1. `git fetch && git rev-parse origin/master` → `24cc1ef025e171068a8ac682de2e1ac64419a612`.
2. Branch `feat/trust-panel-1` off the pin; clean tree; baseline **1503/152**; drift `[OK]`;
   `typecheck:api` + `tsc -b` + `vite build` clean.
3. Grep-verify anchors (STOP + report on mismatch):
   - `supabase/migrations/20260628120000_backend_trust_registry.sql` — `backend_authority`
     PK(backend_id, metric), FK ON DELETE RESTRICT (:43-48), write-revokes (:70-73).
   - `knowledge/reference/backendTrust.ts` — `REFERENCE_BACKEND_TRUST` (armes 3 metrics :59,
     superset [] :65), `FLOOR_TRUST` (:40-45); note where `METRIC_IDS` is imported from.
   - `replay/trustSlice.ts` — the pure `authorityDiff` computation (locate its exact export).
   - `scripts/verifyGrants.ts:72` — `PROBES_COVERAGE_EXEMPT` = [BACKENDS, BACKEND_AUTHORITY];
     locate `scripts/verifyBackendTrust*` and read what it uniquely proves.
   - `shared/permissions.ts` — zero TRUST/BACKEND capability hits; find the role→caps matrix.
   - `api/admin/replay-quota.ts` + the provider_audit migration — the gate + audit postures
     you will mirror.

## §2 · HARD CONSTRAINTS
- Secrets env-only; no new runtime npm deps; bilingual `t()` for every new string; RULE 1
  constants; RULE 16/26 both legibility gates green; merges `--no-ff`; do NOT merge — the
  Architect reviews the pushed branch first.
- **ZERO new SQL functions** (the Q1-FIX-1 lesson stays moot by construction). ONE forward
  migration, table+RLS+revokes only. Table write-revokes use the ALL-GRANTEES form for every
  statement (`from anon, authenticated` on table privileges — mirror the provider_audit file's
  exact posture after reading it; applied migrations stay untouched).
- **FROZEN (empty diffs, grep-pinned in §7):** `trustRegistry.ts` (the read seam) ·
  `evalGate.ts` · `configFingerprint.ts` · the A3 lens endpoint wiring in `api/admin/replay.ts`
  · `prompt/**` · `grounding/**`. Exception: `replay/trustSlice.ts` may ONLY change to
  re-export the relocated pure diff (§4.1) — its test assertions stay byte-identical.
- **A3 invariant is law:** authority maps are NEVER unioned; no draft persistence for
  authority anywhere (owner-ratified §2). If you find yourself adding a draft table/tier,
  STOP — that is the rejected design.
- Sealed docs state actual state: migration **"authored, Operator-pending"** until the flip.

## §3 · SERVER

### 3.1 Capability
`PERMISSIONS.TRUST_MANAGE` — granted ONLY to super_admin in the role matrix (absent from the
maker set; the QUOTA_MANAGE precedent, cite it in the comment). Capability-not-role everywhere.

### 3.2 Migration — `supabase/migrations/2026070918????_backend_trust_audit.sql`
Timestamp sorts after `20260709170000`. Append-only audit ledger:
```
backend_trust_audit (
  id uuid pk default gen_random_uuid(),
  ts timestamptz not null default now(),
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null check (action in ('grant','revoke','reset')),
  backend_id text not null,          -- TEXT on purpose: audit must outlive a backend row
  metric text,                       -- null on reset
  before jsonb not null,             -- sorted metric arrays (order is not a difference)
  after  jsonb not null,
  applied boolean not null default false
)
```
RLS on, NO client policies (service-role-only both directions — the user_chat_quotas posture);
revoke select/insert/update/delete/truncate from anon AND authenticated; comments state the
audit-or-alarm contract + the `applied` protocol (§3.3). Header: incident-free, but STATUS line
present. `notify pgrst` not needed (no RPC).

### 3.3 Repository — `persistence/repositories/BackendTrustAdminRepository.ts` (new)
Service-role. Reads: `listBackends()` (id, display_name, tier, tool_pattern, enabled),
`listAuthority()` (all rows), `listAudit(backendId, limit)` (bounded, constant in
shared/dbConstants). Writes — grant/revoke/reset each follow the **audit-first protocol**
(no-tx honesty; test-pinned all three legs):
1. INSERT audit row with before/after (both metric arrays SORTED — trap #3) and
   `applied:false`. Insert failure → ABORT, no mutation, throw (alarm).
2. Mutate `backend_authority`: grant = upsert-if-absent; revoke = delete the (backend, metric)
   row; reset = DELETE all authority rows for the backend, then INSERT the
   `REFERENCE_BACKEND_TRUST` metrics — authority rows ONLY, never the backends row
   (FK RESTRICT — trap #2). Mutation failure → UPDATE nothing further, throw; the
   `applied:false` audit row STANDS as the record of the failed attempt + `[TrustPanel] ALARM`
   console line.
3. UPDATE the audit row `applied:true`. Update failure → throw + ALARM (the mutation is live
   but the ledger says false — loud, never silent; comment this asymmetry).

### 3.4 Endpoint — `api/admin/backend-trust.ts` (new)
`ensurePermission(TRUST_MANAGE)` on EVERY method (403 shape tests per method).
- **GET** → `{ backends: [...∪ per-backend authority metrics (sorted) ∪ driftedFromReference
  boolean (sorted-array compare vs the reference decl) ∪ lastAuditTs], allowedMetrics }` —
  `allowedMetrics` = the METRIC_IDS union ∪ currently-granted metrics, computed SERVER-side
  (the client never hardcodes metric ids).
- **PUT** `{backendId, metric}` grant · **DELETE** `{backendId, metric}` revoke — 422 unless
  `metric ∈ allowedMetrics` and `backendId` exists; idempotent no-ops (grant existing / revoke
  absent) return 200 `{changed:false}` WITHOUT an audit row (a no-op is not a change —
  test-pinned).
- **POST** `?reset` `{backendId}` — 200 with the applied diff; resetting an already-reference
  backend = `{changed:false}`, no audit row.
- Every changed:true response includes the post-write authority array + the audit id.
  Effect timing note is a UI concern; the server adds nothing.

### 3.5 Probe unification (in-phase, same sub-phase — trap #5)
- PROBES += `backends`, `backend_authority` (UPDATE probes on harmless columns), and
  `backend_trust_audit`. DELETE `PROBES_COVERAGE_EXEMPT` and its two entries.
- `grantPolicy.ts`: classify `backend_trust_audit` SERVER_ONLY; verify backends/backend_authority
  classifications already exist (add if the coverage test demands).
- Reconcile `verifyBackendTrust`: whatever it uniquely proves beyond the new PROBES rows stays;
  pure duplication is removed with a comment pointing at the unified registry. Coverage tests
  green in the SAME commit as the exemption removal.

## §4 · CLIENT

### 4.1 Shared pure diff — `shared/authorityDiff.ts` (relocation, the quotaMath pattern)
Move the pure authorityDiff computation out of `replay/trustSlice.ts` into `shared/` (content
unchanged except the docblock path note); `trustSlice.ts` re-imports/re-exports so every A3
test passes with byte-identical assertions. Client imports from `shared/` only.

### 4.2 `BackendTrustPanel` — new GOVERN panel (follow the OA-10 panel registration pattern)
- **Table** per design §4: name + id HashChip · tier badge · enabled dot · tool_pattern ·
  authority chips with inline `+` and per-chip `×` · "≠ reference" badge + Reset button when
  drifted. All read-only except the three actions. Loading skeleton / error-with-retry /
  honest empty states; no layout shift.
- **Diff confirm modal (mandatory — no instant commits anywhere):** computes added/removed via
  `shared/authorityDiff` from the CURRENT table state + the proposed change; cause sentence per
  action — tr: `'{metric}' yetkisi {backend} için scope-sapma tespitini susturur; bu zayıflama
  Scope lens'te authorityDiff olarak görünür.` · en: `Granting '{metric}' silences
  scope-divergence detection for {backend}; this weakening will appear as authorityDiff in the
  Scope lens.` (revoke = re-arms wording; reset = full before→reference diff list). Confirm
  button labeled by consequence — tr: `Dedektörü sustur` / `Dedektörü yeniden kur` /
  `Referansa sıfırla` · en: `Silence detector` / `Re-arm detector` / `Reset to reference`.
  Footer line: tr: `Bir sonraki turn'de etkili · Scope lens'te şimdi görünür` · en:
  `Takes effect next turn · visible now in the Scope lens`.
- **Audit drawer** per backend: last N rows (actor · action · metric · relative time ·
  `applied:false` rows rendered with a warning glyph + tooltip "attempted, not applied");
  empty state tr: `Henüz güven değişikliği kaydı yok` · en: `No trust changes recorded yet`.
- **Scope-lens adjacency button** per backend row: deep-links the MICROSCOPE A3 scope lens with
  the backend preselected (locate the ReplayTab/lens URL-state mechanism and use it; if none
  exists, the minimal addition is a query-param the lens reads on mount — disclose it).
- `adminService` methods mirror the endpoint; `.admin-theme` tokens; humanization utils from
  Q-1 (`usageFormat` relative time) reused, not duplicated.

## §5 · SUB-PHASES (gated)
- **T1** capability + migration + repository + §3.5 unification (+tests). Gate: coverage tests
  green with the exemption GONE; audit-first protocol tests (3 legs incl. both failure
  asymmetries); migration greps.
- **T2** endpoint (+tests). Gate: per-method 403s · 422 unknown metric/backend · idempotent
  no-op = no audit row · reset RESTRICT-safety (backends row untouched — assert) ·
  drift flag sorted-compare (row order ≠ drift).
- **T3** shared diff relocation + panel + modal + drawer + adjacency (+tests). Gate: A3 suites
  byte-identical; adminLegibility green with the panel enrolled; modal-mandatory pin (no
  service call reachable without the confirm path); i18n keys tr+en listed.
- **T4** seal: CHANGELOG (honest status: migration authored, Operator-pending) · reseal only if
  narrative tabs move (a new GOVERN panel likely moves the admin tab — if so rev 56 → **rev 57**,
  drift `[OK]`; if not, say so explicitly) · two-commit seal if resealing, else one · push
  branch · report. NOT merged.

## §6 · REQUIRED TESTS (report per-suite counts; more where honest, never fewer)
Repo: audit-first abort · mutate-fail leaves applied:false + alarm · applied-update-fail alarm ·
grant idempotence · revoke absent no-op · reset = authority-rows-only + reference parity + sorted
before/after. Endpoint: the T2 gate list + GET shape incl. allowedMetrics server-computed +
lastAuditTs. Client: modal renders diff + cause per action · confirm labels by consequence ·
no-instant-commit pin · drawer applied:false glyph · empty/error/loading states · panel
registration. Probes: coverage green post-unification. Shared: authorityDiff relocation suite
byte-identical.

## §7 · SELF-VERIFY (literal evidence; build-green alone = rejection)
1. Final suite total + files (expect ≥ 1503 + ~40; exact numbers) · typecheck/tsc/build clean ·
   oxlint zero new (A/B) · both legibility gates green · drift `[OK]` + docVersion literal
   (state which of rev 56/57 and why).
2. Frozen-path proofs pasted: `git diff 24cc1ef --` for trustRegistry.ts, evalGate.ts,
   configFingerprint.ts, api/admin/replay.ts, prompt/, grounding/ → EMPTY; trustSlice.ts diff
   pasted = re-export lines only.
3. Migration greps: `grep -c 'create or replace'` = 0 · the revoke lines pasted ·
   `grep -n 'authored, Operator-pending'` hit.
4. Probe proof: PROBES_COVERAGE_EXEMPT grep = zero hits; the three new PROBES keys pasted;
   coverage test names in passing output.
5. `git diff --name-only 24cc1ef..HEAD` — every path justified against §3/§4 (whitelist
   discipline; disclose edges as numbered least-deviations, the Q-1 precedent).
6. Commit shas + branch + remote hash. Architect merges after review with an explicit
   merge-commit message (do not merge).

## §8 · NON-GOALS (rejection if built)
Authority drafts/preview persistence of ANY kind · enabled/tier/backend-row CRUD · free-text
metrics · new SQL functions · lens changes beyond the optional preselect query-param ·
L2 metric-definition governance · applying the migration.

<!-- END · claude-code-PHASE-TRUST-PANEL-1-backend-trust-console-v1 · rev 1 · 2026-07-09 -->
