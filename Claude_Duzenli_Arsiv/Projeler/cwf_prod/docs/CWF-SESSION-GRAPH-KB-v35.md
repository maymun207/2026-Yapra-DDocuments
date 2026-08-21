# CWF — Session Graph KB · v35

<!-- CWF-SESSION-GRAPH-KB-v35 · rev 35 · 2026-07-10 · Supersedes v34. Session 35 window:
     the EAIP-LIFECYCLE program's LAST letter (L5 PROGRESSIVE DELIVERY) shipped end-to-end.
     Verified floor at close: origin/master 6b8e3f1 = 1945 / 184 / rev 65 / drift [OK]. -->

## 1 · SESSION SHAPE

One phase, full lane loop, all in one window (the S34 end-to-end rhythm, repeated):
**L5 design v1 (owner-ratified) → gated AG prompt v1 → build merge `eb1e74e` (RULE-25 PASS)
→ Operator apply 42/42 incident-free → DOC-FLIP merge `6b8e3f1` (tree-identity ✓,
sha-matched).** This CLOSES the program: L1→L5 all ✅.

First-parent spine added this session: `b3e8148` (L4 flip, the v34 floor) → `eb1e74e`
(L5 build merge) → `6b8e3f1` (L5 DOC-FLIP merge = tip).

## 2 · L5 DECISIONS (ratified — the durable ones)

- **Charter:** L5 is the ACTUATOR L3 deliberately did not build. A red canary is a SIGNAL;
  L5 acts on it — but the automated act is deliberately minimal (the L3 lesson sharpened:
  a gate that reds on noise gets disabled; an actuator that ACTS on noise is worse).
- **Scope v1:** family-generic substrate (`publish_rollouts.family` column from birth),
  ONE family wired = `prompt.segment` — the highest-risk publish, richest instrumentation
  (promptRev stamping already per-turn), one call site. domain_rules-proper / params
  rollouts deferred with triggers; routing explicitly OUT (its SOFT axis has its own
  epoch+audit+revert).
- **Why L5 was cheap:** arm attribution was ALREADY built. `configFingerprint` stamps
  `promptRev` into the `turn_done` ledger; `usage_*_by_fingerprint` aggregates per rev. A
  candidate turn composes a different promptRev BY CONSTRUCTION — the fingerprint machinery
  is an arm-labeling system that predated the arms.
- **The determinism split (§7):** bucket = `sha256(rolloutId:userId)` basis points, no RNG
  (stable per user+rollout — no flapping; rolloutId in the hash re-shuffles across
  rollouts). Verdict = the EXISTING `goldenVerdict` (never an LLM judge). Fail posture =
  prior published truth (candidate never the default). Governed rows = the rollout row +
  the `rollout.guardrailMinTurnsPerArm` L1 param power floor.
- **The blast-radius split (HC-2):** the automated actuator may ONLY roll a distinguishably-
  regressing 'progressing' slice back to 0% (restores prior truth — safe by construction);
  underpowered/unavailable actuate NOTHING, never phrased "safe". Create/advance/complete/
  cancel are human, promotion-tier (ROLLOUT_MANAGE). Complete = the EXISTING
  governance.publish — Layer-2 fires at the pointer flip ONLY, which never gains a second
  door.
- **Two Architect refinements ratified** (both born from reading the code, both owned):
  (1) Layer-2 golden runs at COMPLETE, not at stage (stage = Layer-1 gate only — a second
  golden run at stage double-spends tokens and diffs the byte-pinned golden contract; the
  rollout's whole purpose is to replace golden-replay evidence with REAL production traffic
  evidence). (2) The cron arm authenticates via GET (Vercel cron is GET-only; unauthed GET
  = 401 side-effect-free preserves the eval-ci echo-pattern's safety property).
- **The named trap that shaped the design:** one prompt delta in flight. A second concurrent
  prompt.segment publish makes the two arms unattributable → REJECTED (409 + a partial
  unique index belt+braces), plus the candidate draft is frozen (PATCH/archive 409) so it
  can't drift under the rollout.

## 3 · VERIFIED DELTAS (independently, RULE-25)

- **Build (`eb1e74e`):** 1945/184 independently recounted (sharded 1088+857 / 92+92 — the
  full-suite run exceeds the sandbox time limit; shard-and-sum is the workaround). All 10
  C-B byte-pins = 0 diff (incl. eval-ci + goldenPublishContract = C-F and Layer-2
  untouched). Both comments-stripped pins IDENTICAL. governance.ts = exactly one C-E guard
  hunk + DI seam. C-D actuator: strict conjunction (regression ∧ progressing), all other
  arms no-op. C-F single call site (stagesModel:108). promptRev derivation byte-untouched.
  vercel.json = crons key only.
- **Operator apply (incident-free, 42/42):** schema 8/8 (11+6 cols exact order · RLS both ·
  0 policies both · partial unique index exact predicate · proacl {postgres,service_role}
  only · 0/0 rows); verifyGrants 42/42 with 3 first-exercise 42501-DENIED (incl. the fn
  probe — no PGRST202 INCONCLUSIVE); idempotent second push.
- **DOC-FLIP (`6b8e3f1`):** two-commit seal (flip 83447c9 + reseal c2c454d); AST-strip
  comparator IDENTICAL on all 4 .ts (reproduced independently); survivors all sealed
  history (manifest historical notes + pre-L5 CHANGELOG entries); rev 64→65; diff scope =
  10 files exactly. Tree-identity ✓ (f599936 == c2c454d tree); deploy sha-matched.

## 4 · THE TWO OWNED ERRORS (this session's honesty ledger)

- **Architect — the G2-e Operator gate text.** I wrote "EXPECT ZERO rows" for the
  anon/authenticated privilege check; the real result showed REFERENCES + TRIGGER surviving.
  Verified from the migrations corpus that ZERO migrations revoke these — it's the standing
  default-ACL residue on EVERY server-only table, not L5-specific, and harmless (no data
  read/write, DDL API-unreachable). Folded into deferred HARDEN-GRANTS-1 as observation (c).
  The gate SHOULD have expected the metadata residue; the Operator's literal-read correctly
  surfaced the mismatch.
- **AG — the comparator false-positive (a GOOD catch, not a failure).** The naive TS
  `createScanner` mis-lexed the region between two adjacent template literals in
  UsageAnalyticsRepository.ts as one token, swallowing the docblock between them → false
  DIFFERENT. AG replaced it with an AST-parse + `removeComments` printer + raw-diff
  cross-check. This became **S35-1**.

## 5 · STANDING RULES DELTA

- **S35-1 (NEW):** comments-stripped byte-compare MUST be AST + `removeComments` printer,
  not a raw scanner token stream (the adjacent-template-literal swallow). Sharpens S34-1's
  tool; S34-1's requirement (reseal budget on .ts-comment flips) stands and fired correctly
  (rev 64→65).
- All prior standings (S30-1..3, S31-1, S32-1, S33-1, S34-1) carried.

## 6 · PROGRAM STATE

**EAIP-LIFECYCLE CLOSED.** L1 ✅ Q ✅ TRUST-PANEL-1 ✅ L2 ✅ OBS-ENDPOINT-1 ✅
GOLDEN-MARK-1 ✅ L3 ✅ L4 ✅ L5 ✅. Every letter design→build→apply→flip. The governance
substrate is now complete: everything tweakable (HC-1), every governed family behind
sandbox parity (HC-2), and now — with L5 — every publish has a safe progressive delivery
path with an automated regression backstop. Post-program work is polish (GOVERN KindsTab
scroll, P7 Superset runtime empty≠zero) + owner-actionable curation (golden marks, the
first real rollout). Two owner env/UX steps stand: CRON_SECRET (activates the cron arm),
and the first governed edits (golden marks / a staged rollout) that light up the
production smokes.

<!-- END · CWF-SESSION-GRAPH-KB-v35 · rev 35 · 2026-07-10 -->
