# Claude Code — TD-13 PROBE · [factory] category · getZonesWithRecipeId\*
**Artifact:** `claude-code-TD-13-probe-factory-category-v1.md` · **rev 1 · 2026-07-01**
**Lane:** Author (AG). **Type:** diagnostic PROBE — NOT a phase, NOT a fix, MUST NOT merge to master.
**Base:** master @ `44d5e74` (532 tests, docVersion rev 18).

---

## 0. What this is (read before touching anything)
OBS-2 (PR #19 `b8a0e6d`) established that the Gemini `[factory]` failure is a **clean empty-stop**: live trace `3e45d14e` showed `finishReason=stop`, `warnings=0`, `empty=true` — not safety, not length. Open question TD-13: **is the empty driven by the `[factory]` tool-category composition — specifically the `getZonesWithRecipeId*` tools — rather than by the Gemini model itself?**

This probe removes those tools from the `[factory]` category on a throwaway branch, ships a **preview** deployment, and lets the architect read `[LLMFinish]` off that preview to see whether `empty=true` clears. **You are not fixing anything.** If the hypothesis confirms, the real fix is a separate, proper phase. This branch is discarded either way.

---

## 1. HARD PRE-FLIGHT GATE (stop and report if any fails)
1. Working tree clean; you are on `master` at exactly `44d5e74`.
2. Create and switch to a NEW branch off master: `td-13-probe-factory-category`. **Never commit to master.**
3. Locate the `[factory]` tool-category definition (expected: `toolCategories.ts`). Confirm it exists and contains **≥1** entry whose name matches `getZonesWithRecipeId*`.
   - If the file path, the category key (`factory`), or the presence of `getZonesWithRecipeId*` entries differs from the above, **STOP** and report the actual shape (file, category keys, the exact tool names present). Do NOT guess or "adapt" — the architect re-scopes.

## 2. THE PROBE (single, minimal change)
- In the `[factory]` category, **remove every tool entry whose name matches `getZonesWithRecipeId*`** (remove ALL matches — there may be one or several).
- Change **nothing else**: no other category, no other file, no formatting churn, no test edits, no compose/floor logic, no docVersion/manifest bump (this never lands — roadmap altitude untouched, RULE 23 not triggered).

## 3. HARD CONSTRAINTS
- This is a PROBE, not a FIX. Do not "clean up" or "improve" the category. Do not remove anything beyond the `getZonesWithRecipeId*` matches even if something else looks redundant.
- Do NOT merge, do NOT open a PR against master, do NOT delete the removed entries anywhere except the `[factory]` membership list (the tool definitions themselves stay).
- Do NOT read/write/print `.env*`, secrets, MCP tokens, or governed tables.
- **empty≠zero floor is not your target and must stay intact.** You are editing category *membership*, not `composeArmes`/floor. Confirm the floor invariant test still passes unchanged: `composeArmesContext([]) === renderArmesCriticalSlice()`.

## 4. DEPLOY (preview only)
- Push `td-13-probe-factory-category` so Vercel produces a **preview** deployment.
- Report the preview **`deploymentId`** and the preview **URL**.
- Confirm the preview inherits the same runtime env as production (MCP settings under `ksadmin`, ARMES + Superset backends reachable, Gemini provider configured). **If the preview env differs from production in any of these, say so explicitly** — an isolated/degraded preview invalidates the repro.

## 5. SELF-VERIFY (evidence demanded — paste each)
1. `git diff master --stat` → exactly **one** file changed (`toolCategories.ts`), only removals from the `[factory]` list, **0** other edits. Paste it.
2. `git branch --show-current` → `td-13-probe-factory-category`. `git log master -1 --oneline` → still `44d5e74`. Paste both.
3. The exact names of the removed `getZonesWithRecipeId*` entries.
4. Full test suite green — and specifically the floor invariant test (`composeArmesContext([]) === renderArmesCriticalSlice()`). Paste that test's result line.
5. Preview `deploymentId` + URL, and the env-parity confirmation from §4.

## 6. Handoff (do NOT do this yourself)
Once you report the preview `deploymentId`, the human fires the single `[factory]`-routed Gemini repro query (the one that produced the `3e45d14e`-class empty-stop) against the preview URL. The **architect** then pulls that preview's runtime logs via the Vercel MCP, greps `[LLMFinish]`, and reads `empty`. You do not read logs and you do not merge. Await the verdict.
