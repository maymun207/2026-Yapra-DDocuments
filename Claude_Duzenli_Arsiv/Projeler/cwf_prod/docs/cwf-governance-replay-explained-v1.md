# Governance Replay, Explained

**A textbook for the CWF → EAIP governance-replay lenses**

<!-- cwf-governance-replay-explained-v1 · rev 1 · 2026-07-08 · code-grounded at origin/master `5485a96`
     (RULE-25 fresh-clone verified: groundingCheck.ts, routingSlice.ts + ALWAYS_INCLUDE, pairedReplay.ts
     wilsonInterval/computePairedDelta/distinguishable, backendTrust.ts backendAuthority read directly).
     Canonical source-of-truth markdown for the User Docs page (Phase C). The app ships a rendered HTML
     twin; this .md is the portable/reviewable original. -->

---

## 0. Who this is for and what it answers

You are looking at a chat agent that talks to a real factory. A user asks *"how many pieces failed the glaze check on line 7 yesterday?"* and the agent calls a tool, gets an answer back from a backend system, and writes a sentence. The uncomfortable question this whole subsystem exists to answer is:

> **When the agent writes that sentence, how do we know the backend didn't lie, mislead, or answer a question it had no authority to answer — and how do we prove that a *governance rule change* would have caught it?**

This document explains the tool we built for that: the **governance-replay lens**. It is written in two registers at once — plain software-engineering terms and the AI-specific terms — because the audience is both. Read the plain sentences if you just want the mechanism; read the parentheticals if you want the model/agent framing.

There are two things in this system that both get loosely called "replay," and confusing them is the single most common mistake. Section 5 pulls them apart. Everything before that is about the **lenses**, which are the cheap, deterministic, everyday tool. Section 5 is about the **A/B experiment**, which is the expensive, statistical, occasional tool.

---

## 1. What a lens is

A **lens** is a deterministic, no-LLM, read-only re-run of **exactly one governance gate** against **one recorded past turn**, evaluated at **a rule-version you choose**.

Break that sentence into its five load-bearing words:

- **Deterministic.** Same recorded turn + same rule-version in ⇒ same verdict out, every time. There is no model call, no temperature, no sampling. It is a pure function. (In AI terms: this is *not* an LLM-as-judge. A judge model would be non-deterministic and un-auditable; a lens is arithmetic over recorded data.)

- **No-LLM.** A lens never spends a token. It does not prompt anything. It reads what already happened and applies rule logic. This is why you can run thousands of them for free.

- **Read-only, pure GET.** A lens touches no state. It does not write an audit row, does not mutate the recorded turn, does not consume quota. Running a lens a million times leaves the system byte-identical to never having run it. (This is the property that lets the UI expose it freely: there is nothing to meter and nothing to corrupt.)

- **Exactly one gate.** The production turn passes through several governance gates in sequence — grounding, routing, scope/authority. A lens isolates **one** of them and asks its question alone. You don't re-run the whole pipeline; you re-run one stage's *judgment* over the already-captured inputs to that stage.

- **At a chosen rule-version.** This is the whole point. The recorded turn was originally judged under whatever rules were live *at the time*. A lens lets you re-judge it under **rule-version vN** — the version you're proposing, or an older one, or the current one. That makes a lens a **counterfactual engine**: *"What would this gate have decided about this exact past turn, if rule-version vN had been in force?"*

The other critical implementation fact: a lens **reuses the production core**. The grounding lens calls the same `groundingCheck` code that runs live in every real turn; the routing lens calls the same routing/`ALWAYS_INCLUDE` logic. A lens is not a re-implementation of the gate for testing — it *is* the gate, pointed at recorded data instead of a live turn. This is what guarantees the lens verdict is the production verdict. If the lens said one thing and production did another, the "floor" would have drifted, and that class of bug is exactly what we refuse to allow.

**Plain-engineering summary:** a lens is a unit test you can point at real production history, where the "expected value" is "what rule vN says should have happened," computed by the same code that runs in prod.

---

## 2. Why lenses matter: token-free governance regression testing

Every governance system faces the same fear: *you change a rule to fix one case, and silently break a hundred others.* In ordinary software you'd write a regression test suite. But here the "inputs" are thousands of real, messy, recorded agent turns, and the "correct behavior" is a governance judgment that itself changes when you edit a rule.

The lens turns that fear into a measurement:

> Take a rule change. Replay every recorded turn through the affected lens twice — once at the **old** rule-version, once at the **proposed** rule-version. The turns whose verdict **flips** are exactly the decisions your change affects.

Because lenses are free (no tokens) and pure (no state), you can run this over your entire recorded history before shipping the rule. You get a deterministic diff: *"this change flips 4 past turns from PASS to VIOLATION and 0 from VIOLATION to PASS."* That is governance regression testing with zero model spend and zero risk of corrupting the very history you're testing against.

This is the everyday value. The A/B experiment in Section 5 answers a different, rarer question ("does perturbing the live agent change its behavior?") and it *does* cost tokens. Don't reach for the expensive tool when the free one answers your question.

---

## 3. The three lenses = three ways a data agent fails

A data agent — an LLM wired to real backend tools — has three characteristic failure modes. Each lens is the deterministic detector for one of them. They map cleanly onto the three grounding-violation kinds the production code already tracks (`GroundingViolationKind = 'empty_as_zero' | 'count_understatement' | 'fabrication_risk' | 'scope_divergence'` in `api/cwf/_lib/grounding/types.ts`).

### 3.1 Grounding lens — *"empty ≠ zero"* (truthfulness of absence)

**The failure:** the backend returns **nothing** — an empty result set — and the agent reports it as **"zero."** These are not the same statement. "Zero pieces failed" is a factual claim about the world. "The system returned no rows" might mean zero failures, or it might mean the query hit a barcodeless zone, a permission wall, a degraded backend, or a scope the tool simply can't see. Reporting the second as the first is a **lie dressed as data** — and it's the most dangerous lie because it looks like a confident, precise answer.

**The rule, made concrete:** in this factory, `IKINCILUST` is a barcodeless zone. A tool that finds no barcodes there must surface *"not visible in ARMES"* — **never** *"zero."* The grounding gate encodes this: a real numeric 0 is **data**; a missing result is a **gap**; an empty set is **"no data"**; a non-numeric blob is **"not chartable."** Four distinct states that a naive agent collapses into one misleading number.

**What the lens checks:** given a recorded turn's tool results, at rule-version vN, does the grounding gate raise `empty_as_zero` (or `count_understatement`)? The lens re-runs `groundingCheck` — the exact production function — so the verdict is the production verdict. The lens has a **code floor**: even with the governed DB absent (an outage), the resolver *always* unions the reference/code rules, so `empty ≠ zero` survives a database outage. That invariant is sacred; the lens inherits it because it reuses the same resolver.

**In AI terms:** this is hallucination-of-precision detection. The model, asked to be helpful, manufactures a crisp number from an absence of evidence. The grounding lens is the deterministic tripwire for that specific manufacture.

### 3.2 Routing lens — the `ALWAYS_INCLUDE` floor (were the right tools even offered?)

**The failure:** the agent gives a wrong or empty answer not because it reasoned badly, but because **the tool it needed was never put in front of it.** Tool selection ("routing") is a *soft*, learned, advisory layer — it improves how the agent *finds* tools. But some tools must be offered on **every** relevant turn regardless of what the router thinks; those live in an `ALWAYS_INCLUDE` floor (`api/cwf/_lib/toolCategories.ts`, `shared/dbConstants.ts`). If the floor is breached — a must-offer tool goes missing — the agent can be *correct given its options* and still *wrong about the world*, because its options were wrong.

**What the lens checks:** given a recorded turn, at rule-version vN, was the `ALWAYS_INCLUDE` floor honored — were the mandatory tools present in the offered set? The routing lens (`api/cwf/_lib/replay/routingSlice.ts`) re-derives the offered-tool set deterministically and asserts the floor held. It cleanly separates the two concerns the recurring-trap section of our instructions insists on: **learning improves how the agent FINDS tools (routing); it never changes what the agent KNOWS (correctness).** The floor is the correctness guarantee that routing is not allowed to erode.

**In AI terms:** this is a check on the *action space*, not the *policy*. You can have a perfect policy over a truncated action space and still fail. The routing lens audits the action space.

### 3.3 Scope / authority lens — right scope, only authoritative sources (the next lens to build)

**The failure — two-headed:**
1. **Scope mis-attribution.** Data from backend A is presented as if it answered a question about backend B's domain — e.g. a Superset BI aggregate quoted as if it were the ARMES system-of-record count. The number might be internally consistent and *still* answer the wrong question.
2. **Authority violation.** A **non-authoritative** source is trusted for a claim only an **authoritative** source may make. In ADR-001 terms, each backend carries a `backendAuthority` (from the trust registry, `api/cwf/_lib/knowledge/reference/backendTrust.ts`): ARMES is the `system_of_record`; Superset is a BI gateway scoped to a bound datasource. A production count should be attributed to, and trusted from, the system of record — not manufactured from, or silently reconciled against, a BI view.

**What the lens will check** (this lens is the **committed next build** after Phase C; its axis is `backendAuthority` and its violation kind is the already-defined `scope_divergence`): given a recorded turn, at a chosen `backendAuthority` configuration, was every claim attributed to the correct scope, and was every authoritative claim sourced from an authoritative backend? Its floor is **conservative non-fabrication**: when in doubt, attribute and suppress rather than assert.

**In AI terms:** this is provenance and trust-boundary enforcement, done deterministically. It is where the three lenses most directly serve ADR-001's thesis (next section).

---

## 4. The point of all three: ADR-001 — make a lying backend *harmless*, not *honest*

You cannot make a backend honest. It's a remote system you don't control; on any given day it can be misconfigured, degraded, partially scoped, or outright wrong. ADR-001's insight is to **stop trying to make the source honest and instead make its dishonesty harmless.**

"Harmless" is a deterministic function of six things — provenance, role-ceiling, scope verification, authority matching, cross-source reconciliation, and invariants. A single-source, self-consistent, in-scope *lie* is not necessarily made *visible* — a lie can be locally perfect — but it is made **contained, non-authoritative, attributed, and quarantinable**: it can't be promoted to an authoritative claim, it carries its provenance, and it can be isolated. Trust is *earned by structure*, computed by code, never granted by an LLM judge.

The three lenses are the three deterministic checks that enforce this at replay time:

- **Grounding** stops an *absence* from being laundered into a false *fact* (`empty_as_zero`).
- **Routing** stops a *truncated action space* from producing a *falsely confident* answer (`ALWAYS_INCLUDE` floor).
- **Scope/authority** stops a *non-authoritative or mis-scoped source* from being *trusted as authoritative* (`scope_divergence` / `backendAuthority`).

Together they let you take a rule change and *prove*, deterministically and for free, which past turns it would have rendered harmless (or newly exposed). That proof — not a model's opinion — is the deliverable.

---

## 5. The two things called "replay" — do not confuse them

This is the section people re-read. There are **two** distinct mechanisms, with opposite cost and audit profiles.

| | **The lenses** (Sections 1–4) | **The Part A A/B experiment** (this section) |
|---|---|---|
| What it does | Re-judges ONE recorded turn at a chosen rule-version | Runs the LIVE agent twice — baseline vs a perturbation — and compares |
| Model spend | **Zero tokens** — no LLM call | **Spends tokens** — the agent actually runs |
| State | **Pure GET, un-audited** — writes nothing | **Audited** — writes one paired `replay_audit` row |
| Determinism | Fully deterministic (arithmetic over recorded data) | The agent is stochastic → needs **statistics** (Wilson-CI) |
| Question answered | *"Would rule vN have flipped this past decision?"* | *"Does perturbing the agent measurably change its behavior?"* |

The lens is a **counterfactual over recorded history**. The A/B is a **live experiment** with repetitions and confidence intervals, because the agent's output is random and one sample proves nothing (**stochastic verification**: a small clean sample is *not* proof).

### 5.1 The mandatory worked example — the real 2026-07-06 Part A A/B

This example is not illustrative. It is the actual run, and it teaches the single most important statistical lesson in the whole system.

**Setup.** Part A, an A/B at **reps = 3**. Two arms:
- **Baseline** — the agent as-is.
- **Perturbed** — the agent with a specific perturbation applied to the recorded turn.

The scored metric is `empty_rate`: the fraction of reps whose completion came back **empty**. (Note *what is measured*: emptiness/absence — **not** answer quality, correctness, or length. Hold that thought.)

**Result.**
- Baseline: `empty_count = 0` out of 3 scored reps ⇒ `empty_rate = 0`.
- Perturbed: `empty_count = 0` out of 3 scored reps ⇒ `empty_rate = 0`.
- Each arm's Wilson 95% score interval on 0/3: **`[0, 0.561]`**.
- The two intervals are identical and therefore fully overlap ⇒ **`distinguishable = false`**.

**How the number `0.561` arises.** The code computes a **Wilson score interval**, not the naive normal approximation (`api/cwf/_lib/replay/pairedReplay.ts`, `wilsonInterval(successes, n)` with `WILSON_Z` = the 95% two-sided z). The Wilson interval is the small-N-safe one: it never runs off `[0, 1]` the way the normal approximation does, and `wilsonInterval` honestly returns **`null` when n = 0** (no scored reps → no interval, rather than a fake `[0,0]`). For 0 successes in 3 trials the Wilson upper bound lands near **0.56** — i.e. *"having seen zero empties in three tries, we're 95% confident the true empty rate is somewhere between 0% and ~56%."* That is an enormous range, and that width is the entire point.

`computePairedDelta` then computes both arms' intervals and sets `distinguishable` by a **deterministic overlap check**: non-overlapping intervals ⇒ `distinguishable = true`; overlapping — or either interval absent — ⇒ `distinguishable = false` ⇒ the UI must label it *"not distinguishable from noise."*

### 5.2 The lesson: `distinguishable = false` means UNDERPOWERED, not "no effect"

The seductive misreading is: *"Both arms scored 0. The perturbation did nothing."* **That is wrong.** With only 3 reps per arm, the confidence intervals are so wide (`[0, 0.561]`) that they'd overlap even if the true rates were, say, 5% and 40%. You have not measured "no difference" — **you have not yet measured anything.** `distinguishable = false` is a statement about your *measurement power*, not about the *world*.

Walk the progression:

- **reps = 1** — **illustrative only, never evidence.** One sample of a random process. A single clean run tells you the machinery ran; it tells you nothing about rates. Wilson on 0/1 is essentially `[0, 1]`. Use reps=1 to demo the pipeline, never to claim a finding.
- **reps = 3** — **underpowered.** This is the 2026-07-06 run. `[0, 0.561]` intervals overlap. Correct verdict: `distinguishable = false`, read as *"inconclusive — need more reps,"* **not** *"equivalent."*
- **reps = 20+** — **powered.** The interval tightens (0/20 Wilson upper bound ≈ 0.16, and it keeps shrinking with n). Now, if a real effect exists, the arms' intervals can separate and `distinguishable` can flip to `true`. Only here are you entitled to a confident claim.

This is **Wilson-CI honesty**: the system is built to *refuse a confident claim at low power* rather than manufacture one. Suppress, don't manufacture — the same conservative posture as `empty ≠ zero`, applied to statistics. A tool that reported "no significant difference" from 3 reps would be lying with the same structure as an agent reporting "zero" from an empty result set. We refuse both.

### 5.3 What the A/B measures — and what it doesn't

One more real detail from that run, because it prevents a second misreading. In the 2026-07-06 experiment the perturbed arm **shortened the reply from 365 tokens to 30 tokens** — a large, visible change in output. And yet `empty_rate` stayed `0` in **both** arms.

The perturbation *did* change the agent's behavior (much shorter answer). But the lens's metric is **emptiness/absence**, and a 30-token reply is short, not empty. So the metric correctly reported no change *in the thing it measures.* The scientific reading is precise: **the A/B measures absence, not answer quality or length.** If you want to measure length or quality, that's a different scorer. Don't let a dramatic length change tempt you into saying the "empty" metric moved — it didn't, and the tool was right to say so.

---

## 6. One-paragraph field guide

If you remember nothing else: a **lens** is a free, deterministic, read-only re-judgment of one governance gate over one recorded turn at a rule-version you pick — use it to prove, before shipping, exactly which past decisions a rule change flips. The three lenses guard the three ways a data agent fails: **grounding** (don't call an absence "zero"), **routing** (don't let a shrunken tool set fake confidence), **scope/authority** (don't trust a non-authoritative or mis-scoped source). The point (ADR-001) is to make a wrong backend *harmless*, not *honest* — deterministically, never by asking a model to judge. Separately, the **Part A A/B** is the expensive, token-spending, audited experiment that runs the live agent with repetitions; read its Wilson intervals honestly — with only a handful of reps, "not distinguishable" means *you haven't measured yet*, not *there's nothing there*.

---

<!-- END · cwf-governance-replay-explained-v1 · rev 1 · 2026-07-08 · anchor 5485a96 -->
