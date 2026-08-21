# HOTFIX F123-STOPWORD-GUARD-1 — stopword guard on learned-map writes AND loads
<!-- claude-code-HOTFIX-F123-STOPWORD-GUARD-1-v1 · rev 1 · 2026-07-16 · Architect-authored, S47 -->
<!-- PLATINUM compliance: existing DB junk rows are neutralized at LOAD time by the same guard —
     no manual cleanup, no Operator visit, no migration. Self-configuring on next deploy. -->
<!-- INTERIM fix by design: the real fix is SR-1 semantic routing (M3). Do not widen scope toward it. -->

**IDENTITY CHECK (mandatory first output line):** Print `[AG-B] F123-STOPWORD-GUARD-1 · clone=<absolute path> · origin/master=<hash>` before any work. If you are not AG-B, STOP.

**Profile: HOTFIX (S43-2).** Single-surface (`toolCategories.ts` + tests), no api-contract/migration/security change. Targeted tests only, single pass. CI (unsharded) is the sole test arbiter.

**Isolation (S44-1/S46-2):** Work ONLY in your own absolute-path fresh clone below. AG-A is concurrently on `hotfix/f122-retry-error` touching `completionGuard.ts`/`stageStream.ts` — your diff must not touch those files. One live writer per worktree.

---

## 0 · Pre-flight (hard gate — all must hold or STOP and report)

```bash
mkdir -p /tmp/agB-f123 && cd /tmp/agB-f123 && rm -rf cwf_yaprak
git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master        # ANCHOR must be 5cb873f629ddc7e953f952625dda47abff96db6e
```
(If AG-A's F122 merged first and master moved: rebase mentally — anchor may be the F122 merge commit; verify your diff still touches ONLY the files named here.)

Grep-verify the surface (pinned at authoring; any miss → STOP):
1. `api/cwf/_lib/toolCategories.ts` — `extractKeywords` filters only `w.length > 2` (line ~347): no stopword filtering exists.
2. Same file — router-fallback learn loop (line ~591-ish): `const words = extractKeywords(userMessage); for (const word of words) { learnToolMapping(word, routerCats); }` — EVERY surviving token is learned.
3. Same file — `loadCacheFromSupabase` populates `learnedMappings.set(row.keyword, row.categories)` (line ~290) with no filtering: existing junk rows re-arm on every cold start.

## 1 · Problem (live evidence, register v48)

One router-fallback turn learned five Turkish stopwords each to 8 categories. Because `matchCategories` is learned-first and unions across matched keywords, any future message containing those stopwords explodes the offered set (observed: 62-tool offers). Pollution is BOTH in-memory and persisted in the tool cache table.

## 2 · Change spec (exact, minimal — one source file + tests)

**C1 — stopword set (module const in `toolCategories.ts`):**
- `const ROUTING_STOPWORDS: ReadonlySet<string>` — lowercase TR + EN function words that must never become learned keys. Include at minimum: TR — `için, gibi, ile, olan, olarak, veya, ama, fakat, ancak, çünkü, daha, çok, olan, şey, bana, bunu, şunu, nedir, nasıl, neden, hangi, kaç, midir, mıdır, acaba, lütfen, biraz, bütün, tüm, her, bir, iki, son, göre, kadar, sonra, önce, üzerinden, hakkında, ilgili, verir, misin, musun, göster, getir, listele`; EN — `the, and, for, with, this, that, what, which, how, why, when, where, please, show, give, list, get, about, from, into, over, all, any, are, was, can, could, would, tell, does`.
  (Verbs like `göster/listele/show/list` are intent words, not content words — they must not map to categories. Keep the set flat, sorted, commented as INTERIM pending SR-1.)
- Single guard predicate: `function isLearnableKeyword(w: string): boolean` = `w.length > 2 && !ROUTING_STOPWORDS.has(w)` (word already lowercased by extractKeywords/loader).

**C2 — WRITE guard:** in the router-fallback learn loop, learn only words passing `isLearnableKeyword`. If ZERO words survive, log `[ToolFilter] 🧠 Learn skipped: all N keywords are stopwords` and learn nothing (the router's categories still serve THIS turn unchanged).

**C3 — LOAD guard (neutralizes existing DB junk, PLATINUM):** in `loadCacheFromSupabase`, skip rows whose `row.keyword` fails `isLearnableKeyword`; count and log once: `[ToolCache] N stopword rows ignored at load`. Do NOT delete DB rows — inert junk is harmless and SR-1 replaces this layer anyway.

**C4 — defense-in-depth (cheap):** also apply the guard inside `learnToolMapping` itself (early-return before set/upsert), so no future caller can re-introduce the pollution path.

**C5 — tests (`api/cwf/__tests__/` — new file `stopwordGuard.test.ts` is fine, vitest include covers this dir):**
  a. `isLearnableKeyword`: TR stopword → false; EN stopword → false; real content word (`fırın`, `duruş`, `oee`) → true; length ≤ 2 → false.
  b. Learn-loop behavior: message of pure stopwords → `learnToolMapping` never persists (spy on repo upsert / assert map unchanged); mixed message → only content words learned.
  c. Load guard: seeded rows containing a stopword key → absent from `learnedMappings` after load; content-word rows present.
  d. Regression: `matchCategories` with a learned map containing NO stopwords behaves byte-identically on a normal query (reuse an existing fixture pattern from `routeKeywordLayer.test.ts`).

## 3 · Binding constraints
- Do NOT touch: `completionGuard.ts`, `stageStream.ts` (AG-A's surface), CATEGORIES/ALWAYS_INCLUDE data, `matchCategories` semantics, router prompt, repositories, migrations, env.
- `extractKeywords` itself stays unchanged (it also feeds matching; filtering there would change MATCH behavior, not just learning — out of scope). Guard only learn/load/learnToolMapping.
- Deterministic only — no LLM involvement in the guard.

## 4 · Verify (targeted, HOTFIX)
```bash
npx vitest run api/cwf/__tests__/stopwordGuard.test.ts api/cwf/__tests__/routeKeywordLayer.test.ts \
  api/cwf/__tests__/routeGovIntegration.test.ts api/cwf/__tests__/routeGovCharacterization.test.ts \
  api/cwf/__tests__/toolReachability.test.ts api/cwf/__tests__/resolveToolCategories.test.ts \
  api/cwf/__tests__/backendAwareFilter.test.ts api/cwf/__tests__/categorySlice.test.ts
npm run check:doc-drift   # must stay [OK]
npm run typecheck:api
```

## 5 · Branch & report (NO merge — Architect gates)
- Branch: `hotfix/f123-stopword-guard` → push → open PR. CI unsharded green = precondition (S37-2).
- Report literally: remote head hash · `git diff --stat <anchor>..HEAD` · vitest tail · doc-drift line · the full ROUTING_STOPWORDS set as committed.
- Merge only after Architect GO, `--no-ff`, verbatim message:
  `Merge F123-STOPWORD-GUARD-1: deterministic stopword guard on learned-map write+load (interim until SR-1)`

## 6 · Self-verify checklist (evidence, not claims)
- [ ] Anchor verified at clone; diff touches ONLY `toolCategories.ts` + test file(s) — paste `--stat`.
- [ ] Guard applied at all three points (learn loop, `learnToolMapping`, `loadCacheFromSupabase`) — paste the three guarded lines.
- [ ] Pure-stopword message learns NOTHING and still gets router categories for the turn — paste the test name + pass line.
- [ ] Load ignores seeded junk rows without deleting — paste test name + the log-line assertion.
- [ ] doc-drift `[OK]`.

<!-- END · claude-code-HOTFIX-F123-STOPWORD-GUARD-1-v1 · rev 1 · 2026-07-16 -->
