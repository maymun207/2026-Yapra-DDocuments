<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-WEB-VALVE-1-S133-1 · v1 — land the work already written and green on branch phase/web-valve-1-s132-1 (web_fetch, SSRF-guarded, valve floor CLOSED) under the owner's named approval
lane: AG-5
report: docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report.md
fanout: personalized

The web valve was BUILT AND GREEN before this session opened and nobody read the code. AG-4 wrote `api/cwf/_lib/webTools.ts` with the tool, the SSRF guard, the citation shape and a valve whose floor is CLOSED, pushed it on `phase/web-valve-1-s132-1`, and reported the full suite green. Twelve card versions and twelve adversary reviews then argued about prose while the branch sat unmerged and master never gained a line. The Architect named that failure in A-REC-S133-6 and the owner gave the S102 named approval for this ONE landing, verbatim in the `approval` fence. This card is NOT report-only and does not rest on REPORT-ONLY-DRAIN-1; it rests on the approval, in the form CARD-LAND-MA-RERUN-RUNNER-S132-1-v1 used in S132. It is a landing, not a build, so the adversary-review header the Architect owes producer cards does not apply.

The valve floor is CLOSED, so this landing changes what the repository CONTAINS and does not change what production DOES. That is the whole reason it is safe to land now and argue about the citation contract later, on a separate card, against a fixture corpus instead of prose.

## PREMISE
- MEASURED: 2026-09-08T10:20Z — the owner clone's remote-tracking refs: `git rev-parse origin/master` and `git rev-parse origin/phase/web-valve-1-s132-1` printed the two full hashes in the `heads` fence; `git rev-list --count origin/master..origin/phase/web-valve-1-s132-1` printed one; `git rev-list --count origin/phase/web-valve-1-s132-1..origin/master` printed five; `git branch -r --merged origin/master | grep -c web-valve` printed zero.
- UNMEASURED: the wire itself — the line above ran against remote-tracking refs after a `git fetch` that FAILED for want of a GitHub credential in the bridge VM (F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1), so every hash and number in it is what the clone last saw and not what the wire holds now. You re-measure all of it with `git ls-remote` and `gh` before you touch anything, and if the wire disagrees with the `heads` fence you STOP and print both.
- MEASURED: 2026-09-08T10:20Z — `git diff --stat origin/master...origin/phase/web-valve-1-s132-1` listed the nine paths in the `paths` fence and totalled 1276 insertions against 26 deletions.
- MEASURED: 2026-09-08T10:15Z — `git cat-file -e origin/master:api/cwf/_lib/webTools.ts` failed: the file is absent from master. The feature is not in production in any form, open or closed.
- MEASURED: `git show origin/phase/web-valve-1-s132-1:docs/relay/WEB-VALVE-1-AG4-report.md` at 10:26Z — the suite and the type-check both printed green, in the lines carried in the `suite` fence. That reading was taken at the UNSYNCED head and is therefore a claim about the old base, not about what you will land.
- MEASURED: 2026-09-08T10:15Z — `gh pr list --state open` returned an empty array; PR 515 was closed earlier and no pull request is open for this branch. You OPEN one; you do not look for one.
- UNMEASURED: whether the sync merge conflicts; whether the required runs are green at the synced head; whether the suite is still green once master's five commits are underneath it.
- ON-DISAGREEMENT: if the changed paths are not EXACTLY the nine in the `paths` fence → STOP, print the list, land nothing (the approval covers those paths only). If the sync merge conflicts → STOP (another lane's content is in play). If any required run is red at the synced head → STOP, quote the failing job unanchored, no re-run (S55-1). If the wire's branch head is not the one in the `heads` fence → STOP and print both; a head that moved means someone built while this card was in flight.
- DECAYS when the pull request is merged or closed, or when a v2 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the nine paths the approval covers | MEASURED: `git diff --stat origin/master...origin/phase/web-valve-1-s132-1` in the owner clone at 10:20Z | paths |
| the two commit hashes the sync starts from | MEASURED: `git rev-parse origin/master` and `git rev-parse origin/phase/web-valve-1-s132-1`, owner clone at 10:20Z, remote-tracking and not the wire | heads |
| the owner's approval | MEASURED: the owner's word in the Architect chat, verbatim | approval |
| the valve floor is CLOSED | MEASURED: `git show origin/phase/web-valve-1-s132-1:api/cwf/_lib/webTools.ts` at 10:26Z | valve |
| the suite and the type-check were green at the unsynced head | MEASURED: `git show origin/phase/web-valve-1-s132-1:docs/relay/WEB-VALVE-1-AG4-report.md` at 10:26Z | suite |
| the pull request number, the synced head, the run verdicts | NOT-READ | ORDER B |

```evidence:paths
api/cwf/__tests__/learnBrake.test.ts
api/cwf/__tests__/localToolsSsot.test.ts
api/cwf/__tests__/registerToolsSpanIO.test.ts
api/cwf/__tests__/webTools.test.ts
api/cwf/_lib/knowledge/reference/agentParams.ts
api/cwf/_lib/localTools.ts
api/cwf/_lib/turn/stageTools.ts
api/cwf/_lib/webTools.ts
docs/relay/WEB-VALVE-1-AG4-report.md
```

```evidence:heads
master 5d482353161198d0b1381f9473fe86a02dce2bf3
phase/web-valve-1-s132-1 5d1df6c9d49ba905f88aa776c88c448a899ca1ca
```

```evidence:valve
    const floor: WebValveResolution = {
        enabled: floorFor(AGENT_PARAM_KEYS.WEB_ENABLED),
            '[resolveWebValve] fetch failed — the CLOSED code floor will serve:',
        return floor;
```

```evidence:suite
Test Files  710 passed (710)
     Tests  10406 passed | 4 expected fail (10410)
$ npm run typecheck:api
```

```evidence:approval
"web valve merge onay" — OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1
```

## SCOPE
```scope
- one landing: a pull request YOU open from phase/web-valve-1-s132-1 into master; found by branch, never by a remembered number
- sync is OWED and expected: git merge --no-ff origin/master in a worktree, pushed to the lane's branch; never a rebase; on conflict STOP
- land only at a SYNCED head read green on every required run; skipped jobs named
- no other pull request touched; no file edited by you except your own report
- the valve is left exactly as the branch has it, floor CLOSED; you change no default, no environment variable, no flag
- bus: one from_lane row LAND-WEB-VALVE-1-S133-1-AG5-report, posted once
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; earlier rows first.
2. `git ls-remote origin refs/heads/master refs/heads/phase/web-valve-1-s132-1` — both full hashes printed; compare against the `heads` fence; disagreement → ON-DISAGREEMENT.
3. `git diff --name-only origin/master...origin/phase/web-valve-1-s132-1` → must equal the `paths` fence exactly; disagreement → ON-DISAGREEMENT.
4. `git log --no-merges --format=%s origin/master..origin/phase/web-valve-1-s132-1` → author lane AG-4, printed.
5. `gh pr list --state open --json number,headRefName` → if a pull request for this branch is already open, use it and say so; otherwise you open one in ORDER B.

## ORDER B — SYNC, OPEN, LAND
1. `git merge-base --is-ancestor origin/master origin/phase/web-valve-1-s132-1`; exit non-zero → sync: worktree, `git merge --no-ff origin/master`, push to the branch; print the new head, full length. Conflict → STOP.
2. `gh pr create --base master --head phase/web-valve-1-s132-1` with a title naming the card and a body naming OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1; print the number.
3. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<the synced head, full length>"` — `total_count >= 1` (S101-L1) and every required run `completed :: success`; name `eval-canary` and `rule26` as SKIPPED, never folded into green.
4. `ADF_LANE_ROLE=AG-5 npm run land -- <n>`; then `git ls-remote origin refs/heads/master` and `gh pr view <n> --json state,mergeCommit` — the merge commit equals master's tip, printed in an anchored fence at full length.
5. `git cat-file -e origin/master:api/cwf/_lib/webTools.ts` — now succeeds. Print the result. This line is the one the Architect reads to the owner; it is the difference between a card version and a thing that exists.

## ORDER C — THE REPORT
1. `docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report.md`, grammar v1, `auditText` locally `violations: 0` before push; your own report lands under the S132 standing word (OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1) after this landing, not before.
2. The report states, in one sentence each: what the sync merge brought in, whether the suite was re-read at the synced head or only by CI, and which required runs were skipped.
3. Post ONE from_lane row `LAND-WEB-VALVE-1-S133-1-AG5-report`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if a pull request with any path outside the `paths` fence is landed; wrong if landed at a head not read green; wrong if a red run was re-run; wrong if a rebase was used instead of a merge; wrong if the valve default was touched; wrong if the pull request was found by a remembered number rather than by branch; wrong if `eval-canary` or `rule26` are counted as green; wrong if the report omits the post-landing existence check of ORDER B.5.

## SHARED SURFACES
cwf_yaprak: master gains one merge commit across the nine paths. Production behaviour: UNCHANGED, because the valve floor is CLOSED and no default is touched — the code becomes present and stays off. CI: a new test file joins the suite. Secrets, database: untouched.

## DECISION RIGHTS
None. The approval is the owner's; the build is AG-4's and is already done.

BODIES: OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1 · A-REC-S133-6 · CARD-LAND-MA-RERUN-RUNNER-S132-1-v1 (the form) · OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1 · OWNER-RULING-S122-E1-E2-v1 · S101-L1 · S55-1 · S102 (named push approval) · S37-1 · TOTAL-45 · WEB-VALVE-1-AG4-report.

```deliverables
wire heads re-measured and equal to the heads fence, or STOP with both printed
diff equals the nine paths
sync merge done, no conflict; synced head printed at full length
pull request opened from the branch; number printed
required runs green at the synced head; skipped jobs named
landed; merge commit equals master tip, full length, in an anchored fence
api/cwf/_lib/webTools.ts now exists on master; the check printed
docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report.md, auditText violations: 0
bus row from_lane LAND-WEB-VALVE-1-S133-1-AG5-report, posted once
```

TAIL ANCHOR: CARD-LAND-WEB-VALVE-1-S133-1-v1 ends here.
