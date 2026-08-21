# PHASE-STAGES-TRUTH-1 · v1
**Lane: AG-3 · standalone (UI-truth program leg 3, owner ruling S101). Touches the DIGEST EMISSION path (turn-pipeline-adjacent) — AG-3 is the SOLE holder of that surface while this phase is open. NO migrations (digest payload is jsonb; scope/purpose ride inside it). Declared merge order: AG-1 (census) → AG-2 (mcp-settings) → AG-3 (this); rebase on post-AG-2 master before final push (seal singleton + `TabPurposeStrip` import + the serving-truth helper born in AG-2's R2).**

**PRECONDITION (S47-1):** base is `origin/master` at `2caaffba…d9747d` (rev 262) or later IF the only intervening merges are census-console-2 and/or mcp-settings-truth-1. Anything else → STOP and report.

**Branch:** `phase/stages-truth-1` · push · PR against master (unsharded CI arbiter; `total_count:0` on a PR = FAILED).
**Report:** `docs/relay/PHASE-STAGES-TRUTH-1-report.md`

---

## 0 · OWNER-OBSERVED DEFECTS (Architect-verified in code)
1. The per-stage DB ledger renders `table · op · rows` with NO purpose — `DigestDbReadEntry` (`api/cwf/_lib/observability/digestBuilder.ts`) carries no purpose field; the reader cannot answer "select of WHAT, for WHY".
2. Writes render `rows: not measured` across cards 01/02/09/12 — affected counts are never captured.
3. `digestBuilder.ts:103` silently HALVES `dbReads` under size pressure — the display never says "showing N of M" (partial≠complete violation inside the ledger itself).
4. Card 06's backend scope proxy uses `getBackends(true)` (= `enabled`) in `resolveMetricRegistry.ts` / `resolveToolCategories.ts` — draft `tk-temp` and paused `mount-probe` appear in the live scope line. Scope must mean SERVING, and the turn's actual scope must be persisted, not proxied.
5. FULL-TRACE gaps the page itself confesses: stage 10 `streamText (no I/O captured)` + `tokens: not captured`; stage 14 chip says `cwf.flush` while the live line says "no spans at this stage".
6. Hygiene/copy: unwindowed long tables inside cards; 20× alternating `seed_state insert(not measured)/select 1` raw dump on card 09; header "14 Stages" vs 15 rendered cards (00 is the pre-pipeline gate); card 04's truncated sentence "plan text is not persisted — the summary is"; card 03's bare "diverged — 0 publishes since" chip.

## 1 · LIVE-READ FIRST (D-1/S65-1) — paste into report
`digestBuilder.ts` + `digestSink.ts` + `turnDigestWrite.ts` + `TurnTraceDigestRepository.ts` (current entry shape, the halving site, write paths) · the stage-card renderer (`StageContextSection.tsx` + `DigestLegend.tsx` + the Stages tab component) · every call site that appends a db-read entry (grep the appender; list them ALL — this census IS the purpose-tag worklist) · `SPAN_FLUSH` usage: where `cwf.flush` is (not) opened.

## 2 · REQUIREMENTS

**R1 — Purpose-tagged ledger (the heart).** Extend the digest entry with `purpose: string` (short, emission-site literal, English, deterministic — NEVER derived by any model). Every appender found in the §1 census supplies its purpose at the call site (e.g. `backend_tools · select · 150 — armes catalog for tool registration`). The type makes `purpose` REQUIRED so a new read cannot be added silently untagged (compiler is the gate, D-5 spirit). Renderer: group rows by purpose, show `purpose · tables touched · ops · Σrows`, expandable to raw rows; raw view lives in a fixed-height scrollbox inside the card.

**R2 — Measured writes.** Repository write paths that feed the digest capture affected-row counts (PostgREST `Prefer` count / returned rows length). Where a count is genuinely unobtainable, the entry says WHY in one word (`uncounted-bulk`), never bare "not measured". Card 09's seed pattern renders as ONE line: `seed_state — absence-only seeding ×20 attempts, K new rows` (K now measurable; empty≠zero preserved: 0 renders as real 0).

**R3 — Truncation honesty.** The halving path stamps `truncated: {kept, total}` into the digest; renderer shows "showing N of M reads". No silent halving survives this phase.

**R4 — Serving scope, persisted.** (a) Introduce/consume ONE helper for "serving backends" = `lifecycle='active' AND enabled` (align with AG-2's R2 live-read verdict on `enabled`; if AG-2 found `enabled` dead, serving = lifecycle alone — read their merged report at rebase time and state which). Swap the two `getBackends(true)` scope sites to it. (b) Persist the turn's ACTUAL active-backend scope into the digest payload; card 06 renders the persisted scope for past turns and marks the proxy path as legacy for pre-phase turns ("scope not recorded for this turn" — never a fabricated list). `diverged` recomputes against persisted scope when present.

**R5 — Span-gap census + flush span.** Cross-check every stage chip on the page against spans the completeness guard enforces; produce a table in the report: stage · chip claims · guard enforces · live emits. Fix in-phase: open the `cwf.flush` span (SPAN_FLUSH exists unused at stage 14) so the chip stops lying. Stage 10 `no I/O captured` / `tokens: not captured`: diagnose to the byte (S73-1) — if a provider/AI-SDK limitation, the CARD must say the named reason on the chip and the finding is filed by name; if a wiring gap, fix it here. No third state.

**R6 — Copy & layout.** Header: "14 stages + gate (00)". Card 03 chip gains its one-line meaning. Card 04's truncated sentence completed from the doc it quotes. All in-card tables windowed (max-height + scroll). Import `TabPurposeStrip` for this tab at rebase. Full-width responsive container consistent with AG-2's R6.

**R7 — Efficiency finding, NOT fixed here.** The duplicate-read smell (backend_tools ×7, domain_rules ×5, entity_registry 500+300 in one turn) becomes measurable once R1 lands. File it as a named register finding `F-S101-ROUTE-READ-DUP` with the purpose-grouped evidence attached — optimization is a LATER phase; this phase only makes it provable. (Named deferral, S61-2-compliant.)

## 3 · TESTS
Type-level: untagged append fails to compile (assert via a negative-type test) · truncation stamp renders N-of-M · seed aggregation math · serving-helper property (draft/paused/retired never in scope) · persisted-scope round-trip · flush span presence in the guard's census · write-count capture on one representative repo path · card copy assertions.

## 4 · DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/stages-truth-1
report: docs/relay/PHASE-STAGES-TRUTH-1-report.md (includes §1 appender census + R5 span table)
pr: against master, unsharded CI green (total_count:0 = FAILED)
proof: post-deploy proof read (S63-1) = one real turn, then owner opens Stages and reads card 07 grouped-by-purpose unaided; Architect confirms digest rows carry purpose+counts+scope live, and tk-temp/mount-probe absent from card 06 scope
```
Merge `--no-ff` after Architect GO only. Reseal only if the tree changed (S100-1); Stages surfaces are drift-mapped — expect a reseal + docVersion bump in the merge-turn commit.

<!-- END · PHASE-STAGES-TRUTH-1-v1 -->
