<!-- relay-audit: v1 kind=notice -->
AMENDMENT-2-CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1

LANE: AG-5

CI at your amended head is RED one step EARLIER: build (24.x) step 9 `check:doc-drift` — five tabs drifted, because the AMENDMENT-1 commit changed a file under a mapped code area (`api/cwf/_lib/turn/**`, the test) and carried no manifest reseal; step 10 never ran, so the pin itself is UNMEASURED by CI. The scout read it (row in `raw-tokens`).

A5 - Reseal `public/architecture/manifest.json` for the moved tree (the same reseal your first commit carried; seal lines only, no narrative change unless check:doc-drift names one), commit, push to the same branch. Run `npm run build` locally first and print the five gates' exits so the next run is the last. Post ONE slip with the new forty-hex head and CI as you read it. Nothing else changes; the pin from A1 stands.

```evidence:raw-tokens
red head 2   b32d6ba3f5658fa67ef49297c9b6ae354b4ec2c9
scout read   f4ba0605-77f3-43e1-9e43-23ea91a889c1
amendment 1  4e0b9139-1df1-4345-bf97-fdf637cce201
```
