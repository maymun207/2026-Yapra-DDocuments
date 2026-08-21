# CWF — F185 Design Note: the learning path needs a guard and a brake · v1
<!-- cwf-f185-learning-guard-design-v1 · 2026-07-27 · S67 · Architect: Claude
     Floor at issue: master 0d540c9 (rev 150, post-F190).
     Binding: ADR-009 v1_1 (discovery over authored lists; the degree test) ·
     ADR-010 (declaration vs observation) · the determinism/soft split
     (learning improves how the agent FINDS tools, never what it KNOWS) ·
     GOLDEN FREEZE (no prompt.segment publish until B5 — nothing here needs one).
     Precondition for M-C. Every file:line below was read at the floor above,
     not recalled. -->

## §0 · Status and sequencing
Design, not built. **M-C cannot run before this lands** — without a brake the
comparison arms mutate their own instrument, which is exactly what confounded
the S66 provider A/B. Queue position: after the v3 baseline, alongside or before
F187, and strictly before M-C.

Nothing here publishes a `prompt.segment`, so the GOLDEN FREEZE does not touch
it.

## §1 · The finding in one sentence
**An entity name is a SCOPE, not a domain signal.** `granit` says *which
factory*, never *which tool family* — so learning it as a category keyword is a
category error in the literal sense, and the learned map has been making it
several times a day.

The proof that the signal is noise is internal to the data: `glazur1 →
[material]` while `glazur3 → [metrics, production, andon, factory, machine]`.
Sibling production lines, wholly different routing, differing only by which
question each happened to appear in first. And after the cache was cleared to 2
pinned rows in S66 it regrew to **19 within hours**, with 17 keys back inside
~10 minutes and `granit` landing in a **third** distinct category set.

Time words are the same error one axis over: `dün` · `akşam` · `gece` · `4-12` ·
`vardiyasında` · `geçen` say *when*, never *which tool family*.

## §2 · What was verified live (file:line at 0d540c9)
| Fact | Source |
|---|---|
| Learn choke point: `tokens.length !== 1 → skipped_short`; `!isLearnableKeyword → skipped_stopword`; else persist | `toolCategories.ts:461-478` |
| Learnability predicate = length > 2 **AND** not in `ROUTING_STOPWORDS` | `toolCategories.ts:535-537` |
| `ROUTING_STOPWORDS` is a hand-authored set of ~90 words, with three separate blocks commented as *"observed production-leak top-up"* (F144 · ROUTE-HYGIENE-1 · F145) | `toolCategories.ts:507-529` |
| Two learn WRITE points: stage 7's awaited call, and a fire-and-forget call whose verdict is discarded | `stageTools.ts:540` · `toolCategories.ts:1049` |
| A third write path — proposal emit — filters by the same `isLearnableKeyword` and by known keywords | `toolCategories.ts:67-79` |
| `router.enabled=false` falls through to the **same keyword/learned path**, i.e. it leans on the cache harder | `toolCategories.ts:888-891` |
| Curation **create/accept always sets `pinned: true`** | `RoutingCurationRepository.ts:165` |
| Bulk clear removes **UNPINNED rows only** | `RoutingCurationRepository.ts:183` |
| The exclusion sources now exist: 779 discovered `line` + 17 `factory` rows, and a deterministic time resolver | `entity_registry` · `resolve_time_range` |
| No governed param stops learning; the `router.*` family is `{enabled, timeoutMs, maxCategories, contextTurns, frameEnabled, frameRouting}` | `agentParams.ts:76-97` |

## §3 · The diagnosis nobody has written down yet
`ROUTING_STOPWORDS` **grows with the world, not with the integration.** Its own
comments record the growth honestly — three top-up blocks, each added after
production leaked a new word. Under ADR-009 v1_1's degree test that artifact is
on the forbidden side of the line: the vocabulary users type is unbounded and
changes without telling us, so a hand-maintained exclusion list is stale by
construction and lands the maintenance on a human. **It is the hand-written zone
table, one layer up.**

But the list is not wholly illegitimate, and the design turns on the
distinction:

- **Function words** (`ama`, `için`, `the`, `which`) are bounded by *language*,
  not by the world. A flat, routing-specific list is the right home for them and
  it stays.
- **The top-ups are not function words.** `hafta` · `bugun` · `yarin` · `dun` ·
  `toplam` · `bilgiler` are time and content words. They were hand-added because
  **there was no principled source to consult**. There is now.

So the remedy is not "extend the list". It is: **stop authoring the exclusions
we can observe.**

## §4 · Design decisions

### D1 · Three sources, one predicate
`isLearnableKeyword` becomes a three-way check, each clause with its own
authority:

1. **Function word** → the existing code list. Unchanged, and explicitly frozen:
   no new top-ups may be added by hand once D1 ships; a leak that would have
   prompted a top-up is instead a finding about which observed source missed it.
2. **Time expression** → if the deterministic `resolve_time_range` parses the
   token as a time surface, it is never learnable. The authority is the same
   resolver the gate already trusts; no second time vocabulary is created.
3. **Entity reference** → if the token resolves against the discovered
   `entity_registry` (any layer) or a governed `entity_alias`, it is never
   learnable.

Clause 3 is the ADR-009-compliant answer: the exclusion set is **discovered**,
scales with the plant automatically, and needs no human when Kale adds a line.

### D2 · The exclusion must use the RESOLVER'S normalization, or it will miss
the cases that matter
`extractKeywords` lowercases and splits on whitespace; it does not fold Turkish
characters or strip suffixes. So `Granit'in` arrives as tokens that a naive
equality check against `entity_registry` will not match — which is precisely the
form real users type, and precisely the class F186 already observed (`nin`,
`sini`, `larin` in the learned map).

**Binding:** clause 3 runs the token through the *same* normalize → fold →
suffix-strip path `resolveEntityRef` uses. A guard with a different normalizer
than the resolver is a guard that passes exactly the inflected forms it exists
to stop.

### D3 · Three write points, not two
The guard sits at every path that can put a row in the map:

1. `learnToolMapping` (`toolCategories.ts:461`) — the awaited choke point.
2. The fire-and-forget learn at `toolCategories.ts:1049` — same function, so it
   inherits the guard, **but its verdict is discarded**, which is why the
   contamination was invisible. It must at minimum count.
3. **The curation accept/create path** (`RoutingCurationRepository.ts:165`).
   This is the one the register flagged and it is the most dangerous: accept
   writes `pinned: true`, and bulk clear removes unpinned rows only
   (`:183`) — so **a human accepting a contaminated proposal creates a row that
   Clear can never remove.** The human-ratification door is currently a *worse*
   contamination path than the automatic one. The guard must apply there too,
   and a rejected accept must say which clause rejected it.

### D4 · The guard REPORTS before it blocks — and it counts forever
`LearnVerdict` already exists (`toolCategories.ts:422`) as
`'learned' | 'skipped_stopword' | 'skipped_same' | 'skipped_short'`. Extend it
with `skipped_entity` and `skipped_time`, emit them, and count them per turn.

Two reasons this is not decoration. First, a silent drop is invisible, and this
project has been bitten three times by greens that meant "nothing happened".
Second, **the counters are the measurement**: they say how much contamination
was being written per hour, which is the only honest before/after for §5.

### D5 · The brake: `router.learnEnabled`, and NOT a reuse of `router.enabled`
New governed param, structure in code, value governed:

    { key: 'router.learnEnabled', value: 1, type: 'number', min: 0, max: 1,
      stage: '07', sessionTweakable: false }

`type: 'number'` follows the corpus's own bool-as-number convention, documented
beside `ROUTER_ENABLED`. Seed **1** — shipping it at 0 would change behaviour on
deploy, and this phase must be behaviour-neutral until someone turns it off
deliberately.

**`router.enabled=false` must not be repurposed.** It points the wrong way:
`toolCategories.ts:888-891` falls through to the same keyword/learned path,
so disabling the router makes the system depend on the learned map *more*. Using
it as a learning brake would be the opposite of a brake.

### D6 · Cleanup is not a fix, and its ORDER matters
The S66 clear was correct and temporary: 166 rows → 2 pinned → 19 within hours.
Clearing again before the guard lands buys hours and teaches nothing.

**Order: guard → brake → measure regrowth → then clear.** Clearing into an
unguarded system is how you get a third `granit` category set. When the clear
does happen it must also address the pinned rows, because D3.3 means some pinned
rows may be contaminated and immune to the ordinary path.

## §5 · Proof of done (S63-1) — computed, not asserted
1. **The guard can fire.** `skipped_entity` and `skipped_time` are observed
   non-zero in production logs, with the rejected token named. A zero here is
   not believed until the counter is proven able to be non-zero (S66-1).
2. **The guard is not over-firing.** A legitimate domain word (`oee`, `fire`,
   `duruş`) still learns. Both directions are asserted; a guard that rejects
   everything is as broken as one that rejects nothing, and only the first
   direction is usually tested.
3. **Regrowth stops.** After the clear (D6 order), no entity name or time word
   reappears in `tool_category_cache` over a full 24h synthetic cycle. The
   measurement is the table, not the logs.
4. **The brake stops writes.** With `router.learnEnabled=0`, zero learn writes
   over a full cycle — and the positive control is that the same window at
   `=1` produces non-zero writes. A zero from a switch never proven to permit is
   not evidence.
5. **The accept path is guarded.** Attempting to accept a contaminated proposal
   is rejected and names the clause. This is the one a UI change could silently
   regress, so it is a test, not a habit.

## §6 · Out of scope, named
- **F186 · tokenizer suffix fragments** (`nin`, `sini`, `larin`, `deki`). D2
  makes the guard robust to them, which is different from fixing the tokenizer.
  Related, sequenced after, not folded in.
- **F177 · the proposal queue.** Do not work the queue until this lands — the
  queue currently offers `granit`→factory, `glazur3`→production, `kb7`→machine
  (which would overwrite the curated `kb7`→factory) and `grafik`→andon. Accept
  pins, so working it early creates permanent rows.
- **The semantic router itself.** This note governs what the keyword/learned
  tier is allowed to remember; it changes no routing tier and no eval gate.
- **F198 constraint:** clause 3's entity index must be loaded with a
  **paginated** read — `entity_registry` sits at 796 active rows today, under
  the PostgREST cap but not by much, and equipment discovery would push it over.
  A guard whose exclusion set silently truncates would let exactly the
  unluckiest entity names through.

## §7 · Why M-C waits for this
The S66 provider A/B varied model AND action-space size, and on top of that
**the runs mutated their own instrument**: every arm's traffic wrote new keyword
rows that the next arm then routed against. Freezing learning is what makes the
arms comparable. `router.learnEnabled=0` is that freeze, and it is a flag rather
than a build — which is the cheapest precondition M-C will ever get.

<!-- END · cwf-f185-learning-guard-design-v1 · 2026-07-27 · S67 -->
