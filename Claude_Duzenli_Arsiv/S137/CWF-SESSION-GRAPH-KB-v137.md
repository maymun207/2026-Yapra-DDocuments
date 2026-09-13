# CWF-SESSION-GRAPH-KB-v137

SESSION: S137
SUPERSEDES: CWF-SESSION-GRAPH-KB-v136
STATUS: cut at S137 close. Every edge below is tagged with the session that measured it.
ANCHOR AT CUT: master `e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5`

Each edge is a relation this factory did not know it had before it was measured. An edge is not a
finding: a finding names a defect, an edge names a CONNECTION between two parts of the machine that
explains why a class of defect keeps recurring. Edges are never deleted; a wrong edge is superseded by
name.

---

## EDGE S137-E1 — THE ONLY LANDER IS ALSO A PRODUCER, SO A PRODUCT CARD CAN AUTHOR ITSELF INTO A DEADLOCK

    scripts/land.ts::resolveAuthorLane  --(refuses)-->  author == lander
    CLAUDE.md §6a::ADF_LANE_ROLE        --(absent in producer window, BY DESIGN)-->  gh pr merge REFUSED
    AG-5                                --(holds)-->  the only merge key
    AG-5                                --(also accepts)-->  product cards

Three correct rules meet at one lane and produce a state no single rule forbids. `land.ts` refuses a
landing whose author lane equals the lander lane (correct: a certificate must not be self-signed).
`CLAUDE.md` §6a states that in a producer window `ADF_LANE_ROLE` is CORRECTLY unset and the absence is
the feature, so no producer can merge. AG-5 is the only lane holding the merge key. Therefore: **any
product code AG-5 authors is unlandable by construction**, and no gate anywhere reports this at card-cut
time.

MEASURED S137: `#546` (`ce3f785e`, PR 546 MERGEABLE/CLEAN, three workflows success, drift line
"no drift -- all 7 narrative tabs synced (mode=head)") is fully green and cannot land.

The routing criterion the Architect used — "who is idle" — is the wrong criterion. The criterion is
**WHO WILL LAND IT**. Filed as `A-REC-S137-I-SENT-PRODUCT-WORK-TO-THE-ONLY-LANDER-1` and
`F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1` (commit `469727f`).

## EDGE S137-E2 — ADOPTION IS A LANDING PATH, AND IT COSTS ONE FILE

    docs/relay/<name>-report.md  --(read by)-->  scripts/land.ts::reportLaneOf
    reportLaneOf                 --(resolves)-->  AUTHOR-REPORT, which OUTRANKS AUTHOR-UNKNOWN

MEASURED S137: `#535` was blocked at AUTHOR-UNKNOWN. It was unblocked WITHOUT re-cutting the card and
WITHOUT invalidating the owner's existing LAND-535 authority: AG-4 added exactly ONE file,
`docs/relay/GRAFT-WIRING-1-AG4-report.md`, signed as ADOPTER and naming the originating session
(`24d72668`) and the original shas. `reportLaneOf` then resolved AUTHOR-REPORT = AG-4.

The general form: **an unattributed branch is not a dead branch — it is a branch missing one report
file.** Before re-cutting a card for AUTHOR-UNKNOWN, check whether adoption closes it. Landed as PR 535
at 19:45Z.

Owner ruling that shaped it: `AG-4 benimsesin, ayarlara dokunmasin` — adoption of the WORK without
adoption of the SETTINGS.

## EDGE S137-E3 — THE ARCHITECT'S OWN COMMITS DECAY THE FENCE THE SCOUT IS READING

    Architect commits to documents repo  --(moves)-->  the count a card fenced
    scout                                --(reads)-->  the fence, live, at review time

MEASURED S137: the Architect fenced a documents-push card to a commit count, then committed a NINTH
archive artefact while the scout was reviewing that very card. The scout had already read the ninth
commit and held GREEN, so nothing was lost — but only by luck.

The general form: **a fence over a surface the fence's own author keeps writing to is a self-decaying
premise.** Either freeze the surface for the duration of the review, or write the decay into the card
(`DECAYS if ...`) and notify by name. The Architect notified by name
(`NOTICE-THE-DOCUMENTS-COUNT-MOVED-WHILE-YOU-READ-S137-1-v1`) — that is the minimum, not the fix.

## EDGE S137-E4 — TWO GATES OVER THE SAME BYTES, AND ONE OF THEM IS ADVISORY

    scripts/cardPreflight (Architect's bridge VM)  --(judges)-->  card bytes
    repository mail-wait gate                      --(judges)-->  the same card bytes
    CARD_GATE=REPORT                               --(prints, does not enforce)

Carried from S134 §12.13 and re-measured live in S137: local `cardPreflight` returned GREEN on all
eleven checks for a body the repository's own `mail-wait` refused on CP-1, CP-3, CP-4, CP-5. Because
`CARD_GATE=REPORT`, the refusal was printed and NOT enforced.

Which of the two is stale remains **UNMEASURED at S137 close**. This is an open item, not a closed edge.

## EDGE S137-E5 — THE BRIDGE VM HOLDS THE GATES BUT NOT THE FORGE, AND THE MOUNTED CLONE IS A LAGGING MIRROR

    bridge VM ($HOME/g2)     --(runs)-->  the real gates (cardPreflight, adversaryGate, build)
    bridge VM                --(has NO)-->  GitHub credential  ("could not read Username for 'https://github.com'")
    $HOME/mnt/cwf_yaprak     --(remote-tracking refs refresh)-->  ONLY when a lane fetches

Therefore every "master is at X" the Architect prints is a read of a ref **a lane last refreshed**, never
a `git ls-remote`. This is `F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`, still standing, and it is the
mechanical reason §12.9 exists: an Architect limit is a DISPATCH to the scout, never a blocker in a
report to the owner.

S137 EXTENSION, and it is new: **the bridge itself is not continuously available.** It dropped at
2026-09-12T20:52Z, returned 03:02–03:08Z on 09-13, and dropped again. During a drop the Architect can
still reach the bus (Supabase MCP) and the live database, but can read NOTHING about git, the clone, or
the gates. Bus-reachable and clone-reachable are two different availabilities and they fail
independently.

## EDGE S137-E6 — BASE64 TRANSPORT OF CARD BYTES CORRUPTS SILENTLY ABOVE A LENGTH, AND md5 IS THE ONLY LENS

    long single-line base64  --(transcription corruption)-->  wrong bytes, valid base64, silent

MEASURED S137: an AG-4 notice arrived with md5 `d7541b60…` against an expected `c1a5eaa6…`. The payload
decoded cleanly — corruption inside base64 does not announce itself. Repaired by emitting base64 in
760-character chunks concatenated with `||` in SQL.

Adopted as standing practice, with its companion already in force since S133: **every hand-written bus
insert carries an md5 AND sha256 `WHERE` precondition, so a mistyped payload writes zero rows.**

## EDGE S137-E7 — VERCEL SILENCE ON A MASTER PUSH IS A DESIGNED SKIP, NOT AN OUTAGE

    scripts/vercel-ignore.mjs  --(cancels)-->  deployments for docs-only pushes

MEASURED S137, in answer to the owner's question "vercel son load 23 minutes ago is this normal?":
the last production deployment `dpl_CZiBSJN…` was READY at 18:14:18Z for commit `8f3ddebd`. The master
pushes after it were docs-only and were CANCELED by `scripts/vercel-ignore.mjs`, by design.

The general form, and it is the §12.9 shape again at a different lens: **absence of a deploy is not
evidence of a broken deploy.** Read the ignore script before reading the silence.

## EDGE S137-E8 — THE ARCHITECT'S LIVENESS READING OF A LANE WAS WRONG IN THE DIRECTION THAT COSTS THE OWNER

    consumed_at  --(is)-->  positive evidence the lane read the row
    silence      --(is)-->  nothing

MEASURED S137: the Architect told the owner AG-4 was asleep and asked him to interrupt its window. It
was awake: `consumed_at` was 24 seconds after the insert and the clone fetched 8 seconds later. The
action item was withdrawn before the owner acted on it.

This is §12.11(b) reproduced by the Architect that wrote §12.11: a lane doing file work is INVISIBLE to
the lenses, and invisible is not asleep. The owner's words that caught it: *"neden debelenip
duruyorsun?"*

## EDGE S137-E9 — A HOURLY POLL WITH NO EXIT IS THE S133 LOOP IN A NEW COSTUME

MEASURED S137: four consecutive unmoved measurements were reported to the owner as ticks before the
Architect named it. Adopted as a standing rule in-session:

**TWO consecutive unmoved measurements are a REPORT AND A FINDING, never a third tick.**

Its companion, also adopted in-session: **every card insert arms its own wake in the same tool block**,
so a delivered card is never waiting on an Architect who forgot to come back.

Both are the mechanical form of A-REC-S133-6 (`a well-built loop with no exit runs forever`) and
A-REC-S122-ARCHITECT-PRECISION-DECAY-1 (`the permanent cure is MECHANICAL, never moral`).

## EDGE S137-E10 — THE SLIP CONTRACT BINDS THE VERB, NOT THE TABLE

Carried into the graph from `F-S137-THE-SLIP-CONTRACT-BINDS-THE-VERB-NOT-THE-TABLE`: a grant measured on
a TABLE tells you nothing about whether a VERB is callable. `relay_post_from_lane` is defined, granted to
`cwf_lane`, and tested — and nothing calls it. From the bus, **an absent caller and a dead component are
byte-identical** (the CALLER-ABSENT class, §12.6).

S137 status: **TWO READINGS DISAGREE AND THE DISAGREEMENT IS THE ENTRY.** S133/S134 measured
`relay_post_from_lane` as CALLER-ABSENT — defined, granted, tested, uncalled. `cwf-open-items-register-v125`
§3 measured the opposite in S136: the verb DOES have callers in practice and files every lane report under
`operator`, which makes the defect AUTHOR LOSS, not an absent caller. **S137 did not re-measure either
reading**, so which is stale is UNMEASURED and it is carried as an open item, not resolved by whichever
answered more recently (§12.13).

What IS measured in S137, and it is compatible with both readings: lane reports reached the Architect as
BRANCHES, read by `scripts/busDelivery.ts`, whose own words are *"the work is the proof of delivery"*.

---

## WHAT LANDED ON MASTER IN S137, AS EDGES BETWEEN COMMITS

    432bb3ba --> 0cae062c   PR 537  BUS-REPLY-PATH
             --> f7640a48   PR 526
             --> 7f53f055   PR 532  TOOL-CALL-TRACE
             --> 52d9ba96   ten landing records, one batch
             --> 8f3ddebd   PR 529  REPLAY-EMITTER      (18:14:14Z, 53 s after the card)
             --> e95b0fdf   PR 535  GRAFT-WIRING        (19:45Z)

Plus the documents repository reaching GitHub for the first time this wave: nine commits pushed by AG-4
at ~18:42Z, `origin/main` = `4b773c1e6b7f4f573e6a7674310e5d6fc0846baa`.

## WHAT DID NOT LAND, AND WHY, MEASURED

`#546` — ASK-RENDERED-TWICE, branch `phase/ask-rendered-twice-s137-1`, head `ce3f785e`. Green. Blocked by
EDGE S137-E1, awaiting one line of owner routing. This is the FIRST item of S138.

<!-- END · CWF-SESSION-GRAPH-KB-v137 · S137 · cut before the register and before the bootstrap -->
