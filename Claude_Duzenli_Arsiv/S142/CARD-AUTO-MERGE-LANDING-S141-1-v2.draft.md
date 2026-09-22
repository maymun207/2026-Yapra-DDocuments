<!-- relay-audit: v1 kind=card -->
CARD-AUTO-MERGE-LANDING-S141-1-v2

LANE: AG-4
fanout: personalized
v2 SUPERSEDES v1 (RED at the scout, discriminator ORDER-0(b)/FALSIFIER: required status checks were unavailable on this repository's plan — both protection and rulesets answered HTTP 403 with GitHub's own upgrade line). Two things changed since: OWNER-RULING-S141-PRO-NOT-PUBLIC-1 (his word: pro) and the plan now measured LIVE — row in `raw-tokens`, code and Date header in `the-plan`. And the scout MEASURED the trap v1 would have shipped: `gh pr merge --auto` does NOT arm auto-merge on a pull request that is already mergeable, it MERGES AT ONCE (cli/cli trunk, pkg/cmd/pr/merge/merge.go:593 `autoMerge: opts.AutoMergeEnable && !isImmediatelyMergeable(pr.MergeStateStatus)` with :826-833 returning true for CLEAN, HAS_HOOKS, UNSTABLE). So v1's order was backwards. THE CORRECTED ORDER, and it is the whole design: PROTECTION FIRST, WORKFLOW SECOND. Once master requires contexts, a fresh pull request is BLOCKED rather than CLEAN, and only then does `--auto` arm and wait. The adversary does not disappear: `adversary/scout` is a required commit status the scout writes on the PR HEAD after reading the DIFF, never a card. No landing card, no seal, no lock ref, no foreman run, no `npm run land`.

PRECONDITION: master is at the anchor in `the-plan` or later; your branch is cut from origin/master at the moment you start (print `git rev-parse origin/master` as forty hex); no lock ref present (print the ls-remote line). ORDER 1 comes BEFORE ORDER 2 and that sequence is not yours to reorder — a workflow shipped before protection lands every pull request on `opened`, which is exactly what the scout measured.

## ORDERS

ORDER 1 - APPLY PROTECTION ON MASTER, FIRST, and read it back. `gh api -X PUT repos/maymun207/cwf_yaprak/branches/master/protection` with `required_status_checks: { strict: false, contexts: [<the four in the-contexts>, "adversary/scout"] }`, `enforce_admins: false`, `required_pull_request_reviews: null`, `restrictions: null`, `allow_force_pushes: false`, `allow_deletions: false`, `required_linear_history: false`. `strict: false` is DELIBERATE and the scout's own reasoning: strict true would make every landing invalidate every other open pull request's checks — the serial churn this card exists to end, moved from the bus to GitHub. Then GET it and print it whole. If the PUT is refused, STOP and print the refusal verbatim; do not try another credential.

ORDER 2 - WRITE `.github/workflows/auto-merge.yml`, AFTER ORDER 1 read back green. Trigger `pull_request` types [opened, reopened, ready_for_review, synchronize]; `permissions: { pull-requests: write, contents: write }`; `if: github.event.pull_request.draft == false`; one step, GB-3's exact blessed form, `gh pr merge "${{ github.event.pull_request.number }}" --auto --merge`, with `GH_TOKEN: ${{ secrets.ADF_MERGE_TOKEN || github.token }}`. In the file, one comment naming this card and one naming the measured limitation: a merge performed with `github.token` does not start master's `push` workflows (docs.github.com, events-that-trigger-workflows: with the exception of workflow_dispatch and repository_dispatch, GITHUB_TOKEN-triggered events do not create workflow runs at all). THE RULING ON THAT, so it is not left to the lane: we ship on `github.token` and accept it. The PR-head run is the certificate — a gate certifies a TREE, which is this factory's own law — and Vercel deploys through its own GitHub App rather than Actions, so production still builds. `ADF_MERGE_TOKEN` stays named in the workflow as the owner's later option if he ever wants master's Actions runs back; creating that secret is credential handling and is his surface (S102-YASA-1), never a machine step, and nothing in this card waits on it.

ORDER 3 - WRITE THE CONTRACT, `docs/ground/AUTO-MERGE-LANDING-v1.md`, one page: (i) a pull request lands when the required contexts are green and auto-merge is armed — no lane merges anything; (ii) the scout reviews the DIFF and writes its verdict as a commit status, `gh api -X POST repos/maymun207/cwf_yaprak/statuses/<forty-hex head> -f state=success|failure -f context=adversary/scout -f description='<verdict row id or one line>' -f target_url=<PR url>`; a new push resets the status and the scout reviews the new head; (iii) `npm run land`, landing cards, seals and the lock ref are RETIRED for landing — `scripts/land.ts` stays in the tree under this card (its deletion is a later, smaller card, S37-1) and its self-test is no longer a gate; (iv) the independence is a PROCESS fact, not an identity fact — the scout's status is written by the same account as the author, from a different window reading the code, and the page says exactly that rather than implying GitHub sees a second party (the scout's own correction, adopted by name); (v) CLAUDE.md §5 NEVER MERGE YOUR OWN WORK is satisfied by construction, and §5/§6a each gain two sentences saying so, nothing else in that file touched. guard-bash.py is NOT edited: it fences a command lanes no longer run.

ORDER 4 - LAND IT ON ITSELF, AS THE FIRST WITNESS. Push the branch, open ONE pull request titled `AUTO-MERGE-LANDING-S141-1: the merge decision leaves the lane shell`. Your own `pull_request` workflow runs from the head ref, so it arms auto-merge on your PR; the PR then waits on the four CI contexts and on `adversary/scout`, which the scout writes after reading your diff. Do NOT run `gh pr merge` yourself in any form, and do NOT post the adversary status yourself. Print the PR number, the head as forty hex, `gh pr view <n> --json autoMergeRequest,mergeStateStatus` (BLOCKED is the expected state and is the proof protection took), and then WAIT: the landing is the measurement. After it lands, print master's new forty-hex head, the Vercel production record (state and readyState) and ONE from_lane slip. The SECOND witness is the next ordinary pull request landing with no card at all — that is what this card exists for.

## FALSIFIER

Wrong if the workflow is written before protection is read back green. Wrong if any lane runs `gh pr merge` in a shell. Wrong if a required context is a path-scoped workflow (`report-schema` cannot fire on every PR — S134 measured it) or `eval-canary` (SKIPPED on every ordinary PR; a context that is never green-by-work is not a gate). Wrong if `strict: true`. Wrong if `--squash` or `--rebase` appears anywhere. Wrong if a secret VALUE appears in any output. Wrong if guard-bash.py or land.ts are edited. Wrong if the PR is merged by hand to prove the workflow. If the PUT is refused with the plan line again, STOP: the plan reading in `the-plan` was stale and that is a finding in its own right.

## SHARED SURFACES

```scope
- repository settings on master via the API (ORDER 1)
- .github/workflows/auto-merge.yml (new)
- docs/ground/AUTO-MERGE-LANDING-v1.md (new)
- CLAUDE.md (§5 and §6a: two sentences each, nothing else)
- docs/relay/AUTO-MERGE-LANDING-S141-1-AG4-report.md
```

Not in scope: scripts/land.ts, .claude/, guard-bash.py, supabase/, any product path. One branch, one pull request.

## DECISION RIGHTS

Yours: the workflow's exact YAML, the contract page's wording, the two CLAUDE.md sentences. Not yours: the order of ORDER 1 and ORDER 2, `strict: false`, the token choice, and who posts `adversary/scout`.

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master gains a ruleset forbidding merge commits, if the plan reverts, or if a v3 appears.
