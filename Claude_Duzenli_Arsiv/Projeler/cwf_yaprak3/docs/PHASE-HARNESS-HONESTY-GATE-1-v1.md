# PHASE-HARNESS-HONESTY-GATE-1 · v1 — Wave 3 · Lane AG-2 (B) · Item #7 (BUG-015 + W-026 ×5)

<!-- Self-contained (S54-3 / D-2). You cannot see the Claude project; everything
     you need is in this file + the repo. This phase puts a GATE on the
     INSTRUMENT class of defect: a test/verification harness that reports
     success while having measured nothing. -->

## PRECONDITION (S47-1)
Fresh FULL clone of `maymun207/cwf_yaprak`, branch from `origin/master`.
Wave-3 floor at prompt time: `1b7f8dd9490b8943e730e4e4175223385ec54dae`.
If master has moved (sibling lanes merge in this wave, order = whoever is
ready): rebase and re-run. Absolute paths everywhere (S80-1).

## THE DISEASE (owner-ruled record, verbatim where quoted)
BUG-015, INSTRUMENT class: a test instrument reports success without measuring
anything ("8/8 SURVIVED" while ZERO mutants had been injected). Birth examples:
(1) a `tail`-truncated read that cut off the very lines carrying the defect,
(2) an ESM `vi.spyOn` idle spy that never intercepted anything yet the assert
passed, (3) a zsh unquoted scalar that emptied the mutant list → 8/8 SURVIVED
over zero mutants. Recurrence W-026 (recorded ×5): `scripts/checkTenantZero.ts`'s
verdict depends on whether the build ran / on working-tree state — a
`git checkout --` over a committed plant exits 0 silently.
The law (S82-2) exists in writing but has NO GATE — "a law without a gate is a
sentence in a document."
**Owner's finish definition (verbatim):** "Bir test 'geçti' diyorsa, o testin
kızarabildiği aynı koşuda kanıtlanmış oluyor — bana söz vermesi yetmiyor."
This does not close by being more careful. It closes with an INSTRUMENT.

## GOALS

**G1 — The self-test contract (`scripts/harnessSelfTest.ts`, new).**
A small shared library + a documented convention. An ENROLLED instrument
supports a `--self-test` flag which, in ONE invocation:
1. runs the instrument's detection path against an EMBEDDED planted-defect
   scenario and PROVES it goes red (non-zero verdict internally),
2. runs it against an embedded clean control and PROVES it stays green,
3. prints exactly `[SelfTest] red=proven green=proven` and exits 0 — any other
   combination exits non-zero with the failing direction named.
The library provides the runner/report helpers so enrolling an instrument is
mechanical, not creative. The planted defect must travel THROUGH the
instrument's real read path (a self-test that bypasses the read path proves
nothing — that is example (1)'s disease reborn).

**G2 — The CI gate (`api/cwf/__tests__/harnessHonestyGate.test.ts`, new).**
Runs under the normal vitest suite (NO `.github/workflows` edits, NO
`package.json` edits — the vitest suite is the carrier; both files are
single-writer resources you must not touch this wave). The gate:
- holds a CLOSED REGISTRY (in `harnessSelfTest.ts`) of enrolled instruments —
  this phase enrolls **`scripts/checkTenantZero.ts`** (the named W-026
  delivery);
- spawns each enrolled instrument with `--self-test` and asserts exit 0 + both
  `red=proven` and `green=proven` markers on stdout;
- **structural coverage, both directions:** any `scripts/check*.ts` or
  `scripts/verify*.ts` file that is neither ENROLLED nor listed in the frozen
  file `scripts/HARNESS-NOT-YET-ENROLLED-v1.txt` → RED, naming the file. You
  CREATE that frozen list in this phase by enumerating the current
  un-enrolled inventory (compute it with `ls`, do not recall it); its header
  states it is a FROZEN debt list — additions are forbidden (the gate treats a
  new un-enrolled instrument as red), removals happen as instruments enroll.
  This mirrors the effective-body/historical-exemption ruling of the
  bare-delete gate: history is enumerated once; the future is gated.

**G3 — W-026 fix (`scripts/checkTenantZero.ts`).**
Read the script first and bind the exact seam where the verdict depends on
build/working-tree state. Required behaviour after the fix:
- If the measured input (the built artifact set / expected inputs) is ABSENT or
  provably STALE, the script exits **2 MEASUREMENT-REFUSED** with an explicit
  line naming what was missing — NEVER exit 0. "Could not measure" and "clean"
  must be different exits (MEASURE-READ-HONESTY-1 applied to an instrument).
- `--self-test` (enrollment, G1): plants a tenant literal through the real read
  path → must redden; simulates the missing-input condition → must REFUSE
  (exit-2 path proven), not pass.

**G4 — The three birth examples, re-run under the gate, all three RED.**
Under `api/cwf/__tests__/fixtures/harness-honesty/`, build three miniature
harness fixtures embodying shapes (1) tail-truncated read, (2) idle spy,
(3) emptied-input "N/N over zero". The gate's unit layer runs each fixture's
self-test and asserts ALL THREE fail it (the acceptance clause: "üç doğum
örneği kapı altında yeniden koşulunca ÜÇÜ DE kızarmalı"). Plus one COMPLIANT
toy fixture that passes — D-5 both directions inside the phase.

**G5 — D-5 dismantle check.** One test variant removes/neutralises the planted
defect inside a fixture's self-test and asserts the gate calls THAT self-test
dishonest (a self-test that cannot redden is itself red). The gate must be
unable to be satisfied by a self-test that skips step 1.

## SCOPE NOTE (named, for the register)
This phase ships the MECHANISM + enrolls checkTenantZero + freezes the
un-enrolled inventory BY NAME. Enrollment of the remaining instruments is
follow-up work carried by the frozen list (visible debt, gate-guarded in both
directions from day one). BUG-015's class-closure verdict belongs to the
Architect's register, not to this phase's merge.

## OUT OF SCOPE (do not touch)
`package.json` · `vercel.json` · `.github/workflows/**` · `supabase/migrations/**`
(this lane creates ZERO migrations) · `shared/dbConstants.ts` ·
`api/cwf/_lib/**` production code (your fixtures live under `__tests__`) ·
`scripts/relayAudit*` (AG-3's file) · `scripts/checkDocDrift.ts` /
`docDriftCore.ts` / `reseal.ts` (seal machinery is out of your fence entirely).
Sibling lanes own: census/turn files (AG-1), relay-audit files (AG-3),
frame-forcefit lens files (AG-4). Your diff must not intersect theirs.

## SEAL LAW (S95-1 + Footgun-6)
Never bump docVersion during build. Your files (scripts/ + __tests__) may fall
outside the sealed globs — report the honest `npm run check:doc-drift` state
either way. If red from your own files: ONE provisional reseal as the last
build commit, message `chore(seal): PROVISIONAL reseal for CI — DROP AT MERGE`;
at merge turn (after GO) it is dropped and the seal is pressed on the rebased
tree by the wave procedure. You do NOT hold the wave's seal token (AG-1 does).

## DELIVERY (S91 completeness gate)
- Branch **`phase/harness-honesty-gate-1`** · PUSH to origin · open a **PR
  against master** (unsharded CI on the PR head is the arbiter, S37-2).
- Report: **`docs/relay/PHASE-HARNESS-HONESTY-GATE-1-report.md`** with:
  `git diff --name-only origin/master...HEAD` VERBATIM in a fence · the frozen
  not-yet-enrolled inventory VERBATIM (it goes into the register by name) ·
  the machine-verifiable birth proof as ONE command the reviewer can run
  (`npx vitest run api/cwf/__tests__/harnessHonestyGate.test.ts`) whose fixture
  set demonstrates red↔green in both directions · the checkTenantZero
  before/after seam, quoted · any deviation, by name.
- Then **STOP**. No merge without the Architect's GO.

<!-- END · PHASE-HARNESS-HONESTY-GATE-1-v1 -->
