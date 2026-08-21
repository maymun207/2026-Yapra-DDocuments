# CWF — SR-1 Semantic Routing Design Note (stage 03/07 rebuild)
<!-- cwf-sr1-semantic-routing-design-v1 · rev 1 · 2026-07-16 · Architect-authored, S47.
     Converged owner picture (2026-07-16 session) + SOTA sweep part-1 verdict.
     Companion visual: cwf-sr1-signal-flow-v1.mermaid. Owner approval gates phasing. -->
<!-- PLATINUM compliance: catalog edits are data operations (publish a row — zero code/
     migration); proposals flow into the catalog through the gated accept path; the router
     dark-launches behind a governed param flip. No manual configuration anywhere. -->
<!-- GOLDEN FREEZE compliance: SR-1 touches NEITHER the chat prompt.segment kind NOR any
     golden-run machinery. The router prompt is a SEPARATE kind with standard (non-golden)
     eval-gate checks. Validation uses the REPLAY-A2 routing lens — ordinary replay. -->

## 1 · Why (evidence file)
Stage-03 SOTA verdict: keyword routing structurally weak for natural language (sweep
part-1). Live proof pile: F123 (stopword pollution → 62-tool offers), F124 ('alarms'
plural missed `alarm` keyword — cross-language morphology), F125 (non-stopword learned
junk: `[factory]` matched by a junk mapping), F126 (starved model refuses with scope
voice). Owner demo: flash-lite + the 12-category catalog correctly mapped the same
sentence to `andon` in one shot. Conclusion (converged): matching is a MEANING problem —
spend a cheap LLM on meaning; keep decisions and the catalog in governance.

## 2 · Architecture (committed single path)

### 2.1 The catalog stays the governed spine (already exists)
`armes.tool_category` kind = category name + keywords + tool set, DB-first with code
floor, admin-editable. Owner adds a keyword/category = publish a row through the
eval-gate; it enters the router prompt automatically on the next turn (DB-read catalog).
v1 addition: an optional one-line `description` per category (payload field; floor
backfilled) — the router reads name+keywords+description, NEVER tool names (prompt stays
small; the TD-13 crowding lesson is not re-violated).

### 2.2 Semantic router (new, cheap, replaceable)
Placement: the existing pre-stage-7 `resolveToolCategories()` seam — it already loads the
catalog; SR-1 inserts the router between catalog-load and candidate-set assembly.
- **Model:** gemini-flash-lite via the provider registry (owner decision).
- **Input:** catalog (12 lines: name · keywords · description) + the current user message
  (v1: current message only; history widening is a later, measured decision — context-rot
  lesson).
- **Output (strict JSON, two channels):**
  `{ "matched": ["cat", …], "proposals": [{ "keyword": "...", "category": "cat|null" }] }`
- **Deterministic armor at the boundary (the trust line):** JSON parse → Zod schema →
  `matched ⊆ catalog names` (anything else REJECTED) → dedupe → hard cap
  `router.maxCategories` (compound-pollution lesson). Any failure, timeout, or garbage →
  FLOOR, loud.

### 2.3 Floor law (empty≠zero, unchanged doctrine)
Today's keyword+learned path is NOT deleted — it becomes the deterministic floor:
router disabled / timeout / invalid output / provider down → the current path serves,
byte-identical to today. The user never sees a router failure. The stopword guard and
learned map live inside the floor. Learned-map RETIREMENT is a separate, later decision
(own register line) taken only after the routing lens proves SR-1 on specimens.

### 2.4 Proposals → governed learning loop (the owner's picture, closed)
The `proposals` channel NEVER affects the live turn. Proposals land as DRAFT rows
(L4 routing-drafts pattern; reuse/extend the existing drafts surface — verify the L4
schema fits at phase authoring, S46-3; else one small table). Dedupe by keyword:
repeat sighting = counter++ + last-seen query, never a new row (no draft flood). Each
draft carries its evidence: triggering query, first/last seen, count.
Admin panel (Araç Eşleme tab): proposals list → owner ACCEPT binds the keyword to a
category/tool set (S41-2 enforced: a keyword without reachable tools cannot be accepted)
→ publish rides the standard eval-gate → catalog row → next turn's router prompt.
**This replaces silent junk-learning with visible proposing + gated learning** — the
first real governed instance of the F83 self-learning arc.

### 2.5 Governance rows (all data, no code constants)
- `router.enabled` (bool, floor **false** — DARK LAUNCH; enabling is a param publish).
- `router.timeoutMs` (floor 1500, min 300, max 5000).
- `router.maxCategories` (floor 4, min 1, max 8).
- Router prompt: NEW kind (e.g. `system.router_prompt`), born code-ref + DB-versioned,
  standard eval-gate (schema/referential/behavioral) — explicitly OUTSIDE the golden gate
  (that gate protects the chat-generation surface; routing is a different surface).
  Decl-derived seeds ⇒ SELF-SEED publishes floors automatically.

### 2.6 Observability & cost
`[Route]` line every turn: `path=semantic|floor · latency_ms · matched=[…] ·
proposals=N · reject_reason?` — Architect-readable in Vercel logs. Span attrs
`cwf.route.path`, `cwf.route.latency_ms`, `cwf.route.matched_count`.
Cost: ~500–800 tokens in / ~50 out per turn on flash-lite (pennies); latency budget
200–400ms typical, 1500ms hard timeout — paid out of MCP-WARM-1's 3.92s win, net gain.

### 2.7 Trust boundary (ADR-001 intact)
The router selects RELEVANCE only. Scope authority, backend-aware filtering, grounding,
empty≠zero, eval-gate — all deterministic layers downstream remain byte-identical. The
F43 SOTA verdict (deterministic trust as layer-1) is not weakened: no LLM judges truth;
one LLM narrows attention, inside deterministic rails, with a deterministic floor.

## 3 · Acceptance = the routing lens, not vibes
REPLAY-A2 routing lens A/B on real specimens: floor-path vs router-path category sets,
per specimen, Wilson-CI framing where counts allow. Ordinary replay — no golden run,
no frozen surface. Enable decision (`router.enabled` publish) is taken on lens evidence.

## 4 · Phasing (each gated; FULL profile — turn path)
- **SR1-W1 · Router core (code-only, no migration):** router call + Zod armor + floor +
  dark-launch params + `[Route]`/spans + catalog `description` field + tests (armor
  matrix: invalid JSON / out-of-catalog / over-cap / timeout / disabled → floor;
  byte-identical floor proof).
- **SR1-W2 · Proposals loop:** drafts landing (L4 reuse verdict at authoring) + panel
  list + accept-binds-tools flow + gated publish + dedupe/evidence tests.
- **SR1-W3 · Lens A/B + enable:** routing-lens run on specimens → owner reviews → enable
  publish → observation window → learned-map retirement DECISION (not execution).
F124/F125/F126 close into this design (terminal markers at W3 with lens evidence).

## 5 · Decisions for the owner (only these)
1. Catalog `description` line per category: Architect drafts all 12 in W1, owner reviews
   in-panel afterwards — approve this order? (Alternative: owner writes them first.)
2. Proposals visibility: panel-only (committed default) or also a daily log summary line?

<!-- END · cwf-sr1-semantic-routing-design-v1 · rev 1 · 2026-07-16 -->
