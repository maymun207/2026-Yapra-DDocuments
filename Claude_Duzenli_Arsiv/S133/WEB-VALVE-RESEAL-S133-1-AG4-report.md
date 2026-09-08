<!-- relay-audit: v1 kind=report prov=1 -->
# WEB-VALVE-RESEAL-S133-1 — AG4 report

card: CARD-WEB-VALVE-RESEAL-S133-1-v1
lane: AG-4
branch: phase/web-valve-1-s132-1

**RESEALED, AND NOT ONE TAB WAS SEAL-ONLY.** The card warned that an all-seal-only
answer would be legitimate and suspicious. The opposite held, and the reason is
structural rather than lucky: this branch did not change a mechanism the diagrams
already described — it added the FIRST conditional local tool mount to a system
whose documents hard-code *the three meta-tools*. A count is the most brittle
claim a document can carry, and this change falsified it by name in two places.

The tab edits and `public/architecture/manifest.json` land in ONE commit, which is
what RULE 20 asks for. No valve default, environment variable or flag moves; no
product code is touched. `web.enabled` stays at its code floor, and an unreachable
governed read degrades CLOSED, so nothing here grants outbound reach.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head this commit sits on, equal to the card's own fence | MEASURED: `git log -1 --format=%H origin/phase/web-valve-1-s132-1` in the worktree before any edit | head |
| what the reseal recomputed, per tab, and which tab did not move | MEASURED: `npm run reseal` run once in the worktree, full output captured | reseal |
| the drift gate is clean locally across every narrative tab | MEASURED: `npm run check:doc-drift` after the reseal, before the commit | drift |
| the whole build gate passes end to end in this worktree | MEASURED: `npm run build` run once in the worktree, every step's output captured | build |
| the gates `npm run build` runs that the suite and the api type-check do NOT | MEASURED: the `build`, `test` and `typecheck:api` script bodies read from `package.json` in this worktree | gates |
| the commit's file set is exactly the six tabs and the manifest | MEASURED: `git status --porcelain -uall` before `git add`, and `git show --stat` after the commit | scope |
| every CI run at the pushed head, named with its conclusion | MEASURED: `gh api actions/runs` keyed on the FULL forty-hex head sha, read repeatedly until each run reported a conclusion | ci |
| `docs/ground/facts.json` carries a module count that is stale on this branch | MEASURED: `git diff docs/ground/facts.json` after `npm run build` regenerated it, read before the revert | facts |

```evidence:head
$ git log -1 --format=%H origin/phase/web-valve-1-s132-1
73931d5dc51f7783d639a24fdab96e4657120b69

equal to the card's head fence, so ORDER A.2 passed and no STOP fired.
```

```evidence:reseal
$ npm run reseal
[reseal] Architecture Map: 504 mapped files -> 3bac29d9eab4 (was af4cce39e995)
[reseal] Runtime Topology: 178 mapped files -> 914c8591f8cf (was 03bc379e57f0)
[reseal] Request Lifecycle: 202 mapped files -> 734b3d7a7811 (was 75d1f4ec8e19)
[reseal] LLM Control Surface: unchanged (45055f0a40a5)
[reseal] Governance Model: 225 mapped files -> f2cac3f05a63 (was beb3f41ae9e1)
[reseal] Agent Control Plane: 123 mapped files -> d89e81e423d3 (was 60c8090bccd6)
[reseal] Stage Cards: 46 mapped files -> a1be3510a081 (was c77bd0524726)
[reseal] done: 6 tab(s) hash-changed; all lastSyncedCommit -> 73931d5d.

The set that moved is EXACTLY the set the drift gate named, and the tab the gate
left out is the tab the script left unchanged. The card's ON-DISAGREEMENT arm
fires when the reseal reports nothing changed — the gate and the seal would then
be contradicting each other and one of them lying. They agree.
```

```evidence:drift
$ npm run check:doc-drift
[check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).
```

```evidence:build
$ npm run build
... tsc -b, typecheck:api, gen:arch-facts all silent
[check:ground] contract shape + ancestry checked over 4 artifact(s)
[check:ground] regeneration identity: MATCH
[check:ground] GREEN
vite v8.1.0 building client environment for production...
transforming... 1104 modules transformed. built in 627ms
[check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).

GREEN end to end. This matters beyond the seal: `src/components/admin/stagesRegistry.ts`
is `src/` TypeScript, so it is compiled by `tsc -b` and bundled by `vite build`,
and NEITHER of those runs under the suite.
```

```evidence:gates
package.json, read in this worktree:

  build         tsc -b && npm run typecheck:api && npm run gen:arch-facts
                && npm run check:ground && vite build && npm run check:doc-drift
  test          vitest run
  typecheck:api tsc -p tsconfig.api.json && tsc -p tsconfig.api.test.json

THE GATES `npm run build` RUNS THAT `npx vitest run` AND `npm run typecheck:api`
DO NOT — the whole answer to why a branch reported green for twelve card versions
and failed the first time CI was asked for a verdict:

  1. tsc -b            The ROOT project build. `typecheck:api` compiles only the
                       two api tsconfigs, so every line under `src/` — the admin
                       UI, including the Stage Cards registry this commit edits —
                       is type-checked HERE and nowhere else in the reported set.
  2. gen:arch-facts    Regenerates `docs/ground/facts.json`. A generator that
                       throws fails the build; the suite never invokes it.
  3. check:ground      The ground-truth contract: artifact shape, ancestry,
                       front-matter, regeneration identity, and the append-only
                       census log.
  4. vite build        The production bundle. Catches resolution and bundling
                       failures that type-checking cannot see, because a type
                       error and an unresolvable import are different faults.
  5. check:doc-drift   RULE 20's seal gate. THE step that was failing, and the
                       one no test file can reach.

Five gates. The green that was reported for twelve versions covered NONE of them,
which is why it was not a lie and was still not a verdict: `vitest` plus
`typecheck:api` is a proper subset of the build, and a subset reported as the
whole is exactly the shape of measurement this house keeps paying for.
```

```evidence:scope
$ git status --porcelain -uall        (before git add)
 M public/architecture/diagrams/agent-control-plane-blueprint.html
 M public/architecture/diagrams/architecture-map.html
 M public/architecture/diagrams/governance-model.html
 M public/architecture/diagrams/request-lifecycle.html
 M public/architecture/diagrams/runtime-topology.html
 M public/architecture/manifest.json
 M src/components/admin/stagesRegistry.ts

Nothing else. The `node_modules` symlink this worktree needed is gitignored and
does not appear.
```

```evidence:facts
$ git diff docs/ground/facts.json      (after npm run build, before the revert)
-    "commit": "388671734f7927922cf37a4cbb172e83ee276f6a",
+    "commit": "73931d5dc51f7783d639a24fdab96e4657120b69",
   "moduleCount": {
-    "value": 454,
+    "value": 455,

The run-identity fields are the ones `check:ground` names as excluded from its
regeneration equation. `moduleCount` is NOT: the value is genuinely one higher on
this branch because `api/cwf/_lib/webTools.ts` exists. The card fences this commit
to the tabs and the manifest, so the file was REVERTED rather than carried, and
the staleness is reported instead of hidden. CI regenerates the file before
`check:ground`, so the committed value is inert there — this is a debt, not a red.
```

```evidence:ci
$ gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=abda4d4452caf4a1fb105ea839ad19b9e453f3c3"

total_count: 3        (S101-L1 satisfied — the FULL forty-hex sha was used, because
                       a short sha answers total_count 0 and that reads
                       byte-identically to "CI never ran", which is ALWAYS FAILED)

  Build and Test   completed   success
  Relay corpus     completed   success
  report-schema    completed   success

Every run named with its conclusion. NONE was re-run: the first read showed all
three in_progress and the wait was a poll on the same query, never a dispatch.
`Build and Test` is the run that was FAILING at the synced head before this
commit, and it is the card's whole acceptance test.
```

## ORDER A — what the branch made untrue, per tab

The card calls this list the real deliverable, so it is a judgement with the byte
behind each line, not a formality.

**Architecture Map — UNTRUE.** The *Meta-tools / domain-agnostic primitives* node
listed two modules and exactly three functions. There are now four primitives in
three modules: `web_fetch` lives in the new `_lib/webTools.ts`. Repaired by naming
the module, the function, and the conditional mount.

**Request Lifecycle — UNTRUE.** Step 14 named three meta-tools and then said *the
MCP tools and the THREE meta-tools share ONE namespace*. A fourth is registered
whenever the valve is open. Repaired in both sentences, and the mount condition
plus the two published span fields are named.

**Runtime Topology — UNTRUE BY A MISSING EDGE.** A topology artifact that omits an
egress edge is wrong about the topology. Stage 7 can now dial one https host
through the PRE-EXISTING `net/ssrfGuard.ts` guard — reused, not re-implemented —
bounded by governed `web.timeoutMs` and `web.maxBytes`. Repaired as a new rev
entry, following the tab's own convention of recording even a no-op rev.

**Governance Model — UNTRUE BY OMISSION.** Its rev log is the record of governed
keys as they land. Three joined the reference set and one is a fail-closed valve,
which is this tab's exact subject matter. Repaired with an entry naming the keys,
the bounds, the clamp direction and why there are three keys rather than one.

**Agent Control Plane — UNTRUE BY OMISSION.** Its stamp names control surfaces and
their dark state verbatim — *the router.askOnUnresolved valve dark at 0*.
`web.enabled` is dark at 0 and publishes its decision on both sides. Repaired with
an entry that ties the both-sides emission to the plane's own article on recording
silence.

**Stage Cards — UNTRUE BY OMISSION.** Stage 07's sources enumerate what decides the
offered set, and its operator text is the answer to *why did it not use this
tool?* — an answer that can now be *the valve was shut*, with nothing saying so.
Repaired with the two governed sources and two laws.

The distinction between the first two and the last four is deliberate. A document
that says three when the answer is four is simply WRONG; a document that omits a
real edge or a real key is incomplete about a subject it claims to enumerate. Both
owe an edit. Only the first pair is a falsehood, and a reader judging these edits
needs to know which is which.

## FINDINGS — named, not repaired

**THE SILENCE DECLARATION CANNOT BE WRITTEN ON A LIVE CHANNEL.** `producer.md`
orders a lane to write `SILENT-UNTIL <iso> :: <what>` into its own
`factory_state.note` before a long turn. `writeLane`'s `opts.note` is honoured
ONLY on the legacy direct-table path, which is reached only when the coordination
verbs are ABSENT. On a window whose write channel works — the only kind that can
write a row at all — the call routes to `factory_write_lane(lane, state, nonce)`,
which has no note parameter, and the declaration is silently dropped. This lane
was therefore `UNDECLARED-SILENT` for this turn by mechanism absence rather than
by forgetting, and says so rather than letting the omission read as neglect.

**THE MODULE COUNT IS STALE ON THIS BRANCH.** See the `facts` fence. Out of this
card's scope, reverted, and handed back rather than quietly fixed.

**THE FROM-LANE BUS POST HAS NO CALLER, SO THE CARD'S LAST DELIVERABLE IS
`MECHANISM-ABSENT` RATHER THAN DONE.** ORDER C.3 orders one `from_lane` row.
`relay_post_from_lane` is DEFINED — it is created in
`20260824060000_factory_write_channel.sql`, enumerated in `scripts/verifyGrants.ts`
with the signature `(p_addr, p_artifact_name, p_body, p_nonce_sha)`, and exercised
in `factoryWriteChannel.test.ts` — but NOTHING in `scripts/` calls it, and
`callVerb`, the one function in `factoryState.mjs` that reaches the write channel,
is module-private and not exported. Two lenses agree: a search of `scripts/`, and a
whole-tree search whose only hits are the migration, the grant verifier, the test,
the boot files and prose in prior reports. Hand-rolling a direct write to
`relay_inbox` would be improvising the one path this project fences, so it was NOT
done and the gap is reported instead.
THIS DOES NOT LEAVE THE CARD UNPROVABLE, and the Architect already owns the
instrument that says so. `scripts/busDelivery.ts` classifies a card ACTED when a
name the card's own `deliverables` block declared exists on origin — "work is proof
of receipt, whatever the stamp says", written precisely because a stamp reports the
consumer's PRIVILEGES rather than the card's delivery. This card declared this
report's path; it is on origin at the pushed head. The card therefore reads ACTED
by the read-side plane, with no bus row needed and none faked.

**THE CARD'S SCOPE AND ITS DELIVERABLES DISAGREE ABOUT THIS REPORT.** The scope
block fences the commit to the tabs and the manifest and says *no file outside*
them may change; the deliverables require this report at a path inside the
repository. Both cannot hold in a single commit. This lane did not resolve the
contradiction by choosing: the reseal commit carries the fenced set and NOTHING
else, so every falsifier about that commit holds exactly as written, and the
report is a separate commit that touches no tab, no manifest and no product code.
The tension is reported for the Architect to rule on, per the stopping rule that a
card contradicting another card is named rather than silently reconciled.

## SCOPE KEPT

No pull request was opened; 517 is open on this branch and re-runs on the push. No
red run was re-run. No valve default, environment variable or flag moved. No
product code was touched — this is documents and a seal.

## DIFF

```
$ git diff --name-only origin/master...HEAD
api/cwf/__tests__/learnBrake.test.ts
api/cwf/__tests__/localToolsSsot.test.ts
api/cwf/__tests__/registerToolsSpanIO.test.ts
api/cwf/__tests__/webTools.test.ts
api/cwf/_lib/knowledge/reference/agentParams.ts
api/cwf/_lib/localTools.ts
api/cwf/_lib/turn/stageTools.ts
api/cwf/_lib/webTools.ts
docs/relay/WEB-VALVE-1-AG4-report.md
public/architecture/diagrams/agent-control-plane-blueprint.html
public/architecture/diagrams/architecture-map.html
public/architecture/diagrams/governance-model.html
public/architecture/diagrams/request-lifecycle.html
public/architecture/diagrams/runtime-topology.html
public/architecture/manifest.json
src/components/admin/stagesRegistry.ts
```

That listing is the whole branch against master. THIS card's commit is the last
seven paths of it — the narrative tabs and the seal they owe, together. Everything
above them is the web valve build itself, landed under the earlier card and
untouched here.
