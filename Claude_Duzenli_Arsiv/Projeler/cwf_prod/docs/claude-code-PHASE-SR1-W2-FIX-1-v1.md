# PHASE SR1-W2-FIX-1 — Kind-Aware Self-Seed + Born-Loud Rows + Failed-Outcome Reclaim
<!-- claude-code-PHASE-SR1-W2-FIX-1-v1 · rev 1 · 2026-07-17 · Architect-authored against live master 82e7552 -->
<!-- PLATINUM-BREACH-3 redesign — queue-jumps everything incl. SR1-W3. -->

## S47-1 PRECONDITION (binding)
Valid ONLY while `origin/master == 82e7552`. On mismatch: STOP and report actual
state. You own the reseal (rev 103 → 104) if mapped files are touched.

## PLATINUM COMPLIANCE STATEMENT
This phase EXISTS because SR1-W2 shipped a self-seed that silently cannot seed a
NEW kind (F128 / PLATINUM-BREACH-3). After it: a brand-new governed kind
declared in code self-provisions its rule_kinds row, its instances, retries its
own past silent failure, and reports every per-row failure loudly — zero manual
steps, zero Operator action, the existing broken seed_state row self-heals.

## CEREMONY PROFILE
FULL (api/** touch). CI unsharded = merge arbiter. No migration in this phase.

## 0 · PRE-FLIGHT
Fresh clone, `git rev-parse origin/master` == 82e7552, npm ci, drift gate [OK].
Branch `sr1-w2-fix-1`.

## 1 · ROOT CAUSE (verified live 2026-07-16 21:48Z, trace 30f3e356…)
`[Seed] domain=system.router_prompt fingerprint=3006e4d48517 rows=0` on the
FIRST claim. Chain: `domain_rules.kind_id` FK → `rule_kinds(kind_id)`
(20260627150001:13); NOTHING creates the `router.prompt` rule_kinds row
(reconciler seeds instances only; upsertKind seed scripts are unrun optional
wrappers); `resolveKindDef` falls back to the CODE registry so createDraft
doesn't even fail loudly — the domain_rules INSERT hits the FK, the repo
returns an error, `seedDomain` silently `continue`s, and `completeOutcome`
CONSUMES the claim. The governed row can never be born at this fingerprint.
No user impact (router DARK, resolver floors identically) — but the seed
pipeline lies by omission (S41-1) and cannot self-configure a new kind
(PLATINUM).

## 2 · BINDING CONSTRAINTS
1. Eval-gate engine/stage-order/interpreter byte-identical. Kind PROVISION uses
   the existing `RuleStoreRepository.upsertKind` seam (the seedPromptSegmentsCore
   precedent) — no new write path.
2. Absence-only law extends to kinds: upsert ONLY when `repo.getKind(kindId)`
   returns null. An existing DB kind row is NEVER overwritten by the reconciler
   (a DB-amended field_spec — RULES-AMEND-1 — must survive boot untouched).
3. `system.prompt_segment`'s golden contract untouched (kind provisioning
   writes rule_kinds, never touches governance.ts's Layer-2 arm).
4. Fail-open everywhere stays: any error in kind provisioning logs loudly and
   skips that domain — chat never degrades for seeding.
5. No migration, no Operator step, no owner step — the fix self-applies on the
   next warm after deploy.

## 3 · GATED SUB-PHASES

### FIX.a — Kind-aware seeding (selfSeedReconciler.ts)
Before seeding a domain's instances: collect the distinct kindIds in
`dom.instances`; for each, `repo.getKind(kindId)` → if null, `upsertKind` from
the CODE registry def (`getKindDef`) mapping the exact seedPromptSegmentsCore
row shape (kind_id, backend_id, name, class, is_locked, code_schema_ref,
field_spec, updated_by: null — S33-1). Log `[Seed] kind-provisioned
kind=<id>` per provision. Unknown-in-code kindId → loud error, skip domain.

### FIX.b — Born-loud per-row failures (S41-1)
In `seedDomain`'s instance loop: a failed `createDraft` or non-published
`publish` logs `[Seed] FAILED domain=<d> kind=<k> key=<key> stage=draft|publish
err=<message>` (message only — never payload content). Extend the summary line
to `[Seed] domain=<d> fingerprint=<fp> rows=<n> skipped=<m> failed=<k>`.

### FIX.c — Failed-outcome semantics + reclaim (the self-heal)
1. In `seedDomain`: when `totalDeclared > 0 && rowsSeeded === 0 &&
   rowsSkippedPresent === 0` (nothing present, nothing seeded = total failure),
   call `releaseClaim` instead of `completeOutcome`, with a loud
   `[Seed] domain=<d> total-failure — claim released for retry` line.
   Partial failures (some rows seeded/skipped) still complete, with the failed
   count visible in the outcome jsonb AND the log line.
2. In `SeedStateRepository.claim` (the X2b reclaim site): ALSO reclaim a
   COMPLETED row whose outcome matches the total-failure shape
   (`rowsSeeded === 0 && rowsSkippedPresent === 0 && totalDeclared > 0`) —
   delete + retry insert once, same as the stale-null-outcome path. This is
   what heals the EXISTING system.router_prompt seed_state row with zero
   Operator action: next warm after this deploys → reclaim → kind provisioned
   (FIX.a) → instance published → `rows=1`.
3. Comment WHY at both sites (bible-grade): the F128 chain in two sentences.

### FIX.d — Tests
- New-kind domain: reconciler provisions the rule_kinds row then publishes the
  instance (mock repo asserts upsertKind called with the code-registry def,
  ONLY when getKind → null).
- Existing DB kind row (different field_spec than code): upsertKind NEVER
  called (constraint 2 regression pin).
- Per-row failure path: draft error → [Seed] FAILED logged, loop continues.
- Total-failure path: releaseClaim called, completeOutcome NOT called.
- Reclaim path: a completed claim with total-failure outcome is reclaimed and
  re-attempted; a completed claim with rowsSeeded>0 or rowsSkippedPresent>0 is
  NOT reclaimed (terminality of genuine successes).
- Existing selfSeedReconciler + seedState suites stay green unchanged where
  behavior was correct.

## 4 · SELF-VERIFY (evidence, literal)
1. `git rev-parse origin/master` at start (pasted).
2. Full suite unsharded green (count pasted; > 2675 expected).
3. Drift gate [OK] after reseal (if mapped files touched → rev 104).
4. `git diff --stat 82e7552..HEAD` pasted; governance.ts golden arm untouched
   (name-list).
5. Statement of the expected LIVE line post-deploy:
   `[Seed] kind-provisioned kind=router.prompt` followed by
   `[Seed] domain=system.router_prompt … rows=1 skipped=0 failed=0` on the
   first warm — the Architect will verify this from Vercel logs (no owner step).
6. Push `sr1-w2-fix-1`, open PR, report CI. Merge only on Architect GO with the
   Architect-authored message.

<!-- END · claude-code-PHASE-SR1-W2-FIX-1-v1 · rev 1 · 2026-07-17 -->
