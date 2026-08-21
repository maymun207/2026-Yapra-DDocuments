# CWF — Open Items Register · v33

<!-- cwf-open-items-register-v33 · rev 33 · 2026-07-10 · Supersedes v32.
     Verified floor at close: origin/master d87fedd = 1779 tests / 170 files /
     docVersion rev 61 / drift [OK]. -->

## 1 · LIVE QUEUE (committed order)

**Q-NEXT — L4 ROUTING-DRAFTS**: `tool_category_cache` draft store; the routing lens
honest @preview. Diagnosis-first design note at CURRENT HEAD. Then **Q-L5 — PROGRESSIVE
DELIVERY** (the actuator L3 deliberately did NOT build — a red canary is a SIGNAL; acting
on it, halt/rollback/progressive promotion, is L5's charter).

**GOVERN polish** — KindsTab scroll defect (reproduce headlessly per RULE 26 FIRST).
**P7** — Superset empty≠zero 3rd (runtime) layer, no fragile regex.

## 2 · MICRO-TD (attach to a legit open, don't open for them)

- **`'canary'` literal cross-pin (NEW):** `ReplayAuditRepository`'s private
  `CANARY_MESSAGE_ID` mirror const ↔ `eval-ci.ts`'s `CANARY_AUDIT_MESSAGE_ID` (the RULE-1
  home) — no test currently cross-pins the mirror against the export, so a drift could
  ship silently. Fold a cross-assertion on the next legit open of either file
  (persistence can't import the endpoint module — that's WHY the mirror exists; the pin
  is the guard). Same class as the L2/GOLDEN-MARK-1 mirror-const precedent.
- `api/admin/replay.ts:332-338` inline authorityDiff → fold into `shared/authorityDiff`
  (file stayed FROZEN through OBS-ENDPOINT-1, GOLDEN-MARK-1 AND L3 — still standing).
- Chat-quota prod smoke (one owner turn; the L2 prompt smoke rides the same turn —
  fingerprint promptRev present, no `cwf.prompt.degraded` line).
- **Golden prod smoke:** rides the owner's FIRST mark (Architect reads Vercel prod logs:
  mark 200, no 503, table row born) + confirms the next prompt.segment publish takes the
  Layer-2 MANDATORY arm, not the absent skip.
- **L3 canary live-firing confirm (NEW, Architect-owned, no owner action):** the FIRST
  master push after L3 (i.e. the L4 merge) is the eval-canary job's first real firing.
  The Architect reads GitHub Actions + the Vercel deploy to confirm: (a) the job actually
  RAN (not "skipped" — GitHub secret seen), (b) the endpoint returned 200 not 503 (Vercel
  env seen), (c) `goldenSet:absent` green-loud arm (set still empty). Timing-safe compare
  passing ⇒ both secret copies are consistent. (This session could not curl the prod host
  — egress allowlist — nor read Actions — GH API rate-limit; hence bound to the next push.)
- Audit-drawer past-relative time polish.

## 3 · OWNER-OWNED (surface only if raised)

**Golden-specimen curation — ACTIONABLE** (~20 specimens via the ReplayTab mark
affordance; the FIRST mark simultaneously flips L2 Layer-2 to MANDATORY AND establishes
the L3 canary's first baseline epoch) · **`EVAL_CI_TRIGGER_SECRET` — DONE** (set in both
GitHub repo secrets and Vercel Production env, redeploy done; behavioral confirm bound to
the next master push, above) · dark-palette sign-off · token rotation on real 401 · quota
floor revisit.

## 4 · DEFERRED (do NOT build unprompted)

**Langfuse-host governed SELECTION** (ADR-007 trigger: a SECOND production host). ·
Docusaurus · CI-apply · HARDEN-GRANTS-1 (pg_default_acl class fix — noted FIVE sessions
running, still deferred) · AWS-DENY-1 · Langfuse SSO · governed connectors · backends
enabled/tier/row-CRUD UI · family temperature clamp · client history sender ·
taskFn/pairedReplay parity · prompt A/B in production (L5) · per-user prompt variants ·
any sanitizer on governed text · time-module/assembly-order governance · METRIC_ALIASES
as a governed row (polarity LAW).

## 5 · CLOSED THIS SESSION (do NOT re-raise)

- **L3 EVAL-CI CANARY end-to-end** — design v1 (post-deploy single-arm longitudinal
  canary; owner-ratified) → gated prompt → AG build merged with a RULE-25 PASS
  (independent recount 1779/170, six C-B byte-identity pins empty incl. replay.ts still
  FROZEN, single goldenVerdict/wilsonInterval, C-D/C-F/C-G/C-H verified) → merge `d87fedd`
  tree-checked (tree == reviewed tip `39bf3ca`, verbatim message on remote + in Vercel
  deploy meta) → deploy READY/production sha-matched. **NO DDL, NO Operator door** (the
  canary rides an additive `replay_audit` outcome shape). Six disclosed deviations all
  ACCEPTED; the jq `//` false-coercion fix (`completed:false` would have silently greened)
  recorded as an Author-strengthened-spec catch. `EVAL_CI_TRIGGER_SECRET` set both sides.
  **S33-1 born** (FK-honesty: a uuid-FK actor column takes NULL for a machine actor;
  attribution rides an `outcome.actor` field — the string-sentinel-in-a-uuid-column trap).
- All prior closes per v32 §CLOSED stand (OBS-ENDPOINT-1, GOLDEN-MARK-1, L2, TRUST-PANEL-1,
  Q-1 chain, L1, …).

<!-- END · cwf-open-items-register-v33 · rev 33 · 2026-07-10 -->
