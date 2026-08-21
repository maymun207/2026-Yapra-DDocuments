# ADR-00X — CWF ↔ EAIP Graduation Seam (SPINE-FRONT) — v0_1

> **Status:** Draft — pending operator approval. **Target repo:** `agbuilder-platform/revolutionize` `adrs/` (final number assigned at commit per repo sequence — note ADR-003 may be reserved by A6/CA-3 for the core-invariant set; do NOT assume 003).
> **Date:** 2026-07-10 · **Author:** Claude (single-author rule) · **Decider:** Maymun (sponsor/operator)
> **Companion visuals:** two seam diagrams produced in-session (pre-inversion nine-seam map; SPINE-FRONT inverted map). Reproduce as SVG in the doc set at commit time.
> **Supersedes/edits:** amends v6 master doctrine line A6; re-labels plan rows E3/E6; closes DR-13 on merge.

---

## 1. Context (facts, pinned)

Two conversational-AI runtimes exist in the program:

1. **cwf_yaprak** (@ `d87fedd`, Living-Arch rev 61) — production CWF line. Verified properties: session + user ownership; capability matrix (GOV-4 lab, developer sandbox, super-admin, TRUST_MANAGE tier) live-probed; prompt governance with golden-verdict-gated publishes; L3 eval-CI canary wired into GitHub Actions; 10-stage TurnContext pipeline (single agent, deterministic stage order, per-stage OTel spans, ONE turn id); ADR-001/002/003/004/007 sealed; **all external data access MCP-mediated** (no embedded SQL; resultStore handle pattern for large results); provider layer exposes an `openai-compatible` slot (LiteLLM-ready by config).
2. **EAIP v6 master** — designed platform. Doctrine line A6: *"one reasoning brain (LangGraph) serves every channel"*. Plan row E3 ("CWF mfg agents classes 1–3, 360h") reads as a LangGraph rebuild of CWF. LangGraph carries no production evidence yet.

Drift register DR-13 names the unresolved seam: stack divergence with an undocumented graduation path; the "portable domain model" moat claim crosses this seam.

## 2. Options considered

| Option | Description | Verdict |
|---|---|---|
| **SPINE-REBUILD** | Rebuild CWF inside LangGraph (literal E3). | **Rejected.** Discards a battle-tested, eval-gated, ADR-sealed runtime; violates CA-1 spirit (Takım-2 delivers CWF with the code in hand); resets the only production evidence in the program. |
| **SPINE-FRONT** | CWF = application layer / front agent owning user + session; LangGraph = workflow engine behind the MCP boundary, published as MCP tools. | **ACCEPTED.** |
| **SPINE-FORK** | Both lines continue ungoverned. | **Rejected.** DR-13 worsens into a dual-runtime SSoT fork; duplicated eval/security/observability with no fence. |

## 3. Decision

**SPINE-FRONT.** The center of gravity follows proven capability, not paper doctrine:

- **CWF owns the user.** Sessions, identity semantics (capability matrix), conversational traffic, prompt governance, and the single conversational runtime live in CWF. The user touches CWF and only CWF.
- **Temporal division of labor.** Anything that fits inside one user turn (query, retrieval, tool calls, answer) runs in the CWF pipeline. Anything that does not fit in one turn — multi-step, multi-agent, event-triggered, scheduled (OEE alert → root-cause → report → ARMES ticket; insurance triage; class-5/6 graph jobs; nightly audits) — runs in **LangGraph**.
- **LangGraph is invoked as MCP tools** (launch → handle → poll, or completion notification via channel). Workflow authorization rides the existing capability matrix / trust registry.
- **No reverse user path.** LangGraph never addresses the user directly; CWF remains the sole session owner.
- Hybrid-spine holds at both levels: turn-level determinism in CWF (provider resolution, trust ceilings, guardrails); workflow-level Hybrid Decision Engine inside LangGraph. LLM ranks; rules decide — in both layers.

## 4. Binding conditions (SC series)

- **SC-1 — Single-agent discipline.** The TS pipeline stays a single-agent runtime. Any multi-agent need crosses the MCP boundary into LangGraph; it is never embedded into the pipeline. (Failure mode guarded: re-inventing LangGraph badly in TypeScript as the developer sandbox grows.)
- **SC-2 — Identity authority migrates; semantics stay.** Authentication authority moves to Keycloak/OPA (seam 4; Kale = Entra federation per D8). CWF keeps authorization *semantics* — the capability matrix — mapped onto realm roles/OPA policies. Mapping table is a deliverable of the seam workstream.
- **SC-3 — Doctrine amendment (A6) + plan relabel.** The subject of "one reasoning brain" changes: the CWF pipeline is the one conversational runtime serving every channel; LangGraph is re-scoped to workflow orchestration. E3 relabels from build → **wiring/port**; LangGraph-shaped work re-homes to E6/F4/D-phase rows. Master + stale exports edited in the same seal pass (rides DR-1/DR-2 remediation).
- **SC-4 — Dual-runtime cost fence.** Both runtimes speak model calls **only through LiteLLM**; tools **only through MCP**; **one** Langfuse instance (ADR-007 host-trust posture platform-wide); the L3 eval-canary pattern is **ported to the LangGraph side before it carries production workflows**. Divergence is not eliminated; it is fenced.

## 5. A6 amendment text (drop-in)

- **EN:** "One conversational runtime — the CWF turn pipeline — serves every channel; LangGraph orchestrates multi-step and event-driven workflows behind the MCP boundary and never addresses the user directly."
- **TR:** "Tek konuşma runtime'ı — CWF turn pipeline — tüm kanallara hizmet eder; LangGraph çok-adımlı ve olay-tetikli iş akışlarını MCP sınırının arkasında orkestre eder ve kullanıcıya asla doğrudan hitap etmez."

## 6. Consequences — nine-seam decision table

| # | Seam | Decision under SPINE-FRONT | Effort class |
|---|---|---|---|
| 1 | LiteLLM gateway | Provider row via `openai-compatible` slot; tenant budgets/pins inherited | config |
| 2 | MCP layer | ARMES MCP = backend registration + integration tests (E1); trust↔OPA mapping | small |
| 3 | ClickHouse gold access | **Own workstream (still open):** ClickHouse-MCP server hosting the deterministic query gate; dbt Gold + MCP tool schemas = the semantic contract (v5.1 gaps 2+3 live here) | medium, gated |
| 4 | Identity | Keycloak issuer swap; capability→realm-role map; Supabase RLS → Postgres RLS (SC-2) | medium |
| 5 | Knowledge | dbKnowledgeProvider re-backed by Qdrant/LightRAG; KB→LightRAG feed; harvest boundary EAIP-side | medium |
| 6 | Observability | One Langfuse; ADR-004 split adopted platform-wide; ledger = first reality-feed source | small |
| 7 | Channels | Kong in front of `chat.ts`; Teams/WA adapters = new entry handlers, pipeline unchanged | small–medium |
| 8 | Workflow triggers | n8n calls CWF API; tickets via ARMES MCP; heavy flows re-home to LangGraph tools | small |
| 9 | Packaging | cwf_yaprak brick: container+Helm+`brick.cue`, silo tier, in-cluster Postgres, sealed/NOC class | medium–large |

## 7. Follow-ups

1. Operator commit of this ADR to content repo (number assigned; single-author rule: Claude authored, AG/operator executes).
2. SC-3 edits folded into the DR-1/DR-2 seal pass (same PR wave).
3. Seam-3 workstream spec (query gate + semantic contract) — separate prompt.
4. SC-4 eval-port task added to the merge-wave backlog (supersedes from-scratch eval item in changeset v5_2).
5. DR-13 closes when 1–2 land.

*— end v0_1 · 2026-07-10 —*
