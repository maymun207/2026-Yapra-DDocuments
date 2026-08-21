# Dev Schedule Patch v1 — VS/E Organisation Phase 1

| Field         | Value                                                          |
| ------------- | -------------------------------------------------------------- |
| Date          | 2026-05-31                                                     |
| Status        | Proposed, pending tech lead approval                           |
| Affects       | §10 Phase 1 stage backlog of `development_schedule_antigravity.docx` |
| Companion ADRs | ADR-001 (LiteLLM), ADR-002 (MCP)                              |
| Author        | Claude (single-author rule per dev schedule §9)                |

---

## Summary

Four concrete changes to the Phase 1 stage backlog, driven by the Architecture Review and Bootstrapping recommendations evaluated and partially accepted in the previous design session:

1. **Stage 1.3.4** — goal expanded to include per-agent prefix-cache hit rate (Architecture Review, context-bloat early signal).
2. **Stage Group 1.4 (LLM gateway)** — reduced from 7 stages to 2; replaces custom service with LiteLLM-backed gateway (ADR-001).
3. **New Stage Group 1.7 (MCP tool servers)** — 6 stages establishing the external tool protocol (ADR-002).
4. **Stage 1.5.1 (Agent base class)** — clarified to depend on both 1.4 and 1.7.

### Phase 1 net impact

| Metric                    | Before        | After         |
| ------------------------- | ------------- | ------------- |
| Total Phase 1 stages      | ~35–45        | ~34–44 (net +1) |
| Stage Group 1.4 size      | 7 stages, ~3–4 weeks | 2 stages, ~1 week |
| Stage Group 1.7 size      | —             | 6 stages, ~1.5–2 weeks |
| Phase 1 calendar duration | 6–8 weeks     | 6–8 weeks (unchanged) |

Phase 1 duration does not move because Stage Groups 1.4 and 1.7 can run in parallel after Stage Group 1.3 completes.

---

## Change 1 — Stage 1.3.4 expanded

### Before

| Stage | Name | Size | Goal |
| ----- | ---- | ---- | ---- |
| 1.3.4 | Cost burn dashboards (Grafana + Metabase) | M | Per-agent, per-feature cost trends. |

### After

| Stage | Name | Size | Goal |
| ----- | ---- | ---- | ---- |
| 1.3.4 | Cost & cache-efficiency dashboards (Grafana + Metabase) | M | Per-agent, per-feature cost trends; per-agent prefix-cache hit rate over time; alert on hit-rate decline > 10% week-over-week. |

### Rationale

The Architecture Review flagged context-window bloat as a Phase 5+ risk: as the Living Knowledge graph grows, hydrated system prompts can drift larger, degrading reasoning quality on Sonnet and eroding Anthropic prefix-caching efficiency. Prefix-cache hit rate is the **leading indicator** of this drift. Adding it to the Phase 1 dashboards costs almost nothing now; bolting it on at Phase 5 means we have no historical baseline to detect the drift against.

LiteLLM (per ADR-001) emits cache-hit information in its callbacks, so the wrapper (Stage 1.4.2) can include it in the telemetry event. This stage just consumes it on the dashboard side.

---

## Change 2 — Stage Group 1.4 reduced from 7 stages to 2

### Before (7 stages, ~3–4 weeks)

| Stage | Name | Size | Goal |
| ----- | ---- | ---- | ---- |
| 1.4.1 | LLM gateway service (Python or Go) | L | Central proxy for all model API calls. |
| 1.4.2 | Multi-provider routing (Anthropic, Google) | M | Route based on agent type + criticality. |
| 1.4.3 | Anthropic prefix caching integration | M | Cache breakpoints for stable system prompts. |
| 1.4.4 | Fallback chain logic (Opus → Sonnet → Gemini) | M | Retry with degradation on rate limits. |
| 1.4.5 | Per-agent cost budgets and enforcement | M | Hard caps that block runaway agents. |
| 1.4.6 | Gateway telemetry instrumentation | S | Every call emits a telemetry event. |
| 1.4.7 | Vault integration for API keys | S | No raw keys in config; all via Vault. |

### After (2 stages, ~1 week)

| Stage | Name | Size | Goal |
| ----- | ---- | ---- | ---- |
| 1.4.1 | LiteLLM proxy deployment | M | Deploy LiteLLM as a service in the application zone. Configure providers (Anthropic primary, Vertex AI Gemini fallback). Vault references for provider keys. Keycloak JWT auth for service-to-service. Health checks. Helm chart / docker-compose. Initial routing rules (static YAML). Verified end-to-end call from a test client. |
| 1.4.2 | Gateway wrapper — agent-aware routing, attribution, rate limits, telemetry | M | ~500 LOC Python wrapper in front of LiteLLM. Maps `agent_id` → routing decision (with override from Living Knowledge). Per-minute token-burst rate limits per agent class. Emits a structured telemetry event per call: model, latency, prompt tokens, completion tokens, cached tokens, cost USD, prefix-cache hit boolean, agent_class, agent_instance, intent_id. Cost attribution to `(agent_class, agent_instance, intent_id, cell_pool)`. Unit tests + integration test against a local LiteLLM. |

### Rationale

See ADR-001. LiteLLM provides multi-provider routing, prefix caching, fallback chains, virtual keys, per-key cumulative budgets, callbacks, and Vault integration natively. Re-implementing these costs 2–3 weeks of Phase 1 with no architectural benefit.

The wrapper retains the four capabilities LiteLLM does not adequately cover: agent-aware cost attribution, per-minute token-burst rate limits, prefix-cache hit emission to our telemetry pipeline, and Living-Knowledge-driven routing policy.

### Stages dropped

1.4.2 (multi-provider routing), 1.4.3 (prefix caching), 1.4.4 (fallback chains), 1.4.5 (per-agent cost budgets), 1.4.6 (telemetry instrumentation), 1.4.7 (Vault integration) — these capabilities are now part of NEW 1.4.1 (deployment) and NEW 1.4.2 (wrapper). No capability is lost.

---

## Change 3 — New Stage Group 1.7 (MCP tool servers)

Placed after Stage Group 1.6 (First product), before the Phase 1 exit gate. Establishes the external tool surface per ADR-002.

### Stage Group 1.7 — MCP tool servers (6 stages, ~1.5–2 weeks)

| Stage | Name | Size | Goal |
| ----- | ---- | ---- | ---- |
| 1.7.1 | Sandbox MCP server (Provider Interface + Docker backend) | L | MCP server exposing `sandbox.execute(command, env, cwd, timeout, resource_limits)`. Internal Provider Interface (`SandboxBackend` abstract class) so backend is swappable. Phase 1 implementation: Docker via local Docker socket. Resource limits enforced (CPU, memory, network egress). Output captured and streamed to caller. Failure modes mapped to MCP error semantics. Unit tests + integration test executing a real Python script in a real Docker container. |
| 1.7.2 | Git MCP server | M | MCP server exposing `git.{clone, fetch, branch, commit, diff, log, status, push}`. Backed by gitpython. Per-agent scope enforced via Keycloak JWT — agent's identity determines which repos are accessible. SSH key access via Vault reference. |
| 1.7.3 | GitHub MCP server | M | MCP server exposing `github.{pr_create, pr_review, pr_merge, issue_create, issue_comment, repo_get, file_get, file_put}`. Backed by github3.py. Token via Vault reference. Per-agent scope (read-only vs write) enforced from identity. |
| 1.7.4 | Filesystem MCP server *(calibration stage)* | S | MCP server exposing `fs.{read, write, list, mkdir, delete}`. Sandboxed to per-agent home directory; path traversal blocked. **First MCP server we ship — use as the calibration stage for the MCP pattern. Lessons captured in `prompts/phase-1-foundation/1.7.4-filesystem-mcp/lessons.md` and promoted to MCP styleguide before 1.7.1 starts.** |
| 1.7.5 | Web search MCP server | S | MCP server exposing `search.web(query, n_results, recency)`. Brave Search API primary, Tavily fallback. API keys via Vault. Results normalised to a stable schema. Per-agent rate limits. |
| 1.7.6 | Docs fetch MCP server | S | MCP server exposing `docs.fetch(url, format)`. Backed by `requests` + `readability-lxml`. Returns Markdown or raw HTML. URL allowlist optional per agent. |

### Stage ordering note

1.7.4 (Filesystem) is the **calibration stage** even though it is listed fourth numerically. It ships first. The calibration finding determines the MCP styleguide before the more complex 1.7.1 (Sandbox) is undertaken.

Suggested execution order: 1.7.4 → review + styleguide → 1.7.5 + 1.7.6 (in parallel) → 1.7.2 + 1.7.3 (in parallel) → 1.7.1.

### Deferred to Phase 2

- **Browser / accessibility tree MCP server.** Needed by the Empathy Engine personas (Phase 2). Phase 1 first product is unlikely to need browser interaction. If the first product chosen in §10.6 turns out to need browser tools, promote a minimal browser MCP stage into Phase 1 — but default is defer.

### Rationale

See ADR-002. MCP gives us a standard protocol shared with Antigravity, Claude Code, and future agent frameworks; structural isolation per tool server; capability allowlisting enforced at server boot; and the substrate for v2's Capability Composer.

---

## Change 4 — Stage 1.5.1 clarification

### Before

| Stage | Name | Size | Goal |
| ----- | ---- | ---- | ---- |
| 1.5.1 | Agent base class with telemetry integration | M | Common base for all agent types. |

### After

| Stage | Name | Size | Goal | Prerequisites |
| ----- | ---- | ---- | ---- | ------------- |
| 1.5.1 | Agent base class — telemetry, LLM gateway, MCP client | M | Common base for all agent types. MCP client integration for external tools (per ADR-002): discovers MCP servers from per-agent config, enforces allowlist, propagates trace_id across the JSON-RPC boundary. LLM gateway integration: all LLM calls go through the Stage 1.4.2 wrapper, never direct to Anthropic/Vertex. Telemetry integration: every gateway call and every tool call emits a structured event. Tool capability allowlist read from per-agent config (initially YAML, eventually Living Knowledge). | Stage Groups 1.1, 1.2, 1.3, 1.4, 1.7 complete. |

Size unchanged (still M). Prerequisites updated.

### Rationale

The agent base class is the single point where LLM-gateway integration (ADR-001) and MCP integration (ADR-002) meet. Building it before either gateway or MCP servers exist would force mocks that obscure the real failure modes. Making both prerequisite explicit prevents scheduling errors.

---

## Phase 1 dependency graph (updated)

```
1.1 Telemetry foundation
        |
        v
1.2 Streaming + storage
        |
        v
1.3 Observability surface
        |
        +-----------+
        v           v
1.4 LiteLLM    1.7 MCP tool servers
gateway       (calibration: 1.7.4 first)
        \           /
         \         /
          v       v
        1.5 First v1 agent set
                |
                v
        1.6 First product
                |
                v
        Phase 1 exit gate
```

1.4 and 1.7 are independent: the LLM gateway has no MCP dependency, and MCP servers have no LLM-gateway dependency. They can run in parallel by two operators.

---

## Stage count summary

| Stage Group              | Before | After | Delta |
| ------------------------ | ------ | ----- | ----- |
| 1.1 Telemetry foundation | 10     | 10    | 0     |
| 1.2 Streaming + storage  | 7      | 7     | 0     |
| 1.3 Observability surface | 7     | 7     | 0     |
| 1.4 LLM gateway          | 7      | 2     | −5    |
| 1.5 First v1 agent set   | 10     | 10    | 0     |
| 1.6 First product        | TBD    | TBD   | 0     |
| **1.7 MCP tool servers (NEW)** | — | 6 | **+6** |
| **Phase 1 total (excl. 1.6)** | 41 | 42 | **+1** |

Net effect on Phase 1 calendar: ~0. The cut from 1.4 (−5 stages, including 1 L and 4 M) compensates for the addition of 1.7 (+6 stages, including 1 L, 2 M, 3 S). 1.4 and 1.7 run in parallel, so the longer of the two paths governs.

---

## Action items for the team

1. **Tech lead** reviews and approves ADR-001 and ADR-002 (or sends back with edits).
2. **Tech lead + CTO** review this patch. Either accept, or send back line-by-line.
3. On acceptance, **Claude updates** the canonical `development_schedule_antigravity.docx` to reflect these changes (Claude can regenerate §10 Phase 1 stage backlog as a complete replacement section on request).
4. **Update §3.3 of the architecture spec** (Tool integration cross-cutting layer) to reference ADR-002.
5. **Update §10 of the architecture spec** (LLM gateway) to reference ADR-001.
6. **Update the architectural diagrams PDF** — the Tool Integration band on the C4 Level 2 page should explicitly call out MCP as the external tool protocol.
7. **Stage 1.4.1 prompt** authored by Claude when the team is ready to execute it (after the architecture review session and reading week).
8. **Stage 1.7.4 prompt** (Filesystem MCP server, the calibration stage) authored similarly — this is the first MCP server we ship and the lessons gate the rest of 1.7.

---

## Open questions for the team

- The first product (Stage Group 1.6) scope is still unresolved per Architecture Spec §12.2. Does the candidate first product need browser tools? If yes, promote the deferred Browser MCP server into Phase 1.
- LiteLLM version pin: which release line do we lock to? Suggest pinning the latest stable minor with a documented upgrade window every quarter. Tech lead to confirm.
- MCP server hosting model: separate containers in the application zone, or co-located with the agent process? Suggest separate containers for sandbox + github (security boundary matters), co-located for filesystem + docs fetch (latency matters more). Tech lead to decide before Stage 1.7.4 starts.
