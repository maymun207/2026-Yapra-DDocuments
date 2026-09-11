# CWF-S136-QUEUE-v1

THE OWNER'S ORDER, FIXED 2026-09-11, and the Architect works it ONE STEP AT A TIME. His instruction, in
his own words: *"isleri siraya koyup adim adim yapalim … yani hepsini ayni anda yapma siri ile adim
adim"*, and then: *"siralamayi sana biraktim, sen gerekli aksiyonlari UNUTMADAN ve sira ile yap"*.

This file exists because the Architect has no memory between sessions and this session already drifted
once — three work-streams open at the same time, which is what he stopped. A step below is not started
until the step above it is CLOSED BY ITS OWN EVIDENCE LINE, not by anyone's impression.

Recorded under S112-YASA-1: steps 1-4 are the owner's own ordering. Step 5 is the Architect's placement,
forced by a measurement (see its row) and accepted by him.

---

## STEP 1 · PR 534 REACHES MASTER — **IN PROGRESS**

Branch `phase/equipment-parent-layer-split-1-s135-1` at `58f85fdc11c752123d9574e694f8af93e2fc5a0d`,
authored by AG-5, landed by AG-4 as LANDER.

- Card: `CARD-LAND-EQUIPMENT-PARENT-LAYER-SPLIT-S136-1-v3`, minted 2026-09-11T14:14:16Z, consumed
  14:16:34Z. v1 never inserted; v2 inserted and correctly REDDED by the lane on CP-3.
- Authority: `OWNER-APPROVAL-S136-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1`, quoted verbatim in the card's
  approval fence. ONE landing of ONE head. Spent only if the lane's own CI measurement is green.
- CI: the lane measured it twice under v2 — total_count 3 and 3, Build and Test / Relay corpus /
  report-schema all success, build steps three to ten all success, rule26 success, eval-canary SKIPPED
  and named. The Architect did NOT measure this and does not claim it.
- Route: the S100-3 detached-HEAD merge form. Not `gh pr merge`, not `npm run land`, `ADF_LANE_ROLE`
  stays unset.

**CLOSED WHEN:** master's sha is no longer `92a3f0b313c1b15d9c64e703afcf10649bf751cb`. Not a lane saying
green, not a heartbeat, not a report. A landed commit.

## STEP 1b · THE OPERATOR APPLIES THE MIGRATION — **BLOCKED BY 1**

`supabase/migrations/20260911070000_entity_layer_parent_ref_layer_key.sql` rides in on step 1 but is NOT
applied by landing it. Only the Operator applies, by `supabase db push`, under ADR-005 and
OWNER-RULING-S130 RULING 1: *"CWF migrationlarını DB'ye yazan tek bir authority var, o da GEMINI'dir,
NOKTA."* Project fence `fjbrkimwvtpwoxhziidh` is written into every Operator card.

Acceptance, in order: `distinct_children` must STAY 1735 — a rise means the migration inserted beside the
old rows instead of moving them.

**CLOSED WHEN:** the relabel is live AND, after one cron tick, the equipment `absent` count can move off
zero. If it still cannot move, ORDER 1 landed and did not work, and that is a finding, not a retry.

## STEP 2 · THE ADF MAILBOX — `BUS-REPLY-PATH-1` — **NOT STARTED**

The problem, measured: `relay_inbox_reply_authority` permits a `from_lane` row only for `operator` and
`scout`, so in the whole history of the bus 867 cards went out to the five AG addresses and ZERO replies
came back. The Architect therefore sees a producer only through GitHub, hours late.

The repair, and it is three changes, not one:

1. `relay_post_from_lane` asserts the nonce for `p_addr` and then inserts `lane_addr` HARD-CODED as
   `'operator'`. Wiring a caller today would file AG-4's report under the Operator's name. Fix the
   literal first.
2. Widen `relay_inbox_reply_authority` to admit address-holding lanes. Migration authored by a producer,
   applied by the OPERATOR.
3. Wire the caller into the lane's report step.

The row is a DELIVERY SLIP, never a report: card, branch, full forty-hex head, report path, the lane's
own CI reading with its command, and a status. The work stays in the repo. `busDelivery.ts`'s law holds —
work is proof of receipt; the slip only says WHERE the work is.

NEW subject, so under §12.1 it goes to the SCOUT first, without exception. Owner approved the design
2026-09-11.

## STEP 3 · THE ARCHITECT'S GITHUB ACCESS — **NOT STARTED**

MEASURED and it closes off the obvious answer: the refusal is **this session's proxy, not a credential**.
A bogus token, and no token at all, and a request for a PUBLIC repository all return the identical canned
body — *"GitHub access to this repository is not enabled for this session. Use add_repo…"* — and the
`add_repo` tool is not present in this session (searched twice). On the git transport, credentialed
access to this repository is refused at the proxy while the same credentials pass to a public repo.

**So a personal access token would change nothing and must not be minted.** The open question is whether
a route exists that does not need `add_repo`, or whether the scout is the permanent CI lens. Until then
§12.9 stands: an Architect limit is a DISPATCH, never a blocker.

## STEP 4 · `FACTORY-SWEEP-1` — **NOT STARTED**

Under `OWNER-RULING-S136-FOREMAN-SWEEPS-1`. Four properties, and each is load-bearing:

- The verb NEVER scans and never infers death. Its authority is a NAMED owner witness. Measured reason:
  AG-3's heartbeat went stale at 04:47:22Z and it committed thirteen minutes later and worked an hour
  more; a threshold would have leased a live lane's address away mid-card.
- It takes an EXPLICIT address list. A wildcard meaning "whatever is held" is how a live lane dies.
- Leased replacement, announced, NEVER a delete.
- Executor is the FOREMAN, whose boot already says it *"lands work and sweeps the dead"*, and which can
  free its own address first because `reclaim` admits self==lane. The SCOUT gets the read-only
  address-book console and no new authority — its constitution is *"You measure. You change nothing."*

The one code change: `reclaim()`'s `self !== lane` caller fence, whose refusal reads *"a takeover is a
decision a person makes, not a helper"*. Overturning that sentence is the owner's ruling, already given,
and the change must NAME it. This is `PHASE-FACTORY-CLAIM-THIRD-SHAPE-1`, carded and never built, and
three hand-writes are already counted against the PLATINUM ledger for it.

NEW subject -> SCOUT first.

## STEP 5 · GRAFT WIRING, PR 535 — **NOT STARTED, AND IT MUST BE LAST OF THESE TWO LANDINGS**

Branch `phase/graft-wiring-1`, seven paths, ZERO overlap with step 1's nine. The placement is forced by a
measurement, not a preference: **landing it before step 1 moves master, so PR 534's branch would no
longer contain master and the lane's own falsifier fires and stops it.** After step 1, the graft branch
brings master in with `git merge origin/master`, produces its own CI run, and lands then.

It is NOT a copy of step 1's card. It changes `.claude/settings.json` — the PRODUCER ALLOWLIST — and
`.mcp.json`, and adds two hook files. That is a PERMISSION SURFACE, and CLAUDE.md §6 says an allow-list
is *"a named, reviewable, revocable decision"*. So it needs its own owner spend approval and a card in
which the diff was actually READ, not a rubber stamp.

---

## STANDING, ACROSS ALL STEPS

- Every report to the owner OPENS with what moved in the product. If nothing moved, the first line says
  so (mechanical rule ③).
- No step below the current one is started, carded, or prepared. The Architect said it would cut two
  scout cards ahead of turn in this session and did not; that restraint is the point of this file.
- Every hand-written bus insert carries an md5 AND a sha256 WHERE precondition, so a mistyping writes
  zero rows. Both guards passed on the v2 and v3 inserts.
- The Architect's mounted clone is READ-ONLY and cannot be refreshed by the Architect (`git fetch` is
  refused at the bridge proxy). It refreshes when a lane fetches. Every ref reading states its moment,
  and the lane's own tree wins over it.

END · CWF-S136-QUEUE-v1
