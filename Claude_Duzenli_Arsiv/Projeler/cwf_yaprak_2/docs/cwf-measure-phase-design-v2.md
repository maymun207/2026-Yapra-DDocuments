# CWF — MEASURE phase (STEP 3) design note · v2
<!-- cwf-measure-phase-design-v2 · 2026-07-25 · Architect: Claude · SUPERSEDES
     cwf-measure-phase-design-v1 (§1 lists what changed and why). Floor rev 144
     (master e91ed2a). Binds to A23 understanding-layer v1_3 §7 (measurement
     constitution). Self-contained. -->

## §1 · Corrections to v1 (all from S65 LIVE reads, not inference)
v1 was written from the register + docs WITHOUT reading live governed state.
Three of its premises were wrong. Recorded here because the corrections reshape
M-A, and because the pattern (design-from-docs) is the session's main lesson.

1. **QUERY_TOPOLOGY no longer exists.** `IR_ACTIONS` in master is SIX actions
   (`QUERY_STATUS · QUERY_METRIC · QUERY_EVENTS · QUERY_MASTER · COMPARE ·
   COMMAND`). `irFrame.ts:20`: *PHASE IR-3 G0 (K1 §8 ratified): QUERY_TOPOLOGY
   merged into QUERY_MASTER*. Any v1 wording about "the two new enums" or
   "closing K1 §8" is void — **K1 §8 is ANSWERED and IR-3 shipped (rev 129).**
2. **The 8 v2 utterances were already live, as `cwf-synthetic-gapfill-v1`.**
   A prior session applied the same source doc on 2026-07-22; gapfill ran 1870
   times and produced the evidence that ANSWERED K1 §8. Gapfill was a
   deliberate, temporary probe set (8/8 rotation to concentrate enum samples);
   its mission is complete. SYNTH-CORPUS-V2-1 (rev 144) therefore re-shipped
   work that already existed — the code is sound, the rationale was wrong.
3. **The gate is DARK.** `router.frameRouting` was published to 0 (v3, S65).
   `stageClarify` is gated on it (`!frameRoutingEnabled → return null`), so the
   clarification gate does not run in production at all right now. M-A CANNOT
   observe it live — it must REPLAY it.

Live evidence carried forward:
- **Corpus skew.** Of 2465 recorded synthetic frames, 1865 came from gapfill's 8
  utterances (COMMAND 932 = 37.8%, QUERY_MASTER 922) and 600 from the v1 base 29.
  For 3 days QUERY_METRIC/EVENTS/STATUS/COMPARE received ZERO synthetic traffic.
  `synthetic.activeSetId` now points at v2 (37 utterances), which restores balance
  and is a strict superset of gapfill — this, not enum-gap closure, is the real
  justification for staying on v2.
- **Enum health.** Gapfill: action drops 0, object drops 0 (0.00%). The post-IR-3
  T1–T4 utterances correctly produce QUERY_MASTER (922) — the ratified merge works.
  The 11 QUERY_TOPOLOGY rows are pre-IR-3 residue, preserved as observe-only
  history by design (`irFrame.ts:24`).
- **Metric drops.** v1 set: 326 metric drops over 630 runs; live telemetry: 19 over
  80 events. Element-wise (the frame survives), but it means the router proposes
  metric values outside the vocabulary. A real quality signal → M-A watch item.
- **Entity-resolution gaps observed in live chat (S65):** `glazur4` unresolved
  while `glazur3` resolves (alias row missing); entity_ref over-capture
  (`[granit fabrikasindaki hatlarin]`, `[KB7 fabrikası,fırın]`); ARMES factoryId
  casing (`GRANIT` rejected, `Granit` accepted). These are exactly what the gate
  reacts to — M-A quantifies their cost.

## §2 · What M-A measures (restated)
**The clarification gate's decision behavior, and its cost, on recorded frames.**

The gate is deterministic, so "is the decision correct given its inputs" is
near-tautological and not worth measuring. The decision-relevant question is:

> **How often would the system stop and ASK instead of ANSWERING — and why?**

That number is the "before" for two future workstreams at once: ⑤/⑥ (STEP 5) and
the Path B resolver work (③ Channel-2 BM25 + L5 entity-miss ledger). Both should
push it DOWN without breaking the gate's willingness to fire when it truly cannot
resolve.

## §3 · Design — the clarification-gate replay lens
A new lens in the existing `api/cwf/_lib/replay/` family (mirrors
`routerAbLens.ts`; 18 siblings establish the pattern). **No live perturbation:
read-only, pure-function replay.**

**Firm constraint (§7 — measure the seam, not a copy):** the lens MUST call the
REAL `computeClarification` + the REAL `resolveEntityRef` / time resolution. A
SQL or hand-rolled re-implementation of the gate would measure a copy of the
system, not the system. This rules out doing M-A as an Operator SQL read.

**Per recorded frame:**
1. Load `frame` jsonb from `synthetic_runs` (2465 rows; `frame_recorded=true`).
   Optionally also `telemetry_events` `payload.kind='ir_frame'` (80 organic rows).
2. Re-resolve `entity_ref` → `aliasResult` via the real resolver against CURRENT
   `entity_alias` + `factory_registry` (the resolution is NOT persisted per run —
   verified against the `synthetic_runs` schema, which stores frame/drops only).
3. Re-derive `timeResult` from `frame.time.surface` (pure).
4. `knownFactoryNames` from `factory_registry`.
5. Call `computeClarification(frame, aliasResult, timeResult, knownFactoryNames)`.

**Cause decomposition — free, from the gate's own priority order:**
`HIGH/entity-unresolved` · `HIGH/compare-under-resolved` · `HIGH/ambiguous` ·
`LOW/time-unclear` · `NONE/clean`. The cause is what makes the number actionable:
entity-unresolved points at the registry (Path B / L5), ambiguous points at
extraction confidence, time-unclear at time parsing.

**Aggregation dimensions:** per-utterance (dedup — skew-free, 37 distinct) ·
per-frame (population-weighted, traffic-realistic) · per-action (6) · per-set
(v1 base / gapfill / v2). Reporting per-utterance AND per-frame is required
because the frame population is skewed (§1).

**Bonus signal (free):** frame stability — the same utterance ran ~233×; count
distinct frame shapes per `utterance_idx`. Extraction non-determinism is a
§7-relevant stochastic property and costs one GROUP BY.

**Registry snapshot:** because step 2 resolves against CURRENT registry state,
the baseline record MUST nail that state (alias row count, factory count, rev) —
otherwise the number is not reproducible.

## §4 · §7 room card — M-A
- **Contract (E0):** over the recorded frame corpus, produce the gate's decision
  distribution (NONE/LOW/HIGH) decomposed by cause, per-utterance and per-frame,
  against a nailed registry snapshot.
- **Metric (E1):** **block rate** = HIGH / total on the synthetic corpus, whose
  utterances are answerable by construction (hand-authored against the real
  factory). Lower is better.
- **Guardian (E1):** **must-block rate** on deliberately unresolvable probes
  (frames whose `entity_ref` cannot exist) — must stay 100%. Without it, block
  rate is gamed by a gate that never fires: the system would GUESS instead of
  asking, which is the exact failure ADR-001 exists to prevent. Metric and
  guardian must move together.
- **Liveness (E2):** the unresolvable probe must produce HIGH/entity-unresolved
  and a known-clean frame must produce NONE — proves the lens can distinguish
  and is not stuck.
- **Decision-tie (E3):** the baseline must distinguish "the gate blocks mostly on
  registry gaps" from "the gate blocks mostly on extraction ambiguity" — those
  imply different next investments (resolver work vs ② confidence work).
- **Baseline nailed (E5):** distribution + cause split + registry snapshot + rev
  144 + N, written to the ledger.
- **Seams:** `computeClarification` (real) + `resolveEntityRef` (real) +
  `recordedFrame` loader.
- **Neighbor-contract:** read-only; must not write governed tables, must not
  touch live routing or the gate's live state (which stays dark), must not
  perturb M-B.
- **Stochastic discipline:** a small clean sample is not proof — report N and,
  where the corpus allows, per-utterance repetition counts.

## §5 · Execution plan
Two lanes, parallel — neither blocks the other.

- **Lane 1 (Operator, read-only, can start now):** registry snapshot —
  `entity_alias` + `factory_registry` contents and counts. This does NOT gate the
  lens code (the lens resolves at runtime), but it is required to INTERPRET the
  result: if the block rate is high, the registry read tells us whether the cause
  is missing alias rows. It also nails E5's snapshot. *(This lane exists because
  of the session's process correction: every phase brief opens with a live read
  of the governed state it depends on.)*
- **Lane 2 (AG, code):** build the lens + a read-only admin/script surface to run
  it + the E2 liveness probes as tests. Mirrors `routerAbLens.ts`. Reseal will be
  forced (`api/cwf/_lib/replay/**` is mapped code).
- **Then (Architect):** run it, read the numbers, nail the baseline to the ledger,
  and write the M-A findings note. That note is the first empirical statement
  about this system's behavior.

## §6 · What M-A does NOT do
- Does not turn the gate back on (`frameRouting` stays 0; the replay is offline).
- Does not fix entity resolution (that is Path B ③ Channel-2 + L5; M-A quantifies
  the cost so the fix can be justified and later proven).
- Does not measure routing reach — that is M-B (router-ab lens, already built).
- Does not benchmark against rival systems (out of scope; the verdict's
  "ahead of frontier" half remains a design argument).

<!-- END · cwf-measure-phase-design-v2 · 2026-07-25 -->
