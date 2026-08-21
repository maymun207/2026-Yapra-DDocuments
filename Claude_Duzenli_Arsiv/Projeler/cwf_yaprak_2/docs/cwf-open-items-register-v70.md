# CWF — Open Items Register · v70
<!-- cwf-open-items-register-v70 · 2026-07-29 · closes S69. Supersedes v69.
     S63-2: THIS REGISTER IS SELF-SUFFICIENT. Every open item carries its full
     wording here. Back-pointers only to terminal-marked items. -->

## §0 · FLOOR (verified from a fresh clone at session close)

```
origin/master   42e4839b652da74a226aae44f167d1ab70af187a
vitest test files 386   ·   tests 4304   ·   migrations 59   ·   docs/adr 11
docVersion      rev 161 · 2026-07-29
production      dpl_4NDvuBxn8z2x411GSpsNY1UBLQQJ · READY · target=production · ref=master
```

Zero branches in flight. Zero pending migrations. GOLDEN FREEZE engaged (lifts at B5).

**Merge ladder, S69 (author timestamps, UTC):**

| time | commit | phase |
|---|---|---|
| 10:39:12Z | `de0cc0f7` | Merge CATALOG-WRITE-LOCK-1 G4+G5 |
| 14:12:57Z | `d6d7fa7e` | Merge F185-GUARD-1 |
| 15:51:02Z | `56706089` | Merge F209-CHART-AXIS-1 |
| ~18:0xZ | `42e4839b` | Merge F199-EMPTY-LAYER-1 |

Plus one governed data operation through the gated admin UI: the learned-map clear
(25 rows → 2), epoch 11 → 12.

---

## §1 · LIVE GOVERNED STATE (re-derive from here — NEVER from memory)

Read by the Operator on 2026-07-29 unless noted.

```
router.frameRouting = 0        (DARK — see §6 for what this makes latent)
router.frameEnabled = 1        router.enabled = 1
router.learnEnabled = 0        (BRAKED — F185-BRAKE)
router.contextTurns = 2

tool_category_cache = 2 rows, BOTH pinned:
    kb7   -> ["factory"]  pinned  updated_at 2026-07-11 19:08:28.377Z
    scrap -> ["metrics"]  pinned  updated_at 2026-07-13 11:07:24.931Z
  max(updated_at) = 2026-07-13 11:07:24.931Z   (the 07-28 stamp belonged to a deleted row)
  routing_cache_meta: epoch 12, cleared_at 2026-07-29 14:46:52.593Z
  routing_audit id=6: action=clear, before={"deletedCount":23}, epoch_after=12
  routing_audit id=5: action=clear, before={"deletedCount":164}, 2026-07-26 — the growth-rate datum

router_proposals = 20 total / 19 pending / 1 accepted / 0 rejected  — UNTOUCHED by the clear
  kb7 -> machine still pending (count 3). The curated pinned row is kb7 -> factory.
  Queue contains two numeric record identifiers: 110101000028, 210200100113 (the F177 class).

armes.tool_category = 12 published / 108 slots / 97 distinct / ZERO write tools
armes.tool_annotation = 141 (44 write, in no category, by ADR-011)
superset.gateway_tool_policy = 3 · backend_tools = 171
gateway: inner=22 data=11 foreign=11 unclassified=0 overrides=3 writeReachable=1

entity_registry: factory 17 active · line 779 active · EQUIPMENT ABSENT ENTIRELY (zero rows)
  status='missing' returns zero rows for every layer — never-discovered, not discovered-then-lost.

backend_entity_layers = 3 rows, ALL enabled=true. THERE IS NO `present` COLUMN.
    equipment  EQUIPMENT  getEntities      parent=factory param=factoryId cadence=slow
    factory    FACTORY    getFactoryList   -              -              cadence=sync
    line       LINE       getFactoryLines  parent=factory param=factoryId cadence=sync

learnable corpus, read from the production log 2026-07-29:
    [LearnCorpus] corpus loaded: 167 tools, 796 entities
  167 = 141 ARMES + 26 Superset. 796 = 17 + 779.

synthetic.mode = frame-only (calls ZERO tools — any criterion that forgets this is a vacuum)
```

**Recorded IR frame distribution, 2026-07-20 → 2026-07-29, 129 frame-bearing telemetry rows:**

```
FACTORY 35 · LINE 26 · DOWNTIME 15 · EQUIPMENT 12 · EMPLOYEE 12 · SYSTEM 10
MATERIAL 9 · TRANSFER 3 · ORDER 3 · QUALITY 3 · VEHICLE 1
```

These are **observe-only extractions**. `router.frameRouting = 0`, so none of them reached the
clarification gate. See §6.

---

## §2 · WHAT S69 SHIPPED

### CATALOG-WRITE-LOCK-1 G4+G5 (`de0cc0f7`)

Additive, multi-membership, reads-only re-file: nine production-filed READ tools were ADDED to the
category their name serves (linestop 3, quality 2, machine 2, material 2). Nothing removed. Slots
99 → 108, distinct stable at 97, `production` unchanged at 23. The ADR-011 self-check ran BEFORE any
I/O and would have HALTED on a write-exposed candidate.

G5 re-ran ROUTE-SHADOW on the PINNED corpus (`--until 2026-07-29T03:14:13.179013Z`, 95 turns, N=52).
**M1 = 5/52 before and 5/52 after.** Depth fell (lost tool instances 12 → 10) but every touched turn
still lost a second tool the re-file could not reach: on QUERY_EVENTS×DOWNTIME,
`getLineStopsReportForZones` is now offered because it lives in `linestop` which that cell derives,
while `getScrapSummaryForZones` is still dropped because it now lives in `quality`, which that cell
does not derive. **Catalog repair and derivation repair are separate repairs.** M4: arm B 27.5 → 28.0,
arm A 33.7 → 33.9, p95 of |B|−|A| +18 → +17.

### F185-GUARD-1 (`d6d7fa7e`) — the learn guard inverts

**Measured cause.** Against the 23 contaminated unpinned keys the live cache then held:

| source | caught |
|---|---|
| `ROUTING_STOPWORDS` as it stood | **0** |
| the stopword list IF BOTH SIDES WERE FOLDED | 1 (`dün`) |
| `resolve_time_range` | 1 (`dün`) |
| `entity_registry` | 2 (`glazur3` exact, `granit` contained) |
| `GENERIC_/ZONE_LINE_SUFFIX_WORDS` | 1 (`hattının`) |
| **UNION OF ALL** | **4 of 23** |

Three mechanisms. **Encoding:** `extractKeywords` lowercases and never Turkish-folds, while the
stopword list's three observed-leak top-ups (F144 · ROUTE-HYGIENE-1 · F145) were written ASCII-folded
(`dun`, `bugun`, `yarin`, `icin`, `hakkinda`) — `dün !== dun` under an exact `Set.has()`, so all three
patches were structurally unable to fire. `shared/metricVocab.ts:33-35` had already recorded this in a
comment and routed around it by excluding `iskarta`. **Inflection:** the list holds stems, tokens arrive
suffixed. **Source, the real one:** both exclusion sources answer a WHOLE-SURFACE question
(`parseTurkishRelativeTime` is a switch over phrases; `normalizeEntitySurface` strips words from a
multi-word surface) while the learn path feeds SINGLE TOKENS. Phrase-shaped vocabulary cannot classify
token-shaped input.

**The fix.** `isLearnableKeyword` inverts from a deny-list over the world to an allow-list over the
integration. Four deny clauses first, each with its own verdict (function word · generic entity-noun ·
entity · time surface), then admit only if the token appears in the DISCOVERED TOOL CORPUS:
`backend_tools.tool_name` camelCase-split + `backend_tools.description` + `METRIC_ALIASES`. Exact token
equality after fold, never substring.

**v1 STOPPED at its own gate** — 3 of 23 admitted against a pre-registered ceiling of 2. The Author lane
refused to merge and escalated with the provenance of each admit. **The defect was the Architect's A-1:**
its fourth term was the published `tool_category` keywords, the one corpus member that is our own
routing config rather than an observation of the backend. Evidence, computed from the code floor and
the live cache: `çalışan` is authored in `employee` (`toolCategories.ts:235`) and was learned as
`["employee","factory"]`; `tüketim` is authored in `production` (`:159`) and was learned as
`["metrics","factory","employee"]` — **zero overlap with its authored home**. Admitting a word because
it is an authored routing keyword licensed the automatic path to overwrite a curated decision.

Dropping the term costs nothing: authored keywords still MATCH, because routing power comes from the
category config and not from the learned map. With three terms the gate returns **exactly `{oee}`**.

**The floor points at closed and earned it during the build:** corpus unreadable → nothing learnable;
corpus read TRUNCATED → refused rather than used (a partial catalog is a partial ADMIT set and a partial
entity list is a partial DENY set). The required parameter caught a real bug: the router-fallback loop
passed the brake but not the corpus, so door 1's defence-in-depth silently refused every write door 2
approved — surfaced as a red test rather than as silent wrong learning.

Four doors, one chokepoint (necessary: the cache holds `hattının` while `router_proposals` holds
`hattinin`). Door 4 blocks by default, names the clause, and takes one spelled override written into the
publish's audit reason. The load path exempts pinned rows.

**F186 CLOSED BY SUBSUMPTION** — no Turkish stemmer. Suffix fragments are rejected for corpus-absence.

### THE CLEAN (governed data op, admin UI)

`Curate → Clear` → `.delete().eq('pinned', false)` through `mutateAndBump`. Pre-registered before the
click and all three held: 25 → **2 mappings**, `learn` counter 25 → **2**, epoch 11 → **12**. Audit row
id=6 records `deletedCount: 23`. `router_proposals` untouched at 20/19. `oee` was deleted too, on purpose:
the guard admits the KEY, not the MAPPING, and `oee`'s learned row said `["metrics","production"]` while
its authored home is `metrics` alone.

**This clean is durable and the previous one was not.** Audit id=5 shows a 2026-07-26 clear of 164 rows;
23 more accumulated by 2026-07-28. Learning is now braked, so the accumulation rate is zero. **The brake,
not the clean, is what makes it stick.**

### F209-CHART-AXIS-1 (`56706089`) — three defects, one not cosmetic

A one-week OEE chart rendered `2026-072026-072026-07…` with no legible date.

- **D1 truncation kept the wrong end.** The formatter yielded a 16-char timestamp; the renderer capped
  it at `slice(0,9)+'…'`. Across a one-week series `2026-07-` is identical on every label, so the cap
  discarded exactly what distinguished the points. The cap is REMOVED, not tuned; `formatChartTick` now
  DERIVES which leading components are redundant across the whole axis.
- **D2 thinning counted instead of measuring.** `ceil(count/12)` always drew ~12 labels: 580px of plot
  ÷ 12 = 48px per label for text needing ~60px. Now computed from width with named constants; the first
  and last categories are always drawn and a zero-label axis is unreachable.
- **D3 the timezone was asymmetric, and NOT cosmetic.** `formatEpochMsLabel` used `toISOString()` (UTC)
  while its siblings used `CHART_TIMEZONE`. The same instant carried a different label depending on how
  many calendar days the series spanned — a silent 3-hour shift. `1784958600000` now reads `09:00` on
  the single-day branch and `22 09:00` on the multi-day one; before this phase the multi-day branch said
  `06:00`. The file's own docblock claims "presentation only … can never alter a value"; a mislabelled
  timestamp does alter what a value means.

Evidence is MEASURED, not screenshotted: no e2e seam covered the chat chart, so a dev-only preview route
plus a spec reading real `getBoundingClientRect` boxes was built. 8 labels / 40px min gap at 1280, 31px
at 1024, plus 2-point and 500-point series, stable across three runs.

### F199-EMPTY-LAYER-1 (`42e4839b`) — and it landed DARK

The gate could not distinguish "layer declared, enabled, ZERO entities" from "no such layer declared".
Both returned `{candidates: [], knownFactoryNames: [], scope: 'floor=none'}`. Two failure modes: with a
non-empty `entity_ref` the gate asked which entity the user meant and offered nothing (and
`QUESTIONS.entityUnresolved`'s Turkish text names "ekipman" among its examples — inviting the user to
name a thing the system held none of); with an empty `entity_ref` it said NONE and the turn proceeded
into nothing.

The resolver now returns a four-member status: `resolved` · `declared-empty` (carrying the descriptor's
own `layerKey`) · `undeclared` · `unknown`. **The floor is a NAMED VALUE, not a missing argument** — the
improvement on F185-GUARD's shape — and the implementation initialises to `unknown` so every catch and
early exit reports it BY CONSTRUCTION. A failed read can never be published as "I have no inventory".

**Bound found while proving B1:** `IrFrame.object` is a closed enum, so a brand-new object KIND still
needs an IR schema change. What is fully data-driven is the LAYER KEY (`kiln` declared against `ZONE` is
named with zero code change).

**Two places already claimed the behaviour the code lacked** — the table's DDL comment ("the
clarification gate correctly ASKS") and the entity-discovery skip log line ("its inventory stays honestly
empty and the gate ASKS"). Neither was true. Both are now.

**One invariant traded on purpose:** "an empty `entity_ref` never touches the registry" was a
cost-avoidance property and Mode B IS the empty-ref frame. Both suites were rewritten to state the new
truth and the trade rather than deleted, plus a test pinning the bound — while the gate is dark, nothing
is read, so today's cost is zero.

---

## §3 · WHY EQUIPMENT DISCOVERY HAS NEVER RUN (new, measured)

Read from the production log, 2026-07-29 16:01:40Z, on the `backend-health` cron tick:

```
[EntityDiscovery] backend=armes layer=equipment tool=getEntities SKIPPED
reason=required-param-no-default param=showAll — the tool declares this argument REQUIRED
but publishes no machine-readable `default` for it. Guessing a value (e.g. from prose in its
description) would be a hand-authored fact, so this layer is not synced; its inventory stays
honestly empty and the gate ASKS. Mirror left untouched.
```

`resolveRequiredArgs` collects every required param except the parent param; any without a `default` in
the schema returns `blockedBy: <name>` and no call is made. `getEntities` requires `showAll` and
publishes no default, so the call is never constructed.

**This is a deliberate refusal, not a bug** — ADR-009 (topology is discovered) and ADR-010 (a
declaration is a claim). The value genuinely must be hand-authored because the backend does not publish
it; the question is only WHERE. Runtime guessing from prose is forbidden; a governed, audited descriptor
row is not. That row is DISCOVERY-EXTEND-2 (`static_args jsonb`).

Same tick, healthy: factory 17/17 · line 779/779 `emptyContainers=12` · superset 22 inner tools stable ·
`[BackendHealth] tick { checked: 2, up: 2, down: 0 }`.

---

## §4 · REGISTER CORRECTIONS CARRIED IN FROM v69

These are corrections to v69's own text. v69 is not edited (S37-1); the corrected wording lives here.

1. **F199's wording was wrong.** v69 said "`backend_entity_layers` knows the `equipment` layer is
   `present=false`". **There is no `present` column** — verified in the migration and confirmed by the
   Operator's verbatim column dump. Correct wording: *the equipment layer is DECLARED and ENABLED while
   `entity_registry` holds zero rows for it, and the gate could not express the difference between that
   and an undeclared layer.*
2. **DISCOVERY-EXTEND-2's deferral reason is FALSIFIED.** v69 deferred it because "EQUIPMENT never
   enters a frame". EQUIPMENT is the **fourth most common** frame object, 12 of 129 over nine days. The
   new deferral reason is recorded in §5 and is different.
3. **A23 / F175 had no place in the S69 sequence.** It was neither parked nor queued — it simply went
   unnamed when the sequence was locked. That is a bookkeeping failure against S63-2. Its placement is
   carried in §7 as an explicit OPEN QUESTION to be resolved by reading A23 §9's own build order, not by
   guessing.
4. **Nothing behind `router.frameRouting` was marked latent.** See §6.

---

## §5 · THE SEQUENCE (dependency-ordered)

1. **UI ROUND — F218 + F210 + F212** (next)
2. **F177**
3. **F206**
4. **F214**
5. **B3 Memory** (MEMORY-1 · F48 · F83+F83.1 · then F166 on the VIZ-BIND lane)
6. **B4 Kale-RAG**
7. **B5 cleanup + 🧊 GOLDEN FREEZE LIFTS**
8. **B6 docs + architecture** → 9. **B7 release close**
10. **Adjacent program** (Qdrant · bge-m3 · OPA) — trigger-gated, may never fire

---

## §6 · WHAT IS LATENT BEHIND A DARK FLAG (new section — v69 had none)

`stageClarify.ts` opens `computeTurnClarification` with:

```
if (!ctx.frameRoutingEnabled || !frame) return null;
```

`router.frameRouting = 0`. **The entire clarification gate is unreachable in production.** Anything
downstream of that early return is latent code, however correct.

Latent today: **F199** (shipped, dark) · the A23 ⑤/⑥ separation · the scope question-gate · anything
else that hangs off `computeTurnClarification`.

**Any future item must state, in its own brief, whether it is reachable.** The S69 Architect wrote a
brief asserting live user pain from a path that does not execute; the docblock said so three lines
above the code that was read. This section exists so that is a lookup, not a memory.

`router.frameRouting` stays DARK. The S68 pre-registered rule stands unamended (M1 = 0 over N ≥ 30 →
GO; M1 is 5/52). It is bound to the A23 evaluation and reopenable ONLY there, where the question is not
"does the frame route better" but "what is the frame for". Mechanism (B) — widening the FIRE→quality
augmentation to QUERY_EVENTS — is bound to the same evaluation and will not run standalone.

---

## §7 · OPEN ITEMS — FULL WORDING (S63-2)

### QUEUED

**F218 · The Accept button is enabled and does nothing, silently.**
`RoutingTab.tsx:880` computes the disabled state as
`!(acceptCategory[p.keyword] ?? p.suggested_category)` — with the fallback. The handler at `:409` reads
`const category = acceptCategory[keyword]; if (!category) return;` — WITHOUT the fallback. A user who
never touches the dropdown sees a live button that sends no request, shows no toast, and changes
nothing. Observed in production 2026-07-29 on the `kb7 → machine` row; the runtime log for that window
carries exactly one `GET /api/admin/router-proposals` and no POST. The handler's error path is written
correctly (`toast.success` / a 422 message) — it is simply never reached. **Reject is NOT affected**, so
this blocks accepting a proposal, not disposing of the queue.

**F210 · The provenance strip writes the same list twice.**

**F212 · The Curate surface needs reframing now that the guard has landed.** `router_proposals` can no
longer grow (learning is braked AND guarded) and its 19 pending rows are contaminated. The surface must
move from "review what the machine learned" to "author the outage floor". Whether the 19 rows are
disposed of or processed is the decision this item carries — it is NOT settled.

**F177 · The numeric record-identifier class.** 110 of 164 blocking frames (67%) — the largest measured
block cause. Examples in the live queue: `110101000028`, `210200100113`. The diagnosis fork —
resolver-layer or IR-layer — has NOT been run.

**F206 · Local tools are not written to the durable ledger.** 205 raw tool results against 168 rows, a
gap of exactly 37. Behavioural consequence: a turn that calls only local tools is counted as an empty
answer and RE-RUN.

**F214 · The code floor and the live catalog have diverged.** 42 tools present in the floor and absent
live; 20 present live and absent from the floor. The floor is what SERVES during a DB outage, so
routing changes materially under outage today. This violates F185's own law that the floor is today's
state, never a new one. Passes S69-1 test (a) and could not be parked.

### PARKED under S69-1 (recorded, not queued)

**M-C** (provider comparison — the decision it served is made) · **SYNTH-TRAFFIC-2 / F204** (no lane
can produce a full-tool production turn; M-C's hard precondition) · **F196** (`rule26` CI noise, now
LOCALISED to `rule26-admin.spec.ts` and reproduced on an untouched anchor — the failing set changes
every run and the anchor fails at least as much as any branch; the binding posture stands: a green does
not clear a merge and a red does not block one, and every merge is justified without reference to the
gate's output) · **F202** (`unknown_tool` rejection makes our mirror define Superset's usable surface) ·
**F208** (`check:doc-drift` detects from the worktree but names culprits from committed history) ·
**F211** (31 of 95 frame turns have no `turn_done`; unusable as a denominator) · **F216** (a preview
build cannot express "deliberately incomplete" — a correct, instructed STOP is reported as a build
failure indistinguishable from a real breakage) · **F219** (`ChatPreview` ships its dev fixtures into
the production bundle — "Glaze A", "Press B", "Downtime events" are greppable in `dist/`; today's
contents are harmless invented strings, recorded because the surface could later carry something that
matters).

**F198** (unbounded reads; PostgREST truncates silently at 1000) — **hard precondition for ANY equipment
discovery.**

**DISCOVERY-EXTEND-2** (`static_args jsonb` on the descriptor, to carry `showAll` for `getEntities`).
**New deferral reason, replacing the falsified one:** F199 turns the failure from invisible into
counted. The `[Clarify] layerStatus=declared-empty` line is born loud and logs on every frame-bearing
turn. **That counter decides this item** — but the counter cannot start until `router.frameRouting`
goes to 1, which is bound to A23. Until then this item is blocked on that flip, not on evidence about
frequency. It also drags F198.

**F184** (behavioural qualifiers in `armes.zone`) · **B5 `factory_registry` drop** · **M-B** ·
**F178** (completeness guard enforces fill-ness, not arrival — the failure class is unbounded delay) ·
**F179** (synthetic injector has no `forceFlush` call at all) · **F180** (LB-11 tool-output injection
hardening unverified) · **F165** (unbounded "list everything") · **D5** · **F189** (no JSON schema on
gateway inner tools) · **F191** (`stageClarify` armes-literal read, latent) · **F153** (Superset
`0.0.0.0` URLs — Kale/ARDIC ops) · **F203** (`maymun207@gmail.com` has no `auth.users` row) ·
**F207** (Superset usage is ~zero: in every observed production turn, including one asking for a chart,
the model went to ARMES and never entered the gateway — zero `call_tool`, zero `search_tools`, with all
four entry tools offered) · **F197's riders**.

**F-CONTEXTTURNS · F-LEARNENABLED-PROVENANCE** — deliberately not cleaned; append-only ledger honesty.

### CLOSED IN S69

**F217 · CLOSED.** The concern was that a door-4 refusal could not distinguish "corpus loaded, key
absent" from "corpus null". It can: `[LearnCorpus] corpus loaded: 167 tools, 796 entities` is logged on
the router-proposals GET, so corpus health is directly readable. Closed on production evidence the same
day it was raised.

**F186 · CLOSED BY SUBSUMPTION** in F185-GUARD-1.

---

## §8 · LAWS MINTED IN S69

- **S69-1 · THE BLOCK-CUTTING RULE.** A finding cuts the release line ONLY if (a) it can corrupt data or
  governed state, (b) it sits on a path the user takes today, or (c) it is a hard precondition of a
  block. Everything else is recorded and waits for B5/B6. **Being interesting is not enough.** *Owner-
  ratified. It bit four times on its first day: it parked M-C, SYNTH-TRAFFIC-2, F196, F202, F208, F211,
  F216 and F219 — and it REFUSED to park F214.*
- **S69-2 · A CORPUS THAT LICENSES A LEARNER MAY NOT CONTAIN THE SURFACE THE LEARNER WRITES INTO.**
  Otherwise the guard licenses exactly the mutation it exists to bound.
- **S69-3 · IF A CONTROL'S ENABLED-CONDITION AND ITS ACTION-CONDITION ARE WRITTEN SEPARATELY THEY WILL
  DRIFT, AND THE DRIFT IS SILENT.** Both must derive from one expression.
- **S69-4 · A PRE-REGISTERED VALUE IS COMPUTED OVER THE POPULATION THAT WILL EXIST AFTER THE OPERATION,
  NOT THE ONE BEFORE IT.**
- **S69-5 · A PRE-REGISTERED CONDITION MUST BE SATISFIABLE BY EVERY CASE IT IS MANDATED OVER.**
  Otherwise the run must either relax it (contaminating the criterion) or go red on arithmetic rather
  than on behaviour.
- **S69-6 · A COMPONENT'S INTERNALS DO NOT TELL YOU WHETHER IT EXECUTES.** Reachability is established
  before behaviour is described. (Distinct from S65-1, which is about reading live governed state; this
  is about call-path reachability. Same family as F194 and F207.)

---

## §9 · ARCHITECT PREMISE ERRORS IN S69 — five

1. **Relay error (S54-3, an EXISTING law).** Sent a short note referencing `X3`/`X5` without sending the
   block that defines those labels. AG correctly invoked S61-3 and refused to build.
2. **S69-4.** Pre-registered `max_updated_at` computed over the pre-delete population.
3. **S69-5.** "At least 4 labels" mandated alongside a 2-point case — arithmetically impossible.
4. **S69-6 (the costly one).** Described live user pain in the F199 brief without checking that
   `computeTurnClarification` executes. It does not; `frameRouting = 0`.
5. Told the owner to look for a "Temizle" button; the panel says **`Clear`**.

**All five were caught before shipping** — three by AG, one by the Operator, one by the owner.

**Root cause of 1 and 4 is identical: writing a specification from what was in hand instead of checking
what is live.** S65-1 has been in the bootstrap since S65 and was violated anyway, which is the evidence
that a law list read once at session start does not fire at the moment of use.

**The mechanism response — the PREMISE BLOCK.** From S70, every phase prompt opens with a block the
Architect FILLS and the Author VERIFIES and STOPS on. Full text in the bootstrap §7. A rule is
unbreakable only when (a) it is a required field of a produced artifact, (b) that field carries a fact
another lane can independently re-derive, and (c) that lane is obliged to stop when it is absent or
wrong. The tail anchor has never been violated because it satisfies all three; the law list satisfies
none.

<!-- END · cwf-open-items-register-v70 · 2026-07-29 · closes S69 -->
