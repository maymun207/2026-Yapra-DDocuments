# PHASE-MCP-SETTINGS-TRUTH-1-FIX-2 · v1
**Lane: AG-2 · third leg on the settings surface. Base `origin/master` = `8c610a70bab304464415181cf5a90049bb449ecd` (rev 265, deployed) or later. NO migrations in R1–R3; R4 is a FINDING ONLY (no schema change in this phase). Parallel-safe with AG-1's turn-question phase (disjoint files); if AG-1 lands first, rebase.**

**Branch:** `phase/mcp-settings-truth-1-fix-2` · push · PR (unsharded CI arbiter; `total_count:0` = FAILED).
**Report:** `docs/relay/PHASE-MCP-SETTINGS-TRUTH-1-FIX-2-report.md`

## 0 · OWNER-OBSERVED, ARCHITECT-VERIFIED
The owner clicked delete on retired `tk-temp` (prod, 8c610a7). Refused, listing ~45 tables as "the census could not be completed". The refusal is CORRECT under the law and the phase does not weaken it — the defect is the census's table UNIVERSE.

Live facts (verify yourself, S65-1; use `pg_catalog`, never `information_schema` — S94-2):
- Exactly **14** public tables carry a `backend_id` column; 10 of them are FKs to `public.backends`; the other 4 (`backend_trust_audit`, `entity_topology_edges`, `tool_behavior_census`, `tool_experience`) are census-protected by convention.
- `censusBackendChildren` probes EVERY table `listLiveTables()` returns, relying on PostgREST `42703` to mean "not a child". For tables the caller cannot read, the error arrives as a permission/schema-cache failure BEFORE any column verdict — correctly classed `unreadable`, and `judgeDelete` then refuses. So ~31 irrelevant tables veto a delete they have nothing to do with.
- `tk-temp` live: `lifecycle=retired`, `backend_tools`=4, and ZERO rows in every other `backend_id`-carrying table (Architect-verified) — i.e. genuinely admissible once the universe is right.

## REQUIREMENTS
**R1 — Census probes only columned tables.** Derive the probe set from the live catalogue: tables that actually carry a `backend_id` column (server-side, from `pg_catalog` via the existing SECURITY DEFINER catalogue path — do NOT hand-list 14 in code; the number is DATA). Tables without the column are `not-referencing` by DERIVATION, not by error-code interpretation. `42703` handling stays as a belt-and-braces fallback. Unreadable among the DERIVED set still refuses, per table, unchanged — the fail-closed law is untouched; only its jurisdiction narrows to tables that can hold a child.
**R2 — Refusal renders the two classes apart.** When a refusal happens, the dialog distinguishes "blocked by N rows in <table>" from "could not read <table>" and NEVER prints a wall of table names as one undifferentiated red block. Cap the visible list, say "showing N of M", keep the full list behind a disclosure.
**R3 — The legacy attribution chip is missing in the DOM.** The new "Add Server" form correctly requires a backend (`— not selected (required) —` + the warning). But the owner could not find the loud chip on EXISTING backend-less personal rows — Architect confirms 3 such rows exist for this account (`armes`, `honestbench`, `supersetArmes`) and none renders a chip on the deployed build. Diagnose to the byte (S73-1): is the chip conditioned on a field the live rows lack (`backend_id` absent vs. null vs. empty-string), or is it rendered only in a branch the personal list never enters? Fix, and assert with a fixture built from the LIVE row shape, not an idealized one.
**R4 — FINDING ONLY, do not fix here:** `has_table_privilege('anon','public.user_audit','select')` is **TRUE** on production (Architect-read this session) — the audit trail is anonymously readable. File as `F-S101-ANON-AUDIT-GRANT` with the live probe in evidence, mark severity high, and name RBAC-GOVERNED-1 (Wave 8, AG-4) as its home. No grant change in this phase — grants move through the Operator door (ADR-005), not a UI lane. SOTA-1 check performed: no criterion regresses by deferring; the fix needs a migration this phase is fenced from.

## Also record (no work): the probe vocabulary now shows real measurements on prod — `✓ 141 tools · 1308ms`, `✓ 4 tools · 253ms`, and `⚠ Auth failed (401) — this server offers no tools` on the personal `armesMes` row. That 401 is the standing answer to "why can I not activate it"; it belongs in the report as evidence the R6 vocabulary fix works, and the credential itself is the owner's to fix.

## TESTS
Derived probe set excludes non-columned tables and includes all columned ones (fixture from a catalogue stub) · unreadable inside the derived set still refuses, named per table · refusal dialog renders blocked-vs-unreadable separately with N-of-M capping · chip renders for a row whose `backend_id` is null AND for one where the key is absent · positive control: pre-fix code fails the chip test.

## DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/mcp-settings-truth-1-fix-2
report: docs/relay/PHASE-MCP-SETTINGS-TRUTH-1-FIX-2-report.md (R3 diagnosis to the byte; R4 finding with the live probe)
pr: against master, unsharded CI green (total_count:0 = FAILED)
proof: post-deploy (S63-1) = owner deletes tk-temp from the archive and assigns the three chipped rows; Architect reads live — backends has no tk-temp, backend_tools tk-temp=0, the three rows carry backend_id
```
Merge `--no-ff` after Architect GO only; reseal only if the tree changed (S100-1).

<!-- END · PHASE-MCP-SETTINGS-TRUTH-1-FIX-2-v1 -->
