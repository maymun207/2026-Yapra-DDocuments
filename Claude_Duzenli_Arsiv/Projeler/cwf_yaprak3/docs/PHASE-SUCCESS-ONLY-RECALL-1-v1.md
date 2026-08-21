# PHASE-SUCCESS-ONLY-RECALL-1 · v1 — LANE: AG-1

<!-- 2026-08-06 · S83 · Architect: Claude (Opus 5) → Author: AG-1 (fresh lane).
     Closes: BUG-032 (conv-poisoning). Rollout 2F.0c. Design source (authoritative
     rationale, embedded below in full where load-bearing): cwf-success-only-recall-1-design-v1.
     ONE self-contained relay (D-2). Branch: phase/success-only-recall-1.
     Migrations: ZERO. Operator steps: ZERO. Governed publishes: TWO (§0 only). -->

---

## §BASE · PROOF FIRST (S82-4 — a lane's base is PROVEN, never assumed)

```
git -C <ABS_PATH_TO_MAIN_CLONE> fetch origin --quiet
git -C <ABS_PATH_TO_MAIN_CLONE> worktree add <ABS_PATH>/wt-success-only-recall-1 -b phase/success-only-recall-1 origin/master
cd <ABS_PATH>/wt-success-only-recall-1
git rev-parse origin/master   # MUST print 40085d62627d3277fb4cb2cb9251ec2c0296ca7c
git rev-parse HEAD            # MUST print the same
git symbolic-ref --short HEAD # MUST print phase/success-only-recall-1
npx vitest run 2>&1 | tail -3 # record the baseline counts VERBATIM in the report
```

If `origin/master` ≠ `40085d62…` STOP and report — do not build on a moved base.
Every write in this session uses an ABSOLUTE path (S80-1). If any local
half-work from a previous lane exists anywhere: discard it, clean cut.

## §0 · THE DISCRIMINATING EXPERIMENT (run FIRST, tight window)

Question: in a poisoned conversation, is memory (C2) a NECESSARY carrier, or is
the history window (C1) sufficient alone? The old "historyWindowN 6→0" test is
DEAD (min:1 in decl + published row + shared clamp) — this replaces it through
a legal door (`agent.memory.retrievalTopK` min 0).

- **0a.** `npx tsx scripts/publishAgentParam.ts` → publish
  `agent.memory.retrievalTopK` = **0**, reason
  `success-only-recall-1-s0-experiment`. Paste the CLI's confirmation VERBATIM
  into the report.
- **0b.** Print to your terminal: `ARM-LIVE — owner: re-ask the failed question
  in the SAME poisoned conversation now (one message), then press enter.` and
  WAIT. (The Architect independently confirms the arm engaged from the
  production `[Memory]` log line and reads the re-ask outcome — you do not need
  to capture the chat result.)
- **0c.** The moment the owner confirms (or after **30 minutes**, whichever is
  first): publish `agent.memory.retrievalTopK` = **3**, reason
  `success-only-recall-1-s0-restore`. Paste confirmation VERBATIM. If the
  window expired unused, mark the experiment `NOT-RUN` in the report — the
  gates below ship IDENTICALLY either way (the experiment sets the post-deploy
  proof's emphasis, never the scope).

Production runs memory-off for at most this window; that is a degraded-but-
honest state and it is bounded by 0c.

## §G1 · WRITE-SIDE OUTCOME STAMP (`memoryDistill.ts` + one wiring line)

**The predicate — one closed vocabulary, no fourth shape:**

```ts
// pure function: (ctx-shaped input) -> 'failed' | 'unproven' | 'clean'
failed   := ctx.surfacedEmpty === true
         || ctx.silentFinish === true                       // see wiring below
         || answerUnbackedDespiteFailures(ctx.toolLedger)   // reuse, never re-derive
         || (ctx.groundingSummary != null && ctx.groundingSummary.ok === false)
         || (ctx.toolLedger.calls > 0 && ctx.toolLedger.successes === 0)
unproven := !failed && ctx.toolLedger.calls > 0   // render outcome unknowable server-side — NAMED gap
clean    := !failed && ctx.toolLedger.calls === 0 // zero-tool prose turn: nothing to render
```

**Wiring fact (verified by Architect recon, re-verify the byte):** the
silent-finish branch (`stageStream.ts` ~357–367) replaces `ctx.fullText` but
stamps NO ctx flag — only empty-completion sets `surfacedEmpty` (~314). Add ONE
additive line in the silent-finish branch: `ctx.silentFinish = true;` plus the
optional field on the ctx type. Do NOT reuse `surfacedEmpty` for it — that
would silently widen the L5 `payload.empty` instrument's meaning (a measured
rate must never change meaning mid-series). Quote both branch diffs in the report.

**The stamp:** `distillAndWriteEpisode` writes
`decision.outcome = { class, signals: { surfacedEmpty, silentFinish, answerUnbacked, groundingOk, toolFailures } }`
— an ADDITIVE key inside the EXISTING `decision` jsonb (its column comment
already declares an open shape; zero DDL). When `decision` was null it becomes
`{ outcome }`. The row is STILL WRITTEN on failure — flag-and-review, never
silent-drop (bucket remedy + literature warning 4: failed trajectories go to
REVIEW, not /dev/null; MemoryTab keeps its audit path).

**Importance correction (S83 recon finding):** add rung `FAILED: 0` — a
`failed` turn scores BELOW `ZERO_TOOL`, ending "a failed tool turn scores equal
to a successful one". `[MemoryWrite]` log line gains ` outcome=<class>` — same
line, never a second line.

**Tests:** predicate truth table (every disjunct flips independently + the
all-false case per class) · distill test pinning the jsonb shape · importance
rung test · a REFUSED/skipped path regression stays green.

## §G2 · READ-SIDE FILTER (`EpisodesRepository.ts`)

Both bounded reads (`listRecentByConversation`, `listRecentByUser`) exclude
failed rows **IN THE QUERY** (PostgREST filter on
`decision->outcome->>class`), never post-filter — otherwise a conversation
whose last k1 turns failed reads as "no memory", a different lie (the carrier
slots must be spent on offerable rows).

Three-state honesty, verbatim law:
- `failed` → never offered (THE fix);
- `clean` / `unproven` → offered;
- **legacy rows with NO `outcome` key → OFFERED** — pre-phase rows are
  unproven-by-absence; they age out via TTL. Excluding them would zero the
  store on deploy day: the empty≠zero violation wearing the fix's clothes.
  Express the filter so null/absent passes (e.g. `or(outcome-is-null,
  class-neq-failed)` in PostgREST terms — derive the exact syntax, prove it in
  a test with all three row shapes).

`CANDIDATE_COLUMNS` widens to carry `decision` (projection + mapper +
type). **Tests:** repository test with four seeded rows (failed / clean /
unproven / legacy-null) proving exactly three return, order intact ·
M-MEM2 pin stays green (memoryRetrieve imports nothing from `grounding/`).

## §G3 · HISTORY HYGIENE — the load-bearing carrier (client)

The client already RECEIVES the server's outcome facts on `turn_done`
(`empty`, `answerUnbacked`, `toolFailures`, `brakes` — `stageStream.ts:500+`).
Close the loop where history is ASSEMBLED:

1. **Tag:** on done, stamp the assistant message
   `outcomeFailed := payload.empty === true || payload.answerUnbacked === true
   || renderFailed` where `renderFailed` comes from the EXISTING client
   drawn/not-drawn knowledge (`parseMessageContent` segments — the
   `proseRenderParity` computation; REUSE it, never a second parser). This is
   where the server's render gap closes: the client IS the render layer.
2. **Marker:** in `sendMessage`'s `conversationHistory` assembly (`cwfStore.ts`
   `.slice(-10)` builder), a tagged message's `content` is REPLACED with one
   fixed constant — TR: `[önceki deneme başarısız oldu — içeriği bağlama
   taşınmadı]` · EN: `[previous attempt failed — its content was not carried
   into context]` — selected by the same language source the bubble used.
   NEVER drop the message: turn STRUCTURE survives ("tekrar dene" must still
   parse), the poison SENTENCE does not.
3. **Untouched by construction:** the on-screen bubble (user still sees what
   happened) · `messages` storage (C1 LAW — the marker exists only in the
   request-time array) · no server-side rewriting of any answer (owner ruling
   2026-08-05).

**S82-5 IS THE LAW HERE and it already fired once on this exact payload family
(`brakes`, BURST-GUARD-1-FIX-1, two dead by-name hops):** the test enters
THROUGH THE PARSER on BOTH hops — a real SSE fixture through `cwfService`'s
parse path, then the store's assembly — and the mutation control is DELETING
the assembly/tag line and watching the test FAIL. A hand-built message object
proves nothing. Both mutation runs quoted in the report (D-5, both directions).

## §CI · GATES

All five standing CI gates green (eval-canary structurally skipped on PR runs
is NOT a failure). Full suite green; report baseline → final counts verbatim.
No gate-engine change of any kind. `check:tenant-zero` untouched and green.

## §REPORT (touch 2 — ONE file, `docs/relay/PHASE-SUCCESS-ONLY-RECALL-1-report.md`)

§BASE proof verbatim · §0 record (two publish confirmations verbatim, wait
window, `RUN`/`NOT-RUN`) · per-gate diff summary with file:line · both
silent-finish branch quotes · truth-table + four-row repository test evidence ·
BOTH mutation-control runs · test counts before/after · the one-sentence
falsification check from design §8 (did §0, if RUN, contradict the carrier
table? if yes HALT — do not merge, return to Architect) · **push the branch to
origin BEFORE writing the report's final line** (the S83 SIGNAL-SOURCE lesson:
work that is not on origin does not exist).

Then STOP. No merge without the Architect's GO (touch 3), which will arrive
with the verbatim merge message and the blocking CI-verification STEP 1.
Merge will be `--no-ff`; squash is banned.

<!-- END · PHASE-SUCCESS-ONLY-RECALL-1 · v1 -->
