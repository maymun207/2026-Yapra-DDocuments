# CWF — Open Items Register · v63
<!-- cwf-open-items-register-v63 · 2026-07-23 · amends v62 after S62
     ("THE UNDERSTANDING-LAYER SESSION"). GOLDEN LEDGER: append-only; items
     leave ONLY via a terminal marker; carry-diff pasted in §0; open items
     carried BY NAME with a pointer to v62 for last full wording; prose may
     shorten, no item omitted. -->

## VERIFIED FLOOR (v63 / S62 close)
master `194f6a86831c215952feaba8e9df3ac00b32d364` · rev 142 · **353 test files
/ 3735 tests** · 56 migrations · **ZERO pending migrations** · drift `[OK]`.
**S62 lineage (two-parent `--no-ff`, Architect-verified from a fresh clone):**
`f551bc0`(S61 close) → `1f03bd9`(PHASE LOG-TRUTH-1 v1, PR#108, rev 142) →
`194f6a8`(merge). Zero Operator migrations this session. Merge message landed
verbatim; `log-truth-1` deleted at merge ✓.
**Deploy at close:** `dpl_B9dAqv53ctQGGJuY8zPkd1N7JegQ` (SHA `194f6a8`) was
**BUILDING** — READY confirmation and the first production `[Obs]` diagnostic
read are OWED (§8).

## 0 · CARRY-DIFF PROOF — v62 → v63
**S62 terminal markers (items leaving OPEN):**
- **F173 → CLOSED@194f6a8 · LIVE-CONFIRM OWED.** Non-uuid identity can no
  longer become a `user_id` filter. `src/lib/userIdGuard.ts` (new, pure) with
  **three guard insertions covering all four `.eq('user_id', …)` query sites**
  (`authStore.fetchRoleAndScopes`, `mcpSettingsService` load + save) —
  Architect independently grepped `src/**` and confirmed **no unguarded path
  remains**. `AdminPreview.tsx` now seam-mocks
  `useMCPStore.loadFromSupabase` instead of mutating the seeded `'preview'`
  identity. Rejection logs the CALLER only, never the value. 11 new tests.
  **Not yet observed live:** the Operator read confirming 22P02 has stopped is
  an Architect task (§8).
- **LOG-TRUTH-1 G0 → DELIVERED@194f6a8 (instrumentation; F169 itself stays
  OPEN).** `forceFlushObservability()` now races each processor
  (`scrub`/`digest`/`langfuse`) individually against `OTEL_FLUSH_TIMEOUT_MS`,
  **replicating — not widening** — the per-processor race
  `@opentelemetry/sdk-trace`'s `TracerProvider.forceFlush()` performs
  internally (verified against the bundled source **independently by both
  lanes**). Emits the failing processor NAME, a cold/warm marker, the Langfuse
  processor's real pending-export count (`null` never fabricated as `0`), and
  per-processor ms; a late settle emits a separate follow-up line, a true hang
  emits none. 15 + 7 new tests. **Disclosed deviation:** this replaces the
  `provider.forceFlush()` call itself — behaviourally equivalent, but not
  "zero touch"; accepted because naming the processor requires it.
- **LOG-TRUTH-1 G1 → REMAINED EMPTY BY DESIGN**, and is now **filled by
  evidence** (see F169 below). The phase's shape held: no second guessed patch
  shipped.
**Carry-diff check:** every v62 item is present below OR carries a terminal
marker above. **"Absent without marker" set = EMPTY ✓.** F-BW11/12/13 carried
OPEN (§4). §2 freeze, §3 spine, §6 rules, §7 parked/watch carried by name.

## 1 · v5_2 RELEASE TRACK — position
GATE-0 ✓ → B1 ✓ → B2 ✓ → F163 ✓ → debt sweep ✓ → **LOG-TRUTH-1 ✓ MERGED** →
**⟨NEW⟩ UNDERSTANDING-LAYER TRACK** → F169 fix round → **B3 Memory (MEMORY-1,
F166-aware design note FIRST)** → F166 → B4 → B5 → B6 → B7 → Path B.

**⟨NEW⟩ UNDERSTANDING-LAYER TRACK — opened by owner mandate S62.** Owner's
diagnosis: *"Bir mantık silsilesine oturtup bir hedefe doğru gittiğimizi
görmüyorum."* Architect confirmed it. Deliverable shipped:
**`cwf-sota-understanding-layer-v1`** (rev 1, anchor `194f6a8`). Track is
**AWAITING OWNER APPROVAL of §6 algorithm** before any code. Sequence inside
the track is deliberately MEASURE-FIRST (§8).

## 2 · 🧊 GOLDEN FREEZE (engaged, unchanged) — pointer v62 §2 / v61 §2 /
v59_7 §2. Lifts at B5. Golden-runner 1075/18h watch unchanged.

## 3 · REMAINING SPINE — B3/B4/B5/B6/B7/Path-B carried by name (pointer v62 §3
/ v61 §3 / v59_7 §3). B5 security-cleanup unchanged. **Note:** F173's guard
landed adjacent to the `mcp_settings` table B5 sweeps — the sweep is
unaffected.

## 4 · BOARD-WALK — F-BW01-10 CLOSED · **F-BW11/12/13 OPEN** (pointer v62 §4 /
v61 §4). Owner's "ASLA unutma" stands.

## 5 · FINDINGS

**OPEN — status materially changed this session:**

- **F169 · OPEN — ROOT CAUSE NOW DIAGNOSED (evidence-based), fix authored but
  NOT yet shipped.** Symptom unchanged: `golden-runner` cron logs
  `[Obs] flush failed … 5000 ms`. **What S62 established, from production logs
  + library source, NOT from hypothesis:**
  - The emitted error is `Span processor did not completed within timeout
    period of 5000 ms` from `@opentelemetry/sdk-trace@2.9.0`
    `TracerProvider.js:73`. `forceFlush()` wraps **each processor in its own
    timeout** and rejects with an **array** — one element per unsettled
    processor. Production shows a **one-element array** ⇒ by elimination
    (scrub and digest resolve instantly) the hanging processor is
    **LangfuseSpanProcessor**. No longer a guess.
  - The same source read proves a **late settle is indistinguishable from a
    true hang** in today's output — validating G0's design.
  - **THE FINDING — a three-endpoint correlation.** Every prod caller of
    `forceFlushObservability` was enumerated in code and counted in prod logs:

    | Endpoint | Flush position | 3h prod count |
    |---|---|---|
    | `chat.ts:348` | **BEFORE** `res.end()` | 3 turns, **0 failures** |
    | `eval-ci.ts:222` | **BEFORE** `res.json()` (its own comment: *"RULE 27: flush spans BEFORE responding"*) | 15 calls, **0 failures** |
    | `golden-runner.ts:97` | in `finally`, i.e. **AFTER** `res.json()` | 67 ticks, **55 failures (82 %)** |

    On the newer deploy `dpl_DnTS…` (`f551bc0`), **20 consecutive minutes
    08:02–08:21 all failed** — so v62's *"stable ~20 % clean = structural
    signal"* is **FALSIFIED**; the rate is ≥82 % and currently 100 %.
  - **Mechanism:** after the response is committed, the invocation's outbound
    I/O does not complete. Platform internals need not be resolved — the
    correlation and the repo's own `eval-ci` comment state the rule.
  - **Why S61-CLEAN-1 failed:** it changed `await` → `void`, but the flush was
    **always** post-response (`res.status(200).json()` returns inside `try`,
    `finally` runs after). It fixed blocking, never the mechanism.
  - **Consequence not previously named:** the `claimed > 0` branch (real golden
    work) flushes post-response too — **those spans are lost as well.**
  - **AUTHORED FIX (G1 of the next round):** move the flush **before**
    `res.json()`, matching the two endpoints already proven clean. No new
    dependency, no `waitUntil`, **`OTEL_FLUSH_TIMEOUT_MS` still must not be
    widened**. S61-CLEAN-1's concern was moot: golden-runner is a cron, nobody
    awaits its response.
  - **Verified but unused alternative:** Vercel `waitUntil` from
    `@vercel/functions` exists and is documented for Node.js — **not a
    dependency today** (`@vercel/node` only). Reserve as structural floor if
    the pre-response flush proves insufficient.
  - **STILL OWED:** read the new G0 diagnostic line in production once
    `dpl_B9dAqv53…` is READY. It CONFIRMS or REFUTES the above; the fix does
    not ship before that read (S62-1 discipline).

**OPEN (new this session):**

- **F174 · OPEN (medium) — synthetic-traffic ceiling caps the K1 data gate, and
  the lever is the QUESTION SET, not the ceiling.** Verified from code + live
  logs: `synthetic.dailyTokenCeiling` = 200 000 (governed L1 param,
  `agentParams.ts:389`, range [10k, 2M]); `ratePerMinute` = 5 (live-confirmed);
  cost per injection = **400, a CONSTANT ESTIMATE** not a measurement
  (`runSyntheticInjectorTick.ts:33`); day rolls at **00:00 UTC**
  (`startOfTodayUtcIso`). Arithmetic: **exactly 500 injections/day**; observed
  linear +2 000 tokens/min (00:36 → 74 000; 00:39 → 80 000) ⇒ **starts 00:00,
  hits the ceiling ~01:39 UTC, then sits idle ~22.4 h logging an error line
  every minute**. Frame-record rate 5/5 = 100 %.
  **TOTAL-45 flag:** the field `tokensToday` is a CLAIM — rows × 400, not
  metered spend. Sibling of F161's `total=45` lesson; a gauge-honesty item in
  its own right.
  **The diagnosis:** authored set = **29 utterances** ⇒ 500/day = **~17
  repetitions of the same 29 questions daily**. That measures classifier
  *stability*, not *coverage*. K1's taxonomy §8 question is a COVERAGE
  question. **Raising the ceiling buys more repeats, not more coverage** — the
  lever is publishing the 8 utterances already authored in
  `cwf-synthetic-question-set-v2-additions-v1` and widening the set.
  **UNVERIFIED:** the live `synthetic.activeSetId` row count was not read from
  the DB; 29 is from the authored doc. Owner-owned judgment (spend/breadth).

- **F175 · OPEN (HIGH) — the clarification catch-all: ROOT-CAUSED, one wrong
  condition eats ~60 % of traffic.** Owner ran 10 real turns; **7 failed, 6
  with the identical message** *"Hangi varlığı (hat/bölge/ekipman)
  kastettiniz?"*. Verified chain:
  1. `chat.ts:188 runTurnPipeline` → `:241 computeTurnClarification` →
     `:268 runStreamStage`. **The gate runs AFTER the whole pipeline** — tool
     selection, prompt assembly, knowledge warm, trust warm — and BEFORE the
     model is ever called. A turn with **60/145 tools already selected** was
     discarded.
  2. `computeClarification.ts` fires on
     `entity_ref.length > 0 && resolvable === 0` — all-or-nothing, HIGH,
     REPLACES generation outright.
  3. `stageClarify.ts:97` — `if (frame.object !== 'FACTORY' || …) return;` —
     **the factory-registry resolver only runs when the query's SUBJECT DOMAIN
     is FACTORY.** Live proof (07:58:05): `object=EMPLOYEE`,
     `entity_ref=[Ganit fabrikası, sırlama 3-4-5, 4-12 vardiyası]`,
     `[EntityResolve] **alias** … resolved=[]` — the registry path never ran,
     so ENTITY-FLOOR-1's Damerau-Levenshtein ≤2 never got its chance at the
     one-character typo `Ganit`→`Granit`.
  4. The IR frame **over-extracts non-entities** into `entity_ref`
     (`4-12 vardiyası` = a shift; `sırlama 3-4-5` = a line range).
  **Contrast:** `stageClarify.ts:200` — `if (!ctx.frameRoutingEnabled ||
  !frame) return null` ⇒ **the gate is structurally unreachable on the keyword
  floor path.** Those 6 turns would have reached the model on the floor.
  **The literature's name for the error** (see the SOTA doc §2.2): we treat an
  **epistemic** failure (our lookup missed) as **aleatoric** ambiguity (the
  user's intent is unclear) and hand our own failure to the user.
  **Design direction is authored, NOT approved** —
  `cwf-sota-understanding-layer-v1` §6: mention-level type gate (not
  `frame.object`), candidate generation ungated, and a **two-threshold rule**
  (`τ` NIL / `β` margin) yielding three distinct behaviours LINK / NIL /
  AMBIGUOUS. Owner approval required before any phase prompt.

- **F176 · OPEN (low) — `rule26` local flake, `api/admin/rules.ts`.** 39/40
  locally under full 7-worker parallelism, 2/2 clean in isolation, untouched by
  the LOG-TRUTH-1 diff; CI's own `rule26` job passed. AG reported honestly
  instead of retry-to-green (S55-1 respected). **Distinct file from the
  PANE-SCROLL Replay flake** — a second instance of the same class. Belongs
  with PANE-SCROLL-2's permanent CI-worker root cause; **no band-aid** (S61-2).

- **F177 · OPEN (low) — the learned keyword map is FROZEN and UNMEASURED.**
  Established this session, and the owner's question *"benim öğrenilmiş
  kelimelerim ne oldu?"* had no answer until now. Facts: learning into the
  shared map is suppressed on the frame path (`stageTools.ts:494` `[ToolFilter]
  learn suppressed basis=frame (cross-layer guard)`); the semantic branch
  instead records **proposals** (`toolCategories.ts:875` / `:1017`
  `recordRouteProposals`, `path === 'semantic'` only). So learning did not stop
  — **it dropped from authority to proposal.** The guard's reason is sound: a
  floor trained on the router's decisions becomes a distorted copy and destroys
  the A/B lens's comparability.
  **The unnamed consequence:** the outage floor is now **frozen AND
  unmeasured** — insurance never tested. `routerAbLens` can measure it; F129
  blocks the trigger.
  **UNVERIFIED (do not premise):** (a) why `proposals=[]` on the owner's turns
  — the router proposed nothing; (b) whether a REVIEW SURFACE for
  `router_proposals` exists, who reviews it, and how many rows have
  accumulated. Both are one-session Architect reads.

**CARRIED OPEN from v62 (full wording v62 §5 / v61 §5):** F172 (tautological
first tool_doc overlay; owner-owned v2 publish closes it — three candidate
questions named in v62 §5) · F171-B (language-policy unification, B5 behind the
freeze) · F153 (external ops PARK) · F158 (render 0 ≠ empty cell) · F160
(multi-series single chart, VIZ-BIND lane) · F164 (Superset search robustness,
OPEN-LATENT) · F165 (unbounded-list tool budget + i18n, B5) · F166 (cross-turn
viz binding — AFTER B3; memory must NEVER be a viz data source) · F129
(router-ab lens: no UI trigger, token cap still a code constant not a governed
`quota.*` param — **now on the critical path**, see §8) · blind_spot row option
(MOOT under coverage-is-config; do NOT add).

## 6 · RULES / RECORDS — all prior survive by name (pointer v62 §6 + KB).
**NEW THIS SESSION:**
- **S62-1 (diagnostic discipline, standing) — ENUMERATE THE CALL SITES.** When
  a symptom is endpoint-specific, do not hypothesise about the mechanism;
  enumerate **every** caller of the shared mechanism in code, count each one in
  production, and read off the variable that differs. F169 resisted two guessed
  patches and a session of cold/warm theorising; a three-endpoint table settled
  it in minutes and produced a five-line fix. Corollary: **the differing
  variable is the cause; a hypothesis that does not name a differing variable
  is not yet a diagnosis.**
- **S62-2 (owner-legislated, standing) — NO LAYER WITHOUT A TARGET FUNCTION.**
  Born from *"Bir mantık silsilesine oturtup bir hedefe doğru gittiğimizi
  görmüyorum… bir mantık silsilesine oturtalım."* Before a layer is added to
  the understanding stack, its **success metric must be named and
  measurable**, and a **baseline must be taken before the fix**. The
  understanding stack (keyword map → hygiene → semantic router → IR frame →
  entity gate → frame-primary flip) accreted precisely because *"the agent
  understood the question"* was never defined. Four metrics are now named in
  `cwf-sota-understanding-layer-v1` §7: slot-level F1 · Acc@1 + NIL-sensitive
  accuracy · **Recall@k** · AUROC under interaction budget `b`. **Two of the
  four already have their raw material and are unused.**
- **S62-3 (tooling boundary, recorded):** the Architect's review sandbox is
  **rate-limited on `api.github.com`** (shared IP, HTTP 403). CI cannot be
  verified Architect-side. **Therefore CI verification is folded into the AG GO
  block as a blocking STEP 1** with an explicit pass condition (run conclusion
  == success AND the named job's own conclusion == success; `in_progress`/`null`
  is NOT a pass). Used successfully in S62 — AG re-queried and the stuck
  `rule26` job settled to `success`. PLATINUM-correct: judgment-free
  verification goes to the machine lane, never to the owner.
- **Reaffirmed in practice:** S61-1 (**AG violated it** — used `git stash -u`
  for the test baseline; the reported value 350/3711 was independently
  corroborated by register v62's floor so no re-run was ordered, and the rule
  was restated in the GO block as a process note) · S61-3 (tail anchor carried
  in the GO block; relay arrived intact) · S43-2 FAST-GATE (one ≤60 s batch:
  merge-base, scope, zero migrations, frozen-surface diff, security greps,
  named-deliverable point-greps) · S54-2 (Architect drove F174/F175 forward
  while AG worked, without a prod) · S37-1 (the SOTA doc is v1 and immutable
  once presented).
**ARCHITECT PREMISE-ERROR TALLY (arc S59→S62 = 14):** items (1)–(12) carried by
name from v62 §6. **NEW:**
- **(13) — Architect's own, S62.** Framed F169 as a **cold/warm** question (H1
  cold-TLS vs H2 stale keep-alive socket) and pre-registered both. **Both were
  the wrong axis**: the real variable is **flush before vs after the response**.
  Caught by the Architect's own verification (the three-endpoint enumeration)
  within the same session, before any artifact shipped.
- **(14) — inherited, S61-CLEAN-1's merge message.** *"the
  `frame.object==='FACTORY'` gate was never the cause"* — TRUE for F170's zone
  class, **FALSE for the non-FACTORY query class** (F175). Falsified by live
  production logs. Note this is the mirror of premise **(11)**, which corrected
  the Architect in the opposite direction; the correct statement is narrower
  than either: `frame.object` names the query's subject domain, and **because**
  it does, it must not gate entity resolution at all.
**Discipline note:** #9, #12 and now **#13** were caught by the Architect's own
verification of the Architect's own work. The loop is closing on itself.

## 7 · WATCHES / PARKED
- **PANE-SCROLL Replay CI-flake** — v62's ruling stands; **F176 is a second
  instance in a different file.** Permanent fix = PANE-SCROLL-2 / CI-worker
  root cause. Recurrence count still rising. No band-aid.
- **Vercel MCP log-query technique (NEW, operationally load-bearing):** wide
  windows **time out** — scope to a `deploymentId` and ≤30 min for detail
  reads. **`group_by=requestPath` is the fast path** and works over 12 h; use
  it to locate traffic first, then narrow. **Query contamination is real:**
  `"ceiling"` matched golden-runner's `ceilingFailed`, `"Frame"` matched
  SynthTraffic's `frame-only`. Use a distinctive content word
  (e.g. `"Ganit"` landed exactly on the two failing turns).
- **Supabase 522 incident 2026-07-23 06:44–06:56 UTC** — architecture
  vindicated (code floor served, no fabrication). Watch for recurrence.
- **`seed_state` 23505 = BENIGN BY DESIGN** and **expected to increase** after
  F167. Do not re-diagnose.
- **docVersion 141→142 (+1)** — normal single reseal this session (two tabs:
  Architecture Map, Agent Control Plane, both mapping
  `observability/**`). The v57 (125→126) and v62 (139→141) notes stand.
- Carried from v62 by name: JWT ES256 transient · GatewayEnum full double-sweep
  per health tick · enumeration swallowed errors ×2 (`get_instance_info`,
  `search_tools(metadata)`) · NTP transient · keyword-layer stopword learning
  (traffic-window locked; **see F177 — the map is now frozen anyway**) ·
  **stale-branch sweep still owed** (`obs-trace-2b` · `flake-sweep-1` ·
  `pane-scroll-1` · `pane-scroll-2` · `hotfix/f152`); `log-truth-1` deleted at
  merge ✓.

## 8 · OWED AT S63 OPEN — dependency-ordered
1. **Confirm `dpl_B9dAqv53ctQGGJuY8zPkd1N7JegQ` is READY** on `194f6a8`, then
   **read the production `[Obs]` diagnostic line.** Expected under the S62
   diagnosis: WARM + never-settles + `langfuse` named. This CONFIRMS or
   REFUTES; no fix ships before the read.
2. **F169 fix round** — pre-response flush in `golden-runner`. HOTFIX ceremony
   profile (single file, no api/shared/migration/security surface).
3. **F173 live confirmation** — Operator read: has the 22P02 template stopped
   firing since deploy?
4. **F175 — owner approval of `cwf-sota-understanding-layer-v1` §6**, then
   MEASURE-FIRST: F129 (router-ab lens trigger + governed token cap) to
   establish a **Recall@k baseline**, then the A1 mention-level type gate, then
   the τ/β decision rule, then attribution visibility.
5. **F174 decision** — publish the 8 v2 utterances (breadth) vs raise the
   ceiling (repetition). Architect's committed recommendation: **breadth**.
6. **F177 reads** — why `proposals=[]`; does a `router_proposals` review
   surface exist; row count to date.
7. Then **B3 / MEMORY-1** design note (F166-aware).

## 9 · YOUR ACTION ITEMS (owner, at v63 write / S62 close)
- Add to the project: this register `v63`, `CWF-SESSION-GRAPH-KB-v61`,
  `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v61`, and
  **`cwf-sota-understanding-layer-v1`**.
- To start S63: paste bootstrap `v61` into a fresh session.
- **Decision owed (F175):** approve or reject §6 of the SOTA doc — especially
  **Stage C**, which proceeds with a visibly attributed best guess instead of
  stopping. It may read as "answering when unsure"; the Architect's defence is
  ADR-001's own logic: *don't make a wrong resolution impossible, make it
  VISIBLE.*
- **Optional, owner-owned judgment:** F172 v2 overlay · F174 set breadth.
- Relay stays the only owner surface.

<!-- END · cwf-open-items-register-v63 · 2026-07-23 -->
