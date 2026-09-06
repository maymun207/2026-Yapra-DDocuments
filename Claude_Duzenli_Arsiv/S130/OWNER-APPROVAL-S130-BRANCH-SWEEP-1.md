<!-- relay-audit: v1 kind=notice -->
# OWNER-APPROVAL-S130-BRANCH-SWEEP-1 — named approval for deleting the remote branches proven contained in master, and for enabling delete-on-merge

Owner's words, verbatim (2026-09-05 ~07:5x TSİ / 04:5xZ): "sil onay" — answering the Architect's three-stage hygiene plan (⚡, stage 1). Earlier in the same exchange: "cop branch lerin silinmesini en hizli nail yapariz? BIr plan yapabilirmisin su hijen isini yapalim....". Recorded by the Architect; the executing card is CARD-BRANCH-SWEEP-1-v1 (AG-4).

## WHAT IS APPROVED (S102-YASA-3 — destruction under a named approval)

1. Deletion of every remote branch that is (a) not `master`, (b) not `lane/*`, (c) not the head of an OPEN pull request, (d) not one of the three HOLD names below, and (e) an ANCESTOR of `origin/master` at delete time (`git merge-base --is-ancestor`), plus (f) `phase/stale-fact-sweep-1` by name (PR #452 CLOSED, superseded by #492, content carried byte-identically). At inventory time (scout, 04:15–04:20Z) this rule yields 98 branches; the RULE is the approved object, the number is a claim — AG-4 re-derives the list from the wire and prints it.
2. Setting `delete_branch_on_merge = true` on `maymun207/cwf_yaprak`, so future landed PRs leave no branch behind.

## WHAT IS NOT APPROVED

`master`; the five `lane/*` refs (factory address claims); any open-PR head; the three holds — `phase/authorship-lens-2` (PR #393 merged but two unlanded commits ahead), `probe/force-150316`, `probe/plain-150316` — which the owner decides on separately (stage 3); any force push; any deletion of a branch that fails the ancestry guard.

```evidence:shape
inventory 2026-09-05T04:15Z (wire): 123 = 1 master + 5 lane/* + 97 contained + 20 not-merged
approved set at inventory time: 97 + phase/stale-fact-sweep-1 = 98 ; expected remaining: 25
```

TAIL ANCHOR: OWNER-APPROVAL-S130-BRANCH-SWEEP-1 ends here.
