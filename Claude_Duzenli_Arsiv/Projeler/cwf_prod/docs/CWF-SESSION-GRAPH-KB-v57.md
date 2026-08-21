# CWF — Session Graph KB · v57
<!-- CWF-SESSION-GRAPH-KB-v57 · 2026-07-22 · appends S58 to v56.
     Narrative history; the actionable ledger is cwf-open-items-register-v59_7. -->

## S58 — "THE BLOCK-1 CLOSE SESSION" (2026-07-22)
Opened on bootstrap v56 (floor `bad00f4`, rev 128, BLOCK 1 inside, K1 passed,
IR-3 in flight with AG). Closed with **BLOCK 1 FULLY CLOSED**: floor `a5be673`,
rev 130, ~3450 tests / 328 files, drift OK, zero pending migrations.

### Arc
1. **IR-3 (THE flip) — reviewed → merged.** AG's picker surfaced the derivation
   matrix wasn't in the repo. Diagnosis: IR-3-v1 pointed at the off-repo taxonomy
   design doc (embed-verbatim §5 gap — Architect premise error #1). Fix:
   `claude-code-PHASE-IR-3-v1_2` folded the K1-ratified **6-action** derivation
   matrix inline (TOPOLOGY→MASTER; one changed cell `QUERY_MASTER×LINE=production,factory`).
   Also minted `cwf-ir-taxonomy-design-v2` (ratified) then **v3** (IR-4 Path B
   contract §9). AG built + CI-green (PR#98, `f0d3c6e`). FAST-GATE: derivation =
   byte-faithful (58 derivable/20 unmapped), flip dark+reversible, `frameRouting`
   floor=0, security clean, tier-boundary judgment (HIGH→replace / AMBIGUOUS→union
   / null→keyword) ratified. GO → merged `866924c` (`--no-ff`).
2. **GO-LIVE.** Owner consent. Two governed-param publishes via the credentialed
   admin panel: `router.frameRouting=1` (gate verdict=published) + `synthetic.enabled=1`
   (injector active). Pre-flip **shadow comparison** (AG, read-only, 685 recorded
   turns, deterministic — NOT the freeze-locked router A/B lens): **REGRESSION=0**
   (structural + empirical); FRAME-NARROWER 44% = the intended precision gain.
   Live confirmation: real turns show `basis=frame` steering, keyword-floor
   fall-through works, zero strand (model only calls offered tools), IR-2 time
   parser live (`resolve_time_range "dün"/"bugün"`), 0 errors. **IR-3 LIVE +
   CONFIRMED.** (Watch: an OEE-"bugün" turn fell to `basis=keyword` — floor caught
   it; track OEE-class frame reach.)
3. **B1-CLEAN-1 — the carved riders.** RULE-25 review found IR-3 spine closed but
   3 riders CARVED by AG unreported (F134, F146, enrichment 4th-tier). Owner:
   "close BLOCK 1 clean, laser focus." Phase `claude-code-PHASE-B1-CLEAN-1-v1`:
   F134 = ledger-only (build PARKED Path B; IR-era obligation off-repo) · F146 =
   probe per-layer attribution (honestly "requires a live turn" for frame+semantic
   — Architect premise error #3: assumed frame computable; AG corrected) ·
   enrichment 4th-tier sentence ("It enriches, it does not rule.", ADR-001-grounded,
   TRUST_TIER now full Record) · stale comment. AG's picker again caught the F134
   off-repo §9 citation (premise error #2) → corrected to plain off-repo
   attribution. PR#99 CI-green, FAST-GATE GO → merged `a5be673`. **BLOCK 1 FULLY
   CLOSED.**

### Constitutional / process events
- **PLATINUM-BREACH-4 (self-declared):** Architect listed a judgment-free branch
  delete as an owner action item → redesigned into one atomic AG block; owner
  relay-only. Remedy: PLATINUM **SELF-CHECK TRIGGER** added (judgment test before
  every owner action-item bullet).
- **S58-1 STANDING LESSON:** never cite an off-repo Architect doc as an
  AG-verifiable citation — embed verbatim OR attribute explicitly as off-repo.
- **Premise-error tally = 4, ALL caught by AG's correct stops** (off-repo matrix,
  off-repo §9 citation, frame-computable assumption, actor-freetext+no-write-creds).
  The two-lane critique loop is load-bearing and working; AG's refusal-to-fabricate
  is ratified behavior (S54-4 family).
- **Go-live mechanics learned:** a never-published code-floor param has no one-tap
  affordance (needs "New draft" + JSON) — logged as a tooling gap (automation-first).
  `router.frameRouting` + `synthetic.*` are governed agent.params; publish via
  owner admin panel (credentialed/gated) — AG has read-only `supabase-ro`, no write.

### Where S59 opens
**BLOCK 2 · Superset E-activation.** Step 1 = live diagnosis (Vercel logs +
`supabase-ro` mcp_settings/rule_kinds reads; known signal `catCount=12` ARMES-only).
Step 2 = `seedRules.ts` publish + `backend_id:'superset'` backfill. Verify live.

<!-- END · CWF-SESSION-GRAPH-KB-v57 · 2026-07-22 -->
