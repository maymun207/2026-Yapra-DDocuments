<!-- relay-audit: v1 kind=card -->
CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T03:27Z
SUPERSEDES: v1 (scout RED with a complete delta D1..D6, design sound: SCOUT-STATUS-REVIEW-CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v1, bus 2026-09-26T03:21:52Z). v2 = v1 plus D1..D6 applied verbatim, each marked (Dn). Scout credit: H1..H5, D1..D6.
OWNER: "Ne zaman bu urun bu soruya ADAM gibi DOGRU ve ANLAMLI bir cevap verebilecek" (2026-09-23 14:32 TSI). OWNER-RULING-S153-NO-ARMES-HARDCODE-1. No functionality removed.
ADVERSARY GATE: EXEMPT, named: v2 repeats v1's subject and applies only the scout's complete delta (loop-breaking case, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1, project instructions 12.1).

```evidence:adversary
ADVERSARY: EXEMPT
ack: 46bb77f1-ee3f-4669-ade5-e807e9175de7
```
NO POLL OR CRON TASK.

## PREMISE
MEASURED: execute_sql over turn_trace_digest at 2026-09-26T03:00Z (the owner's 02:58Z re-ask): stage 07 path=semantic, basis=frame, irFrame QUERY_MASTER x SYSTEM HIGH, matchedCategories [admin]; no knowledge_* tool offered; stage 10 toolCalls 0; the refusal carries the b1_scope v4 text.
MEASURED: git grep -n origin/master -- api/cwf/_lib/toolCategories.ts api/cwf/_lib/routing/deriveCategories.ts (scout, 2026-09-26T03:2xZ) — toolCategories.ts:1532-1546 semantic success sets matchedCats from the router; matchCategories only on :1550 and :1557; :1600-1603 HIGH replace; :1605 AMBIGUOUS union; deriveCategories.ts:63-94 MATRIX universe = {andon, machine, factory, metrics, production, material, transfer, logistics, employee, quality, linestop, admin}; the only published category outside it is machine-knowledge.
MEASURED: offline replay of matchCategories by the scout (2026-09-26T03:2xZ) over all 19 capital-ceiling asks in public.messages returns {machine-knowledge} and no MES category. Your test (a) is the authoritative print.
SELF-INVALIDATION: dies if origin/master moves by a commit touching api/cwf/_lib/toolCategories.ts or api/cwf/_lib/routing/deriveCategories.ts; then re-read those lines and print both.
ON-DISAGREEMENT: YOUR READING WINS; print both values and continue with yours.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the HIGH frame replaces the router's categories and the matrix cannot name machine-knowledge | READ: git grep origin/master api/cwf/_lib/toolCategories.ts api/cwf/_lib/routing/deriveCategories.ts | the-seam |
| the owner's re-ask offered no knowledge tool and made 0 tool calls | MEASURED: execute_sql turn_trace_digest 2026-09-26T02:58Z | the-seam |

```evidence:the-seam
toolCategories.ts:1600-1603  matchedCats = new Set(derived.categories); basis = 'frame';
deriveCategories.ts:63-94    MATRIX cells name only {andon, machine, factory, metrics, production, material, transfer, logistics, employee, quality, linestop, admin}
stage 07 02:58Z               basis=frame matchedCategories=[admin]; stage 10 toolCalls=0
```

## DECISION RIGHTS
The lane decides the code shape inside the fence. The lane does NOT decide: editing any governed keyword row, changing the MATRIX, or widening the fence; those STOP and slip.

## ORDERS
1. (D1) In filterToolsByMessage, ONLY when basis === 'frame' (the one branch that removes), after the frame block and before the sticky union: compute kw = matchCategories(userMessage, learnedMappings, categories) and union into matchedCats every category of kw that is NOT in the frame matrix's category universe (export from deriveCategories.ts a set derived from MATRIX, never a literal list). Categories inside the universe stay exactly as the frame decided. Union and keyword turns stay byte-identical.
1b. (D2) Before the HIGH replace, capture preFrame = the set matchedCats held. After the replace, re-add every category of preFrame that is NOT in the matrix universe. Record them as unmodeledKept.
2. (D3) Fields unmodeledKept and unmodeledAdded (only categories NOT already in matchedCats, like stickyAdded); both [] when none; both on the return value, the stage-07 span, the [Route] log line, AND the stageTools.ts:671 empty-result literal. Do not change basis.
3. No literal backend or category name in code; the rule is structural: a category the IR matrix cannot name is never removed by the frame.
4. Tests, failing-first: (a) HIGH QUERY_MASTER x SYSTEM + the capital-ceiling question with the real v2 keywords -> machine-knowledge in matchedCats and in unmodeledAdded; print what matchCategories returns; (b) matrix-universe keyword -> set byte-identical to today; (c) frameRouting off -> byte-identical; (d) the universe set is derived from MATRIX (mutating a test copy changes it); (D4e) HIGH QUERY_METRIC x EQUIPMENT + "Press makinesinde kac parametre tanimlidir" with the REAL v2 keywords -> machine-knowledge in unmodeledAdded and the MES set equals derived.categories exactly; (D4f) basis 'union' and basis 'keyword' (semantic path, frame unmapped) byte-identical; (D4g) HIGH frame with semResult.matched containing an out-of-universe category -> kept, in unmodeledKept; (D4h) "Kaleseramik'in sermayesi ne kadar" + no semantic pick -> unmodeledAdded [] (pins inflection blindness as known, not fixed).
5. (D5) The report prints the leak measurement re-derived by you (last 30 days: messages gaining the category, those also co-matching an MES category, firing keyword counts) and names the overlap keywords [makine, parametre, enerji, bilgi, rapor, personel sayisi, faaliyet raporu] as a governed-data hygiene item for a separate Operator card. No keyword edit in this card. Name the rejected alternative (archiving the category row -> MKB offered on every filtered turn).
6. npm run build (all gates) and the suite; branch from origin/master, ONE PR, no-ff, report with a FILE-FENCE complete in its FIRST commit (include every build-regenerated path you will commit) at docs/relay/FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-AG4-report.md. The report follows the landing, never gates it.
7. (D6) ACCEPTANCE after landing (report, not gate): one owner re-ask; stage 07 offeredToolNames contains a knowledge_* tool and unmodeledAdded/Kept contains machine-knowledge; stage 10 toolCalls >= 1. If tools are offered and toolCalls is 0, say so.
8. Slip SLIP-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1 (laneSlip, AG-4). If refused, print it and the exact error line and stop.

## FALSIFIER
If the change alters matchedCats for any existing golden/route fixture whose message has no out-of-matrix keyword, STOP and print it.

## SHARED SURFACES
```scope
- api/cwf/_lib/toolCategories.ts
- api/cwf/_lib/routing/deriveCategories.ts
- api/cwf/_lib/turn/stageTools.ts (span fields + the :671 empty-result literal)
- api/cwf/__tests__/** (new tests)
- public/architecture/manifest.json and architecture-map.html, facts.json (build-regenerated only)
- docs/relay/FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-AG4-report.md
```

END · CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v2
