# PHASE FLAKE-SWEEP-1 — sync-query-after-async-promise sweep (S37-2 cleanup)
**claude-code-PHASE-FLAKE-SWEEP-1-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG-A**

> PLATINUM statement: this phase removes latent nondeterminism from the test
> floor itself — CI stays trustworthy without anyone re-running or babysitting
> flaky suites; no manual steps, no owner actions.

---

## §P · PRECONDITION (S47-1)
Valid ONLY while `origin/master == 49ea01d4d9d93fa7bd7c0d7e52197a88e13382ae`
(docVersion rev 126). On mismatch: STOP and report actual state.
**CONCURRENCY NOTICE:** AG-B is simultaneously on branch `obs-trace-2b`
(surface: `api/cwf/_lib/persistence/**` + one comment in observability
`config.ts` + its own tests). Your surface is CLIENT TEST FILES ONLY — the two
must not overlap. If any file you need is touched on that branch, STOP and
report. Reseal rule (S47-1): whichever PR merges SECOND rebases and reseals to
rev N+1 in the merge commit — expect test-only changes to need NO reseal, but
budget it (S34-1) if the drift gate says otherwise.

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master   # must print 49ea01d4d9d93fa7bd7c0d7e52197a88e13382ae
```
Grep all test/build commands from `package.json` (S32-1). Branch:
`flake-sweep-1` from origin/master.

## §1 · WHY
S37-2 lesson (NAV-STACK-1 postmortem): a sync `getBy*` query racing an async
data load passed sharded local runs on BOTH lanes and failed only in unsharded
CI (`backendTrustPanel.test.tsx` — sync `getByTestId('trust-audit-row-a-2')`
before the `listBackendTrustAudit` promise resolved; DOM held an `aria-busy`
skeleton). The fix was `findByTestId`. The mandated cleanup — "grep for the
same pattern elsewhere" — is this phase. S55-1 raises the bar: a flake class
gets a ROOT-CAUSE sweep + retry-free N-rep validation, not optimism.

Architect's tree-verified starting evidence (2026-07-21, anchor above):
- 3 files combine `mockResolvedValue` + sync `getBy*` with ZERO
  `findBy`/`waitFor` anywhere: `src/components/ui/__tests__/
  chatShellToolEvidence.test.tsx`, `chatShellProcedureChip.test.tsx`,
  `chatShellError.test.tsx`. These are the confirmed-hot set.
- ~40 client test files use sync `getBy*`; 26 already use `findBy*` somewhere.
  The backendTrustPanel case proves danger is LINE-level, not file-level: a
  file with `waitFor` can still hold one racing sync query.

## §2 · BINDING CONSTRAINTS
1. **Test files only.** Zero production-code edits. If a race is only fixable
   by changing component code, do NOT fix it — record it in the report as a
   finding for the Architect (it may be a real product bug, not test hygiene).
2. **Fix = make the await explicit**, in preference order: sync `getBy*` on
   async-loaded content → `await findBy*`; assertions on async state →
   `await waitFor(...)`. Do NOT add retries, timers, arbitrary `setTimeout`
   sleeps, or `retries:` config anywhere — retry belts are F149-class
   last-resorts and are NOT authorized here.
3. **No behavioral weakening.** Never delete or loosen an assertion to make it
   stable. Assertion count per file must be ≥ before (state per-file counts in
   the report).
4. Do not touch: `api/**`, `shared/**`, any `persistence` test (AG-B's lane),
   `vitest` config, CI workflow files.

## §3 · GATED SUB-PHASES
- **G1 — line-level audit.** Enumerate every sync `getBy*`/`getAllBy*` call in
  `src/**/*.test.tsx` whose target renders from an async source (mocked
  promise, fetch effect, capability load). Produce the audit table:
  `file · line · query · async source · verdict (RACING | SAFE | UNSURE)`.
  SAFE requires a stated reason (e.g. content rendered synchronously from
  props, or already inside `waitFor`/after `findBy` on the same subtree).
  UNSURE is treated as RACING.
- **G2 — fix** every RACING/UNSURE line per §2. The 3 confirmed-hot files are
  mandatory members of the fix set.
- **G3 — N-rep retry-free validation (S55-1, load-bearing).** Full unsharded
  local suite ×5 consecutive green runs, zero retries configured. Paste all
  five tails. Sharded greens do not count (S37-2: sharding hides scheduling
  races).
- **G4 — push branch, open PR.** Unsharded CI green on the PR head = merge
  precondition (S37-2).

## §4 · SELF-VERIFY CHECKLIST (evidence, literal)
- [ ] G1 audit table pasted in full (every sync query row, verdicts + reasons).
- [ ] All RACING/UNSURE rows fixed; the 3 confirmed-hot files in the diff.
- [ ] Per-file assertion counts ≥ pre-change (table).
- [ ] Grep proof: zero `retries`, zero `setTimeout` sleeps added by this diff.
- [ ] `git diff --stat origin/master..HEAD` pasted; touched files are ALL
      `src/**/*.test.tsx` (or a stated, justified exception awaiting Architect
      ruling — default is STOP).
- [ ] ×5 consecutive unsharded local greens pasted (G3).
- [ ] CI (unsharded) green link on the PR head.
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1).
- [ ] Any component-code-bug findings listed separately for the Architect (§2.1).

## §5 · WHAT YOU DO NOT DO
No merge (Architect reviews — FAST-GATE eligible: test-only surface — and
authors the verbatim merge message, S30-2). No production code. No migrations.
No golden runs (FREEZE). No touching AG-B's branch or surface.

<!-- END · claude-code-PHASE-FLAKE-SWEEP-1-v1 · rev 1 · 2026-07-21 -->
