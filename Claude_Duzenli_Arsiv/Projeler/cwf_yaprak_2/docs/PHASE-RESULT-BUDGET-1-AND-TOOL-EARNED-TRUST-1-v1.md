# PHASE-RESULT-BUDGET-1 + PHASE-TOOL-EARNED-TRUST-1 · v1 (combined relay)

<!-- 2026-08-06 · S82 · Architect: Claude (Opus 5). TWO phases, ONE relay file,
     owner-mandated same-day cadence. They are SEQUENTIAL branches (2 then 3 —
     RESULT-BUDGET-1 first because its metric proves TOOL-EARNED-TRUST-1's effect),
     but AG receives both NOW so no relay round-trip sits between them.
     Each merges separately, --no-ff, own report, own ## MERGE (no placeholder, S82-3).
     ZERO migrations in both. S82-4: base proved equal to origin/master, not asserted. -->

**Anchor for phase A:** `origin/master` after FIX-1's merge — derive it, don't assume.
**Touch budget: four per phase.** Question round-trips target: zero (streak is 3).

═══════════════════════════════════════════════════════════════════════════════

# PHASE A · RESULT-BUDGET-1 — the page-out the turn never had

**Branch:** `phase/result-budget-1` · Closes the turn-axis gap measured on `trace=15f24d24`.

## §A0 · The measurement this phase exists for

Five `getScrapSummaryForZones` calls returned 206 order-line records (35+24+41+59+47) for
a question that asked for a *daily summary*. No single call crossed
`MAX_TOOL_RESULT_CHARS = 40000`, so tier-3 never fired — **the guard is on the call axis,
the harm is on the turn axis** — and the turn died at 315 030 tokens on day 5 of 7.

**Everything needed already exists and is verified at the anchor:**
`formatToolResult(raw, toolName, store?)` with the tier-3a STORED path
(`toolResult.ts:340-372`: full set behind `store.register()`, model gets
`recordCount + resultHandle + fields + fieldSummaries + returnedSample + stored:true`,
honesty note prepended, `truncated:false` because nothing is lost) · `aggregate_records` /
`query_records` tools already registered on `ctx.vercelTools`. **This phase builds NO new
machinery. It adds one counter and one threshold.**

## §A1 · G1 — the turn-axis budget

New governed param, the burst-guard quartet's shape exactly (`resolveBurstPolicy.ts` /
`agentParams.ts` pattern, self-seed, zero migration):

| key | floor | min | max | stage |
|---|---|---|---|---|
| `turn.resultCharBudget` | **120000** | 40000 | 2000000 | `08` |

Floor rationale, written at the decl site: ~30k tokens of raw tool results per turn.
The failing turn's five results alone exceeded it; a normal turn (`b835babd`-shaped, ~8
calls with small results) stays far under. **Fail-closed** (the burst-guard G1b precedent
verbatim, same declared F185 deviation).

## §A2 · G2 — one counter, one earlier tier trigger

`TurnContext` gains `resultCharsUsed: number` (init 0). At the `formatToolResult` call site
in `stageTools.ts` (~line 1064 vicinity): add the formatted result's length to the counter
**after** formatting. **Before** formatting, when
`resultCharsUsed + raw.length > budget` **and** a store is present and the result parses as
a record list → force the tier-3a STORED path for THIS result even though it is
individually under 40k. Everything else about tier-3a is byte-identical — same summary
shape, same honesty note, same log line (add `axis=turn` to it so the two triggers are
distinguishable in production).

- Never force-store a result that does not parse as records (tier-3a's own precondition);
  those keep today's behaviour byte-identical.
- The per-call 40k cap is UNTOUCHED. Two axes, two triggers, one shared machine.
- `recordBrake(ctx.toolLedger, { kind: 'result_budget', limit })` on first trigger —
  G5's ledger, payload, and chip carry it exactly like the other three brakes. The chip
  wording states data was **stored and queryable, not lost** — this brake loses nothing,
  and a sentence implying truncation would be a small lie of the OUTAGE-TRUTH class.
  `BRAKE_CHIP_TEXT` gains the fourth kind in both languages. **S82-5 applies: the surface
  test enters at the parser.** (The parser now names `brakes` — this rides it for free —
  but the new `kind` needs its own chip-text case, and the test proves it end-to-end.)

## §A3 · G3 — STEP-EFFICIENCY, the one metric (owner-ratified: inside this phase)

`[TurnEfficiency] calls=N distinctTools=M repeatedCalls=K resultChars=C stored=S` — one
log line at turn end, computed from the ledger and the counter (all fields already exist
or are added by G2). No new table, no UI. This line is the instrument that will prove
phase B's effect: the same seven-day question, before vs after schemas, in one grep.

## §A4 · Red-first proofs

1. Simulated turn, five record-list results of ~30k chars each, budget 120k → results 1–3
   inline, **results 4–5 STORED with handles**, `resultCharsUsed` correct, brake recorded
   once. **Mutation:** remove the counter add → all five inline, test red.
2. Positive control (S66-1): budget published high (via resolver stub) → zero forced
   stores, byte-identical output to today's path.
3. Chip: parser-entry test for `kind='result_budget'` (S82-5 shape, the
   burstBrakeSurface.test.ts precedent).
4. `[TurnEfficiency]` line asserts exact counts on a scripted turn.

## §A5 · Post-deploy proof

**The seven-day scrap question, live.** Expected: **it completes** — early days page out
to handles, the model aggregates via `aggregate_records` or reads samples, the answer
arrives, the chip says results were stored (not lost). If the model fails to use the
handle and answers thin, that is reported as measured — not retried until it cooperates
(S81-3). Name the trace and paste the `[TurnEfficiency]` line.

═══════════════════════════════════════════════════════════════════════════════

# PHASE B · TOOL-EARNED-TRUST-1 — the schema exists, the model never sees it

**Branch:** `phase/tool-earned-trust-1`, cut AFTER phase A merges (S82-4 proof again).
Closes BUG-021 (7 recorded instances of a guessed argument shape).

## §B0 · What recon already established — read, then verify at your anchor

- `backend_tools.input_schema` is **written by catalog sync on connect** and
  `BackendToolsRepository` already has a **single-tool schema read**
  (`.select('input_schema')`, DISCOVERY-EXTEND-1 G1, ~line 242). The data layer is DONE.
- The gateway's `search_tools` results reach the model carrying only
  `parameters_hint: 'request'` (`catalogSync.ts:169` stores the hint; the schema is never
  attached). That is the whole defect: **we perform progressive disclosure and withhold
  the types.**
- SOTA context, binding on the design: the industry pattern (Anthropic Tool Search /
  code-execution-with-MCP, Cloudflare Code Mode) is **on-demand disclosure** — catalogue
  large, working set small. **Do NOT preload 154 schemas into the prompt; that re-creates
  definition bloat, the disease's other half.** The schema travels in the search RESULT,
  for the tools the search returned, at the moment the model is choosing.

## §B1 · G1 — enrich the search result, nothing else

At the seam where `search_tools` results are post-processed on our side (the
`GatewayPolicy`/filter pass in stageTools that already rewrites the result array): for each
returned inner tool, look up its mirrored `input_schema` by `(backend_id, tool_name)` and
attach it as `input_schema` beside the existing fields. Depth-capped serialisation
(schemas can nest; cap at the size where a schema stops teaching and starts bloating —
propose ~2000 chars per tool, report the observed sizes). Batch the lookup (one query for
the result set, never N).

- Mirror-first, live-fallback-never: a tool with no mirrored schema gets **no** schema
  field — absent, not invented (`empty≠zero` at the schema layer). The model then guesses
  exactly as today for that tool; the failure mode is the status quo, never worse.
- `call_tool` execution path: UNTOUCHED. The fence, disposition, write-lock: UNTOUCHED.

## §B2 · G2 — the flat-tool half

The 141 ARMES flat tools already carry schemas in the Vercel tool defs (that path works —
`getScrapSummaryForZones` was never mis-called). **Verify that claim at the anchor and
state it in the report**; if any flat tool ships schema-less, name it. No code expected.

## §B3 · Red-first proofs

1. `search_tools` post-process with a mirrored schema present → result carries it
   verbatim (depth-capped). **Mutation:** drop the lookup → field absent, test red.
2. No mirrored schema → field absent AND no fabricated `{}` (both directions).
3. Batch pin: one repository call per search result set (spy/count), never per-tool.
4. Size guard: a pathological 50k-char schema truncates at the cap with an explicit
   `_schemaTruncated: true`, never silently.

## §B4 · Post-deploy proof — the bug's own reproduction

**The ten-day gas question, live, third time.** `get_chart_data` must be called with
`identifier` on the FIRST attempt — zero validation errors in the trace. Then the
`[TurnEfficiency]` line from phase A, same question: calls should drop (the 2026-08-06
turn took 8 with one wasted validation round-trip). Paste both lines. BUG-021 closes on
this trace plus the unit proofs; each of the 7 recorded instances' shape (guessed
argument container) is now structurally addressed, and the report says so per-instance
or names the ones that are not.

═══════════════════════════════════════════════════════════════════════════════

## Standing rules, both phases

Report in-branch, same push · `## MERGE` appended with the merge commit, never
pre-written (S82-3) · no control characters in prose — describe them (F-2's lesson) ·
every claim cites a command or carries "taken from the brief, not verified" (S81-4) ·
nothing under the rug (S81-3) · CI green on the head that actually merges ·
question-round-trip count in the report.
