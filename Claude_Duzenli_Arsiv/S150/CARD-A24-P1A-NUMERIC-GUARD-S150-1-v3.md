<!-- relay-audit: v1 kind=card -->
CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3

LANE: AG-4
fanout: personalized (one lane, one body)
SUPERSEDES CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2, which the scout held RED (SCOUT-STATUS-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2, bus 2026-09-21T17:58:36Z) on exactly two blocking defects R5 and R6, stating in its own words "Delta to GREEN: R5 and R6 only; N7-N12 may ride as edits". This v3 applies R5 and R6 as the scout prescribed them, word for word where it gave the words, and N7-N12 as edits. Nothing else in v2 changed. The scout's findings are credited to the scout (S112-YASA-1).
ADVERSARY GATE: EXEMPT, on the loop-breaking case of project instruction 12.1 and OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1: this card REPEATS the subject of the superseded v2 and carries only the delta the scout itself named as sufficient for GREEN. The ack is the scout's own v2 status row. If you, AG-4, find any change in this body beyond R5, R6 and N7-N12, that is a finding and a STOP.
MEASURED-AT: 2026-09-21T18:10Z (owner clone at the local-master sha named in `floor`; the scout measured the GitHub head and the drift at 17:58Z)
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 ("v1_3 onay", 2026-09-21 19:43 TSI) and OWNER-APPROVAL-S150-PLAN-1 ("plan onay", same minute; CWF-S150-SESSION-OPEN-v1 section 5, T3 = P1-A). Design source for the requirement: the owner's Q3/Q4 witness (CWF-S149-Q3Q4-WITNESS-v1) — numbers no tool computed reached his eye.
BRANCH: phase/a24-p1a-numeric-guard-s150-1 · PUSH: yes · REPORT: docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report (F-S147-REPORT-ON-PR-LESS-BRANCH-NEVER-GATED-1).
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.
CODE CONTEXT: take code context with graft first (.claude/skills/graft/SKILL.md: graft ask "<question>" --source, graft grep, graft callers); open a source file only where you will edit it or prove a line (owner design contribution, S150, by name).

PRECONDITION: git ls-remote origin refs/heads/master prints the origin/master sha named in `floor` or a descendant that does not touch the scope fence below. If a descendant touches it, STOP and print the commit.
ON-DISAGREEMENT: if any line number, symbol or behaviour below differs from what you measure at the head, YOUR READING WINS: print both, and the difference is a finding in the report.

THE PROBLEM, in plain words. On 2026-09-21 the owner asked two production questions. The answers stated OEE averages and scrap totals that no tool had computed: the model added the numbers up itself. The browser emptied the TABLES ("satır kaynakta yok") because it checks table cells against the full tool source, but nothing on the server checks a number written in a SENTENCE, so the prose carried the invented averages to the owner's eye and the grounding validator reported ok:true with zero violations. A24 v1_3 (FINAL, owner-approved) says every number that reaches the user must exist in tool bytes; groundingCheck.ts already names this extension as its planned FACTS-LEDGER. This card builds the ledger and the check as a SEPARATE MEASUREMENT beside the verdict: it counts and lists unsourced numbers, it does not touch `ok`, `violations` or any consumer of them, and it never rewrites the answer. A governed switch lets the owner turn on STAMP mode from the admin UI (one appended sentence naming the unsourced numbers, shown live and after reload). Blocking or regenerating is NOT in this card.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| origin/master, its drift from the owner clone, and production | MEASURED: scout git ls-remote and git diff --stat 7572c3bbfeed23656fcf8a55f6e64d93ed240c14..origin/master, 2026-09-21T17:58Z; Vercel list_deployments target=production READY, 2026-09-21T16:25Z | floor |
| the cited lines at the floor | MEASURED: sed -n and grep -n over the owner clone at 7572c3bbfeed23656fcf8a55f6e64d93ed240c14, 2026-09-21T17:35Z, plus the scout's reads of the test and stream lines at 17:58Z | lines |
| the golden turns, their grounding verdict and the OEE value shape | MEASURED: select over public.turn_trace_digest stages, 2026-09-21T16:30Z | digest |

```evidence:floor
scout git ls-remote origin refs/heads/master at 2026-09-21T17:58Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (Merge pull request #567)
owner-clone master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 is an ancestor of it (merge-base --is-ancestor exit 0)
scout git diff --stat between them: 18 files — docs/relay/ reports, two test files (noPollTask.test.ts, vectorOriginRepairWorkflow.test.ts), .claude/boot/foreman.md, .claude/boot/free.md, .claude/boot/producer.md, .claude/commands/claim.md, .claude/loop.md, CLAUDE.md, .github/workflows/vector-origin-repair.yml, docs/ground/facts.json; NONE is in this card's scope fence (v2 stated "only docs/relay/ and two test files"; that line was wrong and is corrected here, scout N12)
Vercel production READY: meta.githubCommitSha 20c1651c3fb59b48490670ffefed02099d684ed9 (Merge pull request #588); later master deployments CANCELED by scripts/vercel-ignore.mjs (docs-only, skip by design)
```

```evidence:lines
api/cwf/_lib/grounding/groundingCheck.ts:20-27  header names the FACTS-LEDGER as the planned extension ("every number in the answer traced to a tool result / handle span")
api/cwf/_lib/grounding/groundingCheck.ts:81-84  function parseNum(raw) strips every '.' and ',' (95.84 -> 9584) — NOT reusable for this card
api/cwf/_lib/grounding/groundingCheck.ts:582-588  "`ok` and `violations` are UNCHANGED ... a mutation test pins that the check order and the ok computation are untouched" · return { ok: violations.length === 0, violations, vocabSource: vocabSourceOf(input) };
api/cwf/__tests__/groundingCheck.test.ts:82,246,256,299,303,307,311  expect(v).toEqual({ ok: true, violations: [], vocabSource: 'floor' })   (whole-verdict literals; scout R5)
api/cwf/__tests__/memoryGroundingIsolation.test.ts:180  verdict-vs-verdict toEqual (stays green with a new field on both sides; scout R5)
api/cwf/_lib/grounding/types.ts:71  export type GroundingViolationKind = 'empty_as_zero' | 'count_understatement' | 'fabrication_risk' | 'scope_divergence';
api/cwf/_lib/grounding/types.ts:114-118  absence is not a third state (forbids making `numeric` optional-and-absent; scout R5)
api/cwf/_lib/turn/memoryDistill.ts:157,169  groundingOk = ctx.groundingSummary.ok ; groundingOk === false -> episode classed failed
api/cwf/_lib/turn/stageTools.ts:1860  recordToolCall(ctx, toolDef.name, args, rawForClient);   (full client payload incl. hidden handle records — NOT the ledger source)
api/cwf/_lib/turn/stageTools.ts:2024-2027  const refusal = ... modelFacingRefusal(resultClass) ... return { result: refusal };
api/cwf/_lib/turn/stageTools.ts:2032  return { result: withCompletenessAccount(formatted, observation) };
api/cwf/_lib/turn/toolResultClass.ts:435-450  modelFacingRefusal emits a closed vocabulary only (no upstream digits; scout hostile (a))
api/cwf/_lib/turn/stageTools.ts:2070,2107,2116,2157  the four local tools' JSON.stringify beside recordToolCall (resolve_time_range, aggregate_records, query_records, web_fetch)
api/cwf/_lib/turn/stageStream.ts:583  const verdict = runGroundingCheck(groundingInputForTurn(ctx));
api/cwf/_lib/turn/stageStream.ts:596-601  count/kind span attrs set only inside if (!verdict.ok)   (Q3 is ok:true; scout N9)
api/cwf/_lib/turn/stageStream.ts:667  const finalText = ctx.fullText + scopeNotice + partialNotice + floorNotice + premiseNotice;
api/cwf/_lib/turn/stageStream.ts:689-707  each notice ALSO streamed as its own text-delta — the "both-hops rule" named at :692-694 and :698-699 (scout R6)
api/cwf/_lib/knowledge/reference/agentParams.ts:1030-1034  reference array whose indexes are load-bearing for the zero-migration self-seed (learnBrake.test.ts pin; scout N10)
api/cwf/_lib/knowledge/reference/agentParams.ts:1044-1053  VECTOR_ENGINE: a STRING with a dedicated resolver; unknown value -> honest born-loud absent state, never a silent fallback
api/cwf/_lib/knowledge/publishAgentParamCore.ts:146-151  reconciler LATENT when SELF_SEED_ACTOR_EMAIL is unset (whether production holds it: UNMEASURED; scout N11)
src/lib/tableCellsFromBytes.ts:207  "satır kaynakta yok · rows not in source" (client lens over the FULL source)
```

```evidence:digest
Q3 = the digest row created_at 2026-09-21T04:51:47Z: 3 cwf.mcp.tool calls (getFactoryLines 863 bytes · getLineStopsReportForZones 39108 bytes · getOeeValuesForZones 8195 bytes); no aggregate_records call; cwf.grounding output {"ok":true,"violationCount":0,"violationKinds":[]}
Q3 getOeeValuesForZones output head, EDITED EXCERPT (12.4: the zone uuid and the two epoch-ms timestamps are replaced by <...> placeholders; every other byte, including all metric values, is verbatim): {"<zone uuid>":[{"timestamp":<ms>,"performance":100,"availability":54,"quality":100,"oee":54},{"timestamp":<ms>,"performance":100,"availability":74,"quality":1 ...   (values are integer PERCENT scale in this payload)
Q4 = the digest row created_at 2026-09-21T04:53:10Z: 4 cwf.mcp.tool calls (863 · 10952 · 1957 · 732 bytes); no aggregate_records call; no cwf.grounding span in the stage 10 span list (UNMEASURED why)
rendered Q3 prose asserted %95.84 · %82.06 · %94.77 while the OEE table printed "3 satır kaynakta yok · 0 satır" (CWF-S149-Q3Q4-WITNESS-v1)
```

## PREMISE

MEASURED: 2026-09-21T17:35Z, every line in `lines` re-read at the local-master sha named in `floor`; the scout measured the same files at the GitHub head (v1 STEP 1) and read the test, types and stream lines at 17:58Z (v2 R5, R6, N9-N11).
MEASURED: 2026-09-21T17:58Z by the scout, every MCP executor path ends at stageTools.ts:2027 or :2032, and the local tools return the object whose string twin is at :2070/:2107/:2116/:2157 (v2 R3 ANSWERED, verified).
MEASURED: 2026-09-21T17:58Z by the scout, the TR and EN stamp sentences below pass through shared/absenceClaim.ts findAbsenceClaim as null (positive controls fire), so deriveLandingSignals at stageStream.ts:678 is not tripped.
MEASURED: 2026-09-21T16:30Z, the Q3 OEE payload carries integer percent-scale values (evidence `digest`, one payload, one read); whether other tools return fractions is UNMEASURED and is why the x100 reading stays.
UNMEASURED: the false-positive and false-SOURCING rates on real turns. That is what the measurement exists to read; STAMP mode is the owner's flip after reading it.
UNMEASURED: why the Q4 digest carries no cwf.grounding span. Report what you find; do not fix it in this card.
UNMEASURED: whether the Q3 stops payload (39108 bytes) carries 9584 or 958400 or a value in [95.835, 95.845), which would source %95.84 (scout hostile (b)). Report it if your fixture work reveals it.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). At your head: re-print the lines in `lines` and say SAME or DIFFERENT for each. Run the existing groundingCheck tests and print counts. Print ONE real OEE-class payload's value shape from a recorded fixture or the digest (percent vs fraction) and name it in the report. Print the GroundingInput and GroundingVerdict shapes you will extend.

ORDER 1 - THE NUMERIC LEDGER reads the value RETURNED TO THE SDK. For MCP tools, ledger the exact string placed in `result` at stageTools.ts:2027 (the refusal) or :2032 (withCompletenessAccount output) — so a _completeness total the model sees is ledgered, and a formatted body the model never saw is not. For the four local tools (resolve_time_range, aggregate_records, query_records, web_fetch), ledger the JSON.stringify string beside each recordToolCall at :2070, :2107, :2116, :2157. NEVER ledger `rawForClient` (:1860): it carries the full payload including hidden handle records and would false-source fabrications. Extract every numeric literal (integers, decimals, percentages, values inside JSON), store the raw literal and its readings (ORDER 3), per turn, on ctx beside toolResultMetas. Never persisted. The identifier-token boundary of exemption (d) in ORDER 2 applies on the LEDGER side too: digit runs inside a uuid, a hex id, or an identifier token are not ledger values (scout N8). Epoch-ms timestamps and byte counts that stand as their own JSON values stay ledgered; the report names the false-SOURCING class they open as UNMEASURED (N8).

ORDER 2 - THE MEASUREMENT LIVES OUTSIDE THE VERDICT. GroundingInput gains an OPTIONAL numericLedger. GroundingVerdict gains a separate, ALWAYS-PRESENT field `numeric: { unsourced: number | null, values: string[] }` (types.ts:114-118 forbids optional-and-absent). ABSENT ledger (every existing test, memoryAbLens.ts:208/:228, api/admin/replay.ts:257-258) -> the check does not run and the field is `{ unsourced: null, values: [] }` ("unmeasured", never 0). PRESENT ledger, even empty -> the check runs; an empty ledger with numeric claims flags each claim (the Q3 shape). `ok`, `violations`, `violationKinds` and `vocabSource` stay byte-identical: no new GroundingViolationKind is added, and the four existing kinds, memory classing, funnel, telemetry event and badge see exactly what they see today. Pin that with a mutation test in the groundingCheck.ts:582-588 pattern (flip the numeric result; ok and violations must not move). Promote `numericClaimsUnsourced` (number or null) to the cwf.grounding span output beside violationCount, and set ONE new span attribute (constant in observability/config.ts) UNCONDITIONALLY — outside the `if (!verdict.ok)` block at stageStream.ts:596-601, because Q3 is ok:true and an attribute placed inside would vanish on exactly the target shape (scout N9); the span attribute is the durable lens because the digest nulls outputs on cap overflow (digestBuilder.ts:198-223). The values list (canonical values only, at most twenty) goes through the same scrub boundary as other span IO. Exempt from claims, each with a test: (a) a value in the user's query; (b) dates, times, years (ISO dates, hh:mm, four-digit years 1900-2099, day/month forms); (c) list and heading markers at line start; (d) a value inside an identifier token (res_12, KB7, Glazur3).

ORDER 2-R5 - AMEND EXACTLY SEVEN TEST LITERALS (scout R5, as prescribed). groundingCheck.test.ts:82, :246, :256, :299, :303, :307 and :311 assert the WHOLE verdict with toEqual; a defined extra key fails them. Amend exactly those seven literals to add `numeric: { unsourced: null, values: [] }` and change nothing else in them. No other existing test literal may be edited; if another one fails, STOP and name it. Confirm in the report that memoryGroundingIsolation.test.ts:180 (verdict-vs-verdict) stays green unedited.

ORDER 3 - READINGS, NOT ONE CANONICAL FORM. Write a new extractor; do NOT reuse parseNum (groundingCheck.ts:81, strips every separator). A claim is SOURCED if ANY of its readings matches ANY reading of a ledger value: (i) an ambiguous single separator is read BOTH ways ("12.500" -> 12500 and 12.5; "95,84" -> 95.84 and 9584); two separators resolve by position ("1.234,5" and "1,234.5" -> 1234.5); (ii) a %-marked claim also matches the ledger value x100 and /100; (iii) a claim written with d decimals matches a ledger value rounded to d decimals (tool 95.8412, answer %95.84 -> sourced); (iv) a hyphen between digits is a RANGE, never a sign ("3-5 gün" -> 3 and 5). HOW THEY COMBINE (scout N7): for each claim reading and each ledger scaling (x1, and for a %-marked claim also x100 and /100), round the SCALED ledger value to the claim's d decimals, then compare; so ledger 0.958412 against claim %95.84 is sourced (x100 -> 95.8412 -> 95.84). One failing-first fixture per rule, plus one for the combination.

ORDER 4 - STAMP MODE behind a governed parameter. Add `grounding.numericMode` as a STRING agent.param with a dedicated resolver in the VECTOR_ENGINE pattern (agentParams.ts:1044-1053): floor 'measure'; 'stamp' is the only other accepted value; an unknown published value resolves to 'measure' and is logged loud, never silently. sessionTweakable false. APPEND the declaration at the TAIL of the reference array at agentParams.ts:1030-1034 — its indexes are load-bearing for the zero-migration self-seed and learnBrake.test.ts pins them; never insert mid-array (scout N10). No migration and no seed row: the self-seed reconciler births the code-floor row; if your head shows otherwise, STOP and name it. The reconciler is LATENT when SELF_SEED_ACTOR_EMAIL is unset (publishAgentParamCore.ts:146-151); do NOT read or print that variable's value — report only that the floor 'measure' holds in code whether or not the row is born, and name the row's birth as UNMEASURED (scout N11). The owner flips it in the admin UI (OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1); no lane publishes it. In 'stamp' mode, when `numeric.unsourced` > 0, build ONE sentence in the turn's language (Turkish authored, English translated): Turkish "Şu sayılar bağlı araç verisinde bulunamadı — model hesabı, kaynakta yok: <values>"; English "These numbers were not found in the connected tool data — model arithmetic, not in source: <values>". The stamp takes BOTH HOPS like every existing notice (scout R6, the both-hops rule at stageStream.ts:692-694 and :698-699): it joins the :667 concatenation AND is written as its own text-delta beside the existing notice writes at :705-707, so the owner sees it live, not only after reload. Grounding reads ctx.fullText before the join, so the stamp's own numbers never re-enter the check. Zero or null appends and streams nothing.

ORDER 5 - TESTS, failing-first, each proven by planting the fault it guards and removing the plant. Fixtures use SYNTHETIC numbers and zone names only, and check:tenant-zero runs over them: (a) an OEE-shaped tool string (three zones, hourly integer-percent rows) and an answer asserting an average in no row -> numeric.unsourced = 1, value listed; (b) the same answer after an aggregate_records-shaped JSON string carrying that average is ledgered -> 0; (c) exemptions (a)-(d) -> 0; (d) one fixture per ORDER 3 rule (i)-(iv) plus the combination fixture; (e) ABSENT ledger -> numeric equals { unsourced: null, values: [] }, and every existing groundingCheck test keeps its ok, violations and vocabSource, including groundingCheck.test.ts:376, :406, :417, :424 byte-identical; (f) mutation test: ok and violations do not move when the numeric result flips; (g) a number present only in rawForClient (hidden handle record) and absent from the returned string -> unsourced; (h) a _completeness total present only in the withCompletenessAccount output -> sourced; (i) STAMP, BOTH HOPS: exactly one appended sentence in the turn's language in finalText AND exactly one streamed text-delta carrying the same sentence; neither at 0 or null; unknown mode value -> 'measure', logged; (j) a uuid-embedded digit run in the ledger does NOT source a small integer claim (N8); (k) the new span attribute is set on an ok:true verdict (N9). PLANT: make the extractor drop %-marked literals and show (a) go RED; restore. PLANT: remove the text-delta write and show (i) go RED; restore.

ORDER 6 - Branch off current master, ONE pull request, --no-ff history, never a squash. npm run build (all five gates; reseal in the SAME commit if doc-drift maps a file) and the suite, locally; print counts, naming them as local results on an unsynchronised head. Report at the path above on the SAME branch; the report follows the landing and never gates it (12.8). The report names the MEASURE-mode false-positive classes this card accepts on purpose: a follow-up that restates last turn's sourced number (the ledger is per turn), and a number from governed prompt knowledge (targets, thresholds); and the false-SOURCING class (a fabricated number that matches an unrelated ledger value such as a timestamp or byte count). All their counts are UNMEASURED until the digest is read. It also says in one sentence why the client guard and this ledger are different lenses: the client answers "is it in the full source", the server answers "did the model see it"; neither replaces the other. It prints which of the seven R5 literals were amended and that no other literal was. Slip with the forty-hex head, the PR number, and the numeric.unsourced value fixture (a) produced.

## FALSIFIER

If the string returned to the SDK at :2027/:2032 or the local-tool JSON at :2070/:2107/:2116/:2157 is not what the model receives, STOP and name the value that is. If `ok`, `violations` or `vocabSource` of ANY existing test changes, STOP and name it — this card adds a measurement, it changes no verdict; the only permitted test edits are the seven literal amendments of ORDER 2-R5. If the extractor cannot flag fixture (a) without flagging an exemption or a rule fixture that should be sourced, STOP and print the collision — a validator that cries wolf is worse than none. If adding the string param needs a migration or a seed row at your head, STOP and name it. If the stamp cannot take the second hop without touching stageStream.ts beyond the fence, STOP and name the line. Plant: feed the ledger from `rawForClient` instead of the returned string and show fixture (g) go GREEN-when-it-should-be-RED (a hidden record false-sources the claim); restore.

## SHARED SURFACES

```scope
- api/cwf/_lib/grounding/groundingCheck.ts
- api/cwf/_lib/grounding/types.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/turn/stageTools.ts (ledger push at the :2027/:2032 return seam and beside the four local recordToolCall lines; nothing else)
- api/cwf/_lib/turn/stageStream.ts (span output field and one unconditional span attribute; the stamp joins the :667 concatenation; and one text-delta write beside :705-707)
- api/cwf/_lib/observability/config.ts (one attribute constant)
- api/cwf/_lib/knowledge/reference/agentParams.ts (one string key appended at the reference-array tail, and its resolver)
- a new small module for the numeric extractor and its readings beside groundingCheck.ts
- api/cwf/__tests__/groundingCheck.test.ts (additions, plus the seven literal amendments of ORDER 2-R5 and no other edit)
- api/cwf/__tests__/ (a new numeric-ledger test, a stamp both-hops test, and their synthetic fixture)
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md
```

## DECISION RIGHTS

You choose the extractor's exact patterns within ORDER 3's four rules and their combination, the ledger's data structure, the module and test file names, and the sentence's exact punctuation. You may refuse on evidence this card did not anticipate. FORBIDDEN: no new GroundingViolationKind and no change to `ok`/`violations`; no edit to any existing test literal other than the seven named; no change to src/lib/tableCellsFromBytes.ts (the client lens stays); no rewrite of the model's text in any mode; no block/regenerate mode; no persistence of the ledger; no ledger fed from rawForClient; no backend or tenant name in new code or fixtures (AGNOSTIC-1, check:tenant-zero); no merge; no adversary/scout post on your own head; no poll or cron task; no migration; never print an environment value.

## AUTHORING NOTE (12.2)

While assembling the v2 scout order, an unquoted shell heredoc evaluated two backtick spans; that draft was discarded and never inserted. This body was written with a file tool, not a shell heredoc. If any backtick span in it reads as empty or truncated to you, that is a finding and a STOP.

```evidence:adversary
ADVERSARY: EXEMPT
ack: cdd90352-4461-47b2-9113-a42ba5a2383a
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-A24-P1A-NUMERIC-GUARD-S150-1-v2 (scout from_lane row, 2026-09-21T17:58:36Z), whose stated delta to GREEN this body applies
```

END · CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3
