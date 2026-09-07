<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-WEB-VALVE-1-S132-1 · v1 — the web valve, half one: a governed, SSRF-guarded, citation-bearing `web_fetch` tool, CLOSED by default
lane: AG-4
report: docs/relay/WEB-VALVE-1-AG4-report.md
fanout: personalized

WEB-VALVE-1 is a product item bound to the F2 criterion of `cwf-sota-definition-v1_5` ("a web valve whose output cannot be verified is worse than no valve"). It was the owner's own catch in S124 (OWNER-CATCH-S124-WEBVALVE) and at master today it has ZERO code: no file under `api/` mentions a web valve, web search, or web fetch. This card builds the half that needs no secret — `web_fetch` over a caller-supplied URL — behind a governed agent.param that lands CLOSED. The half that needs a provider key (`web_search`) is WEB-VALVE-2 and waits on the owner's secret; nothing in this card reaches for a key. Every byte the tool returns carries its own citation (url · finalUrl · fetchedAt · body sha256) so that F2's verifiability axis is measurable from the trace, not from prose.

## PREMISE
- MEASURED: 2026-09-07T10:49Z over the bridge, `git grep -il` at the origin/master in the `master-read` fence for `web valve|webValve|web.enabled|WEB-VALVE|webSearch|tavily|brave search|serpapi` across the whole tree → no file. The valve does not exist.
- MEASURED: 2026-09-07T10:51Z — `api/cwf/_lib/net/ssrfGuard.ts` exports `assertPublicHttpsUrl`, `makeSsrfGuardedFetch`, `ssrfGuardedFetch`, `SsrfBlockedError`, `isBlockedIp`; `api/cwf/_lib/localTools.ts` is the SSOT array `LOCAL_TOOL_NAMES` that stage 7 registers and the replay stage-11 containment unions; `api/cwf/_lib/knowledge/reference/agentParams.ts` is the governed param registry (latest precedent `ROUTER_NUDGE_ON_TIME_UNCLEAR: 'router.nudgeOnTimeUnclear'`, added 2026-08-29, floor 0, sessionTweakable:false); `api/cwf/_lib/networkTime.ts` exports `getNetworkTime()`.
- MEASURED: 2026-09-07T10:47Z, Supabase `domain_rules` — no key matching `web%` exists in any status; `vector.enabled` and `vector.engine` (stage "05") and the `router.*` keys (stage "07") show the two-tier shape (published row > code floor). 630 `*.test.ts` files at master.
- UNMEASURED: whether the admin panel's governed-rules editor lists a NEW registry key without a code change on the panel side (read it; if a panel change is needed, it is in scope as the one UI touch, named in the report); the exact seam in `stageTools.ts` where conditional registration goes; whether `getNetworkTime()` is safe to call per tool invocation or must be cached per turn (read `timeTools.ts` for the precedent and follow it).
- ON-DISAGREEMENT: if `git rev-parse origin/master:<path>` for any of the five `instrument` paths differs from the fence after fetch → STOP, report the differing blob(s). If a web tool of any kind is found under `api/` → STOP and report the file. If the governed-param mechanism requires a DB migration to admit a new key → STOP after ORDER A; migrations are the Operator's (ADR-005 v2), never yours. Master moving is NOT a stop.
- DECAYS when any of the five instrument blobs changes, or when a `web.*` key appears in `domain_rules`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the five instrument blobs this card builds against | MEASURED: git rev-parse origin/master:<path> over the bridge, one line per path | instrument |
| the owner's item this card executes and the criterion it binds to | MEASURED: cwf-implementation-order-S124-v33 §3 (WEB-VALVE-1 → F2), cwf-sota-definition-v1_5 Tier F | binding |
| the master the PREMISE grep was run at | MEASURED: git rev-parse origin/master over the bridge, 10:49Z | master-read |
| the master you fetch | NOT-READ | recorded in ORDER A, never a fence |
| the panel's behaviour for a new registry key | NOT-READ | ORDER A.3 |

```evidence:instrument
a634bbac165633a9c0c9eabe989601a295d2ecc0 api/cwf/_lib/localTools.ts
ecf8ad7dcbfdc0d14dd5ae0b7e2ca2c8e6144a32 api/cwf/_lib/net/ssrfGuard.ts
ea872702a086665fd94cfbb9d1774f23a44689df api/cwf/_lib/turn/stageTools.ts
68bfaaf5e07cdbd1f5839d433597ba17707f0fde api/cwf/_lib/timeTools.ts
9862bf0aaf21d1a29f0a23d4aba35b30806baa90 api/cwf/_lib/knowledge/reference/agentParams.ts
```

```evidence:master-read
153a873f02ce54e8e776eab3a7eb2b81ca03b86a
```

```evidence:binding
cwf-implementation-order-S124-v33 §3 · row WEB-VALVE-1 · binds to F2 DeepScholar-Bench (R7): "a web valve whose output cannot be verified is worse than no valve" · historic id 2B.2 — the owner's catch (OWNER-CATCH-S124-WEBVALVE)
```

## SCOPE
```scope
- cwf_yaprak: NEW api/cwf/_lib/webTools.ts (tool name constant, description, JSON schema, the fetch+extract implementation), NEW tests beside it; EDIT agentParams.ts (three keys), localTools.ts (SSOT gains the name), stageTools.ts (conditional registration at the existing seam), the localToolsSsot test; the ONE panel file only if ORDER A.3 proves it is needed
- three governed agent.param keys, all sessionTweakable:false — web.enabled (number 0..1, floor 0, stage "07"), web.timeoutMs (number 1000..15000, floor 5000, stage "07"), web.maxBytes (number 16384..2 MiB, floor 524288, stage "07"); code floors only — NO publish, NO domain_rules write, NO migration
- one tool, web_fetch { url: string } — https only through ssrfGuardedFetch; GET only; no redirects beyond the guard's own handling; response body capped at web.maxBytes with a truncated flag (partial ≠ complete); HTML reduced to text with script/style stripped; returns { url, finalUrl, fetchedAt, status, contentType, title, text, bytes, truncated, bodySha256, source: "web", verified: false }
- valve CLOSED at landing: with no published row the tool is NOT registered, and a model that names it gets the ordinary unknown-tool path; the replay stage-11 containment still admits it via the SSOT
- FULL-TRACE: the tool call's input and output flow through the existing toolResult/observability path unchanged — no new sink, no redaction beyond the existing one
- no secret read, no env variable introduced, no provider, no web_search (that is WEB-VALVE-2)
- one branch phase/web-valve-1-s132-1, one pull request, NOT report-only — Architect landing card + owner's named approval; never merged by you
- bus: one from_lane row WEB-VALVE-1-AG4-report, posted once
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; act on any earlier row first (CARD-MA-RERUN-3-S132-1-v4 precedes this card).
2. `git fetch origin`; record `git rev-parse origin/master` (informational); `git rev-parse origin/master:<path>` for the five `instrument` paths must equal the fence line for line, else ON-DISAGREEMENT. Re-run the grep from PREMISE line 1 at the fetched master; a hit is ON-DISAGREEMENT.
3. Read whole: `localTools.ts`, `stageTools.ts` (the registration loop and the F-obs2 comment), `timeTools.ts` (the precedent for a local tool's name/description/schema/handler shape and how it takes time), `ssrfGuard.ts`, the `ROUTER_NUDGE_ON_TIME_UNCLEAR` and `VECTOR_ENABLED` declarations in `agentParams.ts` with their decl comments, `agentParamSchema.test.ts`, `localToolsSsot.test.ts`, and the admin panel's governed-rules editor to answer the UNMEASURED panel question. Cite the lines you copy the shape from.

## ORDER B — THE BUILD
1. `agentParams.ts`: add `WEB_ENABLED`, `WEB_TIMEOUT_MS`, `WEB_MAX_BYTES` in the registry style of the vector pair — decl comment naming this card, floor values from the scope fence, `sessionTweakable:false`, stage "07". Extend the schema test the way the vector pair extended it.
2. `webTools.ts`: `WEB_FETCH_TOOL_NAME = 'web_fetch'`, description (Turkish + English, one short paragraph each, stating that the content is EXTERNAL and UNVERIFIED and must be cited by url and fetchedAt), JSON schema `{ url: string, required }`, handler: `assertPublicHttpsUrl` → `ssrfGuardedFetch` with `AbortSignal.timeout(web.timeoutMs)` → read at most `web.maxBytes`+1 bytes (set `truncated` from the +1) → sha256 over the bytes kept → text extraction (HTML: drop `<script>`, `<style>`, tags, collapse whitespace, take `<title>`; non-HTML text/*: as-is; other content types: text empty and `contentType` reported, never a guess) → `fetchedAt` from the same time source `timeTools.ts` uses. `SsrfBlockedError`, timeout and non-2xx return a TOOL ERROR object with the reason class (`ssrf-blocked` · `timeout` · `http-<status>` · `unsupported-content`) — never a thrown exception across the stage boundary, never a fabricated body. Empty body → `text: ""` AND `bytes: 0` AND `empty: true` (empty ≠ zero, stated in the object, not inferred from "").
3. `localTools.ts`: append `WEB_FETCH_TOOL_NAME` to `LOCAL_TOOL_NAMES`. `stageTools.ts`: register `web_fetch` at the existing local-tool seam ONLY when the resolved `web.enabled` is 1; when 0, do not register and emit the same kind of stage-07 figure the router valves emit for "not offered" (copy that pattern, cite it). The SSOT test must still prove one array → both consumers.
4. Tests, all pure/offline, no network: (a) valve 0 → not registered, valve 1 → registered, with the stage-07 figure asserted; (b) ssrf-blocked URL → error object `ssrf-blocked`, no fetch made (inject `lookup`); (c) truncation at maxBytes with `truncated:true` and sha over the kept bytes; (d) HTML extraction drops script/style and finds title; (e) empty 200 → `empty:true`; (f) non-HTML binary → `unsupported-content` with contentType; (g) timeout via a never-resolving injected fetch → `timeout`; (h) `LOCAL_TOOL_NAMES` contains `web_fetch` and stage-11 containment admits a recorded `web_fetch` call. Run the full `npm test` — 630 files at the anchor; the number after, and any red, printed.
5. `npm run build` (or the repo's type-check target, read from package.json) green; `git diff --stat origin/master...HEAD` printed.

## ORDER C — THE REPORT
1. `docs/relay/WEB-VALVE-1-AG4-report.md` in grammar v1 (CLAIMS · evidence fences · DIFF section; full 40-hex only in anchored fences; drive it through `auditText` locally BEFORE pushing and print `violations: 0`).
2. The report states: the five blobs re-read; the panel finding from A.3; the registration seam chosen and why; test count before/after; the exact JSON of one `web_fetch` success and one `ssrf-blocked` error from the tests (unanchored fence); and ONE sentence of what WEB-VALVE-2 (search + provider key) will need from the owner, named as a SECRET surface — nothing else asked of the owner.
3. Commit on `phase/web-valve-1-s132-1`, push, open the pull request, do NOT merge; post ONE from_lane row `WEB-VALVE-1-AG4-report`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if the valve is open at landing (any path registers `web_fetch` with no published row); wrong if any URL is fetched without passing `assertPublicHttpsUrl`; wrong if a secret or env variable is read; wrong if a `domain_rules` row is written or a migration is added; wrong if the output object lacks any of url · finalUrl · fetchedAt · bodySha256 · truncated · verified:false; wrong if a non-2xx or blocked fetch yields body text; wrong if a test touches the network; wrong if `LOCAL_TOOL_NAMES` and the registration loop are no longer one array; wrong if the report contains a bare 7–39-hex token outside an unanchored fence; wrong if the PR is merged by you.

## SHARED SURFACES
cwf_yaprak: one new module, one new test file, four edited files (+ at most one panel file, named). Bus: one row. Database: untouched. Secrets: untouched. Production: untouched until the Architect's landing card and the owner's approval; even then the valve is closed until the owner publishes `web.enabled=1` through the admin UI — the designed surface (OWNER-RULING-S126-VALVES-AND-A-ITEMS-1).

## DECISION RIGHTS
None. The registration seam and the extraction details are yours to choose within the scope fence and to justify in the report. Floors are the Architect's; publishing is the owner's.

BODIES: OWNER-CATCH-S124-WEBVALVE · cwf-implementation-order-S124-v33 §3 · cwf-sota-definition-v1_5 Tier F (F2) · OWNER-RULING-S126-VALVES-AND-A-ITEMS-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · ADR-002 · ADR-005 v2 · FULL-TRACE · empty ≠ zero · partial ≠ complete · §8 (determinism/softness: web output is SOFT and says so) · S37-1 · TOTAL-45 · CARD-MA-RERUN-3-S132-1-v4 (the instrument-fence form).

```deliverables
five instrument blobs re-read after fetch, equal to the fence; fetched master recorded; PREMISE grep re-run, no hit
agentParams.ts: web.enabled · web.timeoutMs · web.maxBytes registered with floors 0 · 5000 · 524288, sessionTweakable:false, schema test extended
api/cwf/_lib/webTools.ts: web_fetch with ssrfGuardedFetch, timeout, maxBytes+truncated, sha256, HTML→text, citation-bearing output, error classes
localTools.ts SSOT gains web_fetch; stageTools.ts registers it only at web.enabled=1 with a stage-07 figure at 0; SSOT test still proves one array
eight offline tests green; full npm test count before/after printed; build/type-check green
panel finding for a new registry key, measured, with the one panel file named if touched
docs/relay/WEB-VALVE-1-AG4-report.md, auditText violations: 0 before push, on phase/web-valve-1-s132-1, pull request open, not merged
one sentence naming WEB-VALVE-2's secret surface for the owner, nothing else asked of him
bus row from_lane WEB-VALVE-1-AG4-report, posted once
```

TAIL ANCHOR: CARD-WEB-VALVE-1-S132-1-v1 ends here.
