ORDER-SCOUT-REVIEW-CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2

LANE: scout
FROM: Architect, S144, 2026-09-20T04:19Z
OWNER APPROVAL: "onay vector-origin-card", 2026-09-20 06:58 TSI (cut + review, standing for its revisions).
PRECONDITION: origin/master is 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 or a descendant not touching
infra/aws/langfuse/cloudfront.tf, .github/workflows/vector-diagnose.yml or .github/workflows/vector-live-proof.yml.

WHAT: re-review of v2, which answers your RED on v1: D1 (ORDER 1(a): exactly one RUNNING, ghosts printed loudly and
non-blocking, terminating a ghost stays the owner's), D2 (ORDER 1(f): the same structural diff re-run pre-write vs
freshly-read live config, POST-WRITE-DRIFT exits non-zero; FALSIFIER extended). The relayed premise line is reworded
to UNMEASURED (what is unmeasured is whether it still holds today, which is true). Your CP-3 gate finding
(RELAYED/RECALLED rejected) is recorded as a finding for the register; not this card's to fix.
Card body = bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
sha256 = 504b16a9af603b9db5f4e589678c8073ebc657a23d495c884179871ab481d60b (11563 bytes).

DO: 1. repository card gate on the exact bytes, every check. 2. Confirm D1 and D2 are answered by the text; attack
anything new the edit introduced. 3. Verdict: GREEN first line exactly
`ADVERSARY-VERDICT: GREEN card=CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2 sha256=<canonical sha256>` (no seal, so it equals
the sha256 above); RED first line `ADVERSARY-VERDICT: RED card=CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2` with defects.

FORBIDDEN: no status post, no merge, no dispatch, no edit, no DB write other than your reply row.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2.

----- BEGIN CARD -----
<!-- relay-audit: v1 kind=card -->
CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2

LANE: AG-4
fanout: personalized
A PRODUCT card on a NEW subject (register v133 item 11, repair of F-S142-VECTOR-ORIGINS-POINT-AT-A-STALE-HOST-1) —
it goes to the scout first; no exemption is claimed (§12.1).
SUPERSEDES v1, which the scout returned RED (SCOUT-STATUS-REVIEW-CARD-VECTOR-ORIGIN-REPAIR-S144-1-v1, 2026-09-20T04:15:58Z)
on two defects, both answered below: D1 the ghost filter vs the uniqueness rule (ORDER 1(a)), D2 the post-write proof
(ORDER 1(f)). Its CP-3 refusal of the relayed-premise line is answered by rewording that line (PREMISE).
Owner approvals it rests on: "onay vector-origin-card", 2026-09-20 06:58 TSİ (cut this card and send it for review).
The LIVE WRITE to CloudFront is NOT authorised by this card; it needs the owner's separate named approval
"onay vector-origin-write" at dispatch time (ORDER 5).

THE PROBLEM. The vector engine (Qdrant + bge-m3 encoder) is up and healthy on the host, but CloudFront cannot reach it:
the distribution's two vector origins `vector-index` and `vector-encoder` carry the host's OLD public DNS while the
host and the working `langfuse-ec2` origin carry the CURRENT one. Every vector call from production times out at the
edge (504). The declared infrastructure derives all three origins from ONE expression, so the live object has diverged
from the tree; nothing in the repository is wrong, and nothing in the repository can currently repair it without a
full terraform apply (which also needs an encoder digest, re-converges every container and touches resources this
fault does not involve).

THE DESIGN. A new dispatch-only workflow, `.github/workflows/vector-origin-repair.yml`, that rewrites EXACTLY two
fields of the live distribution — the DomainName of the origins whose Id is `vector-index` and `vector-encoder` — to the
instance's CURRENT public DNS measured in the same run, and nothing else. Zero terraform by construction (the same
effective-body rule vector-live-proof.yml states). A dispatch without the typed confirmation is a DRY RUN that writes
nothing and prints the exact change it would make.

PRECONDITION: origin/master is the head named in `the-seam` or a descendant not touching infra/aws/langfuse/cloudfront.tf,
.github/workflows/vector-diagnose.yml or .github/workflows/vector-live-proof.yml; no workflow in .github/workflows/
already writes a CloudFront distribution (grep update-distribution). If one exists, STOP — the work exists (§12.6/§12.7).

```evidence:the-seam
master           7572c3bbfeed23656fcf8a55f6e64d93ed240c14 (owner clone, lane-refreshed origin/master and HEAD, read 2026-09-20T03:58:47Z; scout re-measures by ls-remote)
declared         infra/aws/langfuse/cloudfront.tf:12,34,45 — domain_name = aws_instance.host.public_dns for origin_id langfuse-ec2, vector-index, vector-encoder
live divergence  CWF-S142-FINDINGS-v1 §A — vector-index and vector-encoder carry ec2-3-66-236-142, instance and langfuse-ec2 carry ec2-52-57-7-5 (vector-diagnose run, S142)
host resolver    .github/workflows/vector-diagnose.yml:165-170 — describe-instances by tag:Name=cwf-langfuse-host AND state pending,running,stopping,stopped (the GHOST filter, AMENDMENT-1)
dist resolver    .github/workflows/vector-diagnose.yml:413-415 — list-distributions by Comment prefix cwf-langfuse, never by origin domain
origin compare   .github/workflows/vector-diagnose.yml:447 — awk MATCHES / DOES NOT MATCH against the instance PUBDNS
credential       .github/workflows/vector-diagnose.yml:157-158 — AWS_LANGFUSE_BOOTSTRAP_KEY_ID / _SECRET from Actions secrets
declared grant   infra/aws/langfuse/bootstrap-iam-policy.json — Sid CloudFrontGlobal cloudfront:* ; Sid Ec2ProvisionRegionPinned ec2:*
post-repair leg  .github/workflows/vector-live-proof.yml — read-only, zero-terraform live proof of the vector path
scout RED        SCOUT-STATUS-REVIEW-CARD-VECTOR-ORIGIN-REPAIR-S144-1-v1 on the bus, 2026-09-20T04:15:58Z — D1 ghost vs uniqueness, D2 post-write diff
origin SG        infra/aws/langfuse/vector.tf:103,123 — prefix_list_ids = cloudfront prefix list (only CloudFront reaches the ports)
```

## PREMISE

MEASURED: declared origins, both resolvers, the origin compare, the credential names, the declared IAM grant and the post-repair workflow in `the-seam`, by sed/grep over the owner's clone at the head named there, 2026-09-20T03:58:47Z.
UNMEASURED: whether the divergence relayed by CWF-S142-FINDINGS-v1 §A (a carrier, not a live read) still holds today — the DRY RUN (ORDER 4) measures it before anything is written.
UNMEASURED: whether the LIVE bootstrap principal holds cloudfront:UpdateDistribution — the declared grant is a claim; the write step prints a denial verbatim.
UNMEASURED: whether the instance's current public address is an associated Elastic IP (the durable half, item 12) — ORDER 1(g) prints it.

## ORDERS

ORDER 1 - THE WORKFLOW `.github/workflows/vector-origin-repair.yml`, workflow_dispatch ONLY, `permissions: contents: read`,
concurrency group of its own, input `confirm` (default empty). Steps, each printing its own refusal verbatim:
(a) Resolve the host with vector-diagnose.yml's filter (tag + state pending,running,stopping,stopped) and PRINT every
    instance found (id · state · launch time · public dns). Then require exactly ONE instance in state `running` with a
    non-empty PublicDnsName; any other same-tagged instance (a GHOST, e.g. a stopped predecessor) is printed under a
    loud `GHOST:` line and does NOT block the repair. Zero running, or more than one running, STOPs non-zero.
    Terminating a ghost is the owner's decision and never this workflow's.
(b) Resolve the distribution exactly as vector-diagnose.yml does (comment prefix). Exactly ONE — otherwise STOP.
(c) get-distribution-config to a file; keep the ETag. Print the three origins (id · domain · http port · protocol ·
    custom-header COUNT, never a value) and MATCHES / DOES NOT MATCH against the instance DNS.
(d) DISCRIMINATOR: `langfuse-ec2` MUST already match the instance DNS. If it does not, STOP — the premise that the
    current DNS is the working one has fallen and no write is made.
(e) Build the new config with jq, changing ONLY `.Origins.Items[] | select(.Id=="vector-index" or .Id=="vector-encoder")
    .DomainName`. Prove the change is exactly that: a structural diff of old vs new config must list exactly those
    paths (zero or two), printed. Any other difference STOPs. If both already match, print ALREADY-REPAIRED and exit 0.
(f) Only when `confirm` is exactly `repair`: update-distribution --if-match <ETag> with the new config; then
    `aws cloudfront wait distribution-deployed` (bounded; a timeout is reported as UNMEASURED, not failure of the
    write); then re-read the LIVE config and re-run the SAME structural diff between the pre-write config and the freshly read
    one — it must list exactly the two DomainName paths (update-distribution replaces the whole config, so the
    pre-write diff proves only what was SENT; this proves what is STORED). Any other difference is printed in full and
    the job exits non-zero as POST-WRITE-DRIFT. Then print the three origins with MATCHES / DOES NOT MATCH. Without `repair`: print
    DRY-RUN — NOTHING WRITTEN and the would-be change.
(g) Read-only, both modes: describe-addresses for the instance's public IP — print whether it is an associated
    Elastic IP (allocation id present or not). No write.
No terraform in the effective body, no ssm send-command, no secret read or printed, no other AWS write.

ORDER 2 - A TEST, failing-first, beside the other workflow-shape tests you find (or api/cwf/__tests__/ if none):
over the file's EFFECTIVE body (comments stripped) — no `terraform`; exactly one `update-distribution`, and the step
that runs it carries the `confirm == 'repair'` condition; `--if-match` present; no `ssm send-command`; no
`secrets.` other than the two bootstrap key names; `permissions` is `contents: read`. Prove the test by planting a
fault in the workflow file (§4 house rule), then remove the plant.

ORDER 3 - Branch off current master, ONE pull request, no-ff, never a squash. Run actionlint on the new file if it
installs in your window (print the result or the reason it could not run — F-S142-DISPATCH-ONLY-WORKFLOW-NEVER-PARSED-
BY-CI-1). `npm run build` and `npm run check:tenant-zero`, print both; reseal in the SAME commit if doc-drift maps the
file. Report at docs/relay/VECTOR-ORIGIN-REPAIR-S144-1-AG4-report.md; the report follows the landing and never gates
it (§12.8).

ORDER 4 - DRY RUN, after landing on master: dispatch the workflow on master with `confirm` empty (a read; no spend
approval needed). Post on the bus the printed origins, MATCHES lines, the would-be diff and the Elastic IP line.

ORDER 5 - THE WRITE, ONLY after the owner's named "onay vector-origin-write" appears on the bus from the Architect:
dispatch with `confirm=repair`; post the read-back. Then dispatch vector-live-proof.yml on master and post its verdict
lines. That run is the evidence that closes item 11 — not the merge, not the write (S63-1).

## FALSIFIER

If the post-write diff shows any path beyond the two DomainNames, report POST-WRITE-DRIFT with the diff and STOP
before vector-live-proof; the owner decides the rollback. If the DRY RUN shows all three origins already matching, the fault is not this one: STOP after ORDER 4 and report —
item 11 is then re-diagnosed, not repaired. If `langfuse-ec2` does not match the instance, STOP (ORDER 1(d)). If the
live principal is denied cloudfront:UpdateDistribution, print the denial verbatim and STOP — widening the grant is the
owner's decision. If vector-live-proof fails after a clean write, report both runs; the origin is then proven not to be
the only fault.

## DECISION RIGHTS

You choose the step layout, the jq/diff mechanism for ORDER 1(e), the wait bound in 1(f), the test file's home and
name, and whether to factor the host/distribution resolvers out of vector-diagnose.yml (only if vector-diagnose.yml's
behaviour stays byte-identical, proven). You may refuse on evidence this card did not anticipate.

## SHARED SURFACES

```scope
- .github/workflows/vector-origin-repair.yml (new)
- api/cwf/__tests__/** or the existing workflow-shape test home (ORDER 2)
- public/architecture/manifest.json (reseal, same commit, only if required)
- docs/relay/VECTOR-ORIGIN-REPAIR-S144-1-AG4-report.md
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master head, declared origins, resolvers, compare, credential names, declared grant, post-repair workflow | MEASURED: sed/grep over the owner's clone, 2026-09-20T03:58:47Z | the-seam |
| vector origins carry the old DNS, langfuse-ec2 the current one (relayed, S142) | READ: CWF-S142-FINDINGS-v1 §A | the-seam |
| the scout's two defects this version answers | MEASURED: its RED verdict row on the bus, 2026-09-20T04:15:58Z | the-seam |
| the divergence holds today | NOT-READ | ORDER 4 measures it |
| the live principal may update the distribution | NOT-READ | ORDER 5 prints a denial verbatim |
| the public address is an Elastic IP | NOT-READ | ORDER 1(g) prints it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is
reported as a finding in its own right.

DECAYS when origin/master moves by a commit touching infra/aws/langfuse/cloudfront.tf, vector-diagnose.yml or
vector-live-proof.yml, or when a v3 appears.
----- END CARD -----

END · ORDER-SCOUT-REVIEW-CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2
