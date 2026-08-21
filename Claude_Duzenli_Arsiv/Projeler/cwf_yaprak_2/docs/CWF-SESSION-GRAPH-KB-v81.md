# CWF — Session Graph KB · v81

<!-- CWF-SESSION-GRAPH-KB-v81 · 2026-08-05 · S82. Supersedes v80.
     Narrative, not a register. What happened, what it cost, what it taught. -->

---

## S82 in one paragraph

Five merges in one session, and the two that mattered most were the ones that
proved us wrong. A measurement instrument that could not read its own corpus was
repaired and then used, moving the first SOTA criterion by evidence in the
project's history. Then a foreign MCP server was built to test our honesty and,
before it could lie once, it falsified an architectural claim we had been
repeating for weeks: *backend identity is DATA* was half true. Two phases later
the other half was made true, a routing filter that had been quietly deleting
every unfiled backend was generalised, and the owner mounted a stranger's server
from the panel and watched the system use it. The sentence he had asked for came
within one link of being true — and the missing link had a name by the end of the
day.

---

## The thread, and where it led

It began with a ceiling. The clarification lens had a hard cap of 5000 rows over
a corpus of 6626, so every measurement it produced was truncated and the one
internal number in the SOTA contract had been stale for ten days. The fix was
not a bigger number: the corpus grows, so any literal is outgrown by
construction. The ceiling was **retired** and `truncated` became a statement
about the corpus rather than about our own limit.

Bolted to it was BUG-008 — the same instrument could not say when it had been
interrupted. That defect turned out to live one storey below where it had been
filed: not in the evidence file but in the **seam**, where a failed governed read
was written to `console.warn` and to nothing else, and where a thrown read and a
legitimately empty layer returned byte-identical values. Naming the failure at
the catch site was the fix; carrying it out over a stamped context was the
plumbing.

Then the analysis. The ask rate had fallen from 84.61 % to 55.41 % on an exactly
reconstructed population — and the review caught that it had been published
**without its counterweight**. Every number that instrument produces improves by
going *down*, which makes it trivially gameable: a gate that never asks anything
scores perfectly and is catastrophically wrong. The must-block guardian held at
4/4, so the fall was a win. But the brief had named `readIntegrity` as the
honesty precondition and forgotten the guardian, in a phase whose entire output
was a rate that improves by falling.

And then the testbed. It was built to make CWF's honesty measurable — a foreign
MCP server with a dial that could tell four specific kinds of lie. It never got
to lie. Preparing to mount it, AG asked where CWF decides whether a backend is
flat or gateway, and found a hardcoded two-entry map. The database column
existed. Nothing read it. Its own migration had said so in June — *"DATA now,
behavior later"* — and the Architect had **quoted that exact line** in a design
note while reading it as *behavior now*.

What followed was the rest of the wall: a hardcoded `BACKEND_IDS`, a positional
read into it, an admin guard that rejected any id absent from it, and a routing
filter that dropped the tools of any backend nobody had filed. The owner's
reaction was the turning point of the session: *we built a huge car and pulled
the plug lead off one cylinder.* Except the plug lead had never been fitted — we
were running a wire to each new cylinder by hand.

---

## The best hour: the demonstration

The owner asked to do it together, step by step, and that decision paid three
times.

Creating the identity produced exactly one line and no side effects — correct.
Saving the server produced a `200` and **nothing else**, which is how a
long-suspected defect finally became a live observation. The manual Sync button
worked instantly, which isolated the failure to the auto-fire rather than the
connection. And the turn — chosen deliberately to contain an ARMES keyword so
the filter would engage — showed the foreign backend's four tools surviving a
filter that had reduced 146 ARMES tools to seven.

Then the answer on screen:

> *"G-03 grove'u için toplam verim verisi bulunamadı. Bu grove için ölçüm
> yapılmamış veya veri mevcut değil."*

The server had returned `null` and `measured: false`. CWF did not say zero.
`empty ≠ zero` held on a stranger's backend, on its first turn, with no domain
pack, no categories and no configuration — and the response named its source.

---

## Sentences worth carrying

> **A backend with no category coverage cannot survive a category filter.**
> The carve-out for gateways had existed for months, eight lines above, written
> for the symptom and never generalised to its cause.

> **The floor has three states, not two.** Set-contains, set-lacks, and
> **`null` — attribution unknowable, which closes.** F185 decides it: a floor
> degrades toward today, never toward something new.

> **A test apparatus's report is also a claim.** Three harnesses in two days
> reported success while measuring nothing. The loud guard — the one written on
> the assumption it would never fire — is the one that paid.

> **Discovery was never the gap.** The mirror already held every tool's name,
> description and full input schema. We received the catalog and routed from a
> hand-written table instead. The owner's ARP analogy named it exactly: nobody
> keeps a central table; you ask, and the holder answers. MCP already broadcasts
> both — `tools/list` and the `instructions` field — and we read one and ignore
> the other.

> **Merging is not proving.** BUG-008 closed on a post-merge proof pair, not on
> its merge. A proof step written for it had to be **withdrawn as unsatisfiable**
> — it named an artefact that cannot fire in production.

---

## What the owner ruled

- The architecture layer came **off the shelf**: Graph KB, OPA, Qdrant/bge-m3,
  PB-A and PB-B all entered the walk order. *"Bu olmazsa olmaz."*
- **Graph KB's alarm was rung by the owner**, not by a measurement — and he said
  so plainly when the Architect tried to make it conditional.
- **OPA is in even single-tenant** — and, under the symmetry clause, arrived
  **with its criterion**: *"Ölçmediğin hiçbir şey var değildir."*
- **Multi-tenant stays parked.**
- `mount` before `BUG-005`.
- And the standing correction that produced the session's best work:
  **"Buralar çok kritik noktalar — çıkarım yapma, bana sor."**

---

## Carried forward, unresolved

The credential half of the sentence was never exercised. One link of the mount
still needs a human. Sixteen of sixteen external criteria remain unmeasured, and
the testbed has still not told a single lie. The frame extractor confidently
classified a grove as a production line — harmless while the gate is dark, and
not harmless the day it is published.

And thirteen Architect premise errors, all of one shape: **claims about live
behaviour written from documents, reports and mental models rather than from
reads.** They clustered in prose no gate inspects and never in the tables that
were computed. Verification and narration were separated by a gap, and the
citation was re-created across it instead of copied.

<!-- END · CWF-SESSION-GRAPH-KB-v81 -->
