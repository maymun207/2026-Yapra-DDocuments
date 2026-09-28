<!-- relay-audit: v1 kind=notice -->
NOTICE-PR627-PIN-FIX-S161-1

LANE: AG-4 (fresh window; /clear first; your OWN worktree on branch phase/entry-floor-required-s161-2)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T04:15Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI), plan step P4 (row 114); the landing itself is auto-merge on adversary/scout success — no master push by hand, no new spend.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your slip is written, stop.
GRAFT: code context from graft first; your slip carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: ONE line in YOUR OWN test file, the plant re-run, one push. Nothing else on the branch changes. This is the author-fixes-own-file rule (project instructions §12.12): the scout does not edit your file, the Architect does not edit your file.

## WHY (the scout's measurement, SCOUT-STATUS-LAND-PR627-S161-1, bus row c534185c-b848-4ef3-8fd0-0582f6bcdb94, written 2026-09-28T00:48Z)
ADVERSARY-VERDICT: RED pr=627 head=b8b5ff07bfb31ba4e969823b975aec92dd659656 — on step 2b only; steps 2a, 2c–2j are clean; CI at that head is 4/4 success (Build and Test · Relay corpus · report-schema · Auto-merge landing; eval-canary SKIPPED, named).
The RED, in the scout's words (bytes from the bus row):
```
api/cwf/__tests__/filterToolsByMessageFloorRequired.test.ts:22  `await filterToolsByMessage([], 'oee nedir', []);` (3 args).
The signature at head (toolCategories.ts:1419-1465) makes the five middle slots `T | undefined` WITHOUT `?`, so they are required in arity. A 3-arg call errors on the missing routerPolicy..cleanAgentTaskId whatever the floor is.
MEASURED (scratch probe, repo tsc, --ignoreConfig --strict, no repo edit): same 9-param shape; 3-arg @ts-expect-error against floor `?` optional -> directive USED (no error); against floor `= []` default -> directive USED (no error); 8-arg call (five explicit undefined, floor omitted) against floor `?` -> `error TS2578: Unused '@ts-expect-error' directive.` Only the 8-arg spelling discriminates.
```
Plain reading: the @ts-expect-error pin fails for the WRONG reason (missing middle arguments), so if someone later makes the floor optional again, typecheck:api stays green and the guard is vacuous. The card's intent (required floor, nine-arg callers) HOLDS at head; only the regression guard is wrong.

## ORDER (one line + one proof + one push)
1. `git fetch origin && git switch phase/entry-floor-required-s161-2 && git status --short` — expected clean, head b8b5ff07bfb31ba4e969823b975aec92dd659656. If the head differs, print it and STOP (someone else touched the branch).
2. In api/cwf/__tests__/filterToolsByMessageFloorRequired.test.ts, line 22 ONLY: the call becomes the eight-argument spelling — the five middle slots passed as explicit `undefined`, the floor OMITTED — exactly as the scout measured:
   `await filterToolsByMessage([], 'oee nedir', [], undefined, undefined, undefined, undefined, undefined);`
   The @ts-expect-error directive above it stays. No other line in the file changes.
3. PROOF, the plant (no commit of the plant): make `entryFloor` optional (`entryFloor?:`) in toolCategories.ts, run `npm run typecheck:api`, quote the `TS2578: Unused '@ts-expect-error' directive` line with its file:line; then `git checkout -- api/cwf/_lib/knowledge/toolCategories.ts` and run `npm run typecheck:api` again — expected green. Both outputs go in the slip and, as ONE new evidence fence, into docs/relay/ENTRY-FLOOR-REQUIRED-S161-1-AG4-report.md under ORDER 1 (the Pin claim is rewritten to say what was measured; the old 3-arg claim is struck by rewrite, not deleted history). Also correct the report's ORDER 6 line per the scout: the head count is 73 because line 184 of the report quotes the grep command itself; code/test/UI files 72 -> 72.
4. `node scripts/relayAudit.ts docs/relay/ENTRY-FLOOR-REQUIRED-S161-1-AG4-report.md` — expected `[OK] kind=report grammar v1`. If it refuses, fix the report only, never the test.
5. ONE commit (test line + report), --no-ff is not involved (single commit on your branch), subject `AG-4: ENTRY-FLOOR-REQUIRED-S161-2 — the pin discriminates (8-arg spelling, TS2578 plant measured)`; `git push origin phase/entry-floor-required-s161-2`; print the new head (40-hex) and `git ls-remote origin refs/heads/phase/entry-floor-required-s161-2`.
6. Do NOT re-run, dispatch or merge anything; the push makes its own CI run and the scout (scout-2, ORDER-SCOUT-LAND-PR627-S161-1-v2) posts the adversary status on the NEW head; auto-merge lands it.
SLIP with laneSlip as SLIP-PR627-PIN-FIX-S161-1: first line `NEW-HEAD: <40-hex> pr=627`, then the TS2578 line, the green typecheck line, the relayAudit line, GRAFT line. If the bus write is refused, write the slip to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SLIP-PR627-PIN-FIX-S161-1.md", print its sha256 and the exact error line, stop.
FORBIDDEN: any change outside the one test line and the report; any change to toolCategories.ts that is committed; poll task; cron; printing an environment value.

END · NOTICE-PR627-PIN-FIX-S161-1
