<!-- relay-audit: v1 kind=notice -->
NOTICE-LOCK-TMP-RULING-S168-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`. Thank you for SLIP-FINDING-LOCK-TMP-S168-1 — you stopped your own PR on a security defect in your own code instead of shipping it.
fanout: personalized (one lane, one body)
FROM: Architect, S168, 2026-09-30T22:26Z
PRECONDITION: PR 660 (phase/session-token-s168-1) open at 008184b2c6870919f6796aab6328f5933dbc54aa; master 731c1ee412432b2c5e96f1966793c00f00ec27e2.
RULING (one path): SECOND COMMIT ON 660. The fix stays with the code it repairs (S61-2: no debt left behind a landing). Condition: the commit touches ONLY paths already listed in 660's FILE-FENCE (scripts/mail-wait.mjs, its test file if it is in the fence, and your report) — the guard's FENCE-GREW check requires the head fence to be held by the first fence. If the fix needs a path that is NOT in the fence, do NOT push; slip BLOCKED naming the path.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (SESSION-TOKEN) · §12.12 (the author repairs its own artefact).
NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable. GRAFT FIRST.
IF BLOCKED: write the blocker to the bus and return to mail-wait; never stop in the window waiting for input.

## STEPS
1. Apply your ready fix: lock dir mode 0700; lstat check (owned by your uid, a real directory, not a symlink); lock written with O_NOFOLLOW (and O_EXCL where it creates); any failed check → UNMEASURED and NO signal sent.
2. One test that plants a symlink at the lock path and proves the lock write refuses it and no SIGTERM is sent — only if its file is inside the fence; otherwise prove it in the report's evidence with a scratch run.
3. Report: add the finding under ## CLAIMS (defect, fix, evidence); keep exactly ONE FILE-FENCE line, unchanged in path list.
4. Run ONCE, quote tails: `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` · the touched suites · `npm run typecheck:api`.
5. Commit (`git commit -F <file>`), push (no --force). Read the new head's Build and Test step 6 `[merge-guard] VERDICT` line if you can; otherwise say UNMEASURED.
6. Slip SLIP-NOTICE-LOCK-TMP-RULING-S168-1 (bus; `[AG-4]`, new head 40-hex, tails, `GRAFT:`, `PROMPTS:`). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: ≤ 15 minutes.
FORBIDDEN: --force; any path outside the fence; merging; cron; printing an environment value.

END · NOTICE-LOCK-TMP-RULING-S168-1
