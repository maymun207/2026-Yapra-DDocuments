<!-- relay-audit: v1 kind=card -->
CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2

LANE: AG-4
fanout: personalized
A MEASUREMENT card — v2 of the card the scout REDded on discriminator 3 (row named in `raw-tokens`): v1 claimed the 'router-ab' route "writes ONLY its own replay_audit row" and its own FALSIFIER would have stopped the lane on a write the tree documents as routine. Nothing else changed; the scout's other five discriminators passed at the same trees. Plan v2 item P1-1 (A23 §9-1), ordered BEHIND the wiring by OWNER-APPROVAL-S140-A23-WIRING-FIRST-1 and behind the tool-argument card by OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 — both are on master now, so this is next. The instruments EXIST (§12.6: grep for the consumer before building): `scripts/a23BaselineArmA.ts` (arm A, keyword core over a frozen word-map, four synthetic corpora, exact full-set category recall at an inert cutoff), `api/cwf/_lib/replay/routerAbLens.ts` `runRouterAbExperiment` (live specimens newest-first, arm A vs arm B, N reps, offered-set width and divergence; the lens module itself writes nothing; the ROUTE that reaches it writes its own replay_audit row AND reserves/settles the shared user token-quota ledger — see `the-head`) and `api/cwf/_lib/replay/toolRetrievalRecall.ts` (arm B recall, fenced on `corpusComplete`). Nothing is built here. Two trees are measured — the fork point of PR 573 (BEFORE the ⑤/⑥ wiring) and current master (AFTER 573, 574, 575, 576, 577) — and the answer is ONE number per instrument per tree, reported side by side. No code change, no master push, no master-push spend approval (a measurement on a branch ref or a local run is not a master push, §5 S133 addition). ORDER 2 IS a paid run: arm B calls the semantic router, and the route reserves against the governed router-ab token ceiling on the CALLING user's quota and settles the measured total — the spend is bounded by that ceiling, and whose quota it is is printed.

PRECONDITION: `origin/master` is at or beyond the head in `the-head`; both instruments are present at both trees; `git cat-file -t` on the pre-wiring tree returns `commit` in the shared clone. If an instrument is absent at the older tree, that tree's number is UNMEASURED with the reason, not zero.

```evidence:the-head
master (after)     d29935c1b87ce3878061061556689dc67006e411   merge of PR 577, 2026-09-17T05:58:46Z, read from the shared clone's origin ref at 06:18:12Z
fork of 573 (before) 4c6df852f7a9b135ba92986f428387bf73458239   merge of PR 572, 2026-09-16T08:56:23Z — the tree BEFORE ⑤/⑥ were wired; `git cat-file -t` = commit in the shared clone at 06:18:12Z
arm A instrument   scripts/a23BaselineArmA.ts — routeKeywordLayer over FROZEN_WORD_MAP (empty learned slice), corpora v1 · v2 · v3 · line1, scoreRecallCatAtK at K_INERT (never truncates), prints per-corpus and overall meanRecallCat; no DB client, no writer (its own header)
live instrument    api/cwf/_lib/replay/routerAbLens.ts:330 runRouterAbExperiment(request { n, reps }, deps = PRODUCTION_DEPS) → RouterAbEvidence — specimens newest-first, arm A (keyword) vs arm B (semantic router), reps bounded by ROUTER_AB_ARM_B_REPS; reached through api/admin/replay.ts mode 'router-ab' (adminGuard authed + ensurePermission REPLAY_RUN; :488, :495-496, :552); the branch writes its OWN replay_audit row AND the shared token-quota ledger: `new UserQuotasRepository()` :561 · `quotas.reserve(ctx.userId, await resolveRouterAbTokenCeiling())` :566 · `quotas.settle(ctx.userId, gate.reserved, evidence.tokenEstimate.total)` :584 · error path `quotas.settle(ctx.userId, gate.reserved, 0)` :602 · `forceFlushObservability()` :597/:615; its own comment :549-551 says exactly this; routerAbLens.ts :346 never writes agent_params — read at master 06:27:15Z after the scout's RED
scout's diff       git diff --stat between the two trees over the five files (arm A script, routerAbLens, toolRetrievalRecall, toolCategories, api/admin/replay.ts) EMPTY, and git log between them over the DECAYS paths EMPTY — the scout's measurement in its RED row, ~06:23Z
arm B recall       api/cwf/_lib/replay/toolRetrievalRecall.ts — recall returns null with withheldReason unless corpusComplete: true is passed (F-S110-DIGEST-PGRST-404 fence)
```

## PREMISE

MEASURED: both trees, both instruments and the admin route in `the-head`, by `git cat-file`, `git log`, `sed`/`grep` over the shared clone at 2026-09-17T06:18:12Z; the route's quota write re-read at master 06:27:15Z. The scout measured (its RED row): the five files are byte-identical between the two trees (`git diff --stat` empty) and no commit between them touches the DECAYS paths.
MEASURED: OWNER-APPROVAL-S140-A23-WIRING-FIRST-1 and OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 — the ordering; the plan v2 status table carries P1-1 as NOT DONE.
UNMEASURED: whether a lane holds a credential that passes `adminGuard` for the 'router-ab' route; ORDER 2 measures it and prints the third value if not.
UNMEASURED: whether the tool corpus is complete today (the arm-B recall fence); ORDER 3 measures it and withholds the number if not — a withheld number is a reading, not a failure.
SELF-INVALIDATION: this premise dies if `origin/master` moves by a commit touching scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/routerAbLens.ts, toolRetrievalRecall.ts or toolCategories.ts, or if a v3 appears.

## ORDERS

ORDER 1 - ARM A ON BOTH TREES. In two clean worktrees (S61-1: not a stash), one at the pre-wiring commit and one at master, run `npx tsx scripts/a23BaselineArmA.ts` and capture stdout verbatim. Print, per tree: catalog categories, corpus rows, per-corpus meanRecallCat and the overall line. If the two outputs are byte-identical, say so — arm A is code-only and the wiring did not touch toolCategories.ts; an identical pair is the expected reading and still a measurement.

ORDER 2 - THE LIVE ROUTER A/B ON THE CURRENT PRODUCTION (after-tree only; the before-tree cannot be replayed live). Through the repository's own route — `api/admin/replay.ts` mode 'router-ab' — with n = the instrument's ROUTER_AB_SPECIMEN_COUNT ceiling and reps = ROUTER_AB_ARM_B_REPS, against production. Print the aggregate the route returns (offered-set width per arm, coverage, divergence onlyInA/onlyInB, token estimate) verbatim, the replay_audit row id it wrote, AND the quota gate: `gate.reserved` (the ceiling reserved on the calling user's quota) and the value settled — with WHICH user's quota was charged. Those two writes (replay_audit + user quota reserve/settle) are the route's documented writes and are NOT a C1 breach. If the route needs a credential this lane does not hold: print that as `UNMEASURED: <the refusal verbatim>`, do not route around it (§6 fences), and stop at ORDER 1's numbers — the Architect rules on the credential.

ORDER 3 - ARM B RECALL, FENCED. Call `toolRetrievalRecall` as its header says: with `corpusComplete` set ONLY if you have measured the tool corpus complete today (print the count you measured against the count the instrument expects). If not complete, the number is withheld and you print `withheldReason` — that is the reading.

ORDER 4 - ONE REPORT, NO CODE. `docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md` on a branch off current master with the three readings side by side (before/after for arm A; after only for the live A/B; arm B recall or its withheld reason), the commands and instants, and the two worktrees' heads. No source file changes; if the manifest maps docs/relay it does not (check:doc-drift will say). PR, slip with the forty-hex head and CI as you read it. This landing is docs/relay-only.

## FALSIFIER

If arm A's two outputs DIFFER, STOP and print the diff — toolCategories.ts or a corpus moved between the trees and the "before" is not the before this card names. If the 'router-ab' route WRITES anything but its own replay_audit row and the user token-quota reserve/settle named in `the-head` (C1 — router_proposals and agent_params above all), STOP and print the write. If the settled total exceeds `gate.reserved`, STOP and print both — the clamp at :580 says it cannot. If the tool corpus count you measure differs from what the fence expects, print both and withhold.

## SHARED SURFACES

```scope
- docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md (new)
- public/architecture/manifest.json (only if docs/relay is mapped — reseal, same commit)
- public.replay_audit (ONE row, by the route)
- the calling user's token quota (reserve + settle, by the route, bounded by the governed router-ab ceiling)
```

No source change, no migration, no master push beyond the docs/relay landing, no schema read beyond what the instruments already do.

## DECISION RIGHTS

You choose the worktree paths and how you invoke the admin route (a local server against production env, or the deployed route with a lane credential) — print which. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| both trees present, both instruments present, the admin route and its guard | MEASURED: git cat-file/log and sed/grep over the shared clone at 2026-09-17T06:18:12Z | the-head |
| the route's two writes (replay_audit + quota reserve/settle) | MEASURED: git show at master, 2026-09-17T06:27:15Z, after the scout's RED | the-head |
| the five files byte-identical across the trees | MEASURED: the scout's git diff --stat over the two trees, in its RED row | the-head |
| the ordering rulings | MEASURED: OWNER-APPROVAL-S140-A23-WIRING-FIRST-1, OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 in the project box | the-head |
| the numbers | NOT-READ | ORDERS 1-3 measure them |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/routerAbLens.ts, toolRetrievalRecall.ts or toolCategories.ts, or if a v3 appears.

```evidence:raw-tokens
scout RED on v1     fa978113-8486-41e0-9bf6-4be73e732504
v1 bytes row        a2fd4fd2-df3f-45a1-aa64-4a564da009cb
```
