# GO — TYPEGATE-TRUTH-1 MERGE · v1

**Branch:** `phase/typegate-truth-1` · **HEAD:** `52aec3a98eac7cedbf77fa3745a0b4bdfa3527aa`
**Anchor:** `077b2c1b616201dabbde3aaeffbdb63b339176e4` (= `merge-base`, verified)
**PR:** #160 · **Closes on proof:** `BUG-022`

**RULE-25 review on a fresh clone:** HEAD, merge-base, **6-file diff, 721
insertions and ZERO deletions**, zero migrations, **zero product code** (`api/**`
non-test `.ts` files touched: 0 — §2.3 held), 4 `it()` blocks in the new guard,
and `api/tsconfig.json` read in full.

**The new relay convention worked on its first phase.**
`docs/relay/PHASE-TYPEGATE-TRUTH-1-report.md` arrived on the branch, 511 lines,
and was read in the same clone as the code. **Round-trips this phase: zero.**

---

## STEP 1 — BLOCKING. Re-read CI.

```bash
gh run list --repo maymun207/cwf_yaprak --commit 52aec3a98eac7cedbf77fa3745a0b4bdfa3527aa --json name,status,conclusion
```
**PASS: `build (20.x)` · `build (22.x)` · `coverage` · `rule26` all `completed` +
`success`.** `eval-canary` = `skipped` on the PR plane, **not a pass**.

---

## STEP 2 — MERGE `--no-ff`, message VERBATIM

```bash
git checkout master && git pull --ff-only
git merge --no-ff 52aec3a98eac7cedbf77fa3745a0b4bdfa3527aa -F -
```

```
merge: TYPEGATE-TRUTH-1 — the remedy was right and something threw it away

Every production build printed ~26 TS2339 errors from the serverless function
compile and deployed anyway. On 2026-07-07, a7af3b3 diagnosed this correctly and
shipped the fix: strict:true on the root tsconfig, "so @vercel/node checks api
under strict". It never worked, and for 190+ merges nobody found out, because the
only artefact that would have falsified it is a build log and nobody reads those.

THE REMEDY WAS NOT IGNORED. IT WAS READ, AND THEN DISCARDED.
@vercel/node resolves its per-function typecheck config with
ts.findConfigFile(<entrypoint>), which walks UP from the function's directory —
so it DID read the root tsconfig and it DID read the strict:true that commit
added. Then fixConfig() (@vercel/node@5.8.22, dist/index.js:72215), seeing no
`module` key beside it, does this:

    if (config.compilerOptions.module === undefined) {
      config.compilerOptions.module = 'NodeNext';
      config.compilerOptions.moduleResolution = 'NodeNext';
      config.compilerOptions.strict = false;
    }

Right file, right key, missing sibling. Narrowing off, every discriminated union
in api/** mis-reported as a missing property. The build survived only because
noEmitOnError is unset: loud, and deaf.

AND THE OBVIOUS FIX IS A SILENT NO-OP, WHICH IS THE PART THAT MATTERS.
fixConfig runs on the RAW, un-extended compilerOptions, before
parseJsonConfigFileContent resolves `extends`. So an api/tsconfig.json saying
only { "extends": "../tsconfig.api.json" } still looks module:undefined, the
clobber fires, and the injected strict:false lands on the CHILD and beats the
parent. AG ran all three variants rather than reasoning about them: V1 resolves
to strict:false and would have reproduced a7af3b3 exactly — a second inert fix
shipping green. api/tsconfig.json therefore RESTATES module/moduleResolution as a
restatement, never an override, and a four-test net (5 mutations, 5 killed) reds
if anyone removes them on the grounds that the parent already sets them.

BIND, NOT RETIRE — AND THE BRIEF'S OWN HYPOTHESIS DECIDED THE OTHER WAY.
§1.1 guessed the builder read no project config and used compiler defaults. Under
that hypothesis the only remedy was to RETIRE the check. It is false, so BIND
works and the instrument survives instead of being switched off. A labelled
hypothesis cost one paragraph; an unlabelled one would have cost the check.
Build log: 26 -> 0 under the same errorsOnly filter, both views reaching Build
Completed, with typecheck:api still running and passing in the same log. Preview
dpl_3FrWBrA4rv3aZyGkPCy5KH7ZLS2J READY.

THE CONTESTED COUNT IS SETTLED AND IT WAS NOT A WASH. Replaying 5858ce8c gives 23
in-tree and 22 build-visible: the Architect's 22 was right and the 18 was a
truncated log read. The +4 to 26 is recordSyncHealth.ts growing under
HEALTH-TRUTH-1 — the same drift that made G4 forbid hard-coded baselines.

FOUR PREMISES PROVED FALSE, ALL BY AG, NONE RELAYED. Besides §1.1 and the count:
vercel.json IS a codeArea of the Runtime Topology tab, so build config is partly
tab-mapped and only the tsconfig layer is not. And RULE 14's "tsc -b is
src+shared-only" is stale — 185 of 302 api/*.ts files are in that program via
test imports, so the first G3 plant red'd tsc -b rather than typecheck:api and
was moved to one of the 117 files where typecheck:api is the only gate. A control
that reds on the wrong gate proves the wrong thing.

TWO INSTRUMENT DEFECTS FOUND EN ROUTE, NEITHER FIXED HERE, BOTH NAMED.
check:tenant-zero's verdict depends on whether a build ran first: it scans the
working tree, and public/architecture/changelog.md is gitignored and
build-generated, so a pristine anchor produces a FALSE RED. A clean-anchor
control alone would have let this phase report a phantom master defect. And
`git checkout -- <file>` handed a COMMITTED plant straight back with exit 0 and
no output — a third variant of the recorded trap, and the opposite cause from the
untracked one caught last phase.

Product source is byte-unchanged: zero api/** non-test .ts files touched, zero
migrations, 67 before and after, no docVersion change. Six files, 721 insertions,
zero deletions.

Round-trips to the Architect this phase: ZERO. S81-4's labelling convention was
minted two phases ago for exactly this and it is now measured, not assumed.

BUG-022 does NOT close here. BUG-CARRY-1 rule 4: the proof is the production
build log for the merged SHA.
```

Then `git push origin master`, and prune `phase/typegate-truth-1` local + remote.

---

## STEP 3 — Convergence

`list_deployments` → `state=READY`, `target=production`, `githubCommitSha` = the
new merge SHA. Name the `dpl_…`.

---

## STEP 4 — POST-DEPLOY PROOF (S63-1). **AG takes this one — no owner action.**

Read the **production** build log for the merged SHA and report:

1. **Zero function-layer `error TS` lines**, under the same `errorsOnly` filter
   used to count 26 before. **State the filter** so the two counts are comparable.
2. **`typecheck:api` still runs and still passes in the same log** — this is the
   half that proves nothing was switched off to buy silence.
3. The deployment id and SHA, named.

**Positive control, and it is not optional:** the count must be **derived in the
same run**, not asserted. G4's whole point was that 22/18/23/26 all referred to
the same defect at different moments.

**Then BUG-022 closes in `REGISTER-BUG-BUCKET-v20`** with the SHA, the deployment
id and the measured zero.

---

## STEP 5 — Carried to v20, so nothing is swept

1. **`check:tenant-zero` false RED on a pristine anchor** — build-generated,
   gitignored file. Same class as BUG-015: an instrument whose verdict depends on
   unstated state.
2. **`git checkout --` third variant** — committed plant returned silently, exit
   0. Sixth harness false-green of the week, and the counter-example to the
   untracked-file variant recorded last phase.
3. **RULE 14 stale** — `tsc -b` covers 185 of 302 `api/*.ts` via test imports.
   Any future control plant must name **which** gate it reds.

---

## STEP 6 — OUT OF SCOPE

`GATEWAY-BURST-GUARD-1`/BUG-020 is next · `TOOL-EARNED-TRUST-1`/BUG-021 ·
`PROSE-RENDER-PARITY-1`/BUG-023+027 · BUG-024 · BUG-012 · and **the 26 errors as
errors** — they were false under the project's own options and none of them was
"fixed".

<!-- END · GO-TYPEGATE-TRUTH-1-MERGE-v1 -->
