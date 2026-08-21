# CWF — Session Graph KB · v36

<!-- CWF-SESSION-GRAPH-KB-v36 · rev 36 · 2026-07-11 · Supersedes v35. Session 36 window:
     the post-program POLISH QUEUE cleared end-to-end — five workstreams + one owner env step.
     Verified floor at close: origin/master 67e35d5 = 1975 / 187 / rev 68 / drift [OK]. -->

## 1 · SESSION SHAPE

Six workstreams, full lane loops, one window. Start floor `6b8e3f1` (1945/184/rev 65).

**CRON_SECRET (owner env)** → **RULE26-PROVER-1** (`7f0dee5`) → **P7** (`5cc642e`) →
**P7-FIX-1** (`329ea64`) → **SWEEP-1** (`373739a`) → **HARDEN-GRANTS-1** authored (`cbd657a`)
→ Operator-applied (incident-free) → **DOC-FLIP** (`67e35d5` = tip).

First-parent spine added: `6b8e3f1` → `7f0dee5` → `5cc642e` → `329ea64` → `373739a` →
`cbd657a` → `67e35d5`. Close floor `67e35d5` = 1975/187/rev 68/drift [OK].

## 2 · PER-WORKSTREAM DELTAS (verified independently, RULE-25)

- **CRON_SECRET.** Owner set the env in Vercel production + redeployed (the env only applies to
  NEW deployments — the named trap). Guardrail arm (`/api/admin/rollout-guardrail`, `0 6 * * *`
  UTC) armed-by-construction: Vercel injects `Authorization: Bearer <CRON_SECRET>`; the endpoint
  timing-safe-compares. Named the observability gap: the arm is SILENT on every non-500 path
  (503/401/405/200) — so an idle authed run is invisible in runtime logs. Deferred the fix into
  SWEEP-1 (a secret-free run-log), NOT its own phase (watching a no-op isn't worth a phase).
- **RULE26-PROVER-1** (`7f0dee5`). Diagnosis reframed the register's Q-NEXT: the "headless repro"
  it presumed needed a MEASUREMENT tool that didn't exist (no Playwright; jsdom can't measure
  layout; the `/dev/admin-preview` seam only RENDERS). Built the tool: Playwright driving `vite
  dev` (NOT `vite preview` — DEV route is tree-shaken from prod), worst-case seeded kinds (long
  kind_id + 8-value enum), page-level `document.documentElement.scrollWidth <= innerWidth` at 1280
  AND 1024. Result GREEN margin=0px → the KindsTab "scroll defect" is a PHANTOM; NO layout change
  (C-8). `?tab=` deep-link via `adminTabs.ts` with the `Tab` union DERIVED from the runtime `TABS`
  array (drift-proof). `rule26` CI job on push+PR. Architect disclosed a verification-surface
  reduction: the sandbox egress can't download Chromium, so the Playwright run is verified by
  code-read + CI, not by the Architect running it.
- **P7** (`5cc642e`). Superset empty≠zero was defended at 2 layers (prompt + eval-gate) vs ARMES's
  3; the runtime `groundingCheck.ts` Check 1 is hardwired to ARMES `BLIND_SPOTS`/`ZONES`. Added a
  backend-generic result-anchored path: `recordCount === 0` (an empty resultset — `formatToolResult`
  emits it for any backend) + a zero/absence assertion ⇒ `empty_as_zero` critical. ORTHOGONAL to the
  zone path (no union), keyed off the structured recordCount (no regex over domain nouns), and
  `=== 0` structurally excludes a real 0 in a non-empty result (the sacred trap). eval-gate + Check 1
  BYTE-UNTOUCHED (pure insertion).
- **P7-FIX-1** (`329ea64`) — the session's sharpest RULE-25 catch. P7's 6 tests were green, but
  Architect re-probed compliant-empty phrasings the author NEVER tested and found the CRITICAL gate
  false-firing on 3/6 — including **"No data was returned"**, the EXACT phrasing the gate's own
  `detail` recommends — because `ABSENCE_MARKERS` (yok/hic/none/**no**/nil) treated bare absence as
  a violation gated only by a thin `COMPLIANT_MARKERS` allowlist (`\bno\b` matched "No"). Root cause =
  polarity: for an EMPTY resultset "no data / veri yok" IS the compliant answer; the violation is
  presenting emptiness as the QUANTITY ZERO. Fix: drop the `ABSENCE_MARKERS` disjunct →
  `hasNumericZero || /\bsifir\b/` ONLY. Numeric-zero cases still fire; entity-absence-no-number =
  accepted miss (prompt+eval-gate covered, governed-phrase runtime deferred). Architect empirically
  re-verified: 5 compliant phrasings → 0 fires; 3 numeric → 1 critical each.
- **SWEEP-1** (`373739a`) — three micro-TDs, one merge. (1) canary cross-pin: `export const
  CANARY_MESSAGE_ID` + a test pinning `=== CANARY_AUDIT_MESSAGE_ID` (has-teeth: flip → RED,
  Architect-reproduced); ALSO corrected a FALSE docblock that claimed a pin that never existed. (2)
  audit relative-time: `src/lib/relativeTime.ts` over native `Intl.RelativeTimeFormat`, absolute
  timestamp moved to `title`, wired into RolloutTab + RoutingTab drawers. (3) guardrail run-log:
  secret-free `console.log('[rollout-guardrail]', {…})` on both 200 paths (verdict/state/ids only,
  ADR-007/C9) — closes the CRON_SECRET observability gap.
- **HARDEN-GRANTS-1** (`cbd657a` → `67e35d5`). Diagnosis REFINED the register: (c) REFERENCES+TRIGGER
  never revoked anywhere (universal residue); (b) TRUNCATE already revoked on server-write-only tables,
  residual only on owner-CRUD (authenticated); (a) no `ALTER DEFAULT PRIVILEGES` anywhere. All three
  classes are API-unreachable (no PostgREST verb) → HYGIENE, not a hole → a SAFE blanket revoke
  (no per-table enumeration; SELECT/DML untouched). Operator applied incident-free: G-a residue gone
  (5/5 false), G-b must-not-break (SELECT+INSERT true), G-c defaults hardened (postgres/public
  tables=`arwdm` no D/x/t; functions=postgres+service_role only), G-d idempotent second push. The
  7-session deferred DISCHARGED.

## 3 · THE OWNED ITEMS (honesty ledger)

- **Architect — duplicate artifact.** Re-authored an already-existing project artifact
  (`claude-code-PHASE-RULE26-PROVER-1-v1.md`) without grepping the project files first — a
  versioning-discipline slip. Zero repo impact (outputs copy, project files read-only), owned →
  **S36-2**. Lesson applied for the remaining four phase prompts (grep-first).
- **AG — P7 calibration (a good catch by the process, not a failure to bless).** P7 shipped a
  well-built but mis-calibrated CRITICAL gate; RULE-25 independent re-probe caught it → **S36-1**.
  This is exactly why the review runs the cases the author didn't.

## 4 · STANDING RULES DELTA

- **S36-1:** CRITICAL-gate RULE-25 review MUST probe the must-NOT-fire class with author-uncovered
  phrasings (the "gate flags its own recommended answer" failure).
- **S36-2:** grep project files for a same-name artifact before authoring; never mint a colliding version.
- **S36-3:** blanket grant-revoke is safe iff the privilege has no API verb; `ALTER DEFAULT PRIVILEGES`
  retires the per-fn lockdown chore; empty≠zero calibrates on quantity-zero, not bare absence.
- All prior standings carried (S30-1..3, S31-1, S32-1, S33-1, S34-1, S35-1).

## 5 · STATE

**EAIP-LIFECYCLE was CLOSED in S35; S36 cleared the post-program polish queue AND the 7-session
HARDEN-GRANTS-1 deferred.** No forced engineering item remains. The next workstream is the admin/chat
UI the owner has flagged. Standing owner-actionable curation (golden marks, first rollout) and prod
smokes (guardrail cron, rollout/routing/quota) ride owner production actions — the Architect reads the
logs when they fire (the guardrail run-log now makes the cron arm observable at its next fire).

<!-- END · CWF-SESSION-GRAPH-KB-v36 · rev 36 · 2026-07-11 -->
