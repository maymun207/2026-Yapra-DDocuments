# ADR-002: Model Context Protocol (MCP) as the External Tool Protocol

| Field          | Value                                                                |
| -------------- | -------------------------------------------------------------------- |
| Status         | Proposed — pending tech lead approval                                |
| Date           | 2026-05-31                                                           |
| Deciders       | Maymun (ARDICTECH), Tech Lead, Senior Engineers (Antigravity ops)    |
| Affects        | Architecture spec §3.3 (Tool integration); Dev schedule §10 Phase 1  |
| Supersedes     | —                                                                    |
| Companion ADRs | ADR-001 (LiteLLM as the LLM gateway)                                 |

---

## Context

Agents in both v1 (specialised) and v2 (cellular) forms need to interact with a tool surface: filesystem, Git, GitHub, sandbox execution for code/tests, web search, docs fetch, browser / accessibility tree. The architecture spec describes these tools but does not specify a **protocol** for agent ↔ tool communication. The default assumption in the original Phase 1 backlog was custom Python / TypeScript bindings inside each agent's base class.

The "Bootstrapping a revolutionary platform" review recommends adopting **Model Context Protocol (MCP)** — Anthropic's open standard for LLM applications to expose tools and data sources to agents. MCP uses JSON-RPC over stdio or HTTP, has reference servers for filesystem / Git / GitHub / web search / docs fetch / memory / sequential-thinking, and is the protocol Anthropic's own products and Google Antigravity already speak.

### Why this is the right shape for our context

- **Claude-heavy stack.** Our routing (Opus 4.7, Sonnet 4.6, Haiku 4.5 per architecture spec §10.4) is Anthropic-native. MCP is the protocol the foundation models we depend on understand natively.
- **Dual execution surface compatibility.** Revolutionize v0.5 already commits to a *Channel Adapter* posture for the execution surface (Antigravity IDE / Antigravity 2.0 / Claude Code, per the CWF/Revolutionize bootstrap §2). MCP is what each of these surfaces speaks for tools. Adopting MCP keeps every execution surface plug-compatible.
- **Channel Adapter Pattern is already a project principle.** Applying it to the tool surface is consistent: core agent logic stays protocol-agnostic; protocols are pluggable.
- **v2 Capability Composer fit.** Cells in v2 must dynamically compose toolsets per intent. MCP's tool-discovery semantics (a server advertises its tools; a client enumerates and binds at runtime) are a natural substrate for this.
- **Isolation by default.** MCP servers run as separate processes. A bug or hang in the GitHub server does not crash an agent. This aligns with the 8-axis security taxonomy adopted from OpenClaw.

---

## Decision

Adopt MCP as the **external tool protocol** — the protocol by which agents discover and invoke tools that touch the outside world or execute untrusted code. Tools with stronger contracts or tighter latency budgets remain **non-MCP**.

The dividing line is deliberate: MCP is for tools whose contract is naturally JSON-RPC-shaped and where process isolation is a feature. It is *not* the universal IPC for the system.

---

## Scope — what MCP serves

| Tool                            | Backing                                     | Phase 1 stage  |
| ------------------------------- | ------------------------------------------- | -------------- |
| Sandbox execution               | Docker locally; Daytona / E2B / Firecracker later | 1.7.1 (L) |
| Git                             | gitpython / shell                           | 1.7.2 (M)      |
| GitHub                          | github3.py / Octokit                        | 1.7.3 (M)      |
| Filesystem (sandboxed)          | OS calls scoped to agent home               | 1.7.4 (S)      |
| Web search                      | Brave Search API (primary), Tavily fallback | 1.7.5 (S)      |
| Docs fetch                      | requests + readability                      | 1.7.6 (S)      |
| Browser / accessibility tree    | Playwright + a11y tree (Empathy Engine)     | Phase 2        |

Each MCP server is a separate process, in its own subdirectory of the platform monorepo (e.g. `tools/mcp-servers/sandbox/`), versioned independently, with capability-allowlisted access per agent class.

## Scope — what MCP does NOT serve (intentionally)

| Capability                                       | Why not MCP                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Telemetry emission                               | In-process, microseconds latency. MCP adds protocol overhead that violates "agent never waits."   |
| Three immutable channels (intent / verification / reality) | Stronger contract than JSON-RPC: Pydantic + schema version + Redpanda backpressure. Already designed. |
| State stores (PostgreSQL, MariaDB Galera, Qdrant) | Direct typed clients. ORM / vector client semantics are tighter than JSON-RPC.                   |
| LiteLLM gateway calls                            | OpenAI-compatible HTTP is already standard. Wrapping in MCP adds a layer for no gain.            |
| Inter-agent communication                        | Three channels only (architecture spec §2). MCP would be a fourth channel — proliferation risk.  |
| ADR registry reads                               | Direct Qdrant + Git read. Same reasoning as state stores.                                         |

---

## Sandbox Provider Interface

The sandbox MCP server (Stage 1.7.1) uses an internal Provider Interface so the execution backend can be swapped:

- **Phase 1 (local + Phase 1 production):** Docker via Docker socket.
- **Phase 2+ (when scale or isolation justifies):** Daytona or E2B SDK; Firecracker microVMs for the strictest isolation tier.

Agents call a single MCP capability — `sandbox.execute(command, env, cwd, timeout, resource_limits)` — and are oblivious to which backend runs the code. This is the Channel Adapter pattern at the execution layer. Backend switch is a config change to the sandbox server, not a change to any agent.

---

## Capability allowlisting

Each agent class is granted an allowlist of MCP servers, and within each server, an allowlist of tools. Defaults per agent class are defined in the Living Knowledge layer and audited per Phase 1 security checklist:

| Agent class            | Filesystem    | Git | GitHub | Sandbox | Web search | Docs fetch | Browser |
| ---------------------- | ------------- | --- | ------ | ------- | ---------- | ---------- | ------- |
| Frontend agent         | frontend repo | ✓   | ✓      | ✓       | —          | —          | —       |
| Backend agent          | backend repo  | ✓   | ✓      | ✓       | —          | —          | —       |
| Database agent         | db repo       | ✓   | ✓      | ✓       | —          | —          | —       |
| DevOps agent           | infra repo    | ✓   | ✓      | ✓       | —          | —          | —       |
| Solution architect     | read-only all | ✓   | ✓ ro   | —       | —          | ✓          | —       |
| Code reviewer          | read-only all | ✓   | ✓      | ✓       | —          | ✓          | —       |
| Security agent         | read-only all | ✓   | ✓ ro   | ✓       | ✓          | ✓          | —       |
| PM agent               | —             | —   | issues only | — | ✓          | ✓          | —       |
| Reality observer       | —             | —   | —      | —       | ✓          | ✓          | —       |
| Founder agent          | —             | —   | —      | —       | —          | —          | —       |
| Empathy engine persona | —             | —   | —      | —       | —          | —          | ✓ (P2)  |

`ro` = read-only. Filesystem scope expressed as path prefix; sandbox scope expressed as resource limit profile. Allowlist enforced at MCP server boot from the agent's identity token (Keycloak JWT). Consistent with §8 of the architecture spec: allowlist, not denylist.

---

## Consequences

### Positive

- **Standard protocol.** Future Claude SDK / LangGraph / Antigravity 2.0 SDK / Claude Code integrations become "point at our MCP servers" — no custom adapter per framework.
- **Isolation is structural.** MCP servers are separate processes. Failures contained at the protocol boundary.
- **Capability allowlisting is enforced at server boot.** Harder to bypass than runtime checks in agent code.
- **v2 Capability Composer.** Has a natural substrate from day one: enumerate MCP tools available to the cell, compose dynamically per intent.
- **Aligned with how Antigravity already works.** Antigravity 2.0's tool model is MCP. Our agents and Antigravity will speak the same protocol — useful when Antigravity is the operator of our own agents.

### Negative

- **One more protocol to debug.** Tool failures traverse agent → MCP client → JSON-RPC → MCP server → backend tool. Mitigated by structured tracing carrying a single `trace_id` across the boundary (OpenTelemetry context propagation is already in the Phase 1 telemetry SDK).
- **Latency overhead.** JSON-RPC over local stdio is microseconds-to-low-milliseconds. Fine for Git, GitHub, web search. Would be wrong for telemetry — hence telemetry stays in-process.
- **Phase 1 stage count.** Adds Stage Group 1.7 (≈6 stages). Partially offset by ADR-001 cutting 5 stages from Stage Group 1.4. Net Phase 1 stage count change: roughly +1.
- **MCP is young.** Released Nov 2024 by Anthropic; the spec is evolving. *Mitigation:* keep our servers thin; track Anthropic's MCP releases deliberately; the surface area we depend on is small.

### Neutral

- MCP does not change the *what* of our tool surface — same tools, same capabilities. It changes the *how*.
- No impact on the three immutable channels, the telemetry pipeline, or the LLM gateway. Those are not MCP-served and are not affected.

---

## Alternatives considered

1. **Custom tool bindings inside each agent's base class.** Rejected. Couples tools to agent framework. Hard to share across Antigravity / Claude Code / future surfaces. Re-implements what MCP solves.
2. **OpenAI function-calling protocol as the universal tool interface.** Rejected. Bound to OpenAI / OpenAI-compatible contexts. Not natively supported by Anthropic-first toolchains. MCP is the cross-vendor standard.
3. **Wait for MCP to mature.** Rejected. The spec is stable enough for our use cases (filesystem, git, github, sandbox, web search exist as reference servers). Waiting costs more than the protocol drift risk.
4. **Custom RPC over the three channels.** Rejected. Tool calls are agent → tool (synchronous, request / response). The three channels are domain event flow (asynchronous, append-only log). Different semantics; same channel would be a category error.

---

## References

- Model Context Protocol: <https://modelcontextprotocol.io>
- Reference servers (Anthropic): <https://github.com/modelcontextprotocol/servers>
- MCP TypeScript SDK: <https://github.com/modelcontextprotocol/typescript-sdk>
- MCP Python SDK: <https://github.com/modelcontextprotocol/python-sdk>
- Architecture spec §3.3 (Tool integration cross-cutting layer)
- Architecture spec §8 (Security threat model — 8-axis taxonomy from OpenClaw)
- "Bootstrapping a revolutionary platform" document (project files, page 2)
- CWF / Revolutionize v0.5 Channel Adapter Pattern (§2 of CWF context bootstrap)

---

## Action items

1. **Patch the dev schedule** to add Stage Group 1.7. See `dev_schedule_patch_v1.md`.
2. **Reading week allocation.** During the senior engineers' pre-Phase-1 reading week, allocate 1 day for one engineer to read the MCP spec + reference servers and produce a 1-page summary for the team. Same engineer becomes the MCP point of contact for Phase 1 stage operators.
3. **Calibration stage.** Stage 1.7.4 (Filesystem MCP server, S) is the first MCP server we ship. Use it as a calibration exercise — the second engineer reviews; lessons captured in `prompts/phase-1-foundation/1.7.4-filesystem-mcp/lessons.md`. Promote learnings to the styleguide before 1.7.1 (Sandbox MCP, L) starts.
4. **Update §3.3 of the architecture spec** to reference this ADR.
5. **Update the architectural diagrams** (`virtual_software_team_architecture_diagrams.pdf` page on Tool Integration) to show the MCP layer explicitly.
