# CWF-S128-SESSION-CLOSE-v1 — a diagnosis run to the floor, and a tool-chain audit

CUT 2026-09-02 evening (Istanbul). Opened from bootstrap v128.

**What this session was.** Not a landing session. The owner declared a two-purpose exercise:
(a) learn to debug a live routing failure through CWF's own surfaces, step by step;
(b) measure whether those surfaces are *sufficient* to debug it. Purpose (b) is the more
valuable half and produced the durable output: a nine-entry gap register.

**Anchor, verified.** master `d8895114744dbb23ba5633d726a0814cfe0468d5`. Confirmed on the
wire by a route Claude did not have to ask for: the admin Control Plane renders build
`d889511` in its header on every screen, and the owner's screenshots carry it. Production
runs from the anchor commit. Deployment observed: `dpl_B3a9C6686VKDStizEPaF1gV5V9ag`.

---

## 1 · THE PRESENTING FAULT

Owner prompt to CWF, three times across the day, byte-identical:

> KB7 fabrikası için 24 Ağustos 2026 tarihli reçeteleri ver ve armes backendde
> getRecipeTemplatesByDate toolunu kullan

CWF never called `getRecipeTemplatesByDate`. It called `resolve_time_range`,
`getFactoryList`, `getRecipeTemplates` — and then asked the owner for `materialNumber`
(and on the second turn also `recipeType`).

Turns measured: `ddb30a0e158c7fa824f2a9d94b00d8f4` (14:01:34Z) ·
`cf2149dcca67297a5c7b36b2637981ea` (15:39:12Z) ·
`e4765b0a764ba5cc61d1e3e70856ba3f` (19:22:56Z, the Step-7 probe).

## 2 · THE DIAGNOSIS, AS MEASURED

**The tool exists.** `backend_tools`: `getRecipeTemplatesByDate`, backend `armes`, status
`active`, required `[factoryId, date]`, `first_seen_at 2026-09-01 09:31Z` — it arrived
**the day before the fault**. Same family, same arrival: `getOrdersByDate`,
`getEmployeesByShiftAndDate`, `getMaterialListByFactory`.

**The model never saw it.** Stage 07 `register-tools` output, read from Langfuse:
`path: semantic` · `matchedCategories: ["production","factory"]` · `droppedCategories: []`
· `stickyAdded: ["factory"]` · `irFrame {action: QUERY_MASTER, object: RECIPE,
entity_ref: [KB7], time.surface "24 Ağustos 2026", confidence HIGH}` ·
`offeredToolNames: Array(33)`.

All 33 names were enumerated on screen — a **closed count**, not a failed search.
`getRecipeTemplatesByDate` is absent. `getRecipeTemplates` sits at index 28.

**The arithmetic closes with nothing left over.** 23 (published `production`) + 2
(published `factory`: `getFactoryList`, `getFactoryLines`) + 4 (gateway: `call_tool`,
`get_instance_info`, `health_check`, `search_tools`) + 4 (honestbench `hb_*`) = **33**.
Every offered name is accounted for; nothing accounted for is missing. This is what
retired the two surviving alternates (mcp_settings filtering; `tool_arg_policy` filtering) —
both would have *removed* names, and no name is missing.

**Root cause.** The tool→category map lives in `domain_rules` kind `tool_category`,
backend `armes`. Runtime reads **published** rows only. `getRecipeTemplatesByDate` appears
only in **draft** rows of key `factory` (09-01 09:33, and twice more on 09-02) — automatic
classification drafts. Published `factory` v2 (19 Jul) and published `production` v3
(16 Jul) do not contain it. Live counts at close: `draft=12 · published=12 · archived=29`.

**Independent confirmation from the owner's screen.** Tool Matching → Browse shows
`factory` as *8 seed · 1 learned · 2 tools* (`getFactoryList`, `getFactoryLines`) and
`production` as *23 tools*. The panel and the DB agree by separate routes.

**Second-order consequence.** With no `…ByDate` tool visible, the model fell to the
nearest-named neighbour, `getRecipeTemplates`, whose required `materialNumber` was
unfilled — and the ask-valve fired correctly on the wrong question. The refusal machinery
is sound; a misleadingly similar neighbour is what defeated it.

## 3 · THE STEP-7 PROBE (clean experiment)

Prompt: *"KB7 reçetelerini ver, getEmployees toolunu kullan"* — a tool name from a
published-but-unmatched category. Trace `e4765b0a…`: same 33 names, `getEmployees` absent
though `employee` is published with 8 tools.

Two separable results:
- **G-7 confirmed.** A user naming a tool has **zero** access effect. The name is extracted
  (`extractedKeywords[10] = "getrecipetemplatesbydate"` in the original fault, measured) and
  then goes nowhere.
- **The refusal was correct.** CWF said plainly: *"istediğiniz `getEmployees` aracı mevcut
  araçlarım arasında bulunmamaktadır."* S122's self-describing refusals (#473) work here.

## 4 · THE GAP REGISTER — the session's primary output

| # | Gap | Status at close |
|---|---|---|
| G-1 | Chat surface exposes no turn/conversation id; the id exists (`7bca89a4-caa2-4134-bc71-fb6edad415d9`) and is in the admin URL | measured |
| G-1b | Chat carries no URL state; admin does (`?tab=inspect`) — defect is chat-specific | measured, narrowed |
| G-2 | Inspect shows stage structure and DB reads with prose purposes, but **not stage output payloads** — `offeredToolNames` required a hop to Langfuse | measured, narrowed |
| G-3 | Catalog does not show "what makes this tool offerable" | open — Tool Census not visited |
| G-4 | No reverse query: *"why was tool X not offered?"* | measured |
| **G-5** | **The structure layer has no counter at all.** Tool Matching's `route/learn/propose/curate/publish/serve` strip measures the **keyword** layer only, and says so; nothing measures tool→category coverage | **measured — most expensive** |
| G-6 | draft ↔ published not comparable on one screen | measured |
| G-7 | No explicit-name pin | **measured (Step 7)** |
| G-8 | `offeredCount: 37` vs `Array(33)` | **resolved — name collision** |
| G-9 | `mount-probe` and `honestbench` declare the **same four tool names** (`hb_entity_lookup`, `hb_grove_status`, `hb_grove_yield_total`, `hb_sensor_readings_list`); count sees 8, name list dedupes to 4; nothing disambiguates which backend serves a call | **new** |

**Answer to purpose (b):** the tool chain was **sufficient** — the diagnosis closed
completely through seven screens across two products, and several screens already encode
the right discipline (`showing 30 of 36 reads — the rest were cut at the size cap`;
`seed_state — absence-only seeding ×14 attempts, new rows not counted`; and, in red,
`UNTAGGED (bug) tool_arg_policy`). What is missing is not diagnostic power but the
**signal that starts a diagnosis**. A tool arrived on 09-01 at 09:31Z and no surface told
anyone. G-5's cure is not invention: extend the existing `UNTAGGED (bug)` pattern.

## 5 · ARCHITECT SELF-CORRECTIONS

- **A-REC-S128-1** — Wrote a Step-0 instruction ("find the turn id in chat") from DB
  knowledge, assuming the chat surface exposed what the DB holds. Measured the interface
  only after the owner's screenshot refuted it. An interface step written without
  measuring the interface.
- **A-REC-S128-2** — In the first turn asserted "37 offered tools, `…ByDate` absent",
  taking `offeredCount` for the list length without enumerating. Conclusion right, ground
  wrong: an indicator used as ground truth. Corrected by the owner's screen.
- **A-REC-S128-3** — Read Tool Matching's `publish 0` as evidence for *this* fault
  ("the lifecycle didn't run to the end"). That counter measures the keyword layer, not
  the structure layer where the fault lives. A gauge from a neighbouring subsystem read as
  proof about ours. Same class as A-REC-S128-2, committed second, in the same session.

Also logged, not an error but a boundary: the Architect wrote per-step operational
instructions to the owner. Legitimate **only** because the owner declared a learning and
witnessing exercise; witnessing is his surface. Recorded so that a future reader does not
mine this transcript for a general licence.

## 6 · PARKED — OWNER ITEMS, UNTOUCHED

1. `onay PHASE-TOOL-VISIBILITY-1` — named spend/scope consent. Card body in §7.
2. Witness question to **Hülya**: was the `…ByDate` / `…ByFactory` family opened
   deliberately on 09-01, and are more tools coming? If yes, G-5's guard is not optional.

## 7 · THE CARD, AS IT NOW STANDS (cut on consent)

**PHASE-TOOL-VISIBILITY-1** — five parts, in this order:

- **(a) Governed-knowledge publish.** New `armes.tool_category` versions:
  `getRecipeTemplatesByDate` + `getOrdersByDate` → `production`;
  `getEmployeesByShiftAndDate` → `employee`; `getMaterialListByFactory` → `material`.
  Old versions archived. DB-editable layer; **no code**. Evidence: rerun the original
  prompt, `offeredToolNames` contains the name, stage 10 shows a
  `cwf.mcp.tool` call to it.
- **(b) Explicit-name pin.** A query token matching an active `backend_tools.tool_name`
  joins the offered set regardless of category; trace records `explicitPinned`.
  Evidence: the Step-7 probe re-run offers `getEmployees`.
- **(c) G-5 guard.** A structure-layer counter beside the Tool Matching strip, in the same
  visual language, reading *"active tools in no published category: N"*, red like
  `UNTAGGED (bug)`. Today it would read 4; on 09-01 09:31Z it would have read 1.
- **(d) G-1.** Turn/conversation id visible and copyable in chat; chat URL carries
  conversation state.
- **(e) G-9.** Disambiguate identically-named tools across `mount-probe` and `honestbench`,
  and reconcile `offeredCount` with `offeredToolNames`.

Sequencing note under SOTA-1: (a) is the fix, (c) is what stops the class. Neither is
deferrable on convenience grounds; if either is to be sequenced later, the deferral must
name (a) which criterion stays unproven, (b) when it becomes provable, (c) which
measurement settles it.

## 8 · INFRASTRUCTURE ATTEMPTED, NOT LANDED

The Architect has **no local code access and no GitHub credentials** this session. Measured:
`git clone` → *could not read Username for github.com*; `gh` not installed; the only local
bridge is PDF Tools, scoped to `/Users/tunckahveci/{Documents,Downloads,Desktop}` and
PDF-only. The whole diagnosis therefore ran on DB + trace, never on source. Step 5's
"runtime reads published only" was closed by arithmetic rather than by bytes — sound, but
weaker ground than the laws prefer.

Remedy attempted through the Docker MCP gateway (owner asked for it explicitly):

- `mcp-config-set` for `rust-mcp-filesystem` was first sent with the config nested under
  the server name. The schema declares no required fields, so it was **accepted without
  error** and silently stored empty. Corrected to root-level
  (`allow_write:false`, `allowed_directories:[Desktop, Documents]`, `enable_roots:false`).
  *A configuration call that does not error has not thereby configured anything.*
- Both `rust-mcp-filesystem` and `filesystem` were added; both returned `0 tools` with the
  message *"Assume that it is fully configured and ready to use."* Two verification searches
  found no filesystem tool. **The success message is false as read.**
- Owner restarted Claude Desktop. Tools still absent → the restart hypothesis is
  **falsified for this conversation**. Standing hypothesis, untested: a conversation's tool
  catalogue is bound at conversation start, so newly added gateway servers appear only in a
  **new** conversation.

**First test in S129:** in a fresh chat, search for filesystem tools. Present → hypothesis
holds, point them at the `cwf_yaprak` clone (path still unmeasured; the owner's proposed
`/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - Codes` was not found by
the one tool able to look, which is a single negative probe and not proof of absence —
take the path from Finder's *Copy as Pathname*, not by hand). Absent → fall to
`desktop-commander` (`long_lived: true`, different lifecycle). GitHub needs
`github.personal_access_token`, which is the owner's surface and enters Docker MCP
Toolkit's own secret store — never the transcript.

## 9 · SOTA — THE NAMED DEFICIENCY, NOW THREE SESSIONS DEEP

S126 and S127 advanced no SOTA criterion; **S128 advanced none either**. The 7-key and
16-criterion scoreboards were not re-measured and nothing here may be quoted from them
without `architect:open` + `cwf-sota-definition`. This session bought a real fault's root
cause and a gap register — worth having, not a criterion. Named, not hidden.

## 10 · WHAT DID NOT HAPPEN

- No card was dispatched; no lane ran; no PR landed; master is unchanged from the anchor.
- The land.ts steel (bootstrap v128 ⓶) was not touched.
- The ledger re-entry card (v128 ⓷) was not cut.
- AG-5's liveness was not measured this session.
- Tool Census, Session Sandbox, Replay, Bench, Topology were never opened — G-3 stays open
  for that reason, and any claim about what they do or don't show would be unmeasured.

<!-- END · CWF-S128-SESSION-CLOSE-v1 -->
