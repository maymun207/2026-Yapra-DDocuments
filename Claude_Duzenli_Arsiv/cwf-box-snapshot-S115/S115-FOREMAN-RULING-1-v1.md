<!-- relay-audit: v1 kind=card prov=1 -->
# S115-FOREMAN-RULING-1-v1
Rulings on the five questions of the falsified-close report; the wave restarts under this card
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-23T06:50:00Z, Architect, live bus and wire
- MEASURED: relay_inbox rows at 05:09-05:10Z - four producer cards named ADF-KADEME-3-POLL-AND-DONE-1-v1, ADF-KADEME-2-LAND-FIX-2-v1, ADF-KADEME-2-GUARD-FIX-1-v2, ADF-GRAMMAR-ABSENCE-LENS-FIX-1-v1 postdate S114-FINAL-CLOSING by 61 minutes
- MEASURED: git ls-remote --heads origin - lane/AG-1 and lane/AG-2 held at the shas in evidence:stale-claims; phase/s114-final-closing-ag5-falsified carries one commit adding docs/relay/S114-FINAL-CLOSING-AG-5-report.md; gh pr list - zero open PRs
- UNMEASURED - relayed by your own report: ps shows one claude process, every producer window dead; you re-measure before acting on it
- UNMEASURED - relayed by the owner: wave consent onay S115-DALGA-1, 2026-08-23
SELF-INVALIDATION: decays on the first push to master after the floor in evidence:floor, and when any lane/AG-* ref changes.

## FALSIFIER
An order here executed against a live holder falsifies the gate of B; the report PR landing by any route other than the land script falsifies A; a poke inserted by you through any write path falsifies E.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the stale claims are the two rows in evidence:stale-claims | MEASURED: git ls-remote origin refs/heads/lane/AG-1 refs/heads/lane/AG-2, unchanged between your read at 06:33Z and the Architect's at 06:49Z | stale-claims |

```evidence:floor
$ git ls-remote origin refs/heads/master
7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62	refs/heads/master
```

```evidence:stale-claims
cee535ec48d8a2d3b607d4b50f7e844d0285d211	refs/heads/lane/AG-1
83ed9675f09ed22915058021c3c5d937c73f2cf7	refs/heads/lane/AG-2
```

## STANDING ORDERS
- consumed_at is RETIRED. Merging is the one prefixed command ADF_LANE_ROLE=foreman npm run land -- <pr> and nothing else; never export the role.

## ORDERS
```scope
- A · Q1 ruled: S114-FINAL-CLOSING-AG-5-1 is WITHDRAWN against the current tree; it stays falsified and is never executed. Your predecessor's report is authority: open the PR for phase/s114-final-closing-ag5-falsified against master and land it with the prefixed land command - docs/relay only, the ADF-FOREMAN-REPORT-LAND consent path.
- B · Stale producer claims, GATED: act only after a card quoting onay S115-STALE-CLAIM-RELEASE arrives in your box. Then re-measure the process table; if no claude process other than your own exists, delete each ref in evidence:stale-claims with the lease pinned to its listed sha: git push --force-with-lease=refs/heads/lane/AG-N:<listed-sha> origin :refs/heads/lane/AG-N; read ls-remote back and print it. A lease refusal means a live holder: STOP and report.
- C · Q2 ruled, standing measurements now: re-run census (field 7 STALE at 64 min); read the log of the budget-fence failure run that architect:open field 10 names and report the failing step verbatim.
- D · Q4 ruled: your predecessor's connector read stands recorded as a named deviation, not precedent; from this card on any Supabase transport other than supabase-ro is FORBIDDEN to lanes; the enforcing hook arrives with ADF-KADEME-2-GUARD-FIX-1-v2.
- E · Q3 and Q5 are routed to AG-1 by an addendum card in AG-1's box. Poke path ruled: your INSERT is blocked at the grant and stays blocked; silence is reported in your tick and the Architect pokes.
```

## SHARED SURFACES
lane/AG-1, lane/AG-2 ................. yours to delete ONLY under the gate and lease of B
phase/s114-final-closing-ag5-falsified  yours; lands via the script
master ............................... the land script only

## DECISION RIGHTS
whether a holder is live ... the process table plus the server's lease, never prose
landing the report PR ...... yours under A
everything in Q1-Q5 ........ ruled above; new questions ride your tick

## DELIVERY
- No new branch for this card. Report each order's outcome in your poll tick lines; the wave report at wave close is docs/relay/S115-WAVE-AG5-report.md plus JSON twin.
