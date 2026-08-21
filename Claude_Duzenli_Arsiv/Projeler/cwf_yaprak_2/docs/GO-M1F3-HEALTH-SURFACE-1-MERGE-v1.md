# GO · M1F3-HEALTH-SURFACE-1 · MERGE · v1
<!-- GO-M1F3-HEALTH-SURFACE-1-MERGE-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     RULE-25 from a FOURTH fresh full clone (/home/claude/s80r3). Every value
     computed there (D-3), independent of the hand-back. -->

## §1 · VERDICT: **GO** (merge only — migration stays Operator-pending)

## §2 · THE HAND-BACK'S ONE OMISSION

**The remote branch hash was not reported.** §4's STOP FOR REVIEW requires it and
it is the one value a reviewer cannot infer. I derived it myself rather than
proceed on a name:

```
phase/m1f3-health-surface-1 → f6c03a60960a38182e66d97020c45dcbceb5a157
```

One commit ahead of `310e4c05`, `merge-base --is-ancestor` YES, no stray parent.
Not a defect in the work — a gap in the report. **Include it next time; a review
that has to go find its own subject is a review with an unpinned premise.**

## §3 · RE-DERIVED INDEPENDENTLY

| Claim | My result |
|---|---|
| migrations | **67**, exactly one new: `20260803160000_turn_feedback_triage_and_latency_dedup.sql` ✓ |
| `evalGate.ts` | diff **0 lines** ✓ |
| docVersion | `rev 185` ✓ |
| `TABS` | parsed with comments stripped: **17**, `'health'` last ✓ (a naive parse returns 18 — the array now carries a comment; worth knowing before anyone greps it) |
| C1 LAW | the only new `messages` access is `.select('id')` in `findAssistantMessageIdByTraceId` — a **read**. Zero inserts/updates/deletes ✓ |
| triage door exists | `api/admin/feedback-triage.ts` → `markReviewed`, and it is a **compare-and-set** (`.is('reviewed_at', null)`), so a double click reports `already-reviewed` instead of overwriting an earlier reviewer ✓ |
| queue bound | `total` from a **separate `exactCountOrThrow`**, `truncated = rows.length < total`, limit clamped `[1, 200]` ✓ — truncation is computed, not inferred from a short page |
| golden button gate | `HealthTab.tsx:174` `can(PERMISSIONS.GOLDEN_CURATE)`, and the action walks the EXISTING curation door ✓ |
| honesty-card source | `measurementFailure.ts` + call sites in `memory-forget`, `runSyntheticInjectorTick`, `health-analytics` ✓ |

**The column-privilege narrowing, read in full (S43-2):**

```
revoke update on public.turn_feedback from authenticated;
grant  update (verdict, reason_text) on public.turn_feedback to authenticated;
revoke update on public.turn_feedback from anon;
```

This is the correct instrument and it is worth naming why: **RLS gates ROWS, a
column grant gates COLUMNS.** `turn_feedback_update_own` is `auth.uid() =
user_id` with no column list, so the moment `reviewed_at` existed, every user
could mark their own 👎 reviewed and drain the queue from under the reviewer. No
policy edit could have closed that. **This hazard was not in my brief** — I wrote
"must NOT widen the owner policy", which pointed at the right table and the wrong
mechanism. AG found it because the standing owner-CRUD gate went red, then
taught the gate the narrowing pattern and mutation-proved it **both ways** rather
than weakening it. That is the correct response to a gate that catches you.

The pair constraint is right too: `check ((reviewed_at is null) = (reviewed_by
is null))` — two columns that cannot disagree, absence as the only representation
of unreviewed, and a **partial** index on exactly the queue predicate so it stays
proportional to the work outstanding rather than to history.

**The latency dedup, read verbatim:** `llm_call` rows with a `session_id`
collapse to one per turn taking `max(latency_ms)` — correct, because the clock is
cumulative from the headers, so the max IS the end-to-end time; `llm_call` rows
with a NULL `session_id` pass through individually (nothing to key on, and
inventing one would be fabrication); **`tool_call` is never collapsed.** That
last arm is a correction to my brief: I wrote "one turn contributes one latency
sample", which applied to `tool_call` would have destroyed real independent
per-call measurements while claiming to fix a bug. AG said so instead of
obeying.

**The new p95 bar carries its own epistemic health warning.** `30_000`, and the
decl says in code: PROVISIONAL, grounded on **n=41 — one qualified day**, with
the measurement provenance stated (read through the pre-G1.2 aggregate, and
proven uncontaminated because `llm_call` samples equalled turns on all eight
days, i.e. zero retries). A value that documents the weakness of its own evidence
is worth more than a confident one.

## §4 · ONE RESIDUAL (named, non-blocking)

**F-M1F3-1 · one guard still throws without leaving a trace.**
`TurnTraceDigestRepository.deleteOlderThan` throws `ReadUnavailableError` (1.3a,
Class A). Its only caller, `api/admin/turn-trace-digest-cleanup.ts:40`, calls it
with **no try/catch and no `recordMeasurementUnavailable`**. So a read failure
there 500s the cron and the honesty card's "measurement failures caught" footnote
**silently undercounts by one source.**

Severity is small and bounded: the cron is daily, the failure is loud (a 500, not
a silent zero), and the card's number is a footnote rather than a fence. But the
card's whole point is that the count is complete, and today it is not.

**This does not block the merge and it does not get its own phase.** It rides the
Operator quartet's DOC-FLIP, which already edits this migration's header — three
lines: a try/catch, the emit, a test. Flagged here so it is corrected, not
discovered.

## §5 · ON THE FIRST `rule26` RUN

34 specs failed on the first attempt and AG reports the cause as real and its
own: the 17th nav row pushed `<nav>` 9px past its own height, turning the sidebar
into a scroll trap and failing 30 **pre-existing** specs. It was fixed and re-run;
AG states plainly that the green run is **after the fix, not a re-run of the same
code**.

That distinction is the whole of NO-RERUN-ON-A-FLAKE-CLAIM and it was honoured.
It is also the clearest argument this program has produced for RULE-26 existing
at all: adding one tab silently broke a surface nobody was looking at, and a
rendered-evidence gate caught it before a human ever saw the panel.

## §6 · MERGE INSTRUCTION

**STEP 1 — CI is the arbiter (S37-2).** Open a PR from
`phase/m1f3-health-surface-1`. On a `pull_request` run `eval-canary` is
structurally skipped (`if: push || workflow_dispatch`) — **report ×4 + skip as
what it is, and the real ×5 from the master push run.** Do not translate either
into "5/5". Report both run ids.

**STEP 2 — merge `--no-ff`** (squash banned) with the message below,
**byte-verbatim**; push; report the remote master hash.

```
Merge PHASE-M1F3-HEALTH-SURFACE-1: the 17th tab, and Block 1 closes

The measurement layer gets a face, and the last item in Block 1 is done.

Adding a triage column to turn_feedback silently widened turn_feedback_update_own:
that policy is auth.uid() = user_id with no column list, so every user could have
marked their own downvote reviewed and drained the reviewer's queue. No policy
edit closes that, because RLS gates ROWS and not COLUMNS. The instrument that
does is a column grant, and the standing owner-CRUD gate is what caught it. The
gate was taught the narrowing pattern and mutation-proved both ways rather than
weakened. This hazard was not in the brief.

The latency metric now says what it measures. It is TURN GENERATION TIME — from
the SSE headers at chat.ts:257 to the answer completing at stageStream.ts:201,
tool rounds included — not "LLM latency", because the clock starts before any
provider call. The 12s bar was set without knowing that: measured p95 ran 2.1x to
5.0x over it on seven of eight days and on four days the MEDIAN alone exceeded
it, and a bar that reds every day is not a bar. It moves to 30s IN CODE WITH ITS
EVIDENCE, and the declaration says out loud that it is provisional and grounded
on n=41 — one qualified day.

llm_call latency was double-counted on retried turns: ctx.llmStartedMs is set
once outside the retry loop, so attempt two's row carries attempt one plus
attempt two. One turn now contributes one sample, taking the max because the
clock is cumulative. tool_call is NEVER collapsed — those are independent
per-call measurements, and collapsing them would have destroyed real data while
claiming to fix a bug. That correction is AG's, against the brief's wording.

CountUnavailableError and ReadUnavailableError were recorded nowhere, so the
honesty card's footnote had no source and would have shipped a fabricated zero —
the exact defect this program exists to remove. The catch sites now write one
telemetry row each, at the caller, where the existing convention puts emission.

Band 1 ships deliberately narrowed. The live SHA and per-backend health are real;
prod deploy state, CI and observability say "henüz ölçülmüyor" BY NAME and point
at OMURGA-SIGNALS-1 at the head of Block 2. The dashboard does not get to paint a
colour on something it does not measure — least of all itself.

The first rule26 run failed 34 specs and the cause was real: the 17th nav row
pushed <nav> 9px past its own height, turning the sidebar into a scroll trap and
failing 30 PRE-EXISTING specs. The green run is after the fix, not a re-run of
the same code.

ONE migration, AUTHORED and Operator-pending (ADR-005) · ZERO governed publishes
· ZERO writes to messages, the one new access is a select.
430/4782 -> 436/4861 · rule26 120 passed, 0 flaky · reseal rev 184 -> 185.
```

**TAIL ANCHOR (S61-3):** the block ends at `reseal rev 184 -> 185.` — if your copy
stops earlier the relay truncated; request it again before merging.

**STEP 3 — do NOT apply the migration.** A fenced Operator prompt follows the
merge hash.

## §7 · WHAT BLOCK 1 STILL OWES

* Operator apply of `20260803160000` + the live `verifyGrants` run.
* **F-M1F3-1** — rides the post-apply DOC-FLIP.
* **§5 proof reads:** the `/api/admin/health-analytics` endpoint read carried
  from 1.3b, now performable; plus the owner hand-witness of the tab at container
  width (D-4 class c).
* **W-M1F2A-1** — 00:00–02:00Z window, Architect. **Block 1 does not seal until
  that watch reports.**

<!-- END · GO-M1F3-HEALTH-SURFACE-1-MERGE-v1 -->
