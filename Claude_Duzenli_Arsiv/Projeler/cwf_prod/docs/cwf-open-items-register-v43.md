# CWF — Open-Items Register · v43

<!-- cwf-open-items-register-v43 · rev 43 · 2026-07-13 · Session 40 CLOSE. Supersedes v42.
     Floor at write time: origin/master d3e0c4e · 2173 tests / 212 files · docVersion rev 72 ·
     drift [OK] · CI green · prod READY.
     NOTE: PARAM-GOV-1 is IN FLIGHT with AG — the floor will move. Re-derive at session open. -->

---

## 1 · WHAT CLOSED IN SESSION 40

**Four phases merged. One production blindness killed. One defect CLASS exposed.**

| Phase | Merge | What it bought |
|---|---|---|
| `WAVE2-CONTENT-1` | `e93906c` | 15 stage cards in the four-beat voice · `voiceGate.test.ts` · `docs` a required TYPE · three renames (Routing→**Araç Eşleme**, Backend Trust→**Veri Otoritesi**, Tweak→**Sandbox Ortamı**) · F38 grounding catch reads as a save · F53 bilingual hints |
| `WAVE2-IA-1` | `c7eb89c` | `sandboxLevers.ts` · **F50** four wrong stage chips corrected + pinned against the server's `agentParams.ts` · **F51** view/session/governed classes · **F24** fingerprint to the top · **"Kalıcı yap →"** exit ramp |
| `ROUTE-SCRAP-1` | `4177eb2` | **F71** reachability guard (**RULE 31**) · `getDailyManualScrap` reachable · **F69** a silent finish speaks · reseal 70→71 |
| `MCP-EXPLORER-1` | `d3e0c4e` | **F77** probe shows tool count + `auth 401` · tool catalog + `inputSchema` viewer · **⚠ ulaşılamaz** badge · read-only (no `callTool`) · reseal 71→72 |

**Governed rules the owner published (no code, no deploy):**
- `armes.tool_format_rule / getFactoryLines` — always pass `factoryId` (killed the 18-factory dump).
- `armes.tool_format_rule / getDailyManualScrap` — the default scrap tool; never ask the user for an
  internal ID.
- `armes.tool_format_rule / getScrapBarcodeList` (amended) — barcode/shift breakdown only.

**Closed as INVALID (do not resurrect):** F61 (zoneId-UUID rule — sequencing already worked) ·
F66 (Langfuse Input/Output `undefined` — I was reading the wrong span) · F72 (Sandbox bypass looked
inert — it works; a reload had cleared it).

---

## 2 · THE HEADLINE FINDING — **F78: 29 ARMES TOOLS ARE UNREACHABLE**

The Explorer drawer, on its first day, printed: **"29 tools unreachable."**

`getDailyManualScrap` was not an accident. **29 of ARMES's 141 tools sit in no routing category and
are therefore never offered to the model** — invisible, for months. We fixed one; the class remains.

Two questions must be answered *before* `ROUTE-GOV-1` is designed, and they are not the same
question:

1. **Which 29?** (Owner will paste the list once the copy button ships — `EXPLORER-1-FIX-1`.)
2. **Should all 29 be offered?** The drawer already shows `createRecipe` and `updateLineStop` in the
   catalog. **Some ARMES tools WRITE.** Offering a tool that can create a production recipe to an LLM
   is a decision, not a default. → **F80**, below. *A reachability fix that blindly categorises all 29
   would hand the agent write access to the factory.* Do not let "fix the 29" become that.

---

## 3 · THE QUEUE

### 3.1 — OWNER · TOMORROW, BEFORE ANY WORK

**SEC-1 (deferred by the owner from S40 with explicit acknowledgement — non-negotiable at open):**
1. Delete `~/.gemini/antigravity-ide/scratch/query_db.ts` (it reads `.env.local` and builds a
   service-role client).
2. **Rotate `SUPABASE_SECRET_KEY`** — Supabase → revoke + regenerate → Vercel env → **redeploy** →
   local `.env.local`. *Rationale: the service-role key bypasses RLS on the production DB and it
   entered a third-party model's context.*
3. Make the Operator fence header permanent (§5, S40-4).

### 3.2 — OWNER · OTHER

- **Delete the dead MCP row** (Operator, lane is now working): user `d388d5c2…`'s personal `armesMes`
  (`mcp-1782457873092-0`), `enabled=true`, **no credential at all** → a guaranteed 401 on every
  discovery. Architect will write the fenced prompt.
- **The Wave-2 re-walk (00→14) — STILL OWED.** It is Wave 2's acceptance test and the raw material for
  IA-2/DOCS-1. Metric: findings-v5 should be short and must not contain *"beni bir yere getiriyor,
  ne yapacağımı bilmiyorum."*
- **The 29 unreachable tool names** (after `EXPLORER-1-FIX-1` ships the copy button).
- **ARMES team** (raised, tracking): ① `getScrapBarcodeList` → `Zone not found` for KB7/IKINCILALT
  (`eee10bde-52a3-11f1-9e11-860000928351`) · ② its output violates its own `outputSchema`
  (`required property 'orderPlanId' not found`) · ③ they are planning **separate auth for writes** —
  that decision shapes `MCP-INVOKE-1` and F80.
- **G5 (~2026-07-20):** personal MCP overrides → **DELETE** (they hold raw secrets; the owner's own
  personal `armesMes` carries a raw `apiKey` while global uses `apiKeyRef`).
- **W0.f prod smokes:** first guardrail cron fire · first L5 rollout (= the `CRON_SECRET` positive
  verification).

### 3.3 — PHASES, IN ORDER

| # | Phase | State | Notes |
|---|---|---|---|
| 1 | **`PARAM-GOV-1`** | **IN FLIGHT (AG)** | `MAX_TOOL_ROUNDS` → `agent.maxToolRounds`, clamp `[2,24]`, stage `11`, `sessionTweakable:false`, fingerprint-stamped. **Needs an Operator seed after merge** (Architect writes it). Then: owner publishes `16` and re-runs the A3 question **with no deploy**. Closes **F39**. |
| 2 | **`EXPLORER-1-FIX-1`** | prompt to author | HOTFIX (client-only, single file). Resizable/large tools dialog · **"⚠ Sadece ulaşılamazlar"** filter · **"Listeyi kopyala"** · search hits descriptions too. Closes **F79**. *Unblocks the 29-tool list.* |
| 3 | **`ROUTE-GOV-1`** | design note pending | **Owner chose scope (ii):** tool↔category membership **AND** keywords become governed. Row shape `{name, keywords[], tools[]}` so SEMANTIC-ROUTING-1 replaces the *matcher*, not the rows. **The reachability invariant MOVES to the eval-gate** (a published row must not orphan a declared tool — otherwise a DB row re-opens the hole CI now guards). **`ALWAYS_INCLUDE` stays in code** (the availability floor is sacred). Must resolve **F78 + F80** first. |
| 4 | **`MCP-INVOKE-1`** | design note done (`cwf-mcp-explorer-design-v1` §2) | The gated tool console. New capability `MCP_TOOL_INVOKE` (super_admin) · backend-scope check · **audit-FIRST** row · args validated against `inputSchema` · explicit LIVE-PRODUCTION confirm · rate-limited · **zero writes to `messages`** (C1). **Owner's ruling on logging: log everything.** Architect's bounded shape: full **args** (scrubbed of credentials) + result **truncated to 8 KB** + total size + `truncated` flag + hash of the full body. Needs a migration ⇒ Operator lane. |
| 5 | **`WAVE2-IA-2`** (Rules/Kinds) | design note ready | Guided publish strip · persistent backend-slice label · **F49** archived filter · **F46** role split · **F26** Kinds→Rules order · **F7/F8 schema visibility** (the owner's real need behind the `coreSchemas` question — the panel never shows a kind's field spec). Batch **F68** here (`as const` on `STAGES`). |
| 6 | **`WAVE2-DOCS-1`** | last Wave-2 phase | The six user docs + `DOCS_REGISTRY` rows + 📖 links + F42 arrival strips. **Exit criterion is already type-encoded:** `DOC_SLUGS ⊆ DOCS_REGISTRY`. Today 15 cards point at planned docs and render **no** link (never a dead one). |

### 3.4 — OPEN FINDINGS LEDGER

| # | Finding | Weight |
|---|---|---|
| **F78** | **29 ARMES tools unreachable** (no routing category). The class, not the instance. | **HIGH** |
| **F80** | **Some ARMES tools WRITE** (`createRecipe`, `updateLineStop` are in the catalog). Which tools may ever be offered to an LLM is a **governance decision**, not a categorisation chore. ARMES's planned write-auth changes this. | **HIGH** |
| **F73** | Intermittent `[MCP Discover] armesMes … 401` → **ROOT-CAUSED**: another user's credential-less enabled row. Fix = delete it (Operator). The inventory flicker it caused is real: an agent whose tool set changes turn-to-turn is not deterministic. | **HIGH → trivial fix** |
| **F76** | Admin **cannot see or manage another user's personal MCP rows.** A credential-less row 401s forever, invisible. An unmanageable configuration surface. | MEDIUM |
| **F70** | *"Never ask the user for an internal system ID"* is agent **behaviour**, patched today into two tool rules. Its home is a governed **`prompt.segment`** (stage 09). | MEDIUM |
| **F63** | Chart X-axis renders raw epoch ms on hourly series — unreadable. | MEDIUM |
| **F64** | The chat "Ham tool çıktısı" panel shows tool **output** but not **input/args**. (Cost us a Langfuse dig to read `{factoryId:"KB7"}`.) | MEDIUM |
| **F65** | `cwf.backend.id` is empty (`""`) on `cwf.mcp.tool` spans — provenance blind in the trace. | MEDIUM |
| **F67** | An 18-factory tool result (7.5k+ chars) did **not** inflate the next LLM input proportionally. **Something trims, and we don't know what.** A silent trimmer next to the empty≠zero boundary must be *seen*. Blocks governing the `resultStore` thresholds. | MEDIUM (diagnosis) |
| **F68** | `StageEntry.no` is typed `string` ⇒ `sandboxLevers`' `StageNo` widens; a bogus stage is caught by a **test**, not `tsc`. Fix: `as const`. | LOW (batch into IA-2) |
| **F74** | The learned map is saturated with stopwords (`veya`, `tüm`, `bir`, `istiyorum`) each mapped to all six categories. Evidence for **SEMANTIC-ROUTING-1**: keyword routing is structurally wrong for agglutinative Turkish. | LOW now, HIGH at W3 |
| **F79** | Tools dialog not resizable, names truncated, no unreachable-filter, no copy. | LOW (phase #2) |

### 3.5 — CARRIED (unchanged)
Provenance visibility in chat answers · governed `gateway_rule` teaching `search_tools` QUERY FORM ·
consistency lens → **SEMANTIC-ROUTING-1** (W3) · F47 per-floor audit doc (G3) · the textbook
governance-replay explainer · **the 🔴 inventory remainder**: `METRIC_ALIASES` (small) and the
`resultStore` thresholds (blocked on F67).

---

## 4 · THE INVENTORY (asked for and answered in S40)

24 code-side tables. **14 governed** (DB runtime SSOT, code = seed + reset + outage floor, UI-editable).
**6 structural by design** (`ALWAYS_INCLUDE`, permissions, CORE schemas/kind ids, render floor, DB
enums, tool JSON schemas) — governing these would trade a hard guarantee for a knob.
**4 red** (value living in code): `CATEGORIES` (→ ROUTE-GOV-1) · `MAX_TOOL_ROUNDS` (→ PARAM-GOV-1,
in flight) · `METRIC_ALIASES` · `resultStore` thresholds (blocked on F67).
Full table: `cwf-code-vs-db-configurability-inventory-v1`.

**The owner's ruling, accepted:** the red four all go green. **The Architect's condition, accepted:**
every red→green move **relocates its guard** — categories governed ⇒ the reachability invariant moves
to the eval-gate; the ceiling governed ⇒ the `[min,max]` clamp is mandatory. *Governed does not mean
unguarded; it means the guard moved.*

---

## 5 · STANDING RULES ADDED IN SESSION 40

- **S40-1 — A counterfactual beats a hypothesis.** One session flag (`routingBypass`) turned a
  month-old mystery into a closed case in 90 seconds.
- **S40-2 — Verify the flag was applied before interpreting the experiment.** A `bypass=off` in the
  logs invalidated a full round of reasoning (the owner's and mine).
- **S40-3 — Do not claim teeth you have not bitten.** The IA-1 prompt asserted a compile-time check
  the type system does not provide (F68). AG disclosed it in a docblock and softened it in the
  summary. **Read the docblock, not the summary.**
- **S40-4 — The Operator fence header, verbatim, on EVERY Operator prompt:**
  > DB access is via **Supabase MCP only**. Never open/read/grep `.env*`. Never build a client with a
  > service-role key. Never write to the repo or disk (except `.agents/operator-inbox/`). If any of
  > these seems necessary — **STOP and report**. Report = raw output, no commentary, no "helpful"
  > extra steps.
- **S40-5 — A system you cannot see is a system you cannot debug** (owner's directive). Log
  everything — bounded: full args (scrubbed), results truncated with size + hash.
- **S40-6 — Read the catalog, not the logs.** I inferred "Superset grew to 8 tools" from a log count.
  Wrong: Superset has **4**; `gateway=8` was global + personal Superset both enabled. The Explorer
  drawer answers this in one click now — use it.
- **RULE 31** (in-repo `.agents/AGENTS.md`): every tool a domain pack declares must be in
  `reachableToolNames()`; CI-asserted. Gateway backends are correctly exempt (their tools reach the
  model through an unconditional partition).

---

## 6 · THE SESSION'S LESSON, IN ONE PARAGRAPH

The owner's hypothesis — *"teach the agent the tool"* — was right about the symptom and wrong about
the layer. He published a correct, necessary governed rule, and **nothing changed**, because the tool
was never on the table. My own first diagnosis was wrong too (I read *10 tool calls → no text* as a
step-cap exhaustion; the logs said `finishReason=error` at 43k tokens). What broke the deadlock was
neither of us being clever: it was **looking** — production logs, then a counterfactual flag, then the
catalog. And the deepest finding is that **the system had the answer the whole time and the panel
threw it away.** Two layers had disagreed silently for months, and nothing was checking. Now something
is (RULE 31), and the drawer shows the damage: **29 more tools**, still dark.

<!-- END · cwf-open-items-register-v43 · rev 43 · 2026-07-13 -->
