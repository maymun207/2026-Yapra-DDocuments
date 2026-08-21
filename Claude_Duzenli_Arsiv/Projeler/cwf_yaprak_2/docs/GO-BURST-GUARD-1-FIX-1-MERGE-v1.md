# GO — PHASE-BURST-GUARD-1-FIX-1 · MERGE · v1

<!-- GO-BURST-GUARD-1-FIX-1-MERGE-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     RULE-25 on PR #162 @ 4dda455b0f0fc2a72ca08638ba2860d2beab452d, fresh full clone.
     THE MUTATION WAS RUN BY THE ARCHITECT, not accepted: parser line deleted →
     burstBrakeSurface.test.ts 5/7 red (the 2 survivors legitimately expect no chip)
     → line restored → 7/7 green. S82-5's demonstration independently reproduced. -->

**Verdict: GO.** No corrections owed. Counts re-derived: 468 test files · 67 migrations
(unchanged) · docVersion rev 197 · one commit ahead · no `## MERGE` placeholder (S82-3) ·
0 NUL bytes · money-word pin is two-directional (asserts the new sentence lacks
bütçe/budget/cost/kota/… AND that the replaced sentence contains exactly the forbidden one).

**STEP 1 (BLOCKING):** re-verify CI on the head that will actually merge. If anything moved
the head after `4dda455b`, the check re-runs on the new SHA — a green on a SHA you did not
merge is not a green.

**STEP 2 — merge:**
```
git checkout master && git pull --ff-only
git merge --no-ff phase/burst-guard-1-fix-1
```
Verbatim merge message, Architect-authored:

```
merge: BURST-GUARD-1-FIX-1 — a complete, correct surface fed by nothing

The brake fired, logged itself, and told the user nothing. Two client hops copy
payload fields BY NAME — cwfService's parser and cwfStore — and neither named
`brakes`, so the chip was null on every turn while 23 tests stayed green: they
entered below the parser, proving the renderer against data the real path never
produced. The new surface test enters at the parser with real event-stream
bytes; deleting the mapping line kills 5 of its 7.

The silent-finish sentence now reads the ledger before the finish reason,
gated finishReason==='tool-calls' && stoppedBy.kind==='turn_tokens' — because
both stop conditions produce the same finishReason, and because an ungated
ledger check would have narrated a retried error as a clean ceiling stop.
A token-ceiling stop names a turn-size limit and its governed number; a
round-cap stop keeps its old sentence byte-identical, budget word and all.

S82-5: a payload field is not a surface. Every field added to `done` needs a
test that enters at the parser.
```

**STEP 3:** append the real `## MERGE` section — merged SHA, master's new SHA, post-merge
suite line, CI run id, question round-trip count — same push as the merge commit.

**Post-deploy proof (owed, unchanged from the phase prompt):**
1. The seven-day scrap question re-run: still stopped (turn axis — RESULT-BUDGET-1's work),
   but the user now reads WHICH limit and AT WHAT value. Name the trace.
2. A clean turn: no chip on screen, `brakes: []` in the payload. Name the trace.

**BUG-020 status after this merge:** second half (says so when it brakes) — proven at the
surface, pending proof 1 live. First half carries its named residual: the concurrency brake
has never been observed firing in production. Closes on that observation or on owner ruling
that unit evidence suffices. Not closed quietly.
