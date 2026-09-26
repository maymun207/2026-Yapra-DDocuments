<!-- relay-audit: v1 kind=card -->
CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v1

LANE: AG-4
FROM: Architect, S158, 2026-09-26T03:10Z
OWNER: "Ne zaman bu urun bu soruya ADAM gibi DOGRU ve ANLAMLI bir cevap verebilecek" (2026-09-23 14:32 TSI); the capital-ceiling question answered with TL amounts on 2026-08-18 12:30Z and refused on every ask since.
NO POLL OR CRON TASK.

## PREMISE
MEASURED: turn_trace_digest 2026-09-26T02:58Z (the owner's re-ask after governed rows landed): stage 07 register-tools output path=semantic, basis=frame, irFrame {action QUERY_MASTER, object SYSTEM, confidence HIGH}, matchedCategories [admin]; no machine-knowledge-base tool offered; stage 10 toolCalls 0; the model refused with the NEW b1_scope v4 refusal text (so the prompt rows are live).
MEASURED: domain_rules machine-knowledge-base.tool_category v2 PUBLISHED 2026-09-23T11:50Z with keywords incl. sermaye, kayitli sermaye, cikarilmis sermaye, faaliyet raporu, yonetim kurulu, personel sayisi.
READ (owner clone, api/cwf/_lib/toolCategories.ts ~1500-1610 and routing/deriveCategories.ts MATRIX ~63-95): on the semantic path the keyword matcher is never consulted; when frameRouting is on and the frame is HIGH, `matchedCats = new Set(derived.categories)` REPLACES the set. The MATRIX is a closed action x object table over the MES categories; no cell can ever name machine-knowledge (or any category of a backend the IR does not model). So a document backend is unreachable by construction whenever the frame is confident, whatever its governed keywords say.
READ: the sticky union below already calls matchCategories(lastPriorMessage, learnedMappings, categories) — the deterministic keyword matcher exists and is already called on the frame path, just not on the CURRENT message.

## ORDERS
1. In filterToolsByMessage (toolCategories.ts), after the frame/union decision and before the sticky union: compute kw = matchCategories(userMessage, learnedMappings, categories). Union into matchedCats every category in kw that is NOT in the frame matrix's category universe (export from deriveCategories.ts a derived set = every category named in any MATRIX cell; derive it from MATRIX, never a literal list). Categories the matrix does model stay exactly as the frame decided (the frame's authority over MES categories is unchanged).
2. Record the additions as their own field `unmodeledAdded: string[]` on the return value and the stage-07 span output (FULL-TRACE), beside stickyAdded; [] when none. Do not change `basis`.
3. No literal backend or category name in code (OWNER-RULING-S153-NO-ARMES-HARDCODE-1); the rule is structural: "a category the IR matrix cannot name is never removed by the frame".
4. Tests, failing-first: (a) HIGH frame QUERY_MASTER x SYSTEM + message containing a governed keyword of a category outside the matrix universe -> that category is in matchedCats and in unmodeledAdded; (b) same message with a matrix-universe keyword (e.g. a metrics keyword) -> set byte-identical to today; (c) frameRouting off -> byte-identical to today; (d) the universe set is derived from MATRIX (mutating a test copy of MATRIX changes it).
5. npm run build (all gates) and the suite; branch from origin/master, ONE PR, no-ff, report with FILE-FENCE at docs/relay/FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-AG4-report.md. The report follows the landing, never gates it.
6. Slip SLIP-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1 (laneSlip, AG-4).

## FALSIFIER
If matchCategories on the current message would NOT return the machine-knowledge category for the question above with the v2 keywords (print what it returns in test a using the governed row's keywords), STOP and print it: the fix is then elsewhere.
If the change alters matchedCats for any existing golden/route fixture whose message has no out-of-matrix keyword, STOP.

## SHARED SURFACES
```scope
- api/cwf/_lib/toolCategories.ts
- api/cwf/_lib/routing/deriveCategories.ts
- api/cwf/_lib/turn/stageTools.ts (span field only)
- api/cwf/__tests__/** (new tests)
- public/architecture/manifest.json and architecture-map.html (reseal, build-regenerated only)
- docs/relay/FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-AG4-report.md
```

END · CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v1
