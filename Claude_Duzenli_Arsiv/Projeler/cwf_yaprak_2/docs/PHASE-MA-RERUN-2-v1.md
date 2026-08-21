# PHASE · `MA-RERUN-2` · v1 — the ask-rate criterion, made provable

<!-- PHASE-MA-RERUN-2-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     Author lane: AG. ONE self-contained relay (D-2) — every dependency embedded.
     Rollout position: register v84 §8's second item, immediately after
     LENS-CEILING-1 (merged 4469a370).
     ZERO migrations. ZERO Operator. ZERO new lens runs. ZERO LLM cost.
     TOUCH BUDGET: the standard quartet (prompt · report · GO · merge report).
     This phase carries NO long-running proof, so no second quartet is opened. -->

---

## §0 · PRECONDITION (S47-1)

```
FRESH FULL clone · git fetch --all · git rev-parse origin/master
  EXPECT 4469a37057ac4819d64e078000c2232e58bb9187
```

| Check | Expected |
|---|---|
| `ls supabase/migrations \| wc -l` | 67 |
| test files | 447 |
| `docVersion` | `rev 190 · 2026-08-04` |
| `docs/adr/` | 13 |

**And one input you already hold:** the `--all` P4 evidence JSON (5.9 MB), run
`11:38:21Z → 13:34:21Z`, window frozen at `until=2026-08-04T11:38:21.647Z`,
`population.synthetic 7071` / `telemetry 167`, `armoredFrames 7227`. **If that
file is gone, STOP** — do not re-run the lens to recover it; report and wait.

Branch: `phase/ma-rerun-2`. Merge only on the Architect's verbatim GO.

---

## §1 · WHAT THIS PHASE IS, AND THE TRAP IT EXISTS TO AVOID

`cwf-sota-definition-v1_3` §10 carries exactly one internal number:

> **gate block rate (M-A)** — 85 % ask-rate · 98.9 % entity-unresolved ·
> `MA-GATE-LENS-1` · 2026-07-25 · **pre-DISCOVERY-EXTEND-1 — STALE**

`MA-RERUN-1` (S81) tried to refresh it and returned **VOID**: the corpus had
outgrown the instrument's 5000-row ceiling. `LENS-CEILING-1` removed the ceiling
and the full corpus has now been read. **This phase is the analysis. No new run.**

**THE TRAP, and it already caught the Architect once.** The S81 recon prescribed
reconstructing a like-for-like population by **matching `n`**. That was disproven
with figures in the same session: a recency-ordered cap over a per-set-rotated
corpus concentrates on recent traffic (`perUtterance.n` 9 → 52 and
`LINE × entity-unresolved` 20 → 420 between the 3000- and 5000-row windows).
**Matching a count is not matching a population.** That error is S81-C.

The reconstruction here is therefore **temporal**, not size-based:
`evaluations[].row.createdAt` is in the evidence, so the population the baseline
saw is isolated by **time**, and the count is used only as a **control** on
whether the isolation worked — never as the selector.

---

## §2 · THE BASELINE — carried, and NOT re-derivable

From `cwf-ma-gate-baseline-findings-v1` (2026-07-25), quoted in
`docs/replay/ma-gate-rerun-S81-v1.md` §3:

| Metric | Baseline |
|---|---|
| Population | **2534** armored frames |
| Per-frame block rate | **84.6 %** |
| Entity-unresolved share of blocks | **2120 / 2144 = 98.9 %** |

**These figures cannot be independently re-derived** and are not re-measured
here. §10's "85 %" is the 84.6 % figure rounded; use **84.6 %** and note the
rounding once.

---

## §3 · GATES

### G0 · HONESTY PRECONDITION — assert before quoting any rate

Read `readIntegrity` from the P4 evidence. It must be
`{ totalSeamInvocations: 7231, degradedFrames: 0, unknownFrames: 0, byFailure: { discovered: 0, floor: 0 } }`.

- `degradedFrames === 0` **and** `unknownFrames === 0` ⇒ the run is certified
  clean and rates may be quoted plainly.
- **Anything else ⇒ every rate in this phase carries a caveat naming the exact
  counts.** Do not drop the frames; do not silently proceed.

This gate exists because the instrument that produced this JSON was built
yesterday to be able to say it was interrupted. **Use it, on its first real
outing.** State the assertion in the report either way — a precondition checked
silently is not a precondition.

### G1 · THE CUTOFF — pre-registered, chosen BEFORE any rate is computed

The baseline artifact is dated 2026-07-25 with no recorded clock time, so the
cutoff must be **derived, not assumed**.

**The rule, and it is binding in this order:**

1. For each candidate cutoff `T` at **hourly** boundaries across
   `2026-07-25T00:00:00Z … 2026-07-26T00:00:00Z` inclusive, count the armored
   evaluations with `row.createdAt <= T`.
2. Choose the `T` minimising `|count(T) − 2534|`. **Ties break to the EARLIER
   `T`.**
3. **Report the chosen `T` and its count BEFORE computing a single rate**, and
   say so in the report's own ordering.

**You may not adjust `T` after seeing any rate.** If the numbers look wrong with
the chosen `T`, that is a finding to report, not a reason to re-pick. This is the
flattery-trap rule applied to ourselves: the selection rule is authored before
the result is known.

### G2 · THE POSITIVE CONTROL — the reconstruction can FAIL, and must be allowed to

Let `d = |count(T) − 2534| / 2534`.

| `d` | Verdict |
|---|---|
| ≤ 2 % | **VALID** — like-for-like comparison published |
| 2 % – 10 % | **VALID WITH CAVEAT** — published with the delta named in the same sentence as every rate |
| > 10 % | **INVALID** — **publish no comparison.** Report the count, the cutoff sweep, and the most likely reason. The stale row stays stale and says why |

A drift of a few frames is expected (a stored frame that no longer passes
`armorIrFrame` leaves the armored set — the full run reports **11** unarmorable).
A large drift means the corpus is not append-only in the way this reconstruction
assumes, and **that** is the result.

### G3 · THE TWO NUMBERS — computed separately, never blended

**(a) Like-for-like** — over the `createdAt <= T` subset only:
per-frame block rate; entity-unresolved share of blocks; both beside 84.6 % and
98.9 % with the deltas.

**(b) Today** — over the **whole** 7227-frame armored set: the same two rates.
This is the current state of the gate and is a different fact from (a). Label
each with its `n` every time it appears. **A rate without its `n` beside it does
not go in the report.**

"Block" = the gate did not leave the turn on the normal path. Derive it from the
evidence's own vocabulary (`byOutcome.HIGH + byOutcome.ALT_D` — the
`shortCircuitRate` numerator) rather than re-deriving a definition. If the
baseline's 84.6 % was computed on `HIGH` alone rather than on HIGH+ALT_D, **say
so and report both**, because a comparison across two different definitions is
not a comparison.

### G4 · `high-unattributed` — verify the correspondence, don't inherit it

S81 reported that `high-unattributed` (155/155 at L5000) corresponded exactly to
`layerStatus = declared-empty` on the `equipment` layer — but that was an
**inference across two surfaces**, because the per-row layer status was not in
the evidence. **It is now**, as `evaluations[].entityRead.layerStatus`
(`LENS-CEILING-1` G4).

Report the actual per-row cross-tab of `cause === 'high-unattributed'` against
`entityRead.layerStatus`. If the correspondence is not 1:1, **that is the more
interesting result** and it must not be smoothed toward S81's sentence.

### G5 · WHAT STILL BLOCKS — the per-object breakdown

Report block counts by `row.frame.object` over the full armored set, and within
that the split by `cause`. This feeds `DISCOVERY-EXTEND-2`'s scoping, which the
S82 bootstrap warns is **not** a zone problem: 159 ZONE frames were all resolved
and blocked nothing, while `ORDER` and `EMPLOYEE` dominated the surviving blocks
and **neither has a declared entity layer**. Confirm or refute that on the full
corpus. Counts only — no entity strings.

### G6 · THE INSTRUMENT — a committed, deterministic analyser

`scripts/analyseClarificationRun.ts`: reads an evidence JSON path, prints the
aggregates above, **writes nothing** and **reads no DB, no network, no clock**.

- Pure core extracted so it is unit-testable without a 5.9 MB fixture; tests go
  in **`api/cwf/__tests__/`** (vitest's `include` covers `api/**/__tests__` and
  **not** `scripts/**`).
- **Determinism proof (N-rep):** run it twice on the same file; the two outputs
  must be **byte-identical**. Report the comparison command and its result.
- **BUG-005 is binding:** the analyser must never print `row.factory`,
  `messageTr`, `entityRead.scope`, or any entity surface — not even truncated.
  Aggregates and enum labels only. Add a test asserting the output contains no
  field from that list.

### G7 · THE REPORT — `docs/replay/ma-gate-rerun2-S82-v1.md`

Aggregates only. Sections, in this order (the order is the pre-registration
evidence): G0 assertion → G1 cutoff sweep and choice → G2 verdict → G3 (a) then
(b) → G4 cross-tab → G5 breakdown → G6 determinism → open questions.

---

## §4 · WHAT IS NOT IN THIS PHASE

- **No new lens run.** The JSON exists; re-running would change the population
  and destroy the frozen window.
- **No `§10` edit.** The Architect ships `cwf-sota-definition-v1_4` from your
  numbers. You supply the measurement; the contract is amended in the Architect
  lane.
- **No `DISCOVERY-EXTEND-2` work.** G5 informs its scope; it does not start it.
- **No re-derivation of the 2026-07-25 baseline.** It is carried, and §2 says so.

---

## §5 · CI AND RESEAL

Five gates on the PR head, each reported by name; `in_progress`/`null` is not a
pass: build (20.x) · build (22.x) · coverage · rule26 (chronic flake F-BW01 — at
most ONE ordered rerun, only on a signature match) · eval-canary (skipped by the
spend fence on PR runs — not a failure).

`scripts/**` and `docs/**` are not mapped by any doc-drift tab, so **no reseal is
expected**. Run `npm run build` anyway and **obey whatever the guard says**; if
it fires, it is hash-only and you report which tabs and why.

---

## §6 · REPORT — the hand-back

1. Branch and head SHA · the §0 numbers you computed · the JSON's identity
   (path, size, `until` timestamp) so the analysis names its input.
2. G0's assertion, verbatim from the evidence.
3. G1's full hourly sweep table, then the chosen `T` — **in that order**.
4. G2's verdict with `d`.
5. G3 (a) and (b), each rate carrying its `n`.
6. G4's cross-tab. G5's breakdown.
7. G6's determinism comparison.
8. Test deltas, five CI conclusions, doc-drift outcome.
9. **Anything the brief did not anticipate, by name.** Declared scope growth is
   legitimate (FIX-SCOPE-TRUTH-1); silent growth is not. If you think a gate is
   wrong, say so **before** implementing something else.

**Do not merge.** RULE-25 review from a fresh clone, then a verbatim GO.

<!-- END · PHASE-MA-RERUN-2-v1 -->
