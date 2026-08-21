# PHASE-LEDGER-COMPLETE-1 — v1
**Lane: AG-1 · micro-phase (W-024 / BUG-028 şerh) · branch `phase/ledger-complete-1`**
**Authored by Architect, S85, under doctrine v1_3 D-9.3 (written while COLLISION-1 was still merging — the precondition below is the gate, not a calendar).**

## STANDING PRECONDITION (S47-1, machine-checkable — verify, then start; do NOT wait for a second relay)
1. `origin/master` first-parent contains the TOOL-NAME-COLLISION-1 merge:
   `git log origin/master --first-parent --grep 'TOOL-NAME-COLLISION-1' -1` is non-empty, AND `grep -q claimToolName api/cwf/_lib/turn/stageTools.ts` on origin/master succeeds. If either fails, WAIT (AG-2 is merging it) — do not build on the pre-collision tree: this phase touches the SAME file.
2. Soft expectation at start: master suite 487/5617 (CI-arbitrated; = 486/5606 post-CI-DIET + COLLISION's +1/+11), docVersion rev 206. Deviation = report, not adapt.
3. Fresh full clone (S61-1).

## WHY (verified at byte level this session, tree `ba05bb7`)
`recordToolCall` is the ONE seam through which a tool call reaches `persistRaw` AND the client stream (they cannot drift — its own doc says so). The time tool pays it (`stageTools.ts:1329`); `aggregate_records` (:1340) and `query_records` (:1345) execute WITHOUT it. Consequences, both live today: the turn ledger under-counts local-tool activity, and BUG-028's parity seal (header + Kanıt from ONE enumeration) cannot yet cover two of the three local tools — the W-024 şerh on the ARMED seal.

## CHANGES (exactly these; the smallest honest diff)
### C1 — `api/cwf/_lib/turn/stageTools.ts`: the two closures pay the seam
Mirror the time tool's own pattern (result computed → stringified → recorded → returned):
```ts
ctx.vercelTools[AGGREGATE_TOOL_NAME] = tool({
    description: AGGREGATE_TOOL_DESCRIPTION,
    inputSchema: jsonSchema(AGGREGATE_TOOL_JSON_SCHEMA as Record<string, any>),
    execute: async (args) => {
        const result = aggregateRecords(ctx.resultStore, args as any);
        recordToolCall(ctx, AGGREGATE_TOOL_NAME, args, JSON.stringify(result ?? null));
        return result;
    },
});
```
Same shape for `QUERY_TOOL_NAME`/`queryRecords`. Notes that are part of the contract, not style: `raw` must be a STRING — `?? null` guards `JSON.stringify(undefined)` returning undefined; args are scrubbed INSIDE recordToolCall (`scrubIoData`), do not pre-scrub; the ORIGINAL result object returns to the SDK, the stringified copy goes to the ledger (FULL-TRACE MANDATE: input+output on both planes, only secrets scrubbed).

### C2 — tests
1. `api/cwf` side: for each of the two closures, a test driving the execute path on a fixture ctx and asserting ONE `persistRaw` entry lands with the correct `toolName`, a string `raw`, and a `callId` — plus the negative direction (D-5): the entry count is exactly the calls made, no double-record.
2. Parity fixture (`src/lib/__tests__/counterOneSource.test.ts` family): extend the single-enumeration fixture with an `aggregate_records` and a `query_records` call; assert header count AND the Kanıt line both include them — the exact class BUG-028's seal will read in production.

## GUARDRAILS
- No other change in stageTools.ts — the collision machinery landed by AG-2 is untouchable in this phase; if your diff touches `claimToolName`/`toolNameCollisions`, STOP.
- doc-drift WILL trip (turn/** is mapped): expect a HASH-ONLY reseal, docVersion rev 206 → 207, "below diagram altitude, reseal not redraw". If your read says redraw, STOP and report.
- Merge `--no-ff`; tail anchor: merge waits for Architect GO (RULE-25 runs on your branch first — micro-phase or not).
- Touch counter (D-6): this prompt = touch 1 of 4.

## EVIDENCE PLAN
Pre-merge: unsharded CI green on the PR head (canary structurally absent on the PR plane); report suite delta (expected +2 to +4 tests; exact from CI). Post-merge proof read (S63-1), Architect-side: the BUG-028 seal's first natural local-tool turn now covers all THREE local tools — the W-024 şerh retires WITH the seal, read from telemetry by the Architect, no owner touch.

## SEAL INTERPLAY (recorded for the register)
This phase upgrades, not replaces, the ARMED BUG-028 seal: same trigger (first natural local-tool turn), stronger claim (ledger parity across the full local roster). BUG-012's seal (collisions=[]) is independent and unaffected.

<!-- END PHASE-LEDGER-COMPLETE-1-v1 · tail anchor: DO NOT MERGE WITHOUT ARCHITECT GO -->
