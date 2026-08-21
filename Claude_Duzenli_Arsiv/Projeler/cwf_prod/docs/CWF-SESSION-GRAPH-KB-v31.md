# CWF — Session Graph KB · v31

<!-- CWF-SESSION-GRAPH-KB-v31 · rev 31 · 2026-07-10 · Supersedes v30.
     This window: Session 31 — TRUST-PANEL-1 flip verify + PHASE L2 PROMPT-GOV end-to-end. -->

## §1 Session 31 summary

Opened at floor `3eb887b` (v30); found the TRUST-PANEL-1 DOC-FLIP not yet merged → handed the
standing flip prompt to AG → verified merge `628b3b6` (docs-only, residuals justified). Then
the session's main arc: **L2 PROMPT-GOV** shipped end-to-end in ONE session — design note v1
(owner-approved same-turn) → gated phase prompt → AG build merged `fcaa4aa` (RULE-25 PASS,
+112 tests/+9 files, rev 58) → Operator script-seed applied & live-verified (incident-free)
→ DOC-FLIP merged `171ee43` (tree-checked). Program spine now: L1 ✅ Q ✅ TRUST-PANEL-1 ✅
**L2 ✅**.

## §2 L2 decisions (owner-ratified via design-note §10 defaults)

- **Granularity:** 20 enum-locked segments (`identity` · 6 safety sections · `tone` · `viz` ·
  `tools.header` · `tools.rule.1..10`) — audit reads "rule 8 edited"; one-rule-sized diffs.
- **Placeholder discipline:** rule 10 stored with `{{AGGREGATE_TOOL}}`/`{{QUERY_TOOL}}`;
  per-segment whitelist enforced in the Zod `.refine` (unknown placeholder =
  `failedStage:'schema'`, the L1 precedent). Literal tool names in DB = the refused drift trap.
- **Polarity LAW — METRIC_ALIASES:** detector vocabulary is deterministic CODE (RULE 5),
  single-sourced in `shared/metricVocab.ts` (byte-identical hoist; groundingCheck +
  toolCategories both import). Explicitly NOT a governed row; a glossary edit can never
  mutate detector vocab. Prompt text is the inverse polarity: fully governed, drafts welcome.
- **PROMPT_CORE_REV re-scope:** the constant stays as the FLOOR hash (CI recipe test intact);
  the fingerprint `promptRev` axis now reads `ctx.promptRev` = use-time sha256 over the
  ORDERED resolved segment texts (knowledgeCapture torn-attestation pattern; a draft turn IS
  a visibly different revision). `configFingerprint.ts` touch = ONE disclosed line.
- **Gate design:** Layer 1 deterministic structural (compose success · viz macro-token pin ·
  rules 1–10 order pin · safety tag-structure pin · length ceiling) as the ONE sanctioned
  kind-aware evalGate arm; Layer 2 = golden-20 paired replay behind the publish endpoint
  (`goldenRunId` contract: completed + candidate content-hash match + ≤24h + non-regressing;
  quota-metered).
- **Verdict honesty (Part-A discipline, verbatim):** block ONLY on distinguishable regression;
  overlapping CIs = `underpowered:true` audited, publish proceeds. Never render overlap as
  "safe".
- **goldenSet:absent posture:** golden set empty ⇒ Layer 2 LOUD skip (audit note), Layer 1
  alone gates; ≥1 golden specimen ⇒ Layer 2 mandatory. No chicken-egg deadlock, no silent
  skip. Standing production posture until GOLDEN-MARK-1.
- **PROMPT-GOV LIVE semantics:** seed text = floor verbatim ⇒ prod behavior AND promptRev
  byte-identical at cutover; the delta is the governance surface being real (edit + publish
  now changes the live prompt).

## §3 Verified state deltas

| Commit | What | Floor |
|---|---|---|
| `628b3b6` | TRUST-PANEL-1 DOC-FLIP (docs-only) | 1561 / 156 / rev 57 |
| `fcaa4aa` | PHASE L2 build (+112 / +9) | 1673 / 165 / rev 58 |
| `171ee43` | L2 DOC-FLIP (docs-only) | **1673 / 165 / rev 58 — floor at close** |

DB deltas (live-verified): `rule_kinds` +1 (`prompt.segment`, system/core/locked) ·
`domain_rules` +20 published v1 `prompt.segment` rows (rule-10 in placeholder form,
G4-verified) · idempotence proven live (second seed run 0/20-already). No new tables, no new
SQL functions (probe registry stays 36/36, zero exemptions). Vercel prod READY at `fcaa4aa`
then `171ee43` (docs-only redeploy).

## §4 Process notes (Architect-owned)

- **The spec's own STOP contingency fired and HELD:** golden marking needed DDL; AG stopped,
  authored no migration, refused the `raw_tool_results` marker hack (C1 — conversation truth
  is immutable). The anti-"make it succeed" training is sticking; GOLDEN-MARK-1 is the
  honest product of a correct stop.
- **Frozen-file conflict resolution pattern:** "extend the existing Part-A endpoint" vs
  frozen `api/admin/replay.ts` → AG built `api/admin/prompt-golden.ts` on the exported
  machinery, frozen file byte-untouched. When a spec sentence and a freeze collide, the
  freeze wins and the capability moves to a new file — record as precedent.
- **Positional-compat deviation class:** "third resolved-input" landed as the 4th parameter
  to avoid breaking positional lab call sites — benign, disclosed, accepted. Spec wording
  should say "an additional resolved-input" not an ordinal next time.
- **Operator benign-deviation class:** `--env-file=.env.local` added to the seed invocation
  (env mechanics, not a mutation) — recorded honestly, no fence issue.
- **Deploy verification is now Architect-automated:** Vercel MCP `list_deployments`
  (state READY + target production + githubCommitSha match) confirmed `fcaa4aa` live with
  zero manual asks — the automation-first standing rule in action.

## §5 Standing addition

- **S31-1 — Script seeds get the migration treatment:** every Operator-run script seed ships
  with its own FENCE-first Operator prompt containing literal-read gates (G-numbered) AND a
  MANDATORY second-run idempotence probe (counts + versions unchanged = never-clobber proven
  live, not assumed). The L2 seed prompt is the template.

<!-- END · CWF-SESSION-GRAPH-KB-v31 · rev 31 · 2026-07-10 -->
