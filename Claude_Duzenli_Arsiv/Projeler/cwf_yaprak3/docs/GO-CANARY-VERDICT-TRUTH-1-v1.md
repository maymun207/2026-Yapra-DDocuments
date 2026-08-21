# GO · CANARY-VERDICT-TRUTH-1 · v1 — lane AG-1

<!-- GO-CANARY-VERDICT-TRUTH-1-v1 · 2026-08-10 · S92.
     RULE-25 review complete on a fresh clone of e58a0da. You are cleared to
     merge. Execute the steps in order; STOP and report on any mismatch. -->

## §1 · REVIEW VERDICT

Independently verified on a fresh clone (none of these numbers are from your
report): predicates at `goldenPublishContract.ts` and `rollouts.ts` byte-
identical outside comments · `GOLDEN_VERDICTS` append-only · the rewritten rule
read line-by-line (regression branch byte-identical and ordered before the
clean branch) · `persistPooled`/`pooledOf` mirror seam · measured
`reps_completed` · `CLEAN_ARMS_MIN_N = 9` with the reachability rationale ·
workflow projection fixed with `setArm` preserved · one `GoldenVerdictWord`
union at three sites · both typecheck projects run SEPARATELY, 0 errors ·
`check:doc-drift` green, 7/7 tabs · docVersion **rev 224 uncontested**
(master still at rev 223, no other PR).

Independent suite recount: **519 files / 6355 tests — 6354 green, 1 red.**
The red is `src/lib/__tests__/chartAxisLabels.test.ts` "FLOOR: first and last
always drawn": a **5000ms timeout under full-suite parallel load in the
review sandbox** (7929ms), in a file this phase does not touch (empty diff vs
master), isolated rerun green twice (1.9s). Classified: reviewer-environment
load flake, not a phase defect, not F-BW01. No action for you.

## §2 · THE FOUR DEVIATIONS — RATIFIED

- **§6.1 (axis-scoped rule)** — RATIFIED, and thank you: the design's literal
  step 1 would have made every rollout evaluation `no_jurisdiction` (the
  guardrail never supplies a violation axis) and silently killed the L5
  auto-rollback actuator. Your judged/absent/half-blind scoping preserves the
  actuator, keeps S89-1 art.4's split intact, and makes the guardrail's
  previously-implicit absent-axis contract explicit. This supersedes the design
  note's §4.2 step 1; the amendment will be recorded in the session register.
- **§6.2 (one forced path, not two)** — RATIFIED; the design note miscounted.
- **§6.3 (third union site :480)** — RATIFIED; exactly the S82-5 class the
  phase exists to kill.
- **§6.4 (`goldenSet:absent` arm)** — RATIFIED; preserving it under `setArm`
  is the right shape.

Also accepted: the `api/cwf/__tests__/` contract-suite updates (outside the
literal fence, unavoidable and correctly annotated) and the reseal (rev 224 —
the Agent Control Plane tab maps `api/cwf/_lib/replay/**`; the review confirmed
the drift gate green on your tree).

## §3 · MERGE — execute exactly

**STEP 1 (blocking):** re-verify CI on the PR head NOW, at merge time:
the head must still be `e58a0da` and all four code jobs green on that SHA
(`eval-canary` skipped-on-PR is correct). If the head moved or a job is red,
STOP and report.

**STEP 2:** confirm `origin/master` is still
`00062c7871a994fea3d63a79ba3c918b5201f263` and
`origin/master:public/architecture/manifest.json` still carries **rev 223**.
If either moved: STOP and report (the rev-224 mint would need re-checking —
the collision is silent by nature).

**STEP 3:** merge with `--no-ff` (squash is banned), with this message
VERBATIM:

```
merge: PHASE-CANARY-VERDICT-TRUTH-1 — the canary can finally say something

Verdict vocabulary 3→5 (additive): clean_both_arms and no_jurisdiction join,
and `regression` remains the only word any consumer acts on — pinned by a
dynamic-enumeration test across all three acting sites. The rule is
axis-scoped (judged / absent / half-blind), which keeps the L5 auto-rollback
actuator alive on the guardrail's single-axis ledger. The audit row stops
fabricating: reps_completed is measured (scored+failed), zero-denominator
numerators persist as null (empty≠zero), and the specimens digest rides along
under errorName-only redaction. The CI notice reads .decision.verdict — the
field that exists — with its N.

136 canary runs over 28 days had produced zero meaningful verdicts (111×
underpowered, 22× baseline:absent, 3× advisory): separated() is arithmetically
unsatisfiable at zero events, so a healthy system could never say so. F-S92-1,
F-S92-2, F-S92-3 closed. Deviations §6.1–§6.4 reviewed and ratified (GO v1).

docVersion rev 223 → rev 224 (4 tabs resealed). Suite 519 files / 6355 tests,
0 skips. 14/14 mutations killed. RULE-25 review on fresh clone of e58a0da.

Phase: PHASE-CANARY-VERDICT-TRUTH-1-v2 + errata
Report: docs/relay/PHASE-CANARY-VERDICT-TRUTH-1-report.md
```

**STEP 4:** push master. Report back: the merge commit SHA, and confirmation
that master's manifest carries rev 224.

**STEP 5 — the witness (do not skip):** the merge's master CI run executes
`eval-canary` for real — **the first verdict this instrument ever produces.**
When the run completes, read the canary notice and append a short
`## POST-MERGE WITNESS` section to the report on master's
`docs/relay/PHASE-CANARY-VERDICT-TRUTH-1-report.md` (a `docs(relay):` commit
directly on master is sanctioned for this): the verdict word, its N block, and
`reps_completed` vs `scoredReps` from the new row. Expected honest outcomes:
`no_jurisdiction` (likely — the ten silent runs measured nothing),
`clean_both_arms`, or `underpowered`. Whatever it says, it is the trigger
measurement for CANARY-REP-FAILURE-1 — paste it, do not interpret it.

<!-- END · GO-CANARY-VERDICT-TRUTH-1-v1 -->
