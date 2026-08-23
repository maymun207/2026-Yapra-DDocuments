<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-LAND-SCRIPT-FIX-1-RESEAL-v1
The gate's first red stands; the foreman's report is resealed under a lane-token subject, same tree
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-23T03:40:00Z, Architect, from your landing transcript and the wire
- MEASURED: npm run land -- 352 - steps 1 to 4 OK, step B REFUSED AUTHOR-UNKNOWN, exit 2, author lane unreadable, lander lane AG-5
- MEASURED: git log --format=%s origin/master..origin/phase/adf-kademe-2-ag5-report - subjects begin ADF-KADEME-2 order 8: and ADF-KADEME-2-CLONE-SYNC-v1 order D:, no AG-5 token
- MEASURED: git ls-remote origin refs/heads/master - the sha in evidence:master, unmoved
- MEASURED: CI at the branch head in evidence:head - build, rule26, report-schema, Vercel Preview success; eval-canary SKIPPED, named
SELF-INVALIDATION: decays on any push to master or to phase/adf-kademe-2-ag5-report after the shas above.

## FALSIFIER
If the new commit's tree differs from the tree of the head in evidence:head, content was changed and the reseal is wrong. If the gate still refuses AUTHOR-UNKNOWN on a subject beginning ADF-KADEME-2 AG-5:, the gate's token grammar is wrong and that is the finding.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in evidence:master | MEASURED: git ls-remote origin refs/heads/master | master |
| the branch head being resealed is in evidence:head | MEASURED: git ls-remote origin refs/heads/phase/adf-kademe-2-ag5-report | head |
| the refusal is correct under the landed rule | MEASURED: the gate's own REFUSED line · git log --format=%s over the branch showing no AG-5 token in any subject | inline |

```evidence:master
$ git ls-remote origin refs/heads/master
7a6318336b737e1ef4eccc79a58f29ca5e86bdad	refs/heads/master
```

```evidence:head
$ git ls-remote origin refs/heads/phase/adf-kademe-2-ag5-report
f8170f9c5b5e99301a9fe20a626a3b5c6f2d1db5	refs/heads/phase/adf-kademe-2-ag5-report
```

## STANDING ORDERS
- The rule is not relaxed and no pushed commit is rewritten. consumed_at is RETIRED.

## ORDERS
```scope
- A · git rev-parse <evidence:head>^{tree}, printed. git commit-tree that tree -p the sha in evidence:master -m "ADF-KADEME-2 AG-5: Kademe 2 wave report, resealed under the lane-token rule the gate enforces" - one commit, plumbing only.
- B · Push it as phase/adf-kademe-2-ag5-report-2, open its PR, wait for CI at that exact head, then ADF_LANE_ROLE=AG-5 npm run land -- <new pr>. A refusal is reported verbatim, not retried.
- C · After it lands: close PR 352 with a comment naming the landed PR, delete phase/adf-kademe-2-ag5-report after the RULE-49 re-measure. Then hold.
```

## SHARED SURFACES
the new branch and PR ...... yours
PR 352 and its branch ...... yours, order C only

## DECISION RIGHTS
the subject wording ... yours, must begin ADF-KADEME-2 AG-5:
whether it lands ...... the gate

## DELIVERY
- One line in your next tick: the new PR number, the land verdict, master after. The report itself is the tree you are resealing; no new report file.
