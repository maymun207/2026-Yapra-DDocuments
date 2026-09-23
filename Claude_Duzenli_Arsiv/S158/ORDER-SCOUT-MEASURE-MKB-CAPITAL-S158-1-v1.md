<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-MKB-CAPITAL-S158-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-23T11:5xZ
A MEASURE-ONLY order: no code, no status post, no merge, no production write. NO POLL OR CRON TASK. Bekleme dongusu yok.
ON-DISAGREEMENT: your reading wins; print both.

## PREMISE
MEASURED: 2026-09-23 Supabase turn_trace_digest, turn 644cacc57088fb6c0200062d32048681 (11:27Z): the owner asked "Kaleseramik A.S.'nin 30.09.2025 tarihi itibariyla Kayitli Sermaye Tavani ve Cikarilmis Sermaye tutarlari ne kadardir?". Stage 03 resolved the company, raised no ask. Stage 07 offered 15 tools, NONE from machine-knowledge-base (matchedCategories admin only). Stage 09 prompt carried safety.b1_scope v3 ("SADECE Kale Seramik ve seramik uretimi"). The model refused with 0 tool calls.
MEASURED: CWF-S148 artefacts: the same question was answered with TL amounts via knowledge_search on 2026-08-18 12:30Z; knowledge_search last positive 2026-08-20.
UNMEASURED: whether MKB today still holds that company report and returns the passage (S148 M2 was CANNOT-READ, exit 3). This order measures exactly that and nothing else.

## ORDERS
1. Using the EXISTING production MCP client path the app uses for machine-knowledge-base (grep for its consumer first; build nothing new), call read-only:
   a. knowledge_list: print the document titles (names only) and the count.
   b. knowledge_search with query "Kaleseramik Kayitli Sermaye Tavani Cikarilmis Sermaye 30.09.2025": print for the top 3 hits the source title and the first 300 characters.
   c. Say in one line: does a hit contain the registered-capital ceiling and issued-capital TL amounts? YES / NO / CANNOT-READ.
2. If the path cannot reach MKB from your window: print CANNOT-READ with the exact error line and which credential or env NAME (never a value) is missing. Do not route around it.
3. REPLY on the bus as SCOUT-STATUS-MEASURE-MKB-CAPITAL-S158-1 (under 8192 characters). If the bus write is refused, print the full reply in the window and stop.
FORBIDDEN: repository writes; production writes; printing any environment value.

END · ORDER-SCOUT-MEASURE-MKB-CAPITAL-S158-1-v1
