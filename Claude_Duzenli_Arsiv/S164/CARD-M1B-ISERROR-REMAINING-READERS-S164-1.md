<!-- relay-audit: v1 kind=card -->
CARD-M1B-ISERROR-REMAINING-READERS-S164-1

LANE: AG-4 (in mail-wait; POST-LANDING-1 prepped, head f145e48e8d192291267b81c6f48c275877b74478)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:22Z
SUBJECT: finish M1 (landed PR 641, master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1). M1 made executeMCPTool return McpToolOutcome {text, isError} and carried the verdict into stage 07. scout-2's M1 review named readers that still read the raw bytes WITHOUT the verdict: H9 examScorers.readResult (E1-a honesty metric re-reads raw bytes, no verdict: DOES NOT FOLLOW) and the off-turn callers of executeMCPTool (named by AG-1 at M1: entityDiscoverySync.ts near :389, gatewayEnumerate.ts near :143 and :160). A tool that answers isError=true must not be scored, enumerated or discovered as if its error text were data.
SEAL: EXEMPT with ack = scout-2's review row of this SAME subject (SCOUT-STATUS-REVIEW-CARD-M1-S164-1), practice 136 — the residual hops that review itself named.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 1341d78b-9ae4-4e8c-91ca-0f4a6357a3b7
```
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 (M1…M4 track) · A26 v1_2 §9 (M1) · CWF-S164-OPEN-ITEMS-TABLE-v1 row S164-2 · register 140, 145.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDERS
1. `git ls-remote origin refs/heads/master` TWICE, print. Clean worktree printed. `git switch -c phase/m1b-iserror-readers-s164-1 <that master>` (NOT on top of POST-LANDING-1; separate branch).
2. MEASURE FIRST, with graft, and quote each: every caller of executeMCPTool on master (expect the stage-07 slot + the off-turn ones); for each, what it does with `.text` and whether it reads `.isError`. examScorers.ts readResult (≈:176-184): what it reads and how an isError=true result is scored today. If a caller already honours isError, say so and leave it.
3. FIX, minimal, one rule for all readers: an outcome with isError === true is a TOOL-REPORTED FAILURE, never data.
   - examScorers.readResult: takes the verdict; an isError result is scored as a failed call (not an answered-empty, not an answer); the honesty metric counts it as a failure. If the exam record does not carry the verdict, carry it from the same place stage 07 records it (M1's path) — do not re-derive from bytes.
   - entityDiscoverySync / gatewayEnumerate (off-turn): on isError, do not write/enumerate entities from the error text; record the failure where that code already records failures (quote the existing failure path; if none exists, log with the existing logger and skip — no new table).
   - No backend literal anywhere (§13.1); no new governed knob.
4. Tests (named): M1B-1 examScorers: isError result → failure, not answer (and pre-M1B would have scored it as answer: planted fault proves it). M1B-2 discovery: isError → zero entities written. M1B-3 enumerate: isError → tool/catalog not enumerated from error text. Existing M1 tests (mcpIsErrorPassthrough.test.ts) stay green.
5. GATES: `npm run build` (reseal if drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · check:migration-versions · relayAudit over docs/relay/ · touched suites. Quote each line. Report docs/relay/M1B-ISERROR-READERS-S164-1-AG4-report.md with a FILE-FENCE block (merge guard requires exactly one) and no bare 7–39 hex in prose.
6. ONE commit, parent = step-1 master. Push; ls-remote. DO NOT open a PR (queue: M2 → K41 → POST-LANDING-1 → M1B). Slip SLIP-CARD-M1B-ISERROR-READERS-S164-1 (bus + fallback S164/): branch, 40-hex head, parent, callers table, gate lines.
7. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

FORBIDDEN: changing executeMCPTool's signature; touching stage 07's M1 path; a new table or governed knob; opening a PR; --force; cron; printing an environment value.

END · CARD-M1B-ISERROR-REMAINING-READERS-S164-1
