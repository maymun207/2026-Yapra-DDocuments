<!-- relay-audit: v1 kind=card -->
# CARD-RERUN-RULE26-CONTEXT-RETRIEVAL-1 · v1 — one re-run of the CANCELLED rule26 job on the PR #387 head, measured step by step; then the landing proceeds or stops on bytes

Foreman card. Your 10:53Z tick reads: PR #387 UNLANDED at the `head` fence; approval PRESENT; scout review PRESENT; authorship passes via AUTHOR-SET-EXCLUDES-LANDER; **`rule26=cancelled` the sole blocker**; ORDER D bus row OWED. This card answers the blocker and collects the owed row. It changes no file, no bound, no branch.

## PREMISE

MEASURED: 2026-09-04T09:12Z, AG-4's TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report-v3 — on the head, `build (24.x)` SUCCESS 15m57s; `rule26` CANCELLED at its own `timeout-minutes: 10` after 10m16s. `cancelled` is neither failed nor a pass; what rule26 would have said is UNMEASURED.
MEASURED: 2026-09-04T10:5xZ, `.github/workflows/build-test.yml` at the shared clone's HEAD, lines 375–388: the 10-minute bound was sized from 28 successful rule26 runs at 166–232 s (median 215 s); the two historical hangs sat in Playwright's apt phase and lines 439–453 now probe locally and skip apt when deps are present. A 10m16s run is therefore EITHER the apt path hanging despite the probe, OR the suite itself having grown past the bound, OR a runner stall — three different facts, distinguishable ONLY by the job's per-step durations, which nobody has read.
MEASURED: 2026-09-04T10:53Z, your own tick — land.ts refuses on any `cancelled` context (land.ts line 628: "cancelled is NOT success and blocks"), so the gate cannot pass until rule26 concludes.
S55-1 applies and is honoured: this is not a re-run of a diagnosed transient FAILURE; it is the FIRST measurement of a job that never concluded, and the card makes the re-run carry its own diagnosis (per-step timings) so a second cancel is evidence, not a retry.
DECAYS on any push to the branch. ON-DISAGREEMENT: if the head is not the `head` fence, or the rule26 job's current conclusion is not `cancelled` (someone re-ran it already, or it concluded) — read what it is and proceed accordingly: success → ORDER C; failure → STOP and report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head and its CI state | MEASURED: 2026-09-04T09:12Z AG-4 report v3; 10:53Z your tick | head |
| why the bound is 10 minutes and what the healthy duration is | MEASURED: 2026-09-04T10:5xZ workflow file lines 375–388 | bound |
| which step consumed the 10m16s | NOT-READ | steps |
| whether rule26 passes when re-run | NOT-READ | steps |

```evidence:head
phase/context-retrieval-1, PR #387:
    3780d665bcbff4c0c8c73296428e935d60fc5836
build (24.x)  SUCCESS 15m57s   rule26  CANCELLED 10m16s   eval-canary SKIPPED   others success
```

```evidence:bound
build-test.yml line 388:  timeout-minutes: 10   (rule26)
healthy history: 28 runs, 166..232 s, median 215 s; apt-hang history 3156 s / 2204 s, now probed locally (lines 439-453)
```

```evidence:steps
NOT-READ. ORDER A reads the cancelled job's per-step durations; ORDER B re-runs it once and reads them again.
```

## ORDER A — READ THE CANCELLED JOB BEFORE TOUCHING IT
`gh run list --commit 3780d665bcbff4c0c8c73296428e935d60fc5836 --workflow build-test.yml --json databaseId,status,conclusion,createdAt` → the run id. `gh run view <run-id> --json jobs` → the rule26 job id and its steps with `startedAt`/`completedAt`/`conclusion`. Print every step's duration. Name which step was running when the 10-minute bound fired. That one line is the diagnosis this card exists to collect.

## ORDER B — RE-RUN THAT ONE JOB, ONCE
`gh run rerun <run-id> --job <rule26-job-id>` (the single job; not the workflow — build's 16-minute SUCCESS is not to be spent again). Then `gh run watch <run-id>` or poll `gh run view <run-id> --json jobs` until the rule26 job reaches a CONCLUSION (bound: 10 minutes + queue). Print the per-step durations again. Exactly one re-run; a second cancel is a STOP and a measurement, never a third attempt.

## ORDER C — ON SUCCESS, LAND UNDER THE STANDING CARD
If rule26 concludes SUCCESS: re-read ALL check-runs on the head with the full forty hex (every context by name, eval-canary skipped named), then proceed with `CARD-LANDING-CONTEXT-RETRIEVAL-1-v2` (row 9db62588) from its ORDER A — fresh box read at ORDER B (the HOLD notice 7a464baf is LIFTED by v2 and is not a countermand), `npm run land -- 387`, ORDER C proof, ORDER D report. If rule26 is CANCELLED again or FAILS: STOP; file the report below with the step timings; the Architect owns the next card.

## ORDER D — REPORT (this is also the row your 10:53 tick says is OWED)
File from_lane, artifact_name `LANDING-CONTEXT-RETRIEVAL-1-AG-5-report`: ORDER A step timings of the cancelled job; ORDER B outcome and step timings; the full check-run table at the head; and then either the landing (merge sha in a fence, ls-remote read-back, tree = rehearsal, deploy state or UNREAD) or the STOP with the class land.ts printed.

## FALSIFIER
Wrong if the head is not the `head` fence, if the rule26 job's conclusion is not `cancelled` at ORDER A, or if more than one re-run is issued.

## SHARED SURFACES
One GitHub Actions job re-run on an existing run. NO file edited. NO push. NO bound change. NO migration. NO db push. Landing only under v2's own orders and only on a fully green head.

## DECISION RIGHTS
You decide nothing about bounds or the workflow (ADF, frozen). You re-run one job because its verdict is UNMEASURED and the gate needs a verdict; you land only if every context concludes green.

BODIES: `S37-2` · `S55-1` (honoured: first measurement, not a retry of a diagnosed failure) · `TOTAL-45` · `empty ≠ zero` · CP-11 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-APPROVAL-S130-MASTER-PUSH-PR-387-1.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name LANDING-CONTEXT-RETRIEVAL-1-AG-5-report
```

TAIL ANCHOR: CARD-RERUN-RULE26-CONTEXT-RETRIEVAL-1-v1 ends here.
