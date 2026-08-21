# STAGES-FIX-4 — systemic re-walk hotfixes (batched) · Design v1

<!-- cwf-stages-fix-4-design-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-endorsed.
     The three SYSTEMIC findings from the S51 re-walk, batched into ONE phase.
     ANCHOR: the WAVE2-IA-2 MERGE HASH (not yet known — IA-2 in flight). This phase
     is authored NOW; its phase prompt fires AFTER IA-2 merges, rebased onto the
     post-IA-2 RulesTab (S47-1 — both touch RulesTab, IA-2 merges first). -->

**PLATINUM compliance:** wiring existing capability into the Stages deep-links;
no manual step introduced. Backend-agnostic (rides kind/key filters, not backend
names).

## 0 · Why batched (S47-1 + "one phase per walkthrough round")
F-S00-a, F-S01-a, F-S01-b all touch the SAME surface (StagesTab / stagesRegistry /
RulesTab / AdminPanel nav). Batching = one 3-lane handoff, one reseal, no
intra-batch collision. All three MUST be authored against the post-IA-2 master
(IA-2 rewrites RulesTab's family lens → surface split; F-S00-a's arrival strip
lives in that same RulesTab).

## 1 · Big discovery (verified) — F-S00-a is WIRING, not building
The kindFilter + F42 arrival-strip machinery ALREADY EXISTS:
- `navStack.ts` NavContext carries `kindFilter` / `scopeBackend` through a hop.
- `RulesTab.tsx:82` accepts `kindFilter` + `arrivalFrom`, filters the list
  (`:161`), and renders a full arrival strip (`:459-467`) with per-origin copy +
  clear ✕. Two callers already use it (Kinds→Rules, Tweak→Rules).
- The GAP: `StagesTab` `NavChip` calls `onNavigate(tab)` with ONLY the tab — no
  filter, no arrivalFrom. So Stages→Rules dumps onto the unfiltered table.

## 2 · Work items

### F-S00-a — Stages deep-link carries filter + arrival context (#1 pain)
- Extend the stage source `target` (stagesRegistry.ts) from `{tab:'rules'}` to
  optionally carry a discriminator: `{tab:'rules', kind:'agent.param', key:'agent.historyWindowN'}`
  (single key) or `keyPrefix:'quota.'` (stage-00's 3 quota rows).
- Thread it: NavChip → onNavigate → AdminPanel nav → RulesTab. RulesTab today
  filters by `kindFilter` (kind-level); ADD an optional **key / keyPrefix filter**
  (additive to kindFilter — lands on the EXACT row(s), not just the kind). This
  is the precision the owner asked for ("land on the row, I can't find it").
- Add `arrivalFrom:'stages'` to RulesTab's arrival strip with stage-specific copy:
  "Buraya <stage adı> aşamasından geldin — <key> değerini burada değiştiriyorsun /
  You came from the <stage> stage — you're changing <key> here." (naming law.)
- **empty≠zero:** if the filtered key doesn't resolve, the strip says so honestly,
  never a silent empty list.
- Applies to EVERY stage→Rules (and →panel) deep-link — systemic, one wiring.

### F-S01-a — doc opens in ONE named tab
`StagesTab.tsx:92` `target="_blank"` → a NAMED target (`cwf-docs`) so all "Read the
doc" links reuse ONE browser tab. One-line change + a test.

### F-S01-b — Langfuse chip → last-turn TRACE (owner's design)
- v3.205 has no per-SPAN URL but HAS per-TRACE URLs. Rebuild a `buildTraceLink`
  (the retired buildSpanLink's honest successor) →
  `<langfuseHost>/project/<projectId>/traces/<traceId>` (+ a span anchor IF v3.205
  supports one — VERIFY during build; else land on the trace, span visible in tree).
- Source of `<traceId>`: the LATEST turn's `messages.trace_id` (TRACE-LINK-1). Need
  a tiny read — reuse the existing Inspect/recent-turns read if one returns it,
  else a minimal "latest trace_id" projection (no new PII, trace_id only). Show a
  small "son turn: <traceId8> · <time>" indicator; null/obs-down → host fallback.
- Loud toast on click: "cwf.stage.01.telemetry-init kopyalandı — trace açılıyor"
  (copy still happens for the paste-into-filter fallback).
- Kills F-S01-c (both greens identical — each chip anchors its own span in the
  same last-turn trace).
- Real fix tier-2 = LANGFUSE-V4-UPGRADE (parked) — note in the card, don't build.

## 3 · Ceremony
FULL (StagesTab, stagesRegistry, RulesTab, AdminPanel, possibly a tiny read
endpoint = api/**). Unsharded CI is the arbiter (S37-2). Reseal (mapped src/
+ maybe api/). Merge on GREEN CI. No migration (unless the trace_id read needs
one — it should not; trace_id already exists).

## 4 · Anchor + collision (S47-1)
Phase prompt anchors to the IA-2 MERGE hash. IA-2 rewrote RulesTab's lens into the
surface split; F-S00-a's key filter + stages arrival strip build ON that. Author
the phase prompt only after re-viewing the post-IA-2 RulesTab. This phase reseals
to rev N+1 (IA-2's rev + 1).

<!-- END · cwf-stages-fix-4-design-v1 · rev 1 · 2026-07-18 -->
