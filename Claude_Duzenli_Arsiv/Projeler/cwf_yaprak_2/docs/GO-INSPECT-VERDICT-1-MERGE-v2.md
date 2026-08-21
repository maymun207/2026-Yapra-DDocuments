# GO — PHASE-INSPECT-VERDICT-1 · MERGE AUTHORIZATION · v2 (REVISED)
<!-- GO-INSPECT-VERDICT-1-MERGE-v2 · 2026-08-02 · S79 · Supersedes
     GO-…-v1 (issued when master was dec3ff55). The v1 review verdict on
     c32b881a's BYTES stands unchanged and is carried in §6; what changes is
     the base, the conflict resolution, and the CI-before-master order.
     Architect ran the merge locally this session against a fresh clone at
     master 16a5e831 — the conflict surface below is MEASURED, not predicted.
     Self-contained per D-2. -->

## §1 · PRECONDITION (S47-1)
- `git rev-parse origin/master` → `16a5e8314e3758977ccfcd8087f15f0ebc68c056`
- `git rev-parse origin/phase/inspect-verdict-1` → `c32b881a6161539eb26c6ca51c3b8141dc129acc`
- The phase branch must be UNCHANGED. Any mismatch → STOP and report.

## §2 · THE CONFLICT SURFACE (measured by the Architect, not predicted)
A local `git merge --no-ff origin/phase/inspect-verdict-1` onto `16a5e831`
produces **exactly three conflicts, all documentation**:
- `.agents/CHANGELOG.md`
- `.agents/skills/cwf-project-kb/SKILL.md`
- `public/architecture/manifest.json`

**Every code file auto-merges cleanly**, including `src/dev/AdminPreview.tsx`
— verified on the merge result: `seedMockInspectVerdictData()` (yours) and
`listReferenceInstances` (the devserver phase's) are BOTH present, neither
displaced. There is no code conflict to resolve and no code judgement to
make in this merge.

## §3 · HOW TO RESOLVE (do exactly this)
**CHANGELOG + KB:** append-only documents — keep BOTH entries, nothing
dropped, in chronological order (E2E-DEVSERVER-API-404-1 first, then
INSPECT-VERDICT-1). Neither side supersedes the other.

**manifest.json — follow this repo's own recorded precedent** (the
OBS-TRACE-2 REBASE lesson, written into the manifest itself: *never
hand-merge a hash*):
1. Take **`origin/master`'s manifest wholesale** (`git checkout --ours`).
   You lose nothing mechanical by doing so: the devserver merge changed only
   `docVersion` + seven `lastSyncedCommit` values, no note text.
2. Re-apply the ONE authored sentence your branch added — the
   `INSPECT-VERDICT-1 (rev 180 reseal): …` note on the Architecture Map tab —
   byte-copied from `origin/phase/inspect-verdict-1`, **with one edit: the
   rev number becomes 181, not 180.** Master already spent 180 on the
   devserver phase; the merge result is a new doc state and takes the next
   rev. Two trees must never both claim rev 180.
3. Run `npm run reseal` fresh on the merged tree. It, and only it, writes
   `docVersion` (→ **rev 181**), every `mappedContentSha`, and every
   `lastSyncedCommit`. Do not type a hash by hand anywhere.
4. `npm run check:doc-drift` → [OK] 7/7.
5. `grep -rn '<<<<<<<\|>>>>>>>\|=======' ` over the tree → ZERO conflict
   markers surviving. Paste the (empty) output.

## §4 · CI BEFORE MASTER (the order matters more than usual here)
A conflicted merge cannot be arbitrated by PR #139 — GitHub cannot compute
its merge ref. So:
1. Create the resolved merge commit locally on top of `16a5e831` with the
   §5 message.
2. Push that exact commit to a temporary branch
   **`ci/inspect-verdict-merge`** and open a PR of it → `master` (a
   fast-forward, no conflicts).
3. **PASS CONDITION:** every check green on that commit (`eval-canary`
   skipped on a PR event is the standing pattern and is a pass). `rule26`
   must be green ON THE FIRST ATTEMPT — this is the first merge that runs
   your specs on top of the harness fix, and a retry here would forfeit the
   only clean read we will ever get of whether that fix actually held. If
   `rule26` reds: STOP, paste the log, do NOT rerun.
4. On green, advance `master` to **that same commit** (no new merge, no
   rebase, no amend — the tested bytes are the merged bytes). Then delete
   `ci/inspect-verdict-merge`.

## §5 · MERGE MESSAGE (VERBATIM, byte-exact, single line, no trailers — S30-2)

Merge PHASE-INSPECT-VERDICT-1: the verdict becomes visible where turns are already read — one door for telemetry and feedback both, and a lookup that says when it does not know

## §6 · PROVE THE REVIEWED BYTES SURVIVED (new, mandatory)
My RULE-25 review was of `c32b881a`. A conflicted merge is exactly where
reviewed bytes quietly change, so prove they did not. On the merge result,
run and paste:
1. `git diff origin/phase/inspect-verdict-1 HEAD -- api/admin/turn-feedback.ts api/cwf/_lib/persistence/repositories/TurnFeedbackRepository.ts src/lib/feedbackService.ts src/lib/adminService.ts src/components/admin/InspectTab.tsx shared/dbConstants.ts e2e/inspect-verdict.spec.ts`
   → expect **EMPTY** (the devserver phase touched none of these).
2. `grep -c "seedMockInspectVerdictData\|listReferenceInstances" src/dev/AdminPreview.tsx`
   → expect **3** (both stubs present, the union).
3. Independent recounts on the merge result: migration count (**65**),
   vitest file count (**424**), `docVersion` (**rev 181**).

## §7 · REPORT (all from the REMOTE)
1. `git rev-parse origin/master` — the merge hash
2. The PR run id + per-check results, and the master run id + per-check
   results after the advance
3. `git ls-remote --heads origin` — `ci/inspect-verdict-merge` gone;
   report whether `phase/inspect-verdict-1` and
   `phase/e2e-devserver-api-404-1` are pruned or kept (prune optional,
   reporting is not)
4. PR #139's final state as GitHub reports it — do not force it either way
5. The §3.5 empty grep and all three §6 proofs

There is no Operator relay for this phase (zero migrations, zero governed
writes). After the merge report, the owner does one hand-witness in the
panel and the Architect reads the lookup's log line from production.

## §8 · REVIEW VERDICT (carried forward from v1, unchanged)
PASS on `c32b881a`'s bytes: the door condition is one value consumed by
both readers, so the service-role-telemetry-with-own-rows-verdicts failure
is structurally unreachable; the gate is `TELEMETRY_READ_ALL` and the test
asserts the permission CONSTANT reached the guard; empty≠zero is honoured
three times (repository throws, endpoint 422s instead of truncating, panel
raises a named marker); the producer is frozen and the isolation fence is
byte-unmodified with a positive-controlled ZERO grep; `reason_text` renders
only in the expanded detail and an unvoted turn renders nothing.
Your two mutation findings — a render suite mocking the very function whose
throw it claimed to pin, and a page-level RULE-26 assertion absorbed by an
ancestor's `overflow-auto` — remain the substance of this review: both were
classes of false green, not instances, and both now red on the mutation.

**Named findings, still deferred, still not for this branch:** IV1-R1 (the
endpoint's 100-id bound vs the repository's 1000-id bound — correct today
because the client batches at the endpoint's bound, a live divergence the
moment a second caller appears) · IV1-R2 (the e2e harness exercises the
cross-user door only; unit coverage carries the personal door) ·
E2E-RETRY-MASK-7 (the seven now-obsolete CI-retry blocks — rollout plan
2.3).

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "plan 2.3)." and
     this comment. Missing line = truncated relay — request a re-send. -->
<!-- END · GO-INSPECT-VERDICT-1-MERGE-v2 -->
