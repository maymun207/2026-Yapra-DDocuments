<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-WEB-VALVE-1-S132-1 · v2 — the same valve, amended on the branch that already carries v1's build, with the scout's six FAIL amendments taken verbatim
lane: AG-4
report: docs/relay/WEB-VALVE-1-AG4-report-v2.md
fanout: personalized

v1 was reviewed by the scout as Adversary AFTER the producer had acted on it — the Architect's defect, A-REC-S132-5 — and the verdict was FAIL on one killing sentence: the card claimed "no redirects beyond the guard's own handling" and the guard has no redirect handling; `makeSsrfGuardedFetch` checks hop 0 and hands the rest to plain `fetch`, which follows a `302 Location: http://169.254.169.254/` unchecked. Your v1 build (report 11:24Z: 710 files green, ten offline tests, valve closed at the floor, panel needs no change, two scope extensions named) stands on `phase/web-valve-1-s132-1` and is NOT discarded: v2 amends that branch. The six amendments below are the scout's sentences, unedited; the scope extensions you named in v1 are now IN scope by name.

## PREMISE
- MEASURED: 2026-09-07T11:29:43Z — scout row `ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report`, VERDICT: FAIL; five instrument blobs re-measured equal to v1's fence; PREMISE grep re-run, no hit, positive control 17 files; origin/master at the scout's read equal to v1's `master-read` fence.
- MEASURED: 2026-09-07T11:24:22Z — your v1 report: branch `phase/web-valve-1-s132-1` carries `webTools.ts`, `webTools.test.ts`, edits to `agentParams.ts`, `localTools.ts`, `stageTools.ts`, `localToolsSsot.test.ts`, and the two out-of-fence tests `learnBrake.test.ts`, `registerToolsSpanIO.test.ts`; `npx vitest run` 710 files / 10406 passing / 4 expected-fail; `npm run typecheck:api` clean; `docs/ground/facts.json` moduleCount 454→455 reverted, not committed; PR open, not merged.
- MEASURED: 2026-09-07T11:29Z by the scout's read of the tree (relayed here; re-measure before relying) — `MAX_TOOL_RESULT_CHARS = 40000` at `toolResult.ts:72` with the cut recorded as `charCut` at `:627`; `resolveStage11` at `stageContextSlice.ts:425` unions `LOCAL_TOOL_NAMES` into the offered set; `stageTools.ts:306` seeds every `LOCAL_TOOL_NAMES` entry into `toolNameClaims` on every turn; `ctx.networkTime` is captured once per turn at `turn/types.ts:271`; `routeShadowLens.ts:841` and `:1079` state in prose that `LOCAL_TOOL_NAMES` are registered on every turn; `toolNameCollision.test.ts:225-230` asserts on the SSOT length.
- UNMEASURED: whether `fetch` with `redirect: 'manual'` exposes the `Location` header uniformly across the runtime the gateway uses (read the installed undici/Node source, not the docs — §10); whether `resultCut` can be set from inside the tool handler or must be joined from `toolResult.ts`'s `charCut` (choose the seam, cite it).
- ON-DISAGREEMENT: if `git rev-parse origin/master:<path>` for the five v1 instrument paths differs from v1's fence → STOP and report (master landing something in these files means v1's premise is gone). If any scout line-number claim above is false on read → report the true line and continue; the claim, not the card, is corrected. If `redirect: 'manual'` cannot expose `Location` in the installed runtime → STOP after ORDER A, report the source line that proves it.
- DECAYS when any of the five instrument blobs changes on master, or when a `web.*` key appears in `domain_rules`, or when a `RELEASE`/`HOLD` row for this card name appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the scout's verdict and the six amendments this card carries verbatim | MEASURED: bus row from_lane scout, 11:29:43Z, read whole | verdict |
| the five instrument blobs, unchanged since v1 | MEASURED: scout ORDER A.2 re-measurement at 11:29Z, equal to v1's fence line for line | instrument |
| the current state of the branch | MEASURED: your v1 report, DIFF section | branch |
| the runtime's redirect:'manual' behaviour | NOT-READ | ORDER A.3 |
| the seam for resultCut | NOT-READ | ORDER A.3 |

```evidence:verdict
VERDICT: FAIL — "The guard has NO redirect handling. makeSsrfGuardedFetch validates the URL it is handed then calls baseFetch(input, init) - plain fetch, which follows redirects by default. Hops 1..N are dialled with NO IP check and NO https check."
```

```evidence:instrument
a634bbac165633a9c0c9eabe989601a295d2ecc0 api/cwf/_lib/localTools.ts
ecf8ad7dcbfdc0d14dd5ae0b7e2ca2c8e6144a32 api/cwf/_lib/net/ssrfGuard.ts
ea872702a086665fd94cfbb9d1774f23a44689df api/cwf/_lib/turn/stageTools.ts
68bfaaf5e07cdbd1f5839d433597ba17707f0fde api/cwf/_lib/timeTools.ts
9862bf0aaf21d1a29f0a23d4aba35b30806baa90 api/cwf/_lib/knowledge/reference/agentParams.ts
```

```evidence:branch
phase/web-valve-1-s132-1 — nine files vs origin/master per the v1 report DIFF: three test edits, three source edits, two new modules, one report; pull request open, unmerged
```

## SCOPE
```scope
- cwf_yaprak: the SAME branch phase/web-valve-1-s132-1 and the SAME pull request, amended by further commits; files in scope: api/cwf/_lib/webTools.ts, api/cwf/__tests__/webTools.test.ts, api/cwf/_lib/localTools.ts, api/cwf/_lib/turn/stageTools.ts, api/cwf/_lib/knowledge/reference/agentParams.ts, api/cwf/__tests__/localToolsSsot.test.ts, api/cwf/__tests__/learnBrake.test.ts, api/cwf/__tests__/registerToolsSpanIO.test.ts, api/cwf/__tests__/toolNameCollision.test.ts, api/cwf/_lib/replay/routeShadowLens.ts (prose comments at :841 and :1079 only, and only if they become false), api/cwf/_lib/turn/types.ts (only if a type for the valved set is needed), api/cwf/_lib/toolResult.ts (only if resultCut must be joined there); the new report at the header path; nothing else
- AMENDMENT 1 (replaces v1's tool sentence): one tool, web_fetch { url: string } - https only, GET only, redirect manual: the handler follows at most 3 hops itself, calling assertPublicHttpsUrl on each hop Location before dialling it, returning error class redirect-blocked when a hop fails or the limit is exceeded; a test drives a 302 chain whose second hop is 169.254.169.254 and asserts that hop is never fetched.
- AMENDMENT 2 (added): web_fetch is registered conditionally, so it is NOT added to LOCAL_TOOL_NAMES; introduce VALVED_LOCAL_TOOL_NAMES for the replay containment union and leave LOCAL_TOOL_NAMES meaning exactly the always-mounted set, so no name is reserved against an MCP server on a turn where no local tool serves it.
- AMENDMENT 3 (replaces v1's panel sentence): no panel file is touched: A.3 measured that AGENT_PARAM_SEEDS is derived from the registry and the panel reaches a new key through referencePoolFor, so a code-floor registration is publishable as-is.
- AMENDMENT 4 (added): web.maxBytes floor is 32768, at or under the per-call MAX_TOOL_RESULT_CHARS of 40000, and the output carries resultCut:true whenever the result path cut the body, so truncated and resultCut together describe both axes and no drop is silent.
- AMENDMENT 5 (replaces v1's fetchedAt sentence): fetchedAt is the instant of THIS fetch, taken at the call, never ctx.networkTime - that Date is captured once per turn (types.ts:271) and would stamp every fetch in a turn with one identical time, making the citation false.
- AMENDMENT 6 (added to the F2 binding): the tool description must require, and one test must assert on a recorded turn, that any answer sentence resting on fetched content names the url and the fetchedAt of the fetch it rests on.
- unchanged from v1: three governed keys web.enabled (floor 0) · web.timeoutMs (floor 5000) · web.maxBytes (floor now 32768 per AMENDMENT 4), sessionTweakable:false, stage "07" (the scout confirmed "07" is correct); code floors only; NO publish, NO domain_rules write, NO migration; valve CLOSED at landing; FULL-TRACE through the existing path; no secret, no env variable, no provider, no web_search
- replay containment: resolveStage11 unions VALVED_LOCAL_TOOL_NAMES ONLY for turns whose stage-07 figure recorded webOffered:true; a recorded web_fetch call on a turn with webOffered:false is a containment VIOLATION, not offered:true — this closes the scout's B.9 blinding
- bus: one from_lane row WEB-VALVE-1-AG4-report-v2, posted once
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; act on any earlier row first. This card is released only by a `RELEASE-WEB-VALVE-1-S132-1` row naming v2; if that row is absent, the HOLD stands and you stop here.
2. `git fetch origin`; the five instrument blobs vs the fence, else ON-DISAGREEMENT; `git log --oneline origin/master..phase/web-valve-1-s132-1` printed so v1's commits are named.
3. Read whole: `ssrfGuard.ts` (the guard has no redirect step — confirm), `toolResult.ts` around `MAX_TOOL_RESULT_CHARS` and `charCut`, `stageContextSlice.ts` around `resolveStage11`, `stageTools.ts:306` claim seeding, `turn/types.ts:271`, `routeShadowLens.ts:841` and `:1079`, `toolNameCollision.test.ts:225-230`; the installed runtime's redirect:'manual' handling in its OWN source under node_modules (name the file). Every scout line number is re-measured and printed; a wrong one is corrected in the report, not silently.

## ORDER B — THE AMENDMENTS, each with its falsifying test
1. Redirects (A1): `redirect: 'manual'` on every hop; on 301/302/303/307/308 read `Location`, resolve against the current URL, `assertPublicHttpsUrl` on it, then dial; hop count ≤ 3 else `redirect-blocked`; any non-https Location → `redirect-blocked`. Test: a 302 chain whose second hop is `169.254.169.254`, injected fetch records every dialled URL, assert the metadata address is NEVER in the list and the result is `reason: 'redirect-blocked'`. Second test: three lawful hops succeed, a fourth is refused.
2. SSOT split (A2): `LOCAL_TOOL_NAMES` returns to exactly the always-mounted set (remove `web_fetch`; delete `UNCONDITIONAL_LOCAL_TOOL_NAMES` if it is now redundant, or keep it as an alias only if a consumer needs it — say which); new export `VALVED_LOCAL_TOOL_NAMES = ['web_fetch']`; claim seeding at `stageTools.ts:306` seeds ONLY the always-mounted set plus the valved names that are ACTUALLY mounted this turn; `resolveStage11` unions valved names only when the recorded stage-07 figure says `webOffered:true`. Tests: at valve 0 an MCP tool named `web_fetch` is NOT refused by the claim registry; at valve 1 it IS; a recorded `web_fetch` call on a `webOffered:false` turn is a containment violation; `registerToolsSpanIO`, `localToolsSsot`, `toolNameCollision` assertions restated on the always-mounted set and green.
3. Panel (A3): no panel file; the report cites `referencePoolFor` and `AGENT_PARAM_SEEDS` derivation lines as the proof.
4. Result cap (A4): `web.maxBytes` floor 32768, bounds `[8192, 40000]`; output field `resultCut` — set from the seam you choose in A.3 (either the handler measures its serialised JSON against `MAX_TOOL_RESULT_CHARS` and sets the flag before returning, or the flag is joined from `charCut`); test: a body whose serialised result exceeds 40000 chars yields `resultCut:true` and the stored result is the cut one, with `truncated` still reporting the FETCH axis independently.
5. Clock (A5): `fetchedAt = new Date().toISOString()` at the call inside the handler; the injected clock in tests is per-call; test: two fetches in one turn carry two different `fetchedAt` values when the injected clock advances.
6. F2 contract (A6): tool description (TR + EN) REQUIRES that any answer sentence resting on fetched content name the url and fetchedAt; one test drives a recorded turn fixture through the answer path with a `web_fetch` result present and asserts the citation shape `[url · fetchedAt]` appears in the answer text, and asserts its ABSENCE is flagged by whatever attribution check exists at master (read `grounding/` for the existing attribution seam; if none applies to local tools, say so and the test asserts the description text carries the requirement verbatim — the weaker proof, named as weaker).
7. `routeShadowLens.ts` prose at `:841`/`:1079`: if the sentences are now false, correct the comment text only; no logic change.
8. Full `npx vitest run` and `npm run typecheck:api`; counts printed; `docs/ground/facts.json` regenerated by the suite is REVERTED again and the moduleCount named (known debt, ground-doc refresh is a separate card).

## ORDER C — THE REPORT
1. `docs/relay/WEB-VALVE-1-AG4-report-v2.md`, grammar v1, `auditText` locally `violations: 0` before push; the six amendments each with the test that falsifies it; every scout line number as re-measured; the new success and redirect-blocked shapes in an anchored fence (v1 taught us the unanchored form reddens on the digest — the card's own defect, fixed here).
2. Commit on the same branch, push, the same pull request; do NOT merge. Post ONE from_lane row `WEB-VALVE-1-AG4-report-v2`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any hop beyond hop 0 is dialled without `assertPublicHttpsUrl`; wrong if `web_fetch` is in `LOCAL_TOOL_NAMES`; wrong if an MCP tool named `web_fetch` is refused at valve 0; wrong if a recorded `web_fetch` on a `webOffered:false` turn passes containment; wrong if `fetchedAt` comes from `ctx.networkTime`; wrong if a result can be cut by `MAX_TOOL_RESULT_CHARS` without `resultCut:true`; wrong if the tool description does not carry the citation requirement in both languages; wrong if any file outside the scope list is written; wrong if a test touches the network; wrong if the PR is merged by you; wrong if the valve is open at landing.

## SHARED SURFACES
cwf_yaprak: the existing branch and PR, files as listed. Bus: one row. Database, secrets, production: untouched. Landing: Architect landing card + owner's named approval, after this report.

## DECISION RIGHTS
None. The `resultCut` seam and the redirect implementation details are yours within AMENDMENT 1 and 4; everything else is fixed by the scout's sentences.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report (VERDICT FAIL, six amendments) · CARD-WEB-VALVE-1-S132-1-v1 and its AG-4 report · NOTICE-HOLD-WEB-VALVE-1-S132-1 · A-REC-S132-5 · cwf-sota-definition-v1_5 Tier F (F2) · OWNER-RULING-S126-VALVES-AND-A-ITEMS-1 · ADR-002 · ADR-005 v2 · FULL-TRACE · partial ≠ complete · S37-1 · TOTAL-45.

```deliverables
five instrument blobs equal to the fence; v1's commits named
redirect manual with per-hop assertPublicHttpsUrl, ≤3 hops, redirect-blocked class; metadata-address chain test proves the hop is never dialled
LOCAL_TOOL_NAMES = always-mounted set only; VALVED_LOCAL_TOOL_NAMES; claim seeding and stage-11 containment conditional on the recorded webOffered figure; four tests
no panel file; referencePoolFor / AGENT_PARAM_SEEDS lines cited
web.maxBytes floor 32768 bounds [8192, 40000]; resultCut flag with its test
fetchedAt per call; two-fetch test
citation requirement in the description (TR+EN) and its test, weaker form named if the attribution seam does not reach local tools
every scout line number re-measured and printed
npx vitest run and typecheck:api green, counts printed; facts.json reverted, moduleCount named
docs/relay/WEB-VALVE-1-AG4-report-v2.md on the same branch, auditText violations: 0, same PR open, not merged
bus row from_lane WEB-VALVE-1-AG4-report-v2, posted once
```

TAIL ANCHOR: CARD-WEB-VALVE-1-S132-1-v2 ends here.
