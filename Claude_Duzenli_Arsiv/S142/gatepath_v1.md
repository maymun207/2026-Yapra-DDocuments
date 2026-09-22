<!-- relay-audit: v1 kind=card -->
CARD-GATE-PATH-SCOPE-S141-1-v1

LANE: AG-4
fanout: personalized
A ONE-LINE CURE, and it is the adversary's own finding against work it had just passed GREEN. GB-5 landed on master in PR 583 and the fence works: the scout ran the suite (44 guilty blocked, 30 innocent passed) and the drift script (self-test 6/6, live NO-DRIFT). Then it planted a case the suite does not carry and the fence refused an INNOCENT command. THE DEFECT: clause (i) matches GATE_PATH against every element of api_args, flag VALUES included, so a status POST whose description text happens to end in the gate path token is refused. THE CURE, in the scout's words: match GATE_PATH against the `endpoints` list that `gh_api_shape()` already returns, not against `api_args`. This is a WIRING change, not a new mechanism (section 12.6): the shape function already computes the endpoints; clause (i) simply reads the wrong field.

PRECONDITION: your branch is cut from origin/master at the moment you start, and master is at the anchor below or later; print `git rev-parse origin/master` as forty hex. There is no lock ref and no landing card in this route — the gate lands you.

```evidence:the-anchor
master            dcba9fe49a3dae0d4b058ec8f94d21d41cbaee49   Merge pull request #583, by github-actions[bot], 2026-09-17T21:49:22Z
the landed work   75a944c88e4088233b2b44376fa916384294d747 (the fence) and 299809ed4ce11471e275069304826b07d262c243 (its report)
the scout status  context adversary/scout, SUCCESS, on 299809ed4ce11471e275069304826b07d262c243, 2026-09-17T21:37:34Z
the finding       scout row 9ee1e7d4-d9cb-4316-a7dc-4fd7175e5153, discriminator (e), measured by planting the case
```

## PREMISE

MEASURED: the fence is on master and green — the seven paths of PR 583, the suite and the drift script run by the scout, not by its author's report.
MEASURED: the false refusal, by the scout, by planting it: a status POST carrying a description that ENDS with the gate path token exits 2 with the non-GET-on-a-gate-path message, while the same description followed by a space and more words exits 0. The discriminating byte is where the token sits in the value, which is exactly what makes it an accident rather than a rule.
UNMEASURED: whether any OTHER clause reads api_args where it should read a computed field. ORDER 2 answers it for clauses (ii) (iii) (iv) by reading them, and your report says so per clause.
SELF-INVALIDATION: this premise dies if `gh_api_shape()` does not in fact return an endpoints list separate from the raw arguments — then the cure is to make it do so, you say that, and the change is larger than one line.

## ORDERS

ORDER 1 - FIX CLAUSE (i). In `.claude/hooks/guard-bash.py`, clause (i) matches GATE_PATH against the endpoints `gh_api_shape()` resolves, not against the raw argument list. Nothing else about the clause changes: the method resolution stays exactly as it landed (an explicit method flag wins; otherwise a body made of -f, -F or --input makes it a POST), and the fenced paths stay exactly the two the card named. A path that arrives as a flag value rather than as an endpoint is not an endpoint and is not fenced by this clause.

ORDER 2 - READ THE OTHER THREE CLAUSES AND SAY, PER CLAUSE, whether it reads the raw arguments or a computed field, and whether that is correct for what the clause judges. Clause (ii) matching mutation names anywhere in a graphql body or arguments is CORRECT and stays — a mutation name is content, not an endpoint. Clause (iii)'s `default_branch` check over arguments and body is CORRECT and stays. If you find a second accident, you FIX it in this card and name it; if you find none, your report says you looked and found none. Do not widen any clause.

ORDER 3 - PROVE IT IN THE SUITE, BOTH DIRECTIONS. Add to `.claude/hooks/guard-bash.test.py`: the planted innocent case (a status POST whose description ends with the gate path token, and a second whose description carries the token mid-sentence) — both must pass; and the guilty positive controls that must STILL be refused, so the cure cannot be a hole: a PUT on the rulesets endpoint, a DELETE on the protection endpoint, and a body-only POST on each. Run the whole suite and print its own summary line verbatim, including the counts. A cure that lowers the guilty count is a hole, and your report prints the guilty count before and after.

ORDER 4 - LAND IT THROUGH THE ROUTE, with no landing card. Push the branch and open ONE pull request titled `GATE-PATH-SCOPE-S141-1: the fence stops reading flag values as endpoints`. The auto-merge workflow arms it; the four CI contexts and `adversary/scout` gate it; the scout reviews your diff and posts the fifth context; GitHub merges. Do NOT run `gh pr merge` in any form, do NOT post the adversary status yourself, and do NOT re-run a run to chase a green. Your report follows the landing and never gates it (section 12.8): if the code is ready and the report is not, push the code.

## FALSIFIER

Wrong if the guilty count in the suite falls. Wrong if clause (i) stops fencing a real non-GET on a real gate endpoint — name the three positive controls in your report with their exit codes. Wrong if any clause is widened beyond what GB-5 landed with. Wrong if `scripts/rulesetDrift.ts`, the contract page or CLAUDE.md are edited: the cure is invisible to all three. Wrong if you touch the auto-merge workflow or the ruleset. Wrong if a secret VALUE appears in any output. Wrong if you merge anything by hand.

## SHARED SURFACES

```scope
- .claude/hooks/guard-bash.py (clause (i) only, plus any second accident ORDER 2 finds)
- .claude/hooks/guard-bash.test.py (new cases, both directions)
- docs/relay/GATE-PATH-SCOPE-S141-1-AG4-report.md
```

Not in scope: scripts/rulesetDrift.ts, docs/ground/AUTO-MERGE-LANDING-v1.md, CLAUDE.md, .github/, supabase/, any product path. One branch, one pull request.

## DECISION RIGHTS

Yours: how clause (i) reads the endpoints, the exact test cases beyond the ones named, the report's wording. Not yours: whether clauses (ii) and (iii) keep reading arguments (they do), the fenced path set, and who posts the adversary status.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the fence landed on master in PR 583 with seven paths | READ: git log and diff of the merge commit in the-anchor, shared clone, 2026-09-17T21:53:30Z | the-anchor |
| a status POST whose description ends with the gate path token is refused | MEASURED: scout planted the case, both spellings, exit 2 and exit 0 | the-anchor |
| the suite and the drift script are green in the scout's own run | READ: scout row named in the-anchor | the-anchor |
| whether another clause reads the wrong field | NOT-READ | ORDER 2 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if GB-5 is superseded, if the landing route changes, or if a v2 appears.
