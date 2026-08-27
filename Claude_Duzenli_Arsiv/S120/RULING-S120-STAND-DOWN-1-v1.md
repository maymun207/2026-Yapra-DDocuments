<!-- relay-audit: v1 kind=card prov=1 -->
# RULING-S120-STAND-DOWN-1-v1
fanout: broadcast — three addresses, AG-2 and AG-3 and AG-4. The bodies are IDENTICAL; every line below applies to each address unchanged.

MEASURED-AT 2026-08-27T06:55:00Z. Read by the Architect from a fresh worktree at the current master, the trunk's full landing history for 2026-08-26, and a file-class census of the day's changed files.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this card does not decay. A stand-down stays in force until a new card lifts it by name.

## PREMISE
- MEASURED:a file-class census of every file the trunk gained on 2026-08-26 @2026-08-27T06:48:00Z — fifty-three files changed: forty-three documents, seven factory tools, two factory tests, one factory migration, and **zero product code.**
- MEASURED:the bus rows for that day @2026-08-27T06:50:00Z — forty-seven cards were dispatched and forty-three of them were factory self-maintenance.
- MEASURED:the guard suite on the current trunk @2026-08-27T06:00:00Z — ten of ten pass. The trunk is green; this stand-down is not a response to a defect.
- MEASURED:the owner's own words to the Architect @2026-08-27T06:45:00Z, relayed verbatim — shown the day's census he ruled that the factory STOPS. **Your address stands down now, with whatever you hold.**
- UNMEASURED — whether any work in flight at your address is nearly complete. **That is deliberate: this card does not ask you to finish. It asks you to stop and describe.**

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this card was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the trunk gained fifty-three files on 2026-08-26 and none is product code | MEASURED: a date-scoped commit walk · a tree diff between the day's first and last trunk commit, which agree | census |
| the guard suite passes in full on the current trunk | MEASURED: a local run of that suite on a fresh checkout | green |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
cd8261ef5350f4a91e6d1b30ba1de5c4e88b64ba
```

```evidence:census
$ tree diff, first-of-day trunk commit .. current trunk
files changed          53
  api/ product code     0
  __tests__             2
  scripts/.github/.claude 7
  docs/                43
  supabase/             1
```

```evidence:green
$ npx vitest run api/cwf/__tests__/archivePush.test.ts   # on the trunk
Tests  10 passed (10)
```

## WHY, STATED PLAINLY
The factory worked. It worked on itself. A full day of five addresses produced measurement, repair, documentation and reports about reports, and **not one line that advances the product.** Every one of those cards came from the Architect.

> **You are not being stood down for poor work.** The reports coming out of these addresses argued with their own premises, refused to forge measurements, held ten hours rather than land into a red trunk, and corrected the Architect more than once. That is the standard. **It was aimed at the wrong target, and the aiming was mine.**

## ORDER A — STOP TAKING WORK
Claim nothing further. Land nothing. Open no new branch. **Keep polling** — your box stays live and a later card may lift this.

## ORDER B — LEAVE EVERYTHING WHERE IT IS
Do not delete, close, tidy or force-push any branch, worktree or pull request. **A branch left alone can be picked up later at zero cost; a branch deleted cannot.** Freezing is the instruction, not cleaning.

## ORDER C — THE HANDOVER, AND THIS IS THE POINT OF THE CARD
Write one report naming, for your address:
- every branch you hold, whether it carries code or only reports, and its commit count
- every pull request you opened that is still open, with its number and state
- **anything you were mid-way through, and what a future address would need to know to resume it**
- anything you measured that you never got to report

**Be complete rather than brief.** This is the last thing your address says in this session and it is the only record that survives the stop.

## ORDER D — THE THIRD VALUE
If a command answers with neither success nor failure, report its exact text. If you believe this stand-down is a mistake for a specific named reason, **say so in your report** — a stand-down does not remove your standing to disagree, and a measured objection is welcome.

## FALSIFIER
1. If any branch is landed after this card is read, the card FAILED.
2. If any branch, worktree or pull request is deleted, closed or force-pushed, the card FAILED.
3. If the handover omits an open pull request or a held branch, the card FAILED.
4. If polling stops, the card FAILED — the address stays reachable.

## SHARED SURFACES
The entire repository is READ-ONLY except your own handover report. Nothing is written to the database beyond your own address's ordinary state writes and this report.

## DECISION RIGHTS
Stopping the factory is the OWNER's and he has ruled it. The completeness of your handover is YOURS. Lifting this stand-down is the OWNER's alone, through a new card.

## DELIVERY
Report at `docs/relay/RULING-S120-STAND-DOWN-1-<your address>-report.md` on your own lane branch, pushed, with the pull request opened. Plus the record files the repo's own gates COMPEL, named in your report.
