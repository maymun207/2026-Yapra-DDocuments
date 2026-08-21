# Claude Code — TD-13 FIX · recipe↔zone category re-scoping
**Artifact:** `claude-code-TD-13-FIX-recipe-zone-scoping-v1.md` · **rev 1 · 2026-07-01**
**Lane:** Author (AG). **Type:** PHASE — bug-fix, closes a LIVE production failure. Merges to master (gated on architect verdict).
**Base:** master @ `44d5e74` (532 tests, docVersion rev 18). Start from master — the probe branch `td-13-probe-factory-category` is discarded, do NOT branch off it.

---

## 0. Diagnosis — CONFIRMED, do not re-litigate
TD-13 matched-pair (control = prod `f2d63ff2`, treatment = probe preview `584ee759`) proved:
- **Control** `[factory]`, gemini-2.5-flash, offered 4 flat (incl. `getZonesWithRecipeId*`): `finishReason=stop output=0 **empty=true**`.
- **Treatment** same route, `getZonesWithRecipeId*` removed, 2 flat: `finishReason=stop output=77 **empty=false**`.

Single controlled variable = the two `getZonesWithRecipeId*` tools in the offered set. Their **mere presence** (not being called) on a factory-topology query makes Gemini no-op. **Root cause = category scoping. Gemini is exonerated.** This is the SAME disease PHASE-F already treated for OEE — see the `metrics` category comment in `toolCategories.ts` (OEE poisoned by the `production` "confusables"; the fix was a tight intent-scoped category, NOT deletion).

## 1. THE FIX (principled, precedent-backed — the ONLY change)
`getZonesWithRecipeId` / `getZonesWithRecipeIdAndZoneTypes` are recipe→zone mapping tools = a RECIPE intent, not a factory-topology intent. The `production` category already owns every recipe tool (`createRecipe`/`getRecipe`/`reviewRecipe`/templates) and gates on `recipe`/`reçete`/`order` keywords.

- **Move** `getZonesWithRecipeId` and `getZonesWithRecipeIdAndZoneTypes` from `[factory].tools` → append to `[production].tools`.
- `[factory].tools` becomes exactly `['getFactoryList', 'getFactoryLines']` (both already in `ALWAYS_INCLUDE`, so factory-topology queries keep working — they simply stop offering the recipe-zone confusables).
- Do **not** delete the tools, do **not** touch their ARMES schemas (not owned in this repo), do **not** add any provider-specific path, do **not** change any keyword list in this phase.

## 2. HARD PRE-FLIGHT GATE (stop and report if any fails)
1. Clean working tree; on `master` at exactly `44d5e74`. Create branch `td-13-fix-recipe-zone-scoping` off master.
2. Confirm current `[factory].tools` = `getFactoryList, getFactoryLines, getZonesWithRecipeId, getZonesWithRecipeIdAndZoneTypes` (file `api/cwf/_lib/toolCategories.ts`, ~line 201-204).
3. Confirm current `[production].tools` contains the recipe tools and does NOT already contain either `getZonesWithRecipeId*`.
4. If either shape differs, STOP and report the actual lists — do not adapt or guess.

## 3. HARD CONSTRAINTS
- `toolCategories.ts` is the ONLY code file touched (plus the doc-manifest bump, §4). No floor/compose/eval-gate/trust/grounding logic. No keyword edits (the keyword edge case is a noted follow-up, out of scope here).
- Never read/write/print `.env*`, secrets, MCP tokens, governed tables.
- **empty≠zero floor untouched** — you are editing category membership only; the invariant `composeArmesContext([]) === renderArmesCriticalSlice()` must still hold, unchanged.

## 4. LIVING-DOC (below-altitude, RULE 23 NOT triggered)
This is a routing internal, below the architecture-diagram altitude. Bump the doc manifest **rev 18 → 19** with a review note: *"TD-13 fix: getZonesWithRecipeId* re-scoped from [factory]→[production] to stop Gemini empty-stop on factory-topology queries; no diagram-level change."* Do NOT edit any architecture diagram. Two-commit seal not required (single code area + manifest).

## 5. SELF-VERIFY (evidence demanded — paste each)
1. `git diff master --stat` → `toolCategories.ts` (+2 / −2 across the two category tool lists) + the manifest file. Paste the diff of the `[factory]` and `[production]` tool blocks.
2. Full suite green (≥532). **Add/adjust a unit test** on the category filter asserting: for a factory-only query (e.g. "fabrika listesi") the offered ARMES set **EXCLUDES** `getZonesWithRecipeId*`; for a recipe query (e.g. "reçete … hangi bölge") it **INCLUDES** them. Paste those two assertions' result lines.
3. Floor invariant test line still green (`composeArmesContext([]) === renderArmesCriticalSlice()`).
4. `git branch --show-current` = `td-13-fix-recipe-zone-scoping`; `git log master -1` still `44d5e74` (unmerged). Push → preview. Report preview `deploymentId` + URL + env-parity (key-set + live-backend confirmation).

## 6. LIVE VERIFICATION — architect-read, gates the merge (do NOT self-declare, do NOT merge first)
After the preview is READY, the human fires two queries against the preview URL with **Gemini selected**:
- **(a) Regression-of-the-bug:** the same `[factory]`-topology query that empties on prod. Expect `empty=false`, real answer.
- **(b) Regression-guard:** a recipe/production query that legitimately needs the zone-recipe tools (e.g. "X reçetesini hangi bölgeler çalıştırıyor"). Expect `empty=false` AND the `getZonesWithRecipeId*` tools present in the offered set — i.e. moving them to `production` did NOT poison production-routed Gemini completions.

The **architect** pulls the preview `[LLMFinish]` for both via the Vercel MCP and reads `empty`. **Merge to master ONLY after the architect confirms (a) clears and (b) shows no new empty.** You stop at the preview and await the verdict.
