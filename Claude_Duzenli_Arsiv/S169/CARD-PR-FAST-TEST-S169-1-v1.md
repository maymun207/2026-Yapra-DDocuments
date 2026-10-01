<!-- relay-audit: v1 kind=card -->
CARD-PR-FAST-TEST-S169-1-v1

STATUS: v1 for scout pre-review (§12.1, NEW subject); v2 goes to AG-1.
LANE (after pre-review): AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 card" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:01Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (8d452df354e8ed98c479f6f1cdecfbc61c7ed34b at 03:28:44Z). .github/workflows/build-test.yml (stale-clone read, re-measure): triggers push(master, paths-ignore docs/** .agents/**) · pull_request · merge_group · workflow_dispatch; job `changes` step "Decide what this diff can break" emits heavy/ui/reason (PHASE-CI-DIET-1): non-pull_request events → full suite "by law"; migrations → full; src/public/e2e/vite/playwright/package* → full; docs-only → skip. Job `build` (required context `build (24.x)`, ruleset master-merge-gate, NO job-level if:) runs "Run tests" = `npm run test` (vitest run, whole suite) when heavy=true.
ON-DISAGREEMENT: if the workflow is not shaped as above, quote what is and stop.
WHY: owner, 2026-10-01 06:54–07:00 TSİ: a full ~10.5k-test run (Run tests 16m28s, job 17m57s) on every PR is the factory's bottleneck; CWF is not delivered yet and finishing the product is the priority (OWNER-DESIGN-S169-PRIORITY-1). Plain words: a PR should wait only for the tests its change can break; the whole suite keeps running after every merge on master and stops the line when it goes red.
AUTHORITY: OWNER-RULING-S169-PR-FAST-TEST-1 ("onay PR-hizli-test", 2026-10-01 07:00 TSİ). It AMENDS S37-2 ("unsharded CI at the PR head is the sole test referee"): the PR head runs the AFFECTED tests; the FULL suite runs on every push to master and on every merge_group, and a red full run on master stops landings until fixed.
NO CRON TASK. GRAFT FIRST: graft/.graph/wiring.json and graft node cards; `git grep` only for what graft does not index (workflows are not indexed). SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — CI only; say so in the report.

## WORK
P1. In job `changes`, add an output `tests` = `related` | `full` (+ the reason). `related` ONLY when ALL hold: event is pull_request; heavy=true; no changed file matches the full-suite list. FULL-SUITE LIST (any match → full): every existing full-suite rule (migrations, src/public/e2e/vite/playwright/package*), plus vitest.config.*, vitest.exam.config.*, src/test/**, tsconfig*.json, .github/**, scripts/** used by tests as fixtures if you cannot prove otherwise, and ANY UNMEASURED branch (fail-safe stays full).
P2. In job `build`, "Run tests": `tests=full` → `npm run test` exactly as today; `tests=related` → `npx vitest related --run <changed non-test source files>` PLUS every changed test file run directly. If the related set is EMPTY, run nothing and print why. Print the command and the file count. The step NAME and the job NAME stay unchanged (required context `build (24.x)`).
P3. Master and merge_group: untouched — full suite every time. Prove it from the YAML (quote the lines).
P4. THE STOP: master red stops landings. Do it WITHOUT a new required context (ruleset is the owner's surface): add to docs/ground/AUTO-MERGE-LANDING-v1.md (or the scout landing procedure it names) the rule that a scout posts adversary/scout SUCCESS only after reading master's latest completed "Build and Test" push run by full sha; if it is `failure`, the scout posts nothing except on a PR whose title starts with `fix-master:`. Quote the rule in the report.
P5. Record the ruling: append OWNER-RULING-S169-PR-FAST-TEST-1 (owner words, date, what it amends) where this repo records owner rulings on law (find the home; if it is docs/laws/log.md, append there; the law corpus never shortens).
P6. Proof: (a) a PR touching one api file shows tests=related and runs a small set (print count + seconds); (b) the same PR touching vitest.config.ts shows tests=full; (c) planted fault: break one assertion in a test that imports the changed api file → the related run goes RED; revert. Use THIS PR's own CI runs; read them by full head sha.
FENCE: .github/workflows/build-test.yml · docs/ground/AUTO-MERGE-LANDING-v1.md (P4 rule only) · the law log file of P5 · docs/relay/PR-FAST-TEST-S169-1-AG1-report.md.
ORDER WITH OTHER WORK: CARD-CI-SPEED-S167-1-v2 (AG-3, vitest.config.ts) and CARD-TEST-CLEAN-TREE-S169-1-v2 (AG-4) are in flight; fences are disjoint. A PR touching vitest.config.ts gets tests=full under P1, so CI-SPEED's own measurement is unaffected.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). Worktree `phase/pr-fast-test-s169-1` at master.
2. P1–P3, first commit + push + `gh pr create --base master` within 10 minutes; print PR number + head 40-hex.
3. P4–P6, report, commit (`git commit -F <file>`), push.
4. Slip SLIP-CARD-PR-FAST-TEST-S169-1 (bus; `[AG-1]`, `GRAFT:`, `PROMPTS:`). Remove worktree. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 60 min. A refused command → write it in the slip, never route around it, never wait silently.
FORBIDDEN: renaming any job or the "Run tests" step; touching the ruleset, branch protection or required contexts; dieting master or merge_group runs; --force; merging; cron; printing an environment value.

END · CARD-PR-FAST-TEST-S169-1-v1
