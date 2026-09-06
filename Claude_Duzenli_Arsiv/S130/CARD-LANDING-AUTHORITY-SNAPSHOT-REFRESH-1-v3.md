<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-AUTHORITY-SNAPSHOT-REFRESH-1 · v3 — land PR #489 at its re-authored head, the re-stamp that unblocks build (24.x) repo-wide

Supersedes v2 (S37-1), which two independent scout windows returned GREEN TO LAND; v3 changes NO order and NO premise. Its single edit conforms the fourth CLAIMS row to R-CLAIM-ROW (the basis cell is the bare token NOT-READ; the reason it carried now lives in the `head` fence, where the same sentence already stood) — the one CP-1 violation the scout measured on v2. The gate that refused it is disarmed (CARD_GATE=REPORT), so the fix is conformance, not necessity: a refusal is not routed around, it is satisfied. v1 was executed and the foreman correctly REFUSED with AUTHOR-UNKNOWN: the commit subject carried no AG-<n> token before its first colon. AG-4 has re-authored the subject to the house form — message-only, tree and body byte-identical, leased force-push — and reported the new head with a three-way proof and green CI. This card lands the re-authored head. It is the FOREMAN's card; a producer never merges its own work.

**PRECONDITION — THIS CARD DOES NOT AUTHORISE A MERGE ON ITS OWN.** The owner's named master-push approval for PR 489 is OWNER-APPROVAL-S129-MASTER-PUSH-AUTHORITY-SNAPSHOT-REFRESH-1, already in the foreman box; it authorises THIS merge — the re-authored head is the same PR, base, two files and content, with only the attributable subject added. CONFIRM it is in your box before ORDER B. If it is not, STOP: a card is not consent.

## PREMISE

MEASURED: 2026-09-03T20:59Z, AG-4's amend report on the bus (from_lane) — PR 489 head re-authored to the value in the `head` fence, the amend proven tree-identical (the tree in the `head` fence) and body-byte-identical over the sixty-eight-line body, the new subject resolving lane AG-4, and CI on the new head build (24.x) SUCCESS as a docs-only CI-DIET green.
MEASURED: 2026-09-03T20:52Z, two independent scout windows returned GREEN on the amend card, each re-measuring the target live and executing land.ts's author lens against the new subject, which resolves AG-4.
DECAYS on any push to the branch or master, and on CI re-running. ORDER A re-resolves the tip, PR state and CI live.
ON-DISAGREEMENT: if PR 489 is not open, or its HEAD is not the value in the `head` fence, or the branch touches any file other than the two ground files, or CI on the PR HEAD is RED for ANY reason — STOP and report. This branch's whole purpose is to make build (24.x) GREEN; a red on it is a failure of the thing itself.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| PR 489's re-authored head is one commit, exactly the two ground files, and CI-green | MEASURED: 2026-09-03T20:59Z, AG-4's amend report | head |
| the new subject resolves lane AG-4 and passes the author lens | MEASURED: 2026-09-03T20:52Z, two scout windows executing land.ts authorLaneOf | head |
| the owner's named master-push approval for PR 489 is on the bus | MEASURED: 2026-09-03T15:17:37Z, the approval row in the foreman box | approval |
| whether PR 489 is open and its CI is green on the re-authored head | NOT-READ | head |

```evidence:head
Pull request 489. Branch phase/authority-snapshot-refresh-1. Re-authored head, one commit off the base:
  29a87d0e418f81852d72abe3f55bf320fff898a9  AUTHORITY-SNAPSHOT-REFRESH-1 AG-4: re-stamp the live reading so build (24.x) is green repo-wide
  (was 62c62475339008a22aa3942215456845768fb014 before the message-only amend; tree unchanged at e02a5156ad6860b5bc161a43ec40d4b3c1c1b99f)
master, the base, unmoved:
  d8895114744dbb23ba5633d726a0814cfe0468d5
Files, and ONLY these two:
  docs/ground/authority-live.snapshot.json
  docs/ground/authority-conformance.latest.md
Resolve the tip and PR state YOURSELF at ORDER A; the Architect cannot ls-remote origin (no GitHub
credential on the bridge; empty for master too — absence of a reading, not a reading of absence).
```

```evidence:approval
The owner's words, 2026-09-03: "Refresh PR'ının master'a inişi için ADLANDIRILMIŞ onay veriyorum."
Filed to the foreman box at 2026-09-03T15:17:37Z as OWNER-APPROVAL-S129-MASTER-PUSH-AUTHORITY-SNAPSHOT-REFRESH-1.
It authorises this merge and only this one; the re-authored head is the same PR, base, files and content,
only the attributable subject added. It is not canary approval and it does not close the seven disagreements.
```

## ORDER A0 — CONFIRM THE LANDER IS READABLE (F4)
Before reading the gate, print your OWN resolved landerLane and the arm you expect. AUTHOR-UNKNOWN is a SHARED class: land.ts refuses it when the LANDER is unreadable (ADF_LANE_ROLE unset, so landerLane resolves null), and refuses with a DIFFERENT class — SELF-LAND — when the lander's own role equals the author AG-4 (the report-only exception does not rescue it: both files are docs/ground/, not docs/relay/). You resolved AG-5 when you refused v1, so the expected arm is a clean author=AG-4 / lander=AG-5 pass. Confirm landerLane still resolves AG-5 and is not null and not AG-4. If it resolves null or AG-4, STOP and report — do not merge into a second refusal.

## ORDER A — READ THE GATE
Confirm the owner approval row is in your box; if not, STOP. Resolve the branch tip and origin/master via gh/ls-remote. Confirm PR 489 is open, its HEAD is the value in the `head` fence, and it touches only the two ground files. Then READ CI ON THE PR HEAD (S37-2): build (24.x) must reach a CONCLUSION of SUCCESS — this branch exists to make it green, so anything less is a STOP. Report the full CI verdict before you merge.

## ORDER B — FRESH BOX READ, THEN LAND IT (S100-3 · CP-11)
A merge to master is estate-level; re-measuring the target is not re-reading the order. Immediately before the merge, read your OWN box for a countermand of this landing card; if one exists, ABORT and report. Then merge with --no-ff (S100-3 detached-HEAD form); do not squash away the commit message; push to master. Do not rebase, amend, or touch the branch contents.

## ORDER C — PROVE IT
Read git ls-remote origin refs/heads/master back and report the tip; confirm the re-authored commit is reachable from it. Once this lands, build (24.x) is green repo-wide and every held branch — PR 488 above all — can proceed.

## ORDER D — REPORT
File from_lane, artifact_name LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-<your-address>, carrying the ORDER A0 lander confirm, the ORDER A readings including the full CI verdict, the merge commit sha in full forty hex, and the ORDER C remote reading.

## FALSIFIER
Wrong if PR 489 is not open, its HEAD is not the `head` fence value, it touches a third file, its CI is red, or the lander resolves null or AG-4 at ORDER A0. A red on THIS branch is not tolerated at all — its entire job is to remove the red.

## SHARED SURFACES
One merge of an existing branch into master, one push. NO file edited, created or deleted by this card. NO migration. NO db push. NO governed row. NO production traffic. The branch is not modified.

## DECISION RIGHTS
The owner ruled refresh and gave the named master-push approval as its own bus row. Merge authority is the foreman's own — a producer branch, not a lane landing its own record. You decide NOTHING about the code or whether a red is tolerable: this branch's red, if any, is a STOP.

BODIES: `PLATINUM` · `S37-1` · `S37-2` · `S63-1` · `S100-3` · `TOTAL-45` · `empty ≠ zero` · CP-11 (a fresh box read before the estate-level merge).

fanout: personalized

```deliverables
branch: none — this card merges an existing branch and writes no file
report: bus row from_lane, artifact_name LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-<your-address>
```

TAIL ANCHOR: CARD-LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-v3 ends here.
