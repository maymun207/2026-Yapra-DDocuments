# IR Architecture — Build Roadmap · v1

<!-- cwf-ir-architecture-roadmap-v1 · rev 1 · 2026-07-19 · Architect-authored.
     Grounded in a fresh clone read of maymun207/cwf_yaprak (toolCategories.ts,
     semanticRouter.ts, routerAbLens.ts, resolveRouterPolicy.ts, agentParams.ts,
     glossary.ts, metricVocab.ts, timeTools.ts, replay/config.ts). This is the
     ROADMAP, not a phase prompt — each phase below gets its own design note +
     gated AG phase prompt before any code moves. -->

**PLATINUM compliance:** every phase ships self-configuring (governed params
self-seed via the existing selfSeedReconciler path; alias/routing data are
governed DB rows with code floors — zero manual configuration required to
function). Owner touchpoints are decisions and consent only, never assembly.

**GOLDEN FREEZE compliance:** no phase below depends on a golden run. The eval
spine is (a) observe-only live telemetry (free), (b) deterministic unit/CI
tests, (c) golden-specimen *labelling* (marking, zero tokens). The router A/B
run and any frame-accuracy batch run stay PARKED until the owner lifts the
freeze — they are listed as unlock items, never as gates.

## 0 · What IR is (one paragraph, for every future reader)

The semantic router today answers "which of 12 categories?" and throws the
rest of the sentence away. IR (intermediate representation) makes the same
LLM call answer "what does the user want?" as a structured frame —
`{ action, object, entity_ref, metrics, time, confidence }` over CLOSED
vocabularies — and moves everything downstream of that frame into
deterministic code: alias lookup, time parsing, `(action × object) → tools`
resolution. The LLM's only job becomes collapsing Turkish's infinite
morphological surface into a small fixed concept space; any decent model can
do that reliably. Model-agnostic quality is the point.

## 1 · Standing constraints (inherited, non-negotiable)

- **Availability floor is sacred:** ALWAYS_INCLUDE unioned on every path;
  keyword layer (`routeKeywordLayer`) remains the outage floor forever.
- **Fail-safe polarity:** every new knob floors to OFF (`resolveRouterPolicy`
  posture — outage can only disable, never enable).
- **Armor, not trust:** every LLM output crosses parse → Zod → closed-vocab
  filter → cap → floor before it may steer anything (semanticRouter.ts
  pattern, extended — never weakened).
- **Polarity law (metricVocab.ts):** detector vocabularies stay code-only.
  IR *taxonomy* is governed data; anything that silences a detector is not.
- **C1 LAW:** zero writes to `messages` from any routing/replay path.
- **Eval-gate unbypassable** for every governed row this roadmap introduces.
- **CI-green merge precondition (S37-2)** and **FULL ceremony profile** — every
  phase here touches `api/**`; no hotfix profile anywhere in this arc.

## 2 · Phase map

### IR-0 — Taxonomy & frame contract (design-only, no code)
The load-bearing phase. Everything else is mechanical if this is right.
- **Inputs:** the 12 CATEGORIES + 141-tool catalog (toolCategories.ts), the
  ARMES glossary + metricVocab, real operator utterances (Inspect corpus +
  router `proposals` ledger — RouterProposalsRepository already collects the
  keyword layer's blind spots for free).
- **Deliverables:**
  - `cwf-ir-taxonomy-design-v1.md` — action enum (est. 6–10: QUERY_STATUS,
    QUERY_METRIC, QUERY_DOWNTIME, QUERY_HISTORY, COMMAND, COMPARE, …),
    object enum (est. 8–12: LINE, ZONE, KILN/EQUIPMENT, ORDER, MATERIAL,
    EMPLOYEE, QUALITY_EVENT, …), slot shapes (entity_ref, metrics[], time),
    confidence contract (HIGH | AMBIGUOUS).
  - The `(action × object) → category` derivation table — proves backward
    compatibility on paper before any code: every derivable pair must land in
    an existing category so IR-1 can be observe-only.
  - Forward-vocabulary check: one page listing the actions SAP / IoT-Ignite
    would add (QUERY_MASTER_DATA, CREATE_ORDER, POST_CONFIRMATION,
    QUERY_DEVICE_CAPABILITY, …) — not implemented, only verified to FIT the
    enum shape, so Path B never forces a taxonomy rewrite.
- **Owner gate:** taxonomy ratification (a real decision — enum names are
  the product's permanent vocabulary).

### IR-1 — Frame extraction, dark (observe-only)
The SR1-W1 dark-launch pattern, replayed for the frame.
- Extend `RouterResponseSchema` (Zod) with an OPTIONAL `frame` block; extend
  the governed `router.prompt` template (new published version through the
  eval gate; ROUTER_PROMPT_FLOOR gains the frame instructions as the new code
  floor). Armor grows two closed-vocab filters: `action` and `object` outside
  the ratified enums are DROPPED and counted, exactly like out-of-catalog
  category names today.
- **Behavior change: none.** Categories continue to be selected exactly as
  today; the frame rides alongside as evidence — stamped on the OTel route
  span + telemetry, and surfaced in SET-CONTEXT stage 03 via the
  engine-tagged contract (`{ engine, artifact }`) so the inspector renders
  keyword and frame artifacts side by side without a breaking change.
- **Eval (freeze-safe):** live traffic becomes a free shadow corpus — every
  turn now records (utterance, frame). Deterministic tests pin armor
  behavior; no batch runs.
- **New governed knob:** `router.frameEnabled` (0/1, floor 0, stage 07,
  sessionTweakable:false — clone of ROUTER_ENABLED's posture).

### IR-2 — Deterministic resolvers (alias + time + clarification contract)
- **Alias resolution:** `entity_ref` → canonical zone/line/equipment id via a
  governed, tenant-scoped alias kind (DB-first, code floor = the existing
  `armes/zones.ts` data — the ROUTE-GOV-1 mirror/overlay pattern, reused not
  reinvented). Unresolvable ref → `resolution: 'unresolved'`, never a guess.
- **Time parsing:** extend `timeTools.ts` with the Turkish relative-expression
  parser ("dün gece", "bu vardiya", "geçen hafta") → deterministic ranges.
  Code-only (polarity law) — a governed row must never change what a date
  means.
- **Clarification contract (report-only in this phase):** frame
  `confidence: AMBIGUOUS` or unresolved alias produces a structured
  `clarification` artifact on the span/telemetry. The turn still proceeds on
  today's behavior — asking the user is IR-3's flip, not IR-2's.
- **Eval:** pure-function unit tests (parser + alias) — the cheapest, most
  durable tests in the repo.

### IR-3 — Frame-driven candidate set (the flip)
- `(action × object) → tools` resolution goes live behind `router.frameEnabled`
  as the PRIMARY candidate-set engine: frame resolves → derivation table →
  candidate tools ∪ ALWAYS_INCLUDE. Fall-through ladder, each rung armor-
  checked: frame → semantic categories (SR1) → keyword floor. The ladder is
  the availability guarantee; no rung is ever removed.
- Clarification goes ACTIVE for HIGH-ambiguity frames: the honest question
  ("Hangi fırın?") replaces the silent guess — the VIZ-BIND-1 principle
  (a guess on an ambiguous key must never look like an answer) applied to
  routing.
- Resolved slots (entity id, time range) enter the main turn's prompt context
  as pre-resolved facts — the tool-calling LLM stops re-deriving "dün gece"
  per call. (Forcing tool args is explicitly OUT of this phase — gateway.ts
  stays untouched.)
- **Flip evidence (freeze-respecting):** IR-1's shadow corpus gives frame
  distribution + enum-drop rates from live traffic at zero token cost; the
  07-vs-11 offered/called mismatch telemetry (SET-CONTEXT recommendation)
  gives the before/after wrong-tool signal. The router A/B lens run and
  expected-frame golden labelling are UNLOCK items on freeze lift — nice to
  have, not gating, because the ladder makes the flip non-destructive.
- **Owner gates:** consent to enable clarification questions in production
  (a UX behavior change) + the flip itself.

### IR-4 — Path B contract (deferred by design, one page now)
Not built until a federated backend (SAP / IoT-Ignite) is real. IR-0/IR-1
freeze the ONLY contract Path B needs: retrieval keyed on canonical frame
terms, mounted as a second resolution strategy beside the derivation table,
behind the same armor and floor. Deliverable in THIS arc: a one-page contract
note in the IR-0 design doc — nothing else. Anything more is speculative
build.

## 3 · Sequencing & effort (honest sizes)

| Phase | Size | Blocks on |
|---|---|---|
| IR-0 | design sessions (Architect + owner) | nothing — can start now |
| IR-1 | 1 AG phase (schema + prompt + armor + span) | IR-0 ratified |
| IR-2 | 1 AG phase + 1 Operator visit (alias kind migration) | IR-0 (parallel to IR-1 possible; S47-1 preconditions + pre-assigned reseal if run concurrently) |
| IR-3 | 1–2 AG phases + flip ceremony | IR-1 + IR-2 live |
| IR-4 | one page of prose | IR-0 |

## 4 · What this roadmap is NOT
- Not a rewrite: `filterToolsByMessage`, gateway.ts, the eval gate, and the
  keyword floor survive untouched in shape.
- Not a golden-run consumer: nothing here spends run tokens before the freeze
  lifts.
- Not a Path B build: retrieval infrastructure waits for a real federated
  backend.
- Not a replacement for SR1: the semantic router becomes the middle rung of
  the ladder, and its dark-launch/armor/floor pattern is the template every
  IR phase copies.

<!-- END · cwf-ir-architecture-roadmap-v1 · rev 1 · 2026-07-19 -->
