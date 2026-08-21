# PHASE LEARN-NORM-1 — learn-key normalization SSOT (closes F144 / F123 bypass)

<!-- claude-code-PHASE-LEARN-NORM-1-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Executor: AG (Claude Code). Standalone phase (batch partner BOARD-WALK parked by owner). -->

## 0 · PRECONDITION (S47-1 — check FIRST, before any work)

Valid ONLY while:
- `origin/master == 0addcd774911addcdc21d559c67c089e2799438d` (Merge PHASE SC-2), AND
- no OPEN PR touches `api/cwf/_lib/toolCategories.ts` or `api/cwf/_lib/turn/stageTools.ts`.

On ANY mismatch: **STOP and report the actual state.** Do not adapt, do not rebase, do not improvise.

## 1 · Context — F144 (prod-evidenced)

The F123 stopword guard is silently bypassed on the **semantic-success learn path**:

- `api/cwf/_lib/turn/stageTools.ts` (self-learning block, ~:293-299) tokenizes
  `ctx.message` with a raw `split(/\s+/)` — **no punctuation strip** — unlike
  `extractKeywords` (`api/cwf/_lib/toolCategories.ts` ~:427-433, which strips `[?.,!;:'"]`).
- Punctuation-suffixed tokens (`'list?'`) therefore miss the `ROUTING_STOPWORDS`
  Set lookup inside `learnToolMapping`'s defense-in-depth check (~:404-410) and
  **persist**. This defeats the ENTIRE guard, Turkish included (`nedir?` / `kaç?` class).
- The load-side legacy ignore (~:365-373) uses the same unnormalized lookup, so it
  does NOT self-heal these keys.
- Secondary gap: `'you'`, `'bring'` are absent from the English section of
  `ROUTING_STOPWORDS`.

Prod evidence: trace=82b7d6b3, 2026-07-19T22:08:42Z, learned `you / bring / list?`
→ `[factory]`. Pollution at mint: exactly these 3 keys (log-verified). One polluted
keyword unions its categories into every future message containing it — it also
contaminates the open traffic-window's ADD-1/proposal evidence pool, so this fix
PROTECTS the evidence-class declaration (it repairs an already-ratified guard).

**Line numbers above are anchors at `0addcd7` — locate by content, never trust the number blindly.**

## 2 · Profile & compliance

- **Ceremony: FULL** (touches `api/**`). Per S37-2/S43-2: AG runs targeted tests
  locally; **unsharded CI on the PR head is the SOLE test arbiter**; Architect
  reviews FAST-GATE; merge only after Architect GO under CI-green.
- **PLATINUM compliance:** the fix is self-healing — junk rows die at load
  automatically (zero manual DB cleanup); zero required manual/config steps for
  any human are introduced.
- No migration. No client (`src/**`) changes. No secrets. No gate machinery.

## 3 · Binding constraints

1. Production files touched: **exactly** `api/cwf/_lib/toolCategories.ts` and
   `api/cwf/_lib/turn/stageTools.ts`. Plus: test files, `.agents/` ledger APPEND
   (E-DOC-1 pattern; S53-1 forbids compaction), and the doc-drift
   manifest/docVersion reseal IF the gate flags (expect rev 115; reseal in the
   final commit on the final tree). Nothing else.
2. `git diff --name-only 0addcd7..HEAD -- supabase/` must be EMPTY (no migrations).
3. Eval-gate, gateway.ts, prompt segments, provider registry, trust line: untouched.
4. The ROUTE-GOV-1 v2_2 §3.A.6 idempotent-silent semantics (same-categories →
   no log, no upsert) stay byte-equivalent for normalized keys. The upsert/repo
   path itself is unchanged.
5. `extractKeywords` becomes the ONE tokenizer: after this phase, no second
   ad-hoc message tokenizer may remain at the stageTools learn site (grep-proof
   required in §5).
6. The `ROUTING_STOPWORDS` "do not widen toward general NLP lists" comment stays
   intact; the top-up is exactly `'you'`, `'bring'` with a one-line F144 citation.
7. No new dependencies. S32-1: grep-verify every npm script name from
   `package.json` before running it (test runner, reseal script) — never guess.
8. Naming-collision grep before coding: `grep -rn "LearnVerdict\|LEARN-NORM" src api shared`
   must show no pre-existing uses.

## 4 · Gated sub-phases (complete each gate before the next)

### G0 — Pre-flight (hard gate)
- Fresh clone (or clean tree) → `git rev-parse origin/master` → MUST print
  `0addcd774911addcdc21d559c67c089e2799438d`. Paste it.
- `npm ci` → grep `package.json` for the exact test + reseal script names; paste
  the grep lines.
- Locate all five anchors from §1 by content; paste the surrounding 2-3 lines of
  each as proof of correct location.
- Branch: `learn-norm-1` off master.

### G1 — Normalization SSOT at the persist choke point (`toolCategories.ts`)
- Export `extractKeywords` (currently module-private).
- `learnToolMapping(keyword, categoryNames)`:
  - Normalize FIRST: `const tokens = extractKeywords(keyword)`. If
    `tokens.length !== 1` → return `'skipped_short'` (covers empty-after-strip,
    multi-token junk, and length ≤ 2 via extractKeywords' own filter). Else
    `key = tokens[0]`.
  - Then the existing checks in order: `!isLearnableKeyword(key)` →
    `'skipped_stopword'`; `sameCategories(...)` → `'skipped_same'`; otherwise
    learn/log/upsert exactly as today → `'learned'`.
  - Return type: `Promise<LearnVerdict>` where
    `type LearnVerdict = 'learned' | 'skipped_stopword' | 'skipped_same' | 'skipped_short'`.
    (void → value is additive; existing callers that ignore the return stay valid.)
- The `🧠 Learned:` log line now always prints the NORMALIZED key.

### G2 — Call-site unification + once-per-turn aggregate (`stageTools.ts`)
- Replace the raw `ctx.message.toLowerCase().split(/\s+/)...` tokenization with
  `extractKeywords(ctx.message)` (import from `../toolCategories.js`).
- Hoist the learn block to run **at most once per turn**: guard with a
  turn-local boolean (e.g. `let learnedThisTurn = false` in the enclosing turn
  scope), set on first successful MCP tool call when
  `ctx.matchedCategories.length > 0`. Behavior-equal justification: §3.A.6
  idempotent-silent already made per-round repeats no-ops; this removes the
  redundant loops without changing WHAT is learned.
- Aggregate the verdicts across the words and emit exactly ONE line per turn:
  `[ToolFilter] learn kept=K skipped_stopword=S skipped_same=Q skipped_short=T path=semantic`
  — mirrors the fallback aggregate (~`toolCategories.ts:862`) so the
  `learn kept/skipped` watch covers BOTH learn paths. Do NOT alter the fallback
  path's existing line format.

### G3 — Load-side self-heal (`toolCategories.ts` load block ~:365-373)
- For each stored row key `k`:
  - `const t = extractKeywords(k)`; if `t.length !== 1 || t[0] !== k` → count as
    ignored (**legacy-junk**, e.g. `'list?'`, `'oee?'`) — do NOT merge/rewrite
    under the normalized key (write side now emits only normalized keys;
    unnormalized rows are strictly pre-fix legacy).
  - else if `!isLearnableKeyword(k)` → count as ignored (existing stopword case;
    catches `'you'`/`'bring'` once G4 lands).
  - else load as today.
- Extend the existing `[ToolCache] N stopword rows ignored at load` line to
  `[ToolCache] N stopword/legacy rows ignored at load`. Grep first for any test
  pinning the old wording; update such pins in the same commit.

### G4 — Stopword top-up (`ROUTING_STOPWORDS`)
- Add `'you', 'bring'` to the English section with a one-line comment:
  `// F144: observed production-leak top-up (ROUTE-HYGIENE-1 precedent).`
- Nothing else added; surrounding comments untouched.

### G5 — Tests (under `api/cwf/__tests__/` — Vitest include covers it)
Extend `stopwordGuard.test.ts` (+ a stageTools-side test where it naturally fits):
- (a) `learnToolMapping('list?')` and `learnToolMapping('nedir?')` →
  `'skipped_stopword'`; no map entry, no upsert (mock/spy repo).
- (b) `learnToolMapping('oee?')` → `'learned'`, stored under `'oee'`.
- (c) Load with stored rows `['list?','you','oee?']` (+ one clean row) →
  ignored count = 3, served map contains only the clean row; log line contains
  `stopword/legacy rows ignored at load`.
- (d) Idempotent-silent pin: `'oee'` learned twice with identical categories →
  second call returns `'skipped_same'`, exactly one log + one upsert.
- (e) `learnToolMapping('ab?')` → `'skipped_short'`.
- (f) stageTools characterization: a turn with message
  `"can you bring the factory list?"` and 2 tool calls in one turn emits the
  aggregate line EXACTLY once, with `kept=1 skipped_stopword=3` (factory kept;
  can/you/bring/list all stopword after G4 — note `the` is 3 chars and a
  stopword too; assert the exact counts your tokenization yields and justify).
- Run the TARGETED tests + immediate neighbors locally (paste tail). Full local
  suite optional — CI arbitrates.

### G6 — Ledger + drift
- Append `.agents/` CHANGELOG entry (E-DOC-1 pattern) + one skill-KB line:
  F144 / LEARN-NORM-1, one paragraph, append-only.
- Run the drift gate. If `toolCategories.ts`/`stageTools.ts` are mapped →
  reseal docVersion (expect rev 115) via the grep-verified reseal script, in the
  FINAL commit on the final tree. Paste gate output either way.

## 5 · Self-verify checklist (paste literal evidence for every line)

1. G0 `git rev-parse origin/master` output == `0addcd77…438d`.
2. Branch `learn-norm-1` head SHA + PR number + CI run link + **CI GREEN (unsharded)**.
3. `git diff --stat 0addcd7..HEAD` — only §3.1 paths.
4. `git diff --name-only 0addcd7..HEAD -- supabase/` — empty.
5. Grep proofs:
   - `grep -n "split(/\\s+/)" api/cwf/_lib/turn/stageTools.ts` → no hit in the learn block;
   - `grep -n "export function extractKeywords" api/cwf/_lib/toolCategories.ts` → exactly 1;
   - `grep -rn "LearnVerdict" api | wc -l` → plausible small count, all new sites;
   - `grep -n "you'\|'bring'" api/cwf/_lib/toolCategories.ts` → inside ROUTING_STOPWORDS with the F144 comment.
6. New/updated test names listed with file paths; targeted vitest tail pasted.
7. Drift-gate output pasted ([OK], or reseal commit showing rev 115).
8. One-line PLATINUM statement confirming no manual step was introduced.

## 6 · Report & merge protocol

- Push branch, open PR to master, post the full §5 evidence block. **Do NOT merge.**
- Architect runs FAST-GATE review on the PR head, then issues GO. Upon GO — and
  only upon GO — merge `--no-ff` (squash banned) with this verbatim message:

  `Merge PHASE LEARN-NORM-1: learn-key normalization SSOT closes F123 bypass (F144) + load self-heal + stopword top-up + learn-watch parity`

- Post-merge verification is Architect-side (automation-first): Claude reads prod
  logs for (i) `stopword/legacy rows ignored at load` count ≥ 3 and (ii) the
  first semantic-path `learn kept=… skipped_…` aggregate line. No owner steps.

<!-- END · claude-code-PHASE-LEARN-NORM-1-v1 · rev 1 · 2026-07-20 -->
