# PHASE-GATEWAY-BURST-GUARD-1 · v1

<!-- PHASE-GATEWAY-BURST-GUARD-1-v1 · 2026-08-05 · S82 · Architect: Claude (Opus 5).
     Closes BUG-020 (queue position 1). ONE self-contained relay (D-2) — nothing
     in this file depends on another document being open.
     ZERO migrations. ZERO Operator steps. ZERO governed publishes at merge. -->

**Lane:** AG (Author). **Anchor:** `origin/master` = `5f2dee584717dcc9cd296589c126adf7c839bd0d`
**Branch:** `phase/gateway-burst-guard-1`
**Floor at anchor (re-derive, do not trust this line):** 461 test files · 67 migrations ·
docVersion `rev 195 · 2026-08-05` · 13 ADRs.

**Touch budget (D-6):** four — prompt relay · report paste · GO relay · merge report.
**This phase has NO Operator gate.** It adds three governed `agent.param` rows that
self-seed through the S46 reconciler; there is no migration and no second quartet.

---

## §0 · LIVE READS FIRST — no code is written before these are run and pasted

Every value below is pasted **verbatim from the command that produced it** (D-3). A read
that cannot be completed is written as *"not read"* with the reason (S81-3 rule 3), never
omitted and never rounded into a conclusion.

**R0.1 — the param key shape.** Read `api/cwf/_lib/knowledge/reference/agentParams.ts`:
the `AGENT_PARAM_KEYS` map, the `REFERENCE_AGENT_PARAMS` decl array, the Zod schema that
validates a decl, and `AGENT_PARAM_SEEDS`. **Report:** are keys with the prefixes
`gateway.` and `turn.` admissible, or is there a prefix constraint? If a constraint
exists, **STOP and report** — do not rename around it.

**R0.2 — the live tool-round ceiling.** With `supabase-ro`, read the published
`agent.maxToolRounds` row (value + status) from the governed store. The Architect's
working note says the code floor is `8` (`api/cwf/_lib/llm/config.ts:22`,
`CWF_MAX_TOOL_ROUNDS` env override) while the bug entry says the live ceiling is `16`.
**Report which it is.** No design in this phase depends on the answer; it is read because
a number quoted twice with two values must not survive a third session.

**R0.3 — THE TOKEN DISTRIBUTION (this is the read the ceiling exists for).**
With `supabase-ro`, over `telemetry_events` rows of type `llm_call`, last 30 days:
per-turn total tokens — **n, min, median, p95, max**, plus the count of turns at or above
`300000`. Group by the turn id (RULE 28 join key) so a retried turn is one turn, not two
samples; state explicitly which key you grouped on.

- **PostgREST caps a select at 1000 rows with no signal.** Page to exhaustion or
  aggregate server-side. A result that might be truncated is reported as
  *"possibly truncated"*, never as a distribution.
- If the token figure does not live where expected, **report the shape you actually
  found**. Do not reshape the query until it produces a number.
- If the read cannot be completed: write *"not read"* + the reason, and the phase still
  ships — the code floor is owner-approved independently of this read.

**R0.4 — THIS PHASE'S OWN FALSIFIER.** If R0.3's distribution shows ordinary turns
routinely at or above `300000` tokens, then **the approved ceiling is wrong and this
phase must say so in the report before shipping it.** The number is the owner's
decision; a measurement that contradicts it is a finding, not a rounding error. Report
it and proceed — the value is a DB row and changes without a deploy.

---

## §1 · THE BUG, AND THE CONSTRAINT THAT KILLS THE OBVIOUS FIX

**BUG-020, measured on `trace=13d532e7`, floor `a6252b20`.** The model needed one chart
out of 191. Its filter attempt was rejected twice, it fell back to scanning, asked for
`pageSize:200`, got `records=10/191 page=1/20`, and **issued nineteen page requests
essentially at once.** The Superset MCP server returned `Streamable HTTP error` on
roughly twenty calls and, once, its own SQLAlchemy failure — **the customer's BI server
broke under our load.** Cost of that one question: `input=307908 output=4915
total=312823`.

`maxToolRounds` bounds **rounds**, not calls: nineteen parallel calls are one round. The
brake was on the wrong shaft.

**THE CONSTRAINT, measured on a HEALTHY turn (`trace=cb71521b`).**
`getScrapSummaryForZones` takes a single `targetDate`, so a seven-day question
legitimately fans out to **seven calls** — all correct, all necessary. **A blind
concurrency ceiling would have cut that turn as readily as it cut the nineteen-page
scan.**

**THE DIAGNOSIS THAT DECIDES THE DESIGN.** The two turns are structurally identical:
same tool, N calls, different arguments, one round. **There is no observable field that
separates intent**, and any brake keyed on the call count cuts both — worse, the
legitimate count grows linearly with the question's range (a month is thirty calls).

So the phase does not try to classify intent. It puts each brake on the shaft that
actually carries the harm:

| Harm | Instrument | Behaviour |
|---|---|---|
| The customer's server falls over | **per-backend semaphore** | **QUEUES. Never rejects.** Nineteen calls and seven calls both complete; neither arrives all at once. |
| Spend runs away | **per-turn token ceiling** | Stops the **loop**. Never truncates text already produced. |
| A pathological loop | **per-tool call cap, set HIGH** | A backstop, explicitly *not* a shaping instrument. |

**A brake that drops work quietly is the disease this bucket exists to remove.** Every
brake in this phase reports (G5).

---

## §2 · G1 — THREE GOVERNED PARAMS, ZERO MIGRATION

Add three decls to `REFERENCE_AGENT_PARAMS` (and their keys to `AGENT_PARAM_KEYS`),
following the `agent.maxToolRounds` / `health.minN` pattern exactly:

| key | floor value | min | max | stage | sessionTweakable |
|---|---|---|---|---|---|
| `gateway.maxConcurrentCallsPerBackend` | **3** | 1 | 12 | `11` | `false` |
| `turn.maxCallsPerToolPerTurn` | **30** | 4 | 200 | `11` | `false` |
| `turn.maxTokensPerTurn` | **300000** | 50000 | 2000000 | `11` | `false` |

`AGENT_PARAM_SEEDS` is derived from `REFERENCE_AGENT_PARAMS`, so all three self-seed
through `selfSeedReconciler` — **zero migrations, zero Operator steps.** Pin that with a
test in the shape of `resolveHealthPolicy.test.ts`'s existing *"ZERO MIGRATION"* case.

Resolution follows the established chain (DB row > code floor, one clamp), through a new
`resolveBurstPolicy.ts` in the shape of `resolveRouterPolicy.ts` / `resolveEvalCiPolicy.ts`.
One read serves all three keys.

### G1b · The floors are FAIL-CLOSED, and that is a declared F185 deviation

F185 says the code floor is **today's state**. Today's state is *unlimited*. **These
floors are real bounds anyway**, and the reason is written at the decl site: an outage
must never **disarm a safety fence**. F185 protects behavioural continuity; here
continuity would mean preserving the failure.

**Test:** with the governed read unavailable, the resolver returns `{3, 30, 300000}` —
never `undefined`, never `Infinity`, never a skipped check. Mutation-prove it: make the
resolver fall through to "no limit" and the test must red.

---

## §3 · G2 — THE SEMAPHORE: QUEUE, NEVER REJECT

New module `api/cwf/_lib/turn/backendConcurrency.ts`. Small, pure, no I/O: an
`acquire()`/`release()` semaphore plus a per-turn registry keyed by `backend_id`, held on
`TurnContext` (turn-scoped, **not** module-global).

Wrap the single existing choke point — the `await executeMCPTool(server, toolDef.name,
args)` call inside the `execute` closure at `api/cwf/_lib/turn/stageTools.ts` (~line 782).
Nothing else changes on that path.

- **`release()` goes in a `finally`.** A throwing call that never releases deadlocks the
  turn — that would be a worse bug than the one being fixed.
- The semaphore is **not** a rejection: a queued call waits and then runs. No result is
  dropped, no message is invented.

**RED-FIRST PROOF (both directions):**
1. Seven concurrent calls to one backend with limit 3 → **max observed in-flight = 3**,
   **all seven complete**, results byte-identical to the unbraked run. *(This is the
   `trace=cb71521b` constraint, executed rather than promised.)*
2. **Mutation:** remove the semaphore → the same harness observes max in-flight = 7. If
   it does not, the harness measures nothing and the first result is worthless (S82-2 —
   a test apparatus's report is also a claim; run its own red/green control).
3. **Positive control (S66-1):** with limit 7 and seven calls, max in-flight = 7 — the
   semaphore is not silently serialising everything to one.

---

## §4 · G3 — PER-TOOL CALL CAP: AN HONEST REFUSAL, NOT A DROP

A per-turn counter keyed by tool name on `TurnContext`. On the call that would exceed
`turn.maxCallsPerToolPerTurn`, the backend is **not** called; the closure returns a
sentence through **the same `resultText` seam `policyDenial` already uses** at
`stageTools.ts` (~line 780).

The sentence names: the tool, the limit reached, and that this is **a limit, not an
absence of capability** (the OUTAGE-TRUTH-1 law, which this phase must not re-break in
its own cure). It carries no tool arguments and no backend payload (BUG-005 stays closed).

Set at **30**, deliberately high: the legitimate count grows with the question's range,
so this is a runaway-loop backstop and nothing else. The value is a DB row; tightening it
later needs no deploy.

---

## §5 · G4 — THE TOKEN CEILING, AT THE LOOP'S OWN GATE

The ceiling stops the **tool loop**. It never truncates or rewrites text the model has
already produced (ADR/OUTAGE-TRUTH-1: rewriting model output is forbidden).

**`[HYPOTHESIS — from the installed package, NOT verified by the Architect]:** `ai@6`'s
`stopWhen` (used today at `api/cwf/_lib/llm/gateway.ts:178` as
`stopWhen: stepCountIs(params.maxToolRounds ?? MAX_TOOL_ROUNDS)`) accepts an **array** of
conditions and a **custom condition** receiving the steps so far.

**VERIFY THIS FIRST against the installed `ai@6.0.x` type declarations and paste the
verified signature verbatim in the report.** If it holds, add a second condition that
sums per-step usage and stops at the governed ceiling — the ceiling then lives on the
same shaft as `maxToolRounds`, which is where a loop budget belongs.

**NAMED FALLBACK, written now so it is not invented later:** if `stopWhen` does not admit
a custom condition, accumulate per-step usage in `onStepFinish`, set a flag on
`TurnContext`, and have the `execute` closure refuse further tool calls with the G3
message shape. Report which path was taken and why.

Do not change `onFinish`'s existing `resolveFinishUsage` ladder or the `llm_call` event
shape — both are shape-pinned by existing tests.

---

## §6 · G5 — A BRAKE THAT FIRES SILENTLY HAS NOT BEEN BUILT

One definition, three surfaces, no re-derivation (ADR-013 DECISION-PARITY-1).

1. **`ToolOutcomeLedger`** (`api/cwf/_lib/turn/toolOutcomes.ts`) gains
   `brakes: BrakeRecord[]` — **always present**, `[]` on a clean turn. A record names the
   brake (`concurrency` | `per_tool_calls` | `turn_tokens`), the limit value, and the tool
   or backend it applied to. **Names and numbers only** — the module's existing
   BUG-005 boundary is not widened.
2. **The `done` SSE payload** (`stageStream.ts`, beside `toolFailures` /
   `toolFailedBackends`) carries the same array, live-turn only, the same posture those
   fields already document.
3. **`resolveTurnChips`** (`src/lib/toolEvidence.ts`) gains a brake chip rendered from
   that data — the client never re-derives it.

**POSITIVE CONTROL, and it is the point of the gate:** a clean turn's payload carries
`brakes: []` — **present and empty**, never the key's absence. A test asserts
present-and-empty, because *absence equals clean* is exactly the equivalence BUG-019 and
BUG-009 exist to remove. Re-creating it inside this fix would be the joke telling itself.

---

## §7 · NOT IN THIS PHASE — named, never blank

- **Cross-turn concurrency.** The semaphore is turn-scoped. Five simultaneous users at
  three each still put fifteen calls on one backend. Named **`BURST-GUARD-CROSS-TURN-1`**,
  filed as a watchlist entry by this phase's report — not silently ignored.
- **Circuit-breaking a backend that has already collapsed** (the retry chain kept hammering
  a dead connection on `trace=13d532e7`). Named **`BACKEND-CIRCUIT-1`**.
- **`.rpc()`** is not on this path and is not touched.
- **BUG-021** (the gateway loses inner-tool schemas — the wrong guess that started the
  scan) is queue position 2 and is **not** attacked here.

---

## §8 · POST-DEPLOY PROOF — merge is not proof (S63-1)

Owed after merge, each naming SHA and trace:

1. **The constraint, live.** A production turn with a legitimate multi-day fan-out (≥7
   calls to one tool) **completes fully**, and its chip states **no limit was reached** —
   explicitly, never by absence. *This is the positive control; without it the other two
   prove nothing.*
2. **A brake, live.** A turn that trips the per-tool cap or the token ceiling: the chip
   names **which** limit and its value, and the turn is not silently short.
3. **Governed, not hard-coded.** Publish a different value for one of the three params and
   observe the new bound **with no deploy**.

**BUG-020's finish definition (owner's words), which these three must satisfy:**
> *"Ajanım müşterinin sunucusunu deviremiyor, ve bir freni çektiğinde bana söylüyor."*

---

## §9 · STANDING RELAY RULES (S81, both halves)

- The phase report is written to **`docs/relay/PHASE-GATEWAY-BURST-GUARD-1-report.md`,
  inside the branch, in the same push as the work.**
- **After merge, the merge report is appended to that SAME file under a `## MERGE`
  heading, in the same push as the merge commit.** This half did not hold on its first
  use and the owner filled the gap by hand; it is a standing obligation, not a nicety.
- The report states **how many question round-trips** the phase cost. `TYPEGATE-TRUTH-1`
  reported zero. If the number is not falling, the doctrine is not working.
- Every behavioural claim in the report either cites a command run in that same report or
  carries the label **"taken from the brief, not verified"** (S81-4).
- **Nothing goes under the rug** (S81-3): any defect noticed while building this phase is
  named in the report, including near misses and reads that could not be completed.

**Merge:** `--no-ff`, squash banned. CI must be green on the PR head **before** GO —
`in_progress`/null is not a pass. `eval-canary` is structurally skipped on PR runs (spend
fence); that is not a failure.
