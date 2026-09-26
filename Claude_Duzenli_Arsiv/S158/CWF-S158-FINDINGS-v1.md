# CWF-S158-FINDINGS-v1

Cut at S158 close, 2026-09-26T14:45Z. Each finding: what, evidence, fix, date. Carried by name into register v149 §3.

| Finding | What happened (evidence) | Fix · when |
|---|---|---|
| F-S158-FRAME-REPLACE-DROPS-UNMODELED-CATEGORIES-1 | The IR frame REPLACED the router's categories with MATRIX[action][object]; MATRIX has no knowledge category, so machine-knowledge was dropped and knowledge_search was never offered for the capital question (trace 2026-09-26T02:58Z). | CLOSED@PR 620 merge 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 + ACCEPTANCE-D6-CAPITAL-QUESTION-S158-1 (unmodeledKept [machine-knowledge], toolCalls 1, answer = source bytes). |
| F-S158-ARCHITECT-EDITED-DATA-BEFORE-MEASURING-TRACE-1 | Architect changed keywords (MKB tool_category v2), b1_scope v4 and identity v2 on 09-23 before reading the turn trace; the product still refused; the real cause (frame replace) was visible in stage 07 the whole time. | Standing: read turn_trace_digest stage 07 BEFORE any governed-data edit on a routing complaint. Recorded as A-REC-S158-1. |
| F-S158-GUARD-CONFLICT-HAS-NO-MERGE-PATH-1 | Merge guard rejects any hand-resolved merge commit (MERGE-HAND-EDIT); RULING-PR618-TOOLCATEGORIES-UNION ordered exactly that, and PR 618 went RED at d7e72faa. | Resolved by RULING-PR618-FRESH-BRANCH-S158-1: a conflicting sibling is carried byte-exact onto a fresh branch from master as ordinary commits, new PR (620 landed this way; 619 rebuild ordered the same way). Guard's failure message should name this remedy: small card S159. |
| F-S158-TWO-SCOUT-WINDOWS-RAN-ONE-ORDER-1 | ORDER-SCOUT-LAND-PR620 was executed by one window (status 10:34:01Z, landing 10:34:14Z) with NO bus reply, and later by a second window (SCOUT-STATUS-LAND-PR620-S158-1, 13:41:50Z). Same happened for PR 616. consumed_at is never stamped on scout orders. | Item 67 (consumed_at stamping) extended: the scout reader stamps consumed_at and refuses an order already consumed. Card S159. |
| F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1 | cwf.grounding printed numericValues [] for an answer carrying 1.000.000.000 and 514.778.660,51. | S159 first card: tr-TR number parsing in the grounding extractor + falsifier test on this answer. |
| F-S158-GOLDEN-GATE-UNDERPOWERED-1 | Golden runs for b1_scope v4 / identity v2: 110 of 200 reps empty; gate passed on a thin sample. | Card S159: golden runner reports empty-rep ratio and fails above a governed threshold. |
| F-S158-GOLDEN-RUNNER-DISABLED-SILENT-1 | "Process now" did nothing because golden.enabled=0; the UI showed no reason. | Card S159: UI prints the disabled reason; owner set golden.enabled=1 on 09-23. |
| F-S158-ALWAYS-INCLUDE-ARMES-HARDCODE-1 | ALWAYS_INCLUDE {getFactoryList, getFactoryLines} hardcoded in toolCategories.ts; offered on the capital question. | MERGED-INTO item 83 (G2c). |
| F-S158-TR-INFLECTION-BLIND-1 | Keyword matcher misses inflected forms ("sermayesi" vs "sermaye"). | MERGED-INTO item 51/40d P2-0 (TR analyzer). |
| F-S158-KEYWORD-OVERLAP-HYGIENE-1 | Overlapping keywords across categories (makine, parametre, enerji, bilgi, rapor, personel sayısı, faaliyet raporu). | Operator data card S159. |
| F-S158-SCOUT-WINDOW-LACKS-SUPABASE-ENV-1 | ORDER-SCOUT-MEASURE-MKB-CAPITAL returned CANNOT-READ: scout window has no DB env. | Architect reads production DB itself (Supabase MCP) for such measures; no card. |
| F-S158-ARCHITECT-CLAIMED-SCOUTS-CANNOT-WRITE-BUS-1 | Architect told the owner scouts cannot write to the bus; scout_reply works. | Corrected in session; standing: measure a lane's write path before asserting it. |
| F-S158-REGISTER-V148-COMPRESSED-ROWS-1 | Register v148 dropped row detail (58-G4 scope, 40c golden case, 40d P3, etc.). | CLOSED@register v149 (carries the CONSOLIDATED-OPEN-ITEMS-v1 detail). |
| F-S158-STALE-LANE-OUTPUT-PASTED-1 | Owner pasted lane outputs captured before PR 616 landed; Architect had to re-issue texts. | Boot texts name the bus row time; the reply names the head it saw. No card. |
| F-S158-SOTA1-FIRST-UNMEASURED-1 | Whether S158's first tool call was SOTA-1 is not readable after two context compactions. | Bootstrap v160 §0 repeats the rule. |

A-REC-S158-1 (Architect blind spot, by name): tuned governed data twice on a routing complaint without reading the stage-07 trace; two sessions of owner frustration followed.
OWNER DESIGN CONTRIBUTIONS (S112-YASA-1): (1) 2026-09-23 14:42 TSİ, the owner: "madem bu bir ayar o takdirde arayüzden bunu yapabiliyor olman lazım" — governed settings are changed through the admin UI with him, not by the Gemini operator; adopted. (2) 2026-09-26 06:20 TSİ, the owner asked for the frame table and the deterministic flow explained table by table; the explanation (CWF-ROUTING-DETERMINISM-EXPLAINER-S158-1) made the drop mechanism explicit and fixed the card's scope to basis==='frame'.
END · CWF-S158-FINDINGS-v1
