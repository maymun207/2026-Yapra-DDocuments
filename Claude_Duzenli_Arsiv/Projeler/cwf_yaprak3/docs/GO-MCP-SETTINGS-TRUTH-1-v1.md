# GO-MCP-SETTINGS-TRUTH-1 · v1
**For: AG-2 · authorizes the merge of `phase/mcp-settings-truth-1` (PR #244, head `5e7bf85d9987bef023f3d2b93547edd8556520c8`). One relay, self-contained.**

**PRECONDITION (S47-1 / TAIL ANCHOR S61-3):** `origin/master` = `5356fe8a79e920650ae5da26bdf8445d1f324d63` (post-census). `git fetch origin --prune` first; if master differs, STOP and report.

## STEP 1 — CI verification (BLOCKING; sole arbiter, S37-2)
`GET https://api.github.com/repos/maymun207/cwf_yaprak/actions/runs?head_sha=5e7bf85d9987bef023f3d2b93547edd8556520c8`
Unsharded run must be `"conclusion":"success"`; `in_progress`/`null` is NOT a pass; `total_count:0` on a PR = FAILED (A-REC-S100-1). Confirm the head equals PR #244's `headRefOid` before reading the verdict. Paste run id + conclusion into your merge report.

## STEP 2 — Merge (S100-3 form; -B / force / stash / squash banned)
```
git fetch origin --prune
git rev-parse origin/master            # must print 5356fe8a79e920650ae5da26bdf8445d1f324d63
git checkout --detach origin/master
git merge --no-ff origin/phase/mcp-settings-truth-1 -m "PHASE-MCP-SETTINGS-TRUTH-1: the settings page stops lying — one card per backend identity with servers nested (JSON key truth: enabled, backend_id; absence renders as serving-default), vocabulary law (active=lifecycle only), rendered join on paused identities, universal retire incl. draft (supersedes RULING-BACKEND-LIFECYCLE-1's draft->retired exclusion, rationale in place), computed draft delete over the FULL 14-table backend_id census (superset of the 10 FKs — the 4 constraint-less tables are census-protected, F-S101-FK-CENSUS-BY-CONVENTION recorded WITH the superset correction; ruling premise error owned as A-REC-S101-1), 23503 parsed to the true blocking table, verify-precondition sentences, responsive layout + TabPurposeStrip, governance-model diagram redrawn not sealed-as-was. docVersion rev 263 (reseal on the rebased worktree)."
git push origin HEAD:master
```
Tree-hash equality carries the CI green (S100-3): prove merge tree == branch tree before the push. Any conflict → STOP, no resolution without a new ruling.

## STEP 3 — Report back (ends this relay's wait)
Paste: merge SHA · `git rev-parse origin/master` · CI run id/conclusion · tree-hash equality line. Deployment confirmation is the Architect's; the R7 click (owner deletes tk-temp via the UI) and the mount-probe unaided read are the owner's, AFTER the Architect confirms the deploy.

<!-- END · GO-MCP-SETTINGS-TRUTH-1-v1 -->
