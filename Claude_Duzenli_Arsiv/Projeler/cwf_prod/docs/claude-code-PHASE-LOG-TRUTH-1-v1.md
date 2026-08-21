# PHASE LOG-TRUTH-1 · v1 — F169 · F173 (the operational logs stop lying)

<!-- claude-code-PHASE-LOG-TRUTH-1-v1 · rev 1 · 2026-07-23 · Architect: Claude
     Two live-observed defects in the operational-signal layer. Shared theme:
     the logs we run production from are not trustworthy — one is noise we
     cannot yet explain (F169), one is noise we now CAN (F173).
     F169's first fix attempt (S61-CLEAN-1) did NOT work in production; this
     phase is deliberately structured so no second guess can ship.
     ENTIRE relay payload (S54-3). Amendments mint v1_2. -->

**PRECONDITION (S47-1):** valid ONLY while `origin/master` ==
`f551bc068a10714b7d43e35e614cd32f9e060a48` (rev 141 · 350 test files ·
56 migrations · drift OK). On mismatch: **STOP and report actual state**.

**PROFILE:** FULL. **MIGRATIONS: ZERO.**

**PLATINUM compliance:** both fixes are self-configuring — no new setting, no
operator step. F169's instrumentation is permanent operational capability, not
throwaway scaffolding: after this phase, "why did a flush fail" is answerable
from one log line instead of a research session. F173 removes a dev-harness
identity from the live data plane with no configuration required.

**GOLDEN FREEZE:** zero golden runs executed. `api/admin/golden-runner.ts` is
touched ONLY at its observability call site; the golden ENGINE stays untouched.

---

## §0 · THE STRUCTURE OF THIS PHASE (read before planning)

**F169 already had one fix, and it did not work.** S61-CLEAN-1 changed
`runTick()` to stop *blocking* the response on the flush. Live evidence from
production after that merge shows the failure is unchanged. The mechanism AG
reasoned to (no wall-clock cushion on an empty tick) explains the *asymmetry*
against chat turns but does **not** explain the *magnitude* — why a single
HTTP export exceeds a 5000 ms bound, deterministically, most minutes.

Therefore **G0 of this phase ships INSTRUMENTATION ONLY and then STOPS.** No
behavior fix for F169 in this round. The Architect reads production, and the
actual fix is authored as a follow-up against real data. A second guessed
patch is not acceptable — that is the whole point of this phase's shape.

F173 (G2) is independent and ships its fix in this round.

---

## §1 · F169 — LIVE EVIDENCE (do not re-derive; use it)

Production `dpl_9dJJEawEBwapY3QjcsGfYKeSm1nd`, SHA `aeda744` (i.e. WITH the
S61-CLEAN-1 fix). Every tick below is `claimed: 0`:

| UTC | 06:57 | 06:58 | 06:59 | 07:00 | 07:01 | 07:02 | 07:03 | 07:04 | 07:05 |
|---|---|---|---|---|---|---|---|---|---|
| `[Obs] flush failed … 5000 ms` | fail | fail | fail | **clean** | fail | fail | fail | fail | **clean** |

**7 of 9 still fail.** An earlier sample (06:43–06:51) showed the same 7/9
rate, but was contaminated: the Operator confirmed a Supabase availability
incident with **zero PostgREST logs between 06:44 and 06:56 UTC**. The table
above is the post-incident, uncontaminated re-measurement — so the outage was
**not** the cause, and the rate is stable at roughly 20 % clean.

A stable ~20 % clean rate is a structural signal, not randomness.

**Leading hypothesis — to be FALSIFIED, not assumed:** a cold serverless
container pays connection/TLS setup to the self-hosted Langfuse host
(CloudFront → EC2) and the export exceeds the bound, while a warm container's
export completes fast. This would explain the magnitude AND the ~20 %. It may
well be wrong. Two of the Architect's own premises and one of AG's were
already falsified in this arc; treat this one the same way.

## §2 · F173 — ROOT CAUSE (Operator-confirmed, do not re-investigate)

Postgres error `22P02 invalid input syntax for type uuid: "preview"`, dense
bursts, **591 executions** of this statement template since the DB instance
reset, first seen ~2026-07-09 (introduced by commit `12f7917`).

```
GET /rest/v1/mcp_settings?select=servers&user_id=eq.preview
→ WHERE public.mcp_settings.user_id = 'preview'   -- column type: uuid
```

Origin: `src/dev/AdminPreview.tsx` seeds `useAuthStore` with
`userId: 'preview'`; `mcpStore.loadFromSupabase()` then issues
`.eq('user_id', 'preview')` over PostgREST as role `anon`/`authenticated`.

No data leak (the cast fails before any row is produced) and no corruption.
The cost is real anyway: a dev harness reaching the live data plane, and error
noise that masks genuine signal — separating this from the benign
`seed_state` claim-race errors cost a full diagnostic round today.

---

## §3 · BINDING CONSTRAINTS

1. **No F169 behavior fix in this phase.** G0 measures. If you find yourself
   writing a fix for the flush, STOP — that is a later round, authored against
   the data G0 produces.
2. **RULE 27 floor.** `forceFlushObservability` stays never-throwing;
   observability-down must never become chat-down. Instrumentation must not
   introduce a new failure path.
3. **Do not widen `OTEL_FLUSH_TIMEOUT_MS`.** Not as a fix, not "temporarily".
4. **F173's guard must be born loud (S41-1).** A rejected identity logs once
   and serves empty — never a silent swallow, never a thrown 500.
5. **Zero migrations. Zero `prompt.segment` publishes. Zero golden runs.**
   The golden ENGINE is untouched.
6. **FULL-TRACE completeness guard** stays green; classify anything new.
7. If any instruction here contradicts the code you find, **STOP and report.**

---

## §4 · GATED SUB-PHASES

### G0 · F169 — instrument the flush (MEASURE ONLY, then stop)

Make the next production minute answer, from Vercel logs alone, every question
the current single line cannot:

- **Which processor** failed to settle. `provider.forceFlush()` fans out across
  the registered chain; today's error names none of them. Measure per
  processor. (`digestSink.ts`'s own `forceFlush` resolves instantly — that is a
  known input, not a conclusion.)
- **How long** the attempt actually took, and whether it eventually settled
  **after** the bound (a late success and a true hang are different bugs).
- **Cold vs warm invocation** — a module-scope first-call marker, stamped on
  the line. This is the discriminator for §1's hypothesis; without it the data
  cannot decide.
- **How many spans** were pending at flush time.

One structured line, single-sourced in `observability/config.ts` like every
other log/attr in this repo. Design it as **permanent** capability — a future
flush anomaly on any endpoint should be diagnosable from it, not just this one.

Emit it on the golden-runner path at minimum; if it can ride
`forceFlushObservability` itself (so every caller benefits) without violating
constraint 2, prefer that.

**Evidence required:** unit proof that the line renders correctly for each
branch (settled-in-time / settled-late / never-settled / disabled) · proof the
instrumentation cannot throw · explicit confirmation that **no F169 behavior
changed** in this gate.

**Then STOP on F169.** Report and hand back. The Architect reads production
ticks and authors the fix round.

### G1 · *(intentionally empty — reserved for F169's fix, next round)*

### G2 · F173 — a non-uuid identity never reaches PostgREST

- **Boundary guard (the durable half):** an identity that is not a uuid must
  never become a `user_id` filter. One chokepoint, deterministic, protecting
  every present and future caller — not a patch at the single call site that
  happens to be failing today. On rejection: log once, honestly, and serve the
  empty/degraded result the caller already handles.
- **Harness (the proximate half):** `src/dev/AdminPreview.tsx` must stop
  seeding a fake identity that triggers live reads — use the existing
  dev-preview seam-mock rather than the live loader. If the harness genuinely
  needs an identity, it must be a syntactically valid one that cannot collide
  with a real user.
- Do not "fix" this by making the column accept text, and do not relax RLS.

**Evidence required:** a test that `'preview'` (and any non-uuid) is rejected
at the guard and never reaches the query builder · a test that a valid uuid
still passes untouched · a test that the rejection path logs and degrades
rather than throwing · RULE-26 coverage if any panel surface changed.

*(Live confirmation that the 22P02 burst stops is the Architect's job via an
Operator read after deploy — not yours, and not the owner's.)*

### G3 · Self-verify

- Do-not-touch greps, pasted verbatim: no new migration · golden ENGINE
  unchanged · `OTEL_FLUSH_TIMEOUT_MS` unchanged · no `prompt.segment` publish ·
  chat turn path behavior unchanged.
- `npm run build` · `npm run lint` · `npm run test` · `npm run test:rule26`.
- Reseal only if a mapped file drifted; report `docVersion` before/after and
  the `check:doc-drift` verdict.
- `.agents/CHANGELOG.md` + `cwf-project-kb` SKILL.md. Record F169 as **still
  OPEN, instrumented not fixed** — do not let a CHANGELOG entry imply
  otherwise.

---

## §5 · REPORT FORMAT

One report: branch · pushed SHA(s) · `git diff --stat` vs `f551bc0` · the CI
conclusion **on the final head** (re-verify if a docs commit moves the head —
the S61-CLEAN-1 precedent) · per-gate evidence · the do-not-touch greps ·
`docVersion` before/after · anything you had to STOP on.

**Do not merge.** FAST-GATE review first; the merge instruction arrives as a
single GO block with the message embedded in `--subject`/`--body`. If that
block reaches you truncated, do not merge on a partial message — report it
(this happened once already in this session).

<!-- END · claude-code-PHASE-LOG-TRUTH-1-v1 · rev 1 · 2026-07-23 -->
