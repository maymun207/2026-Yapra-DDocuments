<!-- relay-audit: v1 kind=card -->
CARD-A2A-BENCH-PERSONA-S143-1-v2

LANE: AG-4
fanout: personalized
SUPERSEDES v1, which carried measurement instants AFTER its own minting (a clock error, corrected; content unchanged).
A PRODUCT card, NEW subject — it goes to the scout first (§12.1); no exemption is claimed.
Owner rulings it rests on: OWNER-APPROVAL-S143-G10-BENCH-PERSONA-1 ("evet", 2026-09-19 23:23 TSİ) and the SOTA
contract's own confound rulings (cwf-sota-definition-v1_5 §7: "benchmarks run in English"; "Tier A/B/F run CWF
outside its domain on purpose").

THE PROBLEM, in one paragraph. The A2A arm (a2a/runTask.ts) runs the SAME turn pipeline as chat, so it answers
under the SAME governed system prompt: `identity` says the assistant is Kale Seramik's and its ONLY task is Kale
Seramik factory data, and `safety.b1_scope` makes everything else OUT-OF-SCOPE and orders the standard refusal.
A third-party benchmark task (τ²-bench, GAIA, API-Bank, MCP-Bench) is outside that scope by construction, so
the arm refuses it — in any language. The whole prompt is Turkish; the one reply-language rule (in `tone`) sits
inside a Turkish, Kale-only frame, which is the recorded "answers Turkish to English tasks" observation
(BENCH-A2A-1 owed item; G6 MERGED-INTO this card).

PRECONDITION: origin/master is 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 or a descendant; the prompt segment set is
still the closed list in api/cwf/_lib/prompt/core/segmentIds.ts; a2a/runTask.ts still passes `language: 'en'`. If
any segment for a benchmark persona already exists, STOP — the work exists (§12.7).

```evidence:the-seam
segment ids     api/cwf/_lib/prompt/core/segmentIds.ts — closed list incl. 'identity', 'safety.b1_scope', 'tone'
floor           api/cwf/_lib/prompt/core/promptFloor.ts:48 'identity', :56 'safety.b1_scope', :97 'tone'
composers       core/identity.ts:11 identity(seg) → seg['identity']; core/safety.ts:22 safety(seg) embeds seg['safety.b1_scope']
a2a arm         a2a/runTask.ts:146-153 — language: 'en' is a detector tie-break only (its own comment)
governed rows   domain_rules kind prompt.segment, published: identity v1, safety.b1_scope v3, tone v1 (all Turkish)
```

## PREMISE

MEASURED: the segment list, floor lines, composers and the a2a tie-break comment in `the-seam`, by grep/sed over the shared clone at master, 2026-09-19T20:30Z.
MEASURED: the three governed rows and their language in `the-seam`, via execute_sql over domain_rules at 2026-09-19T20:29Z.
NOT-READ: whether the arm actually refuses a live English benchmark task today — ORDER 4 measures it.

## ORDERS

ORDER 1 - A BENCH PERSONA THAT ONLY THE A2A ARM SEES. Add two segment ids to the closed list — a benchmark
identity and a benchmark scope — with English code floors and English governed rows (seeded through the existing
prompt-segment seed/publish path, never a direct table write). The bench identity: a general-purpose assistant that
answers the task it is given using the tools it is offered. The bench scope: NO domain restriction; everything else
in safety (b2 leakage, b3 PII, b4 jailbreak, b5 tool-content injection, core directives) is UNCHANGED and still
applies. Reply in the language of the task.

ORDER 2 - SELECTION BY ARM, NOT BY TEXT. The A2A arm selects the bench identity + bench scope in place of `identity`
and `safety.b1_scope`; the chat arm is byte-identical to today. Carry the selection as an explicit field on the
turn input set by a2a/runTask.ts only — never inferred from message content, never reachable from api/cwf/chat.ts.

ORDER 3 - TESTS, failing-first: (a) chat arm renders the byte-identical system prompt as master (golden compare);
(b) A2A arm renders the bench identity and bench scope and NOT the Kale identity/scope; (c) the other five safety
blocks are present on BOTH arms; (d) no path from chat.ts can set the bench selection (grep-pinned, like
a2aDisjointArms.test.ts); (e) outage posture: with no governed rows, both arms render their code floors.

ORDER 4 - WITNESS, after landing: ONE English task over the A2A arm against a configured environment (the existing
scripts/a2aClient.ts), task outside the Kale domain; record reply language and whether it refused. Spend is inside
the owner's R4 budget. Report the reply's first line and the digest's turn id.

ORDER 5 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (doc-drift — reseal in
the SAME commit if prompt files are mapped) and `npm run check:tenant-zero`, print both. Report at
docs/relay/A2A-BENCH-PERSONA-S143-1-AG4-report.md; the report follows the landing and never gates it (§12.8).

## FALSIFIER

If selecting the persona requires touching api/cwf/chat.ts's behaviour, STOP and print the seam. If the prompt
composer cannot take a per-turn segment choice without a second composer, STOP — one composer, two selections.
If any of the five kept safety blocks would change on either arm, STOP.

## SHARED SURFACES

```scope
- api/cwf/_lib/prompt/core/** (segment ids, floors, composers)
- a2a/runTask.ts and the turn-input type it fills
- scripts/seedPromptSegments.ts or the existing publish path (seed rows only)
- api/cwf/__tests__/** (tests a-e)
- public/architecture/manifest.json (reseal, same commit, if required)
- docs/relay/A2A-BENCH-PERSONA-S143-1-AG4-report.md
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the seam: segment list, floors, composers, a2a tie-break | MEASURED: grep/sed over the shared clone at master, 2026-09-19T20:30Z | the-seam |
| the governed rows are Turkish and Kale-scoped | MEASURED: execute_sql over domain_rules, 2026-09-19T20:29Z | the-seam |
| the live refusal of an English benchmark task | NOT-READ | ORDER 4 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is
reported as a finding in its own right.

DECAYS if origin/master moves by a commit touching api/cwf/_lib/prompt/core/** or a2a/runTask.ts, or if a v3 appears.
