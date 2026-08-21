# PHASE `BULK-REVIEW-1` — the ceremony dies; the gate stays

<!-- claude-code-PHASE-BULK-REVIEW-1-v1 · rev 1 · 2026-07-14 · Session 43. EMERGENCY — jumps the
     queue by owner demand. AG: park GOLDEN-BATCH-1 at its current GREEN sub-phase gate (if §3.C
     RulesTab work has started there, stash it — this phase owns RulesTab today); branch
     `bulk-review-1` from origin/master (expect 4b34552). Ceremony: FULL (api/** + src/**), NO
     migration, NO Operator lane. CI-green on PR head = merge precondition (S37-2).
     WHY, in one line: today the owner had to hunt 29 drafts through an unsearchable list and
     publish them one by one, with every rejection swallowed silently (F88) — the project's own
     automation-first law, violated by its own admin panel. The GOVERNANCE LAW does not move
     (every publish still runs the full server-side gate, per rule, audited); the CEREMONY
     collapses to one screen and one button.
     Findings folded in: F93 (stage-drafts: no loading state, vanishing toast, no server log) ·
     F95 (WRITE_PREFIX heuristic missed complete|empty|insert) · F96 (Rules list has no search) ·
     the [Gate] log line pulled FORWARD from the GATE-VISIBLE-1 design §3.C (that phase keeps the
     identity-bound single-publish verdict + audit drawer; no double work). -->

---

## 0 · PRE-FLIGHT GATE
```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master     # expect 4b34552; if moved, re-derive
npm ci --no-audit --no-fund --silent
npx tsc -b && npm run typecheck:api && npx tsx scripts/checkDocDrift.ts   # clean · [OK]
npx vitest run --reporter=dot                    # RECORD count/files (UNSHARDED; expect 2285/231)
```

## 1 · BINDING CONSTRAINTS
1. **The gate does not move.** `evalGate.ts`, `governance.ts` publish logic, stage order, audit
   writes — byte-identical (empty diff, listed). Bulk = a server-side LOOP that calls the
   EXISTING `RuleGovernanceService.publish` per rule. Zero new gate semantics.
2. **Per-rule failure is DATA, not transport.** The bulk endpoint returns **HTTP 200 always**,
   body = ordered per-rule results. This sidesteps the 422-throw/swallow class (F88) entirely
   for the bulk path. (Single-publish 422 contract untouched — GATE-VISIBLE-1's territory.)
3. **[Gate] log line** (S40-5 bounded, ADR-007): emitted for EVERY publish attempt — single AND
   bulk — in the endpoint layer:
   `[Gate] action=publish kind=<kind_id> key=<key> rule=<id8> verdict=published|rejected|error stage=<failedStage|-> reason="<first error ≤120c>" ms=<int>`.
   Never payload contents.
4. **No migration. No Operator lane. C1 LAW.** SoD unchanged: bulk requires the same
   super_admin permission as single publish. Cap: ≤100 ids per call; strictly sequential in the
   given order (the gate re-validates the whole candidate each time — order is meaningful).
5. **Exposure edit rides the EXISTING draft-update path** (`updateDraft`); no new write door.
6. **Born loud (S41-1):** every result renders PERSISTENTLY on screen until dismissed — toasts
   may accompany, never substitute. Every long operation shows a working state.
7. GOLDEN-BATCH-1's files are not touched; this branch must merge independently.

## 2 · SUB-PHASES (gated)

### A · Server
1. `POST /api/admin/rules/bulk-publish` — body `{ ruleIds: string[], reason?: string }`.
   Loop in order → `svc.publish(userId, id, reason ?? 'bulk-panel')` → collect
   `{ ruleId, key, kindId, published, failedStage?, errors: string[], error?: string }`
   (the `error` field carries the `!r.ok` early-return message when that path fires).
   Response `200 { results }` always. Each rule's audit row is written by the existing service —
   assert with a test that N rules ⇒ N audit inserts, shapes unchanged.
2. The `[Gate]` line (constraint 3) via one tiny helper used by BOTH `api/admin/rules/[id].ts`
   (publish action) and the bulk loop.

**Gate A:** endpoint tests — order preserved · partial failure (mix of pass/reject/not-found)
returns 200 with correct per-rule fields · SoD 403 for non-super_admin · cap 400 over 100 ids ·
log-spy: one bounded `[Gate]` line per attempt, rejection reason present, no payload text.

### B · Client — the review console
1. Rules tab, third segment: **All rules | Ready (N) | Staged drafts (N)**. The staged view is a
   TABLE of every DRAFT for the selected backend:
   `[✓] key · kind chip · summary · status`
   - annotation rows: summary = an **inline exposure select (read/write)** persisting via
     `updateDraft` on change (fixes today's three misclassifications in three clicks);
   - category rows: summary = tools diff vs published (`+added / −removed`);
   - other kinds: first-line payload summary.
2. Toolbar: **search box (key substring)** · select all / none · **"Publish selected (run
   gate)"** with spinner + disabled state while running.
3. On run: call bulk once; fill status cells from results — ✓ `Yayınlandı vN` / ✗ `failedStage`
   + the FULL error strings, rendered in the row and kept until the view is left. A summary
   strip: `18 yayınlandı · 2 reddedildi — hatalar aşağıda`.
4. **The same search box added to the main left list** (F96) — plain substring filter on key.
5. **Stage-drafts button (F93):** spinner while running; response rendered as a PERSISTENT
   result panel above the table (`annotationsStaged / categoryDraftsStaged / writeWithheld[]`),
   not a toast.
6. `WRITE_PREFIX` (F95): extend with `complete|empty|insert|finish|cancel|reset|execute|submit|
   approve|reject|close|open|assign` — proposal-only constant; drafts remain the object.

**Gate B:** jsdom — search filters both lists · exposure select persists via updateDraft ·
results persist after render (RED-first: on the anchor, a rejected publish leaves NO on-screen
trace; on HEAD the reason is visible) · summary strip counts correct · loading states assert.

### C · Docs + reseal
CHANGELOG + KB: the review-console flow; the permanent per-backend onboarding cost statement
(connect → auto-sync → 1-click drafts → one review screen → one gated bulk publish).

## 3 · WHAT MUST NOT MOVE
Gate engine + `governance.ts` publish internals (empty diffs, listed) · single-publish HTTP
contract · audit row shapes/counts per publish · draft lifecycle semantics · ready-queue view ·
GOLDEN-BATCH-1 branch content · chat/turn path (grep: no new imports).

## 4 · SELF-VERIFICATION (paste each)
1. Anchor · branch · PR URL · CI green on head.
2. Empty-diff proof on gate/governance publish internals (file list).
3. Gate A + Gate B test outputs; the RED-first absence→presence pair.
4. `[Gate]` sample lines from a local run (published + rejected + error).
5. N-rules ⇒ N audit-rows test output.
6. UNSHARDED count vs anchor (+new only) · tsc · typecheck:api · drift/reseal rev.

## 5 · ACCEPTANCE (the owner's own session, replayed)
1. Rules list is searchable; the 29 are findable in seconds.
2. Staged view: fix three exposures with three selects; select all; ONE click publishes the
   batch; every verdict and every rejection reason is on screen and stays there.
3. A future MCP backend's total human cost: connect → (auto sync) → one click drafts → ~2
   minutes on one screen → one click publish-all. Nothing else.
4. The Architect can read every gate decision from Vercel logs (`[Gate]` lines).

<!-- END · claude-code-PHASE-BULK-REVIEW-1-v1 · rev 1 · 2026-07-14 -->
