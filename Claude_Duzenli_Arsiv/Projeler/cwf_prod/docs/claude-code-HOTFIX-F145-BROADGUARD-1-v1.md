# HOTFIX F145 — BROADGUARD-1: LEARN_MAX_CATEGORIES on the stagetools learn path

<!-- claude-code-HOTFIX-F145-BROADGUARD-1-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     LANE A (AG-A), runs BEFORE IR-2. F144's sibling: a ratified guard silently
     absent on the semantic-success learn path. -->

## 0 · PRECONDITION (S47-1, parallel-lane form)
Anchor: `origin/master == a6f8393f4a656d731168ad289730838a48994471` (Merge S54-POLISH-2).
If advanced: name-only diff must not touch `api/cwf/_lib/toolCategories.ts` or
`api/cwf/_lib/turn/stageTools.ts` → rebase + paste proof + proceed; else STOP.
**Lane note:** LANE B's in-flight IR-1 also edits `stageTools.ts` — this hotfix
merges FIRST (it is tiny); IR-1's own §0 obliges it to rebase + reseal on the
merged tree afterwards. Do NOT wait for IR-1.

## 1 · F145 (tree-verified premise)
`LEARN_MAX_CATEGORIES = 3` (toolCategories.ts ~:520, ROUTE-HYGIENE-1's ratified
"4+ matched categories = non-discriminative, whole-turn learn skip" law) is
enforced ONLY at the router-fallback learn block (~:877). The stageTools
semantic-success block (~:300) gates only on `length > 0` — prod evidence
traces `f61f9c42` (4 categories → learned 14 keys, each unioning all 4) and
`bd4a1ab4` (5 categories → learned 4). Every such key unions its category set
into every future message containing it — the exact pollution class the purge
+ ROUTE-HYGIENE-1 exist to stop, and it contaminates the traffic window's
evidence pool. Fixing a ratified guard's bypass PROTECTS the window (the F144
precedent); this is not keyword-layer re-litigation.

## 2 · Work items
**W1 · Hoist the guard (ONE SSOT — the F144 lesson):**
- `toolCategories.ts`: `export` the existing `LEARN_MAX_CATEGORIES` constant
  (value unchanged; comment stays "code floor, not a tunable"). No second
  constant anywhere.
- `stageTools.ts` learn block: when `ctx.matchedCategories.length > LEARN_MAX_CATEGORIES`
  → set `learnedThisTurn = true` (no re-check on later tool calls), SKIP the
  word loop entirely (zero `learnToolMapping` calls), and emit the aggregate
  ONCE with the fallback path's vocabulary:
  `[ToolFilter] learn kept=0 skipped_stopword=0 skipped_same=0 skipped_short=0 skipped_broad=<extractKeywords(ctx.message).length> path=stagetools`
- The NORMAL-case (≤3 categories) aggregate line stays **byte-identical** to
  POLISH-1's shape (no `skipped_broad=` token there — the existing
  `learnNormStageTools.test.ts` pin must pass UNCHANGED for that case).

**W2 · Rider — `'icin'` top-up:** add `'icin'` to the ROUTE-HYGIENE-1 ASCII
top-up section of `ROUTING_STOPWORDS` (~:489 — `'hakkinda','bugun','dun'` are
the in-list precedent for ASCII forms) with a one-token comment `// F145`.
Nothing else added.

## 3 · Constraints
1. Files: exactly `api/cwf/_lib/toolCategories.ts` + `api/cwf/_lib/turn/stageTools.ts`
   + tests + `.agents/` APPEND + reseal (both files are MAPPED — expect
   docVersion **rev 117**, final commit, grep-verified script name).
2. `git diff --name-only a6f8393..HEAD -- supabase/ shared/ src/` EMPTY (api+tests+ledger+manifest only).
3. Fallback learn block (~:841-880) byte-untouched. `learnToolMapping` itself
   byte-untouched. Ceremony: **FULL** (api touch); unsharded CI = sole arbiter.

## 4 · Tests
(a) 4-category turn: ZERO `learnToolMapping` calls (spy), broad aggregate line
fires EXACTLY once with `skipped_broad=` = the message's extractKeywords count.
(b) 3-category turn: learns normally; aggregate line byte-identical to the
existing pin (prove by the UNCHANGED pre-existing test passing). (c) 5-category
+ 2 tool calls: still exactly one broad line (learnedThisTurn holds). (d)
`learnToolMapping('icin')` → `skipped_stopword`. (e) Fallback block untouched:
`git diff` shows no hunk in ~:841-880 (paste excerpt).

## 5 · Self-verify (literal evidence)
1. Rev-parse (+advance proof if any). 2. Head SHA + PR # + **CI GREEN link**.
3. `git diff --stat` + §3.2 empty proof. 4. Grep: exactly ONE
`LEARN_MAX_CATEGORIES` definition, TWO consumers (fallback + stagetools).
5. Test outputs for (a)-(e). 6. Reseal output (rev 117). 7. PLATINUM line
(zero manual steps; guard self-applies).

## 6 · Report & merge
Push branch `f145-broadguard`, open PR, post §5. **Do NOT merge** → Architect
FAST-GATE → GO. Upon GO, `--no-ff` with exactly:

`Merge HOTFIX F145: LEARN_MAX_CATEGORIES broad-set guard on the stagetools learn path + icin top-up`

Post-merge: delete the branch. Architect reads the next broad prod turn for the
`skipped_broad=` line; F145 → CLOSED@ on that evidence. Then LANE A proceeds to
`claude-code-PHASE-IR-2-v1`.

<!-- END · claude-code-HOTFIX-F145-BROADGUARD-1-v1 · rev 1 · 2026-07-20 -->
