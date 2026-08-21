# RULING-MCP-SETTINGS-TRUTH-1 · v1 — FK census reads via the catalogue RPC (no migration)
**For: AG-2 · amends PHASE-MCP-SETTINGS-TRUTH-1-v1 R4 in-flight (S37-1: the phase file itself stays immutable; this ruling is the binding delta). One relay, self-contained (D-2).**

## Decision
**Option 1.** The child census reads the live table list from the already-deployed `persistence_class_catalog()` (real pg_catalog, SECURITY DEFINER, service-role) and probes each listed table for `backend_id` references. NO new migration in this phase. Option 2 is rejected: it trades the phase fence and the R7 acceptance date for literal pg_constraint fidelity whose only added value — catching a future FK on a differently-named column — is already covered fail-closed by the database itself.

**Architect-verified backstop (live read, this session):** all 10 FKs referencing `public.backends` are RESTRICT (9) or NO ACTION (1: `kind_drafts`); **zero CASCADE**. A census miss can therefore never silently delete children — Postgres refuses with `23503`. Paste this table into your report as the ruling's evidence base and RE-VERIFY it yourself via the catalogue at build time (S65-1).

## Binding amendments to R4 (a)–(f)
**(a) 23503 is a first-class rendered path, not an exception.** Test: simulate census-miss → attempt delete → DB refusal surfaces in the UI as the refusal reason ("database refused: rows still reference this backend in <table>") — never a raw error toast, never a crash. The approximation's failure mode must be a readable truth.
**(b) Named finding, filed by you in the report:** `F-S101-FK-CENSUS-BY-CONVENTION` — census approximates the FK graph by the `backend_id` column convention; retire condition = a governed FK-introspection RPC riding the NEXT migration-bearing phase (do NOT open an Operator door now). SOTA-1 check performed: no SOTA criterion depends on true-FK introspection; delete safety is constraint-enforced.
**(c) Probe discipline:** counts are computed server-side (`count=exact` head / aggregate) — never row-fetch; PostgREST's 1000-row silent cap makes fetched-length a lie (partial≠complete).
**(d) Fail-closed, explicitly:** ANY probe error on ANY listed table (unreadable, timeout, unexpected shape) → delete REFUSED naming that table. Unreadable ≠ zero (empty≠zero at the census layer). Same three-way posture as verifyGrants: pass / refuse / inconclusive-therefore-refuse — no silent green.
**(e) Sync-class membership:** if `persistence_class_catalog()` exposes a persistence class usable as "sync/derived", derive the sync-class set FROM the catalogue and name the mapping in the report; only if it does not, keep the hardcoded `{backend_tools, backend_health}` pair and say so. Structure→code, data→catalogue.
**(f) Innocent-case probe (D-5):** one test fixture with a truly zero-child draft deletes cleanly end-to-end. Note `tk-temp` is NOT that case — it carries 4 sync-class `backend_tools` rows and therefore exercises the sync-delete transaction; both paths must be green before GO.

Everything else in PHASE-MCP-SETTINGS-TRUTH-1-v1 stands unchanged, including the merge order (AG-1 → AG-2 → AG-3) and R7's acceptance test.

<!-- END · RULING-MCP-SETTINGS-TRUTH-1-v1 -->
