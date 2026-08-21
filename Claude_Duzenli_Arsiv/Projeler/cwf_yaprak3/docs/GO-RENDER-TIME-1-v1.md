# GO-RENDER-TIME-1 · v1 — four rulings and the merge

<!-- GO-RENDER-TIME-1-v1 · 2026-08-07 · S86 · Architect (Opus 5) → AG-2.
     PRECONDITION (S47-1): branch head is STILL `4b4091d8` and CI run `31210475905`
     is the green you verified, job-by-job. Else STOP. -->

## RULINGS

**R1 — the flipped assertion is RATIFIED.** A column literally named `Timestamp` holding an
in-window epoch IS a time column under the widened convention; the old assertion encoded the
exact-name regime's side effect, not an honesty invariant. Your re-pinning of the
case-sensitivity claim on live examples (`startTIMESTAMP` · `createddate` · `startMS`) plus
the substring-vs-suffix cases is exactly the right replacement.

**R2 — "+0 test files" accepted; the brief's "~+3" projection was the Architect's error**
(second of the day — the projection habit is now on my own watch list). Sibling-home
placement is correct; the +41 CI-arbitrated delta is the substance.

**R3 — the two description-string updates are IN-FENCE.** The tool's own schema/description
strings live in the same file and would otherwise contradict the error text; they are not a
prompt segment and not `VIZ_MACRO_INSTRUCTIONS`. Accepted as written.

**R4 — the grain-gate separation is RATIFIED as this phase's load-bearing decision.** The
predicate-beside-the-set design, with the test pinning the grain set to exactly the three
names, is adopted as contract. (Independently byte-verified: `TABLE_TIME_FIELDS` unchanged;
both parser sites anchored; the dangling detector's group-capture + case normalization; the
tooltip pinned at the rendered cell.)

## STEP M — MERGE

1. Re-verify head `4b4091d8`; **re-read the base at merge time** (S81-1). AG-1's
   FAULT-SWITCH-0 merge may land first or concurrently — both branches carry
   `public/architecture/manifest.json` at rev 209, so whichever of you merges SECOND hits
   the manifest conflict and **reseals in the combined tree** (report the final rev it
   produces); the CHANGELOG double-merge rule applies — both entries whole, late-merge on
   top.
2. `git merge --no-ff --cleanup=strip origin/phase/render-time-1 -m "merge: RENDER-TIME-1 — the readable table the user asked for four times"` · push.
3. Expectations, BASE+DELTA: merge run ALL FIVE jobs green (canary converged-not-cleared is
   the recorded normal); suite = base-at-merge **+0 files / +41 tests**; docVersion = 209 or
   the combined-tree reseal's value — report which.
4. MERGE section appended to the same relay file; the docs push expected 0-run/CANCELED —
   one observed line. Branch may be deleted after merge (no evidence lives on it; the
   preview carried nothing this phase needs).

## POST-DEPLOY PROOF (unchanged from the phase brief, S63-1)
After production READY carries this merge: the owner re-asks the original question once —
the user-eye finish. The Architect reads the turn's logs and the screen: formatted
`startTimestamp`/`endTimestamp` on screen, raw values in tooltips, zero invalid-directive
boxes. F-S86-1 / F-S86-5 / F-S86-4 close on that witness, not on this merge.

<!-- END · GO-RENDER-TIME-1-v1 -->
