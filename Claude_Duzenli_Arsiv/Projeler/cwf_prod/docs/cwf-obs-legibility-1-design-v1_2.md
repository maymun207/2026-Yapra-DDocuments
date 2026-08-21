# CWF — OBS-LEGIBILITY-1 Design Note · v1_2

<!-- cwf-obs-legibility-1-design-v1_2 · rev 1.2 · 2026-07-15 · Supersedes v1
     (S37-1: presented artifacts are immutable; amendments mint a new version).
     Δ vs v1: owner review added (a) a conversation/session tier above turn cards,
     (b) a true date-range picker, (c) explicit keyword search, (d) §2.5
     stage-numbered span names so the Langfuse waterfall self-labels, (e) §2.6
     Langfuse Sessions-view alignment (docs verified 2026-07-15), (f) §5 watch item
     LANGFUSE-V4-UPGRADE. §1 diagnosis and §2.1–2.2 carry from v1 unchanged in
     substance. North star unchanged: "find my last A3 in 5 seconds." -->

**PLATINUM statement:** everything below is automatic at runtime (write-time
enrichment, span stamping, client-side grouping). No manual step is created; the
parity mapping is TEST-enforced, not hand-maintained.

---

## 1 · Diagnosis (code-verified at `ed414a5` — carried from v1)

**D1 — Inspect is a flat event list, not a session/turn view.** `InspectTab.tsx`
renders raw `telemetry_events` rows with only RELATIVE time windows ("last X").
No date range, no session tier, no turn tier. The turn grouping key already sits
on every row (`session_id` = RULE-28 turn id); the conversation key does not yet
ride the ledger.

**D2 — the turn has no human-readable face.** The trace root span (chat.ts:143)
sets only `TRACE_SESSION_ID` (= conversationId) + `TRACE_USER_ID` — no input, no
output → Langfuse shows `undefined`; the ledger carries no query snippet. Both
planes present a turn as hashes + timestamps. `scrubIoData` (redaction.ts:183)
exists and is unused on the root; ADR-004 explicitly permits full scrubbed I/O on
the trace plane.

**D3 — stage↔span coverage is asserted one-way.** C-9d pins that every registry
`spans[]` name is real; nothing asserts every real span is claimed by a stage or
documented cross-stage.

## 2 · Committed design (single path)

### 2.1 · Turn-face enrichment (server, ledger) — v1 §2.1 + conversation key
The stage-3 `message` telemetry event's jsonb payload gains TWO fields, both
stamped write-time through the existing redaction pipeline (no schema change, no
migration, no Operator visit):
- `query_head` = `scrubIoData(userMessage)` capped at 120 chars — the turn's face.
- `conversation_id` = `ctx.resolvedConversationId` — the session tier's grouping
  key. (Pre-flight will confirm whether any event already carries it; if so, reuse
  — never mint a second key for the same identity, RULE-28 spirit.)
C1 untouched: zero `messages`-table involvement; no cross-user `messages` reads
from the admin client.

### 2.2 · Root-span scrubbed I/O (server, trace) — unchanged from v1
- **Input** at root-span open: scrubbed user message + `historyN`.
- **Output** after the stream stage, BEFORE the flush span (RULE 27 sequencing
  untouched): scrubbed final assistant text, capped (same cap class as F-obs3
  MCP-span I/O). Keys live in `LangfuseOtelSpanAttributes`
  (observability/config.ts) — added there if missing, never inline (RULE 1).
- Empty/aborted turns stamp the OBS-2 honest message — never `undefined`
  (empty≠zero extends to the trace face).

### 2.3 · Inspect: Sessions → Turns → Events (client)
Three-tier view, newest first, zero new endpoints (same rows, regrouped + the
date-range param):
- **Time scope:** the existing relative windows PLUS a true from–to date-range
  picker (feeds the existing `from` filter + a `to` bound).
- **Tier 1 — Sessions:** group by `conversation_id`: first turn's `query_head` ·
  start time · turn count · Σ tokens. Click → expand.
- **Tier 2 — Turn cards:** per `session_id` (turn id): `query_head` · local time ·
  model · Σ tokens · verdict badges (grounding-catch in F38 shield wording,
  TRUNCATED, quota-degraded). Actions: existing Langfuse trace deep-link + "copy
  turn id" + the session's Langfuse Sessions-view link (§2.6).
- **Tier 3 — Events:** the member rows in ts order, stage-labelled via a small
  deterministic `eventType → stage no` map (test-pinned, C-9d discipline);
  unknown types render under an honest "unmapped" label — never guessed.
- **Keyword search:** one search box filtering across `query_head` + type + model
  + tool_name + payload text (the existing needle logic, now query_head-first).
  Typing "A3" (or any words of the question) surfaces the turn card directly.
- Rows predating this phase have no `query_head`/`conversation_id` → they group
  under an honest "eski kayıt / pre-legibility" bucket, never fabricated faces.
- The existing flat list survives as a secondary "Olaylar / Events" toggle.
- **Acceptance = the north star: last A3 found in ≤5s from a cold Inspect open.**

### 2.4 · Stage↔span parity (both directions, enforced) — unchanged from v1
`CROSS_STAGE_SPANS` documented list (root `cwf.turn`, flush, stream's per-attempt
children, shared warm spans) + the new test tooth: (real span inventory from
config ∪ TURN_STAGES) − (∪ stage `spans[]` ∪ CROSS_STAGE_SPANS) = ∅. The two
BY-DESIGN holes asserted positively: stage 00 `spans:[]` (quota gate runs before
the root span opens — code-verified) · stages 13–14 client-side unspannable.

### 2.5 · Stage-numbered span names (NEW — the waterfall self-labels)
The Langfuse tree shows span NAMES; the 0–14 correspondence therefore lives in
our code, not in Langfuse config. Rename stage spans to carry their stage number:
`cwf.stage.<NN>.<name>` (e.g. `cwf.stage.03.resolve-provider`,
`cwf.stage.10.stream`) — numbers from the stagesRegistry mapping, names unchanged
after the prefix. Same-phase mechanical updates: `TURN_STAGES`/config constants,
registry `spans[]`, C-9d pins, the §2.4 parity list, and the Inspect stage-label
map (ONE mapping module feeds all — no duplicated tables). Accepted cost: traces
recorded before this phase keep old names (history discontinuity, documented in
the CHANGELOG entry); no Langfuse-side migration exists or is needed.

### 2.6 · Langfuse Sessions view = the conversation replay (NEW, zero code beyond §2.2)
Docs verified 2026-07-15: traces sharing a sessionId are grouped into a session
with a replay-style view — and our root span ALREADY stamps
`TRACE_SESSION_ID = conversationId`, so every CWF conversation IS a Langfuse
session with one trace per turn. It has been illegible only because trace
Input/Output were `undefined` — §2.2 lights it up with no further work. The
Inspect session tier links straight to it. This gives the owner BOTH homes for
the same mental model: Inspect (governance ledger, Turkish, badges) and Langfuse
(deep causal span tree), one identity chain across both (RULE 28).

## 3 · What this deliberately does NOT do
- No Langfuse server-side configuration or upgrade dependency — this phase is
  complete on self-hosted v3.205 (see §5 for the v4 watch item).
- No new telemetry event types, no migrations, no Operator visit.
- No cross-user message browsing in Inspect (privacy surface unchanged).
- No ADR-004 re-litigation: ledger stays minimal+redacted; `query_head` is a
  capped scrubbed finding-aid, not I/O storage.

## 4 · Phase shape
ONE AG phase (**OBS-LEGIBILITY-1**), FULL profile (`api/**` touch): §2.1–2.2
server · §2.3 client · §2.4–2.5 registry/config/tests. Evidence gates (literal):
a fresh prod turn shows Input/Output populated on the root span in the Langfuse
UI AND its stage spans carrying `cwf.stage.<NN>.` names; the Langfuse Sessions
view lists that conversation with legible turn I/O; a cold Inspect open finds
that turn via its `query_head` through the session tier AND via keyword search;
parity test red-then-green demo by removing one claimed span name. Merge gate =
unsharded CI green (S43-2).

## 5 · Watch item minted (for the next register roll)
**LANGFUSE-V4-UPGRADE (watch, Operator/infra):** v4 (2026-03) moved to an
observation-centric data model; potential wins = saved views + revisiting F10
(per-span filter URLs absent on self-hosted v3.205); risks = data-model
migration on our EC2/ClickHouse host and early-version root-observation issues.
Evaluate as a standalone infra decision AFTER this phase proves the v3 floor.
Trigger: owner-raise or a v3 limitation blocking a committed deliverable.

<!-- END · cwf-obs-legibility-1-design-v1_2 · rev 1.2 · 2026-07-15 -->
