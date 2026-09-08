# S133-WEB-VALVE-CYCLE-TIME-MEASUREMENT-1 — where the twenty-one hours on WEB-VALVE-1 actually went

Cut 2026-09-08T09:30Z, on the owner's question: *"web valve implementasyonu neden bu kadar SÜPER uzun sürdü, neredeyse 24 saat ile uğraştık."* Measured from `public.relay_inbox`, not remembered.

## THE ONE NUMBER THAT ANSWERS IT

`CARD-WEB-VALVE-1-S132-1-v1` was dispatched to AG-4 at **2026-09-07 11:00:33Z**. The producer's report `WEB-VALVE-1-AG4-report` was posted at **11:24:22Z** — **twenty-three minutes and forty-nine seconds later.**

The bus carries **exactly one** producer report on this line. Nothing after it. The branch `phase/web-valve-1-s132-1` has been measured by the scout at every verdict from 03:16Z today onward and reported **UNMOVED** at `5d1df6c9d49ba905f88aa776c88c448a899ca1ca` every time.

**The implementation took twenty-four minutes. The remaining twenty-one hours were spent specifying a re-run that has not happened.** That is not a slow implementation; it is a specification that would not close.

## WALL-CLOCK VERSUS ACTIVE TIME

v1 at 2026-09-07 11:00:33Z → v12 at 2026-09-08 08:02:32Z = **21h 02m**. Of that, three gaps longer than an hour, all with the machine off or the windows closed:

- 12:41Z → 21:30Z — 8h 49m
- 22:35Z → 02:16Z — 3h 41m
- 03:58Z → 05:22Z — 1h 24m (the S133 cold restart falls here)

**13h 54m of the twenty-one hours the factory was not running at all.** Active review time is about **7h 08m** across eleven rounds — roughly thirty-nine minutes per round, which is not slow for a round. The problem is the NUMBER of rounds, not their speed.

## WHERE THE FORTY-TWO AMENDMENTS WENT

Classified by reading the SCOPE mirrors of v12, by what each amendment governs:

| cluster | amendments | count |
|---|---|---|
| **the fetchedAt date matcher** | 5, 20, 24, 26, 27, 30, 31, 35, 36, 39, 40, 41, 42 | **13** |
| meta / ToolResultMeta plumbing | 6, 10, 11, 12, 13, 14, 15, 16, 18, 19, 22, 25, 38 | 13 |
| containment value, union type, render | 7, 17, 21, 23, 28, 29, 32, 33, 34, 37 | 10 |
| tool sentence, panel, bounds, span | 1, 2, 3, 4, 8, 9 | 6 |

**Thirteen of forty-two amendments — nearly a third — are about ONE sub-problem: how to recognise a date inside a natural-language answer.** And every self-repair on this line lives inside that cluster: 24 repairs 20, 35 repairs 30, 36 repairs 31, 40 repairs 30-against-35, 41 repairs 36, 42 repairs 41. **Six rounds of the review repairing its own sentences, all in the same sub-problem.** The other three clusters converged and stopped generating amendments rounds ago.

## THE CAUSE, AND IT IS THE ARCHITECT'S

Project box §8 names this trap exactly: every "let's add this too" hides a **deterministic/authoritative versus soft/learned** distinction. A redirect rule, an SSOT split, a union type — deterministic, must be exactly right, correctly specified in prose and correctly gated.

**A Turkish-date matcher is SOFT.** Whether "Veriler 07/09/2026 tarihinde alindi" should raise `uncited_external` is an empirical question about strings, and it was written into the card as PROSE CLAUSES. Prose clauses about a fuzzy matcher cannot converge under adversarial review, because the reviewer can always imagine one more string — and this reviewer is good, so it always did. Each imagined string produced a clause, each clause produced a surface, and two of the clauses then contradicted each other (35 against 30) and one refused a lawful turn (41).

That is not the scout's fault — every one of those thirteen was a real defect, and the scout found six of them in its own sentences and said so first. It is not the mechanism's fault. **It is the Architect's: a soft problem was put in the deterministic half of the card.**

## THE SECOND CAUSE — THE CARD ONLY EVER GROWS

Measured, character counts by version: 13375 · 15263 · 20948 · 26886 · 31510 · 36137 · 40327 · 45116 · 50709 · 56489 · 59825 · 62105.

**v12 is 4.64× the size of v1**, mean growth **+4,430 characters per round**, and the card has never once shrunk. Each amendment lands at about three sites — operative, SCOPE mirror, FALSIFIER clause — so forty-two amendments are roughly a hundred and twenty-six sentence insertions. A bigger card gives the next review more surface. The pressure is superlinear; the only counter-force is the reviewer running out of things to find.

## THE THIRD CAUSE — THREE ROUNDS WERE SPENT ON THE REVIEW MECHANISM, NOT THE WORK

`F-S133-CARD-FENCE-IS-SHA256-BUT-THE-SCOUT-READS-MD5-1`, `F-S133-SCOUT-CANNOT-READ-A-CARD-PAST-THE-OUTPUT-CAP-1`, `F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1`. The v7 round was FAILED on the review card rather than on the work. All three are the Architect's defects, all three are now cured, and they will not recur.

## THE PATH — ONE, AND IT IS FALSIFIABLE BEFORE IT IS TAKEN

**Split WEB-VALVE-1 at the seam the amendment history itself drew, and change how the soft half is specified.**

- **WEB-VALVE-1A** — everything the scout has stopped amending: redirects, the SSOT split, the result cap, the clock, the containment third value, the union mirrors, valve freshness, the panel citations. These clusters generated no amendment in the last three rounds. They are held hostage by a sub-problem they do not depend on.
- **WEB-VALVE-1B** — the `uncited_external` fetchedAt matcher ALONE, and specified as a **FIXTURE CORPUS** rather than prose clauses: a file of labelled answer strings — Turkish and English, slash and dot and ISO and long forms, url-only, longer-number, month-name-absent, `tarih`-present, month-name-in-English-answer — each labelled raise or no-raise, with the pass bar "every fixture passes". The prose clauses stop being the specification. The reviewer then attacks the CORPUS, which is a measurable object, instead of imagining strings against prose, which is not.

This is a card-design decision and therefore the Architect's, not a governance change and not inside the P-6 freeze. It defers nothing: both children are dispatched, so SOTA-1 is not engaged.

**THE PREDICTION THAT TESTS THIS DIAGNOSIS, BEFORE ANY OF IT IS DONE.** `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v12` is in flight and its ORDER B.2 asks the scout whether `tarih` needs an ANCHORED match. If the diagnosis is right, that round returns another date-cluster amendment and the cluster reaches fourteen. If it returns a PASS with no amendments, the diagnosis is WRONG, the line was one round from done, and splitting it would have been the Architect inventing work. **The round already running settles it, at no cost.** The split is not started until that verdict is read.
