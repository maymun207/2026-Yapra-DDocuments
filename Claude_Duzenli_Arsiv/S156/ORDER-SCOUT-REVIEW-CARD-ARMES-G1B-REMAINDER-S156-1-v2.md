<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2

LANE: scout (a fresh scout window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S156, bridge clock 2026-09-23T02:28Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S156-DATA-BACKENDS-1 ("onay data/backends" 05:17 TSI); OWNER-RULING-S156-FAIL-CLOSED-1 ("onay fail-closed" 05:25 TSI); S156 plan approval "onay" 04:30 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: the card below was checked on the bridge with node --import tsx scripts/cardPreflight.ts --check: GREEN on all eleven checks. That is a GRAMMAR verdict, not a review (12.1). This notice itself is expected to refuse CP-1 (kind=notice).
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: re-review of CARD-ARMES-G1B-REMAINDER-S156-1-v2 (item 58, G1 remainder), the card a scout RED-ed as v1 (SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1 on the bus is its verdict; read it first). Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = 04d57e9499c9d21af70fb7fc6f80ca625202553f64c80294a98da7074d24064f.
PARALLEL CARD: CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v2 (AG-1) follows; G2 owns every kind-id constant and its importers, and G2c (after G2) owns the category floor. Attack the boundary.

## PREMISE
MEASURED: 2026-09-23T02:28Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v3 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run cardPreflight --check on the card bytes and mail-wait --read on this order; print any refusal verbatim; if they disagree, print both.
2. Read each evidence fence against origin/master and the live DB (read-only): does each quote its source's bytes? Then attack: for each of D1, D3, D4, D5 and E1 to E4: applied as the v1 verdict asked, yes or no, with the card line. Then attack what is NEW: ORDER 1's move of the measured sample into data/backends/ (does the loader change any acceptance verdict; is a fixture with real tool names in a data file within OWNER-RULING-S156-DATA-BACKENDS-1); ORDER 3's split (do kind_id mock values left for G2 keep every preview surface rendering); ORDER 0 (does any listed file import a G2 kind-id constant or a G2c floor accessor); whether any functionality is removed (owner rule: none may be).
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-ARMES-G1B-REMAINDER-S156-1-v2 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no DB write, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1B-REMAINDER-S156-1-v2

LANE: AG-4 (fresh window: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:28Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-ARMES-G1B-REMAINDER-S156-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1, bus 2026-09-23T01:57:33Z). Applied: D1 by taking the category floor OUT of this card (it becomes its own card after G2, with every consumer the scout listed); D3 by leaving the kind_id mock values in src/dev/ to G2; D4 as the scout's change (the measured sample stays data); D5 falls with D1; E1 to E4 as edits.
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S156-DATA-BACKENDS-1 ("onay data/backends", 2026-09-23 05:17 TSI: backend-specific data lives in data/backends/<backend-id>/, loaded by id, no backend name in code). S156 plan approval "onay" 04:30 TSI.
ADVERSARY GATE: back to the scout that wrote the v1 RED (ORDER-SCOUT-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2); reaches AG-4 only with a GREEN verdict row.
SCOPE: item 58 G1 remainder OUTSIDE the knowledge layer and OUTSIDE the category floor. G2 (AG-1) owns the knowledge layer, the kind-id constants and every file that imports them; G2c (after G2) owns api/cwf/_lib/toolCategories.ts and its consumers.
BRANCH: phase/armes-g1b-remainder-s156-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G1B-REMAINDER-S156-1-AG4-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the lines naming that backend in this card's files, per file | MEASURED: git grep -n -i -I armes on origin/master, Architect bridge, 2026-09-23T02:28Z | files |
| the deploy config names that backend's host | MEASURED: git grep -n -o on origin/master:vercel.json, Architect bridge, 2026-09-23T02:28Z | csp |

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
0. Your file set: api/cwf/_lib/replay/toolCorpusSample.ts, api/cwf/_lib/routing/__tests__/toolRetrievalAcceptance.test.ts, scripts/a23PathBArmB.ts, one new data file under data/backends/<backend-id>/ for the sample rows, scripts/runFrameForceFitLens.ts, scripts/verifyGrants.ts, src/components/admin/CensusTab.tsx, src/components/admin/KindDraftsSection.tsx, src/components/admin/MCPSettingsTab.tsx, src/components/admin/MemoryTab.tsx, src/components/admin/RoutingTab.tsx, src/components/admin/goldenCoverage.ts, src/components/admin/stagesRegistry.ts, src/dev/AdminPreview.tsx, src/dev/ChatPreview.tsx, vercel.json, and the existing tests of those files. NOT yours: api/cwf/_lib/toolCategories.ts and anything that imports its floor accessors (G2c); every file importing a kind-id constant (G2). If you need one, STOP for it and name it.
1. toolCorpusSample (scout D4): the measured rows stay exactly as measured and move into the data file under data/backends/<backend-id>/, loaded by backend id; the code keeps no backend constant and no tool name; MEASURED_POPULATION becomes printed measured output, not a literal. toolRetrievalAcceptance.test.ts and scripts/a23PathBArmB.ts read through the loader; print their verdicts at base and at head: identical is pass.
2. Admin UI: in CensusTab, KindDraftsSection, RoutingTab, goldenCoverage and stagesRegistry, every backend id, caption, placeholder, hint and default fetch naming one backend comes from data (the selected or listed backend, the row's own kind_id) in both Turkish and English strings. MemoryTab (E3): listRules uses the same selected backend id doPromote uses, with no fetch while it is null; the glossary match is the family suffix (kind id ends with .glossary_term). If G2 lands a shared glossary predicate first, use it and say so; otherwise the local suffix check stands and G2 replaces it. MCPSettingsTab: clean the comments.
3. Dev previews (D3): display names, emails, URLs, persona text and the backend id of mock rows become a neutral fixture backend; the kind_id VALUES of mock rows stay untouched in this card (G2 changes them in the same commit that changes the comparators), so every preview surface still renders.
4. vercel.json (E1): remove the host from connect-src; print both lenses at your head.
5. scripts (E2): verifyGrants uses a neutral sentinel id for its match-nothing probe; runFrameForceFitLens changes only its heading text.
6. Tests: the existing tests of your files updated with neutral fixture ids; one new test that MemoryTab fetches nothing and matches no kind while no backend is selected. Plant a fault (restore the one-backend listRules call) and show a test go red.
7. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- <your code files>` prints no line except the kind_id mock values left to G2 in src/dev/AdminPreview.tsx; print the command and output.
8. PR body carries a FILE-FENCE: block listing ORDER 0's files, one per line (the merge guard reads it once it lands).
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1B-REMAINDER-S156-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-4 designs inside "backend from data, never from code". The Architect decided: the category floor is not in this card; the measured sample stays data under data/backends/; neutral fixture ids in previews and tests.
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1B-REMAINDER-S156-1-v2
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2
