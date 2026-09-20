<!-- relay-audit: v1 kind=notice -->
NOTICE-VECTOR-REPAIR-CHAIN-S146-1

LANE: AG-4
FROM: Architect, S146, 2026-09-20T07:20Z
AUTHORITY: OWNER-APPROVAL-S144-PLAN-1 (landing, dry-run, repair, live proof), re-affirmed by OWNER-APPROVAL-S145-PLAN-1.
No new owner approval is needed and none is asked. NO POLL OR CRON TASK in this window (OWNER-RULING-S143-OPERATING-MODEL-1).
fanout: personalized (one lane, one body)

## PREMISE
MEASURED: Vercel list_deployments target=production -> newest cwf_yaprak deployment READY on master commit 33ebbee70bcd7e198ec4a01fdf5fb8532202d2d9 "Merge pull request #587", read 2026-09-20T07:18Z
MEASURED: relay_inbox artifact SCOUT-STATUS-REVIEW-PR587-S145-2 = ADVERSARY-VERDICT GREEN on head 990ca9630c4ea7d9ca018ccd16d744ebb58d0d7a, read 2026-09-20T07:18Z
UNMEASURED: whether the live distribution origins are still stale; the dry run in step 1 is the instrument
SELF-INVALIDATION: this premise DECAYS the moment master moves past the merge commit or any vector-* workflow file changes.

## DO
1. git ls-remote origin refs/heads/master. If it differs from the merge commit above, read the diff of .github/workflows/vector-*.yml between the two; if any vector-* workflow changed, STOP and report both values; otherwise continue on the new master.
2. Dispatch vector-origin-repair on ref master with confirm empty (DRY RUN). Wait for the run by its own id, not by sleep; report its conclusion and the plan block.
3. Proceed to the WRITE only if all three hold in that dry run: (a) PLAN PROVEN, (b) the diff lists EXACTLY the two paths DomainName of vector-index and vector-encoder, (c) exactly one running host with a public DNS. If the dry run says ALREADY-REPAIRED, skip to step 5. Anything else: STOP, report verbatim.
4. Dispatch vector-origin-repair on master with confirm=repair. Report the pre-write diff, the post-write read-back diff (must again be exactly the two paths), and the conclusion.
5. Dispatch vector-live-proof on master with its default digest. Report every arm's verdict and the conclusion. Name each run by workflow name and head sha, never by numeric run id (CP-8 band).

## FALSIFIER
The repair is FALSE if vector-live-proof is not success, or if the post-write diff names any path other than the two DomainName paths. Either one: report RED with the step output verbatim; do not re-run to chase a green (S55-1).

## SHARED SURFACES
Live CloudFront distribution (two origin DomainName fields only). No repository file is written. No master push.

## DECISION RIGHTS
AG-4 decides only the go/stop at steps 1 and 3 by the stated conditions. Terminating a GHOST instance, any apply, or any third dispatch belongs to the owner.

## ON DIFFERENCE
If any re-measurement DIFFERS from this premise, the re-measurement wins: act on it only where step 1 or 3 says so, otherwise STOP and print both values.

REPLY (on the bus): SLIP-VECTOR-REPAIR-CHAIN-S146-1 (from AG-4), first line
VECTOR: dry-run=<conclusion> repair=<conclusion|skipped> live-proof=<conclusion> · CronList: <output>

END · NOTICE-VECTOR-REPAIR-CHAIN-S146-1
