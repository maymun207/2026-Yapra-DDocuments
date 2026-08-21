# PHASE · M1F3 · DOC-FLIP + F-M1F3-1..4 · v1_2
<!-- PHASE-M1F3-DOCFLIP-1-v1_2 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     SUPERSEDES v1 and v1_1 (S37-1). Run THIS file; the others are void.
     v1_2 adds G6 and G7, both found by the owner's hand-witness of the live tab.
     SECOND AND FINAL AMENDMENT: anything found after this enters Block 2 by name
     rather than becoming a third version of a phase already in flight.
     Everything completed under v1/v1_1 remains valid — v1_2 is additive.
     Delta: G2.5 added. The owner hit "Reset to code floor" on a governed param
     and got "No reference instance for this key". That is not a misclick; it is
     a structural gap the Architect verified in code, and it makes the panel's
     floor-reset affordance inoperable for EVERY agent param.
     SELF-CONTAINED (D-2). Base: origin/master = d599b8b2b25315dbb02bfa02efc61fbbe1e90d24. -->

## §0 · WHY

`20260803160000` is now APPLIED. Four things are owed and they close together:

* the migration's header still says **Operator-pending** — the record is wrong;
* **F-M1F3-1** — one guard throws without leaving a trace, so the honesty card's
  footnote undercounts;
* **F-M1F3-2** — the panel cannot reset a governed param to its code floor;
* **F-M1F3-3** — the p95 row colours a trend computed from ONE sample;
* **F-M1F3-4** — band 4 defers without naming who owns the deferral;
* a ruling minted by this apply (**S80-3**) has no home in the code.

## §1 · PRE-FLIGHT (blocking)

Fresh **full clone**. S80-1/D-8: absolute paths for every write.

```
git clone https://github.com/maymun207/cwf_yaprak.git <scratch> && cd <scratch>
git rev-parse origin/master
```
**Expected anchor:** `d599b8b2b25315dbb02bfa02efc61fbbe1e90d24`. Differs ⇒ STOP.

| Command | Expected |
|---|---|
| `ls supabase/migrations/*.sql \| wc -l` | `67` |
| `npx vitest run` | **436 files / 4861 tests** green — report exact numbers |
| `grep docVersion public/architecture/manifest.json` | `rev 185 · 2026-08-03` |
| `check:doc-drift` · `check:tenant-zero` · `typecheck:api` | `[OK]` / `[OK]` / clean |

Branch: `phase/m1f3-docflip-1`.

## §2 · CONSTRAINTS

**NO migration. NO DDL. NO governed write or publish. NO schema change.**
`evalGate.ts` diff EMPTY · zero writes to `messages` · RULE-1 · ADR-007.
**Do not modify `referenceSchema` / `REFERENCE_INSTANCES` itself** — it is the
eval gate's reference stage input and the seed source; widening it is a blast
radius this phase has no business taking. See G2.5 for the surgical route.
If you conclude a migration is needed, **STOP and report**.

## §3 · THE WORK

### G1 · DOC-FLIP the applied migration

`20260803160000_turn_feedback_triage_and_latency_dedup.sql`'s header status flips
to **applied, 2026-08-03**, with the gate outcomes recorded as measured:

* `reviewed_at` / `reviewed_by` present and nullable; CHECK
  `turn_feedback_review_pair_check` live as
  `((reviewed_at IS NULL) = (reviewed_by IS NULL))`; partial index
  `turn_feedback_unreviewed_down_idx` live with
  `WHERE ((verdict = 'down') AND (reviewed_at IS NULL))`.
* **The column narrowing, proven at ground truth, not inferred:**
  `pg_class.relacl` → `authenticated=arm` (**no `w`**);
  `pg_attribute.attacl` → `authenticated=w` on **`verdict` and `reason_text` only**,
  `attacl` **NULL** on `reviewed_at` and `reviewed_by`. The person who filed the
  complaint cannot mark it reviewed.
* `verifyGrants` live: **63 passed / 0 failed**, all four `health_*` functions
  42501-denied, positive control green.
* Second `db push`: no-op.

Prove comment-only by the comments-stripped byte-compare, **with the positive
control** that the compare is not vacuous.

### G2 · F-M1F3-1 — the guard that throws without a trace

`TurnTraceDigestRepository.deleteOlderThan` throws `ReadUnavailableError`
(1.3a, Class A). Its only caller, `api/admin/turn-trace-digest-cleanup.ts:40`,
calls it **bare** — no `try/catch`, no `recordMeasurementUnavailable`. A read
failure there 500s the cron and the honesty card's *"measurement failures
caught"* footnote **undercounts by exactly one source**.

Catch it, record it through the existing `measurementFailure.ts` helper exactly
as `memory-forget` and the synthetic injector do, then fail the request — **do
not swallow it into a 200.** A cron that could not read must not report success.

**Census the class, do not patch the instance:** every call site of a method that
can throw `ReadUnavailableError` or `CountUnavailableError`. State your method
and count. A third site neither of us has named ⇒ **yours wins**, and it is named.

### G2.5 · F-M1F3-2 — the panel cannot see the floor it is supposed to reset to

**The evidence (Architect-verified at `d599b8b2`):**
`api/admin/rules.ts:51` resolves the reset pool as
`kindId === SYSTEM_KIND_IDS.PROMPT_SEGMENT ? REFERENCE_PROMPT_SEGMENTS :
referenceSchema.instances`. `referenceSchema.instances` **is**
`REFERENCE_INSTANCES` (`reference/index.ts:27`), and `referenceData.ts` **never
imports `agentParams`** — `grep -c agentParams` = **0**, `grep -c AGENT_PARAM` =
**0**. The agent-param floor lives in a *different* array, `AGENT_PARAM_SEEDS`,
which only the self-seed reconciler consumes.

So `?reference=agent.param` returns `instances: []` for **every one of the 33
agent params**, and the panel answers *"No reference instance for this key"*.
The floor exists; the panel is looking in the wrong place. Combined with S80-3
(a floor change is inert once published) this leaves **no panel path at all** to
adopt a re-grounded floor — which makes it a missing-tooling bug under the
standing admin-panel rule, not an owner inconvenience.

**The route:** extend the existing carve-out at `rules.ts:51`. That special case
already exists for `PROMPT_SEGMENT`, so the pattern is established, not invented,
and the blast radius stays inside one expression. **Do not** merge
`AGENT_PARAM_SEEDS` into `REFERENCE_INSTANCES` (see §2).

**Census the class — this is the point, not the one key.** `seed_state` currently
holds **eight** live seed domains: `armes.reference` · `gateway_tool_policy.kinds`
· `synthetic.question_set_v1/v2/v3` · `system.agent_param` ·
`system.router_prompt` · `tool_category.kinds` · `tool_doc.kinds`. `PROMPT_SEGMENT`
already needed its own carve-out, and `agent.param` is the second one found by
accident. **For every kind reachable in the panel, determine whether its
reference is visible to `?reference=`**, report the table, and fix all of them —
or state, per kind, why one is legitimately absent. A one-key patch here would
guarantee the next owner meets this same dialog on a different key.

Test both directions (D-5): the reset returns the floor payload for a key that
has one, AND still returns the honest "no reference" for a key that genuinely
has none. An affordance that silently invents a floor is worse than one that
says it cannot find it.

### G3 · S80-3 gets a home in the code

> **S80-3.** Once a governed param has been PUBLISHED, changing its code-floor
> value is **INERT in production**. Runtime resolution is DB-first, and the
> self-seed reconciler's ABSENCE-ONLY LAW means it never republishes a row that
> already exists. The floor is the seed, the reset target and the outage floor —
> **never the live value.** Any phase that re-grounds a governed value must ship
> the governed publish as part of its own completion, or state in writing that
> the new value is **not yet live**.

Measured: the reconciler published all four `health.*` params at 2026-08-03
07:55Z carrying the then-current floor, including `health.p95WarnMs = 12000`.
1.4 moved the floor to `30_000` with its evidence, and that change **was not
live** — the owner is publishing it by hand through the panel because G2.5's
affordance is broken.

Put the ruling where the next person hits it: a short note at the
`HEALTH_P95_WARN_MS` decl in `agentParams.ts`, and in `selfSeedReconciler.ts`'s
header beside the ABSENCE-ONLY LAW it follows from. **State the RULE, not the
transient value** — "the published row is 12000" goes stale the moment it is
published; "a floor change is inert once published" stays true.

### G6 · F-M1F3-3 — p95 draws a coloured trend on n=1

Witnessed live: the Conversations band reads `Turns (last day) 1` and
`Turn generation time p95 ↓ 5.2s` **with a green arrow**, while its two siblings
in the same band correctly render *"not enough evidence — left uncolored"*. The
5.2s is 2026-08-03's single `llm_call` sample (5211 ms) — a p95 over n=1 is just
that one value wearing a percentile's name.

The brief's G5 said it plainly: **an arrow on an unmeasured or below-N series
does not render at all.** The band's own verdict is UNMEASURED, so this row is
inside exactly that case. Your self-verify reported five no-arrow cases and a
positive control, so the rule exists — determine whether this row escapes it
because the guard keys off the metric rather than the band, and close it.

Ruling for the fix: **`minN` gates the COLOUR and the ARROW, not the number.**
The value may still be shown — hiding it would be its own dishonesty — but below
`minN` it renders unqualified, exactly as the two rate rows already do, and it
carries the sample count so a reader can see why. A percentile computed from one
observation must never look more confident than a rate computed from one.

Test both directions (D-5): no arrow below `minN`; a real arrow above it.

### G7 · F-M1F3-4 — a deferral with no name

Band 4 renders *"Publish/gate/draft counters are not measured in this phase"* and
points at **nothing**. Band 1, two cards away, defers the same way and names
`OMURGA-SIGNALS-1` — that is the standard, and band 4 is below it.

A deferral that names its owner is a decision; one that does not is a hole that
looks like a decision. Give band 4's unmeasured signals a named item exactly as
band 1 does. If the honest answer is that no item exists yet, then **mint one and
name it in the card** — do not ship the sentence as it stands.

State in the hand-back which item you named and why, so the Architect can place
it on the board rather than discover it there.

### G4 · PRUNE

Delete the remote branch `phase/m1f3-health-surface-1` (verify ancestry first).
Architect-authorized. The two by-design stale remotes stay:
`phase/e2e-devserver-api-404-1`, `phase/inspect-verdict-1`.

### G5 · SEAL

`npm run reseal` — **never hand-write a hash** (L13). `docVersion` **rev 185 →
rev 186** by hand, once. CHANGELOG + SKILL.md lessons. `check:doc-drift` `[OK]`.

## §4 · SELF-VERIFY

1. G1 comment-only proof + its positive control.
2. G2: census method and count; the emit proven to land from a forced throw; a
   test that the cron does **not** answer 200 on an unreadable count.
3. G2.5: the per-kind visibility table; a test proving the floor payload is
   returned for `agent.param`, and a test proving an honest "no reference" is
   still returned where none exists.
3b. G6: a rendered proof that the p95 row shows NO arrow and NO colour below
   `minN`, carrying its sample count — and one above `minN` that does.
3c. G7: the named item quoted from band 4's card.
4. G3: both notes quoted, plus a grep proving neither states a transient value.
5. G4: the remote branch list after pruning.
6. `evalGate.ts` diff EMPTY · zero writes to `messages` · zero governed publishes
   · `REFERENCE_INSTANCES` diff EMPTY.
7. `npx vitest run` green; counts and delta fully accounted.
8. `typecheck:api` · `check:doc-drift` · `check:tenant-zero`.
9. `npm run test:rule26` green **first attempt**, **flaky count stated
   explicitly**, from the run's own summary. No re-run.
10. FIX-SCOPE-TRUTH-1 extensions by name.
11. **The remote branch hash** — missing from the last hand-back; a review should
    not have to go find its own subject.

**STOP FOR REVIEW.** Push, report the hash, do not merge.

<!-- END · PHASE-M1F3-DOCFLIP-1-v1_1 -->
