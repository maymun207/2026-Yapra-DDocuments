# GO · M1F2A-HONEST-READ-1 · MERGE · v1
<!-- GO-M1F2A-HONEST-READ-1-MERGE-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     RULE-25 review performed from a SECOND fresh full clone (/home/claude/s80rev),
     independent of both the hand-back and the Architect's own authoring clone.
     Every number below is from a command run in that clone (D-3). -->

## §1 · VERDICT: **GO**

Two residual findings, both named in §4. Neither blocks: one is latent and
cannot cause a wrong actuation, the other is a fail-closed behaviour to watch.

## §2 · WHAT I RE-DERIVED (not read from the report)

| Claim | My independent result |
|---|---|
| branch head | `db846f70373f4cf1fcbef3e53f52b0525c7b2e6d` ✓ |
| anchored to master | `merge-base` = `e214b7e6…` and `--is-ancestor` YES — one commit ahead, no rebase, no stray parent |
| migrations | 0 files changed under `supabase/`; count still **65** ✓ |
| `evalGate.ts` | diff **0 lines** ✓ |
| docVersion | `rev 183 · 2026-08-03` ✓ |
| reseal genuine | all **7** `mappedContentSha` values changed; Architecture Map additionally gained a rev-21 narrative line ✓ |
| `lastSyncedCommit` = `e214b7e` | **NOT a defect.** The gate's authority is `mappedContentSha`, and `docDriftCore.ts` says so in its own header (`lastSyncedCommit` survives only as a human breadcrumb). Master's rev-182 manifest likewise carried the *previous* merge (`11061d8`) — AG followed the house convention exactly. I checked this because it looked wrong; it isn't. |
| Class B byte-untouched | I diffed all 14 Class B repository files myself: **0 lines each** ✓ — the D-5 innocent-case probe holds under an independent hand |
| census arithmetic | My own script re-run on the branch: **31 → 21** inside `repositories/`. The 10 removed are exactly Episodes×2 · SyntheticRuns×1 · ToolCache×2 · UsageAnalytics×3 · UserChatQuotas×1 · UserQuotas×1. The one still counted in `TurnTraceDigestRepository` is the **deliberate** `isTableAbsent → 0` branch AG declared. This reconciles with AG's wider `44−13+1=32` without a remainder. |
| `synthetic_runs.tokens` | `integer not null default 0` — so the `?? 0` inside the new sum is unreachable, a belt, not a residual fold. I checked. |

**The census delta is the phase's own vindication.** AG's AST pass found 44 where
my grep found 31 — including two *inside* my declared scope that grep could not
see (`ReplayAuditRepository:138` folds to `{}`, not `[]`/`0`;
`UsersRepository:63` guards on `rolesRes.error`, not a bare `error`). The brief
demanded AG's number win if it differed. It differed, and it won.

## §3 · RULINGS OWED — all four UPHELD

1. **`SyntheticRunsRepository:90`'s comment was inverted.** Upheld. The consumer
   tests `tokensToday >= ceiling`; `0` is the most-OPEN value that comparison can
   take. The comment claimed "fails the guard CLOSED" and the code did the
   opposite. **This is why the site survived M1P0**: a reader auditing the fold
   was told by the code itself that it was safe. Standing form —
   *a comment asserting a safety property the code does not have is worse than
   no comment: it terminates the next reader's inquiry.*

2. **`UsageAnalyticsRepository`'s header was false.** Upheld, and this is the
   most important of the four. `QuotaAnalyticsTab`'s error-with-retry branch has
   been correct since Q-2; every endpoint arm answering `200` made it
   unreachable. **The UI was honest and the data layer defeated it.** Standing
   form — *a defence documented in one layer and implemented in neither is a
   defence that also blocks its own discovery.*

3. **The `Number(x)||0` SQL-null rationale is latent, not live.** Upheld — and
   the error is **mine**, logged as **PREMISE-S80-1**: I asserted the mechanism
   ("a genuine SQL `null` becomes `0`") from the TypeScript expression without
   reading the function bodies that feed it, which `coalesce(...,0)`
   server-side. Same family as D-1: a live-behaviour claim made from one layer's
   evidence. The repair is correct on the mechanism that *is* live (a
   renamed/dropped key ⇒ `undefined` ⇒ a stamped `0`), and AG saying so instead
   of quietly implementing my version is the behaviour the doctrine is for.

4. **`getEpoch` Class B confirmed; `resolveBackendAuthorityFor` also B.** Upheld.
   The reasoning is sound in the conservative direction: with `{}` authority
   `runScopeCheck` flags MORE violations, so it fails loud, not clean. AG
   overturning its own first read against its own interest is the right posture.

**WORKDIR-DISCIPLINE-1, third occurrence** — accepted as declared, no damage
(absolute paths held; real repo verified clean at `e214b7e`). Third firing means
it stops being a lesson and becomes a rule. **Minted S80-1: every write in a
scratch-clone session uses an ABSOLUTE path. The cwd is not a safety mechanism —
it is a variable another process can change.** Not a code gate; a lane rule.

## §4 · RESIDUAL FINDINGS (named, carried, non-blocking)

**F-M1F2A-1 · the null survives one layer past the repository, at the actuator.**
`rolloutGuardrail.ts:82-83` does `row?.turns ?? 0` / `row?.emptyTurns ?? 0`.
Written for the *row-absent* case; after this phase widened `UsageEmptyRow` to
`number | null` it now also swallows a **not-measured** value into `0`, which
then trips the power floor and yields verdict `underpowered` instead of
`unavailable`. Two things bound the severity, both verified in the clone:
* not live-reachable today — `usage_empty_by_fingerprint` coalesces server-side;
* **the actuator fires on `regression` only**, so `underpowered` and
  `unavailable` are both non-acting. No wrong rollback can arise from this.

It is a label-honesty gap, not a safety gap — and it lands exactly where 1.3b
renders band 6 ("rollout guardrail — 'underpowered' stays gray"). **Rides 1.3b**
as a named sub-item, not a follow-up fix phase.

**W-M1F2A-1 (watch) · the spend read can now abort a tick it used to survive.**
`tokensSpentToday` throws `INCOMPLETE` when `seen < total`. If rows are inserted
between the first and last page, `count` grows and the read refuses. The
direction is fail-closed (the tick aborts, nothing is injected), so it is safe —
but at a raised ceiling it could abort ticks that would previously have run. I
will look for this in the post-deploy read; no action now.

## §5 · ONE GAP IN THE HAND-BACK — cheap, no re-run

The report says `rule26: 111 passed, FIRST attempt. No reruns.` It does **not**
state the flaky count. Seven `retries: CI ? 2 : 0` blocks are still live
(E2E-RETRY-MASK-7), each able to hide two failures behind a green line, so
"passed" and "passed without spending a retry" are different facts. **The data
already exists in that run's own summary — read it back, do not re-run.** If it
is `0 flaky`, say so and proceed. If it is not, stop and report before merging.

## §6 · MERGE INSTRUCTION

**STEP 1 — CI is the arbiter (S37-2).** Open a PR from
`phase/m1f2a-honest-read-1` and wait for the unsharded run on the PR head to go
green. `in_progress` or `null` is **not** a pass. Report the run id and its
5/5 result. The Architect cannot arbitrate this (GitHub API is rate-limited from
the Architect sandbox).

**STEP 2 — merge `--no-ff`** (squash banned) with the message below,
**byte-verbatim**, then push and report the remote master hash.

```
Merge PHASE-M1F2A-HONEST-READ-1: the read floor learns to say "I could not read"

M1P0 closed HEAD-COUNT-SILENT-204-1 for count-only reads. Its census could not
see select(...)+reduce folds, delete(...).select() folds or RPC-result folds, so
the rest of the class stayed open — directly under the health dashboard 1.3b was
about to be built on.

An independent AST census found 44 error-guarded literal folds where the
Architect's grep found 31, including two inside the Architect's own declared
scope that grep structurally could not see. 14 are Class A under the new standing
rule MEASURE-READ-HONESTY-1: a read feeding a measurement, a durable ledger row,
an actuator or a spend/safety fence must distinguish "no data" from "could not
read". The other 30 are human-read lists and are left BYTE-UNTOUCHED — proven,
because a sweep that also swept them would have disproved its own rule.

The spend fence carried two faults that each disarmed it. `return 0` was
documented "fails the guard CLOSED" and did the opposite: the consumer tests
tokensToday >= ceiling, so 0 is the most-OPEN value that comparison can take.
And the unpaginated select capped at db-max-rows, so above 1000 rows/day the sum
silently truncated — measured 400_000 against a real 2_000_000 day. The fence
broke exactly when a human RAISED it. It now pages by EXACT COUNT (the first
implementation reintroduced the very bug it was fixing, terminating on a short
page; that is on the record) and throws rather than reporting a spend it cannot
vouch for.

UsageAnalytics's own header claimed its []-fold was safe because the client
renders error-with-retry off the HTTP layer. Every arm answered 200, so that
branch had been unreachable since Q-2: the UI was honest and the data layer
defeated it. null now maps to 503, and empty≠zero reaches the pixels as three
distinct states — a real bar, a deliberate hairline for a real 0, and no bar
with a BROKEN cost line for unmeasured, because a line dipping to the baseline
asserts that something cost nothing.

Four premises of the Architect's brief were corrected by evidence rather than
implemented as written, including one the Architect had asserted from the
TypeScript expression without reading the SQL beneath it (PREMISE-S80-1).

ZERO migrations · ZERO DDL · ZERO governed writes · ZERO Operator steps.
424/4717 -> 427/4740 · rule26 111 passed first attempt · reseal rev 182 -> 183.
```

**TAIL ANCHOR (S61-3):** this block ends at `reseal rev 182 -> 183.` — if your
copy stops earlier, the relay truncated; request it again before merging.

## §7 · POST-DEPLOY PROOF READ (Architect, no owner work)

The `[SynthTraffic] daily token ceiling reached — injection STOPPED` line, a
server-side `console.error`, read against a `READY` production deployment whose
SHA contains the merge — the deployment id named, per L10. I will also look for
W-M1F2A-1 in the same window.

<!-- END · GO-M1F2A-HONEST-READ-1-MERGE-v1 -->
