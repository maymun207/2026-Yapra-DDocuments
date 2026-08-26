# S119 · A1 — THE MEASURED HOST COMPARISON, v2

<!-- SUPERSEDES v1 (S37-1: a presented artefact is immutable; a correction is a NEW version).
     Written WHOLE. v1's REQUIREMENT section and its Fly / Cloud Run / EC2 figures are carried
     unchanged and are not restated in full here — they were measured and they still hold.
     v2 EXISTS FOR THREE REASONS, all of them corrections:
       (a) v1 presented a comparison set WITHOUT DECLARING WHAT IT EXCLUDED. The owner asked
           about Railway, which v1 had not evaluated. That is the Architect's error and it is
           named in §0.
       (b) Railway is now measured, and it turns out to differ from Fly in the BILLING MODEL,
           not merely the price — which changes the argument, not just the arithmetic.
       (c) A lane measured, minutes ago, that the machine we have cannot build the bench image
           at all. That is a capability finding and it bears directly on the routes available. -->

## §0 · THE ERROR IN v1, NAMED FIRST

`A-REC-S119-COMPARISON-SET-NARROWED-WITHOUT-SAYING-SO-1`.

v1 priced four options and read as though those four were the field. **They were the field I
happened to search.** Railway was never evaluated; the owner asked about it and was right to.

Narrowing a comparison set is legitimate. **Not declaring the narrowing is not** — a comparison
that does not name what it left out hides its own scope, and a reader cannot argue with an
exclusion they cannot see. **This version declares them:**

| considered and excluded | why |
|---|---|
| **Railway** | NOT EXCLUDED — it was simply never evaluated. That is the error. It is priced in §1. |
| Hetzner / a bare VPS | cheapest per GB by a wide margin, and it buys an operating system to maintain, a TLS certificate to renew and a process supervisor to configure. Excluded as a JUDGEMENT: the endpoint is worth roughly one hour of anyone's attention per year, and a VPS costs more than that in attention. |
| AWS App Runner / Lightsail | the account carrying the existing infrastructure has a budget fence that has been RED for over a week. Excluded for the same reason the existing EC2 box is, in v1 §5. |
| Render / DigitalOcean App Platform | peers of Railway in shape and billing. **Excluded for brevity and NOT on a measurement.** If the two priced here both disappoint, these are where to look next. |

## §1 · RAILWAY — measured 2026-08-26 from the vendor's own pricing and docs

```
Hobby      $5/month MINIMUM — and it is a $5 USAGE CREDIT, not a flat fee with usage on top
Memory     $0.00000386 per GB per second
CPU        $0.00000772 per vCPU per second
Egress     $0.05 per GB
Domain     a generated public domain with automatic SSL, no custom domain required
```

**Converted to a month — DERIVED by me, 30 days = 2,592,000 seconds:**

```
1 GB memory, continuous   = $10.00 / month   of ACTUAL usage
1 vCPU,      continuous   = $20.01 / month   of ACTUAL usage
```

## §2 · THE FINDING IS THE BILLING MODEL, NOT THE PRICE

**Fly bills the ALLOCATION. Railway bills the CONSUMPTION.**

| resident memory in practice | Railway | Fly |
|---|---|---|
| ~400 MB, CPU mostly idle | **≈ $5** — inside the included credit | $5.70 |
| ~1 GB, CPU mostly idle | **≈ $10–12** | $5.70 |

**The crossover is a number nobody has measured**, and both vendors give a free public domain with
automatic TLS, so the card-address problem is solved either way.

**AND THE ARGUMENT THAT DOES NOT DEPEND ON THAT NUMBER.** This endpoint's entire purpose is to be
connected to and driven hard by a stranger's benchmark harness. The load is external, bursty and
not knowable in advance. Under consumption billing, a round that keeps a core busy for hours costs
real money and the amount cannot be predicted; under allocation billing the same round costs
nothing extra.

The acceptance contract's budget clause reads: *money decides how many criteria get measured, never
what counts as measured.* **A host whose bill scales with measurement effort couples the invoice to
the science, which is the exact coupling that clause exists to forbid.** A fixed figure can be
reasoned about against a per-round budget. A moving one invites the wrong question at the wrong
moment.

**Railway's real advantage is simplicity and it is not small:** deploy from git, no image to build,
no registry credential, no image pipeline. §3 makes that advantage larger than it looked an hour
ago.

## §3 · A CAPABILITY MEASURED WHILE THIS DOCUMENT WAS BEING WRITTEN

A lane was carded to build the bench image and measure its runtime floor. **The build FAILED, for a
reason that is neither the repository's nor the lane's:**

```
#1 [internal] load build definition from Dockerfile.a2a     transferring 2.53kB   DONE 0.0s
#2 [internal] load metadata for docker.io/library/node:24-slim
#2 ERROR: DeadlineExceeded: context deadline exceeded
```

The lane proved it environmental rather than a repository defect from the build's own ordering —
the only repository-owned step that ran SUCCEEDED — and corroborated it twice more: the base image
is absent from the local cache, and an independent registry query hung past two minutes producing
nothing. **It then refused to claim a size, refused to claim a floor, and refused to rule out a
memory tier.** Nothing was measured that could rule one out, and it said so.

**Two consequences, and they pull in opposite directions:**

1. **The machine we have cannot reach the image registry.** Any route that requires building and
   pushing an image cannot be exercised from that laptop as it stands. Whether that is a transient,
   a proxy policy or a standing egress rule is **UNMEASURED**.
2. **But CI already builds and pushes images**, and it is a landed pattern rather than a plan:
   `build-encoder-image.yml` logs in to the container registry with the repository's own token and
   pushes a tagged image. **So the image route is alive — it just does not live on the laptop.**

**The honest reading: the image route costs a pipeline, and Railway's git-push route does not.**
That is a real difference in effort, and it is now measured rather than assumed.

## §4 · THE RECOMMENDATION — and it is deliberately NOT a vendor yet

**Do not choose a vendor until the runtime floor is measured, and move the instrument to where it
can run.** The laptop cannot build the image; CI can. The floor measurement therefore belongs in a
workflow, not on a desk.

**If a decision must be made today, Fly at $5.70 still stands — but on §2's argument rather than on
price.** Predictability is worth more here than a few dollars, because the thing being protected is
the budget clause and not the budget.

**If the floor comes back lean — resident memory comfortably under half a gigabyte and idle CPU —
Railway becomes the better answer**, because it would be marginally cheaper AND materially simpler,
and the simplicity is now measured rather than claimed.

## §5 · WHAT IS STILL UNMEASURED, named so it is not lost

- **The runtime floor.** The instrument exists and is blocked by network, not by design.
- **Whether the laptop's registry failure is transient or standing.** One probe, one machine.
- **Egress volume per benchmark round.** Small by every reasonable expectation, and expectation is
  not measurement. It matters more under Railway at $0.05/GB than under Fly at $0.02/GB.
- **The working set under a real task.** Strictly larger than the floor, and it needs the owner's
  credentials, so it is a different card in any case.

## §6 · WHAT IS STILL THE OWNER'S, unchanged from v1

The account and the payment method are a real-world signup. The token is env-only. **Everything
after those two is machine work and belongs to a lane** — including, now, the workflow that
measures the floor.

<!-- END · S119-A1-HOST-COMPARISON-v2 -->
