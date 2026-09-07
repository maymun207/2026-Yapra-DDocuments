<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-WEB-VALVE-1-S132-1 · v3 — v2 plus the scout's second verdict: AMENDMENTS 7–11 taken verbatim; the false "recorded stage-07 figure" premise removed; F2 measured through the grounding seam, in scope by name
lane: AG-4
report: docs/relay/WEB-VALVE-1-AG4-report-v3.md
fanout: personalized

v2 carried the scout's six amendments character-for-character (verified 372/298/199/240/223/189) and was FAILED on ONE sentence the Architect added on his own: containment conditional on a "recorded stage-07 figure". There is no such record — `resolveStage07` is status `rebuilt` over today's live routing and `RecordedTurn` (recordedTurn.ts:41-66) carries no offered set; a producer would have had to author the missing premise, and the nearest improvisation (re-deriving from today's `web.enabled`) would flip historical verdicts whenever the owner toggles the valve. v3 replaces that sentence with AMENDMENT 7 and takes 8–11. AMENDMENT 10's scope extension is ACCEPTED: F2's verifiability axis is measured through the grounding seam or it is named UNMEASURED — the Architect chooses measured. Your v1 build stands on `phase/web-valve-1-s132-1`; v3 amends that branch. The foreman's 12:04Z pass printed `gh pr list --state open → []`, so the PR for this branch is no longer open: ORDER A measures its state and reopens or re-creates it on the SAME branch.

## PREMISE
- MEASURED: 2026-09-07T11:51:38Z — scout row `ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v2`, VERDICT: FAIL on one sentence; six amendments EQUAL; five blobs equal; origin/master unmoved at the scout's read; findings B.1–B.4 and AMENDMENTS 7–11 (carried below verbatim). Earlier: 11:29:43Z scout v1 verdict FAIL with AMENDMENTS 1–6.
- MEASURED: 2026-09-07T12:04:52Z — AG-5 report LAND-MA-RERUN-RUNNER: master is now the merge of PR 514; `gh pr list --state open` → `[]` — the WEB-VALVE-1 pull request is NOT open (closed by whom and when: NOT-READ; the branch state: NOT-READ).
- MEASURED: 2026-09-07T11:24:22Z — your v1 report: branch `phase/web-valve-1-s132-1` carries `webTools.ts`, `webTools.test.ts`, edits to `agentParams.ts`, `localTools.ts`, `stageTools.ts`, `localToolsSsot.test.ts`, and the two out-of-fence tests `learnBrake.test.ts`, `registerToolsSpanIO.test.ts`; `npx vitest run` 710 files / 10406 passing / 4 expected-fail; `npm run typecheck:api` clean; `docs/ground/facts.json` moduleCount 454→455 reverted, not committed; PR open, not merged.
- MEASURED: 2026-09-07T11:29Z and 11:51Z by the scout's reads of the tree (relayed; re-measure before relying) — `MAX_TOOL_RESULT_CHARS = 40000` at `toolResult.ts:72`, the non-array fallback char cap at `:620` (`raw.length`, the site of defect #75), cut recorded as `charCut` at `:627`; `ToolResultMeta` keyed on toolName at `grounding/types.ts:59`; `ctx.toolResultMetas` reaches `GroundingInput.toolResults` at `stageStream.ts:112`; `parseToolResultMeta` is called ONLY at `stageTools.ts:1713` inside the MCP branch, the three local mounts at `:1811/:1854/:1863` never call it; `GroundingViolationKind` = empty_as_zero | count_understatement | fabrication_risk | scope_divergence; governed shift boundaries resolved fresh per call at `stageTools.ts:1818-1821`; `resolveStage11`'s null branch at `stageContextSlice.ts:426` means "unknown offered set, fabricate nothing"; `resolveStage11` at `stageContextSlice.ts:425` unions `LOCAL_TOOL_NAMES` into the offered set; `stageTools.ts:306` seeds every `LOCAL_TOOL_NAMES` entry into `toolNameClaims` on every turn; `ctx.networkTime` is captured once per turn at `turn/types.ts:271`; `routeShadowLens.ts:841` and `:1079` state in prose that `LOCAL_TOOL_NAMES` are registered on every turn; `toolNameCollision.test.ts:225-230` asserts on the SSOT length.
- UNMEASURED: whether `fetch` with `redirect: 'manual'` exposes the `Location` header uniformly across the runtime the gateway uses (read the installed undici/Node source, not the docs — §10); whether `resultCut` can be set from inside the tool handler or must be joined from `toolResult.ts`'s `charCut` (choose the seam, cite it).
- ON-DISAGREEMENT: if `git rev-parse origin/master:<path>` for the five v1 instrument paths differs from v1's fence → STOP and report (master moved by PR 514, which touched only `.github/workflows/ma-rerun.yml` and a relay report — the five blobs should be unchanged; if not, STOP). If the branch `phase/web-valve-1-s132-1` no longer exists at origin → STOP and report; if only the PR is closed, reopen it (`gh pr reopen`) or open a new PR on the same branch and say which. If any scout line-number claim above is false on read → report the true line and continue; the claim, not the card, is corrected. If `redirect: 'manual'` cannot expose `Location` in the installed runtime → STOP after ORDER A, report the source line that proves it.
- DECAYS when any of the five instrument blobs changes on master, or when a `web.*` key appears in `domain_rules`, or when a `RELEASE`/`HOLD` row for this card name appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the scout's two verdicts and the eleven amendments this card carries verbatim | MEASURED: bus rows from_lane scout, 11:29:43Z and 11:51:38Z, read whole | verdict |
| the five instrument blobs, unchanged since v1 | MEASURED: scout ORDER A.2 re-measurement at 11:29Z, equal to v1's fence line for line | instrument |
| the current state of the branch | MEASURED: your v1 report, DIFF section | branch |
| the runtime's redirect:'manual' behaviour | NOT-READ | ORDER A.3 |
| the seam for resultCut | NOT-READ | ORDER A.3 |

```evidence:verdict
v2 verdict 11:51Z: FAIL — "NO STAGE-07 FIGURE IS RECORDED. resolveStage07 is status:'rebuilt' ... RecordedTurn carries ... NO offered or registered tool set. The sentence therefore cannot be implemented."
v1 verdict 11:29Z: FAIL — "The guard has NO redirect handling. makeSsrfGuardedFetch validates the URL it is handed then calls baseFetch(input, init) - plain fetch, which follows redirects by default. Hops 1..N are dialled with NO IP check and NO https check."
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
- cwf_yaprak: the SAME branch phase/web-valve-1-s132-1 and the SAME pull request, amended by further commits; files in scope: api/cwf/_lib/webTools.ts, api/cwf/__tests__/webTools.test.ts, api/cwf/_lib/localTools.ts, api/cwf/_lib/turn/stageTools.ts, api/cwf/_lib/knowledge/reference/agentParams.ts, api/cwf/__tests__/localToolsSsot.test.ts, api/cwf/__tests__/learnBrake.test.ts, api/cwf/__tests__/registerToolsSpanIO.test.ts, api/cwf/__tests__/toolNameCollision.test.ts, api/cwf/_lib/replay/routeShadowLens.ts (prose comments at :841 and :1079 only, and only if they become false), api/cwf/_lib/turn/types.ts (only if a type for the valved set is needed), api/cwf/_lib/toolResult.ts (only if resultCut must be joined there), api/cwf/_lib/grounding/types.ts and api/cwf/_lib/grounding/groundingCheck.ts (AMENDMENT 10, one new violation kind and its check), their tests; the new report at the header path; nothing else
- AMENDMENT 1 (replaces v1's tool sentence): one tool, web_fetch { url: string } - https only, GET only, redirect manual: the handler follows at most 3 hops itself, calling assertPublicHttpsUrl on each hop Location before dialling it, returning error class redirect-blocked when a hop fails or the limit is exceeded; a test drives a 302 chain whose second hop is 169.254.169.254 and asserts that hop is never fetched.
- AMENDMENT 2 (added): web_fetch is registered conditionally, so it is NOT added to LOCAL_TOOL_NAMES; introduce VALVED_LOCAL_TOOL_NAMES for the replay containment union and leave LOCAL_TOOL_NAMES meaning exactly the always-mounted set, so no name is reserved against an MCP server on a turn where no local tool serves it.
- AMENDMENT 3 (replaces v1's panel sentence): no panel file is touched: A.3 measured that AGENT_PARAM_SEEDS is derived from the registry and the panel reaches a new key through referencePoolFor, so a code-floor registration is publishable as-is.
- AMENDMENT 4 (added): web.maxBytes floor is 32768, at or under the per-call MAX_TOOL_RESULT_CHARS of 40000, and the output carries resultCut:true whenever the result path cut the body, so truncated and resultCut together describe both axes and no drop is silent.
- AMENDMENT 5 (replaces v1's fetchedAt sentence): fetchedAt is the instant of THIS fetch, taken at the call, never ctx.networkTime - that Date is captured once per turn (types.ts:271) and would stamp every fetch in a turn with one identical time, making the citation false.
- AMENDMENT 6 (added to the F2 binding): the tool description must require, and one test must assert on a recorded turn, that any answer sentence resting on fetched content names the url and the fetchedAt of the fetch it rests on.
- unchanged from v1: three governed keys web.enabled (floor 0) · web.timeoutMs (floor 5000) · web.maxBytes (floor 32768, bounds per AMENDMENT 8), sessionTweakable:false, stage "07" (the scout confirmed "07" is correct); code floors only; NO publish, NO domain_rules write, NO migration; valve CLOSED at landing; FULL-TRACE through the existing path; no secret, no env variable, no provider, no web_search
- AMENDMENT 7 (replaces v2's containment sentence): resolveStage11 gains no new input and keeps its three-valued shape: when the caller passes a set it unions LOCAL_TOOL_NAMES only, so a recorded web_fetch call renders offered:false and is REPORTED as a containment mismatch rather than admitted; when the caller passes null that branch stays byte-untouched and fabricates nothing; the stage-07 figure is NOT consulted, because resolveStage07 is status rebuilt over today's live routing and RecordedTurn carries no recorded webOffered figure.
- AMENDMENT 8 (replaces v2's bounds): web.maxBytes floor is 32768 with bounds [8192, 262144], and the band is ADVISORY: body BYTES and serialised-JSON CHARS are not convertible because JSON escaping can double the count, so resultCut:true computed on the actual serialised length is the only guarantee and is asserted independently of truncated.
- AMENDMENT 9 (added): the span's truncated attribute for web_fetch is derived from resultCut OR truncated and never from truncated alone, because web_fetch returns a JSON object and therefore takes toolResult.ts's non-array fallback char cap at :620 - the exact site of defect #75, where a truncated:false field standing over a char-cut body would re-open that defect under a field that looks like its fix.
- AMENDMENT 10 (replaces the AMENDMENT 6 weaker-form escape clause — ACCEPTED, scope extended): grounding/types.ts and grounding/groundingCheck.ts are IN scope for one new GroundingViolationKind uncited_external, together with the stageTools.ts wiring that pushes a ToolResultMeta for local tools, because ctx.toolResultMetas is fed only at stageTools.ts:1713 inside the MCP branch and no local tool result reaches runGroundingCheck today; if the Architect declines that scope then AMENDMENT 6 is STRUCK and F2's verifiability axis is named UNMEASURED by this card, rather than appearing proved by an assertion over the description text.
- AMENDMENT 11 (added to FALSIFIER, mirrored here): the resolved web.enabled is never cached beyond a single turn; it is resolved fresh per call in the posture of stageTools.ts:1818-1821.
- bus: one from_lane row WEB-VALVE-1-AG4-report-v3, posted once
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; act on any earlier row first (CARD-MA-RERUN-3-S132-1-v5 precedes this card and has its own release). This card is released only by a `RELEASE-WEB-VALVE-1-S132-1` row naming v3; absent, the HOLD stands and you stop here. v2 is VOID.
1b. `gh pr list --state all --head phase/web-valve-1-s132-1 --json number,state,closedAt` and `git ls-remote origin refs/heads/phase/web-valve-1-s132-1` — print both; closed PR → reopen or open anew on the same branch; missing branch → STOP.
2. `git fetch origin`; the five instrument blobs vs the fence, else ON-DISAGREEMENT; `git log --oneline origin/master..phase/web-valve-1-s132-1` printed so v1's commits are named.
3. Read whole: `ssrfGuard.ts` (the guard has no redirect step — confirm), `toolResult.ts` around `MAX_TOOL_RESULT_CHARS` and `charCut`, `stageContextSlice.ts` around `resolveStage11`, `stageTools.ts:306` claim seeding, `turn/types.ts:271`, `routeShadowLens.ts:841` and `:1079`, `toolNameCollision.test.ts:225-230`; the installed runtime's redirect:'manual' handling in its OWN source under node_modules (name the file). Every scout line number is re-measured and printed; a wrong one is corrected in the report, not silently.

## ORDER B — THE AMENDMENTS, each with its falsifying test
1. Redirects (A1): `redirect: 'manual'` on every hop; on 301/302/303/307/308 read `Location`, resolve against the current URL, `assertPublicHttpsUrl` on it, then dial; hop count ≤ 3 else `redirect-blocked`; any non-https Location → `redirect-blocked`. Test: a 302 chain whose second hop is `169.254.169.254`, injected fetch records every dialled URL, assert the metadata address is NEVER in the list and the result is `reason: 'redirect-blocked'`. Second test: three lawful hops succeed, a fourth is refused.
2. SSOT split (A2): `LOCAL_TOOL_NAMES` returns to exactly the always-mounted set (remove `web_fetch`; delete `UNCONDITIONAL_LOCAL_TOOL_NAMES` if it is now redundant, or keep it as an alias only if a consumer needs it — say which); new export `VALVED_LOCAL_TOOL_NAMES = ['web_fetch']`; claim seeding at `stageTools.ts:306` seeds ONLY the always-mounted set plus the valved names that are ACTUALLY mounted this turn; `resolveStage11` is NOT changed in logic: with a caller-supplied set it unions `LOCAL_TOOL_NAMES` only (so a recorded `web_fetch` renders `offered:false` and is REPORTED as a mismatch, never admitted); with null it stays byte-untouched. Tests: at valve 0 an MCP tool named `web_fetch` is NOT refused by the claim registry; at valve 1 it IS; a recorded `web_fetch` call with a caller-supplied set renders offered:false and a mismatch; with null nothing is fabricated; `registerToolsSpanIO`, `localToolsSsot`, `toolNameCollision` assertions restated on the always-mounted set and green.
3. Panel (A3): no panel file; the report cites `referencePoolFor` and `AGENT_PARAM_SEEDS` derivation lines as the proof.
4. Result cap (A4+A8+A9): `web.maxBytes` floor 32768, bounds `[8192, 262144]` (advisory); output field `resultCut` — set from the seam you choose in A.3 (either the handler measures its serialised JSON against `MAX_TOOL_RESULT_CHARS` and sets the flag before returning, or the flag is joined from `charCut`); test: a body whose serialised result exceeds 40000 chars yields `resultCut:true` and the stored result is the cut one, with `truncated` still reporting the FETCH axis independently; the span's truncated attribute for `web_fetch` = `resultCut OR truncated` (AMENDMENT 9), with a test that a char-cut body with `truncated:false` still reports the span attribute true.
5. Clock (A5): `fetchedAt = new Date().toISOString()` at the call inside the handler; the injected clock in tests is per-call; test: two fetches in one turn carry two different `fetchedAt` values when the injected clock advances.
6. F2 contract (A6+A10): tool description (TR + EN) REQUIRES that any answer sentence resting on fetched content name the url and fetchedAt. Local tools push a `ToolResultMeta` (stageTools.ts, beside the three local mounts) so `web_fetch` results reach `runGroundingCheck`; new `GroundingViolationKind` `uncited_external` in `grounding/types.ts`, checked in `groundingCheck.ts`: an answer that rests on a `web_fetch` result whose url (or fetchedAt) does not appear in the answer text raises it. Tests: a fixture answer WITH the citation raises nothing; the same answer WITHOUT it raises `uncited_external`; existing grounding tests unchanged and green. No weaker form.
7. `routeShadowLens.ts` prose at `:841`/`:1079`: if the sentences are now false, correct the comment text only; no logic change.
7b. Valve freshness (A11): `resolveWebValve` is called per turn at stage 7 with no module-level cache; test: two consecutive turns with the injected resolver returning 1 then 0 register the tool on the first and not the second.
8. Full `npx vitest run` and `npm run typecheck:api`; counts printed; `docs/ground/facts.json` regenerated by the suite is REVERTED again and the moduleCount named (known debt, ground-doc refresh is a separate card).

## ORDER C — THE REPORT
1. `docs/relay/WEB-VALVE-1-AG4-report-v3.md`, grammar v1, `auditText` locally `violations: 0` before push; the eleven amendments each with the test that falsifies it; the PR state measured in A.1b and what you did about it; every scout line number as re-measured; the new success and redirect-blocked shapes in an anchored fence (v1 taught us the unanchored form reddens on the digest — the card's own defect, fixed here).
2. Commit on the same branch, push, the (reopened or new) pull request; do NOT merge. Post ONE from_lane row `WEB-VALVE-1-AG4-report-v3`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any hop beyond hop 0 is dialled without `assertPublicHttpsUrl`; wrong if `web_fetch` is in `LOCAL_TOOL_NAMES`; wrong if an MCP tool named `web_fetch` is refused at valve 0; wrong if a recorded `web_fetch` on a `webOffered:false` turn passes containment; wrong if `fetchedAt` comes from `ctx.networkTime`; wrong if a result can be cut by `MAX_TOOL_RESULT_CHARS` without `resultCut:true`; wrong if the tool description does not carry the citation requirement in both languages; wrong if any file outside the scope list is written; wrong if a test touches the network; wrong if the PR is merged by you; wrong if the valve is open at landing; wrong if the resolved web.enabled is cached beyond a single turn, so that closing the valve does not take effect on the next turn without a redeploy; wrong if `resolveStage11` consults any stage-07 figure; wrong if a `web_fetch` result reaches the answer without passing `runGroundingCheck`; wrong if the span's truncated attribute for `web_fetch` is derived from `truncated` alone.

## SHARED SURFACES
cwf_yaprak: the existing branch and PR, files as listed. Bus: one row. Database, secrets, production: untouched. Landing: Architect landing card + owner's named approval, after this report.

## DECISION RIGHTS
None. The `resultCut` seam, the redirect implementation details and the `uncited_external` check's exact text-matching rule are yours within AMENDMENTS 1, 4, 8, 9 and 10; everything else is fixed by the scout's sentences. The Architect's one decision — accepting AMENDMENT 10's scope — is taken in this card.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report and -v2 (two FAIL verdicts, eleven amendments) · LAND-MA-RERUN-RUNNER-S132-1-AG5-report (PR list empty) · CARD-WEB-VALVE-1-S132-1-v1 and its AG-4 report · NOTICE-HOLD-WEB-VALVE-1-S132-1 · A-REC-S132-5 · cwf-sota-definition-v1_5 Tier F (F2) · OWNER-RULING-S126-VALVES-AND-A-ITEMS-1 · ADR-002 · ADR-005 v2 · FULL-TRACE · partial ≠ complete · S37-1 · TOTAL-45.

```deliverables
five instrument blobs equal to the fence; v1's commits named
redirect manual with per-hop assertPublicHttpsUrl, ≤3 hops, redirect-blocked class; metadata-address chain test proves the hop is never dialled
LOCAL_TOOL_NAMES = always-mounted set only; VALVED_LOCAL_TOOL_NAMES; claim seeding mounts-only; resolveStage11 logic untouched, mismatch reported, null fabricates nothing; four tests
no panel file; referencePoolFor / AGENT_PARAM_SEEDS lines cited
web.maxBytes floor 32768 bounds [8192, 262144] advisory; resultCut flag with its test; span truncated = resultCut OR truncated with its test
fetchedAt per call; two-fetch test
citation requirement in the description (TR+EN); local ToolResultMeta wiring; GroundingViolationKind uncited_external with both tests; no weaker form
valve resolved fresh per turn, two-turn test
every scout line number re-measured and printed
npx vitest run and typecheck:api green, counts printed; facts.json reverted, moduleCount named
PR state measured; reopened or re-created on the same branch
docs/relay/WEB-VALVE-1-AG4-report-v3.md on the same branch, auditText violations: 0, PR open, not merged
bus row from_lane WEB-VALVE-1-AG4-report-v3, posted once
```

TAIL ANCHOR: CARD-WEB-VALVE-1-S132-1-v3 ends here.
