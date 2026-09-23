<!-- relay-audit: v1 kind=notice -->
NOTICE-MERGE-GUARD-FIX-FENCE-HISTORY-S157-1

LANE: AG-2 (the window that owns PR 597; existing tab)
fanout: personalized (one lane, one body)
FROM: Architect, S157, bridge clock 2026-09-23T03:57Z
AUTHORITY: OWNER-APPROVAL-S156-MERGE-GUARD-1; S157 plan approval "onay" 2026-09-23 06:49 TSI. A scout RED naming the complete delta to GREEN is applied by the AUTHOR and re-statused, not re-reviewed (bootstrap v158 section 4; project instructions 12.12).
NO POLL OR CRON TASK. When the slip is written, stop.
GRAFT: code context from graft first; your slip carries a GRAFT line.

## PREMISE
MEASURED: 2026-09-23T03:57Z, bus row SCOUT-STATUS-LAND-PR597-S157-1 (created 2026-09-23T03:56:44Z): ADVERSARY-VERDICT RED pr=597 head=e23f7429e9abaf7d6424c4a8f22dd41cb8db9d6f; ONE blocking finding; plants 598-609 all as designed; GUARD-BOOTSTRAP and GUARD-SELF-EDIT printed; FILE-FENCE matches the 8 changed paths; land.ts helpers unchanged in behaviour.
MEASURED: 2026-09-23T03:57Z, GitHub compare a8814be31b2bf4173ae82cc7bdda3c155cad443b...e23f7429e9abaf7d6424c4a8f22dd41cb8db9d6f: ahead 1, behind 0, only your report file.
SELF-INVALIDATION: dies if PR 597 is closed or its head is not e23f7429e9abaf7d6424c4a8f22dd41cb8db9d6f or a descendant.
ON-DISAGREEMENT: if the finding does not reproduce at the head, do not edit; print the lines and why in the slip and stop.

## THE FINDING (scout's words, quoted)
scripts/mergeGuard.mjs:451-457 at e23f74, FENCE-GREW history walk: fenceAt returns {ok:false, cls:'UNMEASURED'} when git diff (l.298) or git show (l.306) FAILS. The loop treats that exactly like 'no fence at this commit' and walks on, so a later, wider fence becomes 'first' and FENCE-GREW prints ok without having read the earlier commit. A check that could not look PASSES.

## STEPS
1. In that loop: an UNMEASURED fenceAt result FAILS the PR with class UNMEASURED and the commit (full 40-hex) and reason, and stops the walk. Only the no-fence / validation classes keep walking. Scout's delta: if (!f.ok && f.cls === 'UNMEASURED') { fail('UNMEASURED', `fence history at ${c}: ${f.why}`); break; }
2. Add ONE unit test in api/cwf/__tests__/mergeGuard.test.ts that plants a failing git show/diff at an earlier branch commit and asserts UNMEASURED failure (planted fault in the thing guarded, not a fixture).
3. Scout notes N1-N6 are NOT blocking: do not touch them in this push; list them in your report as open with the note number.
4. Paths stay inside the FILE-FENCE (mergeGuard.mjs, mergeGuard.test.ts, your report). No other file.
5. Local: the focused test file, npm run build (all five gates), typecheck:api. Push to phase/merge-guard-clean-merge-and-fence-s156-1. No plant re-run needed (the change only fails more cases); say so.
6. SLIP: SLIP-MERGE-GUARD-FIX-FENCE-HISTORY-S157-1 on the bus: new head (full 40-hex), the diff hunk, the test name and result, CI runs at the new head by full sha (read a zero twice), GRAFT line. Stop.
FORBIDDEN: no merge, no force-push, no adversary status, no poll task, no cron; never print an environment value.

END · NOTICE-MERGE-GUARD-FIX-FENCE-HISTORY-S157-1
