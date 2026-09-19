<!-- relay-audit: v1 kind=card -->
CARD-AUTO-MERGE-LANDING-S141-1-v2

LANE: AG-4
fanout: personalized
v2 SUPERSEDES v1 (the scout's RED, discriminator ORDER-0(b)/FALSIFIER: required status checks were unavailable on this repository's plan, protection and rulesets both HTTP 403 with GitHub's upgrade line). THREE things changed and all three are measured. ONE, OWNER-RULING-S141-PRO-NOT-PUBLIC-1 — the owner chose GitHub Pro over public visibility, his word: pro — and the plan is now LIVE: the protection endpoint answers 404 Branch not protected, sixteen minutes after the 403 (`the-plan`). TWO, the scout measured from gh's own source that v1's order was BACKWARDS: `gh pr merge --auto` does NOT arm auto-merge on an already-mergeable pull request, it MERGES AT ONCE (`the-semantics`), so a workflow shipped before master gates anything would land every pull request on `opened`, before CI and before any adversary verdict. THREE, and this is why v2 is a WIRING card under §12.6 rather than a build: **master already carries an active ruleset**, `master-merge-gate`, created a month ago and unenforceable behind the plan block until this hour — no deletion, no force-push, and one required status check. The mechanism EXISTS; what is missing is four contexts and one policy flag. You are not building a gate. You are finishing one that has been sitting there since August.

THE CORRECTED SEQUENCE, and it is not yours to reorder: the RULESET IS EDITED FIRST, the workflow SECOND. Once master requires contexts, a fresh pull request is BLOCKED rather than CLEAN, and only then does `--auto` arm and wait. The adversary does not disappear: `adversary/scout` becomes a required commit status the scout writes on the PR HEAD after reading the DIFF, never a card. No landing card, no seal, no lock ref, no foreman run, no `npm run land`.

PRECONDITION: master is at the forty hex in `the-plan` or later; your branch is cut from origin/master at the moment you start (print `git rev-parse origin/master` as forty hex); no lock ref present (print the ls-remote line). If the ruleset differs from `the-ruleset` when you read it, YOUR READING WINS and you print both.

```evidence:raw-tokens
scout PLAN-LIVE reply        451cae02-cf8b-4a80-b18b-59137588aad5   (19:13:13Z)
scout gh-semantics reply     f42d65a6-2249-4e8d-9c51-a5f957302ceb   (18:57:44Z)
scout RED on v1              72150115-4208-47dd-8299-30cd6919be34
ruleset id, as the API prints it   21034238   name master-merge-gate
```

```evidence:the-plan
plan            HTTP/2.0 404 Not Found from repos/maymun207/cwf_yaprak/branches/master/protection, Date Thu, 17 Sep 2026 19:11:43 GMT, body {"message":"Branch not protected",...,"status":"404"} — Pro is live; the same endpoint answered 403 with the upgrade line at 18:55:39Z, so this is propagation, not a contradiction
master          5f4a5c4436a2ee3d5e4a4075a0cd2d4ad76650aa   Merge pull request #581, landed 13:59:26Z by the land script
merge flags     allow_auto_merge=true · allow_merge_commit=true · allow_squash_merge=true · allow_rebase_merge=true · delete_branch_on_merge=true · default_branch=master · private=true — unchanged by the plan
merge queue     mergeQueue=null · isMergeQueueEnabled=false · isInMergeQueue=false (GraphQL, read permitted, not UNMEASURED). build-test.yml carries a dormant merge_group trigger; the queue is NOT part of this card
measured        by the scout between 2026-09-17T19:11:43Z and 2026-09-17T19:13:13Z, every value beside its command in the reply row named in `raw-tokens`; the reply row's own created_at is 2026-09-17T19:13:13Z and is the clock
```

```evidence:the-ruleset
name            master-merge-gate · target branch · enforcement active · conditions ref_name include ~DEFAULT_BRANCH
rules           deletion · non_fast_forward · required_status_checks with strict_required_status_checks_policy TRUE, do_not_enforce_on_create FALSE, required_status_checks [ build (24.x) ]
bypass          bypass_actors [] · current_user_can_bypass never
created         2026-08-19T12:30:16+03:00, updated the same minute — a month old, enforced only since the plan went live this hour
read at         2026-09-17T19:11:53Z by the scout
consequence     as of 2026-09-17T19:11:53Z master is gated FOR EVERYONE INCLUDING THE OWNER'S HAND: a hand-merge like PR 579's would be refused until build (24.x) is green at an up-to-date head. New behaviour, nobody had been told, now told.
```

```evidence:the-contexts
fire on EVERY pull_request, job names as a run prints them:
  changes · rule26 · build (24.x)                    Build and Test  (push master paths-ignore, pull_request, merge_group, workflow_dispatch)
  relay corpus (grammar v1)                          Relay corpus    (push master, pull_request, workflow_dispatch)
NOT eligible, and the card says why: report-schema is path-scoped to docs/relay and the schema file, so it cannot fire on every pull request (S134 measured it); eval-canary is SKIPPED on every ordinary pull request, and a context that is never green-by-work is not a gate.
the fifth context is adversary/scout, which no workflow writes — the scout posts it as a commit status after reading the diff
rollup at PR 581's head, for the shape: changes SUCCESS · relay corpus (grammar v1) SUCCESS · report-schema SUCCESS · eval-canary SKIPPED · build (24.x) SUCCESS · rule26 SUCCESS · Vercel success
```

```evidence:the-semantics
source          cli/cli, trunk, pkg/cmd/pr/merge/merge.go and merge/http.go, fetched HTTP 200 by the scout
merge.go:593    autoMerge: opts.AutoMergeEnable && !isImmediatelyMergeable(pr.MergeStateStatus)
merge.go:826    isImmediatelyMergeable returns true for MergeStateStatusClean, MergeStateStatusHasHooks, MergeStateStatusUnstable
http.go:88      when payload.auto -> enablePullRequestAutoMerge; otherwise mergePullRequest, i.e. MERGED NOW
reading         --auto arms auto-merge ONLY when the pull request is BLOCKED or BEHIND — only when a gate gives it something to wait on. That is why the ruleset edit comes first.
token           docs.github.com events-that-trigger-workflows: with the exception of workflow_dispatch and repository_dispatch, GITHUB_TOKEN-triggered events do not create workflow runs at all
```

## PREMISE

MEASURED: the plan, the ruleset, the merge flags, the absent merge queue and PR 581's rollup — the scout, between 2026-09-17T19:11:43Z and 2026-09-17T19:13:13Z, reply row in `raw-tokens`, values in `the-plan` · `the-ruleset` · `the-contexts`.
MEASURED: gh's auto-merge semantics from its own source, `the-semantics` — this is what makes the sequence binding.
MEASURED: the four every-pull-request job names and the two exclusions, `the-contexts`.
UNMEASURED: whether GitHub settles PR 581 and the next pull request to CLEAN or BLOCKED under the now-enforced ruleset — it read UNKNOWN twice while recomputing, and ORDER 4 measures the state of YOUR pull request instead of inheriting this.
UNMEASURED: whether the edited ruleset accepts `adversary/scout` as a context before any such status has ever existed on the repository — ORDER 1 reads the PATCH response back and says so.
SELF-INVALIDATION: this premise dies if the ruleset is no longer active when you read it, if its rules differ from `the-ruleset`, or if the protection endpoint answers 403 again.

## ORDERS

ORDER 1 - FINISH THE RULESET FIRST, then read it back. PATCH the ruleset named in `raw-tokens` so that its `required_status_checks` rule carries FIVE contexts — `changes`, `rule26`, `build (24.x)`, `relay corpus (grammar v1)`, `adversary/scout` — and `strict_required_status_checks_policy` becomes FALSE. Leave the `deletion` and `non_fast_forward` rules exactly as they are; leave `enforcement` active; leave `bypass_actors` EMPTY. Three of those are decisions, not preferences, and the reasons are named so a future reader does not undo them: **strict false** because strict true makes every landing invalidate every other open pull request's checks — the serial churn this card exists to end, moved from the bus to GitHub (the scout's own reasoning, adopted); **bypass empty** because every window in this factory authenticates as the same account as the owner, so any bypass actor that would restore his hand would hand the same bypass to every lane and the gate would be decoration — his escape hatch is to set the ruleset's enforcement to disabled in the repository settings, which is always his and is named in the contract page; **five contexts and not six** for the reasons in `the-contexts`. Then GET the ruleset and print it whole. If the PATCH is refused, STOP and print the refusal verbatim — do not try a classic-protection PUT instead, do not try another credential.

ORDER 2 - WRITE `.github/workflows/auto-merge.yml`, only after ORDER 1 read back with the five contexts. Trigger `pull_request`, types [opened, reopened, ready_for_review, synchronize]; `permissions: { pull-requests: write, contents: write }`; `if: github.event.pull_request.draft == false`; ONE step, the exact form guard-bash GB-3 already blesses, `gh pr merge "${{ github.event.pull_request.number }}" --auto --merge`, with `GH_TOKEN: ${{ secrets.ADF_MERGE_TOKEN || github.token }}`. In the file, one comment naming this card and one naming the measured token limitation from `the-semantics`. THE RULING ON THAT LIMITATION, so it is not left to you: we ship on `github.token` and accept that a merge it performs does not start master's push workflows. The pull-request-head run is the certificate — a gate certifies a TREE, this house's own law — and Vercel deploys through its own GitHub App rather than Actions, so production still builds. `ADF_MERGE_TOKEN` stays named in the workflow as the owner's later option if he ever wants master's Actions runs back; creating that secret is credential handling and is his surface under S102-YASA-1, never a machine step, and nothing in this card waits on it.

ORDER 3 - WRITE THE CONTRACT, `docs/ground/AUTO-MERGE-LANDING-v1.md`, one page: (i) a pull request lands when the five required contexts are green and auto-merge is armed — no lane merges anything, and no lane can; (ii) the scout reviews the DIFF and writes its verdict as a commit status, `gh api -X POST repos/maymun207/cwf_yaprak/statuses/<forty-hex head> -f state=success -f context=adversary/scout -f description=<verdict row id or one line> -f target_url=<the pull request url>`, with `state=failure` for a RED; a new push is a new head and the scout reviews it again; (iii) `npm run land`, landing cards, seals and the lock ref are RETIRED for landing — `scripts/land.ts` stays in the tree under this card, its deletion is a later and smaller card (S37-1), and its self-test is no longer a gate; (iv) the independence of `adversary/scout` is a PROCESS fact and not an identity fact — the same account writes it from a different window that read the code, and the page says exactly that rather than implying GitHub sees a second party (the scout's own correction, adopted by name); (v) the owner's escape hatch, named: the ruleset's enforcement, which he can disable in settings, and nothing else; (vi) CLAUDE.md §5 NEVER MERGE YOUR OWN WORK is satisfied by construction, and §5 and §6a each gain two sentences saying so — nothing else in that file is touched. guard-bash.py is NOT edited: it fences a command lanes no longer run.

ORDER 4 - LAND IT ON ITSELF, AS THE FIRST WITNESS. Push the branch, open ONE pull request titled `AUTO-MERGE-LANDING-S141-1: the merge decision leaves the lane shell`. Your own workflow runs from the head ref, so it arms auto-merge on your own pull request; the pull request then waits on the four CI contexts and on `adversary/scout`, which the scout writes after reading your diff — you do NOT post it and you do NOT run `gh pr merge` in any form. Print the pull request number, the head as forty hex, and `gh pr view <n> --json autoMergeRequest,mergeStateStatus` — BLOCKED with auto-merge enabled is the expected reading and is the proof the ruleset took. Then WAIT: the landing is the measurement, and it is not yours to force. After it lands, print master's new forty hex, the Vercel production record with state and readyState, and post ONE from_lane slip. The SECOND witness is the next ordinary pull request landing with no card at all — that is what this card exists for.

## FALSIFIER

Wrong if the workflow is written before the ruleset reads back with the five contexts. Wrong if any lane runs `gh pr merge` in a shell. Wrong if a bypass actor is added, or enforcement is changed, or the deletion or non-fast-forward rules are touched. Wrong if `strict_required_status_checks_policy` stays true. Wrong if `report-schema` or `eval-canary` is made required. Wrong if `--squash` or `--rebase` appears anywhere. Wrong if a secret VALUE appears in any output. Wrong if guard-bash.py or land.ts are edited. Wrong if the pull request is merged by hand to prove the workflow. If the protection endpoint answers 403 again, STOP: the plan reading is stale and that is a finding in its own right.

## SHARED SURFACES

```scope
- the master-merge-gate ruleset, via the API (ORDER 1)
- .github/workflows/auto-merge.yml (new)
- docs/ground/AUTO-MERGE-LANDING-v1.md (new)
- CLAUDE.md (§5 and §6a: two sentences each, nothing else)
- docs/relay/AUTO-MERGE-LANDING-S141-1-AG4-report.md
```

Not in scope: scripts/land.ts, .claude/, guard-bash.py, supabase/, any product path. One branch, one pull request.

## DECISION RIGHTS

Yours: the workflow's exact YAML, the contract page's wording, the two CLAUDE.md sentences, the PATCH's exact request shape. Not yours: the order of ORDER 1 and ORDER 2, the five contexts, `strict` false, the empty bypass, the token choice, and who posts `adversary/scout`.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the plan is live, protection answers 404, master is at the fenced forty hex | MEASURED: the scout, gh api -i on the protection endpoint with its Date header, 19:11:43 GMT | the-plan |
| master already carries an active ruleset with one required check, strict, no bypass, a month old | MEASURED: the scout, gh api on the ruleset by its id in raw-tokens | the-ruleset |
| the four job names that fire on every pull request, and the two that cannot | MEASURED: the scout, the on blocks of each workflow file plus a run's own job names | the-contexts |
| --auto merges at once on a CLEAN pull request and arms only when the gate blocks | MEASURED: the scout, gh source at the lines quoted | the-semantics |
| whether the edited ruleset accepts a context no status has ever used | NOT-READ | ORDER 1 reads the PATCH response back |
| whether your pull request settles BLOCKED with auto-merge enabled | NOT-READ | ORDER 4 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right. If ORDER 1 finds the ruleset already carries some of the five contexts, this is a WIRING order for the remainder (§12.6) and your report says which part was already there.

DECAYS if the ruleset stops being active, if a second ruleset appears on the default branch, if the plan reverts, or if a v3 appears.
