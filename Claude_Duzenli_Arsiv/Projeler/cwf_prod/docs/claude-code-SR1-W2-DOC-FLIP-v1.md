# DOC-FLIP — SR1-W2 router_proposals applied & grants-verified
<!-- claude-code-SR1-W2-DOC-FLIP-v1 · rev 1 · 2026-07-17 · against live master 08faed4 -->

## S47-1 PRECONDITION
Valid ONLY while `origin/master == 08faed4`. On mismatch: STOP and report.
Single in-flight phase — you own any reseal (rev 104 → 105 if mapped files flip).

## CEREMONY PROFILE
HOTFIX (comment-only + docs; no api/shared logic, no migration content change).
CI green still required before merge.

## SCOPE (exhaustive — nothing else)
1. `supabase/migrations/20260717120000_router_proposals.sql` header STATUS
   line: flip `authored, Operator-pending` → `applied & grants-verified
   2026-07-17 (Operator G1–G5 ALL PASS; verifyGrants 51/51 incl.
   router_proposals + record_router_proposal). Live-positive (first machine
   row) lands at SR1-W3 router enable — deliberately NOT claimed here.`
2. Any provenance comments referencing the migration's pending status in
   `shared/dbConstants.ts` / `shared/grantPolicy.ts` — same flip wording.
3. `.agents/CHANGELOG.md`: one entry — F128 CLOSED@evidence with the live
   chain verbatim (`kind-provisioned` → `[Gate] verdict=published rule=c1ea1cf6`
   → `rows=1 skipped=0 failed=0`, trace 84ff9947…, 2026-07-17 04:12:24Z) and
   PLATINUM-BREACH-3 marked redesign-shipped-and-live-proven.
4. Reseal if the drift gate demands it.

## PROOF OBLIGATIONS
- Comment-only proof per standing rule: SQL `--`-strip byte-compare for the
  migration; TS AST printer removeComments (S35-1, never raw scanner) for any
  .ts provenance flip. Paste both results.
- Targeted tests (changed-area) + drift gate [OK]. CI is the arbiter.

## SELF-VERIFY
1. rev-parse at start pasted; 2. byte-compare outputs pasted; 3. diff --stat
pasted (comments/docs only); 4. PR opened, CI status reported; merge only on
Architect GO with the Architect-authored message.

<!-- END · claude-code-SR1-W2-DOC-FLIP-v1 · rev 1 · 2026-07-17 -->
