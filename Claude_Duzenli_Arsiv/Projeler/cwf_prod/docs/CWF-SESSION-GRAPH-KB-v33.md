# CWF — Session Graph KB · v33

<!-- CWF-SESSION-GRAPH-KB-v33 · rev 33 · 2026-07-10 · Supersedes v32.
     This window: Session 33 — L3 EVAL-CI CANARY end-to-end. -->

## §1 Session 33 summary

Opened at floor `494b9ba` (v32, verified unmoved via fresh clone + first-parent spine).
ONE phase shipped end-to-end: **L3 EVAL-CI CANARY** — design v1 (owner-ratified) → gated
prompt → AG build merged `d87fedd` (RULE-25 PASS, +33 tests / +2 files) → deploy
READY/production sha-matched → `EVAL_CI_TRIGGER_SECRET` set both sides (GitHub + Vercel,
redeploy done). No DDL, no Operator door. Program spine: L1 ✅ Q ✅ TRUST-PANEL-1 ✅ L2 ✅
OBS-ENDPOINT-1 ✅ GOLDEN-MARK-1 ✅ **L3 ✅** → L4 ROUTING-DRAFTS next.

## §2 Decisions (owner-ratified)

- **L3 = a post-deploy golden CANARY, not a per-PR gate.** The L2 golden gate compares
  two segment sets under ONE code version, contemporaneously; a code MERGE can only be
  judged TEMPORALLY (the old code is gone — a paired A/B would run the same binary twice).
  So L3 runs the golden set SINGLE-ARM (published segments, N reps) on every production
  deploy and compares longitudinally against the latest matching stored canary baseline
  via the EXISTING `goldenVerdict()`. Zero new statistics — the discipline cannot drift
  from L2's.
- **Spend runs app-side; CI only triggers + reads the verdict.** "Thresholds in CI" =
  the DECISION surfaces in CI, NOT that the evaluation executes there. Three reasons a
  GitHub runner may NEVER run the eval: (i) it would put a data-access credential
  (Supabase/provider keys) in GitHub secrets — secret-perimeter expansion, incident-class;
  (ii) golden specimens are factory conversation content — must never leave the app
  boundary (CI sees rates/counts only, C9); (iii) provider flake would make a merge gate
  nondeterministic = a lie.
- **The trigger is a shared SECRET, not a user JWT / machine user.** `REPLAY_RUN` is
  checker-only and role additions need a DB CHECK migration — so a dedicated
  `EVAL_CI_TRIGGER_SECRET` header, timing-safe-compared, env-only both sides. Its full
  leak blast-radius = capped, audited spend returning rates/counts — categorically below
  any data key. Reject is reason-only, value never echoed (the ADR-007 posture). The
  shared-secret arm lives in `eval-ci.ts` ONLY (never in adminGuard — structural).
- **Red only on `compared/regression` or `completed:false`.** Everything ambiguous
  (`underpowered`, `baseline:absent`, `goldenSet:absent`, promptRev-advisory, quota-fence
  429) is GREEN-with-annotation. A gate that reds master on noise gets DISABLED by humans
  within a week — worse than no gate. `underpowered` is always "cannot distinguish,
  audited", never "safe".
- **`goldenSetHash` as the baseline key = self-healing curation.** Marking/unmarking a
  specimen orphans old baselines (one `baseline:absent` green run) and the next deploy
  re-establishes the chain — no manual baseline management ever. A promptRev mismatch
  DOWNGRADES to advisory (never blocks — the segment delta was already Wilson-gated at
  L2 publish; blaming the deploy would double-count). `completed:false` rows NEVER become
  baselines (one budget abort would else widen the baseline CI and mask the next
  regression).
- **The empty-set arm is GREEN.** Golden set is still empty ⇒ every armed canary run
  answers `goldenSet:absent` (green, loud, zero spend). Red-on-absent would let a
  toothless gate block master and train everyone to ignore red.

## §3 Verified state deltas

| Commit | What | Floor |
|---|---|---|
| `3ba4d55` | L3 code (canaryRun, eval-ci.ts, repo reads, workflow) | (branch) |
| `efc2ca9` | L3 docs | (branch) |
| `39bf3ca` | L3 reseal rev 60→61 | (branch tip, REVIEWED) |
| `d87fedd` | Merge feat/l3-eval-ci-canary (--no-ff, tree==39bf3ca) | **1779 / 170 / rev 61 — floor at close** |

DB deltas: **NONE** (no DDL, no migration, no Operator door — the canary rides an additive
`replay_audit` outcome shape `{ canary:true, actor:'eval-ci', … }`; `message_id` sentinel
`'canary'`). Deploy `dpl_DuWZe8E…` READY / target=production / sha `d87fedd` confirmed via
Vercel MCP. `EVAL_CI_TRIGGER_SECRET` set in GitHub repo secrets + Vercel Production env,
redeploy done — behavioral live-firing confirm bound to the next master push (§4).

## §4 Process notes (Architect-owned)

- **RULE-25 review worked from the repo, not the report.** Independent fresh-clone recount
  (1779/170), all six C-B pins diffed empty, single-definition greps for goldenVerdict /
  wilsonInterval, C-F/C-G/C-H/C-D verified in code BEFORE trusting any report claim.
- **All six AG deviations accepted**, two notable: (4) repo reads made fail-LOUD (throw)
  rather than degrade-to-0/[] — correct, because degrade would fail the spend fence open
  AND silently disable the longitudinal comparison (the banned fallback class); (6) the
  jq `//` operator treats `false` as empty, so the spec's step-3 sketch would have
  silently GREENED the `completed:false` red arm — AG caught + fixed with `| tostring`,
  all 7 decision arms fixture-proven. Author-strengthened-spec class (OBS-ENDPOINT-1
  suffix-spoof precedent).
- **`PROD_HOST` resolved from the repo** (`cwfyaprak.vercel.app`, documented in
  `.agents/CHANGELOG.md`) — the `EVAL_CI_PROD_HOST` repo-variable fallback was NOT needed;
  dropped from the action items.
- **Two verification tools were blocked THIS session** (stated honestly, not papered
  over): the bash egress proxy has `cwfyaprak.vercel.app` OUT of its allowlist (a probe
  returned the proxy's own "Host not in allowlist" 403, NOT the endpoint), and the GitHub
  Actions REST API hit an anonymous rate-limit (shared egress IP). So the canary's
  live-firing could not be behaviorally confirmed in-session — correctly deferred to the
  next master push rather than asking the owner to eyeball the Actions tab.
- **Design v1 §3.3 corrected in the prompt (Architect owned):** the note implied a
  string sentinel actor; the column is `uuid references auth.users`, so a string insert
  would fail. Fixed to `actor_user_id: null` + `outcome.actor:'eval-ci'` (→ S33-1).

## §5 Standing addition

- **S33-1 — FK-honesty for machine actors:** a machine/system actor written to a
  `uuid references auth.users` column takes **NULL**, never a string sentinel (the insert
  would fail and the path only ALARMs). Machine attribution rides an `outcome.actor`
  (jsonb) field instead. The L3 canary is the precedent.

<!-- END · CWF-SESSION-GRAPH-KB-v33 · rev 33 · 2026-07-10 -->
