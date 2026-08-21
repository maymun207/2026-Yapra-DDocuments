# CWF — Open Items Register · v31

<!-- cwf-open-items-register-v31 · rev 31 · 2026-07-10 · Supersedes v30.
     Verified floor at close: origin/master 171ee43 = 1673 tests / 165 files /
     docVersion rev 58 / drift [OK]. -->

## 1 · LIVE QUEUE (committed order)

**Q-NEXT — OBS-ENDPOINT-1** (carried from v30 "after L2 unless pulled" — its turn is NOW).
Diagnosis-first next session; scope per its v30 entry.

**Q-L3-OPEN — GOLDEN-MARK-1** (NEW, the L3 EVAL-CI opener; born from the L2 §2.7 STOP
contingency firing correctly): the `messages`/recordedTurn store has NO metadata/flag column,
so specimen golden-marking needs an Operator-applied forward migration (additive nullable
marking column or a minimal side table — design note decides), then wire
`listGoldenSpecimens()` (currently returns `[]` by design, `goldenRun.ts:44` — the C1
rationale is in its docblock), then the owner curates ~20 golden specimens, at which point the
L2 golden gate flips from its loud `goldenSet:absent` skip to MANDATORY Layer 2. Two-door +
verifyGrants posture review in-phase if a new table is chosen.

**Q-L3 — EVAL-CI** (after GOLDEN-MARK-1): thresholds in CI, N-rep batches on the L2 golden
seam. Then **L4 ROUTING-DRAFTS** → **L5 PROGRESSIVE**.

**GOVERN polish** — KindsTab scroll defect (reproduce headlessly per RULE 26 FIRST).
**P7** — Superset empty≠zero 3rd (runtime) layer, no fragile regex.

## 2 · MICRO-TD (attach to a legit open, don't open for them)

- `api/admin/replay.ts:332-338` inline authorityDiff → fold into `shared/authorityDiff`
  (file was FROZEN through L2 — still standing).
- Chat-quota prod smoke: one owner turn + Architect reads Vercel logs (no degraded line,
  ledger row born). An L2 prompt smoke can ride the same turn (promptRev present in the
  fingerprint, no `cwf.prompt.degraded`).
- Audit-drawer past-relative time polish.

## 3 · OWNER-OWNED (surface only if raised)

Dark-palette sign-off · token rotation on real 401 · quota floor revisit ·
golden-specimen curation (~20, unblocks Layer 2 — becomes actionable AFTER GOLDEN-MARK-1).

## 4 · DEFERRED (do NOT build unprompted)

Docusaurus · CI-apply · HARDEN-GRANTS-1 (pg_default_acl class fix — noted three sessions
running, still deferred) · AWS-DENY-1 · Langfuse SSO · governed connectors · backends
enabled/tier/row-CRUD UI · family temperature clamp · client history sender ·
taskFn/pairedReplay parity · prompt A/B in production (L5) · per-user prompt variants ·
any sanitizer on governed text · `time`-module or assembly-order governance ·
METRIC_ALIASES as a governed row (polarity LAW — `shared/metricVocab.ts` docblock).

## 5 · CLOSED THIS SESSION (do NOT re-raise)

- **TRUST-PANEL-1 DOC-FLIP** — merged `628b3b6`, tree-checked (docs-only 2 files, residual
  quotes justified, no reseal). TRUST-PANEL-1 fully closed end-to-end.
- **PHASE L2 PROMPT-GOV end-to-end**:
  - Design note v1 owner-approved (20-segment granularity · viz governed-with-macro-pin ·
    absent-set loud-skip bootstrap · block-only-distinguishable-regression — all four §10
    defaults ratified).
  - Build merged `fcaa4aa` (1561→1673 / 156→165, rev 57→58): 20 enum-locked
    `prompt.segment` CORE rows on the system lane · `resolvePromptSegments` draft>db>floor ·
    `promptFloor.ts` ONE home · kind-aware evalGate Layer-1 runner (ONE sanctioned arm) ·
    L3-lite golden contract (`prompt-golden.ts`, frozen `replay.ts` byte-untouched) ·
    promptRev use-time flip (`configFingerprint.ts` ONE disclosed line) ·
    `shared/metricVocab.ts` SSOT hoist (byte-identical, NOT governed) · RulesTab prompt
    family lens. RULE-25 independent recount PASS; 6/6 deviations disclosed and accepted
    (incl. the golden-marking STOP contingency firing CORRECTLY — no DDL authored, no C1
    hack).
  - Seed applied & live-verified 2026-07-10 (Operator door, script seed, no migration):
    20 inserted → G1–G5 all pass (rule-10 PLACEHOLDER form verified) → idempotence probe
    second run 0/20-already, never-clobber proven live. Incident-free. One benign deviation
    (`--env-file` invocation). Deploy auto-verified via Vercel MCP (`fcaa4aa` READY prod).
  - DOC-FLIP merged `171ee43`, tree-checked. **PROMPT-GOV is LIVE** — byte-identical to the
    floor until the first governed edit; promptRev unchanged by construction.
- All prior closes per v30 §CLOSED stand (Q-1 chain, TRUST-PANEL-1, L1, …).

<!-- END · cwf-open-items-register-v31 · rev 31 · 2026-07-10 -->
