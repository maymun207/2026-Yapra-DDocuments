# PHASE-FOREMAN-DRAIN-IN-TURN-1-v1

Lane: AG-5 (foreman) · Session: S116 · Author: Architect · Date: 2026-08-23
First card of S116 (implementation order v28, item 2). Supersedes nothing.
This card kills F-S115-FOREMAN-DRAIN-IN-TURN-1 and (behaviorally) F-S115-FOREMAN-TICK-ESCALATION-1.

## PRECONDITION (S47-1)

- You are a FRESH foreman window on the shared clone. Run the claim walk in
  `.claude/commands/claim.md` for `refs/heads/lane/AG-5`. The S115 holder is presumed
  dead; §1a takeover applies (proven four times in S115). If the walk is refused twice
  verbatim by the harness, STOP and report the refusal text — that is a result.
- Ground floor: master `218b1501cdca83d2b77b3519d8734dea21079af1` or a descendant.
  Verify on the wire: `git ls-remote origin refs/heads/master`.
- Before ANY landing: the land gate's seven-class self-test passes on master.
- Land line, always and only: `ADF_LANE_ROLE=AG-5 npm run land -- <pr>` — the ADDRESS,
  never a role word (A-REC-S115-ROLE-TOKEN-2; `scripts/land.ts` accepts only `/^AG-\d+$/`).
- MANUAL GUARD, STANDING until LAND-FIX-3 lands: after any step-2 branch update,
  re-read the PR head UNTIL IT CHANGES; bind every CI verdict to that 40-hex.

## GROUND (measured by Architect at S116 open — TOTAL-45: verify what you act on)

- master wire = `218b1501…` (ls-remote 2026-08-23T15:40Z), HEAD at master.
- Your box (`public.relay_inbox`, lane_addr `AG-5`, direction `to_lane`) still holds
  unconsumed S115-era orders (LAND-ORDER-4..7, LAND-358-GO-1, STALE-CLAIM-RELEASE-2).
  Every S115 landing is COMPLETE on master (#354–#356, #359–#365 per S115 close), so
  those orders are STALE-EXECUTED. Nothing currently in the box should run again.
- PR #357: CLOSED, not merged, superseded by #363 (landed `ef4a4f1`). PR #358: CLOSED,
  not merged, superseded by #361; closure bookkeeping done under S115-LAND-ORDER-5-v1
  order A. Both measured by direct page read, 2026-08-23.
- Shared clone working tree holds EXACTLY two modified files:
  `docs/ground/census.latest.json` (fresher stamp `7c099fc6` @ 2026-08-23T10:36:13Z;
  single content delta: domain_rules archived 222→223) and
  `docs/ground/census.log.jsonl` (pure append, 4 runs, including two fully-401 runs at
  05:18Z/05:30Z — live witnesses of the stale-token window closed by #365).
- OWNER RULING, this session, verbatim: **"tut"** — the census files are KEPT.
  CENSUS-BLIND-DISCARD is resolved as KEEP; discard is forbidden.
- Branch state (computed by ancestry, 2026-08-23): nine remote `phase/*` branches are
  ancestors of origin/master (merged, undeleted); two are NOT ancestors and are
  superseded by their reseals: `phase/adf-kademe-2-guard-fix-1`,
  `phase/adf-kademe-3-poll-and-done`.

## ORDERS

**A · DRAIN-IN-TURN — the law this card exists for.** From this wake on: when you
wake, you DRAIN. Loop over (box items ∪ landable PRs) until BOTH sets are empty, in
the SAME turn. The per-item-nudge pattern of S115 is dead. While a landing waits on
CI, poll in-turn at ≤60s cadence. THE POLLER HAS NO BUDGET (boot, #361); the only
guard is POLL-DEGRADED — five consecutive read-fails: say so, keep polling.

**B · TICK ESCALATION.** A tick that changes nothing prints at most one
suppressed-count line. A tick that changes STATE (new box item, CI verdict flip, ref
moved, gate red) rings the bell: print the changed fact FIRST, with its measurement
line. Identical-tick burial is the bug; this order is its behavioral kill.
Codification of A and B into boot text rides the next producer wave, NOT this card —
you do not author boot prose.

**C · QUEUE RECONCILIATION.** For each unconsumed box item: compute its real state
with your gh identity. Already-executed → record DONE-BY-EVIDENCE with the landing
sha; do NOT re-run. GROUND says the whole current box is stale-executed — verify,
never trust that sentence.

**D · CENSUS KEEP.** Do not discard, clean, stash, or overwrite the two census files.
Commit them on your report branch as their OWN commit, subject:
`PHASE-FOREMAN-DRAIN-IN-TURN-1 AG-5: census keep, owner-ruled, stamp 7c099fc6 at 2026-08-23T10:36:13Z, two 401 witness runs preserved`.
This is ground data under an owner ruling, not product authorship.

**E · BRANCH HYGIENE (S98-L1/L2).** Delete each remote `phase/*` branch whose tip YOU
COMPUTE to be an ancestor of origin/master (expect the nine; your computation is
authoritative, the destructive target is named by computation, never by this prose).
Do NOT delete the two non-ancestor superseded branches — report their tips; the
Architect rules on them with owner consent next wave.

**F · #357/#358 CLOSURE CONFIRM.** Both measured CLOSED+superseded (GROUND).
Re-verify with your gh, record both lines in the report. This closes the S115
hanging end "COMPLETE + #357 confirmation".

**G · REPORT + COMPLETE (S91).** Branch `phase/foreman-drain-in-turn-1`; push to
origin; report `docs/relay/PHASE-FOREMAN-DRAIN-IN-TURN-1-report.md` — every order
above gets a MEASURED evidence line or a named refusal, no third state; PR to master.
Every commit subject on this branch starts `PHASE-FOREMAN-DRAIN-IN-TURN-1 AG-5:` and
mentions no other lane token. Land it with your land line after CI green bound to the
confirmed head (manual guard above). COMPLETE = report on master.

## WAIT CONTRACT (S74-3/4 — Architect side, for the record)

Wait ends when: report merged on master. Architect's independent sensors: wire master
move + fresh-clone report presence + PR page read. Expiry: no branch/bus activity
within 40 minutes of your window opening → Architect escalates to owner. The owner
pastes nothing — this card reached you by bus.

END-OF-CARD PHASE-FOREMAN-DRAIN-IN-TURN-1-v1 · your report's last line must be:
`END-OF-REPORT PHASE-FOREMAN-DRAIN-IN-TURN-1-v1 sha=<report branch head 40-hex>`
