# S130-BACKLOG-ADF-VS-CWF-SPLIT-v1 — what is still unmerged, split by what it is FOR

Written WHOLE (A-REC-S101-7). Measured on the owner's connected clone at 2026-09-04 07:44–07:52Z from `git branch -r --no-merged origin/master`, `git log --no-merges`, `git diff --name-only origin/master...<branch>`, and `git cherry origin/master <local>`. Every count is a CLAIM (TOTAL-45). "ADF" = the factory's own machinery (lanes, landing gate, authority matrix, reports about the factory). "CWF" = the product the factory exists to build (Chat With Factory runtime, retrieval, observability, admin).

Owner's design contribution (S112-YASA-1, recorded by name): the owner observed that most of the residue is ADF work and asked for ADF and CWF to be assessed SEPARATELY. This document is that split.

## THE HEADLINE (measured)

| bucket | branches | of which code | of which report-only | oldest | newest |
|---|---|---|---|---|---|
| ADF — factory machinery | **16** | 2 | 14 | 2026-08-25 | 2026-09-04 |
| CWF — product | **4** (3 distinct works; one is a duplicate) | 3 | 0 | 2026-08-25 | 2026-08-27 |
| total unmerged on origin | 20 | 5 | 14 | | |

Fourteen of twenty unmerged branches are single-file lane REPORTS under `docs/relay/` — docs-only, CI-DIET class, no product code at all. Only THREE distinct pieces of product work are waiting, and the largest of them (`context-retrieval-1`) has been waiting since 27 August.

## ADF — FACTORY MACHINERY (16)

### ADF code (2)

| branch | lane · date | commits | touches | status |
|---|---|---|---|---|
| `phase/authority-matrix-ruled-1` | AG-4 · 2026-09-04 | 3 | `scripts/authorityMatrix.mjs`, `authoritySnapshot.mjs`, `.d.mts`, `api/cwf/__tests__/authorityMatrix.test.ts`, `docs/ground/*`, `supabase/migrations/20260904073800_relay_inbox_reply_authority_drift.sql`, `docs/relay/` report | **PR #490 IN FLIGHT** — implements OWNER-RULING-S130 (rulings 2·3·4), migration FILE only; the report commit is on the branch at 07:5xZ; CI pending; Operator `db push` and foreman landing follow |
| `phase/authorship-lens-2` | AG-3 · 2026-08-25 | 2 | `scripts/land.ts`, `scripts/landSelfTest.ts`, `api/cwf/__tests__/landScript.test.ts` | LAND-BASE-REF-FIX-1 — "the landing gate reads the request's own base instead of assuming master". Master's history carries `e865431e LAND-GATE-SELF-KNOWLEDGE-1 AG-4: the request's own base, carried from AG-3 and re-measured` (PR #396, landed). Likely SUPERSEDED by that landing — **DOĞRULANMAMIŞ**; a diff of the two is owed before it is closed as SUPERSEDED-BY |

### ADF report-only (14) — one `docs/relay/*.md` each, nothing else

| branch | lane · date | what the report is |
|---|---|---|
| `phase/s129-foreman-boot-1` | AG-5 · 2026-09-03 | foreman boot report, five findings, nothing landed — **PR #487** |
| `phase/s119-landing-order-1` | AG-5 · 2026-08-29 | eight landed, one refused on authorship contradiction (+2 addenda) |
| `phase/s119-landing-order-2` | AG-5 · 2026-08-26 | four landed, three refused |
| `phase/s119-landing-order-3` | AG-5 · 2026-08-26 | three landed, master proven green by tree identity |
| `phase/s119-landing-order-4` | AG-5 · 2026-08-26 | trunk RED, nothing landed |
| `phase/s125-foreman-boot-1-ag5-report` | AG-5 · 2026-08-29 | booted 36 commits stale |
| `phase/go-landing-s125-1` | AG-5 · 2026-08-29 | landing REFUSED at MERGE-KEY |
| `phase/go-landing-s125-1-ag5-report` | AG-5 · 2026-08-29 | landing REFUSED at LEVEL |
| `phase/ref-sweep-remeasure-1` | AG-5 · 2026-08-29 | 40 to delete, 26 excluded (2 commits, both docs) |
| `phase/s118-lane-sweep-2-ag5-report` | AG-5 · 2026-08-29 | lane/AG-3 swept on owner's named consent |
| `phase/backlog-landing-order-1` | AG-5 · 2026-08-26 | one landed, stopped at the canary |
| `phase/nightly-compat-red-1` | AG-5 · 2026-08-26 | one night old, one cause, gates nothing |
| `phase/build-docs-assertion-1` | AG-1 · 2026-08-26 | the assertion reading, a green that ran no tests |
| `phase/s118-final-closing-1-ag1-decayed` | AG-1 · 2026-08-26 | the card decayed by its own clause |

Thirteen of fourteen are the foreman's own (AG-5) observation reports. Under the ⑤ merge-authority exception (OWNER-RULING-S122-E1-E2) a lane may land a record it was CARDED to land; a foreman's own observation reports are OUT of that scope by design — which is exactly why these fourteen have piled up. GATE-1 agenda ⓸ ("foreman's observation-report path") is the unfixed cause; ⓹ names four of them (the S119-LANDING-ORDER set) explicitly.

## CWF — PRODUCT (4 branches, 3 works)

| branch | lane · date | commits | touches | status |
|---|---|---|---|---|
| `phase/context-retrieval-1` | AG-4 · last 2026-08-27 | 26 (incl. a trunk sync) | `api/cwf/_lib/vectorLane/` (6 + 4 tests), `api/cwf/_lib/groundMcp/` (5 + 3 tests), `scripts/` (2), 3 reports | **The substantive product work.** Context retrieval organ: vector lane + ground MCP. Contains `-organ` entirely (merge `6539011a` = PR #390 merged INTO this branch) plus a 27 Aug master sync. GATE-1 ⓵ names the organ branch; the canonical head is THIS one |
| `phase/context-retrieval-1-organ` | AG-4 · 2026-08-25 | 22 | same files | **DUPLICATE** — measured ancestor of `context-retrieval-1` (`git merge-base --is-ancestor` true; trees differ only by what -1 added). Closes as MERGED-INTO `context-retrieval-1`; no separate review, no separate landing |
| `phase/provenance-export-1` | AG-2 · 2026-08-27 | 1 | `api/cwf/_lib/observability/turnProvenanceExport.ts` + test, `public/architecture/manifest.json`, report | the turn's attribution evidence becomes a file; join declared. Small, self-contained, FULL-TRACE-adjacent |
| `phase/stale-fact-sweep-1` | AG-1 + AG-2 · 2026-08-27 | 3 | `shared/dbConstants.ts`, `shared/grantPolicy.ts`, `api/admin/bench-reset.ts`, manifest, report | thirty-eight stale comments corrected, six artefacts registered, reseal. Product-code hygiene, no behaviour change claimed |

## LOCAL-ONLY REMNANTS (not on origin — NOT backlog, but named so they are not guessed later)

The clone holds 96 local `phase/*` branches with no origin counterpart. `git cherry` against origin/master shows **86 of them carry ZERO unique patches** — fully landed, stale local refs only (safe to delete in a hygiene card). Ten carry unique, never-pushed commits: `adf-kademe-2-ag5-report` (6), `foreman-drain-in-turn-1` (6), `bench-reset-1` (2), `discovery-extend-2` (2), `frame-on-all-paths-1` (2), `census-refresh-fix-1` (1), `relay-bus-1` (1), `routing-floor-backend-1` (1), `status-request-s102-1-ag-2` (1), `status/ag-1-s102-1` (1). The four dated 10–13 August are pre-factory CWF work (bench, census, discovery, frame, routing floor) and pre-date the relay bus; whether any of it is still wanted is a product question, not a landing question. Split: 6 ADF-ish, 4 CWF-ish — all DOĞRULANMAMIŞ as to liveness.

Also in the working tree: one dirty file (`docs/ground/authority-conformance.latest.md`, a stale measuredAt line, two landings behind), one stash (`WIP on master: c953120`), five prunable worktree records.

## WHAT THE SPLIT SAYS (Architect's reading, labelled as such)

1. The product backlog is small and old: three works, the newest 27 August, the biggest waiting eight days for a review that GATE-1 ⓵ already schedules. Nothing product-shaped has landed since 30 August except PR 488 today.
2. The factory backlog is wide and thin: fourteen single-file reports that cannot land because the factory's own rule excludes them from the one lane that lands things. This is a mechanism defect (⓸), not fourteen pieces of work.
3. The owner's standing objection (F-S130-RULE-COST-REVIEW-OWED-1) has a number now: **70 % of the unmerged surface is the factory writing about itself**, and 100 % of that 70 % is blocked by the factory's own landing rule.

## ONE PATH (not a menu)

After PR #490 lands: **one foreman wave card** (`CARD-LANDING-REPORT-BATCH-S130-1`) that lands all fourteen report branches in a single pass under the owner's named consent — docs-only, CI-DIET, S43-2 ≤60 s review each, authorship class expected AUTHOR-SUBJECT on every one (every subject carries its lane before the colon; this was checked on the fourteen subjects above). That card is ALSO the concrete test case for ⓸: the consent it carries is what the mechanism later automates. Then `context-retrieval-1` gets the scout review GATE-1 ⓵ owes it, with `-organ` closed MERGED-INTO in the same card; `provenance-export-1` and `stale-fact-sweep-1` ride the same review wave as small items.

Findings: F-S130-BACKLOG-IS-70PCT-SELF-REPORTS-1 (above) · F-S130-CONTEXT-RETRIEVAL-TWO-HEADS-ONE-WORK-1 (organ ⊂ -1; bootstrap names the wrong head) · F-S130-AUTHORSHIP-LENS-2-LIKELY-SUPERSEDED-1 (diff owed).
