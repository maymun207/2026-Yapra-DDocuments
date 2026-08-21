# PHASE-CI-DIET-2-v1 — the merge gate pays for exactly one thing: the truth about THIS PR

<!-- S98 · Architect-authored · lane AG-2 · Wave-5 PRECURSOR mini-lane.
     Owner decision K5-S97 "CI-DIET-2 evet" (register v101 §2, #43).
     Decision carrier: KARAR-CI-DIET-2-v1. Single-writer lane:
     .github/workflows/** belongs to THIS lane exclusively this wave. -->

## PRECONDITION (S47-1)
Fresh clone of `maymun207/cwf_yaprak` at `origin/master` =
`0a35d86b75ee169b82509bc70adecb26e0cbb55b` (rev 248 · 574 test files ·
76 migrations · drift 7/7). If moved, STOP and report.

## CLAIMS (S97-L1 — computed live this session, source named)
- The sole gate workflow is `.github/workflows/build-test.yml` (256 lines;
  the only other workflow is `deploy-langfuse.yml`, out of scope) —
  dir listing + `wc -l`.
- Current gate shape (read from the file): `build` job matrix
  **[20.x, 22.x]** running tenant-zero + build (incl. doc-drift) + FULL
  test suite on BOTH legs · `coverage` job on 22.x · `rule26` job on 22.x
  (Playwright) · `eval-canary` master-only (C-H + C2 fences).
- **Production Node = 24.x** — read live from the Vercel project setting
  (`nodeVersion: "24.x"`, project `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`).
  **NEITHER current matrix leg is the production version.** This is a
  named finding: **F-S98-CI-NODE-MISMATCH** — the gate has been proving
  the suite on two versions production doesn't run, and never on the one
  it does. Record it in the report; this phase retires it.
- Path filtering ALREADY exists (CI-DIET-1): push-side `paths-ignore:
  docs/** + .agents/**`, an explicit PREFIX ALLOWLIST pinned to
  `DOC_PREFIXES` in `scripts/vercel-ignore.mjs` by
  `api/cwf/__tests__/vercelIgnore.test.ts` (both read this session).
- No file this lane touches is doc-drift-mapped
  (`grep github public/architecture/manifest.json` → 0) — NO seal owed.

## FENCE (exhaustive; intersection with AG-1's RELAY-BUS-1 lane = ∅ by construction)
EDIT: `.github/workflows/build-test.yml`
CREATE: `.github/workflows/nightly-compat.yml`
PLUS: `docs/relay/PHASE-CI-DIET-2-report.md` · `.agents/CHANGELOG.md` entry.
NOTHING else. In particular: `scripts/vercel-ignore.mjs` and
`vercelIgnore.test.ts` are READ-ONLY to this phase (see R4).

## R1 — the gate runs the production Node, once
`build` job: matrix `[20.x, 22.x]` → single leg **24.x**. Step CONTENT is
byte-preserved: checkout fetch-depth 0 (doc-drift needs it) → setup-node →
`npm ci` → tenant-zero → build → full test. S37-2 unchanged in meaning:
the unsharded full suite on the PR head remains the sole arbiter — it now
testifies about the version production actually runs.

## R2 — coverage leaves the gate
Delete the `coverage` job from `build-test.yml`. No merge gate reads the
coverage percentage (KARAR, confirmed against the file: the job exists
"solely to fail the build when coverage drops below the floor" — a floor
no release decision consumes at merge time). It moves to nightly (R3),
where the ratchet in `vitest.config.ts` keeps its teeth without taxing
every PR.

## R3 — the nightly compatibility run (`nightly-compat.yml`, new)
- Trigger: `schedule` cron (pick a quiet UTC hour, avoid the existing
  cron cluster noted in the repo: 03:40Z memory-forget etc. — state the
  chosen hour and why in the report) + `workflow_dispatch`.
- Jobs: (a) build+full-test matrix **[20.x, 22.x]** — the compatibility
  insurance the gate no longer carries; (b) coverage on **24.x** — the
  ratchet enforced nightly on the production version.
- Non-blocking by construction (nothing gates on a schedule run); a RED
  nightly is an ALARM-CLASS event — say so in a header comment, with the
  KARAR named.

## R4 — path filter: COMPUTED NO-OP, recorded not implemented
KARAR item 4 asked for a docs-only fast path incl. `**/*.md`. The live
read shows CI-DIET-1 already ships the prefix-allowlist
(`docs/** + .agents/**`), and the workflow's own rationale REJECTS a
`**/*.md` glob by name: `public/docs/*.md` is RUNTIME-SERVED, and the CI
skip is pinned to the DEPLOY skip via `vercelIgnore.test.ts` so the two
planes may never drift. The standing law wins over the KARAR's sketch —
item 4 closes as ALREADY-SATISFIED; the roster, the mjs, and the pinning
test are NOT touched. State this in the report under its own heading.

## UNTOUCHABLES (asserted, each verified present before and after)
S37-2 full-suite PR-head arbiter · tenant-zero step · doc-drift (inside
`npm run build`) · `rule26` job (stays in the gate: a build-quality check,
not on the KARAR's cut list) · `eval-canary` job byte-identical (its C-H +
C2 fences and verdict plumbing are hard-won; ZERO edits) · the
`concurrency` block's C3 semantics (master never cancelled).

## RISK, NAMED (and its birth proof — S93-1)
The suite has NEVER run on Node 24 in CI. This phase's OWN PR is the
first exercise: its PR-head check runs the new 24.x gate over all 574
test files. Green = the organ's first real measurement, inside its own
phase. Red = fix-forward within this phase (version-specific breakage is
exactly what the gate exists to find) — never a silent revert to 22.x.
The report MUST paste the PR-head run's conclusion + run URL
(`/actions/runs?head_sha=<SHA>`; `in_progress`/`null` is NOT a pass).

## EXPECTED EFFECT (claim class: prediction, not measurement)
Per-merge wait ~15 min → ~6-8 min (one Node leg, no coverage
instrumentation, Playwright job unchanged). Measured against reality at
the Wave-5 merge train; the number above is the KARAR's estimate, labeled.

## DELIVERY (S91 completeness gate)
- Branch: `phase/ci-diet-2` — PUSH to origin.
- Open a PR against `master` so CI runs on the PR head — note: the PR
  runs the NEW workflow definition from the PR head, which is what makes
  the birth proof work.
- Report: `docs/relay/PHASE-CI-DIET-2-report.md`.
- NO seal (no mapped file touched — computed above).
- Wave-5 discipline: NO per-lane GO — build, push, report, WAIT for the
  single GO-TRAIN. Local full suite at the merge turn stays mandatory.
- Stop-and-ask on anything the FENCE does not cover.

<!-- END · PHASE-CI-DIET-2-v1 -->
