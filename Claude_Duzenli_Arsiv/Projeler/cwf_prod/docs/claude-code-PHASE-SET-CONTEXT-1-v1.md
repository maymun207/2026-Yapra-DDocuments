# PHASE · SET-CONTEXT-1 (SC-1) — the oscilloscope: per-stage turn inspector, first ship

<!-- claude-code-PHASE-SET-CONTEXT-1-v1 · rev 1 · 2026-07-19 · Architect-authored, owner-approved.
     Relay to AG (Author lane) verbatim. Design: cwf-set-context-design-v1_2 (owner-ratified).
     Includes the NAV-SINGLE-1 addendum (rides this phase per the hygiene merge report). -->

**PLATINUM compliance:** one click ("Set Context") produces the whole snapshot; ephemeral
(client state, no new store); reuses Inspect picker, replay lens logic, redaction boundary,
Replay for lab re-runs. No manual assembly anywhere.

**PRECONDITION (S47-1):** valid ONLY while `origin/master == 186277c` (Merge
ROUTE-HYGIENE-1). On mismatch: STOP and report `git rev-parse origin/master`.

**Strategic frame (from the design, owner-supplied):** this is the ROUTING-ARCH
migration's eval infrastructure. SC-1 ships → real traffic measured → the 07-vs-11
mismatch RATE + collected failing turns seed the golden set → the IR taxonomy is built on
evidence. Build accordingly: the mismatch signal is not a nice-to-have — it is the point.

## 0 · The one sentence
Pick a real turn → **Set Context** → every Stages card shows THAT turn's real artifact at
that stage. Faithful reconstruction default (~zero tokens); Lab Re-run = a deep-link into
the existing Replay panel (NO new engine).

## 1 · G1 — the snapshot endpoint
`POST /api/admin/stage-context` `{ turnRef: { messageId } }` →
`{ meta, stages: { '00'…'14': StageSnapshot | { thin: reason } } }`.
- **Cap:** the SAME cap Inspect's telemetry read uses (verify in code; it is a
  microscope surface, NOT own-user-scoped).
- **Sources:** the `messages` row (+ raw_tool_results incl. callId/args, trace_id) ·
  `telemetry_events` (llm_call tokens, config_fingerprint) · governed DB (segments via
  `rule_versions` history, params, knowledge) · pure engines (routeKeywordLayer,
  buildSystemPrompt/compose, the A1 grounding + A3 scope lens logic).
- **C1/C9:** read+compute ONLY — zero writes from this endpoint. Prompt SEGMENTS are
  free to return verbatim; the knowledge-injected portion and tool-result content pass
  through the EXISTING specimenDetail redaction boundary. Never full raw I/O.
- SC-1 computes ONLY these stage payloads (the rest return `{thin:'sc2'}` honestly):
  - **'01' query** — the user message (Inspect's existing posture). [recorded]
  - **'07' tool-set** — candidate set REBUILT via resolveToolCategories + routeKeywordLayer
    on the recorded message with the CURRENT map + ALWAYS_INCLUDE + the turn's scope;
    payload is ENGINE-TAGGED (ADD-3): `{ engine:'keyword', artifact:{ matchedKeywords,
    categories, offeredToolNames } }` + an always-on badge "map evolves — today's routing
    of that message". [rebuilt]
  - **'09' prompt** — the assembled prompt REBUILT at the turn's prompt_rev: resolve the
    segment VERSIONS of that rev from rule_versions history → byte-faithful compose; if
    any version is unresolvable, compose with current + divergence badge ("N publishes
    since this turn"). Segments verbatim (C9-free); knowledge portion redacted. [rebuilt]
  - **'10' answer** — the recorded assistant text + model/tokens/finishReason from the
    turn's telemetry llm_call row (null tokens rendered honestly as "not captured").
    [recorded]
  - **'11' tool loop** — per-call {callId, tool, args(redacted), resultSummary,
    empty≠zero flag} from raw_tool_results + the CONTAINMENT VERDICT: called ⊆ offered
    (07's rebuilt set) → ✓, else the named mismatch. [recorded]

## 2 · G2 — ADD-1: live mismatch telemetry (the counter)
In the LIVE pipeline (not the inspector): at the tool-execution point (stage 11), each
executed call is checked for membership in the turn's OFFERED set (in-process from stage
7's registration). On mismatch, emit ONE `telemetry_events` row, type `routing_mismatch`,
payload `{ tool, offeredCount, engine:'keyword' }` — no message text, fire-and-forget
(never awaited on the turn path; the SR1-W2 proposals-emit pattern). This is the
migration statistic: "% of turns with a call outside the offered set."

## 3 · G3 — ADD-2: routing_map_hash into config_fingerprint
At stage 7 (where the map is resolved), compute a deterministic hash over the resolved
learned-map content + epoch and stamp `routing_map_hash` into the turn's
config_fingerprint beside prompt_rev/params_hash/knowledge_hash (additive jsonb key — no
migration). Past turns simply lack it (UI: absent → the evolves-badge; present → exact).

## 4 · G4 — UI (Stages dashboard)
- Top strip: **[Set Context]** → the Inspect-style Sessions→Turns picker (REUSE the
  existing Inspect grouping/list — do not build a second list) → on pick, ONE endpoint
  call, snapshot held in client state (ephemeral; cleared on [clear] or tab close).
- Active-context banner: "Context: turn <id8> · <time> · <user>" + [clear] +
  **[Lab Re-run ↗]** deep-linking into the Replay panel with that turn preselected
  (specimen-first flow; if the turn is not a replayable specimen, the link explains why
  — honest, not hidden).
- Cards 01/07/09/10/11 gain a context section when a snapshot is active, each stamped
  **[recorded]** or **[rebuilt]** (+ divergence badge where applicable). All other cards
  show one honest line: "bu aşamanın anlık görüntüsü SC-2'de" (empty≠zero — never a
  fabricated example).
- 07 and 11 sections render the containment verdict prominently (the "doğru tuğla?"
  face). F42: the context survives stage→panel deep-links (NavContext carries the
  active turnRef).

## 5 · G5 — NAV-SINGLE-1 addendum (separate commit in this PR)
- AdminPanel sidebar: remove the 'kinds' entry; keep ONE governance entry labelled
  **"Kurallar / Rules"** (owner-decided).
- `?tab=kinds` STAYS routable (alias → GovernanceTab, opens collapsed) — no deep-link
  breaks. Cap: gate the single entry on the OR of the two prior entries' cap sets (a
  role that could view Kinds but not Rules must not lose access).
- Tests: exactly ONE governance sidebar entry; `?tab=kinds` still renders GovernanceTab;
  role-matrix OR-cap.

## 6 · G6 — tests
- Endpoint: C1 (zero writes — spy on repositories), redaction (no raw knowledge/tool
  content in 09/11 payloads), 09 byte-faithful when versions resolvable + divergence
  badge when not, 07 engine-tagged shape, 11 containment verdict both ways.
- ADD-1: a call outside the offered set emits exactly one routing_mismatch event;
  inside → none; emission is fire-and-forget (turn path never awaits it).
- ADD-2: fingerprint carries routing_map_hash; hash stable for identical map, changes
  on map change.
- UI: picker → snapshot → cards populate; thin cards honest; clear works.

## 7 · Ceremony (FULL)
`api/**` + `src/**` (+ possibly `shared/`) touched → reseal (docVersion bump, "below
diagram altitude", `npm run reseal`, `CI=1 npm run check:doc-drift` green). NO migration
expected (routing_mismatch = a telemetry type string; routing_map_hash = additive jsonb
key — if you find a migration IS needed, STOP and report before authoring it). Unsharded
CI on the PR head is the sole arbiter (S37-2). Push → CI → Architect FAST-GATE → merge
`--no-ff` on GREEN CI → report remote HEAD. Gated sub-phases G1→G6, single PR.

## 8 · What this is NOT
- Not SC-2 (remaining stages/badge polish — next).
- Not a second replay engine (Lab = existing Replay).
- Not the ROUTING-ARCH decision — its measuring instrument.

<!-- END · claude-code-PHASE-SET-CONTEXT-1-v1 · rev 1 · 2026-07-19 -->
