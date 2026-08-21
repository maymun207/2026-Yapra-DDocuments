# CWF — Open Items Register · v37.2

<!-- cwf-open-items-register-v37_2 · rev 37.2 · 2026-07-11 · Supersedes v37.
     WHY A .2: the presented v37 was amended IN PLACE twice (resultStore code-truth
     correction; §1 scope expansion + §4 STAGE-PLAYGROUND). The owner caught the
     versioning slip → S37-1 minted (presented artifacts are immutable; amendments bump
     the version). This file is the immutable current state; treat any downloaded v37
     as superseded. Verified floor UNCHANGED: origin/master 67e35d5 = 1975 tests /
     187 files / docVersion rev 68 / drift [OK] (re-confirmed via ls-remote this turn). -->

## 1 · LIVE QUEUE

- **UI WORKSTREAM — IN EXECUTION (S37).** First page: **StagesDashboard** — a read-only,
  pedagogical, deep-linked map of the agent pipeline (00 pre-gate + 14 stages).
  **FINAL GO received (owner, S37) on mockup-v2 = the visual+copy contract.**
  Owner-approved v1 scope: (a) 00 quota-gate pre-pipeline card stays (code truth:
  `stage:'00'`, Q-1); (b) nav home = BELGELER section; default landing tab flips
  `'rules'`→`'users'` (Karar 1); (c) progressive-disclosure pedagogy — concise blocks +
  "… daha fazla" expandables at developer-onboarding depth; (d) per-stage **Langfuse
  chips** bound to REAL span names only (`cwf.stage.*` · `cwf.mcp.*` · `cwf.grounding` ·
  `cwf.stream.attempt` · `cwf.warm.*` · `cwf.flush`), reusing the existing client
  `ObservabilityConfig{langfuseHost,projectId}` mechanism (TRACE-LINK-1), hidden when
  unconfigured, NO chip where no distinct span exists; (e) **"‹/› kodu gör"** links on 🧱
  sources → GitHub blob pinned to the DEPLOYED commit SHA (fallback master, labeled),
  registry carries `codePath` + a path-exists test. Zero new write surfaces, zero new API
  routes, zero migrations, zero eval-gate contact.
  **Status: phase prompt `claude-code-PHASE-UI-STAGES-1-stages-dashboard-v1.md` AUTHORED
  this turn — hand to AG. A separate design note was FOLDED into the phase prompt**
  (decision disclosed: mockup-v2 + the prompt's verbatim-embedded registry data together
  ARE the design; a standalone note would only duplicate both).

No other forced engineering item remains (carried from v36).

## 2 · RIDES AN OWNER PROD ACTION (unchanged — Architect reads the logs when it fires)

- **Guardrail cron positive confirmation** — CRON_SECRET SET (S36); next authed fire
  (`0 6 * * *` UTC) now VISIBLE via SWEEP-1's secret-free run-log. Architect confirms
  `[rollout-guardrail]` appears (idle run = `{ active: false }`).
- **First L5 rollout prod smoke** — RolloutTab stage→widen→evaluate→complete; Architect
  reads the signatures from prod logs + `rollout_audit` rows.
- **First golden mark prod smoke** — first ReplayTab mark flips L2 Layer-2 to MANDATORY
  and seeds the L3 canary baseline; Architect confirms on the next prompt.segment publish.
- **Routing / chat-quota curation prod smokes** — ride the owner's first real pin/publish
  and first chat turn (carried, unfired).

## 3 · OWNER-OWNED (surface only if raised — unchanged)

- Golden-specimen curation (~20 via ReplayTab) · first L5 rollout (RolloutTab) ·
  dark-palette sign-off · token rotation on real ARMES 401 · quota floor revisit ·
  `rollout.guardrailMinTurnsPerArm` panel edit (code floor 50 governs; DB row born on
  first governed edit).

## 4 · DEFERRED (do NOT build unprompted)

### S37 Excel-reconciliation delta

**CONFIRMED already-deferred (Excel L-column ↔ existing register entries):**
- static-CATEGORIES governance (Excel L25) — keyword base stays code-only reference until
  the R-A migration is owner-triggered.
- ALWAYS_INCLUDE union rows (L52) — code list = immutable FLOOR; DB may only ADD
  (routingSlice pattern) + reset. Trigger unchanged.
- METRIC_ALIASES as a governed row + dedup vs the existing `armes.metric_definition` kind
  (L90) — the "double violation" note stands; L2 side-job when triggered.
- time-module / prompt assembly-order + section-toggle FULL governance (L68) — section
  on/off already an L1 param; ordering governance stays deferred.

**NEWLY NAMED deferrals (from the Excel, now durable here):**
- **resultStore SUMMARIZATION + governed thresholds** (L60) — summarization is a
  feature-flagged, VERSIONED capability, never a hardcode. CODE-TRUTH CORRECTION (S37,
  verified at 67e35d5): offload thresholds are NOT yet governed — `AGENT_PARAM_KEYS`
  carries no resultStore key; the deferral covers BOTH the L1 threshold rows AND the
  summarizer. Trigger: first real context-overflow incident in prod.
- **Long-term user-memory connector** (L36) — when its phase opens, land a param-registry
  placeholder `memory.enabled=false` first; connector in its own phase. Trigger: owner
  opens the memory phase.
- **LangGraph / planner stage** (L30) — when it arrives, plan templates are BORN on the
  standard pattern: code-reference + DB-version + sandbox-layer (R-A/R-B from day one).
  Trigger: owner opens the planner phase.
- **MCP onboarding templates** in Settings→MCP (L53) — nice-to-have, no trigger, lowest
  priority.
- **STAGE-PLAYGROUND (S37, owner idea — safe shape recorded):** let a developer edit a
  SANDBOXED COPY of a 🧱 module (e.g. `groundingCheck.ts` calibration) and run it against
  recorded replay specimens / the golden set, seeing a verdict-diff vs the real engine —
  the previewDrafts pattern lifted from VALUES to LOGIC (session-scoped, never publishes,
  client worker or a capped offline sandbox). The LIVE-pipeline user-code hook variant is
  REJECTED as a standing mechanism (deterministic-trust law + eval-gate bypass +
  arbitrary code-execution surface). Trigger: owner raises it after StagesDashboard
  v1+v2 land.

### Carried (unchanged from v36)

Entity-absence-no-number at the runtime empty≠zero layer via a GOVERNED
`SUPERSET_BLIND_SPOTS[].forbidden` phrase match (NEVER a bare "yok" marker; trigger:
prompt+eval-gate insufficient in prod) · Langfuse-host governed SELECTION (trigger: 2nd
production host) · router-LLM gateway rewiring · Docusaurus · CI-apply · AWS-DENY-1 ·
Langfuse SSO · governed connectors · backends enabled/tier/row-CRUD UI · family
temperature clamp · client history sender · taskFn/pairedReplay parity · per-user prompt
variants (distinct from L5's one-candidate-by-bucket slice) · governed-text sanitizers ·
rollout family extension beyond prompt.segment (trigger: first rule/param the owner wants
sliced). NOTE: "prompt A/B in production" stays DISCHARGED (L5); HARDEN-GRANTS-1 stays
DISCHARGED (S36).

## 5 · CLOSED (S36 — do NOT re-raise)

CRON_SECRET (owner env, set + redeploy) · RULE26-PROVER-1 (`7f0dee5` — KindsTab scroll
defect = PHANTOM; RULE 26 now an automated headless CI gate) · P7 + P7-FIX-1 (`5cc642e`
→ `329ea64` — Superset empty≠zero runtime layer, numeric-zero-ONLY calibration) ·
SWEEP-1 (`373739a`) · HARDEN-GRANTS-1 end-to-end (`cbd657a` → Operator-applied →
`67e35d5` DOC-FLIP).

## 6 · STANDING RULES (S37 delta + carried)

- **S37-1 (NEW, owner-caught):** once an artifact has been PRESENTED to the owner it is
  IMMUTABLE — any amendment mints a NEW version (same-session amendments use vN_2 /
  "rev N.2" style), never an in-place edit, even when the edit is disclosed in prose.
  (Architect edited the presented register v37 in place twice this session; owned.)
- Carried: S36-1 (CRITICAL-gate review probes author-uncovered must-NOT-fire phrasings) ·
  S36-2 (grep project files for same-name artifact before authoring) · S36-3 (blanket
  revoke safe iff no API verb; ALTER DEFAULT PRIVILEGES = secure-by-default; empty≠zero
  calibrates on quantity-zero, never bare absence) · S30-1..3 · S31-1 · S32-1 · S33-1 ·
  S34-1 · S35-1.

<!-- END · cwf-open-items-register-v37_2 · rev 37.2 · 2026-07-11 -->
