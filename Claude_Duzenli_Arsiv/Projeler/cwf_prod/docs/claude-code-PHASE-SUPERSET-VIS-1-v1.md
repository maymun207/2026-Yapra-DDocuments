# claude-code-PHASE-SUPERSET-VIS-1-v1

<!-- claude-code-PHASE-SUPERSET-VIS-1-v1 · rev 1 · 2026-07-22 · Architect: Claude
     BLOCK 2 main phase. Implements cwf-superset-visibility-1-design-v1
     (off-repo, Architect-layer — every binding requirement is EMBEDDED below;
     do not go looking for the note). Amendments mint v1_2 (S37-1). -->

## PRE-FLIGHT (hard gate)
- Valid only while `origin/master == efb69107673083bc5dd489906092bc467bc7880f`
  and no other phase branch is open. On mismatch STOP and report actual state.
- Branch: `superset-vis-1`. FULL ceremony profile. Unsharded CI green on the PR
  head is a merge precondition (S37-2). Never merge yourself; Architect
  FAST-GATE reviews.
- **PLATINUM:** the capability must be fully self-configuring — connect a
  gateway backend → deep-discovery, mirroring, classification, refresh all
  happen with zero manual steps. The only human touchpoints permitted:
  optional annotation curation, consent-class publishes, and ONE single-click
  real-world test (G0's Sync click, below).
- **Secrets:** never read, print, or copy any token/key/Authorization value.
  All MCP calls ride the existing server-side resolution (env-ref/secret-store
  paths) untouched.

## CONTEXT (Architect-verified evidence — treat as given)
- Superset MCP advertises ONLY 4 entry-point tools over `listTools`
  (`search_tools`, `call_tool`, `get_instance_info`, `health_check`); its ~22
  inner tools (`list_charts`, `get_chart_data`, `generate_explore_link`,
  `list_datasets`, …) are reachable ONLY through the search→call protocol.
  Live prod turns 82fa149e/5fdc339b (2026-07-22) prove the protocol works and
  returned 34 charts / 45 datasets / 28 dashboards.
- `backend_tools` mirror today: armes 141 active (+4 missing), superset 4
  active (the entry points). `backends.tool_pattern`: armes=flat,
  superset=gateway. `composeSuperset` consumes 6 governed kinds but NOT
  `superset.routing_hint` (0 rows, 0 consumers).
- METRIC-FLOOR-1 (merged `efb6910`) added `gatewayPreflight.ts` (ARMES-name
  misroute guard on `call_tool`) — leave its behavior byte-identical.

## BINDING BOUNDARIES (embedded from the design, non-negotiable)
1. **Model-facing surface UNCHANGED.** Inner tools are NEVER offered to the
   model. The 4 entry points remain Superset's only model-facing tools. A
   by-construction test (G2) pins this.
2. **Mirror posture:** inner rows are OBSERVATION data — missing≠deleted,
   system-synced, identical semantics to today's `backend_tools` rows.
3. **Eval-gate machinery untouched.** Governed rows publish via the existing
   gate; staging a publish job file is allowed, running it is NOT yours.
4. **empty≠zero:** failed/empty enumeration degrades honestly (gateway serves
   exactly as today); never fabricate catalog rows; outage only disables.
5. **No new turn-pipeline stage; no new cron.** Deep-discovery runs offline:
   on-connect sync, the panel's existing manual Sync affordance, and the
   existing mirror self-heal cadence.
6. **Do not touch:** eval-gate engine/stage-order/interpreter ·
   `routeKeywordLayer` extraction · `deriveCategories` matrix ·
   `gatewayProtocol.ts` rule content · router prompt text.

## GATES

### G0 · ENUMERATION PROBE — evidence first, then HARD STOP
Goal: PROVE the full-catalog enumeration strategy against the LIVE Superset
gateway before any schema or pipeline work.
- Implement `enumerateGatewayCatalog(server)` in a new
  `api/cwf/_lib/mcp/gatewayEnumerate.ts` as a PURE strategy over the existing
  server-side MCP execute path: exhaust the catalog via `search_tools`
  (design the paging/broad-query strategy yourself — e.g. per-tag/per-letter
  sweeps + `get_instance_info` as the inventory cross-check; dedupe on
  `tool_name`). Normalize each inner tool to `{tool_name, title, description,
  input_hint, annotations{readOnlyHint,destructiveHint}, tags}`.
- Wire it LOG-ONLY behind the EXISTING admin mirror Sync affordance for
  gateway-pattern servers: on Sync, run enumeration and log
  `[GatewayEnum] backend=superset strategy=<name> pages=<n> tools=<count>
  names=[…]` — NO mirror write, NO schema change in G0.
- Push the branch; the PR preview deployment carries it. The owner will click
  Sync TWICE in the preview admin panel (the phase's one sanctioned
  single-click test); the Architect reads preview logs for: full count,
  byte-stable name set across the two runs, zero errors.
- **REPORT G0 EVIDENCE AND STOP.** Do not proceed to G1 until the Architect
  reviews the enumeration evidence and issues GO. If `search_tools` cannot
  exhaust the catalog, report the actual reachable strategy honestly — the
  Architect re-scopes via a v1_2; never force it.

### G1 · MIGRATION + REPOSITORY (after Architect GO on G0)
- New migration: `ALTER TABLE backend_tools ADD COLUMN via_gateway boolean
  NOT NULL DEFAULT false;` — comment-documented, idempotent-guarded, RLS/grant
  posture inherited (no new grants). Migration is AUTHORED here,
  OPERATOR-PENDING (never applied by you); follow the standing all-grantees /
  verifyGrants conventions only if any grant statement is touched (none should
  be).
- `BackendToolsRepository`: read/write support for the column;
  `listByBackend` gains an optional `viaGateway` filter with the default
  preserving today's callers byte-identically (existing callers must see ONLY
  `via_gateway=false` rows — grep every caller and pin with tests, including
  `gatewayPreflight.loadArmesActiveToolNames` and the turn mirror path).

### G2 · DISCOVERY BRANCH + TURN-PATH GUARD
- The sync/on-connect mirror path branches on `toolPatternOf(backend_id)`:
  flat → byte-identical today; gateway → after the normal entry-point sync,
  run `enumerateGatewayCatalog` and upsert inner rows with
  `via_gateway=true` (missing≠deleted marking identical to flat).
- Turn-path guard: the model-facing tool assembly filters
  `via_gateway=false` structurally. NEW TEST (RULE-26-style
  by-construction): enumerate every offered tool def in a seeded
  gateway+flat scenario ⇒ assert none originates from a `via_gateway=true`
  row; plus a red-team seed (an inner row named like a flat tool) stays
  unoffered.
- Vitest note: new script-layer/API tests live under `api/cwf/__tests__`.

### G3 · PANEL SURFACING (no new tab)
- Existing MCP / Tool Matching panels list inner rows labeled
  "gateway-inner" with the backend chip; read-only in this phase (annotation
  curation rides existing affordances). Extend the dev-preview seedMock
  fixture in the SAME commit (dev-preview parity lesson) and the panels'
  RULE-26 coverage.

### G4 · ROUTING_HINT CONSUMER + AUTHORITY BASELINE
- `composeSuperset` consumes `superset.routing_hint` mirroring
  `composeArmes`'s pattern: governed rows render a "when to use the Superset
  gateway" section; ZERO rows → a CODE BASELINE (un-poisonable floor) with
  exactly two lanes:
  (a) BI artifacts — charts/dashboards/datasets/explore links;
  (b) prepared/HISTORICAL aggregates — servable WITH explicit source
      attribution; live/current values and ANY conflict defer to ARMES
      (system_of_record).
- Stage (do NOT run) a publish-job JSON seeding the same two lanes as
  governed `superset.routing_hint` rows (owner publishes via admin panel;
  normal eval gate; freeze-independent — these are NOT prompt.segment rows).
- Renderer/tests: with zero rows the composed slice is byte-identical to the
  new baseline; with rows, rows override (the existing pick() pattern).

### G5 · SELF-VERIFY (literal evidence; then report and await review)
[ ] G0 evidence: two-run byte-stable enumeration, count reported.
[ ] Migration authored, Operator-pending; repo callers pinned to
    `via_gateway=false` visibility (grep list included in report).
[ ] Turn-path guard test GREEN + red-team seed test GREEN.
[ ] Panel screenshot evidence from dev-preview fixture.
[ ] composeSuperset baseline/override tests GREEN; publish job staged.
[ ] Full unsharded suite + CI green; drift gate OK; RESEAL rev 131 → 132 in
    the doc commit; CHANGELOG + project-KB lessons.
[ ] grep proof: zero diff in the six do-not-touch surfaces.
[ ] Report: PR number, head SHA, CI status, origin/master unchanged
    (`efb6910`) — NO merge.

<!-- END · claude-code-PHASE-SUPERSET-VIS-1-v1 · rev 1 · 2026-07-22 -->
