# CWF-SESSION-GRAPH-KB-v163
Edges learned in S163, each tagged. Adds to v162; rewrites nothing.

## FACTORY
- [S163] relay_adversary_gate (live trigger) --refuses--> kind=notice carrying "## ORDERS" (AG007) --but-admits--> "## ORDER" (singular) · F-S163-AG007-HEADING-LITERAL-1
- [S163] a card to AG-n --needs--> a seal: GREEN verdict row, or EXEMPT + ack = a scout from_lane row (AG002 without)
- [S163] merge-guard FORCE-PUSH rule --fails--> any PR whose timeline holds a head_ref_force_pushed event, permanently (server-side `update-branch --rebase` counts) · PR 637
- [S163] branch ruleset --requires--> head up to date with master (mergeStateStatus BEHIND blocks auto-merge) · PR 637
- [S163] therefore an open PR can be neither updated nor merged once master moves → close and carry to a fresh branch (practice 145)
- [S163] scout addresses scout-1 / scout-2 (PR 636 + migration 20260929030000) --ack-by--> the scout's own scout_reply(p_reply_to, p_from, …); a replied card leaves the box
- [S163] mail-wait on master --refuses--> --since when the lane has a measured watermark (exit 2); free.md still orders --since (drift, 149)
- [S163] scouts --run--> mail-wait from the SHARED clone's disk → a stale clone means a stale reader
- [S163] shared clone ff --blocked-by--> a local edit of tracked .claude/settings.json when upstream changed it too; lane sandbox denies writing that file by name; the owner's approval prompt unlocks it (AG-3)
- [S163] bridge `git status` in a connected clone --leaves--> .git/index.lock (unlink not permitted); rename within the same folder works
- [S163] gh.sh (cwf-architect-ro) --reads--> git/ref/heads/master and pulls without a lane → the Architect's own anchor
- [S163] migrations of landed PRs --are-not-applied-by--> landing; the Gemini operator's `supabase db push` from a clean worktree (dry-run first) applies them under their file versions
- [S163] AG lanes in mail-wait --take--> a card in 10–77 s (7 measurements)

## PRODUCT — ROUTING
- [S163] K32 (PR 638) --adds--> CORE kind routing_obligation {tool, when_any, note}; the door beside the named-tool door offers an obligated tool on every path, owner-published only
- [S163] router.frameEnabled (existing) --gates--> only the frame-extraction instruction; router.frameRouting --gates--> derivation, hints, metric floor, AMBIGUOUS union, derived record, stage 03 clarify, health frameRoutingDark
- [S163] production agent.param published: router.enabled 1 · router.frameEnabled 1 · router.frameRouting 1 (v4) · router.frameOnAllPaths 0 · router.learnEnabled 0 · vector.enabled 1 · vector.toolRetrievalMode 0 · toolCensus.composeEnabled 0 · planner.enabled 1
- [S163] rule 4f38df6f keyword "pişmiş" --stored-as--> 7069c59f6d69c59f (NFC lowercase) = the tour token byte-for-byte
- [S163] matchCategories --unions--> the learned cache FIRST, then published/floor keywords; K41's arm uses it with an EMPTY learned map

## PRODUCT — MEMORY (scout-2 map at ee12161e)
- [S163] episodes --written-every-turn-by--> distillAndWriteEpisode (stage 14) --read-by--> stage 12 warm-trust (topK 3) → the user message (memorySliceBlock); never stage 07
- [S163] pipeline order --runs--> stage 07 register-tools BEFORE stage 12 memory retrieval (pipeline.ts:22 vs :24)
- [S163] semantic_memory --written-only-when--> procedureEligible (not failed, grounded, toolFailures 0, frame present) --read--> prompt dossier (k=2)
- [S163] tool_experience --incremented-per-sent-call--> unless classified error; empties and MCP isError count positive; read only by the offline census re-probe (suppressing it)
- [S163] mcpClient --drops--> result.isError; ClassifyInput.transportError has no production caller
- [S163] classifyTurnOutcome --ignores--> toolFailures for `failed`; `unproven` is offerable
- [S163] tool_category_cache --is-the-only-learned-input-to--> stage 07; written without an outcome test; braked by router.learnEnabled=0
- [S163] GraphKbReader.parentsOf/containsAmong --caller-absent-- (no caller, not even a test)
- [S163] router_proposals --is--> a human review queue already shaped like A25's proposal path; fed on the semantic path; no consumer
- [S163] turn_feedback --has--> 10 rows, 0 reviewed, no reader in learning

## OWNER
- [S163] owner design input: successful turns should feed learning (memory, graph) → answered: yes, through a gated proposal path, never into the matrix (OWNER-DESIGN-S163-MEMORY-FEEDBACK-1)
- [S163] owner ruling: memory gets its own architecture (A26), the same depth as the understanding layer (OWNER-DESIGN-S163-MEMORY-A26-1, OWNER-APPROVAL-S163-MEMORY-PLAN-1)
END · CWF-SESSION-GRAPH-KB-v163
