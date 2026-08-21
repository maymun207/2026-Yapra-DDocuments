# PHASE REPLAY-QUOTA-1 · DOC-FLIP — Operator-applied + live grant-verified (post-Operator follow-up)
**v1 · 2026-07-07 · anchor = origin/master `537c8d5` · Author lane (AG) · a docs-flip follow-up. The Operator
applied BOTH B migrations and live-confirmed them: `20260707160000_user_quotas.sql` (table service-role-only:
RLS-on / 0 policies / 0 anon+authenticated DML grants) AND `20260707170000_user_quotas_execute_lockdown.sql`
(FIX-2: the two SECURITY DEFINER RPCs now show EXECUTE for `service_role`/owner ONLY — anon/authenticated/PUBLIC
removed; security_definer=true, reserve FOR UPDATE intact). Flip the sealed docs from "authored,
Operator-pending" → "applied + live grant-verified", mirroring A3's `09efc8e` follow-up.**

<!-- v1 · This is the doc-honesty flip: at the B/FIX seals the migrations were authored-not-applied, so the
     docs said "Operator-pending". They are now applied + confirmed. Update the CHANGELOG + governance diagram
     status to the ACTUAL live state. Mirror A3: A3 flipped its badges/notes in 09efc8e WITHOUT a docVersion
     bump (a factual status update, not a depicted-contract change). Keep docVersion rev 51. -->

You implement THIS prompt exactly. No re-scope. If verifyGrants reports ANY failure, STOP and report (do NOT
flip the docs on a failing probe).

---

## 0. HARD PRE-FLIGHT GATE (paste evidence)
1. `git rev-parse origin/master` == `537c8d5` (fresh clone; if moved, STOP).
2. `npm ci` clean; **full suite green 1205 / 117**.
3. Drift `[OK]`; `git status` clean; branch `master`; merge `--no-ff` (squash BANNED).

## 1. SUB-PHASE A — verify LIVE (the behavioral table-gate proof)
Run the live grant probe against the REAL DB (the anon-key deny probes, exactly as A3 did):
```
npx vite-node scripts/verifyGrants.ts
```
- Expect **ALL gates pass**, INCLUDING the new `user_quotas` row: `A1.1 anon UPDATE user_quotas → 42501`.
- Paste the full pass/fail summary line (e.g. `✅ ALL A1.1 GRANT GATES PASSED — N passed, 0 failed`).
- If the connector/env for a live run is unavailable in your lane, STOP and report "verifyGrants live run
  blocked — needs owner/live keys" rather than flipping docs on an unverified claim.
- **If ANY gate fails → STOP and hand back to the Architect. Do NOT flip the docs.**

(The FUNCTION EXECUTE lockdown was proven by the Operator's catalog read — anon/authenticated/PUBLIC EXECUTE
removed, service_role retained. A verifyGrants *function-EXECUTE anon-denied* probe is a separate tracked
hardening; not in scope here.)

## 2. SUB-PHASE B — flip the sealed docs to the live state
ONLY status/wording changes reflecting the now-applied migrations. No behavior, no code, no test, no frozen
file. In `.agents/CHANGELOG.md` and `public/architecture/diagrams/governance-model.html`:
- The B CHANGELOG entry header + the "MIGRATION AUTHORED, NOT APPLIED — Operator gate pending" line + the
  FIX-1/FIX-2 notes → state the real end state: **"migrations APPLIED (`user_quotas` table `20260707160000` +
  the FIX-2 EXECUTE-lockdown `20260707170000`) + live grant-verified"**, and record the FIX-1→FIX-2 correction
  outcome (FIX-1's PUBLIC-only revoke was insufficient against pg_default_acl's named anon/authenticated grants;
  FIX-2 revoked all three grantees; Operator-confirmed the RPCs are service_role-only).
- Governance diagram: the `user_quotas` table-row status badge and the "Replay quota …" note's "The migration
  is AUTHORED, Operator-pending." → **applied + live grant-verified** (flip the `DDL pending (owner)` badge for
  `user_quotas` to the LIVE badge, matching how other applied tables read). The RPC-lockdown detail may be
  noted as "functions service-role-only (EXECUTE revoked from public+anon+authenticated; Operator-verified)".
- **Keep docVersion rev 51** (mirror A3's `09efc8e`: a factual status flip, not a depicted-contract change).
  Run `check:doc-drift` — expect `[OK]` (no mapped code area moved). If it flags, STOP and report.

## 3. SEAL
Single commit is fine (docs-only flip). Merge `--no-ff` (squash BANNED). Push; report the remote hash.

## 4. SELF-VERIFICATION (literal)
- [ ] `git rev-parse origin/master` before (`537c8d5`) → merged HEAD (pushed remote hash).
- [ ] verifyGrants live summary pasted; **0 failed**; `user_quotas` gate present and passing.
- [ ] `grep -ni "operator-pending\|DDL pending\|not applied" .agents/CHANGELOG.md public/architecture/diagrams/governance-model.html`
      — **no remaining B/user_quotas "pending"/"not applied"** mentions (the flip is complete).
- [ ] `grep -ni "live grant-verified\|applied" .agents/CHANGELOG.md` shows the B entry now reads applied+verified.
- [ ] `git diff 537c8d5..<HEAD> --stat` = CHANGELOG + governance-model.html only.
- [ ] Suite still **1205 / 117**; drift `[OK]`; docVersion still rev 51; frozen sweep ZERO.

## 5. REPORT FORMAT
The verifyGrants live summary; the flipped CHANGELOG/diagram wording (the before→after for the status lines);
the §4 checklist with literal outputs; the commit ledger (flip → merge, pushed remote hash). Then:
**"B / REPLAY-QUOTA-1 fully closed — migrations applied + live grant-verified; docs flipped."**

<!-- END · claude-code-REPLAY-QUOTA-1-DOC-FLIP-operator-applied-live-verified-v1 · 2026-07-07 · anchor 537c8d5 -->
