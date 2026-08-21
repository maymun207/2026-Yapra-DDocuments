# CWF — MASTER PLAN · v1

<!-- cwf-master-plan-v1 · rev 1 · 2026-07-12 · Session 38 opening deliverable (owner-insisted).
     Merges: remaining UI streams (C Wave-2, E Superset) + every SOTA gap (register v39 §1.4) +
     small open items (§1.5) into ONE sequenced plan with explicit dependencies and triggers.
     Inputs: cwf-open-items-register-v39 · CWF-SESSION-GRAPH-KB-v37 · cwf-stages-v1-review-findings-v4
     + the three SOTA sweep docs. Floor at authoring: origin/master 415db54 · 2050 tests / 199 files ·
     docVersion rev 69 · drift [OK] · CI green (independently re-verified at S38 open).
     Nothing here is new invention — this document SEQUENCES what already exists. -->

---

## 0 · THE SPINE (three facts that force the sequence)

1. **The golden set is the system's missing sensor, and it gates on nothing.** It is an owner
   action (~20 specimens via the existing GOLDEN-MARK-1 UI), it can be done *today*, and it arms:
   the L3 canary baseline, Wilson-CI auto-rollback, the consistency lens, the offline judge
   option, GOLDEN-LOOP-1's value, and — critically — **regression sensors for the Superset
   activation**, which is the first change to live *serving* behavior in the queue.
2. **Superset activation (E) is the trigger for SEMANTIC-ROUTING-1.** The routing gap becomes
   urgent exactly when the tool catalog doubles. Therefore E immediately precedes SR-1; SR-1 is
   never started before E is live.
3. **Wave 2 (C) is serving-risk-free and collides with nothing.** It is client/content/IA only —
   no `api/**` serving-path change, no migration, no interaction with E's Operator work. It can
   absorb the calendar while the golden set gets armed and E's diagnosis lands read-only.

The counter-argument (E before C: "Superset's rich data serves users sooner") loses on three
grounds: (a) E's step-by-step workstream is owner-driven through the admin panels, and the
owner's own verdict is that those panels are not yet legible to anyone but the Architect —
Wave 2 makes E's ground comprehensible; (b) E changes serving behavior and is strictly safer
run *after* golden sensors are armed and baselined; (c) the factory is functional today via
ARMES — E adds breadth, it does not unblock operation.

**One-line sequence:**
**W0 arm+clean (parallel, now) → W1 Wave-2 (C) → W2 Superset (E) ∥ GOLDEN-LOOP-1 →
W3 consistency lens + SEMANTIC-ROUTING-1 → W4 governance batch (F47 + F39) → W5 MEMORY-1.**
Golden set = owner, any time, ideally this week.

---

## 1 · DEPENDENCY TABLE (what depends on what, what it unblocks)

| Item | Depends on | Unblocks / triggers | Lane |
|---|---|---|---|
| **Golden set (~20 specimens)** | nothing (UI exists) | canary baseline · consistency lens · offline judge · GOLDEN-LOOP-1 value · safe E | Owner |
| NAV-STACK-1 DOC-FLIP | nothing | living-doc debt closed | AG |
| Flake-pattern grep | nothing | possible test fixes (fold into W0.c) | Architect → AG |
| admin-preview seam | nothing | dev-seam crash closed | AG |
| E.0 live diagnosis (read-only) | nothing | confirms E's activation steps BEFORE they're planned in detail | Architect + Operator (reads) |
| 08 measurement (read-only) | nothing | stage-08 **closes** if sessions are short (a finding, not a build) | Architect (+ Operator read) |
| **W1 Wave 2 (C)** | design notes (W1.a) | product legible to non-Architect humans; ground for E's owner-driven walk | Architect → AG |
| **W2 Superset (E)** | E.0 diagnosis · golden set armed (soft gate: sensors) · W1 (legible ground) | **SR-1 trigger fires** (catalog doubles) · Superset serving | Operator + Architect verify + Owner smoke |
| GOLDEN-LOOP-1 | golden-mark machinery (exists) · golden set concept live | every prod failure → permanent regression test; set becomes self-growing | AG (parallel to W2 — different lanes, no file collision) |
| Consistency lens | golden specimens · replay harness (exists) | second sensor for SR-1's proof; SOTA hallucination-detection technique | AG (small, W3 entry) |
| **W3 SEMANTIC-ROUTING-1** | E live (trigger) · routing lens (exists) · consistency lens (proof kit) · golden set | closes the ONE real architecture gap; pgvector substrate reusable for stage-06 rules retrieval later | Architect design → AG → Operator (pgvector migration) |
| **W4 F47 audit + F39 param** | W1 done (post-Wave-2 audit by definition) | per-floor open/keep decisions · `agent.maxToolRounds` governed | Architect decision doc → AG |
| Offline eval-judge (gate G1) | golden set · owner decision | answer-QUALITY measurement (lenses are structurally blind to it) | Owner decision → later phase if yes |
| **W5 MEMORY-1** | W1 + W2 done · benefits from golden set + consistency lens as sensors | episodic memory ("the diary gets read"); the 5→10 yaş evolution | Architect program design → AG + Operator |

---

## 2 · THE WAVES

### W0 — ARM & CLEAN (starts now; everything in parallel; days, not weeks)

- **W0.a — Owner: arm the golden set.** Mark ~20 specimens via GOLDEN-MARK-1. Coverage guidance:
  ARMES core metrics (OEE, duruş, üretim) · at least 3 empty≠zero specimens (IKINCILUST-class:
  barcodeless → "not visible," never "zero") · routing-sensitive Turkish phrasings (the learned
  map's weakness) · one known-good multi-tool turn. This simultaneously exercises the carried
  "first golden mark" prod smoke.
- **W0.b — Architect: flake-pattern grep** (sandbox, read-only): sweep the suite for the S37-2
  pattern (*sync `getByTestId` after an async promise*). Hits feed W0.c.
- **W0.c — AG: S38-CLEAN-1** (one batched phase, HOTFIX profile — doc/test/dev-seam only, no
  api/shared/migration surface): NAV-STACK-1 DOC-FLIP (`.agents/CHANGELOG.md` + skill-KB) +
  `/dev/admin-preview` QuotaPanel seam (`?? []` or seam mock) + any W0.b hits.
- **W0.d — Architect: E.0 live diagnosis** (read-only; the register's own rule: *diagnose live,
  don't guess*): Vercel runtime logs + Operator schema reads of `mcp_settings` and governed
  `rule_kinds` — confirm the assumed root cause (Superset serving from code floor; DB publish +
  `backend_id:'superset'` backfill missing) before E's steps are finalized. Zero writes.
- **W0.e — Architect: 08 measurement** (read-only): query existing telemetry
  (`telemetry_events` token columns + Langfuse traces) for session shape — turns/session, token
  growth across a session. **If sessions are short, stage 08 CLOSES as a finding.** No build.
- **W0.f — Owner (opportunistic, any time during W0–W1):** the remaining carried prod smokes —
  first guardrail cron fire + first L5 rollout (this is also the positive `CRON_SECRET`
  verification) · routing/quota smokes.

### W1 — STREAM C · WAVE 2 (content + IA + naming; the big one; design-first)

- **W1.a — Architect design notes (three, in this order):**
  1. `cwf-wave2-content-voice-design-v1` — the voice contract (every stage answers *what IS
     this → why it exists → when/how YOU touch it*; kill "§7 yasası"/"OBS-3.1 dersi"/RULE-N),
     the per-stage outline with extra depth for **07/09/10/11/12**, the User-Docs bridge
     (F16/F22) with **F42 as the propagated reference pattern**, arrival strips (F19), the F38
     grounding-catch copy + shield visual, and the panel explainers
     (F7/F8/F17/F18/F24/F30/F34/F40).
  2. `cwf-tweak-ia-redesign-design-v1` — **F23**, the owner's hardest directive: session-overlay
     levers regrouped BY STAGE in pipeline order 00→14; Tweak = the action-twin of Stages.
     Layout, not copy.
  3. `cwf-rules-split-design-v1` — **F46** (Rules split by role/kind so deep-links land in the
     right sub-view) + **F26** (Kinds before Rules in the Configuration menu; Excel analogy).
- **W1.b — AG phases (FULL profile, batched per design note):**
  - `WAVE2-CONTENT-1` — registry prose + panel copy + explainers + F38 + naming **F33 Routing →
    Araç Eşleme / Tool Matching** and **F45 Backend Trust → Veri Otoritesi / Data Authority**
    (one-liners via the shared `tabLabel()`), + **gate G2 decided inside this phase**: `?tab=`
    inner ids stay (deep-link safety) or migrate.
  - `WAVE2-IA-1` — F23 Tweak regroup.
  - `WAVE2-IA-2` — F46 Rules split + F26 reorder.
  - `WAVE2-DOCS-1` — User-Docs bridge + **F9 proper** (real in-panel source viewer; needs a
    source-serving endpoint → `api/**` touch → FULL profile, shares substrate with the bridge).
- **W1 exit criterion:** the owner re-walks Stages 00→14 in the new voice → findings v5.
  Expectation: small, cosmetic-class.

### W2 — STREAM E · SUPERSET ACTIVATION (step-by-step; sensors on)

**Entry conditions:** E.0 diagnosis confirmed · golden set armed (W0.a) · W1 exit.
- **E.1 — Operator:** run `scripts/seedRules.ts` (publish Superset `rule_kinds` + CORE rules to
  the governed DB) under the S31-1 discipline: FENCE-first prompt, literal-read G-gates,
  mandatory second-run idempotence probe.
- **E.2 — Operator:** backfill `backend_id:'superset'` on the `supersetArmes` `mcp_settings`
  row (the sanctioned array-aware UPDATE, that field only).
- **E.3 — Architect live verification:** Vercel logs show Superset tools entering the candidate
  set · one Superset-answered turn traced end-to-end in Langfuse · grounding lens run on a
  Superset specimen (the 2-layer empty≠zero posture is the known P7 gap — observe, don't
  bolt on a regex).
- **E.4 — Owner smoke:** ask a BI question ARMES cannot answer; verify the answer arrives with
  Superset provenance attribution.
- **W2-parallel — AG: GOLDEN-LOOP-1** (small FULL phase; no file collision with E, which is
  Operator-lane only): one-click "this answer was wrong → mark as golden specimen," closing
  09↔14. The set becomes self-growing exactly when serving behavior starts changing.
- **W2 exit:** Superset serving in production → **the SR-1 trigger has fired.**

### W3 — CONSISTENCY LENS, then SEMANTIC-ROUTING-1

- **W3.a — AG: consistency lens** (small phase first): "same question twice → same number?" on
  golden specimens, riding the existing replay harness (N-reps + Wilson CI). It is cheap, it is
  a named SOTA hallucination-detection technique, and it lands *before* SR-1 so the routing
  change ships with two independent sensors (routing lens + consistency lens).
- **W3.b — Architect: `cwf-semantic-routing-1-design-v1`**, then AG + Operator:
  - Embed the **TOOL CATALOG** (not query keywords) on **Supabase pgvector** — the substrate is
    built once and deliberately shaped for reuse by stage-06 rules retrieval later.
  - **Hybrid scoring:** semantic + the existing keyword learned map + entity signals.
  - **Preserved, untouched:** §7 (learning improves FINDING, never KNOWING) · ALWAYS_INCLUDE
    floor · the `routing_hint/sequencing` precondition-effect contract (CWF is *ahead* here —
    embeddings may replace recall, never that ordering discipline).
  - **Proof before ship:** routing lens A/B with adequate reps (the Wilson-CI power lesson:
    reps=3 with overlapping CIs = underpowered, not "no effect") + consistency lens clean.
  - pgvector = migration → Operator lane, FULL ceremony, no lightening (this is routing/trust-
    adjacent surface).

### W4 — GOVERNANCE BATCH (post-Wave-2 audit outcomes)

- **W4.a — Architect: F47 hardcode-floor audit** (decision doc): per floor, one explicit verdict
  — **safety invariant** (stays code; empty≠zero *behavior* is the canonical example: it must
  never be DB-disableable, a poisoned row must not be able to switch off the guard) vs
  **adjustable value** (→ governed row with reset-to-code). No blanket opening.
- **W4.b — AG: ONE phase** implementing the "adjustable" set + **F39**: `agent.maxToolRounds`
  as a governed L1 param (the guard exists — `stopWhen stepCountIs(8)`, env-overridable — it is
  merely invisible and ungoverned). FULL profile (param registry = `shared/**` + api surface).
- **Gate G3:** owner approves the audit table before W4.b is authored.

### W5 — MEMORY-1 (its own program)

Postgres-first governed `episodes` + **promotion through the EXISTING draft→gate→publish→
rollback rails** (the SOTA "append-only heuristics, edited through a controlled tool, with a
rollback log" is the machine CWF already is) + an explicit forgetting policy. Design note →
gated phases. Explicitly **not**: `historyWindowN` widening (context rot) · a vector-DB
bolt-on for memory v1 (pgvector may serve *retrieval over episodes* later, but governance
rails come first).

---

## 3 · DECISION GATES (owner)

| Gate | Question | Recommendation | Decide by |
|---|---|---|---|
| **G1** | Offline eval-judge: build it? | **Yes, offline-only** — pinned judge model, human-owned ground truth (oracle problem: the agent never writes its own assertions), runs over golden specimens. Never in the runtime path. | End of W2 (needs the golden set live to be meaningful) |
| **G2** | `?tab=` inner ids: stay or migrate with the renames? | Stay (deep-link safety), labels change via `tabLabel()` | Inside WAVE2-CONTENT-1 |
| **G3** | F47 audit verdicts | Per-floor table, no blanket opening | Before W4.b |
| **G4** | Repo going private? | If/when yes: set `VITE_REPO_PUBLIC=false` in Vercel (‹/› links auto-hide) | Whenever it happens |

---

## 4 · DO-NOT-BUILD (locked by the sweep; re-litigating these is a plan violation)

- **No LLM judge in the runtime trust path** — deterministic grounding (ADR-001) is the
  vindicated SOTA Layer-1 floor. A judge, if G1 says yes, is offline-only.
- **No stage-08 summarizer** — `resultStore`'s deterministic handles are vindicated;
  summarization is lossy/non-deterministic and a grounding-violation generator for a numbers
  agent. W0.e's measurement decides whether stage 08 simply closes.
- **No `historyWindowN` widening as a memory fix** — context rot; the real gap is MEMORY-1.
- **Locked laws** (unchanged): DB-first/code-floor · empty≠zero (behavior = mechanical
  invariant, never DB-disableable) · deterministic-only grounding · unbypassable eval-gate ·
  C1 (zero `messages` writes from replay/governance) · backend identity is DATA · §7.

---

## 5 · CEREMONY & PROCESS BINDINGS (per S37 rules; stated per phase at authoring time)

| Phase | Profile | Why |
|---|---|---|
| S38-CLEAN-1 (W0.c) | HOTFIX | doc/test/dev-seam only; no api/shared/migration/security surface |
| WAVE2-CONTENT-1 / IA-1 / IA-2 | FULL | multi-file client + registry; adminLegibility auto-gen tests in play |
| WAVE2-DOCS-1 | FULL | `api/**` touch (source-serving endpoint) |
| GOLDEN-LOOP-1 | FULL | api + client; touches golden/specimen surface |
| E.1/E.2 (Superset) | Operator ceremony | S31-1 FENCE-first + G-gates + idempotence probe; never lightened |
| Consistency lens | FULL | replay/lens surface |
| SEMANTIC-ROUTING-1 | FULL + Operator | routing/trust-adjacent + pgvector migration; never lightened |
| W4.b governance batch | FULL | param registry = shared/api surface |
| MEMORY-1 phases | FULL + Operator | new governed tables; security rules apply (verifyGrants probes, all-grantees revoke) |

Standing bindings that apply to every phase above: **S37-2** (AG pushes → CI unsharded green →
Architect RULE-25 → merge) · **S37-1** (presented artifacts immutable; amendments mint vN_2) ·
batch findings one phase per round · versioning in filename + inside · "YOUR ACTION ITEMS" in
every response containing owner actions · automation-first (Architect reads logs itself).

---

## 6 · WHAT "DONE" LOOKS LIKE (plan exit)

The plan is complete when: Wave 2's re-walk yields no systemic findings (a non-Architect human
can operate the panels) · Superset serves with provenance in production · SR-1 is live with a
lens-proven improvement on Turkish routing · the golden set is self-growing via GOLDEN-LOOP-1 ·
every floor has an explicit invariant-vs-value verdict · MEMORY-1 has its own approved program
design. At that point the next horizon items (offline judge if G1=yes · stage-06 pgvector rules
retrieval · P7 third-layer Superset validator · HARDEN-GRANTS observation (c)) get their own
plan revision (`cwf-master-plan-v2`).

<!-- END · cwf-master-plan-v1 · rev 1 · 2026-07-12 -->
