<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LENS-MEASUREMENT-REPAIR-1-S134-1 · v1 — make the clarification lens finishable and its evidence survivable
lane: AG-4
report: docs/relay/LENS-MEASUREMENT-REPAIR-1-S134-1-AG4-report.md
fanout: personalized

This is the second half of the owner's order `OWNER-RULING-S134-LANDING-FIRST-1` — "once inis sonra olcumun onerimi". The landing half is DONE and proven: the hardened workflow is on master. This card repairs the measurement itself, and it repairs it by READING WHAT THE CODE ALREADY SAYS rather than by re-running anything.

THE ADVERSARY GATE IS LIFTED FOR THIS CARD, NAMED AND NOT SILENT, citing `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`. The referee is CI.

NO MASTER PUSH. Branch and pull request only, left OPEN. No owner spend approval is required and none has been given.

## THE DEFECT, IN ONE SENTENCE

The lens calls the PRODUCTION clarification seam once per frame — which is the whole point of the lens — and that seam is documented by its own source as holding NO cache, so eleven thousand frames produce eleven thousand identical reads of governed configuration that cannot have changed, and the run dies at the platform ceiling before it emits its single terminal write.

## D1 — THE GOVERNED CONFIG IS RE-READ ONCE PER FRAME

`api/cwf/_lib/knowledge/resolveEntityAlias.ts` says it in its own header, and this is the primary source, not an inference: **"NO module-level cache: resolved fresh each call (a single indexed `domain_rules` query, not a heavy warm)."** Anchor `nocache`.

That contract is CORRECT for production. One live turn, one read, always fresh — a stale alias index would be a wrong answer to a person. It becomes ruinous only in the lens, where the same process runs the same seam eleven thousand times against a window that `--until` has FROZEN.

The reads, named at their call sites in `api/cwf/_lib/turn/stageClarify.ts` — every one of them inside `computeTurnClarification`, therefore every one of them per frame: `resolveShiftBoundaries()`, `resolveAliasWithSuffixFallback` reaching `resolveEntityAliasIndex(backendId)`, `loadEntityCandidates` reaching `BackendEntityLayersRepository().listEnabled` and `EntityRegistryRepository().listByBackend` and `.listByBackendLayer`, `resolveMetricRegistry()`, and `resolveAskOnUnresolved()`. Anchor `callsites`.

The database saw the consequence. Anchor `traffic`.

## D2 — THE EVIDENCE IS EMITTED ONCE, AT THE END, OR NEVER

`scripts/runClarificationLens.ts` writes its whole text report in ONE terminal call, and its `--json` evidence in ONE terminal write. Anchor `oneshot`. A process killed at a ceiling therefore leaves ZERO BYTES no matter how much work it did — which is exactly what the S133 artefact recorded after eleven thousand and forty-one seams.

An all-or-nothing artefact turns a partial measurement into no measurement. That is the difference between a slow instrument and a useless one.

## D3 — `--all` HAS NO CEILING, AND IT IS NOT REPAIRED HERE

The flag is documented as "read each source to its EXACT counted population (no ceiling)". Anchor `oneshot`. Whether that is a defect DEPENDS ON D1: if the run finishes comfortably once the redundant reads are gone, there is nothing to bound and a bound would only destroy populations. **D3 IS NOT TO BE TOUCHED IN THIS CARD.** It is named so that a later card can measure the post-D1 duration and decide with a number.

## PREMISE
- MEASURED: the four source files read from the owner's clone at 2026-09-09T02:0Z — the no-cache contract, the per-frame call sites, the single terminal write, and the `--all` help text. Anchors `nocache`, `callsites`, `oneshot`.
- MEASURED: Supabase `query_logs` over `edge_logs`, filtered to the CI runner's AS organisation, grouped by request path with distinct query strings, across the eighty-four minutes of the S133 run. Anchor `traffic`.
- MEASURED: `docs/replay/ma-gate-rerun3-S133-v1.md` on master records `lens_outcome=cancelled`, `clarify_lines=11041`, and an evidence JSON of ZERO BYTES. Anchor `zerobytes`.
- UNMEASURED: how long a post-D1 run takes. That is D3's question and this card does not answer it.
- ON-DISAGREEMENT: if any quoted line is not present in the file at the head you read, STOP and print what the file actually says. The quote is the premise; a changed file changes the card, not the reading.
- DECAYS the moment `origin/master` moves, or when a v2 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the alias resolver holds no cache and says so itself | MEASURED: `grep -n cache api/cwf/_lib/knowledge/resolveEntityAlias.ts` at 2026-09-09T02:0Z · MEASURED: Supabase query_logs over edge_logs showing the same handful of query strings repeated thousands of times in one run, which a cache would have made impossible | nocache |
| six governed reads sit inside the per-frame seam | MEASURED: `grep -n Repository api/cwf/_lib/turn/stageClarify.ts` at the same instant · MEASURED: `grep -n resolve api/cwf/_lib/turn/stageClarify.ts` at the same instant | callsites |
| the report and the evidence each leave the process in a single terminal write | MEASURED: `grep -n console.log scripts/runClarificationLens.ts` at the same instant · MEASURED: `grep -n process.stdout scripts/runClarificationLens.ts` at the same instant | oneshot |
| the run made tens of thousands of requests against a handful of distinct queries | MEASURED: Supabase query_logs over edge_logs, runner AS organisation, grouped by path with distinct search strings | traffic |
| the killed run left no evidence at all | MEASURED: `docs/replay/ma-gate-rerun3-S133-v1.md` read on master, recording its own zero-byte outcome · MEASURED: Supabase edge_logs per-minute counts for the runner, unbroken to the ceiling minute and then stopping dead mid-flight | zerobytes |
| how long a repaired run takes | NOT-READ | ORDER E |

```evidence:nocache
 *   - NO module-level cache: resolved fresh each call (a single indexed
 *     `domain_rules` query, not a heavy warm).
```

```evidence:callsites
253:  const layers = await new BackendEntityLayersRepository().listEnabled(ENTITY_ALIAS_BACKEND_ID);
262:      const rows = await new EntityRegistryRepository().listByBackend(ENTITY_ALIAS_BACKEND_ID);
407:  const registryRows = await new EntityRegistryRepository().listByBackendLayer(ENTITY_ALIAS_BACKEND_ID, ENTITY_FLOOR_LAYER_KEY);
581:  const { index } = await resolveEntityAliasIndex(backendId);
686:  const metricVocab = await resolveMetricRegistry();
729:  const valveOpen = await resolveAskOnUnresolved();
781:      const { boundaries } = await resolveShiftBoundaries();
and the frame loop that reaches all of them, in clarificationLens.ts:
1378: evaluations.push(await evaluateRecordedFrame(row, boundaries, deps));
```

```evidence:oneshot
240:  console.log(out.join('\n'));
285:      process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
73:  '  --all          read each source to its EXACT counted population (no ceiling). Contradicts --limit.'
```

```evidence:traffic
requests, one run, eighty-four minutes, runner AS organisation:
  /rest/v1/domain_rules           12009 requests /     3 distinct query strings
  /rest/v1/backends                2669 requests /     1 distinct query string
  /rest/v1/entity_registry         2669 requests /     1 distinct query string
  /rest/v1/backend_tools           2669 requests /     1 distinct query string
  /rest/v1/backend_entity_layers   2669 requests /     1 distinct query string
  total for the whole run, unbroken until the ceiling cut it: 92296 requests
```

```evidence:zerobytes
conclusion: cancelled
clarify_lines: 11041
lens_outcome: cancelled
lens_failed_lines: 0
evidence JSON: 0 bytes
```

## SCOPE
```scope
- ONE branch off current master, ONE pull request, LEFT OPEN
- api/cwf/_lib/ — a NEW opt-in frozen-window read memo, default OFF
- scripts/runClarificationLens.ts — arm the memo; make the evidence survivable
- tests covering both, including a test that proves production behaviour is UNCHANGED
- docs/relay/ — your report
- NO master push, NO merge, NO admin powers
- NO dispatch of ma-rerun.yml and NO re-run of the lens (S55-1)
- NO change to --all and NO ceiling of any kind (D3 is out of scope BY NAME)
- NO change to what computeTurnClarification COMPUTES
```

## ORDER A — PROVE THE PREMISE BEFORE YOU CHANGE ANYTHING
1. `git fetch origin`, print `git rev-parse origin/master` at FULL forty-hex length, branch from it.
2. Print each of the four greps in the CLAIMS table and compare to its fence. A mismatch is ON-DISAGREEMENT: STOP and print what the file says.
3. Print `git log -1 --format=%H` for the file that documents the zero-byte run, and quote the four lines in the `zerobytes` fence from the file itself.

## ORDER B — D1, AND THE PRODUCTION CONTRACT IS NOT TOUCHED
1. Add a process-scoped memo for the governed reads named in `callsites`. It is **DISABLED BY DEFAULT** and is armed by ONE explicit call — nothing in the production request path may arm it, and you will prove that.
2. It is keyed by the read's own arguments and it holds for the life of the armed process only. It is NOT a TTL cache, NOT persisted, and NOT written to any table.
3. Arm it in `scripts/runClarificationLens.ts` ONLY, and only once the window is frozen — the runner already pins `until` and prints it. State in the code comment WHY the arming is lawful: the run judges every frame against ONE configuration snapshot, which is a STRONGER measurement than the current behaviour, where configuration could drift mid-run and no frame would record that it had.
4. Write a test that fails if the memo is armed by anything other than the lens runner. This is the test that protects the product; the ones about counts are secondary.
5. Print, from the DIFF and not from memory, every call site you routed through the memo.

## ORDER C — D2, THE EVIDENCE MUST SURVIVE A KILL
1. The evidence must reach durable storage INCREMENTALLY, so that a process killed at any point leaves an artefact that says how far it got. The report at the end stays exactly as it is; you are ADDING a survivable path, not replacing the terminal write.
2. The partial artefact must be self-describing: how many frames were evaluated, the frozen `until`, and an explicit statement that it is PARTIAL. A partial file that looks complete is worse than no file (`empty ≠ zero`).
3. Do NOT stream raw stderr to any file the workflow uploads — the hardened workflow deliberately uploads the evidence JSON alone, and that stays true.
4. Prove it: kill a short run mid-flight LOCALLY and print the partial artefact it left. This is a local kill of a bounded run, NOT a re-run of the S133 measurement.

## ORDER D — GATES
1. `npm run build` — and name all five of its gates individually with their results, because a subset reported as the whole is this factory's own recorded failure mode.
2. `npm run test` and `npm run typecheck:api`, each named with its result, and reported as "local, on an unsynced head" unless you also read CI.
3. Push the branch, open the pull request, LEAVE IT OPEN. Print the pull request number and the head sha it reports at FULL forty-hex length.
4. Read CI at that head with a COMPUTED sha: `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=$(git rev-parse HEAD)"`. Print `total_count` FIRST; zero means CI never ran and you say exactly that. Name every run with its conclusion. `ma-rerun` will not trigger and you name it as not triggered rather than counting it green.

## ORDER E — THE NUMBER THAT DECIDES D3
1. Run the lens LOCALLY against a BOUNDED sample with `--limit`, before and after your change, same limit both times, and print wall-clock and the request count for each. This is a new bounded measurement, not a re-run of the cancelled one.
2. From those two numbers, and ONLY from them, state what a full population run would cost after D1. Label it a PROJECTION, because it is one.
3. Do NOT propose a ceiling. The next card decides that with the projection in front of it.

## ORDER F — THE REPORT
1. `docs/relay/LENS-MEASUREMENT-REPAIR-1-S134-1-AG4-report.md` on your branch. Open with what MOVED, or with the sentence that nothing did.
2. `auditText` locally `violations: 0`.
3. Post one from_lane row if your channel can; otherwise say MECHANISM-ABSENT and name the lenses you tried.

## FALSIFIER
Wrong if any production request path can arm the memo. Wrong if what `computeTurnClarification` computes changed in any way. Wrong if the memo persists anywhere outside the process. Wrong if a partial artefact does not say that it is partial. Wrong if raw stderr was added to an uploaded artefact. Wrong if the lens was re-run against the full population, or `ma-rerun.yml` was dispatched at all. Wrong if `--all` or any ceiling was changed. Wrong if a ceiling was proposed before ORDER E's numbers existed. Wrong if a CI read was keyed on a sha typed rather than computed. Wrong if anything reached master. Wrong if `npm run build` was reported as a single result rather than five named gates.

## SHARED SURFACES
cwf_yaprak: ONE new branch, ONE open pull request, ZERO master pushes. CI: whatever fires on the pull request; nothing dispatched. Database: reads only, from your local bounded runs; no governed write; your heartbeat and one bus row. Production behaviour: UNCHANGED, and ORDER B.4 is the test that proves it. Secrets: none read, none printed.

## DECISION RIGHTS
Yours: the memo's shape and name, where the survivable write lands, your branch name, your report's wording. Not yours: whether production may arm the memo (it may not), whether D3 is touched (it is not), whether anything merges (nothing does).

BODIES: OWNER-RULING-S134-LANDING-FIRST-1 · OWNER-RULING-S134-NO-NEW-CAPACITY-1 · OWNER-DESIGN-S134-LOOK-AT-THE-DATABASE-LOGS-1 · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · A-REC-S133-6 · A-REC-S133-7 · S55-1 · S63-1 · S101-L1 · empty ≠ zero.

```deliverables
origin/master at full forty-hex, and the branch cut from it
the four greps printed and compared to their fences
the diff's own list of every call site routed through the memo
the test that fails if production arms the memo
a partial artefact from a locally killed short run, printed
npm run build reported as FIVE named gates with five results
npm run test and npm run typecheck:api, each named
the pull request number and its head sha at full forty-hex, LEFT OPEN
total_count at that head printed FIRST, keyed on a computed sha, every run named
before and after wall-clock and request counts from a bounded local run
a PROJECTION for a full run, labelled as a projection, with NO ceiling proposed
docs/relay/LENS-MEASUREMENT-REPAIR-1-S134-1-AG4-report.md on your branch
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-LENS-MEASUREMENT-REPAIR-1-S134-1-v1 ends here.
