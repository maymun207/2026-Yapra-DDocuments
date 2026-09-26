<!-- relay-audit: v1 kind=card -->
CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v2

LANE: AG-4 (fresh window; one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-26T15:24Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v1 (never dispatched; v2 = v1 with the owner's actual approval words, nothing else).
OWNER APPROVAL: OWNER-APPROVAL-S159-PLAN-1, the owner's words "1-) onayliyorum" (2026-09-26 18:20 TSI) to the S159 plan whose step 3 is this card; OWNER-RULING-S153-NO-ARMES-HARDCODE-1. Register item 95, re-scoped by measurement (see PREMISE).
ADVERSARY GATE: NOT lifted. New subject: this card goes to the scout first (project instruction 12.1); the evidence:adversary block below is filled from the scout's GREEN row before dispatch.

```evidence:adversary
ADVERSARY: PENDING
ack: (scout GREEN row id, filled before dispatch)
basis: new subject, scout review required (12.1)
```
BRANCH: phase/numeric-same-absolute-s159-1 off origin/master · PUSH early · REPORT docs/relay/NUMERIC-SAME-ABSOLUTE-S159-1-AG4-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: Vercel production deployment list (latest READY) + refs/remotes/origin/master in the shared clone, Architect bridge, 2026-09-26T14:55Z | master |
| same() compares with a RELATIVE tolerance, 1e-9 of the claim, after both sides are rounded to the claim's decimals | MEASURED: git show on origin/master, Architect bridge, 2026-09-26T15:20Z | same |
| the measurement returns only the unsourced count and list; no total of claims examined reaches the span | MEASURED: git show on origin/master, Architect bridge, 2026-09-26T15:20Z | measure |
| the span output carries numericClaimsUnsourced and numericValues only | MEASURED: git grep on origin/master, Architect bridge, 2026-09-26T15:20Z | span |
| the verdict type forbids an absent numeric key; seven whole-verdict literals in groundingCheck.test.ts carry the numeric shape | MEASURED: git grep on origin/master, Architect bridge, 2026-09-26T15:20Z | literals |

```evidence:master
6e385480d0aecce6a3e8d65ae732b4049c75a1a8
```

```evidence:same
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:213:function roundTo(x: number, d: number): number {
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:218:function same(a: number, b: number): boolean {
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:219:    return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:222:function isSourced(claim: TextLiteral, ledger: readonly NumericLedgerEntry[]): boolean {
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:225:        const target = roundTo(c.value, c.decimals);
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:229:                    if (same(roundTo(l.value * s, c.decimals), target)) return true;
```

```evidence:measure
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:250:export function measureNumericClaims(
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:265:    return { unsourced: values.length, values: values.slice(0, NUMERIC_VALUES_MAX) };
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/types.ts:142:export interface NumericMeasurement {
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/types.ts:143:    unsourced: number | null;
```

```evidence:span
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/turn/stageStream.ts:610:            const numeric = verdict.numeric ?? NUMERIC_UNMEASURED;
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/turn/stageStream.ts:617:                    numericClaimsUnsourced: numeric.unsourced,
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/turn/stageStream.ts:618:                    numericValues: numeric.values,
```

```evidence:literals
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/types.ts:127:     * `unsourced: null`, never by the key being missing.
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/types.ts:129:    numeric: NumericMeasurement;
MEASURED: git grep -c 'numeric: { unsourced: null, values: [] }' origin/master -- api/cwf/__tests__/groundingCheck.test.ts
7
MEASURED: git grep -c -E '^\s*(it|test)\(' origin/master -- numericLedger.test.ts numericLedgerToolsWiring.test.ts numericStampStream.test.ts
25 4 7
```

```evidence:run
MEASURED: npx tsx run.ts (a copy of numericLedger.ts's logic lines with comments removed, NOT the source bytes; the lane reproduces with the real module in ORDER 3)
LEDGER entries from source window: 01.01.2025=>1012025  30.09.2025=>30092025  71314=>71314  31.12.1958=>31121958  1.000.000.000=>1000000000  514.778.660,51=>514778660.51  4=>4  1=>1
ANSWER2 literals: 01.01.2025 · 30.09.2025 · 1.000.000.000=>1000000000 (decimals 0) · 514.778.660,51=>514778660.51 (decimals 2) · 2025
MEASURE answer2 (real): {"unsourced":0,"values":[]}
FALSIFIER tavan+1 (1.000.000.001): {"unsourced":0,"values":[]}
FALSIFIER cikarilmis+1 (514.778.661,51): {"unsourced":1,"values":["514.778.661,51"]}
FALSIFIER kurus+1 (514.778.660,52): {"unsourced":0,"values":[]}
EMPTY LEDGER (present, empty): {"unsourced":2,"values":["1.000.000.000","514.778.660,51"]}
```

## PREMISE
MEASURED: the anchors above. The run in the unanchored evidence:run fence (Architect container, 2026-09-26T15:12Z, the module's logic on the answer bytes and the source bytes read from production messages and raw_tool_results) is the measurement behind the re-scope; it is reproduced by ORDER 3 with the real module.
THE PROBLEM, in plain words. S158 filed F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1 because the grounding span printed numericValues [] for an answer carrying 1.000.000.000 TL and 514.778.660,51 TL. Measured in S159: that reading was CORRECT — numericValues lists UNSOURCED numbers only, the extractor read both Turkish-formatted numbers and found both in the tool bytes. The finding's premise is withdrawn (SUPERSEDED-BY F-S159-NUMERIC-SAME-RELATIVE-TOLERANCE-1). Two real defects sit beside it: (1) same() at numericLedger.ts:219 uses a RELATIVE tolerance of 1e-9 of the claim, so at 1e9 a difference of 1 TL passes as equal and above about 1e7 a one-kurus difference passes as equal — a wrong billion-scale figure would have gone unflagged; the design rule (S150 ORDER 3 (iii): a claim with d decimals matches a ledger value ROUNDED to d) already implies exact equality on the rounded grid, so the relative tolerance is an implementation slip, not a design. (2) The span prints no TOTAL of numeric claims examined, so "0 unsourced" is byte-identical to "0 numbers seen" — exactly the ambiguity that produced the false finding (empty != zero, at the span).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
On the bytes in evidence:run (answer bytes of the assistant message of 2026-09-26T13:48:38Z, source window of its raw_tool_results, quoted verbatim in the report from the DB by the Architect if you cannot read production): the unmodified answer measures unsourced 0 and claims 2; 1.000.000.001 measures unsourced 1 listing exactly that literal; 514.778.660,52 measures unsourced 1 listing exactly that literal; an empty ledger measures unsourced 2. A change that makes any existing numeric test red, or that flags a claim the current rules source (rule (i) both readings, (ii) percent x100 and /100, (iii) rounding to d, (iv) ranges), is wrong: STOP and report the collision. Plant: restore the relative tolerance and show the two falsifiers go green-when-they-should-be-red; remove the plant.

## ORDERS
1. same() becomes exact on the rounded grid: compare two values already rounded to the claim's d decimals with an ABSOLUTE tolerance of half a unit of that grid (0.5 * 10^-d), never a relative one. Signature and call site (isSourced) are yours; behaviour of rules (i)-(iv) unchanged.
2. The measurement carries a TOTAL: NumericMeasurement gains `claims: number | null` = the number of distinct non-exempt numeric claims examined (null when unmeasured, i.e. NUMERIC_UNMEASURED); the cwf.grounding span output gains `numericClaims` beside numericClaimsUnsourced (stageStream.ts:617). types.ts doc comment updated in the same voice. Amend EXACTLY the seven whole-verdict literals in groundingCheck.test.ts (add `claims: null`), nothing else in that file; memoryGroundingIsolation.test.ts stays unedited and green; if any other literal fails, STOP and name it.
3. Tests, in numericLedger.test.ts or a new file beside it, with a fixture file holding the answer bytes and the source window bytes: the four FALSIFIER cases, plus one scale case (ledger text "5.000.000.000 TL", claim "5.000.000.001 TL" -> unsourced 1) and one float-noise control (ledger "95,8412", claim "%95,84" -> sourced). The seven existing groundingCheck literals, numericLedger 25, numericLedgerToolsWiring 4, numericStampStream 7 all green.
4. npm run build (all five gates) + full suite + typecheck:api locally; reseal only if check:doc-drift asks, in the same commit; if check:ground asks for a facts restamp, do it and name it. Report with the complete FILE-FENCE in the FIRST commit; PR non-draft; slip SLIP-NUMERIC-SAME-ABSOLUTE-S159-1 (branch, full head, PR number, CI by full sha read twice if zero, guard VERDICT line, test counts). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/grounding/numericLedger.ts
- api/cwf/_lib/grounding/types.ts
- api/cwf/_lib/turn/stageStream.ts (one output field at the span output; nothing else)
- api/cwf/__tests__/groundingCheck.test.ts (exactly the seven literals)
- api/cwf/__tests__/numericLedger.test.ts and/or one new test file beside it
- api/cwf/__tests__/__fixtures__/ (one new fixture file)
- docs/relay/NUMERIC-SAME-ABSOLUTE-S159-1-AG4-report.md
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/ground/facts.json (only if check:ground requires a restamp)
```

## DECISION RIGHTS
AG-4 chooses the helper's name and signature, the fixture file layout and the test file name. The Architect decided: absolute half-grid tolerance; a total-claims field that is null when unmeasured; the seven-literal amendment and nothing wider. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no new GroundingViolationKind; no change to ok/violations; no change to rules (i)-(iv); no rewrite of the model's text; no backend, vendor or tenant name in code or fixtures (AGNOSTIC-1); no removal of a user-visible function; no merge; no adversary/scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v2
