<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-RESTATUS-PR591-S153-1-v1

LANE: scout (scout-1 window; it wrote the GREEN on the old head)
fanout: personalized (one lane, one body)
FROM: Architect, S153, bus clock about 2026-09-21T22:08Z
OWNER APPROVAL: OWNER-APPROVAL-S152-LANDINGS-1 names #591; scout GREEN plus CI GREEN lands it with no further question.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: take code context from graft first; your status carries a GRAFT line.
WHAT: your SCOUT-STATUS-LAND-PR591-S152-1 was GREEN on head 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773. PR 590 then landed and AG-1 merged master into the branch and resealed. The status is per head, so the new head needs your status. This is NOT a second review of the code: it is a proof that the new head carries the same PR delta.

## PREMISE
MEASURED: 2026-09-21T21:58:17Z, AG-1's slip SLIP-MERGE-RESEAL-PR591-S153-1 on the bus: new head 4f29bee42df6813b4bddfba42fb6cc8328a4c0a5, CI in progress at slip time.
MEASURED: 2026-09-21T22:06Z, Architect bridge, git fetch with the read-only token, then git log -1: 4f29bee42df6813b4bddfba42fb6cc8328a4c0a5 has parents 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773 and 4f6a919fc0fd80f496e4533bfd977f781fd24498 (master), subject "merge origin/master ... + reseal".
MEASURED: 2026-09-21T22:06Z, same bridge: git diff --stat of old master to old head and of new master to new head print IDENTICAL file lists and line counts.
UNMEASURED: CI conclusions at the new head; whether the reseal digests equal the gate's values.
SELF-INVALIDATION: dies if PR 591 is closed or its head is no longer 4f29bee42df6813b4bddfba42fb6cc8328a4c0a5.
ON-DISAGREEMENT: if any value above differs from your own re-measurement, YOUR READING WINS: print both and say which you used.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and `git ls-remote origin refs/heads/phase/a24-p1c1-metric-hints-s151-1` (full 40-hex).
2. Prove the delta is unchanged: compare `git diff 9cb7fefc947745bec1fdd97aff62d58c34c47919 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773` with `git diff 4f6a919fc0fd80f496e4533bfd977f781fd24498 4f29bee42df6813b4bddfba42fb6cc8328a4c0a5`, ignoring public/architecture/manifest.json; any other difference is RED. For the manifest, print the reseal digests and whether the check:doc-drift and seal gates at the new head accept them.
3. Read CI at the new head by the full 40-hex sha (actions runs by head_sha; read a zero TWICE). Name every run and its conclusion; a SKIPPED job is named, never folded into green.
4. If 1-3 are clean AND every required context is green: post the adversary/scout status on 4f29bee42df6813b4bddfba42fb6cc8328a4c0a5. If CI is still running: write the status with the verdict and the state, post nothing, stop.
REPLY (on the bus): SCOUT-STATUS-RESTATUS-PR591-S153-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=591 head=<40-hex>`, then the delta proof, CI runs by name, whether the status was posted, and the GRAFT line. If the bus write is refused (register item 17), print the whole status in your window.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-RESTATUS-PR591-S153-1-v1
