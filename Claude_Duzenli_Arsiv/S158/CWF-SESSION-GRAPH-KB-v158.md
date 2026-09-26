# CWF-SESSION-GRAPH-KB-v158
Edges learned in S158, each tagged. Adds to v157; rewrites nothing.

- [S158] semantic router (LLM) --returns--> matched categories + IR frame (6 actions x 13 objects, confidence).
- [S158] router.frameRouting=1 AND confidence HIGH --makes--> MATRIX[action][object] (static code, deriveCategories.ts) REPLACE the router's categories; AMBIGUOUS unions; a null cell keeps the router's set.
- [S158] MATRIX universe {andon, machine, factory, metrics, production, material, transfer, logistics, employee, quality, linestop, admin} --has-no--> knowledge category --so-before-PR-620--> machine-knowledge was dropped and knowledge_search never offered.
- [S158] PR 620 --keeps--> any category outside the universe derived from MATRIX, only when basis==='frame'; observable as unmodeledKept / unmodeledAdded in stage 07 and the [Route] log.
- [S158] 616's falsifier hash (routeDecisionMatrix.ts) --excludes--> observation fields (derived, unmodeledKept, unmodeledAdded); pin 44a7b5db unchanged.
- [S158] keyword matcher (matchCategories) --is-not-run-on--> the semantic path.
- [S158] ALWAYS_INCLUDE {getFactoryList, getFactoryLines} --hardcoded-in--> toolCategories.ts (item 83).
- [S158] a backend with no category --is-offered-whole--> (backendCoverage).
- [S158] governed rows (domain_rules): prompt.segment (identity, safety.b1_scope), tool_category, agent.param (golden.enabled, router.*) --changed-via--> admin UI with the owner; publish goes through a golden run.
- [S158] golden runner --does-nothing-when--> golden.enabled=0, silently.
- [S158] turn_trace_digest.stages --keys--> 01 02 03 07 09 10 12 14; stage 07 register-tools output carries matchedCategories, basis, irFrame, offeredToolNames; stage 10 carries toolLoop, toolCalls, cwf.grounding.
- [S158] messages.raw_tool_results --holds--> the tool bytes an answer can be checked against.
- [S158] merge guard MERGE-HAND-EDIT --rejects--> any merge commit that differs from its rehearsal outside reseal paths; a conflicting sibling lands only via a fresh branch from master with ordinary commits.
- [S158] COLLISION --fails--> the higher-numbered open PR; closing the lower one unblocks.
- [S158] Vercel production deployment list --reads--> master sha + merge message + READY without GitHub credentials (Architect-readable landing proof).
- [S158] one scout order --can-be-run-by--> two windows; the first may post the GitHub status and land without any bus reply (consumed_at unstamped).
- [S158] scout windows --lack--> Supabase env (CANNOT-READ); the Architect reads production DB via Supabase MCP.
END · CWF-SESSION-GRAPH-KB-v158
