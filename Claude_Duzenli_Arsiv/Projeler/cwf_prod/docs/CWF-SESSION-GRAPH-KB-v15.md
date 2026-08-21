# CWF — Session Graph KB · v15
**rev 15 · 2026-07-04 · supersedes v14 (HEAD re-anchored c772171→0c6c328 after AG doc-drift hotfixes closed the e565dd3 defect)**
**End-of-session anchor:** `origin/master` = `0c6c328` (main session ended at `c772171`; AG doc-drift/flaky hotfixes moved it to `0c6c328` post-session — see §5) · 721/721 tests · docVersion rev 30 · observe backbone COMPLETE + production-proven · replay instrument LIVE + audited · CHAR-1 measurement DONE · OBS-3.1 design LOCKED (P-b primary, awaiting rev-2 bump + phase prompt)

> This is Claude's record of the session, not the user's. Code in `cwf_yaprak` is ground truth over this file. Read `CLAUDE-PROJECT-INSTRUCTIONS-v2.md` first, then `cwf-open-items-register-v15.md`, then this.

---

## 1. What happened this session (chronological)

### 1.1 REPLAY-B review → ACCEPTED (`6b07927`)
The empty-completion replay engine landed. Full RULE-25 review from a fresh clone: 721/721 (681+40 new), `--no-ff` topology clean, all hard constraints verified in code:
- **C8 better than parity** — `emptyCompletionScorer` is a *re-export* of production `isEmptyCompletion` (`===` identity, drift impossible); `floorPhraseCatalog` derives from `emptyCompletionMessage`.
- **C7** three independent proofs — no loop in taskFn; unit test pins exactly ONE gateway call on an empty rep; structural scan (comment-stripped) bans `decideRetry`/`LLM_EMPTY_RETRY_MAX`/attempt-loops across `replay/`.
- **C1** real task-fn spied against all four write sinks, zero calls.
- **C3** canonical key-order-insensitive sha256 arg hashing; `resolve_time_range` always stubbed; **prompt time block anchored to the recorded turn's clock** (closed a wall-clock leak the prompt never named); honest-empty avoids fabricating "0 records" (empty≠zero holds in the lab; aggregate `emptyRate:null` when nothing scoreable, never 0).
- Findings accepted: C3 trajectory divergence is correct behavior (strict default; honest-empty for multi-step, misses counted; we do NOT fuzzy-match args — a near-miss-as-hit fabricates a recording); the 3/10 datum was the instrument working but too-wide CI to design against.
- Screenshots gitignored (house convention), Langfuse traces on local host — accepted with named basis (structurally backed by C1 spies + render tests).

### 1.2 Owner-applied DDL + AG hotfix commits → reviewed (`5d13b73`)
Two threads landed post-REPLAY-B, both direct-to-master outside a phase (owner-sanctioned):
- **`replay_audit` DDL applied** via Gemini (count 0, `rowsecurity=true`) AND recorded in ops commit `32dba7e` (Supabase-MCP apply + `list_migrations` + live C4 happy-path: run `9d115773` wrote audit row `a8798c1d`, anon UPDATE denied 42501, ledger byte-identical). Audit-or-alarm proven in BOTH modes. **DDL was applied via both lanes — idempotent so harmless, but migrations remain Operator-lane territory.**
- **Vercel build hotfixes** — drift-gate builder-context fix (`c1e7725`: assert committed `base..HEAD` when CI/VERCEL env set — Vercel rewrites `vercel.json` in its build container, a real false positive) + equality-narrow `ProviderWriteResult` (`963a912`: Vercel's per-function compile runs WITHOUT strictNullChecks, `!result.ok` doesn't narrow a boolean-literal union there → use `result.ok === false`). Reseal `5d13b73`. Both verified sound; drift gate green in BOTH author and builder (CI=1) modes.
- **Standing expectation set:** anything touching an enforcement script (drift gate, verifyGrants, eval-gate) gets full review even in hotfix mode.

### 1.3 CHAR-1 review → ACCEPTED (measurement sound) + 1 pre-existing infra defect surfaced (`c772171`)
The characterization measurement phase (my prompt, issued this session). Full review:
- **Integrity verified independently:** `git diff 5d13b73..c772171 -- api src shared scripts supabase` EMPTY (zero production code); base drift `fc2ac9d` left instrument byte-identical (code diff empty); findings commit changelog-only; 721/721 (measurement adds no tests).
- **Every rate recomputed from raw JSON — all match.** See §2 for the science.
- **One error I caught the report missed:** §3 prose says "34 non-empty reps" — true count is 54 (26 empty + 54 = 80). Prose slip only; raw data authoritative and correct.
- **One pre-existing infra defect surfaced by MY drift-gate run (NOT a CHAR-1 defect):** Runtime Topology tab's `lastSyncedCommit` = `e565dd3` **does not exist anywhere in the repo** (not a commit, not a prefix, not orphaned). Traced to `fc2ac9d` — the out-of-band "sync manifest" commit between the CHAR-1 base and the phase. Single-char corruption/truncation in one manifest field; other 5 tabs' hashes valid. **Consequence: the drift gate has been silently FAILing since `fc2ac9d`, and CHAR-1's pre-flight didn't run the drift gate to catch it.** → Fold the one-line fix (`e565dd3` → real Runtime Topology seal hash) into the next phase pre-flight; and ADD "drift gate green" as an explicit pre-flight line in EVERY future phase prompt (measurement or not).
- **F3 flagged, unexplained:** REPLAY-B's happy-path audit row `a8798c1d` is GONE (pre-phase count 0 not 1). Service-role-only deletion, cause unknown. An audit row vanishing is exactly what audit-or-alarm exists to prevent — genuine open question, not blamed on CHAR-1.

### 1.4 Langfuse access saga (owner-facing, NOT a code defect — fully resolved)
Maymun grew (understandably) frustrated: admin panel showed no observability change, "microscope feels like a dollar-store magnifier," feared the whole dream was garbage, considered stopping everything. Diagnosis walked through it WITHOUT reopening the emotional loop each turn:
- The microscope IS built and production-proven (OTel real dep `@langfuse/otel ^5.9.1` + `@opentelemetry/sdk-trace-node ^2.9.0`, wired in `otel.ts`; PROBE-OBS proved a prod span in the UI). The lens is **Langfuse's own UI** (buy-before-build) — NOT rebuilt in `/admin`. Prod is intentionally lens-capped (obs only fires with 3 `LANGFUSE_*` envs; removed after PROBE-OBS).
- Root cause of "cwf not visible" was a **three-layer access problem, not data loss:** (1) headless bootstrap created org `cwf`/project `cwf-dev` correctly at 01:15; (2) first browser login auto-created a SECOND org `yaprakdev`/`AgentTune` (empty); (3) the bootstrap user (`admin@example.com`, password in `infra/langfuse/.env`) was separate from the auto-created account. Once Maymun logged in as `cwf-admin`/the real user and selected org `cwf` → project `cwf-dev`, all data was there: **374 observations, 80 traces, 939K tokens** — the live CHAR-1 arms (25/25/10/10/10 session sizes = the ARM signature).
- **Named traps for future:** Langfuse "Agent Skill / MCP Server / CLI" banners are Langfuse's OWN product ads (connect coding agents TO Langfuse), NOT integrations we forgot — ignore. The MCP-server default URL points at `cloud.langfuse.com`, not self-hosted. **API keys never pasted to Claude** — only `.env` (secret→env, ADR-002 discipline).
- **This reinforced why MICRO-1 (admin-panel deep-link) matters MORE:** manual navigation alone dropped the owner into the wrong org. The deep-link from a turn row → its Langfuse trace is now higher priority.

### 1.5 Diagrams produced (project-side artifacts, in chat)
- `cwf_yaprak` building-block diagram (Client → API → 4 core services → 3 external systems), grounded in real folder structure.
- Supabase write-model split (Owner-CRUD 2 tables vs Server-only 17) + governance eval-gate publish flow (draft → schema/referential/behavioral → published, every attempt → `rule_audit`). "Gate unchanged" = engine/stage-order/interpreter byte-identical; `isSuperset` additive dispatch is legitimate.
- Pipeline span-coverage gap (2/14 traced, 10/14 dark, 2/14 not-applicable) — see §3.

### 1.6 "My Dream Dashboard" (owner sketch) → resolved to a design decision, NOT a new build
Maymun's hand sketch: each pipeline stage a clickable row showing in/out/log/table. This is the UI form of the 14-stage table we built earlier. **Key ruling: do NOT build a standalone dashboard — that violates buy-before-build and re-implements Langfuse's trace waterfall worse.** The right move: wrap the 10 dark stages in `withSpan()` (same pattern as the warm-phase spans) so Langfuse's OWN trace screen becomes the dashboard — 14 clickable rows, zero new maintenance. Folds naturally into MICRO-1 (the deep-link must land on a trace that actually shows 14 stages, else it's half a picture). See §3 + register item.

### 1.7 OBS-3.1 design + the P-b decision (LOCKED, awaiting rev-2 + phase prompt)
Design note `cwf-obs3_1-perturbed-retry-design-v1.md` written against CHAR-1 data. Then Maymun chose **P-b (history re-anchor) over my P-a recommendation**, reasoning that a state change forces a different decision, whereas a mere directive doesn't. **I corrected the mechanism without overriding the choice** (see §4 for the full decision record) → **P-b re-anchor is primary, P-a directive is the attempt-2 escalation, replay validates.** Design note must bump to rev 2 with this reordering + the corrected P-b mechanism.

---

## 2. THE SCIENCE — CHAR-1 characterization (the OBS-3.1 substrate)

Specimen `07beb11f-55c2-4b82-813a-b7249df748b2`, provider `gemini/gemini-2.5-flash`. All rates recomputed by Claude from the raw per-rep JSON (Wilson 95% CI):

| Arm | Empty rate | Wilson 95% CI |
|---|---|---|
| Gated baseline 2×25 (recorded config) | 15/50 = 30.0% | [19.1%, 43.8%] |
| Pooled recorded-temp (60 reps) | 17/60 = 28.3% | [18.5%, 40.8%] |
| Temp T=0.0 | 5/10 = 50% | [23.7%, 76.3%] |
| Temp T=1.0 | 4/10 = 40% | [16.8%, 68.7%] |
| **Pooled ALL strict (80 reps) — the empty region** | **26/80 = 32.5%** | **[23.2%, 43.4%]** |
| Control (OEE turn `3c266d30`), honest-empty | 0/10 = 0% | [0%, 27.8%] |

**Three answers that FORCE the OBS-3.1 shape:**
1. **The empty region is real, repeatable, ~32.5%** on one fixed input — no longer a fleet-average suspicion.
2. **Temperature does NOT rescue it.** T=0 (50%) CI overlaps recorded (28%) CI. Removing sampling jitter is NOT the lever → identical re-submission at any temp stays in the high-empty region (this is exactly why production's identical OBS-3 retry goes 3/3 empty at temp 0.7). **The only lever left is changing the input on retry.**
3. **Empty signature is byte-identical across all 26 empties:** `finishReason=stop`, 6,049 in → 0 out, 0 tool calls, dies at STEP 1 pre-tool, latency 486–1,454 ms. Recovered reps: 1 stub serve (`getFactoryList`), 12,544–12,587 in, 111–636 out, 1.4–4.5 s. The model isn't erroring — it's *deciding to say nothing* on that exact prompt before considering a tool. `floorPhrasePresent=false` on every rep (no recorded floor text leaked).

**F4 — the pool is ONE.** 8 "empty specimens" = 8 events over 5 turns (in-turn retries emit per-attempt `llm_call` events). Of 5 turns: `07beb11f` (the baseline) + 4 that died pre-tool with NO stub book → not replayable. **Characterizable pool = 1 turn.** Beyond `07beb11f` requires fresh captures (§6 capture trigger in the design). This is a STATED design risk carried into OBS-3.1: the perturbation is designed/validated on N=1; generalization unproven until fresh specimens.

**The 6,049-vs-12,544 token delta is NOT "less history."** Verified in code: both paths start from the same 6,049-token prompt; the recovered path is longer only because it received the ~6,495-token `getFactoryList` tool result. The empty dies BEFORE any tool result exists. This is why P-b cannot mean "re-anchor the prior tool result" (none exists) — see §4.

---

## 3. Pipeline span-coverage (the "dream dashboard" substrate)

Verified from code at `c772171`. Span constants in `observability/config.ts`: `cwf.mcp.tool/attempt/discover`, `cwf.warm.knowledge/trust/provider`, `cwf.replay.turn`, stage spans via `STAGE_SPAN_PREFIX`.

- **Traced today (2/14):** Tool loop (`cwf.mcp.*`), LLM inference (AI SDK auto span).
- **Dark — no span (10/14):** Conversation/State, Intent, Memory Retrieval, Knowledge/RAG read moment, Tool/Skill Select decision, Prompt Assembly (`assemble.ts` promptSnapshot — telemetry_events only, no span), Verification (`groundingCheck.ts` — telemetry_events only, NO span), Format/Render, Memory Update.
- **Not applicable (2/14):** Planning (absent), Compression (stub).

**The fix (folds into MICRO-1):** wrap the 10 dark stages in `withSpan()` — same pattern as warm-phase spans, zero new business logic, thin envelope around existing functions. Langfuse's trace waterfall then IS the dream dashboard. Do NOT build a separate admin dashboard.

---

## 4. DECISION RECORD — OBS-3.1 perturbation ordering (P-b primary)

**Maymun's choice:** P-b (history re-anchor), because a *state/experience change* forces a different model decision, whereas P-a (directive append) carries no "lived experience."

**Claude's correction (mechanism, not choice):** P-b's premise "the empty path lacks history to re-anchor" is misplaced — verified in code that the empty dies pre-tool, so there is NO prior tool result to re-anchor, and `ctx.aiMessages` is the same frozen 6,049-token array every attempt. P-b therefore cannot mean "bring the previous tool result forward" (none exists). **The correct P-b mechanism: on retry, re-position/re-emphasize the last USER turn within that same prompt** — pull the model's attention back to the actual question it silently skipped. This is still P-b's spirit (state/emphasis change, not a bare directive) but bound to the one real hook the code allows.

**LOCKED design:**
- **Attempt 0:** ALWAYS unperturbed — user's real question runs verbatim first. No user ever gets a perturbed first answer.
- **Attempt 1 = P-b (re-anchor last user turn):** the primary lever, honoring Maymun's "force a different decision" intuition.
- **Attempt 2 = P-a (directive nudge) escalation:** if re-anchor alone doesn't recover.
- **P-c (whitespace/structural) REJECTED** unless replay shows a/b flat.

**Non-negotiable design invariants (from the design note, unchanged by the reordering):**
- Perturbation is a PURE, DETERMINISTIC, MEANING-PRESERVING function `(messages, system, attempt) → { messages, system }`. No runtime LLM judge. No unseeded randomness. Nudges the scaffold/framing, NEVER the user's request tokens.
- Success metric is NOT "empty rate → 0." It is **"empty rate down (Wilson-CI-separated from the [23–43%] baseline) AND grounding/scope verdicts on recovered reps match natural recoveries."** A perturbation that coaxes a confabulated answer to a subtly-changed question is a REGRESSION worse than the honest empty it replaced.
- **Replay validates before production** — REPLAY-B engine runs the perturbed task-fn at N=25 per tier on `07beb11f`; a tier whose CI doesn't separate from baseline is NOT adopted (stochastic-verification discipline; Maymun's intuition sets the hypothesis, data decides).
- **Production firing = REACTIVE-ONLY** (my committed single-path rec, Maymun to confirm in the phase): perturb strictly AFTER a detected empty, never predictively — the proactive option needs a runtime "high-empty-risk input" classifier, exactly the predictive judgment we keep deterministic-or-not-at-all, and step-1 empties are only detectable after they happen.
- **Surgical integration — 3 touch points, no rewrite** in `stageStream.ts`: (1) new pure helper `perturbForRetry` beside `isRetriableEmpty`/`decideRetry`; (2) the `retry` branch applies it before `continue` so the next `streamChat` reads perturbed messages/system; (3) `emptyRetryEmitPayload` gains a `perturbationTier` enum (`none|reanchor|directive`) for ledger + replay measurement. Everything else (no-double-paint `filterPreTokenDelta`, `give-up` honest floor, cross-provider ban, `LLM_EMPTY_RETRY_MAX` bound) byte-identical. empty≠zero untouched.

---

## 5. Verified state at session end (`0c6c328` — updated post-session)
- 721/721 tests (73 files), all typechecks green — Claude's independent run (re-verified at `0c6c328`).
- **HEAD moved `c772171`→`0c6c328` AFTER the main session:** AG landed 7 doc-drift/flaky-test hotfix commits. The `e565dd3` defect I surfaced in CHAR-1 review is now CLOSED — root cause confirmed as an amend-orphaned twin of `fc2ac9d` (self-SHA reseal trap, never on master). AG's fix migrated drift markers from commit-SHA to **content-hash** (`docDriftCore.ts`/`reseal.ts`), killing the shallow-clone failure class entirely; Claude verified `[OK] no drift` from a fresh `--depth 1` clone (previously a guaranteed FAIL). docVersion rev 27→30. Flaky `mcpSettingsTab` toggle test hardened. **The e565dd3 fold-in + the "add drift-gate pre-flight" item are CLOSED** (pre-flight retained as a standing rule, now cheap).
- `replay_audit` DDL live (RLS on, super_admin read, service-role write, anon/authenticated REVOKE). Post-CHAR-1: 11 audit rows written, zero ALARM lines.
- Ledger byte-identical across CHAR-1: `telemetry_events` 727, `messages` 308, `conversations` 44 — unchanged (measurement wrote nothing to governed tables).
- Langfuse local Docker host: org `cwf` / project `cwf-dev` = the real data home (bootstrap user `admin@example.com`, creds in `infra/langfuse/.env`). Empty `yaprakdev`/`AgentTune` = harmless auto-created cruft, safe to delete.
- Branch hygiene: master only long-lived; all phase branches deleted post-merge.

---

## 6. Corrected stale beliefs (things v13 or prior got wrong)
- v13 anchor said 681 tests / rev 25 — now 721 / rev 30 (REPLAY-B + hotfixes + CHAR-1 + post-session doc-drift hotfixes).
- REPLAY-B "8 specimens" premise → actually 8 events / 5 turns / 1 replayable (CHAR-1 F4).
- My phase-prompt wording "REPLAY_RUN capability" → it's the RBAC permission `replay:run` (perm, not env gate) — CHAR-1 F5.
- The drift gate was believed green post-F-obs3; actually FAILing since `fc2ac9d` (bad manifest hash). Pre-flight must run it explicitly henceforth.
- P-b's "re-anchor prior history" as I first sketched it assumed a tool result to re-anchor; the empty dies pre-tool, so P-b re-anchors the last USER turn instead (§4).

---

## 7. Standing watch (carried)
- Gemini operator fence: sanctioned tasks ONLY, no self-initiated cleanup. Migrations are Operator-lane — the CHAR-1 dual-lane DDL apply was harmless (idempotent) but the boundary stands.
- gpt-4.1-mini attempted `call_tool(search_tools)` in prod; deterministic error self-corrected. Gateway-protocol adherence on weak models = future replay-lab experiment material.
- Node drift: AG runs v26.x vs spec'd v22.x; green so far — don't touch while green.
- F2 lab-env trap (CHAR-1): `vercel dev 50.18.2` ignores parent-shell exports (the REPLAY-B recipe silently yields zero traces); a full `.env.local` copy + overrides works, deleted at teardown. Carry into any future lab-run phase.
- claude.ai MCP servers (Gmail/Calendar/HF/Supabase) need re-auth via connector settings if wanted back (CHAR-1 note).
