# PHASE REPLAY-UX-2 — reach any specimen by id (beyond the 20-row window)
**v1 · 2026-07-05 · Author lane (AG) · Architect: Claude**
**Problem (owner-verified live):** the specimen picker fetches only the 20 most-recent replayable turns (`ADMIN_REPLAY_SPECIMEN_LIMIT = 20`, `created_at desc`). The REPLAY-UX-1 search filters **only that loaded window**, so a valid older specimen (e.g. `07beb11f-55c2-4b82-813a-b7249df748b2`) returns "no specimen matches" even though it is fully replayable — the run endpoint already runs **any** message by id. This phase makes the picker **reach beyond the window by exact message-id** (the canonical from-trace/audit-to-replay workflow), and widens the browse window.

---

## 0. PRE-FLIGHT GATE (hard — abort + report on any failure)
1. Fresh clone; `git rev-parse origin/master` == **`10fd677`** (`10fd677b147631096caea26bc715943ed552c3c0`). If HEAD differs, STOP and report.
2. JS suite baseline green (report count; expected 776/80).
3. **Drift gate green:** `npm run check:doc-drift` → `[OK]` before starting.

---

## 1. HARD CONSTRAINTS
- **The ONLY backend change permitted** is the resolve-by-id GET branch in §2 (+ a shared specimen-mapper it reuses) and the limit bump in §4. No other `api/**` change, no migration, no new endpoint file. If you find you need more backend, STOP and flag.
- **Reuse, don't duplicate:** the resolve path MUST reuse the existing `loadRecordedTurn`/`listReplayableSpecimens` validation for role=`assistant` + non-empty `raw_tool_results`, and the SAME row→`ReplaySpecimen` mapping (extract a shared `mapSpecimenRow` if the list currently inlines it). Metadata only — never reply text or tool payloads (same redaction posture as the list).
- **Part A untouched** (still inactive).
- **Design system:** reuse `.admin-theme` + the shadcn components already in ReplayTab/adminUi. No new visual language.
- **Bilingual** `t('TR','EN')` for every new string.
- **Diff-scope permits** `.agents/CHANGELOG.md` + reseal/`manifest.json` files. `api/admin/replay.ts` is mapped (Governance Model) → this phase WILL trip the drift gate → **reseal (recompute hash + bump `docVersion`), do NOT redraw** (a resolve branch is below diagram altitude), same-commit, with a below-altitude note.

---

## 2. BACKEND — resolve one specimen by exact id
Extend the existing `GET /api/admin/replay` handler (REPLAY_RUN-gated, as today): when `req.query.specimenId` is a non-empty string, return that ONE specimen's metadata instead of the list:
- Resolve the message by exact id (reusing the list's `role='assistant'` + non-empty `raw_tool_results` validation).
- **Found + replayable** → `200 { specimen: ReplaySpecimen }` (the SAME shape/mapper the list uses).
- **Not found** → `404 { error, name: 'ReplaySpecimenNotFoundError' }`.
- **Found but not replayable** (not assistant / no raw_tool_results) → `422 { error, name: 'ReplayNotReplayableError' }`.
- No `specimenId` param → unchanged list behavior (byte-identical).
This reaches ANY message regardless of the 20/50 window — that is the whole point.

## 3. FRONTEND — id lookup in the picker
- The search input already filters the loaded window client-side (keep that — it's the fast browse path).
- **When the local filter yields no match AND the input looks like a message id** (a uuid-shaped string — a permissive check, not a strict RFC validator), surface a **"look up this id"** action (or auto-resolve, debounced ~400ms). It calls the §2 resolve endpoint:
  - **Success** → the resolved specimen appears in the list as **selected** (title / short-id / preview / tool badges, same row rendering as REPLAY-UX-1), ready to run — no window dependence.
  - **404/422** → an inline honest note with the reason ("no replayable turn with that id" / "that message isn't an assistant turn with recorded tool results"). Never a broken/empty silent state.
- The input's placeholder/help should make clear it accepts **either** a filter term **or** a full message-id.

## 4. WIDEN THE BROWSE WINDOW (complement)
- Raise the default browse limit `ADMIN_REPLAY_SPECIMEN_LIMIT` / `REPLAY_LIST_DEFAULT_LIMIT` from **20 → 50** (still bounded by `REPLAY_LIST_MAX_LIMIT = 100`; do not exceed it). This is a one-value change per const — keep RULE 1 (single-sourced consts; the frontend const and the server default should not silently diverge — if they are two consts, set both and note it).
- (A date-range sort/filter is intentionally OUT of scope here — the by-id resolve is the complete "reach any specimen" fix. Do not add it.)

## 5. TESTS (coverage floor ratchets up)
- **Backend**: the resolve branch — found (200 + specimen shape), not-found (404 + name), not-replayable (422 + name), and no-param (unchanged list). Mock the service client; assert the shared mapper output equals the list's for the same row.
- **RTL**: local-miss → id lookup resolves → the specimen renders selected and runnable; a bad id → the inline error renders (no silent empty).

## 6. SELF-VERIFICATION (literal evidence)
1. Backend test output for all four resolve cases (200/404/422/list-unchanged).
2. RTL output for: local-miss → resolve → selected specimen; bad id → inline error.
3. `git grep` shows the ONLY `api/**` change is the `specimenId` branch in `replay.ts` (+ the shared mapper extraction) and the limit const — nothing else in `api/**`, no migration.
4. Full suite green — report the new total (≥ 776 + the new tests); `typecheck:api` + `tsc -b` + `vite build` green.
5. `check:doc-drift`: reseal (mapped `api/admin/**` changed) — paste the reseal output + `docVersion` bump + confirm no diagram content changed (reseal-not-redraw).
6. `git diff --name-only` (code merge): `api/admin/replay.ts` (+ its test), the replay list/loader module if the mapper moved (+ its test), `ReplayTab.tsx` (+ its test), the limit const file(s), `manifest.json` (reseal). Changelog in its own follow-up merge. NOTHING else.
7. Branch → `--no-ff` merge (squash banned) → push → report remote HEAD hash.

## 7. WHAT ARCHITECT RE-VERIFIES
Fresh clone + diff vs `10fd677`: the resolve branch reuses (not duplicates) the list validation + mapper; metadata-only (no reply text/tool payloads); list path byte-unchanged when no `specimenId`; the frontend falls back to resolve only on local miss + id-shape; honest 404/422 surfacing; limit 20→50 single-sourced; reseal-not-redraw; suite green; pushed hash. Then Maymun confirms live: pasting `07beb11f-55c2-4b82-813a-b7249df748b2` resolves + runs.
