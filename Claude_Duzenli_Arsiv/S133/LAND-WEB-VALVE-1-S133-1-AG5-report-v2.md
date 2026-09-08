<!-- relay-audit: v1 kind=report -->
# LAND-WEB-VALVE-1-S133-1 — AG-5 — v2

`read relay_inbox at 2026-09-08T11:19:15Z — read OK — 1 row for AG-5, head reached`

**LANDED.** `api/cwf/_lib/webTools.ts` exists on master. Master moved across the seventeen
paths, from the base to the tip carried in the `land` fence below, and the merge commit equals
master's tip.

The three sentences ORDER C.2 asks for: **no sync was owed** — `merge-base --is-ancestor`
exited zero, master had not moved since v1 and the branch already carried it. **`eval-canary`
was the only skipped required job**, named and not folded into the green; `rule26`, which was
skipped at the earlier red head, ran and passed at this one. **The drift gate holds at the new
master** — all seven narrative tabs synced.

## Why this took two card versions

v1 sent this lane at a head that failed `check:doc-drift`, and it stopped there. The stop was
not caution: the branch changed mapped code and carried no reseal, and the suite green that had
been reported for twelve card versions came from `vitest` and `typecheck:api`, neither of which
runs the drift gate. AG-4 paid the debt on the branch; the Architect widened the fence from nine
paths to seventeen in v2; the landing then went through unmodified. **Nothing was re-run and
nothing was forced.**

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the v2 card, digest verified against the row and stamped consumed | MEASURED: node scripts/mail-wait.mjs AG-5 --read CARD-LAND-WEB-VALVE-1-S133-1-v2 --take | card |
| the wire heads equal the v2 head fence | MEASURED: git ls-remote origin refs/heads/master refs/heads/phase/web-valve-1-s132-1 | find |
| the changed paths equal the seventeen-path fence EXACTLY | MEASURED: git diff --name-only origin/master...origin/phase/web-valve-1-s132-1 | find |
| the pull request was found BY BRANCH, and no second one was opened | MEASURED: gh pr list --state open --json number,headRefName,headRefOid | find |
| no sync was owed | MEASURED: git merge-base --is-ancestor origin/master origin/phase/web-valve-1-s132-1, exit 0 | land |
| every required run was green at the landed head, read at full forty-hex length | MEASURED: gh api actions/runs?head_sha=89bd65e7a81593f85bd419a760f8b7c62e0081c7 | land |
| eval-canary was SKIPPED and NOT counted as green; rule26 passed at this head | MEASURED: gh api commits/89bd65e7.../check-runs | land |
| the landing happened and the merge commit equals master's tip | MEASURED: npm run land -- 517 · git ls-remote · gh pr view 517 --json state,mergeCommit | land |
| webTools.ts now exists on master | MEASURED: git cat-file -e origin/master:api/cwf/_lib/webTools.ts, exit 0 | exists |
| the drift gate holds at the new master | MEASURED: npm run check:doc-drift at 021669fd | exists |
| whether the valve behaves correctly when OPENED | NOT-READ | the floor is CLOSED and no default was touched; this landing changed what the repository contains, not what production does |
| whether the citation contract is right | NOT-READ | v1 of the card defers it to a separate card against a fixture corpus; this lane landed a tree, it did not review a design |

## The card

```evidence:card
[CARD] artifact_name=CARD-LAND-WEB-VALVE-1-S133-1-v2 length=10589
[DIGEST-OK] locally recomputed md5 matches the row's
[STAMPED] consumed_at written (relay_mark_consumed, over the WRITE connection)
```

## ORDER A — every precondition passed

```evidence:find
$ git ls-remote origin refs/heads/master refs/heads/phase/web-valve-1-s132-1
5d482353161198d0b1381f9473fe86a02dce2bf3	refs/heads/master
89bd65e7a81593f85bd419a760f8b7c62e0081c7	refs/heads/phase/web-valve-1-s132-1
(both equal the v2 head fence)

$ git diff --name-only origin/master...origin/phase/web-valve-1-s132-1
(seventeen paths, equal to the paths fence line for line)

$ gh pr list --state open --json number,headRefName,headRefOid
517  phase/web-valve-1-s132-1  89bd65e7a81593f85bd419a760f8b7c62e0081c7
518  phase/land-web-valve-1-s133-1  (this lane's own report branch, untouched)
```

The pull request was the one already open from v1. No second pull request was opened for the
landing.

## ORDER B — the landing

```evidence:land
$ git merge-base --is-ancestor origin/master origin/phase/web-valve-1-s132-1
(exit 0 — NO sync owed)
$ gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=89bd65e7a81593f85bd419a760f8b7c62e0081c7"
total_count=3
Build and Test  :: completed :: success
Relay corpus    :: completed :: success
report-schema   :: completed :: success
$ gh api repos/maymun207/cwf_yaprak/commits/89bd65e7a81593f85bd419a760f8b7c62e0081c7/check-runs
build (24.x) :: success · rule26 :: success · changes :: success
relay corpus (grammar v1) :: success · report-schema :: success
Vercel Preview Comments :: success
eval-canary :: SKIPPED
$ ADF_LANE_ROLE=AG-5 npm run land -- 517
[land] step 3 OK — every non-skipped JOB is success; SKIPPED, named and NOT folded into the green: eval-canary
[land] order B author lane=AG-4 lander lane=AG-5 class=AUTHOR-SUBJECT
[land] step 6 OK — landed tree aab79991530aca8f4996091e4f9fd53f8e4ae59c equals the rehearsed tree
[land] step 7 OK — lock RELEASED
[land] verdict | still dark  : eval-canary
$ git ls-remote origin refs/heads/master
021669fd53e82620eec9442a983f37ce9fa2f3ee	refs/heads/master
$ gh pr view 517 --json state,mergeCommit
{"mergeCommit":{"oid":"021669fd53e82620eec9442a983f37ce9fa2f3ee"},"state":"MERGED"}
```

The author lane is AG-4 and the lander is AG-5, so the land gate classified it
`AUTHOR-SUBJECT` and the report-only exception was never needed. This lane landed work it did
not write.

## ORDER B.4 and B.5 — the thing exists, and the seal holds where it now lives

```evidence:exists
$ git cat-file -e origin/master:api/cwf/_lib/webTools.ts
(exit 0 — the file EXISTS on master; before this landing the same command failed)
$ npm run check:doc-drift            (at master 021669fd)
[check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).
```

The second reading is the one that matters for the seal: AG-4 resealed against the branch, and
a seal proven true on a branch is not yet proven true where it lands. It is now.

## The bus row — MECHANISM-ABSENT

ORDER C.3 asks for one `from_lane` row and allows `MECHANISM-ABSENT` with the lenses named.

```evidence:bus
$ grep -rn "relay_post_from_lane" scripts/
scripts/verifyGrants.ts:270   'relay_post_from_lane',
scripts/verifyGrants.ts:393   relay_post_from_lane: { p_addr, p_artifact_name, p_body, p_nonce_sha }
$ grep -rln "from_lane|relayPost|postFromLane" scripts/ .claude/ docs/laws/
scripts/verifyGrants.ts
.claude/boot/producer.md
.claude/boot/foreman.md
```

**MECHANISM-ABSENT.** Two lenses: the scripts tree, and the boots plus the laws directory. The
verb is named in a GRANT PROBER and described in prose in both boots, and nothing anywhere
CALLS it. This is `F-S133-ESCALATION-CHANNEL-HAS-NO-CALLER-1`, raised by this lane at boot and
independently corroborated by AG-4 on this same branch. No direct write to the bus was
hand-rolled, as the card instructs.

## DIFF

```
$ git diff --name-only origin/master...HEAD
docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report.md
docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report-v2.md
```

Two files, both this lane's own reports: the v1 report recording the STOP, kept because the
stop is real history, and this one recording the landing.

## Close

```evidence:close
$ git status --porcelain -uall
 M docs/ground/authority-conformance.latest.md
$ git ls-remote origin refs/heads/lane/AG-5
5f2ae576c9a0cd7eefb6c185effe32fa7864dba6	refs/heads/lane/AG-5
```

The modified ground doc is `F-S130-TEST-SUITE-WRITES-GROUND-DOC-1`, known and open, named and
not discarded. The lane ref carries this window's nonce.

TAIL ANCHOR: LAND-WEB-VALVE-1-S133-1-AG5-report-v2 ends here.
