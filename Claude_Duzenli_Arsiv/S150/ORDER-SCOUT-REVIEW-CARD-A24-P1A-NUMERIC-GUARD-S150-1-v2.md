<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2

LANE: scout
fanout: personalized (one lane, one body)
FROM: Architect, S150, 2026-09-21T17:40Z
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 + OWNER-APPROVAL-S150-PLAN-1 (CWF-S150-SESSION-OPEN-v1 section 5, T3).
NO POLL OR CRON TASK. Bekleme dongusu yok. This is the only order for this window; when its status is written, stop.
GATE-NOTE: written with a STEPS section (relay_adversary_gate refuses ORDERS in a notice, measured 2026-09-21T05:00Z).
AUTHORING NOTE (12.2, carried): the Architect's first assembly of this order used an unquoted shell here-document and the shell EVALUATED two backtick spans as commands; that draft was discarded and never inserted. The bytes below were assembled with a quoted here-document. If you see a truncated backtick span anywhere, that is a finding.

WHAT: re-review of v2 of the card you held RED (your SCOUT-STATUS-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v1, bus 2026-09-21T17:28:47Z). v2 answers R1-R4 and N1-N6 by name. Card body = the bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
MEASURED: 2026-09-21T17:40Z, sha256sum of the card file in the doc repo archive: sha256 = d03bbac17d95e3b42da2b219bcef4056a5188ebfc9887e80b87234fc4aaf1bf0 (18918 bytes)
ON-DISAGREEMENT: if your sha256 of the extracted body differs, print both and review the bytes you extracted; the difference is a finding.

## PREMISE
MEASURED: 2026-09-21T17:40Z, cardPreflight --check on the v2 card file in the owner clone (result printed by the Architect before insert; GRAMMAR, not review, 12.1).
MEASURED: 2026-09-21T17:35Z, the Architect re-read your cited lines: groundingCheck.ts:582-588 (ok computation), memoryDistill.ts:157/:169, stageTools.ts:1860, :2024-2032, :2070-2071, :2107, :2116, :2157, stageStream.ts:667, memoryAbLens.ts:208/:228, api/admin/replay.ts:257-258, agentParams.ts:319-329 and :1044-1053, groundingCheck.ts:81-84 — each as you stated.
MEASURED: 2026-09-21T16:30Z, the Q3 getOeeValuesForZones output head in public.turn_trace_digest carries integer percent-scale values (performance 100, availability 54, quality 100, oee 54) — your R4 "fraction vs percent" UNMEASURED, measured for this one payload; the x100 reading stays for other tools.
UNMEASURED: whether v2 closes R1-R4 without opening a new hole — that is your review.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching the card's scope fence, or if a v3 appears.

## STEPS
1. Re-read `git ls-remote origin refs/heads/master` and print the full 40-hex line; run the repository card gate on the extracted bytes, every check; print the result.
2. For EACH of R1, R2, R3, R4 say ANSWERED or NOT with file:line; for N1-N6 say whether the card now names them. Hostile questions for v2: (a) does ledgering the :2027 refusal string let a refusal's own numbers source a fabricated claim? (b) do the ORDER 3 readings (both separator readings, x100 and /100, rounding to d decimals) make false-sourcing so easy that the measurement never fires on Q3's actual prose (%95.84 against integer rows)? (c) is `numeric` outside `violations` visible enough in the digest and span to be read, or does it vanish? (d) anything else in v2 already built on master (12.6)?
3. Verdict: GREEN first line exactly
   ADVERSARY-VERDICT: GREEN card=CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2 sha256=<sha256 of the body>
   or RED with each defect by file:line and the change that would make it GREEN.
FORBIDDEN: read-only. No status post, no edit, no poll task, no cron. Never print an environment value (use npm run env:presence, not env or printenv).
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
SUPERSEDES CARD-A24-P1A-NUMERIC-GUARD-S150-1-v1, which the scout held RED (SCOUT-STATUS-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v1, bus 2026-09-21T17:28:47Z) on four blocking defects R1-R4 and six named non-blocking points N1-N6. Every order below answers them by name; the scout's findings are credited to the scout (S112-YASA-1). The subject is unchanged but the design changed materially, so this body returns to the scout for a re-review; no gate lift is claimed.
MEASURED-AT: 2026-09-21T17:35Z (owner clone at the local-master sha named in `floor`; every cited line re-read this minute; the scout measured the GitHub head equal to the origin/master sha named in `floor` at 17:23Z)
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 ("v1_3 onay", 2026-09-21 19:43 TSI) and OWNER-APPROVAL-S150-PLAN-1 ("plan onay", same minute; CWF-S150-SESSION-OPEN-v1 section 5, T3 = P1-A). Design source for the requirement: the owner's Q3/Q4 witness (CWF-S149-Q3Q4-WITNESS-v1) — numbers no tool computed reached his eye.
BRANCH: phase/a24-p1a-numeric-guard-s150-1 · PUSH: yes · REPORT: docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report (F-S147-REPORT-ON-PR-LESS-BRANCH-NEVER-GATED-1).
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

PRECONDITION: git ls-remote origin refs/heads/master prints the origin/master sha named in `floor` or a descendant that does not touch the scope fence below. If a descendant touches it, STOP and print the commit.
ON-DISAGREEMENT: if any line number, symbol or behaviour below differs from what you measure at the head, YOUR READING WINS: print both, and the difference is a finding in the report.

THE PROBLEM, in plain words. On 2026-09-21 the owner asked two production questions. The answers stated OEE averages and scrap totals that no tool had computed: the model added the numbers up itself. The browser emptied the TABLES ("satır kaynakta yok") because it checks table cells against the full tool source, but nothing on the server checks a number written in a SENTENCE, so the prose carried the invented averages to the owner's eye and the grounding validator reported ok:true with zero violations. A24 v1_3 (FINAL, owner-approved) says every number that reaches the user must exist in tool bytes; groundingCheck.ts already names this extension as its planned FACTS-LEDGER. This card builds the ledger and the check as a SEPARATE MEASUREMENT beside the verdict: it counts and lists unsourced numbers, it does not touch `ok`, `violations` or any consumer of them, and it never rewrites the answer. A governed switch lets the owner turn on STAMP mode from the admin UI (one appended sentence naming the unsourced numbers). Blocking or regenerating is NOT in this card.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| origin/master and production | MEASURED: git log origin/master in the owner clone + Vercel list_deployments target=production READY, 2026-09-21T16:25Z; scout git ls-remote 2026-09-21T17:23Z | floor |
| the cited lines at the floor | MEASURED: sed -n and grep -n over the owner clone at 7572c3bbfeed23656fcf8a55f6e64d93ed240c14, 2026-09-21T17:35Z | lines |
| the golden turns, their grounding verdict and the OEE value shape | MEASURED: select over public.turn_trace_digest stages, 2026-09-21T16:30Z | digest |

```evidence:floor
scout git ls-remote origin refs/heads/master at 2026-09-21T17:23Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (Merge pull request #567)
owner-clone master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 is an ancestor of it; between them only docs/relay/ and two test files change (noPollTask.test.ts, vectorOriginRepairWorkflow.test.ts), none in this card's fence
Vercel production READY: meta.githubCommitSha 20c1651c3fb59b48490670ffefed02099d684ed9 (Merge pull request #588); later master deployments CANCELED by scripts/vercel-ignore.mjs (docs-only, skip by design)
```

```evidence:lines
api/cwf/_lib/grounding/groundingCheck.ts:20-27  header names the FACTS-LEDGER as the planned extension ("every number in the answer traced to a tool result / handle span")
api/cwf/_lib/grounding/groundingCheck.ts:81-84  function parseNum(raw) strips every '.' and ',' (95.84 -> 9584) — NOT reusable for this card
api/cwf/_lib/grounding/groundingCheck.ts:582-588  "`ok` and `violations` are UNCHANGED ... a mutation test pins that the check order and the ok computation are untouched" · return { ok: violations.length === 0, violations, vocabSource: vocabSourceOf(input) };
api/cwf/_lib/turn/memoryDistill.ts:157,169  groundingOk = ctx.groundingSummary.ok ; groundingOk === false -> episode classed failed
api/cwf/_lib/grounding/types.ts:71  export type GroundingViolationKind = 'empty_as_zero' | 'count_understatement' | 'fabrication_risk' | 'scope_divergence';
api/cwf/_lib/turn/stageTools.ts:1860  recordToolCall(ctx, toolDef.name, args, rawForClient);   (full client payload incl. hidden handle records — NOT the ledger source)
api/cwf/_lib/turn/stageTools.ts:1943  const formatted = formatToolResult(
api/cwf/_lib/turn/stageTools.ts:2024-2027  const refusal = ... modelFacingRefusal(resultClass) ... return { result: refusal };
api/cwf/_lib/turn/stageTools.ts:2032  return { result: withCompletenessAccount(formatted, observation) };
api/cwf/_lib/turn/toolResultClass.ts:473  export function withCompletenessAccount(formatted: string, observation: ResultObservation | null): string {   (re-serializes with a _completeness account when present)
api/cwf/_lib/turn/stageTools.ts:2070-2071  resolve_time_range: const rawResolved = JSON.stringify(resolved); recordToolCall(ctx, TIME_TOOL_NAME, args, rawResolved);
api/cwf/_lib/turn/stageTools.ts:2107  aggregate_records: recordToolCall(ctx, AGGREGATE_TOOL_NAME, args, JSON.stringify(result ?? null));
api/cwf/_lib/turn/stageTools.ts:2116  query_records: recordToolCall(ctx, QUERY_TOOL_NAME, args, JSON.stringify(result ?? null));
api/cwf/_lib/turn/stageTools.ts:2157  web_fetch: recordToolCall(ctx, WEB_FETCH_TOOL_NAME, args, JSON.stringify(result ?? null));
api/cwf/_lib/turn/stageStream.ts:583  const verdict = runGroundingCheck(groundingInputForTurn(ctx));
api/cwf/_lib/turn/stageStream.ts:667  const finalText = ctx.fullText + scopeNotice + partialNotice + floorNotice + premiseNotice;
api/cwf/_lib/replay/memoryAbLens.ts:208,228  runGroundingCheck(base) / runGroundingCheck(deps.armBInput(base, slice))   (no ledger)
api/admin/replay.ts:257-258  runGroundingCheck({ ...baseInput, knowledge: ... })   (no ledger)
api/cwf/_lib/knowledge/reference/agentParams.ts:319-329  interface AgentParamDecl { key; value: number | string | boolean; type; min?; max?; stage; sessionTweakable }   (no allowed-values field)
api/cwf/_lib/knowledge/reference/agentParams.ts:1044-1053  VECTOR_ENGINE: a STRING with a dedicated resolver (SYNTHETIC_MODE precedent); unknown value -> honest born-loud absent state, never a silent fallback
src/lib/tableCellsFromBytes.ts:207  "satır kaynakta yok · rows not in source" (client lens over the FULL source)
```

```evidence:digest
Q3 = the digest row created_at 2026-09-21T04:51:47Z: 3 cwf.mcp.tool calls (getFactoryLines 863 bytes · getLineStopsReportForZones 39108 bytes · getOeeValuesForZones 8195 bytes); no aggregate_records call; cwf.grounding output {"ok":true,"violationCount":0,"violationKinds":[]}
Q3 getOeeValuesForZones output head, EDITED EXCERPT (12.4: the zone uuid and the two epoch-ms timestamps are replaced by <...> placeholders; every other byte, including all metric values, is verbatim): {"<zone uuid>":[{"timestamp":<ms>,"performance":100,"availability":54,"quality":100,"oee":54},{"timestamp":<ms>,"performance":100,"availability":74,"quality":1 ...   (values are integer PERCENT scale in this payload)
Q4 = the digest row created_at 2026-09-21T04:53:10Z: 4 cwf.mcp.tool calls (863 · 10952 · 1957 · 732 bytes); no aggregate_records call; no cwf.grounding span in the stage 10 span list (UNMEASURED why)
rendered Q3 prose asserted %95.84 · %82.06 · %94.77 while the OEE table printed "3 satır kaynakta yok · 0 satır" (CWF-S149-Q3Q4-WITNESS-v1)
```

## PREMISE

MEASURED: 2026-09-21T17:35Z, every line in `lines` re-read at the local-master sha named in `floor`; the scout measured the same files byte-identical at the GitHub head (SCOUT-STATUS-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v1, STEP 1).
MEASURED: 2026-09-21T17:35Z, the value an MCP tool returns to the SDK is `refusal` (stageTools.ts:2027) or `withCompletenessAccount(formatted, observation)` (:2032) — NOT `formatted` itself; the four local tools return an object whose string twin is the JSON.stringify at :2070, :2107, :2116, :2157 (scout R3, confirmed).
MEASURED: 2026-09-21T17:35Z, `ok` feeds memory episode classing (memoryDistill.ts:157/:169), the funnel, the grounding_violation telemetry event and the admin badge (scout R2, memoryDistill confirmed by the Architect; the others by the scout).
MEASURED: 2026-09-21T16:30Z, the Q3 OEE payload carries integer percent-scale values (evidence `digest`, one payload, one read); whether other tools return fractions is UNMEASURED and is why the x100 reading stays (scout R4).
UNMEASURED: the false-positive rate on real turns. That is what the measurement exists to read; STAMP mode is the owner's flip after reading it.
UNMEASURED: why the Q4 digest carries no cwf.grounding span. Report what you find; do not fix it in this card.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). At your head: re-print the lines in `lines` and say SAME or DIFFERENT for each. Run the existing groundingCheck tests and print counts. Print ONE real OEE-class payload's value shape from a recorded fixture or the digest (percent vs fraction) and name it in the report. Print the GroundingInput and GroundingVerdict shapes you will extend.

ORDER 1 - THE NUMERIC LEDGER reads the value RETURNED TO THE SDK (answers R3). For MCP tools, ledger the exact string placed in `result` at stageTools.ts:2027 (the refusal) or :2032 (withCompletenessAccount output) — so a _completeness total the model sees is ledgered, and a formatted body the model never saw is not. For the four local tools (resolve_time_range, aggregate_records, query_records, web_fetch), ledger the JSON.stringify string beside each recordToolCall at :2070, :2107, :2116, :2157. NEVER ledger `rawForClient` (:1860): it carries the full payload including hidden handle records and would false-source fabrications. Extract every numeric literal (integers, decimals, percentages, values inside JSON), store the raw literal and its readings (ORDER 3), per turn, on ctx beside toolResultMetas. Never persisted.

ORDER 2 - THE MEASUREMENT LIVES OUTSIDE THE VERDICT (answers R1 and R2). GroundingInput gains an OPTIONAL numericLedger. GroundingVerdict gains a separate field `numeric: { unsourced: number | null, values: string[] }`. ABSENT ledger (every existing test, memoryAbLens.ts:208/:228, api/admin/replay.ts:257-258) -> the check does not run and `numeric.unsourced` is null ("unmeasured", never 0). PRESENT ledger, even empty -> the check runs; an empty ledger with numeric claims flags each claim (the Q3 shape). `ok`, `violations`, `violationKinds` and `vocabSource` stay byte-identical: no new GroundingViolationKind is added, and the four existing kinds, memory classing, funnel, telemetry event and badge see exactly what they see today. Pin that with a mutation test in the groundingCheck.ts:582-588 pattern (flip the numeric result; ok and violations must not move). Promote `numericClaimsUnsourced` (number or null) to the cwf.grounding span output beside violationCount and to one new span attribute in observability/config.ts; the values list (canonical values only, at most twenty) goes through the same scrub boundary as other span IO (answers N4). Exempt from claims, each with a test: (a) a value in the user's query; (b) dates, times, years (ISO dates, hh:mm, four-digit years 1900-2099, day/month forms); (c) list and heading markers at line start; (d) a value inside an identifier token (res_12, KB7, Glazur3).

ORDER 3 - READINGS, NOT ONE CANONICAL FORM (answers R4). Write a new extractor; do NOT reuse parseNum (groundingCheck.ts:81, strips every separator). A claim is SOURCED if ANY of its readings matches ANY reading of a ledger value: (i) an ambiguous single separator is read BOTH ways ("12.500" -> 12500 and 12.5; "95,84" -> 95.84 and 9584); two separators resolve by position ("1.234,5" and "1,234.5" -> 1234.5); (ii) a %-marked claim also matches the ledger value x100 and /100; (iii) a claim written with d decimals matches a ledger value rounded to d decimals (tool 95.8412, answer %95.84 -> sourced); (iv) a hyphen between digits is a RANGE, never a sign ("3-5 gün" -> 3 and 5). One failing-first fixture per rule.

ORDER 4 - STAMP MODE behind a governed parameter (answers N2, N3). Add `grounding.numericMode` as a STRING agent.param with a dedicated resolver in the VECTOR_ENGINE / SYNTHETIC_MODE pattern (agentParams.ts:1044-1053): floor 'measure'; 'stamp' is the only other accepted value; an unknown published value resolves to 'measure' and is logged loud, never silently. sessionTweakable false. No migration and no seed row: the self-seed reconciler births the code-floor row (scout N2, publishAgentParamCore.ts:86-88, 145-168); if your head shows otherwise, STOP and name it. The owner flips it in the admin UI (OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1); no lane publishes it. In 'stamp' mode, when `numeric.unsourced` > 0, build ONE sentence and join it into the stageStream.ts:667 concatenation beside scope/partial/floor/premise notices, in the turn's language (Turkish authored, English translated): Turkish "Şu sayılar bağlı araç verisinde bulunamadı — model hesabı, kaynakta yok: <values>"; English "These numbers were not found in the connected tool data — model arithmetic, not in source: <values>". Grounding reads ctx.fullText before the join, so the stamp's own numbers never re-enter the check (scout N3). Zero or null appends nothing.

ORDER 5 - TESTS, failing-first, each proven by planting the fault it guards and removing the plant. Fixtures use SYNTHETIC numbers and zone names only, and check:tenant-zero runs over them (N6): (a) an OEE-shaped tool string (three zones, hourly integer-percent rows) and an answer asserting an average in no row -> numeric.unsourced = 1, value listed; (b) the same answer after an aggregate_records-shaped JSON string carrying that average is ledgered -> 0; (c) exemptions (a)-(d) -> 0; (d) one fixture per ORDER 3 rule (i)-(iv); (e) ABSENT ledger -> numeric.unsourced === null and the existing four-kind tests unchanged, including groundingCheck.test.ts:376, :406, :417, :424 byte-identical; (f) mutation test: ok and violations do not move when the numeric result flips; (g) a number present only in rawForClient (hidden handle record) and absent from the returned string -> unsourced; (h) a _completeness total present only in the withCompletenessAccount output -> sourced; (i) STAMP: exactly one appended sentence in the turn's language, none at 0 or null; unknown mode value -> 'measure', logged. PLANT: make the extractor drop %-marked literals and show (a) go RED; restore.

ORDER 6 - Branch off current master, ONE pull request, --no-ff history, never a squash. npm run build (all five gates; reseal in the SAME commit if doc-drift maps a file) and the suite, locally; print counts, naming them as local results on an unsynchronised head. Report at the path above on the SAME branch; the report follows the landing and never gates it (12.8). The report names the two MEASURE-mode false-positive classes this card accepts on purpose (N1): a follow-up that restates last turn's sourced number (the ledger is per turn), and a number from governed prompt knowledge (targets, thresholds); their counts are UNMEASURED until the digest is read. It also says in one sentence why the client guard and this ledger are different lenses (N5): the client answers "is it in the full source", the server answers "did the model see it"; neither replaces the other. Slip with the forty-hex head, the PR number, and the numeric.unsourced value fixture (a) produced.

## FALSIFIER

If the string returned to the SDK at :2027/:2032 or the local-tool JSON at :2070/:2107/:2116/:2157 is not what the model receives, STOP and name the value that is. If `ok`, `violations` or any existing groundingCheck test moves, STOP and name it — this card adds a measurement, it changes no verdict. If the extractor cannot flag fixture (a) without flagging an exemption or a rule fixture that should be sourced, STOP and print the collision — a validator that cries wolf is worse than none. If adding the string param needs a migration or a seed row at your head, STOP and name it. Plant: feed the ledger from `rawForClient` instead of the returned string and show fixture (g) go GREEN-when-it-should-be-RED (a hidden record false-sources the claim); restore.

## SHARED SURFACES

```scope
- api/cwf/_lib/grounding/groundingCheck.ts
- api/cwf/_lib/grounding/types.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/turn/stageTools.ts (ledger push at the :2027/:2032 return seam and beside the four local recordToolCall lines; nothing else)
- api/cwf/_lib/turn/stageStream.ts (span output field; the stamp joins the :667 concatenation)
- api/cwf/_lib/observability/config.ts (one attribute constant)
- api/cwf/_lib/knowledge/reference/agentParams.ts (one string key and its resolver)
- a new small module for the numeric extractor and its readings beside groundingCheck.ts
- api/cwf/__tests__/ (groundingCheck.test.ts additions, a new numeric-ledger test and its synthetic fixture)
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md
```

## DECISION RIGHTS

You choose the extractor's exact patterns within ORDER 3's four rules, the ledger's data structure, the module and test file names, and the sentence's exact punctuation. You may refuse on evidence this card did not anticipate. FORBIDDEN: no new GroundingViolationKind and no change to `ok`/`violations`; no change to src/lib/tableCellsFromBytes.ts (the client lens stays); no rewrite of the model's text in any mode; no block/regenerate mode; no persistence of the ledger; no ledger fed from rawForClient; no backend or tenant name in new code or fixtures (AGNOSTIC-1, check:tenant-zero); no merge; no adversary/scout post on your own head; no poll or cron task; no migration; never print an environment value.

END · CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2
