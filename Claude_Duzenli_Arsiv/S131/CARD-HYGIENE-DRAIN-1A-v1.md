<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-HYGIENE-DRAIN-1A · v1 — drain the five report-only PRs that CAN land green, oldest first, each one trunk-synced and CI-read at its new head before `npm run land`
lane: AG-5
report: docs/relay/HYGIENE-DRAIN-1A-AG5-report.md
fanout: personalized

Hygiene stage 2, batch 1a (bootstrap v131 FIRST JOB 3), under OWNER-RULING-S131-REPORT-ONLY-DRAIN-1: report-only PRs land under your own authority while the canary is frozen — no per-push approval, no further card. This card exists because the five below are 62–241 commits behind master and your poll's "nothing landable" is a reading of STALE heads, not of the PRs' content. Each needs one trunk sync and one CI read at the synced head; then your own `npm run land`.

Your own boot report (PR #495) is NOT in this card — ⑤ keeps a foreman's own observation report out of self-landing; it goes to the owner's table.

## PREMISE
- MEASURED: 2026-09-05T05:32Z by the scout, `SCOUT-OPEN-PR-TRIAGE-1-v1` (bus row in the `triage` fence): REPORT-ONLY-LANDABLE 12, split 1a = 437 · 444 · 451 · 484 (land as-is or after one sync), 1c = 434 (passes the predicate, zero check-runs ever at its wire tip). All five have every changed path under `docs/relay/`. Authors by AUTHOR-SUBJECT: 437/444/451/484 = AG-5 (you — report-only exception permits it, land.ts judgeReportOnly), 434 = AG-1.
- MEASURED: 2026-09-06T04:22Z, Vercel `list_deployments`: master is at the tip in the `trunk` fence (the #497 landing).
- UNMEASURED: whether any of the five heads moved since the triage (they are AG-5 and AG-1 branches; no lane has reported touching them). ORDER A re-reads every head at the forty hex before anything.
- ON-DISAGREEMENT: if a PR's changed-path list contains ANY path outside `docs/relay/` at ORDER A, that PR leaves this card — report it and do not land it (it falls under §5). If `git ls-remote origin refs/heads/master` differs from the `trunk` fence, that is expected (your own earlier landings move it) — sync against the CURRENT master, not the fence.
- DECAYS the moment any of the five PRs is closed or force-pushed by someone else.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the triage row this card rests on | MEASURED: relay_inbox from_lane scout row, read by the Architect 2026-09-06T04:3xZ | triage |
| master at cutting time | MEASURED: Vercel list_deployments githubCommitSha of the #497 landing | trunk |
| each PR's head, paths, CI at the synced head | NOT-READ | ORDER A and ORDER B read them |

```evidence:triage
SCOUT-OPEN-PR-TRIAGE-1-v1  created 2026-09-05T05:32:37Z
1a: 437 ref-sweep-remeasure-1 · 444 nightly-compat-red-1 · 451 backlog-landing-order-1 · 484 go-landing-s125-1-ag5-report
1c: 434 build-docs-assertion-1 (author AG-1, NEVER-RUN CI)
```

```evidence:trunk
a6881c46216ac4f2ca862735948e09c4417a113e
```

## SCOPE
```scope
- PR 484 (phase/go-landing-s125-1-ag5-report)
- PR 444 (phase/nightly-compat-red-1)
- PR 451 (phase/backlog-landing-order-1)
- PR 437 (phase/ref-sweep-remeasure-1)
- PR 434 (phase/build-docs-assertion-1)
```
Those five, in that order (green corpus first, then the three with no or foreign context, then the never-run one). Nothing else.

## ORDER A — READ EACH PR BEFORE TOUCHING IT
For each PR in scope order: `gh pr view <n> --json state,headRefOid,baseRefName,files` — print state (must be OPEN), the forty-hex head, and every changed path. `git diff --name-only origin/master...<head>` as the second lens on paths. If any path is outside `docs/relay/`, ON-DISAGREEMENT for that PR.

## ORDER B — SYNC, CI, LAND — ONE PR AT A TIME, NEVER TWO IN FLIGHT
1. Sync: in a worktree for that branch, `git merge --no-ff origin/master` (S100-3 form: no `-B`, no force, no stash); if a conflict appears, STOP that PR, report the conflicting paths, move to the next.
2. Push the branch; read the new head; `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<new head>"` — name the count you expect (3: Build and Test, Relay corpus, report-schema) and wait until `total_count` reaches it and every run is `completed`; `total_count` of zero after five minutes is FAILED, not "not yet".
3. If `build (24.x)`, `relay corpus (grammar v1)` and `report-schema` are all success: `npm run land -- <n>`; then read master (`git ls-remote origin refs/heads/master`) and `gh pr view <n> --json state,mergeCommit` — MERGED and the merge commit on master are the proof. If the corpus job is red: do NOT land; quote `gh run view <id> --log-failed` last forty lines into an UNANCHORED fence — that red is the F-S119-class header/grammar red and belongs to the owner's table, not to a fix here.
4. Only then the next PR. A sync merge RESETS CI; never carry a pre-sync green.

## ORDER C — REPORT
File `docs/relay/HYGIENE-DRAIN-1A-AG5-report.md` on branch `phase/hygiene-drain-1a`, with per-PR: head before, head after sync, CI table at the synced head, landed-or-refused with its reason, master after. Open its PR; it is report-only and lands under the same ruling — but it is YOUR observation report, so it does NOT self-land: leave it OPEN for the owner's table. Post the same text as a from_lane row named `HYGIENE-DRAIN-1A-AG5-report`.

## FALSIFIER
Wrong if a PR in scope has a non-`docs/relay/` path (then the triage was wrong and the PR is §5's), if any landing happens without a CI read at the SYNCED head, or if two PRs are in flight at once.

## SHARED SURFACES
master (up to five report-only landings) · the five phase branches (one sync merge each) · one bus row.

## DECISION RIGHTS
Landing order and the refusal of a red — yours, under the ruling. Whether a corpus-red report gets rewritten or its PR closed — owner's table, not yours.

BODIES: OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 · OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1 · SCOUT-OPEN-PR-TRIAGE-1-v1 · S100-3 · S37-2 · S101-L1 · F-S130-CI-COUNT-GROWS-AFTER-PUSH-1 · TOTAL-45.

```deliverables
up to five report-only landings on master, each with its landing block
report file docs/relay/HYGIENE-DRAIN-1A-AG5-report.md on phase/hygiene-drain-1a with an OPEN PR
bus row from_lane HYGIENE-DRAIN-1A-AG5-report
```

TAIL ANCHOR: CARD-HYGIENE-DRAIN-1A-v1 ends here.
