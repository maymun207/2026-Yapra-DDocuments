# claude-code · PHASE L2 — PROMPT-GOV (governed prompt-core segments + golden-20 publish gate) · v1

<!-- claude-code-PHASE-L2-prompt-gov-v1 · rev 1 · 2026-07-10 · AG-lane artifact.
     Design authority: cwf-L2-prompt-gov-design-v1.md (owner-approved 2026-07-10).
     Anchor: origin/master 628b3b6. -->

## §0 Pre-flight (HARD — any failure = STOP, report, do nothing)

1. `git fetch && git rev-parse origin/master` → `628b3b6690c1d256bf8f1c04b733340720458c30`
   (moved → STOP). Clean tree. Branch `feat/l2-prompt-gov` off the pin.
2. Baseline: `npx vitest run --reporter=dot` → **1561 passed / 156 files**; `check:doc-drift`
   `[OK]`; `typecheck:api` + `tsc -b` + `vite build` clean; oxlint warning count recorded
   (baseline 25 — zero new allowed).
3. **Anchor greps (definition sites — S30-3; mismatch = STOP + report, do not improvise):**
   - `api/cwf/_lib/prompt/assemble.ts:63` exports `buildSystemPrompt(ctx, activeBackends, lab?)`.
   - `core/identity.ts` exports `identity()`; `core/safety.ts` exports `safety()`;
     `core/outputFormat.ts` exports `outputFormat()` interpolating `VIZ_MACRO_INSTRUCTIONS`
     from `shared/cwfConstants.ts`.
   - `core/toolProtocol.ts` defines local consts `RULE_1..RULE_6, RULE_9` and composes rules
     7/8/10 from **`core/grounding.ts`** exports `GROUNDING_RULE_DATA_FIDELITY` /
     `GROUNDING_RULE_RECORD_COUNT` / `GROUNDING_RULE_LARGE_RESULT` (⚠️ their DEFINITION SITE is
     grounding.ts, NOT toolProtocol.ts; rule 10 interpolates `AGGREGATE_TOOL_NAME` /
     `QUERY_TOOL_NAME` from `../../resultStore.js`).
   - `core/promptRev.ts` exports `PROMPT_CORE_REV` (sha256, CI-pinned by `promptRev.test.ts`;
     re-stamp recipe in that test's header).
   - `grounding/groundingCheck.ts:~280` defines `const METRIC_ALIASES: Record<MetricId, string[]>`;
     `toolCategories.ts:~163` contains the duplicate synonym list (`'fire', 'scrap', 'ıskarta'`).
   - `knowledge/reference/kinds.ts` exports `SYSTEM_KIND_IDS` (`AGENT_PARAM: 'agent.param'`)
     and `KIND_REGISTRY`; `knowledge/seedAgentParamsCore.ts` is the system-lane seed precedent.
   - `knowledge/gate/evalGate.ts:~188` has `const isSystem = kind.backendId === 'system'` with
     referential/behavioral pass-through arms.
   - `turn/stagesModel.ts:~90` is the ONE `buildSystemPrompt` call site (stage 8), with the
     GOV-4 `labKnowledge` seam above it and `resolveAgentParams` (`SPAN_WARM_PARAMS`) below it.
   - `replay/pairedReplay.ts` exports `wilsonInterval` / `computePairedDelta` / `runPairedReplay`.

## §1 Constraints (LAW)

- **Frozen paths — diff vs `628b3b6` MUST be empty at self-verify:** `evalGate.ts` engine /
  `GATE_STAGES` order / stage interpreter (the ONLY sanctioned touch is the kind-aware dispatch
  in §2.6, additive, exactly like L1's `isSystem` arm) · `groundingCheck.ts` LOGIC (the ONLY
  sanctioned touch is the §2.1 vocab import swap — every function body byte-identical) ·
  `api/admin/replay.ts` · `trustRegistry.ts` · `prompt/backends/**` (packs) ·
  `core/time.ts` · `injectionBoundary.test.ts` · `promptSnapshot.test.ts` (both stay
  UNCHANGED **and passing** — they are the floor byte-identity and boundary proofs).
- **Injection boundary (ADR-001):** `buildSystemPrompt` NEVER receives tool descriptions or
  tool results. Governed segment text reaches the system role ONLY via the gated publish path.
- **NO SQL migration in this phase.** The kind row + published rows are script-seeded data
  (§2.10) — AUTHORED, Operator-pending (two-door). The seed script contains no grants, no DDL.
- **Secrets:** none touched, none printed. RULE 24: all sources text/UTF-8, no NUL.
- **RULE 1:** no hardcoded config; segment ids/whitelists are exported constants.
- Squash banned; merge `--no-ff` with the §3 verbatim message (S30-2).
- Deviations: any anchor/constraint conflict → STOP mid-sub-phase, report; never
  "make it succeed" around a frozen path.

## §2 Gated sub-phases (in order; each gate = its listed evidence)

### §2.1 `shared/metricVocab.ts` — detector-vocab SSOT hoist (code-only, byte-identical)
Create `shared/metricVocab.ts` exporting the metric-alias table currently inline at
`groundingCheck.ts:~280` (keyed off `METRIC_IDS`) plus the routing synonym subset used at
`toolCategories.ts:~163`. Docblock states the polarity LAW: *detector vocabulary is
deterministic CODE (RULE 5); a governed glossary edit must never mutate it; this module is
explicitly NOT a governed row.* Both importers swap to it; **resulting tables byte-identical**
(new test asserts deep-equality of the imported tables against the verbatim previous literals,
and that `groundingCheck`'s exported behavior on a fixture query set is unchanged).
**Gate:** vocab tests green; `git diff 628b3b6 -- api/cwf/_lib/grounding/groundingCheck.ts`
shows import + table-reference lines ONLY.

### §2.2 Kind: `prompt.segment` (CORE, system lane)
- `SYSTEM_KIND_IDS.PROMPT_SEGMENT = 'prompt.segment'` in `kinds.ts`; `KIND_REGISTRY` row
  (`backendId: 'system'`, CORE, locked, `codeSchemaRef: CORE_SCHEMA_REFS.PROMPT_SEGMENT`,
  display mirror).
- `PromptSegmentSchema` in `coreSchemas.ts`:
  `{ segmentId: z.enum(SEGMENT_IDS), text: z.string().min(1).max(SEG_MAX), placeholders?: string[] }`
  with `.refine`s: (a) declared placeholders ⊆ `PLACEHOLDER_WHITELIST[segmentId]`; (b) every
  `{{TOKEN}}` occurring in `text` is whitelisted for that segment (violation ⇒ the schema
  stage fails — `failedStage:'schema'`, the L1 precedent).
- `SEGMENT_IDS` (exported const, exactly these 20):
  `identity` · `safety.core_directives` · `safety.b1_scope` · `safety.b2_leakage` ·
  `safety.b3_pii` · `safety.b4_jailbreak` · `safety.b5_tool_injection` · `tone` · `viz` ·
  `tools.header` · `tools.rule.1` … `tools.rule.10`.
- `PLACEHOLDER_WHITELIST`: only `tools.rule.10` → `['AGGREGATE_TOOL','QUERY_TOOL']`; all
  others `[]`.
**Gate:** schema tests incl. unknown-placeholder rejection + non-whitelisted-segment
placeholder rejection (negative fixtures).

### §2.3 Floor registry — ONE home for the verbatim texts
Create `prompt/core/promptFloor.ts`: `PROMPT_FLOOR: Record<SegmentId, string>` holding the
CURRENT verbatim literals, extracted from `identity.ts` / `safety.ts` (split at its §
boundaries) / `outputFormat.ts` (`tone` = the `<tone_and_style>` block; `viz` =
`VIZ_MACRO_INSTRUCTIONS` **by reference** — the floor entry interpolates the shared constant,
never copies it) / `toolProtocol.ts` (`tools.header` + rules 1–6, 9) / `grounding.ts` (rules
7, 8, 10 — **grounding.ts remains their definition site**; the floor imports the exported
constants; rule 10's floor text carries `{{AGGREGATE_TOOL}}`/`{{QUERY_TOOL}}` placeholders and
the compose layer substitutes from `resultStore.ts` constants). The existing module functions
(`identity()`, `safety()`, `outputFormat()`, `toolProtocol()`) become thin composers over the
segment map they receive (floor by default) — rendered output BYTE-IDENTICAL to today.
Re-stamp `PROMPT_CORE_REV` per the `promptRev.test.ts` recipe (the directory content changed;
the constant is now the FLOOR hash — update the docblock to say exactly that).
**Gate:** `promptSnapshot.test.ts` passes UNCHANGED; `promptRev.test.ts` passes with the
re-stamped constant; a new placeholder-substitution test proves rule 10 renders today's exact
text from the placeholder form.

### §2.4 Reader: `resolvePromptSegments()` + stage wiring
`knowledge/resolvePromptSegments.ts` mirroring `resolveAgentParams.ts`: dedicated small read
(the warm never covers `system`), ONE pure chain per segment **session-draft preview >
DB-published > `PROMPT_FLOOR`**, no env tier, no module cache; outage/error → floor (chat
never goes down for prompt-gov; log + span attr `cwf.prompt.degraded` on fallback — mirror the
quota-degraded attr style, observers only). Drafts ride `kind_drafts` +
`resolveKindWithDrafts` (CORE wins on structure; draft VALUES are the preview — the
KIND-DRAFT-1 machinery as-is), keyed `prompt.segment:<segmentId>`, honored ONLY when
`ctx.labActive` (lab-only; prompt-cache economics noted in the docblock). Wire in
`stagesModel.ts` stage 8: resolve (spanned, `SPAN_WARM_PROMPT` new constant in
`observability/config.ts`) → pass the resolved segment map into `buildSystemPrompt` (new third
resolved-input replacing the internal floor default; `LabKnowledge` pack seam untouched).
Capture `(segmentId:version|draft|floor)` rows on `ctx.promptCapture` — use-time, the
`knowledgeCapture` torn-attestation pattern.
**Gate:** chain tests (draft>db>floor; outage→floor; lab-only draft honoring);
compose-with-DB-values test; `promptSnapshot.test.ts` STILL unchanged-passing (no published
rows in tests ⇒ floor ⇒ byte-identity).

### §2.5 evalGate — kind-aware Layer-1 behavioral runner (the ONE sanctioned gate touch)
At the `isSystem` dispatch (`evalGate.ts:~188`): `agent.param` keeps its pass-through arms
byte-identically; `kind.kindId === 'prompt.segment'` routes behavioral to a NEW
`stageBehavioralPromptSegment(candidate)` (new file under `gate/`), which deterministically:
(1) full-composes the candidate segment set (all placeholders resolve; assembler renders);
(2) `viz`: macro tokens present verbatim (sourced from the shared constants, not string
literals); (3) any `tools.rule.N` change: rendered ÖNEMLİ KURALLAR still lists 1–10 in order;
(4) `safety.*`: composed safety block still opens `<core_directives>` and closes
`</strict_boundaries>`; (5) `text.length ≤ SEG_MAX`. Referential stays pass-through (no
cross-rule surface). `GATE_STAGES`, engine loop, interpreter: byte-identical.
**Gate:** runner tests incl. one NEGATIVE fixture per check (macro token removed; rule list
broken; tag structure broken); `evalGate.test.ts` existing assertions untouched-passing.

### §2.6 promptRev flip (fingerprint axis)
`ctx.promptRev = sha256` over the ORDERED resolved segment texts composed this turn (computed
in §2.4's resolver from the capture — never a re-read). The config-fingerprint's `promptRev`
axis reads this capture instead of the `PROMPT_CORE_REV` constant. `configFingerprint.ts` is
frozen: land the change in the capture producer; if a one-line input swap inside
`configFingerprint.ts` is structurally unavoidable, it is the ONE disclosed touch (report the
exact line). Floor-only turns: the computed hash is stable and test-pinned; a draft turn hashes
differently (correct — a lab turn IS a different prompt).
**Gate:** fingerprint tests: floor-turn stable hash; published-row turn changes it; mid-turn
publish cannot tear the capture (the L1 torn-attestation test pattern).

### §2.7 L3-lite golden-20 publish gate (Layer 2)
- Golden marking: specimens gain a `golden` boolean (data path of the existing `recordedTurn`
  store; if the store's shape cannot carry it without DDL, STOP and report — do NOT author a
  migration in this phase).
- Publish contract for `prompt.segment` (server-side, in the existing gated publish endpoint):
  request carries `goldenRunId`; the server loads the persisted paired-replay run and verifies
  ALL deterministically: run completed · run's candidate content-hash === sha256 of the draft
  segment set being published · run age ≤ 24h · verdict non-regressing. Verdict rule (Wilson-CI
  honesty, Part-A discipline): **block ONLY on a distinguishable regression** (candidate
  empty/violation-rate CI strictly worse than baseline); overlapping CIs ⇒ publish proceeds
  with `underpowered:true` recorded in `rule_audit`. Golden set EMPTY ⇒ Layer 2 skipped with a
  loud `goldenSet:absent` audit note (never silent). Non-`prompt.segment` kinds: publish path
  byte-identical.
- The golden run itself: a `golden` mode on the existing Part-A endpoint — specimens = all
  `golden:true`, reps ≥ 3 (clamped by `clampReps`), baseline = published segments, candidate =
  the draft set, scorers unchanged (deterministic), token spend through REPLAY-QUOTA-1
  unchanged. If run persistence lacks a queryable verdict record, add the MINIMAL additive
  record in the existing persistence surface — disclose the shape.
**Gate:** publish-contract tests (regression blocks · overlap publishes flagged · absent set
skips loudly · stale/mismatched-hash run rejected · other kinds untouched); quota-path test
proves golden runs meter through the existing reserve/settle.

### §2.8 Admin family lens (HC-2, polarity NORMAL)
RulesTab family filter gains the prompt family (`system` / `prompt.segment` rows): list,
edit-draft (session preview — the existing KIND-DRAFT-1 flow), per-segment
reset-to-reference (floor text), super-admin publish wired to §2.7's contract (the UI runs the
golden batch, then publishes with the `goldenRunId`; absent set → the skip path with its
audit-note copy visible). Bilingual (TR/EN); both legibility gates auto-enroll; no new panel.
**Gate:** panel tests (family listing · draft round-trip · reset · publish-with-run flow ·
absent-set copy); `adminLegibility` + `chatLegibility` green; RULE 26 — no clipping at
1280/1024, rendered evidence.

### §2.9 Seed script (AUTHORED, Operator-pending — two-door)
`scripts/seedPromptSegments.ts` mirroring `seedAgentParamsCore.ts` + `seedRules.ts`:
idempotent, never-clobber (existing published rows are NEVER overwritten); upserts the
`rule_kinds` row from `KIND_REGISTRY`; publishes the 20 v1 rows whose text = `PROMPT_FLOOR`
verbatim (rule 10 in placeholder form). VITEST/JEST runtime guard per the standing
`verifyGrants` invocation lesson. No grants, no DDL, no secrets.
**Gate:** seed dry-logic tests (idempotence; never-clobber; count = SEGMENT_IDS length,
decl-derived, no hand literal).

### §2.10 Docs + reseal
CHANGELOG entry (this phase, incl. the §2.7 contract and the two-door status *"seed authored,
Operator-pending"* — never pre-declared applied) · SKILL.md KB section · drifted narrative
tabs note-appended (below-altitude) · docVersion **rev 57 → rev 58** · drift `[OK]`.
Two-commit seal.

## §3 Self-verify (evidence gates — literal, paste everything)

1. Full suite: total **> 1561**, **zero failures**; paste the exact `N passed / M files`.
2. `promptSnapshot.test.ts` and `injectionBoundary.test.ts`: `git diff 628b3b6 --` on both =
   EMPTY, and both listed passing in the run output (paste the two lines).
3. Frozen-path proof: `git diff 628b3b6 --` each §1 path — paste per-path (groundingCheck =
   import/table-reference lines only; evalGate = the dispatch arm only; configFingerprint =
   empty or the ONE disclosed line).
4. Byte-identity: the floor-compose snapshot test + the rule-10 placeholder-render test named
   and passing.
5. Negative fixtures listed by name: unknown-placeholder · macro-token-removed ·
   rule-order-broken · tag-structure-broken · regression-blocks · stale-run-rejected.
6. `PROMPT_CORE_REV` re-stamped; `promptRev.test.ts` passing; docblock updated to FLOOR-hash
   wording (paste the new docblock).
7. oxlint = baseline (zero new) · `typecheck:api` + `tsc -b` + `vite build` clean ·
   `check:doc-drift [OK]` · docVersion literal `rev 58`.
8. RULE 26 rendered evidence for §2.8 at 1280 and 1024.
9. ONE branch, two-commit seal, then merge `--no-ff` with this EXACT message:
   `Merge feat/l2-prompt-gov: PHASE L2 — PROMPT-GOV (prompt-core text becomes governed CORE prompt.segment rows on the system lane [20 enum-locked segments, DB-first/code-floor via resolvePromptSegments draft>db>floor, outage=byte-identical floor, promptSnapshot+injectionBoundary untouched-passing] + kind-aware evalGate Layer-1 behavioral runner [macro-token/rule-order/tag-structure pins; agent.param arms byte-identical] + L3-lite golden-20 publish gate [paired-replay goldenRunId contract, content-hash+freshness verified, blocks ONLY distinguishable regression, overlap=underpowered:true audited, absent set=loud skip; quota-metered] + promptRev fingerprint axis flipped to use-time resolved-segment hash [PROMPT_CORE_REV re-scoped as the floor hash] + shared/metricVocab.ts detector-vocab SSOT hoist [byte-identical, NOT governed] + RulesTab prompt family lens [drafts/reset/publish-with-run, HC-2]; seedPromptSegments AUTHORED Operator-pending [two-door]; rev 58 reseal)`
   → push master → report merge sha + `git rev-parse origin/master`.
10. Report every deviation with its §-reference; undisclosed deviations = failed phase.

<!-- END · claude-code-PHASE-L2-prompt-gov-v1 · rev 1 · 2026-07-10 -->
