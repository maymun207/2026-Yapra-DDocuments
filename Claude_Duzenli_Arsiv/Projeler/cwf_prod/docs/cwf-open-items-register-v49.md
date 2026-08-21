# CWF — Open Items Register · v49

<!-- cwf-open-items-register-v49 · rev 49 · 2026-07-16 · Supersedes v48.
     Session: S47 ("the routing-brain day"). Floor at close: master 4f756bb =
     Merge SR1-W1 · docVersion rev 102 · 2623 tests / 267 files (unsharded CI is the
     arbiter) · migrations tail: …backend_health (applied & live-verified 2026-07-16,
     Operator G1–G6 all PASS, DOC-FLIP 7c89f87).
     CONSTITUTION: GOLDEN FREEZE unchanged & absolute · NEW RULE S47-1 (see §5). -->

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v48 → v49
Every v48 id accounted; **absent-without-terminal-marker set = ∅**:

§1.1 **F122 CLOSED@15609d5** (hotfix/f122-retry-error → merge 15609d5; 'error' added to
RETRIABLE_EMPTY_FINISH_REASONS; content-filter/length stay terminal; same-provider bound
untouched; exhaustive matrix green; comments corrected; stageStream comment-only proven
by stripped-compare). Live-positive proof = opportunistic → §4 WATCH. ·
§1.2 **F123 CLOSED@live** (merge 1a7a9a0; isLearnableKeyword guards learn-loop +
learnToolMapping + loadCacheFromSupabase; live proof trace 4b97efe3:
`[ToolCache] 24 stopword rows ignored at load` — pollution was 24 rows, not the 5
first observed; routing back to 6/145; zero migration/Operator. INTERIM by design —
real fix SR-1; ROUTING_STOPWORDS lives inside the floor path. RULE 34 minted+ratified). ·
§1.3 **F81-guard CLOSED@S46-SELF-SEED-1** (no phase needed — structurally subsumed:
AGENT_PARAM_SEEDS = REFERENCE_AGENT_PARAMS.map(…) [agentParams.ts:210, decl-derived],
parity pinned by seedAgentParams.test.ts, selfSeedReconciler.ts:54 registers
system.agent_param, [Params] per-turn source stamps make floor-serving visible; live
mechanism proof for a NEW decl this session: `[Gate] … key=mcp.healthFreshnessSec
verdict=published` + `[Seed] rows=1` at 18:55:03Z. Owner-archived rows stay floor-served
by the absence-only law — deliberate, visible, not the F81 accident class). ·
§1.4 **F117 / MCP-WARM-1 CLOSED@chain** (build 613f945 → merge 1f32c92 → Operator apply
G1–G6 PASS → first cron tick 19:00:34Z 200 {checked:1,up:1} → DOC-FLIP 7c89f87 rev 101.
Mirror-served defs w/ four per-server floor triggers + fire-and-forget self-heal feed;
lazy connect = eager delete (no-tool turns: zero MCP I/O); backend_health append ledger,
*/30 cadence [owner], CRON_SECRET machine-arm, withholding ACTIVE [owner] fail-open in
every other branch incl. table-absent; mcp.healthFreshnessSec floor 3600 self-seeded;
turnPathNoMirror constraint-6 NARROWED (defs-only allowlist mcpDiscovery.ts) & RATIFIED
as the standing form; W2.4 user-facing withholding explanation deliberately deferred →
folded into F126 scope. Companion finding F127 → §6). ·
§1.5 **F119 CARRIED** unchanged (seam archive verb; v48 wording). ·
§1.6 **F120 CARRIED** unchanged (machine-actor identity; SELF_SEED_ACTOR_EMAIL interim
live). ·
§1.7 **F118 CARRIED** unchanged (golden coverage boundary = promptRevFrom INPUTS). ·
§2 freeze block **carried whole & untouched**: Run 5 · F110 · F111-emission · F83.1-① ·
viz v3 + b1_scope v2 staged drafts (persist, idempotent) · P1/P2 · BUDGET-HONEST-1 ·
GOLDEN-BATCH-2/F114 · GOLDEN-ASSIST-2 candidate · S46 cost-ledger note · standing
decided lines (goldenRunTokenCeiling 16M v2 · replay limit 38,081,613 · eval-canary ON,
observed firing again this session at 18:55:03Z riding the seed warm). ·
§3 M-waves: M1 remainder **WAVE2-IA-2 → re-walk CARRIED** (not started; now sequenced
AFTER SR1-W2/W3 per owner queue-jump) · M2 / M2.5 **CARRIED** · **M3 SR-1 →
IN FLIGHT — M2 gate consciously LIFTED by owner 2026-07-16** (cross-language live
evidence F124 + owner's flash-lite demo): design cwf-sr1-semantic-routing-design-v1 +
cwf-sr1-signal-flow-v1.mermaid approved; **SR1-W1 SHIPPED@4f756bb rev 102, DARK**
(router.enabled floor 0 — behavior byte-identical until the enable publish; equivalence
test is the spine; 19-case armor matrix; zero learned-writes on semantic path;
routerModelId() reuse from PROV-1; RULE 35 minted+ratified; 12 category description
glosses on the code floor). SR1-W2 = S48 opener; SR1-W3 = lens A/B (ordinary replay,
freeze-clean) + enable publish + learned-map retirement DECISION. · M4 F47 · M5
MCP-INVOKE-1 (first schema consumer of backend_tools.input_schema now exists) · M6
MEMORY-1 · F86 · F67 **carried by name unchanged**. ·
§4 parked/watch: Kale-RAG · stage-06 watch · STAGE-PLAYGROUND · TheBluePrint23 · cloud
strategy · G4 · checkLedgerDiff · LANGFUSE-V4-UPGRADE · W0.f **all carried** (v48/v47
wording). ·
§5 rules S46-1/S46-2/S46-3/S44-1-amendment/identity-tag **all standing** (v48 wording). ·
§6 F108 **OPEN carried** (arbiter unchanged) · F113/F114/F115 live inside §2 freeze
block · F116/F121 closed-prior pointers stand · F107/F109/F106 pointers stand.

## 1 · REMAINING SPINE (S48 order; freeze-independent)
1. **SR1-W2 — proposals loop** (S48 opener; author phase prompt against 4f756bb per
   S46-3): proposals→DRAFT rows (L4 reuse verdict at authoring) + Araç Eşleme panel
   list w/ evidence(query·count·seen) + accept-binds-tools flow (S41-2 enforced) +
   gated publish + daily log summary line [owner: BOTH panel and log] + router-prompt
   promotion to governed kind (born code-ref → DB-versioned, non-golden gate) +
   **F127.b ride-along** (Global Server dialog helper text: "Blank = default (armes)"
   is now misleading — new copy: blank = not health-tracked, not mirror-served; set
   explicitly on global servers) + DB-side category description enrichment path
   (panel/BULK-REVIEW, data op).
2. **SR1-W3 — lens A/B + enable:** REPLAY-A2 routing lens floor-vs-router on real
   specimens (ordinary replay, NOT golden) → owner reviews → router.enabled publish →
   observation window → learned-map retirement DECISION (not execution). Terminal
   markers for F124/F125/F126 land here with lens evidence.
3. **WAVE2-IA-2 → re-walk** (M1 remainder, unchanged scope).
4. **F119** seam archive verb · **F120** machine-actor identity · **F118** golden
   coverage boundary — slot as small phases where surfaces are touched (v48 wording).

## 2 · 🧊 GOLDEN FREEZE BLOCK — carried verbatim from v48 §2 (nothing moved, nothing
touched; wordings live in v48). Contents by name: Run 5 · F110 · F111-emission ·
F83.1-① · viz v3 + b1_scope v2 staged drafts · P1/P2 probes · BUDGET-HONEST-1 ·
GOLDEN-BATCH-2 (F114) · GOLDEN-ASSIST-2 candidate · S46 cost ledger · DECIDED &
STANDING: goldenRunTokenCeiling 16M v2 · replay quota 38,081,613 · eval-canary ON.

## 3 · M-WAVES (runbook v1+v1_2 authoritative)
M1 remainder: WAVE2-IA-2 → re-walk (post SR1-W2/W3) · M2 consistency-lens +
GOLDEN-LOOP-1(freeze-adjacent) + F67-read · M2.5 JUDGE-OFFLINE-1 · **M3 SR-1 IN
FLIGHT (W1 shipped dark; W2 next; W3 enables)** · M4 F47(G3) · M5 MCP-INVOKE-1 ·
M6 MEMORY-1 · F86 (F108 sibling).

## 4 · PARKED / EXTERNAL / WATCH (triggers stand; v48/v47 wordings)
Kale-RAG · stage-06 watch · STAGE-PLAYGROUND · TheBluePrint23 · cloud strategy · G4 ·
checkLedgerDiff · LANGFUSE-V4-UPGRADE · W0.f canary auth-arm provenance.
**NEW WATCHES (S47):**
- F122 live-positive: first natural `[LLMRetry] … finishReason=error` line seals it.
- MCP-WARM turn-path proof: first natural chat turn should log
  `[MCP Mirror] served 145 defs … (live-fallback: 0)` — the 3.92s win realized on ARMES
  (cron half already sealed: tick 20:00:02Z {checked:2, up:2}, armes 141 tools 2273ms).
- Next warm will log `[Seed] domain=system.agent_param rows=3` (router.enabled/
  timeoutMs/maxCategories) — EXPECTED at the new fingerprint, NOT an X1 incident.

## 5 · RULES MINTED / RATIFIED (S47)
**S47-1 (owner-approved, memory-recorded):** every cross-lane instruction carries an
explicit state PRECONDITION line ("valid only while origin/master == <hash> and PR #N
is open; on mismatch STOP and report actual state"). Corollary: concurrent phases
touching mapped code WILL collide on the manifest — reseal responsibility is
PRE-ASSIGNED (second-to-merge rebases + reseals rev N+1 on the MERGED tree). Field
record: worked 3× on day one (AG-B stale-premise refusal · AG-B stale-precondition
stop-and-ask dialog · SR1-W1 rev-102 reseal executed exactly as pre-assigned).
**RULE 34 ratified** (guard the read side, not just the write side — F123 load-guard).
**RULE 35 ratified** (no raw provider SDK calls under turn/*; router lives at _lib).
**Ratification protocol note:** agents adding numbered AGENTS.md rules must flag them
"proposed RULE" for Architect ratification — two silent-adds this session, both good
content, protocol now explicit.
**Relay hygiene:** cross-lane shell commands must be shell-agnostic (zsh word-splitting
broke a bash-ism batch delete; xargs -n1 pattern preferred).
**Log-reading lesson:** after any production deployment switch, re-resolve the current
production deploymentId BEFORE scoping runtime-log queries (a "missing" 20:00 cron tick
was on the new deployment all along).
**Ledger integrity precedent:** AG-B's false "MCP-WARM-1 un-landed reseal" claim was
disproven by the Architect's own gate run on master and REQUIRED corrected pre-merge —
the ledger never carries a false incident.

## 6 · FINDINGS LEDGER Δ (S47)
**F124 OPEN→SR-1** (morphology gap: exact-token match misses 'alarms'→'alarm' —
cross-language proof of the SR-1 thesis; MATCH-FOLD interim REJECTED by owner as
stone-age patching; close-path = SR1-W3 lens evidence). ·
**F125 OPEN→SR-1** (non-stopword learned junk: `[factory]` matched by a junk mapping
none of the query tokens justify; F123's guard deliberately does not cover
content-looking junk; close-path = SR1-W3 + learned-map retirement decision). ·
**F126 OPEN, scope grew** (starvation-refusal honesty: tool-starved Gemini claims
out-of-scope [F84 family]; NEW sub-scope from MCP-WARM-1: health-withholding is
observers-only [ctx.mcpWithheldBackends] — user-facing explanation deferred here;
Wave-2 content territory). ·
**F127 CLOSED@tick-20:00:02Z** ({checked:2, up:2}; root cause: Global-Server helper
text encouraged blank backend_id ["Blank = default (armes)"] while MCP-WARM-1's two new
consumers are explicit-only; owner's first edit landed on a disabled PERSONAL row
[Operator read-only report on file]; fix = pure data, global armes row backend_id set;
standing data-hygiene rule: global servers carry explicit backend_id). ·
**F127.b OPEN (small):** helper-text copy fix — rides SR1-W2 (§1.1). ·
S46 findings (F113…F123) — dispositions above and in §2; wordings in v48.

<!-- END · cwf-open-items-register-v49 · rev 49 · 2026-07-16 -->
