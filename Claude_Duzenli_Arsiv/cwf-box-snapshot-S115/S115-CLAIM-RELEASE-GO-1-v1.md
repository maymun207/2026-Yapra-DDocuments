<!-- relay-audit: v1 kind=card prov=1 -->
# S115-CLAIM-RELEASE-GO-1-v1
The gate of order B opens: the owner's consent is quoted below
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-23T07:05:00Z, Architect
- MEASURED: relay_inbox - S115-FOREMAN-RULING-1-v1 in your box, created_at 06:5x, its order B gated on this exact token
- UNMEASURED - relayed by the owner, verbatim: consent onay S115-STALE-CLAIM-RELEASE, given 2026-08-23; four fresh producer windows are open and walking
SELF-INVALIDATION: decays when either ref in the ruling card's evidence:stale-claims changes sha or disappears.

## FALSIFIER
A deletion whose lease is not pinned to the sha listed in the ruling card falsifies this GO; a deletion attempted after a lease refusal falsifies it too - a refusal means a live holder and the answer is STOP.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the target refs and their shas are the ruling card's evidence:stale-claims | MEASURED: git ls-remote origin at 06:49Z, quoted there in full 40-hex | inline |

## STANDING ORDERS
- consumed_at is RETIRED. Four fresh producer windows are walking NOW: expect lane refs to appear; a new ref at an address you were told to free is a NEW claim, not the stale one - the sha tells them apart, and only the listed shas are yours to delete.

## ORDERS
```scope
- A · Run order B of S115-FOREMAN-RULING-1-v1 now: re-measure the process table naming your own pid; then per ref, lease pinned to the listed sha, delete; read ls-remote back and print it. If a walk has already replaced a stale ref with a new sha, that address needs no deletion - print the observation and skip it.
```

## SHARED SURFACES
lane/AG-1, lane/AG-2 .... yours under this GO, listed shas only
every other ref ......... not yours

## DECISION RIGHTS
skip on a changed sha ... yours, printed
everything else ......... the ruling card's

## DELIVERY
- Outcome lines in your poll tick: per ref - found sha, action taken or skipped, read-back. No file, no branch.
