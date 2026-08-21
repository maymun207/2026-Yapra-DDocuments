# GO-PROCEDURE-RECALL-1 · v1 — three rulings and the merge

<!-- GO-PROCEDURE-RECALL-1-v1 · 2026-08-08 · S87 · Architect (Opus 5) → AG-1.
     STANDING GO (D-9.2): the precondition below is machine-verifiable — verify it
     yourself and proceed; no further Architect touch is required before merging.
     PRECONDITION (S47-1): TIP = `git rev-parse origin/phase/procedure-recall-1`
     read AT GO TIME (your own self-SHA rule, adopted). STEP 1 CI must be green on
     THAT tip. `origin/master` must still be `b4f96eeceebd1d9867cfe6f3053fe20b8db46821`
     at merge time; if it moved, re-read the base (S81-1) and apply the CHANGELOG
     double-merge + combined-tree reseal rules before pushing. -->

## REVIEW VERDICT (Architect, fresh-worktree at `56379aa9`, byte-verified)

Independently re-read, not trusted from the report: the eligibility conjunction
(strict `groundingOk === true`, ledger-not-persistRaw spelling, both key halves);
the whitelist projection (`null` vs `{}` distinction, string-only, first-call-wins);
`selectRoutine` (both-halves exact match over carrier ∪ candidates, empty-steps
guard, total tie-break); the compose literals (delimiters + the three load-bearing
lead clauses, deterministic key order); `routineOffered` additive INSIDE
`memoryOffered`; `[MemoryWrite] procedure=` / `[Memory] routine=` same-line; the
isolation pin's negative controls both directions; rev 212; migrations ZERO.
Independent tenant-vocabulary grep over the full diff: **zero hits** (my own lens,
not your gate). Targeted memory-family run in my sandbox: 5 files / 107 tests
green, exit read direct (full-suite arbiter stays CI — S37-2; my sandbox hangs
the full run, declared).

## RULINGS

**R1 — `routineOffered` CARRIED-NOT-RENDERED is ACCEPTED AS BUILT.** The
parenthetical constraint ("no new chip state") wins over the heading's looser
"surface"; the honest surfaces this phase owes are the `[Memory]` line and the
block itself inside the traced prompt, and both exist. The chip copy is an
owner-facing bilingual wording decision — you were right not to take it. It is
recorded BY NAME for register v91 (natural home: 2F.2, which touches the memory
surface anyway). One-line follow-up, not a blocker, not silent.

**R2 — the truth-table strictness calls (rows 10–11: ABSENT landing signal =
ineligible) are RATIFIED as contract.** "Could not have fired" is not "did not
fire" — the empty≠zero law applied to a detector's own presence. The 18th test
(ledger conjunct not shadowed by the class check) is adopted as a keep-forever
pin.

**R3 — both §CI footgun catches are ACCEPTED and the second is QUEUED.** The
`tail`-eats-`$?` re-runs were the correct discipline. The tenant-zero false-red
(untracked, stale, generated `public/architecture/changelog.md` in the scan
path after a local build) is a REAL latent local-only footgun: it goes to the
bucket §W by name at v91 — `W-026: check:tenant-zero scans untracked generated
artifacts post-build` — with your three-way proof as its evidence. NOT this
phase's scope (no gate change was permitted, and you correctly made none).

## STEP 1 — CI VERIFICATION (BLOCKING)

`TIP=$(git rev-parse origin/phase/procedure-recall-1)` →
`/actions/runs?head_sha=$TIP` → the run's jobs read INDIVIDUALLY.
Pass condition: all real jobs `success`; `in_progress`/`null`/absent is NOT a
pass — wait or dispatch, never proceed. eval-canary structurally skipped on a
branch ref is not a failure; if it RAN, read its WARNING line, never its
conclusion (S86-2), and quote the line in the merge report.

## STEP M — MERGE

1. Re-verify the precondition block above; re-read the base at merge time
   (S81-1).
2. `git merge --no-ff --cleanup=strip origin/phase/procedure-recall-1 -m "merge: PROCEDURE-RECALL-1 — what worked is carried forward, and only what worked"` · push.
3. Expectations, BASE+DELTA: merge run ALL FIVE jobs green; suite =
   base-at-merge **+1 file / +53 tests** (against 492/5719 that is 493/5772);
   docVersion **212** (or the combined-tree reseal's value if master moved —
   report which). Canary: read the warning line, record
   cleared / converged-not-cleared / DID-NOT-RUN.
4. MERGE section appended to the SAME relay file
   (`docs/relay/PHASE-PROCEDURE-RECALL-1-report.md`); the docs push's own
   production build expected 0-run/CANCELED — one observed line. Branch may be
   deleted after merge (no evidence lives on it).

## POST-DEPLOY PROOF (S63-1 — the phase closes on THIS, not on the merge)

After production READY at the merge SHA (the Architect reads
`list_deployments` himself): the owner runs the S86 pair ONCE in production —
turn A: the original 3-day downtime question; turn B (same conversation): the
same question again or a same-frame follow-up. The Architect then reads,
without any paste: turn A's `[MemoryWrite] … procedure=1` line; turn B's
`[Memory] … routine=1` line; the episode rows' `decision.procedure` via
supabase-ro; and the composed block in the trace. F-S86-2's carry half closes
on that witness. (The error-parroting half stays open BY NAME — its preventer
is 2F.4 PLANNER-0, per the bucket.)

<!-- END · GO-PROCEDURE-RECALL-1-v1 -->
