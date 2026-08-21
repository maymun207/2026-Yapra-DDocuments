# PHASE-TYPEGATE-TRUTH-1 · v1

**Closes:** `BUG-022` — queue position 2.
**Lane:** Author = AG. **Migrations: ZERO.** **Product code changes: expected ZERO
— see §2.3.**
**Anchor:** `origin/master` = `5858ce8c2a32940313bdf3c20b3dd9374ca8ffb4`.

---

## §0 · BOOTSTRAP

```bash
rm -rf /tmp/typegate && git clone https://github.com/maymun207/cwf_yaprak.git /tmp/typegate
cd /tmp/typegate && git fetch --all
git rev-parse origin/master   # MUST be 5858ce8c2a32940313bdf3c20b3dd9374ca8ffb4
ls supabase/migrations | wc -l   # 67
```
**S80-1:** absolute paths. **Branch `phase/typegate-truth-1`; push AND open a PR.**
**Baseline: 457 files / 5173 tests.**

**This phase's evidence is a BUILD LOG, which CI does not show you.** Every claim
about what Vercel does must come from a deployment's build log for a named SHA —
the PR's own preview deployment is the instrument. Say which deployment you read.

---

## §1 · THE DEFECT, AND THE FAILED FIRST ATTEMPT

Every production build prints ~22 `TS2339` errors from the **serverless
function compile** — and completes, and deploys. The project's own checks in the
same build are clean: `tsc -b`, `typecheck:api` (both `tsconfig.api.json` and
`tsconfig.api.test.json`), `gen:arch-facts`, `vite build`, `check:doc-drift`.

**Every error is a discriminated-union narrowing failure** — reading `.reason`
off `{allowed:true} | {allowed:false; reason:string}` and friends, across
`governance.ts`, `recordSyncHealth.ts`, `bulk-publish.ts`, `synthetic-traffic.ts`,
`chat.ts`, `stageStream.ts`, `stageClarify.ts`, `memoryDistill.ts`,
`stageTools.ts`, `gatewayPolicy.ts`. **That narrowing requires
`strictNullChecks`.** Under the project's own strict configs the same code
type-checks clean, which is why `typecheck:api` passes in the same build.

**A remedy was already shipped for exactly this, and it has never worked.**

```
a7af3b3 · 2026-07-07 · fix(tsconfig): strict:true on root config
                       so @vercel/node checks api under strict (BUILD-CLEANUP-2)
```

`tsconfig.json` carries `"strict": true` and a docblock naming `@vercel/node`'s
per-function typecheck as the target. **189 merges later the errors are
unchanged.** So `strict` in the root config is **not** the lever — that is
already-tested ground and this phase must not re-try it.

**Two structural facts, read at this anchor:** the root config is a *solution*
file (`"files": []`, references to app + node only, so `api/**` is in no
reference), and **there is no `api/tsconfig.json`.**

---

## §1.1 · THE ARCHITECT'S HYPOTHESIS — labelled, because it is not yet a fact

> **`@vercel/node` type-checks each function as a standalone program under
> compiler DEFAULTS, reading no project tsconfig at all.** If so, no `strict` in
> any config file can reach it, and the 2026-07-07 remedy was a correct diagnosis
> attached to the wrong lever.

**S81-4:** this is the Architect's reading, not a verified behaviour. **G1
exists to test it, and if it is false the rest of this brief is rewritten by you,
not worked around.**

---

## §2 · GATES

### G1 — establish WHY the existing remedy is inert, by running it

Do not reason about it; produce evidence. Suggested probes, and name which you
used:

- Compile one offending file the way a standalone check would —
  `npx tsc --noEmit api/cwf/_lib/knowledge/governance.ts` — and compare with
  `npx tsc -p tsconfig.api.json`. **If the first reproduces `TS2339:420,102` and
  the second is clean, the hypothesis holds at the compiler level.**
- Then establish what Vercel actually does: `@vercel/node`'s own documented
  behaviour for TypeScript functions, and whether it accepts a config binding or
  a skip flag. **Cite the source you read.**

**Report the finding even if it kills §1.1.** A wrong hypothesis discovered here
costs one paragraph; the same hypothesis discovered after a fix costs a phase.

### G2 — the fix, and the choice is CONSTRAINED, not free

Given G1, exactly one of these is right. **Pick by evidence and say why.**

- **(a) BIND** — give the function compile the project's strict options
  (`api/tsconfig.json` extending `tsconfig.api.json`, or whatever G1 shows the
  builder honours). Preferred **if it works**, because the check keeps existing.
- **(b) RETIRE** — turn the function-layer typecheck off and let CI's
  `typecheck:api` be the sole arbiter. Correct **if G1 shows the builder cannot
  be bound**.

**FORBIDDEN, and this is the part that matters:**
- **Do not change product code to satisfy a checker running under options the
  project does not use.** Rewriting sound discriminated unions to appease a
  non-strict compiler would corrupt the source to quiet a broken instrument.
- **Do not silence the output while leaving the check running.** Quiet-and-deaf
  is worse than loud-and-deaf.
- **Do not re-apply `strict` to the root config.** Tested, inert, 189 merges.

### G3 — THIS IS NOT REMOVING A GATE, AND THE PHASE MUST PROVE IT

If (b) is chosen, the phase's headline risk is that it looks like sweeping the
problem away. **Kill that reading with evidence, in the same phase:**

1. **Plant a REAL type error** in an `api/**` file — one that is wrong under
   `strict` too, not one of the 22 false ones.
2. **Show CI's `typecheck:api` goes RED on it.** That is the gate that has teeth
   and always had.
3. **Revert, show green, and prove the revert** (`grep -c` on the planted marker
   returns 0).

**A check that never failed was never a gate.** What this phase removes is an
instrument that reports; what it keeps is the gate that stops. Both halves must
appear in the report.

### G4 — the baseline is MEASURED, never a constant

AG counted 18 distinct `error TS` lines through the log API; the Architect
counted 22 reading the full pasted log. Most likely a windowing artefact —
**and neither number may be hard-coded anywhere.** If any check keys on a count,
it derives that count in the same run. **A fixture nobody re-derives is the same
defect class as a bound nobody sweeps** — which is precisely what `AXIS-TRUTH-1`
spent its effort removing.

**Positive control on the count itself:** whatever enumerates the build log must
demonstrate, in the same run, that it can see a line it was shown — otherwise it
is the fifth harness false-green of the week.

### G5 — S82-2 on this phase's own apparatus

Every harness states its red/green control. Four false-greens have been caught in
this repo this week: a truncated `tail`, an inert ESM `vi.spyOn`, an unquoted
`zsh` glob returning a false-zero census, and an unquoted `zsh` scalar making a
mutation sweep measure nothing. **Assume yours is the fifth until shown
otherwise.**

---

## §2.3 · WHAT SUCCESS LOOKS LIKE IN THE BUILD LOG

The next production build prints **either** zero function-layer type errors
(because they were never real and the compile now runs under the project's
options), **or** no function-layer typecheck at all (because it was retired) —
and in both cases `typecheck:api` still runs, still passes, and still reds on a
planted real error.

**Product source is expected to be byte-unchanged.** If your fix requires
touching `api/**` product code, stop and report it — that is a different phase
and probably the wrong one.

---

## §3 · DOCS & DRIFT

Build configuration maps to no narrative tab (`AXIS-TRUTH-1` proved
`src/components/ui/**` maps to none; check whether build config does). Expectation
— falsifiable: **no drift, no reseal, docVersion unchanged.** Name what actually
happens.

---

## §4 · REPORT

1. HEAD, PR URL. 2. Four required CI gates named with conclusions. 3. Test counts
as CI prints them. 4. **G1's evidence, with the commands and the source you
cited** — and whether §1.1 survived. 5. Which of G2 (a)/(b) and why, in one
sentence. 6. **G3's four outputs**: planted error, CI RED, reverted, CI GREEN.
7. The build log of the PR's preview deployment, before and after, with the
deployment ids named. 8. Anything in §1–§3 that is wrong. The Architect has made
nineteen premise errors in three days and **three of them were in the last phase
brief**, all imported from frozen bug entries rather than read at the anchor.

---

## §5 · POST-DEPLOY PROOF (S63-1)

After merge and convergence: the production build log for the new SHA, showing
the function-layer errors gone or the check retired, **with `typecheck:api` still
present and passing in the same log**. Named SHA, named deployment.

**BUG-022 closes there, not at merge** (BUG-CARRY-1 rule 4).

---

## §6 · OUT OF SCOPE

The `OUTAGE-WINDOW-1` proofs (BUG-019/002/007) — owner-scheduled, independent ·
BUG-020 burst guard · BUG-021 schema learning · BUG-023 · BUG-024 · BUG-012 ·
**and every one of the 22 errors as an error**: they are false under the
project's own options and are not to be "fixed" one by one.

<!-- END · PHASE-TYPEGATE-TRUTH-1-v1 · closes BUG-022 on proof · zero migrations -->
