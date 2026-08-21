# RECON · MA-RERUN-1 — the clarification-gate re-read · v1_1

<!-- RECON-MA-RERUN-1-v1_1 · 2026-08-03 · S81 · Architect: Claude.
     Supersedes RECON-MA-RERUN-1-v1 (S80). The v1 BODY IS UNCHANGED BELOW —
     nothing is silently rewritten. Two defects found while executing the phase
     are corrected in §0, and the sentences they touch carry an inline pointer.
     Discharges carry debt D-002 in the §BUG bucket.

     D-1 RECON-FIRST: no phase prompt over unverified live state.
     Every value in the v1 body came from a named command run in the S80 session
     against a fresh clone at the floor `d599b8b2`. Nothing is recalled. -->

## 0 · CORRECTIONS (added at v1_1, S81 — read before the body)

Both were found **while the phase ran**, not by re-reading the recon. Neither
was visible from the documents; both required the live artifacts.

---

### C-1 · §2's citation was wrong. The premise it supports is TRUE and STRONGER.

**What §2 said:** the lens calls the real `computeClarification` at
`clarificationLens.ts:155`.

**What is actually at `:155`:** the inside of `probeQuestionTr`, calling
`computeClarification(frame, PROBE_ALIAS, null, PROBE_LAYER_STATUS)` — a
**deliberately blind** call with an empty alias map and `{ kind: 'unknown' }`
layer status, whose only purpose is to fingerprint each branch's question text
so causes can be attributed later. It is the only textual occurrence of
`computeClarification(` in the lens, which is how the wrong citation was
derived.

**The real evaluation seam:**
- `PRODUCTION_DEPS.runGate = computeTurnClarification` — `clarificationLens.ts:893`
- → `stageClarify.ts:344`, evaluating at `:388`
- fed by `loadEntityCandidates(frame)` at `:363`, which F199 G1 made
  **unconditional** (it runs even when the frame carries no `entity_ref`),
  merged with the governed alias resolution at `:364`.

**Consequence — the comparison is worth MORE than §2 claimed.** Today's
inventory enters the evaluation **per frame, live**, not through one
precomputed map. §2's phrase *"with an `AliasResolutionMap` and a layer-status
input"* understated it.

**And a cost §2 did not price:** per-frame live reads make a run long and make
it sensitive to registry mutation mid-run — the `*/30` catalog sync re-syncs
those layers. `PHASE-MA-RERUN-1-AMENDMENT-1-v1` §A2/§A3 exist to make that
readable.

**Found by:** AG, executing the phase. Independently re-verified against the
code by the Architect. **The citation error was the Architect's.**

---

### C-2 · §6 anticipated the population SHRINKING. It grew.

**What §6 said:** *"If `n` comes back materially below 2534, the comparison is
void and the finding becomes 'the baseline population is gone'."*

**What was measured at S81:** the corpus is **6626** armored frames — it grew
by roughly 4092 in the nine days since the baseline. §6's condition is
one-sided; it never asked what a **larger** population would mean.

**It means the comparison is void anyway, for a different reason,** and the
instrument cannot repair it:

- `CLARIFICATION_LENS_MAX_LIMIT = 5000` — **below the corpus.** The mandated
  `--limit 5000` re-run still reports `truncated`.
- The loader orders `created_at`/`ts` **descending** — newest first. So a
  truncated read drops the **oldest** frames, and the baseline's population is
  the oldest. At `--limit 3000` **zero** baseline frames are reached; at
  `--limit 5000`, roughly 908 of the baseline's 2534.
- `fetchAllPages` already pages to exhaustion **within** the cap, so the 5000
  is a deliberate ceiling, not a paging artefact.

**Recovery needs no new flag.** `ClarificationEvaluation.row.createdAt` is
already in the evidence, so once the whole corpus can be read the baseline
population is isolated **in analysis** by `createdAt`. The only blocker is the
ceiling.

**Found by:** AG, from the run's own `truncated` signal. **The one-sided
anticipation was the Architect's.**

---

### R-1 · §4's open unknown is RESOLVED — do not re-run that Operator read

§4 asked whether `entity_registry` gained the line/zone/equipment layers. It
has been answered twice over, and the two instruments **agree exactly**
(a passed positive control), with `entityAliasSource: 'db'`:

| layer | declared | inventory |
|---|---|---|
| `factory` | yes (`getFactoryList`, sync) | **17 active** |
| `line` | yes (`getFactoryLines`, sync) | **779 active**, all with parent |
| `equipment` | yes (`getEntities`, slow) | **0 rows** — described-but-empty |
| `zone` | **no descriptor exists** | — |

`equipment` is skipped on every sweep because `getEntities` declares `showAll`
required and publishes no machine-readable default.

**And §4's decision table was aimed at the wrong object.** The corpus contains
**zero ZONE frames**, and the surviving blocks are dominated by `ORDER` and
`EMPLOYEE` — objects with **no declared layer at all**, a different cause from
`equipment`'s and wanting a different remedy. Plan item 2.8
(`DISCOVERY-EXTEND-2`) should be scoped from that, not from zone.

*(These block-composition figures are tallies over a truncated read and carry
the C-2 caveat; the direction is established, the magnitudes are not.)*

---

## SCOPE NOTE (FIX-SCOPE-TRUTH-1)

Carry debt **D-002** named only C-1. C-2 and R-1 are a **flagged extension**: a
correction may grow to keep its own new sentences true, and reissuing this
artifact while knowingly leaving a second defect and a stale open unknown inside
it would have guaranteed a third round. The growth is declared here rather than
performed quietly.

---

**Floor read this session:** `origin/master` = `d599b8b2b25315dbb02bfa02efc61fbbe1e90d24` (2026-08-03 15:08 +03).
**Plan position:** `cwf-master-rollout-plan-v1_3` Blok 2.1.
**SOTA criterion advanced:** `cwf-sota-definition-v1_3` §10 internal row — the only stale number in the status table.

---

## 1 · WHAT EXISTS (verified, not assumed)

| Artifact | Path | Status |
|---|---|---|
| The lens | `api/cwf/_lib/replay/clarificationLens.ts` | present at HEAD |
| The runner | `scripts/runClarificationLens.ts` | present at HEAD |

**The runner's contract, read from its own header:**
- **Read-only.** Writes nothing: no governed row, no `messages` (C1 LAW), no param publish, no migration. It therefore takes **no `--as` identity** — deliberately, because it exercises no authority (S33-1 reasoning stated in the file).
- A **script, not an endpoint**, by explicit design: a new endpoint would widen the auth surface for a measurement that runs a handful of times.
- ADR-007 clean: echoes no secrets; the `[Fence]` project-ref banner from `getServiceClient()` is the proof-of-DB line.
- Flags: `--set <uuid>` · `--limit <n>` · `--since <iso>` · `--no-telemetry` · `--json` (with a stdout guard installed by import order).
- Sources: `synthetic_runs` and `telemetry_events`.

**Invocation shape:**
`node --import tsx --env-file=.env.local scripts/runClarificationLens.ts [flags]`

---

## 2 · THE LOAD-BEARING FINDING — the re-run is a valid controlled comparison

The lens does **not** replay a recorded verdict. It calls the **real `computeClarification`** lens-side (`clarificationLens.ts:155`, import at :85) **[WRONG CITATION — see §0 C-1]** with an `AliasResolutionMap` and a layer-status input, using — in the file's own words — *"the SAME production resolver the gate"* uses.

**Consequence:** re-running today evaluates **the same recorded frames** against **today's entity registry and layer status**. Registry improvement is the only variable that moves.

**Therefore `MA-RERUN-1` is a pure re-read: zero new code, zero migration, zero writes.** That is confirmed against the file, not assumed from the plan.

**Boundary dates are clean** (`git log`, verified):

| Event | Commit | Date |
|---|---|---|
| M-A baseline measured | — | **2026-07-25** |
| DISCOVERY-EXTEND-1 merged | `fa559ef` | 2026-07-26 |
| …FIX-1 | `8db9577` | 2026-07-26 |
| …FIX-2 | `9095f14` | 2026-07-27 |

The extension landed **after** the baseline. There is a real before/after to measure.

---

## 3 · THE THREE TRAPS

**TRAP 1 — `--since` is the wrong knob, and it is the most likely mistake.**
`--since` filters frames by *recording time*. Using it would compare **new frames** against the old baseline's **old frames**, confounding registry improvement with corpus drift. The whole point is the *same* population re-evaluated.
→ **`MA-RERUN-1` must NOT pass `--since`.**

**TRAP 2 — the default limit silently truncates.**
`CLARIFICATION_LENS_DEFAULT_LIMIT = 500`. The baseline's population was **n = 2534 frames**. A run without an explicit `--limit` caps at 500 and produces a non-comparable n — with no truncation signal, which is the project's own partial≠complete law biting the measurement that exists to enforce it.
→ **`--limit` must be explicit and ≥ 3000**, and the reported `n` must be compared to 2534 before any delta is believed.

**TRAP 3 — the baseline artifact does not record its own invocation.**
`cwf-ma-gate-baseline-findings-v1` states the results (2534 frames · 84.6% per-frame block · 2120/2144 entity-unresolved) but **not the command that produced them**. Scope (`--set`, `--no-telemetry`) is unrecoverable from the artifact. This is a **D-3 gap in the original measurement**, and it means like-for-like must be reconstructed by matching `n`, not by copying flags.
→ The re-run's evidence **must record its full invocation verbatim**, so this gap is not repeated. Naming this is part of the deliverable.

---

## 4 · THE UNKNOWN THAT NEEDS THE OPERATOR

**Did `entity_registry` actually gain the line/zone/equipment layers after DISCOVERY-EXTEND-1?**

This is a DB read (Operator lane) and it is **not optional**, because it decides how the result is read:

| Registry state | Block rate falls | Block rate holds |
|---|---|---|
| Layers **populated** | Extension worked; ADR-009 route validated; `DISCOVERY-EXTEND-2` (plan 2.8) may narrow | Gate has a second cause the baseline mis-attributed → new finding |
| Layers **still empty** | *(incoherent — investigate)* | Extension did not cover the layer → **2.8 is confirmed and jumps the queue** |

Without this read, a flat result is ambiguous between "the gate is broken elsewhere" and "the extension never reached the layer." Those two demand opposite next moves.

---

## 5 · WHAT `MA-RERUN-1` DELIVERS

1. Per-frame block rate at HEAD, with `n`, beside the baseline's 84.6% at n=2534.
2. Cause breakdown, beside the baseline's entity-unresolved 2120/2144 (98.9%).
3. The **verbatim invocation** and the `[Fence]` project-ref line.
4. The Operator's registry-layer read (§4).
5. A one-line verdict feeding plan 2.8's conditional promotion.

**Lane:** AG runs the script (read-only, standing consent class — no new authority). Operator supplies §4. **No migration. No repo write beyond the evidence artifact. No owner ceremony beyond relay.**

**Post-deploy proof (S63-1):** not applicable — nothing ships. The measurement *is* the deliverable, and the §10 status-table row is where it lands.

---

## 6 · WHAT THIS RECON DID NOT ESTABLISH

- The baseline's original flags — **unrecoverable** (Trap 3), reconstructed by `n`-matching instead.
- Current `entity_registry` layer coverage — **Operator read pending** (§4). Not premised either way.
- Whether `synthetic_runs` still holds the same 2534 frames, or whether retention/cleanup has pruned them. **[ONE-SIDED — see §0 C-2]** **If `n` comes back materially below 2534, the comparison is void and the finding becomes "the baseline population is gone" — which is itself a reportable result, not a failure to work around.**

<!-- END · RECON-MA-RERUN-1-v1_1 · 2026-08-03 · corrections C-1, C-2, R-1 -->
