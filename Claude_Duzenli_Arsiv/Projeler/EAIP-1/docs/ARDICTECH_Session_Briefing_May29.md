# ARDICTECH Unified Platform — Session Briefing (May 29, 2026)

Paste this into a new conversation to resume. All referenced files are in the project.

---

## What we're building

A **single Platform Core** with thin product layers on top. One reasoning brain (LangGraph), many channels (WhatsApp-first + widget + Outlook + web chat + Teams). PostgreSQL-default. Sovereign/container-cloud deployment (Netaş/OSB). Every layer sits behind an adapter port so any component swaps with moderate effort.

## Products (in logical build order)

1. **Platform Core (P0)** — K8s, Postgres+pgvector+RLS, Redis, MinIO, Qdrant, Keycloak, Kong, FastAPI, OPA, Tenant Provisioning, Channel Gateway (WhatsApp text+voice+buttons via Whisper, web chat), vLLM (local Llama-3), LiteLLM, Ollama, MLflow, Prompt Store, Langfuse, Guardrails AI, LangGraph + Hybrid Decision Engine (LLM ranks / deterministic rules decide + audit log), LlamaIndex RAG, Memori (session/profile memory for query classes 3/4), Soda Core, dbt scaffold, OpenMetadata, Audit/SPC PDF (WeasyPrint), ArgoCD, Grafana/Prometheus/Loki/OTel, Vault, Wireguard.

2. **Web Asistan** — Embeddable catalog chatbot widget for manufacturers. Revenue-first. File-upload RAG, billing (iyzico/Stripe), landing page, analytics.

3. **Galip Usta v1 (Sanal Usta / SFaaS)** — WhatsApp-only predictive-maintenance + quality-compliance assistant for 10-250 employee manufacturing SMBs. v1 has NO sensors — the usta is the data source (text + voice notes). Audit PDF for IATF 16949 / AS9100. IoT-Ignite owns the entire edge (sensors, gateways, provisioning) — we integrate, never build. Sensor mode comes later via IoT-Ignite adapter + TimescaleDB. Commercially: dual-engine (Sopa = compliance ticket, Havuç = efficiency ROI), B2B2B via OEMs + Netaş/ZTE + telcos. Full business case in uploaded DOKU_MAN PDFs.

4. **CWF v1 (Chat With Factory)** — Manufacturing intelligence over ARMES/MES. **ARMES MCP is already developed** (confirmed fact — biggest integration risk eliminated). Includes ClickHouse (OLAP), Airbyte (connectors), manufacturing agents for query classes 1-5, Teams bot, n8n ops automation, Superset analytics. **LightRAG/GraphRAG added** — knowledge-graph-augmented retrieval over ARMES docs/SOPs/manuals for enhanced class-5 document queries.

5. **Insurance v0.8 → v1** — Türk Reasürans fire & engineering facultative-reinsurance offer-triage. LLM extracts and ranks; ~50 lines of deterministic Python classifies (Yeni İş / Yenileme / Geçmişte Görüldü). 4 lookup sources: ARU/KARU (⚠ biggest risk — 80h if API, 320h if UI-scrape), Exchange/Graph, 2 SMB shares. Reuses ~70% of CWF skeleton. Commercially important — original ask was 3-month gate.

6. **CWF v2** — Hardening: Postgres HA, full medallion (dbt Bronze→Silver→Gold + Soda gates), CDC (Debezium + Redpanda). **Graphiti + FalkorDB added** — temporal knowledge graph enabling class-6 causal/diagnostic queries ("Why did OEE drop on line 3 yesterday?"). Fed by CDC/medallion Gold zone events.

7. **Final / Astra EAIP** — RLS Core Engine + Entra federation, enterprise connectors (SAP/SharePoint/Salesforce/PIM/SQL Server), 4 Astra UCs (Financial, Inventory, Board zero-egress, Multi-channel), GU sensor mode (IoT-Ignite adapter + TimescaleDB), enterprise graph scaling (graph built in CWF, Astra only scales), LLM Enrichment, Temporal, Iceberg.

## Key architectural decisions (all confirmed)

- **PostgreSQL is the platform default.** Native RLS, pgvector, TimescaleDB (extension), dbt-native. MariaDB remains only as an ARMES/legacy adapter.
- **WhatsApp is day-one, first-class, across all products.** Text + interactive buttons + voice (Whisper STT). Channel Gateway pattern: one brain, many mouths.
- **Hybrid reasoning is the spine.** LLM extracts/ranks; deterministic rules decide/write with full audit. Same pattern serves insurance classification, GU audit PDF, and CWF manufacturing agents.
- **Data cleansing layer is first-class and must-have.** Soda Core + dbt + OpenMetadata + Audit PDF. Required for insurance (KVKK), GU (IATF/AS9100), and Astra (financial/board audit).
- **Memori** included in core for session/profile memory (query classes 3/shallow-4).
- **GraphRAG split correctly:** LightRAG in CWF v1 (class-5 doc retrieval), Graphiti+FalkorDB in CWF v2 (class-6 causal). Final only scales, doesn't introduce.
- **IoT-Ignite owns the edge.** We build zero IoT platform.
- **CWF capability matrix / 6 query classes** drives retrieval architecture (classes 1-6 all covered by M8).
- **Adapter ports on every layer** — storage, LLM, orchestrator, channel, source all swappable with moderate effort.

## Build sequence — two variants exist

**Variant A (Logical, recommended):** Core → WA → GU → CWF v1 → Insurance → CWF v2 → Final. Lower risk. Each stage hardens shared capability before the next relies on it. Insurance lands at ~M5 on a battle-tested deterministic engine.

**Variant B (Commercial override):** Core → WA ∥ GU ∥ Insurance (M3 gate) → CWF v1 → CWF v2 → Final. Insurance front-loaded under hard 3-month deadline. Higher risk — ARU/KARU wildcard sits on critical path.

Both variants: **11,820h / ~1,478 person-days / ~13 months.** Same effort and timeline — only sequence and risk profile differ. Full tradeoff matrix in ARDICTECH_Build_Schedule_v5.xlsx (Sheet C).

## Effort summary (from v5 schedule)

| Stage | Hours | Person-days |
|---|---|---|
| Platform Core | 2,660 | 332 |
| Web Asistan | 740 | 92 |
| Galip Usta v1 | 640 | 80 |
| CWF v1 (ARMES MCP done + LightRAG) | 1,500 | 188 |
| Insurance v0.8→v1 | 1,160 | 145 |
| CWF v2 (+ Graphiti + FalkorDB) | 1,500 | 188 |
| Final / Astra | 3,620 | 452 |
| **TOTAL** | **11,820** | **1,478** |

## Deliverables in project files

- `ARDICTECH_Platform_Redesign_v3.html` — the clean 9-layer architecture diagram (L0 Channels → L9 Infra)
- `ARDICTECH_Build_Schedule_v5.xlsx` — 4 sheets: logical Gantt, commercial Gantt, tradeoff matrix, effort summary

## Open / next steps

1. **Lock variant A or B** — decide whether insurance is M3 (commercial) or M5 (logical).
2. **ARU/KARU discovery spike** — if variant B, this must happen week 1 to determine if the M3 gate is feasible.
3. **Team allocation** — map the effort against actual headcount; Q1 sprint (variant B) needs ~10 FTE.
4. **Architecture diagram update** — v3 HTML needs LightRAG (L4) and Graphiti+FalkorDB (L4/L6) added to match v5 schedule.
5. **Insurance use case deep-dive** — detailed per-connector technical spec for the 4 lookup sources.
6. **Galip Usta v1 commercial story** — lead with compliance/audit (not predictive maintenance) since v1 has no sensors.

---
*Generated from project session May 29, 2026. All architectural decisions are confirmed unless explicitly reopened.*
