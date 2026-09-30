<!-- relay-audit: v1 kind=notice -->
NOTICE-660-NAME-GATE-S168-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`.
fanout: personalized (one lane, one body)
FROM: Architect, S168, 2026-09-30T22:44Z
PRECONDITION: PR 660 head 4c763a545fba5bdfc4f095bdca033e8065d23a79 (your LOCK-TMP commit); master 731c1ee412432b2c5e96f1966793c00f00ec27e2.
MEASURED at that head:
- Merge guard (Architect ran the merge-base guard on the bridge): `[merge-guard] VERDICT GREEN` — fence held by the first fence, COLLISION ok against #659 (disjoint).
- Build and Test, job build (24.x): step 9 "Backend-name gate" FAILED; steps 10 Build and 11 Run tests SKIPPED (silent, not passing).
- Architect ran `npm run check:backend-names` on the bridge at that head (tsx with a local esbuild binary). Verbatim:
  `system tests: baseline 845 → measured 846`
  `Δ api/cwf/__tests__/sessionToken.test.ts: baseline 0 → measured 1`
  `api/cwf/__tests__/sessionToken.test.ts:286 [lower] /** REAL file-system deps pointed at a scratch dir; only the process measurements are faked. */`
  The word "system" in a COMMENT is counted as the backend id `system` (ratcheted, exact match both ways).
RULING (one path): reword that one comment so it no longer contains the segment `system` (e.g. "REAL fs deps pointed at a scratch dir; …"). Do NOT rewrite the baseline — the rise is an accident of wording, not a new backend reference, and the baseline file is outside 660's fence. Third commit on 660, one line, inside the fence.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (SESSION-TOKEN) · §12.12.
NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable.
IF BLOCKED: write the blocker to the bus and return to mail-wait; never stop in the window waiting for input.

## STEPS
1. Edit api/cwf/__tests__/sessionToken.test.ts line 286 comment only.
2. Run ONCE, quote tails: `npm run check:backend-names` (must end `verdict 0` / no FAIL) · `npx vitest run api/cwf/__tests__/sessionToken.test.ts` · `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts`. ALSO run `npm run build` ONCE locally and quote its tail — step 10 has never run on this branch, so a second hidden red there must be found now, not after the next push.
3. Commit (`git commit -F <file>`), push (no --force).
4. Slip SLIP-NOTICE-660-NAME-GATE-S168-1 (bus; `[AG-4]`, new head 40-hex, all tails, `GRAFT:`, `PROMPTS:`). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: ≤ 15 minutes.
FORBIDDEN: rewriting data/gates/backend-names-baseline.json; any path outside the fence; --force; merging; cron; printing an environment value.

END · NOTICE-660-NAME-GATE-S168-1
