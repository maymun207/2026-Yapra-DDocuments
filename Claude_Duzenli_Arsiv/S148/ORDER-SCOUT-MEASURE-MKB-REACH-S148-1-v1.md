<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-MKB-REACH-S148-1-v1

LANE: scout
fanout: personalized (one lane, one body)
FROM: Architect, S148
OWNER APPROVAL: owner "Onayliyorum" 2026-09-20 15:18 TSI for M1-M3 of CWF-S148-RCA-MKB-UNREACHABLE-v1 (M1 done by the Architect).
A MEASURE-ONLY order: no code, no status post, no merge, so no adversary review applies (12.9: the scout is the measuring instrument). NO POLL OR CRON TASK. Bekleme dongusu yok. This is the only order for this window.
ON-DISAGREEMENT: if anything below reads differently at the head you measure, your reading wins; print both.

## PREMISE

MEASURED: 2026-09-20T12:25Z, Supabase messages + tool_experience: knowledge_search last positive 2026-08-20T13:11:59Z; company-report questions answered via knowledge_search on 2026-08-11/12 and 2026-08-18 12:30Z; entity-ask replies 0/day until 08-17, 14 on 08-18.
MEASURED: 2026-09-20T12:25Z, domain_rules agent.param router.frameRouting v4 value 1 published 2026-08-18T02:04:43Z (v3 value 0 archived).
MEASURED: 2026-09-20T12:30Z, git grep over master in the owner clone: the entity-ask text lives at api/cwf/_lib/routing/computeClarification.ts:179, HIGH trigger 1 (entity_ref non-empty, none resolved).
UNMEASURED: whether the MKB document corpus still holds the company report (M2) and whether frameRouting alone flips the August questions from answered to asked (M3).
SELF-INVALIDATION: dies if origin/master moves by a commit touching api/cwf/_lib/routing/ or api/cwf/_lib/toolCategories.ts or api/cwf/_lib/turn/stageClarify.ts.

## ORDERS

0. If the file /tmp/sc147/reply.txt from your previous window still exists and SCOUT-STATUS-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v2 is not on the bus, post it first with its own /tmp/sc147/post.mjs. If that is refused again, say so in one line and continue.
1. M2 - MKB INVENTORY. Using the EXISTING production MCP client path the app already uses for machine-knowledge-base (grep for its consumer first; build nothing new), call knowledge_list and knowledge_search read-only. knowledge_search query: "Yonetim Kurulu uyeleri ve ust duzey yoneticilere saglanan faydalar 2025 dokuz aylik". Print: the document titles knowledge_list returns (names only, count), and whether knowledge_search returns a passage from the company report with a TL amount (print the source title and the first 200 characters). If no existing client path can reach MKB from your window, print UNMEASURED with the reason; do not route around it.
2. M3 - REPLAY. With the EXISTING offline routing/clarification lenses (e.g. scripts/runRouteShadowLens / runClarificationLens or their siblings; name the one you use), run these five questions through master's stage-03 clarification and stage-07 routing twice, once with frameRouting=0 and once with frameRouting=1, offline (no production write, C1 LAW): (a) the capital-ceiling question of 2026-08-18T12:30Z, (b) the board-benefit question of 2026-09-20T10:57Z, (c) the plant-locations question of 2026-08-12T12:25Z, (d) the strategy question of 2026-08-11T08:15Z, (e) the headcount question of 2026-08-18T12:32Z (texts: read them from public.messages by those timestamps). For each run print: entity_ref, clarification level, matchedCategories, whether knowledge_search is offered. If a lens needs an LLM call and cannot make it offline, say so and print what it could compute.
3. REPLY on the bus as SCOUT-STATUS-MEASURE-MKB-REACH-S148-1 (under 8192 characters). If the bus write is refused, print the full reply in the window and stop.
FORBIDDEN: read-only on the repository; no status post; no production write; never print an environment value (npm run env:presence, not env).

END · ORDER-SCOUT-MEASURE-MKB-REACH-S148-1-v1
