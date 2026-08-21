# CWF — OBS-LEGIBILITY-1 Design Note · v1

<!-- cwf-obs-legibility-1-design-v1 · rev 1 · 2026-07-15 · Architect-authored.
     Register v46 §3.2 ("çok kritik"). North star: "find my last A3 in 5 seconds."
     Evidence anecdote: owner opened Langfuse trace 0cfc7efd (the OLD noon TRUNCATED
     incident) believing it was that evening's A3; root cwf.turn Input/Output showed
     `undefined`. The data existed — the Architect located both A3 turns only by
     token counts. Legibility, not instrumentation, is the gap. -->

**PLATINUM statement:** every deliverable below is automatic at runtime (write-time
enrichment, span stamping, client-side grouping). No manual step is created; the
parity table is TEST-enforced, not hand-maintained.

---

## 1 · Diagnosis (code-verified at `ed414a5`)

Three independent legibility failures compounded into the wrong-trace incident:

**D1 — Inspect is an event list, not a turn list.** `InspectTab.tsx` renders flat
`telemetry_events` rows (sortable/filterable). A single turn scatters across many
rows; "my last A3" has no single thing to click. The grouping key ALREADY exists on
every row — `session_id` = the RULE-28 turn id — it is simply never used to group.

**D2 — the turn has no human-readable face.** No plane carries the user's question
in findable form. The ledger is write-time-redacted governance data (ADR-004) with
no query snippet; the trace root span sets only `TRACE_SESSION_ID` (= conversationId)
and `TRACE_USER_ID` (chat.ts:143) — **no input, no output**. So both Inspect and
Langfuse present a turn as anonymous hashes + timestamps, and the only way to tell
two A3 runs apart is token arithmetic. `scrubIoData` (redaction.ts:183) exists,
scrubbed tool I/O already rides MCP spans (F-obs3), and ADR-004 explicitly PERMITS
full scrubbed I/O on the trace plane — the root span just never got the treatment.

**D3 — stage↔span coverage is asserted one-way only.** `stagesRegistry.test.ts`
(C-9d) pins that every `spans[]` NAME is real, but nothing asserts the converse:
that every real span is claimed by exactly one stage or documented as cross-stage.
An unclaimed span is invisible in the Stages pedagogy and unexplainable in a trace.

## 2 · Committed design (single path)

### 2.1 · `query_head` — the turn's face (server, ledger)
The turn-scoped telemetry event gains one payload field:
`query_head = scrubIoData(userMessage).slice(0, 120)` — stamped WRITE-TIME through
the existing redaction pipeline (ADR-004-compatible: capped, scrubbed, same
write-time-redaction law as every ledger field). Carrier: the stage-3 `message`
event (it already exists per turn; no new event type, no schema change —
`payload` is jsonb). C1 untouched: zero `messages`-table involvement; no reads of
other users' `messages` from the admin client (RLS surface stays closed).

### 2.2 · Root-span scrubbed I/O (server, trace)
- **Input** at root-span open (chat.ts:143): scrubbed user message + `historyN`.
- **Output** after the stream stage completes, BEFORE the flush span (RULE 27
  sequencing untouched): scrubbed final assistant text, capped (same cap class as
  the MCP-span I/O from F-obs3). Attribute keys = the Langfuse observation
  input/output conventions already enumerated in `observability/config.ts`
  (`LangfuseOtelSpanAttributes`); if the input/output keys are not yet among them,
  they are ADDED there — never inline strings (RULE 1).
- Empty/aborted turns stamp an explicit marker (e.g. the OBS-2 honest message),
  never `undefined` — empty≠zero extends to the trace face.

### 2.3 · Inspect turn-centric grouping (client)
Default Inspect view becomes **turn cards, newest first**, grouped client-side by
`session_id` (zero new endpoints — same rows, regrouped):
- **Card header:** `query_head` (falls back to `—` for pre-phase rows) · local time
  · model · Σ tokens · verdict badges derived from member events (e.g.
  `grounding_violation` → the F38 shield-style "caught" badge wording, TRUNCATED
  marker, quota-degraded).
- **Card body (expand):** the member events in ts order, each prefixed with its
  stage label from a small deterministic `eventType → stage no` map (test-pinned,
  same discipline as C-9d). Unknown types render under an honest "unmapped" label —
  never guessed into a stage.
- **Per-card actions:** the existing Langfuse deep-link (unchanged host/project
  logic, InspectTab.tsx:71) + "copy turn id".
- The existing flat list survives as a secondary "Olaylar / Events" toggle — the
  seven locked SOTA list columns are not deleted, they are demoted.
- Text filter now hits `query_head` first ⇒ typing "A3" (or any words from the
  question) surfaces the turn card directly. **Acceptance = the north star:
  last A3 found in ≤5s from a cold Inspect open.**

### 2.4 · Stage↔span parity (both directions, enforced)
`stagesRegistry` gains a `CROSS_STAGE_SPANS` documented list (spans that belong to
no single stage: `cwf.turn` root, `cwf.flush`, `cwf.stage.stream`'s per-attempt
children, `cwf.warm.*` if shared). New test tooth: **(real span inventory from
`observability/config.ts` ∪ `TURN_STAGES`) minus (∪ stage `spans[]` ∪
`CROSS_STAGE_SPANS`) must be ∅** — and the two BY-DESIGN holes are asserted
positively: stage 00 has `spans:[]` (pre-span, quota gate runs before the root
span opens — code-verified at chat.ts) and stages 13–14 are client-side
unspannable (registry carries that wording). A future span added without a home
fails CI, not a walkthrough.

## 3 · What this deliberately does NOT do
- No Langfuse-side configuration/dashboards (self-hosted v3.205 has no per-span
  filter URLs — F10 finding stands; deep-link stays trace-level).
- No new telemetry event types, no migrations, no Operator visit.
- No cross-user message browsing in Inspect (privacy surface unchanged).
- No re-litigation of ADR-004: ledger stays minimal+redacted; richness lives in
  the trace plane; `query_head` is a capped scrubbed finding-aid, not I/O storage.

## 4 · Phase shape
ONE AG phase (**OBS-LEGIBILITY-1**), FULL profile (`api/**` touch): §2.1 + §2.2
server, §2.3 client, §2.4 registry+test. Evidence gates (literal): a fresh prod
turn shows Input/Output populated in the Langfuse UI root span; an Inspect cold
open shows the turn card of that same turn with its `query_head`; parity test
red-then-green demo by temporarily removing one claimed span name. Merge gate =
unsharded CI green (S43-2).

<!-- END · cwf-obs-legibility-1-design-v1 · rev 1 · 2026-07-15 -->
