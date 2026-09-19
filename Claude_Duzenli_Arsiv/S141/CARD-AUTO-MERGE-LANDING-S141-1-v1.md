<!-- relay-audit: v1 kind=card -->
CARD-AUTO-MERGE-LANDING-S141-1-v1

LANE: AG-4
fanout: personalized
OWNER-RULING-S141-AUTO-MERGE-FIRST-1, in his words: "oncelikle su github automerge kismini hayat gecirip bullSt lerden kurtulalim bir ana once haydi ne yapilmasi gerekiyorsa yapalim". This card is that ruling's executor. THE DEFECT, measured in S141: the landing gate is the module that drags every landing version after version. Five landings today; every one needed its own card, each card 2–4 versions on grammar alone, each version a scout turn, a seal and a foreman run; PR 580's seam was refused by the lane harness classifier ("[Self-Approval]", "[Security Weaken]") the day it landed and PR 579 was merged by the OWNER'S HAND. Every fence in this factory (settings.foreman.json · guard-bash GB-2/GB-3 · land.ts step B · CLAUDE.md §5) assumes a LANE SHELL runs `gh pr merge`, and the classifier sits exactly on that shell. THE DESIGN: the merge decision leaves the lane shell and goes to GitHub. A pull request lands on master when its REQUIRED STATUS CHECKS are green and auto-merge is armed; the adversary does not disappear — it becomes a required commit status `adversary/scout` that the scout writes on the PR HEAD after reading the CODE (the diff), never a card. No landing card, no seal, no lock ref, no foreman run, no `npm run land`. A PR that is green from CI reaches master within thirty minutes with zero owner hands (§12.8). You WRITE the mechanism; you do NOT change repository settings you cannot change — you print what you cannot and name it.

PRECONDITION: master is at the anchor in `the-anchor` or later; your branch is cut from origin/master at the moment you start (print `git rev-parse origin/master` as forty hex); no lock ref present (print the ls-remote line). If ORDER 0 shows auto-merge ALREADY armed at the repository and a branch protection with required checks ALREADY on master, this card shrinks to ORDER 2–4 and you say so.

```evidence:raw-tokens
AG-4 slip, PR 581 mergeable   dbdc736c-e3b4-4f34-8c99-9ff56159c0b8
scout SECOND-ASK verdict      e41d8d61-8805-4825-a11b-d01e2f39737f   (not a 579 regression; land 581 first)
```

```evidence:the-anchor
master         e443e35f0ea9b9c4da498f2943318f7c22379c2b   Merge pull request #579 (owner's hand, 12:58:43Z)
open PR        581 at head 53ece55eb8ffd85d8f8e5fce59255fd24dcdee6c, MERGEABLE, three workflows success attempt 1 (AG-4's slip, 13:38Z) — the first candidate for the new path
fence, read    docs/ground and scripts on master: guard-bash.py GB-2 (`ADF_LANE_ROLE` gates `gh pr merge` in every window), GB-3 (the only legal form is `gh pr merge <n> --auto --merge`), scripts/land.ts step B (author-lane from commit subjects `\bAG-\d+\b`, lander from ADF_LANE_ROLE, SELF-LAND refuse), CLAUDE.md §5 "NEVER MERGE YOUR OWN WORK", §6a merge key absent in producer windows — ADF-ROLE-TOPOLOGY-MEASURED-S136-v1 §4
harness, read  F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1 (S137) and F-S141-THE-SEAM-IS-UNREACHABLE-UNDER-THE-HARNESS-1 (S141): the auto-mode classifier refused `npm run land` under three labels; nothing in the repository can lift it
measured       2026-09-17T13:50Z by the Architect from the project archive and the bus; repository SETTINGS (auto-merge flag, branch protection, token scopes, secret names) are NOT-READ and are ORDER 0's
```

## PREMISE

MEASURED: the archive — the four fences and the two harness findings named in `the-anchor`, read by name from ADF-ROLE-TOPOLOGY-MEASURED-S136-v1 and the S137/S141 findings.
MEASURED: the bus — PR 581 green and MERGEABLE at its head per AG-4's own slip at 13:39:47Z (row in `raw-tokens`).
UNMEASURED: repository `allow_auto_merge`, branch protection on master, the lane credential's permission level on the repository, the names of existing repository secrets, and which workflows fire on EVERY pull request — ORDER 0 measures all five and the scout re-reads them.
UNMEASURED: whether a merge performed by auto-merge that was ARMED with `github.token` triggers the `push` workflows on master (GitHub documents that events caused by GITHUB_TOKEN do not start new workflow runs) — ORDER 1 chooses the token on that ground and ORDER 4 witnesses it on the first landing.
SELF-INVALIDATION: this premise dies if ORDER 0 finds the lane credential cannot even READ repository settings (then every setting line is the owner's, printed verbatim), or if the repository already has a ruleset that forbids merge commits.

## ORDERS

ORDER 0 - MEASURE THE SETTINGS, PRINT EVERY VALUE BESIDE ITS COMMAND, before writing a byte:
(a) `gh api repos/{owner}/{repo} --jq '{allow_auto_merge,allow_merge_commit,allow_squash_merge,allow_rebase_merge,delete_branch_on_merge,default_branch}'`.
(b) `gh api repos/{owner}/{repo}/branches/master/protection` (a 404 is "no classic protection" — print it) and `gh api repos/{owner}/{repo}/rulesets` (print each ruleset's name, enforcement and rules).
(c) `gh api repos/{owner}/{repo}/collaborators/$(gh api user --jq .login)/permission --jq .permission` — admin / maintain / write / read. This decides who applies ORDER 2.
(d) `gh secret list` — NAMES only, never values. Say whether a name that looks like a merge token exists.
(e) For every file in `.github/workflows/`, print its `on:` block. A workflow with `paths:` filters or no `pull_request` trigger CANNOT be a required check (report-schema is path-scoped — S134 measured it); list the check names that fire on EVERY pull request. Those, plus `adversary/scout`, are the required contexts.

ORDER 1 - WRITE `.github/workflows/auto-merge.yml`: trigger `pull_request` types [opened, reopened, ready_for_review, synchronize]; `permissions: { pull-requests: write, contents: write }`; a single step `gh pr merge "${{ github.event.pull_request.number }}" --auto --merge` (GB-3's exact form — the same flag set the guard already blesses) with `GH_TOKEN: ${{ secrets.ADF_MERGE_TOKEN || github.token }}`. Skip drafts (`if: github.event.pull_request.draft == false`). Add a one-line comment in the file naming the token limitation and this card. If ORDER 0(d) found no merge-token secret, the workflow still ships on `github.token` and your report names `ADF_MERGE_TOKEN` as the ONE owner action that makes post-merge master workflows fire — creating a repository secret is credential handling and is the owner's surface by S102-YASA-1, not a machine step you may take.

ORDER 2 - REQUIRED CHECKS. If ORDER 0(c) is admin: apply branch protection on master with `gh api -X PUT repos/{owner}/{repo}/branches/master/protection` — `required_status_checks: { strict: true, contexts: [<every-PR checks from 0(e)>, "adversary/scout"] }`, `enforce_admins: false` (the owner keeps his hand), `required_pull_request_reviews: null`, `restrictions: null`, `allow_force_pushes: false`, `allow_deletions: false`, `required_linear_history: false` (merge commits stay — GB-3). Read it back with GET and print it. If ORDER 0(c) is NOT admin: print that exact JSON body in your report under a heading OWNER-APPLIES, and stop there on this order — do not try another credential, do not route around.

ORDER 3 - THE ADVERSARY STATUS, documented so the scout can act on it: write `docs/ground/AUTO-MERGE-LANDING-v1.md` — the landing contract in one page: (i) a PR lands when required checks are green and auto-merge is armed; (ii) the scout reviews the PR's DIFF (not a card) and writes `gh api -X POST repos/{owner}/{repo}/statuses/<forty-hex head> -f state=success|failure -f context=adversary/scout -f description='<verdict row id or one line>' -f target_url=<PR url>`; a new push resets the status and the scout reviews again; (iii) `npm run land`, landing cards, seals and the lock ref are RETIRED for landing — land.ts stays in the tree this card (deletion is a later, smaller card; S37-1) and its self-test is no longer a gate; (iv) CLAUDE.md §5 "never merge your own work" is SATISFIED by construction: no lane merges anything — GitHub merges on an independent verdict; edit CLAUDE.md §5/§6a to say exactly that in two sentences, changing nothing else in the file. Update guard-bash.py NOT AT ALL (it fences a command lanes no longer run).

ORDER 4 - LAND IT ON ITSELF, AS THE FIRST WITNESS. Push the branch, open ONE pull request titled `AUTO-MERGE-LANDING-S141-1: the merge decision leaves the lane shell`. The `pull_request` workflow from YOUR branch runs on your PR (GitHub runs PR workflows from the head ref), arms auto-merge, and the PR waits on the required checks. Do NOT run `gh pr merge` yourself in any form. Print the PR number, the head as forty hex, and the auto-merge state (`gh pr view <n> --json autoMergeRequest`). If ORDER 2 was OWNER-APPLIES, the PR waits until the owner applies protection — say so; nothing else is blocked. After it lands (the scout reads that), the SECOND witness is PR 581: the scout reviews 581's diff, writes the status, and 581 lands with no card — that is the measurement this card exists for.

## FALSIFIER

Wrong if any lane runs `gh pr merge` in a shell. Wrong if a required context is a path-scoped workflow (it would never fire and master would be frozen). Wrong if the branch protection or ruleset is applied with a credential other than the lane's own, or forced. Wrong if `--squash` or `--rebase` appears anywhere. Wrong if a secret VALUE appears in any output. Wrong if guard-bash.py or land.ts are edited. Wrong if the PR is merged by hand to prove the workflow. If ORDER 0 shows GitHub's auto-merge is unavailable on this plan/visibility, STOP and print the API's own line — that is a finding, not a workaround.

## SHARED SURFACES

```scope
- .github/workflows/auto-merge.yml (new)
- docs/ground/AUTO-MERGE-LANDING-v1.md (new)
- CLAUDE.md (§5 and §6a: two sentences each, nothing else)
- docs/relay/AUTO-MERGE-LANDING-S141-1-AG4-report.md
- repository settings on master via the API, ORDER 2, only if the credential is admin
```

Not in scope: scripts/land.ts, .claude/, guard-bash.py, supabase/, any product path. One branch, one pull request.

## DECISION RIGHTS

Yours: the workflow's exact YAML, the contract page's wording, the two CLAUDE.md sentences. Not yours: whether the repository gets a merge-token secret (owner), whether protection is applied when you lack admin (owner), and whether PR 581 goes first (the scout, on its status).

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the four fences all sit on a lane shell running gh pr merge | READ: ADF-ROLE-TOPOLOGY-MEASURED-S136-v1 §4, project archive | the-anchor |
| the classifier refused the landing seam under three labels | READ: F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1, F-S141-THE-SEAM-IS-UNREACHABLE-UNDER-THE-HARNESS-1 | the-anchor |
| PR 581 is green and mergeable at its head | READ: AG-4's slip row in raw-tokens, 13:39:47Z | the-anchor |
| repository auto-merge flag, protection, permission, secret names, every-PR workflows | NOT-READ | ORDER 0 measures them |
| github.token-armed auto-merge does not trigger master push workflows | NOT-READ | ORDER 1 states it; ORDER 4 witnesses it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right. If ORDER 0 shows the mechanism already exists in part, this is a WIRING card for the missing part (§12.6) and your report says which part.

DECAYS if the owner withdraws OWNER-RULING-S141-AUTO-MERGE-FIRST-1, if master gains a ruleset forbidding merge commits, or if a v2 appears.
