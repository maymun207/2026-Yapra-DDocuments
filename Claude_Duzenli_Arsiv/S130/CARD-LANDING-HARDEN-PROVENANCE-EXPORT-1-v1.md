<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-HARDEN-PROVENANCE-EXPORT-1 · v1 — land PR #494 at its SYNCED tip; every precondition row is in YOUR box under lane_addr AG-5

Foreman card, AG-5. The second and last of the two hardening PRs, the owner's queue item 2 (OWNER-RULING-S130-LAND-490-1 §2): the provenance export's three scout findings A1–A3 closed by AG-4, each with tests proven to fail at the parent, a real reseal, and a trunk-sync merge of the #493 master that touched only the seal. Product scope under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1; no ADF file moves. Your own ORDER B check-run read at the forty hex is the CI referee (S37-2) — the scout read CI IN-PROGRESS at the synced tip at 14:26Z, and the pre-sync green does NOT carry (a sync merge resets CI). AG-4's sync report, if present in your box, is corroboration only. You have no between-turn poller; the owner was asked to type one line in your window. Every row you need was minted AFTER your claim — plain `--once` (A-REC-S130-15).

## PREMISE

MEASURED: 2026-09-05T14:26:29Z SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1 (copy in your box): VERDICT AMBER — one finding in a COMMENT, not in behaviour; no falsifier fires; "nothing here blocks the landing". Reviewed the SYNCED tip in the `head` fence (ON-DISAGREEMENT entered and named). 3 paths, 2 `AG-4:` non-merge subjects, one sync merge commit; every fix's test FAILS at the parent, measured; resolver AUTHOR-SUBJECT/AG-4 at the tip; CI at the synced tip: build (24.x) IN-PROGRESS · rule26 IN-PROGRESS · changes · relay corpus (grammar v1) · Vercel Preview Comments success · eval-canary SKIPPED · Vercel commit status success (ignored build step).
MEASURED: 2026-09-05T14:39:36Z OWNER-APPROVAL-S130-MASTER-PUSH-PR-494-1 in your box, bound by name to the `head` fence.
MEASURED: 2026-09-05T14:37Z Vercel (Architect read): branch deployment for the synced tip CANCELED by the ignored build step, `githubPrId` 494.
UNMEASURED: CI concluded at the synced tip (ORDER B — your read); the landed master sha and deploy (ORDER D).
DECAYS on any push to the branch or master. ON-DISAGREEMENT: tip ≠ `head` fence, PR #494 not OPEN at it, any context not success/skipped, any precondition row absent, or the scout row RED → STOP, report. A context still IN-PROGRESS → WAIT by name (S74-3), not STOP; re-read, never re-run.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the synced tip, PR #494, its parents | MEASURED: 2026-09-05T14:26Z scout ORDER A at the full forty hex; Vercel push 14:20:49Z | head |
| authorship class per lander | MEASURED: two `AG-4:` subjects + one merge commit invisible to lens one (scout ORDER D) | authorship |
| the precondition rows | POSTED to lane_addr AG-5, named in the `rows` fence; ids in the unanchored transcript | rows |
| CI at the tip | UNMEASURED by you — ORDER B, your own read is the referee | ci |
| the landed master sha and deploy | UNMEASURED — ORDER D | landing |

```evidence:head
phase/harden-provenance-export-1, PR #494 (OPEN, base master), synced tip (merge commit):
    cbcf2b9e48d3a8f4249fda6d4cd20492f9d9ec06
its parents: the authored two-commit tip
    f5b8663838a810b7eebf88edfcbcd7573ef8871f
and the master it lands on (PR #493 merge)
    5d916ad418032daf2ec312d059c64c26738b79d1
```

```evidence:authorship
two non-merge subjects in master..tip, both beginning "AG-4:" (the A1–A3 fix; the reseal); one merge commit (the sync), invisible to lens one
expected resolver: cls=AUTHOR-SUBJECT lane=AG-4 candidates={} ; lander AG-5 -> PASS ; lander AG-4 -> SELF-LAND (paths leave docs/relay/)
run with: ADF_LANE_ROLE=AG-5
```

```evidence:rows
PRECONDITION 1  to_lane AG-5, artifact_name OWNER-APPROVAL-S130-MASTER-PUSH-PR-494-1 — body names the synced tip above
PRECONDITION 2  to_lane AG-5, artifact_name SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1 — first line "VERDICT: AMBER", third line names the synced tip (AMBER with no RED finding is acceptable; RED -> STOP)
OPTIONAL      to_lane AG-5, artifact_name TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1-AG-4-report — corroboration; its absence is NOT a WAIT
all rows are NEWER than your claim: plain --once read; read by artifact_name, not by "newest N"
absent -> WAIT per S74-3 naming the row and the newest row you saw
```

```
bus row ids (transcript, not instruction):
  owner approval PR-494-1 in your box   8d669d21-3708-486d-a18c-5a9be87a175f
  scout verdict copy in your box        5ce6fda0-e2a3-419f-ba80-25790240d45f
  scout verdict original from_lane      ec1e2328-9f11-44e5-8eea-44fcffd92e00
  scout card (to_lane scout)            1846867d-563b-4be2-829c-e9663e67df9a
  sync card (to_lane AG-4)              83e42f46-e3d6-4533-b563-b386dc666830
```

```evidence:ci
UNMEASURED by you at cut time. ORDER B is your own read at the forty hex; it is the referee. At 14:26Z build (24.x) and rule26 were IN-PROGRESS at this tip.
```

```evidence:landing
UNMEASURED. ORDER D prints the merge sha, ls-remote read-back, tree = rehearsal, deploy state or UNREAD.
```

## ORDER A — PRECONDITIONS (S47-1)
Box read with plain `--once`. Print each precondition row's full id, created_at, artifact_name, and the scout's VERDICT / RESOLVER / HEAD lines. Then your own reads: `git ls-remote origin refs/heads/phase/harden-provenance-export-1` = `head`; `gh pr view 494 --json state,headRefOid,mergeable` → OPEN, tip, MERGEABLE.

## ORDER B — CI AT THE TIP
Read all check-runs at the full forty hex of the synced tip; every context by name with conclusion; eval-canary skipped named; Vercel CANCELED-by-ignored-build-step (commit status) named as such, not a failure. Any context still in progress → WAIT by name: re-read at a named interval, no re-run, and say in the report how long you waited and what you saw last. Any `cancelled` other than the Vercel one, or any `failure` → STOP, report.

## ORDER C — LAND
In your foreman worktree on a fresh `git fetch origin`: `ADF_LANE_ROLE=AG-5 npm run land -- 494`. Expected: resolver AUTHOR-SUBJECT/AG-4, lander AG-5 → pass; tree rehearsed; merge; push. If land.ts refuses: class and first refusing line verbatim, STOP, report.

## ORDER D — PROVE
`git ls-remote origin refs/heads/master` (forty hex, fenced); landed tree vs rehearsal; Vercel production state for the new master or UNREAD (GM-2 — name the fence, do not route around; the Architect reads Vercel itself); `git status --porcelain -uall`; `git worktree list`.

## ORDER E — REPORT
`LANDING-HARDEN-PROVENANCE-EXPORT-1-AG-5-report` as a from_lane row: ORDER A rows and reads; CI table with how long ORDER B waited; the landing (merge sha fenced, read-back, tree, deploy) or the STOP. Stamp this card and the precondition rows consumed (and the AG-4 sync-report copy if present).

## FALSIFIER
Wrong if the tip is not the `head` fence, if PR #494 is not OPEN at it, if either precondition row is absent, if the scout row is RED, if any context is not success/skipped after the wait (the Vercel ignored-build-step cancel excepted), if the resolver class is not AUTHOR-SUBJECT/AG-4, or if the landed tree differs from the rehearsed tree.

## SHARED SURFACES
One merge to master by land.ts, one push. NO file edited. NO re-run. NO migration. NO db push. NO governed row. NO branch deletion (delete-on-merge is the platform's).

## DECISION RIGHTS
None. You land only with both preconditions met and every context green or skipped, only via land.ts.

BODIES: `S37-2` · `S47-1` · `S63-1` · `S74-3` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-LAND-490-1 (§2) · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-APPROVAL-S130-MASTER-PUSH-PR-494-1 · A-REC-S130-15 · A-REC-S130-16 · LENS-AUTHOR-SET-1.

fanout: personalized

```deliverables
master: PR #494 merged by land.ts, one push, proven by ls-remote read-back
report: bus row from_lane, artifact_name LANDING-HARDEN-PROVENANCE-EXPORT-1-AG-5-report
```

TAIL ANCHOR: CARD-LANDING-HARDEN-PROVENANCE-EXPORT-1-v1 ends here.
