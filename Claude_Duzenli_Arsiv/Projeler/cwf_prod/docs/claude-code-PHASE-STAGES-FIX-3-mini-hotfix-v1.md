# CWF — PHASE STAGES-FIX-3 — mini-HOTFIX batch (Stream A)
**claude-code-PHASE-STAGES-FIX-3-mini-hotfix-v1 · v1 · 2026-07-12 · Architect: Claude**

> **CEREMONY PROFILE: HOTFIX.** Client-only, low-risk, no `api/**` · `shared/**` · migration ·
> dependency · security surface. So: **targeted tests only** (changed areas + their neighbours —
> NOT the full 2015-test suite), **single pass** (no gated sub-phases), and the Architect will
> do a **light RULE-25** (tree-identity + targeted tests + diff-scope sweep, no full recount).
> Do NOT lighten anything if you find yourself touching api/shared/migrations — STOP and report.

---

## 0 · MISSION — four mechanical findings from the owner's 03→14 live re-walk

All four are code-verified at floor `8e7203d`. Fix exactly these; **do NOT rewrite stage prose
or panel copy** — the content rewrite is a separate later phase (Wave 2).

| # | Finding | Verified root |
|---|---|---|
| **F20** | Nav chip shows raw `?tab=routing` — reads as jargon; owner couldn't tell if it named a table, page, or query param | `StagesTab.tsx:65` renders literal `?tab={tab}` |
| **F32** | Explainer boxes have an × that hides them **permanently** ("bir daha sonsuza kadar yok") | `adminUi.tsx:128` `InlineHelp` writes `localStorage['…']='dismissed'` then `return null` |
| **F37** | Inspect event-detail "human-readable" pane overflows/misaligns (long UUIDs) | `InspectTab.tsx:320-330` `dl` with a fixed `w-44` `dt` + `break-all` `dd` inside a 2-col grid |
| **F25** | Langfuse chip copies the span but **never opens Langfuse** ("kopyaladı ama gidemiyorum") | `StagesTab.tsx:100-123` `SpanChip` = copy-only; `obs.langfuseHost` is already available (line 268) |

---

## 1 · PRE-FLIGHT (gate 0 — STOP on mismatch)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master
```
- MUST print `8e7203d4f21eb963f1262eacc66a195b24e10315`. If master moved, STOP and report.
- `npm ci --no-audit --no-fund --silent`.
- **Targeted baseline** (HOTFIX profile — do NOT run the full suite): run the test files for
  the areas you will touch (StagesTab, adminUi/its consumers, InspectTab) and record the counts.
- Read first: `src/components/admin/StagesTab.tsx` (NavChip ~49-70, SpanChip ~97-125, obs ~268),
  `src/components/admin/adminUi.tsx` (`InlineHelp` 128-147, **`PanelPrimer` 154+ — the CORRECT
  pattern, already collapse⇄expand**), `src/components/admin/InspectTab.tsx` (~315-345).
- Branch `feature/stages-fix-3`. **Push, REPORT, do NOT merge.**

---

## 2 · BINDING CONSTRAINTS

- **C-1 · Scope.** Only `src/components/admin/**` + the living-doc/KB files the drift gate demands.
  NOTHING under `api/**`, `shared/**`, `supabase/**`, `package.json`. No new dependency. No
  `vite.config` change. If a fix seems to need any of these → STOP and report.
- **C-2 · No content rewriting.** Do not touch `stagesRegistry.ts` prose, stage copy, or panel
  explainer TEXT. F20 changes a chip's LABEL (a target name, not prose); F32 changes dismissal
  MECHANICS (the text stays). Anything beyond that is Wave 2.
- **C-3 · No browser-storage regressions.** F32 must not leave a stale permanent flag (see below).
- **C-4 · Read-only preserved.** StagesTab still changes nothing.
- **C-5 · Floors.** Targeted tests green; `tsc -b` + `typecheck:api` clean; RULE-26 e2e still
  green; drift `[OK]`. Every changed behavior gets a test.

---

## 3 · THE FOUR FIXES

### F20 — nav chip: human target name, not `?tab=`
`StagesTab.tsx:65` currently renders `?tab={tab} →`. Replace the mono `?tab=<id>` string with the
**human-readable tab name** + `→` (e.g. `Yönlendirme →` / `Routing →`, `Kurallar →` / `Rules →`).
- Source the label from the SAME place the sidebar nav gets its labels (AdminPanel's nav entries
  carry `label: t('Yönlendirme','Routing')`). Do **not** hand-maintain a second name map in
  StagesTab — export/lift the existing id→label mapping into a shared helper (e.g. in
  `adminTabs.ts` or a small `tabLabels.ts`) so a rename can never desync the two surfaces.
  **This shared map is the important part of the fix** — one source of truth for tab names.
- Keep `aria-label` meaningful (`go to the Routing tab`). Keep the violet-vs-primary color key.
- Update `StagesTab.test.tsx` assertions that pin the `?tab=` text.
- **Note for the future (do NOT do now):** Wave 2 will RENAME two visible labels (Routing →
  "Araç Eşleme / Tool Matching", Backend Trust → "Veri Otoritesi / Data Authority"). Building the
  shared label map now is exactly what makes that rename a one-line change later.

### F32 — explainer boxes: collapse⇄expand, never permanent-dismiss
`InlineHelp` (`adminUi.tsx:128`) permanently hides on × via `localStorage` + `return null`.
**The repo already defines the correct pattern right below it:** `PanelPrimer` (line 154+) —
collapse⇄expand, reversible, `sessionStorage`, *"never renders null"*, collapsed = a slim
clickable header that re-expands, and it even reads the legacy `'dismissed'` value as *collapsed*.
- Convert `InlineHelp` to that same behavior: × becomes a **collapse** toggle; collapsed renders a
  slim, clickable header (title + an expand affordance), never `null`; state persists per `id` in
  **`sessionStorage`** (orientation, not noise — same rationale as PanelPrimer).
- **Migrate the legacy flag:** existing users have `localStorage['cwf.admin.help.<id>']='dismissed'`
  — those boxes are currently invisible forever. Read that legacy value as **collapsed** (mirroring
  PanelPrimer's own legacy handling) so they come back as a re-expandable header rather than staying
  gone. Do not silently leave anyone with permanently-hidden help.
- Apply across ALL consumers (grep `InlineHelp` — e.g. MCP Secrets, Global MCP Servers, and any
  other panels). Consistency across pages is the point of the finding.
- Tests: collapsed state renders the header (not null); toggling re-expands; a legacy
  `'dismissed'` localStorage value renders as collapsed-but-expandable.

### F37 — Inspect event-detail: stop the human-readable pane overflowing
`InspectTab.tsx:~320-330`: a 2-col grid whose left pane is a `<dl>` with `dt` fixed at `w-44` and
`dd` `font-mono break-all`. Long values (UUID session/user ids, timestamps) misalign/overflow.
- Make the pair list robust at narrow widths: let the value wrap without pushing the label
  (e.g. `min-w-0` on the value, allow the `dt` to shrink or stack label-above-value below a
  breakpoint), and keep long ids readable (`break-all` is fine, but the row must not overflow its
  container). Verify at 1280 AND 1024 that the expand's left pane doesn't overflow horizontally.
- Do NOT restructure the RAW JSON pane (right side) or the event table.
- Test: render an event with a long UUID user/session id + verify no horizontal overflow class
  regression; the RULE-26 e2e must stay green (extend it to `?tab=inspect` ONLY if trivial — if
  it needs fixtures/auth, skip and say so).

### F25 — Langfuse chip: copy **and** open the host
`SpanChip` (`StagesTab.tsx:100-123`) copies the span name (correct — self-hosted Langfuse v3.205
has no per-span filter-URL) but leaves the user stranded ("Langfuse'a gidemiyorum").
- On click: copy the span name (unchanged) **AND** open the Langfuse host in a new tab
  (`window.open(host, '_blank', 'noopener,noreferrer')`), so the user lands ready to paste.
  Use the already-available `obs.langfuseHost` (line 268); chips already only render when
  `configured` is true — keep that gate.
- **Honesty, reusing an existing precedent:** InspectTab's Langfuse deep-link already tells the
  user *"opening the trace requires being signed in to the Langfuse host — the login screen is
  expected, not a broken link."* Carry the same honesty here in the existing helper line: the
  chip copies the span name and opens Langfuse; paste it into Langfuse's own filter bar (a login
  screen is expected). Keep it to one short line; do not write new prose beyond it.
- Trailing-slash-safe host handling. Tests: click → clipboard receives the exact span AND
  `window.open` called with the host (spy it); chips absent when unconfigured (unchanged).

---

## 4 · REPORT (paste literally)

1. `git rev-parse origin/master` at start + branch tip.
2. **Targeted** test results (files + counts) at baseline AND finish — name which files you ran
   and why they are the right neighbourhood. (No full-suite run required — HOTFIX profile.)
3. `git diff --stat 8e7203d..HEAD` (must satisfy C-1).
4. Per fix F20/F32/F37/F25: what changed + its test name(s) + one evidence line.
5. F20: where the shared id→label map now lives, and proof both surfaces (sidebar + chips) read it.
6. F32: confirm collapsed never renders null, the legacy `'dismissed'` localStorage value is
   read as collapsed (nobody keeps permanently-hidden help), and list every `InlineHelp` consumer.
7. F25: confirm both clipboard-write and `window.open(host)` fire, and chips stay hidden when
   observability is unconfigured.
8. `tsc -b` + typecheck + RULE-26 + drift `[OK]`; any deviation flagged at the TOP.

*Architect does a LIGHT RULE-25 (tree-identity + targeted tests + diff-scope sweep), then issues
the verbatim `--no-ff` merge message.*

<!-- END · claude-code-PHASE-STAGES-FIX-3-mini-hotfix-v1 · v1 · 2026-07-12 -->
