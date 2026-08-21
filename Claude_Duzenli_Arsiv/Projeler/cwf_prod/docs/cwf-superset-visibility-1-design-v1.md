# CWF — SUPERSET-VISIBILITY-1 · Design Note · v1

<!-- cwf-superset-visibility-1-design-v1 · rev 1 · 2026-07-22 · Architect: Claude
     BLOCK 2 (master plan v5_2) main phase. Grounded @efb69107 (METRIC-FLOOR-1
     merged, rev 131). Companion evidence: S59 live turns 82fa149e/5fdc339b
     (gateway protocol works, catalog-depth only) + AG reads R1-FULL/R4/R6/R7.
     Amendments mint v2 — never in-place (S37-1). -->

**PLATINUM compliance:** the entire capability is self-configuring — connect a
gateway-pattern backend and the system deep-discovers, mirrors, classifies and
refreshes its inner catalog with ZERO manual steps. The only human touchpoints
are optional curation (annotation edits) and consent-class publishes. Any step
that would require hand-assembly is a design bug in this note; report it.

---

## 0 · Problem (owner-stated, evidence-verified)

Superset connects as a `gateway` backend: its MCP server advertises only 4
entry-point tools (`search_tools`, `call_tool`, `get_instance_info`,
`health_check`). The ~22 REAL inner tools (`list_charts`, `get_chart_data`,
`generate_explore_link`, `list_datasets`, …) are never advertised over the MCP
`listTools` protocol — so the existing discovery→mirror→classify→refresh
pipeline (proven on ARMES's 141 tools) is structurally blind to them. Nothing
in the system knows what Superset can DO; nothing can steer a query toward it;
the admin panel cannot show or govern its inner capability. The owner's product
expectation stands: *"connect any MCP — flat or gateway — and the system reads,
understands, classifies and injects it by itself."*

Two proven sub-gaps ride on this blindness:
- **Steering:** `superset.routing_hint` kind exists with 0 published rows AND
  zero code consumers (code-verified @a5be673) — nothing ever tells the model
  WHEN a query is Superset-shaped.
- **Depth:** live turns reached catalog level (34 charts, 45 datasets, 28
  dashboards listed) but never pulled chart DATA values.

## 1 · Goal

One generic, backend-agnostic capability: **gateway deep-discovery**. When a
backend's `tool_pattern` is `gateway`, the system enumerates the inner catalog
through the backend's own search surface, writes it into the SAME
`backend_tools` mirror as inner-tool rows, feeds it into the SAME governed
classification/annotation overlay and refresh loop, and gains a governed
consumer for `<backend>.routing_hint` so queries can be steered to the gateway.
Superset is the first customer, never a special case.

## 2 · Non-negotiable boundaries

1. **Model-facing surface UNCHANGED.** Inner tools are NEVER offered to the
   model directly; the model still enters Superset through the 4 entry points
   and the search→call protocol. The inner catalog feeds ROUTING, GOVERNANCE
   and the ADMIN PANEL — not the tool list. (Dumping 141+22 flat tools would
   destroy the gateway pattern's reason to exist.)
2. **Deterministic trust intact (ADR-001).** Discovery output is OBSERVATION
   data (the ROUTE-GOV-1 mirror posture: missing≠deleted, system-synced).
   Authority stays with trust tiers: ARMES `system_of_record`, Superset
   `reporting_mirror` — usable WITH attribution, never overriding ARMES on
   conflict. Historical/prepared metrics MAY be served from Superset with
   attribution; live/current metrics stay ARMES-authoritative.
3. **Eval-gate unbypassable.** All governed rows (annotations, routing hints,
   the authority-policy segment) publish through the existing gate. No gate
   machinery change; additive per-backend dispatch only if needed.
4. **empty≠zero extends to enumeration.** An empty/failed deep-discovery is an
   honest degraded state (gateway serves exactly as today) — never a fabricated
   catalog, never a crash. Outage only disables, never enables.
5. **No new turn-pipeline stage.** Deep-discovery runs OFFLINE (on-connect +
   panel Sync + the existing refresh cadence), never inside a chat turn.
6. **Path B contract honored (taxonomy v3 §9).** This phase implements the
   light half of the §9 ingestion chain (connect → enumerate → mirror →
   enrich); when Path B arrives, the encode/index steps mount BEHIND this
   without reshaping it.

## 3 · Design

### 3.1 · Deep-discovery (discovery branch)

`resolveMirrorTools` / the on-connect sync path gains ONE pattern branch:

- `tool_pattern='flat'` → today's path, byte-identical.
- `tool_pattern='gateway'` → after the normal 4-entry-point mirror sync, run
  **`enumerateGatewayCatalog(server)`**: page the backend's own search surface
  until exhaustion (Superset: `search_tools` with a paging/broad-query
  strategy proven by G0; `get_instance_info` as the inventory cross-check),
  normalize each inner tool to `{tool_name, title, description, input_hint,
  annotations(readOnlyHint/destructiveHint), tags}`.
- Write results to `backend_tools` as rows with a new nullable discriminator
  column **`via_gateway boolean NOT NULL DEFAULT false`** (migration,
  Operator-applied; all-grantees revoke per HARDEN-GRANTS-1/S30-1; RLS posture
  identical to existing `backend_tools`). `false` = a protocol-advertised tool
  (today's rows, untouched); `true` = an inner tool reachable only through the
  gateway. Missing≠deleted semantics identical; refresh marks `missing`
  exactly like the flat path.
- **Turn-path guard:** the turn's tool-def assembly MUST filter
  `via_gateway=false` — inner rows can never leak into the model-facing set.
  A dedicated test pins this (RULE-26-style by-construction: enumerate every
  offered tool ⇒ none is via_gateway).

### 3.2 · Governance overlay (reuse, not invent)

Inner rows enter the SAME surfaces ARMES tools have today:
- Admin panel (MCP/Tool Matching tabs) lists them, labeled "gateway-inner",
  with the backend chip — the owner can finally SEE what Superset can do.
- `superset.tool_annotation`-equivalent exposure classification (read|write)
  via the existing governed annotation kind pattern (F80 fail-closed:
  unclassified inner WRITE tools are reported in the panel; COMMAND-class use
  through the gateway keeps ALT-D honesty). Note: exposure here informs
  GOVERNANCE VISIBILITY + the G3 pre-flight's future generalization — it does
  not (yet) gate the gateway pass-through; that gating is a Path B/OPA item
  by contract.

### 3.3 · Steering: the routing_hint consumer + authority policy

- **`composeSuperset` consumes `superset.routing_hint`** (mirroring
  composeArmes's existing pattern): governed rows render a "WHEN to use the
  Superset gateway" section into the injected slice; with zero rows a CODE
  BASELINE serves (un-poisonable floor) stating the two ratified lanes:
  (a) BI artifacts — charts/dashboards/datasets/explore links; (b) prepared/
  historical aggregates — servable WITH attribution, ARMES wins conflicts.
- **Authority-policy line** added to the same baseline + as a seedable
  governed row: "prepared/historical metric data MAY be served from Superset
  with explicit source attribution; live/current values and conflicts defer
  to ARMES (system_of_record)." This is the owner's "geçen ayın OEE'si
  Superset'ten" lane, made law instead of luck.
- **Frame layer untouched.** No derivation-table change, no new categories in
  this phase: steering is prompt-side (the slice) because gateway tools bypass
  category filtering by construction. A future taxonomy `viz-directive` ride
  stays out of scope (taxonomy §6 already parks it).

### 3.4 · Refresh & health

Deep-discovery re-runs on: backend connect/edit, the panel's existing manual
Sync button, and the existing mirror self-heal cadence. `health_check` failures
flow into the existing `withholdUnhealthyBackends` path unchanged. No new cron.

## 4 · Phase plan (gated; FULL profile; one migration)

- **G0 · Enumeration probe (evidence-first).** A read-only script/test against
  the live Superset MCP proves the full-catalog enumeration strategy: exact
  paging/query pattern, total inner-tool count, stability across two runs
  (missing≠deleted needs a stable identity: `tool_name`). RED/GREEN evidence =
  the enumerated list, byte-stable. THE DESIGN DOES NOT PROCEED ON GUESSES —
  if `search_tools` cannot exhaust the catalog, G0 reports the actual reachable
  strategy and the phase re-scopes (v2 of this note).
- **G1 · Migration + repo:** `via_gateway` column, BackendToolsRepository
  support, Operator apply (FENCE-first, verifyGrants probe row + CI coverage
  test per standing rule).
- **G2 · enumerateGatewayCatalog + discovery branch + turn-path guard test.**
- **G3 · Panel surfacing** (gateway-inner labeling in the existing tabs; no
  new tab).
- **G4 · composeSuperset routing_hint consumer + code baseline + authority
  line** (+ seedable governed rows staged as a publish job for the owner's
  admin-panel publish — consent-class, normal eval gate, freeze-independent).
- **G5 · Live verify:** (a) mirror shows ~22 `via_gateway` rows; (b) a
  "geçen ayki OEE / hazır rapor" class question is answered FROM Superset data
  WITH attribution and value depth (`get_chart_data`-class call visible in
  logs); (c) "şu anki OEE" stays ARMES; (d) turn-path guard proof (no inner
  tool ever offered).

## 5 · Explicitly out of scope (named, not dropped)

Qdrant/bge-m3/OPA (Path B §9) · frame/derivation changes · exposure-based
gateway call BLOCKING (Path B/OPA) · F158 render empty≠zero table-cell fix
(separate small item) · F153 Superset base-URL misconfig (external ops) ·
SUPERSET-STEER-1 as a separate phase — MERGED-INTO this note (§3.3).

<!-- END · cwf-superset-visibility-1-design-v1 · rev 1 · 2026-07-22 -->
