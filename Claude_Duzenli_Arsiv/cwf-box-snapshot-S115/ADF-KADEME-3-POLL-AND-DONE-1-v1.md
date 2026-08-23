<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-3-POLL-AND-DONE-1-v1
Pollers live until the closing card; done is derived from git; every tick has two lenses; the lane role comes from the boot
fanout: personalized - one address, AG-1.

## PREMISE - MEASURED @2026-08-23T05:10:00Z, Architect fresh clone at the floor in evidence:floor and live bus
- MEASURED: producer.md:57-58 and foreman.md:99 say "bounded budget"; four lanes went deaf in S114 when it ran out and cards fell into deaf boxes (F-S114-POLL-BUDGET-DEAF-1)
- MEASURED: git grep ADF_LANE_ROLE origin/master - read at scripts/land.ts:484, set only in .claude/settings.foreman.json:5; no boot names it; absent, land.ts judges AUTHOR-UNKNOWN (F-S114-LANE-ROLE-UNNAMED-1)
- MEASURED: scheduled tasks fire only while the window is open (S114 foreman transcript); the budget solved a problem that does not exist
- UNMEASURED - relayed by the owner: "done" must be derived from the report's presence, never stamped (RELAY-DONE-DERIVED-1, 2026-08-22); consent onay S115-DALGA-1 given by the owner 2026-08-23, covering this wave of four cards
SELF-INVALIDATION: decays on the first push to master after the floor, and on any harness upgrade the owner reports.

## FALSIFIER
A poller that stops reading before a closing card falsifies A; a done state written anywhere instead of computed from docs/relay/<CARD>-report.md presence falsifies B; a tick printing one count without the unfiltered max(created_at) falsifies C; a boot leaving ADF_LANE_ROLE to the operator's hand falsifies D.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| no boot sets the role | MEASURED: git grep -n ADF_LANE_ROLE origin/master -- .claude/boot returns zero lines · settings.foreman.json:5 is the only setter | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. You do not merge. Subjects carry exactly one AG-1 token before the first colon. package.json is closed to this wave.

## ORDERS
```scope
- A · No budget. Both boots: the poll task has no poll-count ceiling; it lives until a card named *-CLOSING-* for this lane is read or the window ends. Only guard: five consecutive READ FAILED ticks print POLL-DEGRADED with the last error and keep polling.
- B · Done is derived. docs/relay/DONE-DERIVED.md (one page) plus a tick line in both boots: per card in the box, CLOSED if docs/relay/<card name minus -vN>-report.md is on origin/master, IN-FLIGHT if on any phase/* ref, TODO otherwise. Computed from git each tick; nothing written to bus or file.
- C · Two lenses. Each tick prints the filtered count for this address AND the unfiltered max(created_at) of the table; if the max advanced and the count did not, print LENS-SPLIT with both values.
- D · Role from the boot. foreman.md: export ADF_LANE_ROLE=foreman as first shell line after the gate probe; producer.md: export ADF_LANE_ROLE=producer. Each printed back with printenv before the claim walk.
- E · Tick headers use date -u (F-S114-FOREMAN-CLOCK-LOCAL-MIDNIGHT-1).
```

## SHARED SURFACES
.claude/boot/producer.md, foreman.md .. AG-1 sole owner this wave
docs/relay/DONE-DERIVED.md ............ AG-1 sole owner
package.json .......................... CLOSED - nobody this wave

## DECISION RIGHTS
degradation wording ...... AG-1
report path derivation ... AG-1 may refine; the three states are the Architect's
role variable name ........ fixed: ADF_LANE_ROLE

## DELIVERY
- Branch phase/adf-kademe-3-poll-and-done from the measured floor; push early.
- Report docs/relay/ADF-KADEME-3-POLL-AND-DONE-AG1-report.md plus JSON twin; one measured tick transcript showing both lenses.
- Open the pull request against master; do not merge it.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-3-POLL-AND-DONE-1-v1; closes with git status --porcelain -uall and git worktree list.
