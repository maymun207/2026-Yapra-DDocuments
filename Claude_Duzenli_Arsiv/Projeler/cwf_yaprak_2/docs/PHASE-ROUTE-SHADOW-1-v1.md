# PHASE ROUTE-SHADOW-1 · v1
<!-- PHASE-ROUTE-SHADOW-1-v1 · 2026-07-29 · S68 · Architect: Claude
     Anchor: origin/master = 193b0453a7425fbfe299701a10ccc26c85e1b9ce
     (rev 155 · 375 test files · 59 migrations · docs/adr 10).
     SELF-CONTAINED (S66-2). Every law, number and threshold is restated inline.
     If a fact is not in this file it is not a precondition of this phase. -->

**Lane:** Author (AG). **Branch:** `phase/route-shadow-1`.
**READ-ONLY PHASE.** Zero migrations · zero governed writes · zero params
published · zero `prompt.segment` publishes. If you find yourself writing to any
governed table, stop and report.

---

## §0 · HARD PRE-FLIGHT (paste literal output)

```bash
git clone https://github.com/maymun207/cwf_yaprak.git rs && cd rs
git rev-parse origin/master
#   EXPECT 193b0453a7425fbfe299701a10ccc26c85e1b9ce
find . -path ./node_modules -prune -o \( -name '*.test.ts' -o -name '*.test.tsx' \) -print | wc -l   # 375
ls supabase/migrations | wc -l   # 59
grep -m1 docVersion public/architecture/manifest.json   # rev 155 · 2026-07-29
npm ci && npm test && npm run typecheck:api && npm run check:doc-drift
```

---

## §1 · WHAT THIS LENS DECIDES

`router.frameRouting` has been merged and dark since rev 129. Turning it on is a
governed publish, and the only honest basis for it is a number nobody has
produced: **how often would a frame-driven candidate set have dropped a tool the
turn actually needed.**

The lens is read-only. It does not flip anything. It produces the evidence the
owner flips on.

---

## §2 · THE TRAP THIS LENS IS BUILT AROUND

**The ground truth is contaminated by the thing being measured.** "Which tool did
the turn call" is only observable for tools that were *offered*. A tool the
router never offered could never be called, so it never enters the record. Any
Recall@k over that record is biased toward the arm that produced it — and today's
router produced all of it.

**Binding consequence: this lens computes LOSSES and REFUSES to compute GAINS.**

- Permitted: *"the flip would have removed a tool that was demonstrably needed."*
  The record supports this — the tool's necessity was established independently
  of Arm B.
- **Forbidden:** *"the flip would have offered a better tool."* The record cannot
  support it. A tool never offered was never given a chance to be called.
- **No symmetric "net improvement" number may be emitted**, and the report must
  print the refusal in its own output so a reader cannot assume symmetry.

---

## §3 · POPULATIONS — pre-registered with live values

Measured read-only on 2026-07-29 over `2026-07-20T10:42:01Z .. 2026-07-29T03:14:13Z`,
95 `ir_frame` rows, **100 % organic, single user**, zero synthetic contamination
(the injector writes `synthetic_runs`, never `telemetry_events`):

| | Population | Under the flip | Live count |
|---|---|---|---|
| **P1** | no frame | tier untouched | ~18 (denominator unreliable — see below) |
| **P2** | frame, `(action×object)` unmapped | tier untouched | 1 |
| **P3** | frame `HIGH` + mapped | **candidate set REPLACED** | **91** (52 with tools) |
| **P4** | frame `AMBIGUOUS` + mapped | set UNIONED | 3 (1 with tools) |

**P1 is deliberately out of scope.** An `ir_frame` row is written only when a
frame exists (`chat.ts:203`), so P1 must be derived from absence, and `turn_done`
is not a complete turn count — 31 frame-bearing turns have no `turn_done` row
(recorded as **F211**). P1 is risk-free by construction, so the broken
denominator blocks nothing. **Do not build on it and do not try to fix it here.**

**`QUERY_METRIC×SYSTEM` legitimately appears in BOTH P2 and P3.** The matrix cell
is null, but the F154 metric-floor adds `metrics` when the slot is filled, so the
same cell maps or doesn't depending on the frame's own slots. **The P2/P3 boundary
is not a static property of a cell.** Classify by running the real
`deriveCandidateCategories`, never by copying the table.

**Standing check (S65-2), not a blocker:** if your own census disagrees with these
counts, that disagreement is a **finding** — record it and report. Do not silently
adopt newer numbers and do not "fix" this table.

---

## §4 · THE TWO ARMS

Per turn, from the **recorded utterance** and the **recorded frame**:

- **Arm A** — `filterToolsByMessage(utterance, …, { frameRouting: false })`
- **Arm B** — same seam, same call, `{ frameRouting: true }`, frame from the record

**Both arms go through the PRODUCTION seam.** MA-GATE-LENS-1's law binds: *a copy
measures the copy, not the system.* Assert **zero occurrences** in your own source
of the tier-decision predicates and of `deriveCategories`' table — if the lens can
compute a candidate set without calling `filterToolsByMessage`, it is measuring a
second implementation. `frameRouting: true` is set on the **replay context object
only**; the production param is never read as authority and never written.

**Use the FULL recorded user message, not `telemetry_events.query_head`.** The
head may be truncated, and re-running the router on a truncated utterance
measures a different input than the one the user sent. If the full text cannot be
recovered for a turn, that turn is **excluded and counted as excluded** — never
silently substituted.

### This is an A/B of today's router, not a historical reconstruction

Both arms evaluate against **today's** governed state, deliberately. The question
is *"if the switch is flipped now, what changes now?"* — not *"what would have
happened that day."*

Print the fidelity gap rather than burying it: categories, tool mirror and the
learned map have moved since the older turns were recorded. **The learned map has
been frozen since 2026-07-29T03:03:17Z** (`router.learnEnabled = 0`, 25 rows,
`max(updated_at)` = 2026-07-28T21:12:35Z), so this gap shrinks daily and the run
is stable. Do not compare this run's output to anything measured before that
timestamp (S66-3).

---

## §5 · GROUND TRUTH, AND THE DENOMINATOR YOU MUST DECLARE

"The tool the turn needed" = a tool the model actually invoked.

**F206 (open, do not fix here):** `ctx.toolCallCount++` and the `type='tool_call'`
ledger emission happen at exactly one site — `stageTools.ts`, inside the **MCP**
branch. Local tools (`resolve_time_range`, `aggregate_records`, `query_records`)
execute, return data to the model, land in `messages.raw_tool_results`, and appear
in **neither** `tool_call_count` nor `telemetry_events`.

You do not inherit that gap silently — you **declare** it, and the declaration is
the correct scope anyway:

> Local tools are in `LOCAL_TOOL_NAMES`, registered on **every** turn, never
> routed, never filtered, never droppable. They are outside this question. Ground
> truth is **non-local tool invocations only**, and the lens prints the excluded
> count beside every rate.

Printing the excluded count is what separates a declared scope from an inherited
defect. **If the excluded count is ever 0 while tool calls exist, the lens has a
bug and must say so** rather than report a clean number.

**Source:** `telemetry_events` `type='tool_call'` rows carrying `tool_name`,
**cross-checked** against `messages.raw_tool_results` for the same turn. A
disagreement is a **finding**, not a tie to break — that is F206 measuring itself.

---

## §6 · METRICS — pre-registered before any number exists

**M1 · P3 loss rate — THE HEADLINE.** Over P3 turns with ≥1 non-local tool call
(**live N = 52**): the share where at least one called tool is **absent from Arm
B's offered set**. Report as `k/N` with N printed **every time it is quoted**
(S66-4), plus the per-tool breakdown of what was lost and the `(action×object)`
cell each loss came from.

**M1 must ship with its rule-of-three bound.** Zero failures in 52 trials means
the true loss rate's 95 % upper bound is ≈ **5.8 %**, not zero. Print that
sentence next to the number. A clean small sample is not proof.

**M2 · Recall@k per arm (F129's owed metric).** Share of turns whose called tools
are **all** present in that arm's set. **Arm A's value is a REFERENCE, NOT A
BASELINE** — §2's bias applies to it, and the lens must print that sentence
adjacent to the number.

**M3 · Census.** P1–P4 counts and, inside P3, the `(action×object)` distribution.
**19 distinct cells over 91 turns**, largest 17 — so per-cell rates are mostly
uncomputable. Cells below **5 tool-bearing turns are listed individually, never
averaged into a rate.**

**M4 · Offer-size delta.** Median and p95 of `|B| − |A|`. Not a safety metric —
the token-cost half of the decision.

**M5 · MUST-BLOCK GUARDIAN — the `ALWAYS_INCLUDE` invariant.** Arm B's set must
contain `ALWAYS_INCLUDE` on **every** turn. **One violation halts the run.** M1
falling is trivially gameable by an Arm B that offers everything; M5 with M4 makes
that visible.

### The decision rule, fixed before the run

- **M1 = 0 over N ≥ 30**, M5 clean, M4 not catastrophic → **GO** (owner publishes
  `router.frameRouting = 1`), reported with the 5.8 % bound stated.
- **M1 > 0** → **NO-GO.** Every loss examined and named individually; the flip
  waits behind a frame-correction phase targeting exactly those cells.
- **N < 30** → **NO NUMBER.** The lens reports its own insufficiency.

This rule was written before the population was read and **does not move now that
it has been.** Do not propose adjusting it in either direction.

---

## §7 · LAWS THE LENS ITSELF MUST OBEY (S65-3)

1. **Page to exhaustion.** PostgREST caps at db-max-rows (1000) with no truncation
   signal; MA-GATE-LENS-1 lost 59 % of its population to exactly this. Every read
   pages, cross-checks against an independent `count(*)`, and the lens prints
   rows-read beside every rate. **A broken counter halts the run** — the
   discovery read's `-1` → `exit 2` behaviour is the standard, not the exception.
2. **empty ≠ zero, inside the instrument.** A population with zero rows reports as
   *"exists, never observed"* — never a 0 % rate, never by vanishing (the `perSet`
   defect).
3. **Read-only.** Zero governed writes, zero migrations, zero params published.
4. **No `turn_trace_digest`.** `turnTraceDigestDisplayOnly.test.ts` scans every
   directory under `_lib/` except `observability` and `persistence` — **`replay/`
   is INSIDE the ban.** Do not import the repository, sink or builder.
5. **RULE-24.** Source is text, no NUL byte — a NUL once made a lens read as
   binary and every grep-based self-check returned a silent nothing.
6. **`--json` emits JSON alone, verified BY EXECUTION**, never by reading the diff
   (the FIX-2 lesson: `[Fence]` reached stdout during import; ESM evaluates
   imports before the body).
7. **S68-4 — a control that reports without gating is not a control.** Every
   self-check halts; none print and continue.
8. **S68-5 — no positive control may have write authority over production.**

---

## §8 · SELF-VERIFY — paste literal output

1. Clone-time `origin/master` and the final branch head.
2. `npm test` file/test counts before and after; `typecheck:api` clean.
3. `git diff --name-only -- supabase/` → **empty**.
4. Grep proving the lens contains no tier-decision predicate and no copy of the
   `deriveCategories` table — with a control file returning non-zero so the zeros
   are measured, not vacuous.
5. Grep proving no digest import anywhere in the new code.
6. The full **M1–M5** report, with N printed, the excluded-local-tool count, the
   rows-read-per-query figures, and the rule-of-three sentence.
7. The census beside §3's table, with any disagreement named as a finding.
8. The turns **excluded** for unrecoverable full text, counted.
9. Any `telemetry_events` ↔ `raw_tool_results` disagreement, listed (F206
   measuring itself).
10. `--json` verified by execution: first byte `{`, output parses standalone,
    `[Fence]` count on stdout = 0.
11. **What you did NOT do:** no migration, no governed write, no param published,
    no gain/net-improvement metric emitted, no decision-rule adjustment proposed.

**On CI (S67-2, binding):** `rule26` is ~50 % noise on master. A green does not
clear you and a red does not block you on its own. Gather evidence before any
re-run — mechanism named in the log, timing signature, whether this diff can even
reach the failing surface — and report that reasoning, never "re-ran, passed".

---

## §9 · OUT OF SCOPE (named, so each is a deferral and not a gap)

- **F206** — the local-tool ledger gap. Declared here, fixed elsewhere.
- **F211** — 31 of 95 frame turns carry no `turn_done`. Recorded; this lens joins
  on `ir_frame`, not `turn_done`.
- **P1** — broken denominator, risk-free population.
- **F185 half (a)**, the exclusion guard.
- **SYNTH-TRAFFIC-2 / F204.** The 52-turn population is single-user and organic;
  that generalization limit is printed, not solved.
- **The flip itself.** This lens produces evidence. The publish is the owner's.

---

## §10 · MERGE

`--no-ff`, squash banned. Do not compose the merge message: push, report the head
hash, request it — the Architect writes it verbatim (S30-2).

**And the merge is not the proof (S63-1):** the proof is the report itself, run
against production data, with its census and its N attached.

**TAIL ANCHOR (S61-3):** if you cannot read `END · PHASE-ROUTE-SHADOW-1 · v1`
below, this prompt arrived truncated — say so before writing code.

<!-- END · PHASE-ROUTE-SHADOW-1 · v1 · 2026-07-29 · S68 -->
