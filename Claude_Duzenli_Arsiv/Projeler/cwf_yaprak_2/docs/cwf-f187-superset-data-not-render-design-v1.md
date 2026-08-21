# CWF — F187 Design Note: Superset is a DATA source, not a rendering surface · v1
<!-- cwf-f187-superset-data-not-render-design-v1 · 2026-07-26 · S66 · Architect: Claude
     Owner ruling (Maymun, this session), paraphrased and accepted: when we ask
     Superset's MCP to "generate a chart", Superset renders that chart INSIDE its
     own application. It does not hand a chart out. CWF must therefore pull the
     DATA and render with its own viz layer.
     Binding: ADR-001 (mirror = observation) · ADR-010 (a declaration is a claim,
     trust is per-TOOL) · ADR-009 (prefer discovery over authored lists) ·
     GOLDEN FREEZE (no prompt.segment publishes until B5).
     Evidence: Vercel production logs 2026-07-26 03:20Z / 05:02Z + fresh-clone
     read of master 1ec1858d (rev 146). -->

## §0 · Status
Design approved in principle by the owner (the two-column triage in §5). Not
built. Sequenced **after F183, before M-C** — see §7 for why M-C cannot run first.

## §1 · The correction that produced this note
The Architect first read the 05:02Z turn as *"Superset's chart toolchain is
broken; hide it until Superset is fixed."* The owner corrected the frame: those
tools are **not broken relative to their purpose** — their purpose is to build
charts inside Superset's own UI, which is the wrong surface for this product.
The remedy is therefore durable: it holds even after Superset fixes its bugs.

Evidence supporting the owner's reading, from the recorded `generate_chart`
response envelope: `explore_url`, `embed_code`, `form_data_key`, `api_endpoints`
— every success-path field is a **reference into the Superset application**.
And `generate_explore_link` describes itself as *"Generate explore URL for
interactive visualization."* Neither returns a chart CWF could render.

**Two Architect premise errors are recorded here rather than quietly fixed:**
1. The cleanup remedy was first offered as an Operator DB write; the product
   already exposes it as a gated, audited, revertible admin action.
2. `tool_annotation` was described as a mechanism that could *hide* a tool. Its
   schema is `{tool, exposure: 'read'|'write', note?}` — a mutation-risk
   classification, not a visibility switch. Its fail-closed property is
   "an unclassified tool cannot join a `tool_category`", which is a different
   thing (§3).

## §2 · What was verified live (sources, not recall)
| Fact | Source |
|---|---|
| `ToolAnnotationSchema = {tool, exposure: 'read'\|'write', note?}` | `coreSchemas.ts:66` |
| eval-gate: a category may not include an unclassified tool | `evalGate.ts:166` |
| `writeOffered` counts offered tools annotated `write` | `stageTools.ts:312` |
| Offered set = all gateway entry tools ∪ relevanceFilter(flat tools) | `stageTools.ts:222` comment |
| Only **4** gateway tools are offered; the 22 inner tools never are | `[ToolRoute] … gateway=4` on every filtered turn |
| A deterministic pre-flight already sits in front of `call_tool` | `gatewayPreflight.ts` (51 lines, F155) |
| That module declares itself *"a targeted misrouting guard, never a general allow/deny list"* and is **fail-open** | `gatewayPreflight.ts:22` |
| Superset declares per-tool `annotations.readOnlyHint` / `destructiveHint` and fastmcp `tags` (`core` / `mutate`) | recorded `search_tools` results, 03:20Z & 05:02Z |
| `catalogSync` mirrors those annotations/tags into `backend_tools.input_schema` for gateway-inner rows | `catalogSync.ts:125` |
| CWF's chart binder resolves by `{tool, callId, match}` and derives records generically | `MessageChartContent.tsx:399`, `chartData.ts:62` |

## §3 · Why the existing governance cannot reach these tools
`tool_annotation` / `tool_category` govern **which tools we OFFER**. Superset's
22 inner tools are never offered: the model *discovers* them by calling
`search_tools` (whose result is the backend's own catalog, returned to the model
verbatim) and *invokes* them as an argument — `call_tool({name:'generate_chart'})`.

So `generate_chart` is not a tool in our catalog. It is a **string in a payload**.
No annotation, category, or exposure rule can touch it. There are exactly two
places where it can be reached:

1. **The `search_tools` result** — what the model learns exists.
2. **The `call_tool` pre-flight** — what the model is permitted to invoke.

This is the finding that shapes the whole design, and it generalizes: **every
gateway backend has this property.** Superset is simply the first one.

## §4 · Design decisions (committed)

### D1 · Disposition is DISCOVERED first, governed only where discovery is silent
Superset already declares, per tool, `readOnlyHint`, `destructiveHint` and
fastmcp `tags: ['core'|'mutate']`, and `catalogSync` already mirrors them. The
mutating tools (`create_virtual_dataset`, `save_sql_query`, `update_chart`,
`add_chart_to_existing_dashboard`, `generate_dashboard`) should be derivable
with **zero authored rows** — pure ADR-009 posture applied to capability.

**Honest limit, stated up front:** the declaration answers *"does this mutate?"*
It does **not** answer *"whose surface does the output land on?"* A read-only
tool can still return an `explore_url`. So `generate_chart` and
`generate_explore_link` probably cannot be classified from the declaration
alone. For exactly those cases — and only those — a small governed
classification kind is introduced (`<backend>.gateway_tool_policy`, payload
`{tool, disposition: 'data'|'foreign_surface', note}`), published through the
normal eval-gate so the owner ratifies it. Rows scale with the **integration**
(one per declared tool of one connected gateway), never with the world → the
ADR-009 v1_1 degree test passes.

**Unclassified = denied, honestly.** A newly-appearing gateway tool we cannot
classify is not silently used. The miss is recorded for human ratification,
reusing the machine-proposes / human-ratifies loop that already exists.

### D2 · Enforcement lands in a NEW fail-CLOSED sibling, not inside F155's guard
`gatewayPreflight.ts` is deliberately **fail-open** ("a defensive net, never a
new way for a turn to fail") and deliberately **not** an allow/deny list. A
policy gate has the opposite posture: it must deny, and a read failure must not
silently open it. Mixing fail-open and fail-closed in one module is how silent
holes are created.

→ New `gatewayPolicy.ts`, fail-closed, composed at the same call site
(`stageTools.ts:471`). F155's misroute guard stays single-purpose and untouched.

### D3 · Shape what the model SEES, but never what the trace records
Denying at call time is not enough: at 05:02Z the model burned **15 tool rounds
and 306 388 input tokens** cycling through payload shapes for tools that could
never succeed. The `search_tools` result must therefore be filtered on the
model-facing path so the tool is not offered as a temptation.

**FULL-TRACE constraint (non-negotiable):** the filter applies to the
model-facing copy only. The raw `search_tools` result is recorded in the trace
unmodified. A filtered model view with an unfiltered trace is observability; a
filtered trace is a lie.

### D4 · The denial message carries the redirect — no prompt change
`armesGatewayMisrouteMessage()` is the established pattern: a deterministic,
test-pinned tool-result string that honestly redirects the model. The policy
denial uses the same shape — it tells the model that Superset serves data here
and that charts are drawn with CWF's own viz path.

This matters for sequencing: teaching the model through a **prompt segment**
would require a `prompt.segment` publish, which the **GOLDEN FREEZE blocks until
B5**. The denial-message route is freeze-safe and ships now.

### D5 · Chart requests route to CWF's viz — and the binding risk is TESTED, not assumed
The data path is `get_chart_data` (preferred — it returns the numbers behind a
chart someone at Kale has already curated, so "Doğalgaz Sarfiyat" keeps its
agreed meaning) or `execute_sql` (free-form fallback).

**Named risk, unverified:** the gateway flattens every inner tool to the outer
name. The recorded result carries `toolName = 'call_tool'`, not `'execute_sql'`.
CWF's binder resolves a chart directive by `{tool, callId, match}` — so (a) the
directive must name `call_tool`, and (b) when a turn contains several
`call_tool` results (03:20Z had six), disambiguation rests entirely on
`callId`/`match`. Whether the model reliably produces a resolvable directive
under gateway flattening **has not been observed**. The phase must prove it with
a real turn before this design can be called done.

## §5 · The triage (owner-approved)
| Superset's role | Tools |
|---|---|
| **DATA source — keep** | `get_chart_data` · `execute_sql` · `list_datasets` · `list_charts` · `list_dashboards` · `list_databases` · `get_dataset_info` · `get_chart_info` · `get_dashboard_info` · `get_database_info` · `get_schema` |
| **Renders/writes into Superset — deny for our surface** | `generate_chart` · `generate_explore_link` · `generate_dashboard` · `add_chart_to_existing_dashboard` · `create_virtual_dataset` · `save_sql_query` · `update_chart` · `update_chart_preview` · `get_chart_preview` · `open_sql_lab_with_context` |
| **Undecided — classify from the declaration** | `get_chart_type_schema` |

Note `list_charts` stays in the DATA column despite being **intermittent** (it
failed with a Superset SQLAlchemy session error at 03:20Z and succeeded at
05:02Z). Intermittence is a trust question (ADR-010 outcome-failure), not a
surface question, and must not be conflated with this note's subject.

## §6 · What the phase must READ before it builds (S65-1)
An Operator dump of `backend_tools` for `backend_id='superset'`,
`via_gateway=true` — all 22 rows with their full `input_schema`, so the stored
`annotations` / `tags` can be inspected. **The whole of D1 depends on whether
those declarations are actually mirrored and usable.** If they are absent or
empty, D1 collapses to "governed classification for all 22", and the design note
is amended (`v1_1`) before the phase prompt is written — not discovered
mid-build.

## §7 · Proof of done (S63-1) — and why M-C waits for this
1. A live chart request against Superset data produces a chart **in the CWF
   panel**, bound to a `call_tool` result (D5's risk closed by observation).
2. A denied tool is refused deterministically, with the redirect message, and
   the trace shows the raw unfiltered `search_tools` result alongside the
   filtered model-facing copy (D3).
3. The 05:02Z failure mode does not recur: no turn burns its tool-round budget
   on unreachable tools. Measured as tool-round count on a chart question,
   against that turn's **15 rounds / 306 388 input tokens** baseline.

**M-C sequencing:** the owner's model-comparison set includes chart questions.
Run today, those turns measure Superset's surface mismatch, not the models —
the same class of confound as the 145-vs-14 tool-set asymmetry. **F183 → F187 →
M-C.**

## §8 · Out of scope (named, not silent)
- **F153** (`http://0.0.0.0:8080/...` base URLs) — external Kale/ARDIC ops. This
  design removes CWF's dependence on those URLs but does not fix them.
- **`list_charts` intermittence** and the undiagnosable
  `validation_system_error` — ADR-010 trust lane, not this note.
- **F160** (multi-series single chart) and **F166** (cross-turn viz binding)
  remain open and will shape how well D5's path actually serves users.
- No `prompt.segment` publish (GOLDEN FREEZE).
- No change to ARMES's flat-catalog governance.

<!-- END · cwf-f187-superset-data-not-render-design-v1 · 2026-07-26 · S66 -->
