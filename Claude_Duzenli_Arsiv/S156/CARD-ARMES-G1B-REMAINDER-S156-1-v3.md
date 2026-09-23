<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1B-REMAINDER-S156-1-v3

LANE: AG-4 (fresh window: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:40Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-ARMES-G1B-REMAINDER-S156-1-v2 (scout RED, SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2, bus 2026-09-23T02:38:21Z: "B1 and B2 are both text-only edits. Applied verbatim, I find nothing else blocking"). v3 is v2 plus exactly B1, B2 and the riders E-a to E-g, and the D2 note (D2 falls with D1). v2 had applied the v1 verdict's D1, D3, D4, D5, E1 to E4.
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S156-DATA-BACKENDS-1 ("onay data/backends", 2026-09-23 05:17 TSI: backend-specific data lives in data/backends/<backend-id>/, loaded by id, no backend name in code). S156 plan approval "onay" 04:30 TSI.
ADVERSARY GATE: EXEMPT for this re-cut only: the scout's v2 verdict named the complete delta to GREEN and this body applies exactly that delta.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 0ff8431b-d5f3-4a26-9f33-cfcf2496b95a
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2 (scout from_lane row, 2026-09-23T02:38:21Z), whose text-only delta to GREEN (B1, B2) this body applies
```
SCOPE: item 58 G1 remainder OUTSIDE the knowledge layer and OUTSIDE the category floor. G2 (AG-1) owns the knowledge layer, the kind-id constants and every file that imports them; G2c (after G2) owns api/cwf/_lib/toolCategories.ts and its consumers.
BRANCH: phase/armes-g1b-remainder-s156-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G1B-REMAINDER-S156-1-AG4-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the lines naming that backend in this card's files, per file | MEASURED: git grep -n -i -I armes on origin/master, Architect bridge, 2026-09-23T02:40Z | files |
| the deploy config names that backend's host | MEASURED: git grep -n -o on origin/master:vercel.json, Architect bridge, 2026-09-23T02:40Z | csp |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:files
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/replay/toolCorpusSample.ts:20
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/runFrameForceFitLens.ts:1
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/verifyGrants.ts:1
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/CensusTab.tsx:2
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/KindDraftsSection.tsx:1
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/MCPSettingsTab.tsx:7
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/MemoryTab.tsx:5
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/RoutingTab.tsx:4
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/goldenCoverage.ts:2
1ca28ede61588ff542764cf3f1375568c94436ae:src/components/admin/stagesRegistry.ts:2
1ca28ede61588ff542764cf3f1375568c94436ae:src/dev/AdminPreview.tsx:29
1ca28ede61588ff542764cf3f1375568c94436ae:src/dev/ChatPreview.tsx:1
1ca28ede61588ff542764cf3f1375568c94436ae:vercel.json:1
```

```evidence:csp
MEASURED: git grep -n -o on vercel.json (the matched substring only)
1ca28ede61588ff542764cf3f1375568c94436ae:vercel.json:9:https://armes-api.ardich.com
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, READ from the scout's primary-source readings (bus 2026-09-23T01:57:33Z): the connect-src host is not reached by any browser code at master (two lenses: grep over src api shared finds only two test fixtures; the browser network inventory is /api/admin, /api/cwf/*, docs files and supabase-js); verifyGrants.ts:42 is an anon-UPDATE privilege probe with a match-nothing filter, not a default backend; runFrameForceFitLens.ts has no backend selection (its line is a heading); MemoryTab reads listRules for one backend at :316 and matches one exact kind id at :378, while doPromote at :136 already uses a selected backend id; every line in MCPSettingsTab.tsx that names the backend is a comment; toolCorpusSample.ts is a hand-chosen measured fixture whose consumers are toolRetrievalAcceptance.test.ts and scripts/a23PathBArmB.ts.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
Every surface the admin UI and the dev previews render at master renders at your head; toolRetrievalAcceptance.test.ts gives the same verdicts at your head as at master; no live turn path changes (this card touches no turn code). Any difference is a STOP with the name of the surface or test.

## ORDERS
0. Your file set: api/cwf/_lib/replay/toolCorpusSample.ts, api/cwf/_lib/routing/__tests__/toolRetrievalAcceptance.test.ts, scripts/a23PathBArmB.ts (B1: yours ONLY for its toolCorpusSample import and its MEASURED_POPULATION print; its toolCategories import and every floor call stay byte-identical, G2c owns them afterwards), one data file per backend in the sample at data/backends/<backend-id>/tool-corpus-sample.json (B2: the sample spans two backends; that fixed file name is the only name your loader matches, E-f), scripts/runFrameForceFitLens.ts, scripts/verifyGrants.ts, src/components/admin/CensusTab.tsx, src/components/admin/KindDraftsSection.tsx, src/components/admin/MCPSettingsTab.tsx, src/components/admin/MemoryTab.tsx, src/components/admin/RoutingTab.tsx, src/components/admin/goldenCoverage.ts, src/components/admin/stagesRegistry.ts, src/dev/AdminPreview.tsx, src/dev/ChatPreview.tsx, vercel.json, and these tests (E-a): toolRetrievalAcceptance.test.ts, adminRowDiscipline.test.tsx, censusConsoleRender.test.tsx, kindDraftsSection.test.tsx, mcpMergeRoundTrip.test.ts, mcpSettingsTab.test.tsx, memoryTab.test.tsx, routingTab.test.tsx. NOT yours: api/cwf/_lib/toolCategories.ts and anything that imports its floor accessors (G2c); every file importing a kind-id constant (G2). If you need one, STOP for it and name it.
1. toolCorpusSample (D4, B2): the measured rows stay byte-for-byte and move into the per-backend data files; the loader reads them with fs (E-c) and returns the backend ids of the directories that carry the file; consumers take backend ids from the loader, never a literal, and the test's backendIds are pinned to the loaded set. MEASURED_POPULATION moves into the data with its MEASURED_AT and is printed from there (E-b). The target and assertion tool names of the test are marked in the data, not written in code (E-g). No backend name stays in code for either backend. Print toolRetrievalAcceptance.test.ts and scripts/a23PathBArmB.ts verdicts at base and at head: identical is pass.
2. Admin UI: in CensusTab, KindDraftsSection, RoutingTab, goldenCoverage and stagesRegistry, every backend id, caption, placeholder, hint and default fetch naming one backend comes from data (the selected or listed backend, the row's own kind_id) in both Turkish and English strings. MemoryTab (E3): listRules uses the same selected backend id doPromote uses, with no fetch while it is null; the glossary match is the family suffix (kind id ends with .glossary_term). If G2 lands a shared glossary predicate first, use it and say so; otherwise the local suffix check stands and G2 replaces it. RoutingTab fetches nothing while no backend is selected (E-e). The second backend name at RoutingTab:270 and stagesRegistry:319 is in scope too (E-d). MCPSettingsTab: clean the comments.
3. Dev previews (D3): display names, emails, URLs, persona text and the backend id of mock rows become a neutral fixture backend; the kind_id VALUES of mock rows stay untouched in this card (G2 changes them in the same commit that changes the comparators), so every preview surface still renders.
4. vercel.json (E1): remove the host from connect-src; print both lenses at your head.
5. scripts (E2): verifyGrants uses a neutral sentinel id for its match-nothing probe; runFrameForceFitLens changes only its heading text.
6. Tests: the existing tests of your files updated with neutral fixture ids; one new test that MemoryTab fetches nothing and matches no kind while no backend is selected. Plant a fault (restore the one-backend listRules call) and show a test go red.
7. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES|machine-knowledge-base" -- <your code files>` prints no line except the kind_id mock values left to G2 in src/dev/AdminPreview.tsx; print the command and output.
8. PR body carries a FILE-FENCE: block listing ORDER 0's files, one per line (the merge guard reads it once it lands).
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1B-REMAINDER-S156-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-4 designs inside "backend from data, never from code". The Architect decided: the category floor is not in this card; the measured sample stays data under data/backends/; neutral fixture ids in previews and tests.
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1B-REMAINDER-S156-1-v3
