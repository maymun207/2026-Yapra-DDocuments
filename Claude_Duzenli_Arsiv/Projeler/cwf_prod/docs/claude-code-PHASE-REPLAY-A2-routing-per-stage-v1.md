# PHASE REPLAY-A2 — Routing Per-Stage Replay (Part A widen) · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Implements queue #1
     (register v22) per design note cwf-per-stage-replay-routing-design-v1. Widens the REPLAY-A1
     grounding lens to the ROUTING stage. Version axis = { floor | live } (preview deferred — no
     tool_cache draft store; design §3). Code-grounded at master HEAD c9f34cf (rev 45, 940/89).
     SECURITY-RELEVANT (refactors the tool router + reads recorded cross-user turns) → FULL REVIEW,
     not hotfix mode. No migration (reads existing tables only). This prompt was written by the
     Architect, NOT by AG — do not offer to rewrite it. -->

---

## 0. HARD PRE-FLIGHT GATE (do not start until ALL are literally true)

- [ ] Fresh clone of `github.com/maymun207/cwf_yaprak`; `git rev-parse origin/master` == **`c9f34cf…`** (verification STARTS here, RULE 25).
- [ ] `npm ci` clean; **baseline test suite green** BEFORE any change — paste the literal count (expected **940/940 across 89 files**; if it differs, report the real number and STOP if lower).
- [ ] **Drift gate green** on the untouched clone: `npm run check:doc-drift` → paste the `[OK]` line (expected: `[OK] no drift — all 6 narrative tabs synced`). If not `[OK]`, STOP and report — do not build on a drifted tree.
- [ ] You have read the design note `cwf-per-stage-replay-routing-design-v1.md`: §2 (routing's pure layer vs the impure router LLM), §4 (the availability floor is sacred in the lab), §5 (the honest recovery gap + the `calledButNotOffered` signal).

Report each as literal evidence in the final self-verification. "Build green" is NOT evidence — paste counts/lines.

---

## 1. What this is (one paragraph — read before touching code)

A NEW, read-only, **deterministic, no-LLM** replay lens over the ROUTING stage: re-run the PURE
keyword-match layer of `filterToolsByMessage` over a recorded turn's user message, against a
**version-pinned learned-mapping slice** (`floor` = code `CATEGORIES` with an empty learned cache;
`live` = code floor ∪ the current `tool_cache` learned map), and return the **matched categories,
the offered tool NAMES, the tools the turn actually called that would NOT be offered
(`calledButNotOffered` — the coverage regression), and a diff vs the floor baseline.** It answers
"would the governed routing @ version X still offer this past turn the tools it needed." It is NOT
REPLAY-B (no model, no rep loop, no tokens) and it **must never call the router LLM**
(`routerSelectCategories`) — the router path is stochastic and belongs to REPLAY-B; here it is
**suppressed and reported honestly**, never invoked or fabricated. The whole point rides on one
sacred invariant (§2.3): the lab can never produce an empty / below-floor offered set — a no-match
surfaces as `no-keyword-match` (→ all-fallback categorical), never as `offered=0`.

---

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — Production stays byte-identical.** The production routing path
(`stageRegisterTools` → `filterToolsByMessage`) must behave EXACTLY as today. After the D1 extraction,
production's keyword-layer result (matched categories + offered names) MUST be byte-identical when the
injected learned map === the module's loaded `learnedMappings` cache, on every existing routing test
(`backendAwareFilter`, `scopeTools`, `toolCategories`-adjacent, `supersetGate`, the TD-13 recipe/OEE
scoping tests). Do NOT change the router-LLM branch, the learn-write, the cache-load, `ensureFreshCache`,
`ALWAYS_INCLUDE`, `CATEGORIES`, or `stageTools.ts`'s gateway partition. Prove parity (§4).

**2.2 — No LLM, no writes, no REPLAY-B machinery.** The new path calls the extracted pure core and
nothing that streams a completion or calls Gemini. It **must not** call `routerSelectCategories`,
`learnToolMapping`, `loadCacheFromSupabase`, or `ensureFreshCache` (no cache-load side effect). It writes
NOTHING to governed tables (C1 write-nothing, same as `recordedTurn.ts` / the `groundingReplay` branch).
It does NOT import `runExperiment`, `runReplayRep`, the token budget, or `perturbForRetry`.

**2.3 — THE AVAILABILITY FLOOR IS SACRED IN THE LAB (the security core).** The effective offered set
is ALWAYS `ALWAYS_INCLUDE ∪ (matched-category tools)`, and a no-keyword-match NEVER yields an empty
set — it returns `path='no-keyword-match'` (production would escalate to router/all-fallback), never
`offered=0`. A version-pinned / learned-mapping slice may ADD or CHANGE matched categories; it can
**never** drop `ALWAYS_INCLUDE`, never filter a gateway backend's tools, and never collapse the offered
set to empty. **This floor MUST be enforced by REUSING the production deterministic core (D1), not by
re-implementing the partition** — a re-implementation is exactly how the floor silently drops (mirrors
A1's §2.6 same-source lockstep: grounding reused `pickArmesGoverned`). A dedicated test (§4) pins a
learned-map slice whose mappings would remove all category matches for a query and asserts the offered
set STILL contains `ALWAYS_INCLUDE` and the path is `no-keyword-match` (NOT `offered=0`).

**2.4 — Honest router-path handling (no fabricated routing).** When the recorded turn's user message
yields NO keyword match, the replay reports `path='no-keyword-match'` and labels its deterministic
result a **counterfactual** ("what the keyword layer alone would route; production escalated to the
router/all-fallback"). In that case `calledButNotOffered` is EXPECTED and MUST NOT be presented as a
regression. The replay NEVER calls the router LLM to "reconstruct" the real decision (that is REPLAY-B).

**2.5 — C9 boundary.** The response carries ONLY: `version`, matched category NAMES, offered tool
NAMES (or the `path` flag), called tool NAMES, the `calledButNotOffered` NAMES, and a category-name
`floorDiff`. NEVER `raw_tool_results` payloads, NEVER tool-result bodies. Extend the no-leak test to
this endpoint (plant a poison payload in `raw_tool_results`, assert absent from `JSON.stringify`).

**2.6 — Secrets.** No secret/token/key printed or added. No `.env` reads in the new code (the router
LLM's `GEMINI_API_KEY` read stays where it is — the replay never reaches it). This phase adds no env vars.

---

## 3. GATED SUB-PHASES (do in order; each independently green before the next)

### Sub-phase A — extract the pure deterministic routing core (no behavior change)
`api/cwf/_lib/toolCategories.ts`: extract the keyword-match + tool-partition currently inline in
`filterToolsByMessage` (via `matchCategories` / `getToolsForCategories` / `ALWAYS_INCLUDE`) into an
exported PURE helper that reads its learned map from a PARAMETER, not the module global:
```ts
export interface RoutingCoreInput { userMessage: string; learned: ReadonlyMap<string, string[]>; }
export interface RoutingCoreResult {
    matchedCategories: string[];
    offeredToolNames: string[];        // getToolsForCategories(matched) ∪ ALWAYS_INCLUDE, name-sorted
    path: 'keyword' | 'no-keyword-match';
}
export function routeKeywordLayer(input: RoutingCoreInput): RoutingCoreResult { … }  // NO LLM, NO I/O, NO write
```
- `matchCategories` must take the learned map as an argument (today it reads the module-level
  `learnedMappings`); production `filterToolsByMessage` passes its module cache in, so behavior is
  unchanged. Do NOT alter the matching semantics (learned-first, then static keywords; multi-word
  keyword handling preserved).
- `routeKeywordLayer` returns `path:'no-keyword-match'` with `offeredToolNames = [...ALWAYS_INCLUDE]`
  (name-sorted) when no category matches — it does NOT call the router (the router stays in
  `filterToolsByMessage`, which on `no-keyword-match` still escalates exactly as today).
- **Invariant preserved:** `filterToolsByMessage`'s keyword-path output (filtered set + matchedCategories)
  is byte-identical to today when the injected map === the loaded cache — the existing routing tests MUST
  pass unchanged. Do not touch `CATEGORIES`, `ALWAYS_INCLUDE`, the router branch, or the learn/cache I/O.

### Sub-phase B — the version-pinned learned-map resolver (floor-defaulted, never-throws)
New file `api/cwf/_lib/replay/routingSlice.ts`:
```ts
export type RoutingSliceVersion = 'floor' | 'live';
export const ROUTING_SLICE_VERSIONS = ['floor', 'live'] as const;
export async function resolveRoutingLearnedMap(
    version: RoutingSliceVersion,
    repo?: ToolCacheRepository,   // DI seam for tests
): Promise<ReadonlyMap<string, string[]>>
```
- `floor` → an EMPTY map (code `CATEGORIES` only; no DB touch).
- `live` → `ToolCacheRepository.getAll()` → `Map(keyword → categories)`.
- Never throws → on any failure degrade to the EMPTY (floor) map (never a partial/undefined map).
- `preview` is intentionally NOT offered (design §3: `tool_cache` has no draft store; do not fake one).
  Leave a comment naming this as the deferred item.

### Sub-phase C — the endpoint sibling + C9 (`api/admin/replay.ts`)
Add a GET branch, alongside the `groundingReplay` branch, gated by the SAME `PERMISSIONS.REPLAY_RUN`
already enforced at the top:
```
GET /api/admin/replay?routingReplay=<messageId>&version=<floor|live>
```
- Validate `version` ∈ the 2 literals (400 on bad value). Default `version=live` if absent.
- `loadRecordedTurn(messageId)` (server-side). Named-error mapping identical to the `groundingReplay`
  branch (404 not-found / 422 not-replayable / 503 unavailable / 500).
- Recover: `userMessage = turn.userMessage`; `calledToolNames = dedupe(turn.rawToolResults.map(r => r.toolName))`.
- Resolve the learned map at the requested version AND at `floor` (baseline). Get the tool universe from
  the existing `getRoutingCategoryManifest()` (pure accessor — do not re-derive). Run `routeKeywordLayer`
  twice (at-version + floor) — pure, deterministic, cheap.
- Compute, at the requested version: `offered = result.offeredToolNames`;
  `calledButNotOffered = calledToolNames.filter(n => !offered.includes(n) && !offered.includes(safe(n)))`
  (apply the SAME `safeName` normalization `stageTools.ts` uses). `floorDiff = { added: categories matched
  at-version not at floor, removed: at floor not at-version }` (category names only).
- Respond `200 { messageId, version, path, matchedCategories, offeredToolNames, calledToolNames,
  calledButNotOffered, floorDiff }`. When `path==='no-keyword-match'`, include it so the UI can render the
  counterfactual label (§2.4) — do NOT flag `calledButNotOffered` as a regression in that case.
- **No audit row** (pure GET read + compute, write-nothing, no tokens, no OTel spans — consistent with the
  un-audited `groundingReplay`/`specimenDetail`/list GETs; it returns only NAMES). Note this in a comment.
- RULE 27: no observability force-flush on a pure read path (no spans emitted) — do not init/flush here.

### Sub-phase D — UI affordance on the SAME specimen-detail panel (Part B UX preserved)
`src/components/admin/ReplayTab.tsx` — inside `SpecimenDetailPanel`, add a "Routing @ [version ▾]"
control **directly beside the existing "Grounding @" control**, mirroring its shape
(`ChoiceChip` per version, loader, `…ForId` tagging so a stale panel never shows another specimen's
result, graceful-off on 503/404/422 with an HONEST note — never a fabricated result). Render:
- the matched category chips + the offered-tool count;
- the `calledButNotOffered` list as WARNING chips **only when `path==='keyword'`** (a real regression);
  when `path==='no-keyword-match'`, render an honest counterfactual note instead (§2.4), NOT warnings;
- the `floorDiff` (added/removed category names) exactly like the grounding diff renders.

**PRESERVE (do not regress) the existing Part B affordances on this panel — these are owner-required and
each must still work after your change (assert in tests, §4.7):**
1. **Expand-on-click** — clicking the selected specimen row still toggles the detail panel (`toggleDetail`),
   lazy-loads once, collapses on re-click.
2. **Content read** — the full user message, full assistant reply, and tool NAMES still render.
3. **Original-trace Langfuse deep-link** (TRACE-LINK-1) — the "open original trace in Langfuse" anchor
   still renders (graceful-off, OTel-shaped id only, env-derived host+projectId — RULE 1). Do NOT remove,
   move below, or break it.
4. **Grounding @ control** — untouched and still functional beside your new Routing @ control.
5. **Redaction note** — still shown.

Bilingual `t('TR','EN')` for every new string. **This is not a UI-polish phase** — wire it plainly using
`.admin-theme` + existing shadcn components + existing token palette; no restyling of surrounding
components, no new visual language, no browser storage. Add the `adminService.routingReplay(id, version)`
method + the `RoutingReplayResult` / `RoutingSliceVersion` types mirroring the grounding ones.

### Sub-phase E — reseal (living-doc lock-step, two-commit seal)
This phase changes MAPPED areas (`api/admin/replay.ts`, `api/cwf/_lib/replay/**`,
`api/cwf/_lib/toolCategories.ts`) alongside an UNMAPPED `src/**` UI change → **RESEAL, not redraw**.
Bump `public/architecture/manifest.json` (there is NO root manifest.json) and `docVersion` **45 → 46**;
update the arch doc(s) whose mapped areas moved (the Agent Control Plane / Governance Model tab that maps
the replay/routing surface) — below-altitude reseal note, not a diagram redraw. Two-commit seal:
(1) the code commit, (2) the reseal/manifest + `.agents/CHANGELOG.md` commit. **The changelog and
`public/architecture/manifest.json` are EXPLICITLY permitted in the diff scope** — do not forbid them.
Merge `--no-ff` (squash banned). Drift gate must end `[OK]`.

---

## 4. SELF-VERIFICATION (literal evidence, not "build green")

Provide, verbatim:
1. **Baseline & final test counts** — the baseline number at `c9f34cf`; the final `baseline+N/baseline+N`
   after, stating N and what the new tests are.
2. **Production parity (2.1/A):** the existing routing tests (`backendAwareFilter`, `scopeTools`, the
   TD-13 recipe/OEE scoping tests, `supersetGate`) pass UNCHANGED, PLUS an explicit test that
   `filterToolsByMessage(tools, msg)` keyword-path output equals the pre-change output on a fixture that
   exercises each category (incl. a no-keyword-match). Paste the test name + result.
3. **Pure-core purity (2.2):** a test/`git grep` proving `routeKeywordLayer` and `routingSlice.ts` do not
   import or call `routerSelectCategories`, `learnToolMapping`, `loadCacheFromSupabase`, `ensureFreshCache`,
   `runExperiment`, or any streaming/gateway call. Paste the grep + result.
4. **AVAILABILITY FLOOR IN LAB (2.3, the security test):** a test that resolves a learned-map slice such
   that a query matches NO category, and asserts `routeKeywordLayer` returns `path='no-keyword-match'` with
   `offeredToolNames` STILL containing `ALWAYS_INCLUDE` (getFactoryList/getFactoryLines) and NOT empty.
   Paste name + result.
5. **NO-LEAK (2.5):** the extended no-leak test — plant a poison payload in `raw_tool_results`, assert it is
   absent from `JSON.stringify(response)` of the `routingReplay` path. Paste name + result.
6. **Honest router-path (2.4):** a test where the recorded turn matches no keyword and a tool was called →
   the response has `path='no-keyword-match'` and the UI renders the counterfactual note (NOT a regression
   warning). Paste name + result.
7. **Part B affordances preserved (D):** paste the RTL assertions proving, after your change, that on the
   detail panel — (a) expand/collapse-on-click still toggles, (b) user message + assistant reply + tool
   names still render, (c) the original-trace Langfuse anchor still renders when configured + graceful-offs
   when not, (d) the Grounding @ control still renders beside the new Routing @ control, (e) the redaction
   note still shows.
8. **Diff correctness:** a test where `floor` and `live` matched categories differ (a learned mapping adds a
   category match) and `floorDiff.added` reflects it.
9. **Drift `[OK]`** post-reseal + **`docVersion 46`** + the two-commit seal shas.
10. **Remote push confirmed** — `git rev-parse origin/master` after merge, reported (RULE 25: merge isn't
    done until pushed).
11. Independently recount tests 2/4/5/7 from raw output (do not trust the runner summary alone).

---

## 5. YOUR ACTION ITEMS (for Maymun)
- **None manual pre-build.** No migration (reads existing `messages` + `tool_cache` tables), no env var,
  no Operator DB apply.
- After AG merges: I (Architect) do the fresh-clone FULL review (security-relevant — the tool-router
  refactor + the recorded-turn read path). If review is green, the only optional live check is post-review
  UX confirmation: open a specimen detail, try Routing @ floor vs live, confirm the existing expand /
  content / original-trace-Langfuse affordances all still work — not a build gate.

If any step forces a manual action I did not list here, STOP and surface it as a new
"YOUR ACTION ITEMS" line rather than proceeding.
