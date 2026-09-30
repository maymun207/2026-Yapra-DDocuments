SLIP-CARD-M1B-ISERROR-READERS-S164-1

card: CARD-M1B-ISERROR-REMAINING-READERS-S164-1
branch: phase/m1b-iserror-readers-s164-1
head: 3c44ed752de5949958ea25f928d8c9b76f5a87cf
parent: 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (master; ls-remote twice before the branch and once before the push, unmoved; equal to the card's value)
report: docs/relay/M1B-ISERROR-READERS-S164-1-AG4-report.md
ci: UNMEASURED no PR by order; check-runs by the full head sha total_count=0
status: PUSHED
pr: NONE (queue M2 → K41 → POST-LANDING-1 → M1B)

## Receipt
mail-wait --read --take: DIGEST-OK, SEAL admitted (ack 1341d78b-9ae4-4e8c-91ca-0f4a6357a3b7), [STAMPED].
The card grammar refused the card (CP-1, CP-3, CP-4, CP-9, CP-10) under CARD_GATE=REPORT: REPORTED, not acted on.

## Where the measurement differs from the card
entityDiscoverySync.ts:389 and gatewayEnumerate.ts:143/:160 are NOT callers of executeMCPTool. They call the SDK's `client.callTool` directly. Three lenses agree: graft callers (1 non-test caller), graft grep executeMCPTool (135 hits, none in either file), and graft grep callTool (the two sites at exactly those lines). The fix reads the SDK result's own `isError` there. executeMCPTool's signature is untouched.

## Callers table
| reader | before | action |
|---|---|---|
| stageTools executeThroughBackendSlot (stage 07) | verdict read (M1) | left alone |
| examScorers.readResult | re-classified stored bytes, no verdict | FIX: carried verdict → transportError |
| entityDiscoverySync.callOnce (SDK) | parsed text as entities | FIX: → existing catch (warn + failed, observedParents []) |
| gatewayEnumerate search_tools (SDK) | parsed text as tool page | FIX: → existing errors[] |
| gatewayEnumerate get_instance_info (SDK) | stored text as instanceInfo | FIX: → existing errors[] |
| toolBehaviorCensus.probeOnce (SDK) | observeToolResult reads isError (toolBehaviorRecord.ts:241) | already honours it — left alone |

## Judgement to review (the carry)
The exam record had no verdict field, so per ORDER 3 the verdict is carried from stage 07:
- PersistRawEntry gains an optional `isError?: true`, written only when true, so existing rows and fixtures are byte-identical.
- recordToolCall gains an optional 5th arg; the persisted entry and the streamed frame both get it.
- The ONE stage-07 recording call (stageTools :2051) passes `outcome?.isError === true`. That is the same outcome M1 already classifies a few lines earlier.
M1's classification block has no changed line. I read "touching stage 07's M1 path" as the classification. If the Architect reads it more widely, this one argument is the line in question.
The client (cwfService.ts) picks named frame fields, so the UI is unchanged.

## Tests (each proven red by a planted fault in the guarded code, then restored)
- M1B-1 examScorers: isError → 'error'; the same bytes without it → 'content'; honesty in scope vs out of scope. Planted: 2 red.
- M1B carry: recordToolCall (persisted + streamed; no key on success), and mcpIsErrorPassthrough through the REAL stageRegisterTools (errOutcome → stored isError; okOutcome → no key).
- M1B-2 discovery: isError → upserts [] + the existing failure line; CONTROL: same bytes → 1 row. Planted: red.
- M1B-3 enumerate: isError → tools [], instanceInfo absent, errors = sweep+1. Planted: red.
- The existing M1 tests (mcpIsErrorPassthrough) stay green: 9/9, run outside the sandbox (loopback socket).

## Gates
- npm run build: the first run had doc-drift RED on 5 tabs (from the stageTools edit). `npm run reseal` in the same commit gave b11e12925f45 / 480df1937617 / 1ec08bcf0965 / 8d6c4de44cee / 320a94e7e199, each equal to the gate's "got". Rebuild: `[check:ground] GREEN`, `[check:doc-drift] [OK] no drift`.
- typecheck:api → exit 0, no output
- check:rule24 → `[OK] no literal NUL in 2393 tracked source files`
- check:tenant-zero → `[OK] ZERO gated-vocabulary hits in scope — 2346 files scanned`
- check:migration-versions → `[OK] 100 migration(s), every version key unique and 14-digit`
- check:backend-names → `[OK] every (id, class) count equals ...baseline.json.` The first run was RED because my M1B-3 test copied a backend-named label; I REMOVED the name and did not rewrite the baseline.
- relay corpus (relayAuditGate over docs/relay/) → 37/37; report:check → `[OK] 30 report(s) conform`
- touched suites: 5 files, 131/131
- full suite in the sandbox: 11571 passed | 16 failed, all listen EPERM. Those 5 files outside the sandbox: 124/124.

## Named
- The full run rewrote the measuredAt line of authority-conformance.latest.md (side effect). It was restored and is not in the commit.
- Not touched: executeMCPTool's signature, toolResultClass.ts, any table, migration or knob. No PR, no force push, no cron, no environment value printed.

read relay_inbox at 2026-09-30T04:33:00Z, box empty
