<!-- relay-audit: v1 kind=card -->
CARD-ENTRY-FLOOR-REQUIRED-S161-1-v1

LANE: AG-4 (fresh window AFTER the AntiGravity relaunch that closes the password rotation; one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-27T23:50Z (bridge clock, date -u)
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P4) · OWNER-RULING-S161-F3-F6-1 ("F3 onay, F6 onay", 02:37 TSI) · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 · OWNER-RULING-S156-FAIL-CLOSED-1. Register rows 114 (a, b, c), 115 (F3, F6), 116 (e2e locators), 84 (floor on outage) named below.
ADVERSARY GATE: EXEMPT, and the basis is stated plainly: this card REPEATS the subject of the landed CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2 (the floor-as-data seam) and applies scout-2's own post-landing findings N1–N4 from SCOUT-STATUS-LAND-PR625-S160-1 plus the two owner rulings those findings asked for. Register row 114 (S160 close) pre-declared "repeats PR 625's subject → loop-breaking lift allowed, say so", and the owner approved plan step P4 with that sentence. It is NOT the superseded-card case of 12.1 in the strict sense (the S160 card landed, it was not superseded) — recorded so a future reader sees the lift rested on the register row and the plan approval, not on 12.1 alone.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 3a37f177-996f-4b77-801f-0ca23c9ba530
basis: register v152 row 114 + OWNER-APPROVAL-S161-PLAN-1 step P4; ack = SCOUT-STATUS-LAND-PR625-S160-1 (scout-2 from_lane row, 2026-09-27T17:15:05Z) whose findings N1-N4 this body applies
```
BRANCH: phase/entry-floor-required-s161-1 off origin/master · PUSH early · REPORT docs/relay/ENTRY-FLOOR-REQUIRED-S161-1-AG4-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take code context from graft first (filterToolsByMessage, resolveEntryFloor, reachableToolNames, the mcp-catalog handler, GovernanceTab rules form); slip and report carry a GRAFT line. graft indexes the local tree: line anchors below are from the GitHub contents API at origin/master; re-measure at your head.
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master + Vercel production deployment list, Architect bridge, 2026-09-27T23:28Z | master |
| the floor parameter of filterToolsByMessage is a trailing OPTIONAL with a `?? []` default, while the pure core's field is required; both production callers pass it | MEASURED: GitHub contents API at master, Architect bridge, 2026-09-27T23:45Z | floorparam |
| the stage-07 span already records the floor's source and count; the source enum is data/absent/unread | MEASURED: GitHub contents API at master, 23:45Z | source |
| the stage-07 card text and the coverage claim still assert "Liste asla boş kalamaz" | MEASURED: GitHub contents API + code search at master, 23:47Z | claim07 |
| mcp-catalog computes reachability from the floor with no source check, so an 'unread' floor flags every non-category tool unreachable | MEASURED: GitHub contents API at master, 23:47Z | catalog |
| the e2e placeholder locator is a regex that also matches the Census tab's search box | MEASURED: GitHub contents API at master, 23:47Z; READ: scout-2 N3 | locator |
| the Rules form's payload JSON error is set only inside a change handler | MEASURED: GitHub contents API at master, 23:48Z; READ: F-S160-RULES-UI-PAYLOAD-TEXTAREA-PASTE-1 (Architect, browser pane) | textarea |
| the Routing tab already renders the floor source per backend | MEASURED: GitHub contents API at master, 23:48Z | routingtab |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:floorparam
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/toolCategories.ts:1223:    entryFloor: readonly string[];
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/toolCategories.ts:1460:    entryFloor?: readonly string[],
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/toolCategories.ts:1927:    (entryFloor ?? []).forEach((t) => relevantToolNames.add(t));
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/turn/stageTools.ts:676:                ? await filterToolsByMessage(coverage.coveredFlat, ctx.message, catRes.categories, routerPolicy ?? undefined, priorUserMessages, undefined, undefined, ctx.taskId, catRes.entryFloor.tools)
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/replay/routeShadowLens.ts:480:    entryFloor: readonly string[],
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/replay/routeShadowLens.ts:491:        entryFloor,
READ: GitHub code search "filterToolsByMessage" at master lists no other CALLER in api/ or scripts/ (the other hits are comments, types, tests and reports); you re-measure with git grep -n "filterToolsByMessage(" at your head and list every caller in the report.
```

```evidence:source
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/knowledge/entryFloor.ts:39:export type EntryFloorSource = 'data' | 'absent' | 'unread';
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/turn/stageTools.ts:802:                entryFloorSourceForSpan = catRes.entryFloor.source;
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/turn/stageTools.ts:803:                entryFloorCountForSpan = catRes.entryFloor.tools.length;
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/turn/stageTools.ts:1189:                entryFloorSource: entryFloorSourceForSpan,
```

```evidence:claim07
c58438b59cff4d1d403634b28e44af9b01db6dea:src/components/admin/stageCardCoverage.ts:173:        claims: ['Liste asla boş kalamaz', 'sunulan set = gateway ∪ dosyalanmamış ∪ filtre(dosyalanmış)'],
PARTIAL (paraphrase, not a byte quote): src/components/admin/stagesRegistry.ts:242 is the stage 07 `purpose:` string and ends with the bytes `Liste asla boş kalamaz.`
READ: GitHub code search "Liste asla" at master: public/docs/cwf-arac-eslemesi-v1.md, src/components/admin/stageCardCoverage.ts, src/components/admin/stagesRegistry.ts, and two docs/relay reports; NO hit under e2e/.
```

```evidence:catalog
c58438b59cff4d1d403634b28e44af9b01db6dea:api/admin/mcp-catalog.ts:94:        const reachable = pattern === 'gateway'
c58438b59cff4d1d403634b28e44af9b01db6dea:api/admin/mcp-catalog.ts:95:            ? null
c58438b59cff4d1d403634b28e44af9b01db6dea:api/admin/mcp-catalog.ts:96:            : reachableToolNames((await resolveEntryFloor(entryFloorBackendIds())).tools);
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/knowledge/entryFloor.ts:67:export function unreadEntryFloor(): EntryFloor {
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/knowledge/entryFloor.ts:68:    return { tools: [], source: 'unread', byBackend: {} };
```

```evidence:locator
c58438b59cff4d1d403634b28e44af9b01db6dea:e2e/rule26-admin.spec.ts:670:        await page.getByPlaceholder(/araç adı|toolName/).fill('getFactoryLines');
c58438b59cff4d1d403634b28e44af9b01db6dea:src/components/admin/CensusTab.tsx:209:                                placeholder={t('araç adında ara…', 'search tool names…')}
READ: GitHub code search "araç adı" path:e2e at master: exactly one file, e2e/rule26-admin.spec.ts.
```

```evidence:textarea
c58438b59cff4d1d403634b28e44af9b01db6dea:src/components/admin/GovernanceTab.tsx:278:        try { p = JSON.parse(newPayload) as Record<string, unknown>; } catch (e) { setJsonErr(e instanceof Error ? e.message : String(e)); return; }
```

```evidence:routingtab
c58438b59cff4d1d403634b28e44af9b01db6dea:src/components/admin/RoutingTab.tsx:650:                                                        {t('yok', 'none')} · {f.source === 'unread' ? t('okunamadı', 'unread') : t('yayınlı satır yok', 'no published row')}
```

## PREMISE
MEASURED: the anchors above. In plain words: PR 625 moved the availability floor to data and passed it in as an argument. Four small things are left on that seam. (a) The argument is OPTIONAL with a silent empty default (evidence:floorparam :1460, :1927) while the pure core's input field is REQUIRED (:1223): a future caller that forgets it gets no floor and no type error — scout-2 N2. (b) The stage-07 card still promises "the list can never be empty" (evidence:claim07); with the floor as data that promise is false by design, and the owner ruled F3: the promise becomes "the floor's source is named every turn", which the span already does (evidence:source). (c) mcp-catalog computes reachability from the floor without checking its source (evidence:catalog): on a store outage the floor is 'unread' = [] and every tool outside a category is flagged unreachable — a silent claim about an outage; the owner ruled F6: fail closed and name the state. (d) The e2e locator that PR 624 lost a landing to is a regex that matches two inputs (evidence:locator) — scout-2 N3 — and the Rules form's JSON error is stale after a programmatic paste (evidence:textarea; cosmetic, found by the Architect in the browser pane during ORDER 0).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both), or if a third production caller of filterToolsByMessage exists that cannot resolve a floor (then STOP: that caller needs its own resolution, not a default).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
This card changes NO routing decision. At your head, for every recorded live turn of the last 7 days replayed with the DB reachable, the offered tool set (offeredToolNames) and the system prompt bytes equal master's — zero difference classes. Any offered-set difference is a STOP with the turn id. The only observable changes are: the stage-07 card text (Stages tab), a catalog response under a forced-unread store (test) that carries reachability 'unread' and no unreachable list, one data-testid attribute, and the Rules form's JSON error clearing on a valid paste. Plant: remove the floor argument from one caller and show the TYPE CHECK go red (not a runtime test); remove the plant.

## ORDERS
1. REQUIRED FLOOR (row 114a, F-S160-ENTRY-FLOOR-OPTIONAL-PARAM-1): filterToolsByMessage's parameter becomes `entryFloor: readonly string[]` (required, same position; the trailing optional slots before it stay as they are — a required parameter after optional ones is legal in TypeScript when callers pass `undefined` explicitly, which both production callers already do). `(entryFloor ?? [])` at :1927 becomes `entryFloor`. Every caller at your head is listed in the report with its line; none is changed except to satisfy the type. A compile-time test pins it (`// @ts-expect-error` on a call without the floor, in a type-level test file beside filterToolsByMessageRouter.test.ts). The stage-07 span keeps entryFloorSource and entryFloorCount unchanged.
2. F3 TEXT (row 115, OWNER-RULING-S161-F3-F6-1): stagesRegistry.ts:242 — the sentence `Liste asla boş kalamaz.` is replaced by the i18n-neutral Turkish sentence `Tabanın kaynağı her turda adlandırılır (data · absent · unread); boş bir taban yasal bir durumdur, kaynaksız bir taban değildir.` (English narrative tabs, if any carry the claim, say the same). stageCardCoverage.ts:173 — the claim `'Liste asla boş kalamaz'` becomes `'tabanın kaynağı adlandırılır (entryFloorSource)'` and the anchors gain `{ path: 'api/cwf/_lib/turn/stageTools.ts', needle: 'entryFloorSource: entryFloorSourceForSpan' }`. public/docs/cwf-arac-eslemesi-v1.md: the matching sentence is updated in the SAME commit (check:doc-drift decides whether it is a gate; you update it regardless so the public doc does not contradict the card). git grep -n "Liste asla" at your head afterwards prints only docs/relay history.
3. F6 FAIL-CLOSED CATALOG (row 115, row 84): in api/admin/mcp-catalog.ts, resolve the floor ONCE into a local, and: if `floor.source === 'unread'` → `unreachableTools: []` and a new field `reachability: 'unread'`; if pattern === 'gateway' → `reachability: 'not-applicable'`; else `reachability: 'measured'` with today's computation. CatalogResult (and its client type in src/lib/adminService.ts) gains `reachability: 'measured' | 'unread' | 'not-applicable'`. No tool name is ever produced from code or memory on the unread path. Log line: the CLASS only, as today. Tests in api/admin/__tests__/mcpCatalog.test.ts: (i) unread store → reachability 'unread', unreachableTools [] even when tools are outside every category; (ii) readable store → today's behaviour byte-identical (existing assertions untouched); (iii) gateway → 'not-applicable'.
4. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1) — ADDITIONS: in src/components/admin/MCPSettingsTab.tsx the catalog result view renders, when reachability === 'unread', a badge with the i18n pair ("kural deposu okunamadı — erişilebilirlik ölçülmedi" / "rule store unread — reachability not measured") IN PLACE OF the unreachable-tools list, and a `data-testid="catalog-reachability-unread"`; when 'not-applicable' nothing changes from today. The Rules form key input that e2e:670 fills gains `data-testid="rule-key-input"` (row 114b). The Rules form payload textarea (row 114c): the JSON error is DERIVED from the current text (recomputed on change AND on blur), so a programmatic paste followed by focus/blur clears a stale error; no behaviour change for typed input. CHANGES: the stage-07 card text (ORDER 2). REMOVALS: none — say "REMOVALS: none" in the report.
5. E2E LOCATORS (row 116, F-S160-CARD-MISSED-E2E-LOCATOR-ON-UI-STRING-1): e2e/rule26-admin.spec.ts:670 uses `page.getByTestId('rule-key-input')` (row 114b; F-S160-E2E-LOCATOR-AMBIGUOUS-CENSUSTAB-1). Before editing, run `git grep -n -E "araç adı|Liste asla|okunamadı|unreachable" -- e2e/` at your head and print it; every file it names is in your FILE-FENCE. A UI test (vitest, src/components/admin/__tests__/) covers the unread badge.
6. COUNTS AT HEAD, case-sensitive, printed before and after with the delta: `git grep -n -E "armes|Armes|ARMES" -- <your file set>` (must not grow); `git grep -n "entryFloor ?? " -- api` prints nothing; `git grep -n "Liste asla" -- src public e2e` prints nothing.
7. npm run build (all five gates: tsc -b · gen:arch-facts · check:ground · vite build · check:doc-drift) + full vitest suite + typecheck:api locally; report with the complete FILE-FENCE in the FIRST commit (the fence GROWS only by a fresh branch, practice 101); PR non-draft; slip SLIP-ENTRY-FLOOR-REQUIRED-S161-1 (branch, full 40-hex head, PR number, CI by full sha read twice if zero, test counts, the FALSIFIER replay result = zero difference classes, the ORDER 5 grep output). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/toolCategories.ts (parameter required; :1927)
- api/cwf/__tests__/ (one new type-level test file beside filterToolsByMessageRouter.test.ts)
- api/admin/mcp-catalog.ts; api/admin/__tests__/mcpCatalog.test.ts
- src/lib/adminService.ts (CatalogResult client type)
- src/components/admin/MCPSettingsTab.tsx (unread badge); src/components/admin/__tests__/mcpSettingsTab.test.tsx
- src/components/admin/GovernanceTab.tsx (data-testid on the key input; derived JSON error); src/components/admin/__tests__/governanceReadyEditTruth.test.tsx (only if it asserts the error text)
- src/components/admin/stagesRegistry.ts:242; src/components/admin/stageCardCoverage.ts:173-174
- public/docs/cwf-arac-eslemesi-v1.md (the one sentence); public/architecture/manifest.json (reseal, same commit, only if check:doc-drift requires); docs/ground/facts.json (only if check:ground requires)
- e2e/rule26-admin.spec.ts:670 and every file ORDER 5's grep names
- i18n pairs for the badge; docs/relay/ENTRY-FLOOR-REQUIRED-S161-1-AG4-report.md
```

## DECISION RIGHTS
AG-4 chooses names, the derived-error mechanics, the type-level test form and the i18n key names. The Architect decided (by the owner's rulings): the floor parameter is required, no default; F3 text as in ORDER 2; F6 = fail closed with a named state and no code/memory tool names; UI additions as in ORDER 4; removals none. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no change to routing order, category matching, the floor resolution or the composed prompt; no backend, vendor or tenant name added in code, fixtures or UI strings; no DB write from the lane; no removal of a user-visible function; no merge; no adversary/scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-ENTRY-FLOOR-REQUIRED-S161-1-v1
