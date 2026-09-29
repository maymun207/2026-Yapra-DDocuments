<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEMORY-MAP-S163-1

LANE: scout-2
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:55Z
AUTHORITY: OWNER-APPROVAL-S163-MEMORY-MAP-1 (the owner, 2026-09-29 09:46 TSİ: "onay hafıza-haritası") · owner design input OWNER-DESIGN-S163-MEMORY-FEEDBACK-1 ("should successful turns feed back — through memory, the graph KB — into routing?") and his question "agent pipeline'da memory doğru ya da effective kullanılıyor mu?".
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable. READ-ONLY.

## WHAT THE ARCHITECT ALREADY MEASURED (production DB, 06:50Z) — you measure the CODE side
```evidence:db
episodes: 786 rows; 83 new in 7 d (= 83 assistant turns in 7 d); 659 ever retrieved; 77 retrieved in 7 d
semantic_memory: 73 rows; 18 new in 7 d; newest update 2026-09-25 09:14Z
tool_experience: 48 rows; positive_count sum 750; retracted sum 5
entity_registry 2651 rows / entity_topology_edges 2675 rows; last_seen refreshed today
turn_feedback: 10 rows total
tour turn 6dcc95fa1aee0a54d35ab748d8ddf222 (answer "teknik bir sorun", 3 tool failures): its episode is stamped outcome class "unproven" — AND tool_experience took POSITIVE increments at 03:04Z for getFactoryList, search_tools, getMaterialTypes, getInventoryCatalogue on that same turn
```

## MEASURE (base = origin/master, print its 40-hex; every claim file:line; grep the CONSUMER, §12.6)
1. THE MAP. For each store — short-term (conversation/session context), long-term, episodic (`episodes`), semantic (`semantic_memory`), procedural (name what plays this role: `tool_experience`? `tool_category_cache`? plan templates? say which, or that none does), Graph KB (`entity_registry` + `entity_topology_edges` + GraphKbReader), and any vector store (`vector_index_digest`): WRITER (file:line, which stage, on which condition), WHAT is written on (a) a grounded-successful turn, (b) an empty-result turn, (c) a failed turn; READER(s) (file:line, which stage); does the read reach stage 07 routing, stage 03 clarify, the prompt, or nothing (CALLER-ABSENT).
2. THE FAILED-TURN WRITE. Why did tool_experience count POSITIVE on the tour turn? Name the predicate (file:line) that decides "positive", and whether an empty [] or a later-failed turn can increment it. Who READS tool_experience, and does it change what is offered or chosen?
3. RETRIEVAL. episodes.retrieval_count / last_retrieved_at and semantic_memory reads: which stage retrieves, by what key, how many per turn, and whether the retrieved text reaches the model (quote the prompt-assembly line).
4. GRAPH KB. GraphKbReader.parentsOf / containsAmong: still CALLER-ABSENT on the answering path at this base (measured so in S134/S147)? Who else reads entity_topology_edges?
5. GATES. For each writer: is it behind a governed switch / brake (router.learnEnabled, memory flags), a review gate (K34 / eval gate), or ungated?
6. A25 FIT. For each store, one line: which A25 learning target it would feed (examples, alias, ranking_policy, obligation CANDIDATE to the owner, default plan) or none; and the smallest WIRING (not new mechanism) that would make it feed that target through the gate.

## REPLY
scout_reply (p_from 'scout-2') as SCOUT-STATUS-MEMORY-MAP-S163-1, first line `MEMORY-MAP: <n> stores · <k> CALLER-ABSENT · failed-turn-positive=<CONFIRMED|FALSIFIED>`. Over 8192 chars: bus row = first line + sha256; full text ALWAYS to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-MEMORY-MAP-S163-1.md" — a TABLE (store · writer · write on success/empty/fail · reader · reaches routing? · gate · A25 target). Then back to your wait.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-MEMORY-MAP-S163-1
