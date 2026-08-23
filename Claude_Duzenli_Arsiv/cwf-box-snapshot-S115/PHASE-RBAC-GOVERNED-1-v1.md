# PHASE-RBAC-GOVERNED-1 · v1
**Lane: AG-4 · S102 · Wave 8-2 (owner-approved order). Carries three sealed
owner rulings — they are REQUIREMENTS here, not context.**

**PRECONDITION (S47-1):** base = `origin/master` @
`fd02f69605cdaf18eaf752ea8d0aa418e1a4c6d7`. Parallel lanes: AG-3
`phase/qdrant-engine-1` (vectorLane + infra) — your fences are disjoint EXCEPT
`api/cwf/_lib/turn/mcpDiscovery.ts` is YOURS this wave (R4); AG-3's card does
not touch it. If master moved, report the new hash and continue.

**Branch:** `phase/rbac-governed-1` · push · PR (CI arbiter; `total_count:0` =
FAILED, existence first — S101-L1).
**Report:** `docs/relay/PHASE-RBAC-GOVERNED-1-report.md`

## 0 · THE THREE SEALED RULINGS (owner, S102 — verbatim intent)

1. **RULING-PERSONAL-BACKEND-ISOLATION:** a personal backend has ZERO effect on
   global. It lives only in its owner's effective set and is invisible to every
   other user's turn, query and tool set through ALL channels — read, merge,
   write, execution, **and cache**. Every user is a power user in their own
   sandbox. Cross-user visibility exists only for super_admin, only at
   existence+brokenness level (secrets masked), every such read audited.
2. **F-S101-ANON-AUDIT-GRANT (and its newly measured sibling):** the redundant
   anon grant surface is narrowed. Live read (Architect, S102, pg_catalog +
   policy — S101-L3 satisfied): `user_audit` anon SELECT grant with policy
   `private.is_super_admin(auth.uid())` (dead for anon) AND `mcp_settings`
   anon SELECT grant with policy `auth.uid() = user_id` (dead for anon). Same
   class, one sweep.
3. **F-S102-PERSONAL-ROW-CROSS-USER disposition ("ortası"):** the four
   backendless personal rows (measured live: account `d388d5c2…` 1 of 2,
   account `f85c7922…` 3 of 3) become VISIBLE to super_admin as
   existence+brokenness — row listed, `backend_id` assignable, secrets stay
   masked (reveal never crosses users), and every cross-user read writes an
   audit row. No blind unreachable config may exist.

## 1 · LIVE-READ FIRST (D-1 / S65-1)

Architect's reads (in this card): policies and grants above · four backendless
rows and their distribution · `toolDiscoveryCache` keyed by
`id|transport|url|args` — NO identity component (`mcpDiscovery.ts:50-55`) ·
merge law: `mergeMcpServers` pure, global array read-only, personal write path
keyed to server-derived `ctx.userId` (`mcp-settings.ts:117`), global write
gated by `CONFIG_GLOBAL`.

Your reads (paste before coding): the FULL anon/authenticated grant census
computed from `pg_catalog` (`has_table_privilege` per table × role) joined to
policies — the revoke list is COMPUTED from "grant present ∧ no policy can
pass for that role", never hand-listed. Any table where that computation is
ambiguous stays UNTOUCHED and is named in the report.

## 2 · REQUIREMENTS

R1 — **Clamp pattern lands as code:** the role→capability bundle lives in code
as the MAXIMUM (`shared/permissions.ts` family); DB rows may only NARROW, never
widen. A two-way test proves both: a row attempting to widen is refused loudly;
a narrowing row takes effect.

R2 — **Anon-grant sweep migration:** REVOKE the provably-dead anon grants from
the computed census (today's known members: `user_audit`, `mcp_settings`; the
census may find more — revoke only the provably-dead, name the rest).
Migration slots pre-assigned for this wave: `20260816120000_*` and (if a second
file is genuinely needed) `20260816120500_*` — the wave's migration budget is 2,
both are yours; AG-3 carries none. Author the SQL; the OPERATOR applies it via
`supabase db push` only (ADR-005). Post-apply proof, both directions: anon
probe returns `42501` (PASS) on revoked tables; an authenticated owner-scoped
read still succeeds; super_admin path unchanged. `delete … where true` never
appears (S94-1 context: this is grants, not data — zero data rows touched).

R3 — **Cross-user existence view (ruling 3):** super_admin surface listing
personal rows across users with owner, server id, `backend_id` (assignable),
brokenness verdict — secrets masked at the render layer with NO cross-user
reveal path, and each cross-user read INSERTs a `user_audit` row naming reader,
subject user, and reason. Two-way: a non-super_admin gets the absence (controls
ABSENT, not disabled — ADR-012); the audit row provably lands per read.

R4 — **F-S102-DISCOVERY-CACHE-CROSS-USER fix (mandatory scope, owner's
"bugların fix edilmesi lazım"):** the discovery cache key gains an
identity-distinguishing component so two users' same-URL personal servers can
NEVER share an entry. Global servers may keep a shared entry (one config, no
per-user auth divergence) — if you implement that split, prove it is the
GLOBAL row's entry that is shared, by provenance not by assumption. Two-way
test: same-URL different-user personal servers → distinct entries; repeated
same-user discovery within TTL → cache hit (the warm-path win survives).

R5 — **The five-channel isolation proof:** one test module asserting, channel
by channel — read (user filter), merge (global array untouched byte-wise),
write (personal path cannot reach global table), execution (turn tool set built
from `ctx.userId` only), cache (R4) — each with its negative twin. This module
is the ruling's enforcement site; the RULES/ledger entry for the ruling (a
LAW-LEDGER-2 concern) will point at it by path, so name it stably.

## 3 · GATES

`npm run test` · `typecheck:api` · `check:doc-drift` (admin UI + turn files are
mapped: reseal honestly; docVersion PROVISIONAL, single-file, re-derived at
merge turn checking in-flight AG-3 — S101-L2) · `check:tenant-zero` ·
`relay-audit [OK] kind=phase` · CI on PR head, `total_count >= 1`.

## 4 · DELIVERABLES

```
branch: phase/rbac-governed-1
report: docs/relay/PHASE-RBAC-GOVERNED-1-report.md
```

Post-merge proof (S63-1, named now): Architect re-runs the anon probes live
(42501 on both tables), reads one audited cross-user row from `user_audit`,
and re-reads the cache-key shape from the deployed head. Migration applies via
Operator with the project fence `fjbrkimwvtpwoxhziidh` in its prompt. Merge
`--no-ff` only after Architect GO.

TAIL-ANCHOR: PHASE-RBAC-GOVERNED-1-v1
