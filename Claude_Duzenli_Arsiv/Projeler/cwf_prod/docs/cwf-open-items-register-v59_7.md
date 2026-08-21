# CWF — Open Items Register · v59_7
<!-- cwf-open-items-register-v59_7 · 2026-07-22 · amends v59_6 after S58.
     GOLDEN LEDGER: append-only; items leave ONLY via terminal marker
     (CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO); carry-diff pasted in §0;
     open items carried BY NAME with a pointer to v59_6 for last full wording;
     prose may shorten, no item omitted. -->

## VERIFIED FLOOR (v59_7 / S58 close)
master `a5be6734924d605d125862cb98493684a78f03f2` · rev 130 · ~3450 tests / 328
files (CI-arbitrated) · drift OK · ZERO pending migrations (last =
`20260721150000_synthetic_traffic.sql`, 54 total).
**S58 lineage:** `bad00f4`(S57) → `866924c`(IR-3 PR#98) → [GO-LIVE publish:
`router.frameRouting=1` + `synthetic.enabled=1`] → `a5be673`(B1-CLEAN-1 PR#99).

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v59_6 → v59_7
**S58 terminal markers (items leaving OPEN):**
- **IR-3 (BLOCK 1 flip) → CLOSED@866924c** (PR#98, `--no-ff` of `f0d3c6e`).
  K1-A enum merge + `deriveCategories.ts` (58 derivable/20 unmapped) + frame-primary
  flip + clarification ACTIVE + ALT-D. Shipped dark, THEN gone live (below).
- **IR-3 GO-LIVE → CLOSED@published+live-verified** — `router.frameRouting=1`
  published via eval gate (verdict=published, 06:43:38) + `synthetic.enabled=1`
  (injector active 06:42). Real turns confirm `basis=frame` steering + keyword-floor
  fall-through + zero regression/strand + IR-2 time parser live. Reversible
  (`frameRouting=0`).
- **IR-3 riders → CLOSED@a5be673** (B1-CLEAN-1 PR#99): F134 ledger-only (build
  PARKED Path B) · F146 probe per-layer attribution · enrichment 4th-tier sentence
  · stale comment. (F147 already CLOSED@866924c in the IR-3 PR.)
- **IR-4 Path B contract → CLOSED@cwf-ir-taxonomy-design-v3 §9** (off-repo Architect
  doc; zero build).
- **BLOCK 1 (IR) → FULLY CLOSED** (all three master-plan §1 items done).
**Carry-diff check:** every v59_6 item is present below OR carries a terminal
marker above. "Absent without marker" set = **EMPTY** ✓. F-BW01·02·03·04·08·09·10
stay CLOSED@bad00f4 (v59_6 §4 line 245). F-BW11/12/13 carried OPEN. All v59_6 §7
RULES/RECORDS + §8 PARKED/WATCH carried by name (§6/§7 below, pointer v59_6).

## 1 · v5_2 RELEASE TRACK — position
Track: **GATE-0** ✓ → **B1 IR** ✓ **FULLY CLOSED (S58)** → **B2 Superset
E-activation ← NOW** → B3 Memory → B4 Kale-RAG → B5 cleanup + FREEZE LIFT → B6
docs+arch → B7 close → Path B adjacent.
**B2 first step = LIVE DIAGNOSIS** (don't guess): Architect Vercel logs (known
signal: `catCount=12` ARMES-only → Superset rule_kinds not in governed DB) + AG
`supabase-ro` reads (`mcp_settings.supersetArmes.backend_id`? Superset rule_kinds
present?). Then activation: `seedRules.ts` publish + `backend_id:'superset'`
backfill (gated-service, S43-4). Verify live: a Superset query routes to Superset
tools. Freeze-independent.

## 2 · 🧊 GOLDEN FREEZE (engaged, unchanged from v59_6 §2)
Lifts at BLOCK 5. Staged-behind-freeze items + F140/F138/F139 + F133-L5 + F83.1
golden sub-items carried whole (pointer v59_6 §2, v58 §2). **Watch:** golden-runner
1075 calls/18h + `[Obs] flush failed (non-fatal)` on `/api/admin/golden-runner`
(undiagnosed, investigate BLOCK 5 before lift).

## 3 · REMAINING SPINE (v5_2-ordered; B1 removed, now CLOSED)
- **B2 Superset E-activation** — §1 above.
- **B3 Memory** — MEMORY-1/F48 (episodic, stages 05+14) + F83 arc (KB→web→
  write-back); F83.1 golden sub-items behind freeze. (Pointer v59_6 §3.)
- **B4 Kale-RAG** — MCP backend ROW, external dependency; guidance delivered.
- **B5 cleanup + FREEZE LIFT** — security-cleanup (mcp_settings 6/6 raw→apiKeyRef +
  DB-introspection endpoint) · golden-runner diagnosis · dev-preview seam residuals
  · branch cleanup · BOARD-WALK residuals · F-tail F118·F119·F120·F135·F122 ·
  LANGFUSE-V4-UPGRADE · STAGE-PLAYGROUND · F-BW12. (Pointer v59_6 §3/§8.)
- **B6 docs+arch** (durable-map "KB7 only" fix: ARMES 4 active+13 inactive) · **B7
  close** · **Path B adjacent** (Qdrant+bge-m3+OPA; contract = taxonomy-v3 §9 +
  `cwf-ir-pathb-hybrid-logic-v1_3`).

## 4 · BOARD-WALK FINDINGS (carried)
- **F-BW01·02·03·04·08·09·10 → CLOSED@bad00f4** (PR#97, GATE0-UI-BATCH-1).
  F-BW05·06·07 CLOSED@diagnosis/owner-ruling. (Full wording v59_6 §4.)
- **F-BW11 · OPEN** (seed-on-view) · **F-BW12 · OPEN** (real-token ceiling, BLOCK 5)
  · **F-BW13 · OPEN** (add-set≠active) — 3 SYNTH-TRAFFIC UX/accuracy fixes,
  batchable (candidate: fold into a BLOCK-2 visit). Full wording v59_6 §4.

## 5 · NEW S58 RECORDS (rules / breaches / watches)
- **PLATINUM-BREACH-4 (self-declared, S58):** Architect listed judgment-free
  `ir-3` branch-delete as an owner action item (already AG's §M job) → redesigned
  same-turn into ONE atomic AG GO block; owner relay-only. Remedy: **SELF-CHECK
  TRIGGER** added to the PLATINUM rule — before EVERY "YOUR ACTION ITEMS" bullet,
  ask "does this contain human JUDGMENT (decision/consent/real-world test)?"; if
  NO → it's AG/machine work, never listed for the owner.
- **S58 PREMISE-ERROR TALLY (4, all caught by AG's correct stops — the two-lane
  critique loop working, load-bearing):**
  (1) IR-3-v1 pointed the derivation matrix at an off-repo doc AG can't access
      (embed-verbatim §5 gap → fixed via v1_2 folding the matrix inline).
  (2) B1-CLEAN F134 §9 citation was off-repo / repo-untraceable (AG's `git log
      --all -S` + tree-wide grep found zero trace → corrected to plain off-repo
      attribution, no invented citation).
  (3) G2 brief assumed the frame tier is purely computable — it requires the
      router LLM call (IrFrame's only producer) → AG shipped the honest probe
      (frame+semantic = "requires a live turn", keyword = "REAL").
  (4) Go-live AG block used a free-text actor + assumed AG write creds → AG
      stopped (needs a real uuid actor + has no write path) → re-routed to the
      owner admin-panel publish (the correct credentialed/gated affordance).
- **STANDING LESSON (S58-1):** never cite an off-repo Architect doc as an
  AG-verifiable citation. Every AG-facing artifact EITHER embeds the content
  verbatim OR attributes it explicitly as "off-repo, Architect-layer" — never as
  a repo-traceable phase/doc/section reference.
- **WATCH — IR-3 live-confirmation:** an OEE-"bugün" turn fell to `basis=keyword`
  (floor caught it correctly). Track whether OEE-class queries reach `basis=frame`
  consistently; if they lean on the floor, signal to tighten the frame derivation
  later (NOT a regression).

## 6 · RULES / RECORDS (v59_6 §7 carried whole by name)
All prior rules survive (S30-x · S32-1 · S33-1 · S34-1 · S35-1 · S37-x · S41-x ·
S43-x · S47-1 · S54-x · S55-x · S56-x · RULE-25/26/28 · PLATINUM · GOLDEN LEDGER ·
FULL-TRACE MANDATE · ADR-001/002/004/005/006/007/008; full wording v59_6 §7 + KB).
**+ S58-1** (off-repo-citation lesson, §5). **+ PLATINUM SELF-CHECK TRIGGER** (§5).

## 7 · PARKED / EXTERNAL / WATCH (v59_6 §8 carried by name)
Kale-RAG external arc · STAGE-PLAYGROUND · **Superset E-activation** (now ACTIVE =
B2) · live watches (`routing_mismatch` ticks · `finishReason=error` F122 family ·
golden-runner 1075/18h) · stale merged branches (obs-trace-2b · flake-sweep-1 ·
pane-scroll-1/2 · hotfix/f152 · + spent IR-3/B1-CLEAN deleted) — discretionary
sweep. Full wording v59_6 §8.

## 8 · YOUR ACTION ITEMS (owner, at v59_7 write / S58 close)
- Add to the project: `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v57`, this register
  `v59_7`, and `CWF-SESSION-GRAPH-KB-v57`, `cwf-ir-taxonomy-design-v3`.
- (Note: bootstrap v57 §0/§7 says "KB v55 owed" — typo for **v57**; the KB minted
  now IS v57. Amend to v57_2 only if you want the reference corrected in place.)
- To start S59: paste bootstrap v57 into a fresh session → it boots at BLOCK 2.
- Relay stays the only owner surface. GOLDEN FREEZE engaged until BLOCK 5.

<!-- END · cwf-open-items-register-v59_7 · 2026-07-22 -->
