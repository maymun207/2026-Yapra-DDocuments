# CWF — Session Graph KB · v16
**rev 16 · 2026-07-05 · supersedes v15 (`0c6c328`→`a878cae`: OBS-3.1 fully shipped, epic closed)**
**End-of-session anchor:** `origin/master` = `a878cae` · 747/747 tests (75 files) · docVersion rev 33 · drift `[OK]` · **OBS-3.1 perturbed empty-retry (reanchor) LIVE in production, reactive-only** · empty-completion/observe/replay epic CLOSED

> This is Claude's record of the session, not the user's. Code in `cwf_yaprak` is ground truth over this file. Read `CLAUDE-PROJECT-INSTRUCTIONS-v2.md` first, then `cwf-open-items-register-v16.md`, then this.

---

## 1. What happened this session (chronological)

This was a clean, single-track execution session: OBS-3.1 taken from LOCKED design → rev-2 note → phase prompt → three AG sub-phases, each reviewed by fresh-clone RULE-25 diff. No fires, no owner-facing saga, no scope drift. The empty-completion epic that began at OBS-1 closed in production.

### 1.1 Resume + OBS-3.1 design rev 2 + phase prompt (Claude artifacts)
Verified resume state from origin: HEAD `0c6c328`, 721/721, drift `[OK]`, docVersion rev 30 — all matched v15. Then produced the two owed architect artifacts:
- **`cwf-obs3_1-perturbed-retry-design-v2.md`** — bumped rev 1→2: P-b promoted to primary (attempt 1), P-a demoted to attempt-2 escalation, P-b mechanism corrected (re-anchor the last USER turn, not a nonexistent tool result), tier enum locked `none|reanchor|directive`, **new named trap: perturbation must be attempt-local** (never mutate `ctx.aiMessages`/`ctx.systemPrompt` — persistence + promptSnapshot must see the real conversation), replay upgraded to a **3-arm paired design** (contemporaneous control), failure-outcome policy defined (both-fail = measurement-only, no wire-in).
- **`claude-code-PHASE-OBS-3_1-perturbed-retry-v1.md`** — one gated prompt, three sub-phases (A helper, B replay-validate lab-only, C prod-wirein gated on B verdicts + reactive-only confirm), literal evidence gates.

### 1.2 Env-presence: automation-first correction (STANDING RULE born)
Maymun caught a real violation: I'd been about to have him hand-check `.env.local` line by line for the live run's secrets. He named it — "posteki tek tek saydıracaksın." Correct: I have Gemini (Operator lane) which can read local env. → Wrote **`cwf-operator-env-presence-obs31-v1.md`** (fenced diagnostic read, NAMES-only, never echo values). Env names pinned from code + `.env.example`, not guessed. Operator reported `VERDICT: READY` (`GEMINI_API_KEY`/`SUPABASE_URL`/`SUPABASE_SECRET_KEY` all SET; the two MISSING were optional). **This produced memory rule #9 (see §4).**

### 1.3 Sub-phase A → ACCEPTED (`b8ecb4d`)
Pure `perturbForRetry` + `tierForAttempt`/`attemptForTier` + `perturbationTier` telemetry. RULE-25 review: 732 tests, determinism/identity-at-none/non-mutation/verbatim-user-token unit tests all present. AG added `redactGroundingVerdict` UNPROMPTED — correct (full verdict carries factory data; must not enter committed artifacts). Reanchor implementation reviewed: quotes user turn verbatim between fixed fences, deterministic, no LLM, `.slice()` non-mutating.

### 1.4 Sub-phase B harness → ACCEPTED (`cf0fa89`), then live run → Gate B (`d7df2a2`)
- Harness reviewed first (per my instruction: build-only, no live run, architect review before spend). C5 (one gateway call/rep, structural scan untouched) and C6 (grounding scorer = production `runGroundingCheck` re-export, identity) both verified in code. 739 tests.
- Live 3-arm run then green-lit (env READY). AG disclosed it invoked the production engine directly (headless super_admin HTTP auth unavailable) + replicated the C4 audit write — metrics unaffected, flagged in STANDING WATCH.
- **Gate B evidence committed redacted** (`docs/replay/obs31-gateB/`, `d7df2a2`) so Claude could recompute from durable data. **Claude recounted empties independently from the per-rep JSON — matched AG's aggregates exactly** (see §2).

### 1.5 Sub-phase C → ACCEPTED (`a878cae`) — production wire-in, epic closed
`adoptedTierForAttempt(attempt) = attempt===1 ? 'reanchor' : 'none'` — single-source live driver, deliberately NOT `tierForAttempt` (2→directive trap). 2 surgical `stageStream.ts` edits + import. RULE-25 review: `ctx.aiMessages` proven pristine after reanchor retry (T2 `toEqual(before)`); empty≠zero/give-up/no-double-paint/cross-provider-ban byte-identical; **injection-boundary A2 guard** (full-reviewed per standing rule since it's a security guard) re-expressed against the new `attemptSystem` sink WITHOUT weakening — production `attemptSystem === ctx.systemPrompt` byte-for-byte because none/reanchor leave system untouched. Two-commit reseal, 747/747, rev 33. AG honestly flagged blueprint §07 DOC-DEBT (variant list superseded) + resealed-not-redrew per C8 → tracked into MICRO-1.

---

## 2. THE SCIENCE — Gate B (OBS-3.1 adoption evidence)

Specimen `07beb11f`, provider gemini-2.5-flash, N=25/arm. All rates recounted by Claude from `docs/replay/obs31-gateB/gateB-redacted-perrep.json` (empties re-derived from the per-rep `empty` flag, cross-checked vs `aggregate.emptyCount` — all `OK`):

| Arm | Tier | Empties | Empty rate | Wilson 95% CI | Verdict |
|---|---|---|---|---|---|
| A | none (control) | 9/25 | 36.0% | [20.2%, 55.5%] | VALID ∈ [23.2, 43.4] |
| B | reanchor | **0/25** | **0.0%** | **[0.0%, 13.3%]** | **ADOPTED** (upper < 23.2, clean separation) |
| C | directive | 11/25 | 44.0% | [26.7%, 62.9%] | REJECTED (worse than control) |

- All empties across all arms: `finishReason=stop` (clean-transient retriable class; no content-filter/length contamination).
- **Grounding parity:** recovered reps via production `runGroundingCheck` re-export — Arm A 16/16 clean, Arm B 25/25 clean, 0 violations either (empty_as_zero/count/fabrication/scope_divergence). reanchor recoveries are NOT confabulations.
- **THE key finding — a PLACEMENT effect, not "re-anchor beats directive":** both tiers carry essentially the SAME engage-instruction ("respond directly — produce the tool call or a substantive answer, never an empty completion"). reanchor delivers it inside a fresh re-anchored USER turn (0/25); directive appends it to the SYSTEM prompt (44%, WORSE than the 36% control). Same semantics, opposite outcome by placement. This strongly vindicates Maymun's original P-b intuition ("a conversational state change forces a different decision; a bare system directive doesn't carry lived experience"). The directive-worse result is the INTERNAL CONTROL: if any perturbation trivially escaped the empty region, directive would have dropped too — it rose, so the reanchor effect is specific.
- **Design risk carried live:** N=1 specimen. `perturbationTier` ships in prod telemetry → generalization measurable; first wild divergent specimen replays against shipped reanchor.

---

## 3. What the adopted perturbation actually IS (doc-truth, C7)

The adopted `reanchor` tier is **NOT pure re-emphasis** — as implemented it is **"re-anchor the last user turn + an engage-directive carried inside that re-anchored user turn."** `REANCHOR_PREFIX` instructs the model to respond directly / never return empty, then quotes the user's turn VERBATIM between `"""` fences. This is meaning-preserving (the user's own tokens are untouched; the prefix is scaffold) and it is exactly what Gate B validated. The doc-comment + CHANGELOG were corrected to say so (do not let a future summary call it "pure re-emphasis"). `directive` (rejected) appends a fixed constant to the system prompt — retained in code as a lab tier, never reachable in production.

---

## 4. DECISION / RULE records set this session

**Memory rule #9 (STANDING COMMUNICATION RULE) — Maymun's explicit directive:** whenever a response contains ANY manual action for Maymun (approval on record, env/secret he alone sets, a green-light to hand AG/Gemini, anything blocking progress), surface it as an explicit "YOUR ACTION ITEMS" bullet-by-bullet list — each item concrete and self-contained. NEVER bury a required action in prose, NEVER end with a cryptic "I'm waiting for you." Zero manual actions → say so explicitly. This is the surfacing counterpart to automation-first (#6): #6 minimizes manual asks, #9 guarantees the remainder are never cryptic or buried.

**Reactive-only firing — CONFIRMED.** Production perturbation fires strictly AFTER a detected empty (inside the retry loop, after `decideRetry` returns `'retry'`); attempt 0 always verbatim; no predictive/proactive path. This closes the OBS-3.1 owner-decision gate.

**Adopted-mapping single-source discipline.** The Gate-B adoption lives in ONE pure function (`adoptedTierForAttempt`). A future specimen re-opening `directive` changes that one function — not the loop, not the lab drivers. `tierForAttempt` stays lab-only.

---

## 5. Verified state at session end (`a878cae`)
- 747/747 tests (75 files), drift `[OK]` (worktree), docVersion rev 33 — Claude's independent full-suite run.
- Topology since v15: `0c6c328` → `b8ecb4d` (A) → `cf0fa89` (B harness) → `d7df2a2` (Gate-B evidence) → `a878cae` (C). All `--no-ff`, squash-free, branches deleted post-merge, master only long-lived.
- `replay_audit`: 11 → 14 across the 3 Gate-B arms (one clean increment/run — no vanish this time; healthy F3 baseline).
- Langfuse local Docker host: org `cwf`/project `cwf-dev` = real data home (bootstrap `admin@example.com`, creds `infra/langfuse/.env`). Will be superseded by the AWS host in MICRO-1.
- Production perturbation is wired but UNOBSERVED live yet — Claude to confirm `[LLMRetry] ... tier=reanchor` on the next natural attempt-0 empty via Vercel logs (owner does NOT hand-read logs).

---

## 6. Corrected stale beliefs
- v15 anchor said 721 tests / rev 30 — now 747 / rev 33 (OBS-3.1 A+B+C).
- OBS-3.1 was "design LOCKED, awaiting build" in v15 — now FULLY SHIPPED and live.
- The reanchor tier was described in design v2 as "re-position/re-emphasize the last user turn" — the shipped implementation also carries an engage-directive inside that user turn (§3). Doc corrected; not a defect (it's what validated).
- "reanchor beats directive" would be the wrong lesson — it's a PLACEMENT effect (same instruction, different channel) (§2).
- A google-provider env check needs BOTH `GEMINI_API_KEY` and `GOOGLE_GENERATIVE_AI_API_KEY` (`@ai-sdk/google` reads the latter) — my first env-presence list under-specified it; both were present so no harm.

---

## 7. Standing watch (carried + new)
- Gemini operator fence: sanctioned tasks ONLY, no self-initiated cleanup. Migrations = Operator-lane.
- gpt-4.1-mini `call_tool(search_tools)` self-correct in prod → future replay-lab experiment material.
- Node drift AG v26.x vs v22.x spec; green — don't touch while green.
- **F2 lab-env trap** + the `GOOGLE_GENERATIVE_AI_API_KEY` name (see §6) — carry into any lab-run phase.
- **Direct-engine replay-invocation caveat:** Gate-B ran the engine directly + replicated the audit write; metrics unaffected but the endpoint's RBAC+audit TRANSPORT was not exercised. A future run validating that transport must go through HTTP.
- **Replay grounding fidelity gap:** no server config in the recording → scope-divergence AUTHORITY branch can't attribute; body-flag checks faithful; cancels in paired comparison but absolute scope-divergence rates from replay are not trustworthy.
- claude.ai MCP servers (Gmail/Calendar/Drive/Vercel) need re-auth via connector settings if wanted back.
