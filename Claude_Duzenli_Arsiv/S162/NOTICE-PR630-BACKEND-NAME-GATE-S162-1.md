<!-- relay-audit: v1 kind=notice -->
NOTICE-PR630-BACKEND-NAME-GATE-S162-1

LANE: AG-3 (in mail-wait; branch phase/e1b-ka-fixture-backend-s161-2, PR 630, head 5149162d4f2381f7b8265e7b27c44c3c7adff171)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T18:32Z
OWNER APPROVAL: OWNER-APPROVAL-S162-PLAN-1 (landing chain); OWNER-RULING-S161-LANES-WAIT-1.
WHY: your merge-master slip was read (SLIP-PR630-MERGE-MASTER-S162-1, bus 487adea7-0d47-455c-a9cc-8859c8836857) — merge guard GREEN, #631 yields, reseal clean. But at 5149162d Build and Test is RED: job `build (24.x)` step 9 **"Backend-name gate"** FAILURE (18:22:13Z); steps 10 Build and 11 Run tests SKIPPED (silent, not passing); rule26 success; changes success. That gate is PR 628's instrument (CARD-E1C, landed at 16:49:40Z, `npm run check:backend-names` against data/gates/backend-names-baseline.json, EXACT-MATCH per class) — it arrived on master AFTER your branch was cut, and your PR adds two invented fixture backends (api/cwf/__tests__/__fixtures__/mcp/finance-30.json, logistics-30.json). The Architect cannot read the job log (proxy 403); you can run the gate locally.
NO CRON TASK. GRAFT: code context from graft first (checkBackendNames.ts, backendNamesLens.ts, the baseline file). SECURITY: never print, echo, printenv or cat any environment variable.

## PRECONDITION
On phase/e1b-ka-fixture-backend-s161-2 at 5149162d4f2381f7b8265e7b27c44c3c7adff171, tree clean.

## ORDER
1. `npm run check:backend-names` at your head; print its output VERBATIM (the names and classes it rejects). Read scripts/checkBackendNames.ts and docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md for the baseline's contract (which classes it counts, how fixtures are classed, how a baseline update is meant to be made — there may be a `--write`/update mode; use the instrument's own way, never a hand edit that the lens would not reproduce).
2. If the rejected names are your two INVENTED fixture backends (finance/logistics — not real backends, OWNER-RULING-S153-NO-ARMES-HARDCODE-1 is not touched): update data/gates/backend-names-baseline.json the way the instrument prescribes so the gate is GREEN at your head, and add that path to your report's ```scope``` fence (FENCE-GREW is allowed when the head fence holds; say so in the report). If the rejected names are anything else, STOP and slip the verbatim output — do not widen the baseline for a name you did not introduce.
3. `npm run check:backend-names` again → GREEN; `npm run build` (five gates) and `npm run typecheck:api`; quote the last line of each. ONE commit (non-merge).
4. `git push origin phase/e1b-ka-fixture-backend-s161-2`; print the 40-hex head and `git ls-remote origin refs/heads/phase/e1b-ka-fixture-backend-s161-2`.
5. CI at the new head by full sha, read twice if zero; wait for Build and Test as a NAMED wait (print `WAITING Build and Test at <head> <time>`, sleep 120, at most six times); quote the VERDICT line and the Build and Test conclusion.
6. SLIP (laneSlip) as SLIP-PR630-BACKEND-NAME-GATE-S162-1: first line `NEW-HEAD: <40-hex> pr=630`, the gate output before/after, the baseline diff (names added, class), build/typecheck last lines, CI conclusion, GRAFT line. Fallback file: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SLIP-PR630-BACKEND-NAME-GATE-S162-1.md" with sha256 printed.
7. DO NOT STOP: `node scripts/mail-wait.mjs AG-3 --budget-min 480`; 0 → `--read <name> --take`, execute, slip, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED with reason, stop.
FORBIDDEN: a real backend name anywhere; a hand edit of the baseline outside the instrument's own update path; rebase; --force; merge of your own PR; a cron; printing an environment value.

END · NOTICE-PR630-BACKEND-NAME-GATE-S162-1
