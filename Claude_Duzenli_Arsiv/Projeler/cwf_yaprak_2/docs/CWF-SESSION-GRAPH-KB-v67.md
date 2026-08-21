# CWF — Session Graph KB · v67
<!-- CWF-SESSION-GRAPH-KB-v67 · 2026-07-29 · records S68. Supersedes v66.
     This is the WHY layer. The WHAT is in cwf-open-items-register-v69. -->

## S68 in one line

**Four phases merged, one in flight, and the flip they were all pointed at was
measured and declined.**

---

## The arc

S68 opened clean — no phase in flight, zero pending migrations — with F187 as
the named first work. It ended having merged F187, the learning brake, the brake
seam, the shadow lens and the write lock, and having **turned `frameRouting`
down on evidence**.

The through-line is not the phases. It is that **three separate measurements
each found that the thing being measured could not be trusted to measure
itself**, and each fix made the next measurement possible:

1. The learned word map rewrote itself on every human turn, so nothing
   downstream could be calibrated. → **the brake**.
2. The loss report named which categories were offered but not which category
   owned the missing tool, so a mis-filed catalog read as a story about compound
   sentences. → **the owning-category column**.
3. The catalog itself filed tools by implementation surface, and separately hid
   a deliberate, undocumented write lock. → **the re-filing and ADR-011**.

---

## The five things worth remembering

**1 · A tool the catalog cannot see is still a tool the model can call.**
Superset's gateway offers four tools and hides twenty-two behind a string
argument. Every governance mechanism we own — annotation, category, exposure —
addresses tools by name in a catalog, and therefore addressed none of them. The
two reach points that exist are the `search_tools` result and the `call_tool`
pre-flight, and F187 closed both. The design ruling is durable, not a
workaround: **Superset is a data source; CWF draws its own charts.** That was
proven in production on 2026-07-29 — 144 OEE points rendered in the CWF panel —
though by the ARMES path, because **the model never enters the gateway at all**
(F207). F187's value is therefore insurance, not savings, and saying so is part
of the finding.

**2 · The floor is today's state, never a new state.**
`router.enabled` floors to 0 so an outage cannot switch the router on;
`router.learnEnabled` floors to 1 so an outage cannot change what the system
already does. Opposite directions, one rule. The same rule later commanded the
catalog fix independently: today's live catalog has zero write tools filed, so
the outage floor had to lose its thirty-five.

**3 · A routing bucket is the wrong grantee for write authority.**
Forty-four tools were unreachable on filtered turns, and the intersection with
`exposure='write'` was exactly 44/44. An accident does not land on the boundary a
schema field draws. It was deliberate — and undocumented, undefended, and already
reversing in four unpublished drafts. **The response was not to recover the
intent but to legislate the policy today, with the evidence in hand.** The
staged JSON of the original batch was deliberately not read: it could not change
the decision, because an explicit filter confirms the policy and an accident
confirms it too.

**4 · Losses are computable; gains are not.**
The lens's central discipline. Ground truth is *which tool was called*, and only
offered tools can be called, so recall flatters whichever arm offered more. The
lens may say *"the flip would have removed a tool that was demonstrably needed"*
and may **never** say *"the flip would have offered a better tool."* When Arm B's
recall came out higher than today's router's, that number was printed as a
reference and refused as a verdict — which is the entire reason the rule was
pre-registered before the population was counted.

**5 · Filing a tool correctly does not help a frame that never asks for its
category.** The catalog repair moved depth (12 lost instances → 10) and not a
single turn. Two turns now get their linestop report and lose the scrap summary
instead — filed correctly in `quality`, and `quality` is a category their cell
never derives. **Catalog repair and derivation repair are separate repairs.**

---

## The owner decision

`router.frameRouting` stays dark. Not "closed forever" — **bound to the A23
evaluation and re-openable only there.**

The reasoning: M1 = 5/52, two of the five are a narrow gate on the FIRE
augmentation and three are genuine frame insufficiency that would re-open K1 and
the IR schema. The flip's measured benefit is a ~6-tool narrowing of the offered
set. **Re-opening K1 to buy that is disproportionate — and the frame already
produces its value in the understanding layer, where it does not have to earn it
as a routing replacement.**

This is what the measurement was for. Two sessions of lens work made several
sessions of IR work unnecessary. The lens survives as an instrument with a
pre-registered rule and a pinned corpus.

---

## How the lanes behaved

The Author lane **corrected the Architect on evidence five times** and was right
every time: refusing a blanket-upsert script, refusing to publish before the
baseline was observable, refusing to synthesise a baseline that would have
manufactured evidence, overturning the compound-utterance diagnosis with the
owning-category column, and rejecting the "additive branch" framing of a change
that was actually the withdrawal of an escape hatch. **A lane that only executes
is a lane that cannot catch a specification defect**, and this session's best
findings came from the one that pushed back.

The Architect made **ten premise errors**, listed individually in register v69
§7. The recurring root is identical every time: **writing a specification from a
document instead of reading the live artefact.** Two of the ten were violations
of laws already on the books (S67-3, and the Architect's own recorded
stale-`deploymentId` trap), which is worth more attention than the eight novel
ones.

Two mistakes were **deliberately not cleaned**: a governed row written by a stray
positive control, and a param whose governed record begins at 0 though it ran at
1 for months. Both are recorded with provenance instead. **An append-only ledger
earns its worth by recording faithfully, mistakes included; scrubbing one to look
tidy is worse than one honest ugly row.** The same principle kept four
law-encoding tests inverted in place rather than deleted — an inverted test is
the record of a law changing, a deleted one is amnesia.

---

## What the next session should not have to rediscover

- The synthetic injector **never calls tools**. Any criterion phrased as *"stable
  across a full synthetic day"* is vacuous for anything downstream of routing.
- `turn_done` is **not** a complete turn count (31 of 95 frame turns lack one).
  Do not use it as a denominator.
- The durable ledger **does not see local tools** — 205 raw vs 168 rows,
  difference exactly 37, all `resolve_time_range`.
- The ROUTE-SHADOW corpus is **pinned**: `--until 2026-07-29T03:14:13.179013Z`,
  N = 52, single user, organic only. Any re-run uses exactly this.
- The learned map is **frozen** at 25 rows since 2026-07-29T03:03:17Z. Verifying
  it stayed frozen requires **both** the row count and `max(updated_at)` — a
  stable count alone would hide an in-place overwrite.
- A23's ⑤/⑥ discriminator behaviour **already exists partially in production**.
  Measure it before rebuilding it.

<!-- END · CWF-SESSION-GRAPH-KB-v67 · 2026-07-29 -->
