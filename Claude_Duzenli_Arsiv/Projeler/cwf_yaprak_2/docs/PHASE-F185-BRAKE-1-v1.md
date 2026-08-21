# PHASE F185-BRAKE-1 · v1
<!-- PHASE-F185-BRAKE-1-v1 · 2026-07-28 · S68 · Architect: Claude
     Anchor: origin/master = 0d540c9d4742ee3da6e2cd1eb13d7a9fe5b58ba6 (rev 150).
     RUNS AFTER PHASE F187-GATEWAY-SURFACE-1 IS MERGED. Branch from the merged
     master, never from 0d540c9 — F187 edits stageTools.ts and this phase edits
     the same file. If F187 is not yet merged, STOP and say so.
     SELF-CONTAINED (S66-2): every law and value is restated inline. -->

**Lane:** Author (AG). **Repo:** `maymun207/cwf_yaprak`. **Branch:**
`phase/f185-brake-1`. **Migrations: ZERO.** **Operator steps: ZERO.**
**`prompt.segment` publishes: ZERO.**

**This phase is the BRAKE ONLY — half (b) of F185.** The exclusion GUARD (half
(a): entity names and time words must stop being learned as domain signal) is a
separate, later phase. Do not build it here. Building both at once would make
the brake's own evidence unreadable.

---

## §0 · HARD PRE-FLIGHT (paste the literal output)

```bash
# 1. FRESH CLONE. Never `git stash` (S61-1).
git clone https://github.com/maymun207/cwf_yaprak.git f185 && cd f185
git rev-parse origin/master     # record it; it MUST be the F187 merge commit
git log -1 --format='%H %P %s' origin/master
#    EXPECT: two parents (a --no-ff merge), subject naming F187.
#    If master is still 0d540c9d4742ee3da6e2cd1eb13d7a9fe5b58ba6, F187 has not
#    merged → STOP and report. Do not start.

# 2. Floor counts (report, do not assume — F187 moved them).
find . -path ./node_modules -prune -o \( -name '*.test.ts' -o -name '*.test.tsx' \) -print | wc -l
ls supabase/migrations | wc -l          # EXPECT: 59 (this phase adds none)
grep -m1 docVersion public/architecture/manifest.json

# 3. Commands (grep-verified from package.json):
npm ci && npm test && npm run typecheck:api && npm run check:doc-drift
```

---

## §1 · THE FINDING (restated inline — do not go looking for a design note)

The routing layer learns `keyword → categories` mappings at runtime and persists
them to `tool_category_cache`. **There is no governed switch that stops it.**

Verified live: the 23 existing agent params are `agent.*`, `quota.*`,
`router.{contextTurns, enabled, frameEnabled, frameRouting, maxCategories,
timeoutMs}` and `synthetic.*`. The only candidate, `router.enabled=false`, points
the **wrong way** — `toolCategories.ts:881` shows that path falling back to the
keyword/learned map, i.e. leaning on it *harder*.

**Measured consequence:** the cache was cleared to 2 pinned rows and had regrown
to **19 rows within hours**; 17 keys returned inside ~10 minutes, and `granit`
landed in a **third** distinct category set. The learned content is incoherent by
its own evidence — `glazur1 → [material]` while `glazur3 → [metrics, production,
andon, factory, machine]`: sibling production lines, wholly different routing,
differing only by which question each first appeared in.

**Why a brake is needed BEFORE any measurement:** the next phase in the line
(ROUTE-SHADOW) measures routing quality. An instrument cannot be calibrated
against a target that rewrites itself during the run (S65-3). The S66 provider
A/B already failed this way — the arms mutated their own instrument.

**What this phase is NOT:** it is not a fix for the contaminated content. It
makes the process **controllable**. Turning it off is a governed publish, made
later, on evidence.

---

## §2 · BINDING CONSTRAINTS

1. **The brake seeds ON.** `router.learnEnabled` code floor = **1**. At merge,
   behaviour is **byte-identical** to today. This is pinned by an equivalence
   test, and it is what makes the phase reversible: flipping to 0 is a governed
   `domain_rules` publish, **no redeploy**.
2. **Bool-as-number.** No `AgentParamDecl` in this corpus uses `type:'boolean'`;
   the established convention is `type:'number'`, `min:0`, `max:1`. Follow
   `router.enabled` / `router.frameEnabled` / `router.frameRouting` exactly
   (`agentParams.ts:281`). Do not widen the type system.
3. **Same resolver chain, no new tier.** `resolveRouterPolicy.ts` is db > code-
   floor with **no lab tier and no env tier** and `sessionTweakable:false` — *a
   session may never flip its own routing engine*. `learnEnabled` obeys the same
   posture. Add it to the returned `RouterPolicy`.
4. **Floor direction is the opposite of `enabled`'s, and this is deliberate.**
   `enabled` floors to 0 so an outage can never silently switch the router ON.
   `learnEnabled` floors to **1** so an outage cannot silently change today's
   behaviour. Both rules are the same rule: *the floor is today's state, never a
   new state.* State this in the decl's comment.
5. **ZERO migrations.** The param self-provisions through `selfSeedReconciler`'s
   existing `AGENT_PARAM_SEEDS` mapping over `REFERENCE_AGENT_PARAMS`. If you
   are writing SQL, stop and report.
6. **DO NOT TOUCH:** `ROUTING_STOPWORDS` · `isLearnableKeyword` · the F123
   stopword guard · the F145 `LEARN_MAX_CATEGORIES` broad guard · the F156
   cross-layer `basis !== 'keyword'` suppression · `matchCategories` ·
   `routeKeywordLayer` · `ALWAYS_INCLUDE` · the eval-gate. The brake **adds** a
   condition; it never edits an existing one.
7. **The LOAD path is untouched.** A braked system still READS the existing
   learned map. This phase stops writes, not reads. Deleting or ignoring the
   existing content is a different decision and is not yours to take here.

---

## §3 · GATES

### G1 · The param

`agentParams.ts`: add `AGENT_PARAM_KEYS.ROUTER_LEARN_ENABLED =
'router.learnEnabled'` and its decl —
`{ value: 1, type: 'number', min: 0, max: 1, stage: '07', sessionTweakable: false }`.
Mirror the comment style of `ROUTER_ENABLED` (`:278-281`), including the clamp
rationale (a poisoned publish of `5` collapses to 1, never UB).

`resolveRouterPolicy.ts`: add `learnEnabled: resolveOne(...) >= 1` to the
returned policy, beside `frameRouting`. Same `resolveOne`, same clamp, no new
code path.

### G2 · The three machine write sites

All three are gated. A brake that stops two of three is not a brake.

| # | Site | Anchor |
|---|---|---|
| 1 | `learnToolMapping` — the ONE persist chokepoint | `toolCategories.ts:461` |
| 2 | the router-fallback learn loop's call into it | `toolCategories.ts:1049` |
| 3 | `recordRouteProposals(...)` — the semantic-path proposal emission | `toolCategories.ts:1017` |

- **Site 1 is the defence-in-depth point.** `learnToolMapping` already carries
  exactly this pattern for stopwords: *"F123: defense-in-depth — no caller may
  persist a stopword key, even bypassing the write guard."* Add the brake check
  in the same place and return a **new verdict** `'skipped_brake'` (extend
  `LearnVerdict`), so the existing aggregate counters stay honest instead of
  silently attributing a braked skip to `skipped_short`.
- **Signature:** `learnToolMapping(keyword, categoryNames, opts?: { learnEnabled?: boolean })`
  — the SAME optional-trailing-parameter shape `filterToolsByMessage` already
  uses for `routerPolicy`. Omission = today's behaviour, so the ~20 existing test
  call sites are untouched.
- **Because the option is optional, a forgetful production caller would learn
  anyway.** Close that with a **structural test** in the
  `turnPathNoMirror.test.ts` / `turnTraceDigestDisplayOnly.test.ts` mould: no
  file under production authority may call `learnToolMapping` without passing the
  option. Include a **floor assertion** — a scan that finds ZERO call sites
  FAILS (S66-1) — and a positive-control fixture.
- **Site 3:** `recordRouteProposals` is machine observation feeding a human
  queue. When the brake is pulled, the queue stops growing. Gate it.
- **One aggregate log line per braked turn**, never one per word:
  `[ToolFilter] learn braked=<n> path=<stagetools|fallback>`. Silence is not
  acceptable — a system that stopped learning must SAY it stopped.

### G3 · The human curation path — NAMED, NOT GATED

`RoutingCurationRepository.opPublishSet` (`:161`) writes `pinned: true`, and
`opClear` (`:183`) deletes **unpinned rows only** — so a human-accepted mapping
survives bulk Clear.

**Do NOT gate this path with `router.learnEnabled`.** A human's deliberate,
audited, gated act is a different authority from automatic learning; conflating
them behind one switch would be a category error.

**Correction carried into this prompt so nobody re-fears it:**
`opPublishRemove` (`:172`) exists and deletes the row outright, so an accepted
mapping **is** individually removable through the same gated surface. It is not a
one-way door; it is *not clearable in bulk*. Record that in the code comment where
you gate site 3, so the asymmetry is documented where a reader meets it.

### G4 · Proof the brake can actually stop a write (S66-1)

A self-verify zero is not believed until the command is proven able to fail.

- **RED:** with `learnEnabled: false`, a turn that would otherwise learn produces
  **zero** `toolCacheRepo.upsert` calls and zero `router_proposals` writes —
  asserted against the mocked repositories, not against a log line.
- **Positive control:** the same test with the brake condition removed from
  `learnToolMapping` **fails**. Paste that failing output.
- **Equivalence:** with `learnEnabled: true` (the seed), the learn path is
  byte-identical to pre-phase — the existing aggregate-line tests pass
  **unmodified**.
- **Floor honesty:** a resolver failure yields `learnEnabled: true` (today's
  behaviour), proven by a thrown-error test.

### G5 · Drift + reseal

`toolCategories.ts`, `agentParams.ts`, `resolveRouterPolicy.ts` and
`turn/stageTools.ts` are all mapped. A reseal and a docVersion bump are expected.
Let `npm run check:doc-drift` decide which tabs moved — do not predict the count.
Below diagram altitude: one governed param and three guard conditions add no
topology node, gate stage or table.

---

## §4 · SELF-VERIFY — paste the LITERAL output

1. Clone-time `git rev-parse origin/master` + the two-parent F187 merge line.
2. `npm test` file/test counts before and after; `npm run typecheck:api` clean.
3. `git diff --name-only -- supabase/` → **empty**.
4. `git diff --stat` for the DO-NOT-TOUCH list in §2.6 → **empty** for each.
5. The G4 positive control: RED output with the brake removed, GREEN restored.
6. The equivalence test proving `learnEnabled: true` is byte-identical.
7. The structural test's output, including the floor assertion firing on a
   zero-site scan.
8. The braked aggregate log line from a test run.
9. `npm run check:doc-drift` final state + the docVersion you resealed to.
10. **Statement of what you did NOT do:** no migration, no SQL, no
    `prompt.segment` publish, no governed row published, no edit to the stopword
    list / broad guard / cross-layer guard / load path, and **no exclusion guard
    built** (that is the later phase).

**On CI (S67-2, binding):** `rule26` is ~50 % noise on master — 4 of the 8 master
runs preceding `0d540c9` concluded `failure` on already-merged code. A green does
not clear you and a red does not block you on its own. Gather evidence before any
re-run — mechanism named in the log, timing signature, whether this diff can even
reach the failing surface — and report that reasoning, not "re-ran, passed".

---

## §5 · OUT OF SCOPE (named, so each is a deferral and not a gap)

- **F185 half (a), the exclusion GUARD** — entity names from `entity_registry`
  (779 rows), time words deferred to `resolve_time_range`, function words staying
  in code. Its own phase, after ROUTE-SHADOW.
- **The existing contaminated rows.** Not deleted, not migrated, not ignored.
  What to do with them is decided on ROUTE-SHADOW's evidence.
- **F186** — Turkish suffix fragments in the learned map (`nin`, `sini`, `lar`,
  `deki`, `icin`). Compounds with F185(a); belongs there.
- **F177** — the `router_proposals` review loop. **Do not work that queue until
  the guard lands** — the standing queue currently offers `kb7 → machine`, which
  would overwrite the curated `kb7 → factory`.
- **The word map's retirement** (A23 §9 Step 6) — that is PB-B, after M-C.

---

## §6 · DONE IS NOT DONE AT MERGE (S63-1)

The proof is a post-deploy read, not this merge:

1. `router.learnEnabled` appears in the governed param list, resolving from
   **db** or **floor**, value 1.
2. Learning continues normally at value 1 — the aggregate lines look exactly as
   they did before.
3. **The real proof comes at the flip**, when the owner publishes 0: the braked
   aggregate line appears in production logs and `tool_category_cache` row count
   stops moving across a full synthetic day (500 injections).

---

## §7 · MERGE

`--no-ff`. **Squash is banned.** Do not compose the merge-commit message
yourself: push, report the branch head hash, and request it — the Architect
writes it verbatim (S30-2). The merge is not done until pushed and the remote
hash is reported.

**TAIL ANCHOR (S61-3):** if you cannot read the line
`END · PHASE-F185-BRAKE-1 · v1` immediately below, this prompt arrived truncated
— say so and request a re-send before writing any code.

<!-- END · PHASE-F185-BRAKE-1 · v1 · 2026-07-28 · S68 -->
