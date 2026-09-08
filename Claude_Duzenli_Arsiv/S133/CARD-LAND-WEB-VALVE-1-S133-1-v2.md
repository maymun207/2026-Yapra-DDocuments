<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-WEB-VALVE-1-S133-1 · v2 — land phase/web-valve-1-s132-1 through the pull request already open, now that the seal debt is paid and the build gate has gone green
lane: AG-5
report: docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report-v2.md
fanout: personalized

v1 of this card sent you to a head that failed `check:doc-drift`, and you stopped at it correctly. AG-4 has since paid the debt on the branch: the six drifted narrative tabs were made true of the web valve and resealed in ONE commit, and `Build and Test` came back green at that commit. A report commit followed it. The branch now stands at the head in the `head` fence and the pull request from v1 is still open.

TWO THINGS CHANGED BETWEEN v1 AND v2, and both are named rather than slipped in. The path set grew from nine to seventeen — the eight new paths are the five diagrams, the manifest, the Stage Cards registry and AG-4's reseal report, and every one of them is a document or a seal. And the sync is no longer owed: master has not moved since v1, and the branch already carries it.

THE ARCHITECT'S RULING ON THE CONTRADICTION AG-4 NAMED. Its report said v1 of the reseal card fenced a commit to the tabs and the manifest while also requiring a report at a repository path, and that both could not hold in one commit. The lane was right and it resolved it the way this house resolves it: a scope fence governs the SUBJECT commit, and a lane's own report is a separate commit that touches nothing the fence names. That is what AG-5 did in S132 and what AG-4 did here. No falsifier was broken and nothing is owed on it.

## PREMISE
- MEASURED: 2026-09-08T11:15Z — the owner clone's remote-tracking refs: `git log -1 --format=%H origin/phase/web-valve-1-s132-1` and `git log -1 --format=%H origin/master` printed the two hashes in the `head` fence.
- UNMEASURED: the wire itself — that read used remote-tracking refs in a clone whose `git fetch` FAILS for want of a GitHub credential in the bridge VM (F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1). You re-measure with `git ls-remote` before you touch anything, and if the wire disagrees with the `head` fence you STOP and print both.
- MEASURED: 2026-09-08T11:15Z — `git diff --name-only origin/master...origin/phase/web-valve-1-s132-1` listed the seventeen paths in the `paths` fence, line for line.
- MEASURED: 2026-09-08T11:15Z — `git cat-file -e origin/master:api/cwf/_lib/webTools.ts` still fails: the file is absent from master. Nothing of this work has landed.
- MEASURED: 2026-09-08T11:12Z — `docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md`, read from the branch: at the reseal commit, `gh api actions/runs` keyed on the full forty-hex sha reported three runs, all `completed :: success`, with `Build and Test` among them. Its `build` fence shows `npm run build` green end to end locally, and its `drift` fence shows the seal gate clean across every narrative tab.
- UNMEASURED, AND THIS IS THE ONE THAT MATTERS: whether CI is green at the head in the `head` fence. The three green runs above were taken at the RESEAL commit; a report commit landed on top of it afterwards. A verdict at the parent is not a verdict at the child, and you read the child.
- ON-DISAGREEMENT: if the wire's branch head is not the one in the `head` fence → STOP and print both. If the changed paths are not EXACTLY the seventeen → STOP, print the list, land nothing. If any required run is red at the head you land → STOP, quote the failing job unanchored, no re-run (S55-1). If a sync turns out to be owed after all → do it as v1 ordered, `git merge --no-ff origin/master`, never a rebase, and STOP on conflict.
- DECAYS when the pull request is merged or closed, or when a v3 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the seventeen paths the approval now covers | MEASURED: `git diff --name-only origin/master...origin/phase/web-valve-1-s132-1` in the owner clone at 11:15Z | paths |
| the two commit hashes | MEASURED: `git log -1 --format=%H` on each ref, owner clone at 11:15Z, remote-tracking and not the wire | head |
| the owner's approval | MEASURED: the owner's word in the Architect chat, verbatim | approval |
| the three runs green at the reseal commit, and the gates the build runs | MEASURED: `git show origin/phase/web-valve-1-s132-1:docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md` at 11:12Z | ci |
| the pull request number, the run verdicts at the head you land | NOT-READ | ORDER B |

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
docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md
public/architecture/diagrams/agent-control-plane-blueprint.html
public/architecture/diagrams/architecture-map.html
public/architecture/diagrams/governance-model.html
public/architecture/diagrams/request-lifecycle.html
public/architecture/diagrams/runtime-topology.html
public/architecture/manifest.json
src/components/admin/stagesRegistry.ts
```

```evidence:head
master 5d482353161198d0b1381f9473fe86a02dce2bf3
phase/web-valve-1-s132-1 89bd65e7a81593f85bd419a760f8b7c62e0081c7
```

```evidence:ci
Build and Test   completed   success
Relay corpus     completed   success
report-schema    completed   success
(three runs, at the RESEAL commit — not at the head above)
```

```evidence:approval
"web valve merge onay" — OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1
```

## SCOPE
```scope
- one landing: the pull request already open from phase/web-valve-1-s132-1; found by branch, never by a remembered number
- no new pull request; if the open one is gone, STOP and report rather than opening another
- sync only if one turns out to be owed; git merge --no-ff origin/master, never a rebase; on conflict STOP
- land only at a head read green on every required run; skipped jobs named
- no other pull request touched; no file edited by you except your own report
- the valve is left exactly as the branch has it, floor CLOSED; you change no default, no environment variable, no flag
- bus: one from_lane row LAND-WEB-VALVE-1-S133-1-AG5-report-v2 if your channel can post it; if it cannot, say MECHANISM-ABSENT and name what you tried, exactly as AG-4 did
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; earlier rows first.
2. `git ls-remote origin refs/heads/master refs/heads/phase/web-valve-1-s132-1` — both hashes printed at full length; compare against the `head` fence; disagreement → ON-DISAGREEMENT.
3. `git diff --name-only origin/master...origin/phase/web-valve-1-s132-1` → must equal the `paths` fence exactly; disagreement → ON-DISAGREEMENT.
4. `gh pr list --state open --json number,headRefName,headRefOid` → the pull request whose headRefName is this branch; absent → STOP and report.

## ORDER B — LAND
1. `git merge-base --is-ancestor origin/master origin/phase/web-valve-1-s132-1`; exit zero → no sync owed, say so and move on. Exit non-zero → sync as v1 ordered and print the new head at full length.
2. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<the head you will land, full length>"` — `total_count >= 1` (S101-L1) and every required run `completed :: success`; name `eval-canary` and `rule26` as SKIPPED, never folded into green. A short sha answers zero here and reads identically to "CI never ran", so use the full length, as AG-4's report warns.
3. `ADF_LANE_ROLE=AG-5 npm run land -- <n>`; then `git ls-remote origin refs/heads/master` and `gh pr view <n> --json state,mergeCommit` — the merge commit equals master's tip, printed in an anchored fence at full length.
4. `git cat-file -e origin/master:api/cwf/_lib/webTools.ts` — now succeeds. Print the result. This is the line the Architect reads to the owner, and it is the difference between a card version and a thing that exists.
5. `npm run check:doc-drift` at the new master — print it. The seal was resealed against the branch; this is the only reading that says it holds where it now lives.

## ORDER C — THE REPORT
1. `docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report-v2.md`, grammar v1, `auditText` locally `violations: 0` before push; your own report lands under the S132 standing word (OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1) after this landing, not before.
2. State in one sentence each: whether a sync was owed, which required runs were skipped, and whether the drift gate holds at the new master.
3. Post ONE from_lane row if your channel can. If it cannot, report MECHANISM-ABSENT and name the two lenses you searched — do not hand-roll a direct write to the bus.

## FALSIFIER
Wrong if a pull request with any path outside the `paths` fence is landed; wrong if a second pull request was opened; wrong if landed at a head not read green; wrong if the run query used a short sha; wrong if a red run was re-run; wrong if a rebase was used; wrong if the valve default moved; wrong if the report omits the post-landing existence check of ORDER B.4 or the drift reading of ORDER B.5.

## SHARED SURFACES
cwf_yaprak: master gains one merge commit across the seventeen paths. Production behaviour: UNCHANGED — the valve floor is CLOSED and no default is touched; the code becomes present and stays off. CI: a new test file joins the suite and the narrative seal moves to master. Secrets, database: untouched.

## DECISION RIGHTS
None. The approval is the owner's and is already given; the build is AG-4's and is done.

BODIES: OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1 · CARD-LAND-WEB-VALVE-1-S133-1-v1 (superseded by this) · CARD-WEB-VALVE-RESEAL-S133-1-v1 · WEB-VALVE-RESEAL-S133-1-AG4-report · LAND-WEB-VALVE-1-S133-1-AG5-report · A-REC-S133-6 · A-REC-S133-7 · S37-1 · S101-L1 · S55-1 · TOTAL-45.

```deliverables
wire heads re-measured and equal to the head fence, or STOP with both printed
diff equals the seventeen paths
the open pull request found by branch; its number printed
sync owed or not, said explicitly
every required run at the landed head named with its conclusion, at full sha length, none re-run
landed; merge commit equals master tip, full length, in an anchored fence
api/cwf/_lib/webTools.ts now exists on master; the check printed
check:doc-drift at the new master, printed
docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report-v2.md, auditText violations: 0
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-LAND-WEB-VALVE-1-S133-1-v2 ends here.
