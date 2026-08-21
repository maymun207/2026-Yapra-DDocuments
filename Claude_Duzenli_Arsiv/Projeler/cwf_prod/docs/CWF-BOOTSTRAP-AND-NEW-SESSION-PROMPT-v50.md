# CWF — BOOTSTRAP & NEW SESSION PROMPT · v50

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v50 · rev 50 · 2026-07-19 · Closes S51.
     Paste this as the FIRST message of the new session (with project files attached). -->

Read CLAUDE-PROJECT-INSTRUCTIONS-v2.md from project files first — it is the durable
map. Code in cwf_yaprak is ground truth over any summary. This bootstrap carries S51's
close state; latest KB + register versions carry deeper history.

## 1 · VERIFIED FLOOR (re-verify with git rev-parse before trusting)
- **master HEAD = `186277c`** (Merge ROUTE-HYGIENE-1) · docVersion **rev 112** ·
  ~2818 tests / 286 files · doc-drift [OK] both modes.
- S51 merges, in order: FENCE-DB-1 (`a21d046`) → WAVE2-IA-2 (`4998270`, rule_kinds.surface
  live) → STAGES-FIX-4 (`d83059a`) → GOV-UNIFY-1 (`21dd981`, Rules+Kinds = one
  GovernanceTab) → ROUTE-HYGIENE-1 (`186277c`).
- **DB state:** rule_kinds.surface applied+verified · tool_category_cache PURGED
  (342→**104** rows, ~70% was junk; junk-criteria count 0; 2 pinned survived; epoch
  9→**10**) · fence live (`[Fence] ok` in prod) · Gemini Operator pinned to
  fjbrkimwvtpwoxhziidh (Step-0 constitutional).

## 2 · IN FLIGHT (first thing to handle)
- **AG is building SC-1** (`claude-code-PHASE-SET-CONTEXT-1-v1`, anchored 186277c):
  the SET-CONTEXT oscilloscope first ship — stage-context endpoint + Inspect picker +
  killer trio 09/07/11 (+10/01) + ADD-1 live `routing_mismatch` telemetry + ADD-2
  `routing_map_hash` in config_fingerprint + ADD-3 engine-tagged 03/07 contract +
  **NAV-SINGLE-1** (ONE sidebar entry "Kurallar / Rules"; ?tab=kinds stays an alias).
  Design SSOT: `cwf-set-context-design-v1_2` (owner-ratified additions).
  On AG's CI-green report: FAST-GATE review → merge GO with verbatim message →
  **fold in the hygiene-migration DOC-FLIP as an addendum commit** (comment-only
  STATUS flip on 20260719120000, supabase/ unmapped → likely no reseal).

## 3 · OWNER-LOCKED SEQUENCE (do not re-litigate)
1. ✅ 1a GOV-UNIFY · ✅ ROUTE-HYGIENE (stop-bleed)
2. 🔨 **SC-1** (in flight) → then **SC-2** (remaining stages + divergence-badge polish)
3. **~2 weeks real traffic** → mismatch RATE + collected failing turns seed the golden
   set → **ROUTING-ARCH design note written ON that evidence** (IR taxonomy; the
   owner suspects flat keyword mapping is indefensible vs an intent-recognition
   engine — the numbers will decide). SET-CONTEXT is that migration's eval infra.
4. **1b Tool-Matching IA** (mode-based: browse/test/add/proposals; responsive; teaches
   the 6-step flow) — AFTER Routing-ARCH (its UI depends on the engine decision).
5. **1c Data-Authority** (explain-what-it-does DA-1 + Scope-lens F42 context DA-2).
6. **MEMORY-1** (episodic, stages 05+14, unblocks F83) → security-cleanup block
   (mcp_settings 6/6 raw→apiKeyRef migration + DB-introspection endpoint) →
   **FINAL combined docs+arch pass** (F-DOCS-ENRICH + narrative architecture rebuild —
   ONLY when development is done; owner-legislated).

## 4 · S51 KEY FINDINGS/RECORDS (register v53 pending — write it early next session)
- **LOG-1 CLOSED**: stopword pollution → ROUTE-HYGIENE-1 (write guards + purge).
- **LOG-2 OPEN (HIGH → F83)**: fetch-much-answer-little behavior; user frustration
  visible in learned keywords; silent-finish single instance (not systemic — telemetry
  showed 0 safety catches in 24h; the trust spine is CLEAN, a positive record).
- **LOG-3 OPEN (MED-HIGH, small fix)**: token capture NULLs on `finishReason=other`
  turns (2/8 verified in ledger) → quota under-counts; owner wants bank-grade accuracy.
- **Sub-walk findings ledger**: `cwf-subwalk-findings-v1` (RS-1…11, TM-1…8, DA-1…6);
  GOV-UNIFY shipped RS-11; TM/DA items feed 1b/1c.
- **Stages re-walk ledger**: `cwf-stages-v1-review-findings-v5` (pillars: SET-CONTEXT ·
  F-DOCS-ENRICH · MEMORY-1; growth points 04/05/06/14).
- **PARKED (unchanged)**: GOLDEN FREEZE (all golden-infra below product work) ·
  SPECIMEN-HEALTH-1 · F129 · separate-POC-key belt (deferred, fence suffices) ·
  LANGFUSE-V4-UPGRADE.

## 5 · STANDING RULES REINFORCED IN S51
- Naming law: labels chosen for the HUMAN's mental image, not AI parsing.
- Step-0 project-confirm on EVERY Operator prompt (+ explicit column lists on
  secret-bearing tables — never SELECT */raw JSON; the mcp_settings token exposure
  was owner cut-and-paste, not a Gemini violation, but the discipline stands).
- RTF/attachment transfer is UNRELIABLE owner→Claude; plain text preferred; RTFs
  recoverable from /mnt/user-data/uploads via sed-strip.
- FAST-GATE remains the review default; CI (unsharded) is the sole test arbiter;
  full migration reads stay non-negotiable.
- S47-1 preconditions on every cross-lane instruction; second-to-merge reseals.

## 6 · COMMS
Turkish for strategy/decisions; English for technical artifacts. Owner relays between
Architect (Claude) ↔ AG (Claude Code) ↔ Gemini (Operator, Supabase MCP). Owner's role:
decisions, consent, real-world tests, relay — never terminal work (S43-3/S43-4,
PLATINUM).

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v50 · rev 50 · 2026-07-19 -->
