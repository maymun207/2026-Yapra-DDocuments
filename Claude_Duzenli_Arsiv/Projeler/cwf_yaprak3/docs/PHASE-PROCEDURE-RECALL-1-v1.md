# PHASE-PROCEDURE-RECALL-1 · v1 — LANE: AG-1

<!-- 2026-08-08 · S87 · Architect: Claude (Opus 5) → Author: AG-1.
     Rollout 2F.1 (bucket v25 #1). Benchmarks the criterion maps to: ToolComp · Memp.
     Raw material BY NAME: F-S86-2 (trace 58f1a8b3: the proven "son 3 gün" success
     was not carried into the next turn; 9d80df71: error-parroting; 0f4902e5: the
     user re-asking verbatim). ONE self-contained relay (D-2) — design rationale
     embedded in full; there is no separate design file.
     Branch: phase/procedure-recall-1.
     Migrations: ZERO. Operator steps: ZERO. Governed publishes: ZERO. -->

---

## §BASE · PROOF FIRST (S82-4 — a lane's base is PROVEN, never assumed)

```
git -C <ABS_PATH_TO_MAIN_CLONE> fetch origin --quiet
git -C <ABS_PATH_TO_MAIN_CLONE> worktree add <ABS_PATH>/wt-procedure-recall-1 -b phase/procedure-recall-1 origin/master
cd <ABS_PATH>/wt-procedure-recall-1
git rev-parse origin/master   # MUST print b4f96eeceebd1d9867cfe6f3053fe20b8db46821
git rev-parse HEAD            # MUST print the same
git symbolic-ref --short HEAD # MUST print phase/procedure-recall-1
npx vitest run 2>&1 | tail -3 # record the baseline counts VERBATIM in the report
```

If `origin/master` ≠ `b4f96eec…` STOP and report — do not build on a moved base.
Every write uses an ABSOLUTE path (S80-1). Sandbox full-suite hangs are a known
condition: a targeted-run fallback is legitimate but must be DECLARED in the
report with the exact command used; the merge-time arbiter stays unsharded CI
(S37-2).

## §WHY · THE DESIGN, EMBEDDED (read before writing code)

**The observed failure (live rows, read by the Architect this session from
`episodes` via supabase-ro — quoted here as evidence, do not re-derive):**

- Turn `58f1a8b3` (18:02Z, S86): asked "KB7 fabrikasının 3 günlük fırın
  duruşlarını getirir misin?" · scope `{action:QUERY_EVENTS, object:DOWNTIME,
  time:"3 günlük"}` · tools `resolve_time_range ×2 → getFactoryLines →
  getLineStopsReportForZones` · outcome `unproven`, ALL failure signals clean
  (groundingOk=true, toolFailures=0, landing gates silent). The time
  resolution SUCCEEDED — and the WINNING ingredient (`relative=last_3_days` /
  "son 3 gün") is nowhere in the row, because the 1A distiller stores
  toolName+callId only.
- Turn `0f4902e5` (18:08Z): the user re-asks the SAME question verbatim and
  complains the model "uydurmakta" — the proven path from six minutes earlier
  was not carried. Turn `9d80df71` ("tablo nerede?"): error-parroting.
- Witness turn `3e0e63b0` (02:37Z, post RENDER-TIME-1): same scope, same
  3-tool chain, first-try success.

**The trap, named (§7 discipline):** the missing carrier is PROCEDURAL — a
tool CHAIN plus its winning small-scalar arguments, keyed by what the user was
trying to DO. That is soft/learned FINDING knowledge (routing-class), never
KNOWING knowledge. M-MEM2 stands byte-for-byte: this phase must not touch
`grounding/` or the knowledge warm, and the routine block must be framed as a
tool-selection hint, never a data source.

**The three design questions, decided (committed single path):**

1. **WHEN distilled → turn-close, in the existing flush.** `distillAndWriteEpisode`
   already runs post-response in chat.ts's allSettled (chat.ts:344). The
   procedure derive is PURE over ctx (persistRaw carries scrubbed args
   already); zero new reads, zero critical-path cost, no new write site.
2. **WHERE written → the episode row itself, ADDITIVE jsonb.** `decision` is
   jsonb and SUCCESS-ONLY-RECALL-1 set the exact precedent ("outcome is
   ADDITIVE inside this EXISTING jsonb column"). `decision.procedure` joins
   it: ZERO migration, Operator stays cold, RLS untouched, the read side
   already fetches these rows. **The governed corpus is deliberately NOT the
   v1 store**, and the excluded class is named (D-7 Q7): promotion of a
   user-private routine to a tenant-shared governed row (a `*.procedure` soft
   kind beside `routing_hint`) is Tier-2, requires N independent-user
   successes (stochastic-verification law: one user's clean sample is not
   tenant-grade proof), must enter through the draft/approval lane
   (router_proposals precedent, never a runtime write to rule_versions), and
   is the corpus ROUTER-DISTILL-1's parked re-entry would consume. Tier-2 is
   measurement-gated with that named trigger — not convenience-deferred
   (SOTA-1: the criterion 2F.1 advances is proven by THIS tier; Tier-2's
   evidence bar is structurally unmeetable with one real user).
3. **HOW recalled → a SECOND delimited block at the SAME stage-9 seam, from
   the SAME two bounded reads.** The episodic slice is "bağlam ipucu"; a
   routine is ACTIONABLE and epistemically different — blending them into the
   offered-3 lines would let a procedure masquerade as context. Separate
   delimiters, separate framing sentence, zero additional repository reads
   (the carrier k1=2 + candidate window 50 rows are already in hand; the
   procedure match is an in-memory scan over them).

**SUCCESS-ONLY hygiene is the floor (owner-named):** a routine is distilled
ONLY from a turn whose every server-visible failure detector is affirmatively
green — see §G1's conjunction. `unproven` does NOT block distillation: the
render layer is invisible to the server BY DESIGN, and the S86 evidence shows
the procedure layer of `58f1a8b3` was correct even while its render failed
(RENDER-TIME-1 fixed that layer separately). What blocks distillation is any
FIRED detector, or a detector that did not run (`groundingOk === null` is
"did not look", never "clean" — empty≠zero applied to a verdict).

## §G1 · WRITE SIDE — `distillProcedure` in `api/cwf/_lib/turn/memoryDistill.ts`

Pure function, no I/O, called from `distillEpisode` and stored as
`decision.procedure` (additive key; absent when ineligible — honest absence,
never `null`-with-meaning).

**Eligibility — ALL of (the SUCCESS-ONLY conjunction, test-pinned per
conjunct):**

```
outcome.class !== 'failed'
&& outcome.signals.groundingOk === true          // strict true; null = did-not-look = ineligible
&& outcome.signals.toolFailures === 0
&& outcome.signals.surfacedEmpty === false
&& outcome.signals.silentFinish === false
&& outcome.signals.answerUnbacked === false
&& outcome.signals.fetchedNotDrawn === false
&& outcome.signals.absenceWithoutEnumeration === null
&& (ctx.toolLedger?.calls ?? 0) > 0              // MCP data tools ran (time tool alone is not a procedure)
&& ctx.irFrame != null                           // the key exists
&& ctx.irFrame.action && ctx.irFrame.object      // both key halves non-empty
```

**Content (the projection — nothing else crosses):**

```ts
decision.procedure = {
  v: 1,
  key: { action: frame.action, object: frame.object },
  steps: ctx.persistRaw.map(e => e.toolName),      // verbatim callId order, duplicates kept
  timeArgs: /* from the FIRST persistRaw entry whose toolName === TIME_TOOL_NAME:
               a whitelist projection of its args — ONLY { relative?, startDate?, endDate? },
               each only if a string; null when no time-tool call exists (honest absence) */
}
```

**Projection laws (each with a pin test):** no epochs, no `raw`, no tool
OUTPUT of any kind, no arg keys beyond the three whitelisted time-tool input
fields, no user prose beyond what `relative` itself carries (that field
already rides the client SSE via `tool-result-raw` — this adds no new
exposure class). The 1A "no raw payloads" law is upheld, narrowed further.

**Log line:** extend the EXISTING `[MemoryWrite]` accepted line with
` procedure=1|0` — the SUCCESS-ONLY precedent verbatim: the SAME line, one
more field, never a second line.

## §G2 · READ SIDE — the routine block, `api/cwf/_lib/turn/memoryRetrieve.ts`

In `retrieveMemory` (or a sibling pure helper it calls), AFTER the two reads
land and BEFORE compose:

- **Match:** among `carrier ∪ candidates` (the rows already fetched — the
  OFFERABLE_OUTCOME_FILTER has already excluded `failed` in-query), select
  rows where `decision.procedure` exists AND
  `procedure.key.action === ctx.irFrame?.action` AND
  `procedure.key.object === ctx.irFrame?.object`. No frame this turn → no
  routine (honest absence; zero fabricated matches). Winner = most recent
  `created_at`; deterministic total tie-break by id (the rankEpisodes
  discipline).
- **Compose (new exported consts, the MEMORY_SLICE precedent):**

```
[KANITLI RUTİN — başlangıç]
Bu kullanıcının GEÇMİŞTE AYNI TÜR istekte kanıtlı başarıyla sonuçlanan araç
zinciri (araç seçim ipucudur; veri kaynağı DEĞİLDİR — değerler bu turda
yeniden çözülür):
- (createdAt) adımlar: resolve_time_range → getFactoryLines → getLineStopsReportForZones · zaman: relative=last_3_days
[KANITLI RUTİN — son]
```

  Exactly ONE routine per turn (topK for procedures is a code-floor 1 — the
  DL≤2 precedent: not a tunable until there is a reason). The block is its
  own delimited unit appended after the episodic slice inside
  `ctx.memorySliceBlock`'s compose seam at stagesModel.ts:226 — one ctx
  field, two blocks, each self-delimited.
- **Honesty carries to the surface:** extend the `[Memory]` offered log line
  with ` routine=1|0`; add `routineOffered: boolean` beside `memoryOffered`'s
  counts in the SSE payload the chip already reads (U-1 chip: additive field,
  no new chip state — the memory-unavailable states already cover every
  failure shape, and a routine is only ever offered on a successful
  retrieval).
- **Doors unchanged:** identity door, kill-switch (`retrievalTopK` 0 ⇒ zero
  reads ⇒ zero routines — the routine has no separate kill-switch BY DESIGN;
  it is a projection of the same store the switch already governs), degraded
  posture, memory-down ≠ chat-down — all byte-identical.

## §G3 · TESTS (S82-5: through the real seams; D-5: mutations both directions)

1. **Eligibility truth table** — one row per conjunct in §G1: flip exactly
   that input, assert no procedure. Plus the all-green row asserting the full
   projection shape.
2. **Projection pins** — a persistRaw fixture whose time-tool args carry an
   extra field and whose entries carry `raw`: assert neither crosses; assert
   epochs absent by value.
3. **S86 replay fixture (the acceptance tie, traces named in the test):** a
   ctx shaped from `58f1a8b3`'s row (scope QUERY_EVENTS/DOWNTIME, the 3-tool
   chain, `relative` resolving "son 3 gün") distills the routine; a follow-up
   turn shaped from `0f4902e5` (same frame) retrieves it and the composed
   block contains the chain and `relative=last_3_days`. A mismatched-frame
   turn (different `object`) retrieves NOTHING.
4. **Compose pin** — delimiters exact, advisory sentence exact, '' on no
   match (an empty routine block spends nothing).
5. **Isolation** — extend `memoryGroundingIsolation.test.ts`'s grep-pin to
   the new code paths (no `grounding/`, no knowledge-warm imports).
6. **Mutation controls (quote BOTH runs):** (a) delete the
   `groundingOk === true` conjunct → truth-table reds; (b) delete the
   key-match predicate (offer most-recent procedure unconditionally) → the
   mismatched-frame test reds.

## §CI · GATES

All five standing CI gates green (eval-canary structurally skipped on PR runs
is NOT a failure; if it RUNS, read its warning line, never its conclusion —
S86-2). Full suite green; baseline → final counts verbatim. No gate-engine
change. `check:tenant-zero` untouched and green — note the compose block is
Turkish UI text and must carry ZERO tenant vocabulary (no Kale/KB7 words in
any literal; the S86 fixture's tenant words live in test files only if the
tenant-zero scope permits — if the gate covers test files, encode the fixture
scope with neutral strings and keep the trace ids in comments).

## §REPORT (ONE file, `docs/relay/PHASE-PROCEDURE-RECALL-1-report.md`)

§BASE proof verbatim · per-gate diff summary with file:line · eligibility
truth-table evidence · projection-pin evidence · the S86 replay fixture's
assertions quoted · BOTH mutation-control runs · test counts before/after ·
one-sentence falsification check: does any test prove a routine can be
offered from a turn with a fired failure signal? (if yes HALT — return to
Architect) · push the branch to origin BEFORE the report's final line (work
not on origin does not exist).

Then STOP. No merge without the Architect's GO, which arrives with the
verbatim merge message and the blocking CI-verification STEP 1
(`/actions/runs?head_sha=<SHA>`; in_progress/null is NOT a pass). Merge will
be `--no-ff --cleanup=strip`; squash is banned.

<!-- END · PHASE-PROCEDURE-RECALL-1 · v1 -->
