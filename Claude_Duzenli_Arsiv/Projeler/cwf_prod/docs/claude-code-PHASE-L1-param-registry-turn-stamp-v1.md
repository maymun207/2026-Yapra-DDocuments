# PHASE L1 — PARAM-REGISTRY + TURN CONFIG-FINGERPRINT · v1
<!-- claude-code-PHASE-L1-param-registry-turn-stamp-v1 · rev 1 · 2026-07-09 · Author lane (AG).
     Implements the APPROVED design cwf-L1-param-registry-turn-stamp-design-v2 (its §0 D1/D2/D3
     decisions are LAW for this phase; the design's §2 line-anchored ground truths were verified
     at `470eb7b`). EAIP-LIFECYCLE phase L1 = program HC-1/HC-2 constraints apply throughout.
     SECURITY-RELEVANT (new backend lane, hot-path resolver, telemetry column) → FULL REVIEW.
     Migration + seed are TWO-DOOR: AG authors, Operator applies — never claim "applied".
     This prompt was written by the Architect, NOT AG — do not redesign or re-split it.
     ONE clarifying design question before implementing is fine. -->

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any change)

- [ ] Fresh clone; `git rev-parse origin/master` == **`470eb7b…`**. Baseline suite green — paste literal count (expected **1318/1318 across 128 files**; lower ⇒ STOP).
- [ ] `npm run check:doc-drift` → paste the `[OK]` line on the untouched clone.
- [ ] Read design v2 sections **§0 (D1/D2/D3), §4 (single pure chain), §5 (fingerprint mechanics), §9 (non-goals)** — quoted below where binding; the design file itself is Architect-side (NOT in repo; that is expected).
- [ ] Branch `feat/l1-param-registry`; **push on phase completion even before merge** (unpushed work is unrecoverable).

## 1. What this is (one paragraph)

Two agent parameters — `agent.temperature`, `agent.historyWindowN` — become governed CORE-kind
rules on a NEW `system` backend lane, resolved on the hot path through ONE pure chain
(`lab > DB-published > code-floor(env-aware)`) with ONE shared clamp applied to EVERY source;
the two DISABLED TweakTab inputs come alive as typed, clamped, session-scoped labMode fields; and
every turn computes, post-stage-9, a use-time-captured **sha256 config-fingerprint**
`{promptRev, paramsHash, knowledgeHash, authorityHash}` + the two raw resolved values, written to
the threaded `cwf.turn` root span and the `done` telemetry event (`config_fingerprint jsonb`,
forward migration). NOT in scope (design §9): `obs.langfuseHost` (→ OBS-ENDPOint-1),
taskFn/pairedReplay parity equalization (docblock-marked divergence), family-based temperature
clamp, client history sender, any touch of the eval-gate ENGINE / `kind_drafts` / `previewDrafts`.

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 Untouchable, byte-identical:** the eval-gate ENGINE (staging engine, stage order, schema
interpreter, existing behavioral dispatch), `kind-drafts.ts` + `resolveKindWithDrafts.ts` +
`composeLabSlice`/`previewDrafts` machinery (design D2: they are NOT the vehicle), grounding
module, gateway SIGNATURE (`gateway.ts` — only the turn-path CALL SITE passes a value through the
existing `temperature?` seam), REPLAY-A1/A2/A3 branches. All existing suites pass unchanged.

**2.2 D1 lane, minimal literal:** `system` enters `BACKEND_IDS` (`shared/dbConstants.ts:244`) as
ONE literal + the `KindDef` for `agent.param` (`backendId:'system'`, class core, `codeSchemaRef`).
NO other allowlist/dispatch grows. The `backends` ROW itself is SEED DATA (Operator door, §3-F) —
never inserted by app code. Scope/Authority lens must resolve `system` to floor authority `[]`
with ZERO lens-code change (prove by test).

**2.3 min/max = Zod `.refine` in `coreSchemas.ts`** (number ⇒ `min ≤ value ≤ max`, min/max
required for numbers) — runs in the gate's EXISTING schema stage. Touching `evalGate.ts` = reject.

**2.4 ONE pure chain, ONE shared clamp (design §4, OBS-3.1 lesson):** resolution lives in a single
exported pure function; the clamp function is single and applied to lab AND DB AND floor inputs;
scattered `??` chains anywhere on this path = reject. Floor is **env-aware**:
temperature floor := `GEN_TEMPERATURE` (so `CWF_TEMPERATURE` keeps working — prove by test);
historyWindowN floor := 6. Seeds: temperature `{min:0, max:1.0}`, historyWindowN `{min:1, max:10}`
(client caps history at 10 — `cwfStore.ts:329-334`; comment must cite that line).

**2.5 labMode fields are typed + server-guarded:** `temperature?`, `historyN?` accepted ONLY when
the published param row says `sessionTweakable:true`, always clamped, session-scoped, nothing
persists, flags-off path byte-identical (GOV-4 posture). Lab values appear in span attrs under
`lab.*` and MUST NOT enter the fingerprint (fingerprint attests PUBLISHED state only).

**2.6 Fingerprint mechanics (design §5, all binding):** computed ONCE post-stage-9 (last
pre-stream point); inputs captured into `ctx` AT USE TIME (slice rows in `stageAssemblePrompt`,
authority map at its warm/use, param rows at resolve) and NEVER re-read at compute time
(torn-attestation); **sha256** over sorted inputs; `PROMPT_CORE_REV` = new constant with
CONTENT-HASH discipline (derived from the prompt-core files; a CI test asserts constant ==
recomputed hash — hand-bumped literals reject); raw `temperature`/`historyWindowN` values recorded
alongside; carriers = threaded `cwf.turn` root-span attrs (the handle is currently discarded —
thread it; attrs set BEFORE streaming) + the `done` telemetry event only (the stage-3 `message`
event fires too early — do not touch it). RBAC-scoping is a documented property, not a bug.

**2.7 Migration + seed two-door:** AG AUTHORS `ALTER TABLE telemetry_events ADD COLUMN
config_fingerprint jsonb` (forward-only) and the idempotent seed script
`scripts/seedAgentParams.ts` (system `backends` row + `agent.param` `rule_kinds` row + 2 PUBLISHED
`domain_rules` rows). Operator APPLIES (db push / runs script). Every sealed doc states
"authored, Operator-pending". `verifyGrants` untouched (no new secret/owner-CRUD table, no new
function) — state this explicitly in the report. Seed-script TESTS live in `api/cwf/__tests__/`
(vitest `include` does not cover `scripts/**`).

**2.8 New GET `/api/admin/config-fingerprint`:** gated `LAB_TOGGLE_SESSION`, pure read,
un-audited, NO spans (RULE 27), returns the CALLER's resolved params + fingerprint parts.
Join key everywhere = `ctx.turnId` (RULE 28; never the 8-char `traceId`).

**2.9 UI:** TweakTab inputs live with clamp + corrected stage chips (**temperature `10`,
historyWindow `05`** — fix the shipped 09/04 chips); fingerprint badge (short hashes,
click-to-copy) fed by 2.8. `.admin-theme` tokens + existing shadcn only; both legibility gates
end `[]`; no sub-12px, no raw hex. Bilingual `t('TR','EN')` for new strings.

**2.10 Secrets/env:** none printed, none added (design D3 removed the only env-adjacent param).

## 3. GATED SUB-PHASES (in order, each green before next)

**A — `system` lane:** BACKEND_IDS literal · `agent.param` KindDef · tests: `parseBackend` accepts
`system`; scope lens serves floor `[]` for `system` unchanged; unknown backend still 400s.

**B — Schema + reference:** `coreSchemas.ts` agentParam Zod + `.refine` · 
`knowledge/reference/agentParams.ts` (env-aware temperature floor; typed `ResolvedParams`) ·
gate test: publishing `{value:1.5, max:1.0}` → 422 via the EXISTING rules endpoint path.

**C — Resolver + wiring:** `resolveAgentParams()` — dedicated small fetch of `system`-scoped
published rows, hosted with the knowledge warm in `stageAssemblePrompt` (`stagesModel.ts:85`
vicinity; the honest extra fetch) · single chain+clamp pure fn · `ctx.params` · gateway call site
· `.slice(-ctx.params.historyWindowN)` replacing `stagesModel.ts:105` · OBS-3 docblock (retries
share the resolved temperature; republish invalidates Gate-B measurement context).

**D — labMode + TweakTab:** typed fields + server guard/clamp · inputs alive · chips 10/05 ·
`lab.*` span attrs · badge + 2.8 endpoint + `adminService` types.

**E — Fingerprint:** use-time capture · `PROMPT_CORE_REV` + CI hash test · compute post-stage-9 ·
threaded root-span attrs · `done` event + column migration (authored) · torn-attestation test
(invalidate the warm mid-turn; fingerprint signs the captured copies).

**F — Seed + reseal:** `scripts/seedAgentParams.ts` (idempotent; re-run = no-op — test in
`api/cwf/__tests__/`) · docVersion **rev 54→55**, below-altitude L1 notes (Control-Plane +
Request-Lifecycle tabs) · CHANGELOG · two-commit seal · push branch.

## 4. SELF-VERIFICATION (literal evidence; recount from raw output)

1. Baseline & final counts (name every new test file/case; final = baseline+N stated).
2. **D1:** BACKEND_IDS diff = one literal; parseBackend-accepts-system + lens-floor tests pasted.
3. **D2:** `git diff 470eb7b -- api/admin/kind-drafts.ts api/cwf/_lib/knowledge/resolveKindWithDrafts.ts` = EMPTY; grep proves resolver never imports previewDrafts machinery.
4. **D3:** `grep -rn "langfuseHost" api src shared` = no hits.
5. Chain/clamp: pure-fn tests (3 tiers × 2 params), DB-above-max clamped, lab-above-max clamped, `CWF_TEMPERATURE` env respected at floor.
6. Torn-attestation + fingerprint: determinism; publish flips `paramsHash`; DRAFT does NOT; LAB does NOT (lab under `lab.*`); raw values present; sha256 length asserted; `PROMPT_CORE_REV` CI equality test.
7. Behavior: `slice(-N)` test; `.refine` 422 test; `done` event carries fingerprint, `message` event untouched (assert absence).
8. 2.8 endpoint: gate test (`LAB_TOGGLE_SESSION` yes / plain user 403), response = caller-scoped, no audit row, no spans.
9. UI: RTL — inputs enabled+clamped, chips 05/10, badge renders+copies; existing Tweak affordances preserved; both legibility gates `[]` pasted.
10. Existing suites unchanged (grounding, evalGate, replay*, kindDrafts, labMode, TweakTab) — per-file lines from raw output.
11. Migration + seed: files exist, **"authored, Operator-pending"** wording in CHANGELOG/docs; seed idempotency test green; `verifyGrants` untouched statement.
12. Drift `[OK]` post-reseal; docVersion **rev 55**; two-commit shas; branch pushed sha BEFORE merge.
13. Independent recount of 5/6/7/9 from raw verbose output.

## 5. YOUR ACTION ITEMS (Maymun)
- **Pre-build: none.**
- After AG pushes: I (Architect) run the fresh-clone FULL review; merge only on my authorization.
- **Post-merge, Operator lane (Gemini), in order:** (1) apply the migration via `supabase db push`
  (NEVER apply_migration/execute_sql-DDL); (2) run `scripts/seedAgentParams.ts`; (3) confirm via a
  schema read (column exists) + a rules read (2 published `agent.param` rows on `system`).
- Post-seed optional live check: Tweak → two live inputs + fingerprint badge; publish a
  temperature draft → badge `paramsHash` flips on the next turn.

If any step forces an unlisted manual action, STOP and surface it as a new
"YOUR ACTION ITEMS" line rather than proceeding.

<!-- END · claude-code-PHASE-L1-param-registry-turn-stamp-v1 · rev 1 · 2026-07-09 -->
