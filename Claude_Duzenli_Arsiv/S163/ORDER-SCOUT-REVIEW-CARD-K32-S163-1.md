<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-K32-S163-1

LANE: scout (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T03:08Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 · OWNER-RULING-S159-A25-ADOPT-1 · §12.1 (NEW subject → adversary review).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of CARD-K32-ROUTING-OBLIGATION-S163-1-v1 before it goes to AG-1. Card body: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/CARD-K32-ROUTING-OBLIGATION-S163-1-v1.md" (also project box docs/). Print its md5 first. Base: origin/master (1a6279e0c3eddf5ac331b38f5c028b5f17668690 or later — print which).
DESIGN SOURCE the card rests on: A25_cwf-capability-fabric-architecture-v1 (doc repo Claude_Duzenli_Arsiv/yapra-mimari-documents/, and project box docs/) — its §3 table row 2 (routing_obligation, unit (condition, TOOL), hints vs obligations, budget-first, OBLIGATION-OVERFLOW, owner-published only). Quote the row bytes you rely on.

## REVIEW — measure each premise, do not argue it
1. The WHY: the production turn 6dcc95fa1aee0a54d35ab748d8ddf222 stage 07 (basis frame, matchedCategories [material], getCookedStockAndon not offered). You cannot read the DB (GM-1): instead confirm from CODE that on basis 'frame' / path 'semantic' the category keywords are NOT consulted for the current message — quote file:line (stageTools.ts / the frame→category mapper).
2. §12.6 CALLER-ABSENT: does any mechanism that forces a named tool into the offered set already exist (entry floor from data — PR 625's armes.tool_graph_node floor; namedToolsOffered; sticky; unmodeledAdded)? If one exists that can carry (term → tool), the card must be a WIRING card on it, not a new kind. Name it with file:line and say which is smaller and A25-conformant.
3. How are governed kinds declared (kind registry, shape lock, eval-gate checks SCHEMA/REFERENTIAL/BEHAVIORAL)? Is a new kind data (a row) or code+migration? Does the generic Rules UI render a new kind without code? Quote file:line.
4. Budget: which param is the offered-set cap today (router.maxTools is ABSENT per F-S159-ROUTER-BUDGET-PARAMS-ABSENT-1 — confirm) and where does "count against the budget first" have to live?
5. Folding: is PR 621's tokenizeFor the folder the keyword arm uses on the fallback path? Does extractedKeywords already carry folded forms?
6. What the card misses: files not in its fence (tests pinning the offered set, the Tool Matching tab, the inspector), and any NO-HARDCODE trap.

## REPLY
scout_reply as SCOUT-STATUS-REVIEW-CARD-K32-S163-1, first line `REVIEW-VERDICT: GREEN|RED card=CARD-K32-ROUTING-OBLIGATION-S163-1-v1 md5=<md5>`, numbered findings each with a paste-ready delta. Over 8192 chars: bus row = verdict line + sha256; full text ALWAYS to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-REVIEW-CARD-K32-S163-1.md". Then STOP.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-CARD-K32-S163-1
