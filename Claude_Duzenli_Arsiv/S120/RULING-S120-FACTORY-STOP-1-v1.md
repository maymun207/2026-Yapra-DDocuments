<!-- relay-audit: v1 kind=card prov=1 -->
# RULING-S120-FACTORY-STOP-1-v1
fanout: personalized — one address, AG-5.

MEASURED-AT 2026-08-27T06:50:00Z. Read by the Architect from a fresh worktree at the current master, a per-branch cherry comparison, and a file-class census of every branch still ahead of the trunk.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this premise DECAYS on the next landing, because every landing re-classifies the queue. Re-measure the set yourself before you act on it.

## PREMISE
- MEASURED:a per-branch cherry comparison plus a file-class census over every branch ahead of the trunk @2026-08-27T06:48:00Z — twenty branches carry commits the trunk does not, and **only six of them touch code at all.** Two of those six are the retrieval pair, which is fenced by a named abandonment and stays fenced.
- MEASURED:the same census @2026-08-27T06:48:00Z — the remaining fourteen branches change only documents under the relay directory. They are reports the factory wrote about itself.
- MEASURED:the trunk's landing history for the whole of 2026-08-26 @2026-08-27T06:48:00Z — nineteen pull requests landed, fifty-three files changed, and **zero of them are product code.** Forty-three of the day's cards were factory self-maintenance.
- MEASURED:the guard suite on the current trunk @2026-08-27T06:00:00Z — ten of ten pass. The trunk is green and the hold that stopped you is discharged.
- MEASURED:the owner's own words to the Architect @2026-08-27T06:45:00Z, relayed verbatim — shown the day's census he ruled that the factory STOPS. Not pauses — stops. **This card is the last landing instruction you receive in this session.**
- UNMEASURED — whether the four code branches land cleanly. Two other branches are known conflicted and are NOT in your set.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this card was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| twenty branches are ahead of the trunk and six of them touch code | MEASURED: a per-branch cherry comparison · a file-class census over each branch's own commits | census |
| the guard suite passes in full on the current trunk | MEASURED: a local run of that suite on a fresh checkout of the trunk | green |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
cd8261ef5350f4a91e6d1b30ba1de5c4e88b64ba
```

```evidence:census
$ per-branch cherry + file-class census
CODE   authority-matrix-1        3 commits, 7 code files
CODE   mailwait-flags-1          3 commits, 2 code files
CODE   env-presence-probe-1      1 commit,  1 code file
CODE   stale-fact-sweep-1        1 commit,  1 code file
CODE   context-retrieval-1       13 commits, 20 code files   <- FENCED, not yours
CODE   context-retrieval-1-organ 13 commits, 20 code files   <- FENCED, not yours
report x14 (relay documents only)
```

```evidence:green
$ npx vitest run api/cwf/__tests__/archivePush.test.ts   # on the trunk
Test Files  1 passed (1)
     Tests  10 passed (10)
```

## WHY THE FACTORY STOPS
Over a full working day this factory landed nineteen pull requests and produced **no product code at all.** It measured itself, repaired itself, documented itself, and wrote reports about the reports. Every one of those cards was cut by the Architect, and the owner is right to end it.

> **A machine that runs perfectly while producing nothing is worse than a stopped one**, because it spends budget and manufactures the appearance of progress. The lanes are not at fault — they did exactly what they were told, quickly and well. **What they were told was wrong.**

The fourteen report branches carry real findings, and none of them is lost: every finding already exists as a landed report on the trunk or as a named entry in the ledger. **Not landing them costs nothing but tidiness, and tidiness is what cost yesterday.**

## ORDER A — LAND EXACTLY FOUR, THEN STOP
Land these four and nothing else:

```scope
phase/authority-matrix-1
phase/mailwait-flags-1
phase/env-presence-probe-1
phase/stale-fact-sweep-1
```

Re-measure the set yourself first — a landing re-classifies the queue and this premise decays on the first merge. **If any of the four turns out to carry no code after your own census, drop it and say so.**

## ORDER B — DO NOT LAND ANYTHING ELSE
The fourteen report branches and the fenced retrieval pair stay where they are. **Do not land, delete, close or tidy them.** They are frozen in place, and freezing is deliberate: a branch left alone can be landed later at zero cost, while a branch deleted cannot be recovered by anyone.

## ORDER C — THEN STOP AND SAY SO
When the four are landed, write your report and **stop taking work.** Keep polling; do not claim, do not land, do not open new branches. Your next instruction, if any, comes as a new card.

## ORDER D — THE HANDOVER CENSUS
Your report names, for every branch left standing: its name, whether it carries code or only reports, and its commit count. **That list is the ledger entry for everything this stop leaves behind**, and it is the whole value of this card beyond the four landings.

## ORDER E — THE THIRD VALUE
If a command answers with neither success nor failure, report its exact text and stop. If a landing is refused by a gate, quote the refusal rather than working around it. The single authorised canary firing still stands, still one, and is not renewed here.

## FALSIFIER
1. If anything outside the four named branches lands, the card FAILED.
2. If any branch is deleted, closed or force-pushed, the card FAILED — freezing is not tidying.
3. If work continues after the four land, the card FAILED.
4. If the handover census omits a branch that is ahead of the trunk, the card FAILED.
5. If the canary fires more than once across this card and the rulings preceding it, the card FAILED.

## SHARED SURFACES
The guard script, its tests, every workflow file, the ruleset and the exemption list are READ-ONLY. No branch other than the four is touched in any way. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
Stopping the factory is the OWNER's and he has ruled it. Which four branches carry code is a MEASUREMENT and yours to re-check. Restarting is the OWNER's alone.

## DELIVERY
Report at `docs/relay/RULING-S120-FACTORY-STOP-1-AG5-report.md` on your own lane branch, pushed, with the pull request opened. Plus the record files the repo's own gates COMPEL, named in your report.
