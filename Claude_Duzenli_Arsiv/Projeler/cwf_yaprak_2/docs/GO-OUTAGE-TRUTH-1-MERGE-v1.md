# GO — OUTAGE-TRUTH-1 MERGE · v1

**Branch:** `phase/outage-truth-1` · **HEAD:** `b8d4a63b93dba4af6d91b7509def554ccdfb01b5`
**Anchor:** `3fc6a1bc46f2405e24516687a1aa4c8a2e6b089a` (= `merge-base`, verified)
**PR:** #158 · **Closes on proof, not on merge:** `BUG-019` + `BUG-002` + `BUG-007`

**RULE-25 review on a fresh clone, independently recounted:** HEAD, merge-base,
21-file diff with **zero migrations**, `8 + 11 + 10 = 29` new `it()` blocks in the
three new files (+2 in edited ones = the reported +31), zero tenant vocabulary in
the new modules, `answerUnbackedDespiteFailures` present, and **both** of AG's
premise corrections verified at source: `promptFloor.ts` `safety.b1_scope`
carries the refusal text and is tenant-free; `gatewayPreflight.ts` already reads
`ctx.mcpWithheldBackends` at lines 31 and 46 with
`decisionParityBug007LockedDoor.test.ts` present.

---

## STEP 1 — BLOCKING. Re-read CI.

```bash
gh run list --repo maymun207/cwf_yaprak --commit b8d4a63b93dba4af6d91b7509def554ccdfb01b5 --json name,status,conclusion
```
**PASS: all four `completed` + `success`** — `build (20.x)` · `build (22.x)` ·
`coverage` · `rule26`. `eval-canary` = `skipped` on the PR plane, **not a pass**.
`in_progress`/`null` is **not** a pass.

---

## STEP 2 — MERGE `--no-ff`, message VERBATIM

```bash
git checkout master && git pull --ff-only
git merge --no-ff b8d4a63b93dba4af6d91b7509def554ccdfb01b5 -F -
```

```
merge: OUTAGE-TRUTH-1 — the failure reached the client and was dropped there

Twenty-one tool calls failed on one production turn and the answer closed with
the scope-refusal sentence. Nothing about scope had happened. The same disease
had three surfaces: what the USER is told when a backend is withheld (BUG-002),
what the MODEL is told (BUG-007), and what the user is told when calls FAIL
(BUG-019). One phase, three entries kept separate, because writing the same rule
three times is how a rule becomes three rules that drift.

THE PHASE'S FIRST FALSIFIER FIRED, AND IT MADE THE PHASE SMALLER AND WORSE-
SOUNDING AT ONCE. The brief asserted the failure reached only the console and
the model. It did not: rawToolResults carries the {"error":…} payloads to the
client, and toolEvidence.ts:51 ALREADY calls isFailedToolResult() -- and then
continues. It also reached telemetry through stage 7's long-standing toolError.
Nothing here was undiscovered. It was DROPPED, at a line that had already
identified it. That is a worse fact than the one the brief guessed, and it is
the fact.

THE MECHANISM IS "NEVER UNACCOMPANIED", NOT SUPPRESSION, AND THE REJECTED OPTION
MATTERS AS MUCH AS THE CHOSEN ONE. A server-side detector could have matched the
refusal's wording and replaced the answer. It was rejected on two grounds. First,
it would have string-matched a GOVERNED segment, coupling a gate's trigger to
tenant-editable data -- it would go silently blind the day a tenant edited one
word, which is the exact defect class this phase exists to remove. Second, it
would start the server rewriting model output, after which the transcript is no
longer what the model said, and replay, governance and the eval gate all assume
the recorded output IS the output. So the model's text is untouched; the turn
carries a failure ledger; the client renders the disclosure unconditionally, so
a refusal can never appear ALONE; and answerUnbackedDespiteFailures stamps the
contradiction onto the span, so it is MEASURED and not merely visible. ADR-001,
applied exactly: we do not make the lying party honest, we make it harmless --
contained, attributed, quarantinable.

THE DETECTOR'S FOUR BOUNDARIES, EACH RED UNDER ITS OWN MUTATION. 21 failed / 0
succeeded is the contradiction, true. A clean turn is explicitly FALSE, never
absent. A zero-tool turn is false -- that case belongs to the ADR-001 grounding
warning and was not regressed. And one failure beside one success is FALSE:
partly-grounded answers do not count, because inflating the rate would blunt the
instrument that has to justify the next move.

TWO OF THE BRIEF'S PREMISES WERE STALE RATHER THAN WRONG, AND THE DIFFERENCE IS
INSTRUCTIVE. G3 named a code path that does not exist -- the refusal is model
prose, and nothing in api/ writes the final answer; reported before building,
ruled, implemented as ruled. G4 claimed the misroute redirect "never reads"
ctx.mcpWithheldBackends; it has read it since PHASE-BACKEND-LIFECYCLE-
AFFORDANCE-1 G6 shipped decisionParityBug007LockedDoor.test.ts with its own
mutation proof. BUG-002's MODEL half was likewise already done and fenced in its
own test. All three claims were true when their bug entries were written and
false at this anchor: the entries are frozen by rule 2 and AGE while fixes land
around them. Writing a phase from an entry re-imports the entry's age.

THE REAL RESIDUAL WAS PLACEMENT, AND IT IS FIXED WHERE THE STATE IS REACHABLE.
BUG-007's own evidence log records a remedy that could not be proven because the
only path to it was a misrouting model -- on 2026-08-04 three prompted attempts
produced no [GatewayFence] line at all. A remedy whose trigger is model
misbehaviour is a remedy a correct model never fires and we never prove. The
decision now sits at the offer boundary, where the withheld set is already known
at stage 1 and the state can be produced ON DEMAND, in a test and in production.
armesGatewayMisrouteMessage stays byte-unchanged on the healthy path.

NO MIGRATION, AND THE HONEST ALTERNATIVE ALREADY EXISTED AS DATA. safety.b2_
leakage already instructs the model to return a standard system-error sentence.
It had the right sentence available and chose the refusal instead. The new chips
are UI chrome and neither copy nor match any governed wording.

A FOURTH HARNESS FALSE-GREEN, CAUGHT BEFORE IT WAS TRUSTED. The first mutation
sweep printed nothing for five mutants: an unquoted zsh scalar passed the file
list as one argument, so nothing matched and there was no summary line to grep --
the same trap already recorded in this repo twice this week. Re-run with explicit
paths behind a control proving the runner received 3 files / 29 tests.

TWO EXISTING CONTROLS WERE RE-SCOPED, AND THE REASON IS STATED SO IT CANNOT PASS
AS WEAKENING. chatShellToolEvidence G4 compared the whole chip container
byte-for-byte, which would now red on the fix itself, since the container
legitimately carries a failure line. Re-scoped to the evidence line with its
teeth unchanged, and EXTENDED to assert the failed call is accounted for. Both
chatQuotaStream payload contracts gained explicit-zero controls and now name the
forbidden keys -- consumed, limit, actualTokens, args, result -- so they red on
their own cause rather than on a coincidence.

Tests 454/5142 -> 457/5173; +3 files, +31 it() blocks. Zero migrations, 67 before
and after. Drift obeyed by reading the tabs: 5 drifted, 2 redrawn and 3
reseal-only; src/components/ui/** maps to no tab, as AXIS-TRUTH-1 proved.

NONE OF THE THREE ENTRIES CLOSES HERE. BUG-CARRY-1 rule 4. BUG-007's healthy
control arrives on the next ordinary turn; BUG-019 and BUG-002 need one induced
outage window, and they can share it.
```

Then `git push origin master`, and prune `phase/outage-truth-1` local + remote.
The five older `phase/*` branches on origin are **not** in scope — leave them.

---

## STEP 3 — Convergence

`list_deployments` → `state=READY`, `target=production`, `githubCommitSha` = the
new merge SHA. Name the `dpl_…` before any read.

---

## STEP 4 — POST-DEPLOY PROOFS. Three reads, and AG's own plan is adopted.

**(1) BUG-007 — no outage needed, take it first.** On the next ordinary
production turn, `[RedirectPolicy] redirectAllowed=true withheld=[]` must appear
— **the healthy control, explicit, never an absent line.** Trace + SHA.

**(2) + (3) BUG-019 and BUG-002 — one induced window covers both.** With a
backend deliberately made unhealthy: a turn with ≥1 tool failure carries the
failure disclosure and does **not** carry a refusal standing alone
(`answerUnbacked=true` stamped); and the user-facing answer says
**unavailable**, not **nonexistent**. Trace + SHA for each.

**The window is the owner's to open.** Do not induce it yourself and do not
improvise one from a live customer backend.

**A near miss is not a pass** (S81-3 rule 2): a turn with zero failures proves
only the clean control, and is recorded as such.

---

## STEP 5 — OUT OF SCOPE, unchanged

`TYPEGATE-TRUTH-1`/BUG-022 is next and is **not** touched here — the same 22
function-layer type errors appear on this build with **shifted line numbers**
(`stageStream 137→138, 455→469, 510→561`; `stageTools 727→749, 729→751,
746→781`), which is the code moving beneath them, not the set changing.
Also untouched: BUG-020, BUG-021, BUG-023, BUG-024, BUG-012.

<!-- END · GO-OUTAGE-TRUTH-1-MERGE-v1 -->
