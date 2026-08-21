# GO · M1F2B-DATA-LAYER-1 · MERGE · v1
<!-- GO-M1F2B-DATA-LAYER-1-MERGE-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     RULE-25 from a THIRD fresh full clone (/home/claude/s80r2), independent of
     the hand-back and of both prior review clones. Every value computed (D-3). -->

## §1 · VERDICT: **GO** (merge only — the migration stays Operator-pending)

## §2 · RE-DERIVED INDEPENDENTLY

| Claim | My result |
|---|---|
| branch head | `b89f148d0a05f51de1b51bb52510ebb5f7d2fc37` ✓ |
| anchored | `merge-base --is-ancestor origin/master` **YES** on `ce9c96de`, one commit ahead |
| G0 prune | `phase/m1f2a-honest-read-1` **gone** from the remote list ✓ · the two stale ancestors correctly untouched |
| migrations | **66**, exactly one new: `20260803120000_health_measurement_aggregates.sql` ✓ |
| `evalGate.ts` | diff **0 lines** ✓ |
| writes to `messages` | grep over the whole `+` side: **none** ✓ |
| docVersion / tabs | `rev 184` · **5** `mappedContentSha` values changed ✓ (Request Lifecycle included — the `_lib/knowledge/**` mapping AG corrected me on) |
| test files | **430** by the vitest include globs, counted myself ✓ |
| surface work | `src/**` diff is **empty** — no tab, no UI. Correct: 1.4 owns the surface. |
| turn-path contamination | `resolveHealthPolicy` and `HealthAnalyticsRepository` have exactly ONE caller each, `api/admin/health-analytics.ts`. Nothing new runs on a turn. ✓ |

**The grant block, read in full (S43-2 — security always full-read):**

```
revoke execute on function public.health_*(timestamptz, timestamptz)
    from public, anon, authenticated;
grant  execute on function public.health_*(timestamptz, timestamptz) to service_role;
```

All four, all-grantees. All four present in **both** `SERVICE_ROLE_ONLY_FUNCTIONS`
(`verifyGrants.ts:143-146`) and `FN_EXECUTE_PROBES` (`:185-188`) with real
parameter names and the `NO_WINDOW` benign args.

**The denominator, read verbatim:** `type='message'` ∧ `kind ∈ {turn_done,
clarification_asked}` ∧ `session_id is not null`, deduped by `session_id`, with
`withheld_turns` counted as `withheld AND NOT answered`. Quota-denied rows are
excluded by the `session_id is not null` predicate — structurally, not by a
filter someone could delete. `count(*)` never returns NULL, so the SQL layer
adds no new null surface.

**G1 read line by line.** Three states, three outcomes, no `?? 0` survivor:
row absent → measured 0 arm → power floor; row present with a null count →
`turns`/`emptyTurns` carried as null, `wilson: null`, verdict `unavailable`;
otherwise the C-C rule. `wilsonInterval` is never called on a null.

## §3 · THREE THINGS AG DID NOT FOLLOW — all three RIGHT, and two of them mine

**1 · The grant instruction in my brief was wrong, and it was a security
instruction.** §2 G2 told AG to model the new functions on `usage_daily_series`
"verbatim". That file revokes EXECUTE **from PUBLIC only** — the exact Q1-FIX-1
leak class, because Supabase's `pg_default_acl` grants anon/authenticated **by
name** and a PUBLIC revoke does not touch a by-name grant. The project has a
standing rule against precisely this, and I wrote a brief that contradicted it.
**PREMISE-S80-4.** Caught by `migrationFnLockdown.test.ts` going red — which is
what a standing gate is for, and why "copy the neighbour" is never a safe
instruction on a security surface: the neighbour can be the defect.

**2 · The container could not express the bug — and said PASS.** AG's docker
idempotence proof returned a confident **8/8** on the broken version, because a
bare `postgres:16` has no Supabase default ACLs. This is a first-class
false-green: not a wrong assertion, an instrument structurally unable to fail.
**Minted, S80-2 (RULING):** *a local-container proof establishes only what the
container can express. A grant-shape claim is proven by the standing gate, never
by the container — and any container proof that touches grants must say which
of the two it is.* AG recorded the caveat on the proof's own memory entry, which
is where it will actually be recalled. That is the right place, not a doc.

**3 · My severity mechanism for F-M1F2A-1 was wrong.** I wrote that all four
aggregates `coalesce(...,0)` server-side. `usage_empty_by_fingerprint` uses
`count(*)` / `count(*) filter (...)`, which are never NULL in SQL — the coalesce
covers the token/cost SUMs in the other three. **PREMISE-S80-5.** The
*conclusion* (not live-reachable today) survives by a different route, and AG
corrected the mechanism in the file header instead of inheriting my sentence.
A conclusion that happens to be right for the wrong reason is still a wrong
premise, and it is logged as one.

**Also accepted:** the five-tab drift correction, and the refusal to run
`verifyGrants` pre-apply. A probe against functions that do not exist yet returns
`PGRST202` = INCONCLUSIVE-fail under HARDEN-FN-PROBE-1's three-way rule; dressing
that up as a pass would have been the exact silent-green this whole line of work
exists to kill. The live 42501 run is **owed post-apply** and is in the Operator
prompt.

## §4 · ONE RESIDUAL (non-blocking, already scheduled)

**F-M1F2B-1 · the header still describes the posture it deviated from.** The
migration's header (lines 7-10) says the file is modelled on `usage_daily_series`
"…EXECUTE revoked from PUBLIC and granted to service_role only". The revoke block
itself then states the deviation explicitly and at length. A reader of the header
alone concludes PUBLIC-only — the same comment-versus-code class 1.3a punished at
`SyntheticRunsRepository:90`.

Not worth amending a presented artifact mid-merge (S37-1). **The DOC-FLIP after
the Operator apply already edits this header** to flip authored → applied; the
correction rides there, one line.

## §5 · MERGE INSTRUCTION

**STEP 1 — CI is the arbiter (S37-2).** Open a PR from
`phase/m1f2b-data-layer-1`; wait for the unsharded run on the PR head.
`in_progress`/null is **not** a pass. Report the run id and the 5/5 result.

**STEP 2 — merge `--no-ff`** (squash banned) with the message below,
**byte-verbatim**; push; report the remote master hash.

```
Merge PHASE-M1F2B-DATA-LAYER-1: the measurement layer, built on the floor 1.3a laid

Rollout item 1.3 closes. 1.3a taught the read floor to say "I could not read";
this gate builds the aggregates, the governed thresholds and the honest cost
split on top of it, and finishes the one thing 1.3a left open.

F-M1F2A-1 was that thing, and it was the FIRST gate, not a rider. The sweep's
rule named the SCREEN, so the DECISION layer fell outside its wording and
rolloutGuardrail kept re-folding a null into 0. Three states now have three
outcomes: row absent is a real measured zero the power floor catches; a present
row with a null count is NOT MEASURED and yields 'unavailable'; only real counts
reach the verdict rule. wilsonInterval is never called on a null.

THE DENOMINATOR IS THE REASON THIS WAS NOT ONE OBVIOUS QUERY. A turn that ASKS
instead of answering never reaches runStreamStage, so it emits no llm_call row
and no turn_done row — only clarification_asked. The honest-withhold class the
useful-turn ratio exists to CREDIT was structurally invisible to both candidate
denominators. Latent today because router.frameRouting is dark; live the day A23
flips it, at which point a turn_done-only denominator would have started
under-counting while looking healthy. The denominator is distinct session_id over
turn_done UNION clarification_asked. Quota-denied turns are excluded by the
session_id IS NOT NULL predicate, structurally rather than by a deletable filter,
and are reported as their own number — they carry no turn id and joining them
would be a fabrication.

Three of the brief's instructions were not followed, and all three were right to
refuse. The grant instruction said to copy usage_daily_series verbatim; that file
revokes EXECUTE from PUBLIC ONLY, the Q1-FIX-1 leak class, because pg_default_acl
grants anon/authenticated BY NAME. The standing gate went red and the revoke is
now all-grantees. The docker proof had returned a confident 8/8 PASS on the
broken version: a bare postgres:16 has no such default ACLs, so the container is
structurally unable to express that bug — a false green produced by an instrument
that could not fail, now recorded where it will be recalled. And the briefed
severity mechanism for F-M1F2A-1 was wrong: usage_empty_by_fingerprint uses
count(*), never NULL; the conclusion survived by a different route and the header
says so rather than inheriting the sentence.

verifyGrants was NOT run pre-apply and was not dressed up: probing a function
that does not exist yet returns PGRST202, which HARDEN-FN-PROBE-1 classes as
INCONCLUSIVE-fail, never a pass. The live 42501 run is owed post-apply.

ONE migration, AUTHORED and Operator-pending (ADR-005) · ZERO governed publishes
· ZERO writes to messages · ZERO surface work, the tab is 1.4.
427/4740 -> 430/4782 · rule26 111 passed first attempt, 0 flaky · reseal rev 183 -> 184.
```

**TAIL ANCHOR (S61-3):** the block ends at `reseal rev 183 -> 184.` — if your
copy stops earlier the relay truncated; request it again before merging.

**STEP 3 — do NOT apply the migration.** The Operator applies
`20260803120000_health_measurement_aggregates.sql` from a separate fenced prompt
the Architect issues after the merge hash is reported.

## §6 · WHAT THIS PHASE STILL OWES (tracked, not forgotten)

* Operator apply + the live `verifyGrants` run showing the four probed and
  **42501-denied** (three-way classified; PGRST202 is a fail, not a pass).
* **Post-deploy proof read (Architect):** one aggregate endpoint returning a
  series that matches a hand-checked day.
* **A prediction now worth checking, free:** these four new decls change the
  declared agent-param set, so the reconciler must mint a NEW
  `system.agent_param` row in `seed_state` on the first warm after deploy —
  today's read showed 11 fingerprints there, newest 2026-07-31. If a twelfth
  does not appear, the params did not self-seed and the "resolves from db"
  claim would be false. Architect-verified, no owner work.
* **W-M1F2A-1** watch, 00:00–02:00Z window only, carried from 1.3a.
* **F-M1F2B-1** header precision, rides the post-apply DOC-FLIP.
* Two stale remote branches remain by design: `phase/e2e-devserver-api-404-1`,
  `phase/inspect-verdict-1` — both ancestors of master, out of scope, named so
  they are not re-discovered as a surprise.

<!-- END · GO-M1F2B-DATA-LAYER-1-MERGE-v1 -->
