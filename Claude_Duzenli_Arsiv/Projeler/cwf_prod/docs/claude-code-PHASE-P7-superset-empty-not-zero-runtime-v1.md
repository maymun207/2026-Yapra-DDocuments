# PHASE P7 — Superset empty≠zero RUNTIME layer (backend-generic result anchor)
**claude-code-PHASE-P7-superset-empty-not-zero-runtime · v1 · 2026-07-11 · AG-lane · single gated phase**

> Architect diagnosis (Session 36, ground truth `7f0dee5`): the runtime empty≠zero validator
> `api/cwf/_lib/grounding/groundingCheck.ts` **Check 1 (`checkEmptyAsZero`)** is hardwired to
> ARMES: it imports `BLIND_SPOTS` + `ZONES` from `../knowledge/backends/armes/*` and fires only
> when a **blind-spot ZONE** is named + a scrap noun + a zero-assertion. Superset HAS its own
> governed blind-spots (`SUPERSET_BLIND_SPOTS`: permission-scoped-empty · unconfigured-metric ·
> row-limit-truncation · failed-call-tool) but they feed only the PROMPT (code-floor) and the
> EVAL-GATE — **2 layers vs ARMES's 3**. Superset has NO runtime empty≠zero catch. P7 adds the
> 3rd layer, backend-generically, WITHOUT a fragile regex and WITHOUT unioning ARMES zone
> vocabulary into Superset.
>
> **The clean anchor already exists.** `formatToolResult` (api/cwf/_lib/toolResult.ts:217) emits
> `recordCount = found.records.length` for ANY backend — so an **empty resultset** (`{records:[]}`)
> yields `recordCount: 0`. Test fixtures confirm Superset gateway tools (`gw_query`, `q`) carry
> `recordCount` in the wrapped body. So the runtime layer gains a **result-anchored** empty≠zero
> path — orthogonal to (not a union with) the ARMES zone path — that fires when a tool result
> reports `recordCount === 0` AND the answer asserts zero/absence as a FACT.

---

## 0 · RULE-25 BOOTSTRAP

```
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # MUST be 7f0dee5afa7bf3350f139fa0258fbb126f1f9999
npm ci --no-audit --no-fund
```
Anchor = **7f0dee5** (1951 tests / 185 files / docVersion rev 65). Branch off master; `--no-ff`
merge; squash BANNED.

## 1 · PRE-FLIGHT (grep-verified; S32-1 — RHS = Architect's observation)

```
grep -n "checkEmptyAsZero\|COMPLIANT_MARKERS\|hasNumericZero\|ZERO_LEXICON" api/cwf/_lib/grounding/groundingCheck.ts
#   → checkEmptyAsZero is Check 1 (ARMES-zone-anchored); COMPLIANT_MARKERS is the
#     "explaining invisibility is compliant" carve-out; hasNumericZero + /\bsifir\b/ detect a
#     standalone zero. These THREE are the reuse points — the generic path reuses them, mints
#     no new regex over domain nouns.
sed -n '216,220p' api/cwf/_lib/toolResult.ts
#   → out.recordCount = total; total = found.records.length → an EMPTY records array emits
#     recordCount: 0 (the structured anchor). A forbidden/error/scalar response has NO records
#     array → NO recordCount (out of v1 scope — see C-6).
grep -n "recordCount" api/cwf/_lib/grounding/groundingCheck.ts       # parseToolResultMeta reads o.recordCount generically (line ~257)
grep -n "runGroundingCheck" api/cwf/_lib/turn/stageStream.ts          # → the ONE runtime call site (222); do not add a second
grep -n "empty_as_zero" api/cwf/_lib/replay/pairedReplay.ts api/cwf/_lib/replay/runExperiment.ts
#   → 'empty_as_zero' is ALREADY a tracked violation kind → the new path flows through the SAME
#     kind, so the grounding replay lens counts it with ZERO scorer change (scorers.ts:20 law:
#     the verdict comes from runGroundingCheck itself).
ls api/cwf/_lib/knowledge/backends/superset/blindSpots.ts             # SUPERSET_BLIND_SPOTS present (prompt/eval-gate layer, unchanged by P7)
```

## 2 · HARD CONSTRAINTS

- **C-1 The sacred distinction — anchor on EMPTINESS, never on a "0" in data.** `recordCount === 0`
  = an empty resultset (NO rows). A result with `recordCount >= 1` containing a real `0` value is
  legitimate DATA and MUST NOT trigger. The anchor choice (`=== 0`) structurally guarantees this —
  do not widen it to "a 0 appears in the body." (render-layer law: real-0=data, empty="no data".)
- **C-2 zero-as-FACT (violation) vs empty-EXPLANATION (compliant).** "böyle bir dashboard yok /
  sıfır chart / hepsi bu" asserted as fact ⇒ violation. "sorgu boş döndü / veri yok / bu kaynak
  role görünmüyor / not permitted" ⇒ COMPLIANT (the correct behavior). REUSE `COMPLIANT_MARKERS`
  verbatim — do not fork it. Both a must-FIRE and a must-NOT-FIRE characterization test are the
  correctness guard (sub-phase B).
- **C-3 NO fragile regex over Superset domain nouns.** Key off the STRUCTURED `recordCount === 0`
  + the EXISTING `hasNumericZero`/`ZERO_LEXICON` linguistic layer. No new pattern enumerating
  Superset vocabulary (charts/datasets/metrics/…).
- **C-4 NO authority-map union.** Do NOT inject ARMES `BLIND_SPOTS`/`ZONES` into Superset, and do
  NOT feed Superset blind-spots into the ARMES zone derivation. The new path is ORTHOGONAL and
  result-anchored — it needs no per-backend knowledge at all (the empty resultset IS the anchor).
- **C-5 Eval-gate + Check 1 BYTE-UNTOUCHED (additive).** P7 = one new check function + ONE line in
  the `runGroundingCheck` aggregator. The eval-gate engine/stage-order/interpreter and
  `checkEmptyAsZero`'s zone logic stay byte-identical (empty≠zero-sacred + eval-gate-unbypassable:
  additive per-check dispatch is legitimate; a change to the existing checks is not).
- **C-6 v1 scope boundary (name it, don't exceed it).** v1 covers the **empty-resultset** anchor
  (`recordCount === 0`). Forbidden/error/scalar responses that carry NO records array
  (permission-forbidden, failed-call-tool) have no structured anchor and are OUT of v1 — DEFERRED
  with a named trigger: *thread a structured `forbidden`/`empty` flag from the Superset gateway
  result shape into `ToolResultMeta`* (a separate phase, never a regex bolt-on). row-limit-
  truncation is ALREADY covered by Check 2 (`count_understatement` via the `truncated` flag) — do
  not duplicate it.
- **C-7 One call site.** The new path lives INSIDE `runGroundingCheck`; `stageStream.ts:222` and
  the replay/taskFn callers are untouched (RULE 28 spirit — no second invocation).

## 3 · GATED SUB-PHASES

### A — the backend-generic result-anchored check
In `api/cwf/_lib/grounding/groundingCheck.ts`, add `checkEmptyResultAsZero(answerText, toolResults)`:
- **Anchor:** proceed only if some `toolResult.recordCount === 0` (`return []` otherwise — cheap,
  precise). Multiple results: an empty anchor present + a zero/absence assertion is sufficient;
  keep v1 conservative and let the characterization tests + replay lens pin the precision.
- **Per sentence:** reuse `splitSentences` + `normalize`; skip if `COMPLIANT_MARKERS` matches
  (C-2); flag if `hasNumericZero(ns)` OR a bare absence marker from `ZERO_LEXICON`
  (`yok/hic/none/no/nil`) asserts absence-as-fact. Emit `{ kind: 'empty_as_zero', severity:
  'critical', detail: 'A tool result returned an EMPTY resultset (recordCount 0) but the answer
  asserts zero/absence as a FACT — EMPTY ≠ ZERO. Must say "no data / not returned / not visible",
  never "0/none".', evidence: clip(sentence) }`.
- Wire ONE line into the `runGroundingCheck` aggregator (concatenate its result). No caller change.

### B — characterization tests (the correctness guard — must-FIRE and must-NOT-FIRE)
Add to the grounding test suite (co-located with the existing groundingCheck tests):
1. **Superset empty + zero-as-fact** → `recordCount:0` result + answer "böyle bir dashboard yok /
   sıfır chart" ⇒ ONE `empty_as_zero` critical. (must fire)
2. **Superset empty + compliant explanation** → `recordCount:0` + "sorgu boş döndü; bu dataset
   Superset rolüne görünmüyor, veri yok" ⇒ ZERO violations. (must NOT fire — C-2)
3. **The sacred trap — real 0** → `recordCount:1` body carrying a `0` value + answer "değer 0" ⇒
   ZERO violations. (must NOT fire — C-1)
4. **Backend-generic proof** → an ARMES `recordCount:0` result + zero-as-fact ⇒ fires via the new
   path too (empty≠zero is not Superset-only; the generic path strengthens ARMES as well).
5. **Non-empty** → `recordCount:5` + "5 kayıt" ⇒ no `empty_as_zero`.
6. **Check-1 regression guard** → an existing ARMES zone-path case still fires exactly as before
   (byte-behavior of Check 1 unchanged, C-5).

### C — additive-integrity proof
Show `checkEmptyAsZero` (the zone path) and the eval-gate engine are byte-untouched (a `git diff`
of `evalGate.ts` = empty; the `groundingCheck.ts` diff = the new function + one aggregator line +
imports only). Confirm `empty_as_zero` needs NO scorer/replay change (grep the existing tracked-kind
sites; the lens counts the new path for free).

### D — docs / seal / count
- `groundingCheck.ts` is under `api/**` = a SEALED codeArea. If comments change, honor the S34-1
  reseal budget (AST `removeComments` printer per S35-1, never a raw scanner) + bump `docVersion`.
- Update ARCHITECTURE (Superset now has the **3rd/runtime** empty≠zero layer — parity with ARMES's
  3-layer defense, via the backend-generic result anchor) + any relevant narrative tab. Living-doc
  two-commit seal + `npm run check:doc-drift` → `[OK]`.
- Report the new vitest count (1951 + the sub-phase B tests) — full run exceeds one window; shard
  `1/2`+`2/2` and sum. Coverage floor: ratchets up or holds, never down.

## 4 · SELF-VERIFY (literal evidence — paste it)
1. `git rev-parse origin/master` = `7f0dee5…` at start.
2. Pre-flight §1 outputs matching the annotated RHS (or a STOP report).
3. All 6 sub-phase B characterization tests GREEN — especially #2 (compliant, must-not-fire) and
   #3 (real-0, must-not-fire): a critical gate that false-fires is worse than no gate.
4. `git diff 7f0dee5..HEAD -- api/cwf/_lib/knowledge/gate/evalGate.ts` = EMPTY (C-5).
5. `git diff` of `checkEmptyAsZero`'s body = unchanged (only the aggregator gained one line).
6. Full count (sharded) + `check:doc-drift` `[OK]` + rev delta / reseal proof if comments moved.
7. Remote HEAD after `--no-ff` merge + push (a merge isn't done until pushed + hash reported).

## 5 · REPORTING CONTRACT
Report: anchor confirm; each pre-flight line; the 6 characterization results (call out #2 and #3
explicitly); the evalGate empty-diff + Check-1 unchanged proof; count/rev/reseal deltas; the pushed
remote HEAD. Architect RULE-25 fresh-clone review follows: independent recount, the evalGate byte-
pin, and a re-run of the must-not-fire cases (the false-positive risk is the whole ballgame for a
CRITICAL gate).

<!-- END · claude-code-PHASE-P7-superset-empty-not-zero-runtime · v1 · 2026-07-11 -->
