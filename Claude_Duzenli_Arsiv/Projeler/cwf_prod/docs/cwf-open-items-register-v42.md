# CWF — Open-Items Register · v42

<!-- cwf-open-items-register-v42 · rev 42 · 2026-07-13 · Session 40. Supersedes v41.
     Verified floor at time of writing: origin/master 4177eb2 · 2162 tests / 211 files ·
     docVersion rev 71 · drift [OK] · CI green · prod READY (dpl_468n1Tjb…).
     Every claim below was read out of the tree or out of production logs — not recalled. -->

---

## 1 · WHAT CLOSED IN SESSION 40

**Three phases shipped, three merges, one production blindness found and killed.**

| Phase | Merge | Result |
|---|---|---|
| `WAVE2-CONTENT-1` | `e93906c` | 15 stage cards rewritten in the four-beat voice · `voiceGate.test.ts` · `docs` is a required TYPE · three renames (Routing→**Araç Eşleme**, Backend Trust→**Veri Otoritesi**, Tweak→**Sandbox Ortamı**; `?tab=` ids untouched) · **F38** grounding catch reads as a save · **F53** bucket hints bilingual |
| `WAVE2-IA-1` | `c7eb89c` | `sandboxLevers.ts` typed registry · **F50** four wrong stage chips corrected and pinned against the server's own `agentParams.ts` · **F51** view/session/governed classes · **F24** fingerprint to the top · class-C **"Kalıcı yap →"** exit ramp into Rules |
| `ROUTE-SCRAP-1` | `4177eb2` | **F71** reachability guard (RULE 31) · `getDailyManualScrap` reachable at last · **F69** a silent finish now speaks · reseal rev 70→71 |

**Owner-published governed rules (no code, no deploy):**
- `armes.tool_format_rule / getFactoryLines` — always call with `factoryId`; the unscoped call
  returned all 18 factories (**F62**, closed).
- `armes.tool_format_rule / getDailyManualScrap` — the default tool for scrap questions; never ask
  the user for an internal ID.
- `armes.tool_format_rule / getScrapBarcodeList` (amended) — barcode/shift breakdown only.

**Closed as invalid:** **F61** (the zoneId-is-a-UUID rule) — the sequencing already worked; the
stated evidence (3 wasted calls + a Java error) did not reproduce. **F66** (Langfuse Input/Output
`undefined`) — I was reading the wrong span; the AI-SDK tool span carries both.
**F72** (the Sandbox bypass flag looked inert) — it works; the flag had been cleared by a reload.

---

## 2 · THE SESSION'S ONE BIG LESSON (write this into the KB)

> **A tool the knowledge layer declares, the routing layer may never offer — and nothing was
> checking.** `getDailyManualScrap` was named in `ARMES_REFERENCED_TOOLS`, placed in the tool graph,
> and written into its own sequencing prose — while sitting in **no** routing category. It was
> unreachable *by construction*: `matchCategories` maps keywords to category **names**, and
> `getToolsForCategories` draws tools **only** from the static `CATEGORIES`. No governed rule, no
> cache clear, no learned mapping could have rescued it.

Three sub-lessons, each of which cost a wrong turn today:

1. **The owner's hypothesis ("teach it the tool") was right about the symptom and wrong about the
   layer.** The rule he published was correct and necessary — and changed nothing, because the tool
   was never on the table. *Diagnose the layer before writing the fix.*
2. **My own first diagnosis was wrong too** (I read "10 tool calls → no text" as a step-cap
   exhaustion; the logs said `finishReason=error` at 43k input). Production logs beat inference.
3. **The counterfactual is the cheapest proof.** One session flag (`routingBypass`) turned a
   month-old mystery into a closed case in 90 seconds: with the full tool set offered, the agent
   called the right tool immediately and returned 24 rows.

---

## 3 · LIVE QUEUE

### 3.1 — OWNER
- **ARMES-side bugs** (raised, tracking): `getScrapBarcodeList` returns `Zone not found` for KB7 /
  IKINCILALT (`eee10bde-52a3-11f1-9e11-860000928351`), and its output violates its own
  `outputSchema` (`required property 'orderPlanId' not found`). **Not ours to fix — do not shim.**
- **The Wave-2 re-walk (00→14) — STILL OWED.** This is Wave 2's acceptance test and the input to
  IA-2/DOCS-1's content. The metric: findings-v5 should be **short** and must not contain
  *"beni bir yere getiriyor, ne yapacağımı bilmiyorum."*
- **G5 decision — ~2026-07-20:** personal MCP overrides disable → **DELETE** (they hold two RAW
  secrets in the DB).
- **W0.f prod smokes** (carried): first guardrail cron fire · first L5 rollout (= the `CRON_SECRET`
  positive verification).

### 3.2 — W1 · WAVE 2 (two phases left)
1. **WAVE2-IA-2 · Rules/Kinds** (FULL) — guided publish strip (the S38 three-place problem) ·
   persistent backend-slice label · **F49** archived-rows filter · **F46** role split · **F26**
   Kinds→Rules order · draft-visibility-after-create. Design note: `cwf-wave2-rules-ia-design-v1`.
2. **WAVE2-DOCS-1** (FULL) — the six user docs + `DOCS_REGISTRY` rows + panel 📖 links + F42
   arrival strips. **Exit criterion (already type-encoded): `DOC_SLUGS ⊆ DOCS_REGISTRY` slugs** —
   today 15 stage cards point at planned docs and render **no** link (by design, never a dead one).

### 3.3 — NEW, MINTED IN SESSION 40 (ordered by weight)

| # | Finding | Where | Weight |
|---|---|---|---|
| **F39** | `MAX_TOOL_ROUNDS` is env + hardcoded `8`, invisible in admin, not an `agent.param`. Runaway loops ARE prevented — but the owner cannot raise the ceiling for a heavy A3-style question without a deploy. **Now has live evidence** (the 43k-token asakai turn). | `api/cwf/_lib/llm/config.ts:17` | **HIGH** — the natural next governed param |
| **F73** | `[MCP Discover] armesMes … SSE error: Non-200 status code (401)` **intermittently**. On those turns the gateway count flips (4 → 8) and the offered inventory changes turn-to-turn. An agent whose tool inventory flickers is not a deterministic system. | prod logs, 2026-07-13 | **HIGH** — needs its own diagnosis phase; do not guess |
| **F70** | *"Never ask the user for an internal system ID"* is agent **behaviour**, not per-tool trivia. Today it is patched into two `tool_format_rule` payloads. Its real home is a governed **prompt segment** (stage 09). | `prompt.segment` lane | MEDIUM |
| **F63** | Chart X-axis renders raw epoch ms (`1783807…`) on hourly series — unreadable. | client viz | MEDIUM |
| **F64** | The chat "Ham tool çıktısı" panel shows tool **output** but not tool **input/args**. The owner had to open Langfuse to read `{factoryId:"KB7"}`. *A manual step a diagnosis requires is a missing feature.* | client | MEDIUM |
| **F65** | `cwf.backend.id` is **empty** (`""`) on `cwf.mcp.tool` spans — provenance blind in the trace. Kin to the open "provenance visibility in chat answers" item. | `api/**` obs | MEDIUM |
| **F67** | An 18-factory tool result (7.5k+ chars) did **not** inflate the next LLM input by anything like its size (20748 → 20229 tokens). Something is trimming — **and I do not know what, or whether it is deterministic.** A silent trimmer near the empty≠zero boundary must be *seen*. | `resultStore` / stageTools | MEDIUM — diagnosis, not a fix |
| **F68** | `StageEntry.no` is typed `string`, so `sandboxLevers`' `StageNo` widens — a bogus stage is caught by a **test**, not by `tsc`. The compile-time teeth I claimed in the IA-1 prompt do not exist. Fix: `as const` on `STAGES`. | client types | LOW — batch with IA-2 |
| **F74** | The learned map is saturated with stopwords (`veya`, `tüm`, `bir`, `şey`, `yaz,`) each mapped to all six categories — visible in today's logs. Fresh evidence for **SEMANTIC-ROUTING-1**; the keyword router is structurally wrong for agglutinative Turkish. | `tool_category_cache` | LOW now, HIGH at W3 |

### 3.4 — CARRIED (unchanged)
- Provenance visibility in chat answers (Stream-E remainder) · governed `gateway_rule` teaching
  `search_tools` QUERY FORM · consistency lens → **SEMANTIC-ROUTING-1** (W3) · F47 per-floor audit
  doc (G3) · the textbook governance-replay explainer.

---

## 4 · STANDING RULES — ADDED THIS SESSION

- **RULE 31** (in-repo, `.agents/AGENTS.md`): every tool a domain pack declares must be a member of
  `reachableToolNames()`; asserted in CI. A gateway backend's own tools are **correctly** outside
  this check — they reach the model through their own unconditional partition, not the categories.
  Do not conflate the two when auditing a new backend.
- **S40-1:** *A counterfactual beats a hypothesis.* When a capability "doesn't work," the cheapest
  next move is the session flag that removes one layer — not a rule, not a code read.
- **S40-2:** *Verify the flag was applied before interpreting the experiment.* A `bypass=off` in the
  logs invalidated a whole round of reasoning (mine and the owner's).
- **S40-3 (Architect discipline):** do not claim teeth you have not bitten. The IA-1 prompt asserted
  a compile-time check that the type system does not actually provide (F68). AG disclosed it in a
  docblock; the summary softened it. **Read the docblock, not the summary.**

<!-- END · cwf-open-items-register-v42 · rev 42 · 2026-07-13 -->
