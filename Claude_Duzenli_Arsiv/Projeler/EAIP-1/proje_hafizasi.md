# 🧠 Proje Hafızası: EAIP-1

**Proje ID:** `019e719a-7c68-75ab-8a03-2bd576edbf1f`

---

**Purpose & context**

Maymun is the founder and CTO of ARDICTECH A.Ş., a Turkish industrial AI company with approximately 17 years of history. The overarching program is **TheBluePrint23** — a two-plane initiative combining **EAIP** (Enterprise AI Integration Platform, the product platform) and **Revolutionize** (the internal agentic development methodology). Maymun is program sponsor, operator, and holds the merge gate; Claude functions as senior architect under a **single-author rule** (Claude authors specs/prompts, Antigravity executes, Maymun gates merges).

**Portfolio structure (3-layer model):**
- **L1 Substrate** (owned by neither product): EAIP + governed-truth domain model + ARMES MES + IoT-Ignite
- **L2 Two independent businesses** — **GU** (Galip Usta / Sanal Usta) and **CWF** (Chat With Factory) — each with its own plan, GTM, P&L, moat, and investor story. Plan/strategy separation is active now; org/headcount separation deferred.
- **L3 Governed seams**: GU→CWF graduation channel + shared Kale reference + mutual domain-model contributions

**GU** is the flagship: a two-sided manufacturing operational data network (Shop-Floor-as-a-Service for SMEs). Moat = un-replicable cross-tenant data network; v1 is sensor-free (usta as data source via WhatsApp). Multi-sided monetization: SMB subscription = data-acquisition cost; real revenue from data buyers (insurers, lenders, OEMs — OEM as data wallet only, ranked last, never a distribution channel). Beachhead: fastener manufacturers × Turkey × IATF 16949 compliance as forcing function.

**CWF** is the second product on a portable governed-truth domain-model wall — re-ranked from "fuel" to a real second product. It sits BELOW GU (GU's network is un-replicable; CWF's domain IP is replicable-but-slow) and ABOVE firewalled insurance. CWF targets the penetration/sovereignty axis: sovereignty-sensitive, under-penetrated geographies where the five incumbent MES-copilot vendors (Siemens Opcenter, SAP DMC, Rockwell/PTC, AVEVA, GE Proficy) structurally cannot compete. CWF reasons over the governed-truth domain model via ARMES MCP + dbt Silver/Gold ClickHouse models + LightRAG — never over raw tables, never LLM as source of truth; hybrid reasoning (LLM ranks, deterministic rules decide). Moat = portable domain model (depth travels to a new MES at bounded mapping cost) + cross-customer KB pattern-harvesting ("secret stays, lesson leaves"; consent/abstraction boundary is a core architectural requirement).

**ARMES MES** is a proven product deployed across 16+ Kale factories, promoted to a Layer-2 product-business with a wedge-disciplined strategy (sovereignty/penetration complement + DPP-compliance pull) — explicitly not a horizontal MES land-grab against giants.

**Insurance** is a firewalled cash grab: fixed scope, fixed price, no depth-building, never a second vertical.

**Key relationships:** Kale (8+ year customer, anchor contract, reference logo, cash floor — not a product-funding anchor or growth engine); Kale ownership/board as target investor audience for GU; ACT VC (2016 investor via Kale owners); Antigravity (AI IDE for repo operations).

---

**Current state**

The most recent major deliverable is `ARDICTECH_Load_Bearing_Core_v1_0.md` — a corpus-wide audit distilling the load-bearing spine of the entire TheBluePrint23/ARDICTECH project (81 files, March–July 2026). This document now serves as the single authoritative entry point, replacing the three parallel bootstrap files (demoted to detail payloads).

**Active spine artifacts (from load-bearing register):** `EAIP_Brick_Architecture_v0_3.html`, `ARDICTECH_Strateji_Haritasi_v1_3.html`, `theblueprint23_knowledge_graph_v1_3.json`, `ADR_SPINE_FRONT_graduation_seam_v0_1.md` (still in draft, pending operator commit), `theblueprint23_session_bootstrap_v1_2.md` (demoted to detail payload).

**Critical live contradiction (LB-1):** The CWF Kale revenue figure was corrected in the business case and financial model but was never swept upward — `Strateji_Haritasi_v1_3` and the GU/CWF bootstrap both still assert the dead claim. This must be resolved in the next consistency sweep.

**Brick architecture state:** `EAIP_Brick_Architecture_v0_3.html` established the following decisions:
- `cwf_yaprak` (git ref `b753783`, Living-Arch rev 70) = general-purpose application front-agent; single codebase → single release lifecycle → N deployments → M backends per deployment; product differentiation via configuration (profile), not code branching
- `agent-runtime` foundation brick splits into `conversation-runtime` (yaprak, the turn pipeline kernel) and `workflow-runtime` (LangGraph, exposed as MCP tool, never touching users directly)
- Langfuse = per-instance deployment (Class C data sovereignty contract)
- MCP boundary = single external exit point from yaprak; vendor MCP servers adopted for transport only, authority stays in yaprak (trust registry + capability matrix)
- `profile.cue` + `brick.cue` = enforced schemas (not conventions)
- Supabase→PostgreSQL port = prerequisite for EAIP brick graduation
- D1 Talos pilot verdict = still open (not fabricated)

**Spine gaps still open:** Brick layer absent from canon; no supply-chain chain of custody (SBOM/cosign/SLSA/Kyverno despite Cosign planned in A4.5); no machine-enforced brick contract; no container port map; bus factor = 1.

**SPINE-FRONT ADR** (`ADR_SPINE_FRONT_graduation_seam_v0_1.md`): draft, pending operator commit.

**v5_1 SSoT vs. v6 master:** The project-local v5_1 SSoT is confirmed NOT the canonical v6 master. The v6 master filename is intentional; internal label "v5.1 · 10 Jun 2026" is stale (DR-1 in the drift register).

---

**On the horizon**

- **LB-1 consistency sweep**: Propagate the corrected CWF Kale revenue figure to all remaining stale occurrences (`Strateji_Haritasi_v1_3`, GU/CWF bootstrap, and any others surfaced by grep)
- **SPINE-FRONT ADR operator commit**: Resolve draft status
- **D1 Talos pilot verdict**: Binary decision gate blocking v0_3 completion
- **Four-wave remediation program (Dalga 1–4)**: Supply-chain chain-of-custody, backup ownership, CUE brick contract schematization, release-train brakes, pooled-tier enforcement
- **ARMES Business Case** (Turkish, forge-heat style): Queued as the next deliverable after CWF artifacts
- **ARMES Business Model** (parametric): Follows the business case
- **CWF ACV research**: Deferred to a separate deep-dive session
- **12 open decisions/gates** catalogued in `ARDICTECH_Load_Bearing_Core_v1_0.md` (LB-2 through LB-11 plus two additional)
- **CWF cross-customer KB pattern-harvesting**: Architecture to be built harvesting-ready from day one; value opens as n grows

---

**Key learnings & principles**

**Distribution discipline:** Distribution-channel dependency is a structural trap. Whoever controls distribution captures the margin — powerful intermediaries (especially OEMs) demand equity/revenue-share and can shut the tap, turning the business into their slave. Rule: never put the business model in a predator's hands; enter as a strong peer or not at all. For every channel/partner proposal, ask "whose slave does this make us?" Prefer captive, replaceable, low-leverage channels (OSB clusters, Model Fabrika, telco as later amplifier). **OEM = data customer (wallet) only, ranked last; NEVER a distribution channel.**

**Consistency sweep discipline:** When editing any concept, value, term, or verdict appearing in more than one place, enumerate ALL occurrences via grep/search and update every one in a single pass. Half-applied changes create internal contradictions. Before declaring done, re-run the search to confirm zero stale instances remain.

**No-fabricated-numbers rule:** All unvalidated figures are flagged `[open:]`. Claims are SHA-pinned. The honesty-boundary protocol is applied consistently.

**Read before debating:** Claude must read current repo state and project files before making architectural or factual claims — not reason from memory or stale bootstrap pins. Debating architecture without reading source material is an error class.

**GU/CWF separation discipline:** The old "GU=moat product, CWF=substrate/fuel" framing and the "Option-A cash = ARMES/CWF/insurance" lumping are retired. GU and CWF are two separate businesses on a shared substrate. Forcing them into one analytical frame was the source of prior confusion.

**CWF content classes and irreducible moat:** Three content classes — (1) codified→RAG/LightRAG, (2) tacit-but-held→KB tool (live at Kale), (3) unobserved operational truth→time-locked (the irreducible moat). "9 women can't make a baby in 1 month" — AI can remix codified knowledge but cannot synthesize operational truth not yet observed. GU's parallel-capture model (parallelizes across thousands of shops simultaneously) outranks CWF's wall on the asset axis for this reason.

**MCP trust model:** Vendor MCP servers are adopted for transport only, never for authority. Trust registry and capability matrix remain in yaprak.

**ARMES strategic positioning:** ARMES promoted to a Layer-2 product-business (B-wedge reversal: wedge-disciplined against sovereignty/penetration complement + DPP-compliance pull). NOT a horizontal MES land-grab against giants — that path was explicitly named a trap in strategy map v1.3.

**Investor narrative vs. internal model:** Two separate logics must be maintained — internal model = brutal EV-forward; investor narrative = vision-forward, same facts, opposite weighting order.

**GU two-gate growth risk:** Gate 1 = capture quality (binary precondition, channels cannot fix it); Gate 2 = coverage density (the actual scaling problem). These are structurally distinct and must not be conflated.

---

**Approach & patterns**

**Working methodology:**
- Single-author rule: Claude authors specs/prompts; Antigravity executes; Maymun gates merges
- TheBluePrint23 session protocol: Before asserting program state, ALWAYS load the highest-version `theblueprint23_session_bootstrap_v*.md` (loader/index) and `theblueprint23_knowledge_graph_v*.json` (data payload) from project knowledge; follow the bootstrap's §0 primer and §3 verify-before-trust protocol (SHA/md5 identity checks) — never reason from memory
- Versioning discipline: Every deliverable gets an explicit version in both the filename and internal label using `_vN_M` convention (e.g., `_v1_1`, `_v0_3`); filename and internal label must be identical; never overwrite by reusing the same filename — bump the version on every revision
- Language convention: Internal artifacts in English; strategic conversation and customer-facing artifacts in Turkish

**Communication preferences:**
- Dense analytical prose over bullet points
- Brutal honesty without diplomatic softening
- Binary framing for open decisions with explicit gates and fallbacks
- Direct verdicts with honest risk assessment
- Artifacts over prose explanations
- Corrections acknowledged cleanly and applied immediately

**Artifact discipline:**
- Formal decision records (DX format) with gates, fallbacks, and re-evaluation conditions
- `[open:]` tags for all unvalidated figures
- SHA/md5 pins for canonical artifact identity
- Consistency sweeps before presenting any artifact

**Problem-solving pattern:** Read source files first → extract structured data programmatically (Python regex against raw HTML/JSON) → validate against repo state → produce versioned artifact → grep-verify zero stale instances before declaring done.

---

**Tools & resources**

**Repositories:**
- `maymun207/TheBluePrint23` — Next.js app (HEAD `eed2d09`); fetches SSoT at runtime from the revolutionize content repo via GitHub API using a PAT
- `agbuilder-platform/revolutionize` — canonical content repo (HEAD `ba8952f`); canonical SSoT target: `docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`; v6 schema uses `var EPH` and `var EPLAN` (not `PHASES`/`PLAN_DATA` from v5)
- `maymun207/cwf_yaprak` — CWF production front-agent (HEAD `b753783`, Living-Arch rev 70); implements single-codebase/N-deployments pattern via `backends` table, pack system, and kind registry

**Platform stack (confirmed in brick architecture):** Talos Linux (cluster substrate, D1 pilot gate open), RKE2+Rancher (conservative fallback), LangGraph (workflow-runtime, exposed as MCP tool), n8n, Qdrant, PostgreSQL (platform default), ClickHouse, Grafana, Loki, Langfuse (per-instance), dbt, Supabase (to be ported to PostgreSQL as graduation prerequisite), LiteLLM, vLLM, LightRAG, Kong, Keycloak, ArgoCD, Harbor, OpenTofu, MinIO, Wireguard, OpenTelemetry

**MCP ecosystem (confirmed vendor MCP servers):** Qdrant, PostgreSQL, ClickHouse, Grafana, Loki, Langfuse, dbt, n8n, Salesforce

**Antigravity (AG):** AI IDE used for repo operations (Opus thinking mode); Claude verifies AG's outputs post-execution

**Extraction pattern for SSoT HTML:** Python regex against raw HTML; `grep -o "const [A-Z_]*"` to identify top-level data structures before extraction; unauthenticated GitHub API hits rate limits quickly — fresh `git clone --depth=3` is more reliable for file content verification
