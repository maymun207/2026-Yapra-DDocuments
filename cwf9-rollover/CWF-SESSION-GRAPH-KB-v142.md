CWF-SESSION-GRAPH-KB-v142

Edges S142 learned. ADDITIVE: does not restate v141 or earlier, which stand in full. Cut at the close of
S142, which is the last session under container cwf_yaprak_8; the product continues as cwf_yaprak_9.

## A · DIAGNOSIS METHOD

[S142] `two coherent hypotheses for one symptom` → `the discriminating measurement is usually neither`. The
useful read asks whether EITHER is happening at all, not which. The vector containers were healthy for four
weeks while the owner's resource theory and the Architect's interpolation theory competed; "are they even
dead?" was cheaper than both and unasked for two days, because a 504 reads as "service down" and that
reading was never tested.

[S142] `a failure attributed to an artefact` → `dispatch a KNOWN-GOOD control through the same path first`.
An inspection can only say "I found nothing"; a control says "the artefact is not the variable". Six clean
lenses (PyYAML, strict-dup loader, BOM/CR/tab, expression scan, js-yaml, actionlint) all aimed at the wrong
object; one control dispatch answered what they could not.

[S142] `504 with a fast root 200 on the same distribution` → `origin read timeout, not refusal`. A refusal
returns in milliseconds; a ~30s timeout means packets left and nothing answered. The candidate set: listener
on wrong interface / security group detached / distribution origin points at a host nothing serves.

## B · CLOUDFRONT / AWS

[S142] `CloudFront origin` → bound to `the instance's EPHEMERAL public DNS`. When the box is replaced or its
public address changes, the origin points at nothing and the edge times out; the root origin, updated, still
works. The durable cure is a stable address or a private origin. This is the "address, not identity" class:
the same shape as reusing a project id across containers.

[S142] `security groups read BY NAME` → hides a `detached-but-intact group`. A group can exist with its rule
whole yet no longer be attached to the instance, producing the exact split. Read the instance's ATTACHED
groups and count them against the declared number.

[S142] `docker publishes 0.0.0.0` → `loopback answers even when the routable side is filtered`. Probe the
private address as WELL as loopback to separate "bound to loopback only" from "bound everywhere but
filtered".

[S142] `docker ps -a --no-trunc` → prints the container COMMAND (argv), which carries `--requirepass <value>`
for redis. A "read" discloses. The bare `docker ps` truncates the column at 20 chars, which is why only the
`--no-trunc` caller leaked.

[S142] `SSM RunShellScript via a single-quoted commands array` → mangles `{{ }}` docker format templates.
Cure: write the host script as a FILE on the runner, substitute values with sed, pass it as the parameter
(`file://…` through jq); braces never travel through the array.

## C · GITHUB GOVERNANCE — THE PLAN EDGE, NOW FIRED

[S142] `a private repo's ruleset` → `a PAID (Pro) feature`. When the plan lapses, the ruleset/branch-rules/
protection endpoints answer 403 "Upgrade to GitHub Pro" and master becomes UNGATED. With no required checks,
`gh pr merge --auto` merges ON ARMING, so `auto-merge.yml` becomes MERGE-ON-OPEN. The S141 tripwire edge
(the escape hatch and the trap are one switch) fired here not by the owner disabling enforcement but by the
plan lapsing — same effect, different cause.

[S142] `startup_failure, zero jobs, one second` → also the shape of `an account-level refusal` (spend limit,
failed payment, exhausted minutes), NOT only a workflow-file error. `gh run view`'s "likely a workflow file
issue" is FIXED TEXT for any startup_failure and is not GitHub's message. The real message, if any, lives
only on the run's HTML page.

[S142] `a dispatch-only workflow` → `never parsed by a PR run`, so a PR's green contexts are structurally
blind to an error raised only at dispatch. actionlint on `.github/workflows/**` at pull_request is the
consumer that would cover the class (F-S142-DISPATCH-ONLY-WORKFLOW-NEVER-PARSED-BY-CI-1), and nothing in the
tree calls it.

## D · THE ADVERSARY AND THE ARCHITECT

[S142] `a GREEN landing verdict` → can still carry `a leak its own read walked past`. The scout passed the
`--no-trunc` line on PR 585 and indicted itself for it later. A "read-only" classification is not a
disclosure classification.

[S142] `an empty from a narrow query window` → `NOT an empty world`. The Architect reported a false UNMOVED
because its query filtered from after the scout's reply. empty≠zero applies to the Architect's own tool
windows, not only to production data.

[S142] `a branch head named in an order` → `stale the moment a lane pushes again`. A scout-review order must
carry the head it means, and a second commit two minutes later makes that order name a byte that the PR no
longer points at. The stale-count class is committed by the Architect too.

## E · THE CONTAINER ROLLOVER (new this session)

[S142] `a claude.ai Project container` → `does not carry its docs to a successor container`. Rolling
cwf_yaprak_8 → _9 means the live carriers (instructions whole, seed, latest bootstrap/register/graph-kb/
findings) must be MOVED deliberately; the law corpus stays in the repo, the session archive stays in
Claude_Duzenli_Arsiv (§10 volume rule). The dominant risk is SILENT COMPRESSION — carrying a summary in
place of the fullest attested text. The successor's first session marks every carried line "DOĞRULANMAMIŞ
olarak taşındı" and re-verifies the anchor live. Same product, same repo, same Supabase, same Vercel.

[S142] `the seed cwf-memory-seed-CWF5-v3` → `NOT in the _8 project box`. The document every session's first
act reads was never uploaded to the box; it lives in the local repo / archive. A rollover that trusts the
box alone would carry no seed. Measured when packaging the rollover set.
