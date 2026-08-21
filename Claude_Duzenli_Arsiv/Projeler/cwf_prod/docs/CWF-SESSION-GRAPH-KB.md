# CWF/EAIP — Session Graph Knowledge Base
### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.

Legend: `→` leads-to/causes · `⇄` bidirectional · `vs` comparison · `*` critical/invariant · `[A:B]` path/namespace · `{x,y}` set · `≈` approx · `❌` rejected

---

## GRAPH: NODES

### N1 — PROJECT [cwf]
CWF (Chat With Factory) = agentic AI over live MCP backends. End goal `→` reusable foundation for EAIP (Maymun's multi-layer enterprise agentic platform). Bar: bible-grade, no-spaghetti, SOTA, ~100% reuse. *Quality never sacrificed for speed.*

### N2 — REPOS
- `[cwf_yaprak]` * = CANONICAL clean repo. All new architecture here. Seeded via curated keeper-copy from CWF-DEMO (NOT clone), fresh git.
- `[CWF-DEMO]` (github.com/maymun207/CWF-DEMO) = OLD repo, virtual-factory origin, still has sim code. Team kept adding features (Superset, mcpPool, multi-server) `→` drifted ahead on *features*, behind on *cleanliness*. Role: demo safety-net + harvest source (capability only, never files). MUST be frozen.
- `[cwf_prod]` = the new Claude project where the next session runs.

### N3 — BACKENDS (multi-backend agent)
Both under `ksadmin@ardictech.com` in Supabase `mcp_settings`:
- ARMES = ceramic MES, ≈140 flat tools (Kale Seramik / KB7).
- Superset = Apache Superset 6.1 BI, GATEWAY pattern (`search_tools`+`call_tool` over ≈22 underlying), NOT flat. Catalog: `[docs/superset-tool-catalog.json]`.
- *4-tool server seen once = neither* → wrong row read.

### N4 — ARCHITECTURE SPINE (EAIP seam map)
Each future-layer concern isolated behind an interface NOW `→` migration = repoint adapter, not rewrite.
| seam | now | future EAIP |
|---|---|---|
| `gateway.ts` | VercelAiGateway (streamText) | LiteLLM/vLLM/Ollama |
| `prompt/*` (assembler+modules+registry) | file modules | Prompt Store (Langfuse) |
| `KnowledgeProvider` | Static→Db provider | LlamaIndex/Qdrant/Graphiti |
| `grounding/*` (facts-ledger+validate) | prompt+stub | Guardrails AI |
| `runAgent` (loop) | linear+ports | LangGraph + hybrid decide |
| `trace.ts` | NoopTracer | Langfuse |
| `tools/*` (mcp+meta+result) | MCP adapter | L3 tool nodes |
| `config/*` | env+consts | MLflow params |

### N5 — PROMPT ARCHITECTURE
`buildSystemPrompt(ctx, activeBackends)` = backend-aware assembler. Order (lost-in-middle-safe): identity→safety→time→toolProtocol→grounding→[domain packs]→outputFormat. Core = backend-agnostic. Domain pack (per-backend) = persona + knowledge. toolProtocol KURALLAR 1–10 GENERATED from config+meta-tool-name constants (not literals).

### N6 — KNOWLEDGE ARCHITECTURE
`KnowledgeProvider.getDomainContext(query,scope)→{injected,references}`. Two layers: always-inject (critical: blind-spots, tool-graph entry, metrics) vs retrieve-on-demand (glossary, anomalies). *Critical core = typed/deterministic, NO vector* (IKINCILUST⇄IKINCILALT are embedding near-neighbors → vector would corrupt). pgvector gate left OPEN behind interface for post-demo Layer-2 corpus only.

### N7 — GOVERNANCE MODEL (Phase 4)
- Code `referenceSchema` * = immutable baseline = DB seed + DB-down fallback floor.
- DB tables: `rule_kinds` (super_admin) + `domain_rules` (instances, scoped editor) + `rule_versions` + `rule_audit`.
- Kind classes: CORE {zone, blind_spot, tool_graph_node, metric_definition, tool_format_rule} = field-structure LOCKED to code Zod (reset target); SOFT {glossary_term, persona_fragment, routing_hint} = DB-editable + new soft kinds addable w/o code (field_spec interpreted by generic validator).
- *Rule: all instances editable (gated); CORE field-structure code-locked; SOFT field-structure DB-editable.*
- Reset-to-reference = writes baseline as NEW published version (preserves audit/rollback), not delete.

### N8 — EVAL-GATE (the linchpin) *
Publish pipeline server-side, in order: (1) schema-validation (code Zod core / field-spec soft) → (2) referential-integrity (tool refs resolve vs discovered catalog; zone/metric refs vs published) → (3) behavioral-eval (deterministic mock-boundary blind-spot/sequencing suite vs candidate-composed prompt). ALL pass `→` `status=published`. *UNBYPASSABLE: only service-role publish endpoint sets published; RLS denies any client `published` write (42501).* Optional live-LLM verify = super_admin confidence check, NOT the gate.

### N9 — RBAC
`super_admin` (users, kinds, reset, all backends) / `domain_editor` (per-backend scope, drafts+instances) / `user` (chat, own config, own telemetry). Enforced server-side (`requireRole`/`requireBackendScope`), not UI-only. Tables: `user_roles`, `user_backend_scopes`. `ksadmin`=super_admin.

### N10 — DOMAIN FACTS (ARMES, *sacred*)
- `getFactoryLines` = entry point → resolve zone UUID → then OEE/scrap.
- Zones KB7: {Glazur3, FIRINALT, IKINCILALT, IKINCILUST}. *IKINCILUST barcodeless.*
- *Blind-spot: barcodeless → getDailyManualScrap empty → empty ≠ zero. NEVER "sıfır/zero"; say "ARMES'te görünmüyor/barkodsuz".*
- K4 = definitive throughput counter.
- Formats: getDailyOeeValues = epoch-ms @ midnight TRT (UTC+3); getScrapBarcodeList shift hyphenated {24-08, 08-16, 16-24}.
- OEE = availability × performance × quality.
- `ARMES_TOOL_NAMES_VERIFIED` flag (true after P3 live cross-check).

### N11 — INFRA (preserved/proven, don't regress)
`toolResult.ts` 3-tier formatter + `resultStore.ts` large-result layer (handle + `aggregate_records`/`query_records` meta-tools; solved real 5470-record analytics failure) + `resolve_time_range` (forbids manual epoch) + tool-relevance filter (142→~15) + Anthropic prompt caching (stable prefix) + raw passthrough + SSE heartbeat + graceful mid-stream error. MCP SDK `@modelcontextprotocol/sdk` pinned EXACT 1.29.0 (no caret — fast-moving transport).

### N12 — TELEMETRY/OBS
`telemetry_events` (user_id, session_id, type{message,llm_call,tool_call,error}, model, tokens, tool_name, latency, cost, payload-redacted). Best-effort (never breaks chat). = Langfuse seam first consumer + future learned-routing substrate.

---

## GRAPH: EDGES (key causal chains)
- demo-safety-net(CWF-DEMO) `→` freedom to build cwf_yaprak pristine (no rush) `→` quality-over-speed honored.
- multi-backend(ARMES+Superset) `→` domain-pack-per-backend `→` assembler backend-aware `→` Superset prompt = just another domain pack.
- "add a feature" request `→` *always hides determinism/safety split* `→` name split before impl (correctness→code/gated; advisory→soft).
- learning improves FIND(routing) `⇄` never KNOW(correctness) `→` learned-routing safe, learned-facts forbidden.
- eval-gate `→` makes DB-governed critical rules SAFE `→` enables "no code change per edit" w/o poison risk.
- reports `vs` code `→` *trust code* (P2/P3 reports diverged from actual code once; cross-phase verification born from this).

---

## DECISIONS LOG (decision → rationale; ❌rejected)
- D1: new repo via curated keeper-copy ❌full-clone (clone carries sim spaghetti; copy-all-except-exclude makes tendrils break build = forcing function).
- D2: Supabase KEEP+repoint ❌remove (needed for auth + per-user mcp config + shared tool-cache + telemetry; only sim-coupling removed).
- D3: gateway unify all providers incl default-gemini ❌keep Gemini-native generateContent (RULE-0 duplication; one path = parity automatic). Native synthesis-nudge dropped (SDK terminates natively).
- D4: deterministic typed KB core, NO vector ❌pgvector-for-core (lossy; near-neighbor zone names corrupt). pgvector OK for post-demo Layer-2 corpus.
- D5: domain rules in gated DB (incl critical) ❌code-only (Maymun: avoid "code-change per edit"). Safe BECAUSE eval-gate + reset-to-reference + core-field-lock.
- D6: eval-gate deterministic mock-boundary ❌live-LLM-as-gate (slow/nondeterministic; live = optional confidence check only).
- D7: MCP SDK exact-pin ❌caret (fast-moving transport; SOTA = deliberate-verified-latest not blind-latest).
- D8: Phase 4 = engine only, panel = Phase 5 (verifiability; endpoints testable w/o UI).
- D9: server-side MCP resolution `→` token off client (security; proven via bundle+network scan).

---

## PROMPTS PRODUCED (in /files; reference, don't regenerate)
1. `claude-code-SEED.md` — clean repo from CWF-DEMO donor, sim-free, build-green.
2. `claude-code-FOUNDATION-part1.md` — Supabase data layer (migrations, persistence repos, telemetry schema).
3. `claude-code-FOUNDATION-part2.md` — (superseded by P3) auth + server-side resolution.
4. `claude-code-PHASE-1-gateway-unify.md` — one gateway path, one prompt source, delete Gemini-native.
5. `claude-code-PHASE-2-modular-prompt-armes-pack.md` — modular core + ARMES domain pack (blind-spot).
6. `claude-code-PHASE-3-complete.md` — SDK upgrade + dual-backend discovery + Auth/RBAC + server-side resolution + telemetry.
7. `claude-code-PHASE-4-governance-store.md` — governed store + unbypassable eval-gate + reset + DbKnowledgeProvider.
8. `claude-code-VIZ-RESTORE.md` — CWF-native table/chart renderers + strip dead sim macros (frontend, parallel-safe).
9. `CWF-SERVICE-ARCHITECTURE-AND-BUILD-PLAN.md` — the full architecture + roadmap doc.
10. `CLAUDE-PROJECT-INSTRUCTIONS.md` — durable project instructions.

---

## STATUS (snapshot — live version = `docs/ROADMAP.md` in cwf_yaprak)
DONE: SEED · Foundation-P1 · P1(gateway) · P2(prompt+ARMES pack) · P3(SDK+dual-backend+Auth/RBAC+server-side+telemetry).
IN PROGRESS: P4 (governance store + eval-gate) — AG building.
NEXT: P5 (governance panel UI: telemetry viewer / user-mgmt / soft-cache editor / domain-rule authoring + candidate-rule inbox, role-scoped) · P6 (multi-backend harvest: Superset domain pack [gateway-aware] + mcpPool + routing from CWF-DEMO).
COMPLETION SET: facts-ledger validator · Langfuse wiring · eval golden harness · viz-restore · ARCHITECTURE.md+ADRs.
VISION (P7+): self-improving KB (curation agent → candidate inbox → human gate) · CC-via-MCP for rare core-kind code change.

## MAYMUN-OWNED OPEN ITEMS (remind when relevant)
apply Supabase migrations via Supabase MCP (CLI Unauthorized) + fill `.env.local` · keep real ARMES+Superset configs under ksadmin · `.gitignore` `.claude/` · FREEZE CWF-DEMO · real-ARMES confidence pass (large tables→handle path) in running app.

## WORKING LOOP
Maymun runs Claude Code 4.8 on AntiGravity (implements) ⇄ Claude = architect (diagnose, decide, write gated phase prompts w/ pre-flight + self-verify checklist demanding evidence). Maymun pastes AG report → Claude reviews CRITICALLY vs actual code (not report claims) → flags discrepancies → writes next gated prompt. Style: TR strategy / EN technical+prompts; diagnosis-first; committed recs not menus; tight prose; name hidden traps; honest push-back.
