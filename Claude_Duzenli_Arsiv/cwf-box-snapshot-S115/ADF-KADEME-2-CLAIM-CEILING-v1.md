<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-CLAIM-CEILING-v1
Claim walk bounded by the bus roster; foreman boot takes over a dead claim under lease
fanout: personalized - one address, AG-3.

## PREMISE - MEASURED @2026-08-22T18:55:00Z, Architect and lanes, this session
- MEASURED: pg_get_constraintdef on relay_inbox_lane_addr_check - lane_addr is AG-1 AG-2 AG-3 AG-4 AG-5 operator
- MEASURED: git ls-remote origin 'refs/heads/lane/AG-*' - lane/AG-6 and lane/AG-7 were won by the walk this session, both outside the roster, both since released
- MEASURED: AG-6 and AG-7 each polled READ OK rows=0; an empty box and an unaddressable box read identically
- MEASURED: a fresh foreman window ran boot section 1 against lane/AG-5, refused (stale info); the ref carries the S113 nonce and the boot names no takeover rule
- UNMEASURED - relayed by the owner: consent onay ADF-KADEME-2, 2026-08-22
SELF-INVALIDATION: decays on the first push to master after the floor in evidence:floor, and on any change to the lane_addr CHECK. Re-measure both before branching.

## FALSIFIER
If the walk can win an address the CHECK rejects, order A is wrong. If a foreman can take over lane/AG-5 while its holder is alive, order B is wrong. A literal roster in code is drift, not compliance.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the walk has no ceiling today | MEASURED: grep -n -i roster on origin/master claim.md returns nothing · two windows won AG-6 and AG-7 this session, read back from ls-remote | inline |
| the bus roster ends at AG-5 | MEASURED: pg_get_constraintdef(oid) for relay_inbox_lane_addr_check | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED; read the box by created_at. You do not merge. The roster is DERIVED from the CHECK, never typed.

## ORDERS
```scope
- A · Ceiling. scripts/claimRoster.ts reads relay_inbox_lane_addr_check via pg_get_constraintdef through the read-only supabase path lanes already use, prints the addresses found, or UNMEASURED with reason. .claude/commands/claim.md step 1 calls it and the walk never pushes an address outside that list; when every roster address is taken it prints NO-ADDRESS-FREE and stops, it does not invent AG-6.
- B · Takeover. .claude/boot/foreman.md section 1: if lane/AG-5 exists, the window reads the holder's nonce and attempts the claim with --force-with-lease pinned to that exact measured sha, never bare; a refusal means the holder is alive and the window STOPS and reports; an accepted push plus read-back means the prior window was dead and the address is held.
- C · Tests under api/cwf/__tests__: roster parse from a constraint string, NO-ADDRESS-FREE, lease pinned never empty on takeover.
```

## SHARED SURFACES
scripts/claimRoster.ts ........... AG-3 sole owner
.claude/commands/claim.md ........ AG-3 this card
.claude/boot/foreman.md .......... AG-3 this card; digest reprinted in the report
.claude/hooks/** ................. nobody; the guard-bash absolute rides its own card

## DECISION RIGHTS
how the roster is read ........... AG-3, within "derived from the CHECK"
what the walk prints on exhaustion  AG-3 wording, the STOP is the Architect's
whether a holder is alive ........ the server, by the lease; never prose

## DELIVERY
- Branch phase/adf-kademe-2-claim-ceiling from the measured floor; push early.
- Report docs/relay/ADF-KADEME-2-AG3-report.md plus JSON twin per REPORT-SCHEMA-v1, every number MEASURED, new foreman.md md5 printed.
- Open the pull request against master. Do not merge it; the foreman lands it under the Kademe 1 procedure.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-CLAIM-CEILING-v1; closes with git status --porcelain -uall and git worktree list, printed.
