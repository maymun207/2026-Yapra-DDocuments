# PHASE-TYPEGATE-TRUTH-1 · v2

**Supersedes v1** (anchored at `5858ce8c`, never issued). **Closes:** `BUG-022`.
**Lane:** Author = AG. **Migrations: ZERO.** **Product code changes: expected
ZERO — see §2.3.**
**Anchor:** `origin/master` = `077b2c1b616201dabbde3aaeffbdb63b339176e4`.

---

## §0.0 · NEW STANDING INSTRUCTION — the relay shortens here, starting now

**Effective this phase and every phase after it:**

> **Write your phase report to `docs/relay/PHASE-<NAME>-report.md`, on the
> branch, in the same push as the work.** Same content and same rigour as today —
> do not summarise it, do not shorten it. After merging, **append** the merge
> report to the same file under a `## MERGE` heading.

**Why.** The Architect already clones your branch for RULE-25. Putting the report
there means it arrives with the code, in one read, and gets reviewed by the same
pass. The owner stops being a courier for it: his message becomes *"AG bitirdi"*
instead of a paste.

**This is measured, not assumed.** Today's numbers: your authoring window was
13–44 minutes per phase; the merge-to-merge cycle was 61–195 minutes. The gap is
relay latency, and this removes the largest automatable part of it.

**The other direction is NOT changing and that is deliberate.** The Architect
cannot write repo files, and should not: diagnosis and authorship stay in
separate hands, which is why you caught five of the Architect's false premises
this week before any of them shipped. That separation is worth more than the
minutes it costs.

`docs/relay/` does not exist yet — create it. `.agents/operator-inbox/` is the
existing precedent for a lane mailbox, and `docs/honestbench-harness-0-report.md`
is the precedent for a report living in the repo.

---

## §0 · BOOTSTRAP

```bash
rm -rf /tmp/typegate && git clone https://github.com/maymun207/cwf_yaprak.git /tmp/typegate
cd /tmp/typegate && git fetch --all
git rev-parse origin/master   # MUST be 077b2c1b616201dabbde3aaeffbdb63b339176e4
ls supabase/migrations | wc -l                                   # 67
grep -oE '"docVersion"[^,]*' public/architecture/manifest.json   # rev 195
```
**S80-1:** absolute paths. **Branch `phase/typegate-truth-1`; push AND open a PR**
— `push` fires CI only on master. **Baseline: 460 files / 5210 tests.**

**This phase's evidence is a BUILD LOG, which CI does not show you.** Every claim
about what Vercel does must come from a deployment build log for a named SHA —
the PR's own preview deployment is the instrument. **Name the deployment you
read.**

---

## §1 · THE DEFECT, AND THE FAILED FIRST ATTEMPT

Every production build prints ~20+ `TS2339` errors from the **serverless function
compile** — and completes, and deploys. The project's own checks in the same
build are clean: `tsc -b`, `typecheck:api` (both `tsconfig.api.json` and
`tsconfig.api.test.json`), `gen:arch-facts`, `vite build`, `check:doc-drift`.

**Every error is a discriminated-union narrowing failure** — reading `.reason`
off `{allowed:true} | {allowed:false; reason:string}` and its relatives, across
`governance.ts`, `recordSyncHealth.ts`, `bulk-publish.ts`, `synthetic-traffic.ts`,
`chat.ts`, `stageStream.ts`, `stageClarify.ts`, `memoryDistill.ts`,
`stageTools.ts`, `gatewayPolicy.ts`. **That narrowing requires
`strictNullChecks`.** Under the project's own strict configs the same code
type-checks clean — which is why `typecheck:api` passes in the same build.

**A remedy was already shipped for exactly this, and it has never worked.**

```
a7af3b3 · 2026-07-07 · fix(tsconfig): strict:true on root config
                       so @vercel/node checks api under strict (BUILD-CLEANUP-2)
```

`tsconfig.json` carries `"strict": true` (line 16) and a docblock naming
`@vercel/node`'s per-function typecheck as the target. **190+ merges later the
errors are unchanged.** `strict` in the root config is **not** the lever; that is
tested ground and this phase must not re-try it.

**[READ @077b2c1b]** The root config is a *solution* file — `"files": []` (line
2), references to app + node only, so `api/**` is in no reference — and
**there is no `api/tsconfig.json`.**

---

## §1.1 · THE ARCHITECT'S HYPOTHESIS — labelled, per S81-4

> **`@vercel/node` type-checks each function as a standalone program under
> compiler DEFAULTS, reading no project tsconfig at all.** If so, no `strict` in
> any config file can reach it, and the 2026-07-07 remedy was a correct diagnosis
> attached to the wrong lever.

**Not yet a fact. G1 exists to test it.** The last phase's hypothesis died under
exactly this treatment and cost twenty minutes instead of a phase — that is what
the label is for.

---

## §1.2 · THE COUNT HAS ALREADY MOVED — and it proves G4's rule before you start

Two independent counts of the same build disagreed: **22** (Architect, reading
the full pasted log) vs **18** (AG, enumerating through the log API). Most likely
a windowing artefact.

**And it has moved again since.** **[READ @077b2c1b]** `HEALTH-TRUTH-1` touched
`recordSyncHealth.ts`, which was an error site. Where the `5858ce8c` build
reported **one** `.err` access at line 135, the file now has **three** — lines
157, 158 and 165. The error set almost certainly grew.

**Therefore no count is a fixture.** Whatever this phase builds derives its
baseline **in the same run**. A fixture nobody re-derives is the same defect
class as a bound nobody sweeps.

---

## §2 · GATES

### G1 — establish WHY the existing remedy is inert, by running it

Produce evidence, do not reason. Suggested probes — **name which you used and
cite what you read:**

- Compile one offending file the way a standalone check would —
  `npx tsc --noEmit api/cwf/_lib/knowledge/governance.ts` — and compare with
  `npx tsc -p tsconfig.api.json`. **If the first reproduces `TS2339` at
  `420,102` and the second is clean, the hypothesis holds at the compiler level.**
- Then establish what Vercel actually does: `@vercel/node`'s documented behaviour
  for TypeScript functions, and whether it accepts a config binding or a skip.

**Report the finding even if it kills §1.1.**

### G2 — the fix, and the choice is CONSTRAINED

Given G1, exactly one of these is right. **Pick by evidence and say why in one
sentence.**

- **(a) BIND** — give the function compile the project's strict options
  (`api/tsconfig.json` extending `tsconfig.api.json`, or whatever G1 shows the
  builder honours). **Preferred if it works**, because the check keeps existing.
- **(b) RETIRE** — turn the function-layer typecheck off and let CI's
  `typecheck:api` be the sole arbiter. **Correct if G1 shows the builder cannot
  be bound.**

**FORBIDDEN:**
- **Do not change product code to satisfy a checker running under options the
  project does not use.** Rewriting sound discriminated unions to appease a
  non-strict compiler would corrupt the source to quiet a broken instrument.
- **Do not silence the output while leaving the check running.** Quiet-and-deaf
  is worse than loud-and-deaf.
- **Do not re-apply `strict` to the root config.** Tested, inert, 190+ merges.

### G3 — THIS IS NOT REMOVING A GATE, AND THE PHASE MUST PROVE IT

If (b) is chosen, the headline risk is that it reads as sweeping the problem
away. **Kill that reading with evidence, in the same phase:**

1. **Plant a REAL type error** in an `api/**` file — one that is wrong under
   `strict` too, not one of the false ones.
2. **Show CI's `typecheck:api` goes RED on it.** That is the gate that has teeth
   and always had.
3. **Revert, show green, and prove the revert** — `grep -c` on the planted marker
   returns 0. **Note the footgun you recorded last phase: `git checkout -- <file>`
   silently no-ops on an untracked file**, so a restore can report success and do
   nothing.

**A check that never failed was never a gate.** What this phase removes is an
instrument that *reports*; what it keeps is the gate that *stops*. Both halves in
the report.

### G4 — the baseline is MEASURED, never a constant

See §1.2. If anything keys on a count, it derives that count in the same run.
**Positive control on the count itself:** whatever enumerates the build log must
demonstrate, in the same run, that it can see a line it was shown.

### G5 — S82-2 on this phase's own apparatus

**Five harness false-greens have been caught in this repo this week**: a truncated
`tail`; an inert ESM `vi.spyOn`; an unquoted `zsh` glob returning a false-zero
census; an unquoted `zsh` scalar making a mutation sweep measure nothing; and
`git checkout --` no-opping on an untracked file so a mutation ran dirty. **State
your red/green control and assume yours is the sixth until shown otherwise.**
Also carried from last phase: **`*/30` inside a `/** … */` block terminates the
comment**, and `tsc` then reports an unterminated regular expression pointing
nowhere near the cause.

---

## §2.3 · WHAT SUCCESS LOOKS LIKE IN THE BUILD LOG

The next production build prints **either** zero function-layer type errors
(because they were never real and the compile now runs under the project's
options), **or** no function-layer typecheck at all (because it was retired) —
and in both cases `typecheck:api` still runs, still passes, and still reds on a
planted real error.

**Product source is expected byte-unchanged.** If your fix requires touching
`api/**` product code, **stop and report it** — that is a different phase and
probably the wrong one.

---

## §3 · DOCS & DRIFT

**[HYPOTHESIS]** build configuration maps to no narrative tab. Last phase proved
`src/components/**` maps to none, `api/admin/**` → Governance Model, and
`api/cwf/_lib/backends/**` → three tabs. **Read the tabs and name what actually
drifts.** Also carried: `check:doc-drift`'s `likelyCulprits` is a **heuristic
printed beside a measurement** and blamed six innocent files last phase — if it
blames files you did not touch, disprove it with a clean-anchor control run
rather than arguing with it.

---

## §4 · REPORT — to `docs/relay/PHASE-TYPEGATE-TRUTH-1-report.md`, on the branch

1. HEAD, PR URL. 2. Four required CI gates named with conclusions. 3. Test counts
as CI prints them. 4. **G1's evidence, with commands and the source you cited** —
and whether §1.1 survived. 5. Which of G2 (a)/(b) and why. 6. **G3's four
outputs.** 7. The PR preview deployment's build log, before and after, with
deployment ids named, **and the error count you MEASURED** — not 22, not 18,
whatever your run derives. 8. Anything in §1–§3 that is wrong.
9. **How many question round-trips this phase needed** — that number is now
tracked per phase, because the Architect's premise errors are the most expensive
line item in the cycle and S81-4 exists to reduce it.

---

## §5 · POST-DEPLOY PROOF (S63-1)

After merge and convergence: the production build log for the new SHA, showing
the function-layer errors gone or the check retired, **with `typecheck:api` still
present and passing in the same log.** Named SHA, named deployment.

**BUG-022 closes there, not at merge** (BUG-CARRY-1 rule 4).

---

## §6 · OUT OF SCOPE

`GATEWAY-BURST-GUARD-1`/BUG-020 · `PROSE-RENDER-PARITY-1`/BUG-023+027 ·
`UNIT-TRUTH-1`/BUG-024 · BUG-021 · BUG-012 · the cron's skeleton-row exposure and
the `enabled` divergence, both carried from `HEALTH-TRUTH-1` · **and every one of
the type errors as an error**: they are false under the project's own options and
are not to be "fixed" one by one.

<!-- END · PHASE-TYPEGATE-TRUTH-1-v2 · anchor 077b2c1b · closes BUG-022 on proof -->
