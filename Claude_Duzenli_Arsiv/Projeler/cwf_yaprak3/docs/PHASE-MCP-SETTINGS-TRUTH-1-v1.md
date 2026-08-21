# PHASE-MCP-SETTINGS-TRUTH-1 · v1
**Lane: AG-2 · standalone (pre-Dalga-8 UI-truth program, owner ruling S101) · parallel to PHASE-CENSUS-CONSOLE-2 (AG-1). Declared merge order: AG-1 merges FIRST; AG-2 rebases on post-census master before final push (the shared `TabPurposeStrip` component and the seal/docVersion singleton both resolve by this order). NO migrations. NO turn-pipeline contact.**

**PRECONDITION (S47-1):** branch from `origin/master` at `2caaffba383a3bb0485d9d8438a5a07ee7d9747d` (rev 262) or later IF the only intervening merge is census-console-2. Anything else on master → STOP and report.

**Branch:** `phase/mcp-settings-truth-1` · push · PR against `master` (unsharded CI is the arbiter; on a PR, `total_count:0` is ALWAYS FAILED).
**Report:** `docs/relay/PHASE-MCP-SETTINGS-TRUTH-1-report.md`

---

## 0 · THE DISEASE (owner-observed on prod bc5372f, Architect-verified live)

Verified DB facts this phase answers (re-read them yourself first, S65-1):
- `public.backends`: `tk-temp` `lifecycle=draft, enabled=true` — its server row is gone from `mcp_global_settings.servers` (JSON), yet **4 `backend_tools` rows** exist for it (catalog-sync ran during the server row's brief life). Draft card offers only verify/Publish → **draft has NO EXIT** (no retire, no delete), and verify cannot succeed with zero attached server rows — the screen never says why.
- `mount-probe`: global server JSON entry has **no `active` key at all (null)** while `backends` says `enabled=true, lifecycle=paused`. Three switch organs (JSON `active` · `backends.enabled` · `backends.lifecycle`) share the word "active" and are never rendered as a join.
- Layout: content column is fixed-width (~half of a wide viewport), URLs truncate, horizontal shuffling required.

**Law of the phase:** two different truths must never look like one truth disagreeing. And: the no-delete law protects HISTORY, not rows — a never-published draft with only sync-class children has no history.

## 1 · LIVE-READ FIRST (D-1 / S65-1) — paste into report
- `src/components/admin/MCPSettingsTab.tsx` (current structure, all three switch renderings).
- The serve-wire path from S100 (`RELAY-LIFECYCLE-SERVE-WIRE-1` outcome in code): where `lifecycle` actually gates serving, and what `backends.enabled` still does today (if anything — if it is dead, SAY SO with the grep).
- The JSON server schema as written by the UI (which keys exist, which are optional) + the FK child list of `public.backends` read live from `pg_catalog` (10 tables today — compute, don't copy).

## 2 · REQUIREMENTS

**R1 — One card per backend identity, servers nested inside.** The page reorganizes around backend identity: each identity card shows `lifecycle` state machine (draft→active⇄paused→retired) as THE headline state, and its attached server rows (global + personal, matched by the JSON `backend` key; `null` = "runs under the armes identity" stated in words) nested under it with their own toggles. Orphan server rows (backend key naming a nonexistent id) and orphan identities (zero server rows) are called out in a sentence, not implied by layout.

**R2 — Vocabulary law.** "Active" is reserved for `lifecycle=active`. The server-row toggle is renamed **"serving"**. `backends.enabled`: live-read its consumers; if dead code, remove the column FROM THE UI ONLY and file the finding (column removal is a later migration, not this phase); if alive, render it under its true name and one-sentence meaning. A missing JSON `active` key renders as "serving (default)" — a default must be readable as a default (empty≠zero at the render layer).

**R3 — The rendered join.** A server toggle under a paused/draft/retired identity shows an inline consequence line: "backend paused — toggling this serves nothing until resumed." Computed from the same fetched state, deterministic, no LLM.

**R4 — Draft exit: computed delete + universal retire.**
- `retire` becomes available from EVERY state including draft.
- `delete` exists ONLY for `lifecycle=draft` AND passes a live child census across ALL FK-referencing tables of `public.backends`, with the table list derived at runtime from `pg_catalog` (S94-2; never a hardcoded nine/ten). Classification: **sync-class** children (`backend_tools`, `backend_health`) are deleted in the same transaction; ANY row in any other referencing table → delete REFUSED with the counted reason per table shown, retire offered instead. Unreadable census → REFUSED (fail-closed, verifyGrants three-way spirit: silent-green banned).
- Delete goes through the service-client repository path (no schema change → no migration). Every DELETE carries an explicit WHERE (S94-1 environment law).
- The immutability helper text gains the exception sentence: "a never-published draft with no governed history can be deleted; everything else retires."
- Retired identities collapse into an "archived" accordion, collapsed by default, so residue never pollutes the working view.

**R5 — Verify preconditions rendered.** The verify button on a draft with zero attached server rows is disabled WITH the reason sentence ("no server attached — add a server for this backend first"), never silently disabled.

**R6 — Layout hygiene.** Content column becomes responsive full-width (sensible max ~1600px), URL cells get full-value tooltip + copy button, no horizontal scroll at ≥1280px. Purpose strip: import `TabPurposeStrip` (born in census-console-2) during the end-rebase and give this tab its one-sentence purpose + "what you do here" line.

**R7 — Prod cleanup is data, not keyboard.** After merge+deploy, the owner deletes `tk-temp` THROUGH THE NEW UI (that click is the acceptance test). No hand-SQL by anyone; the Architect will verify post-delete state live (S63-1 proof read: `backends` has no tk-temp, `backend_tools` count for tk-temp = 0).

## 3 · TESTS
Unit + render: child-census classifier (sync vs history, unknown table → refuse) · delete refused on any history row with per-table counts rendered · retire from draft · orphan server + orphan identity sentences · "serving (default)" for missing JSON key · consequence line on paused identity · responsive container snapshot. Property: delete admissible ⇒ every remaining referencing table count is 0 after transaction.

## 4 · DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/mcp-settings-truth-1
report: docs/relay/PHASE-MCP-SETTINGS-TRUTH-1-report.md
pr: against master, unsharded CI green (total_count:0 = FAILED)
proof: post-deploy proof read named in report (S63-1) = owner deletes tk-temp via UI, Architect confirms zero residue live; owner reads mount-probe card and states its serving/lifecycle truth unaided
```
Merge `--no-ff` after Architect GO only. Reseal only if the tree changed (S100-1); docVersion bump rides the same commit.

<!-- END · PHASE-MCP-SETTINGS-TRUTH-1-v1 -->
