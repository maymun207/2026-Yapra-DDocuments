# CWF — Bootstrap & New-Session Prompt · v56
<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v56 · 2026-07-22 · Boots S58 after S57.
     MUST-FOLLOW RULE BOOK: cwf-master-plan-v5_2.md -->

## 0 · FIRST ACTIONS
1. Read CLAUDE-PROJECT-INSTRUCTIONS-v2.md (durable map).
2. Read cwf-master-plan-v5_2.md — MUST-FOLLOW rule book. No sapma, laser-focus.
3. Verify floor: `git rev-parse origin/master` → EXPECT `bad00f4` (or later if
   IR-3 merged).
4. Load latest cwf-open-items-register-v* (v59_5) + CWF-SESSION-GRAPH-KB-v*
   (v56).

## 1 · VERIFIED FLOOR (S57 close)
master `bad00f4f6e81e2a7ab8f621fbe111bf140a2c7cb` · rev 128 · ~3392 tests / 325
files · drift OK · ZERO pending migrations (last = `20260721150000_synthetic_
traffic.sql`, Operator-applied + STATUS-flipped).
S57 merge lineage: `0636fd3`(S56) → `7d31793`(SYNTH-TRAFFIC-1 PR#95) →
`4415d64`(DOC-FLIP PR#96) → `bad00f4`(GATE0-UI-BATCH-1 PR#97).

## 2 · THREE-LANE WORKFLOW (unchanged)
Architect=Claude · AG=Claude Code (isolated workdir per lane, S56-1) ·
Operator=Gemini+Supabase MCP (`supabase db push` only, project
`fjbrkimwvtpwoxhziidh`, FENCE-first) · Owner=Maymun (relay-only until IR live).

## 3 · WHERE WE ARE — v5_2 position
**GATE-0 → SEALED ✓** (owner "UI clean"; PANE-SCROLL-2 + board-walk 00–14 +
batch F-BW01–10 all live).
**BLOCK 1 · IR — INSIDE, K1 passed:**
- **K1 §8 → ANSWERED ✓** (shadow-frame read: enum-drop 3.45%, confidence 93%
  HIGH, COMMAND live-proven 100%). Taxonomy DECISION **A** ratified by owner:
  QUERY_TOPOLOGY → merge into QUERY_MASTER (6 actions).
- **IR-3 → IN FLIGHT with AG** (branch `ir-3`, precondition `bad00f4`, prompt
  `claude-code-PHASE-IR-3-v1`). NOT on origin yet at S57 close. THE flip:
  frame→semantic→keyword primary + derivation table in code + clarification
  active + ALT-D. Ships DARK (`router.frameRouting=false`); going live = a
  separate owner-consented param publish + shadow comparison.
- **IR-4 → after IR-3** (Path B contract prose folded into IR-0, zero build).

## 4 · IMMEDIATE NEXT
1. **IR-3 PR review** — when AG pushes + whole CI job green (S56-2): Architect
   FAST-GATE review (routing/security surface = derivation table + router.prompt
   publish path get migration-adjacent scrutiny) → GO → merge (flip stays dark).
2. **Go-live (separate, owner-consented):** publish `router.frameRouting=true` +
   re-enable synthetic traffic → shadow-compare frame-primary vs keyword-primary
   on accumulated frames → confirm → IR-3 live.
3. **IR-4** (contract prose) → **BLOCK 1 CLOSED.**
4. Then v5_2 BLOCK 2 (Superset E-activation) → 3 (Memory) → 4 (RAG) → 5
   (cleanup + FREEZE LIFT) → 6 (docs) → 7 (close) → Path B adjacent.

## 5 · KEY FACTS
- ARMES = 4 active (KB7·Granit·Sır-Çan·Masse) + 13 inactive = 17 registered.
  Durable-map "KB7 only" WRONG → fix at BLOCK 6 docs.
- Semantic router = `gemini-2.5-flash-lite`; main chat = `gemini-2.5-flash`.
- SYNTH-TRAFFIC-1 fully closed + live-verified; injector STOPPED by owner at S57
  close (K1 answered, no longer gate-critical). 660 frames recorded (v1: 630,
  gapfill: 30). 2 question sets: `cwf-synthetic-question-set-v1` (29 utt),
  `cwf-synthetic-gapfill-v1` (8 utt, currently active set).
- The (action×object)→category derivation table is NOT in code yet — IR-3
  builds it (was only in `cwf-ir-taxonomy-design-v1.md`).
- IR-2's `computeClarification` + `resolveEntityAlias` are built but wired to
  nobody — IR-3 activates them.
- GOLDEN FREEZE still engaged; lifts at BLOCK 5. IR-3 + Superset are
  freeze-independent (`router.prompt`/`seedRules` = normal eval gate, NOT
  prompt.segment).
- golden-runner 1075/18h watch (freeze-period, undiagnosed, BLOCK 5).

## 6 · DEFERRED / WATCH
- F-BW11 (seed-on-view) · F-BW12 (real-token ceiling, BLOCK 5) · F-BW13
  (add-set≠active) — 3 small SYNTH-TRAFFIC UX/accuracy fixes, batchable
  post-GATE-0.
- 5 stale merged branches (obs-trace-2b, flake-sweep-1, pane-scroll-1/2,
  hotfix/f152) — discretionary delete.
- Architect premise-error tally (S54-1 lineage): F152 Rollout + SEEDING
  mis-scope (S56) — two-lane critique loop load-bearing.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v56 · 2026-07-22 -->
