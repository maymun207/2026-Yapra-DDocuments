# CWF — L2 PROMPT-GOV Design Note · v1

<!-- cwf-L2-prompt-gov-design-v1 · rev 1 · 2026-07-10 · Architect-lane artifact (NOT for AG).
     Grounded line-anchored at origin/master 628b3b6 (verified floor: 1561 tests / 156 files /
     docVersion rev 57 / drift [OK]). Every anchor below is a DEFINITION site, grep-verified
     per S30-3. Companion charter: cwf-decision-surface-inventory-v4 (HC-1/HC-2). -->

## 0. One-sentence commit

All prompt-core **text** (identity, safety §1–5, tone, viz instructions, ARAÇLAR header, rules
1–10) becomes governed CORE values on the existing `system` lane (L1's `backends` row — zero
new lane), DB-first/code-floor, with session-draft preview (polarity-NORMAL), a two-layer
publish gate (deterministic structural stage + L3-lite golden-20 paired-replay with Wilson-CI
honesty), and the config-fingerprint `promptRev` axis flipped from a source-file hash to a
use-time hash over the RESOLVED segment set. Composition **structure** stays code.

## 1. Grounded inventory (definition sites at `628b3b6`)

| # | Text asset | Definition site | Today |
|---|---|---|---|
| 1 | `<role_definition>` identity | `api/cwf/_lib/prompt/core/identity.ts:7` (`identity()`) | Verbatim Phase-1 TR text, code literal |
| 2 | `<core_directives>` + `<strict_boundaries>` §1–4 + §5 (A2 tool-content) | `core/safety.ts:17` (`safety()`) | One code literal, ~50 lines TR |
| 3 | `<tone_and_style>` | `core/outputFormat.ts:10` (`outputFormat()`) | Code literal |
| 4 | Viz macro instructions | `shared/cwfConstants.ts` → `VIZ_MACRO_INSTRUCTIONS`, interpolated at `outputFormat.ts:22` | Shared constant; **documents the deterministic render-parser contract** |
| 5 | ARAÇLAR header + rules 1,2,3,4,5,6,9 | `core/toolProtocol.ts:24–31` (`RULE_1..RULE_6`, `RULE_9`), assembled `:32` (`toolProtocol()`) | Code literals |
| 6 | Rules 7, 8, 10 (data-fidelity / recordCount / handle) | `core/grounding.ts:13,17,20` (`GROUNDING_RULE_*`) | Code literals; **rule 10 interpolates `AGGREGATE_TOOL_NAME`/`QUERY_TOOL_NAME`** from `resultStore.ts` |
| 7 | Assembly + order | `prompt/assemble.ts:63` (`buildSystemPrompt`): `[identity, safety, outputFormat].join('\n\n')` + `'\n'` + `toolProtocol` + packs | **Structure = code** (P2a byte-identity gate via `promptSnapshot.test.ts`) |
| 8 | Call site | `turn/stagesModel.ts:90` (stage 8, after knowledge warm; lab pack override seam `:75–85`) | ONE call site |
| 9 | `PROMPT_CORE_REV` | `core/promptRev.ts:13` — sha256 over prompt-core sources, CI-pinned (`promptRev.test.ts`); header literally says *"L2 replaces this constant with the PUBLISHED prompt revision"* | Content-hash discipline (L1 §2.6) |
| 10 | `time` module | `core/time.ts` — `cached:false` in `registry.ts:38`; rides the user message | **NOT prompt-core; stays code** |
| 11 | Domain packs | `backends/{armes,superset}/pack.ts` → `DbKnowledgeProvider` | **Already governed** — out of L2 scope |
| 12 | `METRIC_ALIASES` | `grounding/groundingCheck.ts:280` (detector vocab; `:98` comment: "stay STATIC — language normalization") | Duplicated synonyms also at `toolCategories.ts:163` (routing keywords) |
| 13 | Lane precedents | `kinds.ts:32` (`SYSTEM_KIND_IDS.AGENT_PARAM`), `seedAgentParamsCore.ts:40` (system `backends` row), `evalGate.ts:188` (`isSystem` pass-through arms), `resolveAgentParams.ts:89` (ONE-chain reader) | L1 — the pattern L2 mirrors |
| 14 | Replay substrate for the gate | `replay/pairedReplay.ts:64` (`wilsonInterval`), `:149` (`computePairedDelta`), `:176` (`runPairedReplay`); `taskFn.ts`, `stubTools.ts`, `scorers.ts`; quota via REPLAY-QUOTA-1 | L3-lite reuses, never re-builds |

**Anchor honesty (S30-3):** every site above was grepped as the actual export/impl at `628b3b6`.
One pre-empted trap: rules 7/8/10 do NOT live in `toolProtocol.ts` — their definition site is
`grounding.ts` (they are composed at numbered positions). The phase prompt must cite
`grounding.ts` as the floor home, or AG will hit a TRUST-PANEL-1-deviation-#1-shaped mismatch.

## 2. Determinism split (RULE §7 — named before implementing)

- **Governed (DB values, this phase):** the TEXT of segments 1–6 above. Prompt text is layer-2
  (model-dependent) by ADR-001's own honesty note in `safety.ts` — the deterministic guarantee
  was never the words, it is the structure. Editing words is safe to govern.
- **Code (never governed):**
  - Assembly order, module registry, the `toolProtocol` empty-tools `''` behavior, `toolList`
    rendering (runtime data), the `time` module.
  - **`VIZ_MACRO_INSTRUCTIONS`' macro TOKEN CONTRACT**: the render parser is deterministic code;
    the instruction text becomes governed BUT its publish gate pins the macro tokens (see §5
    Layer 1) — you can rephrase the teaching, you cannot rename `[TABLE_FROM_TOOL]`.
  - **`METRIC_ALIASES` — explicitly NOT governed.** It is detector vocabulary (grounding +
    scope-divergence, RULE 5 deterministic). The L2 "dedup" is a CODE-level single-source hoist:
    new `shared/metricVocab.ts` exporting the alias table; `groundingCheck.ts:280` and
    `toolCategories.ts:163` both import it. A governed glossary edit (SOFT
    `armes.glossary_term`) must NEVER mutate detector vocab — polarity stated in the module
    docblock. Zero behavior change (byte-identical tables, test-pinned).
  - Injection boundary LAW unchanged: `buildSystemPrompt` never receives tool
    descriptions/results (ADR-001; `injectionBoundary.test.ts` stays the proof). Governed
    segment text DOES enter the `system` role — this is the SAME trust class as the domain
    packs already in production (DB text → system role since P4): mitigations are the gate,
    versioning, audit, reset-to-reference. No new exposure class; stated, not hidden.

## 3. Data model — kind `prompt.segment` (CORE, system lane)

Rides `domain_rules` untouched. ONE new kind:

- `SYSTEM_KIND_IDS.PROMPT_SEGMENT = 'prompt.segment'`, `backendId: 'system'`, CORE-locked to a
  new `PromptSegmentSchema` (Zod, `coreSchemas.ts`), mirror in `kinds.ts` (display-only, the
  L1 pattern).
- **Zod shape:** `{ segmentId: z.enum(SEGMENT_IDS), text: z.string().min(1).max(SEG_MAX),
  placeholders?: string[] }` + `.refine`s: (a) `placeholders ⊆ PLACEHOLDER_WHITELIST[segmentId]`,
  (b) every `{{TOKEN}}` occurring in `text` is in the segment's whitelist (unknown placeholder =
  `failedStage:'schema'`, the L1 precedent — the schema stage carries the substantive check).
- **Segment enum (~20 ids, 1:1 with the audit-meaningful units):**
  `identity` · `safety.core_directives` · `safety.b1_scope` · `safety.b2_leakage` ·
  `safety.b3_pii` · `safety.b4_jailbreak` · `safety.b5_tool_injection` · `tone` · `viz` ·
  `tools.header` · `tools.rule.1` … `tools.rule.10`.
  Per-rule granularity is deliberate: the audit trail reads "rule 8 edited", diffs are
  one-rule-sized, and the golden gate can name the changed segment.
- **Placeholders:** only `tools.rule.10` has any: `{{AGGREGATE_TOOL}}`, `{{QUERY_TOOL}}` —
  substituted at compose time from the `resultStore.ts` constants (single source preserved;
  storing literal tool names in DB is the drift trap we refuse).
- **Seed:** idempotent `scripts/seedPromptSegments.ts` mirroring `seedAgentParamsCore.ts`
  (never-clobber; kind row from `KIND_REGISTRY`; ~20 published v1 rows whose text is the
  CURRENT verbatim literals). **No SQL migration** — kind + rows are script-seeded data
  (`seedRules.ts` precedent). Two-door still applies: Operator runs the seed; Architect
  verifies via literal reads (row count, one segment's text hash).

## 4. Reader + compose (DB-first / code-floor, the L1 ONE-chain pattern)

- New `resolvePromptSegments()` beside `resolveAgentParams.ts`: dedicated small read (the
  honest-extra-roundtrip precedent — the knowledge warm is scoped to `activeBackends`, which
  never includes `system`; `stagesModel.ts:92–99` documents this). ONE pure chain per segment:
  **session-draft preview > DB-published > code floor**. No env tier for text. No module cache
  (L1 rule). Outage → code floor: **prompt-gov down ≠ chat down** — the floor is the current
  verbatim literals, so a total Supabase outage reproduces today's prompt byte-identically.
- `buildSystemPrompt` gains a third resolved-input: the segment map (structure change =
  code, sanctioned; values = DB). The existing `LabKnowledge` pack-override seam
  (`assemble.ts:29–56`) is untouched — core segments get a PARALLEL `labPromptCore` seam
  resolved in `stagesModel` when `labActive.previewDrafts` carry `prompt.*` keys (rides
  `kind_drafts` + `resolveKindWithDrafts`, GOV-4/KIND-DRAFT-1 machinery as-is).
- **Byte-identity floor gate:** with zero published rows and no drafts, output ===
  today's prompt, byte-identical (extends the P2a invariant; `promptSnapshot.test.ts` keeps
  passing UNCHANGED — that is the review's cheapest tripwire).
- **Prompt-cache economics (named trap):** a publish invalidates the provider prompt-cache
  prefix — correct and rare. A session DRAFT breaks caching per-request — acceptable, lab-only,
  already true for GOV-4 pack previews. Never silently enable drafts outside lab.

## 5. Publish gate — two layers

**Layer 1 (always, free, deterministic — evalGate behavioral arm):** today `evalGate.ts:188`
passes referential/behavioral through for ALL of `backendId==='system'`. L2 narrows: the
dispatch becomes kind-aware — `agent.param` keeps pass-through (its gate IS the schema stage,
unchanged); `prompt.segment` gets a real behavioral runner. This is the sanctioned additive
dispatch (engine/stage-order/interpreter byte-identical). The runner, per segment:
1. Full candidate compose succeeds (all placeholders resolve; assembler renders).
2. `viz`: the macro tokens (`[TABLE_FROM_TOOL]`, `[TABLE_START]`, chart directives — sourced
   from the shared constants, not string literals) appear verbatim.
3. `tools.rule.N`: the rendered ÖNEMLİ KURALLAR list still numbers 1–10 in order.
4. `safety.*`: non-empty + the composed safety block still opens `<core_directives>` and closes
   `</strict_boundaries>` (tag-structure pin, not content policing).
5. Length ceilings (token-budget guard).

**Layer 2 (L3-lite golden-20 — token-spending, quota-metered, Wilson-CI-honest):**
- Owner curates ~20 recorded specimens (existing `recordedTurn` store; a `golden:true` tag —
  data, not schema surgery if a tags field exists; else one nullable column, forward-only).
- Publish endpoint for `prompt.segment` requires a FRESH passing golden run: `runPairedReplay`
  (baseline = published segments, candidate = draft applied) over the golden set, reps ≥ 3,
  deterministic scorers (empty≠zero + grounding lens — the SCORERS are deterministic; the LLM
  is not, which is exactly why Wilson-CI exists). Token spend rides REPLAY-QUOTA-1 unchanged.
- **Verdict honesty (the Part-A precedent, verbatim discipline):** block ONLY on a
  *distinguishable regression* (candidate empty/violation rate CI strictly worse than
  baseline). Overlapping CIs = `distinguishable:false` = **underpowered, not no-effect** —
  publish proceeds WITH the run id + an explicit `underpowered` flag in `rule_audit`. Never
  render overlap as "safe".
- **Bootstrap stance (chicken-egg, decided):** golden set empty → Layer 2 is SKIPPED with a
  loud `goldenSet:absent` audit note; Layer 1 alone gates. The moment ≥1 golden specimen
  exists, Layer 2 is mandatory. No deadlock, no silent skip.
- Full L3 (EVAL-CI: thresholds in CI, N-rep batches) builds on this seam later — L2 ships the
  seam, not the CI.

## 6. `promptRev` flip (fingerprint axis)

- New: `promptRev = sha256` over the ORDERED resolved segment texts actually composed this turn
  (use-time capture on `ctx`, the `knowledgeCapture` pattern at `stagesModel.ts:86–90` — never
  a re-read; a publish landing mid-turn cannot tear it). Floor-only turns hash to a constant
  that equals... the floor hash — so the axis is uniform across floor/DB/draft states; drafts
  are visibly distinct revisions (correct: a lab turn IS a different prompt).
- `PROMPT_CORE_REV` (`promptRev.ts:13`) **stays**, re-scoped as the FLOOR hash: the CI
  content-hash test keeps pinning the floor source files (editing a floor literal without
  re-stamping still fails the suite). The fingerprint just stops reading the constant and
  starts reading the capture. `configFingerprint.ts` is on the frozen list — the change lands
  in the CAPTURE producer, not the hasher; if a one-line hasher input swap is unavoidable, it
  is disclosed as the ONE sanctioned touch (L1's evalGate-arm precedent).

## 7. Admin surface (HC-2 sandbox parity — polarity NORMAL)

Prompt segments appear in the existing GOVERN rules machinery (they are `domain_rules` rows on
a kind): RulesTab family filter gains the `system`/prompt family; session preview via the
existing KIND-DRAFT-1 draft flow; reset-to-reference per segment (floor text) via the existing
reset affordance; publish = super-admin only through the gated endpoint (unchanged RBAC). New
UI is a thin family lens, not a new panel — TweakTab/QuotaPanel precedents. Bilingual labels;
both legibility gates auto-enroll.

## 8. Test plan sketch (review tripwires)

- `promptSnapshot.test.ts` UNCHANGED and passing (floor byte-identity).
- `injectionBoundary.test.ts` UNCHANGED and passing.
- New: segment schema + placeholder refine (incl. unknown-placeholder rejection) ·
  resolve chain (draft>db>floor; outage→floor) · compose-with-DB-values snapshot ·
  Layer-1 behavioral runner per family (incl. macro-token pin negative fixture) ·
  golden-gate verdict honesty (regression blocks; overlap publishes flagged; absent set skips
  loudly) · promptRev capture (mid-turn publish tear test, the L1 torn-attestation pattern) ·
  metricVocab hoist byte-identity (both importers) · seed idempotence/never-clobber.
- Frozen-path proof list for the phase prompt: `evalGate.ts` engine/stage-order ·
  `groundingCheck.ts` logic (vocab import swap ONLY) · `api/admin/replay.ts` ·
  `configFingerprint.ts` (or ONE disclosed line) · `trustRegistry.ts` · packs.

## 9. Non-goals (do not build)

Prompt A/B in production (L5) · per-user prompt variants · routing-draft store (L4) ·
Docusaurus · any sanitizer on governed text (A3 stance: non-authoritative, not stripped) ·
`time` module governance · assembly-order governance · METRIC_ALIASES as a governed row.

## 10. Open decisions for the owner (say yes/no, defaults committed)

1. **Segment granularity** — committed: per-rule/per-boundary (~20 ids). Coarser (5 blocks) is
   possible but blunts the audit trail.
2. **`viz` governed-with-macro-pin** — committed: yes (R-A everything-tweakable, gate pins the
   parser contract). Alternative: keep viz code-only.
3. **Golden-gate bootstrap stance** — committed: absent-set = loud skip, ≥1 specimen = mandatory.
4. **Layer-2 blocking threshold** — committed: block only on distinguishable regression;
   overlap = publish + `underpowered` audit flag.

<!-- END · cwf-L2-prompt-gov-design-v1 · rev 1 · 2026-07-10 -->
