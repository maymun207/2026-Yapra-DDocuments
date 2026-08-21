# CWF — Open Items Register · v32

<!-- cwf-open-items-register-v32 · rev 32 · 2026-07-10 · Supersedes v31.
     Verified floor at close: origin/master 494b9ba = 1746 tests / 168 files /
     docVersion rev 60 / drift [OK]. -->

## 1 · LIVE QUEUE (committed order)

**Q-NEXT — L3 EVAL-CI** (the golden opener shipped — this is the L3 proper): thresholds in
CI + N-rep lens batches on the L2 golden seam (Wilson-CI verdict discipline verbatim:
block ONLY distinguishable regression; overlap = underpowered, never "safe"). Diagnosis-first
design note at CURRENT HEAD. Note: the CI gate's teeth grow as the owner's golden set grows —
design must be honest about the small-N regime (GOLDEN_MIN_REPS floor, underpowered audit
trail), never blocked waiting for the full ~20.

**Q-L4 — ROUTING-DRAFTS** (after L3): tool_category_cache draft store; routing lens
@preview honest. Then **Q-L5 — PROGRESSIVE DELIVERY**.

**GOVERN polish** — KindsTab scroll defect (reproduce headlessly per RULE 26 FIRST).
**P7** — Superset empty≠zero 3rd (runtime) layer, no fragile regex.

## 2 · MICRO-TD (attach to a legit open, don't open for them)

- `api/admin/replay.ts:332-338` inline authorityDiff → fold into `shared/authorityDiff`
  (file stayed FROZEN through OBS-ENDPOINT-1 AND GOLDEN-MARK-1 — still standing).
- Chat-quota prod smoke (one owner turn; the L2 prompt smoke rides the same turn —
  fingerprint promptRev present, no `cwf.prompt.degraded` line).
- **Golden prod smoke (NEW):** rides the owner's FIRST mark — the Architect reads Vercel
  prod logs (mark 200, no 503, table row born) + confirms the next prompt.segment publish
  attempt takes the Layer-2 MANDATORY arm, not the absent skip. Zero manual asks beyond
  the mark itself (which is the owner's curation act anyway).
- Audit-drawer past-relative time polish.

## 3 · OWNER-OWNED (surface only if raised)

**Golden-specimen curation — NOW ACTIONABLE** (~20 specimens via the ReplayTab mark
affordance; the FIRST mark flips Layer 2 to MANDATORY by construction) · dark-palette
sign-off · token rotation on real 401 · quota floor revisit.

## 4 · DEFERRED (do NOT build unprompted)

**Langfuse-host governed SELECTION (NEW, trigger recorded in ADR-007):** legitimate only
when a SECOND production host exists (DR / SSO migration) — selection among a CODE
allowlist over the shipped `shutdownObservability()` seam. Until then the env-only LAW
stands. · Docusaurus · CI-apply · HARDEN-GRANTS-1 (pg_default_acl class fix — noted FOUR
sessions running, still deferred) · AWS-DENY-1 · Langfuse SSO · governed connectors ·
backends enabled/tier/row-CRUD UI · family temperature clamp · client history sender ·
taskFn/pairedReplay parity · prompt A/B in production (L5) · per-user prompt variants ·
any sanitizer on governed text · time-module/assembly-order governance · METRIC_ALIASES
as a governed row (polarity LAW).

## 5 · CLOSED THIS SESSION (do NOT re-raise)

- **OBS-ENDPOINT-1 end-to-end** — diagnosis REVERSED the recorded scope (governed param →
  HARDEN + LAW; owner-ratified): three fatals incl. the NEW deep-link phishing vector ·
  `validateLangfuseHost` ONE pure gate, three readers converged, raw env re-read closed ·
  loud reject (reason-only, value never echoed) · `shutdownObservability()` seam ·
  **ADR-007** in-repo with the recorded risk acceptance + revisit trigger. Merged `6a8bce3`
  (1673→1701, RULE-25 PASS; 2 deviations, both Architect spec errors, owned — S32-1 born).
  No Operator door — closed at merge.
- **GOLDEN-MARK-1 end-to-end** — design v1 (SIDE TABLE, owner-ratified after the
  write-discipline walkthrough; column REJECTED on single-writer grounds) → build merged
  `dabc29e` (1701→1746 / 165→168, rev 59→60; RULE-25 PASS; C1 grep-proven zero messages
  writes; 6 disclosed deviations all accepted incl. the composed `goldenSpecimens.ts`
  reader and the 280-char note bound) → **Operator apply** (one clean `db push`;
  schema-read 6/6; RLS on / 0 policies / 0 rows; privilege-layer all-false incl. SELECT;
  probes **37/37** first-exercise 42501; second-push idempotence; incident-free; two benign
  env-mechanics deviations) → **DOC-FLIP** merged `494b9ba`, tree-checked (docs-only 2
  files; residual 5 hits all immutable-history classes; the two stale L2-section posture
  lines correctly flipped too). **MARKING STORE LIVE**; golden set empty, `goldenSet:absent`
  loud-skip stands until the owner's first mark.
- All prior closes per v31 §CLOSED stand (L2 end-to-end, TRUST-PANEL-1, Q-1 chain, L1, …).

<!-- END · cwf-open-items-register-v32 · rev 32 · 2026-07-10 -->
