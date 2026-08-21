# PHASE S61-CLEAN-1 · v1 — F169 · F170 · F171 (no debt left behind)

<!-- claude-code-PHASE-S61-CLEAN-1-v1 · rev 1 · 2026-07-23 · Architect: Claude
     Three live-observed defects found during F163's verification round.
     Owner directive: these get cleaned before ANY forward movement — no
     debt carried into BLOCK 3. This file is the ENTIRE relay payload (S54-3).
     Amendments mint v1_2. -->

**PRECONDITION (S47-1):** valid ONLY while `origin/master` ==
`ebdc020316b040654b4bcca0a4b702901705f5d1` (rev 138 · 347 test files ·
56 migrations · drift OK). On mismatch: **STOP and report actual state**.

**PROFILE:** FULL. **MIGRATIONS: ZERO** — all three fixes are code-only. If you
find yourself writing one, STOP; the diagnosis is wrong and I need to know.

**PLATINUM compliance:** every fix is self-configuring — no new setting, no
operator step, no manual provisioning. F169 removes a recurring failure the
system was silently absorbing; F170 and F171 remove ordering/locale traps the
user had to work around by rephrasing.

**GOLDEN FREEZE:** this phase executes **zero golden runs** and does not touch
the golden ENGINE. G0 touches `api/admin/golden-runner.ts` only at its
observability call site (and only if the diagnosis lands there). Do not
publish any `prompt.segment`. If a fix seems to require one, STOP and report.

---

## §1 · THE THREE DEFECTS (live evidence, all from 2026-07-23)

**F169 — observability flush times out on every cron tick.** Every 60 s:
```
[Obs] flush failed (non-fatal): Error: Span processor did not completed
within timeout period of 5000 ms
[GoldenRun] tick { claimed: 0, executed: 0, ceilingFailed: 0, finalizedRunIds: [] }
```
Non-fatal and the RULE 27 floor holds — but those ticks' spans never reach
Langfuse (a FULL-TRACE hole), and each tick burns the full 5 s timeout.
Chat turns do NOT show this.

**F170 — clarification wrongly fires on line/zone entities.** Live turn
(trace `8a889843`): user asked *"Glazur3 hattında dün en çok hangi nedenle
durduk?"* → `[Frame] action=QUERY_EVENTS object=DOWNTIME
entity_ref=[Glazur3 hattı] conf=HIGH basis=frame` → HIGH clarification, turn
short-circuited, zero tools used. The zone alias EXISTS
(`referenceData.ts` seeds one `armes.entity_alias` per zone,
`canonicalType:'zone'`, key `normalizeAlias(z.name)` = `glazur3`). The
failure is the SURFACE: the frame emitted `"Glazur3 hattı"` with the Turkish
common noun attached, and `stageClarify.ts` skips its whole
normalize/registry resolution pass when `frame.object !== 'FACTORY'`.
ENTITY-FLOOR-1 solved exactly this class for factories
(`granik fabrikasi` → `Granit`) and left zones/lines unsolved.

**F171 — a Turkish conversation gets an English deterministic message.** The
same turn rendered *"I couldn't tell which entity (line/zone/equipment) you
meant — could you clarify?"* in a Turkish dialogue. Two language policies
coexist: `stageClarify.ts` honors `ctx.language` (the client's INTERFACE
toggle — `cwfStore.ts` → `chat.ts`'s request body), while the model's prose
follows the user's message language because **the prompt gives the model no
language instruction at all** (grep of `api/cwf/_lib/prompt/**` returns
nothing). They diverge exactly as observed.

---

## §2 · BINDING CONSTRAINTS

1. **`computeClarification.ts` stays a pure, UNCHANGED contract.** As in
   ENTITY-FLOOR-1, resolution is merged into the alias map AHEAD of it. Do not
   edit its logic or thresholds.
2. **Polarity law preserved.** The governed `armes.entity_alias` table is
   NEVER fuzzy-matched — no Damerau-Levenshtein, no nearest-match guess
   against governed rows. Normalizing the INPUT SURFACE before an EXACT
   lookup is not fuzzy matching; that distinction is the whole fix, so make
   it explicit in code comments and prove it in a test.
3. **RULE 27 floor.** `forceFlushObservability` must remain never-throwing and
   observability-down must never become chat-down. Do not widen a timeout as
   the "fix" without a root cause (S55-1).
4. **Zero migrations. Zero `prompt.segment` publishes. Zero golden runs.**
5. **FULL-TRACE completeness guard** (`spanIOCompleteness.test.ts`) must stay
   green; any new/changed span or attribute gets classified.
6. If any instruction here contradicts the code you find, **STOP and report**
   — do not silently reconcile. (Two of my own premises were already
   corrected this session by exactly this discipline.)

---

## §3 · GATED SUB-PHASES

### G0 · F169 — DIAGNOSIS BEFORE FIX (hard gate)

**You may not change a line until the diagnosis is reported.** This is a
timing defect; a plausible story is not a cause.

Establish, with evidence:
- **Which processor** fails to complete. `otel.ts` registers a chain;
  `digestSink.ts:138/172` shows `DigestSpanProcessor.forceFlush()` resolves
  instantly, which makes the Langfuse processor the prime suspect —
  **treat that as a hypothesis to falsify, not a finding.**
- **Whether any spans exist** on a golden-runner tick at all (the ticks report
  `claimed:0, executed:0`). A forceFlush that times out with an EMPTY queue is
  a different bug from one with a backed-up queue.
- **Whether it is egress** (the self-hosted Langfuse host on CloudFront) or
  in-process. Note `OTEL_FLUSH_TIMEOUT_MS = 5000` (`config.ts:40`) and
  `forceFlushTimeoutMillis` set at init (`otel.ts:122`).
- **Why chat turns do NOT exhibit it.** Any correct root cause must explain
  this asymmetry. If your explanation doesn't, it is not the root cause.

Then fix the cause. If the honest answer is "the exporter has nothing to
flush and the SDK still waits," the fix is to not call a bounded flush on a
span-less invocation — not to raise the ceiling.

**Evidence required:** the diagnosis write-up + a RED capture (the failing
tick) and a GREEN capture across **≥5 consecutive ticks** (stochastic
discipline: one clean tick is not proof for a timing bug).

### G1 · F170 — non-factory entity surfaces resolve

In `stageClarify.ts`, the deterministic normalize/suffix-strip pass must apply
to **every** entity_ref, not only `FACTORY`-object frames. The existing pure
`routing/resolveEntityRef.ts` (Turkish-fold, suffix handling) is the building
block — reuse it, do not write a second normalizer.

- For non-FACTORY refs the match target is the **governed alias keys we
  already have** (`normalizeAlias(z.name)`), matched EXACTLY after the input
  surface is normalized. Fuzzy/DL matching against governed rows stays
  forbidden (§2.2).
- The FACTORY path (registry mirror + DL≤2) is **byte-unchanged**.
- A governed alias hit is never overridden (the existing rule).
- An entity that genuinely cannot resolve still clarifies honestly — this fix
  removes a FALSE clarification, it must not remove a TRUE one.
- Extend the existing `[EntityResolve]` log line to cover this path so the
  outcome is sealable from Vercel logs alone (S60 lesson).

**Evidence required:** the live specimen `"Glazur3 hattı"` resolves (RED
before, GREEN after — show both) · a NEGATIVE test that an unknown zone
(`"Zirkonyum7 hattı"`) still produces an honest clarification · a test
pinning that no governed alias row was fuzzy-matched.

### G2 · F171 — deterministic messages stop picking a side

Freeze-safe scope: deterministic short-circuit messages (clarification and
ALT-D) render **bilingually**, TR first, using the product's own existing
precedent — the grounding note already renders
`Bu cevap hiçbir araç sorgusuna dayanmıyor · This answer is not based on any
tool query`. Reuse that separator and ordering; do not invent a new format.

- `stageClarify.ts:184`'s single-side pick (`ctx.language === 'en' ? .en : .tr`)
  becomes the bilingual render. Both message halves already exist in
  `computeClarification`'s `{tr, en}` — no new copy is authored.
- **Explicitly OUT OF SCOPE and to be recorded as deferred:** unifying the two
  language policies (making the model honor `ctx.language`) requires a prompt
  instruction, which means a `prompt.segment` publish — blocked by the GOLDEN
  FREEZE until BLOCK 5. Do not attempt it. Write the deferral into the
  CHANGELOG and the KB by name so it is not lost.

**Evidence required:** a test asserting both languages are present with the
existing separator · a test that the message is identical regardless of
`ctx.language` (the toggle no longer decides).

### G3 · Self-verify

- Do-not-touch greps, pasted verbatim: `computeClarification.ts` zero diff ·
  no new migration · no `prompt.segment` publish · golden ENGINE untouched ·
  FACTORY resolution path byte-unchanged.
- `npm run build` · `npm run lint` · `npm run test` · `npm run test:rule26`.
- Reseal only if a mapped file drifted; report `docVersion` before/after and
  the `check:doc-drift` verdict.
- `.agents/CHANGELOG.md` + `cwf-project-kb` SKILL.md, including G2's named
  deferral.

---

## §4 · REPORT FORMAT

One report: branch · pushed SHA(s) · `git diff --stat` vs `ebdc020` · the CI
result (CI is the SOLE test arbiter — S37-2) · **G0's diagnosis write-up and
its 5-tick evidence** · G1's red→green specimen · G2's bilingual proof · the
do-not-touch greps · `docVersion` before/after · anything you had to STOP on.

**Do not merge.** FAST-GATE review comes first; the merge instruction arrives
as a single GO block with the message embedded in `--subject`/`--body`.

<!-- END · claude-code-PHASE-S61-CLEAN-1-v1 · rev 1 · 2026-07-23 -->
