# Context Bootstrap Document — insurance-uc / ARDICTECH — v0.4 (10 Jun 2026)

> **v0.4 changelog:** ① §2 storage corrected — PostgreSQL is the transactional store (the MariaDB Galera line was a stale v0.2-era assumption that survived into the project copy; the PostgreSQL-default decision had already been made platform-wide). ② Keycloak ↔ customer AD/Entra OIDC federation added as explicit day-one scope (platform task D8, 60h) — must be profiled in M0 discovery. ③ MariaDB/Galera scope lock recorded: ARMES replication adapter only; the insurance instance contains NO MariaDB. ④ Platform sequence locked: Variant A (logical order); program total 12,060h per SSoT v5.1.

## 0. NEXT-SESSION LOADER PRIMER

> Read this Bootstrap Document as authoritative project state for **insurance-uc** at ARDICTECH (~30 turns of strategic + technical work compressed). Assume role: senior software architect + full-stack developer continuing this engagement. Do not expand or re-explain. Use § 7 to determine next action; § 8 for required user input before proceeding.

---

## 1. CORE SEED & STATE

**Objective:** Build *Fire & Engineering Facultative Offer Triage Assistant* for `[Customer Name]` (Turkish reinsurer, likely Türk Reasürans) → AI-assisted intake/extraction/lookup/classification/enrichment of inbound broker reinsurance offer emails.

**Current state:** v0.3 artifacts complete (proposal docx, gantt xlsx, TR customer-shareable HTML, term sheet EN+TR held in reserve). Pre-discovery. Awaiting customer decision on commercial structure + Discovery (M0) kick-off.

**Operational env:**
- Strategic owner: Maymun (ARDICTECH founder, primary decision-maker)
- Deployment target: 100% on-customer-premises (customer hypervisor, GPU, network)
- Customer infra ref: SMB share `\\10.34.106.24\turkre ortak alan\007-Yangın ve Mühendislik İhtiyari Reasürans\` w/ `1-Bound Accounts` + `2-Quotes & Submissions` subfolders
- Output workspace: `/mnt/user-data/outputs/`
- Working language: EN for internal artifacts, TR for customer-facing

**Identifiers (verbatim paths in `/mnt/user-data/outputs/`):**
- `insurance-uc_proposal_v0_3.docx` * (CURRENT proposal, Path 1)
- `insurance-uc_gantt_v0_3.xlsx` * (CURRENT, 4 sheets: Customer Milestones / Gantt / Internal Milestones / Resource Loading)
- `insurance-uc_zaman_plani.html` * (TR customer-shareable timeline overview, self-contained)
- `insurance-uc_termsheet_v0_1.docx` (EN partnership term sheet, held in reserve)
- `insurance-uc_on_sartlar_belgesi_v0_1.docx` (TR term sheet)
- `insurance-uc_discovery_questions.docx` (v1 hybrid-deployment focus → needs Path 1 revision)
- `insurance-uc_responsibility_split.docx` (5-stage det-vs-LLM split, audit-trail design)
- v0.1 + v0.2 predecessors present but superseded

---

## 2. TECH STACK & ARCHITECTURAL MAPPING

**5-stage pipeline** (all on-prem):

| Stage | Owner | Function |
|---|---|---|
| 1 Extraction | LLM + GuardrailsAI schema | Email body + PDF/Word/Excel attachments → structured JSON |
| 2 Validation | Deterministic | VKN checksum (10/11 digits), date ranges, required fields |
| 3 Lookup | Hybrid (mostly det) | Parallel query: ARU/KARU + Outlook + Bound Accounts + Submissions |
| 4 Classification | *Deterministic, NEVER LLM* | R1 Bound match ≤24mo → Yenileme; R2 other match → Geçmişte Görüldü; R3 no match → Yeni İş |
| 5 Enrichment | AI suggests, human confirms | Faaliyet Kodu top-3 via embeddings + LLM rerank, expert picks via verification tool |

**Stack (all OSS, on customer infra):**
- Storage: **PostgreSQL** (transactional + LangGraph checkpointing + Hybrid Decision Engine audit writes + NiFi document metadata + audit PDF queries + pgvector Faaliyet Kodu search — all six insurance-relevant connections) | MinIO (raw .eml + attachments) | Qdrant (embeddings). **NO MariaDB in this deployment** — MariaDB/Galera exists platform-wide only as the read-only ARMES replication adapter (CWF context); the insurance instance has no ARMES and therefore no MariaDB.
- LLM: vLLM on customer GPU (model TBD: 70B vs 13B *)
- Orchestration: LangGraph (per-mail flow) + NiFi (SMB crawler, nightly index)
- Identity: Keycloak federated w/ customer AD or Entra ID — **day-one scope (platform task D8, 60h)**, NOT deferred to platform FIN phase. M0 discovery must profile: AD vs Entra ID, LDAP vs OIDC, group→role mapping, network reachability from the K8s cluster to the IdP
- Gateway: Kong + GuardrailsAI (LLM output schema enforcement)
- Obs: Loki + OpenTelemetry + Langfuse + MLflow (prompt versioning)
- Governance: OpenMetadata + OPA
- IaC: OpenTofu (not Terraform/BUSL); CI: self-hosted GitLab CI or GitHub Actions; Registry: Harbor

**Output surfaces:** Tracking dashboard (web) | Outlook reply automation | Excel export | Verification tool (NEW v0.3) | Alerts via email + Teams/Slack (NEW v0.3)

**Customer MS ↔ ARDICTECH M mapping:**

| Customer | Calendar | ARDICTECH Internal | Payment |
|---|---|---|---|
| MS#1 PoC demo | Month 3 / W13 | M0 + M1 + most of M2 | 25% |
| MS#2 Internal alpha | Month 5 / W20 | M2 finish + M3 + M4 | 45% |
| MS#3 V1 production | Month 7 / W28 | M5 (extended to 8w) | 30% |

**Internal milestones (28w total):** M0 W1-3 | M1 W4-9 | M2 W10-14 | M3 W13-18 (overlap) | M4 W17-20 (overlap) | M5 W21-28

**Effort numbers (v0.3):**
- ARDICTECH billable: 584 PD = 116.8 person-weeks
- Customer-side commitment: ~24 person-weeks (SME/Field Expert 13.75 + IT Ops 10.25)
- Peak FTE: 7-7.5 around W25-W26 (handover phase)
- Roles: Architect, PM, Backend, AI Eng, Frontend (heavy in M4 for verification tool), DevOps/Infra (heavy in M1 stack + M5 handover), QA, Security/KVKK

---

## 3. DOMAIN DICTIONARY & PROJECT GLOSSARY

- `ARU/KARU`: Customer internal underwriting system; integration profile unknown → API vs DB replica vs RPA fallback (*P0 question for M0)
- `Identity federation (D8)`: Keycloak ↔ customer AD/Entra OIDC — day-one runtime dependency; second P0 question for M0 (which IdP, which protocol, who owns the app registration)
- `VKN`: Turkish tax ID, 10 digits legal entity OR 11 digits natural person (TCKN); checksum validatable
- `Faaliyet Kodu`: Activity code from ~1000-row reference list spanning Yangın + İnşaat-Montaj + Enerji branches
- `Bound Accounts`: SMB folder of bound (closed) deals; 2-year window drives Yenileme rule
- `Submissions`: SMB folder of all quote submissions incl. unbound; drives Geçmişte Görüldü
- `Yeni İş / Yenileme / Geçmişte Görüldü`: 3 mutually exclusive classification outcomes
- `Verification tool`: NEW v0.3 scope — field expert UI to review/correct AI outputs; corrections feed back into matching system
- `Internal document analysis`: NEW v0.3 scope, ambiguous → likely RAG over internal procedure docs + slip templates; scope TBD in M0
- `Alerts/notifications`: NEW v0.3 scope — workflow triggers via email/Teams/Slack
- `Field expert / SME`: Customer-side underwriter who uses verification tool as primary daily interface from MS#2 onward
- `MS#1/2/3`: Customer-visible milestones (only these drive payment + acceptance)
- `M0..M5`: ARDICTECH internal delivery milestones (not customer-facing, no sign-off)
- `Path 1`: Single-tenant on-prem internal-use only (CURRENT SCOPE)
- `Path 2`: Multi-tenant SaaS partnership w/ revenue share (separate term sheet, in reserve)
- `Path 3`: JV/strategic partnership (rejected — too distracting from manufacturing focus)
- `Galip Usta / CWF / Kale Seramik`: Other ARDICTECH products — NOT this project; CWF informs IP-via-physics doctrine but doesn't apply here

---

## 4. CRITICAL DECISIONS & RATIONALES

- Path 1 selected → firewalled cash-grab scope; preserves strategic optionality on multi-tenant via separate term sheet. (Rejected: Path 2 embedded in current proposal because mixed-pricing dilutes vertical optionality; Path 3 JV because too distracting from manufacturing strategic focus)
- Customer-MS structure over internal-M structure for engagement acceptance/payment → customer's value-focused 3-checkpoint mental model; internal M0-M5 stays for delivery rigor
- Compressed M0-M4 + extended M5 (8w) → meets customer's 7-month MS#3 expectation AND gives realistic alpha+pilot window between MS#2 and MS#3
- Deterministic classification rules over LLM classifier → audit-trail-first design; reviewer sees "folder X dated Y in 2yr window → R1 fired → Yenileme" not "LLM said so"
- Source code retained by ARDICTECH; escrow optional → IP protection via opacity since architectural separation (CWF pattern) impossible w/ full on-prem
- Payment 25/45/30 → MS#2 largest because most tech value delivered there; defensible to customer commercial team
- 28-week baseline w/ M3+M4 overlap → ARU/KARU connector independent of M2 SMB/Outlook work; M4 UI work doesn't depend on ARU/KARU integration completing (built against mocked lookup schema)
- HTML for customer timeline overview (not docx) → easier print-to-PDF, no Word dependency for customer review, professional self-contained file
- Discovery as 3w fixed-price standalone phase → de-risks ARU/KARU and hardware unknowns w/o forcing full commitment
- PostgreSQL over MariaDB Galera (v0.4, correction propagated) → platform default; native RLS, pgvector, logical replication; one fewer engine to operate on customer premises
- Identity federation pulled into D-scope (v0.4) → on-prem instance cannot go live without it; was previously orphaned in platform FIN phase (M8–M13)

---

## 5. CONSTRAINTS & INVARIANTS

- *NEVER let LLM make classification decision* — must be deterministic R1/R2/R3 rules, fully auditable
- *NEVER multi-tenant under Path 1* — license restrictions explicit in proposal §3.3
- *NEVER sublicense/white-label/redistribute/host-for-3p* under Path 1
- ARDICTECH retains all platform IP (source, prompts, architecture, ops know-how) regardless of path
- All customer data stays in customer network (KVKK + customer policy); no external LLM API calls (vLLM self-hosted only)
- Insurance = firewalled cash grab UNLESS customer signals true partnership posture w/ rev share → THEN switch to term sheet pricing
- Strategic moat = manufacturing vertical (CWF/Kale at galip usta depth) → insurance must NOT distract senior engineering capacity
- OSS-first, no-Microsoft, data-sovereignty (Maymun standing principles)
- Communication style: dense analytical prose, brutal honesty, push back when reasoning faulty, minimal bullets in opinion mode, no diplomatic softening, single focused response per turn
- TR for customer-facing artifacts; EN for internal/architecture docs
- Customer name placeholder still `[Customer Name]` / `[Şirket Adı]` in all artifacts — user must provide before customer sharing
- Maymun does NOT want assumptions — prefers to be asked when unclear

---

## 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

- *ARU/KARU integration profile unknown* → 4w (API) vs 8w (RPA) variance in M3 → cannot finalize commercial commitment until M0 discovery
- *Customer hardware procurement timeline unknown* → Turkish GPU lead time can be 8-16 weeks → may block M1 start if not already provisioned
- *Internal document analysis scope ambiguous* (customer wrote "Internal dokumanlarda okunup anlaşılacak") → unclear if RAG over procedure docs, addition of "Kabul Edilmemiş İşler" list (Word doc mentioned but not in Excel), or something else → M4 sizing TBD until M0 answer
- Discovery questions doc v1 written for hybrid deployment → needs Path 1 + on-prem + 3-MS restructure, hardware readiness section to top
- v0.1 effort estimate (160 PD) was build-engineering only → corrected to v0.3 honest 584 PD (full loaded team incl. PM, QA, DevOps, security, architect)
- v0.1/v0.2 did NOT have verification tool, alerts, internal doc analysis → ADDED in v0.3 (+20 PD honest)
- Term sheet `_termsheet_v0_1` EN/TR held in reserve → triggers if customer pushes multi-tenant after Path 1 delivery, or if rev-share posture appears during M0

---

## 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Discovery questions revision** → produce v0.2 of `insurance-uc_discovery_questions.docx` restructured for Path 1 + on-prem + 3-MS, hardware readiness section at top. Success: discovery doc reflects current scope and engagement structure; usable in first customer meeting.
2. **Commercial annex template** (xlsx) → rate-card input cells + 3-tranche milestone fee breakdown auto-calculated from 116.8 person-weeks resource loading. Success: Maymun plugs in blended rates, milestone fees compute.
3. **TR proposal translation** → translate `insurance-uc_proposal_v0_3.docx` → Turkish IF customer requires full proposal (not just HTML overview). Success: customer-ready TR aligned line-by-line w/ EN v0.3.
4. **M0 prep brief** (1-pager) → 4 critical questions for first discovery meeting: ARU/KARU access mechanism, hardware readiness, LLM model size, source code escrow posture. Success: Maymun walks into M0 w/ clear question agenda.

---

## 8. OPEN QUESTIONS FOR USER

- Customer name → replace `[Customer Name]` / `[Şirket Adı]` placeholders in all artifacts
- Final payment tranche split → 25/45/30 (default, balanced), 20/50/30 (aggressive on MS#2 value), or 30/40/30 (safer early commitment)
- LLM model size → 70B (premium accuracy, expensive GPU ~2× A100 80GB) vs 13B (lighter accuracy, cheaper GPU ~1× L4); ~4× hardware cost diff on customer side
- Source code escrow posture → permitted by customer procurement Y/N
- "Internal document analysis" scope intent → confirm or defer to M0 discovery
- Which § 7 next deliverable has priority → #1 discovery / #2 commercial / #3 TR proposal / #4 M0 brief

---

## 9. END NOTE

→ Do not expand or re-explain this compressed doc unless asked.
