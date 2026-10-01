[scout-1]
ADVERSARY-VERDICT: GREEN (code) pr=672 head=19b4ece1956a90e92aec600df9940dfc12988f28 · WAITING-CI: build (24.x) in_progress at the one read (~05:57Z); no adversary/scout status posted
GRAFT: none new. The mail-wait/laneSlip/authorityMatrix spans were mapped in my pre-review (graft skeleton scripts/laneSlip.mjs). graft indexes the stale local clone, so every line here was read with `git diff 6f545ba8...19b4ece1` / `git show 19b4ece1:<path>` / `git grep 19b4ece1` after `git fetch origin pull/672/head`.
PROMPTS: none.

SCOUT-STATUS-REVIEW-672-S170-1 · reply to ORDER-SCOUT1-REVIEW-LAND-672-S170-1 (id 835f166f-7515-432f-82d3-10ae54982c1c, md5 5db8c62a…, DIGEST-OK)
Head = 19b4ece1956a90e92aec600df9940dfc12988f28 (one commit), as the card says. Base and master are both 6f545ba826349564b9da3ad37317930d05bf7e5c (ls-remote): master has NOT moved, and 671 has not landed.

## Code review against A1–A6: GREEN
- A1: `budgetExitLines(polls, boundary)` returns the existing `[NO-MAIL] budget spent …` line byte-identical, plus `NO_MAIL_RERUN_LINE`. Its only call is at the poll loop's final `return EXIT_NO_MAIL;` (replacing the old console.log). readCard (:958 site) and the `--pre-watermark` return (`below.length > 0 ? EXIT_MAIL : EXIT_NO_MAIL`) are untouched and print neither line. The test pins one call site and one spelling of the re-run text in the file.
- A2: `export function clampBudgetMin(n)` is pure, with BUDGET_CAP_MIN = 110. It is called in main() right after the `--budget-min must be a positive number` validation, and `const deadline = Date.now() + budgetMin * 60_000;` uses the clamped value. `--read` returns before it (`return await readCard(` precedes the clamp). The clamp line prints only `if (clamped && !args.preWatermark)`. parseArgs, KNOWN_FLAGS and DEFAULT_BUDGET_MIN are untouched (no hunk). `git grep args.budgetMin` at head → only the validation and the clamp call, so no unclamped value leaks. The watermark banner now prints `budget=${budgetMin}min` (the used value), and the non-watermark banner prints no budget. Tests: 480→110 clamped, 110→110, 60→60, default 40 not clamped. The placement asserts are structural over the source, which the test says plainly, because main() needs the network.
- A3: laneSlip.mjs has ONE changed line, the usage line (:240), now naming `ci: UNMEASURED dispatched (not watched)`. Line :74, SLIP_FIELDS and the migration are untouched, and busReplyPath.test.ts is not in the diff. The test accepts `ci: UNMEASURED dispatched (not watched)` and refuses `ci: dispatched (not watched)` with FW006, missing ['ci'].
- A4: the `import * as authorityMatrixModule` line AND the cast block are both removed, and `canonicalConformanceDocument` joins the named import list. authorityMatrix.d.mts adds `export declare function canonicalConformanceDocument(doc: string): string;` directly after renderConformanceDocument's declaration.
- A5: the report's FILE-FENCE (:93-100) has 7 paths, equal to pulls/672/files (7). Line 1 is the relay-audit v1 header; it has `## CLAIMS` :16 and `## DIFF` :102.
- A6: report :13 says the FULL suite runs under PR-FAST-TEST and that this is expected.
- CORRECTION accepted: report F-c says CLAUDE.md carries no `480` at this sha. I named CLAUDE.md in A5 without measuring it; AG-1's measurement stands and mine was wrong. The residual is .claude/boot/free.md:231 plus sessionToken.test.ts:43/:114.

## CI at 19b4ece1956a90e92aec600df9940dfc12988f28 (read once, not watched)
changes (merge guard) success · relay corpus success · report-schema success · arm auto-merge success · Vercel success · build (24.x) IN_PROGRESS (not counted). SKIPPED (named): rule26, eval-canary.

## Next
WAITING-CI. When build (24.x) completes, re-send the landing order: code GREEN + green build → stop rule → success.
