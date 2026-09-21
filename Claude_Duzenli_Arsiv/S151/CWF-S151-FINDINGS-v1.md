# CWF-S151-FINDINGS-v1

Each finding carries HOW and WHEN (owner rule).

F-S151-CARD-DID-NOT-PREPAY-SHARED-SURFACES-1 — P1-A needed three rulings (learnBrake tail pins, six doc-drift tabs,
stagesRegistry.ts). HOW: every card's SHARED SURFACES names the diagram paths, stagesRegistry.ts (description text),
the manifest via reseal, and learnBrake tail pins when a param is added; the wave's PARAMS card pre-pays all params
once. WHEN: every card from S151 on (P1-B v2 and P1-C1 v2 already carry it).

F-S151-GROUPED-PAYLOAD-RECORDCOUNT-ONE-GROUP-1 — for a {group: [rows]} payload, toolResult.ts:593 counts only the
chosen group and _completeness derives from it (scout E1, P1-B review). HOW: AG-4 card after P1-B lands. WHEN: 2026-09-22.

F-S151-STORED-HANDLE-HOLDS-FIRST-GROUP-ONLY-1 — on the stored path a grouped payload's handle holds 24 of 71 rows, so
aggregate_records cannot reach other groups (scout B2 probe). P1-B makes _aggregates cover the full payload; the
handle itself is repaired in the same follow-up card as the finding above. WHEN: 2026-09-22.

F-S151-ROUTER-HINT-GATED-TO-QUERY-METRIC-1 — SUPERSEDES F-S150-ROUTER-IGNORES-FRAME-METRICS-1: the frame does route;
the governed metric hint is applied only for QUERY_METRIC x {LINE, ZONE, ORDER} (deriveCategories.ts:139). HOW:
CARD-A24-P1C1-METRIC-HINTS-S151-1-v2 under OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1. WHEN: AG-1 in flight.

F-S151-BM25-OVER-TOOLS-EXISTS-NOWHERE-1 — pathB/bm25.ts scorer is called only by scripts/pbFullMeasure.ts; the
incumbent sparse lane is log-TF without IDF; ctx.toolRetrieval has no reader. HOW: P2-0/P2-1 cards (shadow only).
WHEN: cut at S152 open, scout-2, then AG-2.

F-S151-TOKENIZER-CAMELCASE-AFTER-FOLD-1 (read, not executed) — foldKey lowercases before splitIdentifier, so camelCase
splitting cannot fire (learnableCorpus.ts:196-197). HOW: P2-0 characterization test pins it. WHEN: with P2-0.

F-S151-GRAFT-CLI-ABSENT-ON-BRIDGE-1 — the graft CLI is not installed on the bridge VM; the graph (graft/*.md nodes,
graft/.graph/wiring.json) is readable directly. HOW: the Architect and its subagents read graft nodes first; every
card and scout order requires a GRAFT line in the slip. WHEN: from S151.

F-S151-BRIDGE-GIT-LEAVES-LOCKS-ON-COMMIT-1 — the bridge VM cannot unlink files in .git; each doc-repo commit leaves
HEAD.lock, maintenance.lock and tmp_obj_* behind. HOW: after every commit they are moved into .git/stale-locks/
(rename works); status runs with --no-optional-locks. WHEN: standing practice; the stale-locks folder is cleaned
by the owner's next local git operation or a delete grant.

F-S151-ITEM46-DESIGN-CONTRADICTS-OPERATOR-ONLY-DB-1 — the approved item-46 design has the Architect run ALTER ROLE
through Supabase MCP; the owner's rule (S151 23:00 TSI) is that only the Gemini operator writes CWF tables. HOW: the
item-46 card routes ALTER ROLE to the Gemini operator with the verifier from the bus. WHEN: card at S152 open, due
2026-09-22.

F-S151-LANE-NODE-FETCH-IGNORES-PROXY-1 (MERGED-INTO item 30) — AG-1's first factory read failed "fetch failed" in the
sandbox and succeeded unsandboxed (owner screenshot 22:58 TSI).

F-S151-SCOUT-GATE-ONE-ADDRESS-1 — relay_adversary_gate accepts a verdict only from lane_addr 'scout', so two scout
windows share one address; each is told its order by name. Standing.

END · CWF-S151-FINDINGS-v1
