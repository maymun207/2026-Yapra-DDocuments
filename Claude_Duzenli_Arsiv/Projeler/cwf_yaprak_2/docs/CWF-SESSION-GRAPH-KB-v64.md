# CWF — Session Graph KB · v64
<!-- CWF-SESSION-GRAPH-KB-v64 · 2026-07-26 · S65 record. Supersedes v63.
     Companion to register v66 (state) — this file carries the CAUSAL CHAIN and
     the lessons in reusable form. v60–v63 archive. -->

## S65 in one line
The session that turned the SOTA claim into a measured number (~85% block rate,
98.9% entity-unresolved), discovered that the answer pointed at a layer nobody
had been looking at, and wrote the two laws that forbid the cheap fix.

## The chain (order matters — each step caused the next)
1. **F169 fixed and PROVEN.** golden-runner flushed OTel spans AFTER `res.json`
   in a `finally`; on a serverless freeze the export waited for the NEXT cron
   tick to unfreeze the container. Fix: awaited flush BEFORE the response on both
   the 200 and 500 paths. Live proof: six consecutive silent ticks with zero
   late-settle. **Lesson that generalized: the old header's "full pre-response
   guarantee" was false for EVERY path — the brief's scope was smaller than the
   bug.** AG did not narrow to the brief.
2. **F173 confirmed** by two independent channels (Operator 0/5 channels,
   Architect Vercel 0 hits).
3. **frameRouting found LIVE at 1.** Investigating a live chat read showed
   `basis=frame` — the owner had not knowingly enabled it. It later emerged the
   Architect of a prior session (two days earlier, another project) had
   instructed the owner to publish it. **Invisible from here because of the
   lineage boundary** — the Architect initially framed it as "accidental", which
   was wrong. Published to 0; live confirmation `basis=keyword` with `frame=on`.
   Target state: observation ON, steering OFF — which is also the clean floor a
   baseline needs.
4. **SYNTH-CORPUS-V2-1 built and shipped — and was REDUNDANT.** Designed on the
   premise that the live set was v1. It was `cwf-synthetic-gapfill-v1`, created
   2026-07-22 by a prior session from the SAME source doc, 1870 runs deep, whose
   8 utterances are byte-identical to the 8 "new" ones. Discovered only when the
   Operator read the set CONTENTS. Net-positive outcome (v2 is a strict superset
   and restores corpus balance after 3 days of gapfill-only skew), wrong
   rationale.
5. **K1 §8 was already answered.** The taxonomy read showed T1–T4 producing
   QUERY_MASTER, not QUERY_TOPOLOGY — because IR-3 G0 had RETIRED
   QUERY_TOPOLOGY, merging it into QUERY_MASTER (`IR_ACTIONS` = 6). The Architect
   had read that fact inside the manifest reviewNote during a reseal check and
   failed to connect it. **The 11 QUERY_TOPOLOGY rows are pre-IR-3 residue,
   preserved as observe-only history by design.**
6. **M-A built: the clarification-gate replay lens.** The gate is dark
   (`frameRouting=0`), so it cannot be observed live — it is REPLAYED through the
   production seam `computeTurnClarification(ctx)`, with `networkTime` pinned to
   each row's own `created_at` and `frameRoutingEnabled=true` on the replay
   context object only. Gate logic never reimplemented (a copy would measure a
   copy).
7. **The number came back: ~85% block, 98.9% entity-unresolved.** And the cause
   was structural: `mergeFactoryRegistryResolution` runs only for FACTORY-object
   frames; LINE/ZONE/EQUIPMENT have one channel, a 5-row hand-seeded alias index.
8. **The owner refused the cheap fix before it was offered.** Told that the
   remedy was registry coverage, he asked whether the system was hardcoding
   topology — and ruled: *"hardcode koymak, demek ki biz bu işi bilmiyoruz."*
   → **ADR-009** (discovery law) + its degree test in v1_1.
9. **The owner then supplied ADR-009's missing half.** Reasoning from MCP's
   philosophy — you do not own the backend; you accept what it declares — he
   described testing a backend's declaration against reality and reaching the
   verdict *this tool is untrustable*. → **ADR-010** (earned trust).
10. **FACTORY-PARAM-HINT-1**, the first concrete application of ADR-009: ARMES
    declares `factoryId` on 113/145 tools as a free-form string with no enum, so
    the model guessed casing (`"GRANIT"` rejected → retried `"Granit"`).
    `factory_registry` already knows the 17 valid ids; the hint injects them.
    Descriptor-as-data (`backends.factory_param_name`), values from the mirror,
    zero literals in production code.
11. **Sub-1 confirmed** overnight: v2 injected 500 runs 00:01→01:39Z, idx 29–36
    each 13×, T→QUERY_MASTER, M→COMMAND. Corpus balance restored.

## The lessons, in reusable form

### L1 — Design-from-summary is the failure mode of this role
Three Architect premise errors, one root cause: reading the register or a design
doc and treating it as live state. The register is a SUMMARY; it goes stale the
moment another lane acts. **Codified as S65-1.** The specific tell: a brief that
says "the live X is Y" without an Operator read of X in the same session.

### L2 — The other lanes are the error-detection mechanism, and it works
Every one of the Architect's three errors was caught by AG or the Operator, and
none by the Architect. AG caught the invented reviewNote anchor TWICE (and did
not fabricate the missing entry), caught the missed reseal scope, and corrected
an `email`-where-`uuid`-was-required slip that would have failed silently. The
three-lane split is not ceremony — it is the only thing that caught these.

### L3 — Silent, flattering failures are the dangerous class
Every defect that mattered this session under-reported in the direction that made
things look fine, and none errored: the void flush (F169) looked like a
successful response; the NUL byte made grep return nothing (= "clean"); the
PostgREST 1000-row cap reported a real enum as absent; `perSet` made an existing
set vanish. **A check that cannot fail loudly is not a check.** Codified as S65-3.

### L4 — Measure before you build, and the measurement will redirect you
M-A was built to answer "does ⑤/⑥ help". It answered a different and more urgent
question: the bottleneck is one layer upstream, in a catalog nobody was
measuring. Had ⑤/⑥ been built first, it would have been built on top of an 85%
block rate and its delta would have been unreadable.

### L5 — Write the law before the temptation arrives
ADR-009 was written BEFORE M-A reported. When the number came back and the cheap
fix (one alias row for `glazur4`) became obviously attractive, the rule already
existed and did not have to be argued under pressure. Sequence matters: laws
written after the temptation are compromises.

### L6 — The lineage boundary is a real operational hazard
`frameRouting` was live because of an instruction issued in a project this
Architect cannot see. From inside, it looked inexplicable and was initially
mis-framed as accidental. **Anything load-bearing from `cwf_prod` or `EAIP-1`
must enter as a versioned artifact uploaded here.** Never claim recall; never
assume absence of instruction means absence of action.

## Tooling notes learned this session
- **PostgREST caps a select at `db-max-rows` (1000) regardless of `.limit()`**,
  with no truncation signal. Any read of a >1000-row table must page to
  exhaustion. This silently corrupted a measurement.
- **Vercel MCP:** wide windows time out (a 24h full-text query failed); scope to
  ≤30 min or a `deploymentId`. Deploy cutover is visible by watching the `dep=`
  prefix change on the cron lane.
- **The synthetic injector burns its whole daily budget in ~100 minutes**
  (200 000 tokens ÷ 400/injection = 500 runs, at 5/min from 00:00Z), then sleeps
  ~22h logging `ceiling-reached` at `error` level every minute.
- **The injector is frame-only** — it never calls tools, so it cannot produce
  evidence for anything downstream of routing (e.g. F181's casing proof).
- **`git rev-parse origin/master` on a fresh clone** remained the only floor the
  Architect trusted, and it was correct every time.

## Carried forward as the next session's spine
F183 (discovery extension — the item M-A was built to find) → F181 done-proof →
F182 → M-B → F175/⑤+⑥. Full wording in register v66 §5/§9.

<!-- END · CWF-SESSION-GRAPH-KB-v64 · 2026-07-26 · S65 close -->
