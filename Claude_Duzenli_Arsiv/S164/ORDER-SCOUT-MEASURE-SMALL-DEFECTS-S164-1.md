<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-SMALL-DEFECTS-S164-1

LANE: scout-1
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:15Z
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · CWF-S164-OPEN-ITEMS-TABLE-v1 §D/§E (register 106, 59, 60, 61, 50). Base: master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (M1 landed) or later — print what you read.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable. Read-only: you write no repo file except your status row (long verdict → doc repo S164/ + bus slip with sha256, register 109).
PURPOSE: the Architect cuts ONE small card for these five from your measurement; the card is only as good as your file:line.

## STEPS
1. 106 · numeric extraction: where does the grounding/number extractor split "1 250 000" (space-grouped thousands) into three literals, and where would "12,5 milyon" / "3 bin" multipliers be applied? file:line of the tokenizer and of the tolerance call sites (PR 622 added absolute half-grid tolerance at both). Name the minimal change and one test shape per case.
2. 59 · stamp false positive on method-name numerals ("5 Neden Analizi"): which check stamps it, file:line, and the smallest discriminator (e.g. numeral followed by a title-cased noun phrase from a governed list) — say whether that list must be data (it must not be a hard-coded tenant word: §13.1).
3. 60 · a recalled claim written as measured: where the answer composer renders a memory/recall-sourced value, and whether a provenance field exists to label it. file:line.
4. 61 · prose says "all/hepsi" when calls were dropped: where the fan-out cap drops calls, whether the drop count reaches the compose prompt, file:line.
5. 50 · grouped payload: recordCount counts one group; the stored handle keeps the first group only — file:line of both, current behaviour on a 2-group payload.
6. For each: CALLER-ABSENT check (§12.6) — is there an existing mechanism that already does it and is not called? Name it.
7. Status row SCOUT-STATUS-MEASURE-SMALL-DEFECTS-S164-1: one block per item (seam file:line · existing mechanism y/n · minimal fix · test shape · risk). UNMEASURED where you could not read, never guessed.

END · ORDER-SCOUT-MEASURE-SMALL-DEFECTS-S164-1
