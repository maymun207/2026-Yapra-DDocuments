CWF-S142-SESSION-CLOSE-v1

What landed, what went wrong, and the state at close. S142 is the last session under container
cwf_yaprak_8; the product continues as cwf_yaprak_9.

## ANCHOR AT CLOSE

master `7572c3bbfeed23656fcf8a55f6e64d93ed240c14` (PR 586 merge, 2026-09-18T07:17:02Z). ⚠ This landing
passed through a gate that was NOT enforcing (see WHAT WENT WRONG). Vercel production followed on that
commit. The vector path-probe workflow is on master, dispatch-only and read-only.

## WHAT LANDED

- **PR 584** — GB-5 guard-hook clause (i) fix: GATE_PATH now matches the resolved endpoints, not raw
  arguments. Discharged S142 agenda ⓵. Landed the auto-merge route in ~21 min seal-to-merge, all five
  contexts including adversary/scout.
- **PR 585** — `vector-diagnose.yml`: a standalone, read-only, zero-terraform workflow that reads the vector
  containers' state via SSM, so "why are the containers down" no longer requires a paid terraform apply.
- **PR 586** — `vector-diagnose.yml` extended into a path-probe (loopback + private-address curl, listening
  sockets, attached security groups counted, CloudFront origin mapping) AND the `--no-trunc` leak cure. This
  is the run that NAMED the fault.

## WHAT WAS DIAGNOSED

The vector engine has been unreachable since before S140 not because anything died — both containers are up
four weeks, healthy, no OOM, no restarts, host has memory and disk to spare — but because the CloudFront
distribution's two vector origins point at a STALE host DNS (`ec2-3-66-236-142`) while the instance carries
`ec2-52-57-7-5`. Owner's resource hypothesis and the Architect's interpolation hypothesis were both
falsified by one run. A second, separate fault surfaced: the compose-apply association has failed every 30
minutes since 2026-09-11.

## WHAT WENT WRONG

1. **The master merge gate stopped enforcing mid-session** — the account's plan lapsed, the ruleset went
   403 "Upgrade to GitHub Pro", and PR 586 merged with adversary/scout absent and build in progress.
   auto-merge became merge-on-open. Containment was ordered but AG-4 never consumed it (two unmoved
   measurements → STOP). Hazard is latent: it only fires when a PR is opened.
2. **A secret leaked and was contained** — the diagnosis's `docker ps -a --no-trunc` printed the redis
   password into a CI log. AG-4 found it against its own run, deleted the log, proved deletion by read-back.
   Cure landed. Rotation is the owner's open decision.
3. **The Architect's own errors** — a terminal command handed to the owner (PLATINUM-BREACH-S142-1); a
   repeated CP-8 fence trap (caught pre-insert); a false UNMOVED from a narrow query window; a stale head in
   a scout order; five early queue positions taken from carriers rather than the product. All cured
   mechanically; all in CWF-S142-FINDINGS-v1.

## WHAT WENT RIGHT

The adversary read DIFFS on real heads and indicted ITSELF twice (the leaked COMMAND column it had passed;
the stale origin it had excluded from the DECLARED tree). The control-experiment method — dispatch a
known-good workflow to prove the file is not the variable — cut through six clean-but-useless lenses. Every
hand-typed bus insert's precondition held; one mis-sized precondition wrote zero rows and was corrected,
which is the guard working.

## STATE AT CLOSE — FOUR OPEN OWNER DECISIONS

1. **Restore GitHub Pro** — master is ungated until then; his standing ruling is Pro, not public.
2. **Approve the two origin-domain writes** — this is what makes the vector engine reachable again.
3. **Rotate the redis credential** — a live credential touched a CI log.
4. **Own-screen witness of the oven's seven-day stoppages** — carried from S141, his eyes only.

Plus the rollover itself: stand up cwf_yaprak_9 per the manifest and BOOTSTRAP-v144.

## THE ROLLOVER

The owner is continuing the same product under a new container. The live carriers (instructions whole, seed,
BOOTSTRAP-v144, register v132, GRAPH-KB v142, FINDINGS-v1) move to _9; the law corpus stays in the repo; the
session archive stays in Claude_Duzenli_Arsiv. The one forbidden failure is silent compression. cwf_yaprak_9
opens as S143 and its first measurement is the anchor, live.
