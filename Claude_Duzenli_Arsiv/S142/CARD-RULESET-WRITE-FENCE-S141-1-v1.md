<!-- relay-audit: v1 kind=card -->
CARD-RULESET-WRITE-FENCE-S141-1-v1

LANE: AG-4
fanout: personalized
NEW SUBJECT, so it goes to the adversary before it reaches you (section 12.1) and this line says so. It is the cure for the scout's own finding F-A, raised inside the GREEN verdict that sealed CARD-AUTO-MERGE-LANDING-S141-1-v2 and left deliberately unfixed there so the landing would not widen: **the gate this factory just built is real against merges and decoration against its own editor.** Master is now governed by the `master-merge-gate` ruleset — five required contexts, enforcement active, `bypass_actors` empty, `current_user_can_bypass` never — and the scout measured that there is NO merge path around it: not `gh pr merge` in a shell (guard-bash refuses first, and GitHub would refuse anyway), not `--admin` (that flag bypasses classic protection only), not a direct push. But the SAME admin credential every window holds can write the ruleset itself: add a bypass actor, drop a context, or set enforcement disabled, with one API call. guard-bash fences the merge verb and a force push. It does not fence a ruleset write. The mechanism that finished the gate — ORDER 1 of the auto-merge card — is itself the proof: a lane did exactly that PUT, tonight.

THE DESIGN, one rule and one habit: guard-bash gains ONE refusal covering every non-GET call to the endpoints that DEFINE the gate, in every lane window, with no env flag and no exemption path — and the gate's definition becomes the OWNER's surface, the same class as a secret. That is a deliberate move of machine work to him, narrow and named: the one thing the machine must not be able to weaken is the definition of what stops the machine. In exchange the factory gains a READ it never had: a GET is untouched, so a lane can measure the live ruleset against what the contract page says and report DRIFT.

PRECONDITION: master is at the forty hex in `the-gate`; your branch is cut from origin/master at the moment you start (print `git rev-parse origin/master` as forty hex). The new landing route is LIVE and is how this card lands: push, open ONE pull request, let the workflow arm auto-merge, let the scout post `adversary/scout` on your head, and let GitHub merge. You do NOT run `gh pr merge`, you do NOT run `npm run land`, and you do NOT touch the ruleset — the card that fences ruleset writes is the last card that may not write one.

```evidence:raw-tokens
scout GREEN with F-A          7626e092-382b-460c-b728-8a47e0b82dc0
scout first FAILURE status    8837e523-0665-4ad9-8f53-1bf7a6321f28   (the two-word law defect)
scout SUCCESS on fourth head  be85ca83-5d07-469a-bb21-289245c7d7b0
scout landing measurement     cc381116-5bb3-4a4c-8b72-cdeea880b11f
scout Vercel READY            3ee117b1-069f-4ffa-ab44-321c0f7098bf
AG-4 landing slip             acb3abf4-de40-4fbf-ad95-45729677d1b9
ruleset id, as the API prints it   21034238   name master-merge-gate
```

```evidence:the-gate
master          dd836a2a3781b5cc8a3ae416eea49c7dc120be57   Merge pull request #582, merged 2026-09-17T20:30:52Z by app/github-actions — the first landing with no card, no seal, no foreman
ruleset         master-merge-gate on the default branch: enforcement active · rules deletion, non_fast_forward, required_status_checks · five contexts (changes · rule26 · build (24.x) · relay corpus (grammar v1) · adversary/scout) · strict false · bypass_actors [] · current_user_can_bypass never
the hole        the admin credential held by EVERY window can PUT/PATCH/DELETE that ruleset. guard-bash GB-2 gates the merge verb on ADF_LANE_ROLE; GB-3 fixes the only legal merge form; neither looks at `gh api` paths. Measured by the scout inside its GREEN, and demonstrated by ORDER 1 of the auto-merge card, which a lane executed at 2026-09-17T19:34:38Z
the verb        the ruleset update endpoint answers PUT; PATCH is route-less and returns 404 (AG-4's finding, scout-confirmed) — so a fence written for PATCH alone would fence nothing
measured        2026-09-17T20:45Z by the Architect from the bus rows in `raw-tokens` and the scout's own values; the CURRENT contents of guard-bash.py are NOT-READ by the Architect and are ORDER 1's first job
```

## PREMISE

MEASURED: the gate's live shape and the absence of any merge path around it — the scout, between 2026-09-17T19:11:53Z and 2026-09-17T20:38:27Z, rows in `raw-tokens`, values in `the-gate`.
MEASURED: the ruleset is writable by the lane credential — the scout named it F-A, and a lane performed the write tonight under the auto-merge card's ORDER 1.
MEASURED: the update verb is PUT and PATCH is route-less — AG-4's report, confirmed by the scout in the same GREEN.
UNMEASURED: the current text of `.claude/guard-bash.py` — its rule numbering, its match shape, and whether it inspects `gh api` at all. ORDER 1 reads it before writing a line.
UNMEASURED: whether any other endpoint can weaken the gate — classic branch protection is the obvious sibling and ORDER 1 covers it, but the enumeration is yours to complete and to print.
SELF-INVALIDATION: this premise dies if the ruleset is no longer active, if a bypass actor has appeared, or if guard-bash already refuses these writes — in which case say so and the card shrinks to its drift half.

## ORDERS

ORDER 1 - READ THE GUARD FIRST, then write ONE rule. Print the current rules with their numbers and the shape they match on. Then add a single refusal, numbered in that file's own sequence, which refuses any `gh api` invocation whose METHOD is not GET and whose PATH contains `/rulesets` or matches `/branches/` followed by anything and then `/protection`. Cover the forms the CLI actually accepts: `-X PUT`, `--method PUT`, `-X DELETE`, `-X PATCH`, `-X POST`, and the implicit POST that `gh api` performs when given `-f`/`-F` fields with no explicit method — that last one is the trap, because a body without a method is not a GET. The refusal message names this card and says in one line where a ruleset change now lives: the owner's repository settings. NO env flag, NO exemption path, NO lane role that lifts it. Every window, including the foreman's and including a future Architect's.

ORDER 2 - PROVE THE FENCE BY EXERCISING IT, not by reading it. Write tests beside the guard's existing ones, in the file and style they already use: a GET on `/rulesets` PASSES; `-X PUT` on the ruleset path is REFUSED; `-X DELETE` is REFUSED; a body-only call with `-f` on that path is REFUSED; a PUT on `/branches/master/protection` is REFUSED; and a positive control that an unrelated `gh api -X POST .../statuses/<forty hex>` is still PERMITTED, because the adversary's own status write goes through that verb and must not be collateral. Print the failing-first counts: the new tests red on the fork point, green on your head.

ORDER 3 - GIVE THE FACTORY THE READ IT NEVER HAD. Write `scripts/rulesetDrift.ts` (or extend the nearest existing check if one already reads repository settings — grep for the consumer before you build, section 12.6, and say which you found): it GETs the ruleset, compares it against the contract's declared shape — the five context names, strict false, enforcement active, empty bypass, and the deletion and non-fast-forward rules — and prints DRIFT with a per-field diff, or NO-DRIFT. It EXITS NON-ZERO on drift. Wire it as an npm script only; do NOT add it to a workflow or to any required context in this card, because a check that gates on a live setting read can freeze master when the API is slow, and that decision is a card of its own.

ORDER 4 - DOCUMENT IT WHERE THE CONTRACT ALREADY LIVES: `docs/ground/AUTO-MERGE-LANDING-v1.md` gains one short section saying that the gate's DEFINITION is the owner's surface, that no lane may write it, that the drift script is how a lane notices a change, and that the owner's enforcement toggle remains both the escape hatch and the tripwire the page already names. Two sentences in CLAUDE.md's landing paragraph, carrying NO NUMBER, saying the same. Nothing else in either file.

ORDER 5 - LAND IT THROUGH THE NEW ROUTE, which this card is also a test of. Push, open ONE pull request titled `RULESET-WRITE-FENCE-S141-1: the gate stops being its own editor`, print the pull request number and the head as forty hex, print `gh pr view <n> --json autoMergeRequest,mergeStateStatus` (BLOCKED with auto-merge enabled is the expected reading), and WAIT. The scout reviews your diff and posts the fifth context; GitHub merges. Then print master's new forty hex and the Vercel production record, and post ONE from_lane slip. If the landing does not happen within thirty minutes of your last green, name the ONE measured reason (section 12.8) rather than waiting silently.

## FALSIFIER

Wrong if the fence carries any env-gated exemption, any lane-role lift, or any break-glass flag. Wrong if it refuses a GET. Wrong if it refuses a commit-status POST (the adversary's own write). Wrong if it matches only `-X PATCH` and lets the body-only implicit POST through. Wrong if the drift script is wired into a workflow or made a required context under this card. Wrong if this card's own branch touches the ruleset, runs `gh pr merge`, or runs `npm run land`. Wrong if guard-bash's existing rules are renumbered or edited beyond the addition. If the guard already refuses these writes, STOP on ORDER 1 and print the rule that does it — that is a finding, not a failure.

## SHARED SURFACES

```scope
- .claude/guard-bash.py (ONE new numbered rule, nothing else touched)
- the guard's own test file (new cases beside the existing ones)
- scripts/rulesetDrift.ts (new) and its npm script entry in package.json
- docs/ground/AUTO-MERGE-LANDING-v1.md (one short section)
- CLAUDE.md (two sentences in the landing paragraph, no number)
- docs/relay/RULESET-WRITE-FENCE-S141-1-AG4-report.md
```

Not in scope: the ruleset itself, scripts/land.ts, supabase/, any product path, any workflow file.

## DECISION RIGHTS

Yours: the rule's exact match expression and its number, the test names, the drift script's shape and output format, the wording of both documentation edits. Not yours: that there is no exemption path, that GET stays permitted, that the status POST stays permitted, that the drift script is not wired into CI under this card, and that the gate's definition is the owner's surface.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is at the fenced forty hex, landed by the bot with no card | MEASURED: the scout's landing row in raw-tokens, and AG-4's own slip | the-gate |
| the ruleset shape: five contexts, strict false, active, empty bypass, never bypassable | MEASURED: the scout, gh api on the ruleset by the id in raw-tokens | the-gate |
| no merge path exists around the gate, and the ruleset write is the hole | MEASURED: the scout's F-A inside its GREEN verdict | the-gate |
| the update verb is PUT and PATCH is route-less | MEASURED: AG-4's report, scout-confirmed | the-gate |
| what guard-bash currently refuses | NOT-READ | ORDER 1 reads and prints it first |
| whether any endpoint other than rulesets and classic protection can weaken the gate | NOT-READ | ORDER 1 enumerates and prints |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the ruleset stops being active, if a bypass actor appears, if guard-bash is found to fence these writes already, or if a v2 appears.
