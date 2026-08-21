# CWF — TRUST-PANEL-1: Backends & Authority Console — Design Note · v1

<!-- cwf-trust-panel-1-design-v1 · rev 1 · 2026-07-09
     Grounded at origin/master 24cc1ef (1503/152, rev 56, drift [OK] — flip verified this window).
     Register v29 #2 (owner-approved direction: "view tiers, grant/revoke gated — super-only
     write, capability-not-role, audit-or-alarm, verifyGrants probe in-phase, scope lens adjacent"). -->

## 0. Honest baseline (verified at HEAD)
- **Schema:** `backends` (`20260627160000:20-27`) — `id PK · display_name · tool_pattern
  flat|gateway CHECK · enabled · created_at`; public-SELECT policy, NO client write policy,
  write-revokes hardened at `20260628120000:70-71`. `backend_authority` (`20260628120000:43-48`)
  — `PK(backend_id, metric)`, FK→backends ON DELETE RESTRICT; SELECT-all policy; write-revokes
  `:72-73`. Table comment: **unknown→floor — no row = authoritative for NOTHING**; seeded from
  the code reference.
- **Code reference (HC-1's floor/reset target):** `knowledge/reference/backendTrust.ts` —
  `REFERENCE_BACKEND_TRUST` (armes: OEE/FIRE/THROUGHPUT `:59`; superset: `[]` `:65`) +
  `FLOOR_TRUST` authoritative-for-nothing (`:40-45`).
- **Runtime:** `backends/trustRegistry.ts` — DB-first / code-floor / unknown→floor; DB-down
  serves the reference, never empty (`:9-15, :85, :93-100`). The scope detector consumes it;
  A3's lens exposes the `{floor|live}` counterfactual and `authorityDiff` (pure fn in
  `replay/trustSlice.ts`, surfaced in `ReplayTab.tsx`).
- **THE GAP:** grant/revoke has **no UI and no endpoint** — `shared/permissions.ts` has NO
  trust/backend capability (grep: zero hits); the only write path is Operator SQL. The lens
  measures a surface nobody can steer through the product.
- **Probe posture:** `verifyGrants.ts:72` exempts BACKENDS/BACKEND_AUTHORITY from PROBES
  ("proven in verifyBackendTrust") — a special case this phase unifies away.

## 1. Scope (committed)
ONE new GOVERN panel **"Backend Trust"**: a backends table (id · display_name · tier ·
tool_pattern · enabled — **all read-only in v1**) with per-backend **authority chips**
(the metrics it may silence the detector for), and exactly THREE writes, all super-only:
**grant metric · revoke metric · reset-to-reference**. Plus a per-backend **audit timeline**
drawer and a **"Scope lens" adjacency button** deep-linking the MICROSCOPE A3 lens with the
backend preselected. Nothing else writes: `enabled`/`tier`/row-CRUD stay code/Operator-managed
(explicit non-goal — flipping `enabled` swings activeBackends at runtime; it belongs to a later
GOVERN-polish slice with its own blast-radius design).

## 2. The HC-2 tension — named and committed (owner ratifies)
R-B demands session-preview → personal-draft → super-publish for every governed family.
Authority is **polarity-inverse** (A3 standing rule): a grant SILENCES the scope detector; maps
are NEVER unioned; weakening must surface visible-with-cause. A **persisted personal-draft tier
is therefore REJECTED by design**: a per-user draft that silences detection makes the microscope
lie *per user* — the exact failure A3 exists to prevent. The parity contract is met the
polarity-honest way:
- **Read-preview** = the EXISTING A3 lens `{floor|live}` counterfactual (one click away — the
  adjacency button IS the session preview of both worlds).
- **Write-preview** = a MANDATORY pre-commit **authorityDiff confirm modal**: before any
  grant/revoke/reset commits, the panel computes the diff with the SAME pure `trustSlice`
  machinery and shows it with cause lines ("granting `oee` to `superset` silences
  scope-divergence detection for `oee` on that backend; this weakening will appear as
  `authorityDiff` in the lens" / revoke = "re-arms detection"). No blind writes exist.
- **Reset-to-reference** always available (HC-1's one-click reset; the reference decl is the
  target).
This is the one deliberate R-B narrowing in the program; it rides the same rationale that keeps
locks on detector mechanics. **Flagged for explicit owner sign-off with this note.**

## 3. Server design
- **Capability:** new `TRUST_MANAGE` in `shared/permissions.ts` — super_admin only, absent from
  the maker set (the QUOTA_MANAGE precedent). Capability-not-role everywhere.
- **Endpoint `api/admin/backend-trust.ts`:** `GET` → backends ∪ authority rows ∪ per-backend
  reference-drift flag (live≠reference) ∪ last-audit stamp; `PUT {backendId, metric}` grant;
  `DELETE {backendId, metric}` revoke; `POST ?reset {backendId}` replace live rows with the
  reference decl. Every op `ensurePermission(TRUST_MANAGE)`. Metric input is CONSTRAINED to the
  known `METRIC_IDS` union ∪ currently-granted rows (dropdown, no free text — granting an
  unknown metric silences nothing and pollutes the registry; L2's governed metric-definitions
  will widen this later).
- **Audit-or-alarm:** new append-only **`backend_trust_audit`** table (mirror the
  provider_audit posture: service-role-only write, gated super read): `id · ts · actor_user_id ·
  action grant|revoke|reset · backend_id · metric (null on reset) · before jsonb · after jsonb`.
  Every write = exactly ONE audit row in the same request; audit failure = the write fails
  (alarm, never silent).
- **Propagation:** writes go through the service repo; TrustRegistry is warmed per turn, so
  effect = next turn (state this in the UI's confirm modal footer); the lens's `live` axis
  reflects immediately via its own fetch. No cache-invalidation machinery is added.
- **Probe unification:** add PROBES rows for `backends`, `backend_authority`,
  `backend_trust_audit`; DELETE the `PROBES_COVERAGE_EXEMPT` entries (`verifyGrants.ts:72`) and
  fold whatever `verifyBackendTrust` uniquely proves into the standard run — one registry, zero
  special cases. No new SQL functions ⇒ the fn-lockdown gate is untouched (and today's
  `migrationFnLockdown` lesson: the ONE new migration is table+RLS+revokes only).

## 4. UX contract (human-first, §4.5 conventions carry over)
- **Table:** each backend row = name + id chip (HashChip copy), tier badge, enabled dot,
  authority chips with an inline "+" (grant) and per-chip "×" (revoke) — both open the diff
  modal, never instant-commit. A subtle "≠ reference" badge when drifted, with "Reset" beside it.
- **Diff modal:** added/removed metric lines with the cause sentence per §2; the confirm button
  is labeled by consequence — tr: `Dedektörü sustur (grant)` / `Dedektörü yeniden kur (revoke)`
  · en: `Silence detector (grant)` / `Re-arm detector (revoke)`; reset shows the full
  before→reference diff. Footer: "Takes effect next turn · visible now in the Scope lens".
- **Audit drawer:** last N rows (actor · action · metric · relative time), empty state honest
  ("No trust changes recorded yet"), loading skeleton, error-with-retry (never fake-empty on a
  failed fetch — the Q-1 render-layer rule).
- Bilingual `t()` everywhere; `.admin-theme` tokens; RULE 16/26 gates; no new deps.

## 5. Hidden traps (named)
1. **Polarity:** any reviewer "simplifying" grant→union or adding draft persistence is breaking
   A3's invariant — §2 is the contract.
2. **ON DELETE RESTRICT** on the FK means reset must be delete-then-insert of *authority* rows
   only — never touching the backends row.
3. **Reference drift flag** compares live rows to `REFERENCE_BACKEND_TRUST` — sort both; row
   order is not drift (the L1 fingerprint lesson).
4. **Audit before effect ordering:** insert audit + mutate in one repo method; a thrown audit
   aborts the mutation (test-pinned both ways).
5. The exemption removal (§3) will trip the coverage test until the PROBES rows land — do them
   in the same sub-phase, not across a gate.

## 6. Non-goals
`enabled`/`tier`/backend row CRUD · personal-draft authority (rejected §2) · free-text metrics ·
L2 metric-definition governance · lens changes (A3 is frozen) · any new SQL function.

<!-- END · cwf-trust-panel-1-design-v1 · rev 1 · 2026-07-09 -->
