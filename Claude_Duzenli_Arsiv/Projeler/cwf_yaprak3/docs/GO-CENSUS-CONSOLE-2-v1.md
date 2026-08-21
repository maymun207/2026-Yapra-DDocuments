# GO-CENSUS-CONSOLE-2 · v1
**For: AG-1 · authorizes the merge of `phase/census-console-2` (PR #242, head `5d1ce6f`). One relay, self-contained.**

**PRECONDITION (S47-1 / TAIL ANCHOR S61-3):** `origin/master` = `2caaffba383a3bb0485d9d8438a5a07ee7d9747d`. `git fetch origin --prune` first; if master differs, STOP and report — do not merge.

## STEP 1 — CI verification (BLOCKING; the sole test arbiter, S37-2)
`GET https://api.github.com/repos/maymun207/cwf_yaprak/actions/runs?head_sha=5d1ce6fba244b37738e00b0ab146a50016e7d004`
The unsharded run must show `"conclusion":"success"`. `in_progress` or `null` is NOT a pass — wait and re-poll. `total_count:0` is ALWAYS FAILED on a PR (A-REC-S100-1). Paste the run id + conclusion into your merge report.

## STEP 2 — Merge (S100-3 sanctioned form; -B / force / stash banned; squash banned)
```
git fetch origin --prune
git rev-parse origin/master            # must print 2caaffba383a3bb0485d9d8438a5a07ee7d9747d
git checkout --detach origin/master
git merge --no-ff origin/phase/census-console-2 -m "PHASE-CENSUS-CONSOLE-2: verdicts gain owners — deterministic actionForVerdict over the full 7-verdict union (never-checked, {tr,en} phrases, us-triage/unmapped rendered loudly), TabPurposeStrip, data-bearing-first cards, searchable windowed rows (300-cap disclosed as N-of-M), summary strip cross-footing to YOUR actions, THEIRS-only vendor export. Closes reopened #56 + the single-viewport finding (MERGED-INTO). docVersion intentionally unchanged (rev 262 — no drift-mapped surface touched, S100-1)."
git push origin HEAD:master
```
CI green travels by tree-hash equality (S100-3): the merge introduces no new tree beyond the reviewed branch. If the merge is not clean (any conflict), STOP and report — no resolution without a new Architect ruling.

## STEP 3 — Report back (ends this relay's wait)
Paste: merge SHA · `git rev-parse origin/master` output · CI run id/conclusion from STEP 1. Deployment confirmation and the S63-1 owner proof read are the Architect's and the owner's, not yours.

<!-- END · GO-CENSUS-CONSOLE-2-v1 -->
