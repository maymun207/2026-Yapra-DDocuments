# PHASE · STAGES-FIX-4 — systemic re-walk hotfixes (F-S00-a · F-S01-a · F-S01-b)

<!-- claude-code-PHASE-STAGES-FIX-4-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-endorsed.
     Relay to AG (Author lane) verbatim. FULL ceremony. -->

**PLATINUM compliance:** wiring existing capability into the Stages deep-links;
zero manual step introduced; backend-agnostic (rides kind/key, not backend names).

**PRECONDITION (S47-1):** valid ONLY while `origin/master == 4998270` (Merge
WAVE2-IA-2). On mismatch: STOP and report actual `git rev-parse origin/master`.
Runs in PARALLEL with the Operator's rule_kinds.surface migration apply (different
lane, no shared surface). The IA-2 DOC-FLIP (post-live-verify) and this phase are
independent; second-to-merge rebases + reseals to the next rev.

## 0 · What exists (verified — build ON it, don't rebuild)
- `RulesTab` (`:82`) already takes `kindFilter` (KIND-level) + `arrivalFrom:
  'kinds'|'tweak'` and renders a full arrival strip (`:469-477`). Filter logic at
  `:172` is kind-level only.
- `navStack.NavContext` carries `kindFilter`/`scopeBackend`/`stageCardId`/`scrollY`.
- `AdminPanel.navigateFromStages` (`:136`) pushes `{stageCardId}` but sets NEITHER
  `rulesKindFilter` NOR `rulesArrivalFrom` — THIS is the F-S00-a gap.

## 1 · F-S00-a — Stages→Rules deep-link carries filter + arrival context (#1 pain)

- **stagesRegistry.ts:** extend a source `target` to optionally carry a
  discriminator: `{tab:'rules', kind:'agent.param', key:'agent.historyWindowN'}`
  (single key, e.g. stage 05) or `{tab:'rules', kind:'agent.param',
  keyPrefix:'quota.'}` (stage 00's 3 quota rows). Fill these in for the
  agent.param / governed sources across the stage cards (00 quota.*, 05
  historyWindowN, and any other stage→rules source that names a specific
  key/kind).
- **navStack.NavContext:** add optional `ruleKey?: string` and `ruleKeyPrefix?:
  string` (alongside kindFilter). A dead link stays a compile error (typed).
- **Thread it:** NavChip → onNavigate(tab, fromCardId, filter?) → AdminPanel.
  navigateFromStages sets `rulesKindFilter` = target.kind, a NEW
  `rulesKeyFilter`/`rulesKeyPrefix` state = target.key/keyPrefix, and
  `rulesArrivalFrom` = a NEW `'stages'` value (carry the ORIGIN STAGE's name for
  the strip copy — pass the stage title/id through NavContext, e.g.
  `originStageTitle?`).
- **RulesTab:**
  - Add `ruleKey?`/`ruleKeyPrefix?` props; extend the filter (`:172` area) —
    additive to kindFilter: `if (ruleKey && r.key !== ruleKey) continue;` and
    `if (ruleKeyPrefix && !r.key.startsWith(ruleKeyPrefix)) continue;`. Lands on
    the EXACT row(s), not the whole kind.
  - Add an `arrivalFrom === 'stages'` branch to the arrival strip with
    stage-specific copy (naming law — human image): TR "Buraya **{stage}**
    aşamasından geldin — **{key}** değerini burada değiştiriyorsun." / EN "You
    came from the **{stage}** stage — you're changing **{key}** here." (Use the
    keyPrefix label when no single key, e.g. "kota bütçe değerlerini".)
  - **empty≠zero:** if the filtered key/keyPrefix resolves to ZERO rows, the strip
    says so honestly ("bu değer henüz yayınlanmamış" / "not yet published"), never
    a silent empty list.
- Applies to EVERY stage→Rules source with a named key/kind — one wiring, systemic.

## 2 · F-S01-a — "Read the doc" opens ONE named tab
`StagesTab.tsx:92` `target="_blank"` → a NAMED target (`"cwf-docs"`). All doc links
reuse one browser tab. One-line change + a test asserting the named target.

## 3 · F-S01-b — Langfuse chip → last-turn TRACE (owner's design)
- **stagesLinks.ts:** add `buildTraceLink(langfuseHost, projectId, traceId,
  spanName?)` → `<host>/project/<projectId>/traces/<traceId>` (append a span
  anchor IF v3.205 exposes one — VERIFY during build; if not, land on the trace,
  the span is visible in the tree). The retired buildSpanLink's honest successor.
- **Latest trace_id source:** the most recent turn's `messages.trace_id`
  (TRACE-LINK-1). REUSE the existing Inspect/recent-turns read if it already
  returns trace_id; else add a MINIMAL projection (trace_id + created_at only —
  no new PII, no full I/O). Gate the chip on host+projectId+traceId all present.
- **StagesTab SpanChip:** on click, open `buildTraceLink(...)` for the latest
  turn; keep the clipboard copy (paste-into-filter fallback); show a LOUD toast:
  TR "**{span}** — son turn trace'i açılıyor" / EN "opening the last turn's
  trace". Show a small "son turn: {traceId8} · {time}" indicator near the chips.
  null/obs-down traceId → fall back to opening the host (today's behavior).
- Kills F-S01-c (both greens identical — each chip anchors its own span in the
  SAME last-turn trace). Card note: tier-2 real fix = LANGFUSE-V4-UPGRADE (parked)
  — do NOT build it.

## 4 · Gated sub-phases
F-S00-a (nav context + registry targets + RulesTab filter/strip) → F-S01-a (named
tab) → F-S01-b (trace link + latest-trace read + chip/toast) → tests.

## 5 · Self-verify (evidence in PR)
- [ ] Stage→Rules deep-link lands FILTERED to the exact key(s) + a 'stages'
      arrival strip naming the origin stage (test).
- [ ] empty≠zero: an unpublished key → honest strip, not a silent empty list (test).
- [ ] Doc link uses the named target (test).
- [ ] Langfuse chip builds the per-TRACE URL of the latest turn; null trace →
      host fallback (test).
- [ ] No new PII persisted by the latest-trace read (projection is trace_id +
      created_at only).

## 6 · Ceremony
FULL. Unsharded CI on the PR head is the sole arbiter (S37-2). Mapped files
(`src/**`, possibly a tiny `api/**` read) → reseal (bump docVersion, "below
diagram altitude, reseal not redraw", `npm run reseal`, `check:doc-drift` green).
Push branch → CI → Architect FAST-GATE review → merge `--no-ff` on GREEN CI only
→ report remote HEAD hash. No migration expected (trace_id already exists).

<!-- END · claude-code-PHASE-STAGES-FIX-4-v1 · rev 1 · 2026-07-18 -->
