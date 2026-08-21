# AMENDMENT 1 to PHASE-MA-RERUN-1-v1

<!-- PHASE-MA-RERUN-1-AMENDMENT-1-v1 · 2026-08-03 · S81 · Architect: Claude.
     Issued MID-FLIGHT, after AG's progress report. The phase prompt is NOT
     withdrawn: everything in PHASE-MA-RERUN-1-v1 stays in force except where a
     clause below names the section it changes. -->

**Read A1 first — it is time-sensitive.**

---

## A1 · CAPTURE STDERR (amends §5)

**What §5 got wrong.** The invocation redirected stdout only. With `--json`,
`console.log` is **rebound to stderr** (`runClarificationLens.ts:28-30`); only
the JSON payload reaches stdout, via `process.stdout.write` at `:222`.

**What is being lost on stderr.** `stageClarify.ts:384` emits, **once per
frame**:

```
[Clarify] layerStatus=<kind> layer=<key> object=<OBJ> refs=<n> scope=<...>
```

F199 made this line born-loud precisely so this reading would never require
anyone to reproduce a run. `layerStatus` — in particular `declared-empty`, the
`equipment` case — appears **nowhere in the JSON evidence**. It exists only
here.

**Do, in this order:**

1. **Do not disturb a run that is in flight.** Let it finish. Aborting to add a
   redirect would cost more than the line is worth.
2. From the next run onward, capture stderr:

```
node --import tsx --env-file=.env.local scripts/runClarificationLens.ts \
  --limit 3000 --json \
  > /tmp/ma-rerun-S81-runN.json \
  2> /tmp/ma-rerun-S81-runN.err
```

3. If run1's stderr is already unrecoverable, **that is accepted.** It is
   supplementary evidence; the §5 agreement check runs off the JSON, which both
   runs have. **Do not re-run run1**, and do not add a third run to compensate.

All other §5 constraints are unchanged: `--limit 3000`, no `--since`, no
`--set`, no `--no-telemetry`, two runs, no committed JSON — and now also **no
committed `.err`**, for the same reason (it carries per-frame `object`/`refs`
derived from organic turns).

---

## A2 · RECORD THE RUN WINDOW (adds to §5)

Record each run's **wall-clock start and end in UTC**. Two lines per run in the
report. The reason is A3.

---

## A3 · IF THE TWO RUNS DISAGREE (amends §5)

§5 said a disagreement between the runs' `perFrame` tallies "is the finding".
That stands, but it is now under-specified, and the missing half matters:

`computeTurnClarification` performs a **live `entity_registry` read per frame**
(see A5). The `*/30` catalog-sync cron re-syncs those layers at `:00` and `:30`.
A run whose window straddles a sync boundary can therefore be **internally**
inconsistent for a legitimate reason.

**So, on disagreement:** do not pick a run. Check whether a `:00` or `:30`
boundary fell inside either run window (A2 gives you the timestamps) and report
the attribution — either *"attributable to a sync boundary at HH:MM"* or
*"no boundary fell inside either window; the disagreement is unattributed"*.
The second is a much larger finding than the first, and the report must be able
to tell them apart.

---

## A4 · A FOURTH READING IN G2 (adds to §6)

**Only if stderr was captured for at least one run.** From the `.err` file:

1. A tally of `[Clarify] layerStatus=<kind>` by `kind`, over all frames.
2. For blocked frames, the cross-tab **`layerStatus.kind` × `object`**.

Emit zero buckets explicitly, as §6.2 already requires. If no stderr was
captured, say so plainly in the artifact and skip this reading — an absent
reading that names itself is fine; a silently missing one is not.

---

## A5 · CORRECTION OF RECORD — the premise citation (amends §1)

AG's correction is accepted, verified independently against the code, and the
brief was wrong.

**What §1 said:** the lens calls the real `computeClarification` at
`clarificationLens.ts:155`.

**What is actually at `:155`:** the inside of `probeQuestionTr`, calling
`computeClarification(frame, PROBE_ALIAS, null, PROBE_LAYER_STATUS)` — a
deliberately **blind** call with an empty alias map and
`{ kind: 'unknown' }` layer status, whose only purpose is to fingerprint each
branch's question text for later cause attribution. Citing it as evidence that
the lens uses the production resolver was a **wrong citation supporting a true
claim** — which is worse than a wrong claim, because it survives review.

**The real evaluation seam:**

- `PRODUCTION_DEPS.runGate = computeTurnClarification` — `clarificationLens.ts:893`
- → `stageClarify.ts:344`, evaluating at `:388`
- fed by `loadEntityCandidates(frame)` at `:363`, which F199 G1 made
  **unconditional** — it runs even when the frame carries no `entity_ref` —
  merged with the governed alias resolution at `:364`.

**The premise is therefore STRONGER than §1 claimed**, not weaker: today's
inventory enters the evaluation **per frame, live**, rather than through one
precomputed map. The comparison is worth more than the brief said it was.

**And it carries a cost §1 did not price:** per-frame live reads make the run
long and make it sensitive to registry mutation mid-run. That cost is what A2
and A3 exist to make readable.

---

## A6 · S81-1 — RATIFIED STANDING RULE (from AG's first observation)

> **S81-1.** `git rev-parse origin/<ref>` reads a **local** ref. In any clone
> that was not freshly created, an anchor check without an explicit `git fetch`
> reports the floor **at which the clone was made**, not the current floor.

The loud failure — a false **mismatch** — is the safe one, and is what occurred
here. The dangerous inverse is a false **match**: a brief written against floor
X, plus a stale clone still sitting at X, passes the anchor check while master
has moved past X, and the whole phase is then built on a floor that no longer
exists. RULE-25's fresh-full-clone requirement sidesteps this; working in an
existing clone makes the `fetch` mandatory.

Add the fetch, and the fact that you performed it, to the §11.1 anchor report.

---

## A7 · WHAT DOES NOT CHANGE

§0 anchor · §1's zero-code and zero-write constraints · §2 baseline figures ·
§3 traps · §4 embedded Operator evidence · §6.1–6.5 · §7 stop conditions ·
§8 artifact · §9 self-verify · §10 hard NOs · §11 report shape.

In particular §10 still holds in full: no modification to `clarificationLens.ts`
or `runClarificationLens.ts`, not even a log line. A4 reads a line that already
exists; it does not license adding one.

<!-- END · PHASE-MA-RERUN-1-AMENDMENT-1-v1 -->
