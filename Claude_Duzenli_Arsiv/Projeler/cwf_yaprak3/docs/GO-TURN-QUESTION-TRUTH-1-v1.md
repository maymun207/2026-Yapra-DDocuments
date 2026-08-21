# GO-TURN-QUESTION-TRUTH-1 · v1
**For: AG-1 · authorizes the merge of `phase/turn-question-truth-1` (PR #247, head `13791c0894004bc67b21f972f4759e9101a55a73`). One relay, self-contained. Declared order: AG-1 merges FIRST; AG-2 then rebases FIX-2 and re-mints its seal master-side.**

**PRECONDITION (S47-1 / TAIL ANCHOR S61-3):** `origin/master` = `8c610a70bab304464415181cf5a90049bb449ecd`. `git fetch origin --prune` first; if master differs, STOP and report.

## STEP 1 — CI verification (BLOCKING; sole arbiter, S37-2)
`GET https://api.github.com/repos/maymun207/cwf_yaprak/actions/runs?head_sha=13791c0894004bc67b21f972f4759e9101a55a73`
`"conclusion":"success"` AND `total_count >= 1`; `in_progress`/`null` is NOT a pass; `total_count:0` = FAILED. Confirm head == PR #247's `headRefOid` before reading the verdict. Your zero-run false-green is exactly the failure this step exists to catch — re-run the check at merge time, not from memory.

## STEP 2 — Merge (S100-3 form; -B / force / stash / squash banned)
```
git fetch origin --prune
git rev-parse origin/master            # must print 8c610a70bab304464415181cf5a90049bb449ecd
git checkout --detach origin/master
git merge --no-ff origin/phase/turn-question-truth-1 -m "PHASE-TURN-QUESTION-TRUTH-1: a governed sentence stops being erased by the quarantine — the carry rule now keys on AUTHORSHIP (turnFinishClass beside empty, never re-pointing it: ceiling-abort and governed-refusal are system-authored and carry verbatim; failed-empty stays quarantined), so a ceiling abort's actionable half survives into the next turn's assembled history instead of becoming 'previous attempt failed'. §1 proved the mechanism at the byte (stageStream silentFinish -> empty -> cwfStore outcome:'failed' -> history replacement) and killed off-by-one and persist-order with evidence; the regression asserts at the ASSEMBLY seam with the pre-fix byte as the S66-1 control. Digest records resolvedCurrent + window bounds so a recurrence is a one-glance read; partialRead makes 'read 200 of 6811' checkable where 'partial' was not. Scope held: #48 FAILURE-LESSON-MEMORY-1 untouched, F-S101-BACKENDS-SELECT-UNTAGGED filed unfixed rather than closed on a guess. docVersion rev 267 (266 held by an in-flight lane)."
git push origin HEAD:master
```
Prove merge tree == branch tree before the push (S100-3). Any conflict → STOP.

## STEP 3 — Report back
Paste: merge SHA · `git rev-parse origin/master` · CI run id/conclusion/total_count · tree-hash equality line. Deployment confirmation is the Architect's; the S63-1 proof read is the owner's, after it.

## Recorded
The zero-run poller defect is accepted as a standing lane rule and enters the session KB as **S101-L1: a poller that does not assert a run EXISTS can report green on nothing** — the sibling of A-REC-S100-1 from the other side of the wire. Your rev-267 mint (checking in-flight lanes rather than master alone) is the correct reading of the WAVE-SEAL LAW under parallelism and is recorded as precedent.

<!-- END · GO-TURN-QUESTION-TRUTH-1-v1 -->
