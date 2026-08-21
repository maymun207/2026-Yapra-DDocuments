# PHASE · M1F3 · DOC-FLIP + F-M1F3-1 · v1
<!-- PHASE-M1F3-DOCFLIP-1-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     The closing piece of rollout item 1.4. Small, but it is the difference
     between "the work is done" and "the record says what happened".
     SELF-CONTAINED (D-2). Base: origin/master = d599b8b2b25315dbb02bfa02efc61fbbe1e90d24. -->

## §0 · WHY

`20260803160000` is now APPLIED. Three things are owed and they are done together
because they are all small and all belong to the same close:

* the migration's header still says **Operator-pending** — the record is wrong;
* **F-M1F3-1** — one guard throws without leaving a trace, so the honesty card's
  footnote undercounts;
* a standing ruling minted by this apply (**S80-3**) has no home in the code.

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
If you conclude a migration is needed, **STOP and report**.

## §3 · THE WORK

### G1 · DOC-FLIP the applied migration

`20260803160000_turn_feedback_triage_and_latency_dedup.sql`'s header status flips
to **applied, 2026-08-03**, with the gate outcomes recorded as measured:

* `reviewed_at` / `reviewed_by` present and nullable; CHECK
  `turn_feedback_review_pair_check` live as
  `((reviewed_at IS NULL) = (reviewed_by IS NULL))`; the partial index
  `turn_feedback_unreviewed_down_idx` live with
  `WHERE ((verdict = 'down') AND (reviewed_at IS NULL))`.
* **The column narrowing, proven at ground truth, not inferred:**
  `pg_class.relacl` → `authenticated=arm` (**no `w`** — no table-wide UPDATE);
  `pg_attribute.attacl` → `authenticated=w` on **`verdict` and `reason_text` only**,
  and `attacl` **NULL** on `reviewed_at` and `reviewed_by`. The queue cannot be
  drained by the person who filed the complaint.
* `verifyGrants` live: **63 passed / 0 failed**, all four `health_*` functions
  42501-denied, positive control (service role can still write) green.
* Second `db push`: no-op.

Prove comment-only by the standing comments-stripped byte-compare, **with the
positive control** that the compare is not vacuous.

### G2 · F-M1F3-1 — the guard that throws without a trace

`TurnTraceDigestRepository.deleteOlderThan` throws `ReadUnavailableError`
(1.3a, Class A). Its only caller, `api/admin/turn-trace-digest-cleanup.ts:40`,
calls it **bare** — no `try/catch`, no `recordMeasurementUnavailable`. A read
failure there 500s the cron and the honesty card's *"measurement failures
caught"* footnote **undercounts by exactly one source**.

Three lines and a test: catch it, record it through the existing
`measurementFailure.ts` helper exactly as `memory-forget` and the synthetic
injector already do, then re-throw or fail the request — **do not swallow it into
a 200**. A cron that could not read must not report success.

**Then census the class rather than patching the instance** (the 1.3a lesson):
every call site of a method that can throw `ReadUnavailableError` or
`CountUnavailableError`. State your method and count. If there is a third site
neither of us has named, **yours wins** and it is named in the hand-back.

### G3 · S80-3 gets a home in the code

**The ruling, minted by this apply:**

> **S80-3.** Once a governed param has been PUBLISHED, changing its code-floor
> value is **INERT in production**. Runtime resolution is DB-first; the
> self-seed reconciler's ABSENCE-ONLY LAW means it never republishes a row that
> already exists. The floor is the seed, the reset target and the outage floor —
> **never the live value.** Any phase that re-grounds a governed value must ship
> the governed publish as part of its own completion, or state in writing that
> the new value is **not yet live**.

Measured this session: the reconciler published all four `health.*` params at
2026-08-03 07:55Z carrying the then-current floor, including
`health.p95WarnMs = 12000`. 1.4 moved the floor to `30_000` with its evidence —
and that change **is not live**, because a published v1 row already exists.

Put the ruling where the next person will hit it: a short note in
`agentParams.ts` at the `HEALTH_P95_WARN_MS` decl, and in
`selfSeedReconciler.ts`'s header beside the ABSENCE-ONLY LAW it follows from.
**State the RULE, not the transient value** — a note saying "the published row is
12000" goes stale the moment the owner publishes 30000; a note saying "a floor
change is inert once published" stays true forever.

### G4 · PRUNE

Delete the remote branch `phase/m1f3-health-surface-1` (verify ancestry first).
Architect-authorized. The two by-design stale remotes stay:
`phase/e2e-devserver-api-404-1`, `phase/inspect-verdict-1`.

### G5 · SEAL

`npm run reseal` — **never hand-write a hash** (L13). `docVersion` **rev 185 →
rev 186** by hand, once. CHANGELOG + SKILL.md lessons. `check:doc-drift` `[OK]`.

## §4 · SELF-VERIFY

1. G1 comment-only proof + its positive control.
2. G2: the census method and count; the new emit proven to land from a forced
   throw; a test that the cron does **not** answer 200 on an unreadable count.
3. G3: both notes quoted, and a grep proving neither states a transient value.
4. G4: the remote branch list after pruning.
5. `evalGate.ts` diff EMPTY · zero writes to `messages` · zero governed publishes.
6. `npx vitest run` green; counts and delta fully accounted.
7. `typecheck:api` · `check:doc-drift` · `check:tenant-zero`.
8. `npm run test:rule26` green **first attempt**, **flaky count stated
   explicitly**, read from the run's own summary. No re-run.
9. FIX-SCOPE-TRUTH-1 extensions by name.
10. **The remote branch hash** — it was missing from the last hand-back and a
    review should not have to go find its own subject.

**STOP FOR REVIEW.** Push, report the hash, do not merge.

<!-- END · PHASE-M1F3-DOCFLIP-1-v1 -->
