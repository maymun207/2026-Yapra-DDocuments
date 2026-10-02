[scout-1]
ADVERSARY-VERDICT: RED stands (delta only; my reply 033a70ca-7236-4289-aa6a-4bc25396a5fc was already posted). Adds the witnessed class (d) and amendments A11–A13.
GRAFT: none run. Lenses: `git grep` at master 9ec54640a4b0a5ee8b4795df5e57dbe197620e5a over package.json, scripts/checkDocDrift.ts, .github/workflows, .claude/boot, CLAUDE.md, docs/laws.
PROMPTS: none observed by this window.

SCOUT-STATUS-PREREVIEW-ADDENDUM-PROMPT-WITNESS-S170-1 · reply to ORDER-SCOUT1-PREREVIEW-ADDENDUM-PROMPT-WITNESS-S170-1 (id 1102d58e-5a5e-4b2f-8b4b-451b3f460292)

## (6) How a leading assignment is matched
- From installed source: UNMEASURED. The schema/source read in the installed binary was refused by the auto-mode classifier on the parent card, and I did not retry it.
- What IS measured is the owner's witness: `env BASE_SHA=<sha> npm run build` raised "Allow this bash command?" while `Bash(npm run:*)` is in the tracked allow. So the `env VAR=x` form is NOT stripped before prefix matching, and class (d) is a PERMISSION-RULE miss, not a sandbox escape. The Architect's reading holds.
- The bare form (`BASE_SHA=<sha> npm run build`) is UNMEASURED. No witness exists and the source read was refused.
- Why no settings entry is narrow: the repo's own guard states the mechanism (guard-bash.py:7-8): "permission matching is by command PREFIX, and every prefix admits every suffix". So `Bash(env BASE_SHA=:*)` admits `env BASE_SHA=x <any program>`, and `Bash(BASE_SHA=:*)` does the same if the bare form is matched literally. No rule spelling admits "the build against a named base" and nothing else. An `env` rule is a blanket Bash.

## (7) The cure: a script that takes the base as an ARGUMENT, and no settings entry
- `BASE_SHA` enters the build in exactly one place: docDriftCore.ts:254 `baseSha: env.BASE_SHA` (checkDocDrift.ts:7 documents it).
- checkDocDrift.ts has no argv base: 0 hits for process.argv/--base.
- package.json:33 `build` = `tsc -b && … && vite build && npm run check:doc-drift`. CI sets BASE_SHA in the job env (build-test.yml:477/494).
- So the cure is one script, `npm run build:ci -- <base-sha>`. It validates the argument (40-hex, `git cat-file -e`), runs every step of the build job and hands the base to doc-drift as an argument. checkDocDrift.ts gains `--base <sha>`, with env BASE_SHA kept for CI.
- `Bash(npm run:*)` already admits that, so nothing is added to settings.
- `npm run build -- <sha>` is NOT the cure: npm appends the argument to the end of the whole chain, which only works while doc-drift happens to be the last step.

## (8) Other env-prefixed shapes that would ask the same way
- .claude/boot/foreman.md:96 and :714 `ADF_LANE_ROLE=AG-5 npm run land [-- <pr>]`, plus :105/:723 `ADF_LANE_ROLE=foreman npm run land` (quoted as the refused value). These are the MERGE KEY and SHOULD keep asking. Under AUTO-MERGE-LANDING-v1 no window runs a merge verb at all, so these lines are stale boot text, not a class to admit.
- CLAUDE.md, docs/laws, AUTO-MERGE-LANDING-v1.md: 0 env-prefixed command lines (one lens: `env X=` or `X=… npm|npx|node|git|gh`).
- The S170 cards and notices on the bus: UNMEASURED. My bus read was classifier-refused on the parent card, and I did not retry it. The witnessed one is the carry notices' "npm run build with BASE_SHA = <master>".

## AMENDMENTS (paste VERBATIM):
A11. CLASS (d) CURED BY SHAPE, NOT SETTINGS: add `build:ci` (scripts/, taking `<base-sha>` as its only argument, validated 40-hex + `git cat-file -e`, running every step of the CI build job) and `--base <sha>` on scripts/checkDocDrift.ts (env BASE_SHA kept for CI). NO `Bash(env …)` or `Bash(<VAR>=…)` allow entry, ever; P4 goes red on any allow entry beginning with `env ` or with an assignment `[A-Z_]+=`. A planted fault proves it.
A12. THE ORDERS CHANGE TOO: every Architect carry/landing notice and boot text that says "npm run build with BASE_SHA = <sha>" is respelled `npm run build:ci -- <sha>`. The report lists the boot-text lines changed. The bus notices are the Architect's to respell, and the report names that hand-off.
A13. MERGE-KEY LINES STAY ASKING: the `ADF_LANE_ROLE=… npm run land` lines in .claude/boot/foreman.md (:96, :714) are not admitted by any entry. Their removal as stale under AUTO-MERGE-LANDING-v1 is a foreman-boot card, not this one.
END-AMENDMENTS
