# CWF — Open Items Register · v37

<!-- cwf-open-items-register-v37 · rev 37 · 2026-07-11 · Supersedes v36.
     MID-SESSION MINT (S37 open, owner-directed): records the Agent_Kontrol_Tablosu (Excel)
     reconciliation into the durable queue and OPENS the admin/chat UI workstream.
     Verified floor UNCHANGED: origin/master 67e35d5 = 1975 tests / 187 files /
     docVersion rev 68 / drift [OK] (re-confirmed via `git ls-remote` at S37 open —
     tip == S36 close floor, nothing moved). -->

## 1 · LIVE QUEUE

- **UI WORKSTREAM — OPENED (S37).** First page: **StagesDashboard** — a live, row-per-stage
  map of the 14-stage agent pipeline (01 User Query → 14 Memory Update). Per stage: purpose ·
  tweak guidance · the tweakable tables that constitute the stage · per-table role with a
  ONE-CLICK deep-link to the exact admin tweak surface. Shape seed = owner's Excel
  `StagesDashboard` tab (header rows 4–5). Status: design dialogue in progress,
  diagnosis-first at HEAD `67e35d5`; design note + gated phase prompt NOT yet authored.

No other forced engineering item remains (carried from v36).

## 2 · RIDES AN OWNER PROD ACTION (unchanged from v36 — Architect reads the logs when it fires)

- **Guardrail cron positive confirmation** — CRON_SECRET SET (S36); next authed fire
  (`0 6 * * *` UTC) now VISIBLE via SWEEP-1's secret-free run-log. Architect confirms
  `[rollout-guardrail]` appears (idle run = `{ active: false }`).
- **First L5 rollout prod smoke** — RolloutTab stage→widen→evaluate→complete; Architect reads
  the signatures from prod logs + `rollout_audit` rows.
- **First golden mark prod smoke** — first ReplayTab mark flips L2 Layer-2 to MANDATORY and
  seeds the L3 canary baseline; Architect confirms on the next prompt.segment publish.
- **Routing / chat-quota curation prod smokes** — ride the owner's first real pin/publish and
  first chat turn (carried, unfired).

## 3 · OWNER-OWNED (surface only if raised — unchanged)

- Golden-specimen curation (~20 via ReplayTab) · first L5 rollout (RolloutTab) · dark-palette
  sign-off · token rotation on real ARMES 401 · quota floor revisit ·
  `rollout.guardrailMinTurnsPerArm` panel edit (code floor 50 governs; DB row born on first
  governed edit).

## 4 · DEFERRED (do NOT build unprompted)

### S37 Excel-reconciliation delta

**CONFIRMED already-deferred (Excel L-column ↔ existing register entries):**
- static-CATEGORIES governance (Excel L25) — keyword base stays code-only reference until the
  R-A migration is owner-triggered.
- ALWAYS_INCLUDE union rows (L52) — code list = immutable FLOOR; DB may only ADD
  (routingSlice pattern) + reset. Trigger unchanged.
- METRIC_ALIASES as a governed row + dedup vs the existing `armes.metric_definition` kind
  (L90) — the "double violation" note stands; L2 side-job when triggered.
- time-module / prompt assembly-order + section-toggle FULL governance (L68) — section
  on/off already an L1 param; ordering governance stays deferred.

**NEWLY NAMED deferrals (from the Excel, now durable here):**
- **resultStore SUMMARIZATION + governed thresholds** (L60) — summarization is a
  feature-flagged, VERSIONED capability, never a hardcode. CODE-TRUTH CORRECTION (S37,
  verified at 67e35d5): offload thresholds are NOT yet governed — `AGENT_PARAM_KEYS` carries
  no resultStore key; the deferral covers BOTH the L1 threshold rows AND the summarizer.
  Trigger: first real context-overflow incident in prod.
- **Long-term user-memory connector** (L36) — when its phase opens, land a param-registry
  placeholder `memory.enabled=false` first; connector in its own phase. Trigger: owner opens
  the memory phase.
- **LangGraph / planner stage** (L30) — when it arrives, plan templates are BORN on the
  standard pattern: code-reference + DB-version + sandbox-layer (R-A/R-B from day one).
  Trigger: owner opens the planner phase.
- **MCP onboarding templates** in Settings→MCP (L53) — nice-to-have, no trigger, lowest
  priority.

### Carried (unchanged from v36)

Entity-absence-no-number at the runtime empty≠zero layer via a GOVERNED
`SUPERSET_BLIND_SPOTS[].forbidden` phrase match (NEVER a bare "yok" marker; trigger:
prompt+eval-gate insufficient in prod) · Langfuse-host governed SELECTION (trigger: 2nd
production host) · router-LLM gateway rewiring · Docusaurus · CI-apply · AWS-DENY-1 ·
Langfuse SSO · governed connectors · backends enabled/tier/row-CRUD UI · family temperature
clamp · client history sender · taskFn/pairedReplay parity · per-user prompt variants
(distinct from L5's one-candidate-by-bucket slice) · governed-text sanitizers · rollout
family extension beyond prompt.segment (trigger: first rule/param the owner wants sliced).
NOTE: "prompt A/B in production" stays DISCHARGED (L5); HARDEN-GRANTS-1 stays DISCHARGED (S36).

## 5 · CLOSED (S36 — do NOT re-raise)

CRON_SECRET (owner env, set + redeploy) · RULE26-PROVER-1 (`7f0dee5` — KindsTab scroll defect
= PHANTOM; RULE 26 now an automated headless CI gate) · P7 + P7-FIX-1 (`5cc642e` → `329ea64` —
Superset empty≠zero runtime layer, numeric-zero-ONLY calibration) · SWEEP-1 (`373739a`) ·
HARDEN-GRANTS-1 end-to-end (`cbd657a` → Operator-applied → `67e35d5` DOC-FLIP).

## 6 · STANDING RULES (carried; no S37 delta yet)

S36-1 (CRITICAL-gate review probes author-uncovered must-NOT-fire phrasings) · S36-2
(grep project files for same-name artifact before authoring) · S36-3 (blanket revoke safe iff
no API verb; ALTER DEFAULT PRIVILEGES = secure-by-default; empty≠zero calibrates on
quantity-zero, never bare absence) · S30-1..3 · S31-1 · S32-1 · S33-1 · S34-1 · S35-1 —
all carried.

<!-- END · cwf-open-items-register-v37 · rev 37 · 2026-07-11 -->
