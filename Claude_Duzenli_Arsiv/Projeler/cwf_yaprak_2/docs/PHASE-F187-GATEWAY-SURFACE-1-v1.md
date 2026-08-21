# PHASE F187-GATEWAY-SURFACE-1 · v1
<!-- PHASE-F187-GATEWAY-SURFACE-1-v1 · 2026-07-28 · S68 · Architect: Claude
     Anchor: origin/master = 0d540c9d4742ee3da6e2cd1eb13d7a9fe5b58ba6 (rev 150).
     SELF-CONTAINED (S66-2): every law, table and value this phase depends on is
     restated inline. Do NOT go looking for an Architect-side document; if a fact
     is not in this file, it is not a precondition of this phase. -->

**Lane:** Author (AG). **Repo:** `maymun207/cwf_yaprak`. **Branch:**
`phase/f187-gateway-surface-1`. **Migrations: ZERO.** **Operator steps: ZERO.**
**`prompt.segment` publishes: ZERO** (GOLDEN FREEZE is engaged and this phase
must stay freeze-safe).

---

## §0 · HARD PRE-FLIGHT (do this first, paste the literal output)

```bash
# 1. FRESH CLONE. Never `git stash`, never reuse a working tree (S61-1).
git clone https://github.com/maymun207/cwf_yaprak.git f187 && cd f187
git rev-parse origin/master
#    EXPECT: 0d540c9d4742ee3da6e2cd1eb13d7a9fe5b58ba6

# 2. Floor counts.
find . -path ./node_modules -prune -o \( -name '*.test.ts' -o -name '*.test.tsx' \) -print | wc -l
#    EXPECT: 362
ls supabase/migrations | wc -l          # EXPECT: 59
ls docs/adr | wc -l                     # EXPECT: 10
grep -m1 docVersion public/architecture/manifest.json
#    EXPECT: rev 150 · 2026-07-27

# 3. The three ADRs this phase is bound by are IN THE REPO. Read them there:
#    docs/adr/ADR-001-backend-trust.md
#    docs/adr/ADR-009-entity-topology-is-discovered.md
#    docs/adr/ADR-010-earned-trust-declaration-vs-observation.md

# 4. Commands (grep-verified from package.json this session, S32-1):
npm ci
npm test                # vitest run
npm run typecheck:api
npm run check:doc-drift
npm run reseal          # only after code lands; see §4/G8
```

If the hash differs, **STOP and report**. Do not rebase your way to a floor.

---

## §1 · THE FINDING THIS PHASE CLOSES (restated inline)

Superset's MCP is a **gateway**: only four tools are ever offered to the model —
`call_tool`, `search_tools`, `get_instance_info`, `health_check`. Its **22 inner
tools are never offered**. The model discovers them by calling `search_tools`
(whose result is returned to the model verbatim) and invokes them as an argument:
`call_tool({name:'generate_chart', ...})`.

Therefore `generate_chart` is **not a tool in our catalog — it is a string in a
payload**. No `tool_annotation`, `tool_category` or exposure rule can reach it.
Exactly two reach points exist:

1. **the `search_tools` result** — what the model learns exists;
2. **the `call_tool` pre-flight** — what the model is permitted to invoke.

**The owner's ruling (durable, not a bug workaround):** when we ask Superset's
MCP to draw a chart, Superset renders it **inside its own application** and
returns a URL. `generate_chart`'s success envelope is `explore_url` /
`embed_code` / `form_data_key` / `api_endpoints` — every field a reference INTO
Superset. That is the wrong surface for this product. **Superset is a DATA
source; CWF draws its own charts.** This holds even after Superset fixes its
bugs.

**Cost of not doing this (measured):** one production turn at 05:02Z on
2026-07-26 burned **15 tool rounds and 306 388 input tokens** cycling payload
shapes for tools that could never satisfy the request — while the chart the user
asked for **already existed in Superset** (ids 85 and 80).

**This generalizes to every gateway backend.** Superset is only the first, so
nothing you build here may contain a `'superset'` literal in production code.

---

## §2 · BINDING CONSTRAINTS

1. **ADR-009 (in repo) — DISCOVERY OVER AUTHORED LISTS.** Disposition is derived
   from the backend's OWN declared `tags`. Governed rows exist **only** where the
   declaration is silent or orthogonal. The degree test: an artifact may grow
   with the INTEGRATION (one row per declared tool of one connected gateway),
   never with the WORLD. Three rows is the budget, and it is enough.
2. **ADR-010 (in repo) — A DECLARATION IS A CLAIM, TRUST IS PER-TOOL.** Where we
   override a declaration, the note must say which of exactly two classes
   applies: *(a) the declaration is CORRECT and we override it by containment*
   (a statement about US), or *(b) the declaration is correct but ORTHOGONAL* —
   no tag in the vocabulary encodes surface ownership. Never a third class, and
   never "the backend is wrong" — we have no evidence for that.
3. **ADR-001 — the mirror is an OBSERVATION.** `backend_tools` is read here and
   **never written**. `missing ≠ deleted`.
4. **FULL-TRACE MANDATE.** The model-facing filter (G5) applies to the model's
   copy **only**. The raw `search_tools` result stays unmodified in the trace and
   in the client stream. *A filtered model view with an unfiltered trace is
   observability; a filtered trace is a lie.*
5. **empty ≠ zero.** A counter that cannot see a surface reports **UNKNOWN**,
   never `0` (G6). This law is the whole of G6.
6. **RULE 1 — no hardcoded config.** Zero `'superset'` / `'armes'` literals in
   any new production module. Backend identity is DATA. Genericity is proven by
   grep AND by a behavioural test against a synthetic backend id.
7. **GOLDEN FREEZE.** No `prompt.segment` publish. The model is taught through
   the deterministic denial-message string (the `armesGatewayMisrouteMessage`
   precedent), never through prompt copy.
8. **Secrets:** none are read, written or echoed by this phase. No new env var.
9. **ZERO migrations.** The new kind family self-provisions through the existing
   `selfSeedReconciler` `kindsOnly` mechanism. If you find yourself writing SQL,
   you have taken a wrong turn — stop and report.
10. **DO NOT TOUCH (byte-identical, proven by `git diff --stat`):**
    `api/cwf/_lib/turn/gatewayPreflight.ts` (F155, deliberately fail-OPEN) ·
    `api/cwf/_lib/knowledge/backends/superset/gatewayProtocol.ts` ·
    `evalGate.ts`'s existing `stageReferential`, `stageReferentialSuperset`,
    `stageBehavioralSuperset` · `deriveCategories.ts` · `routeKeywordLayer` ·
    the eval-gate engine, stage order and interpreter.

---

## §3 · THE LOCKED PER-TOOL TABLE (S67 Operator dump, 22 inner rows)

`derived` = the verdict of the rule `tags ∩ {mutate, explore} ≠ ∅ →
foreign_surface`. `TRIAGE` = the owner-approved disposition. **★** marks the
three tools where they disagree — those and only those get a governed row.

| Tool | tags | readOnly | destructive | derived | TRIAGE |
|---|---|---|---|---|---|
| `add_chart_to_existing_dashboard` | mutate | false | false | foreign | foreign |
| `create_virtual_dataset` | mutate | false | false | foreign | foreign |
| `generate_chart` | mutate | false | false | foreign | foreign |
| `generate_dashboard` | mutate | false | false | foreign | foreign |
| `save_sql_query` | mutate | false | false | foreign | foreign |
| `update_chart` | mutate | false | **true** | foreign | foreign |
| `update_chart_preview` | mutate | false | **true** | foreign | foreign |
| `generate_explore_link` | explore | false | false | foreign | foreign |
| `open_sql_lab_with_context` | explore | **true** | false | foreign | foreign |
| **`execute_sql`** ★ | mutate | false | **true** | foreign | **data** |
| **`get_chart_preview`** ★ | data | true | false | data | **foreign** |
| **`get_chart_type_schema`** ★ | discovery | true | false | data | **foreign** |
| `get_chart_data` | data | true | false | data | data |
| `get_chart_info` | discovery | true | false | data | data |
| `get_dashboard_info` | discovery | true | false | data | data |
| `get_database_info` | discovery | true | false | data | data |
| `get_dataset_info` | discovery | true | false | data | data |
| `get_schema` | discovery | true | false | data | data |
| `list_charts` | core | true | false | data | data |
| `list_dashboards` | core | true | false | data | data |
| `list_databases` | core | true | false | data | data |
| `list_datasets` | core | true | false | data | data |

Entry tools (`via_gateway = false`, **never denied**): `call_tool` ·
`search_tools` · `get_instance_info` · `health_check`.

**The three governed rows, with their required notes:**

| Tool | disposition | class | note must say |
|---|---|---|---|
| `execute_sql` | `data` | (a) correct-but-overridden-by-containment | the declaration is right — it really can mutate; we keep it as our only free-form data path and constrain the PAYLOAD (G4), not the capability |
| `get_chart_preview` | `foreign_surface` | (b) correct-but-orthogonal | no tag encodes surface ownership; it returns a picture Superset drew, and sits under the same `data` tag as `get_chart_data`, which returns numbers |
| `get_chart_type_schema` | `foreign_surface` | (b) correct-but-orthogonal | it describes the shapes Superset's own chart builder accepts; we do not build charts in Superset, so its output has no consumer on our side |

**Standing check (S65-2), not a blocker:** this table is an observation with a
timestamp, not a constant. If your own live read disagrees with it, that
disagreement is a **finding about the mirror** — record it and STOP. Do not
silently adopt newer values, and do not "fix" the table.

---

## §4 · GATES

### G1 · The `gateway_tool_policy` kind family (generic, zero migration)

Follow the `tool_doc` precedent **exactly** — it is the established template for
a per-backend kind family:

- `shared/dbConstants.ts`: add `GATEWAY_TOOL_POLICY_KIND_SUFFIX =
  '.gateway_tool_policy'` + `isGatewayToolPolicyKindId(kindId)`, mirroring
  `TOOL_DOC_KIND_SUFFIX` / `isToolDocKindId` at `dbConstants.ts:566-570`. ONE
  spelling (RULE 1); the api registry delegates here, never a second copy.
- `reference/coreSchemas.ts`: `GatewayToolPolicySchema = { tool: string (min 1),
  disposition: 'data' | 'foreign_surface', note: string (min 1) }`. **`note` is
  REQUIRED** — a governed override with no stated reason is a rumour (S66-5's
  law, applied one layer up). Register `CORE_SCHEMA_REFS.GATEWAY_TOOL_POLICY`.
- `reference/kinds.ts`: `buildGatewayToolPolicyKindDefs(backendIds)` mirroring
  `buildToolDocKindDefs` (`kinds.ts:262`), CORE + locked + RULE surface, minted
  over `BACKEND_IDS.filter(b => b !== SYSTEM_BACKEND_ID)` — **not** over a
  gateway-only list. A flat backend simply never has rows; the honest empty is
  the correct floor, and `tool_pattern` is DATA that can change.
- `selfSeedReconciler.ts`: one new `SEED_DOMAINS` entry
  `{ domain: 'gateway_tool_policy.kinds', backendId: 'system', instances: [],
  kindsOnly: [...] }` mirroring the `tool_doc.kinds` entry at `:100`. **Zero seed
  instances** — never floor-seed governed content.
- `evalGate.ts`: a NEW **additive** referential branch
  `stageReferentialGatewayToolPolicy`, modelled on `stageReferentialToolDoc`
  (`evalGate.ts:245`), combined in `runGate` alongside the existing branches
  which stay byte-identical. It must reject:
  (i) a row whose `tool` is not in the backend's **inner** (`via_gateway=true`)
  catalog; (ii) any row at all for a backend that has **no** `via_gateway` rows
  (a flat backend has no gateway surface to own) — with that exact reason;
  (iii) every row when the catalog is unavailable (`catalog not synced — sync
  first`, the existing wording pattern).
- `governance.ts`: the catalog trigger at `:279` must become **candidate-scoped**
  for this kind too — `isGatewayToolPolicyKind(draft.kind_id) ||
  published.some(isGatewayToolPolicyKind)`. This is the TOOL-DOC-1 FIX-1 lesson
  and skipping it self-inflicts a lockout of the whole Superset governance lane
  the moment the first row is published. `resolveToolDocCatalog`
  (`governance.ts:68`) already derives the gateway-vs-flat partition **from
  DATA**; reuse it (rename it to a family-neutral name if you like — same
  function, no second copy).
- **Genericity proof:** a test that mints the kind for an invented backend id
  (e.g. `zzz_synthetic`) with ZERO other edits and asserts the KindDef is
  correct, plus `grep -icE "superset|armes"` returning 0 over every new module.

### G2 · The derivation, and THE DIFF IS THE DELIVERABLE

- New pure module `api/cwf/_lib/backends/gatewayDisposition.ts`:
  `deriveDisposition(tags: readonly string[] | undefined):
  'data' | 'foreign_surface' | null`. Rule: intersection with
  `{mutate, explore}` non-empty → `foreign_surface`; a non-empty tag list with no
  intersection → `data`; **absent or empty tags → `null`** (unclassifiable).
  `null` is NOT `data`.
- `annotations` (`readOnlyHint` / `destructiveHint`) are **rejected as a
  derivation source, on evidence**: `readOnlyHint:false` selects 9 tools, and
  `open_sql_lab_with_context` — a pure foreign surface — declares
  `readOnlyHint:**true**`. The flag answers "does it mutate", not "whose screen
  does the output land on". Do not use it. It may be carried in the diff report
  as an observation.
- A **one-shot script** (`scripts/` , the `activateSyntheticSetV2.ts` precedent)
  that: reads the live inner catalog, derives a disposition for every row, prints
  a per-tool diff against the §3 TRIAGE column, and exits non-zero if the
  disagreement set is anything other than exactly
  `{execute_sql, get_chart_preview, get_chart_type_schema}`.
- **A phase that reports "the derivation matched" without showing the per-tool
  diff has not met this gate.** A derivation that agrees by accident and one that
  agrees by mechanism are indistinguishable from the outcome, and only the second
  survives Superset adding a 23rd tool.

### G3 · `gatewayPolicy.ts` — fail-CLOSED, beside F155, never inside it

- New `api/cwf/_lib/turn/gatewayPolicy.ts`. Resolution order per inner tool
  name: **governed row > derivation > deny**.
- **Fail-CLOSED, and loud with it.** `gatewayPreflight.ts` is deliberately
  fail-OPEN ("a defensive net, never a new way for a turn to fail"); mixing the
  two postures in one module is how silent holes are made. On a read failure
  this module **denies** and logs
  `[GatewayPolicy] read=failed action=deny-all reason=<code>`, and the denial
  text must say the policy could not be loaded — *not* that the tool is
  forbidden. An unclassifiable tool (`null`) is denied and recorded for human
  ratification.
- **Composition point:** the `call_tool` execute closure in
  `api/cwf/_lib/turn/stageTools.ts`, immediately after the F155 misroute check
  (`stageTools.ts:471-476`). The misroute check runs FIRST and keeps its exact
  current message. `gatewayPreflight.ts` stays byte-identical.
- **Preload once per turn**, exactly as `armesActiveToolNames` does at
  `stageTools.ts:330` — only when a `call_tool` entry point is actually offered.
  Every other turn is a zero-cost no-op with no DB read.
- **F198 (bounded reads) is a build constraint here, not a deferral.**
  `BackendToolsRepository.listByBackend` (`:86`) has `.order('tool_name')` but no
  `.range()`/`.limit()` and no truncation signal — it truncates silently at the
  PostgREST row cap. Add a **NEW paged method** for this module's read (range
  paging + an explicit `truncated` flag); leave `listByBackend` untouched so
  F155 and `mcpDiscovery` stay byte-identical. `truncated === true` is a
  **fail-closed** condition: a policy built from a partial catalog denies and
  says so. Today's ~163 rows are far under the cap; Path B's stated target is
  1000+ federated tools and this is the module that would silently stop seeing
  them.
- **Denial message:** a deterministic, test-pinned string in the
  `armesGatewayMisrouteMessage` shape (`gatewayPreflight.ts:33`), bilingual TR
  first per the established clarification precedent, carrying the **redirect**:
  Superset serves DATA here (`get_chart_data` preferred, `execute_sql` as the
  free-form fallback) and charts are drawn by CWF's own viz layer.

### G4 · `execute_sql` containment (the payload, never the capability)

A deterministic read-only statement check, applied only to `execute_sql`
payloads:

- after stripping leading whitespace and SQL comments, the statement must begin
  `SELECT` or `WITH` (case-insensitive);
- exactly one statement — a second statement (a `;` followed by anything other
  than trailing whitespace/comments) is rejected;
- rejection is a policy denial with its own reason, never a silent pass.

**Positive control is mandatory (S66-1):** ship a test that **fails when the
check is removed**, and paste the RED output proving it fails. A self-verify zero
is not believed until the command is proven able to fail.

`get_database_info` returns `allow_dml` — that is to be **READ** when we get
there, never assumed. Not this phase's job; do not infer it.

### G5 · Shape what the model SEES — and only that

There are **THREE** copies of every tool result in `stageTools.ts`, not two.
Verified live this session:

| Copy | Line | Consumer | This phase |
|---|---|---|---|
| `rawForClient = capRaw(resultText)` | `:558`, persisted at `:561` | the user's screen + the stored message | **UNTOUCHED** |
| `resultText` (scrubbed + capped) | span attr at `:579`, `setSpanIO` at `:590` | Langfuse / the trace | **UNTOUCHED** |
| `formatted` | `:566`, returned at `:601` | **the model** | **FILTERED** |

Filter `formatted` **only**, and only when
`toolDef.name === 'search_tools' && toolPatternOf(server.backend_id) ===
'gateway'`. Pin it with a test asserting that after a filtered turn the raw copy
still contains a denied tool name while the model copy does not.

**A risk you do not need to carry:** the history window (`stagesModel.ts:205`)
replays `{role, content}` text only — no tool payloads — so the unfiltered client
copy cannot re-teach the model on a later turn. Verified this session; do not
re-solve it.

### G6 · The counter must say UNKNOWN — at BOTH sites

`writeOffered` (`stageTools.ts:194` declaration, `:312` assignment, `:342` log)
is a **safety counter that reports 0 when it cannot see**. That is an
`empty ≠ zero` violation inside the governance layer itself. There are two sites,
and the second is **larger than the one the design note named**:

1. **The gateway surface.** Eight of the 22 inner tools are `mutate` and three
   declare `destructiveHint:true`, but they are never *offered*, so the counter
   structurally cannot include them — and superset has **zero** published
   `tool_annotation` / `tool_category` rows, so there is nothing published to
   read either.
2. **The full-set branch (NEW — found by live read this session, S68).**
   `writeOffered` is assigned **only inside the filtered `else` branch**. On the
   `ctx.isAnthropic || ctx.labActive?.routingBypass` branch (`:213`) `catRes` is
   never resolved, so the counter stays at its `0` initialiser **while every
   tool is offered, write-exposed ones included** — 35 of the 113 tools in the
   code-floor category manifest are `write` by the seed rule
   (`referenceData.ts:47-55`), and the live published set is 141 annotations.
   Sonnet takes this branch on every turn.

**Required behaviour:**
- `writeOffered` keeps its meaning (offered FLAT tools annotated `write`) and
  prints `unknown` — never `0` — whenever it was not measured. Use the
  honest-null shape `computeTurnClarification` already uses.
- Add a **separate** `gatewayWriteReachable=<n>|unknown`. Do not fold inner tools
  into `writeOffered`: they are *reachable*, not *offered*, and conflating the
  two words would replace a false zero with a false count. Once `gatewayPolicy`
  knows the dispositions it can report a real number; until then, `unknown`.
- **This gate is deliberately separable** from G1–G5. The honesty fix is correct
  even if the policy gate slips, and it must not be held hostage to it. Its own
  sub-commit, its own tests.

### G7 · Migration STATUS headers — the repo currently states a falsehood

**Its own commit**, separate from every code commit above, so the security diff
stays reviewable on its own.

**Eleven** migration files still carry `-- STATUS: authored, Operator-pending`
while all of them are **applied**. The verified floor at S67 close is **zero
pending migrations**, and six of the eleven are corroborated by live row counts
read this session (`backend_tools` superset = 26 rows · `factory_registry` =
17/17 · `backends.factory_param_name` armes = `factoryId` ·
`backend_entity_layers` = 3 rows · `entity_registry` = 17 factory + 779 line ·
the orphan cleanup executed). `20260716140000_backend_health.sql` already carries
the correct flipped form — copy its wording shape.

The eleven:

```
20260709160000_chat_quota_and_usage_analytics.sql
20260709170000_chat_quota_usage_execute_lockdown.sql
20260709180000_backend_trust_audit.sql
20260710120000_golden_specimens.sql
20260714120000_backend_tools.sql
20260721120000_turn_trace_digest.sql
20260722120000_backend_tools_via_gateway.sql
20260722130000_factory_registry.sql
20260725120000_backends_factory_param.sql
20260726120000_entity_registry_layers.sql
20260726160000_entity_registry_orphan_cleanup.sql
```

Rules: **append, never delete.** The original authoring note is preserved
verbatim below the new line — this is a ledger, not a rewrite. Uniform form:

```
-- STATUS: applied (Operator door, ADR-005). Recorded at S68 from the S67-close
-- verified floor: zero pending migrations. Original authoring note preserved
-- below.
```

**Comment-only, and provably so:** `supabase/**` appears in **no** tab's
`codeAreas` in `public/architecture/manifest.json` (verified this session), so
this gate contributes **zero** drift and **zero** docVersion movement. Prove the
change is comment-only with a `--`-line-stripped byte-compare (the S34-1
mechanism), and paste it.

### G8 · Drift + reseal

G1–G6 touch mapped areas (`api/cwf/_lib/**`, `api/cwf/_lib/turn/**`,
`api/cwf/_lib/knowledge/**`, `api/cwf/_lib/backends/**`, `shared/**`), so a
reseal and a docVersion bump **are** expected. Let `npm run check:doc-drift`
decide which tabs moved; do not predict the count. Reseal in the same commit as
the code it describes.

---

## §5 · SELF-VERIFY — paste the LITERAL output of each

1. `git rev-parse origin/master` at clone time, and the final branch head hash.
2. `npm test` summary line — file count and test count, before and after.
3. `npm run typecheck:api` — clean.
4. The **G2 per-tool diff**, in full. 22 rows, the three disagreements named.
   If it is not exactly those three: STOP, report, do not adopt.
5. `git diff --stat -- api/cwf/_lib/turn/gatewayPreflight.ts
   api/cwf/_lib/knowledge/backends/superset/gatewayProtocol.ts` → **empty**.
6. `git diff --name-only -- supabase/` → **only** the 11 files of G7, and the
   `--`-stripped byte-compare output proving each is comment-only.
7. `grep -icE "superset|armes"` over every NEW production module → `0` each,
   listed by filename.
8. The G4 positive control: the RED output with the check removed, then GREEN
   with it restored.
9. The G5 three-copy test: the assertion showing the denied tool name PRESENT in
   the raw copy and ABSENT from the model copy.
10. The G6 log line from a test run, at BOTH sites — full-set branch showing
    `writeOffered=unknown`, and a gateway turn showing
    `gatewayWriteReachable=unknown|<n>`. A pasted `0` from either site fails this
    gate.
11. `npm run check:doc-drift` final state and the docVersion you resealed to.
12. **Statement of what you did NOT do:** no migration authored, no SQL run, no
    `prompt.segment` publish, no secret read or written, no governed row
    published by this branch's code paths outside the sanctioned script.

**On CI (S67-2, and this is binding):** `rule26` is currently ~50 % noise on
master — 4 of the 8 master runs preceding `0d540c9` concluded `failure` on
already-merged code. **A green from it does not clear you and a red does not
block you on its own.** Gather evidence *before* any re-run: the mechanism named
in the log, the timing signature, and whether this diff can even reach the
failing surface. Report that reasoning; do not report "re-ran, passed".

---

## §6 · OUT OF SCOPE (named, so it is a deferral and not a gap)

- **F189** — inner tools carry no real JSON Schema (all 4 entry tools do; all 22
  inner tools do not, so the loss is exactly at the gateway boundary in
  `catalogSync.ts:125`). Denying 11 of 22 removes the dominant cost of the 05:02Z
  collapse, which LOWERS F189's priority. Do not fix it here.
- **F191** — `stageClarify.ts:315` resolves categories through an armes-literal
  read. Latent, not active. Record it; do not touch it.
- **F153** — Superset's `http://0.0.0.0:8080/...` base URLs. External Kale/ARDIC
  ops. This design removes our dependence on those URLs; it does not fix them.
- **D5's chart-binding risk** — the gateway flattens every inner tool to
  `call_tool`, so a recorded result carries `toolName='call_tool'` and the
  binder's `{tool, callId, match}` resolution under flattening **has never been
  observed working**. It is proven by a live turn AFTER deploy (§7), not by a
  unit test inside this phase.
- No change to ARMES's flat-catalog governance.

---

## §7 · DONE IS NOT DONE AT MERGE (S63-1)

The merge is not the proof. These are, and they are read AFTER deploy:

1. A live chart request against Superset data produces a chart **in the CWF
   panel**, bound to a `call_tool` result.
2. A denied tool is refused deterministically with the redirect message, and the
   trace shows the **raw unfiltered** `search_tools` result beside the filtered
   model-facing copy.
3. Tool-round count on a chart question, against the **15 rounds / 306 388 input
   tokens** baseline of the 05:02Z turn.
4. A gateway turn's log line no longer reports a write count of `0`.

---

## §8 · MERGE

`--no-ff`. **Squash is banned.** Do **not** compose the merge-commit message
yourself: when the branch is pushed and green, report the branch head hash and
request the merge message — the Architect writes it verbatim (S30-2). The merge
is not done until it is pushed and the remote hash is reported.

**TAIL ANCHOR (S61-3):** if you cannot read the line
`END · PHASE-F187-GATEWAY-SURFACE-1 · v1` immediately below, this prompt arrived
truncated — say so and request a re-send before writing any code.

<!-- END · PHASE-F187-GATEWAY-SURFACE-1 · v1 · 2026-07-28 · S68 -->
