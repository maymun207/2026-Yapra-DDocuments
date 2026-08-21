# PHASE REPLAY-UX-3 — finish Part B: chip selection, specimen detail, open-in-Langfuse
**v1 · 2026-07-05 · Author lane (AG) · Architect: Claude**
**Scope:** three owner-requested Part-B polish/legibility fixes. Frontend + ONE redaction-bounded backend detail branch. **Part A is NOT in this phase** (separate next phase). No migration.

---

## 0. PRE-FLIGHT GATE (hard — abort + report on any failure)
1. Fresh clone; `git rev-parse origin/master` == **`e63fd0d`** (`e63fd0d35a897456cd7ad6e927bff6561f72b1fd`). If HEAD differs, STOP and report.
2. JS suite baseline green (report count; expected 786/81).
3. **Drift gate green:** `npm run check:doc-drift` → `[OK]` before starting.

---

## 1. HARD CONSTRAINTS
- **Part A untouched** — still inactive. Do NOT build or enable it here.
- **The ONLY backend change** is the specimen-detail branch in §3 (text + tool NAMES only). **raw_tool_results PAYLOADS are NEVER returned to the client** — this is the C9 redaction line and it is non-negotiable; a test must prove no payload leaks. No migration, no other `api/**` change. If more backend seems needed, STOP and flag.
- **Design system:** reuse `.admin-theme` + existing shadcn components. No new visual language; selected-state colors must come from the existing token palette (a strong, high-contrast token — not a new hex).
- **Bilingual** `t('TR','EN')` for every new string. **RULE 1** (no hardcoded config; the Langfuse URL is built from env-derived config, never a hardcoded host).
- **Diff-scope permits** `.agents/CHANGELOG.md`, reseal/`manifest.json`, AND the frontend service method in `src/lib/adminService.ts` + the component — these are expected. It forbids migrations and any `api/**` change beyond the §3 detail branch.
- **Living-doc lock-step:** §3 touches `api/admin/replay.ts` + `recordedTurn.ts` (mapped) → the drift gate WILL FAIL → RESEAL (recompute hash + bump `docVersion`), **reseal-not-redraw** (a detail branch + UI polish is below diagram altitude), same code commit, with a below-altitude note.

---

## 2. FIX #1 — strong chip selected state (owner: "1x seçince belli olsun")
`ChoiceChip` currently renders `variant={selected ? 'secondary' : 'outline'}` — `secondary` is too subtle to read as selected. Change the **selected** treatment to a strong, unmistakable high-contrast style from the existing design tokens (a filled dark/primary or the theme's turquoise accent — whichever the token system already provides for a "pressed/active" affordance), so a selected `1x/3x/5x/10x` chip and the selected `strict/honest-empty` toggle are obviously distinct from the unselected ones. Keep `aria-pressed`. Purely visual; no logic change.

## 3. FIX #2 — click the selected specimen to expand full (safe) detail
**Backend (redaction-bounded):** add `GET /api/admin/replay?specimenDetail=<id>` (REPLAY_RUN-gated, same as resolve/list), returning:
```
{ id, userMessage: string, assistantContent: string, toolNames: string[] }
```
- `userMessage` = the full triggering user message; `assistantContent` = the full recorded assistant reply (both are conversation text already exposed to this gated caller as reply text under C9 — the truncated `contentPreview` is a subset).
- `toolNames` = the `toolName` values from `raw_tool_results` — **NAMES ONLY.**
- **NEVER** return `raw_tool_results` payloads, tool result bodies, or history beyond the trigger. Reuse the existing `loadRecordedTurn`/validation; do not duplicate.
- Reuse the existing 404/422 named-error handling (not-found / not-replayable).

**Frontend:** clicking the currently-selected specimen row toggles an inline **detail panel** showing: copyable full id, conversation title, timestamps, tool counts + the `toolNames` list, and the full user message + full assistant reply (from the detail fetch, lazy-loaded on first expand). Include a one-line note: tool-result payloads stay server-side (redaction). Collapse on re-click.

## 4. FIX #3 — open the RUN in Langfuse (owner: "specimen'i Langfuse'da aç")
**Honest constraint (build the feasible, better version):** the specimen's ORIGINAL turn trace is not linkable — the `messages` row stores no trace id. But replay traces ARE grouped in Langfuse as a **session keyed by `runId`** (`taskFn.ts` sets `TRACE_SESSION_ID = runId`). So link the **RUN**, not the pre-run specimen.
- After a run, make the displayed run id (the "run <runId>" label in the summary) a **deep-link** to the Langfuse session: `${langfuseHost}/project/${langfuseProjectId}/sessions/${runId}` — built from `adminService.getObservabilityConfig()` (host + projectId), the same non-secret config InspectTab uses.
- **Graceful-off** (mirror InspectTab): render the link ONLY when host + projectId + runId are all present; otherwise plain text + (optionally) the same honest "set LANGFUSE_HOST…" hint. Never a broken link.
- Do NOT attempt a pre-run specimen→trace link (no stored id). If a code comment is warranted, note that an original-turn link would require a message→trace join (not built).

---

## 5. TESTS (coverage floor ratchets up)
- **#1**: RTL — a selected chip carries the strong-selected treatment and an unselected one does not (assert the class/attribute differs).
- **#2 backend**: the detail branch returns `{userMessage, assistantContent, toolNames}` for a valid id; **asserts the response has NO `raw_tool_results` and no tool-result payload** (the no-leak guarantee); 404/422 for bad/not-replayable ids. **#2 frontend**: expanding the selected specimen fetches + renders the user message + assistant content + tool names.
- **#3**: given a run summary with a `runId` + a configured obs config, the run-id renders as a `…/sessions/${runId}` link; unconfigured → plain text (no broken link).

## 6. SELF-VERIFICATION (literal evidence)
1. Paste the #2 no-leak test assertion (response has no `raw_tool_results`/payload).
2. Paste the #1 selected-vs-unselected assertion, the #2 expand assertion, the #3 link/graceful-off assertions.
3. `git grep` proves the ONLY `api/**` change is the `specimenDetail` branch in `replay.ts` (+ the detail loader in `recordedTurn.ts`) + tests — no migration, no other endpoint.
4. `git grep` proves the Langfuse URL is env-config-derived (no hardcoded host literal — RULE 1).
5. Full suite green — report the new total; `typecheck:api` + `tsc -b` + `vite build` green.
6. `check:doc-drift`: reseal (mapped `api/**` changed) — paste reseal output + `docVersion` bump + confirm no diagram content changed (reseal-not-redraw).
7. `git diff --name-only`: `api/admin/replay.ts` (+test), `api/cwf/_lib/replay/recordedTurn.ts` (+test), `src/components/admin/ReplayTab.tsx` (+test), `src/lib/adminService.ts`, `manifest.json` (reseal). Changelog in its own follow-up merge. NOTHING else.
8. Branch → `--no-ff` merge (squash banned) → push → report remote HEAD hash.

## 7. WHAT ARCHITECT RE-VERIFIES
Fresh clone + diff vs `e63fd0d`: the detail branch is metadata+text+tool-NAMES only with a proven no-payload-leak test (the redaction line held); the selected-chip treatment is strong + token-based; the specimen expand renders user/assistant/tool-names; the run link is `…/sessions/{runId}` env-derived + graceful-off; no pre-run specimen→trace guess; reseal-not-redraw; suite green; pushed hash.
