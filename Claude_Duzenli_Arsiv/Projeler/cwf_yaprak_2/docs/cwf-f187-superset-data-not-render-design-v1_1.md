# CWF — F187 Design Note: Superset is a DATA source, not a rendering surface · v1_1
<!-- cwf-f187-superset-data-not-render-design-v1_1 · 2026-07-27 · S67 · Architect: Claude
     Supersedes v1 (2026-07-26, S66). v1 is immutable and archived (S37-1);
     this is the amendment it named in its own §6.

     v1_1 DELTA — five changes, nothing else touched:
       1. §6's blocking precondition is SATISFIED. The Operator dump exists.
          D1 SURVIVES, and §6 is rewritten from "what to read" to "what was read
          and what follows".
       2. §4/D1 gains the DERIVATION ARITHMETIC: the declared tags almost
          reproduce the owner's triage, and the places where they cannot are
          computed here rather than discovered mid-build.
       3. NEW D6 — F188's telemetry honesty. A counter that cannot see a surface
          must report UNKNOWN, not zero.
       4. §5 closes the one undecided row (`get_chart_type_schema` -> deny) and
          records the `execute_sql` ruling with its deterministic read-only check.
       5. §8 absorbs F189 (blind calls) with explicit sequencing, and adds the
          F198 pagination constraint on this phase's own reads.

     Binding: ADR-001 (mirror = observation) · ADR-009 v1_1 (discovery over
     authored lists; the degree test) · ADR-010 (a declaration is a claim; trust
     is per-TOOL) · GOLDEN FREEZE (no prompt.segment publish until B5).
     Evidence: Vercel production logs 2026-07-26 03:20Z / 05:02Z · Operator read
     of `backend_tools` (superset, via_gateway) recorded in register v67 · fresh
     clone of master 088b2a5e (rev 150). -->

## §0 · Status
Design approved in principle by the owner (the triage in §5). **Not built.**
v1's blocking precondition (§6) is now **satisfied**, so this note is
build-ready.

Sequence: **v3 baseline -> F194 decision -> F190 docs -> F187 (this) -> F185
guard -> M-C.** §7 states why M-C cannot precede it.

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
| Superset declares per-tool `annotations.readOnlyHint` / `destructiveHint` and fastmcp `tags` | recorded `search_tools` results, 03:20Z & 05:02Z |
| `catalogSync` mirrors those annotations/tags into `backend_tools.input_schema` for gateway-inner rows | `catalogSync.ts:125` |
| CWF's chart binder resolves by `{tool, callId, match}` and derives records generically | `MessageChartContent.tsx:399`, `chartData.ts:62` |
| **NEW (S66 Operator read):** all 22 inner rows carry `annotations` + `tags` + `parameters_hint`; **zero** carry a real schema (`properties`/`type`) | `backend_tools` dump, `backend_id='superset'`, `via_gateway=true` |
| **NEW:** tag census over the 22 — `mutate` 8 · `discovery` 6 · `core` 4 · `data` 2 · `explore` 2 | same dump |
| **NEW:** 21 of 22 carry `parameters_hint: "request"` — one word | same dump |
| **NEW:** `execute_sql` declares `tags:["mutate"]`, `readOnlyHint:false`, `destructiveHint:true` | same dump |

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
Superset declares, per tool, `readOnlyHint`, `destructiveHint` and fastmcp
`tags`, and `catalogSync` mirrors them. The mutating tools should be derivable
with **zero authored rows** — pure ADR-009 posture applied to capability.

**v1_1 · The precondition is met, and D1 survives.** All 22 rows carry
`annotations` and `tags`. `explore` (2 tools) is precisely the foreign-surface
signal this design needed and it exists in the backend's own declaration:
`generate_explore_link` and `open_sql_lab_with_context` are the two tools whose
entire output is a doorway into Superset's UI.

**v1_1 · The derivation arithmetic — computed here so the phase does not
discover it mid-build.** The owner-approved deny column holds **10** tools. The
census gives `mutate` 8 + `explore` 2 = **10**. The equality is a coincidence
worth testing rather than trusting, because we already know **one member of
`mutate` sits in the KEEP column**: `execute_sql`. If `execute_sql` is one of
the 8, then `mutate ∪ explore` covers only **9** of the 10 denied tools, and at
least one denied tool carries neither tag — the most likely candidate being
`get_chart_preview`, a read-only call whose output is nonetheless a Superset
surface.

That is exactly the honest limit v1 stated in the abstract, now with numbers:
**the declaration answers "does this mutate?", never "whose surface does the
output land on?"** It therefore misfires in **both** directions —
a false positive (`execute_sql`: tagged `mutate`, is our best data path) and at
least one false negative (a renderer tagged neither).

**Consequence for the build, binding:** the phase does **not** ship a derivation
that merely reproduces the deny list by count. It must, from the per-tool dump:
1. compute the disposition for all 22 from `tags` + `annotations` alone;
2. diff that against §5's owner-approved triage;
3. and resolve **every** disagreement with an explicit governed
   `<backend>.gateway_tool_policy` row — payload
   `{tool, disposition: 'data'|'foreign_surface', note}` — published through the
   normal eval-gate, with the note naming why the declaration was insufficient.

The diff is the deliverable, not the agreement. A derivation that agrees by
accident and a derivation that agrees by mechanism are indistinguishable from
the outcome, and only the second one survives Superset adding a 23rd tool.

Rows scale with the **integration** (one per declared tool of one connected
gateway), never with the world → the ADR-009 v1_1 degree test passes.

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

### D6 · NEW (F188) · A counter that cannot see a surface reports UNKNOWN, not zero
Every gateway turn logs `writeOffered = 0` (`stageTools.ts:312`). Eight of the
22 inner tools are `mutate` and three declare `destructiveHint: true`. The
counter reports zero because it **cannot see them**, not because none were
offered — a **false negative in a safety counter**, which is an `empty≠zero`
violation inside the governance layer itself.

The fix is honesty, not a new number: on a turn where a gateway entry tool is
offered, the write-exposure counter must report **UNKNOWN** for the gateway
portion (HONEST-NULL, the pattern already used by `computeTurnClarification`),
or a real count once `gatewayPolicy` knows the dispositions. It must never
report `0`.

This is deliberately **separable** from D1/D2: the honesty fix is correct even
if the policy gate slips, and it must not be held hostage to it. Ship it in the
same phase, in its own sub-phase, with its own test.

## §5 · The triage (owner-approved; v1_1 closes the undecided row)
| Superset's role | Tools |
|---|---|
| **DATA source — keep** | `get_chart_data` · `execute_sql` · `list_datasets` · `list_charts` · `list_dashboards` · `list_databases` · `get_dataset_info` · `get_chart_info` · `get_dashboard_info` · `get_database_info` · `get_schema` |
| **Renders/writes into Superset — deny for our surface** | `generate_chart` · `generate_explore_link` · `generate_dashboard` · `add_chart_to_existing_dashboard` · `create_virtual_dataset` · `save_sql_query` · `update_chart` · `update_chart_preview` · `get_chart_preview` · `open_sql_lab_with_context` · **`get_chart_type_schema` (v1_1)** |

**v1_1 · `get_chart_type_schema` -> DENY.** It describes the shapes Superset's
own chart builder accepts. We do not build charts in Superset, so its output has
no consumer on our side. **Reversible on evidence:** if the phase's dump shows
it returns DATA schemas rather than chart-builder schemas, it moves — with a
governed row and a note, not silently.

**v1_1 · The `execute_sql` ruling.** It stays in the DATA column **despite**
declaring `destructiveHint: true`, because it is the only free-form data path
and it is proven to work. It does not stay unguarded: it gains a **deterministic
read-only statement check** — the statement must begin `SELECT` or `WITH`, and a
second statement is rejected. Additionally `get_database_info` returns
`allow_dml`, which is to be **READ**, never assumed.

This is ADR-010 at tool granularity in its purest form: the backend's own
declaration says "destructive", our observation says "our one working data
path", and the resolution is neither to trust nor to ban but to **contain** —
keep the capability, constrain the payload deterministically.

Note `list_charts` stays in the DATA column despite being **intermittent** (it
failed with a Superset SQLAlchemy session error at 03:20Z and succeeded at
05:02Z). Intermittence is a trust question (ADR-010 outcome-failure), not a
surface question, and must not be conflated with this note's subject.

## §6 · v1_1 · The precondition is SATISFIED — what was read, and what follows
v1 blocked the phase on an Operator dump of `backend_tools` for
`backend_id='superset'`, `via_gateway=true`, because **the whole of D1 depended
on whether the declarations are actually mirrored and usable.** The dump was
taken in S66. Result:

- **All 22 rows carry `annotations` + `tags` + `parameters_hint`.** D1 does not
  collapse; discovery has real material to work with.
- **Zero rows carry a real schema** (`properties` / `type`), and 21 of 22 carry
  `parameters_hint: "request"` — a single word. This is a *separate* defect
  (F189, §8), not a D1 blocker: D1 needs disposition, not argument shape.
- **`explore` exists as a tag** and lands on exactly the two tools whose output
  is a Superset doorway. The foreign-surface signal is in the backend's own
  declaration, which is the strongest possible outcome for an ADR-009 design.

**What the phase must still read before it builds (S65-1), now much narrower:**
the same dump **per tool**, not in census form — the tag(s) and annotation flags
for each of the 22 by name. The census alone cannot produce D1's required diff,
and D1's build constraint is written against the per-tool mapping.

## §7 · Proof of done (S63-1) — and why M-C waits for this
1. A live chart request against Superset data produces a chart **in the CWF
   panel**, bound to a `call_tool` result (D5's risk closed by observation).
2. A denied tool is refused deterministically, with the redirect message, and
   the trace shows the raw unfiltered `search_tools` result alongside the
   filtered model-facing copy (D3).
3. The 05:02Z failure mode does not recur: no turn burns its tool-round budget
   on unreachable tools. Measured as tool-round count on a chart question,
   against that turn's **15 rounds / 306 388 input tokens** baseline.
4. **v1_1 (F188):** a gateway turn no longer logs `writeOffered = 0`. Evidence is
   the emitted line itself, showing UNKNOWN or a real count.
5. **v1_1 (D1):** the derivation-vs-triage diff is produced as an artifact, and
   every disagreement has a governed row whose note names why the declaration
   was insufficient. A phase that reports "the derivation matched" without
   showing the diff has not met this.
6. **v1_1 (`execute_sql`):** the read-only statement check rejects a second
   statement and a non-`SELECT`/`WITH` opener, proven by a test that **fails**
   when the check is removed (S66-1 positive control).

**M-C sequencing:** the owner's model-comparison set includes chart questions.
Run today, those turns measure Superset's surface mismatch, not the models —
the same class of confound as the 145-vs-14 tool-set asymmetry. **F183 -> F187
-> M-C.**

## §8 · Out of scope (named, not silent)
- **F189 · inner tools are called BLIND** — `catalogSync.ts:125` builds gateway
  rows' `input_schema` as `{parameters_hint?, annotations?, tags?}`, never a real
  JSON Schema, so the model reverse-engineers argument shapes from validation
  errors. **Sequenced AFTER this phase, deliberately:** denying 10 of 22 removes
  the dominant cost of the 05:02Z collapse, which lowers F189's priority rather
  than raising it. When it runs, the first question is whether Superset exposes
  richer schemas retrievably (its own `get_chart_type_schema` suggests schemas
  are obtainable); only if not does it fall back to integration-scoped observed
  shapes, which pass the ADR-009 degree test but must be recorded as
  observations, never as declarations.
- **F198 · unpaginated reads (S67)** — a build constraint on this phase, not a
  deferral: `BackendToolsRepository`'s reads are unpaginated and truncate
  silently at the PostgREST row cap. Today's catalog (~163 rows) is far under
  it, but `gatewayPolicy`'s own read of the inner catalog must be **bounded by
  construction or paginated**, because Path B's stated target is 1000+ federated
  tools and this module is the one that would silently stop seeing them.
- **F153** (`http://0.0.0.0:8080/...` base URLs) — external Kale/ARDIC ops. This
  design removes CWF's dependence on those URLs but does not fix them. **S66
  raised it from theoretical:** it blocked delivery of charts that already
  existed (ids 85, 80).
- **F164 · dataset -> factory mapping** — `list_datasets({search:"granit"})`
  returns **34** datasets with honest pagination (`records=20/34 page=1/2`),
  spanning ClickHouse `armes_core` and MySQL `armes_db`. Real material for a
  later mapping, out of scope here.
- **`list_charts` intermittence** and the undiagnosable
  `validation_system_error` — ADR-010 trust lane, not this note.
- **F160** (multi-series single chart) and **F166** (cross-turn viz binding)
  remain open and will shape how well D5's path actually serves users.
- No `prompt.segment` publish (GOLDEN FREEZE).
- No change to ARMES's flat-catalog governance.

<!-- END · cwf-f187-superset-data-not-render-design-v1_1 · 2026-07-27 · S67 -->
