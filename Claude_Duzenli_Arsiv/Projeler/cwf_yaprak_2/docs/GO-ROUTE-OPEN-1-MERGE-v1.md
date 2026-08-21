# GO · `ROUTE-OPEN-1` — merge instruction · v1

<!-- GO-ROUTE-OPEN-1-MERGE-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     ONE self-contained relay (D-2). RULE-25 review from a fresh clone.
     G1's deviation is RATIFIED — the brief was wrong and the argument is recorded. -->

---

## §0 · REVIEW RESULT — re-derived, nothing taken from the report

| Claim | Verified |
|---|---|
| `origin/master` | `d4f65600…` ✓ unmoved |
| branch | `8ab7b9ce…` · **0 behind / 1 ahead** ✓ |
| diff | 14 files, **+1107 / −44** ✓ |
| test files · migrations · docVersion | **452** · **67** · **rev 192** ✓ |
| **`null` really closes** | `backendCoverage.ts:84` — `if (covered === null) return true` and `:85` `if (!backendId) return true`, where **true means "filter it", i.e. today's behaviour** ✓ |
| **the partition** | `stageTools.ts:353` — `[...gatewayTools, ...coverage.uncoveredFlat, ...flatResult.filtered]` ✓ |
| **the (B)-control** | `routeOpenStageTools.test.ts:261-281` — uses the **real classifier** `seedExposureOf`, plus a **fixture-reality test** (`:262`) proving the three tools are write-classified **and** in no category, so it cannot pass vacuously ✓ |

**Two things done better than the brief asked.** The (B)-control was specified as
"assert the write tools stay absent"; AG made it assert **against the real
classifier** and added a test proving the fixture is real — a control that cannot
pass by accident. And a **second fail-closed case** I never specified: a tool
whose server carries **no backend identity** is also filtered, because an
exemption keyed on identity must not be granted to something that has none.

---

## §1 · G1'S DEVIATION IS RATIFIED — the brief was wrong

I prescribed `{armes}` as the floor's covered set. AG did not implement it,
argued in writing, and **is right.** The brief saw two states where there are
three:

| | Meaning | Effect |
|---|---|---|
| set contains the id | filed | filtered |
| set lacks the id | **confidently** unfiled | offered whole |
| **`null`** | **attribution UNKNOWABLE** | **filtered — fail closed** |

**The decisive argument is my own law.** `F185`: *the floor is TODAY's state,
never a new one.* Under `{armes}`, a `domain_rules` outage would open
`machine-knowledge-base` **wholesale** — a behaviour that does not exist today,
introduced by a routing change, on **the one surface with no gate in its path**
(ADR-011's docblock says exactly that: the floor serves precisely when
`evalGate` cannot run). `null` degrades toward today; `{armes}` degrades toward
something new.

The other three hold too: on the floor `exposureByTool` is empty, so
`writeOffered` would report a **false zero** for whatever the widening opened —
the same defect `F187 G6` removed from that very line. And `{armes}` is only
**contingently** true at this commit: `syncRoutingFloor --write` regenerates the
floor from this resolver's union across every enabled backend, and A5 owes a
re-run. `null` cannot rot that way and needs no guard.

**The disclosed cost is in the right direction:** during an outage an unfiled
backend's tools are dropped again. That is today's behaviour, which is what a
floor is for.

**Recorded as an Architect premise error.** I reasoned from two states because I
wrote the brief from the shape of the fix rather than from the shape of the
failure. `backendPatternRegistry.ts` had made the identical call one phase
earlier and I did not look.

---

## §2 · THE CONSEQUENCE AG FLAGGED — and the ruling it forces

> *"Offering uncovered backends whole makes the flat-path collision reachable on
> every turn rather than almost never."*

Correct, named, and correctly left out of scope. **`ROUTE-OPEN-1` raises
`BUG-012`'s exposure.**

**Ruling: the phase ships anyway** — the product is lame without it and the
collision has been reachable in principle since the day a second flat backend
became possible. **But `BUG-012`'s registration guard moves to the head of the
queue, ahead of `HONESTBENCH-RUN-1`'s M3b dial.** M3b's whole purpose is to make
a name collision happen deliberately; **connecting an instrument built to cause
collisions to a system that cannot see them is not a test, it is contamination.**

---

## §3 · S82-2 — minted, because this is the third instance in two days

| When | Apparatus | Reported | Truth |
|---|---|---|---|
| yesterday | mutation harness | GREEN | `tail -6` cut the summary line |
| today | `vi.spyOn` on an ESM class export | 18/19 pass | the mock was **inert** |
| now | mutation run | **8/8 SURVIVED** | zsh did not word-split; vitest got one bogus path |

> **S82-2 · A TEST APPARATUS'S REPORT IS ALSO A CLAIM.** Every mutation or
> verification harness must run **its own red/green positive control** before its
> output is used as evidence. An uncontrolled harness result is not evidence.

AG already did this (*"with both harness controls proven first"*). The rule makes
the practice binding rather than optional.

**And two repairs worth carrying:** a literal **NUL byte** landed in
`routeShadowLens.ts` and `RULE-24` caught it — repaired not by choosing a safer
separator but by `JSON.stringify([backendId, toolName])`, **injective by
construction**, so no separator can collide. And one mutation survived
**honestly** because the uncovered fixtures matched no category; killing it
needed an uncovered tool the filter would pass. A harness blind by fixture is a
harness that lies quietly.

---

## §4 · MERGE

**CI on `8ab7b9ce`**, five by name; `in_progress`/`null` is not a pass.
`check:tenant-zero` passes in a fresh clone — verified this session at the
anchor: the hits are gitignored files absent from CI's clone.

**Anchor:** must still be `d4f6560027a64efbf01935ed7b25f6dfbf17a711`. If moved:
STOP and report.

**Merge `--no-ff`, message verbatim:**

```
merge: ROUTE-OPEN-1 — a backend nobody filed is still a backend

The system could mount a backend, sync it, mirror it and health-track it,
and then drop its tools from the turn. The offered set was
all(gateway) union relevanceFilter(flat), the filter ran against
published tool_category rows, and an unfiled backend belongs to no
category -- so its tools survived only when the message matched NOTHING.
Production takes the filtered branch, so that was the live behaviour.

Discovery was never the gap. backend_tools already records every tool's
name, description and full input_schema, automatically, on connect. We
received the catalog and routed from a hand-written table instead -- and
the hand-written part was real but hidden: the RAG backend's rail was laid
by an operator-run job file, so connecting it LOOKED automatic while
someone had authored scripts/jobs/rag-tool-categories-v1.json. Backend #4
would have needed another.

THE CARVE-OUT ALREADY EXISTED EIGHT LINES UP. Gateway tools bypass the
filter because "a gateway backend's tools match no keyword category, so
filtering them offers ZERO". The same sentence is true of any uncovered
flat backend. This generalises the carve-out from the symptom to its
cause: a backend with no category coverage cannot survive a category
filter.

PER BACKEND, NEVER PER TOOL. ARMES publishes ~97 of ~141 mirrored tools;
the uncovered remainder is not an accident -- ADR-011 excludes all 44
write-annotated tools from every filtered turn, because a filtered turn
cannot mutate the factory. A per-tool predicate would have offered them on
every turn and repealed ADR-011 through a routing change. The control that
proves it did not happen uses the REAL classifier rather than a restated
list, and ships beside a fixture-reality test proving those tools are
write-classified and uncategorised -- so it cannot pass vacuously. The
per-tool mutation kills it.

THE FLOOR HAS A THIRD STATE, AND THE BRIEF WAS WRONG ABOUT IT. The brief
prescribed {armes} as the floor's covered set, reasoning that an empty set
would open every backend. AG refused it and argued: null = attribution
UNKNOWABLE, which CLOSES. F185 decides it -- the floor is TODAY's state,
never a new one, and {armes} would open machine-knowledge-base wholesale
during a domain_rules outage, on the one surface with no gate in its path.
On the floor exposureByTool is empty, so writeOffered would report a false
zero for whatever the widening opened. And {armes} is only contingently
true: syncRoutingFloor --write regenerates the floor from this resolver's
own union. null cannot rot that way. A tool whose server carries no
backend identity also fails closed, because an exemption keyed on identity
must not be granted to something that has none.

TODAY NOTHING CHANGES, AND THAT IS ASSERTED RATHER THAN CLAIMED. No
backend is currently uncovered, so uncoveredFlat is empty and the offered
set is unchanged -- proven by recomputing the pre-change assembly from the
same production seam and asserting set equality, then asserting it held
BECAUSE uncovered=0 rather than by luck. What changes is that no one ever
has to author another tool-categories job file for a new backend.

THE BOUND IS NAMED, NOT ENFORCED. UNCOVERED_FLOOD_THRESHOLD = 50 reports
and never truncates: a silent drop is the disease, not the cure. The real
answer is ROUTE-DERIVE-1, where the rail derives itself from the mirror.

DECLARED, NOT ABSORBED: offering uncovered backends whole makes the flat
path's tool-name collision reachable on every turn rather than almost
never. ctx.vercelTools[safeName] still overwrites with no check, no log
and no span. Handled correctly in the lens (union semantics match
production) and deliberately not fixed here -- it is BUG-012, and its
registration guard now precedes HONESTBENCH-RUN-1's M3b dial, because an
instrument built to cause collisions must not be pointed at a system that
cannot see them.

PROCESS, RECORDED: a literal NUL byte reached routeShadowLens.ts and
RULE-24 caught it -- repaired with JSON.stringify([backendId, toolName]),
injective by construction, so no separator can collide. A mutation run
first reported 8/8 SURVIVED because zsh did not word-split an unquoted
scalar and vitest received one bogus path; that is the THIRD apparatus in
two days to report success while measuring nothing, and S82-2 now requires
every harness to run its own red/green control before its output counts as
evidence. One mutation then survived honestly, because the uncovered
fixtures matched no category -- killing it needed an uncovered tool the
filter would pass.

Tests 449/5072 -> 452/5108. Zero migrations. Drift obeyed by READING the
tabs: Request Lifecycle redrawn (step 13's "Others -> relevance filter"
had become false), Agent Control Plane redrawn (it inventories the
[ToolRoute] fields this extends), Stage Cards redrawn (stage 07's law
answers how the offered list is born); Architecture Map, Runtime Topology
and Governance Model reseal-only -- a new module inside the existing
routing area adds no node, authority, kind, gate, table or endpoint.
rev 191 -> 192.
```

**Then:** `git diff --quiet 8ab7b9ce HEAD` → clean. Push.

---

## §5 · REPORT, AND WHAT FOLLOWS

Merge SHA with **two** parents · five CI conclusions read at merge time ·
`TREE IDENTICAL` · final `git status`.

**Next, in order:** `BUG-012`'s registration guard → `ROUTE-DERIVE-1` →
`PACK-FROM-PROTOCOL-1`. Then `2.3a`'s G6 — the owner's demonstration — which is
now worth performing, because the sentence it tests can finally be true.

**Touch budget:** six for this phase — prompt · report · push round · GO · merge
report. **Declared as an incident.** Root: the brief never said *push the
branch*, so a fresh-clone review could not begin. Every prior phase pushed by
habit; a habit is not an instruction. Future phase prompts state it in §0.

<!-- END · GO-ROUTE-OPEN-1-MERGE-v1 -->
