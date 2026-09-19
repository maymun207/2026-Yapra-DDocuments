<!-- relay-audit: v1 kind=card -->
CARD-RULESET-WRITE-FENCE-S141-1-v2

LANE: AG-4
fanout: personalized
v2 SUPERSEDES v1 (the scout's RED, discriminator 2, and it was right by the card's OWN falsifier: the fence as ordered left three MEASURED write paths to the same gate definition open). The subject is unchanged — master is governed by the `master-merge-gate` ruleset and the credential every window holds can rewrite that ruleset, so guard-bash fences the merge verb and a force push while the gate's definition sits unguarded. What changed is the enumeration: a rule that matches only `/rulesets` and a protection path never sees `gh api graphql`, never sees a body supplied by `--input`, and never sees the default branch being RETARGETED out from under a `~DEFAULT_BRANCH` condition. All three are in `the-paths`, each measured by the scout, and ORDER 1 now covers them.

AND ONE SENTENCE THIS CARD OWES THE FACTORY, so nobody reads the new rule as more than it is: guard-bash sees a Bash line in a Claude window. `curl` with the token, a node script, or the web UI are outside it. GB-5 is a TRIPWIRE ON THE ROUTINE TOOL, not a capability boundary. The boundary is the CREDENTIAL — lanes hold the owner's admin token — and that class closes only when lanes get a credential without Administration:write (a fine-grained token or an App), which is the owner's surface and is named in ORDER 4, not attempted here.

PRECONDITION: master is at the forty hex in `the-gate`; your branch is cut from origin/master at the moment you start (print `git rev-parse origin/master` as forty hex). You land through the new route: push, open ONE pull request, the workflow arms auto-merge, the scout posts the fifth context on your head, GitHub merges. You do NOT run `gh pr merge`, you do NOT run `npm run land`, and you do NOT touch the ruleset — the card that fences ruleset writes is the last card that may not write one.

```evidence:raw-tokens
scout RED on v1 with the v2 spec   997f2209-3ddd-4dc0-b610-79088d50475f
scout GREEN with F-A               7626e092-382b-460c-b728-8a47e0b82dc0
scout landing measurement          cc381116-5bb3-4a4c-8b72-cdeea880b11f
AG-4 landing slip                  acb3abf4-de40-4fbf-ad95-45729677d1b9
ruleset id, as the API prints it   21034238   name master-merge-gate
```

```evidence:the-gate
master          dd836a2a3781b5cc8a3ae416eea49c7dc120be57   Merge pull request #582, merged 2026-09-17T20:30:52Z by app/github-actions — the first landing with no card, no seal, no foreman
ruleset         master-merge-gate on the default branch: enforcement active · rules deletion, non_fast_forward, required_status_checks · contexts changes · rule26 · build (24.x) · relay corpus (grammar v1) · adversary/scout · strict false · bypass_actors [] · current_user_can_bypass never
the guard       .claude/hooks/guard-bash.py at that master: FOUR rules, numbered in their refusal titles — GB-1 the skip-permissions flag · GB-2 gh pr merge without the foreman role · GB-3 gh pr merge with any flags but the blessed pair · GB-4 git push with a bare force flag. No rule inspects `gh api`; no rule inspects `gh repo edit`. Your number is GB-5.
the trap        `positionals()` KEEPS flag values despite its own docstring: `gh api -X PUT repos/o/r/rulesets/1` tokenises to api, PUT, repos/o/r/rulesets/1. So scan ALL arguments for the path, read the method as the token after -X or --method and also handle --method=VALUE, and never assume the endpoint is the second positional.
measured        the guard, the enumeration, the gh semantics and the breakage scan by the SCOUT between 2026-09-17T20:49Z and 2026-09-17T20:56:16Z, in the reply row named in `raw-tokens`; the Architect re-read none of it and says so
```

```evidence:the-paths
weaken, all writable by the lane credential today:
  PUT and DELETE on the ruleset endpoint (a lane performed the PUT tonight, under the auto-merge card ORDER 1)
  PUT and DELETE on a branch protection path (cannot loosen a ruleset; harmless to fence and fenced for symmetry)
  PATCH on the repository endpoint carrying default_branch, and `gh repo edit --default-branch` — RETARGETS the ruleset's ~DEFAULT_BRANCH condition off master WITHOUT touching the ruleset
  seven GraphQL mutations through `gh api graphql`, measured by Mutation-type introspection: updateRepositoryRuleset · deleteRepositoryRuleset · createRepositoryRuleset · updateBranchProtectionRule · deleteBranchProtectionRule · updateRepository and the seventh the scout printed in its row
gh semantics, quoted from `gh api --help` by the scout: the default method is GET normally and POST if any parameters were added; `--input <file>` supplies a body and gh's own example for it is the rulesets endpoint with NO method; `--method GET` with fields stays a GET
freeze, NOT weaken, and deliberately NOT fenced: the repository flags that turn auto-merge or merge commits off (`allow_auto_merge`, `allow_merge_commit`, or the `gh repo edit` equivalents). Nothing lands when they are off — that is the owner's hatch by another name, and ORDER 4 names it rather than fencing it.
governed already: the workflow file itself, which can only change through a pull request that passes this gate
unfenceable by path, by design: the adversary status write from any window — the contract already calls that independence PROCEDURAL, and the same path is the legitimate write
```

## PREMISE

MEASURED: the guard's four rules, their numbering and the `positionals()` trap — the scout, reading `.claude/hooks/guard-bash.py` at the master in `the-gate`, row in `raw-tokens`.
MEASURED: the three open paths in `the-paths` — the scout, by Mutation-type introspection, `gh api --help` and `gh repo edit --help`, same row.
MEASURED: nothing in the repository reads or writes these endpoints today — the scout, one grep over scripts, package.json, the workflows and the hooks at master: three COMMENT hits only.
MEASURED: the adversary status write is unaffected, because its path matches neither pattern — the scout, naming its own status call.
UNMEASURED: whether the seven mutation names are the complete set for this schema version — the scout introspected the Mutation type and named seven; ORDER 1 greps for them as unique tokens, which is exact for what it covers and blind to a name added later, and ORDER 4 says that out loud.
SELF-INVALIDATION: this premise dies if the ruleset is no longer active, if a bypass actor has appeared, or if the guard already carries a GB-5.

## ORDERS

ORDER 1 - WRITE GB-5, in the guard's own style, covering FOUR clauses and no more. (i) RESOLVED method is not GET and the path touches the gate: path contains `/rulesets` or matches `/branches/` then anything then `/protection`. Resolve the method the way gh does: an explicit `-X`/`--method`/`--method=VALUE` wins; otherwise a body makes it a POST, and a body is any of `-f`, `-F`, or `--input`. (ii) The path is exactly `graphql` and the arguments or the input body contain any of the mutation names in `the-paths` — match them as unique tokens, which is cheap and exact. (iii) `gh repo edit` carrying `--default-branch`, and a non-GET on the repository endpoint carrying `default_branch`. (iv) Nothing else: a GET stays permitted, `gh ruleset list`/`view`/`check` stay permitted, a GraphQL READ stays permitted, and the freeze flags in `the-paths` stay permitted because they are the owner's hatch. Mind the trap named in `the-gate`. The refusal message names this card and says where a gate change now lives: the owner's repository settings. NO env flag, NO exemption, NO lane role that lifts it — every window, the foreman's and a future Architect's included.

ORDER 2 - PROVE IT BY EXERCISING IT, in the guard's existing test file and style. REFUSED: `-X PUT` on the ruleset path · `-X DELETE` on it · a body-only call with `-f` on it · a body supplied by `--input` on it · `-X PUT` on a branch protection path · a `gh api graphql` call carrying one of the mutation names · `gh repo edit --default-branch`. PERMITTED, and these are the positive controls that matter: a GET on the ruleset path · `gh api graphql -f query=<a read query>` · `gh api -X POST` on a statuses path with a forty-hex sha (the adversary's own write, which must not be collateral) · `gh ruleset list`. Print the failing-first counts: red on the fork point, green on your head.

ORDER 3 - THE DRIFT READ the factory never had: `scripts/rulesetDrift.ts` (grep for an existing consumer first, section 12.6, and say which you found). It GETs the ruleset and compares it to the declared shape — the context names, strict false, enforcement active, empty bypass, and the deletion and non-fast-forward rules — printing DRIFT with a per-field diff or NO-DRIFT, and exiting non-zero on drift. An npm script ONLY: do not wire it into a workflow and do not make it a required context under this card, because a gate that reads a live setting can freeze master when the API is slow.

ORDER 4 - DOCUMENT FOUR THINGS in `docs/ground/AUTO-MERGE-LANDING-v1.md`, one short section: (a) the gate's DEFINITION is the owner's surface and no lane may write it; (b) GB-5 is a tripwire on the routine tool and NOT a capability boundary — the boundary is the credential, and the class closes only when lanes hold a credential without Administration:write, which is the owner's to create; (c) the freeze flags are not fenced, deliberately, because they only stop landings and are his hatch by another name; (d) a required context that STOPS BEING PRODUCED is the one real freeze — a never-reported check is Pending and blocks — so a job RENAME is two steps, the owner adds the new context before the old one stops, and the drift script is what notices. Then CLAUDE.md's landing paragraph: two sentences, NO NUMBER, saying (a) and (b). While you are in that paragraph, the scout's earlier F-2 says one sentence there is stale about where the landing verdict lives — fix it in the same edit or say in your report why you did not.

ORDER 5 - LAND IT THROUGH THE NEW ROUTE, which this card also tests. Push, open ONE pull request titled `RULESET-WRITE-FENCE-S141-1: the gate stops being its own editor`, print the number and the head as forty hex, print `gh pr view <n> --json autoMergeRequest,mergeStateStatus` (BLOCKED with auto-merge enabled is the expected reading), and WAIT for the scout's status and GitHub's merge. Then print master's new forty hex and the Vercel production record, and post ONE from_lane slip. If it has not landed within thirty minutes of your last green, name the ONE measured reason (section 12.8) instead of waiting silently.

## FALSIFIER

Wrong if the fence carries any env-gated exemption, any lane-role lift, or any break-glass flag. Wrong if it refuses a GET, a GraphQL read, `gh ruleset list`, or the adversary's status POST. Wrong if it misses any clause in `the-paths` that ORDER 1 names — a body via `--input`, a mutation through `graphql`, or the default-branch retarget. Wrong if it fences the freeze flags. Wrong if it treats the second positional as the endpoint (the trap). Wrong if the drift script is wired into a workflow or made required. Wrong if this branch touches the ruleset, runs `gh pr merge`, or runs `npm run land`. Wrong if the guard's existing rules are renumbered. If the guard already carries a GB-5 that does this, STOP and print it — a finding, not a failure.

## SHARED SURFACES

```scope
- .claude/hooks/guard-bash.py (ONE new rule, GB-5, nothing else touched)
- the guard's own test file (the cases in ORDER 2, beside the existing ones)
- scripts/rulesetDrift.ts (new) and its npm script entry in package.json
- docs/ground/AUTO-MERGE-LANDING-v1.md (one short section, four points)
- CLAUDE.md (two sentences in the landing paragraph, no number, plus the stale sentence)
- docs/relay/RULESET-WRITE-FENCE-S141-1-AG4-report.md
```

Not in scope: the ruleset itself, scripts/land.ts, supabase/, any product path, any workflow file.

## DECISION RIGHTS

Yours: GB-5's exact match expressions, the test names, the drift script's shape and output, the wording of both documentation edits. Not yours: the four clauses and their boundaries, that there is no exemption path, that reads stay permitted, that the freeze flags stay unfenced, that the drift script is unwired, and that the gate's definition is the owner's surface.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is at the fenced forty hex, landed by the bot with no card | MEASURED: the scout's landing row and AG-4's own slip, rows in raw-tokens | the-gate |
| the guard has four rules, none inspecting gh api, and positionals keeps flag values | MEASURED: the scout reading the hook file at that master | the-gate |
| the three open write paths and the seven mutation names | MEASURED: the scout, introspection plus the two help pages | the-paths |
| no script in the repository touches these endpoints today | MEASURED: the scout, one grep over scripts, package.json, workflows and hooks | the-paths |
| whether the mutation list is complete for later schema versions | NOT-READ | ORDER 4 states the limit; a later name is not covered |
| what the guard's tests currently assert | NOT-READ | ORDER 2 reads the file before adding to it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the ruleset stops being active, if a bypass actor appears, if the guard is found to carry a GB-5 already, or if a v3 appears.
