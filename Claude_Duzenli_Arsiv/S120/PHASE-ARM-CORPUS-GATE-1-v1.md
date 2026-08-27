<!-- relay-audit: v1 kind=card prov=1 -->
# PHASE-ARM-CORPUS-GATE-1-v1
fanout: personalized — one address, AG-4.

PRECONDITION: the landing wave has DRAINED. Do not begin ORDER C until no `phase/` branch carries a commit absent from master, or until the landing address has reported the wave complete and named what it deliberately left behind. **ORDERS A, B and the first half of D are measurements and may run at any time. ORDER C is the only write and it waits.**

MEASURED-AT 2026-08-26T19:10:00Z. Read by the Architect from your own landed report, a fresh worktree at the current master, and the live bus.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this premise DECAYS on any change to the ruleset or to the corpus workflow. Both are the subject, and a decayed premise here is not a nuisance — it is a reason to stop.

## PREMISE
- MEASURED:your own landed report, read from the trunk @2026-08-26T19:08:00Z — the credential holds admin on the repository, its token carries the repo scope, and the authenticated identity IS the repository owner. Three surfaces, none of them the successful read.
- MEASURED:the same report's ruleset read @2026-08-26T19:08:00Z — the bypass-actor list is empty and the ruleset independently reports that the current identity can never bypass. The guarantee is the strong one.
- MEASURED:the same read @2026-08-26T19:08:00Z — the required-context list carries exactly one entry, and the corpus job is not that entry.
- MEASURED:the same read @2026-08-26T19:08:00Z — the strict up-to-date policy is ON, so a branch must be current with the target before it merges.
- MEASURED:the owner's own words in this session, relayed verbatim by the Architect who put the question to him @2026-08-26T16:00:00Z — asked whether the corpus job should be added to the required-context list, he answered "evet". **That is NAMED CONSENT for THIS change and for nothing wider.**
- MEASURED:a fresh worktree and remote listing @2026-08-26T19:09:00Z — seventeen phase branches still carry commits absent from master, and the landing address is actively merging.
- UNMEASURED — the EXACT context string the corpus job publishes to a pull request. The workflow's own name field is a guess at it, and **a required context that never reports under the name it is registered as blocks every merge forever.** This is ORDER A and it is the whole risk of this card.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this card was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the credential is permitted to write the ruleset | MEASURED: the account permission block · the token scope listing · the authenticated identity matching the repository owner field | permitted |
| the ruleset's bypass list holds zero entries, and a second field independently reports the current identity can never bypass | MEASURED: the bypass-actor field in the ruleset object · the can-bypass field in that same object, which is a separately computed answer rather than a restatement of the list | bypass |
| the required-context list carries exactly one entry, which is not the corpus job | MEASURED: the ruleset's required-status-checks parameters | required |
| seventeen phase branches are still AHEAD of master, each carrying at least one commit of its own | MEASURED: a per-branch cherry comparison against a freshly fetched master · a merge-base ancestry test over the same remote branch listing | wave |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
2f409c59a2e51b0b09f1d0aa2c1d0e8f6cb43e17
```

```evidence:permitted
$ the account layer
"permissions":{"admin":true,"maintain":true,"push":true}  "owner_type":"User"
$ the credential layer
Token scopes: 'admin:public_key', 'gist', 'read:org', 'repo', 'workflow'
$ the ownership layer
authenticated login == repository owner field
```

```evidence:bypass
$ from the ruleset object
"enforcement":"active"
"bypass_actors":[]
"current_user_can_bypass":"never"
```

```evidence:required
$ required_status_checks parameters
"strict_required_status_checks_policy":true
"do_not_enforce_on_create":false
"required_status_checks":[{"context":"build (24.x)"}]
```

```evidence:wave
$ per-branch cherry against a freshly fetched master
phase/ branches still carrying a commit absent from master: 17
landing address state: CLAIMED, merging
```

## WHY THIS CARD IS THE MOST DANGEROUS ONE IN THIS SESSION
Every other card this session measured something or designed something. **This one changes who may merge.**

The failure mode is not a red test. It is a TRUNK THAT CANNOT MERGE AT ALL. Register a required context under a name nothing publishes, and every pull request waits forever for a check that will never report. There is no bypass actor to rescue it — ORDER B of your own probe established that the list is empty and even the owner's own identity can never bypass. **The safety net was measured, and it is not there.**

That is also why this card waits for the wave. Seventeen branches are mid-flight. Arming a gate underneath a landing run risks converting a working factory into a stalled one, and the cost of waiting an hour is nothing against that.

> The owner's consent covers ADDING THE CORPUS JOB AS A REQUIRED CHECK. It does not cover removing a check, changing enforcement, editing conditions, touching bypass actors, or altering any other rule in that ruleset. **Anything you touch beyond the required-context list is outside his consent and is a violation of it, not an extension.**

## ORDER A — MEASURE THE EXACT CONTEXT STRING, FROM A REAL RUN
Do NOT take the string from the workflow's name field. Read the check runs actually published against a recent pull request and report the corpus job's context string **exactly as the API returns it**, byte for byte, including case and spacing.

**Then confirm the same string appears on more than one pull request**, so the answer is not an artefact of a single run. If the string differs between runs, STOP — a context that is not stable cannot be required, and that finding cancels this card.

## ORDER B — CONFIRM IT PUBLISHES ON EVERY PATH THAT MERGES
The point of this gate is the documentation-only pull request, where the existing required check passes having tested nothing. **Confirm the corpus job publishes its context on a docs-only pull request specifically**, not merely on a code one.

If there is any pull-request shape on which it does NOT report, name that shape. **A required check absent on even one merge path is a permanent block on that path**, and that is a reason to stop rather than a detail to note.

## ORDER C — ARM IT · THE ONLY WRITE IN THIS CARD
After the PRECONDITION holds and ORDERS A and B have answered cleanly: add the measured context string to the required-context list, **preserving the existing entry**.

Read the current ruleset, add exactly one entry, write it back, then **read it again and print the resulting list**. The object you send must be the object you read plus one entry — not a fresh object assembled from what you believe the fields are, because an assembled object silently drops what it does not know about.

**Print the before list and the after list side by side in your report.**

## ORDER D — THE POSITIVE CONTROL, BOTH DIRECTIONS
An armed gate that blocks everything and an armed gate that blocks nothing look identical from a distance. Measure both directions:

- **It still lets good work through.** Confirm a pull request whose checks pass is still mergeable. **If merging is now blocked for everything, REVERT to the before-list immediately, print both lists, and report — that revert is pre-authorised by this card and needs no further consent.**
- **It now stops bad work.** Say how a red corpus would be blocked where it previously was not, reasoning from the ruleset's own state. Do not plant a failure on the trunk to demonstrate it.

## ORDER E — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a rate limit, a partial write — report its exact text and STOP. **A half-applied ruleset is worse than an unarmed one**, and a quiet retry is how one gets made.

## FALSIFIER
1. If ORDER C runs before the PRECONDITION holds, the card FAILED.
2. If the context string is taken from the workflow file rather than from published check runs, the card FAILED.
3. If anything in that ruleset other than the required-context list is modified, the card FAILED — that is outside the owner's consent.
4. If the existing required entry is dropped or replaced rather than preserved, the card FAILED.
5. If the after-state is reported without the before-list printed beside it, the card FAILED.
6. If merging becomes blocked and the state is left armed pending instructions, the card FAILED — the revert is pre-authorised and immediate.

## SHARED SURFACES
Only the required-context list of the one active ruleset may be written, and only under ORDER C. Every workflow file, every branch protection, the bypass list, the enforcement field and the ref conditions are READ-ONLY. No branch is landed, amended, rebased or force-pushed. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
Whether the corpus job becomes required is the OWNER's and **he has consented; that decision is closed and is not reopened here.** Whether the string is correct and the gate is safe to arm is YOURS, and a "not yet, and here is why" from you is a full and welcome answer. Reverting a gate that blocks the trunk is pre-authorised and requires nobody.

## DELIVERY
Branch `phase/arm-corpus-gate-1`. Push it, open the pull request, and report at `docs/relay/PHASE-ARM-CORPUS-GATE-1-AG4-report.md`. Plus the record files the repo's own gates COMPEL, named in your report.
