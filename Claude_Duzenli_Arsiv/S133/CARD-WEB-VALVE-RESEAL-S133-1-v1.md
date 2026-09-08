<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-WEB-VALVE-RESEAL-S133-1 · v1 — the reseal your branch owes, on the branch, in ONE commit, so pull request 517 can go green
lane: AG-4
report: docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md
fanout: personalized

Your web valve work is correct and the foreman tried to land it. It stopped at a RED synced head: `Build and Test` fails at `check:doc-drift` over six narrative tabs, because the branch changes mapped code and carries no reseal. Master itself does not drift, so the debt is the branch's and it is yours — RULE 20 puts the reseal in the SAME commit as the change that caused it, and a foreman that resealed your branch would be authoring your product and would lose the right to land it.

THIS CARD IS NOT GATED ON A SCOUT VERDICT, and the exemption is named rather than assumed. The S132 adversary mechanism gates a producer on a RELEASE row; across this session it issued none, so you correctly built nothing while twelve card versions argued about prose. The owner ruled that an infinite loop is stopped wherever it is seen (OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1). This line stops here and its judge is CI, which is objective and already ran: `Build and Test` green at the head you push is the whole acceptance test.

Do not open a pull request. Pull request 517 is open on this branch and re-runs on your push.

## PREMISE
- MEASURED: 2026-09-08T10:36Z — `gh run view <the failed run> --log-failed`, quoted by the foreman in `docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report.md` on branch `phase/land-web-valve-1-s133-1`: six tabs drifted, the failing step is Build, and the tool prints its own remedy. The six tab names are in the `drift` fence.
- MEASURED: 2026-09-08T10:36Z — same report: at the synced head, `report-schema` and `Relay corpus` are green, `Build and Test` is FAILURE, and `eval-canary` and `rule26` are SKIPPED and named.
- MEASURED: 2026-09-08T10:36Z — same report: `npm run check:doc-drift` at master prints no drift across all seven narrative tabs, so the drift arrived with this branch.
- MEASURED: 2026-09-08T10:40Z — `scripts/reseal.ts` read from the working tree: it recomputes `mappedContentSha` for every tab in `public/architecture/manifest.json` from the WORKTREE and sets `lastSyncedCommit` to the short head. It writes exactly one file. It is idempotent.
- MEASURED: 2026-09-08T10:28Z — the branch head after the foreman's sync is the full hash in the `head` fence; the sync merged clean and added no path outside the nine the landing card fenced.
- UNMEASURED: which lines of which narrative tabs are now untrue. You read them and you decide; nobody has measured that for you.
- UNMEASURED: whether the suite is still green at the synced head — CI failed at Build before the suite verdict mattered, and no lane has re-run it there.
- ON-DISAGREEMENT: if `npm run reseal` reports zero hash-changed tabs → STOP and report, because the drift the gate printed and the seal the script computes then disagree and one of them is lying. If the branch head is not the one in the `head` fence → STOP and print both. If `check:doc-drift` is still red locally after your commit → STOP; do not push a second guess on top of a first.
- DECAYS when `Build and Test` is green on pull request 517, or when a v2 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the six drifted tabs and the tool's own remedy | MEASURED: the foreman's report, `evidence:red` block, read from `phase/land-web-valve-1-s133-1` at 10:40Z | drift |
| the head your commit sits on | MEASURED: `git log -1 origin/phase/web-valve-1-s132-1` at 10:40Z | head |
| what reseal writes, and that it writes one file | MEASURED: `sed -n '1,60p' scripts/reseal.ts` at 10:40Z | reseal |
| whether the diagrams are untrue and where | NOT-READ | ORDER A |

```evidence:drift
Architecture Map -- mapped code changed since last reseal
Runtime Topology -- api/cwf/_lib/turn/stageTools.ts
Request Lifecycle -- api/cwf/_lib/knowledge/reference/agentParams.ts, api/cwf/_lib/turn/stageTools.ts
Governance Model -- api/cwf/_lib/knowledge/reference/agentParams.ts
Agent Control Plane -- api/cwf/_lib/turn/stageTools.ts
Stage Cards -- api/cwf/_lib/turn/stageTools.ts
```

```evidence:reseal
 * For every narrative tab in public/architecture/manifest.json it recomputes
 * `mappedContentSha` from the WORKING TREE (the state you are about to commit) and
 * sets `lastSyncedCommit` to the current short HEAD (a human breadcrumb; the hash is
 * the gate's authority). Run this in the SAME commit whenever you update a mapped code
 * area + its diagram -- it is the ONLY way past `check:doc-drift` (RULE 20).
```

```evidence:head
phase/web-valve-1-s132-1 73931d5dc51f7783d639a24fdab96e4657120b69
```

## SCOPE
```scope
- one commit on phase/web-valve-1-s132-1, on top of the head in the head fence
- the six drifted tabs: their narrative and diagram content updated to be TRUE of web_fetch, the SSRF guard and the valve
- public/architecture/manifest.json, rewritten by npm run reseal in that SAME commit
- no pull request opened; 517 is open and re-runs on your push
- no change to any valve default, environment variable or flag; the floor stays CLOSED
- no product code touched — this commit changes documents and the seal, not behaviour
- bus: one from_lane row WEB-VALVE-RESEAL-S133-1-AG4-report, posted once
```

## ORDER A — READ WHAT IS UNTRUE
1. Read your box by `created_at`; earlier rows first.
2. `git log -1 --format=%H origin/phase/web-valve-1-s132-1` — equal to the `head` fence, or ON-DISAGREEMENT.
3. Read the six tabs named in the `drift` fence in `public/architecture/`. For each, print ONE line saying what the branch made untrue, or `no narrative change owed — seal only` when the mapped set changed but nothing the tab SAYS is now false.
4. That printed list is the card's real deliverable. A reseal with every tab marked `seal only` is a legitimate answer AND a suspicious one: say so plainly if that is what you find.

## ORDER B — ONE COMMIT
1. Edit the tabs your ORDER A.3 list marked as owing a narrative change. Nothing else.
2. `npm run reseal` — print its full output, including the per-tab lines.
3. `npm run check:doc-drift` locally — must print no drift across all seven tabs. Red → STOP.
4. ONE commit containing the tab edits AND `public/architecture/manifest.json` together. Squash is forbidden and irrelevant here: it is one commit because RULE 20 says so.
5. `git push origin HEAD:refs/heads/phase/web-valve-1-s132-1`; print the new head at full length.
6. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<the new head, full length>"` — `total_count >= 1` (S101-L1), then every run's conclusion printed by name. Green or red, you report it; you do not re-run it (S55-1) and you do not land it — landing is the foreman's card.

## ORDER C — THE REPORT
1. `docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md`, grammar v1, `auditText` locally `violations: 0` before push.
2. The report answers one question the Architect got wrong and must not get wrong twice: name every gate `npm run build` runs that `npx vitest run` and `npm run typecheck:api` do NOT. A branch reported green for twelve card versions and failed the first time CI was asked for a verdict, because the reported green never covered this gate.
3. Post ONE from_lane row `WEB-VALVE-RESEAL-S133-1-AG4-report`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if the tab edits and the manifest land in different commits; wrong if a tab was resealed while a sentence in it is now false; wrong if any file outside the six tabs and the manifest is changed; wrong if a valve default moved; wrong if a new pull request was opened; wrong if a red run was re-run; wrong if the report omits the build-versus-suite gate list of ORDER C.2.

## SHARED SURFACES
cwf_yaprak: one commit on an existing branch; master untouched by this card. Production behaviour: UNCHANGED — documents and a seal. CI: pull request 517 re-runs. Secrets, database: untouched.

## DECISION RIGHTS
Yours, and only inside ORDER A.3: which tabs owe a narrative change and what it says. The landing decision is the owner's and it is already given.

BODIES: OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1 · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · A-REC-S133-6 · A-REC-S133-7 · LAND-WEB-VALVE-1-S133-1-AG5-report · RULE 20 · S101-L1 · S55-1 · S61-2 · TOTAL-45.

```deliverables
head equals the head fence, or STOP with both printed
a per-tab line saying what the branch made untrue, for all six
tab edits where owed, and nowhere else
npm run reseal output printed per tab
check:doc-drift locally clean across all seven tabs
ONE commit carrying the tab edits and the manifest together
pushed; new head printed at full length
every CI run at the new head named with its conclusion, none re-run
the build-versus-suite gate list
docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md, auditText violations: 0
bus row from_lane WEB-VALVE-RESEAL-S133-1-AG4-report, posted once
```

TAIL ANCHOR: CARD-WEB-VALVE-RESEAL-S133-1-v1 ends here.
