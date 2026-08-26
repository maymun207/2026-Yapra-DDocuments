# S119 · A1 — THE MEASURED HOST COMPARISON for the A2A bench endpoint

<!-- Written WHOLE. Every REQUIREMENT below was read from the repository at origin/master, not
     recalled. Every PRICE below was fetched from the vendor's own pricing page on 2026-08-26 and
     carries its source. Every DERIVED figure says it was derived and shows its arithmetic
     (D-3 COMPUTED-NOT-ASSERTED). Every unknown is named as UNMEASURED with the measurement that
     resolves it. This document decides nothing — the spend is the owner's. -->

## §1 · THE REQUIREMENT — measured from the repository, not assumed

Read from `Dockerfile.a2a` and `a2a/` at `origin/master`:

| property | measured value | source |
|---|---|---|
| process shape | **LONG-LIVED**, not serverless | `Dockerfile.a2a` header |
| base image | `node:24-slim`, major pinned | `Dockerfile.a2a` |
| entrypoint | `npx tsx a2a/server.ts --host $A2A_HOST --port $A2A_PORT [--card-url …]` | `Dockerfile.a2a` CMD |
| build step | **none, on purpose** — tsx runs the TypeScript directly | `Dockerfile.a2a` |
| bind | `0.0.0.0:8080` (defaults, overridable at run) | `ENV` + `EXPOSE` |
| dependencies | `npm ci` over the full lockfile, no prune | `Dockerfile.a2a` |
| secrets | supplied at `docker run -e`; **the server refuses to start without them** | `Dockerfile.a2a` |
| card address | `--card-url` must be **the address peers actually use**, or the card advertises an unreachable one | `a2a/server.ts:244-257` |

**The code itself rules out the surface we already pay for.** `a2a/config.ts`, verbatim:

> *"The card is explicit: a Vercel serverless function is not the bench host. The A2A server is a
> LONG-LIVED process (AgentBeats connects to it, fetches a card, opens tasks). `api/` is the
> serverless surface…"*

and `Dockerfile.a2a`, verbatim:

> *"The bench host is a LONG-LIVED process, which is why this exists at all: the Vercel serverless
> surface (api/) cannot hold an A2A endpoint open for a harness to connect to."*

**This is why A1 is a spend decision and not an engineering one.** Nothing can be built to make
Vercel hold this endpoint open.

## §2 · WHAT IS NOT MEASURED, named before the prices so it is not lost among them

- **The image's size.** UNMEASURED — nobody has built it. The only proxy available: `npm ci` over
  this exact lockfile produces **548 MB across 574 packages** (measured in a fresh clone). The
  image is therefore large, which affects push time and registry storage, not the monthly bill.
- **The running memory footprint.** UNMEASURED — nobody has run it. `tsx` carries esbuild in
  process, so the floor is higher than a compiled server's. **512 MB is the risky pick and 1 GB is
  the safe one, and that sentence is a judgement, not a measurement.**
- **Egress volume per benchmark round.** UNMEASURED. The traffic is JSON task exchanges, so it is
  almost certainly negligible against any per-GB rate — but "almost certainly" is an estimate and
  is labelled as one.

**The measurement that resolves all three is the same act:** build the image once and run it once
with a real card URL, reading RSS at idle and under one task. That is a lane job, it costs no
vendor money, and it belongs in the card that follows this document.

## §3 · THE PRICES — fetched 2026-08-26, each from the vendor's own page

| option | shape | **monthly, USD** | basis |
|---|---|---|---|
| **Fly.io** `shared-cpu-1x`, 512 MB | one always-on machine | **$3.19** | vendor pricing page, continuous run, Amsterdam |
| **Fly.io** `shared-cpu-1x`, 1 GB | one always-on machine | **$5.70** | same page |
| Fly.io egress | per GB, NA/EU | **$0.02/GB**, inbound free | same page |
| **Google Cloud Run**, 1 vCPU + 1 GiB, **CPU always allocated** | one always-on instance | **≈ $46.62** | **DERIVED — see the arithmetic below** |
| **The EC2 box you already run** (Langfuse host) | a second container beside six existing ones | **$0 marginal** | no new invoice line; see §5 for why it is still not free |

**The Cloud Run figure is DERIVED by me from the vendor's published unit prices, not quoted:**

```
30 days                = 2,592,000 seconds
CPU   2,592,000 × $0.000018 per vCPU-second = $46.656
RAM   2,592,000 × $0.000002 per GiB-second  =  $5.184
                                              -------
                                              $51.840
free tier  240,000 vCPU-s → $4.32   450,000 GiB-s → $0.90   = −$5.22
                                              -------
                                              ≈ $46.62
```

Cloud Run is eight times Fly's price for the same shape because **CPU always allocated is billed
per second whether or not a request is in flight** — and always-allocated is exactly what a
long-lived A2A endpoint requires. The serverless discount does not apply to this workload by
construction.

## §4 · THE RECOMMENDATION — one road, and the reasons are ranked

**Fly.io, one `shared-cpu-1x` machine with 1 GB: $5.70/month.**

1. **It holds a long-lived process.** That is the entire requirement and the thing Vercel cannot do.
2. **It solves the card address in the same act.** A Fly app is automatically given a `fly.dev`
   subdomain with HTTPS already set up — *"When you create a Fly App, it is automatically given a
   `fly.dev` subdomain, based on the app's name… have HTTPS set up for you"*. So `A2A_CARD_URL`
   gets a real, stranger-reachable address with **no domain purchase and no certificate work**.
   One of A2's three variables is resolved by the same decision.
3. **The price is noise against the budget that already exists.** The contract's budget clause sets
   **$10 per measurement round**. A $5.70 host is inside the noise of one round.
4. **It is isolated.** A stranger's harness connects to a box that holds nothing else — which is
   what **C3, reproducible by a stranger**, is actually asking for.

**Take 512 MB at $3.19 only after the footprint is measured.** Choosing it now would be saving
$2.51 against an unmeasured floor, and a bench host that dies under its first real task costs more
than the difference in one wasted round.

## §5 · WHY NOT THE BOX YOU ALREADY PAY FOR — the honest version

The EC2 Langfuse host is always on, has a permanent Elastic IP and CloudFront in front of it, and
a second container there costs **no new invoice line**. It is the cheapest option on the table and
it is still not the one I recommend:

- **It holds the project's traces.** Putting a stranger-reachable endpoint on the same host puts
  the observability store one misconfiguration away from the public internet. Cheapness bought at
  that price is not cheap.
- **Its headroom is UNMEASURED.** I do not know the instance type or its free memory, and I will
  not guess at it — six containers already run there with `restart: always`.
- **That account's budget fence has been RED for eight consecutive days.** Adding permanent load to
  it is not free in the sense that matters, and the standing ruling on that fence is *watch, no
  action* — not *add load*.

**If the objection is vendor count rather than money, the answer is still Fly and not EC2:** the
honestbench instrument (A4) needs a public endpoint too, and a second Fly machine gives it one for
another **$5.70**. One vendor, one decision, both endpoints.

## §6 · WHAT THIS DECISION UNBLOCKS, stated so the spend is judged against it

**$5.70/month unblocks A1.** **$11.40/month unblocks A1 and A4 together**, which — with A5, the
spend authorisation — is the whole owner-side critical path to the first external measurement. A3
(the Operator's two data rows) is **downstream of A4**, measured this session: the second row
carries a placeholder for an endpoint that does not exist, and the packet's own text says *"Do not
run this yet."*

**Nothing here is a deferral proposal, so no (a)+(b)+(c) is owed.** It is a priced decision with
its unknowns named, handed to the person whose decision it is.

<!-- END · S119-A1-HOST-COMPARISON-v1 -->
