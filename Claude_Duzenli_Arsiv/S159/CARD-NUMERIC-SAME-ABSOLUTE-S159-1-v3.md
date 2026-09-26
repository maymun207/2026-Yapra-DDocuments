<!-- relay-audit: v1 kind=card -->
CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v3

LANE: AG-4 (fresh window; one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-26T15:51Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v2 (scout RED, SCOUT-STATUS-REVIEW-CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v2, bus 2026-09-26T15:46:18Z: re-scope CONFIRMED with the real module; four defects D1-D4, each a named edit). v3 = v2 plus exactly D1, D2, D3, D4, applied where each is named below; the scout's findings are credited to the scout (S112-YASA-1). Scout's follow-ups OUTSIDE this card, carried by name: space-grouped numbers ("1 250 000") read as three literals; multiplier words ("12,5 milyon", "1.250,5 bin") not applied -> F-S159-NUMERIC-SPACE-GROUP-AND-MULTIPLIER-WORDS-1, register S159.
OWNER APPROVAL: OWNER-APPROVAL-S159-PLAN-1, the owner's words "1-) onayliyorum" (2026-09-26 18:20 TSI) to the S159 plan whose step 3 is this card; OWNER-RULING-S153-NO-ARMES-HARDCODE-1. Register item 95, re-scoped by measurement (see PREMISE).
ADVERSARY GATE: EXEMPT for this re-cut only, the loop-breaking case of project instruction 12.1: v3 repeats v2's subject and applies the scout's own complete delta to GREEN (D1-D4) and nothing else; OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; the S157 practice recorded in bootstrap v159 (RED with complete delta -> apply, EXEMPT). No v4 without a new subject.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 6eae55ce-37b1-4774-b634-f4eda09f421e
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v2 (scout from_lane row, 2026-09-26T15:46:18Z), whose complete delta D1-D4 this body applies verbatim
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
| same() has a SECOND call site, exemption (a), with the same relative-tolerance hole | MEASURED: git show on origin/master, Architect bridge, 2026-09-26T15:51Z (scout D3 found it; re-read here) | callsites |
| a whole-measurement toEqual or a typed literal in FOUR test files must gain the new field | READ: SCOUT-STATUS-REVIEW-CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v2 step 2(c), scout plant at master, 2026-09-26T15:46Z | plant |
| grounding/ and stageStream.ts are untouched by the PR that moved master after v2 | MEASURED: git diff --name-only 6e385480d0aecce6a3e8d65ae732b4049c75a1a8..2a6f6781b1a4748aac5f5bc7b1d73136863b1c35, Architect bridge, 2026-09-26T15:51Z | drift |

```evidence:master
6e385480d0aecce6a3e8d65ae732b4049c75a1a8
```

```evidence:drift
MEASURED: git diff --name-only 6e385480d0aecce6a3e8d65ae732b4049c75a1a8..2a6f6781b1a4748aac5f5bc7b1d73136863b1c35
api/cwf/__tests__/pathBTokenizerSplitBeforeFold.test.ts
api/cwf/_lib/pathB/bm25.ts
api/cwf/_lib/vectorLane/encoder.ts
docs/ground/facts.json
docs/relay/A24-P20-TOKENIZER-S158-1-AG2-report.md
public/architecture/diagrams/architecture-map.html
public/architecture/manifest.json
master now 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (PR 621); every line anchor below re-read there byte-equal to 6e385480d0aecce6a3e8d65ae732b4049c75a1a8
```

```evidence:callsites
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:256:    const queryValues = textLiterals(query ?? '').flatMap((l) => l.readings.map((r) => r.value));
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:261:        if (lit.readings.some((r) => queryValues.some((q) => same(q, r.value)))) continue;
6e385480d0aecce6a3e8d65ae732b4049c75a1a8:api/cwf/_lib/grounding/numericLedger.ts:262:        if (!isSourced(lit, ledger)) unsourced.add(canonical(lit));
```

```evidence:plant
READ: scout plant at master = type field + measure/UNMEASURED + exactly the seven groundingCheck literals
vitest: 11 FAILED / 86 passed. numericLedger.test.ts 9 fail (toEqual on the whole measurement): :36,:41,:45,:49,:64,:71,:77,:143,:184. numericLedgerToolsWiring.test.ts 2 fail at :101.
tsc -p tsconfig.api.test.json: 9 x TS2345 "Property 'claims' is missing": numericLedger.test.ts:216,217,218,223,225,230,231 (literals at :213,:217,:218) and numericStampStream.test.ts:109,121 (literal ONE at :95).
groundingCheck.test.ts whole-verdict literals = EXACTLY 7, lines 86,250,260,303,307,311,315. memoryGroundingIsolation.test.ts:188 verdict-to-verdict, green under plant.
plant same(a,b,d)=|a-b|<=0.5*10^-d at :229 only: 97/97 green; falsifiers flip to unsourced 1; rules (i)-(iv) collisions NONE; %95,84 vs 95,8412 control stays sourced.
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
MEASURED: npx tsx run.ts (a copy of numericLedger.ts's logic lines with comments removed, NOT the source bytes); REPRODUCED by the scout with the real module at master (step 2(a), same eight ledger entries, same four outputs); the exact input bytes are in evidence:bytes
LEDGER entries from source window: 01.01.2025=>1012025  30.09.2025=>30092025  71314=>71314  31.12.1958=>31121958  1.000.000.000=>1000000000  514.778.660,51=>514778660.51  4=>4  1=>1
ANSWER2 literals: 01.01.2025 · 30.09.2025 · 1.000.000.000=>1000000000 (decimals 0) · 514.778.660,51=>514778660.51 (decimals 2) · 2025
MEASURE answer2 (real): {"unsourced":0,"values":[]}
FALSIFIER tavan+1 (1.000.000.001): {"unsourced":0,"values":[]}
FALSIFIER cikarilmis+1 (514.778.661,51): {"unsourced":1,"values":["514.778.661,51"]}
FALSIFIER kurus+1 (514.778.660,52): {"unsourced":0,"values":[]}
EMPTY LEDGER (present, empty): {"unsourced":2,"values":["1.000.000.000","514.778.660,51"]}
```

```evidence:bytes
READ: production DB project fjbrkimwvtpwoxhziidh, table messages, the assistant row of 2026-09-26T13:48:38Z (trace 8e835445ffe7e3ff51931641f7f868b3): content = ANSWER below, verbatim; raw_tool_results[0].raw characters 6339..6859 = SOURCE WINDOW below, verbatim (the lane may re-read the row; the bytes here are the fixture)
ANSWER sha256 70fe280c360247c8c1f21772730db7c424c53207b7f0309210abcbe3129385be
Kaleseramik A.Ş.'nin 01.01.2025 – 30.09.2025 dönemine ait Faaliyet Raporu'nda yer alan bilgilere göre:

*   **Kayıtlı Sermaye Tavanı:** 1.000.000.000 TL
*   **Çıkarılmış Sermaye:** 514.778.660,51 TL

Bu bilgiler "Kaleseramik Faaliyet Raporu - 2025" dokümanının "GENEL BİLGİLER" bölümünden alınmıştır.
SOURCE WINDOW sha256 7d7c3f570424c071c927e94b7ecbe42616d5489bc7661fbef83ffcc71c484b7f
LGİLER
GENEL BİLGİLER

a- Şirket Bilgileri
Raporun İlgili Olduğu
Hesap Dönemi : 01.01.2025 – 30.09.2025
Ticaret Unvanı : Kaleseramik, Çanakkale Kalebodur Seramik Sanayi A.Ş
Ticaret Sicil Numarası : 71314
Kuruluş Tarihi : 31.12.1958
Kayıtlı Sermaye : 1.000.000.000 TL
Çıkarılmış Sermaye : 514.778.660,51 TL
Şirket Merkez Adresi : Levent Mh., Prof. Ahmet Kemal ARU Sk. No:4 İç Kapı No:1
Beşiktaş/İSTANBUL
İnternet Sitesi Adresi : www.kale.com.tr
b- Adresler
Merkez : Levent Mh. Prof. Ahmet Kemal Aru Sk. 4/1 Beşiktaş / İST
QUERY sha256 6c8e51ffd54c58b3a6e36cbccaf5ace6d0dd61d03c45e2d28e484ff23dc26e8b
Kaleseramik A.Ş.'nin 30.09.2025 tarihi itibarıyla Kayıtlı Sermaye Tavanı ve Çıkarılmış Sermaye tutarları ne kadardır?
```

## PREMISE
MEASURED: the anchors above. UNMEASURED by the Architect and READ from the scout: everything in evidence:plant. The scout's reproduction in step 2(a) is the measurement behind the re-scope.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## THE PROBLEM, IN PLAIN WORDS
S158 filed F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1 because the grounding span printed numericValues [] for an answer carrying 1.000.000.000 TL and 514.778.660,51 TL. Measured in S159: that reading was CORRECT — numericValues lists UNSOURCED numbers only, the extractor read both Turkish-formatted numbers and found both in the tool bytes. The finding's premise is withdrawn (SUPERSEDED-BY F-S159-NUMERIC-SAME-RELATIVE-TOLERANCE-1). Two real defects sit beside it: (1) same() at numericLedger.ts:219 uses a RELATIVE tolerance of 1e-9 of the claim, so at 1e9 a difference of 1 TL passes as equal and above about 1e7 a one-kurus difference passes as equal — a wrong billion-scale figure would have gone unflagged; the design rule (S150 ORDER 3 (iii): a claim with d decimals matches a ledger value ROUNDED to d) already implies exact equality on the rounded grid, so the relative tolerance is an implementation slip, not a design. (2) The span prints no TOTAL of numeric claims examined, so "0 unsourced" is byte-identical to "0 numbers seen" — exactly the ambiguity that produced the false finding (empty != zero, at the span).

## FALSIFIER
On the bytes in evidence:bytes (ANSWER, SOURCE WINDOW and QUERY, verbatim; the fixture of ORDER 3 holds exactly those bytes and their sha256 lines): the unmodified answer measures unsourced 0 and claims 2; 1.000.000.001 measures unsourced 1 listing exactly that literal; 514.778.660,52 measures unsourced 1 listing exactly that literal; an empty ledger measures unsourced 2. A change that makes any existing numeric test red, or that flags a claim the current rules source (rule (i) both readings, (ii) percent x100 and /100, (iii) rounding to d, (iv) ranges), is wrong: STOP and report the collision. Plant: restore the relative tolerance and show the two falsifiers go green-when-they-should-be-red; remove the plant.

## ORDERS
1. same() becomes exact on the rounded grid at BOTH call sites (callsites anchor): compare two values already rounded to d decimals with an ABSOLUTE tolerance of half a unit of that grid (0.5 * 10^-d), never a relative one. At isSourced (:229) d = the claim reading's decimals, as today. At exemption (a) (:261) d = the answer reading's decimals (r.decimals); d = 0 is FORBIDDEN there (it widens the exemption: query 3 would exempt 4). One test pins :261: query "1.000.000.000", ledger empty, answer "1.000.000.001 TL" -> unsourced 1 listing exactly that literal. Signature is yours; behaviour of rules (i)-(iv) unchanged.
2. The measurement carries a TOTAL: NumericMeasurement gains `claims: number | null` = the number of distinct non-exempt numeric claims examined (null when unmeasured, i.e. NUMERIC_UNMEASURED); the cwf.grounding span output gains `numericClaims` beside numericClaimsUnsourced (stageStream.ts:617). types.ts doc comment updated in the same voice. Amend EXACTLY these literals and nothing wider (scout D2, measured under plant): groundingCheck.test.ts whole-verdict literals at :86, :250, :260, :303, :307, :311, :315 (add `claims: null`); numericLedger.test.ts whole-measurement literals at :36, :41, :45, :49, :64, :71, :77, :143, :184 (add the measured `claims` value) and typed literals at :213, :217, :218 (add `claims`); numericLedgerToolsWiring.test.ts :101; numericStampStream.test.ts :95. memoryGroundingIsolation.test.ts stays unedited and green. Any literal OUTSIDE this list that fails: STOP and name it.
3. Tests, in numericLedger.test.ts or a new file beside it, with a fixture file holding the ANSWER, SOURCE WINDOW and QUERY bytes of evidence:bytes (the file's sha256 lines reproduce the three sha256 values printed there): the four FALSIFIER cases, plus one scale case (ledger text "5.000.000.000 TL", claim "5.000.000.001 TL" -> unsourced 1) and one float-noise control (ledger "95,8412", claim "%95,84" -> sourced). Print vitest counts per file: numericLedger (27 today by vitest; the it( grep says 25) + your additions, numericLedgerToolsWiring 4, numericStampStream 7, groundingCheck, memoryGroundingIsolation — all green.
4. npm run build (all five gates) + full suite + typecheck:api locally; reseal only if check:doc-drift asks, in the same commit; if check:ground asks for a facts restamp, do it and name it. Report with the complete FILE-FENCE in the FIRST commit; PR non-draft; slip SLIP-NUMERIC-SAME-ABSOLUTE-S159-1 (branch, full head, PR number, CI by full sha read twice if zero, guard VERDICT line, test counts). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/grounding/numericLedger.ts
- api/cwf/_lib/grounding/types.ts
- api/cwf/_lib/turn/stageStream.ts (one output field at the span output; nothing else)
- api/cwf/__tests__/groundingCheck.test.ts (exactly the seven literals named in ORDER 2)
- api/cwf/__tests__/numericLedger.test.ts (the twelve literals named in ORDER 2, plus new tests) and/or one new test file beside it
- api/cwf/__tests__/numericLedgerToolsWiring.test.ts (the one literal at :101)
- api/cwf/__tests__/numericStampStream.test.ts (the one literal at :95)
- api/cwf/__tests__/__fixtures__/ (one new fixture file)
- docs/relay/NUMERIC-SAME-ABSOLUTE-S159-1-AG4-report.md
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/ground/facts.json (only if check:ground requires a restamp)
```

## DECISION RIGHTS
AG-4 chooses the helper's name and signature, the fixture file layout and the test file name. The Architect decided: absolute half-grid tolerance at both call sites, d per reading, never 0 at exemption (a); a total-claims field that is null when unmeasured; the literal list of ORDER 2 and nothing wider. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no new GroundingViolationKind; no change to ok/violations; no change to rules (i)-(iv); no rewrite of the model's text; no backend, vendor or tenant name in code or fixtures (AGNOSTIC-1); no removal of a user-visible function; no merge; no adversary/scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v3
