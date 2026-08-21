# CWF — Bootstrap & New-Session Prompt · v57
<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v57 · 2026-07-22 · Boots S59 after S58.
     S58 CLOSED BLOCK 1 FULLY (IR-3 merged + go-live live-confirmed + riders + IR-4).
     MUST-FOLLOW RULE BOOK: cwf-master-plan-v5_2.md -->

## 0 · FIRST ACTIONS
1. Read CLAUDE-PROJECT-INSTRUCTIONS-v2.md (durable map).
2. Read cwf-master-plan-v5_2.md — MUST-FOLLOW rule book. Laser-focus, no sapma.
3. Verify floor: `git rev-parse origin/master` → EXPECT `a5be673` (or later).
4. Load latest register (v59_6 minted; **v59_7 OWED — see §7**) + KB
   (CWF-SESSION-GRAPH-KB-v56; **v55-graph OWED**) + taxonomy `cwf-ir-taxonomy-design-v3`.

## 1 · VERIFIED FLOOR (S58 close)
master `a5be6734924d605d125862cb98493684a78f03f2` · rev 130 · ~3450 tests / 328
files (CI-arbitrated) · drift OK · ZERO pending migrations (last =
`20260721150000_synthetic_traffic.sql`, 54 total).
**S58 merge lineage:** `bad00f4`(S57) → `866924c`(IR-3 PR#98, `--no-ff` of
`f0d3c6e`) → **[GO-LIVE published: `router.frameRouting=1` + `synthetic.enabled=1`
via eval gate]** → `a5be673`(B1-CLEAN-1 PR#99, `--no-ff` of `829bb82`).

## 2 · THREE-LANE WORKFLOW (unchanged)
Architect=Claude · AG=Claude Code (isolated workdir per lane, S56-1; **has a
read-only `supabase-ro` MCP link — NO write creds**, correct by design) ·
Operator=Gemini+Supabase MCP (`supabase db push` only, project
`fjbrkimwvtpwoxhziidh`, FENCE-first) · Owner=Maymun (relay + consent/decision/test
only). Governed **publishes** (agent.param, seedRules) ride the eval gate via the
credentialed **admin panel** (owner) or a gated-service script — NEVER AG raw DB.

## 3 · WHERE WE ARE — v5_2 position
**GATE-0 → SEALED ✓. BLOCK 1 · IR → FULLY CLOSED ✓** (S58):
- **K1 ratification** ✓ (Decision A: QUERY_TOPOLOGY→QUERY_MASTER, 6 actions).
- **IR-3 THE flip** ✓ merged `866924c` AND **live-confirmed** — `router.frameRouting=1`
  published (gate verdict=published), real turns show `basis=frame` steering,
  fall-through to keyword floor works, zero regression/strand, IR-2 time parser
  live (`resolve_time_range "dün"/"bugün"`).
- **IR-3 riders** ✓ (B1-CLEAN-1 `a5be673`): F134 ledger-only (build PARKED for
  Path B) · F146 probe per-layer attribution (frame/semantic="live turn",
  keyword="REAL", no LLM to render) · enrichment 4th-tier sentence (TRUST_TIER now
  full Record, ADR-001-grounded "It enriches, it does not rule.") · stale comment.
- **IR-4 Path B contract** ✓ folded into `cwf-ir-taxonomy-design-v3` §9.

**→ NOW: BLOCK 2 · Superset E-activation** (master plan §1; §3-A confirmed).

## 4 · IMMEDIATE NEXT — BLOCK 2 Superset E-activation
Goal: Superset actually SERVES (queries route to Superset tools, not only ARMES).
Freeze-independent (normal eval gate, not prompt.segment).
1. **LIVE DIAGNOSIS FIRST (don't guess root cause — standing rule):**
   - Architect: Vercel logs. **Known signal (S58 IR-3 logs):** `[MCP Mirror]
     served 145 defs backend=armes,superset` (Superset IS in the mirror) BUT
     `catSource=db catCount=12` = **ARMES-only categories** → Superset rule_kinds
     NOT in governed DB.
   - AG (`supabase-ro`): read `mcp_settings` (`supersetArmes` entry —
     `backend_id` backfilled?) + governed Superset `rule_kinds`/CORE rules
     (present?). Confirm the known root cause: `seedRules.ts` not run for Superset
     + `backend_id:'superset'` not backfilled.
2. **ACTIVATION phase (after diagnosis confirms):** `seedRules.ts` publishes
   Superset rule_kinds + CORE rules to governed DB (gated-service run, S43-4) +
   backfill `backend_id:'superset'` on the `supersetArmes` mcp_settings entry.
3. **VERIFY LIVE:** Vercel logs show a Superset-appropriate query routes to
   Superset tools (catCount includes Superset categories; a Superset tool called).

Then v5_2: BLOCK 3 (Memory/F48+F83) → 4 (Kale-RAG) → 5 (cleanup + FREEZE LIFT) →
6 (docs) → 7 (close) → Path B adjacent.

## 5 · KEY FACTS
- **IR-3 is LIVE** (`router.frameRouting=1` published, not dark). `frameEnabled=1`
  already live. Ladder: frame → semantic(SR1) → keyword floor.
- **Synthetic injector RE-ENABLED** (`synthetic.enabled=1`, mode `frame-only`,
  active set `cwf-synthetic-gapfill-v1` = `2c54030d…`, ~2K tokens/tick, cron
  `* * * * *`). Records shadow frames; frame-only = no tool selection.
- Semantic router = `gemini-2.5-flash-lite`; main chat = `gemini-2.5-flash`.
- ARMES = 4 active + 13 inactive = 17 registered. Superset in mirror, NOT serving.
- `cwf-ir-taxonomy-design-v3` = ratified 6-action taxonomy + derivation matrix
  (58 derivable/20 unmapped, byte-sibling of `deriveCategories.ts`) + §9 Path B
  contract. v1/v2 immutable.
- GOLDEN FREEZE still engaged (lifts BLOCK 5). BLOCK 2 freeze-independent.

## 6 · WATCHES
- **IR-3 live-confirmation watch:** on the S58 quick-verify, an OEE-"bugün" turn
  fell to `basis=keyword` (floor caught it correctly). Track whether OEE-class
  queries reach `basis=frame` consistently over a wider window; if they lean on
  the floor, that's a signal to tighten the frame derivation later (NOT a
  regression — floor served correctly).
- golden-runner 1075/18h + `[Obs] flush failed (non-fatal)` on
  `/api/admin/golden-runner` — undiagnosed, BLOCK 5.
- Architect premise-error tally (two-lane critique loop, load-bearing).

## 7 · LEDGER DEBT (mint at S59 open — GOLDEN LEDGER)
**register v59_7 + KB-graph v55 must capture (nothing omitted):**
- **PLATINUM-BREACH-4** (self-declared): Architect listed judgment-free
  `ir-3` branch-delete as an owner action item (already AG's §M job) → redesigned
  same-turn into ONE atomic AG GO block; owner relay-only. Self-check trigger
  added to the PLATINUM rule.
- **S58 premise-error tally (4, all caught by AG's correct stops — critique loop
  working):** (1) IR-3-v1 pointed derivation matrix at off-repo doc AG can't
  access (embed-verbatim §5 gap → v1_2 folded it in); (2) B1-CLEAN F134 §9
  citation was off-repo/repo-untraceable (AG's git-history grep found zero trace →
  corrected to off-repo attribution, no invented citation); (3) G2 brief assumed
  frame tier purely computable — it requires the router LLM call (AG shipped the
  honest "requires a live turn" probe); (4) go-live AG block used actor free-text
  + assumed AG write creds (AG stopped: needs real uuid actor + no write path →
  routed to owner admin-panel publish).
- **STANDING LESSON (S58):** never cite an off-repo Architect doc as an
  AG-verifiable citation. Every AG-facing artifact EITHER embeds the content
  verbatim OR attributes it explicitly as "off-repo, Architect-layer" — never as
  a repo-traceable phase/doc/section reference.
- IR-3 go-live (frameRouting=1 + synthetic.enabled=1 published, live-confirmed).
- B1-CLEAN-1 close + BLOCK 1 FULLY CLOSED.
- The §6 watches.
- **CARRY-DIFF check** vs v59_6 (paste result into v59_7): every prior item
  present or carries an explicit terminal marker.

## 8 · DEFERRED / WATCH (carried from v56)
- F-BW11 (seed-on-view) · F-BW12 (real-token ceiling, BLOCK 5) · F-BW13
  (add-set≠active) — 3 SYNTH-TRAFFIC UX fixes, batchable.
- Stale merged branches (obs-trace-2b, flake-sweep-1, pane-scroll-1/2,
  hotfix/f152, + now spent IR-3/B1-CLEAN branches deleted) — discretionary sweep.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v57 · 2026-07-22 -->