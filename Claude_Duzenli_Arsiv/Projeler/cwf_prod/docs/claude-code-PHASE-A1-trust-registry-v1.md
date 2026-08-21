# Claude Code — PHASE A1: Backend Trust Registry (DATA + read seam)
**Artifact: `claude-code-PHASE-A1-trust-registry-v1.md` · v1 · 2026-06-27**
*(Implements ADR-001 v2, Phase A — the registry half. Injection boundary is A2, separate.)*

> **Read this whole prompt before writing a line. This is a DATA + read-seam phase. It must ship ZERO
> change to runtime answer behavior.** Enforcement (authority routing, scope/trust validation) is Phase C.
> A1 lands the *declarations* and a *readable seam* with one load-bearing invariant — **unknown → floor** —
> and proves it against the live DB. If you find yourself wiring trust into `chat.ts`'s answer flow, STOP:
> that is Phase C and out of scope here. This mirrors P4.7's "ENABLEMENT = data now, behavior later."

---

## 0. HARD PRE-FLIGHT GATE (do all; paste evidence in the report; do not proceed on any failure)

1. `git rev-parse HEAD` → MUST be `6009b2d…` (the P6.8 re-seed commit). If not, stop and report.
2. `cat supabase/migrations/20260627160000_backends_registry.sql` → confirm the `public.backends` shape
   you are extending is EXACTLY: `id text pk, display_name, tool_pattern (check flat|gateway), enabled,
   created_at`; RLS = `backends_select_all` (SELECT using true) + **no** insert/update/delete policy
   (service-role-only writes). Quote the RLS block in the report.
3. `grep -n "BACKENDS" shared/dbConstants.ts` → confirm `DB_TABLES.BACKENDS = 'backends'` exists (RULE 1
   anchor you will extend).
4. `sed -n '73,82p' api/cwf/_lib/persistence/repositories/RuleStoreRepository.ts` → confirm
   `getBackends()` reads `DB_TABLES.BACKENDS` and returns `BackendRow[]`. This is the read-path you extend.
5. Confirm the seed/verify precedent you will mirror EXACTLY:
   `scripts/seedRules.ts` (service-role, idempotent, env-only, never prints secrets) and
   `scripts/verifySupersetRules.ts` (numbered live proofs incl. RLS-deny `42501`, outage-floor,
   self-clean). Open both; your new scripts copy their structure.
6. Accepted basis is **ADR-001 v2** (`trust_tier`/authority/scope-contract = gated DATA; unknown→floor;
   provenance/validators are B/C). If the repo's ADR copy is still v1, note it (owner places v2 in
   `docs/adr/`); proceed on v2's decision regardless.

**Migration-apply dependency:** you WRITE the migration file; the **owner APPLIES it via the Supabase MCP**
(the CLI is Unauthorized). The verify script (§5) can only pass after the apply. Your report must contain
the verify output, so coordinate: code+migration+scripts first → owner applies → run verify → paste.

---

## 1. SCOPE (build exactly this; nothing behavioral)

### 1.1 Migration — `supabase/migrations/20260628HHMMSS_backend_trust_registry.sql`
Structure + safe floor defaults ONLY. Values are seeded by the script in §3 (the seed-as-trusted-source
pattern, mirroring `seedRules.ts`). Order is load-bearing as in the existing backends migration.

- `alter table public.backends add column if not exists trust_tier text not null default 'unverified'
  check (trust_tier in ('system_of_record','reporting_mirror','enrichment','unverified'));`
  — **Default = the floor.** A backend that exists but is not explicitly declared is `unverified`. This
  is the schema-level expression of unknown→floor. (CHECK is a closed *governance vocabulary*, the same
  precedent as `tool_pattern`'s CHECK — it is NOT a backend-identity enum; `backend_id` stays a string FK
  per D10. Do not reintroduce a backend_id enum.)
- `alter table public.backends add column if not exists scope_identity jsonb not null default '{}'::jsonb;`
  — per-backend scope-identity contract DATA. Document the shape in a SQL comment (see §1.2). **Stored
  only** in A1; consumed in B/C. Do not read it at runtime here.
- New table `public.backend_authority` — one row per (backend, metric) the backend is authoritative for:
  ```
  create table if not exists public.backend_authority (
      backend_id text not null references public.backends(id) on update cascade on delete restrict,
      metric     text not null,
      created_at timestamptz not null default now(),
      primary key (backend_id, metric)
  );
  ```
  RLS: `enable row level security;` + `backend_authority_select_all` (SELECT using true) + **no** write
  policy (service-role-only) — mirror `backends` exactly. A backend can never declare its own authority.
- `comment on column public.backends.trust_tier is '...'` and on `scope_identity` and on
  `backend_authority` — short, accurate; state "service-role-only DATA; unknown→floor".
- End with `notify pgrst, 'reload schema';`.

Idempotent (`if not exists` / `add column if not exists`). The two existing rows (armes, superset) take
`trust_tier='unverified'` until the seed elevates them — correct: even known backends are at the floor
until *declared*.

### 1.2 Code reference baseline — `api/cwf/_lib/knowledge/reference/backendTrust.ts`
The immutable code declaration that is (1) the seed source, (2) the future reset-to-reference target,
(3) the **outage floor** (DB-down → serve this). Mirrors `referenceData.ts`/`KIND_REGISTRY`. Shape:

```ts
export type TrustTier = 'system_of_record' | 'reporting_mirror' | 'enrichment' | 'unverified';

export interface ScopeIdentityContract {
  /** How this backend's result scope is read. 'zone' (ARMES) | 'datasource' (Superset) | 'none'. */
  scopeSource: 'zone' | 'datasource' | 'none';
  /** Dotted path / field hint where the scoping value lives in a result payload (B/C consume this). */
  scopeFieldHint?: string;
  /** Human note on naming convention (KB7 vs Granit etc.). */
  note?: string;
}
export interface BackendTrustDeclaration {
  backendId: string;
  tier: TrustTier;
  authoritativeMetrics: string[];      // [] for a mirror — authoritative for NOTHING
  scopeIdentity: ScopeIdentityContract;
}

/** THE floor — what an undeclared/unknown backend resolves to. Never authoritative. */
export const FLOOR_TRUST: Omit<BackendTrustDeclaration, 'backendId'> = {
  tier: 'unverified',
  authoritativeMetrics: [],
  scopeIdentity: { scopeSource: 'none' },
};

export const REFERENCE_BACKEND_TRUST: BackendTrustDeclaration[] = [
  { backendId: 'armes', tier: 'system_of_record',
    authoritativeMetrics: ['oee', 'fire', 'throughput'],          // K4 throughput, scrap/fire, OEE
    scopeIdentity: { scopeSource: 'zone', note: 'KB7 zones; scope = resolved zone, not a title.' } },
  { backendId: 'superset', tier: 'reporting_mirror',
    authoritativeMetrics: [],                                      // authoritative for NOTHING
    scopeIdentity: { scopeSource: 'datasource',
      scopeFieldHint: 'bound datasource_name',
      note: 'Scope = bound underlying datasource, NEVER the resource title. A "KB7"-titled dashboard '
          + 'bound to "Granit -" datasources is Granit data. (Self-reported field — a CLAIM, role-ceilinged.)' } },
];
```
Keep metric ids (`oee`/`fire`/`throughput`) as shared constants if a suitable home exists; otherwise add
a small `METRICS` const set (RULE 1 — no bare string literals duplicated across files).

### 1.3 `shared/dbConstants.ts` (RULE 1)
- Add `DB_TABLES.BACKEND_AUTHORITY = 'backend_authority'`.
- Add a `TRUST_TIER` const set mirroring `RULE_STATUS`/`KIND_CLASS`:
  `export const TRUST_TIER = { SYSTEM_OF_RECORD:'system_of_record', REPORTING_MIRROR:'reporting_mirror',
  ENRICHMENT:'enrichment', UNVERIFIED:'unverified' } as const;` + its derived type. The migration CHECK,
  the reference type, and this const must agree (one vocabulary, three consistent expressions).

### 1.4 Read seam — `api/cwf/_lib/backends/trustRegistry.ts`
A small DB-first/code-floor provider (mirror `DbKnowledgeProvider`'s warm→read + outage-floor shape;
D15). It does **not** alter any answer; it only makes trust *readable* for B/C.

- `getTrust(backendId: string): BackendTrustDeclaration` — **DB-first, code-floor, unknown→floor**:
  1. read tier/scope_identity from `backends` and metrics from `backend_authority` (via
     `RuleStoreRepository` — extend it with `getBackendAuthority()` and have `getBackends` already return
     the new columns since it `select('*')`s);
  2. if the DB read fails / is unconfigured (outage) → return the `REFERENCE_BACKEND_TRUST` entry, else
     `FLOOR_TRUST`;
  3. if the backend has **no row, or tier `unverified`, or no declaration** → return a floor declaration
     (`FLOOR_TRUST` with that backendId). **This is the invariant the whole ADR rests on: an unverified /
     unknown backend is never authoritative.**
- Optionally a `warm()` like the knowledge provider if you need it for the verify script; keep it minimal.
- **No import of this seam into `chat.ts` answer flow.** Wiring is Phase C.

---

## 2. EXPLICIT CONSTRAINTS / TRAPS (violating any = phase fails review)

- **No behavioral change.** `chat.ts`, `assemble.ts`, `gateway.ts`, the prompt packs, and the grounding
  validator are **untouched**. Prove it: `git diff --stat 6009b2d -- api/cwf/chat.ts
  api/cwf/_lib/prompt api/cwf/_lib/llm api/cwf/_lib/grounding` is empty. ARMES-only answers stay
  byte-identical because nothing reads trust yet.
- **unknown → floor is mandatory and tested.** A backend with no declaration is NOT trusted. This is not
  optional polish; it is the phase's reason to exist.
- **trust is service-role-only DATA.** RLS denies any client write to `trust_tier`/`backend_authority`.
  Prove with a `42501` deny (mirror `verifySupersetRules.ts`). The model NEVER sets a trust value.
- **DB-first / code-floor (D15).** Reference = seed + reset target + outage floor. Do NOT build the seam
  code-primary with the DB as an optional overlay. Outage → code reference (proven in verify).
- **backend identity stays `string` + FK (D10).** trust_tier CHECK is a closed governance vocabulary
  (like tool_pattern), not a backend-identity enum. No new enum on `backend_id`.
- **Secrets via env only.** Scripts read `SUPABASE_URL` / `SUPABASE_SECRET_KEY`; never print a token /
  service key / JWT. Never read or echo `.env*`.
- **Don't transcribe the Superset catalog** (RULE 9) — scope_identity declares a *contract*, not a tool
  list. **Don't touch CWF-DEMO.**

---

## 3. SEED SCRIPT — `scripts/seedBackendTrust.ts`
Mirror `seedRules.ts` exactly (service role, idempotent, env-only, non-throwing, never prints secrets):
- `update public.backends set trust_tier = decl.tier, scope_identity = decl.scopeIdentity where id = decl.backendId`
  for each `REFERENCE_BACKEND_TRUST` entry.
- `upsert` `backend_authority` rows `(backend_id, metric)` for each `authoritativeMetrics` entry
  (`onConflict: 'backend_id,metric'`); for a mirror (empty metrics) write none. Idempotent.
- Log counts only (e.g. "armes → system_of_record (3 metrics); superset → reporting_mirror (0)").
- Run line in the header comment: `npx vite-node scripts/seedBackendTrust.ts`.

## 4. TESTS (vitest) — `api/cwf/__tests__/trustRegistry.test.ts`
Pure, no network. At minimum:
- **unknown → floor**: `getTrust('totally-unknown')` → tier `unverified`, `authoritativeMetrics` `[]`,
  `scopeIdentity.scopeSource === 'none'`.
- **declared armes** (via a mocked/seeded provider) → `system_of_record`, metrics include
  `oee/fire/throughput`, scopeSource `zone`.
- **declared superset** → `reporting_mirror`, **metrics empty** (authoritative for nothing), scopeSource
  `datasource`.
- **outage floor**: a provider with a null/failing client → returns the *reference* (not a throw, not an
  empty), proving the code floor holds when the DB is down.
- vocabulary consistency: the `TRUST_TIER` const, the reference `TrustTier` type, and the migration CHECK
  list are the same four values (a simple set-equality assertion against `TRUST_TIER`).

## 5. LIVE VERIFY — `scripts/verifyBackendTrust.ts`
Mirror `verifySupersetRules.ts` (service role for reads/seed; anon/publishable key for the RLS-deny;
env-only; never prints secrets; self-cleans anything it writes). Numbered proofs against the REAL DB:
1. **structure present**: `backends.trust_tier` + `backends.scope_identity` + `backend_authority` exist
   (a select succeeds).
2. **seed present**: armes = `system_of_record` with metrics {oee,fire,throughput}; superset =
   `reporting_mirror` with **zero** authority rows.
3. **unknown → floor**: `getTrust('__nope__')` → `unverified` / [] / scopeSource none.
4. **RLS deny (`42501`)**: a non-service-role client cannot `update backends set trust_tier=...` and
   cannot `insert into backend_authority`. Both denied.
5. **outage floor**: a simulated DB-down trust seam falls back to the code reference and STILL returns
   armes=system_of_record / superset=reporting_mirror.
Print a clear PASS/FAIL per numbered proof (the `verifySupersetRules` "N/N LIVE" style). Make NO live MCP
calls.

## 6. DOCS (RULE 3 — part of "done")
- `.agents/CHANGELOG.md`: one line — Phase A1, trust registry DATA + read seam, unknown→floor, no
  behavioral change.
- Update the skill/AGENTS KB note for the new tables/seam if such a doc exists.
- Add `docs/adr/` placeholder note if absent (owner places ADR-001 v2 there).

---

## 7. SELF-VERIFY CHECKLIST (the report MUST contain evidence for each — a claim is not proof)

- [ ] Pre-flight gate §0: HEAD `6009b2d`; quoted `backends` RLS block; confirmed seed/verify precedents.
- [ ] Migration file pasted (full). Idempotent. CHECK vocabulary = the four tiers. `notify pgrst` present.
- [ ] **Owner applied the migration via Supabase MCP** (state it explicitly; the verify output below is
      the proof it took).
- [ ] `git diff --stat 6009b2d -- api/cwf/chat.ts api/cwf/_lib/prompt api/cwf/_lib/llm
      api/cwf/_lib/grounding` → **empty** (paste it). No behavioral surface touched.
- [ ] `shared/dbConstants.ts` diff: `BACKEND_AUTHORITY` + `TRUST_TIER` added (no bare literals elsewhere).
- [ ] `trustRegistry.test.ts` output: unknown→floor, armes, superset, outage-floor, vocab-consistency all
      green (paste run).
- [ ] `verifyBackendTrust.ts` LIVE output: all 5 numbered proofs PASS, **including the `42501` RLS deny
      and the unknown→floor proof** (paste full output).
- [ ] No secrets printed anywhere in logs/scripts (confirm).
- [ ] Confirm: nothing in this phase reads trust during an actual chat turn (enforcement is C).
- [ ] CHANGELOG + KB doc updated.
- [ ] Commit message: `feat(phaseA1): backend trust registry — trust_tier/authority/scope-contract as
      gated DATA + read seam (unknown→floor); no behavioral change`. Report the new HEAD short SHA.

**Stop conditions (report instead of pushing through):** the `42501` RLS deny does NOT fire (trust is
client-writable → security hole, hard stop); unknown→floor returns anything other than the floor; any
behavioral file shows a diff; the migration can't be applied (report the Supabase MCP error verbatim,
minus secrets).
