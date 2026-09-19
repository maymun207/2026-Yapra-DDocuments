CWF-S142-FINDINGS-v1

The findings S142 measured. Each lives standalone in the project box too (the F-S142-… documents); this
carrier rolls them up by name, per §11, until the owner rules on bucket merging. S142 closed for a
CONTAINER ROLLOVER: the same product continues under cwf_yaprak_9. Anchor at close: master
`7572c3bbfeed23656fcf8a55f6e64d93ed240c14` (PR 586 merge, the vector path-probe).

## THE SESSION'S ONE SENTENCE

Two confident hypotheses about a dead capability were both wrong, and the discriminating measurement was
never between them — it was "is the thing even dead?". The vector engine's two containers had been up four
weeks and healthy the whole time; the fault was a stale CloudFront origin address, found only after a chain
(card → adversary gate → landing → a transient Actions block → a secret leak the diagnosis itself caused)
built to ask one sixteen-second question.

## A · THE VECTOR CHAIN, IN ORDER

- `F-S142-ACTIONS-REFUSED-ACCOUNT-LEVEL-NOT-THE-FILE-1` (with AMENDMENT-1) — a `startup_failure` with zero
  jobs refused a KNOWN-GOOD control workflow identically to the suspected one, proving the cause was the
  account, not the file. AMENDMENT-1: a later SUCCESS on the identical blob proved the block was TRANSIENT;
  billing was never measured and the recovery is confounded between the owner raising the limit and ~90
  minutes passing. The rule it paid for: when a failure is attributed to an artefact, dispatch a known-good
  CONTROL through the same path before inspecting the artefact further; six negatives from inside one
  hypothesis are not evidence for it.
- `F-S142-VECTOR-ORIGINS-POINT-AT-A-STALE-HOST-1` — THE ANSWER. The distribution's `vector-index` and
  `vector-encoder` origins carry `ec2-3-66-236-142` while the instance (and the working `langfuse-ec2`
  origin) carries `ec2-52-57-7-5`; CloudFront times out at 30s reaching a host that is not this box. Both
  other candidates EXCLUDED by measurement: services answer on loopback AND the private address in
  milliseconds (200 on health, 401/403 without keys = UP and gating), all three security groups attached
  with rules intact. Design fault underneath: origins bound to the instance's EPHEMERAL public DNS. Repair
  is the owner's origin-write approval; the durable fix (stable address / private origin) is a separate card.
- `F-S142-CONVERGE-ASSOCIATION-FAILING-SINCE-0911-1` (recorded inside the stale-host doc) — the
  compose-apply association is Failed, last success 2026-09-11T19:09:47Z, twenty consecutive half-hourly
  failures. A second live fault, NOT the cause of the 504s; cause one read away (the failed execution's
  invocation output). Off-repo event: the tree's last apply was 2026-08-17.
- `F-S142-VECTOR-DIAGNOSE-LEAKED-REDIS-PASSWORD-CONTAINED-1` — the diagnosis run printed the redis
  `--requirepass` value via `docker ps -a --no-trunc`. AG-4 found it against its own run, deleted the log
  archive and PROVED it gone by read-back. Permanent cure landed (PR 586 removes `--no-trunc`). One
  residual: the run's persisted tool-result file. Owner surface: rotate the credential.

## B · THE GOVERNANCE FINDING THAT OUTRANKS THE VECTOR WORK

- `F-S142-MASTER-MERGE-GATE-NOT-ENFORCED-1` (PLATINUM) — the ruleset/branch-protection endpoints answer 403
  "Upgrade to GitHub Pro"; the plan changed mid-session (drift read NO-DRIFT earlier, 403 later). PR 586
  merged with `adversary/scout` ABSENT and `build (24.x)` IN PROGRESS — auto-merge is now MERGE-ON-OPEN.
  Hazard LATENT (fires only on an opened PR; no lane holds a card to open one). Containment (disable the
  workflow) was ordered but UNCONFIRMED at close — AG-4 did not consume it through two unmoved measurements.
  Owner surface: restore Pro (his standing ruling is Pro not public).

## C · THE ADVERSARY INDICTED ITSELF TWICE

- `F-S142-SCOUT-PASSED-COMMAND-COLUMN-WITH-PASSWORD-FLAG-1` — its PR 585 landing verdict read the
  `--no-trunc` line, called every host command a read, and never asked what the COMMAND column prints. "A
  read can still disclose; read-only was the wrong lens."
- `F-S142-SCOUT-EXCLUDED-STALE-ORIGIN-FROM-THE-TREE-1` — it earlier excluded stale-origin DNS because the
  DECLARED config derives all three origins from one expression; the LIVE object had diverged. Same class:
  a lens that stops at the declaration.

## D · THE ARCHITECT'S OWN ERRORS, BY NAME

- `PLATINUM-BREACH-S142-1` — handed the owner a terminal command (`docker ps -a`) with an ambiguous target;
  he ran it in CloudShell, not on the host. Cure mechanical: the read now lives in a lane-dispatched
  workflow.
- Repeated the CP-8 anchored-fence trap on CARD-VECTOR-DIAGNOSE v1 (the exact trap whose cure it had written
  hours earlier); corrected before insert.
- Named a false UNMOVED on the scout at tick 30 because its own query window started AFTER the scout's
  reply — an empty from a narrow filter read as an empty world, the S102/empty≠zero law self-inflicted.
- Put a STALE head in the first scout-review order (the branch gained a second commit two minutes prior);
  corrected by an addendum, recorded as the stale-count class committed by the Architect.
- Five self-inflicted queue errors early in the session, every position taken from a carrier's "next" list
  rather than derived from the product; mechanical cure adopted: derive the next item from the product.

## E · WHAT LANDED

PR 584 (guard-hook path-scope fix, GB-5 clause i), PR 585 (vector-diagnose standalone diagnosis), PR 586
(vector path-probe + leak cure). All via the auto-merge route; the third landed through the now-broken gate.

## F · S141 ITEMS RESOLVED THIS SESSION

`F-S141-GB5-CLAUSE-I-READS-FLAG-VALUES-AS-ENDPOINTS-1` — CLOSED@ PR 584. The S142 agenda's ⓵ is discharged.
