# GO — PHASE-TOOL-EARNED-TRUST-1 · MERGE + OPERATOR APPLY · v1

<!-- GO-TOOL-EARNED-TRUST-1-MERGE-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     RULE-25 on PR #164 @ 17b8379ce4e9d6f2947576e94e621d6ab16ccf25, fresh clone.
     Re-derived: 472 test files · repair at stage-7 (NOT gateway — AG's falsification
     of the Architect's §3 mechanism, verified in the installed ai@6 types) · rule map
     CLOSED (3 rules, foreign-error mutation red) · tenant-zero clean, 1087 files,
     positive control fires · 9 overlays staged, max 547 chars, unpublished · no
     ## MERGE placeholder · 0 NUL. -->

## PART 1 — AG-1: MERGE (verdict GO, no conditions)

STEP 1: CI green on the head that merges. STEP 2: `--no-ff`. Verbatim message:

```
merge: TOOL-EARNED-TRUST-1 — two characters took the server down

The BUG-021 log said 7 instances; production said 32. Class C is the origin
story: filters[].op should be opr — the filter rejected twice on 13d532e7,
after which the model scanned 191 charts and the customer's BI server fell
over. Two characters.

The brief's repair mechanism was wrong and the phase proved it before wiring
it: experimental_repairToolCall sees the SDK's own validation errors, never a
backend's tool-result error. A hook there would have shipped and never fired.
The repair sits at the stage-7 execute closure instead — deterministic, a
CLOSED three-rule map, one retry cap, every repair on the ledger and the chip.
A repair that guesses is BUG-021 wearing a mask; a repair that loops is a
burst with better manners.

Nine tool_doc overlays are staged from 45 days of production evidence,
unpublished: a governed publish is a write, and writes are Operator-lane.
Until that publish, this phase rests on G2 alone — said plainly.

And check:tenant-zero's red was real this time, after three phases of "known
false positive". The lesson: check which files, never just the exit code.
```

STEP 3: `## MERGE` appended, same push. **Then STOP — no new phase until the merge
chain below completes.** Report the merged SHA.

## PART 2 — MERGE CHAIN (Architect-sequenced, one at a time)

1. **AG-1 Phase B** (this GO) → master.
2. **AG-2 `phase/unit-truth-1`** — GO issued HEREWITH, contingent on chain position:
   rebase onto post-B master, resolve the known CHANGELOG ordering conflict (one hand,
   semantic-clean — verified), CI green on the new head, `--no-ff`, its report's
   `## MERGE` in the same push. AG-2 executes this at its own turn.
3. AG-2 continues PROSE-RENDER-PARITY-1 build meanwhile; its merge follows the same
   rule when ready.

## PART 3 — OPERATOR (Gemini): PUBLISH THE NINE OVERLAYS

**This is the write G1 needs.** File: `scripts/jobs/tool-earned-trust-1-overlays.json`
on post-merge master (9 rows, `<backend>.tool_doc` keys, mode append, max 547 chars,
authored from production validation errors).

- Publish via the existing governed publish path for `tool_doc` rows (the F163 flow) —
  **`supabase db push` discipline does not apply here; this is a governed-params
  publish, not a migration.** Use the gated admin publish exactly as B5-RETIRE/A5
  precedents.
- FENCE-first: read the current `tool_doc` keyspace for `superset` — expect ZERO
  existing rows for these 9 keys (fresh publish, not overwrite). If any exists, STOP:
  a human-touched row is never overwritten (2F.1 law, early).
- After publish: verifyGrants-style read-back — 9 rows present, chars match the job
  file byte-for-byte, `[TOOL-DOC]` composition visible on the next turn's log.
- ADR-007: silent success is correct; echo row keys and char counts, never values into
  logs beyond what the admin surface already shows.

## PART 4 — POST-DEPLOY PROOF (after Part 3, one live session, Architect reads)

The ten-day gas question, third time. Expected: `get_chart_data` called with
`identifier` FIRST attempt (overlay working), zero validation errors; any miss shows
the repair chip instead of a wasted round-trip. Paste nothing — the Architect reads
`[TurnEfficiency]` and `[ToolRepair]` from the deployment log directly. BUG-021 closes
on that trace + the 32-instance table in the report.
