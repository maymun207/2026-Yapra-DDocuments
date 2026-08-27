<!-- relay-audit: v1 kind=card prov=1 -->
# RULING-S120-SECRET-GUARD-FALSE-POSITIVE-1-v1
fanout: personalized — one address, AG-1.

MEASURED-AT 2026-08-27T05:35:00Z. Read by the Architect from a fresh worktree at the current master, a local run of the failing test, and the flagged line itself.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this ruling names one line in one file. It DECAYS the moment that file changes or a second guard hit appears anywhere in the corpus.

## PREMISE
- MEASURED:a local run of the landed secret-guard test at the master named in the trunk fence @2026-08-27T05:30:00Z — one assertion fails, nine pass, and the failure names exactly one location: one report file, line 191, rule name-adjacent-value.
- MEASURED:that line read directly from the tree @2026-08-27T05:33:00Z — it sits inside an evidence fence and is a grep invocation whose pattern is a pipe-separated alternation of ENVIRONMENT VARIABLE NAMES. The token the guard flagged is followed by another variable NAME, not by a value.
- MEASURED:the guard's own source @2026-08-27T05:33:00Z — the rule fires when a name is adjacent to something its secret-shape test accepts, and an alternation of further names satisfies that shape.
- MEASURED:your own tick output, relayed to the Architect @2026-08-27T05:20:18Z — you have held this open awaiting a one-line ruling, and your box read correctly returns empty.
- MEASURED:the bus row for the card that commissioned this report, and that report's own landing commit @2026-08-27T05:34:00Z — **the ARCHITECT cut the card that produced this report. The red is downstream of my order, not of your work.** Your report is correct and your census is the reason the finding exists at all.
- UNMEASURED — whether any OTHER file in the corpus would trip this guard once this one is cleared. One failure can mask the next, and that is ORDER C.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this ruling was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the secret guard fails on the trunk at exactly one named location | MEASURED: a local run of the landed test, which names file and line | red |
| the flagged token is a variable NAME inside a grep alternation, with another NAME adjacent to it | MEASURED: the line read from the tree · the guard's own rule source read alongside it | falsepos |
| nine of the ten assertions in that file pass | MEASURED: the same local run | scope |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
2f409c59e797b0de8f37b258c059a84cd4f77111
```

```evidence:red
$ npx vitest run api/cwf/__tests__/archivePush.test.ts
FAIL  the secret guard does not bark on the majority case
      > finds nothing in the entire landed relay corpus
+   "PHASE-LANE-COMMAND-FORM-1-AG1-report.md:191 name-adjacent-value:CWF_LANE_DATABASE_URL"
```

```evidence:falsepos
$ the flagged line, read from the tree
$ grep -rnE 'ADF_LANE_ROLE=|CWF_LANE_DATABASE_URL=|MEMORY_DIR=|GIT_TERMINAL_PROMPT=|REPO=|...'
                                  ^^^^^^^^^^^^^^^^^^^^^ name        ^^^^^^^^^^^ the "value" is the NEXT NAME
$ the guard's rule
if (named && !STATUS_WORDS.test(named[2]) && looksLikeSecret(named[2])) {
```

```evidence:scope
$ same run
Tests  1 failed | 9 passed (10)
```

## THE RULING, IN ONE LINE AS YOU ASKED
**It is a false positive, and the guard is NOT to be widened.**

This repository already settled the general form of this question, in the relay auditor's own source: *a tripwire false positive is resolved by MOVING THE SENTENCE, never by widening the grammar.* A guard loosened once to admit a harmless line is a guard that admits the harmful one later, and nobody will be watching when it does.

> **The guard is behaving correctly. The artefact must change.** This is the same shape as a card gate refusing a true card five times — the answer was never to soften the gate; it was to write the card differently.

## ORDER A — MOVE THE SENTENCE
Rewrite the flagged evidence fence so no variable name sits immediately adjacent to a value-shaped token, WITHOUT changing what the evidence says. The census result must remain byte-faithful — this is a presentation change, not a content change.

Break the alternation so each name stands alone, or restructure the invocation so the pattern is not one run-on string. **Say in your report which form you chose and why it cannot re-trip the rule.**

## ORDER B — PROVE IT, DO NOT ASSERT IT
Run the guard test locally before you push and report the numbers: ten of ten, or the new failure. **A green claim without the run beneath it is refused.**

## ORDER C — THE MASKED NEXT ONE
The guard returns on FIRST hit per file and the suite reported ONE flagged entry. **That is not proof the corpus holds only one.** After your fix is green, run the same scan across the whole landed corpus and report the count. If a second hit appears, STOP and report it rather than fixing it under this ruling — a ruling covers the line it names.

## ORDER D — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a hang — report its exact text rather than routing around it. You held this correctly for ten hours rather than guessing; that was right, and the cost of it belongs to the Architect, not to you.

## FALSIFIER
1. If the guard, its rule set, its shape tests or its allow-lists are modified in any way, the card FAILED — the guard is not the defect.
2. If the evidence fence's factual content changes rather than its formatting, the card FAILED.
3. If the fix is pushed without a local run of the guard test reported as numbers, the card FAILED.
4. If a second guard hit is found and repaired silently under this ruling, the card FAILED.

## SHARED SURFACES
Only `docs/relay/PHASE-LANE-COMMAND-FORM-1-AG1-report.md` may be written. The guard script, its tests, every workflow file and the exemption list are READ-ONLY. No branch is landed, amended, rebased or force-pushed on the trunk.

## DECISION RIGHTS
Whether this is a false positive is the ARCHITECT's and it is ruled above. How the sentence is moved is YOURS. Whether the guard's rule should ever change is the OWNER's, and it is not in play here.

## DELIVERY
Branch `phase/secret-guard-false-positive-1`. Push it, open the pull request, and report at `docs/relay/RULING-S120-SECRET-GUARD-FALSE-POSITIVE-1-AG1-report.md`. Plus the record files the repo's own gates COMPEL, named in your report.
