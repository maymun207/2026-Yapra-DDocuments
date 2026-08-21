# OBS-TRACE-3 — StagesDashboard In-Panel Trace Reflection · Design Note v1
<!-- cwf-obs-trace-3-stages-inpanel-design-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Program: OBS-TRACE (3 of 3, final). Design note only — the gated phase prompt
     is authored AFTER OBS-TRACE-1 AND OBS-TRACE-2 merge (it surfaces the span
     data THEY produce). Verified against origin/master = dca514c (rev 121).
     Companions: claude-code-PHASE-OBS-TRACE-1-v1, cwf-obs-trace-2-db-read-spans-design-v1,
     cwf-grand-sequence-flow-v1_2.html.
     Governs under the FULL-TRACE MANDATE (OBS-TRACE-1 §0): every stage / read /
     tool I/O must be visible in Langfuse AND the StagesDashboard. Phases 1-2 put
     the data ON the spans (Langfuse side). Phase 3 brings it INTO our own panel —
     so the owner sees "which button → which lamp" without leaving the product. -->

## 1 · PROBLEM (tree-proven on dca514c)
The owner's mandate is explicit: *everything visible in Langfuse AND in our
StagesDashboard.* Today the panel only POINTS at Langfuse:
- `InspectTab.traceUrl()` builds `${host}/project/${projectId}/traces/${turnId}`
  (turn-level deep-link) — verified at InspectTab.tsx:144.
- `StagesTab.SpanChip` (StagesTab.tsx:134) COPIES a span NAME and opens the
  Langfuse host or the latest turn's trace (STAGES-FIX-4 F-S01-b) — self-hosted
  Langfuse v3.205 has no stable per-span filter URL, so the chip is a
  "paste-this-name-into-Langfuse-search" gesture, not in-panel data.
- The panel can read `telemetry_events` rows (gated `/telemetry`,
  adminService.ts:1192) but has **no way to read the SPAN/trace tree** — that
  lives in OTel→Langfuse and never comes back to the panel.

So after OBS-TRACE-1/2, the rich per-stage I/O + routing chain + 144 db-read
spans exist — but ONLY in Langfuse. The StagesDashboard still shows static
registry text + a name-copy chip. Phase 3 closes that: the panel renders the
REAL last-turn span I/O inline, per stage.

## 2 · THE CENTRAL DECISION — where does the panel READ span data from?
Two candidate data paths were weighed:

**(A) Query the Langfuse API from our backend and proxy it to the panel.**
Rejected as the PRIMARY path: couples the product to Langfuse's query API +
auth, adds a network hop + a new external dependency to the hot admin path, and
Langfuse ingestion is async (a just-finished turn may not be queryable yet —
the panel would show gaps that aren't real). Keep as a possible future "deep
dive" link, not the in-panel source.

**(B) Persist a compact per-turn TRACE DIGEST to our own DB, read it via a
gated admin endpoint — CHOSEN.** At flush time (chat.ts already force-flushes),
in addition to shipping spans to Langfuse, write a single compact
`turn_trace_digest` row: the ordered list of stages that ran, each with its
scrubbed input/output summary + the db-reads it caused (table, op, rowCount) +
the routing chain (keywords → matched/dropped categories → offered tools). This
is OUR data, in OUR DB, readable instantly by the panel via a gated endpoint —
no Langfuse-API coupling, no async-ingestion gap, same scrub boundary already
built in phases 1-2. Langfuse stays the deep, full-fidelity causal tree; the
digest is the panel's fast, self-owned mirror (the deterministic-vs-rich,
authoritative-mirror pattern again).

**Critical honesty note:** the digest is a MIRROR, not a second source of truth.
It is built from the SAME scrubbed span I/O the spans carry (reuse OBS-TRACE-1's
`setSpanIO` payloads — capture them into the digest at the same call site, do
NOT recompute). Langfuse and the digest must never disagree; a test asserts the
digest's stage list == the spans emitted.

## 3 · SCHEMA — `turn_trace_digest` (one row per turn, compact)
- `turn_id` (PK, = the trace id / session_id), `conversation_id`, `user_id`
  (NULL-with-attribution for machine turns per S33-1), `created_at`.
- `stages jsonb`: ordered array of `{ stage, ok, ms, input: <scrubbed>, output:
  <scrubbed>, dbReads: [{ table, op, rowCount, ms }], … }`. The routing chain
  lives inside the register-tools stage entry's `output`.
- `token_summary jsonb` (input/output/total — already on the flush span).
- **Empty≠zero:** `rowCount: 0` is a real datum; a MISSING dbReads array = the
  stage did no reads; `null` anywhere = not-measured, never rendered as 0.
- **Retention:** this is DEBUG data, not the durable governance ledger — bounded
  retention (e.g. a rolling window / TTL), separate from `telemetry_events`
  (which stays the permanent redacted ledger). A cleanup policy is part of the
  phase (do not let it grow unbounded — matches the OTel "retention-bounded"
  posture).
- **Secret boundary:** the digest inherits OBS-TRACE-2's secret-table deny-list —
  a secrets-table read contributes `{ table, op, rowCount }` but NO sampleHead.
  Tested, same rigor as `verifyGrants`.

## 4 · IN-PANEL UI — what the owner SEES
Two surfaces, both feeding from the digest endpoint:

**4a · StagesDashboard (StagesTab) — per-stage live I/O.**
Each StageCard gains a "son turn / last turn" expandable that shows THAT stage's
real digest entry: input summary → output summary, and for read-bearing stages,
the db-reads table (table · op · rowCount, with `0` shown honestly, missing =
"okuma yok / no reads"). The register-tools card shows the full routing chain
inline: `query → [keywords] → matched [names] · dropped [names] → offered [N
tools]` — the exact chain from cwf-grand-sequence-flow. The existing SpanChip
stays as the "open the full tree in Langfuse" escape hatch (now complementary,
not the only affordance). Honest tri-state: digest present → data; digest absent
(no recent turn / observability off) → "henüz turn yok" / "gözlem kapalı", never
fabricated values.

**4b · InspectTab — turn → full stage breakdown.**
Inspect already lists turns and deep-links to the Langfuse trace. Add: clicking a
turn expands its digest INLINE — the ordered stage list with per-stage I/O + db
reads — so you can read the whole "button → lamp" chain in-panel, then click
through to Langfuse only when you want the full-fidelity tree. This is the
in-panel version of the grand-sequence-flow table, driven by real data.

## 5 · THE HIDDEN TRAPS (name them before building)
1. **Digest write must not bloat the flush or leak secrets.** It reuses the
   ALREADY-scrubbed span I/O (phases 1-2) — it must NOT re-serialize raw objects.
   Capture the scrubbed payloads by reference at `setSpanIO` time into a
   per-turn accumulator on `ctx`, then write once at flush. One extra DB write
   per turn (bounded), scrubbed by construction.
2. **Digest vs telemetry_events confusion.** These are DIFFERENT: `telemetry_events`
   = permanent redacted governance/safety LEDGER (counts, events); `turn_trace_digest`
   = bounded-retention DEBUG mirror (rich per-stage I/O). Different tables,
   consumers, retention, secret posture. The phase's ADR note states this split
   explicitly (extends the OBS-TRACE-3 ADR / ADR-004 lineage).
3. **The digest is a mirror, never authority.** No governance decision, grounding
   check, or gate ever reads the digest — it is display-only. A test/lint that
   nothing in the trust/gate/grounding path imports the digest repository
   (same spirit as C1 LAW: replay/governance paths never write `messages`).
4. **Reflection must degrade.** Observability off / Langfuse unconfigured →
   digest may still be written (it's our DB, not Langfuse) OR gated on the same
   flag — decide at authoring; either way the panel shows an honest "off" state,
   never a crash or a fabricated zero.

## 6 · SCOPE — the mandate's final mile (no narrowing)
Phases 1-2 made ALL stage/read/tool I/O exist on spans. Phase 3 surfaces it
in-panel via the digest — for ALL stages and ALL reads the digest carries (which
is all of them, by construction from phases 1-2). No stage is left with only a
name-copy chip. The StagesDashboard becomes a real-data instrument: every card
shows what actually flowed through that stage on the last turn.

## 7 · DEPENDENCIES & SEQUENCING
- **Hard dependency on OBS-TRACE-1 (span I/O + routing chain) AND OBS-TRACE-2
  (db-read spans)** — phase 3 mirrors THEIR scrubbed payloads into the digest.
  Author this phase prompt only after BOTH merge; anchor to that master.
- Full chain: F149 (master red) → OBS-TRACE-1 → OBS-TRACE-2 → **OBS-TRACE-3**.
- **FULL profile + Operator:** this phase adds a MIGRATION (`turn_trace_digest`
  table + RLS: service-role write, gated admin read, all-grantees revoke per
  FIX-2) → Operator lane (Gemini, `supabase db push`, FENCE-first, project
  `fjbrkimwvtpwoxhziidh`), `verifyGrants` probe row + CI coverage test (standing
  security rule), retention/cleanup policy. NON-negotiable full read of the
  migration + the secret-deny-list test.
- Zero golden/prompt surface. Admin UI additions → `adminLegibility.test.ts`
  auto-gens 2 tests per new/changed `.tsx` (budget it).
- PLATINUM: self-configuring — the digest writes itself every turn; the panel
  reads it automatically; no manual step. Admin-panel UI rule satisfied (viewing
  governed observability data through a gated panel affordance).

## 8 · OPEN QUESTIONS FOR THE PHASE PROMPT (decide at authoring)
1. **Digest write gating vs Langfuse flag.** Should the digest write even when
   Langfuse is unconfigured (it's our own DB, useful standalone) or share the
   observability flag? Leaning: write regardless (decouples panel visibility
   from Langfuse being up), but confirm the perf/secret posture holds.
2. **Retention window.** Rolling N days vs N turns per user vs global cap — pick
   a concrete, cheap policy; the digest is debug data, small windows are fine.
3. **Digest size cap.** A pathological turn (many tool rounds, many reads) could
   produce a large `stages` blob — cap the array / per-entry sizes (reuse the
   MCP result cap discipline), and record a truncation marker honestly rather
   than silently dropping.

<!-- END · cwf-obs-trace-3-stages-inpanel-design-v1 · rev 1 · 2026-07-20 -->
