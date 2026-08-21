# CWF — SUCCESS-ONLY-RECALL-1 · DESIGN NOTE · v1

<!-- cwf-success-only-recall-1-design-v1 · 2026-08-06 · S83 · Architect: Claude (Opus 5).
     Closes: BUG-032 (conv-poisoning). Rollout: 2F.0c. SOTA criterion: LongMemEval
     (memory hygiene; Tier C). Queue position 1 (bucket v21 §BUG.5).
     STATUS: DESIGN — the AG-1 phase prompt derives from this; nothing here is enacted.
     Every live-state claim below names its in-session source (D-1/D-3). -->

---

## §1 · THE DEFECT, RESTATED FROM EVIDENCE

Production pattern, measured at S82 (8/8): `conv=0` → success
(`27f4ec93·8b2cb9bc·4802570d`), `conv≥1` → failure
(`31f2276d·0c8632b3·ce354e56·b875b00d`). A turn that answers "çizemiyorum"
poisons every later turn in the same conversation; a fresh chat with the same
question and the same data succeeds. The system works in a clean context and
poisons itself with its own failures — literature warning #5 verbatim (a failed
trajectory goes to review, never into the playbook).

## §2 · THE CARRIERS — three, not two, and they carry different payloads

Read this session from `stagesModel.ts:229-244`, `memoryRetrieve.ts`,
`stageTools.ts:401`, plus the live governed rows (Supabase read, this session):

| # | Carrier | Injects into the prompt | Carries the poison sentence? | Can be zeroed? |
|---|---|---|---|---|
| C1 | `agent.historyWindowN` = 6 (published v1) | the prior ASSISTANT answer's FULL TEXT | **YES — this is the payload** | **NO** (min 1, code decl + published row + shared clamp) |
| C2 | memory carrier read (`k1=2`) + scored read | `asked` heads · entity ids · TOOL NAMES — never answer text (`composeMemorySliceBlock`) | No — but it steers: a failed turn's tool path is offered back at importance 2 (`ANSWERED_WITH_TOOLS`), indistinguishable from success | YES (`agent.memory.retrievalTopK` min 0 = zero reads, published v1) |
| C3 | `router.contextTurns` = 2 (published v2) | prior USER messages only (`priorUserMessagesFrom` filters `role==='user'`) | **Structurally cannot** — assistant text never enters it | YES (min 0) |

**Named scope statement (D-7 Q7), not a deferral:** C3 is out of this phase's
diff BY MECHANISM — the class it would need to carry (assistant failure text)
cannot reach it. What C3 CAN repeat is the user's own words; that is not a
failure product. If a future defect shows sticky-category poisoning, that is a
NEW bug with its own name, not this one resurfacing.

**The bootstrap's §0 experiment ("historyWindowN 6→0") is DEAD**, proven twice
this session: the code decl (`agentParams.ts:215`, min 1) and the live published
payload both forbid 0, and the shared clamp applies to every source. §5 replaces
it with an experiment that runs through a legal door.

## §3 · THE SUCCESS PREDICATE — what the server can honestly stamp

By flush time (`chat.ts:344`, where `distillAndWriteEpisode` runs) the ctx
already carries, deterministically (read this session from `stageStream.ts`):

- `ctx.surfacedEmpty` — empty-completion guard fired (OBS-2);
- silent-finish fired (`isSilentFinish` branch replaced `ctx.fullText`);
- `ctx.toolLedger` — `calls / failures / successes / brakes / toolRepairs`;
- `answerUnbackedDespiteFailures(ctx.toolLedger)` — prose despite failed reads;
- `ctx.groundingSummary.ok` — Mode A verdict, when the check ran.

**One closed vocabulary, no fourth shape** (the MEASURE-READ-HONESTY-1 spirit
applied to outcomes):

```
outcome.class ∈ { 'failed' | 'unproven' | 'clean' }
failed   := surfacedEmpty OR silentFinish OR answerUnbacked
            OR (groundingSummary present AND ok === false)
            OR (toolLedger.calls > 0 AND toolLedger.successes === 0)
unproven := NOT failed AND (render outcome unknowable server-side — the default
            for every tool-carrying turn; see §4 THE RENDER GAP)
clean    := NOT failed AND zero-tool prose turn (nothing to render, nothing unproven)
```

`failed` is a server FACT. `clean` vs `unproven` is an honesty split, not a
quality split: the server must never claim "proven" for a class it cannot see.

**THE RENDER GAP, named before building (this phase's F-4):** `api/**` contains
zero chart-drawn signals (grepped this session); drawn/not-drawn is computed
client-side (`parseMessageContent` segments, reused by `proseRenderParity.ts`).
Therefore the SERVER predicate cannot mark a viz turn `failed` for "chart not
drawn". The remedy is split by carrier in §4: the carrier that carries the
poison (C1) is CLIENT-assembled, and the client IS the render layer — it knows.
The memory flag (C2) keeps the narrower server predicate, with the narrowing
stated in the column comment. A server-visible render-outcome seam is NOT built
here and is NOT silently deferred: it is the first named candidate for
`STEP-EFFICIENCY-1`'s companion measurement, where the panel already needs a
per-turn outcome row (queue #12; recorded there by name at merge).

## §4 · THE THREE GATES

### G1 · Write-side flag (C2 write) — zero migrations
`memoryDistill.ts` gains the §3 predicate (pure function, ctx in / class out)
and stamps `decision.outcome = { class, signals: {surfacedEmpty, silentFinish,
answerUnbacked, groundingOk, toolFailures} }` — an ADDITIVE key inside the
EXISTING `decision` jsonb column (migration comment already defines `decision`
as an open shape; no DDL, no Operator). The row is STILL WRITTEN — the bucket's
own remedy is "flag on the write path + filter on the read path", and the
literature's warning 4 says failed trajectories go to REVIEW, not to /dev/null:
a flagged row keeps MemoryTab's review path alive. The importance ladder is
corrected in the same move: `failed` turns score BELOW `ZERO_TOOL` (new rung
`FAILED: 0`), ending the S83 recon finding that a failed tool-carrying turn
scored equal to a successful one.
`[MemoryWrite]` line gains ` outcome=<class>` — never a second log line.

### G2 · Read-side filter (C2 read)
Both bounded reads (`listRecentByConversation`, `listRecentByUser`) exclude
`decision->outcome->>class = 'failed'` — in the QUERY, not post-filter, so the
carrier read's k1=2 slots are never wasted on rows that will be dropped
(otherwise a conversation whose last two turns failed reads as "no memory",
which is a different lie). Three-state honesty preserved:
- `failed` → never offered (the fix);
- `unproven` / `clean` → offered (today's behaviour for good turns);
- **legacy rows with NO outcome key → offered** — pre-phase rows are
  `unproven`-by-absence, named in the code comment; they age out by TTL
  (90 days, published v1). Excluding them would silently zero the store on
  deploy day — the empty≠zero violation wearing the fix's clothes.
`CANDIDATE_COLUMNS` widens to carry `decision` (read projection change, test-pinned).

### G3 · History hygiene (C1 — the load-bearing carrier)
The client already RECEIVES the server's failure facts on the `turn_done`
payload (`empty`, `answerUnbacked`, `toolFailures`, `brakes` — read this
session, `stageStream.ts:500-556`). G3 closes the loop where the history is
ASSEMBLED (`cwfStore.ts sendMessage`, the `.slice(-10)` builder):

1. On `done`, the client computes `msg.outcomeFailed :=` server facts
   (`empty || answerUnbacked`) **∪ render facts** (`proseRenderParity`'s own
   drawn/not-drawn state — the render gap closes HERE, on the carrier that
   matters, with knowledge the client already computes for the parity notice).
2. `conversationHistory` assembly REPLACES a failed assistant message's content
   with one fixed compact marker — TR/EN per the turn's language:
   `"[önceki deneme başarısız oldu — içeriği bağlama taşınmadı]"` — never
   silently drops the message: the turn STRUCTURE survives (the user's "tekrar
   dene" must still parse), the poison SENTENCE does not.
3. **S82-5 is the law here and it already fired once on this exact payload
   family** (BURST-GUARD-1-FIX-1: `brakes` died in two by-name hops,
   `cwfService.ts` + `cwfStore.ts`). The phase prompt will require the test to
   enter THROUGH THE PARSER on both hops, with the mutation control being
   deletion of the assembly line itself — a hand-built message object proves
   nothing (S82-5 verbatim).

**What G3 does NOT do:** no server-side rewriting of any answer (owner ruling
2026-08-05, recorded on the `answerUnbacked` comment); no write to `messages`
(C1 LAW untouched — the marker exists only in the request-time history array,
never in storage); the on-screen bubble is UNCHANGED — the user still sees what
happened; only the NEXT turn's context stops eating it.

## §5 · §0 — THE DISCRIMINATING EXPERIMENT (replaces the dead 6→0)

**Question:** in a poisoned conversation, is C2 (memory) a NECESSARY carrier, or
is C1 (history) sufficient alone? Log reads could not separate them (S82); this
does, through a legal door (`retrievalTopK` min 0):

1. AG (gated CLI `scripts/publishAgentParam.ts`, standing consent, reason
   `success-only-recall-1-s0-experiment`) publishes `agent.memory.retrievalTopK`
   → **0**.
2. Architect confirms the arm ENGAGED before any conclusion (S66-1 positive
   control): Vercel runtime log shows `[Memory] skipped reason=retrieval-off`
   on the next turn — I read this myself (Vercel MCP live this session).
3. **Owner re-asks the failed question in the SAME poisoned conversation** —
   real-world test, legitimate owner surface (D-4 class c). ONE message.
4. Outcome: still fails → C1 is sufficient alone (G3 is load-bearing; G1/G2
   are hygiene). Succeeds → C2 was necessary (G1/G2 are load-bearing too).
   Either way ALL THREE GATES SHIP — the experiment sets the post-deploy
   proof's emphasis, never the scope (S82-6).
5. AG publishes `retrievalTopK` back to **3** in the same relay, and the
   Architect confirms restoration from the next turn's `[Memory] offered=` line.

## §6 · POST-DEPLOY PROOF (S63-1 — merge is not proof)

Named before the build, all three read by the Architect directly:

- **P1 (the fix):** reproduce the 8/8 shape — force one failed turn, re-ask in
  the SAME conversation → the answer succeeds. The exact scenario that failed
  8/8 now passes; one clean run is the smoke, the standing instrument is P2/P3.
- **P2 (memory filter, negative):** the failed turn's episode row exists with
  `outcome.class='failed'` (Supabase read) AND the next turn's `[Memory]`
  line does not offer it.
- **P3 (S66-1 positive control):** a SUCCESSFUL episode from the same
  conversation IS still offered — a filter that silences everything would pass
  P2 and be catastrophically wrong, the M-A guardian lesson in memory form.
- **P4 (history marker, client):** after a HARD refresh (istemci-yenileme
  kuralı — deploy READY ≠ the user running new code), the network request body
  for the follow-up turn shows the marker where the failed answer was.

## §7 · BUDGET & FENCES

- **Migrations: ZERO** (jsonb-additive). **Operator steps: ZERO.**
- **Governed publishes: exactly two**, both §0's experiment flips (0 → 3),
  AG-lane gated CLI, reasons named.
- **Touch budget (D-6): the standard four** — prompt relay · report · GO ·
  merge report. The §0 experiment's owner message (one re-ask) is the phase's
  real-world test inside touch 2's window, not a fifth touch.
- **Untouched by construction, test-pinned where cheap:** eval-gate ·
  `messages` writes (C1 LAW) · grounding/knowledge isolation (M-MEM2 —
  memoryRetrieve still imports nothing from `grounding/`) · the on-screen
  transcript · C3's two layers.
- **Lane:** AG-1 (fresh, clean slate confirmed by owner this session). AG-2
  stays idle until a non-overlapping cut exists; G3 touches `cwfService.ts` /
  `cwfStore.ts` / `ChatShell` — the known shared-risk surface, so no parallel
  lane on `src/` until this merges.

## §8 · WHAT WOULD FALSIFY THIS DESIGN

Stated before building (TOTAL-45 applied to my own note): if §5 shows the
poisoned conversation SUCCEEDING with memory off BEFORE G3 lands, then C1 is
not the payload carrier and §2's table is wrong — the phase HALTS at §0 and the
design returns to me; AG does not improvise a new mechanism mid-phase.

<!-- END · cwf-success-only-recall-1-design-v1 -->
