# PHASE REPLAY-UX-1 — make Part B a real experiment tool (legibility pass)
**v1 · 2026-07-05 · Author lane (AG) · Architect: Claude**
**Goal:** the Replay Part B surface is functionally complete but **experientially unusable** — the owner could not identify/select a specimen, got no selection feedback, and could not interpret an all-failed run. This phase makes it a professional, self-explaining experiment tool. **Frontend-only: every field consumed already exists** in `ReplaySpecimen` / `ReplayRepRow` / `ReplayRunSummary` (verified at HEAD `6983573`). **NO backend / API / endpoint change. Part A stays inactive. No new visual language** — stay inside the existing `.admin-theme` + the shadcn/ui components already used in `adminUi.tsx` (OA10-2 harvested appearance).

---

## 0. PRE-FLIGHT GATE (hard — abort + report if any fails)
1. Fresh clone; `git rev-parse origin/master` == **`6983573`** (`698357305a76ae4f4af12643071d92eefe97edd0`). If HEAD differs, STOP and report.
2. JS suite baseline green; report the count.
3. **Drift gate green:** `npm run check:doc-drift` → `[OK]` before starting.
4. If a `frontend-design` skill/guide exists in your environment, read it; honor the existing admin design system regardless.

---

## 1. HARD CONSTRAINTS
- **Frontend-only.** NO change to `api/**`, no new endpoint, no migration. Every datum below already ships in the verified types (§ Appendix). **If you believe a field is missing, STOP and flag it — do NOT silently add backend scope.**
- **Part A untouched** — still inactive; do not build or enable it.
- **Design system:** reuse the existing `.admin-theme` tokens + the shadcn components already in `src/components/admin/adminUi.tsx` / ReplayTab (Button, Badge, Select, Table, Tooltip, etc.). No new color tokens, no bespoke CSS system, no new component library. Match the current panel's visual weight.
- **Bilingual:** every new user-facing string via the existing `t('TR','EN')` pattern.
- **Interpretation logic is DETERMINISTIC** from `aggregate` — implement it as a pure function (single-sourced, unit-tested), never an ad-hoc inline heuristic. Exact rules in §3.
- **Diff-scope EXPLICITLY PERMITS** `.agents/CHANGELOG.md` (changelog is part of "done") and any reseal/`manifest.json` files if the drift gate requires them. It forbids only `api/**`, migrations, and unrelated components. (This supersedes the older "nothing else" phrasing — the changelog + reseal are expected.)
- **Living-doc lock-step:** `ReplayTab` is mapped. A legibility pass is **below diagram altitude** (it changes no depicted structure). If `check:doc-drift` FAILs, RESEAL (recompute hash + bump `docVersion`) — **reseal, do NOT redraw** — with a below-altitude note. Follow the repo's merge pattern (build+reseal in the code merge; changelog as its own follow-up merge).

---

## 2. SELECT — specimen picker legibility (fixes "can't find/select 07beb11f", "no selection feedback")
For each specimen row render, from the real `ReplaySpecimen` fields:
- **`conversationTitle`** (bold; fall back to `t('başlıksız','untitled')` when null).
- **short id** = `id.slice(0,8)` in a monospace, muted chip, with a **copy-id** affordance (a pro tool lets you copy the message id).
- **timestamp** from `createdAt`.
- **tool badges**: `{toolCallCount ?? '—'} {t('çağrı','calls')} · {toolResultCount} {t('sonuç','results')}`.
- **error badge** when `error === true`.
- **contentPreview** truncated on the row; the FULL preview available on hover (title/tooltip) or a per-row expand.

Add:
- A **search/filter input** above the list that filters the loaded specimens by `id` substring OR `conversationTitle`/`contentPreview` substring (client-side). This is the direct fix for "I typed 07beb11f and couldn't find it."
- **Selected state**: the chosen row gets an unmistakable selected treatment (ring + background + a check icon), driven by state. **Single click selects** — do not depend on double-click.

## 3. READ — result interpretation (the core comprehension fix)
Add a **pure verdict function** `interpretRun(summary): { tone: 'neutral'|'amber'|'green'|'red'; message: TKey; missedTool?: string; offerHonestEmpty: boolean }` single-sourced and unit-tested. Rules, in order:
1. `aborted != null` → red: "Stopped after rep {aborted.afterRep} — {aborted.reason} (budget {aborted.budget})."
2. `aggregate.scoredReps === 0 && aggregate.stubMisses > 0` → amber, `offerHonestEmpty: true`, `missedTool` = the tool name parsed from the first failed rep's `failure.message` (it reads `…no recorded result for <toolName> args#…`): "0/{repsCompleted} reps scored — every rep called a tool not in this recording (**{missedTool}**). Under **strict** policy each such rep fails. → try honest-empty, or pick a specimen that stays within its recording."
3. `aggregate.scoredReps === 0` → red: "0/{repsCompleted} reps scored — all reps failed ({distinct `failure.name` values})."
4. else → tone `amber` if `emptyCount > 0` else `green`: "{scoredReps} scored · empty {emptyCount}/{scoredReps} ({emptyRate×100 rounded}%){failedReps>0 ? ` · ${failedReps} failed` : ''}. {emptyCount>0 ? 'Reproduces the empty region.' : 'No empties in this run.'}"

Render this as a **banner at the top of the results**. When `offerHonestEmpty`, include a **one-click "re-run with honest-empty"** action that re-runs the SAME specimen with `missPolicy='honest-empty'` (no re-selection needed).

Result presentation:
- **Empty-rate always shows the denominator**: `empty {emptyCount}/{scoredReps}` plus `({failedReps} {t('başarısız, skorlanmadı','failed, not scored')})` when `failedReps>0`. "0/0" must never appear without the banner explaining why.
- **Per-rep rows** (from `ReplayRepRow`): rep #, a **status chip** (✓ `scored` / ✕ `{failure.name}`), `empty?` (show `—` when not scored, not a misleading "false"), `finishReason`, tokens `{in}→{out}`, `latencyMs`, stub misses. Each row is **expandable** → shows the rep's `text` (the actual reply, or `(empty)`), the full `failure.message` when failed, and the `stub` stats. The `ReplayStubMissError` chip carries a plain-language **tooltip**: "the model called a tool not in the recording; strict policy fails the rep."
- A small **legend** for the status/color semantics (scored / empty / failed / recovered).

## 4. RUN & FLOW (fixes "frozen button", "no auto-scroll")
- On run: disable the controls and show an **indeterminate progress** indicator — "{t('çalışıyor','running')} {reps} {t('tekrar','reps')}… (~{reps×3}s)". (The run is a single POST; per-rep streaming would need a backend SSE change — out of scope, note it as a future enhancement in a code comment.)
- Each config control (`reps`, `missPolicy`) gets a one-line help tooltip: **strict** = an unrecorded tool call FAILS the rep (fidelity); **honest-empty** = a missed stub returns an honest-empty shape and the rep continues.
- On result arrival: **auto-scroll** to the results container (focus moves there).

## 5. EDGE STATES
- Empty specimen list → an actionable note: a turn is replayable only if it is an assistant message carrying `raw_tool_results`.

---

## 6. TESTS (coverage floor ratchets — add, don't weaken)
- **Pure**: `interpretRun` — one case each for aborted / all-stub-miss (asserts `offerHonestEmpty` + the parsed `missedTool`) / measured-with-empties / measured-clean.
- **RTL** (mirror the existing ReplayTab test): a specimen row renders its short id; selecting a row applies the selected treatment; the search input filters the list; an all-stub-miss `ReplayRunSummary` fixture renders the guidance banner + the honest-empty re-run control; a per-rep row expands to reveal `text` / `failure.message`.

## 7. SELF-VERIFICATION (literal evidence — not build-green)
1. `interpretRun` unit test: paste the 4 case assertions passing.
2. RTL: paste the assertions for id-visible, selected-treatment, search-filter, all-stub-miss banner, rep-expand.
3. `git grep` in the diff: no change under `api/**`, no migration (frontend-only proven).
4. Full suite green — report the new total (≥ baseline + the new tests); `typecheck` green.
5. `check:doc-drift`: `[OK]`; if you resealed, paste the reseal output + `docVersion` bump + confirm no diagram content changed (reseal-not-redraw).
6. `git diff --name-only`: only `ReplayTab.tsx` (+ its test), optionally `adminUi.tsx` helpers, the new `interpretRun` module (+ its test), and (if drift) `manifest.json` + reseal files. Plus the `.agents/CHANGELOG.md` entry (in its own follow-up merge per the repo pattern). NO `api/**`.
7. Branch → `--no-ff` merge (squash banned) → push → report remote HEAD hash.

---

## Appendix — the verified data model (HEAD 6983573; do not re-derive, do not extend)
- `ReplaySpecimen { id; conversationId; conversationTitle: string|null; createdAt; toolResultCount; toolCallCount: number|null; contentPreview; error: boolean }`
- `ReplayRepRow { rep; ok; failure: {name;message}|null; text; finishReason; empty: boolean|null; floorPhrasePresent: boolean|null; usage:{inputTokens;outputTokens;totalTokens}; latencyMs; toolCallsServed; stub:{served;misses;reusedLast;metaToolCalls;truncatedRecordings} }`
- `ReplayRunSummary { runId; messageId; conversationId; recorded:{…providerId;providerModelId;userMessagePreview…}; provider:{resolvedId;modelId;family}; missPolicy; temperature; repsRequested; repsCompleted; aborted:{reason;afterRep;budget}|null; aggregate:{emptyRate:number|null;emptyCount;scoredReps;failedReps;floorPhraseReps;stubServed;stubMisses;reusedLast;…tokens:{input;output;total};tokenBudget}; reps: ReplayRepRow[] }`

Everything the redesign needs is here. If a rendering wants a datum NOT in this appendix, STOP and flag — do not add a backend field.
