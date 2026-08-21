# CWF — F187 Design Note: Superset is a DATA source, not a rendering surface · v1_2
<!-- cwf-f187-superset-data-not-render-design-v1_2 · 2026-07-27 · S67 · Architect: Claude
     Supersedes v1_1 (same session) and v1 (2026-07-26, S66). Both are immutable
     and archived (S37-1).

     v1_2 DELTA — the PER-TOOL dump arrived, so prediction becomes measurement:
       1. §4/D1's derivation arithmetic was a PREDICTION in v1_1. It is now
          COMPUTED against the 22-row per-tool dump: 19 of 22 derive correctly,
          3 need governed rows. The predicted false-negative candidate
          (`get_chart_preview`) is confirmed by name.
       2. **A v1_1 statement is CORRECTED, not quietly dropped.** v1_1 called
          `execute_sql` a "false positive" of the tag rule. That was wrong: the
          declaration is CORRECT (it really can mutate). We keep it because it
          is our only free-form data path, and we constrain the PAYLOAD rather
          than dispute the capability. The distinction matters under ADR-010 —
          one is our constraint, the other would be a claim about the backend.
       3. §2 and a new §5.1 carry the locked per-tool table, so the phase builds
          against rows rather than a census.
       4. F188 is UPGRADED by G4: superset has **zero** published
          `tool_annotation` and `tool_category` rows. `writeOffered=0` is not a
          counting bug — there is nothing published to govern.
       5. §8 reframes F189: the model is not blind, its hint is one level too
          shallow, and the schema loss sits exactly at the gateway boundary
          (all 4 entry tools carry real JSON Schema; all 22 inner tools carry
          none).

     v1_1 DELTA (carried, unchanged in substance):
       1. §6's blocking precondition is SATISFIED. D1 SURVIVES.
       2. §4/D1 gains the derivation analysis.
       3. NEW D6 — F188's telemetry honesty. A counter that cannot see a surface
          must report UNKNOWN, not zero.
       4. §5 closes the one undecided row (`get_chart_type_schema` -> deny) and
          records the `execute_sql` ruling with its deterministic read-only check.
       5. §8 absorbs F189 with explicit sequencing, and adds the F198 pagination
          constraint on this phase's own reads.

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
| **v1_2 (S67 per-tool read):** 26 superset rows total — 22 gateway-inner, 4 entry; every count reconciled against `count(*)` | `backend_tools` per-tool dump, project `fjbrkimwvtpwoxhziidh` |
| **v1_2:** all **4 entry tools carry a real JSON Schema** (`type`/`properties`/`required`); all **22 inner tools carry none** — the schema loss is exactly at the gateway boundary | same dump |
| **v1_2:** `call_tool`'s own schema accepts `arguments` with `additionalProperties: true` — CWF validates nothing at its own boundary | same dump |
| **v1_2:** `get_chart_type_schema`'s hint is `"chart_type, include_examples"`, the only one that is not the bare word `request` | same dump |
| **v1_2:** `destructiveHint:true` on exactly 3 tools — `execute_sql`, `update_chart`, `update_chart_preview` | same dump |
| **v1_2:** `open_sql_lab_with_context` declares `readOnlyHint:**true**` while being a pure foreign surface | same dump |
| **v1_2 (G4):** published governed rows — armes `tool_annotation` **141** / `tool_category` **12**; superset **0 / 0**, both kinds existing and empty | `domain_rules`, published only |

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

**v1_2 · The derivation is no longer predicted — it is MEASURED.** v1_1 argued
from the census that `mutate` 8 + `explore` 2 = 10 looked like the 10-tool deny
column but could not be, and named `get_chart_preview` as the likely uncovered
renderer. The per-tool dump settles it.

**Rule under test:** `tags ∩ {mutate, explore} ≠ ∅ → foreign surface (deny).`
**Result: 19 of 22 derive correctly; 3 require a governed row.**

| Tool | Declares | Triage | Class |
|---|---|---|---|
| `execute_sql` | `mutate` · `readOnly:false` · `destructive:true` | **DATA (keep)** | correct declaration, overridden by containment |
| `get_chart_preview` | `data` · `readOnly:true` | **DENY** | surface not encoded by any tag |
| `get_chart_type_schema` | `discovery` · `readOnly:true` | **DENY** | surface not encoded by any tag |

**The `execute_sql` row is a CORRECTION of v1_1, which called it a false
positive.** It is not. Superset's declaration is **right** — `execute_sql`
really can mutate. We keep it because it is the only free-form data path we
have, and we constrain the **payload** (must open `SELECT`/`WITH`, single
statement) rather than dispute the **capability**. Under ADR-010 that
distinction is load-bearing: overriding a correct declaration with our own
containment is a statement about US; calling it wrong would be a claim about the
BACKEND, and we have no evidence for one.

**The other two are a different class: the declaration is correct but
ORTHOGONAL.** No tag in Superset's vocabulary encodes surface ownership, and
Superset's own usage proves the vocabulary is not a disposition taxonomy: it
tags two doorways `explore` (`generate_explore_link`, `open_sql_lab_with_context`)
and a third (`get_chart_preview`) `data` — sitting beside `get_chart_data`. One
returns the numbers behind a chart; the other returns a picture Superset drew.
Same tag.

**`annotations` are a worse rule and are therefore rejected as a derivation
source, on evidence:** `readOnlyHint:false` selects 9 tools, and
`open_sql_lab_with_context` — a pure foreign surface — declares
`readOnlyHint:**true**`. The flag answers "does it mutate", not "whose screen
does the output land on", exactly as v1 predicted in the abstract.

**Consequence for the build, binding (unchanged in force, now with the numbers
filled in):** the phase computes the disposition for all 22 from `tags` alone,
diffs it against §5's triage, and resolves each of the **three** disagreements
with an explicit governed `<backend>.gateway_tool_policy` row — payload
`{tool, disposition: 'data'|'foreign_surface', note}` — through the normal
eval-gate. Each note states which of the two classes above applies. Three rows,
scaling with the integration, not the world.

The diff is the deliverable, not the agreement. A derivation that agrees by
accident and one that agrees by mechanism are indistinguishable from the
outcome, and only the second survives Superset adding a 23rd tool.

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

**v1_2 · G4 upgrades this from a counting defect to an absence of governance.**
Published `domain_rules`: armes carries **141** `tool_annotation` rows and
**12** `tool_category` rows; superset carries **0 and 0**. Both kinds exist and
are empty. So `writeOffered = 0` is not the counter mis-reading a surface it
cannot see — **there is nothing published for it to read.** The write-exposure
governance surface does not exist for this backend.

Two consequences the phase must respect:
- Publishing per-tool exposure for superset is possible **today**; the kind
  family is already there and empty. No new kind is needed for that half.
- `gateway_tool_policy` is still a **separate new kind**, because
  `tool_annotation`'s axis is mutation risk and this design's axis is surface
  ownership. §4/D1's three exceptions are precisely the tools where those two
  axes disagree; folding them into one kind would erase the distinction that
  makes the rule derivable at all.

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

**v1_2 · The per-tool read is DONE. Nothing further is owed before the build.**
The 22-row dump was taken in S67 against project `fjbrkimwvtpwoxhziidh`, with
every count reconciled against `count(*)` (22 gateway + 4 entry = 26 total), and
it deviated from the S66 census in **zero** respects. §4/D1 now carries the
computed diff, and §5.1 below carries the locked per-tool table the phase builds
against.

**One standing check, not a blocker:** the dump is an observation with a
timestamp, not a constant. If the phase's own reads disagree with §5.1, the
disagreement is a finding about the mirror — record it, do not silently adopt
the newer values.

## §5.1 · The locked per-tool table (S67 dump)
`deny` = the derivation's verdict under `tags ∩ {mutate, explore}`; `TRIAGE` =
the owner-approved column; **★** marks a governed row this phase must publish.

| Tool | tags | readOnly | destructive | derived | TRIAGE |
|---|---|---|---|---|---|
| `add_chart_to_existing_dashboard` | mutate | false | false | deny | deny |
| `create_virtual_dataset` | mutate | false | false | deny | deny |
| `generate_chart` | mutate | false | false | deny | deny |
| `generate_dashboard` | mutate | false | false | deny | deny |
| `save_sql_query` | mutate | false | false | deny | deny |
| `update_chart` | mutate | false | **true** | deny | deny |
| `update_chart_preview` | mutate | false | **true** | deny | deny |
| `generate_explore_link` | explore | false | false | deny | deny |
| `open_sql_lab_with_context` | explore | **true** | false | deny | deny |
| **`execute_sql`** ★ | mutate | false | **true** | deny | **DATA** |
| **`get_chart_preview`** ★ | data | true | false | keep | **DENY** |
| **`get_chart_type_schema`** ★ | discovery | true | false | keep | **DENY** |
| `get_chart_data` | data | true | false | keep | keep |
| `get_chart_info` | discovery | true | false | keep | keep |
| `get_dashboard_info` | discovery | true | false | keep | keep |
| `get_database_info` | discovery | true | false | keep | keep |
| `get_dataset_info` | discovery | true | false | keep | keep |
| `get_schema` | discovery | true | false | keep | keep |
| `list_charts` | core | true | false | keep | keep |
| `list_dashboards` | core | true | false | keep | keep |
| `list_databases` | core | true | false | keep | keep |
| `list_datasets` | core | true | false | keep | keep |

Entry tools (`via_gateway=false`, never denied): `call_tool` · `search_tools` ·
`get_instance_info` · `health_check`.

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
5. **v1_2 (D1):** the derivation-vs-triage diff is produced by the phase's own
   code against live rows and matches §5.1 — 19 of 22 derived, and exactly three
   governed rows published (`execute_sql`, `get_chart_preview`,
   `get_chart_type_schema`), each note naming which class applies: a correct
   declaration overridden by containment, or a declaration orthogonal to surface
   ownership. A phase that reports "the derivation matched" without showing the
   diff has not met this, and a phase that produces a **different** diff has
   found something about the mirror and must stop rather than adopt it silently.
6. **v1_1 (`execute_sql`):** the read-only statement check rejects a second
   statement and a non-`SELECT`/`WITH` opener, proven by a test that **fails**
   when the check is removed (S66-1 positive control).

**M-C sequencing:** the owner's model-comparison set includes chart questions.
Run today, those turns measure Superset's surface mismatch, not the models —
the same class of confound as the 145-vs-14 tool-set asymmetry. **F183 -> F187
-> M-C.**

## §8 · Out of scope (named, not silent)
- **F189 · inner tools are called with a hint one level too shallow** —
  reframed at v1_2 on the per-tool evidence, because "blind" overstated it.
  All **4 entry tools carry a real JSON Schema**; all **22 inner tools carry
  none** — so the schema loss sits exactly at the gateway boundary, in
  `catalogSync.ts:125`, which builds inner rows as
  `{parameters_hint?, annotations?, tags?}`. The bare word `request` on 21 of 22
  is not nothing: it correctly says these tools take a single `request` object,
  which is why the observed working payload `{request:{database_id, sql}}`
  succeeded. What the model lacks is the **inside** of `request`. The 22nd row
  proves richer hints exist upstream (`get_chart_type_schema` declares
  `"chart_type, include_examples"`), so the first question when F189 runs is
  whether the inner schemas are retrievable rather than reconstructible.
  A third defect belongs here too: `call_tool`'s own schema takes `arguments`
  with `additionalProperties: true`, so **CWF validates nothing at its own
  boundary** either. **Still sequenced AFTER this phase:** denying 11 of 22
  removes the dominant cost of the 05:02Z collapse, which lowers F189's priority
  rather than raising it. Any fallback to observed payload shapes must be
  recorded as an OBSERVATION, never as a declaration (ADR-010).
- **F191 · the consumer-side genericity boundary is LATENT, not active** —
  `stageClarify` calls `resolveToolCategories()` for every COMMAND frame, and
  that resolver reads `getPublishedRules(['armes'])` by literal. G4 shows the
  practical effect is nil today: superset has zero published rows of either
  kind, so there is nothing the armes-scoped read is failing to see. It becomes
  active the moment superset publishes its first `tool_annotation` row — which
  D6 says is now possible. Record it; do not fix it inside this phase.
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

<!-- END · cwf-f187-superset-data-not-render-design-v1_2 · 2026-07-27 · S67 -->
