# CWF — Open Items Register · v69
<!-- cwf-open-items-register-v69 · 2026-07-29 · closes S68. Supersedes v68.
     S63-2: THE REGISTER IS SELF-SUFFICIENT. Every open item carries its full
     wording here. Back-pointers only to terminal-marked items or to live
     working-set documents. Nothing in this file requires reading v68. -->

## 0 · FLOOR AT CLOSE (verified by the Architect from a fresh clone)

```
origin/master   475b041770d000242981494a0056e2605399be82
                378 test files · 59 migrations · docs/adr = 11 · docVersion rev 158
IN FLIGHT       phase/catalog-write-lock-1-g4 = 1b29775a8c51132ac5804f6b5593ac1d90adde0e
                (379 files, rev 159) — PUSHED, NOT MERGED. Merge message issued
                verbatim; AG's next action is the --no-ff merge and hash report.
deploy          dpl_6ZztgvjEgtpgf6XXzDfVXSVKsMyU · READY · production · SHA 475b0417
```

**Merge chain of S68**, each verified independently at a fresh clone:

| Commit | What | Parents |
|---|---|---|
| `0d540c9d` | S68 opening anchor (rev 150, 362 files) | — |
| `7f4919b4` | Merge **F187-GATEWAY-SURFACE-1 (+FIX-1)** | `0d540c9` + `21622e6f` |
| `074c85e1` | Merge **F185-BRAKE-1** | `7f4919b4` + `d9d549d7` |
| `f9788533` | attribution correction (three cache mechanisms) | — |
| `c5cb8857` | Merge **F185-BRAKE-1-SEAM** | `f978853` + `7972207` |
| `193b0453` | F185-BRAKE-1 S63-1 evidence closure | — |
| `a728ec84` | Merge **ROUTE-SHADOW-1** | `193b045` + `f104161` |
| `1cf0f63e` | Merge **ROUTE-SHADOW-1 FIX-1** | `a728ec8` + `cd1feaf` |
| `475b0417` | Merge **CATALOG-WRITE-LOCK-1** | `1cf0f63` + `c7f23af` |

---

## 1 · LIVE GOVERNED STATE (re-derive from here, not from memory)

```
router.enabled          = 1        router.frameEnabled  = 1
router.frameRouting     = 0        ← DARK. Owner decision 2026-07-29, see §2.
router.learnEnabled     = 0        ← v1 published 2026-07-29T03:03:17Z
router.contextTurns     = 2        (v2 — see F-CONTEXTTURNS below)
router.maxCategories    = 4        router.timeoutMs = 1500

tool_category_cache     = 25 rows (2 pinned, 23 unpinned)
                          max(updated_at) = 2026-07-28T21:12:35Z — FROZEN
armes.tool_category     = 12 published · 108 slots · 97 distinct · ZERO write tools
                          linestop 6 · quality 9 · machine 21 · material 19 · production 23
armes.tool_annotation   = 141 published (44 write · 97 read)
                          all 44 write tools are in NO category, by law (ADR-011)
superset.gateway_tool_policy = 3 published (execute_sql=data,
                          get_chart_preview / get_chart_type_schema = foreign_surface)
backend_tools           = 171 rows · superset 26 (22 inner + 4 entry)
gateway runtime         inner=22 data=11 foreign=11 unclassified=0 overrides=3
                          writeReachable=1
entity_registry         17 factory + 779 line active · equipment 0/0 present=false
backend_entity_layers   3 rows · factory_registry 17/17 (drops at B5)
synthetic.activeSetId   33cd8365-3c8d-4602-9158-5e5e29cc1b46 (v3, 9 utterances,
                          mode = frame-only — records frames, calls ZERO tools)
```

**Carried unchanged from v68 — the v3 baseline.** `shortCircuitRate` = **33.27 %**
(n=493, ALT_D=0, `unstableOutcomes:0`). The set is class-A-only, therefore
structurally immune to the unmasking that inflates gapfill, and
`shortCircuitRate ≡ highRate`. **It measures the GATE only and is not a proxy for
end-to-end success.** The three pre-registered known-failing utterances did not
block; the three that blocked were not pre-registered — zero overlap, because the
two measure different stages. **The largest measured block cause in real operator
questions is the numeric record identifier: 110 of 164 blocking frames (67 %) —
`10100000` personnel numbers and `1596497` work orders.**

---

## 2 · THE OWNER DECISION OF S68 — frameRouting stays dark

**`router.frameRouting` remains 0. This is not "closed forever"; it is bound to
the A23 evaluation and may only be re-opened there.**

The evidence, in full, so nobody re-litigates it from memory:

ROUTE-SHADOW measured a paired A/B over recorded turns, evaluating both arms
against today's governed state. Population: **95 `ir_frame` turns**,
`2026-07-20T10:42:01Z .. 2026-07-29T03:14:13Z`, **100 % organic, single user**
`f4805bd1-370c-4fe8-9d38-b014fc836b4b`. Synthetic traffic contributed nothing —
the injector writes `synthetic_runs` (4500 rows), never `telemetry_events`.

| Population | Under the flip | Count |
|---|---|---|
| P1 no frame | tier untouched | ~18 (broken denominator, see F211) |
| P2 frame, cell unmapped | tier untouched | 1 |
| **P3 frame HIGH + mapped** | **candidate set REPLACED** | **91 (52 with non-local tool calls)** |
| P4 frame AMBIGUOUS + mapped | set UNIONED, broadening only | 3 (1 with tools) |

**M1 (headline, pre-registered) = 5/52 — before AND after the catalog repair.**
Depth improved (12 lost tool instances → 10) but no turn was rescued.
**M2**: Arm B 90.4 %, Arm A 86.5 % — **Arm A is a REFERENCE, NOT A BASELINE**;
the record only shows tools that were offered, so recall flatters whichever arm
offered more. **M4**: median Δ 0, p95 +18 → +17; mean offer A 33.7→33.9, B
27.5→28.0. **M5** (ALWAYS_INCLUDE invariant) clean on all 95.

**Pre-registered rule: M1 = 0 over N ≥ 30 → GO. M1 = 5/52 → NO-GO.** The rule was
written before the population was counted and was not adjusted afterwards.

**The five losses decompose into two mechanisms:**
- **(B) the FIRE augmentation's gate is too narrow** — it fires only on
  `action === 'QUERY_METRIC' ∧ object ∈ {LINE, ZONE}`. Losses **1 and 3** are
  `QUERY_EVENTS×DOWNTIME` with `metrics:["fire"]` needing the `quality` category.
  Cheap to widen.
- **(C) genuine frame insufficiency** — losses **2, 4** (`QUERY_METRIC×LINE`,
  `metrics:[]`, derives only `[metrics]`), **5** (`QUERY_STATUS×FACTORY`, a
  four-concept question), **6/P4** (`QUERY_STATUS×VEHICLE`, needs `material`).
  Closing these means touching the IR schema and re-opening K1.

**The owner's reasoning for stopping:** the flip's measured benefit is a ~6-tool
narrowing of the offered set (33.9 → 28.0). Re-opening K1 to buy that is
disproportionate. **The frame already produces its value in the understanding
layer (A23 ⑤/⑥, entity resolution, clarification); it does not have to earn it
as a routing replacement.**

**CANCELLED by this decision:** the read requested of AG on (B)'s side effects.
Do not run it. (B) is now bound to the A23 re-evaluation, not to a standalone fix.

**What re-opening requires:** the A23 evaluation, where the question is not *"does
the frame route better"* but *"what is the frame for."* Nothing else re-opens it.

---

## 3 · WHAT SHIPPED IN S68

**F187 · Superset gateway surface — MERGED, LIVE, PROVEN (proof 1).**
Superset's MCP is a gateway: 4 entry tools offered, **22 inner tools never
offered** — the model discovers them via `search_tools` and invokes them as a
string inside `call_tool`, so no `tool_annotation`, `tool_category` or exposure
rule can reach them. Disposition is **derived from the backend's own tags**
(`tags ∩ {mutate, explore} ≠ ∅ → foreign_surface`) with governed rows only where
the declaration is silent or orthogonal. Derivation proven by diff: 22 rows
compared live, exactly 3 disagreements, exactly the sanctioned three. Fail-closed
policy composed beside F155 (which stayed byte-identical, because a fail-open net
and a fail-closed gate must not share a module). Model-facing `search_tools` copy
filtered; **the trace and the client stream keep the raw result**. `execute_sql`
contained by a deterministic read-only statement check — AG shipped a guard
beyond spec because `WITH x AS (SELECT 1) DELETE FROM t` opens with `WITH` and is
a single statement; the Architect's four rules had a real hole.
**Live proof, read by the Architect from production logs, four consecutive turns:**
`[GatewayPolicy] backend=superset inner=22 data=11 foreign=11 unclassified=0
overrides=3 writeReachable=1`.

**F185-BRAKE-1 (+SEAM) · the learning brake — MERGED, LIVE, PROVEN.**
`router.learnEnabled`, floored at 1 so the merge changed nothing, three machine
write sites gated (the `learnToolMapping` chokepoint plus two loop gates), a
distinct `skipped_brake` verdict rather than borrowing `skipped_short`. The
human curation path is deliberately NOT gated — a deliberate audited act is a
different authority from automatic learning.
**Live proof, Architect's own log read**, trace `443db441` @ 2026-07-29T03:14:02Z:
`[ToolFilter] learn braked=8 path=stagetools` · `[ToolCache] Loaded 25 cached
mappings` · `matched=[quality, production]` — two categories, so the F145 broad
guard did NOT fire; eight keys earned learning and none were written. AG's
independent read at 03:37:08Z: 25 rows, **and `max(updated_at)` still
2026-07-28T21:12:35Z** — the column that a silent in-place overwrite would have
moved. Count and timestamp together exclude both kinds of write.

**ROUTE-SHADOW-1 (+FIX-1) · the lens — MERGED.** See §2 for its output. FIX-1
made the lost tool's **owning category** a required field on every loss line —
the single absent column that let a mis-filed catalog read as a story about
compound sentences.

**CATALOG-WRITE-LOCK-1 · ADR-011 — MERGED.** See F213 below.

**CATALOG-WRITE-LOCK-1 G4+G5 — IN FLIGHT** (`1b29775a`). Nine read tools joined a
second category, additively; slots 99 → 108, distinct stable at 97, nothing
removed from `production`. M1 unchanged (§2).

---

## 4 · OPEN ITEMS — full wording, no back-pointers

**F202 · OPEN (medium).** `unknown_tool` denial makes the inner mirror's
completeness a *reachability* property. That mirror is built by a heuristic
18-query `search_tools` sweep whose own comment concedes a new tool is reachable
only *"as long as its description mentions one of these domain terms."* A
genuinely existing inner tool the sweep missed is now **both filtered from the
model's view and denied at the gate** — consistent and fail-closed, but it means
**our mirror silently defines Superset's usable surface**. Compounds with F189.

**F203 · OPEN (operational).** `maymun207@gmail.com` has no `auth.users` row and
governed publish scripts correctly refuse it. Valid actors are the
`@ardictech.com` accounts (verified: `tunc.kahveci@ardictech.com`). Anyone running
a gated publish must know this.

**F204 · OPEN (BLOCKING M-C).** **No lane can produce a full-tool production
turn.** The synthetic injector is `mode='frame-only'` and
`extractSyntheticFrame.ts:14` states it *deliberately does not call
`filterToolsByMessage`* — it records frames and calls **zero tools**. AG has no
user JWT and must not mint one (that would attribute a turn to a human who did
not send it; S33-1 forbids machine impersonation). Consequence: every done-proof
that needs a tool-bearing turn requires one human message, **and M-C cannot run at
all**, because M-C compares providers on tool selection. **SYNTH-TRAFFIC-2 is a
hard precondition of M-C**, not a deferred nicety.

**F206 · OPEN, QUANTIFIED.** The durable ledger does not see local tools.
`ctx.toolCallCount++` and the `type='tool_call'` emission happen at exactly one
site — `stageTools.ts`, inside the **MCP** branch. `resolve_time_range`,
`aggregate_records` and `query_records` execute, return data to the model, land
in `messages.raw_tool_results`, and appear in **neither** `tool_call_count` nor
`telemetry_events`. **Measured by ROUTE-SHADOW: 205 raw tool results vs 168
ledger rows, difference exactly 37, every one `resolve_time_range`.** Also
visible in the UI: the chat header reads `CWF (2 queries)` while the drawer reads
`Ham tool çıktısı (3)` — two counters on one screen disagreeing by exactly the
local tool. **Behavioural consequence, not just reporting:** `isEmptyCompletion`,
`decideRetry` and `isSilentFinish` all read `toolCallCount`
(`stageStream.ts:144/208/291`), so a turn that called only local tools and
produced no text is classified as an empty completion and retried.

**F207 · OPEN (strategic).** **Superset's real utilization appears to be ~zero.**
Across every observed production turn — including an explicit *"show me a
chart"* — the model went to ARMES data tools and **never entered the gateway**:
zero `call_tool`, zero `search_tools`, with all 4 gateway entry tools offered.
F187's denial machinery has therefore never been exercised in production. **This
reframes F187 honestly: its value is insurance, not savings.** The 05:02Z
collapse (15 rounds / 306 388 input tokens) may be a rare route rather than the
norm, and what makes a turn choose Superset is unmeasured.

**F208 · OPEN (tooling).** `check:doc-drift` **detects from the working tree but
names culprits from committed history** — it blamed a file the phase never
touched, belonging to a previous merge. Same family as F190 and S67-1: a gate
must read ONE reality, and where it cannot, its report must not sound like it
did. **Do not conflate with the reseal-on-comment behaviour**: a comment-only
change in a mapped file legitimately moves `mappedContentSha`; that is the gate
working correctly, not this defect.

**F209 · OPEN (UI, RULE-26 class).** The rendered chart's X axis is unreadable:
labels collide as `2026-072026-072026-07…` and **not a single date is legible**
on a one-week time series. Observed 2026-07-29 in the CWF panel on the KB7
Glazur3 OEE chart.

**F210 · OPEN (UI, cosmetic).** The provenance strip renders the same tool list
twice with two labels — `Kanıt: … · Evidence: …`.

**F211 · OPEN (ledger completeness).** **31 of 95 frame-bearing turns have no
`turn_done` row.** `turn_done` carries the config fingerprint and the resolved
params — it is the row any future measurement would join on. Derived counts:
frame-turns 95, in-era `turn_done` 82, both 64, frame-without-`turn_done` 31,
`turn_done`-without-frame 18, union 113. **`turn_done` is not a complete turn
count and must not be used as a denominator.** Sibling of F206.

**F212 · OPEN (partly deferred by §2).** The admin panel narrates routing:
`PanelPrimer`'s lifecycle line and the stage-`03` card describe the
semantic-router → keyword-floor ladder and disclose the frame as in shadow. With
the flip closed, **that narrative is currently TRUE and must not be edited** —
this item reactivates only if the A23 evaluation re-opens the flip. What remains
live regardless: the `router_proposals` inbox surface retires with the F185
guard (the queue can no longer grow, and its contents are contaminated), and the
Curate surface is reframed from *"review what the machine learned"* to
*"author the outage floor."* `src/components/admin/**` is in **no** drift tab's
`codeAreas`, so UI work contributes zero reseal.

**F214 · OPEN (narrowed).** Code floor and live catalog diverge. **42 tools are in
the floor but not live; 20 are live but not in the floor** (net −22 — the
subtraction 119−97 is a net, not a set difference, and the direction matters).
G2a removed the 35 write tools from the floor, closing most of it. Of the
remaining floor-not-live reads, **7 have a documented cause already in the
ledger** — `getAndonVariantList`, `getCameraPerformanceAndon`, `getGuestToken`,
`getInformationAndon`, `getLastHourAndon`, `getMachineNotifications`,
`getTokenInformation` were removed as **phantoms absent from the live catalog**,
a separate and reasoned event. The rest is unexplained. **An outage still changes
routing materially, which violates F185's law that the floor is today's state.**

**F177 · OPEN (largest measured block cause).** 110 of 164 blocking frames (67 %)
are numeric record identifiers — `10100000` personnel numbers, `1596497` work
orders. Diagnosis fork not yet run: is this a *resolver* problem (the number
enters `entity_ref` and cannot resolve — a record identifier is a filter
argument, not an entity) or an *IR* problem (the frame is mis-shaped upstream)?
**The `router_proposals` review queue must NOT be worked until the F185 exclusion
guard lands** — the standing queue offers `kb7 → machine` against the curated
`kb7 → factory`.

**F185 half (a) · OPEN — the exclusion guard.** Entity names and time words must
stop being learned as domain signal. Exclusion sources now exist:
`entity_registry` (17 factory + 779 line) for entities, the deterministic
`resolve_time_range` for time words; function words stay in code. **Three write
points, not two** — the third is curation accept. **Justified by measurement, not
speculation:** one production turn attempted seven keys — `kb7` (pinned, write
suppressed), `glazur3` (an entity), `hattının` and `sini` (Turkish suffix
fragments), `haftalık` (a time word), `grafikle` (a rendering verb), `oee` (the
only defensible one). A second turn attempted eight. **F186** (Turkish suffix
fragments) compounds here and is not separate work.

**F196 · OPEN.** `rule26` CI is ~50 % noise on master — 4 of the 8 master runs
preceding `0d540c9` concluded `failure` on already-merged code. Binding posture
until fixed (S67-2): a green does not clear a merge and a red does not block one
on its own; every merge is justified by an independent argument that makes no
reference to the gate's output.

**F199 · OPEN.** `backend_entity_layers` knows the `equipment` layer is
`present=false`, and the gate never reads that descriptor. The system cannot say
*"I have no equipment inventory"* — it passes the turn and fails opaquely
downstream. **An `empty ≠ zero` violation at the gate boundary, in a codebase
whose first law is `empty ≠ zero`.**

**F189 · OPEN.** Superset's 22 inner tools carry no real JSON Schema; all 4 entry
tools do. The loss is exactly at the gateway boundary, `catalogSync.ts:125`.
Denying 11 of 22 removed the dominant cost, which **lowers** this item's priority.

**F191 · OPEN (latent).** `stageClarify.ts:315` resolves categories through an
armes-literal read. Not active; do not fix opportunistically.

**F153 · OPEN (external).** Superset returns `http://0.0.0.0:8080/...` base URLs.
Kale/ARDIC ops. F187's design removed our dependence on those URLs; it did not
fix them.

**D5 chart-binding under gateway flattening · OPEN (unobserved).** A chart bound
to ARMES tool results **is proven working** — 144 OEE points rendered in the CWF
panel on 2026-07-29. But the gateway flattens every inner tool to `call_tool`, so
a gateway-sourced result carries `toolName='call_tool'`, and the binder's
`{tool, callId, match}` resolution under flattening **has still never been
observed**. Blocked behind F207 (nothing enters the gateway).

**F-CONTEXTTURNS · RECORDED, NOT CLEANED.** `router.contextTurns` v1 was archived
and v2 published with an identical value (2) and the reason string
`positive-control-must-not-write` — a positive control run against the live
database. Functional effect zero. **It is deliberately not cleaned:** an
append-only ledger earns its worth by recording faithfully, mistakes included,
and a third write to tidy a second is worse than one honest ugly row.

**F-LEARNENABLED-PROVENANCE · RECORDED.** `router.learnEnabled`'s governed record
begins at **0**, which wrongly implies learning was never on. It ran from the
code floor at **1** from inception until 2026-07-29T03:03:17Z; three pre-flip
resolver reads (probe, plan mode, the publish's own BEFORE line) all read ABSENT
→ floor → `true`. The archived v1=1 row was never born because self-seed stayed
latent locally (`SELF_SEED_ACTOR_EMAIL` unset in the author's environment; it is
set in production). **It was deliberately NOT synthesised** — publishing 1 then 0
would have manufactured the shape of evidence while reopening learning for
minutes.

**`allowWrite` full retirement · NAMED DEFERRAL.** The field survives because
`stageClarify.ts:317` reads it for the ALT-D decision. Under ADR-011 no category
can carry `true`, so **COMMAND frames now fall to ALT-D unconditionally** — no
behaviour change (all 11 `allowWrite:true` rows were already archived) but the
condition is now structural rather than data-dependent. Retiring the field from
schema, kind declaration and panel badge is separate work.

**Carried from v68, unchanged:** **DISCOVERY-EXTEND-2** (`static_args jsonb` for
the equipment layer — deferred; EQUIPMENT never enters a frame, idx7 yields
`object: QUALITY`, the bottleneck is above the registry) · **F184** (behavioural
qualifiers in `armes.zone`, e.g. `scrapVisible:false` — deferred, not deleted;
4 rows, DO NOT TOUCH) · **B5** (`factory_registry` drop) · **F198** (unbounded
reads — `EntityRegistryRepository:163`, `BackendToolsRepository:90/158`; must
land **before** any equipment discovery, and it is the read that Path B's
1000-tool target would silently truncate) · **F197's four riders** · **M-B** ·
**F178** (the completeness guard enforces fill-ness, not arrival — the failure
class is unbounded delay) · **F179** (the synthetic injector has no `forceFlush`
call at all) · **F180** (LB-11 tool-output injection hardening unverified at
rev 142) · **F165** (unbounded "list everything") · **F166** (cross-turn viz
binding, VIZ-BIND lane, after B3) · **F171-B** (unify the two language policies,
B5).

---

## 5 · CLOSED IN S68 — do not re-raise

**F200 · CLOSED.** `writeOffered` reported `0` whenever it could not see: on the
gateway surface it structurally cannot count inner tools, and on the
`isAnthropic || routingBypass` full-set branch it was **never assigned at all**
while 141 published annotations were offered. Now reports `unknown`, with
`gatewayWriteReachable` counted separately as *reachable*, never *offered*.

**F201 · CLOSED.** Eleven migration files declared themselves `Operator-pending`
while applied. Corrected by appending, never rewriting.

**F205 · CLOSED — not a defect.** A turn that called zero tools and stopped was
the system being **right**: *"KB7 fabrikasında 'Granit hattı' adında bir hat
bulunmamaktadır. 'Granit' ayrı bir fabrika olarak sistemimizde kayıtlıdır"* — and
it offered the real KB7 lines (Glazur3, Fırın Alt, İkincil Alt). Granit is a
FACTORY; the Architect's test question invented an entity. The frame transcribed
the error faithfully (`object=LINE` because the utterance said *hattı*, all drops
zero) and the answering layer caught the contradiction against real entity data.
**Positive finding worth carrying: A23's ⑤/⑥ discriminator behaviour — a
clarifying question offering real alternatives — already exists partially in
production, ahead of the phase meant to build it. Measure it before rebuilding it.**

**F213 · CLOSED by ADR-011.** 44 of 141 active flat armes tools were in no
category, and the intersection with `exposure='write'` was **exactly 44/44** — a
perfect partition, 97 reads all filed, 44 writes none filed. `rule_audit` shows
they were filed in v1 and removed in a **single eight-second batch** on
2026-07-16 across six categories (35 tools = the entire code-floor write set),
under the generic reason `"publishGovernedContent script"` while other removals
in the same ledger carry real causes. **Deliberate, but undocumented, unnamed and
already reversing.** ADR-011 legislates it: *a filtered turn cannot mutate the
factory*, unconditionally, because the thing choosing a turn's bucket is a
keyword match and an LLM's category judgment — a wrong read costs a call, a wrong
write moves material. Enforced **root-first across four surfaces**: the outage
floor lost its 35 write tools, the seed's `allowWrite`-minting expression
(`referenceData.ts:108`, which derived the flag **from the floor**) was deleted,
the gate became unconditional, and **a test now asserts the floor itself
complies** — the floor is the one surface with no gate in its path.

**F215 · CLOSED by G3.** Four unpublished drafts of 2026-07-19T04:18 put write
tools back (`factory` 1, `material` 1, `production` 2, `transfer` 1). Archived,
with the honest reason that they carried no `allowWrite` and would already have
failed the gate as authored.

**The 2026-07-16 staged JSON · DELIBERATELY NOT READ.** Named in ADR-011 as the
remaining trace. It could not change the decision: an explicit write filter
confirms the policy, an accident confirms it too, because the policy is correct
on its merits.

**Also closed / not to be re-raised:** F174 · K1 §8 · the architecture lock
(A23 v1_3) · CWF-DEMO IS UNRELATED · F179 is not a MEASURE precondition · F182 ·
the ADR-005 ledger precondition · F190 · F194 (`static_args` deferred).

---

## 6 · NEW LAWS FROM S68 (all ten earned by a specific failure)

- **S68-1 · A log's silence does not prove an event's absence.** Seed state is
  read from `seed_state`, never inferred from logs. *(Origin: the Architect
  concluded self-seed had not run from an empty log query; it had run at
  08:40:49Z with `trigger: warm`.)*
- **S68-2 · A prompt may not order a script run whose blast radius the Architect
  has not read.** Naming a script is naming everything it does. *(Origin: the
  Architect ordered `seedRules.ts` with a wrong flag; its step 1 is a blanket
  upsert over the whole `KIND_REGISTRY` that would have overwritten hand-edited
  `field_spec` rows. AG refused, correctly.)*
- **S68-3 · A positive control is run per independent net, not per phase.**
  *(Origin: neutralising the chokepoint left four loop-level RED cases green.)*
- **S68-4 · A control that reports without gating is not a control.** Sibling of
  S66-1: it is not enough that the command can fail; it must **halt the run**.
  *(Origin: a publish script printed that the seed step had not written, and
  continued.)*
- **S68-5 · A positive control may never have production write authority.** Its
  place is a unit test. *(Origin: a control wrote a governed row to live.)*
- **S68-6 · A shared control file must own every pattern it controls for.**
  Otherwise half the zeros are empty rather than measured. *(Origin: six
  source-scanning bans shared a control file owning three patterns.)*
- **S68-7 · A ban's own source can violate that ban.** The purest form of S65-3;
  the only proof is running the tool on itself. *(Origin: the NUL-byte guard
  shipped carrying three NUL bytes.)*
- **S68-8 · A loss metric must name the OWNING BUCKET of the lost item**, not
  only the buckets that were offered — otherwise the report can accuse the
  selector but never the index. *(Origin: the missing column let a mis-filed
  catalog read as a story about compound sentences.)*
- **S68-9 · A control must go red for its own reason, not its neighbour's.**
  Catching a dormant generator requires scanning the **source**, not the output —
  the output is silent while the generator's input is clean. *(Origin: restoring
  a deleted seed conditional kept the test green.)*
- **S68-10 · A loss metric that counts containers hides improvement inside
  them.** Report depth beside the headline. *(Origin: M1 stayed 5/52 while lost
  instances fell 12 → 10.)*

**Force-push:** amending and force-pushing an **unmerged, unshared** branch is
legitimate **if disclosed**. After merge it is forbidden.

---

## 7 · ARCHITECT PREMISE-ERROR PATTERNS — S68 produced TEN

Recorded because the recurring root was identical every time: **writing a
specification from a document instead of reading the live artefact.**

1. Failing to gate the governed publish in F187's phase, so the phase would have
   shipped its own triage inverted (`execute_sql` denied, two foreign surfaces
   open). Cost: FIX-1.
2. Concluding an event had not happened from an empty log query (→ S68-1).
3. Ordering a script whose blast radius was unread (→ S68-2).
4. Writing a test question against an entity that does not exist (`KB7 granit
   hattı`) without checking the 796-row live `entity_registry`.
5. Inferring a wall-clock time from conversational order — a **violation of the
   existing S67-3**, not a new lesson.
6. Writing an evidence criterion that would have passed with or without the fix
   (a synthetic day cannot move a cache synthetic traffic never writes to).
7. Querying a stale `deploymentId` after a merge triggered a new build — the
   Architect's own recorded trap.
8. Writing a denominator rule from the local-tool case without enumerating the
   other always-offered tools (`search_tools`, `call_tool`).
9. Writing "all five losses are one shape" into a merge message from a report
   summary rather than from the rows.
10. Publishing wrong code-floor category counts from a crude regex whose own
    output carried two `?` rows — the warning was visible and ignored.

---

## 8 · SEQUENCE AFTER S68 (dependency-ordered)

1. **Merge `1b29775a`** (CATALOG-WRITE-LOCK-1 G4+G5). Merge message issued
   verbatim; AG's next action.
2. **F185 half (a) — the exclusion guard**, with **F186** folded in. Unblocks
   the F177 queue.
3. **F199** — make the empty layer visible to the gate.
4. **F177** — the record-identifier class, the largest measured block cause.
   Diagnosis fork first (resolver vs IR).
5. **F196** — the `rule26` noise, before M-C.
6. **SYNTH-TRAFFIC-2 / F204** — hard precondition of M-C and of every tool-path
   done-proof.
7. **M-C** — and note the provider confound is now understood as TWO
   asymmetries: action-space **size** (sonnet 145 vs 14–74) and **kind**
   (sonnet reaches all 44 write tools, gemini/openai reach none).
8. **A23 / F175 line** — and the **frameRouting re-evaluation rides here**,
   together with mechanism (B) (the FIRE augmentation's gate).
9. **F198 pagination** — before any equipment discovery.
10. F197's riders · M-B · F178 · F179 · F180 · F202 · F206 · F208–F212 · F214.

**GOLDEN FREEZE — engaged, unchanged. Lifts at B5.** No `prompt.segment`
publish, no golden run.

<!-- END · cwf-open-items-register-v69 · 2026-07-29 · closes S68 -->
