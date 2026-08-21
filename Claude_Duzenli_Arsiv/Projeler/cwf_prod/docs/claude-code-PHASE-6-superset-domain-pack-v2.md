# Claude Code 4.8 — PHASE 6 (v2): Superset domain pack + dual-backend assembly & scoping — a GATEWAY backend, taught not transcribed
<!-- version: v2 · 2026-06-27 · cwf_yaprak P6 superset domain pack -->
<!-- v2 changelog: no structural change from v1. Clarified the runtime SOURCE-OF-TRUTH direction (governed DB is the runtime source of truth; code referenceSchema = seed + reset target + outage floor) so the Superset pack is built DB-first/code-floor, mirroring the locked P4/ARMES model — NOT code-primary. Added the SOURCE-OF-TRUTH MODEL block below. -->
### cwf_yaprak · master HEAD `7027389` (P5.6) · Superset is a semantic GATEWAY, not flat tools · the pack teaches the protocol, never enumerates the catalog · ARMES stays byte-identical
> Run with Claude Code 4.8 (AntiGravity) from **cwf_yaprak**, AFTER P5.6 (`7027389`). P6 gives the agent a typed **Superset** domain pack (mirroring the ARMES P2 pack), wires the **already-multi-backend** assembler to compose it, and resolves **active backends at runtime** (today they are hardcoded to `['armes']`). This is a KNOWLEDGE + PROMPT phase: the MCP transport already discovers and calls Superset's tools — what is missing is the protocol *knowledge* and the dual-backend *scoping*.

---

## THE ONE THING THAT MAKES SUPERSET DIFFERENT (internalize before writing a line)
ARMES exposes ~140 **flat, named** tools with strict input schemas; its pack is a graph over those names. **Superset exposes only 4 gateway tools** — `get_instance_info`, `health_check`, `search_tools`, `call_tool` (see `docs/superset-tool-catalog.json`, the read-only ground truth). Real work is: `search_tools(intent)` → read the returned **`parameters_hint`** (a hint, NOT a strict JSON schema) → `call_tool(name, args)`. The ~30 underlying tools are **discovered at runtime**, never called by name directly.

This dictates the entire shape of the phase via the §8 determinism/safety split:
- **Deterministic core (governed, structurally code-locked):** the **gateway protocol** (search-then-call; never fabricate an underlying tool name; never `call_tool` a name you didn't get from `search_tools`), **`parameters_hint` handling** (pass args per the hint; on a `call_tool` error, re-search/adjust — do NOT invent params), **BI-domain semantics** (dataset vs chart vs dashboard vs SQL-Lab query; saved vs ad-hoc), and **Superset blind spots** (the empty≠zero analog). These are **CORE-class** (field structure locked to the code Zod schema = un-poisonable shape), their **values live in the governed DB** (gated-editable, audited, resettable), and the same code referenceSchema is the **outage floor** — see the model below.
- **Soft/learned → routing, the gateway itself:** *which* `search_tools` phrasing finds the right underlying tool for a given intent. This is learned at RUNTIME by the gateway — it is exactly the "learning improves how the agent FINDS tools, never what it KNOWS" layer. Optional advisory routing hints may be SOFT DB rules.

### SOURCE-OF-TRUTH MODEL (locked since P4 — do NOT invert)
The runtime **single source of truth is the governed DB** (`DbKnowledgeProvider` warm→read). The code `referenceSchema` plays exactly three roles — it is NOT the primary runtime source when the DB is up:
1. **Seed** — the values published into the DB.
2. **Reset target** — admin "reset-to-reference" rewrites these code defaults as a new published version (history intact).
3. **Outage floor** — on DB-down/empty/unwarmed, `getDomainContext` transparently serves the code baseline so the agent is NEVER knowledge-blind (the empty≠zero guard must survive a Supabase outage, since Supabase and the Superset MCP are separate infra).

So **mirror ARMES exactly**: author the Superset facts as the code baseline (seed + floor in `StaticKnowledgeProvider`), seed them into the governed store, and read them at runtime via `DbKnowledgeProvider` (DB-first, code-floor). Do NOT build Superset to serve primarily from code with the DB as an optional overlay — that inverts the locked model. CORE = structure-locked-to-code + value-in-DB + resettable; correctness is protected by the lock + eval-gate + reset, not by keeping values out of the DB.

### THE NAMED TRAP — do NOT transcribe the catalog into the prompt
Dumping the 30-tool catalog into the pack is forbidden: it is brittle (stale the moment Superset changes), it re-creates the closed-enum trap P4.7 killed, it bloats tokens, and it defeats the gateway's entire purpose (runtime discovery). `superset-tool-catalog.json` is GROUND TRUTH for *authoring and verifying* the pack's semantics + a tool-name verification flag — **not** content to paste. The pack stays protocol + semantics + blind-spots. If your Superset pack contains a list of all underlying tools, you built the wrong thing.

## SCOPE BOUNDARY (load-bearing)
- **IS:** a typed `knowledge/backends/superset/` domain (code baseline) · a `composeSupersetContext` governed-store composer + seeded Superset CORE rules · `buildSupersetPack` replacing the `'' // Phase 3` stub · **runtime `activeBackends` resolution + RBAC scoping** in `chat.ts` (replacing hardcoded `['armes']`) · an end-to-end dual-backend exercise.
- **IS NOT:** any change to the MCP transport/discovery/`callTool` plumbing (it already unions servers and calls arbitrary tools — `discoverMcpTools`/`discoverServerTools` are untouched), the LLM `gateway`, the eval-gate machinery, grounding *machinery*, governance/admin, or the chat-stream contract. NO new vector/embeddings. NO live mutating Superset call.
- **Byte-identical invariant (P2a, `promptSnapshot.test.ts`):** `buildSystemPrompt(ctx, [])` and the ARMES-only prompt must stay **byte-for-byte unchanged**. The Superset pack text appears ONLY when `'superset'` is in `activeBackends`.

## HARD PRE-FLIGHT GATE (stop if any fails — report findings as deltas)
1. On `7027389` (P5.6); `tsc -b` + api strict-nodenext typecheck + `vite build` + `oxlint` + `vitest` green (report numbers; P5.6 baseline was 224).
2. Confirm these REAL shapes before writing (verify, list any delta):
   - `api/cwf/_lib/prompt/assemble.ts` — `buildBackendPack`'s `case 'superset': return ''; // Phase 3` (the stub to replace); the assembler already maps over `activeBackends` (multi-backend-ready).
   - `api/cwf/chat.ts` — **the hardcode**: `await dbKnowledgeProvider.warm(message, { backends: ['armes'] })` + `buildSystemPrompt({ toolNames, query: message }, ['armes'])` (~L583–584). `loadUserMcpServers(userId)` (~L212) + `discoverMcpTools(servers)` (already unions ALL enabled servers; warm-cached) — **do not modify discovery**; you read its `serverId`/`serverName` to derive backends.
   - `api/cwf/_lib/knowledge/DbKnowledgeProvider.ts` — `composeFor(backend, rules)` with the marked stub (*"P6 adds the gateway/Superset composer … Until then, non-armes backends yield an empty governed slice"*) and `warm(query, scope)` iterating `scope.backends`.
   - `api/cwf/_lib/knowledge/backends/armes/{index,types,toolGraph,zones,metrics,formats,blindSpots,glossary}.ts` — the typed-domain template to mirror; `composeArmes.ts` — the composer template; `StaticKnowledgeProvider.ts` — the code-baseline floor (how the ARMES slice is served with no DB).
   - **The scoping question (resolve in pre-flight):** the `MCPServerDef` shape (~L86) and the `mcp_settings` row shape — **how does a connected server map to a `backend_id`?** Confirm whether an explicit `backend_id` exists per server. Also confirm `user_backend_scopes` (the RBAC scope table) shape and the `backends` registry.
   - `docs/superset-tool-catalog.json` — confirm it is the gateway shape (`get_instance_info`/`health_check`/`search_tools`/`call_tool` + underlying tools via `search_tools` with `parameters_hint`) and was generated **read-only** (no `call_tool`/mutations).
3. Report shapes + deltas, then proceed.

## HARD CONSTRAINTS
- **ARMES untouched + byte-identical.** Prove the ARMES-only and empty-backend prompts are unchanged (snapshot test green; diff of the armes pack/knowledge files empty except additive shared types). The Superset slice must never alter the ARMES slice.
- **No catalog transcription.** The pack is protocol + semantics + blind-spots. The full underlying-tool list lives ONLY in the catalog JSON + a verification flag, never in injected prompt text.
- **Determinism/safety split enforced:** Superset blind-spots + gateway-protocol = CODE baseline (and CORE-locked governed kinds where seeded). Routing hints = SOFT. Correctness never lives in a fuzzy/learned layer.
- **Discovery/transport frozen.** No edit to `discoverMcpTools`/`discoverServerTools`/`callTool`/timeout logic. P6 reads discovery output and changes only *which backends the prompt is built for*.
- **No live mutation.** Any Superset round-trip in P6.4 is read-only (`search_tools` + a read-only `call_tool` such as listing dashboards/datasets). If live creds are absent in the env, use a recorded fixture of the request/response shapes — do NOT block the phase, and NEVER call a mutating underlying tool.
- **RULE 1 / i18n / secrets:** table names + tunables → `dbConstants`/`params`; new copy → `translations.ts` (TR/EN) if any UI; never read/print `.env*` or any token. No new dependency.
- **Versioning (standing rule):** regenerate the runtime topology as a NEW file `docs/cwf-runtime-topology-v3.html` (do not overwrite v2); bump the internal `rev`. Same for any KB/diagram.

---

## SUB-PHASE P6.1 — Superset typed knowledge domain (CODE baseline)
Mirror `knowledge/backends/armes/` as `knowledge/backends/superset/`, but adapt the types to a **gateway** (do not force ARMES's flat-tool shape):
- `types.ts`: a **gateway-protocol** structure instead of a flat ToolGraph — e.g. `GatewayStep` (orient → search → call, with the rule "never call a name not returned by search"); `ResourceKind` (dashboard/chart/dataset/database/saved-query/SQL-Lab — the semantics analog of ARMES Zones); `MetricDefinition`/`GlossaryTerm` (carry over); `BlindSpotRule` (carry over — Superset's empty≠zero); `ParameterHintRule` (the `parameters_hint`-is-not-a-schema format rule).
- Author the **deterministic facts** (from the catalog + Superset 6.1 semantics, NOT copied tool lists):
  - **Gateway protocol** steps + the hard "search-then-call, never fabricate a tool name, never invent params, on error re-search" rules.
  - **Superset blind spots** (SACRED, the IKINCILUST analog): a forbidden/permission-scoped resource returns empty/forbidden → *"not visible to your Superset role,"* NEVER *"zero / none exist."* An unconfigured metric → not *"metric = 0."* A row-limit/truncated result → not *"that is all the data."* A failed `call_tool` → not *"no data."*
  - **BI semantics** the agent must get exactly right (dataset vs chart vs dashboard; saved chart vs ad-hoc SQL; what `get_instance_info` counts mean).
- `index.ts`: aggregate exports + a `SUPERSET_TOOLS_VERIFIED` flag and a `SUPERSET_GATEWAY_TOOLS` list (the FOUR gateway tool names only) **cross-checked against `superset-tool-catalog.json`** (read-only; mirror the ARMES `*_TOOL_NAMES_VERIFIED` discipline — verify, never guess; the underlying ~30 are deliberately NOT enumerated here).
- Wire the Superset slice into `StaticKnowledgeProvider` so the code floor serves it with no DB.
- **GATE:** the Superset code-baseline slice is non-empty and renders the gateway protocol + blind spots + BI semantics; it contains **no enumeration of underlying tools**; the ARMES slice is byte-unchanged; `SUPERSET_TOOLS_VERIFIED === true` reflects a real cross-check against the catalog.

## SUB-PHASE P6.2 — Governed-store composer + seed (with the eval-gate proof)
- `composeSuperset.ts`: `composeSupersetContext(rules)` mirroring `composeArmesContext` — composes published Superset rules into the injected slice.
- `DbKnowledgeProvider.composeFor`: replace the marked stub → `if (backend === 'superset') return composeSupersetContext(rules)`.
- **Seed Superset CORE facts as governed rules** (reuse P4 `rule_kinds`): confirm which kinds are CORE-locked (field-structure pinned to the Zod schema — for Superset, **blind-spots + gateway-protocol invariants are CORE-locked**) vs SOFT (routing hints). Seed via the same authored path ARMES used; DDL/seed handoff via Supabase MCP if a migration is needed (the CLI is Unauthorized — author + hand off, as in P5.6).
- **Eval-gate proof (the Superset analog of the IKINCILUST poison test):** a poisoned Superset rule — e.g. one asserting *"an empty Superset result means zero"* or *"call a tool name without search_tools"* — must be **REJECTED at the behavioral stage**, exactly as the barcoded-IKINCILUST rule is.
- **GATE:** published Superset rules compose into the slice; the poisoned Superset rule is REJECTED (show the verdict); DB-down/empty → the code floor still serves the protocol (degradation proven); the ARMES governed path is unaffected (its compose output unchanged).

## SUB-PHASE P6.3 — `buildSupersetPack` + assembler wiring + runtime `activeBackends` scoping
- `prompt/backends/superset/pack.ts`: `buildSupersetPack(query)` → `dbKnowledgeProvider.getDomainContext(query, { backends: ['superset'] }).injected` (mirror `buildArmesPack`).
- `assemble.ts`: replace `case 'superset': return ''` → `return buildSupersetPack(ctx.query ?? '')`. (No other assembler change — it already composes multiple packs.)
- `chat.ts` — **resolve `activeBackends` at runtime** (replace the two hardcoded `['armes']`):
  - Derive the active set from the user's **enabled servers** (via `discoverMcpTools` output / `loadUserMcpServers`) mapped to `backend_id`, **intersected with the user's `user_backend_scopes`** (RBAC). **Committed mapping (default):** an explicit `backend_id` per `mcp_settings` server entry (backend identity = DATA, per P4.7; FK to `backends`). If the rows lack it, add it additively + a one-time inference for existing rows by `serverName` — do NOT branch on a hardcoded server-name list in business logic (that is the enum trap).
  - `warm(message, { backends: activeBackends })` then `buildSystemPrompt({ toolNames, query: message }, activeBackends)`.
  - Empty active set (no scoped/enabled backend) → falls back to `[]` → the byte-identical core (never crash).
- **GATE (dual assembly + scoping, end-to-end):**
  - A user with BOTH servers enabled+scoped → the prompt contains BOTH the ARMES pack AND the Superset gateway protocol (dual assembly proven).
  - A user scoped to only one backend → only that pack (scoping proven; the other's facts absent).
  - **A user with only ARMES → the ARMES-only prompt is BYTE-IDENTICAL to P5.6** (`promptSnapshot.test.ts` green). The Superset text appears only when superset is active.
  - Cross-backend isolation: an ARMES blind-spot fact never appears in a Superset-only prompt and vice versa.

## SUB-PHASE P6.4 — End-to-end exercise + docs + topology v3 + commit
- **Mechanical dual-backend proof:** with both backends active, show (real read-only round-trip if creds present, else a recorded fixture) that a Superset intent drives `search_tools(intent)` → `call_tool(name, args)` using a name returned by search (never fabricated), and that an ARMES intent still routes to the flat ARMES tools — in the same agent loop, no cross-talk.
- **Grounding link:** confirm Superset blind-spot facts are available to the facts-ledger validator the same way ARMES facts are (so an empty Superset result is never grounded as "zero"). If the validator is backend-scoped, extend it additively; do not change its machinery.
- Docs: `.agents/CHANGELOG.md` (What/Where/Verify incl. the byte-identical proof, the poison-rule rejection, the dual-assembly + scoping evidence), `.agents/skills/cwf-project-kb/SKILL.md` (Superset = gateway; pack teaches protocol not catalog; blind-spots sacred; activeBackends = enabled ∩ RBAC), `.agents/AGENTS.md` (a rule: *"Superset is a gateway — search_tools then call_tool; never fabricate an underlying tool name; never transcribe the catalog into the prompt; empty Superset result ≠ zero"*), `docs/ROADMAP.md` (P6 done).
- **Versioned diagram:** `docs/cwf-runtime-topology-v3.html` (NEW; v2 not overwritten; bump `rev`): add the Superset gateway path (browser → chat.ts → Superset MCP `search_tools`/`call_tool`) alongside the ARMES flat-tool path; mark the activeBackends ∩ RBAC scoping gate.
- Final green run (report numbers; add tests: `composeSupersetContext`, the activeBackends resolver, the byte-identical snapshot, the poison-rule rejection). Commit `feat(phase6): Superset domain pack + dual-backend assembly & runtime scoping` and **push + prove sync** (`git log --oneline origin/master..HEAD` empty; `git rev-parse origin/master` = the new HEAD).

---

## SELF-VERIFICATION CHECKLIST (confirm each, with evidence)
- [ ] Pre-flight: on `7027389`; baseline green (numbers); shapes confirmed vs assumptions — **especially the server→backend_id mapping** and the catalog's read-only gateway shape (report deltas).
- [ ] P6.1: Superset code-baseline slice non-empty (protocol + blind-spots + BI semantics); **no underlying-tool enumeration in injected text**; `SUPERSET_TOOLS_VERIFIED` reflects a real catalog cross-check; ARMES slice byte-unchanged.
- [ ] P6.2: `composeSupersetContext` wired; Superset CORE facts seeded (blind-spots CORE-locked); **poisoned Superset rule REJECTED at behavioral** (show verdict); DB-down → code floor serves the protocol; ARMES governed path unchanged.
- [ ] P6.3: `buildSupersetPack` live; `activeBackends` resolved at runtime from enabled ∩ RBAC (no hardcoded `['armes']`, no server-name branch in logic); **dual assembly proven** (both packs) + **scoping proven** (one backend → one pack) + **ARMES-only BYTE-IDENTICAL** (snapshot green) + cross-backend isolation.
- [ ] P6.4: mechanical search_tools→call_tool proof (real read-only or fixture; no fabricated tool name; no mutation); grounding sees Superset blind-spots; docs updated; **`docs/cwf-runtime-topology-v3.html` created (v2 intact)**; committed AND pushed (sync proven).
- [ ] No discovery/transport/gateway/eval-gate machinery changed (diffs empty); no vector; no `.env*` touched; no token logged; no new dependency; no live mutating Superset call.
- [ ] `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` green — exact numbers.
- [ ] State explicitly: **"Phase 6 complete — Superset is taught as a gateway (search_tools → call_tool; underlying tools discovered at runtime, NOT enumerated in the prompt); a typed Superset domain (code baseline + governed CORE-locked blind-spots) composes via composeSupersetContext; buildSupersetPack is wired and activeBackends is resolved at runtime as enabled ∩ RBAC scopes (no hardcoded ['armes']); dual-backend assembly + scoping proven end-to-end; ARMES-only and empty-backend prompts are byte-identical (snapshot green); a poisoned Superset rule is rejected at the eval-gate; discovery/transport/gateway machinery unchanged; runtime-topology bumped to v3; pushed and in sync."**

Do NOT build: a transcribed underlying-tool catalog in the prompt, any mutating Superset call, vector/embeddings, a hardcoded server-name→backend branch, any change to MCP discovery/transport/`callTool`, the LLM gateway, or the eval-gate machinery. Stop after the checklist and present your report — including the byte-identical ARMES proof, the poison-rule rejection verdict, the dual-assembly + scoping evidence, and the search_tools→call_tool round-trip (real or fixture).
