# claude-code-PHASE-SUPERSET-VIS-1-v1_3

<!-- claude-code-PHASE-SUPERSET-VIS-1-v1_3 · rev 1.3 · 2026-07-22 · Architect:
     Claude. SUPERSEDES v1 and v1_2 (both immutable, S37-1).
     MID-FLIGHT HANDOVER: you may ALREADY be executing v1 on branch
     superset-vis-1 — do NOT restart, do NOT discard work; everything built
     under v1 is byte-compatible with this version. Reconcile forward: the
     ONLY deltas vs v1 are (1) G0's HARD STOP is REMOVED — build G0→G5 in ONE
     run (enumeration shortfall is design-safe, empty≠zero degraded state,
     never a blocker); (2) G0's stability proof is INTERNALIZED (one Sync
     click triggers an in-process double-run + byte-compare, PASS/FAIL in one
     `stable=` log line); (3) single end-of-phase Architect review.
     Everything else below is byte-carried from v1. BLOCK 2 main phase.
     Implements cwf-superset-visibility-1-design-v1 (off-repo,
     Architect-layer — every binding requirement is EMBEDDED below; do not go
     looking for the note). -->

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

### G0 · ENUMERATION STRATEGY — self-proving, NO stop, failure-safe
Goal: implement the full-catalog enumeration strategy with a built-in live
proof mechanism; then CONTINUE straight into G1 — enumeration shortfall is a
design-safe degraded state, never a blocker.
- Implement `enumerateGatewayCatalog(server)` in a new
  `api/cwf/_lib/mcp/gatewayEnumerate.ts` as a PURE strategy over the existing
  server-side MCP execute path: exhaust the catalog via `search_tools`
  (design the paging/broad-query strategy yourself — e.g. per-tag/per-letter
  sweeps + `get_instance_info` as the inventory cross-check; dedupe on
  `tool_name`). Normalize each inner tool to `{tool_name, title, description,
  input_hint, annotations{readOnlyHint,destructiveHint}, tags}`.
- **Internalized stability proof:** the Sync-triggered path for a
  gateway-pattern server runs the enumeration TWICE in-process, byte-compares
  the sorted `tool_name` sets, and logs ONE verdict line:
  `[GatewayEnum] backend=superset strategy=<name> pages=<n> tools=<count>
  stable=<true|false> names=[…]`. `stable=false` or a partial catalog is
  REPORTED, not fatal: the mirror write (G2) proceeds with whatever was
  stably enumerated (dedupe across the two runs' intersection), and the
  honest degraded state is logged — empty≠zero applied to discovery.
- The owner clicks Sync ONCE on the PR preview (the phase's one sanctioned
  single-click test); the Architect reads preview logs IN PARALLEL while you
  continue building — you do NOT wait for that read.
- **DO NOT STOP after G0.** Continue directly to G1. If the catalog is
  fundamentally unreachable (zero inner tools on both runs), still ship the
  full pipeline (it is generic); report the shortfall prominently in the
  final report.

### G1 · MIGRATION + REPOSITORY
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
[ ] G0 evidence: the `[GatewayEnum] … stable=<bool>` verdict-line mechanism
    unit-tested (stable + unstable + empty cases); live verdict read by the
    Architect from preview logs (not your responsibility to collect).
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
