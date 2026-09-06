<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-AUTHORITY-SNAPSHOT-REFRESH-1 · v1 — land PR #489, the re-stamp that unblocks build (24.x) repo-wide

AG-4 ran `authority:snapshot`, re-stamped the two ground files, and opened pull request 489. Its
report confirms the disagreement count is SEVEN — the investigated world re-stamped, nothing blessed.
This card lands it. It is the FOREMAN's card; a producer never merges its own work.

**PRECONDITION — THIS CARD DOES NOT AUTHORISE A MERGE ON ITS OWN.** The owner's named master-push
approval for PR 489 is `OWNER-APPROVAL-S129-MASTER-PUSH-AUTHORITY-SNAPSHOT-REFRESH-1`, already in the
foreman box. CONFIRM it is in your box before ORDER B. If it is not, STOP: a card is not consent.

## PREMISE

MEASURED: 2026-09-03T15:34:55Z, AG-4's refresh report on the bus (from_lane, artifact_name begins `AUTHORITY-SNAPSHOT-REFRESH-1`) — pull request 489, branch `phase/authority-snapshot-refresh-1`, one commit off the base, touching exactly the two ground files in the `commits` fence.
MEASURED: 2026-09-03T15:34:55Z, the same report's ORDER B — the fresh snapshot reads `measuredAt 2026-09-03T15:28:25Z` and the conformance verdict is "REPORTED — 7 disagreement(s)". SEVEN exactly, the investigated count; the card's ON-DISAGREEMENT arm did not fire.
MEASURED: 2026-09-03T15:34:55Z, the same report's ORDER C — `vitest run api/cwf/__tests__/authorityMatrix.test.ts` reads 21 of 21 passing, up from 3-failed/18-passed before the re-stamp; the three freshness assertions are now green. The root line was read and is the worktree, not the shared clone.
MEASURED: 2026-09-03T15:36Z, the Architect cannot ls-remote origin from the bridge — it has no GitHub credential and returns empty for master too, so branch/PR existence is UNVERIFIED from the Architect's side and must be resolved live by a lane that holds gh access.
DECAYS on any push to the branch or to master, and on CI re-running. ORDER A re-resolves the tip, the PR state and CI live.
ON-DISAGREEMENT: if PR 489 is not open, or its HEAD is not the branch tip, or the branch touches any file other than the two ground files, or CI on the PR HEAD is RED for ANY reason — STOP and report. This branch's whole purpose is to make build (24.x) GREEN; a red on it is not an exemption, it is a failure of the thing itself.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| PR 489 is the re-stamp, one commit, exactly the two ground files | MEASURED: 2026-09-03T15:34:55Z, AG-4's report naming the PR, commit and files | commits |
| the fresh run reported exactly seven disagreements, the investigated count | MEASURED: 2026-09-03T15:34:55Z, AG-4's report quoting the verdict line "REPORTED — 7" | commits |
| the three authorityMatrix freshness assertions now pass, 21 of 21 | MEASURED: 2026-09-03T15:34:55Z, AG-4's report quoting the vitest result and root line | commits |
| the owner's named master-push approval for PR 489 is on the bus | MEASURED: 2026-09-03T15:17:37Z, OWNER-APPROVAL-S129-MASTER-PUSH-AUTHORITY-SNAPSHOT-REFRESH-1 filed to the foreman box | approval |
| whether PR 489 is open and its CI is green | NOT-READ | ORDER A reads it live via gh; the Architect has no GitHub credential and cannot | commits |

```evidence:commits
Pull request 489. Branch phase/authority-snapshot-refresh-1. One commit off the base:

  62c62475339008a22aa3942215456845768fb014  AUTHORITY-SNAPSHOT-REFRESH-1: re-stamp the live reading so build (24.x) is green repo-wide

Files, and ONLY these two:
  docs/ground/authority-live.snapshot.json
  docs/ground/authority-conformance.latest.md

Resolve the tip and PR state YOURSELF at ORDER A. The Architect could not ls-remote origin (no
GitHub credential on the bridge; empty for master too — absence of a reading, not a reading of
absence), so branch/PR existence is the lane's to confirm live.
```

```evidence:approval
The owner's words, 2026-09-03: "Refresh PR'ının master'a inişi için ADLANDIRILMIŞ onay veriyorum."
Filed to the foreman box at 2026-09-03T15:17:37Z as
OWNER-APPROVAL-S129-MASTER-PUSH-AUTHORITY-SNAPSHOT-REFRESH-1. It authorises THIS merge and only this
one; it is not canary approval (the canary stays frozen) and it does not close the seven.
```

## ORDER A — READ THE GATE

Confirm the owner approval row is in your box; if not, STOP. Resolve the branch tip and `origin/master`
via gh/ls-remote (you hold the credential the Architect does not). Confirm PR 489 is open, its HEAD is
the tip, and it touches only the two ground files. Then READ CI ON THE PR HEAD (S37-2): `build (24.x)`
must reach a CONCLUSION of SUCCESS — this branch exists to make it green, so anything less is a STOP,
not an exemption. Report the full CI verdict before you merge.

## ORDER B — LAND IT

Merge with `--no-ff` (S100-3 detached-HEAD form). Squash is not required for one commit but do not
squash away the commit message. Push to master. Do not rebase, amend, or touch the branch contents.

## ORDER C — PROVE IT

Read `git ls-remote origin refs/heads/master` back and report the tip; confirm the refresh commit is
reachable from it. This is the reading that matters most: once this lands, build (24.x) is green
repo-wide and every held branch — PR 488 above all — can proceed.

## ORDER D — REPORT

File `from_lane` with artifact name `LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-<your-address>-report`,
carrying the ORDER A readings including the full CI verdict, the merge commit sha in full forty hex,
and the ORDER C remote reading.

## FALSIFIER

This card is wrong if PR 489 is not open, its HEAD is not the tip, it touches a third file, or CI is
red. A red on THIS branch is not tolerated at all — unlike PR 488 it carries no expected-red, because
its entire job is to remove the red.

## SHARED SURFACES

One merge of an existing branch into master, one push. NO file edited, created or deleted by this
card. NO migration. NO db push. NO governed row. NO production traffic. The branch is not modified.

## DECISION RIGHTS

The owner ruled refresh and gave the named master-push approval as its own bus row. Merge authority is
the foreman's own — a producer branch, not a lane landing its own record. You decide NOTHING about the
code or whether a red is tolerable: this branch's red, if any, is a STOP.

BODIES: `PLATINUM` · `S37-2` · `S63-1` · `S100-3` · `TOTAL-45` · `empty ≠ zero` (an empty ls-remote
over a credential-less shell is absence-of-reading, not reading-of-absence).

fanout: personalized

```deliverables
branch: none — this card merges an existing branch and writes no file
report: bus row from_lane, artifact_name LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-<your-address>-report
```

TAIL ANCHOR: CARD-LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-v1 ends here.
