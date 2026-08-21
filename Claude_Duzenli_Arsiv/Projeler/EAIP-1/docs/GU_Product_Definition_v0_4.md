# GU (Galip Usta / Sanal Usta) — Product Definition

| | |
|---|---|
| **Document type** | Internal Product Definition (PRD-level) |
| **Version** | v0.4 (draft, for review) — validated against Platform SSoT v5.1; subscription framing corrected (largest revenue line at scale, not "data-acquisition cost") to align with canonical model v0.4 + strategy map v1.3; GU/CWF sibling-product relationship retained |
| **Context** | Fastener Beachhead (FBH) |
| **Language** | English (internal/architecture convention) |
| **Scope note** | Defines GU **v1** (sensor-free). FBH-dependent items are tagged `[FBH-dep]`; open dependencies are tracked in §13. The full sensor-based vision (GU_ document series) is explicitly out of v1 scope and addressed under §12 Phasing. |

---

## 1. Executive Summary

GU is a **WhatsApp-native digital shop-floor record plus a compliance-and-benchmark layer** for small fastener and adjacent precision-machining manufacturers. Its founding constraint shapes everything: the target shop has **no IT department, no MES, no sensors, no budget for CapEx digital transformation**, and a blue-collar workforce that records production on **paper notebooks** and in the head of the *ustabaşı*. GU does not ask them to change that behavior; it digitizes it.

The product treats **the usta as the sensor and the smartphone as the interface**. Production data enters the way the shop already works — a photo of the notebook page or the machine's own counter display, a voice note, or a tap on a WhatsApp button — and a hybrid pipeline (LLM extracts, usta confirms, deterministic system records) turns it into structured, trustworthy data. In return, GU gives back — on WhatsApp for the usta, and on a **mobile-friendly web dashboard** for owners and managers (§5.8) — what paper never did: an aggregated, trended, queryable production record; a bottleneck-aware view of the shop floor; **IATF 16949 audit-ready evidence**; and an **anonymized peer benchmark** against comparable fastener shops.

The strategic logic: the frictionless capture wedge is the cheap on-ramp; the **accumulated cross-tenant operational dataset** is the moat; the **IATF compliance pull** is the non-discretionary reason to adopt and keep paying. The wedge is copyable — the moat (proprietary data + verification credibility + OEM relationships) is not.

**What GU v1 is not:** not a sensor/IoT/predictive-maintenance product (that is a later phase via IoT-Ignite); not an MES/ERP; not a dashboard *for the usta/floor persona* (WhatsApp-first there — but owners/managers do get a mobile web dashboard, §5.8); not a generic efficiency tool; and not, on self-report alone, a verification-grade compliance system (see §10).

---

## 2. Vision & Strategic Fit

**Within ARDICTECH.** GU is a **thin product layer on the shared EAIP platform**, not a standalone system. It reuses the platform's channel gateway, orchestration, inference, identity, storage, and graph substrate. This is a hard architectural principle: GU never forks platform infrastructure to special-case itself.

**The three-stage value thesis** (the reason GU is worth building beyond a point feature):
1. **Wedge** — frictionless, zero-install capture gets GU into shops that every incumbent ignores because their CAC math fails at this segment.
2. **Moat** — every shop that captures daily feeds a proprietary, ever-growing dataset of how fastener shops actually operate (output, scrap, rework, capacity, bottlenecks), cohorted by product class and shop topology. This is the part horizontal AI platforms cannot replicate: they have no operational data from the manufacturing long tail.
3. **Multi-sided value** — at small scale the SMB subscription reads like a data-acquisition cost, but **at scale it is the largest revenue line** (≈60–85% of total), not a cost. The compounding, sellable asset/moat is the *demand* side that values the aggregated data: OEM supplier-development, insurers (operational underwriting), lenders (SME credit signal). This two-sided structure is what makes the unit economics work where a pure low-ARPU SMB subscription would not.

**Build-order honesty.** The *logical* product sequence (capture → karne → flow → audit → benchmark) is not necessarily the *commercial* sequence. The two must be labeled distinctly; conflating them is a known failure mode. For the FBH, the commercial lead is **IATF audit armor** (the must-have), with karne/benchmark as the daily-engagement and retention engine.

**Relationship to sibling products.** GU is the *standalone, no-MES* capture product. CWF is the MES-integrated (ARMES) production-AI product for shops that already have an MES. They share the platform and the conversational model but address different shop maturities; GU shops may graduate toward CWF-class capability as they digitize.

---

## 3. Target Users & Personas

GU has **four personas with different daily tools and different incentives**. The capture experience targets the capturers (P1, P3); the value loop must reward each.

**Channel by persona.** P1 (usta) lives in **WhatsApp** — capture and lightweight returns; a dashboard would be rejected here (dashboard-fatigue). P2 (owner), P3 (office), and other managers get the **mobile-friendly web dashboard** (§5.8) — the analysis surface WhatsApp text cannot serve. P4 (OEM) is served later by an external-portal variant of that same dashboard infrastructure.

**P1 — Ustabaşı / head usta (primary capturer).**
Context: runs the floor, knows every machine, often gloved/oily hands, more comfortable speaking than typing, lives in WhatsApp. Goal: get through the shift, hand over cleanly, not get blamed. Frustration: paper logs are tedious and easily lost; verbal handovers drop detail; "patrondan fırça" when numbers look bad. What GU gives P1: the lightest possible capture (one photo / one voice note), a clean shift record, and **cover** — flags are timestamped and on record. Adoption hinges on P1 perceiving personal benefit, not extra work.

**P2 — Patron / owner (primary value recipient and buyer).**
Context: runs the business, no time for dashboards, decides spending, signs the OEM contracts. Goal: keep the OEM contract (IATF), reduce scrap/waste, know what's actually happening without walking the floor. Frustration: data lives in heads and notebooks; the monthly/quarterly reality is opaque until something breaks or an audit looms. What GU gives P2: the **daily karne** (a number to act on), the **bottleneck** (where the money is), the **audit armor** (contract protection), and the **benchmark** (where they stand vs peers — a punch-in-the-gut motivator and a retention hook).

**P3 — Office / Excel person (secondary capturer).**
Context: often a family member or a single back-office staffer who later keys notebook data into Excel. Goal: avoid double entry, produce the reports the boss/auditor wants. What GU gives P3: ingest from where they already are — forward/photograph the Excel, or let GU be the system of record so the re-keying disappears.

**P4 — OEM supplier-development / quality manager (demand-side, multi-sided).** `[FBH-dep: identity of anchor OEM]`
Context: responsible for the OEM's fastener supplier base meeting zero-defect (IATF 16949) standards and having reliable capacity. Goal: visibility into supplier quality/capacity/risk; fewer audit surprises; supplier development. What GU gives P4 (later/multi-sided): anonymized or consented supplier-base health and capacity views — a reason for the OEM to **mandate or subsidize** GU across its suppliers. Note the directional sensitivity (§10): suppliers fear the OEM using data against them; what P4 sees and how must be a deliberate decision, not a default.

---

## 4. Problem & Jobs-to-be-Done

**The problem in detail.** A 10–250-employee fastener shop runs a real, complex operation (cold heading, threading, heat treat, coating) but records it on paper: daily counts, scrap (fire), rework, consumables (sarf), downtime. Some machines have built-in counters/HMIs; many do not. The data is latent, fragmented, latency-bound, and non-aggregated. The shop is simultaneously under **IATF 16949 audit pressure** from its automotive OEM customers (non-discretionary — losing the certificate means losing the contract) and **emerging CBAM/carbon data requests** from EU-exporting customers, which it currently meets with manual, error-prone, last-minute effort.

**Jobs-to-be-done (per persona):**
- P1: *"Help me log the shift and hand it over without it becoming extra work — and keep me covered."*
- P2: *"Tell me what actually happened today, where I'm losing money, and let me pass the OEM audit without a fire drill."*
- P3: *"Stop making me re-key the notebook into Excel."*
- P4: *"Give me trustworthy visibility into my fastener supplier base's quality and capacity."*

---

## 5. Product Scope — Capabilities in Depth

### 5.1 Frictionless capture (three modalities)
The capture surface meets the usta where they already are. **No new behavior, no install, no sensors.**
- **Photo capture.** (a) *Notebook page* — the usta photographs the existing shift logbook; a multimodal LLM extracts structured fields (per-machine or factory-total counts, scrap, rework, sarf). (b) *Machine HMI/counter* — for machines with a digital counter, the usta photographs the display; the model reads the digital reading. This is the zero-hardware bridge to "machine data" without installing sensors.
- **Voice capture.** A WhatsApp voice note ("2 nolu tezgahta 240 çıktı, 12 fire, kalıp değişimi yarım saat") → Whisper STT (Turkish) → LLM extraction → structured data. The default for gloved hands and oral-culture users.
- **Interactive buttons.** WhatsApp interactive buttons/lists for the smallest structured inputs and channel selection ("Vardiya bitti — [Defter fotoğrafı] [Sesli] [Yaz]"), and for confirmations.

### 5.2 Confirmation & integrity loop (hybrid)
Capture is never trusted blindly. The pattern mirrors the platform principle — **LLM extracts, deterministic system records, human confirms in between**: GU echoes the extracted values back over WhatsApp for one-tap confirm/correct ("240 okudum, doğru mu? [Evet] [Düzelt]"). Numbers (the highest OCR-risk field) always get a confirmation step. This is the integrity guard for both the benchmark and any compliance output.

### 5.3 Daily karne (operational record)
The return value, on the same channel: aggregated output, scrap %, rework, consumable burn-down, and trend — e.g., *"Bugün 3 tezgah, 720 parça, %4 fire, en çok 2 numarada (%9); X sarf 2 güne biter."* This is the thing the paper notebook never produced: aggregation, trend, and an actionable number. It is also the daily handover/shift-record that the usta already needs (so capture replaces a pain rather than adding one).

### 5.4 Flow & bottleneck
- **Process-graph reconstruction.** A one-time, photographed hand-drawn shop-floor sketch (raw material → machine 1 → machine 2 → …) is reconstructed by the multimodal LLM into a process graph, then confirmed/corrected by the usta over WhatsApp.
- **Bottleneck (Theory of Constraints).** Given the graph and per-station rates, GU identifies the constraint and the theoretical-vs-actual throughput, and directs attention to the one station that moves output. Theoretical max is framed as a *ceiling, not a target*; the gap is decomposed (availability/performance/quality loss), never presented as a bare guilt number.
- **Observed-capacity learning.** Where per-station counts exist, GU learns each station's demonstrated peak rate from the daily stream as an empirical capacity proxy — passive, self-correcting — and uses it both for bottleneck detection and as an integrity cross-check (flagging implausible self-reports against the model).

### 5.5 IATF 16949 audit armor (primary compliance value)
GU accumulates continuous, tamper-evident, timestamped SPC/scrap/traceability evidence as a byproduct of daily capture, and generates a **one-click, audit-ready PDF** (SPC log, scrap/rework history) for OEM audits. For the FBH this is the lead commercial value: the captured data **is** the audit evidence (glove-tight fit to what IATF demands).

### 5.6 Cross-tenant benchmark (the data-network-effect engine)
Anonymized "where you stand vs comparable fastener shops" (output/scrap/rework against peer cohort). Reciprocal — **contribute to see**; the benchmark refreshes only while the shop keeps contributing. Density-gated and k-anonymized (§11). This both creates a new value proposition and powers daily-capture retention.

### 5.7 (Emerging) Carbon / CBAM extension `[Pro; emerging]`
With energy + material capture, GU allocates purchased-steel emissions (supplier pass-through) plus own electricity to a product-level embedded-emissions figure for CBAM / customer carbon requests. **Honest boundaries (see §10):** for fasteners the carbon is dominated by *upstream steel* (not the shop's process), the shop's own contribution is largely *electricity*, and CN 7318 scope is still firming up — so this is a forward-looking extension, not a v1 anchor, and requires the energy+material layer to be credible.

### 5.8 Manager dashboard (mobile-friendly web)
Channel is persona-specific (see §3). The usta stays on WhatsApp; **owners and managers get a mobile-friendly, web-based dashboard** — opened from a link, no app-store install (PWA-capable, "add to home screen") — as the surface for analysis that a WhatsApp text channel cannot serve. The daily karne still pushes to the owner over WhatsApp as a nudge, but exploration, drill-down, and visualization live in the dashboard. It is the natural home of the **benchmark** (peer comparison is inherently visual) and the **flow/bottleneck graph**.

Role-based views (Keycloak-driven):
- **Owner / patron** — at-a-glance health, the bottom-line number, benchmark standing, audit-readiness status, and a **portfolio view across multiple shops** for owners who run several factories `[open: multi-shop in v1?]`.
- **Production manager** — throughput, bottleneck/flow, station-level detail, capture-health (which ustas/stations are reporting, data-quality).
- **Quality manager** — scrap/rework/SPC trends, the audit center (generate/download IATF PDFs, audit-readiness), traceability.

The same infrastructure is deliberately the **precursor to the external/OEM portal (P4)** and the multi-sided data products — designed as an extension, not a rebuild. It is built on the platform's existing front-end stack (Next.js / Kong / Keycloak); GU contributes screens and read-API, not new infrastructure (§9.1). `[open: exact manager role-set; write-actions beyond audit-PDF trigger and shop settings]`

### Progressive enhancement (cross-cutting)
Capability lights up by available data granularity, not by a binary requirement. Shops that keep **per-station** tallies unlock the full flow/bottleneck/observed-capacity engine; shops that record only **factory totals** get karne + scrap + a coarse theoretical ceiling. This heterogeneity is designed-in and creates a natural Core→Pro upgrade path ("start logging per machine, and I'll show you which station eats your money").

---

## 6. Packaging — Core vs Pro

| | **Core** | **Pro** |
|---|---|---|
| Capture | adet + fire (all modalities) | + rework + sarf + energy |
| Output | daily karne, scrap %, trend | + flow/bottleneck, observed-capacity, what-if (lite) |
| Compliance | IATF basics, audit PDF | + carbon/CBAM allocation `[emerging]` |
| Benchmark | output + scrap cohort | + rework/consumable-efficiency cohort |

**Pricing logic** `[FBH-dep: validate with real shops]`. Compliance commands more than efficiency, because auditable evidence protects a contract. The deeper point: **the SMB subscription is the largest revenue line at scale (≈60–85%), not "just a cost"**; the compounding moat is the multi-sided *demand* layer (OEM supplier-development, insurer, lender, carbon). Early-stage, low-ARPU SMB ARPU can run near break-even while coverage density builds — and the demand-side monetization insulates revenue from single-shop wallet fragility and TR macro volatility.

---

## 7. Key User Flows

**Day-0 onboarding (frictionless acceptance — the kill-zone).** No sensor, no network setup, no app install. The pitch is one sentence: *"Defterini değiştirme; vardiya bitince sayfanın fotoğrafını çek, gönder."* Optionally, a one-time floor sketch to seed the process graph. First value (a karne) arrives within the first capture cycle, not after a silent learning period.

**Daily capture loop.** Shift-end nudge → usta sends photo/voice/buttons → extract → confirm/correct → store → karne returned in-channel. The loop is designed to take seconds and to produce something the usta already needs (the handover record).

**The audit moment.** OEM audit approaches → P2/P3 generates the audit-ready SPC/scrap PDF in one click → contract protected. This is the moment that converts "nice tool" into "can't operate without it."

**Benchmark unlock (reciprocity).** Once the shop has contributed enough and its cohort has reached density, the benchmark unlocks: *"Muadil fastener atölyelerine göre buradasın."* Continued visibility requires continued contribution — the engine that sustains the daily habit and raises switching cost.

---

## 8. Data Model & Integrity

**Core entities** (multi-tenant, tenant-isolated): Tenant/Shop; Machine/Station; Product (with class/size/process attributes for cohorting); Shift; ProductionRecord (counts/scrap/rework, per-station or factory-total); ConsumableRecord (sarf); DowntimeEvent; FlowGraph (nodes/edges of the shop topology); CaptureArtifact (photo/voice/raw + extraction + confidence + confirmation state); AuditArtifact (generated PDFs with provenance).

**Capture → confirm → store.** Every record carries its source modality, extraction confidence, and confirmation state. Unconfirmed numeric fields are not promoted to "trusted" until confirmed. Provenance is retained (the original photo/voice) for audit defensibility.

**Granularity handling.** Records are tagged per-station or factory-total; downstream capabilities check the available granularity rather than assuming it.

**Integrity guards.** (1) Confirmation loop on high-risk fields (numbers). (2) Observed-capacity cross-check — flag self-reports implausible against the flow model. (3) Outlier/gaming handling for the benchmark (under-reporters must not silently look "better"); a data-quality score gates benchmark participation. These guards protect both the benchmark and compliance credibility.

---

## 9. Platform & Architecture Mapping

GU runs **on the shared platform**, never forking it. v1 is cloud SaaS (no on-prem footprint for the standalone GU shop); advanced features (graph, benchmark) live permanently on the ARDICTECH cloud tier.

**Validated against Platform SSoT v5.1:** every capability in §5 maps to an existing platform component — no missing primitive blocks GU. The mapping is in §9.1; GU is a true thin product layer (it adds product logic and GU-specific screens, not new infrastructure).

- **Channel Gateway** — WhatsApp Business API + Meta webhook + routing; voice-note handling. Channel-abstracted (not WhatsApp-locked) to enable later channel-swap for non-WhatsApp geographies.
- **Orchestration** — LangGraph agent with query classes (catalog, OEE/karne-text, maintenance, quality). The OEE/karne-text data source for a standalone, MES-less shop is an open question (§13).
- **STT** — Whisper (faster-whisper, Turkish), GPU-optional.
- **Multimodal extraction** — vision model for notebook/HMI capture; self-hosted inference via vLLM / LiteLLM (zero-data-egress posture).
- **Graph substrate** — FalkorDB / Graphiti for the flow graph and the cross-tenant topology/benchmark graph. (Per owner decision, this platform service is **un-gated for the GU path**; it lives on the cloud tier only and never ships to the shop. v1's static topology is a trivial user; the temporal/cross-tenant graph is where it earns its keep.)
- **Relational/state** — PostgreSQL (platform default, multi-tenant).
- **Analytics / OLAP** — ClickHouse for karne trends, time-series aggregation, and the **cross-tenant benchmark aggregation** (the benchmark math runs here, not in Postgres).
- **API gateway / BFF** — Kong (the read-oriented API surface the dashboard and external/OEM portal consume).
- **Object storage** — MinIO for capture artifacts (photos/voice).
- **Audit PDF** — WeasyPrint + Jinja2; IATF/SPC templates; Turkish fonts.
- **Identity** — Keycloak (role-based access for the manager dashboard; multi-tenant isolation).
- **Manager dashboard** — responsive, mobile-first web app (PWA-capable; no app-store install), built on the platform's **existing** front-end stack (Next.js), API gateway (Kong), and identity (Keycloak). Reads from PostgreSQL + ClickHouse + Graphiti the WhatsApp agent writes to. GU contributes the screens, views, and read-API — not the front-end infrastructure. The benchmark and flow-graph visualizations live here; the future OEM/external portal is a variant of this same infrastructure.
- **Edge / sensors** — **out of v1.** IoT-Ignite owns the entire edge tier; the sensor phase integrates IoT-Ignite (never builds an edge stack) and adds TimescaleDB for telemetry. See §12.

> **Scope flag (corrected in v0.3).** The dashboard is GU-specific **product work, not new infrastructure** — the platform already provides the front-end stack (Next.js), API gateway (Kong), and role-based identity (Keycloak). The added v1 effort is GU's screens/views + read-API endpoints + role views on that existing infrastructure: real, and not in the original C1–C4 task set (WhatsApp gateway, Whisper, LangGraph agent, audit PDF), so it must still be added to the build schedule — but it is materially lighter than a from-scratch front-end build.

### 9.1 Platform implementability (capability → component, validated against SSoT v5.1)

| Capability (§5) | Platform component |
|---|---|
| WhatsApp capture / return | Channel Gateway + WhatsApp |
| Voice → text | Whisper |
| Notebook / HMI photo extraction | vision (multimodal), vLLM + LiteLLM |
| Agent / query classes | LangGraph |
| Confirm + structured store | PostgreSQL (multi-tenant) |
| Capture artifacts (photo/voice) | MinIO |
| Karne / trends / benchmark aggregation | ClickHouse (+ Postgres) |
| Flow graph + benchmark graph | FalkorDB / Graphiti |
| Audit PDF | WeasyPrint + Jinja2 |
| Manager dashboard | Next.js + Kong (BFF) + Keycloak |
| Self-hosted, zero-egress inference | vLLM + LiteLLM |
| (Phased) sensor / energy | TimescaleDB + IoT-Ignite (later) |

**Net:** no missing platform primitive blocks GU. What remains is GU-specific build *on* the platform — agent query classes, the capture→extract→confirm pipeline, audit templates, benchmark cohorting/k-anonymity/gating logic, and the dashboard screens. Temporal and Redpanda exist on the platform but are **not required for v1** (GU is request/response + scheduled nudges; no heavy streaming or long-running workflows).

---

## 10. Compliance Posture

**IATF 16949 (primary, FBH).** GU's captured SPC/scrap/traceability data maps directly onto IATF audit evidence; the audit-PDF is the deliverable. This is the strongest forcing function for the FBH because the data GU naturally captures **is** what the standard requires.

**CBAM (secondary / emerging) — stated honestly:**
- CBAM's definitive phase is live (since 1 Jan 2026); EU importers must report and (from 2027, for 2026 imports) surrender certificates, and they require verified embedded-emissions data from non-EU suppliers or face punitive default values.
- **Scope nuance:** downstream steel fasteners (CN 7318) are widely treated as in-scope and appear on CBAM goods lists, but formal Annex I inclusion of 7318 is firming up / signalled rather than unambiguously settled — to be confirmed at CN-code level (§13).
- **Data-fit nuance:** for fasteners, embedded emissions are dominated by *upstream steel production* (a supplier pass-through, not the shop's process), with the shop's own contribution largely *electricity* (indirect). GU's shop-floor production capture is therefore **not** the bulk of CBAM-relevant data; the CBAM extension requires the **energy + material-allocation layer (Pro)** to be credible.

**Verification-grade boundary (critical).** Self-reported capture is sufficient for the benchmark and efficiency value. It is **not, by itself, verification-grade** for accredited compliance (IATF audit credibility and CBAM third-party verification with on-site audit and a ~5% variance threshold). Verification-grade output ultimately needs a defensible, verifiable data source — confirmation loops and integrity cross-checks in v1, and the sensor/metering path (IoT-Ignite, energy meters) as the eventual credibility backbone. This boundary must be communicated; overselling self-report as audit-grade is a reputational risk.

---

## 11. Moat Mechanics — Data Network Effect

- **Reciprocity** — contribute to see; the benchmark is the carrot that sustains daily capture and raises switching cost.
- **k-anonymity** — a cohort is not exposed below a minimum size (k ≥ 5, preferably more) or shops can re-identify each other; below density, no benchmark.
- **Cohort design** — comparability by **topology + product class** (e.g., "3-stage cold-forming, 2 heading machines, M6–M12 zinc-plated"), not raw "parts/day." Start coarse, measure within-cohort variance, split only where variance is high (empirical cohorting, not a priori taxonomy).
- **Garbage-in / gaming guards** — outlier handling; data-quality score affects benchmark participation; honest shops must not be made to distrust the benchmark by under-reporters.
- **Cloud-tier IPR** — the benchmark and topology library live on the ARDICTECH cloud, never on the shop; the moat is "protected by physics" (a single-tenant competitor has no cohort).
- **Local instantiation** — the moat is global in pattern but rebuilt per market/cohort (density does not travel); this favors going narrow and deep before broad.

---

## 12. Non-Goals & Phasing

**Explicit non-goals (v1):**
- Not a sensor/IoT/predictive-maintenance product. The usta is the data source.
- Not an MES or ERP. GU sits beside whatever the shop has, or beside nothing.
- Not a dashboard *for the usta / floor-capture persona* — WhatsApp-first there (anti dashboard-fatigue). A mobile-friendly web dashboard **is** provided for owner/manager personas (§5.8); the WhatsApp-first principle governs the *capture channel*, not the *analysis surface*.
- Not a generic efficiency tool. Compliance-anchored + data-moat.
- Not a verification-grade compliance engine on self-report alone (§10).
- Not built for non-WhatsApp premium markets (US/DACH/Japan) in v1; the channel abstraction preserves that option for later.

**Phasing.**
- **v1 (this document):** sensor-free capture, karne, flow/bottleneck, IATF audit armor, benchmark; cloud SaaS; FBH (TR lab).
- **Phase 2:** energy + material layer (CBAM credibility); multi-sided data products (OEM/insurer/lender); first portable-formula geography.
- **Later (Astra/Final):** sensor mode via IoT-Ignite integration + TimescaleDB; richer machine vision/quality; the full GU_-series vision. The GU_ document series describes this end-state and must **not** be treated as the v1 spec.

---

## 13. Open Questions & Dependencies

1. **FBH definition** `[FBH-dep]` — geography/cluster, firm count in the 10–250 band (TÜİK/BESİAD), and current export/CBAM-exposure figures (existing sector data is dated and must be hardened).
2. **Anchor for the beachhead** `[blocker]` — the signable channel: an automotive OEM/Tier-1 mandate vs the BESİAD sector-association channel. This determines initial density and the multi-sided (OEM-pays) leg. Owner input required.
3. **OEE/karne-text data source** — for a standalone, MES-less, sensor-less shop, what feeds the OEE/karne query class beyond usta-reported input? Unresolved.
4. **CN 7318 CBAM scope** — confirm at CN-code level whether/when steel fasteners are formally in Annex I scope.
5. **Energy-metering approach** — how energy is captured for the CBAM/Pro layer (utility-bill capture vs meter vs IoT-Ignite) and whether/when that crosses into the sensor phase.
6. **Pricing validation** — Core/Pro price points against real shop willingness-to-pay.
7. **Multi-sided data governance** — what P4 (OEM) sees, consent/anonymization model, and the competition-law posture on aggregation.
8. **Dashboard role-set & scope** — exact manager roles beyond owner/production/quality; whether the multi-shop portfolio view is in v1; write-actions beyond audit-PDF trigger and shop settings.
9. **Dashboard effort** — GU-specific screens/views + read-API on the platform's *existing* front-end (Next.js/Kong/Keycloak) must be sized and added to the build schedule. Not in the original C1–C4 set, but it is product work on existing infrastructure, not a from-scratch front-end build.
10. **Capture-extraction quality (key product risk, not a platform gap)** — reliable structured-number extraction from messy Turkish handwriting is the hardest part; vision inference exists on the platform, but accuracy thresholds, the confirmation UX, and acceptable error rates must be validated before the benchmark and any compliance output can be trusted.

---

## 14. Success Metrics / KPIs (proposed)

- **Activation:** % of onboarded shops sending a confirmed capture within 48h of Day-0.
- **Capture-habit retention:** median active capture days/week per shop at 4 and 12 weeks.
- **Confirmation integrity:** % of numeric extractions confirmed without correction (proxy for capture quality).
- **Audit value realization:** % of shops generating ≥1 audit PDF; audit-PDF generations per shop per quarter.
- **Benchmark unlock & pull:** % of shops reaching cohort density; capture-frequency lift after benchmark unlock.
- **Retention / churn:** logo and revenue churn; correlation with capture frequency and audit usage.
- **Data-quality score distribution** per cohort (moat health).
- **Cohort density** per product/topology segment (gates benchmark and multi-sided products).
- **Dashboard engagement:** owner/manager weekly-active dashboard sessions; benchmark-view and audit-center usage.

---

*End of v0.1. Items tagged `[FBH-dep]` / `[blocker]` are not yet decided; §13 is the live dependency list. The full sensor-based vision (GU_ series) is intentionally out of v1 scope.*
