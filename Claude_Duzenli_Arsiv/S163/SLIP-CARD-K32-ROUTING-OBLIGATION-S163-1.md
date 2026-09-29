SLIP-CARD-K32-ROUTING-OBLIGATION-S163-1

AG-1 · answers CARD-K32-ROUTING-OBLIGATION-S163-1-v2 (id 3059874b-389c-479f-a4e1-603267c31c23, md5 5287aec946f2a04cb06f8e8fccf46eaa, DIGEST-OK, [STAMPED])

STATUS: STOPPED at ORDER 6 — a ruling is needed on one line of the fence rule. Every other order is done, committed and pushed.

branch  phase/k32-routing-obligation-s163-1
head    389dcc166f69397ce88d3fca27c87d8b28070436   (ONE commit, parent ed033de062dfc869850a35e40f1b39094dd24ea3)
remote  git ls-remote → 389dcc166f69397ce88d3fca27c87d8b28070436 refs/heads/phase/k32-routing-obligation-s163-1
PR      NONE — opens only on NOTICE-OPEN-PR-K32-S163-1 (AG-3 holds the slot)
report  docs/relay/CARD-K32-ROUTING-OBLIGATION-S163-1-AG1-report.md — relay-audit [OK] kind=report grammar v1, zero violations

THE STOP (report F1)
  npm run check:backend-names → [FAIL] exactly 2 cells, both the platform lane `system` (zeroExempt, ratcheted-not-zero-gated):
    system code  864 → 866 — exactly the two precedent lines ORDER 1 orders:
      api/cwf/_lib/knowledge/reference/kinds.ts        ...buildRoutingObligationKindDefs(NON_SYSTEM_BACKEND_IDS),   (like :521)
      api/cwf/_lib/knowledge/selfSeedReconciler.ts     { domain: 'routing_obligation.kinds', backendId: 'system', … } (precedent :164)
    system tests 791 → 801 (new/updated tests)
  every other (id, class) equals the baseline — no tenant backend name in code (armes code 144 = baseline)
  ORDER 6 reads "non-test growth = STOP". I removed my two comment hits and did not reword the two precedent lines to dodge the
  counter. The baseline is NOT written. data/gates/backend-names-baseline.json is pre-listed in the FILE-FENCE, so
  `--write-baseline` can join the rebuilt single commit if the ruling admits the platform lane.
  ASKED: does `system` growth from these two ordered lines count under ORDER 6's STOP?

TESTS
  routingObligation.test.ts       13 passed  (F1 past a HIGH frame · PİŞMİŞ/pismis · already-offered · not-in-catalogue ·
                                              withheld-write both lenses · F2 byte-identical ×3 · unread=null/n/a · R6 full-set)
  routingObligationKind.test.ts   12 passed  (kind mint · schema · three-state rows · gate: unknown/unsynced/ADR-011 ×2/schema)
  plants: PLANT-K32-1 (door never adds) → 3 red; PLANT-K32-2 (drop classifier lens) → 1 red; both reverted, no marker left
  affected suites (24 files)      363 passed | 1 skipped (pre-existing)
  referenceSchema.test.ts         23 passed (kind counts +1 per backend, found by the full suite)
  full suite, sandboxed           11504: 11484 passed, 16 failed, 4 skipped → 3 were referenceSchema (fixed);
                                  13 = cardPreflight 3 · envProxy 2 · harnessHonestyGate 5 · sealDerive 3 (listen EPERM)
                                  — the SAME 13 fail on clean master ed033de0 → 0 attributable

GATES
  npm run build → [check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).
     (tsc -b OK · typecheck:api OK · gen:arch-facts · check:ground GREEN · vite OK)
     reseal in the same commit; each digest equals the gate's own "got": a8b61ec3e134 · e6f5182d9bd6 · 2895eb89b34b ·
     60aee3f111fb · fb569872affa · d613c3fad608 (LLM Control Surface unchanged 64df2d44ca03); clean master passes doc-drift
  npm run typecheck:api → exit 0, no diagnostics
  registry: without the new family, KIND_REGISTRY = master's two sha256 pins exactly; +5 kinds
  F3: git diff origin/master...HEAD -G "getCookedStockAndon|pişmiş|pismis|cooked" -- . ':!*__tests__*' ':!*.test.ts' ':!*.test.tsx' ':!docs' → no file

DARK (named): K1 budget · K34 golden gate for this kind · Anthropic PLAN constraint (A25 row 4) — all E2.
  obligationOverflow = 'UNMEASURED-NO-BUDGET'. Replay lenses (routeShadowLens/kaExam/examRun) do not model the door (R9).
UI/UX: Rules tab no edit (GovernanceTab :1400-1401) · Tool Matching obligations block · Inspector term→tool→outcome.
REMOVALS: none. Operator: none.
Side effect named: authorityMatrix.test.ts rewrote docs/ground/authority-conformance.latest.md (measuredAt only) during
  the full run; restored, not committed.
GRAFT: used (ask/grep/skeleton/callers); exact bytes read from the worktree.
