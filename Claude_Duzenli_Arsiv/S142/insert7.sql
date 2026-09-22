with c as (select $q$<!-- relay-audit: v1 kind=card -->
CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1

LANE: AG-4
fanout: personalized
A MEASUREMENT card, plan v2 item P1-1 (A23 §9-1), ordered BEHIND the wiring by OWNER-APPROVAL-S140-A23-WIRING-FIRST-1 and behind the tool-argument card by OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 — both are on master now, so this is next. The instruments EXIST (§12.6: grep for the consumer before building): `scripts/a23BaselineArmA.ts` (arm A, keyword core over a frozen word-map, four synthetic corpora, exact full-set category recall at an inert cutoff), `api/cwf/_lib/replay/routerAbLens.ts` `runRouterAbExperiment` (live specimens newest-first, arm A vs arm B, N reps, offered-set width and divergence; C1 held — its only write is its own replay_audit row) and `api/cwf/_lib/replay/toolRetrievalRecall.ts` (arm B recall, fenced on `corpusComplete`). Nothing is built here. Two trees are measured — the fork point of PR 573 (BEFORE the ⑤/⑥ wiring) and current master (AFTER 573, 574, 575, 576, 577) — and the answer is ONE number per instrument per tree, reported side by side. No code change, no master push, no spend approval (a measurement on a branch ref or a local run is not a master push, §5 S133 addition).

PRECONDITION: `origin/master` is at or beyond the head in `the-head`; both instruments are present at both trees; `git cat-file -t` on the pre-wiring tree returns `commit` in the shared clone. If an instrument is absent at the older tree, that tree's number is UNMEASURED with the reason, not zero.

```evidence:the-head
master (after)     d29935c1b87ce3878061061556689dc67006e411   merge of PR 577, 2026-09-17T05:58:46Z, read from the shared clone's origin ref at 06:18:12Z
fork of 573 (before) 4c6df852f7a9b135ba92986f428387bf73458239   merge of PR 572, 2026-09-16T08:56:23Z — the tree BEFORE ⑤/⑥ were wired; `git cat-file -t` = commit in the shared clone at 06:18:12Z
arm A instrument   scripts/a23BaselineArmA.ts — routeKeywordLayer over FROZEN_WORD_MAP (empty learned slice), corpora v1 · v2 · v3 · line1, scoreRecallCatAtK at K_INERT (never truncates), prints per-corpus and overall meanRecallCat; no DB client, no writer (its own header)
live instrument    api/cwf/_lib/replay/routerAbLens.ts:330 runRouterAbExperiment(request { n, reps }, deps = PRODUCTION_DEPS) → RouterAbEvidence — specimens newest-first, arm A (keyword) vs arm B (semantic router), reps bounded by ROUTER_AB_ARM_B_REPS; reached through api/admin/replay.ts mode 'router-ab' (adminGuard authed + ensurePermission; :545-552), which writes ONLY its own replay_audit row
arm B recall       api/cwf/_lib/replay/toolRetrievalRecall.ts — recall returns null with withheldReason unless corpusComplete: true is passed (F-S110-DIGEST-PGRST-404 fence)
```

## PREMISE

MEASURED: both trees, both instruments and the admin route in `the-head`, by `git cat-file`, `git log`, `sed`/`grep` over the shared clone at 2026-09-17T06:18:12Z.
MEASURED: OWNER-APPROVAL-S140-A23-WIRING-FIRST-1 and OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 — the ordering; the plan v2 status table carries P1-1 as NOT DONE.
UNMEASURED: whether a lane holds a credential that passes `adminGuard` for the 'router-ab' route; ORDER 2 measures it and prints the third value if not.
UNMEASURED: whether the tool corpus is complete today (the arm-B recall fence); ORDER 3 measures it and withholds the number if not — a withheld number is a reading, not a failure.
SELF-INVALIDATION: this premise dies if `origin/master` moves by a commit touching scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/routerAbLens.ts, toolRetrievalRecall.ts or toolCategories.ts, or if a v2 appears.

## ORDERS

ORDER 1 - ARM A ON BOTH TREES. In two clean worktrees (S61-1: not a stash), one at the pre-wiring commit and one at master, run `npx tsx scripts/a23BaselineArmA.ts` and capture stdout verbatim. Print, per tree: catalog categories, corpus rows, per-corpus meanRecallCat and the overall line. If the two outputs are byte-identical, say so — arm A is code-only and the wiring did not touch toolCategories.ts; an identical pair is the expected reading and still a measurement.

ORDER 2 - THE LIVE ROUTER A/B ON THE CURRENT PRODUCTION (after-tree only; the before-tree cannot be replayed live). Through the repository's own route — `api/admin/replay.ts` mode 'router-ab' — with n = the instrument's ROUTER_AB_SPECIMEN_COUNT ceiling and reps = ROUTER_AB_ARM_B_REPS, against production. Print the aggregate the route returns (offered-set width per arm, coverage, divergence onlyInA/onlyInB, token estimate) verbatim, and the replay_audit row id it wrote. If the route needs a credential this lane does not hold: print that as `UNMEASURED: <the refusal verbatim>`, do not route around it (§6 fences), and stop at ORDER 1's numbers — the Architect rules on the credential.

ORDER 3 - ARM B RECALL, FENCED. Call `toolRetrievalRecall` as its header says: with `corpusComplete` set ONLY if you have measured the tool corpus complete today (print the count you measured against the count the instrument expects). If not complete, the number is withheld and you print `withheldReason` — that is the reading.

ORDER 4 - ONE REPORT, NO CODE. `docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md` on a branch off current master with the three readings side by side (before/after for arm A; after only for the live A/B; arm B recall or its withheld reason), the commands and instants, and the two worktrees' heads. No source file changes; if the manifest maps docs/relay it does not (check:doc-drift will say). PR, slip with the forty-hex head and CI as you read it. This landing is docs/relay-only.

## FALSIFIER

If arm A's two outputs DIFFER, STOP and print the diff — toolCategories.ts or a corpus moved between the trees and the "before" is not the before this card names. If the 'router-ab' route WRITES anything but its own replay_audit row (C1), STOP and print the write. If the tool corpus count you measure differs from what the fence expects, print both and withhold.

## SHARED SURFACES

```scope
- docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md (new)
- public/architecture/manifest.json (only if docs/relay is mapped — reseal, same commit)
```

No source change, no migration, no master push beyond the docs/relay landing, no schema read beyond what the instruments already do.

## DECISION RIGHTS

You choose the worktree paths and how you invoke the admin route (a local server against production env, or the deployed route with a lane credential) — print which. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| both trees present, both instruments present, the admin route and its guard | MEASURED: git cat-file/log and sed/grep over the shared clone at 2026-09-17T06:18:12Z | the-head |
| the ordering rulings | MEASURED: OWNER-APPROVAL-S140-A23-WIRING-FIRST-1, OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 in the project box | the-head |
| the numbers | NOT-READ | ORDERS 1-3 measure them |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/routerAbLens.ts, toolRetrievalRecall.ts or toolCategories.ts, or if a v2 appears.
$q$::text as body), o as (select $q$<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1

LANE: scout

Adversary review of CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1; digests in `raw-tokens`). A MEASUREMENT card for AG-4 — plan v2 item P1-1, the A23 §9-1 baseline — on a NEW subject, so it goes to you (§12.1). It builds nothing: it runs three instruments that already exist in the tree at two trees (the pre-wiring fork of PR 573 and current master) and lands ONE docs/relay report.

DISCRIMINATORS, measure each and print what you measured:
(1) `git ls-remote origin refs/heads/master` NOW versus the card's `the-head`; `git cat-file -t` on the pre-wiring commit in `the-head`. If master moved by a commit touching scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/routerAbLens.ts, toolRetrievalRecall.ts or toolCategories.ts, RED with the commit — the card's DECAYS clause fires.
(2) The three instruments the card names: confirm each file exists at BOTH trees (`git cat-file -e <tree>:<path>`), and that `runRouterAbExperiment` is exported from routerAbLens.ts and reached by api/admin/replay.ts mode 'router-ab' behind adminGuard at master. If any instrument is ABSENT at the older tree, that is not RED — confirm the card says UNMEASURED-with-reason for that cell (PRECONDITION, last sentence) and print which.
(3) C1: read the 'router-ab' branch of api/admin/replay.ts and routerAbLens.ts for any write other than its own replay_audit row. If you find one, RED with the line — the FALSIFIER says STOP but a known write should not reach the lane as a surprise.
(4) The arm-B fence: confirm toolRetrievalRecall returns null with withheldReason unless corpusComplete is passed, as the card claims; print the lines.
(5) ORDER 2's credential: the card says a lane may not hold an adminGuard credential and orders the lane to print the refusal and stop rather than route around it. Confirm the text says so. Do not measure the credential yourself.
(6) TENANT lens over the card body — no factory or line name; the corpora names (v1 · v2 · v3 · line1) are file identifiers in the tree.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T06:20:56Z, no refusal met while authoring.

```evidence:raw-tokens
card md5        87c31c6f2b8d1f6d08dcefa1e168c4af
card sha256     d12fe9b672c823d18c8bb76df752f91186a092e2e1bc9059a206b4eff07821ea
card bytes      7431
master          d29935c1b87ce3878061061556689dc67006e411
pre-wiring      4c6df852f7a9b135ba92986f428387bf73458239
```
$q$::text as body)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout','BYTES-FOR-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1', c.body from c
 where md5(c.body)='87c31c6f2b8d1f6d08dcefa1e168c4af' and encode(sha256(convert_to(c.body,'UTF8')),'hex')='d12fe9b672c823d18c8bb76df752f91186a092e2e1bc9059a206b4eff07821ea' and octet_length(c.body)=7431
union all
select 'to_lane','scout','ORDER-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1', o.body from o
 where md5(o.body)='8587d46da7fbc412305790beb696d5e3' and encode(sha256(convert_to(o.body,'UTF8')),'hex')='72321ab48da6b9b8c6fbe1aa42677afbbc0fa673ef269dc717df19ec50d32379' and octet_length(o.body)=2750
returning id, artifact_name, md5(body), octet_length(body), created_at;