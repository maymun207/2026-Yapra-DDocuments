# PHASE · ROUTE-HYGIENE-1 — stop the learned-map bleeding (write-narrowing + purge)

<!-- claude-code-PHASE-ROUTE-HYGIENE-1-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-approved.
     Relay to AG (Author lane) verbatim AFTER GOV-UNIFY-1 merges. Small, urgent. -->

**PLATINUM compliance:** deterministic code rules + one idempotent purge migration;
no manual curation required; the map self-heals its hygiene from now on.

**PRECONDITION (S47-1):** valid ONLY after the GOV-UNIFY-1 PR has merged. Anchor =
that merge hash: run `git rev-parse origin/master`, report it, and proceed only if
the GOV-UNIFY-1 merge commit is HEAD. On any other state: STOP and report.

## 0 · The verified problem (do not re-derive)
Production learns conversational junk every turn ("evet", "niye", "paylasmiyorsun",
"var?", "bilgiler" → 6-7 categories each; cache 338→342 in minutes). The F123
write guard EXISTS (`learnToolMapping` line ~389) but two structural holes remain:
1. **No token normalization** — "var?"/"olmali?"/"nedir?" carry punctuation into
   the learnability check and the cache key.
2. **No discrimination guard** — a token is learned mapped to the turn's ENTIRE
   matched category set; junk rows' signature is a BROAD set (6-7 categories),
   which carries zero routing signal and poisons future turns.
The flat ROUTING_STOPWORDS list can never enumerate Turkish conversation — the fix
is STRUCTURAL, not a longer list.

## 1 · G1 — write-path narrowing (`api/cwf/_lib/toolCategories.ts`)
- **Normalize before learnability:** strip leading/trailing punctuation
  (`[?!.,;:'"()]+`) from the candidate token; re-check length>2 AFTER stripping;
  the normalized form is both the guard input and the cache key. ("var?" → "var"
  → stopword/short → skipped.)
- **Broad-set guard (the big one):** if the turn's matched category set size is
  `> LEARN_MAX_CATEGORIES` (new code constant, value **3**), SKIP learning entirely
  for that turn — a mapping to 4+ categories is non-discriminative noise.
  Comment the constant as a candidate future governed param
  (`routing.learnMaxCategories`) — do NOT build the param now.
- **Born-loud summary (one line per turn, not per token):**
  `[ToolFilter] learn kept=N skipped_broad=M skipped_stopword=K` — replaces
  per-token spam when everything is skipped; keep the existing per-token
  "🧠 Learned" line ONLY for kept tokens.
- ROUTING_STOPWORDS: add the observed leak words ("evet","niye","tamam","hafta",
  "sadece","yerine","toplam","bilgiler","elinde","hakkinda","nedir","peki",
  "bugun","yarin","dun") — a modest top-up, NOT the primary fix (the broad-set
  guard is).

## 2 · G2 — purge migration (Operator-pending; AG authors, never applies)
`supabase/migrations/<ts>_tool_category_cache_hygiene.sql`:
- FIRST verify the cache table's real name/columns from the repo's own earlier
  migration that created it (do not guess; adapt the SQL to the actual shape).
- DELETE rows where (replicating the new guard in SQL):
  (a) keyword matches punctuation (`keyword ~ '[?!.,;:]'`) OR length(keyword) <= 2,
  (b) OR keyword IN (the expanded stopword list — inline the same literals),
  (c) OR the row's category array length >= 4 (the junk signature).
- Idempotent by construction (pure conditional DELETE; second run deletes 0).
- Bump the routing-cache epoch via the EXISTING epoch seam (the OBS-1
  ROUTING_CACHE epoch mechanism) so hot in-memory caches recycle without redeploy
  — reuse the established pattern, do not invent a new one.
- STATUS comment: authored, Operator-pending.

## 3 · G3 — tests
- "var?" → normalized "var" → not learned (punctuation+stopword).
- A 5-category turn → zero learns, summary line shows skipped_broad.
- A 2-category turn with a content token ("glazur") → learned, key normalized.
- Existing routing/learn suite stays green; migration second-run no-op stated.

## 4 · Ceremony (FULL, small diff)
`api/cwf/_lib/**` touched + one migration → reseal (docVersion bump, "below
diagram altitude", `npm run reseal`, `CI=1 npm run check:doc-drift` green).
Unsharded CI on the PR head is the sole arbiter (S37-2). Push → CI → Architect
FAST-GATE → merge `--no-ff` on GREEN CI → report remote HEAD. Migration is
Operator-applied after merge (FENCE-first prompt will follow from the Architect).

## 5 · What this is NOT
- Not the routing-architecture decision (flat vs graph/retrieval) — that is the
  separate ROUTING-ARCH design note, owner-decided; this phase only stops the
  bleeding so the current map stays usable until that decision.
- Not a Tool Matching UI change (1b comes after ROUTING-ARCH).

<!-- END · claude-code-PHASE-ROUTE-HYGIENE-1-v1 · rev 1 · 2026-07-18 -->
