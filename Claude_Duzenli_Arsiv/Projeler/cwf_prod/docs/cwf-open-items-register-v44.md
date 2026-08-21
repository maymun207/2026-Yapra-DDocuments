# CWF — Open Items Register · v44

<!-- cwf-open-items-register-v44 · rev 44 · 2026-07-14 · Supersedes v43.
     Closes Session 41–42 (one continuous chat spanning 2026-07-13 evening → 07-14). -->

## 1 · VERIFIED FLOOR (at close, sandbox-verified)
- `origin/master` = **`c5f58a4`** ("Merge VIZ-BIND-1") · **2212 tests / 216 files** · docVersion
  **rev 74** · drift `[OK]` · prod READY on `c5f58a4`.
- History this session: `d3e0c4e` → `dd04831` (PARAM-GOV-1) → `c5f58a4` (VIZ-BIND-1).
- PR #33 (ROUTE-GOV-1 **v1** sub-phase A, rev 74→75, 2214/217) was **CLOSED UNMERGED**, branch
  deleted — its numbers are DEAD; do not cite them.

## 2 · IN FLIGHT
- **`ROUTE-GOV-1 v2_2`** with AG on branch **`route-gov-2`** (spec: `claude-code-PHASE-ROUTE-GOV-1-v2_2.md`).
  PR not yet opened at close. Merge preconditions unchanged (CI green on head, RULE-25, verbatim
  message). After merge, THREE owner-lane steps in order: ① fenced Operator prompt (Architect
  writes): `backend_tools` migration via `supabase db push` — **fold F73 into the same Operator
  visit** (delete user `d388d5c2…`'s credential-less `armesMes` row `mcp-1782457873092-0`);
  ② `npm run seed:rules`; ③ panel: ARMES sync → stage-drafts → publish annotations + read-tool
  category drafts → A3 re-test.

## 3 · COMMITTED QUEUE (order is the sequencing decision — do not reorder)
1. **ROUTE-GOV-1 v2_2** (in flight) — closes the F78/F91 ROOT; answers F80 fail-closed.
2. **GOLDEN-BATCH-1** (F89) — spec approved (`claude-code-PHASE-GOLDEN-BATCH-1-v1.md`, in the
   owner's hands; all 3 owner decisions YES: cron-background · price accepted (~6–12M tokens +
   ~700 live ARMES calls/publish) · governed ceiling `quota.goldenRunTokenCeiling` seed 12M clamp
   [1M,30M]). **DO NOT START before ROUTE-GOV-1 merges** (one phase in flight; two open migrations
   tangle the Operator lane). Unblocks EVERY prompt.segment publish.
3. **viz v2 REPUBLISH** (owner, panel — first golden run through the new machinery). Completes
   F82's model side (`match`/`callId` directive); ambiguity panels dry up at the source together
   with the batch-tool category drafts from step 1.
4. **GATE-VISIBLE-1** (F88 + F90) — design pending (Architect). Silent-422 → loud; stale verdict →
   cleared on selection.
5. **F83.1 `SCOPE-HONEST-1`** — unblocked by step 2. Per `cwf-f83-…-v1_2` §1.5: not "loosen scope"
   but "make the boundary real" (deterministic uncited-advice banner from the retrieval fact;
   model-independent). Then the F83.2–4 arc awaits the Kale RAG corpus (see §5).
6. **EXPLORER-1-FIX-1 batch (REVISED)** — original copy-the-29 purpose is OBSOLETED by
   ROUTE-GOV-1 §D (stage-drafts button). Remaining contents: F81 guard (declared param ⇒ published,
   else panel says "code floor serving") · F87 (ambiguity panel shows raw zone UUIDs → human line
   labels) · pre-existing TS2339 cleanup (`ChatQuotaCtx`, `GoldenPublishDecision` — Vercel isolated
   per-file pass) · explorer dialog polish (resizable/search).
7. Standing from v43, unchanged order below the above: MCP-INVOKE-1 (note: `backend_tools.input_schema`
   now stores its raw material) · Wave-2 content/IA · Superset activation (E) · SEMANTIC-ROUTING-1
   (F74 — stopword-poisoned learned map re-confirmed live this session) · MEMORY-1 (F48; now
   architecturally framed by F83 note §3.4: "let the agent open a DRAFT") · F86 computed-analysis
   (model-side T1 arithmetic is unauditable — AssetOpsBench "inverted LLM usage") · F67 resultStore ·
   master-plan merge (owner-insisted) · F80 write-policy PRODUCT decision (exposure now explicit
   & gated; which writes the agent may EVER perform stays an owner+ARMES-write-auth call).

## 4 · FINDINGS LEDGER (this session)
| # | Finding | Status |
|---|---|---|
| F39 | Tool-round ceiling ungoverned | **CLOSED** — `agent.maxToolRounds` v2=16, `source:db` sealed via ledger read; `[Params]` log live |
| F81 | `rollout.guardrailMinTurnsPerArm` never published; floor silently served since L5 | Self-healed by seed (value 50 ≡ floor). Guard → queue #6 |
| F82 | Render lie: same tool ×N, viz binds by NAME, last-write-wins | **CLOSED (render side)** — VIZ-BIND-1 @ c5f58a4; ambiguity honest. Model side waits on queue #3 |
| F63/F64 | Epoch-ms axis / args invisible | **CLOSED** in VIZ-BIND-1 |
| F73 | Credential-less `armesMes` row → 401 flicker | OPEN — fold into ROUTE-GOV-1 Operator visit (§2) |
| F80 | ARMES write tools must not leak into reachability | **ANSWERED in ROUTE-GOV-1 v2_2**: fail-closed exposure; write only via audited `allowWrite:true` |
| F84 | Refusal boundary = model disposition (Gemini refused, Sonnet prescribed 8 actions) | Answer = F83.1 deterministic banner (queue #5) |
| F85 | F82 blast radius provider-dependent | Subsumed by F82 render fix; recorded |
| F86 | Model does T1 arithmetic (38-stop header over 40-row grid) | OPEN → queue #7 (computed analysis) |
| F87 | Ambiguity panel prints raw zone UUIDs | OPEN → queue #6 |
| F88 | Rejected publish leaves NO trace (no log, no `rule_audit` row, toast swallowed `null`; server said 422 ×7+) | OPEN → GATE-VISIBLE-1 (queue #4) |
| F89 | Golden budget 500k sized for 1 specimen; batch = 120 turns → `underpowered/completed:false` → ALL prompt.segment publishes blocked | **DESIGNED+APPROVED** → GOLDEN-BATCH-1 (queue #2) |
| F90 | Stale GateVerdict renders over a different rule ("Published — gate passed" vs timeline "No published versions yet") | OPEN → GATE-VISIBLE-1; code: `RulesTab.tsx` :304 clears, :316/:341 don't |
| F91 | Tool graph (4 nodes) is the gate's tool reference vs 141-tool catalog → governance surface ≈3% of product | **ANSWERED in ROUTE-GOV-1 v2_2**: mirror becomes the reference |

## 5 · EXTERNAL DEPENDENCY (F83 arc)
Kale will document machine parameters; their team built a tool that will build a **RAG**; plan =
connect (Gemini/LangGraph) to CWF. Architect guidance already delivered (KB v41 §6): chunk identity
(doc_id+revision+section+date) · **procedures tagged with ARMES zone/line/equipment IDs — same
identity space** · `active|superseded` + revision chain · Turkish morphology ⇒ hybrid search (shared
infra with SEMANTIC-ROUTING-1). Integration shape: **RAG enters as an MCP backend** (backends row +
trust tier + eval-gate) — never a side-channel; LangGraph must not become a second orchestration
plane outside the turn pipeline.

## 6 · SESSION ARTIFACTS (this session, all versioned)
`claude-code-PHASE-VIZ-BIND-1-v1` (merged) · `cwf-f83-prescriptive-authority-architecture-v1` +
`v1_2` · `claude-code-PHASE-ROUTE-GOV-1-v1` (superseded) · `-v2` (superseded) ·
`claude-code-ROUTE-GOV-1-CLEAN-RESET-v1` (executed) · `claude-code-PHASE-ROUTE-GOV-1-v2_2`
(in flight) · `claude-code-PHASE-GOLDEN-BATCH-1-v1` (queued).

<!-- END · cwf-open-items-register-v44 · rev 44 · 2026-07-14 -->
