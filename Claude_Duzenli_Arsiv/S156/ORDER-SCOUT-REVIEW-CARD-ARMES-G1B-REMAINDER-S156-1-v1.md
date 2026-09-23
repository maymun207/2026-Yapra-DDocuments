<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1

LANE: scout (scout window 2)
fanout: personalized (one lane, one body)
FROM: Architect, S156, bridge clock 2026-09-23T01:37Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; S156 plan approval "onay" 2026-09-23 04:30 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: the card below was checked on the bridge with node --import tsx scripts/cardPreflight.ts --check: GREEN on all eleven checks. That is a GRAMMAR verdict, not a review (12.1). This notice itself is expected to refuse CP-1 (kind=notice).
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: first review of CARD-ARMES-G1B-REMAINDER-S156-1-v1 (item 58, G1 remainder), NEW subject, no gate lift. Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = a36f4b7152290cf1b90df07c9d59abe3b69cc42a45991d393157fd2c110b3901.
PARALLEL CARD: CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1 (AG-1) goes to the other scout at the same time; the two file sets are meant NOT to overlap. Attacking that boundary is part of your review.

## PREMISE
MEASURED: 2026-09-23T01:37Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v2 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run cardPreflight --check on the card bytes and mail-wait --read on this order; print any refusal verbatim; if they disagree, print both.
2. Read each evidence fence against origin/master and the live DB (read-only): does each quote its source's bytes? Then attack: ORDER 2 (is the code category key read on a live turn today, and what does routing do without it on an outage?); ORDER 1 (can the replay sample be drawn from backend_tools without changing any lens verdict?); ORDER 3's family predicate in MemoryTab; ORDER 5's vercel.json measurement; whether any file in ORDER 0 imports a symbol G2 renames (then the sets overlap); whether any functionality is removed (owner rule: none may be).
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-ARMES-G1B-REMAINDER-S156-1-v1 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no DB write, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1B-REMAINDER-S156-1-v1

LANE: AG-4 (/clear before this card: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T01:36Z (bridge clock, date -u in the command that wrote this file)
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (every backend equal; ARMES is one backend; no hard-coded ARMES in code). S156 plan approval "onay" 2026-09-23 04:30 TSI.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (ORDER-SCOUT-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1); reaches AG-4 only with a GREEN verdict row.
SCOPE: item 58 G1 remainder. G1a-1 (PR 593) and G1a-2 (PR 595) landed; this card takes the logic lines left OUTSIDE the knowledge layer. G2 (CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1, AG-1, in parallel) owns the knowledge layer and every importer of its backend-named symbols: do not edit its files (ORDER 0 lists yours).
BRANCH: phase/armes-g1b-remainder-s156-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G1B-REMAINDER-S156-1-AG4-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the G1 logic lines left outside the knowledge layer, per file | MEASURED: git grep -n -i -I armes on origin/master classified by the G0 rules, Architect bridge, 2026-09-23T01:36Z | files |
| the category floor holds one backend's vocabulary as a code key | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T01:36Z | floor |
| that backend's categories already live as published rows | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-23 in the 01:25Z-01:35Z window | catrows |
| the deploy config names that backend's host | MEASURED: git show origin/master:vercel.json, Architect bridge, 2026-09-23T01:36Z | csp |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:files
api/cwf/_lib/toolCategories.ts | G1 logic lines 1 | all armes lines 11
api/cwf/_lib/replay/toolCorpusSample.ts | G1 logic lines 18 | all armes lines 20
scripts/runFrameForceFitLens.ts | G1 logic lines 1 | all armes lines 1
scripts/verifyGrants.ts | G1 logic lines 1 | all armes lines 1
src/components/admin/CensusTab.tsx | G1 logic lines 1 | all armes lines 2
src/components/admin/KindDraftsSection.tsx | G1 logic lines 1 | all armes lines 1
src/components/admin/MCPSettingsTab.tsx | G1 logic lines 3 | all armes lines 7
src/components/admin/MemoryTab.tsx | G1 logic lines 3 | all armes lines 5
src/components/admin/RoutingTab.tsx | G1 logic lines 2 | all armes lines 4
src/components/admin/goldenCoverage.ts | G1 logic lines 2 | all armes lines 2
src/components/admin/stagesRegistry.ts | G1 logic lines 2 | all armes lines 2
src/dev/AdminPreview.tsx | G1 logic lines 27 | all armes lines 29
src/dev/ChatPreview.tsx | G1 logic lines 1 | all armes lines 1
vercel.json | G1 logic lines 1 | all armes lines 1
```

```evidence:floor
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/toolCategories.ts:193:    armes: [
```

```evidence:catrows
MEASURED: select kind_id, status, count(*) from domain_rules where backend_id='armes' and kind_id like '%tool_category'
armes.tool_category published 12 | draft 12 | archived 34
```

```evidence:csp
MEASURED: git grep -n -o on vercel.json (the matched substring only)
1ca28ede61588ff542764cf3f1375568c94436ae:vercel.json:9:https://armes-api.ardich.com
```

## PREMISE
MEASURED: the anchors above. src/store/cwfStore.ts matched only through clearMessages (case-insensitive false positive) and is NOT in scope.
UNMEASURED by the Architect: whether the category floor key is read on a live turn when published category rows exist (ORDER 2 measures it); whether any browser code connects to the host in the csp anchor (ORDER 5 measures it).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
With the DB reachable, for every recorded live turn replayed at your head, the offered tool set and the chosen categories equal master's. Any difference is a STOP with the turn id, except the declared outage change of ORDER 2.

## ORDERS
0. Your file set: api/cwf/_lib/toolCategories.ts, api/cwf/_lib/replay/toolCorpusSample.ts, scripts/runFrameForceFitLens.ts, scripts/verifyGrants.ts, src/components/admin/CensusTab.tsx, src/components/admin/KindDraftsSection.tsx, src/components/admin/MCPSettingsTab.tsx, src/components/admin/MemoryTab.tsx, src/components/admin/RoutingTab.tsx, src/components/admin/goldenCoverage.ts, src/components/admin/stagesRegistry.ts, src/dev/AdminPreview.tsx, src/dev/ChatPreview.tsx, vercel.json, plus the tests of those files. Any other file is G2's or G3's: if you need one, STOP for it and name it.
1. toolCorpusSample: the sample is drawn from backend_tools rows (data) for the backends the caller names; no backend constant and no hand-listed tool names in code. The per-backend expected counts become measured values printed by the lens, not literals.
2. Category floor (toolCategories.ts): the code key holding one backend's vocabulary is removed; categories for every backend come from its published tool_category rows (catrows anchor), keyed by backend id from data. DECLARED CHANGE: on a DB outage a backend with no readable category rows gets no floor categories and the turn records the floor as UNMEASURED (the absent shape, never an empty-means-zero). Measure first and print: at master, on a live turn with the DB reachable, is the code key read at all? Pin the outage shape with a test.
3. Admin UI (CensusTab, KindDraftsSection, MCPSettingsTab, MemoryTab, RoutingTab, goldenCoverage, stagesRegistry): every backend id, kind id, table caption and help text naming one backend comes from data (the selected or listed backend, the row's kind_id) or a family predicate (endsWith the family suffix); no backend name in a placeholder, a caption, a hint or a default fetch. Turkish and English strings both. MemoryTab's glossary match uses the family, not one backend's kind id.
4. Dev previews (src/dev/): mock data uses a neutral fixture backend id and display name (not a real vendor, tenant or product name); the previews still render every surface they rendered before.
5. vercel.json: measure whether any code under src/ or api/ connects from the browser to the host in the csp anchor. If none, remove it from connect-src and print the proof; if some does, keep it, name the caller, and say so in the slip (deploy config, outside the G4 gate dirs).
6. scripts/runFrameForceFitLens.ts and scripts/verifyGrants.ts: backend from an argument or from data; no default backend.
7. Tests: update the tests of your file set in the same commits (neutral fixture backend ids). New tests: (i) a second flat backend with published category rows gets its own categories and never the other's words; (ii) outage yields the UNMEASURED floor shape. Plant a fault (restore the code key) and show a test go red.
8. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- <your file set>` prints no code line; comments in files you touched are cleaned too. Print the command and output. Anything left, name it with the reason.
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1B-REMAINDER-S156-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-4 designs inside "backend from data, never from code". A site needing a DB change: STOP for it, finish the rest. The Architect decided: outage = absent + UNMEASURED; neutral fixture ids in previews and tests.
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1B-REMAINDER-S156-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1
