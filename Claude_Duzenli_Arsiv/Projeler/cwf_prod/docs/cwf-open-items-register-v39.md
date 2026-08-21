# CWF — Open Items Register · v39

<!-- cwf-open-items-register-v39 · rev 39 · 2026-07-12 · Supersedes v38 (immutable).
     SESSION 37 CLOSE. v38 was written when only UI-STAGES-1 had shipped; everything below it
     (STAGES-FIX-1/2/3, NAV-STACK-1, the CI-flake hotfix, the full 15-stage SOTA sweep, two new
     standing rules) landed after and is folded in here.
     VERIFIED FLOOR: origin/master 415db54 = 2050 tests / 199 files / docVersion rev 69 /
     drift [OK] / CI green after the de-flake hotfix. -->

## 0 · VERIFIED FLOOR (start every next session from this)

`origin/master` = **`415db54`** · **2050 tests / 199 files** · docVersion **rev 69** · drift `[OK]`.

S37 chain: `67e35d5` → `b8db75e` (UI-STAGES-1) → `5fff42d` (STAGES-FIX-1) → `8e7203d`
(STAGES-FIX-2) → `017085e` (STAGES-FIX-3) → `3a2fe02` (NAV-STACK-1) → **`415db54`** (CI de-flake).

**No Operator/DB step is pending. No prod action is blocking.**

---

## 1 · LIVE QUEUE (in the order the Architect recommends)

### 1.1 — MASTER PLAN (next action, owner-requested, NOT yet written)
The owner explicitly insisted on ONE master plan merging: the remaining UI streams (C, E), every
SOTA gap (below), the small open items (§1.5), dependencies, and a single sequencing. **This is
the first thing to produce next session.** All inputs now exist (the sweep is complete).

### 1.2 — STREAM C · WAVE 2 (the big one: content + IA + naming)
**Needs a DESIGN NOTE first** (it is a writing + information-architecture job, not a code phase).
Scope, all traced to the owner's live 03→14 re-walk (see `cwf-stages-v1-review-findings-v4`):
- **Content rewrite in a human onboarding voice** (F13/F14/F15/F19) — kill "§7 yasası", "OBS-3.1
  dersi", RULE-N references. Every stage answers: *what IS this → why it exists → when/how YOU
  touch it.* Extra depth for the critical-but-unexplained stages: **07, 09, 10, 11, 12**.
- **User-Docs bridge** (F16/F22) — the owner's own solution, stressed repeatedly. Deep "why/how"
  lives in User Docs; every card AND panel deep-links to its section. **Reference pattern already
  in prod: Replay's "you arrived from the Backend Trust console…" strip (F42) — propagate it.**
- **Stages-model propagation into panels** (architecture pillar):
  - **F23 Tweak IA REDESIGN** (owner's hardest directive) — regroup session-overlay levers BY
    STAGE in pipeline order; Tweak = the action-twin of Stages. LAYOUT, not copy. Own design note.
  - **F46 Rules split** — one flat list conflates prompt.segment / domain_rules / guard-text /
    params. Split by role/kind so deep-links land in the right sub-view. (Root cause of "dönüp
    dolaşıp Rules'a çakıyorum".)
  - **F26** Kinds (structure) precedes Rules (instances) — reorder the Configuration menu; teach
    the relation (Excel analogy: Kinds = column headers/types, Rules = the rows).
- **Naming (standing Wave-2 rule: "what image does this leave in a HUMAN's head?")**
  - **F33** Routing → **"Araç Eşleme / Tool Matching"**
  - **F45** Backend Trust → **"Veri Otoritesi / Data Authority"**
  - Visible labels change; the inner `?tab=` id may stay (deep-links) or migrate — decide in the
    phase. **STAGES-FIX-3 already made this a one-liner** (shared `tabLabel()` in `adminTabs.ts`).
- **Panel explainers:** F7 (Rules payload template from the client's `field_spec`), F8 (Kinds
  schema visibility — same lever, no new endpoint), F17 (`system` = the L1 param lane, not a data
  source), F18 (Users → "set this user's quota" cross-action), F24 (Tweak "Active fingerprint"),
  F30 (archive/rollback/"running now" — high-risk prod actions), F34 (ALWAYS_INCLUDE "ertelendi"
  reads as empty), F40 (stage-11 tool-loop story).
- **F38 grounding visual + copy** — the red ⚠ `grounding_violation` looks like an ERROR but is a
  governance CATCH (a backend tried to present emptiness as zero and was stopped). Human copy +
  a non-panic visual (shield/"caught", not red alarm).
- **F9 (proper)** — the real in-panel source viewer (needs a source-serving endpoint; shares the
  substrate with the User-Docs bridge). Wave-1 shipped only the governed toggle + `__REPO_PUBLIC__`.

### 1.3 — STREAM E · SUPERSET ACTIVATION (owner wants a step-by-step workstream)
**F36 (owner-observed, live):** Superset MCP is connected but **not serving** — every answer comes
via ARMES. This is the known deferred DB-first activation: run `scripts/seedRules.ts` (publish
Superset `rule_kinds` + CORE rules into the governed DB) + backfill `backend_id:'superset'` on the
`supersetArmes` `mcp_settings` row. **Diagnose LIVE first (Vercel logs + `mcp_settings`) — do not
guess the root cause.** Superset activation is also the TRIGGER for two SOTA items (§1.4).

### 1.4 — SOTA GAPS (the 15-stage sweep is COMPLETE; see the three sweep docs)
| Item | Verdict | Trigger / sequencing |
|---|---|---|
| **GOLDEN SET IS EMPTY** | 🔴 **highest-leverage single act in the system** | The canary + Wilson-CI auto-rollback are wired to **no sensors**. Marking ~20 golden specimens arms L3 **and** seeds the canary baseline in one move. Also unblocks the consistency lens and any cost/quality routing. **Owner action; can be done any time.** |
| **SEMANTIC-ROUTING-1** (stages 03/07) | 🔴 the ONE real architecture gap | Keyword routing is structurally weak for agglutinative Turkish — evidence is in CWF's own learned map (stopwords/inflections as routing keys). Design: embed the TOOL CATALOG (not query keywords) on **Supabase pgvector**, hybrid scoring (semantic + existing keyword map + entity), keep §7/ALWAYS_INCLUDE/precondition-hints. **Do it AFTER Superset (E)** — that's when the catalog doubles. Prove it with the routing lens before shipping. |
| **MEMORY-1** (stages 05/14) | 🟡 named, real | CWF has working + narrow-procedural (routing cache) + human-authored semantic memory, and **NO episodic memory** — "the system has a diary it never reads" (the owner's "5 yaşında kalıyor"). Postgres-first governed `episodes` + promotion through the EXISTING draft→gate→publish→rollback rails + a forgetting policy. Its own program, after the UI waves + Superset. |
| **GOLDEN-LOOP-1** (stage 14) | 🔵 small, high value | One-click "this answer was wrong → mark as golden specimen": every production failure becomes a permanent regression test. Closes 09↔14 with almost no new machinery. |
| **08 MEASUREMENT** | 🔵 measure, don't build | `resultStore` (deterministic handles) is **VINDICATED** — summarization is lossy/non-deterministic and wrong for a numbers agent. The real gap is that session shape is **unmeasured**. Query the existing telemetry (`telemetry_events` tokens + Langfuse): if sessions are short, **stage 08 closes** — that's a finding, not a deferral. |
| **F39** MAX_TOOL_ROUNDS | 🔵 govern it | The guard EXISTS (`stopWhen stepCountIs(8)`, env-overridable) — runaway loops are structurally prevented — but it is invisible and ungoverned. Candidate `agent.maxToolRounds` L1 param; fits a later batch. |
| **F47** hardcode-floor audit | 🔵 decision item | Per floor, decide explicitly: **safety invariant** (stays code — e.g. empty≠zero BEHAVIOR must never be DB-disableable) vs **adjustable value** (→ governed row). Do NOT blanket-open. Post-Wave-2 governance audit. |
| **Offline eval-judge** | ⚪ recommendation, not decided | Deterministic runtime trust (ADR-001) is **VINDICATED as the SOTA Layer-1 floor** — never put an LLM judge in the runtime path. But the lenses are structurally blind to answer QUALITY. An **offline** judge on golden specimens is the SOTA-shaped option: pinned judge model, human-owned ground truth (the oracle problem: never let the agent write its own assertions). |
| **Consistency lens** (stage 12) | ⚪ cheap addition | "Same question twice → same number?" — cross-response consistency is a named SOTA hallucination-detection technique CWF lacks. The replay harness (N-reps + Wilson CI) already provides the machinery. **Needs golden specimens.** |
| 04 planner · 06 retrieval | ⚪ no gap today | ReAct IS the 2026 mainstream default. Injection > retrieval until Superset doubles the rule set; then reuse the SAME pgvector substrate as SEMANTIC-ROUTING-1 (build the substrate once, for tools AND rules). |

### 1.5 — SMALL OPEN ITEMS (do not lose)
- **NAV-STACK-1 DOC-FLIP** — `.agents/CHANGELOG.md` + skill-KB entries were out of that phase's
  C-1 scope and were never written. Small; write them.
- **Flake-pattern sweep** — grep for the same *sync `getByTestId` after an async promise* pattern
  elsewhere in the suite (the S37-2 lesson; one instance was already fixed).
- **`/dev/admin-preview` QuotaPanel** — pre-existing seam crash (`rawRows` on undefined because the
  seam never mocks `listChatQuotas`). Absent in production. `?? []` hardening or a seam mock.
- **Owner env step (only when the repo goes private):** set `VITE_REPO_PUBLIC=false` in Vercel —
  the ‹/› code links auto-hide.
- **Owner prod smokes still unexercised** (carried): first guardrail cron fire, first L5 rollout,
  first golden mark, routing/quota smokes.

---

## 2 · CLOSED IN S37 (do NOT re-raise)

- **UI-STAGES-1** (`b8db75e`) — read-only "Aşamalar/Stages" tab: 00 quota-gate + 14-stage pipeline
  map from a typed `stagesRegistry.ts`; C-9 anti-drift teeth; landing default `rules`→`users`.
- **STAGES-FIX-1** (`5fff42d`) — F4 `<main>` scrolls · F5 pushState+popstate nav · F10 Langfuse chip
  copies the span (self-hosted v3.205 has **no** per-span filter URL — v4/Cloud only) · F9 governed
  ‹/› toggle + `__REPO_PUBLIC__` auto-off · F6/F12 legend · F1/F2 Quota User column + orphan honesty.
- **STAGES-FIX-2** (`8e7203d`) — scroll-restore: a deep-link return lands on the ORIGIN CARD
  (`stageReturnCardId` in AdminPanel + `useLayoutEffect` + `scrollIntoView`; no browser storage).
- **STAGES-FIX-3** (`017085e`, first HOTFIX-profile phase) — F20 nav chips show the human tab name
  via a shared `tabLabel()` · F32 `InlineHelp` is collapse⇄expand (legacy `'dismissed'` migrated —
  permanently-hidden help comes back) · F37 Inspect overflow (`dd` needed `min-w-0`) · F25 the
  Langfuse chip copies the span AND opens the host.
- **NAV-STACK-1** (`3a2fe02`) — the nested-navigation layer. Five findings were ONE missing
  abstraction: `navStack.ts` (pure ancestor stack) + `NavBreadcrumb` + `navDepth`-stamped pushState
  → **one hop per Back** (F41) · back affordance (F28) · "which page am I on" (F29) · per-entry
  scroll memory (F27) · Rules detail reachable (F31). `BackToStagesStrip` DELETED — one mechanism.
- **CI de-flake** (`415db54`) — test-only.
- **SOTA sweep 00→14** — complete; three docs (`cwf-sota-review-trust-and-memory-v1`,
  `cwf-sota-stage-sweep-part1/2/3-v1`).

---

## 3 · NEW STANDING RULES FROM S37

- **S37-1 (owner-caught):** a PRESENTED artifact is **immutable**. Any amendment mints a NEW version
  (`vN_2` / "rev N.2"), never an in-place edit — even when the edit is disclosed in prose.
- **S37-2 (Architect-owned lesson): CI-GREEN IS A MERGE PRECONDITION.** A local full-suite green —
  AG's *or* the Architect's — is **not** sufficient. **Mechanism:** both lanes verified with
  **sharded** runs (`--shard=1/2`, `2/2`), which put the racing test files in separate shards; CI
  runs plain **unsharded** `vitest run` where all files interleave. **Sharded ≠ CI** — sharding
  changes worker scheduling and can hide timing-dependent flakes. New flow: **AG pushes → CI runs
  (the real experiment) → Architect RULE-25 → merge only if CI is green.**
- **Two ceremony profiles (owner-approved):** **FULL** (multi-file · any `api/**`·`shared/**`·
  migration touch · anything near trust/eval/security) vs **HOTFIX** (single-file, low-risk,
  client-only: targeted tests, single pass, light RULE-25). **Never lighten for security/DB/eval/
  trust work.** Architect picks and states the profile per phase.
- **Batch findings:** one phase per walkthrough round — pay the 3-lane handoff once per round.
- **Wave-2 naming principle:** every label is tested against *"what image does this leave in a
  HUMAN's head?"* Technically-correct names that evoke the wrong concept are renamed.

<!-- END · cwf-open-items-register-v39 · rev 39 · 2026-07-12 -->
