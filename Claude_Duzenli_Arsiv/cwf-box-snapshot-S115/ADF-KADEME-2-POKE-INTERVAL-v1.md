<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-POKE-INTERVAL-v1
The poke interval the foreman boot refers to, named: fifteen minutes without a push
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-22T20:00:50Z, Architect, fresh fetch
- MEASURED: git ls-remote origin refs/heads/master - floor in evidence:floor, unmoved
- MEASURED: git log origin/master..origin/phase/adf-kademe-2-land-script - last push 2026-08-22T19:40:16Z
- MEASURED: select created_at from relay_inbox - ADF-KADEME-2-LAND-SCRIPT-FIX-1-v1 at 19:41:07Z to AG-2, ADF-KADEME-2-GUARD-1-v1 at 19:42:37Z to AG-4
- MEASURED: git ls-remote origin refs/heads/phase/adf-kademe-2-guard - no such ref at 20:00:50Z
- MEASURED: grep -n interval on origin/master .claude/boot/foreman.md - the boot names "the interval the Architect's wave card names" and no wave card named one
SELF-INVALIDATION: decays on the first push to either branch after the timestamps above.

## FALSIFIER
If a poke fires on a lane that pushed within the last fifteen minutes, the interval is misread. If a lane is silent for thirty minutes and no poke has fired, the interval is not being applied.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| no wave card has named a poke interval | MEASURED: grep -n interval on origin/master .claude/boot/foreman.md · select body from relay_inbox where body like %poke% and created_at > 2026-08-22, none names minutes | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. The fence stays shut: no merge until npm run land is on master.

## ORDERS
```scope
- A · Interval. A producer lane holding an unactioned card (created_at newer than its last push) with no push to its phase branch for fifteen minutes gets ONE poke card from you, direction to_lane, carrying the artifact_name, its created_at, and your read timestamp. Nothing else in the body beyond the relay-audit header and a one-line CLAIMS row.
- B · Apply now to AG-2 (FIX-1) and AG-4 (GUARD-1) if, at your next tick, their branches still show no push after 19:41:07Z and 19:42:37Z respectively.
- C · One poke per card, ever. A second silence after a poke is reported to the Architect, not poked again.
```

## SHARED SURFACES
poke cards ........ AG-5 authors, to_lane direction only
phase branches .... the producer's; you read, never push

## DECISION RIGHTS
whether to poke ... AG-5, by the interval above
what the lane does ... the lane, from its own card

## DELIVERY
- No branch, no PR. Report the pokes you inserted, with md5(body) and created_at, in your next poll tick and in the wave report.
