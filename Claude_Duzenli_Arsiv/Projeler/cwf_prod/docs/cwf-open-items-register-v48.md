# CWF — Open Items Register · v48

<!-- cwf-open-items-register-v48 · rev 48 · 2026-07-16 · Supersedes v47.
     Session: S46 ("the freeze-and-spine day"). Floor at close: master 5cb873f =
     DOC-FLIP merge · docVersion rev 97 · 2544 tests / 261 files (at 2b1bd7c; DOC-FLIP
     comment-only, S35-1-proven) · migrations tail: …seed_state +
     …domain_rules_one_published_per_key (BOTH applied & live-verified 2026-07-16).
     CONSTITUTION ADDITION: **GOLDEN FREEZE** (owner-legislated) — no golden-run work
     of any kind until the product is done; run 5 parked; segment drafts stay staged. -->

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v47 → v48
Every v47 id accounted; **absent-without-terminal-marker set = ∅**:
§2 golden batch → verdict chain ran 4 times: runs 1–3 `completed=false` (root causes
F113 quota-clamp / F115 pair-clamp / F113-again), run 4 `completed=true underpowered`
but the 2 prompt.segment rows REJECTED by the hash-integrity gate (same-job superset
publish changed gatewayProtocol's composition → certificate world diverged; check
CORRECT, job design at fault → rule S46-1). 17/19 rows PUBLISHED →
**SUPERSET-SERVE-1 CLOSED@live** + **"Superset DB-first activation (gateway lane)"
CLOSED@live** (P3 probe: positive serve with search_tools + datasource attribution,
negative kek-control verbatim refusal — owner screenshots 2026-07-16; backend_id
backfill check NOT needed). **Run 5 PARKED — GOLDEN FREEZE** ·
**F110 LOCKED-BEHIND-FREEZE** (b1_scope v2 staged) · **F83.1-① LOCKED-BEHIND-FREEZE** ·
**viz v3 emission / F111 emission-side LOCKED-BEHIND-FREEZE** · **P1+P2 probes
PARKED-WITH-FREEZE** (both presuppose the segment publish) · F84 watch carried
(P2-on-Gemini remains its evidence) ·
§3.1 F101 **CLOSED@S46** (owner: payload wins; live truth: getDailyManualScrap row
was already clean; the REAL violator was getScrapBarcodeList's published row
4fef2f01 → archived via RuleGovernanceService.archive(), rule_audit row on file;
gate-side class-kill = GATE-REF-1) · §3.2 GATE-VISIBLE-1 v2 + F94 **CLOSED@873c4ba**
(422-as-data F88-class, F90 clear+identity guard, Audit trail tab, [Gate] choke-point
G4, copy-payload F94) · §3.3 GATE-REF-1/F97 **CLOSED@873c4ba** (key≡payload.tool at
schema stage, born-loud, ± tests) · SELF-SEED-1 **CLOSED@5cb873f chain**
(806b8c2 build → 2b1bd7c FIX-1+X2b → both migrations Operator-applied G-gates green →
live [Seed] rows=0 first-claim proof → DOC-FLIP 5cb873f) ·
§3.4 EXPLORER batch **CLOSED@6c54fba** with two honest premise corrections:
TS2339 **CLOSED@HEAD** (tsc-clean evidence — item was stale) · dialog =
empty-catalog-vs-failed-search three-state (empty≠zero applied to our own UI) ·
F87 deterministic own-data-only labels · HOTFIX-6 resurrect label · writeOffered
semantics reported (always 0 on Anthropic branch → F80-lane note) · **EXCEPT
"F81 guard" element → CARRIED to §3.1 below** (not covered by the S46 batch —
named honestly, not dropped) · §3.5 F80 **CLOSED@S46** (decision: ALL write tools
closed; evidence: telemetry full-history usage of the 44 write tools = 0 across
1,429 events/691 tool-calls/22 distinct read-only tools; execution: 6 categories
republished without write tools + allowWrite dropped, [Gate]×6 on file, re-verify
zero references; per-tool reopen path = audited allowWrite:true, post-1.0
on-demand) · §3.6 F112 **CLOSED@6c54fba** (InspectTab already fully covered at
HEAD — an interim phase healed it; the one live same-class instance was
UsersTab email field, fixed; owner may spot-check) ·
§4 M1: **WAVE2-DOCS-1 CLOSED@dfb7878** (5 code-grounded docs + registry + DocLink
goto-doc icons + F116 + arrival strips + ALWAYS_INCLUDE honesty; W1/W3 verified
already live via b82dc87, not redone) · **WAVE2-IA-2 + re-walk CARRIED** (not
started) · M2 / M2.5 / M3 SR-1 / M4 F47 / M5 MCP-INVOKE-1 / M6 MEMORY-1 / F86 /
F67 **carried by name unchanged** (SR-1 evidence pile GREW: F123) · "3 halka"
continuation **DELIVERED** (mapping mechanics from code + certificate explainer +
golden-curation Q&A = Wave-2 User-Docs raw material; minted GOLDEN-ASSIST-2
candidate → §5-freeze block) ·
§5 Kale-RAG · stage-06 watch · STAGE-PLAYGROUND · TheBluePrint23 · cloud strategy ·
G4 · checkLedgerDiff · LANGFUSE-V4-UPGRADE **all carried** ·
§6 F108 **OPEN carried** (arbiter unchanged) · F107/F109/F106 closed-prior pointers
stand.

## 1 · REMAINING SPINE (post-S46; freeze-independent)
1. **F122 (NEW, S47 first hotfix candidate):** `finishReason=error` gets NO bounded
   retry (OBS-3 covers empty-only) — live KB7-OEE turn errored user-visibly at
   attempt=0; identical retry succeeded (transience proven, owner screenshots).
   Fix: extend the bounded same-provider retry to finishReason=error.
2. **F123 (NEW):** learned-map pollution amplifier — on the KB7 turn, five
   suffix/stop words ("nin","bugun","degerleri","nedir?","kb7") EACH learned to all
   8 matched categories → compound pollution → 62-tool offers → 17.7k prompts.
   Interim: stopword guard on learn; real fix: SR-1 (M3).
3. **F81-guard** (EXPLORER leftover, carried from v46 §3.7 wording).
4. **F117 / MCP-WARM-1:** (a) tool definitions served from the backend_tools mirror
   (listTools off the turn path), (b) lazy MCP connect at first tools/call
   (~4s saved on no-tool turns; 35% of turn latency measured), (c) cron-driven
   backend_health ledger row read at turn start. Owner-approved order: ahead of
   GOLDEN-BATCH-2.
5. **F119:** publish seam lacks an `archive` action (F101 used the service direct —
   ADR-006-compliant, audited; seam should still grow the verb).
6. **F120:** machine-actor identity in RuleGovernanceService (nullable FK +
   jsonb attribution, the pattern every other automated writer uses) — retires the
   SELF_SEED_ACTOR_EMAIL borrowed-identity interim (currently ksadmin, owner-set,
   live in Vercel env).
7. **F118:** golden-gate coverage boundary should track promptRevFrom INPUTS
   ("anything that changes the composed prompt"), not `kind == prompt.segment` —
   the 17 superset rows changed the live prompt with no behavioral gate (S46-1
   sequencing is the operational mitigation until then).

## 2 · 🧊 GOLDEN FREEZE BLOCK (owner-legislated; nothing here moves until lifted)
Run 5 (segments-only job authored-in-principle) · F110 · F111-emission · F83.1-① ·
viz v3 + b1_scope v2 staged drafts (persist; re-stage idempotent) · P1/P2 probes ·
**BUDGET-HONEST-1** (F113+F115: born-loud reserve clamp + refuse-when-clamped +
pre-flight cost estimate + reservation-ledger rows [AG-named gap: no per-run
reservation history] + pair budget derived from batch remaining + arm fairness +
71-rep counting clarification) · **GOLDEN-BATCH-2 (F114):** async runner takes
multi-segment candidate sets; every golden run chunked (per-item token ledger,
isolated failure, RESUMABLE — the owner's FIFO requirements 2026-07-16), single-door
consent (consent carries quota authority); sync monoblock demoted to test/floor ·
**GOLDEN-ASSIST-2 candidate:** deterministic-signal proposal queue for golden
specimens (violation/retry/router-path/multi-tool/coverage-gap ledger signals →
tagged candidates → human confirm; LLM never curates its own exam) ·
Cost ledger of the S46 golden saga: runs 1–3 ≈ 19.5M tokens certifying nothing
(F113×2 + F115), run 4 ≈ within 16M reserve, completed=true but segments rejected
(S46-1 lesson) — the freeze's own justification file.
DECIDED & STANDING: governed `quota.goldenRunTokenCeiling` = **16M v2** (published,
golden-exempt kind) · replay quota limit = 38,081,613 (owner-raised, gated setLimit)
· **eval-canary STAYS ON** (owner decision 2026-07-16; governed caps 3 spec / 2M).

## 3 · M-WAVES (runbook v1+v1_2 authoritative; carried by name)
M1 remainder: WAVE2-IA-2 → re-walk (DOCS-1 shipped) · M2 consistency-lens +
GOLDEN-LOOP-1(→freeze-adjacent, sequence after lift) + F67-read · M2.5
JUDGE-OFFLINE-1 · M3 SR-1 (evidence: owner stopword map + F123) · M4 F47(G3) ·
M5 MCP-INVOKE-1 · M6 MEMORY-1 · F86 (F108 sibling).

## 4 · PARKED / EXTERNAL / WATCH (triggers stand)
Kale-RAG · stage-06 watch · STAGE-PLAYGROUND · TheBluePrint23 · cloud strategy ·
G4 repo-private→VITE_REPO_PUBLIC=false · checkLedgerDiff mechanization ·
LANGFUSE-V4-UPGRADE (v47 §5 wording) · W0.f eval-canary trigger secret: canary now
observed FIRING in prod (11:34 run, 200) — verify auth arm provenance at leisure.

## 5 · RULES MINTED (S46)
**S46-1:** golden-gated segment publishes NEVER share a job with rows that alter
prompt composition; sequence = composition rows → golden run → segment publish.
**S46-2:** multi-agent isolation is agent-built (absolute-path fresh clone +
in-clone identity check), never human folder navigation — two live saves on file.
**S46-3:** phase-spec items are verified against live master at authoring time
(TS2339 + W1/W3 staleness, both caught agent-side).
**S44-1 amendment:** one live writer per worktree INCLUDING background sub-agents
(AG-B's 5-sub-agent near-miss).
Identity-tag protocol standing: [AG-A]/[AG-B] prefixes + IDENTITY CHECK header on
every relay block.

## 6 · FINDINGS LEDGER Δ (S46) — full wording in §1/§2 above
F113 silent reserve clamp (numeric chain on file: 7,453,875 clamp → 48,227 overshoot
→ −33,386; bit three times) · F114 GOLDEN-BATCH-2 · F115 per-pair ambient clamp +
baseline-first unfairness + rep-count puzzle · **F116 CLOSED@dfb7878** (two-orders
explainer shipped same-day it was born) · F117 MCP-WARM-1 · F118 golden coverage
boundary · F119 seam archive verb · F120 machine-actor identity · F121 UNUSED
(stale-claim gap shipped in-phase as X2b, no id needed) · F122 error-retry gap ·
F123 learned-map pollution amplifier.

<!-- END · cwf-open-items-register-v48 · rev 48 · 2026-07-16 -->
