# CWF — Open Items Register · v57

<!-- cwf-open-items-register-v57 · rev 57 · 2026-07-21 · Closes S55 (the FULL-TRACE
     session). Supersedes v56. GOLDEN LEDGER RULE (Altın Kural): append-only; items
     leave ONLY via CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO; carry-diff pasted
     below; no summary-of-summary — every F-number, phase, gate, watch, parked entry
     survives BY NAME with a one-line essence + pointer to its last-full-wording version. -->

## VERIFIED FLOOR (S55 close)
master **`49ea01d4d9d93fa7bd7c0d7e52197a88e13382ae`** · docVersion **rev 126** ·
drift [OK] · ZERO pending migrations. Test count ~3340 tests / ~321 files
(CI-arbitrated, unsharded — S37-2). The FULL-TRACE program is fully live.
Session actor map unchanged: Architect=Claude · AG-A/AG-B=Claude Code on
AntiGravity (all repo writes) · Operator=Gemini + Supabase MCP (`supabase db
push` only, project `fjbrkimwvtpwoxhziidh`).

---

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v56 → v57
Every v56 item accounted for. Terminal markers minted THIS version:
- v56 §1.4 **BATCH-W phase (W-1..W-12) → CLOSED@dca514c** (PHASE BATCH-W-1, PR
  #84, rev 121). Dispositions below (§6-BW). W-5's register-suspect was WRONG
  (Architect tree-corrected: no scrubber in emit path; fault was client-side
  permission-race + fabricated-zero render — see §6-BW). W-12 register premise
  "4 gateway tools" CORRECTED to THREE (`resolve_time_range`, `aggregate_records`,
  `query_records`).
- v56 §1.6 **F147 → RE-QUEUED (does NOT ride BATCH-W)** — its condition "if W-5's
  fix opens the emit path" evaluated FALSE (emit path needed no fix). F147 stays
  OPEN for the IR-3-era api batch, wording carried whole below (§1.6).
- **F148 (NEW→DELIVERED@3ef02f8)** — dropped-category NAMES on the register-tools
  span (`semanticRouter` returns `droppedNames`, `dropped === droppedNames.length`;
  `cwf.route.dropped_names` attr). Shipped inside OBS-TRACE-1.
- **F149 (NEW→CLOSED@6592a1b)** — rule26 cold-start flake: stale
  `@mui/@emotion` `optimizeDeps.include` ghost deps forced mid-run Vite
  re-optimization reload; removed + dead MUI plugin removed + CI-only retry belt
  (`retries: process.env.CI ? 2 : 0`) on the routing four-mode test. Root-fix
  validated retry-FREE 5/5 (stochastic-verification gate). Retry-premise
  CORRECTION: the belief "VSplit describe has retries:2" was FALSE — `18ea0ab`
  added it, `4de6cc9` (TOOLMATCH-IA-1) removed it with the VSplit component;
  ZERO retries existed on this tree until F149.
- **F150 (NEW→OPEN)** — 11 `.rpc()` call sites stay untraced by OBS-TRACE-2's
  `.from()`-proxy (separate PostgREST surface, NOT a chokepoint bypass; the
  span-guard cannot catch a read that opens no span). → OBS-TRACE-2b follow-up
  (small, additive, wrap `.rpc` too). AG-B-flagged honestly.
- v56 §1.1 traffic window / §1.2 IR-3 / §1.3 IR-4 / §1.5 MEMORY-1→security→docs /
  §2 GOLDEN FREEZE / §3 M-WAVES / §4 PARKED+WATCH+BOARD-WALK / §5 RULES / §6
  FINDINGS — **all carried below BY NAME, unchanged except where a terminal
  marker above applies.**
- **Absent-without-terminal-marker check: EMPTY** — every v56 item is carried
  below by name.

---

## THE-SESSION (S55) — what shipped, in order (append-only narrative anchor)
Boot floor `e1218ba` rev 120 → close floor `49ea01d` rev 126. SEVEN merges +
one hotfix + one Operator migration:
1. **BATCH-W-1** (PR #84) → `dca514c` rev 121 — the walkthrough dozen.
2. **F149 hotfix** (PR #85) → `6592a1b` rev 121 — rule26 ghost-dep flake.
3. **OBS-TRACE-1** (PR #86) → `3ef02f8` rev 122 — per-stage Langfuse I/O
   backbone + routing chain (query→keywords→matched/dropped category NAMES→
   offered tool NAMES) + F148 + MCP tool I/O.
4. **OBS-TRACE-1b** (PR #88) → `d19ed97` rev 123 — closed all 12 remaining
   undefined spans + three-layer completeness guard.
5. **OBS-TRACE-2** (PR #87) → `21ab667` rev 124 — `cwf.db.read` span layer over
   the single `getServiceClient` proxy (all 144 reads traced by construction) +
   `DB_TABLES`-derived secret deny-list + serverless flush guard.
6. **OBS-TRACE-3** (PR #89) → `49ea01d` rev 126 — `turn_trace_digest` mirror +
   gated read endpoint + per-stage live I/O on StageCards (routing chain inline)
   + InspectTab breakdown + §G0 root-span observation I/O. Operator-applied
   (`20260721120000_turn_trace_digest.sql`), verifyGrants 52/0, live-verified.

**FULL-TRACE MANDATE DELIVERED end-to-end** — every stage / DB read / tool / root
I/O visible in BOTH Langfuse AND the StagesDashboard, live-verified on real turns
`a1cb63ab` (OEE) and `4123b465` (OEE chart). The owner's "boşluk KALMASIN /
godmode" directive is satisfied.

---

## 1 · REMAINING SPINE (owner-locked — carried from v56 §1, updated)
1. **Traffic window OPEN → review ~2026-08-02**, DOUBLE-instrumented: keyword
   evidence (ADD-1/proposals/badges) AND IR-1 shadow frames LIVE since
   2026-07-20 10:38Z (`frame=on`). Review = **K1 ratification** (taxonomy §8
   WITH data) + window-pool items (§4). *(Unchanged from v56 §1.1.)*
2. **IR-3 — THE flip** (frame→semantic→keyword primary; clarification ACTIVE;
   COMMAND×F80 honest message). Depends: IR-1 ✓ · IR-2 ✓ · K1. RIDERS riding
   IR-3: `semanticRouter.ts:179-181` stale "only ever floor" comment · F134 ·
   F146 · F147 (NOW confirmed IR-3-era, not BATCH-W) · enrichment 4th-tier
   sentence when that tier activates. *(v56 §1.2 + F147 re-homed.)*
3. **IR-4** — one page of Path B contract prose inside IR-0. Zero build.
4. **F150 → OBS-TRACE-2b** (NEW, small) — wrap `.rpc()` (11 sites) so
   stored-procedure reads also trace. Additive to OBS-TRACE-2's proxy. Owner's
   FULL-TRACE mandate makes it eventually-required; not urgent.
5. **MEMORY-1** (episodic; stages 05+14; unblocks F83 arc: KB→web→write-back) →
   **security-cleanup block** (mcp_settings 6/6 raw→apiKeyRef + DB-introspection
   endpoint) → **FINAL combined docs+arch pass**. *(v56 §1.5.)*
6. Carried by name: **F133-L5** (unminted; freeze queue) · **F118 · F119 ·
   F120** where surfaces touched · **F147:** `GroundingViolation.backendId`
   attached at detection + threaded through the telemetry emit
   (`checkScopeDivergence` reads `tr.provenance?.backendId` internally; additive;
   enables named-backend catch copy + per-backend counts) — rides the IR-3-era
   api batch (BATCH-W path was ruled out this session). · **F146
   (POST-WINDOW):** probe context + per-layer attribution lens — all three rungs'
   provenance at once (IR-3 era); probe computes NO sticky today (R3 retreat).
   *(v56 §1.6, F147 clause updated.)*

---

## 2 · 🧊 GOLDEN FREEZE BLOCK (unchanged from v56 §2, engaged)
Staged-behind-freeze: **viz v4 · safety.b1_scope v3 · tools.rule.1 v2 ·
tools.rule.6 v2** (F140/F138/F139 STAY OPEN until freeze lifts) + F133-L5 once
minted. Carried whole: quota records (ksadmin replay-exempt/no-limit, audited) ·
GOLDEN-BATCH-2 (F142) · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1 ·
S50-viz4 job payload ARCHIVED · W3b job SUPERSEDED (kept). Tree-proven boundary
(S54): golden batch fires ONLY for `prompt.segment` (`golden-runs.ts:68`;
`dbConstants.ts:493`) — router.prompt + agent-param publishes ride the normal
eval gate. **No golden token spent this session** (OBS-TRACE program touched zero
prompt.segment surface).

---

## 3 · M-WAVES — carried whole (v53 §3 wording via v54/v55/v56). S55 delta: the
FULL-TRACE observability layer is now the live face of every M-wave debug need —
the "isolate behind an interface" reuse contract is realized (one `setSpanIO`
helper + one `getServiceClient` proxy trace everything, EAIP-portable). SEVEN
S55 merges: dca514c · 6592a1b · 3ef02f8 · d19ed97 · 21ab667 · 49ea01d (+ F149
`fbe2d05` pre-merge). Full merge-hash lineage in KB v54.

---

## 4 · PARKED / EXTERNAL / WATCH (carried from v56 §4)
Carried by name: **F134** (annotation unchanged; ALSO an IR-3 rider) · **F135** ·
first live viz-v4-compliant combined chart (freeze-staged) · **F122** first
`finishReason=error` watch · LANGFUSE-V4-UPGRADE · separate-POC-key belt
DEFERRED · **Kale-RAG external arc** (enters as an MCP backend ROW when their
side is ready) · STAGE-PLAYGROUND · **Superset E-activation** (DB-first serve;
seedRules + backend_id backfill — dedicated workstream, owner-scheduled).
- **BOARD-WALK (owner: "ASLA unutma" — NEVER drop; re-raise EVERY round close,
  BY NAME in every carrier):** cards **00·03·07·11·12** re-walked this round via
  the LIVE OBS-TRACE StagesDashboard (the FULL-TRACE screenshots ARE the walk —
  every stage card now shows real I/O + db reads + routing chain). Remainder
  cards **01·02·04·05·06·08·09·10·13·14** — the OBS-TRACE panel now RENDERS them
  with live data, so the next re-walk is a content/legibility pass over cards
  that already have real data. Re-walk at NEXT round close stands.
- **Watches (live):** `routing_mismatch` ticks · learn-quality (map ~141 rows;
  suffix/ASCII-variant keys as IR evidence: 'haftalikk','deki','nin','hattının'
  class) · divergence-badge rates · **WINDOW-POOL:** semantic-router reliability
  N=2 (one 1613ms timeout + one provider-error; ladder fell to keyword floor
  gracefully BOTH times, answers correct; review ~Aug 2, NOT a hotfix) ·
  ASCII-stopword top-up candidates beyond 'icin' ('yapalim/istenen/verilerini'
  class — defer to review). *(All unchanged from v56.)*
- **NEW watch (S55):** docVersion jumped 125→126 at the OBS-TRACE-3 merge (an
  extra reseal beyond the PR's 124→125) — benign, noted for traceability; verify
  no manifest drift at next drift-gate run.
- **NEW cleanup (S55):** `obs-trace-3` remote branch not deleted post-merge
  (also `obs-trace-1/1b/2` branches) — GitHub hygiene, owner/AG-B discretion.

---

## 5 · RULES / RECORDS
v56 §5 carried WHOLE by name (K1 clarified · K2 · K3 · S52-1/2 · S53-1/2 ·
HYGIENE SWEEP · SC-1 · naming law · Step-0 project-confirm · DB-INTROSPECTION ·
doc-drift false-alarm · RTF recovery · PLATINUM-BREACH-4 · S49-1 · S50-1 ·
relay identity-tag · naming-collision grep · executable acceptance probe ·
S54-1 · S54-2 · S54-3+PLATINUM-BREACH-3 · S54-4 · CHANGELOG ruling · S32-1
wording note). **S55 adds:**

- **FULL-TRACE MANDATE (owner-legislated, CONSTITUTIONAL — sits beside PLATINUM
  & GOLDEN LEDGER):** every pipeline stage, every DB/table read, every tool call
  — its INPUT and OUTPUT must be visible in BOTH Langfuse and the
  StagesDashboard. No read stays dark. "We can only improve what we can trace";
  "we design the box, not press a button and wonder why the lamp lit." The ONLY
  thing scrubbed is raw secrets/tokens — category names, tool names, extracted
  keywords, row counts, DB result shapes are ALL visible. Enforced BY
  CONSTRUCTION via the completeness guard (below). Born from the owner's correct
  pushback against the Architect's over-applied "don't log raw router output"
  rationale (that rationale is valid for the durable ledger / Vercel logs, WRONG
  for the in-infra self-hosted Langfuse debug surface, which ADR-004 designed to
  hold full scrubbed I/O).
- **COMPLETENESS GUARD (mechanism, standing):** `spanIOCompleteness.test.ts`
  (OBS-TRACE-1b) enumerates every span a representative turn emits and asserts
  each carries `OBSERVATION_INPUT`/`OUTPUT` OR is in an explicit (currently
  EMPTY) `SPANS_WITHOUT_IO_ALLOWLIST`; PLUS a classification test — every
  `SPAN_*` constant in config.ts must be bucketed (turn-path / non-turn /
  prior-phase), so a FUTURE span added without I/O and unclassified fails CI. The
  mandate holds without anyone hand-enumerating spans. Pattern = the RULE-26
  no-scroll-trap allowlist ported to observability. Red→Green proof is the
  load-bearing acceptance artifact (a guard green from the start is worthless).
- **ADR-008 (turn_trace_digest):** a THIRD system in the split — `telemetry_events`
  = permanent redacted LEDGER · OTel/Langfuse = rich causal TRACES ·
  `turn_trace_digest` = bounded-retention (14-day cron) DISPLAY-ONLY DEBUG MIRROR
  of per-turn span I/O. Reconciles against ADR-004's "never emit ledger rows from
  span processors" (judgment call — the digest is display-only, never authority;
  a standing lint test `turnTraceDigestDisplayOnly.test.ts` forbids any
  governance/grounding/gate/trust file importing the digest repo/sink/builder —
  C1-LAW spirit).
- **G3 SCOPE RULING (PANEL-RESIZE-1 reconciliation, standing precedent):** the
  page-scroll law (W-1) does NOT convert deliberate fixed-viewport layouts.
  PANEL-RESIZE-1's VSplit (`f1c40d8` — Tool Matching + Providers, "RULE 26 by
  construction") is an intentional exception, ALLOWLISTED in the RULE-26
  no-scroll-trap assertion with a one-line justification; W-1 fixes only OTHER
  gratuitous inner scrollboxes. A deliberate interactive layout ≠ a scroll trap.
- **ROOT-SPAN I/O nuance (record):** the root `cwf.turn` span carries `TRACE_`
  (trace-level) AND — after §G0 — `OBSERVATION_` (span-level) I/O. Langfuse's
  TIMELINE view shows observation I/O (looked `undefined` pre-§G0); the TREE view
  shows the trace face. §G0 stamps both so clicking the root span itself shows
  query+answer. Same scrubbed payload (`scrubbedRootInput`), DRY, no re-scrub.
- **G3 auth two-tier ratification (S55):** OBS-TRACE-3's digest endpoint is
  two-tier — own-turn = PANEL_ACCESS, cross-user = additionally TELEMETRY_READ_ALL
  (mirrors `stage-context.ts` cross-user precedent). AG-B deviated from the
  literal "PANEL_ACCESS-gated" brief for security (the digest carries more
  per-stage I/O than telemetry_events); the deviation was RATIFIED (S54-4 spirit
  — an agent's correct security judgment stands).
- **S55-1 (Architect-owned lesson, standing):** a diagnosed transient is NOT a
  license to say "just rerun." The Architect over-called the rule26 flake as a
  one-off ("rerun clears it"); master stayed RED after 2 reruns. Correction: a
  high-rate flake demands a ROOT-CAUSE fix + N-rep retry-FREE validation, not
  optimism. The project's own stochastic-verification rule applies to the
  Architect's own predictions. (F149 was the redemption.)
- **S55-2 (relay discipline reaffirmed):** when a new version of a cross-lane doc
  is minted mid-flight (OBS-TRACE-3 v1_2's §G0) while an AG is already building
  the prior version, do NOT hand the AG the new doc (forces a restart). Let the
  AG finish, then apply the delta as a single small in-branch addition at review
  (§G0 was folded as one commit on the existing branch). Extends S54-3.

---

## 6 · FINDINGS LEDGER Δ (S55)
- **F148 DELIVERED@3ef02f8** (dropped-category NAMES on span; §0).
- **F149 CLOSED@6592a1b** (rule26 ghost-optimizeDeps flake + retry belt; §0).
- **F150 OPEN → OBS-TRACE-2b** (`.rpc()` untraced, 11 sites; §0/§1.4).
- **OBS-TRACE-1 @3ef02f8** — `setSpanIO(span,{input?,output?})` helper (hard no-op
  when span undefined); register-tools OBSERVATION_OUTPUT = `{path, matchedCategories
  [names], droppedCategories [names], stickyAdded, offeredToolNames [array],
  offeredCount, gatewayCount, canonicalOeePresent}`; MCP tool I/O promoted.
- **OBS-TRACE-1b @d19ed97** — 12 spans closed: warm.provider/knowledge/prompt/
  params/trust, stage.10.stream (`toolLoop/rounds/finishReason/outputTokens/
  empty`), stream.attempt, grounding (`violationCount:0` proven real), mcp.attempt,
  mcp.discover, flush (renamed `tokenSummary`→`usage.totalTokens` after the guard
  caught a redaction-deny-list collision with the singular `token` segment),
  replay.turn. Nested-consistency FIX: `warm.trust` child == stage output.
  Completeness guard (three-layer) minted. Allowlist EMPTY.
- **OBS-TRACE-2 @21ab667** — `dbReadSpanWrap.ts` transparent Proxy over
  `getServiceClient()` (terminal `.then()` opens `cwf.db.read`, `return this`
  self-chaining re-proxied, idempotent wrap G2.1). Payload: `table/op/
  filter_summary (values redacted)/row_count (empty≠zero: 0 real, absent on
  fail/no-select)/latency_ms/ok/error_code (.code only, never .message)`. Secret
  deny-list `SECRET_READ_TABLES` from `DB_TABLES` (llm_provider_secrets,
  mcp_secrets, llm_providers_personal) — no sampleHead, redacted filter; hard
  leak test (seeds `sk-live-…`, asserts absent from EVERY setAttribute/s).
  `SPAN_DB_READ` classified TURN_PATH + CROSS_STAGE for the 1b guard. Live-proven:
  db reads nest under their stages (resolve-mcp reads mcp_global_settings/
  mcp_settings/backend_tools/backend_health; warm.trust reads backends/
  backend_authority); `conversations` read `rowCount:0 isEmpty:true`;
  `telemetry_events` INSERT `rowCount:null`; apiKey/Authorization/apiKeyRef
  `[REDACTED]`.
- **OBS-TRACE-3 @49ea01d** — `turn_trace_digest` (PK=turn_id RULE-28, conv_id NOT
  a FK [display-only cascade safety], user_id refs auth.users on-delete-set-null +
  attribution jsonb S33-1, stages jsonb, token_summary jsonb); migration
  `20260721120000` Operator-applied (RLS on, zero policy, all-grantees revoke
  citing HARDEN-GRANTS-1 S30-1, verifyGrants 52/0, REFERENCES/TRIGGER on
  service_role/postgres = known-harmless HARDEN-GRANTS-1 obs-(c)); 14-day cron
  cleanup (CRON_SECRET-gated); `DigestSpanProcessor`/digestSink/digestBuilder tap
  the already-scrubbed span I/O by reference (no re-serialize), written once at
  flush; gated 2-tier endpoint; StagesTab "last turn" + InspectTab inline
  breakdown; §G0 root-span OBSERVATION_INPUT/OUTPUT. Live-verified: root span
  shows query+answer (Tree view), StagesDashboard stage-11 shows `recorded ·
  getOeeValuesForZones has data·43827B` + empty≠zero pedagogy + open-Langfuse-trace
  chips.
- **BATCH-W-1 @dca514c — the walkthrough dozen (W-1..W-12) dispositions (§6-BW):**
  - **W-1 CLOSED** — page-scroll law + RULE-26 no-scroll-trap assertion (explicit
    allowlist, "really capped and scrolling not a dead class" discriminator);
    VSplit allowlisted per G3 ruling; VSplit e2e unbroken.
  - **W-2 CLOSED** — probe result = full-height wrapping chips (shared component).
  - **W-3 CLOSED** — three-arm probe (floor/live/preview, `Promise.allSettled`),
    membership dots (orange/green/turquoise theme tokens) + per-pair diff summary;
    honest per-arm error render.
  - **W-4 CLOSED** — Frame Observation card binds live `router.frameEnabled`
    (via `router-frame-status.ts`), tri-state on/off/unknown.
  - **W-5 CLOSED (register-suspect corrected)** — root cause was NOT
    redaction/allowlist eating `payload.kind` (no scrubber in the `ctx.emit →
    record` path; rows DO reach the DB). Real fault CLIENT-SIDE two-headed:
    permission-race dead fetch (`useEffect [] + if(!mayCurate) return`;
    capabilities load async → fetch skipped forever on deep-link arrival) +
    fabricated-zero render. Fix: effects re-keyed on `[mayCurate]`/`[mayDraft]`;
    `loadDrafts`/`loadProposals` shared the race, swept. `ir_frame` telemetry
    does NOT share the fault (write side sound). → this is WHY F147 does not ride
    BATCH-W.
  - **W-6 CLOSED** — honest null/empty/rows trichotomy in the hygiene strip
    (`learnAgg===null`→loading, `[]`→"henüz kayıt yok", rows→real sums; never a
    fabricated `kept=0`).
  - **W-7 CLOSED** — Tool Matching PanelPrimer LIFECYCLE line, human onboarding
    voice (TR/EN).
  - **W-8 CLOSED** — stage-03 + stage-07 offered-tool walls → shared wrapping-chip
    component.
  - **W-9 CLOSED** — stage-03 card teaches the REAL ladder (semantic router →
    keyword floor, live graceful-fallback, frame-in-shadow).
  - **W-10 CLOSED** — Langfuse chip visible "copied — paste into search" feedback.
  - **W-11 CLOSED** — "how to read a trace" collapsible (question→span map;
    provider reasoning closed-box count-only).
  - **W-12 CLOSED (register premise "4 gateway tools"→THREE)** — `resolveStage11`
    unions `LOCAL_TOOL_NAMES` (SSOT: `resolve_time_range`, `aggregate_records`,
    `query_records`) before the containment check; live check
    (`checkRoutingContainment`) structurally cannot false-fire on local tools;
    null-branch untouched (never fabricate a violation).
- **S54-1 tally (carried + S55 additions):** SEVEN Architect premise errors (S54)
  + **S55 catches:** W-12 "4 gateway tools"→3 · W-5 register-suspect
  (redaction) wrong · F149 "VSplit has retries:2" wrong · G3 PANEL-RESIZE-1
  conflict (AG-A caught pre-code) · AG-B PR#86 report cited stale anchor
  `e1218ba` (actual merge-base `6592a1b` — RULE-25 caught it, rebase was correct).
  The two-lane critique loop remains load-bearing; RULE-25 fresh-clone catches
  report errors.
- Carried unchanged by name from v56 §6: **F144 CLOSED@38b3c1b0** · **F145
  CLOSED@e8a42833** · **IR-1 @0c0db5c** · **FRAME-OBSERVE-ON CLOSED@evidence** ·
  **IR-2 @eddf83e** (constitutional SEEDING RULING: rules NEVER enter via raw
  SQL — KIND_REGISTRY + REFERENCE_INSTANCES + selfSeedReconciler F128 is the ONLY
  path) · **TOOLMATCH-IA-1 @134c953** · **DATA-AUTHORITY-1 @e1218ba** · **F132
  CLOSED** · **F133 PARTIAL** (L5) · **F136 CLOSED** · **F138/F139/F140 OPEN**
  (freeze-staged) · **F142 OPEN→GOLDEN-BATCH-2** · **LOG-2 MERGED-INTO F83 arc**.

---

## 7 · YOUR ACTION ITEMS (owner) — standing, at S55 close
Zero blocking manual actions. Everything this session is merged, applied, and
live-verified. Discretionary / next-window:
1. **F150 / OBS-TRACE-2b** — say "başlat" when you want `.rpc()` tracing (small,
   additive). Not urgent.
2. **Branch cleanup** — optionally tell AG-B to delete the merged remote branches
   (`obs-trace-1/1b/2/3`, `batch-w-1`, `hotfix/f149`). GitHub hygiene only.
3. **~Aug 2 traffic-window review = K1 ratification** — the main-line next event
   (taxonomy §8 WITH shadow data + keyword pricing + router-reliability N=2). On
   its far side: IR-3 flip → IR-4 → MEMORY-1/F48 → F83 arc → Kale-RAG row →
   Superset E-activation → security-cleanup → FINAL docs+arch pass.
4. **BOARD-WALK re-walk** at next round close (owner "ASLA unutma").
If any response ever contains a manual action, it is surfaced bullet-by-bullet
(the "YOUR ACTION ITEMS" rule). Zero manual actions right now — stated explicitly.

<!-- END · cwf-open-items-register-v57 · rev 57 · 2026-07-21 -->
