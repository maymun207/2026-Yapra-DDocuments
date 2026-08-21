# GO — PHASE-GATEWAY-BURST-GUARD-1 · MERGE · v1

<!-- GO-GATEWAY-BURST-GUARD-1-MERGE-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     RULE-25 review of PR #161 @ 5856df89a39a81af91057c4e599cf0993785d714,
     performed on a FRESH FULL CLONE. Every number below was re-derived in that
     clone; none was copied from the phase report. -->

**Verdict: GO**, with two corrections that ride the merge push (§3). The code is not
touched by either.

---

## §1 · RULE-25 — independently re-derived, not accepted

Fresh clone, `git fetch --all`, branch checked out from `origin`.

| Claim | Re-derived | |
|---|---|---|
| Branch head | `5856df89a39a81af91057c4e599cf0993785d714` | ✅ |
| `origin/master` unmoved | `5f2dee584717dcc9cd296589c126adf7c839bd0d` | ✅ |
| Commits ahead | exactly 1 (phase + amendment folded) | ✅ |
| Test files | 461 → **466** (+5: `backendConcurrency`, `burstGuardReporting`, `burstGuardTokenCeiling`, `resolveBurstPolicy`, `burstBrakeChip`) | ✅ |
| **Migrations** | **67 → 67 — UNCHANGED.** Zero-migration claim holds. | ✅ |
| `gateway.maxConcurrentCallsPerBackend` | `value: 3, min: 1, max: 12, stage: '11', sessionTweakable: false` | ✅ |
| `turn.maxCallsPerToolPerTurn` | `value: 30, min: 4, max: 200` | ✅ |
| `turn.maxTokensPerTurn` | `value: 300_000, min: 50_000, max: 2_000_000` | ✅ |
| Semaphore queues, never rejects | `acquire()` resumes waiters by **handing the slot over**; `release` idempotent | ✅ |
| `release()` in a `finally` | `stageTools.ts:193` acquire → `:203 } finally { slot.release(); }` | ✅ |
| §5 hypothesis verified against the package | the code cites the installed signature — `stopWhen?: StopCondition<…> \| Array<…>` at line 2778 — rather than asserting it | ✅ |
| Ceiling sums `totalTokens`, cached included | via existing `sumSteps`, AMENDMENT §B cited at the site | ✅ |
| `brakes: []` present-and-empty | `emptyToolLedger` seeds `brakes: []`; both `done` payloads carry `?? []` | ✅ |
| All three brakes report | `recordBrake` wired at `stageTools.ts:198` (concurrency), `:874` (per_tool_calls), `stageStream.ts:165` (turn_tokens) | ✅ |
| Stage 11 card correction | the false "the bound lives in code" line is gone; four new law cards, one of them stating the queue-not-reject posture in the owner's own terms | ✅ |
| Phase report in-branch, same push | `docs/relay/PHASE-GATEWAY-BURST-GUARD-1-report.md`, 393 lines | ✅ |
| Source tree NUL-clean | verified — see §2 | ✅ |

**NOT verified by the Architect, and why:** CI green (GitHub Actions API returns 403 from
this sandbox — hence STEP 1 below is blocking) · the suite **total** 5 286 (CI-arbitrated,
S37-2 — file count is derivable, the total is not) · R0.3's distribution (Operator-lane
read; AG's own lane, reported with its method and its two independent reproductions of the
amendment's anchors).

---

## §2 · WHAT THE REVIEW FOUND — including a false zero of my own

**My first NUL scan returned zero and was WRONG.** It failed to flag a file I already knew
carried NULs. Re-run with that file as an explicit positive control (S66-1), the honest
result is: **fifteen tracked files contain NUL bytes — fourteen are images** (`public/brand/*`,
`src/assets/hero.png`) **and the fifteenth is the phase report itself.** No source file
carries one. AG's claim that `chatSurface.ts` was repaired with `String.fromCharCode(0)`
and that all changed files are clean **is confirmed**.

**F-1 · The `## MERGE` heading is present BEFORE the merge, as an empty placeholder.**
It is not a false claim — the text under it says the merge report goes there. But the
Architect's standing positive control is *"no `## MERGE` in the master relay file ⇒ relay
debt open"*, and an empty heading makes that control read **green on an unwritten report**.
A placeholder that satisfies a positive control has disarmed it.

> **S82-3 (new law, minted here):** a placeholder that satisfies a positive control has
> disabled that control. A gate keyed on a heading must be keyed on **content under the
> heading**; a template that pre-writes the shape of the evidence is not neutral.

**F-2 · Two raw NUL bytes remain in the report's own prose**, lines 299 and 331 — inside
the paragraphs where AG *describes having introduced and removed exactly this defect*. The
consequence is real and current: `grep` treats the relay report as binary and returns
`binary file matches` instead of the matching lines, which is how F-1 nearly slipped past
me. **The report has the disease it documents.**

Neither finding touches the code. Both ride the merge push.

---

## §3 · MERGE — the blocking steps, in order

**STEP 1 (BLOCKING) — re-verify CI on the PR head yourself.**
`GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=5856df89a39a81af91057c4e599cf0993785d714`
Pass condition: every required check `completed` + `success`. **`in_progress` or `null` is
NOT a pass.** `eval-canary` structurally skipped on PR runs (spend fence) is not a failure.
If anything is red or unfinished: **STOP and report. Do not merge.**

**STEP 2 — fix F-2 in the report, on the branch, before merging.** Strip the two raw NUL
bytes at lines 299 and 331; spell the byte the way the fix itself spells it. Verify with a
positive control: `grep '^## MERGE'` on the file must print the line, not
`binary file matches`.

**STEP 3 — merge.**
```
git checkout master && git pull --ff-only
git merge --no-ff phase/gateway-burst-guard-1
```
Squash banned. Verbatim merge message, Architect-authored:

```
merge: GATEWAY-BURST-GUARD-1 — nineteen calls were one round, so the bound never saw them

The brake was on the wrong shaft. maxToolRounds bounds rounds; the burst that
broke the customer's BI server was nineteen calls inside one of them. Three
brakes now sit on three shafts: a per-backend semaphore that QUEUES and never
rejects, so a legitimate seven-day fan-out survives by construction; a per-turn
token ceiling on the loop's own gate, summing totalTokens with cached input
included, because the failure being fenced is the turn getting too big and not
the invoice; and a deliberately high per-tool cap that is a runaway backstop and
not a shaping instrument.

Zero migrations: three governed rows self-seed through the S46 reconciler.

The measurement says the ceiling is not what closes BUG-020 — the semaphore is —
and the phase reports that rather than letting the number take credit for the
fix. A clean turn carries brakes: [] present and empty, because absence-equals-
clean is the equivalence this bucket exists to remove.
```

**STEP 4 — append the real `## MERGE` section, same push as the merge commit.**
Replace the placeholder text with the merge report: merged SHA, master's new SHA, the
post-merge `CHANGELOG` suite line, CI run id from STEP 1, and **the number of question
round-trips this phase cost** (`TYPEGATE-TRUTH-1` reported zero; if it is not falling, the
doctrine is not working). State that F-2 was fixed and how it was verified.

**No Operator step. No governed publish at merge** — the three rows self-seed; the floors
are already the values the owner approved.

---

## §4 · POST-DEPLOY PROOF — owed after merge, unchanged

1. **The constraint, live.** A production turn with a legitimate multi-day fan-out (≥7
   calls to one tool) completes fully and its chip states **no limit was reached**,
   explicitly. Without this the other two prove nothing.
2. **A brake, live**, naming which limit and its value.
3. **Governed, not hard-coded:** publish a different value for one param, observe the new
   bound **with no deploy**.

**BUG-020 closes on proof 1 + 2 — on the SEMAPHORE's evidence, not the ceiling's.** The
phase's own §0 says the ceiling catches the original disaster turn by 4.3% and that several
large-context turns reach it without ever bursting. Letting the token number take credit
for a concurrency fix would close the bug on the wrong evidence.

---

## §5 · ONE OWNER DECISION, SURFACED BECAUSE THE DATA ARRIVED AFTER THE APPROVAL

R0.3, n=406: median **37 798** · p95 **174 061** · p98 **306 045** · max **585 477** ·
**9 turns (2.22%) at or above 300 000**, and AG reports several of those nine are ordinary
large-context turns that never burst.

So the approved ceiling will bound roughly **one turn in forty-five**, some of them honest.

**Architect recommendation: KEEP 300 000.** A braked turn still answers with what it
gathered, plus a chip naming the limit — while both observed turns above the ceiling
today produce **no answer at all** (`finishReason=error`). For the population this touches,
braking is strictly better than the status quo. It is a governed row: raising it is a
publish, not a deploy.

**And the measurement that revises it is named, not deferred:** after merge, the
`turn_tokens` brake records make it countable — how many braked turns would otherwise have
completed. If that number is not small, the value moves on evidence. **The criterion
retires by proof, never by convenience.**

Nothing is blocked on this decision; the floor ships as approved either way.
