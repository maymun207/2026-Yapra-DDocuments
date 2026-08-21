# CWF — Open Items Register · v38

<!-- cwf-open-items-register-v38 · rev 38 · 2026-07-11 · Supersedes v37.2.
     UI-STAGES-1 SHIPPED & MERGED this turn. NEW VERIFIED FLOOR: origin/master b8db75e
     (merge; parents 67e35d5 + reviewed tip 8c90d8c; merged tree byte-identical to the
     reviewed tip 9992f55 → RULE-25 no re-run) = 1992 tests / 190 files / docVersion
     rev 69 / drift [OK]. Deploy-confirmed live: prod serves branch=master (dpl_EDY6…C),
     200/304 only, and GET /api/admin/users 200 confirms the Karar-1 users-landing flip
     is live. Anchor for the next phase = b8db75e. -->

## 1 · LIVE QUEUE

- **UI WORKSTREAM — StagesDashboard v1 SHIPPED (S37).** See §5 for the closed phase.
  The workstream itself stays OPEN: v1 is the read-only map; the owner-approved v2
  (per-stage LIVE status badges — active prompt rev / provider / routing epoch / trust
  tier, computed from existing read endpoints) is the natural next page when the owner
  calls it. STAGE-PLAYGROUND (§4) is the deferred creative extension.

- **Owner eyeball smoke (rides the owner's browser, not a forced step):** on the live
  admin panel confirm the "Aşamalar/Stages" tab renders 00+14 cards, a "… daha fazla"
  expands, a ‹/› link opens the correct GitHub blob at the deployed SHA, and (if Langfuse
  host is configured) a span chip appears. Client-only — no server trace exists to read.

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

## 5 · CLOSED (do NOT re-raise)

**S37:** UI-STAGES-1 — read-only StagesDashboard "Aşamalar/Stages" tab (00 quota-gate +
14-stage pedagogical pipeline map from typed `stagesRegistry.ts`; config-gated real-span
Langfuse chips; SHA-pinned ‹/› GitHub code links; C-9 anti-drift teeth: 15 cards · tab
targets ∈ TABS · codePaths on disk · spans ∈ config∪TURN_STAGES · landing default) +
admin landing default flip `'rules'`→`'users'` (Karar 1). Merge `b8db75e` (parents
67e35d5 + reviewed tip 8c90d8c; tree-identical to reviewed tip → RULE-25 no re-run).
Pure client + docs: NO API route, NO migration, NO dependency, NO Operator door.
Suite 1975→1992 / 187→190 · docVersion rev 68→69 (no reseal, src/CI-only) · deploy
live & healthy. FOOTGUN recorded: `adminLegibility.test.ts` auto-generates 2 tests per
admin `.tsx` (budget +2 for every future admin component).

**S36:** CRON_SECRET (owner env, set + redeploy) · RULE26-PROVER-1 (`7f0dee5` — KindsTab scroll
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

<!-- END · cwf-open-items-register-v38 · rev 38 · 2026-07-11 -->
