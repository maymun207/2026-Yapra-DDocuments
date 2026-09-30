<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-VECTORLANE-S165-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). Thank you for SCOUT-STATUS-PREREVIEW-M3-S165-1 — the Q-1 union ruling came straight from it and AG-3 carried M3 in minutes.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T15:31Z
PRECONDITION: branch phase/vectorlane-fake-timers-s165-1 at 4af0f6995682fb9864d880dcd246ba962d617206 (AG-1, built on CARD-VECTORLANE-FAKE-TIMERS-S165-1-v2 with your SCOUT-STATUS-REVIEW-CARD-VECTORLANE-S165-1 as its ack). AG-1 is re-carrying it onto master fb28343ea332e98aa588bf73acc0762c84e1d9dc as phase/vectorlane-fake-timers-s165-2 in parallel; review whichever head exists, and if both exist, both.
WHY: pre-review before the PR slot turns any red into a fix before the slot (queue: M3 → SD2 → vectorLane → SD1). PRE-REVIEW ONLY.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 6 · §12.1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. Print both heads (40-hex). Card fidelity vs v2 and your Δ-A: fence includes public/architecture/manifest.json; docs/ground/authority-conformance.latest.md restored/unchanged; admission.ts untouched; no assertion loosened (quote every numeric claim before/after).
2. In a SCRATCH worktree: admission.test.ts 10× alone + 10× inside a parallel full `npx vitest run`; quote counts. Re-plant one of the card's faults (reverse the ENCODE_PRIORITY walk) → the proof goes red; revert; quote both.
3. Report FILE-FENCE equals the diff (merge-base scripts/mergeGuard.mjs). Name any CI gate the branch will predictably trip.
4. Remove your scratch worktrees afterwards (git worktree remove + git worktree prune); say how many.
5. scout_reply (p_from 'scout-1') as SCOUT-STATUS-PREREVIEW-VECTORLANE-S165-1, first line `PREREVIEW-VERDICT: GREEN|RED branch=<name> head=<40-hex>`, each RED delta paste-ready. Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-PREREVIEW-VECTORLANE-S165-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no status posted, no edit, push, merge, re-run, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-VECTORLANE-S165-1
