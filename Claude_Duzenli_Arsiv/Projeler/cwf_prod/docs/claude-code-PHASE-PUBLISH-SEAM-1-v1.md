# claude-code-PHASE-PUBLISH-SEAM-1-v1.md

<!-- v1 · 2026-07-15 · Architect-authored · branch: publish-seam-1 · profile: FULL
     (eval/publish machinery — never lightened). Anchor: master 90cc884.
     WHY (PLATINUM queue-jump): governed prompt/knowledge publishes currently have
     NO machine seam — admin endpoints demand a browser session (authed()), the
     seed scripts are floor-only never-clobber, and pasting a bearer into chat is
     an ADR-007 violation. EXEC-GOLDEN-BATCH-S45 stopped correctly on this gap.
     The fix follows the EXISTING sanctioned pattern verbatim:
     scripts/reconcileToolGovernance.ts — local-env service credentials driving
     the SAME gated service functions in-process. PLATINUM statement: after this
     phase, a batched governed publish is one machine-run command; the owner's
     only touchpoints are the spend Consent (an explicit flag granted after a
     reported dry-run) and live probes. -->

## 0 · PRE-FLIGHT GATE (hard)
- `git rev-parse origin/master` == `90cc8842c594848e24f3e8d8b0b6de6c3309e18c`. STOP if not.
- Branch `publish-seam-1`. `npm ci` clean. Drift gate green.
- Anchors to read FIRST (the pattern to follow, not reinvent):
  `scripts/reconcileToolGovernance.ts` (env-config gated-service script shape),
  `api/admin/prompt-golden.ts` (draft-set semantics: `keys[]`, caller-owned
  drafts via PROMPT_DRAFT_KEY_PREFIX, quota reserve/settle C4, ONE replay_audit
  row contract), `api/cwf/_lib/replay/goldenRun.ts` + `goldenSpecimens.ts`,
  `resolvePromptSegments.ts`, the gated rules service used by
  reconcileToolGovernance, `scripts/seedPromptSegments.ts` (never-clobber note).
- **Discovery gate (report before building):** exact exported function names for
  (a) draft create/update for prompt.segment content under a given user id,
  (b) golden batch invocation + verdict shape, (c) the publish call the L2
  endpoint uses post-verdict, (d) the gated rule-instance draft/publish service
  functions, (e) the quota reserve/settle pair the golden endpoint uses.

## 1 · HARD CONSTRAINTS
- **The gate is the ONLY door:** every write rides the same eval-gated audited
  service functions the endpoints use — ZERO raw table writes, ZERO gate-bypass
  shortcuts, staging ENGINE + STAGE ORDER byte-identical (eval-gate-unbypassable
  law).
- **Identity honest (S33-1 + C4):** the script acts FOR the owner: it resolves
  the owner's user id from an `--as <email>` arg (an email is not a secret) and
  (i) writes drafts owned by that id — so the candidate set forms EXACTLY as the
  endpoint would form it — and (ii) reserves/settles the golden spend against
  that user's replay quota with the SAME reserve functions (a denial = loud
  exit, no run). Machine actorship recorded in the audit jsonb where the
  service supports it.
- **Consent is a flag, never a default:** the golden run refuses to start
  without `--consent-tokens <n>`; the script FIRST prints a dry-run plan
  (drafts to write, segment keys, golden-set size, reps, estimated budget,
  ceiling clamp from quota.goldenRunTokenCeiling) and exits; only a second
  invocation carrying the flag spends. ADR-007: env values never printed.
- **Idempotent (S31-1):** re-run = converge, never duplicate drafts/rows; a
  second-run no-op probe is part of self-verify.
- **Born-loud (S41-1):** every draft write, gate verdict, publish, and rejection
  prints an audit-lined log; a rejection exits non-zero with the gate reason.
- Scope: `scripts/**`, `.agents/**`, tests in `api/cwf/__tests__/` (vitest
  include covers there, NOT scripts/**). NO api/** endpoint changes, NO
  shared/**, NO migrations. Merges `--no-ff`. Reseal if drift-mapped docs move.

## 2 · GATED SUB-PHASES
### P.A — `scripts/publishGovernedContent.ts`
Subcommands (one file, reconcileToolGovernance style):
- `plan` — read a JSON job file (path arg) describing: prompt-segment bodies
  (segmentId → full text) and/or governed rule-instance payloads (kindId +
  instance content). Print the dry-run plan. No writes.
- `stage` — upsert the drafts (owner-owned, idempotent). Print draft ids.
- `golden --consent-tokens <n>` — trigger ONE golden batch over the staged
  prompt-segment draft set (keys = the job's segment ids), quota-reserved,
  verdict printed verbatim (green / underpowered / red — NEVER auto-decide
  underpowered: exit distinctly so the Architect/owner rule on it).
- `publish` — post-verdict: publish the prompt segments through the L2 gate
  path AND the rule instances through the eval-gated rule service (rule rows
  need no golden run — ordinary gate). Print each publish's audit line + rev.
- Job files are ARTIFACT inputs (the Architect authors them) — the script never
  embeds content.
### P.B — ADR-006 amendment (doc)
Commit the S43-4 amendment into `.agents/AGENTS.md` ADR-006 wording: "AG may
execute gated-service scripts on standing owner consent; raw DB access remains
Operator/Supabase-MCP-only; secrets are never read aloud or printed by any
agent." Reference this script class explicitly.
### P.C — Tests + seal
Tests in `api/cwf/__tests__/publishGovernedContent.test.ts`: plan is read-only;
stage idempotence (second run no-op); consent-flag refusal path; quota-denial
loud-exit; rejection non-zero + reason; identity resolution. Reseal if needed;
CHANGELOG + KB. PR; unsharded CI green = merge gate.

## 3 · SELF-VERIFY (evidence, literal)
1. Dry-run `plan` output for a fixture job (shown in report), zero writes proven.
2. `stage` twice → second run reports 0 new drafts.
3. `golden` without consent flag → refusal, no reserve (test evidence).
4. Gate-rejection fixture → non-zero exit + reason line (S41-1).
5. `git diff --stat master.. -- api shared supabase` EMPTY (scripts/.agents/tests only).
6. Report: files, test delta, PR link. No merge before CI green.

## 4 · MERGE MESSAGE (verbatim on GO)
Merge PUBLISH-SEAM-1 — headless gated publish seam (reconcile-pattern): staged drafts, consented golden batch, born-loud publishes + ADR-006 S43-4 amendment committed

<!-- END · claude-code-PHASE-PUBLISH-SEAM-1-v1 · rev 1 · 2026-07-15 -->
