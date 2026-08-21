# PHASE-GATEWAY-BURST-GUARD-1 · AMENDMENT 1 · v1

<!-- PHASE-GATEWAY-BURST-GUARD-1-AMENDMENT-1-v1 · 2026-08-06 · S82.
     Amends PHASE-GATEWAY-BURST-GUARD-1-v1 (S37-1: a presented artifact is
     immutable; an amendment is a new file, folded as ONE in-branch commit).
     Cause: a production turn taken by the owner AFTER the prompt was issued
     supplies a measurement that decides a design question the prompt left
     under-specified, and ANSWERS one of the prompt's own §0 reads. -->

**Applies to:** `PHASE-GATEWAY-BURST-GUARD-1-v1`, branch `phase/gateway-burst-guard-1`.
**Nothing already built is invalidated.** G1's floors, G2's semaphore, G3's cap and G5's
reporting are unchanged. This amendment touches **G4 only**, plus two §0 reads.

---

## §A · THE MEASUREMENT — one production turn, read from its own log

`trace=90f1f5ede80d51fbd14b1f5325ed5439` · `POST /api/cwf/chat 200` · 2026-08-05T21:36:19Z ·
`dep=dpl_3B7pa51EEYiPBZu5bX73oVZguEAy` · `branch=master`.
Question (Turkish): *"Granit fabrikasını doğalgaz tüketim grafiğini çizer misin 10 gün için?"*

Copied verbatim from the Vercel runtime log of that request:

```
[Token Usage] provider=gemini model=gemini-2.5-flash input=418546 output=2346 total=420892
[LLMFinish] provider=gemini attempt=0 finishReason=error output=2346 reasoning=1944 cached=304292 warnings=0 empty=false
[Params] temperature=0.7(db) historyWindowN=6(db) maxToolRounds=16(db) maxOutputTokens=16384(db) thinkingBudget=8192(db)
[LLMFinish] silentFinish=true finishReason=error toolCalls=13
```

Shape of the turn, counted from its own `[MCP Call]` lines: `search_tools` ×3 ·
`call_tool` ×10 (of which **eight are `list_charts` pages 1–8 of 20**) · plus one local
`resolve_time_range`. It reached the right artifact — `call_tool → get_chart_info` returned
`{"id":80,"slice_name":"Granit - Glazür 3 Vardiya Bazlı Doğalgaz Sarfiyat Grafiği", ...}` —
and then the completion **errored** before producing any answer.

**Three things this turn establishes, and one it does not.**

1. **`total=420892` — larger than BUG-020's original disaster turn (`312823`).** The
   owner-approved ceiling of `300000` is not a theoretical bound; it is a bound **two
   observed production turns have already crossed**, six days apart, on different failure
   paths.
2. **`cached=304292` of `input=418546`.** Most of the input was cache-read. This is the
   fact that forces §B.
3. **`maxToolRounds=16(db)`** — §0's R0.2 is answered (see §C).
4. **It does NOT establish that the brake would have produced a better answer.** The
   ceiling stops the tool loop; what the model then writes is its own. Claiming the user
   would have got their chart is not supported and is not claimed.

---

## §B · RULING — THE CEILING COUNTS `totalTokens`, CACHED INCLUDED

The prompt's G4 said *"sums per-step usage"* without saying **which** usage. On this turn
the two candidate definitions differ by a factor of nearly four:

| definition | this turn | fires at 300000? |
|---|---|---|
| `totalTokens` | **420 892** | **YES** |
| non-cached (`input − cached + output`) | ~116 600 | no |

**Ruling: `totalTokens`.** Reasons, in order:

1. **The failure being fenced is the turn getting too big, not the invoice.** This turn
   ended `finishReason=error` at 418 546 input tokens; the cached ones were in the context
   the model had to process regardless of who paid for them. A fence that ignores cached
   input would have watched this turn fail and done nothing.
2. **Spend already has its own fence.** Q-1's per-user monthly chat quota is the money
   instrument. Two fences aimed at the same thing would be one fence and one decoration.
3. **BUG-020's own framing counts totals** — *"Cost of that single question:
   `input=307908 output=4915 total=312823`"*. Changing the unit silently between the entry
   and its fix is how a fix stops closing its own bug.

**NAME THE COST, do not bury it (S81-3):** on a long, heavily-cached conversation this
ceiling fires earlier than a spend-based one would. That is a deliberate posture, not an
oversight, and it is written at the decl site. **The brake message and the chip must
therefore say what was reached — a token ceiling on the TURN — and never imply the user's
question was rejected on price.**

**Report requirement:** the phase report states, in one line, the field it summed and the
`ai@6` accessor it summed it from, copied from the code it wrote.

---

## §C · §0 · R0.2 IS ANSWERED — do not spend a read on it

`[Params] … maxToolRounds=16(db) …`. The live published value is **16**, source **db**.
The Architect's note that `api/cwf/_lib/llm/config.ts:22` yields `8` was correct about the
**floor** and wrong to leave the live value open. Both statements are now reconciled:
**floor 8, live 16, published.** R0.2 is closed by this line; do not re-read it.

---

## §D · §0 · R0.3 GAINS TWO ANCHORS — the distribution read is STILL OWED

Two measured turns at or above the ceiling now exist:

| trace | date | total tokens |
|---|---|---|
| `13d532e7` | 2026-08-05 | `312823` |
| `90f1f5ed` | 2026-08-05 21:36Z | `420892` |

**These are two points, not a distribution.** Both are failures, so they are a biased
sample by construction — they say nothing about where an ORDINARY turn sits, which is the
only thing that tells us whether `300000` is a fence or a wall. R0.3's `supabase-ro` read
over `telemetry_events` stands exactly as written, and R0.4 (this phase's own falsifier)
stands with it.

---

## §E · POST-DEPLOY PROOF — this turn is now a named replay candidate

§8's proof 2 (*"a turn that trips a brake"*) gains a concrete, repeatable candidate: the
same question, on the merged SHA. It is a candidate and not a guarantee — the model may
take a shorter path on any given run, and **a turn that does not trip the brake is
reported as a turn that did not trip the brake** (S81-3 rule 2: a near miss is never
recorded as a pass), never re-run until it cooperates.

---

## §F · WHAT THIS AMENDMENT DOES NOT DO

- It does **not** widen scope. Three defects observed in this same turn — a tool counter
  that disagrees with its own evidence list, a Turkish question answered with an English
  system message, and the gateway losing `get_chart_data`'s parameter schema (BUG-021,
  queue position 2) — are filed in the bug bucket by name and are **NOT** this phase's
  work. Do not fix them here.
- It does **not** change G1, G2, G3 or G5, or any floor value.
- It does **not** relax anything: `300000` is unchanged, and the ruling in §B makes the
  fence fire **sooner**, not later.

**Fold as ONE in-branch commit (S55-2).** If any part of G4 is already written against the
other definition, change it and say so in the report.
