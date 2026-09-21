<!-- relay-audit: v1 kind=card -->
CARD-A24-P1A-NUMERIC-GUARD-S150-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T16:35Z (owner clone at the local-master sha named in `floor`; the eight cited files are byte-identical at the origin/master sha named in `floor` — git diff --quiet, exit 0)
NEW SUBJECT: the first A24 P1 card. It goes to the scout first (project instructions 12.1); no gate lift is claimed. The scout's ADVERSARY-VERDICT on this body precedes insertion to AG-4.
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 ("v1_3 onay", 2026-09-21 19:43 TSI) and OWNER-APPROVAL-S150-PLAN-1 ("plan onay", same minute; CWF-S150-SESSION-OPEN-v1 section 5, T3 = P1-A). Design source for the requirement: the owner's Q3/Q4 witness (CWF-S149-Q3Q4-WITNESS-v1) — numbers no tool computed reached his eye.
BRANCH: phase/a24-p1a-numeric-guard-s150-1 · PUSH: yes · REPORT: docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report (F-S147-REPORT-ON-PR-LESS-BRANCH-NEVER-GATED-1).
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

PRECONDITION: git ls-remote origin refs/heads/master prints the origin/master sha named in `floor` or a descendant that does not touch the scope fence below. If a descendant touches it, STOP and print the commit.
ON-DISAGREEMENT: if any line number, symbol or behaviour below differs from what you measure at the head, YOUR READING WINS: print both, and the difference is a finding in the report.

THE PROBLEM, in plain words. On 2026-09-21 the owner asked two production questions. The answers stated OEE averages and scrap totals that no tool had computed: the model added the numbers up itself. The browser emptied the TABLES ("satır kaynakta yok") because it checks table cells against tool bytes, but nothing on the server checks a number written in a SENTENCE, so the prose carried the invented averages to the owner's eye and the grounding validator reported ok:true with zero violations. A24 v1_3 (FINAL, owner-approved) says every number that reaches the user must exist in tool bytes; groundingCheck.ts already names this extension as its planned FACTS-LEDGER. This card builds the ledger and the check in MEASURE mode first (advisory: count and list, never rewrite), with a governed switch the owner can flip from the admin UI to STAMP mode (one appended sentence naming the unsourced numbers). Blocking or regenerating is NOT in this card: the validator's own contract makes that a data-driven step after the false-positive rate is read from the digest.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| origin/master and production | MEASURED: git log origin/master in the owner clone (lane-refreshed tracking ref) + Vercel list_deployments target=production READY, 2026-09-21T16:25Z | floor |
| the cited lines at the floor | MEASURED: sed -n over the owner clone at 7572c3bbfeed23656fcf8a55f6e64d93ed240c14, 2026-09-21T16:35Z; git diff --quiet origin/master over the eight files, exit 0 | lines |
| the two golden turns and their grounding verdict | MEASURED: select over public.turn_trace_digest stages, 2026-09-21T16:30Z | digest |

```evidence:floor
owner-clone origin/master 9cb7fefc947745bec1fdd97aff62d58c34c47919 (Merge pull request #567), refreshed by a lane 2026-09-20T13:03:10+03:00
owner-clone master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 is an ancestor of it; the eleven commits between them touch only docs/relay/ (six record merges)
Vercel production READY: meta.githubCommitSha 20c1651c3fb59b48490670ffefed02099d684ed9 (Merge pull request #588); the six later deployments CANCELED by scripts/vercel-ignore.mjs (docs-only, skip by design)
```

```evidence:lines
api/cwf/_lib/grounding/groundingCheck.ts:20-27 (header, verbatim; indentation not asserted)
 * ── FACTS-LEDGER BOUNDARY (deferred; see G.4) ───────────────────────────────
 * Full numeric traceability — every number in the answer traced to a tool result
 * / handle span — is the planned extension. It is NOT built here: without
 * structured per-number provenance from the tool-result layer it produces false
 * positives, and a validator that cries wolf gets ignored. v1 enforces the
 * high-confidence invariants only (empty≠zero + count integrity). The facts-ledger
 * would consume per-number source spans emitted by toolResult.ts/resultStore.ts.
api/cwf/_lib/grounding/types.ts:71  export type GroundingViolationKind = 'empty_as_zero' | 'count_understatement' | 'fabrication_risk' | 'scope_divergence';
api/cwf/_lib/turn/types.ts:306  toolResultMetas: ToolResultMeta[];
api/cwf/_lib/turn/stageTools.ts:1943  const formatted = formatToolResult(
api/cwf/_lib/turn/stageTools.ts:1961  const meta = parseToolResultMeta(toolDef.name, formatted, server);
api/cwf/_lib/turn/stageTools.ts:1962  ctx.toolResultMetas.push(meta);
api/cwf/_lib/turn/stageTools.ts:2032  return { result: withCompletenessAccount(formatted, observation) };
api/cwf/_lib/turn/stageTools.ts:359  for (const localName of LOCAL_TOOL_NAMES) {
api/cwf/_lib/turn/stageStream.ts:583  const verdict = runGroundingCheck(groundingInputForTurn(ctx));
api/cwf/_lib/turn/stageStream.ts:650  const scopeNotice = scopeDivergenceNotice(grounding, turnLanguage(ctx));
api/cwf/_lib/turn/stageStream.ts:655  const partialNotice = partialReadNotice(ctx.toolResultMetas, turnLanguage(ctx));
api/cwf/_lib/observability/config.ts:417-421  ATTR_GROUNDING_OK · ATTR_GROUNDING_VIOLATION_COUNT · ATTR_GROUNDING_VIOLATION_KINDS
api/cwf/_lib/resultStore.ts:58  export const AGGREGATE_TOOL_NAME = 'aggregate_records';
api/cwf/_lib/resultStore.ts:240  op: 'count' | 'sum' | 'avg' | 'min' | 'max';
api/cwf/_lib/knowledge/reference/agentParams.ts:137  WEB_ENABLED: 'web.enabled',
src/lib/tableCellsFromBytes.ts:207  if (g.droppedRows > 0) parts.push(`${g.droppedRows} satır kaynakta yok · rows not in source`);
```

```evidence:digest
Q3 = the digest row created_at 2026-09-21T04:51:47Z: stage 10 spans = 4 ai.toolCall, 3 cwf.mcp.tool (getFactoryLines 863 bytes · getLineStopsReportForZones 39108 bytes · getOeeValuesForZones 8195 bytes); no aggregate_records call; cwf.grounding output {"ok":true,"violationCount":0,"violationKinds":[]}
Q4 = the digest row created_at 2026-09-21T04:53:10Z: 5 ai.toolCall, 4 cwf.mcp.tool (863 · 10952 · 1957 · 732 bytes); no aggregate_records call; no cwf.grounding span present in the stage 10 span list of the digest (UNMEASURED why)
(turn ids are 32-hex and are not written here — CP-8; select them by created_at)
rendered Q3 prose asserted %95.84 · %82.06 · %94.77 while the OEE table printed "3 satır kaynakta yok · 0 satır" (CWF-S149-Q3Q4-WITNESS-v1)
```

## PREMISE

MEASURED: 2026-09-21T16:35Z, the lines in `lines` at the local-master sha named in `floor`, and git diff --quiet origin/master -- <the eight files> exit 0, so they are byte-identical at the origin/master sha named in `floor`.
MEASURED: 2026-09-21T16:35Z, `formatted` (stageTools.ts:1943) is what parseToolResultMeta reads at :1961 and what the model receives at :2032 (wrapped by withCompletenessAccount) — the ledger source and the model's view are the same bytes.
MEASURED: 2026-09-21T16:30Z, the grounding span's I/O reaches public.turn_trace_digest stage 10 through setSpanIO (the cwf.grounding output object is in the Q3 digest verbatim), so a field added to that output object lands in the digest without a digest-schema change.
UNMEASURED: whether local-tool results (resolve_time_range, aggregate_records, query_records, registered at stageTools.ts:359) pass through parseToolResultMeta or reach the model by another path. ORDER 0 measures it; ORDER 1 covers both paths.
UNMEASURED: the false-positive rate of a numeric ledger on real turns. That is what MEASURE mode exists to read; STAMP mode is the owner's flip after reading it.
UNMEASURED: why the Q4 digest carries no cwf.grounding span in its stage 10 span list (the Q3 digest does). Report what you find; do not fix it in this card.
SELF-INVALIDATION: this premise dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). At your head: re-print the lines in `lines` and say SAME or DIFFERENT for each. Run the existing groundingCheck tests and print counts. Trace how a LOCAL tool result (aggregate_records) reaches the model and whether it passes parseToolResultMeta; print file:line. Print the ToolResultMeta and GroundingInput shapes you will extend. Read scripts/vercel-ignore.mjs DOC_PREFIXES only to confirm your report path is docs-plane (no deploy from the report push).

ORDER 1 - THE NUMERIC LEDGER (tool side, deterministic). At the seam of stageTools.ts:1961 (and the local-tool seam ORDER 0 found), extract every numeric literal from the exact text the model receives (`formatted`, and the local tool's result text): integers, decimals with point OR comma, percentages, negatives, values inside JSON. Normalize each to one canonical string (thousands separators removed; decimal comma to point; trailing zeros after the point dropped; leading plus dropped) and record it in a per-turn ledger on ctx (a new field beside toolResultMetas, e.g. numericLedger: Map<canonical, Set<toolName>>). A handled result (resultStore) ledgers ONLY what the model saw — the summary, sample and note — never the hidden record set; numbers behind a handle reach the model only through aggregate_records, whose output is ledgered like any tool text. The ledger is per turn, never persisted.

ORDER 2 - THE NUMERIC CLAIM CHECK (answer side, deterministic, MEASURE mode). In groundingCheck.ts add the violation kind 'numeric_unsourced' (severity 'warning'). Extract numeric claims from answerText with the SAME normalization as ORDER 1. Exempt, by name and each with a test: (a) a value that appears in the user's query (GroundingInput.query); (b) dates, times and years (ISO dates, hh:mm, four-digit years 1900-2099, day/month forms); (c) list and heading markers at line start ("1.", "2)"); (d) a value inside a tool name, handle or identifier token (res_12, KB7, Glazur3). Every remaining claim whose canonical value is NOT in the ledger is one violation; the verdict carries the count and the list of canonical values (values only, at most twenty, no surrounding text — the digest is not a PII surface). A turn with no tool result and no numeric claim is ok; a turn with numeric claims and an EMPTY ledger flags every claim (that is the Q3 shape when the model computes). Promote the count to the cwf.grounding span output as numericClaimsUnsourced (present on a clean turn as 0 — empty≠zero, exactly as violationCount is) and to a new span attribute in observability/config.ts beside ATTR_GROUNDING_VIOLATION_KINDS. MEASURE mode changes no byte of the answer and blocks nothing.

ORDER 3 - STAMP MODE behind a governed parameter. Add the agent.param key `grounding.numericMode` to knowledge/reference/agentParams.ts in the same shape as the router knobs around WEB_ENABLED: code floor 'measure', allowed values 'measure' | 'stamp', sessionTweakable false, published value from domain_rules through the existing gate (the owner flips it in the admin UI — OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1; no lane publishes it). In 'stamp' mode, at the seam of stageStream.ts:650-655 and in the SAME shape as partialReadNotice (APPENDED after the model's text, never a rewrite, in the turn's language, Turkish authored and English translated), append ONE sentence when the count is above zero: Turkish "Şu sayılar bağlı araç verisinde bulunamadı — model hesabı, kaynakta yok: <values>"; English "These numbers were not found in the connected tool data — model arithmetic, not in source: <values>". Zero unsourced claims append nothing (no notice is a real state).

ORDER 4 - TESTS, failing-first, each proven by planting the fault it guards and removing the plant. Fixtures use SYNTHETIC numbers and zone names (never real plant data): (a) a tool text shaped like the OEE payload (three zones, hourly rows with performance/availability/quality/oee) and an answer asserting an average that is in no row -> numericClaimsUnsourced = 1 and the value is listed; (b) the same answer after an aggregate_records-shaped result carrying that average is ledgered -> 0; (c) exemptions (a)-(d) of ORDER 2 each -> 0; (d) "%95,84" in the answer with 95.84 in the tool text -> sourced (comma/point); "1.234,5" and "1234.5" -> the same canonical; (e) MEASURE mode: answer bytes untouched, span output carries the count; (f) STAMP mode: exactly one appended sentence in the turn's language, none when the count is 0; (g) a clean turn's span output carries numericClaimsUnsourced: 0, not an absent field; (h) the existing empty_as_zero / count_understatement / fabrication_risk / scope_divergence tests pass unchanged. PLANT: make the extractor ignore percentages and show (a) go RED; restore.

ORDER 5 - Branch off current master, ONE pull request, --no-ff history, never a squash. npm run build (all five gates; reseal in the SAME commit if doc-drift maps a file) and the suite, locally; print counts, naming them as local results on an unsynchronised head. Report at the path above on the SAME branch; the report follows the landing and never gates it (12.8). Slip with the forty-hex head, the PR number, and the numericClaimsUnsourced value your fixture (a) produced.

## FALSIFIER

If `formatted` at stageTools.ts:1943 is NOT the text the model receives at :2032, STOP and name the variable that is. If the extractor cannot flag fixture (a) without also flagging at least one exemption fixture in ORDER 4(c), STOP and print the collision — a validator that cries wolf is worse than none (groundingCheck.ts header). If any existing groundingCheck test must be weakened to pass, STOP and name it. If adding the agent.param key requires a migration or a seed row, STOP and name it: this card carries no migration. Plant: remove the ORDER 1 ledger push for MCP results and show fixture (b) go RED (the sourced average becomes unsourced); restore.

## SHARED SURFACES

```scope
- api/cwf/_lib/grounding/groundingCheck.ts
- api/cwf/_lib/grounding/types.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/turn/stageTools.ts (the ledger push at the :1961 seam and the local-tool seam ORDER 0 finds; nothing else)
- api/cwf/_lib/turn/stageStream.ts (span output field; the stamp notice at the :650-655 seam)
- api/cwf/_lib/observability/config.ts (one attribute constant)
- api/cwf/_lib/knowledge/reference/agentParams.ts (one key)
- a new small module for the numeric extractor/normalizer beside groundingCheck.ts, if you prefer it to inline code
- api/cwf/__tests__/ (groundingCheck.test.ts additions and a new numeric-ledger test with its fixture)
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
- docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md
```

## DECISION RIGHTS

You choose the extractor's exact patterns and the normalization details within ORDER 1-2, the ledger's data structure, the module and test file names, and the sentence's exact punctuation. You may refuse on evidence this card did not anticipate. FORBIDDEN: no change to src/lib/tableCellsFromBytes.ts (the client guard stays as the second lens); no change to the behaviour of the four existing violation kinds; no rewrite of the model's text in any mode; no block/regenerate mode; no persistence of the ledger; no backend or tenant name in the new code (AGNOSTIC-1, check:tenant-zero); no merge; no adversary/scout post on your own head; no poll or cron task; no migration; never print an environment value.

END · CARD-A24-P1A-NUMERIC-GUARD-S150-1-v1
