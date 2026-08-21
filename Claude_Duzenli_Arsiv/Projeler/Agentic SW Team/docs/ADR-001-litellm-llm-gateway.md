# ADR-001: Adopt LiteLLM as the LLM Gateway

| Field          | Value                                                            |
| -------------- | ---------------------------------------------------------------- |
| Status         | Proposed — pending tech lead approval                            |
| Date           | 2026-05-31                                                       |
| Deciders       | Maymun (ARDICTECH), Tech Lead, ML/Eval Engineer                  |
| Affects        | Architecture spec §10.4; Dev schedule §10.4 (Stage Group 1.4)    |
| Supersedes     | —                                                                |
| Companion ADRs | ADR-002 (MCP as the external tool protocol)                      |

---

## Context

The architecture specification (§10 of `virtual_software_team_architecture.docx`, §10.4 of `development_schedule_antigravity.docx`) calls for a custom LLM gateway service responsible for:

- Multi-provider routing (Anthropic primary, Google Vertex AI fallback)
- Anthropic prefix-caching integration
- Fallback chains (Opus → Sonnet → Gemini)
- Per-agent cost budgets and enforcement
- Telemetry instrumentation on every call
- Vault integration for API keys
- Request / response logging
- Per-agent rate limiting

Originally drafted as **Stage Group 1.4** in the Phase 1 backlog with seven stages: 1 L, 4 M, 2 S — approximately 3–4 weeks of Antigravity-driven implementation plus integration time.

An external architecture review ("Bootstrapping a revolutionary platform") recommended LiteLLM as the foundation for this gateway, observing that LiteLLM is a mature, OSS proxy that natively provides every capability listed above plus 200+ provider integrations, virtual API keys, team-level budgets, native callbacks for langfuse / helicone / custom telemetry backends, and Vault integration. An earlier draft of the architecture in fact named LiteLLM; it was replaced with the custom service under the project's *"patterns not dependencies"* rule.

### Re-reading the "patterns not dependencies" rule

That rule was articulated in the context of OpenClaw, Hermes, and OASIS — frameworks whose adoption would couple the system to upstream project roadmaps where forking cost is high (entire agent runtimes, persona simulators, skill registries). LiteLLM is a different shape:

- Single-purpose proxy with a small, stable contract (OpenAI-compatible API).
- Surface area we actually depend on is narrow (chat completions, streaming, callbacks, /key, /budget).
- Forking cost is low because the wrapper isolates us.

The original rule still holds; LiteLLM simply is not the kind of dependency the rule was guarding against.

---

## Decision

Adopt **LiteLLM as the foundation of the LLM gateway**. Wrap it with a thin (≈500 LOC) project-specific layer.

The architecture's abstraction principle is unchanged: **agents do not import LiteLLM directly**. Agents call the wrapper; the wrapper forwards to LiteLLM. This preserves the ability to replace the underlying proxy later without modifying any agent code.

### What LiteLLM provides (delete from the custom build)

- Multi-provider routing for Anthropic + Vertex AI (and any future provider)
- Anthropic prefix-cache passthrough
- Fallback chains
- Token counting and cost calculation per provider
- Virtual keys and per-key cumulative budgets
- OpenAI-compatible API surface (useful for Antigravity, Claude Code, and future tooling)
- Streaming, multipart, function calling
- Built-in retry semantics

### What stays custom (the wrapper)

Four capabilities are not adequately covered by LiteLLM and stay in our wrapper:

1. **Agent-aware cost attribution.** LiteLLM emits per-key cost. In our system one logical agent class may have many keys (one per cell instance, per intent). The wrapper attributes spend to `(agent_class, agent_instance, intent_id, cell_pool)` and emits the telemetry event. LiteLLM is the source of cost; the wrapper is the source of attribution.
2. **Per-minute token-burst rate limits.** LiteLLM's budgets are cumulative. The Architecture Review flagged the failure mode where a loop-recursion bug burns a quarterly budget in hours. We need a second clock: per-minute token caps per agent class. The wrapper enforces this in front of LiteLLM.
3. **Prefix-cache hit-rate emission to telemetry.** LiteLLM logs cache hits in its own metrics; we need them in the canonical telemetry pipeline (Redpanda → ClickHouse) so Phase 1 dashboards can plot trend.
4. **Routing rules sourced from Living Knowledge.** LiteLLM has static YAML config. We want routing decisions to read live state from the measurement foundation (e.g. if Sonnet 4.6 quality on `backend_agent` drifts below threshold, route critical-path stages to Opus). The wrapper holds the policy; LiteLLM is the executor.

---

## Consequences

### Positive

- **Phase 1 calendar saved.** Stage Group 1.4 reduces from 7 stages (~3–4 weeks) to 2 stages (~1 week). Net savings: **2–3 weeks of Phase 1**.
- **Smaller bug surface.** LiteLLM has solved edge cases that we would otherwise re-discover: per-provider rate-limit header semantics, retry-after handling, streaming chunking differences, token counting drift between providers, multipart payload structure.
- **Operational maturity.** Production deployments at multiple companies; documented Helm chart, docker-compose, observability patterns.
- **Future provider coverage.** Adding AWS Bedrock or any new provider is a config change, not a stage.
- **Antigravity / Claude Code compatibility.** LiteLLM is OpenAI-compatible. Some tooling we may want to use later targets that surface directly.

### Negative

- **External dependency.** OSS and well-maintained, but a project we do not control. *Mitigation:* the wrapper isolates us; we pin a known-good version (`litellm==X.Y.Z`); we read the changelog before upgrading; cost-to-fork is low.
- **One more service in the application zone.** LiteLLM runs as a separate process (typically containerised). Operational footprint slightly larger than an in-process Python module. Acceptable — every other backbone service (Redpanda, ClickHouse, Tempo) is already a separate process.
- **Configuration surface.** LiteLLM has many options. *Mitigation:* keep configuration minimal and write routing rules as code in the wrapper, not as LiteLLM YAML. The YAML stays small and stable.

### Neutral

- The gateway's contract with agents does not change. From the agent's perspective, the gateway is still "the place I call for LLM responses."
- LiteLLM does not affect Anthropic billing or model behaviour — we are still calling Anthropic's API; LiteLLM is just the client.

---

## Alternatives considered

1. **Continue with the custom Python/Go gateway as originally specified.** Rejected. The custom build re-implements commodity functionality at the cost of 3–4 weeks of Phase 1 and a non-trivial bug surface. The "patterns not dependencies" rule does not apply to a thin proxy.
2. **OpenRouter as the proxy.** Rejected for self-hosted requirement. OpenRouter is a SaaS routing service; our hybrid deployment rules out SaaS-only tooling for core infrastructure.
3. **Helicone / Portkey as the proxy.** Rejected. Both are SaaS-first; self-host options exist but are less mature than LiteLLM's. LiteLLM has stronger Anthropic prefix-cache support, which matters for our cost model.
4. **Direct provider SDKs (no proxy).** Rejected. Loses central cost attribution, fallback orchestration, and rate limiting. Forces every agent to handle provider quirks.

---

## References

- LiteLLM project: <https://github.com/BerriAI/litellm>
- LiteLLM docs: <https://docs.litellm.ai>
- Architecture spec §10.4 (LLM gateway stage group)
- Architecture Review document (project files, page 1–3)
- "Bootstrapping a revolutionary platform" document (project files, page 1)
- Context bootstrap §4 ("patterns not dependencies" rationale)

---

## Action items

1. **Patch the dev schedule.** Reduce Stage Group 1.4 from 7 stages to 2. See `dev_schedule_patch_v1.md`.
2. **Operational dry-run during Revolutionize v0.5.** Deploy LiteLLM in the non-prod environment used for the Antigravity 2.0 trial (Revolutionize v0.5 Months 1–2). Gain operational familiarity before VS/E Organisation Phase 1 begins. Cost is one engineer-day; payoff is debugged deployment patterns by the time Phase 1 needs them.
3. **Author the deployment** as Stage 1.4.1 (Helm chart or docker-compose + Keycloak JWT + Vault references + routing baseline).
4. **Author the wrapper** as Stage 1.4.2 (≈500 LOC, full template-compliant prompt).
5. **Update §10.4 of the architecture spec** to reference this ADR.
