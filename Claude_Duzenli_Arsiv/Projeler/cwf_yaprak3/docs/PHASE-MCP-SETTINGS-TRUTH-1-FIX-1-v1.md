# PHASE-MCP-SETTINGS-TRUTH-1-FIX-1 · v1
**Lane: AG-2 · fixes six owner-observed, Architect-live-verified wrongs on the DEPLOYED build (fb42787). NO migrations. Declared merge order: AG-3 (stages-truth-1, minting rev 264) merges FIRST; this phase rebases after and mints rev 265 ONLY if a drift-mapped claim changes (check the redrawn governance diagram: if it says "draft-only delete", R1 changes that claim → redraw + reseal).**

**PRECONDITION (S47-1):** base `origin/master` at `fb427873…` or later IF the only intervening merge is stages-truth-1. Anything else → STOP.
**Branch:** `phase/mcp-settings-truth-1-fix-1` · push · PR (unsharded CI arbiter; total_count:0 = FAILED).
**Report:** `docs/relay/PHASE-MCP-SETTINGS-TRUTH-1-FIX-1-report.md`

## Live facts (Architect-verified this session; re-read yourself, S65-1)
- `tk-temp`: `lifecycle=retired`, 4 `backend_tools` rows persist. Owner clicked retire, not delete; delete is draft-only today → permanently undeletable under current law.
- `backend_tools`: armes=150 (141 real + 9 foreign: 5 `knowledge_*`, 4 gateway meta), superset=26 while its card says "verified: 4". CatalogSync never prunes; backend-less personal rows default-attributed their tools to armes.
- Personal machine-knowledge-base row renders `?token=mkb_v1_…` in clear with a copy button.
- `system` card offers pause/retire.
- Every server row shows "not probed" while identities say "verified N tools, X min ago".

## REQUIREMENTS
**R1 — Delete law generalized to history, not state.** Delete is admissible for `draft` AND `retired` identities whose census finds ZERO history-class rows (same computed 14-table census, same fail-closed refusals, sync-class deleted in-transaction). Rationale recorded in place: the invariant protects governed HISTORY; a never-published retired identity has none. Retired cards in the archived accordion gain the delete affordance under the same census. This rescues `tk-temp` — the owner's click becomes possible again.
**R2 — Census scope excludes retired.** The Tool Census summary/vendor totals count only non-retired identities; retired identities appear (if at all) as one collapsed "retired: N tools not counted" line. YOUR-actions stops counting phantom work.
**R3 — Catalog reconcile + attribution truth.** (a) verify/sync becomes reconciling: rows in `backend_tools` for that identity not present in the fresh catalog are DELETED in the same pass (explicit WHERE; count reported in the UI result line). (b) `backend_id` becomes REQUIRED on server-row save; the "default: runs under armes" path dies for new rows. (c) Existing backend-less rows render a loud chip — "attributed to armes by default — assign its true backend" — with the edit affordance; after assignment, re-verify of armes and superset must heal counts to the true catalogs (armes 150→141, superset 26→fresh). Post-deploy proof includes those two numbers read live.
**R4 — Secret masking at render.** Any query-string credential (`token=`, `key=`, `apikey=`, `secret=` — pattern list in code, case-insensitive) renders masked (`?token=•••`) everywhere the URL appears, copy button copies the UNMASKED value only behind an explicit "reveal to copy" step, and the row gains a warning chip: "inline secret — move to the secret store". No secret ever appears in the DOM by default (ADR-007 at the render layer).
**R5 — `system` is INVARIANT.** Pause/retire (and delete) are absent — not disabled-grey, ABSENT — on the `system` identity, replaced by one sentence naming the layer (ADR-012: platform invariant). Guard lives in the view-model with a test.
**R6 — Probe vocabulary reconciled.** Either the row status reflects the identity's last verify (with its timestamp) or the dead "not probed" chip is removed; whichever the live wiring supports, one truth remains. Say which in the report.

## TESTS
Delete-from-retired admissible/refused paths · retired-excluded summary math · reconcile prunes exactly the stale set (fixture) · required-backend_id rejects null on save + loud chip on legacy rows · masking property (no listed credential pattern reaches the DOM unmasked; reveal-to-copy works) · system guard absent-not-disabled · probe status single-truth.

## DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/mcp-settings-truth-1-fix-1
report: docs/relay/PHASE-MCP-SETTINGS-TRUTH-1-FIX-1-report.md
pr: against master, unsharded CI green (total_count:0 = FAILED)
proof: post-deploy (S63-1) = owner assigns the two backend-less personal rows, re-verifies armes+superset, deletes tk-temp from the archived accordion; Architect reads live: backend_tools armes=141, superset=fresh-count, tk-temp rows=0, backends has no tk-temp
```
Merge `--no-ff` after Architect GO only; reseal only if a mapped claim changed (S100-1).

<!-- END · PHASE-MCP-SETTINGS-TRUTH-1-FIX-1-v1 -->
