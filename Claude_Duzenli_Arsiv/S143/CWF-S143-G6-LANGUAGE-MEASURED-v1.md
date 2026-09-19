CWF-S143-G6-LANGUAGE-MEASURED-v1

S143 · 2026-09-19T20:27Z · master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 · Architect, READ-ONLY.
Subject: "the A2A arm answers Turkish to English tasks" (owed item of BENCH-A2A-1, 2026-08-14).

## MEASURED
1. The answering system prompt is assembled from published `prompt.segment` rows (domain_rules). Every one of
   them — identity, tone, safety.b1..b5, safety.core_directives, tools.header, tools.rule.1..10 — is written in
   Turkish, and NONE carries an instruction about the reply language. Only `viz` is English. READ: select over
   domain_rules where kind_id ilike '%prompt%' and status='published'.
2. The only language lever on the A2A path is `language: 'en'` at a2a/runTask.ts:153, which the BENCH-A2A-1 record
   says fixes only the detector tie-break, not the model's reply language.
3. The segment set is a CLOSED code list: api/cwf/_lib/prompt/core/segmentIds.ts, with a code floor in
   promptFloor.ts and fixed assembly in safety.ts / toolProtocol.ts. A NEW segment id is a code change; an edit
   to an EXISTING segment's text is a governed-row publish.

## THE SECOND, LARGER CONFOUND (named here, it is not G6)
`identity` says the assistant is Kale Seramik's and its ONLY task is Kale Seramik factory data; `safety.b1_scope`
makes everything else OUT-OF-SCOPE and orders the standard refusal. A third-party benchmark task (τ²-bench
retail/airline, GAIA, API-Bank) is out of that scope BY CONSTRUCTION and would be refused, in any language.
This is recorded as new gap G10 — a benchmark persona/scope for the A2A arm — and is an OWNER DECISION
(it touches what the product is allowed to answer), not a wording fix.

## PROPOSED REPAIR FOR G6 (not cut; awaiting owner approval)
One governed-row publish, no code: `tone` v1 → v2 adds one line — reply in the language of the user's message
(Turkish message → Turkish reply, which is today's behaviour for every Kale user; English → English). Code floor
for `tone` in promptFloor.ts updated in the same PR so an outage does not revert the behaviour. Scout first
(new subject). Acceptance: one A2A task in English answered in English, one chat turn in Turkish unchanged.

END · CWF-S143-G6-LANGUAGE-MEASURED-v1
