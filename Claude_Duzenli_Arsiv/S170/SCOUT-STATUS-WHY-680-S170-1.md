[scout-1]
WHY-680: NOT MERGED, cause UNMEASURED. Every repository-visible lens says GitHub considers #680 mergeable and every gate satisfied, and no event explains the non-merge. The merge engine's internal state is not exposed by the REST or GraphQL APIs I can read.
GRAFT: none run (GitHub API reads and one workflow-file read at 45049b1f9a891c2405fc0f317d24f861a52d84c2).
PROMPTS: none. Read-only throughout: no auto-merge toggle, no push, no status post.

SCOUT-STATUS-WHY-680-S170-1 · reply to ORDER-SCOUT1-WHY-680-NOT-MERGED-S170-1 (id 591fbc8c-54ce-4c2a-9ad2-19d8ef9db2e0)
Head 7034411abe9548f9c7f1778fd8d1ef2b1eb50a29. master 45049b1f9a891c2405fc0f317d24f861a52d84c2 (unchanged across my reads, ~17:20–17:24Z).

## 1 · pulls/680 (read twice)
state open · merged false · mergeable true · mergeable_state clean · merged_at null · draft false · auto_merge enabled_by maymun207, method merge · updated_at 2026-10-01T15:45:45Z (unchanged by the 17:10 status; a commit status never touches the PR object) · base.sha 648c61d6384942ab532444be252422ed9e37c02b.

## 2 · Lenses tried, each with its reading
(a) RULESET (read only): `master-merge-gate` id 21034238, enforcement active, target branch. Rules: deletion, non_fast_forward, required_status_checks [changes, rule26, build (24.x), relay corpus (grammar v1), adversary/scout], strict_required_status_checks_policy **false**, do_not_enforce_on_create false. No review requirement, no merge-queue rule.
(b) CONTEXTS AT THE HEAD: check-runs (github-actions): changes success 15:46:04Z · rule26 success 15:53:27Z · build (24.x) success 15:51:47Z · relay corpus (grammar v1) success 15:46:18Z · report-schema success · arm auto-merge success · eval-canary skipped. Statuses: Vercel success 15:45:24Z, adversary/scout success 17:10:29Z; combined state **success**. All 5 required contexts are present and green, and strict is off, so the stale base (648c61d6 vs 45049b1f) is not required to be current.
(c) GRAPHQL (`gh pr view 680`): mergeStateStatus **CLEAN**, mergeable MERGEABLE, reviewDecision empty, autoMergeRequest.enabledAt 15:45:53Z, statusCheckRollup all SUCCESS (adversary/scout=SUCCESS) except eval-canary=SKIPPED.
(d) TIMELINE (issues/680/timeline): committed 09:52:30Z, committed 15:43:52Z, vercel[bot] commented 15:45:45Z, auto_merge_enabled 15:45:53Z by maymun207. There is NO auto_merge_disabled event, no merge-failure event, and no base change.
(e) THE ARMING WORKFLOW (.github/workflows/auto-merge.yml:37-76): it only ARMS on pull_request opened/reopened/ready_for_review/synchronize, and GitHub performs the merge. Its job succeeded at 15:45:55Z.
(f) RE-READ after the lenses: still open, clean, not merged.

## 3 · What I cannot rule in or out
The trigger shape matches a PR that DID merge. For #673 my adversary/scout post (16:10:16Z) was also the last required context, and it merged at 16:12:11Z. So "a status as the last context cannot trigger auto-merge" is contradicted by measurement. The one visible difference I can name, without being able to tie it to the cause: #680's other contexts all completed ~85 min before the status, and its auto-merge was armed 85 min before it. Treat this as a hypothesis, not a cause.

## 4 · Options for the Architect / owner (I took none)
Each of these creates a fresh evaluation event; all are outside this order and outside a scout's writes:
(i) The owner presses "Merge" in the UI on the green PR; the ruleset still applies.
(ii) Disable and re-enable auto-merge on #680 (owner).
(iii) An author push (synchronize) re-arms and re-runs CI. That cancels the current certificate (a new head) and needs a new scout read.
