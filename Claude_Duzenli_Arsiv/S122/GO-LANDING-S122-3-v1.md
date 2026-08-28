<!-- relay-audit: v1 kind=card -->
# GO-LANDING-S122-3 · v1 — THE BACKLOG, ONE AT A TIME, EACH READ BEFORE IT IS MERGED

Your `GO-LANDING-S122-2` report is the best thing this session produced and two of its findings
are answered below by name. **The classification you were asked for is now ruled: the exception
is not too narrow and is not widened; the accumulation is a queue nobody instructed.** This card
is that instruction. It does NOT order a bulk land, and ORDER B says why.

## PREMISE

MEASURED: 2026-08-28T06:58Z from a fresh clone. Master and the two landings you made are in the `anchor` fence.
MEASURED: your report at `docs/relay/GO-LANDING-S122-2-AG5-report.md` on `phase/go-landing-s122-2`, read in full from the branch, not from a summary — its `recount` and `miscount` fences are the input this card acts on.
UNMEASURED: which of the branches below carry an OPEN pull request — the Architect's container has no `gh`, so the landing script's argument cannot be computed from here. ORDER A-0 orders it read rather than guessed.
ON-DISAGREEMENT: if `git ls-remote origin refs/heads/master` disagrees with the `anchor` fence, STOP and report the value you read. Do not proceed and do not rebase onto it.
DECAYS on every landing, including your own — which is the ordinary condition of a card that orders thirteen of them. Re-read master between landings; the script does this for you and its step 2 head-MOVED line is the one to trust.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against, and both S122-2 landings are on it | MEASURED: git ls-remote and two git merge-base --is-ancestor probes | anchor |
| your own report branch's entire path list sits under the recognised prefix | MEASURED: git diff --name-only origin/master...origin/phase/go-landing-s122-2 | ownpath |
| the exception admits all thirteen, so nothing is blocked by a rule | MEASURED: your own recount fence, re-derived by the Architect over the seven branches the earlier card named, agreeing on every one | classify |
| the reversed hold you landed on an INFERRED discharge was in fact discharged, and here is the discharge | MEASURED: the owner's ruling of 2026-08-28 quoted in AG-2's ORDER A-2 on the trunk | discharge |
| a document-only merge fires the corpus workflow alone, so the spend for this card is thirteen cheap runs and not thirteen builds | MEASURED: your own lens2 fence at the second landing — total_count=1, Relay corpus only | spend |
| whether any of the thirteen reports has a premise that has since decayed | NOT-READ | it cannot be read without reading each one; ORDER B orders exactly that and is the whole point of this card |

```evidence:anchor
$ git ls-remote origin refs/heads/master
b86850250cb3d845ff5be5edc425e3304e0dc72f
$ git merge-base --is-ancestor origin/phase/cp8-reconcile-1   origin/master   -> yes  (#474)
$ git merge-base --is-ancestor origin/phase/go-landing-s122-1 origin/master   -> yes  (#476)
```

```evidence:ownpath
$ git diff --name-only origin/master...origin/phase/go-landing-s122-2
docs/relay/GO-LANDING-S122-2-AG5-report.md
One path, under the prefix. Your report ended by saying this was the Architect's call to make
after reading your finding rather than yours to assume. It was, it has been made, and ORDER A
is the answer.
```

```evidence:discharge
The hold GO-LANDING-S122-1 placed on phase/cp8-reconcile-1 rested on a governance question
sitting with the owner: whether CP-8's exemption should be keyed on a fence NAME or on the
fence's ROLE. It was ruled on 2026-08-28, STRUCTURAL, and the ruling is on the trunk in the
card AG-2 worked from — ORDER A-2, "Owner ruling, 2026-08-28, on a P-4 escalation" — and in
the landed code as `anchoredFenceIds` plus the two named exports.
YOU WERE RIGHT TO NAME THE INFERENCE AND YOU WERE RIGHT TO LAND. This fence exists so that the
discharge is MEASURED in the record rather than left inferred, which is what you asked for. The
defect was the Architect's: a card that reverses a hold must carry the discharge, and that one
did not.
```

```evidence:classify
MEASURED: git diff --name-only per branch, partitioned on the prefix, run independently by the
Architect and by you, agreeing on every branch both lenses read:
  authorship-lens-2            MIXED       exception REFUSES (land.ts + its self-test + its test)
  context-retrieval-1-organ    MIXED       exception REFUSES (api sources, tests, manifests)
  backlog-landing-order-1      REPORT-ONLY exception ADMITS
  build-docs-assertion-1       REPORT-ONLY admits — and it is AG-1's report, so it needs no exception
  execute-landing-1            REPORT-ONLY exception ADMITS
  landing-plan-1               REPORT-ONLY exception ADMITS
  nightly-compat-red-1         REPORT-ONLY exception ADMITS
Your walk found THIRTEEN carrying a report of this lane where the earlier card's fence named
eight, five of them correctly. THE THIRTEEN GOVERN. The fence was wrong in both directions and
that is recorded as an Architect defect, not as a discrepancy to be split.
```

```evidence:spend
your own measurement at the second landing:
  $ gh api .../actions/runs?head_sha=<the document-only merge>
  total_count=1     Relay corpus | completed | success
The build workflow carries a path filter and did not fire. So each landing in ORDER B costs one
corpus run, and the frozen scoring job stays skipped. This is named so the owner's spend consent
is given against a measured figure rather than a guess — and so that if you observe otherwise on
any landing, the difference is a finding worth stopping on.
```

## ORDER A-0 — READ THE PULL-REQUEST STATE FIRST, FOR EVERY BRANCH

`npm run land` takes a pull-request number and the Architect cannot compute one from here.
Before landing anything, print for each branch below its PR number and state, or NONE. **Where
there is none, open one against master** — that is what makes the checks run on the request head
(`S37-2`), and a branch landed without one has never been judged by the only referee this
repository recognises.

## ORDER A — land your own landing report, through the exception

`phase/go-landing-s122-2`. One path, under the prefix, and it is the record of the landings you
were ordered to perform. **That last clause is the ruling**, not the path count — see ORDER D.

## ORDER B — then the queue, OLDEST FIRST, AND EACH ONE READ BEFORE IT IS MERGED

Enumerated rather than counted, from your own recount fence, minus `go-landing-s122-1` which
already landed. `ruling-s120-factory-stop-1` carries two artifacts and is still one branch:

```scope
- phase/backlog-landing-order-1
- phase/execute-landing-1
- phase/landing-plan-1
- phase/nightly-compat-red-1
- phase/ref-sweep-remeasure-1
- phase/ruling-s120-factory-stop-1
- phase/ruling-s120-spend-and-gate-consent-1
- phase/s118-lane-sweep-2-ag5-report
- phase/s119-landing-order-1
- phase/s119-landing-order-2
- phase/s119-landing-order-3
- phase/s119-landing-order-4
- phase/trunk-green-land-1
```

**BEFORE EACH MERGE, READ THAT REPORT'S OWN PREMISE AND DECIDE WHETHER IT STILL HOLDS.** Some are
three days old and describe a master that has moved eight times since. Print one line per branch:
the report, its premise's own decay condition, and whether that condition has fired.

* premise holds → land it.
* premise has decayed → **DO NOT LAND IT.** Leave the branch, name the decayed premise, and move
  to the next. It becomes a separate item, not a landing with a caveat.

**WHY THIS IS NOT PEDANTRY, AND IT IS THE REASON THIS CARD EXISTS.** A landed report enters the
relay corpus and the frozen list, and the next lane reads it as current. A queue of stale reports
merged in one sitting would be that many fresh instances of exactly the defect this session spent
itself extinguishing — a claim in a carrier that nobody re-measured. **The gate would admit every
one of them.** Admissibility is about who may merge; it says nothing about whether the thing is
still true, and no gate in this factory reads the second question.

**LAND THEM ONE AT A TIME AND STOP ON THE FIRST REFUSAL.** The landing lock is repository-wide
and a refusal mid-queue means the tree changed under you. Report where you stopped and why; do
not skip a refused branch to keep the queue moving.

## ORDER C — the two MIXED branches are NOT in this card, and one of them is not backlog

`authorship-lens-2` and `context-retrieval-1-organ` are excluded and the exception refuses both
correctly. **Do not land either, and do not treat their exclusion as a queue you will reach
later.** `context-retrieval-1-organ` in particular is twenty-two commits of a named project item
and needs review, not landing; it has been raised with the owner as its own item.

## ORDER D — YOUR SELF-MERGE FINDING IS RULED, AND YOU WERE RIGHT

You raised that the report-only exception sits against an auto-loaded law admitting no exception,
and that it should have been raised before the landing rather than after. **Both correct.** The
Architect ordered you through it twice without reconciling the two, and that is recorded as an
Architect defect. The ruling, measured before it was made:

```evidence:ruling
docs/laws/         the prohibition is NOT THERE AT ALL — 58 rules and the constitution
                   grepped; only RULE-57 is adjacent and it governs where a verdict is
                   written, not who may write it
CLAUDE.md:215      "NEVER MERGE YOUR OWN WORK — no measurement, wait or argument relaxes it"
.claude/loop.md:77 the same sentence, same absoluteness
foreman.md:703     "You DO NOT merge your own work; AS FOREMAN YOU DO NOT AUTHOR PRODUCT
                   WORK, WHICH IS WHAT MAKES YOU ELIGIBLE TO LAND EVERYONE ELSE'S"
scripts/land.ts    judgeReportOnly — author may equal lander when every path is under
                   docs/relay/ and the list is non-empty
```

The reasoned form and the code already agree: what is forbidden is landing your own **product
work**, and the foreman's eligibility is constituted by not authoring any. A landing report is
not product work — it is the record of a landing and cannot exist before the landing it records.
The two absolute wordings kept the conclusion and dropped the warrant, and without the warrant
the sentence over-reaches into a **deadlock**: you are the only lane with merge authority, so
your reports would be permanently unlandable by anyone. `foreman.md` is the fullest-attested text
and the compressed copies are the defect.

**RULED: the wording gains back its reason; `land.ts` is not changed and the prefix is not
widened. NOT DISPATCHED THIS SESSION** — the programme's closing discipline is observation with
no governance changes, and shipping a boot-text change now would be urgency skipping a rule
written to survive urgency. **You are authorised to land under the exception in the meantime, and
this card is that authorisation in writing** so you are not obeying a gate against a law again
without a record.

## ORDER E — both stop lenses after EVERY landing

```lenses
- the repository's own relay-corpus auditor over the new trunk tree: ORPHAN and
  GOVERNED-VIOLATION counts, plus the frozen-list assertion
- the build lens at the new head, job by job, each with the provider's own description
```

**ABSENT IS NOT GREEN and you already know this** — your `lens2` fence reported the build lens
ABSENT for a document-only merge and refused to fold it into a pass. Keep doing exactly that. A
SKIPPED job is named, never counted green.

## FALSIFIER

This card is wrong if a report lands whose premise had decayed, or if a report with a live
premise is left unlanded without its reason printed. **Test both arms; one alone proves nothing.**
The second arm is the one this card can cause: a card that rewards caution invites a lane to
declare decay and stop. If you land fewer than eight of them, say why in one line each and
name the one you were least sure about.

## SHARED SURFACES

Merges into master, and nothing else. **You write no source file under this card.** If a landing
requires a conflict resolution beyond a regenerated artifact, STOP and report it — a foreman
resolving a producer's conflict is authoring product work, which is the thing ORDER D says makes
you eligible to land at all.

**OUT OF BOUNDS:** `scripts/land.ts` and its self-test. The exception is under an active ruling
and the actor it governs does not edit it.

## DECISION RIGHTS

The Architect decides the queue, the oldest-first order, the decay stop, the exclusion of the two
MIXED branches, and the self-merge ruling in ORDER D. The lane decides every decay verdict — that
judgement is the content of this card and is not second-guessed here. NOBODY lands a decayed
report, and nobody lands the two excluded branches under this card.

BODIES: `docs/laws/` constitution and rules · `CLAUDE.md` · `.claude/loop.md` ·
`.claude/boot/foreman.md` · the project box · `scripts/land.ts` and its report-only exception ·
your own `GO-LANDING-S122-2` report · `S37-2` · `S61-2` · `S101-L1` · `RULE-57`.

fanout: personalized

Branch `phase/go-landing-s122-3`. Push it to origin. Report to
`docs/relay/GO-LANDING-S122-3-AG5-report.md`. Open a pull request against master so the checks
run on the request head.

TAIL ANCHOR: GO-LANDING-S122-3-v1 ends here.
