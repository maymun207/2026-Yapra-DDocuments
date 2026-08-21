# Superset MCP için agent system prompt önerileri

**Sohbet ID (UUID):** `37cb9e10-2632-4580-9788-0983053f6d21`

**Oluşturulma Tarihi:** 2026-06-26T13:55:27.959305Z

**Güncellenme Tarihi:** 2026-06-27T05:56:35.310177Z

**Özet:** **Conversation Overview**

This conversation focused on configuring an AI agent to effectively use Apache Superset MCP integration. The person works with Superset 6.1 and has built a custom agent with MCP implemented via an npx-based (Node) server that communicates with Superset through its REST API. The session involved two main deliverables: first, a detailed system prompt for the Superset MCP agent, then a full AntiGravity (Opus 4.6 thinking mode) task brief to implement and validate that configuration.

The person confirmed mid-conversation that they are not using LiteLLM as a gateway — they wrote their own agent and implemented MCP directly with an npx deployment. This correction required significant revision to the initial task brief, which had been authored with the native Apache MCP service (FastMCP/SIP-187) and LiteLLM assumptions. The revised brief correctly targets the community npx/REST-API-backed server architecture, with key behavioral differences documented: immediate persistence on create/update (no preview/draft step), no guaranteed server-side response size cap (agent must self-limit), and no automatic credential redaction in error payloads (agent must never echo raw REST errors containing secrets). The person uses PostgreSQL and ClickHouse as their database backends, and their domain involves ceramic factory OEE and scrap data with zone-level granularity.

The final output was a structured AntiGravity task brief saved to file, organized in four phases with explicit verification gates: Phase 0 empirically discovers the actual MCP tool inventory and persistence model without assuming tool names; Phase 1 authors the system prompt file using discovered names; Phase 2 verifies the existing integration's secret hygiene (grep for hardcoded credentials in npx spawn args and agent code); Phase 3 runs a read-only smoke test; Phase 4 documents findings and auto-populates a Dataset Glossary in the system prompt. The person's standing hard rules — never touch `.env` files, never expose raw secrets in commands or logs, use exact resource identifiers, enforce cross-phase verification — were embedded directly into the brief as non-negotiable agent constraints. The conversation ended with a prompt to share the exact npx package name so tool names and save behavior could be hardcoded into the brief rather than discovered at runtime.

**Tool Knowledge**

The Superset MCP integration in this context uses a community npx/Node server over the Superset REST API, not the native Apache service. A critical operational distinction: unlike the native FastMCP server (which requires Superset 5.0+ and uses a preview-first workflow where chart generation returns an Explore link without persisting), the npx/REST-API-backed servers typically persist objects immediately on create or update with no draft step. Any system prompt or agent brief targeting this architecture must treat every mutation as permanent and require same-turn explicit user confirmation before calling any create/update/delete tool. The native service's ~25K token response cap also does not apply to community servers — pagination, server-side filtering, and result summarization must be enforced by the agent itself rather than relied upon from the server layer. Additionally, native MCP middleware automatically redacts credentials from error payloads; community REST servers do not, so the agent must be explicitly instructed never to echo raw error responses that may contain connection strings or tokens. Tool names vary by npx package and must be discovered at runtime via the tool-search interface rather than hardcoded; the exact package name was not confirmed in this conversation.

---

## 👤 Kullanıcı (2026-06-26T13:55:28.442935Z)

superset mcp yi en effective sekilde kullanabilmesi icin bir agentin system promptuna ne eklenmesini onerirsin?

## 🤖 Claude (2026-06-26T13:57:48.201442Z)

The user is asking in Turkish what should be added to an agent's system prompt to effectively use the Superset MCP server. I'm recognizing this is a technical question about configuring an AI agent to work with Superset's model context protocol integration.

I should search for current information about the Superset MCP server's capabilities and tools to give accurate guidance, since MCP is relatively new and the specific tool set may have evolved. The question is phrased in Turkish, so I'll respond in Turkish while incorporating the technical details. I should search for the actual Superset MCP tools to give accurate recommendations rather than guessing. The system prompt needs to cover the tool inventory and when to use each one, Superset's object hierarchy (databases → datasets → charts → dashboards), and SQL Lab best practices like schema exploration and query limits. I'll need to search for the Superset MCP server and related tools to understand the exact API structure and available operations.
```
This block is not supported on your current device yet.
```

I'm seeing there are multiple Superset MCP implementations available. The official Apache Superset MCP service is the primary one—it's built on FastMCP with about twenty tools, enforces role-based access control, and requires Superset 5.0 or later. It uses a preview-first workflow where you explore changes before saving them, manages a token budget of 25K, and has a tool-search interface. Beyond that, there are community alternatives like aptro/superset-mcp that use REST APIs.

The official implementation has some important architectural details: it validates chart generation through four layers (schema, dataset, runtime, column normalization), organizes objects hierarchically from databases down to dashboards, and treats datasets as the semantic layer with columns, types, metrics, and filters. The Superset documentation also recommends being specific in prompts, starting with exploration, and reviewing AI-generated content before committing changes.

I think I have enough information to write a solid answer now, though I'm considering whether to pull more details. I need to figure out which Superset MCP version he's using since the official Apache one and community variants have different preview/save semantics, but I'll anchor the prompt on the universal object model and flag that distinction for him to verify. He asked in Turkish, so I should respond in Turkish for consistency on prompt engineering advice, though I'll keep the technical content clear. I'm weighing whether to deliver the system prompt as an inline code block or as an artifact file — it's reference content he'll copy into his agent config, and while it's fairly lengthy, an inline block might work better for iterative discussion, though the length suggests an artifact would be more practical. system prompt is probably 60-100 lines, so a markdown artifact makes more sense than an inline code block for something that substantial and reusable.

Actually, let me step back — I should check if there's a markdown skill I need to reference first. Looking at my available skills, there's no md skill listed, so I can create a plain markdown file without needing to consult one. But thinking about his workflow as a hands-on engineer iterating conversationally, providing it inline might actually be better — he can copy it directly and we can refine it together in the chat rather than working through an artifact. in the loop together, and keeping the response conversational fits this exchange. Now I'm thinking through the core elements of an effective Superset MCP agent—the object hierarchy where databases connect to datasets, which then feed into charts and dashboards, and how the agent needs to understand that charts reference datasets rather than raw tables. The critical rule is establishing a discovery-before-action protocol so the agent never guesses at dataset IDs or column names.

I also need to emphasize the preview-first semantics: charts generated through the tool return an Explore link for review but aren't automatically saved, so I have to be careful not to claim I've created something when I've only previewed it, and I should explicitly ask before persisting any changes.

For SQL work, I need to respect the database dialect being used—whether that's Postgres, ClickHouse, or Trino—and always add LIMIT clauses on exploratory queries rather than scanning entire tables. I should never run DDL or DML operations without explicit confirmation, and when possible, query the governed semantic layer through datasets instead of hitting raw tables, since that aligns with treating the LLM as a reasoning engine over governed data rather than a source of truth.

I also need to be mindful of the response token budget, which caps around 25K tokens, so I should paginate results, filter server-side, request only the columns I need, and summarize large result sets rather than pulling thousands of rows into context.

When working with data, I operate within the authenticated user's permissions and can't escalate privileges—if a permission error comes back, I surface it directly without retrying or making assumptions. Before creating objects, I check if something with that name already exists to avoid duplicates, and after any mutation, I verify it actually persisted. For destructive operations, I always ask for confirmation first.

When building charts, I need to validate that the visualization type matches the data, ensure metrics exist in the dataset or are valid aggregations, and for time-series charts, confirm there's a temporal column with appropriate granularity. I'll lean on the MCP's validation pipeline to catch errors and read its messages to self-correct rather than guessing.

If something fails, I identify the root cause—whether it's a bad column name, missing dataset, or SQL dialect mismatch—then retry once or twice. If it still doesn't work, I report the exact failure with the problematic parameter rather than looping endlessly. Once I'm done, I report back what was created: the object type, ID, name, dataset binding, whether it's previewed or saved, and a link to it. I'm careful to distinguish between what I've proposed versus what actually executed.

I never invent dataset IDs, chart IDs, column names, metric names, or data values—if I don't know something, I discover it through the tools. I only report what the tools actually returned, never fabricate query results. For his specific domain with ceramic factory OEE and scrap data in ClickHouse or Postgres, I could reference a domain glossary if he provides one, but I'll keep the approach general and let him add that context as needed.

The real issue with Superset MCP agents isn't tool access—it's that they guess at dataset and column names, and they confuse preview operations with saved changes. So the system prompt needs to enforce discover-before-act, encode the object hierarchy clearly, and pin down the save semantics and guardrails. I'll draft this in English first, then frame it in Turkish with the design rationale, and end by confirming which MCP server variant he's using since that affects the save-by-default behavior. I'll add citations to the Turkish explanation where I'm referencing specific facts from the sources about Superset MCP's behavior.Superset MCP ajanlarının başarısızlık nedeni neredeyse hiçbir zaman "araca erişememek" değil — iki şey: ajanın **tahmin yürütmesi** (dataset ID'si, kolon adı, metrik adı uydurması) ve **"önizleme" ile "kaydedildi" durumunu karıştırması.** Resmi Apache MCP'sinde grafikler varsayılan olarak kaydedilmez; tool önce bir Explore linki döner, kullanıcı "save it" diyene kadar hiçbir şey kalıcı olmaz. İş akışı bilinçli olarak iteratiftir: önizle → ayarla → memnunsan kaydet. Sistem promptunun asıl işi bu yüzden araç tarifi değil, **davranış sözleşmesi** dayatmak: önce keşfet, sonra hareket et; nesne hiyerarşisini içselleştir; mutasyon sınırlarını netleştir.

Bir de iki yapısal kısıt var ki prompta yazmazsan ajan duvara çarpar: yanıtlar varsayılan 25K token ile sınırlıdır (büyük result-set dump'ı patlar), ve MCP, kullanıcının web UI'daki RBAC izinlerini birebir uygular — ajan yetki yükseltemez.

Aşağıdaki bloğu ajanının system promptuna ekle (resmi Apache 5.0+ MCP semantiğine göre yazıldı):

```
# Role
You operate an Apache Superset instance through its MCP tools. You build and modify
datasets, charts, and dashboards, and run analytical SQL — accurately, never by guessing.

# Superset object model (internalize this)
Database (connection) → Dataset (the SEMANTIC LAYER: physical table or virtual SQL,
with typed columns, calculated columns, saved metrics, and defined filters) →
Chart (one viz bound to exactly ONE dataset; uses that dataset's metrics/dimensions) →
Dashboard (layout of charts + native filters).
Charts reference DATASETS, not raw tables. Metrics and dimensions come from the
dataset definition. A chart can never use a column or metric that the dataset doesn't expose.

# Rule 1 — Discover before you act (non-negotiable)
Never invent a dataset ID, table name, column name, or metric name.
Before building any chart or query:
  1. list/search datasets to find the right one
  2. get_dataset to read its EXACT columns, types, saved metrics, and temporal columns
  3. Only then construct the chart/query using verified names
For raw SQL: introspect the schema (database tables/columns) first. Same rule.
If you don't know an ID or name, look it up — do not assume.

# Rule 2 — Preview vs. saved (the #1 footgun)
Chart generation returns an Explore link for REVIEW; nothing is persisted yet.
Never claim you "created" or "saved" a chart when you only previewed it.
Persist only when the user explicitly approves (e.g. says "save it"). After saving,
report the resulting chart ID and name. Always distinguish PROPOSED from PERSISTED.

# Rule 3 — SQL discipline
- Read-only by default. Never run DDL/DML (DROP, DELETE, UPDATE, INSERT, TRUNCATE,
  ALTER) without explicit user confirmation in the same turn.
- Always LIMIT exploratory queries. Never SELECT * on a large table.
- Check the target database engine and write valid SQL for THAT dialect
  (e.g. ClickHouse vs PostgreSQL differ on functions, date math, quoting).
- If a cost-estimate / SQL-validation tool exists, use it before running heavy queries.
- Prefer querying an existing DATASET (governed semantic layer) over raw SQL when one
  exists. Treat SQL results as evidence to report, never as ground truth to fabricate.

# Rule 4 — Response/token budget
Tool responses are capped (~25K tokens). Do not dump large result sets into context.
Filter and paginate server-side, request only needed columns, and SUMMARIZE rows
(aggregates, top-N, shape) instead of returning everything.

# Rule 5 — Permissions (RBAC)
You act with the authenticated user's exact permissions and cannot escalate them.
If a tool returns a permission error, surface it plainly and stop — do not retry blindly
or work around it. Do not touch roles, users, or RLS unless explicitly tasked.

# Rule 6 — Mutation guardrails & verification
- Before creating an object, check whether one with the same name already exists; avoid
  silent duplicates (ask whether to update or create new).
- After any create/update, fetch the object back to confirm it actually persisted with
  the intended config. Self-reported success from a tool is not proof — verify state.
- Confirm before any destructive operation.

# Rule 7 — Chart construction correctness
- Pick viz_type from the request intent (trend → line/area; comparison → bar;
  composition → pie/treemap; distribution → histogram/box; relationship → scatter;
  single value → big number; tabular → table/pivot).
- Time-series charts require a temporal column + an explicit time grain.
- Metrics must be a saved metric on the dataset OR a valid aggregation over a real column.
- When the MCP's validation pipeline rejects a chart, READ the error, fix the specific
  offending field, and retry — do not guess randomly.

# Error handling
On failure: read the structured error → identify the root cause (missing dataset,
unknown column, dialect mismatch, permission) → correct the specific parameter → retry
at most twice. If still failing, report the exact failing parameter and stop. Never
fabricate IDs, column names, or query results to paper over an error.

# Reporting contract
When done, report concisely: object type, ID, name, bound dataset, preview-vs-saved
state, and the Explore/dashboard link. Show the SQL or chart params you used so the
user can verify.
```

Notlar:

**Hangi MCP'yi kullandığını teyit et** — bu promptun bazı kuralları sunucuya bağlı. Resmi Apache (SIP-187, ~20 tool, FastMCP, Superset 5.0+) **preview-first / save semantiği** ve `search_tools`→`call_tool` keşif arayüzü kullanıyor. `bintocher/mcp-superset` (137 tool) veya `aptro/superset-mcp` gibi community sunucularda grafik genellikle doğrudan kaydediliyor — o durumda "Rule 2"yi "her mutasyon öncesi onay al" şeklinde sertleştir. Hangisindeysen söyle, ona göre keşif arayüzü satırını ve save davranışını netleştireyim.

**Senin domain'in için bir ek blok değerli olur.** ARMES/CWF tarafındaki gibi burada da ajan dataset sözlüğünü baştan öğrenmeli: OEE, scrap, K4 counter, zone isimleri (Glazur3, FIRINALT vb.), shift kodları. Promptun sonuna kısa bir "Dataset glossary — known datasets, their key metrics, and what each column means" bölümü eklersen ajan tahminden tamamen kurtulur. İstersen senin Kale Seramik dataset'lerine göre o bloğu da yazarım.

Bir de pratik bir başlangıç davranışı: ilk turda ajana "list databases + list datasets + get_instance_info çalıştır, ortamı haritala, sonra bekle" dedirtmek (bir tür açılış keşif adımı) çoğu hatayı baştan eler.

## 👤 Kullanıcı (2026-06-26T14:00:21.464508Z)

tamam benim superset versiyonum 6.1 simdi senin soyledigin notlarida icerecek sekilde ve onerdigin system promplarini da icerecek sekilde ag ye bunu yaptiracak bir bir ag promptu yaz opus 4.6 thinking mode kullanarak bunu implement edecegim...

## 🤖 Claude (2026-06-26T14:03:40.458615Z)

I'm understanding what Maymun is asking in Turkish—he's saying his Superset version is now 6.1 and will include the notes I mentioned, along with the system prompts I suggested, and he wants me to write a network prompt that will implement this using Claude Opus 4.6 with thinking mode enabled. So he's asking me to write a task prompt for AntiGravity (running Opus 4.6 in thinking mode) that will instruct the agent to actually implement the Superset MCP integration — setting up the server connection for his Superset 6.1, embedding the system prompt I created, incorporating the notes, and producing a working configuration that fits into his existing stack with LiteLLM and Vercel. This is essentially a meta-prompt or task specification for an agentic coding tool, and I need to structure it with his preference for diagnosis-first approaches and cross-phase state verification.

The prompt itself should be a well-structured task brief that provides context about what Superset MCP is and the goal, specifies the exact deliverables (system prompt file, MCP config, connection test, verification steps), embeds the actual system prompt content as the artifact to be created, includes the operational notes about preview/save semantics, RBAC, token budgets, SQL dialect, and discovery protocols, and enforces his standing rules like never modifying `.env` files, keeping raw secrets out of shell commands, using exact resource identifiers, and maintaining tight prose throughout.

Since he's on Superset 6.1, which is well above the 5.0+ requirement for the official Apache MCP, the native MCP service that ships with Superset itself (SIP-187, configured via `superset_config.py`) is the right target to use. The MCP architecture and configuration details are stable across versions, so I don't need another search—I already have the current docs. I'll note in the prompt that the agent should verify the exact config keys against their deployed 6.1 documentation rather than relying on hardcoded values, which aligns with the verification-first approach. Now I'm thinking through how to structure and deliver this response. He'll paste this directly into AntiGravity as a task prompt, so copy-paste efficiency is the priority. I'll create it as a markdown file artifact—clean, saveable, and fully copyable in one go. I don't need to read any skills for a plain markdown file, so I'll move straight to writing it. Now I'm structuring the AG prompt for the agentic coding assistant—starting with a clear mission statement about configuring the Superset MCP agent, then laying out what the deliverables should be: the system prompt, MCP connection config, and a verified setup.

Next I'm defining the context the agent needs to understand: Superset 6.1's native MCP service, SIP-187, FastMCP framework, RBAC enforcement, preview-first behavior, token limits, and the tool-search interface, plus where configuration actually lives in superset_config.py and the client MCP config files.

Then I'm establishing the hard operating rules the agent must follow—no modifying .env files, never exposing secrets in commands, using exact resource identifiers without guessing, and requiring cross-phase verification where each step validates the previous one before moving forward.

Finally, I'm laying out the concrete deliverables: the full system prompt tailored to 6.1, an MCP client config snippet with environment variable placeholders instead of real secrets, and a smoke-test script that validates authentication and can list databases and datasets. Phase 3 runs a read-only smoke test to exercise the discovery tools, verify schema reads for a known dataset, and confirm the preview-versus-save behavior by generating an Explore link without persisting it, with a gate to ensure each tool returns the expected data shape. Phase 4 documents everything in a README and verification log. The system prompt itself incorporates the full refined content from the previous turn, including notes on preview/save semantics, RBAC, token budgeting, SQL dialect handling for ClickHouse and PostgreSQL, discovery-first approach, and an opening reconnaissance step, plus a Dataset Glossary section that can either be manually filled or auto-populated by running discovery.

The acceptance criteria form a checklist the agent must satisfy before completion, and there's a list of anti-patterns to avoid: no hardcoding tool names, no saving charts during testing, no dumping large result sets, no editing .env, and no printing secrets. Since the setup uses LiteLLM as the production gateway with the Superset MCP as a tool server, the agent's role is to establish the connection and configure the system prompt, keeping the wiring flexible but acknowledging LiteLLM and the runtime, and having the agent confirm the target runtime upfront.

For Superset 6.1 specifics, I'm noting the MCP settings live in `superset_config.py`, the endpoint URL path ends with `/mcp`, the port is configured in the instance settings, JWT auth is optional, and the tool-search interface is enabled by default with RBAC enforced. Rather than hardcoding these, I'll have the agent verify them against the running instance. He's planning to implement this in AntiGravity using Opus 4.6 with thinking mode.

Since the agent will be thinking-capable, I should structure the prompt to encourage reasoning before each phase and explicit planning. I'm leaning toward writing the AntiGravity prompt in English for technical clarity and reliability, which aligns with his preference for English in direct technical contexts.

Now I'll draft the task brief as a markdown file, keeping it thorough but focused on genuine usability.

Writing task brief... The MCP endpoint lives at `/mcp`, and the server enforces the same role-based access control as the web UI—the agent operates within the authenticated user's permissions without any privilege escalation. Rather than relying on a hardcoded tool list, I need to discover available tools at runtime using the `search_tools` interface that's enabled by default. Chart previews generate an Explore link but don't persist anything until explicitly saved, and since responses are capped around 25K tokens, I'll need to paginate and filter on the server side to avoid overwhelming the output. The data model flows from Database down through Dataset, which includes the semantic layer with typed columns, calculated fields, and saved metrics. I need to use the exact identifiers provided without guessing, and verify each phase independently before moving forward. During testing, I'll keep everything read-only unless explicitly asked otherwise. Now I'm moving into the discovery phase where I'll confirm the Superset instance is reachable and check that the MCP endpoint responds.

I'll determine the authentication method and identify the current user's role, then enumerate all the actual MCP tools available with their required parameters. I won't proceed past this gate until I have a confirmed list of real tool names and the user's RBAC role documented—if the MCP service isn't reachable or enabled, I'll stop and report exactly what's missing.

Once discovery is complete, I'll create the system prompt file with the content substituting in the real tool names discovered, then re-read it from disk to verify it contains all the discovered tools and required sections before moving to the next phase.

For the MCP client configuration, I need to confirm which runtime you're targeting first (LiteLLM gateway, Claude Desktop, Cursor, or something else), then I'll generate the config file using environment variable placeholders for all secrets sourced from your existing `.env`. I'll verify the file contains only env var references and no literal tokens or passwords before proceeding.

Then I'll run a read-only smoke test to exercise the agent and tools without making any changes—listing databases, datasets, and calling the instance info endpoint or their discovered equivalents.

I'll pick one known dataset and read its full schema including columns, types, and saved metrics, then generate a single chart as an Explore link only to verify the preview semantics work correctly. I'll also test a permission boundary by attempting an action outside the user's role to confirm it's properly denied. Each call will be validated against expected response shapes and token limits, with results logged for verification.

Finally, I'll write a README documenting how the agent is wired, how to run the smoke test, the complete tool inventory, and the verification log results. I'll also auto-populate the Dataset Glossary section of the system prompt with the real datasets and key metrics discovered during testing so the agent has accurate reference data at runtime.

Now I'm setting up the acceptance criteria checklist and starting to write the system prompt template...

The prompt establishes the agent's role operating a Superset instance through MCP tools, with startup behavior that discovers available tools and maps the environment before taking action. It then begins defining the Superset object model hierarchy—databases connecting to datasets (the semantic layer with columns, metrics, and filters) that feed into charts for visualization.

The next section reinforces two critical rules: first, always discover and verify exact names and IDs before building anything rather than guessing, and second, preview data to ensure correctness.

Now I'm moving into the distinction between proposed and persisted work — when I generate a chart, it's just a preview link until the user explicitly approves it, so I need to be careful not to claim something is saved when it's only been previewed. For SQL work, I'm keeping queries read-only by default, always adding limits to exploratory queries, and making sure I'm writing valid syntax for the specific database engine being used. ions matter — I work within the authenticated user's exact permissions and can't escalate them. If a tool returns a permission error, I surface it plainly and stop rather than retrying or working around it. Before creating objects, I check if one with the same name already exists to avoid silent duplicates. After any create or update, I fetch the object back to verify it persisted correctly — a tool's self-reported success isn't proof. I also confirm before any destructive operation. For charts, I'm selecting the visualization type based on intent, like line or area charts for trends and bar charts for comparisons. When I'm done, I'll report the object type, ID, name, bound dataset, and whether it's in preview or saved state, along with the Explore or dashboard link so the user can verify. I'll also show the SQL or chart parameters I used. I have a dataset glossary that auto-populates from discovery, listing each dataset's name, ID, what it represents, key saved metrics, temporal columns, and any non-obvious column meanings—this keeps me from guessing at domain terms.

Looking back at the brief, I've anchored to version 6.1, included ALTER in the DDL list, and noted the PostgreSQL and ClickHouse dialect support matches his stack. I told the agent to confirm the target runtime—LiteLLM, Claude Desktop, or Cursor—since he uses LiteLLM as his production gateway. The cross-phase verification gates align with his rules, and the auto-populated glossary removes the need for guessing. One thing I'm clarifying: the Superset MCP is a tool server that the agent runtime connects to, while LiteLLM is an LLM gateway, not a runtime itself.

I also made sure not to over-assert Superset 6.1 specifics. The docs say "Requires Superset 5.0+," and the native MCP (SIP-187) is in current Superset, so 6.1 definitely has it. But I had the agent verify it's actually enabled and reachable in Phase 0, since it must be explicitly enabled by the admin per the user docs—I baked that verification in rather than assuming it's automatically on.

Now I'm ready to deliver: create the file, present it with a tight Turkish explanation of what it does and the key design decisions, and confirm the one thing the agent will ask him about—the runtime target. I should keep it concise and lean on the citations I already provided last turn.

For the file itself, I need to be careful with the markdown formatting. Since the embedded system prompt uses `#` headers, I'll wrap that content in a fenced code block so the headers render as literal text rather than markdown headers, keeping the prompt clearly delimited and easy to copy verbatim.AntiGravity'ye (Opus 4.6 thinking) verecegin task brief'ini hazirladim. Superset **6.1'in native MCP servisini** (SIP-187/FastMCP) hedef aliyor, gecen turdaki notlarin tamamini (preview-vs-save, RBAC, token cap, SQL dialect, discover-first) ve onerdigim system promptu **verbatim** iceriyor — ayrica senin standart kurallarini (`.env` dokunma, ham secret yasak, exact identifier kullan, cross-phase verification) AG ajanina dayatiyor.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Tasarim mantigi (3 kritik karar):

**Implement ≠ kör kurulum.** Brief'i "once kesfet, sonra kur" diye kurguladim. Phase 0 ajanin canli 6.1 instance'inda gercek tool isimlerini ve RBAC rolünü cikarmadan ilerlemesini yasakliyor — cunku tool-search arayuzu acik oldugunda tool isimlerini varsaymak en sik hata. Yani system promptu yazarken bile placeholder'lari Phase 0'da bulunan gercek isimlerle dolduruyor.

**Senin kurallarini AG ajanina ge_passive degil aktif dayatiyor.** `.env` dokunma, ham secret yasak (cikarsa security incident + rotate), exact identifier kullan, ve her faz oncekinin gercekten yapildigini bagimsiz dogrular (cross-phase verification gate'leri). Test fazinin tamami **read-only** — preview üretip kaydetmeyerek save semantiğini de kanitliyor.

**Dataset glossary'i ajana otomatik doldurtuyorum.** Phase 4'te kesiften bulunan gercek dataset/metrik isimlerini system promptun sonuna yaziyor — boylece runtime'da OEE/scrap/zone isimleri icin tahmin yurutmesine hic gerek kalmiyor. ARMES tarafindaki blind-spot mantigininin aynisi.

AG ajani sana **tek bir sey soracak**: MCP client config'i nereye baglayacagi (LiteLLM gateway / Claude Desktop / Cursor). Production gateway'in LiteLLM oldugu icin onu basa koydum ama net cevabi senden istemesini sart kostum — kendi basina tahmin etmesin diye.

Iki opsiyonel ekleme onerebilirim: (1) Phase 3 smoke-test'ine senin bir KB7 dataset'ini explicit hedef olarak koymak (gercek bir OEE sorgusuyla dialect dogrulamasi yapar), (2) glossary'e ARMES tarafindaki yapisal kor noktayi (IKINCILUST scrap görünmezligi) not düşmek ki ajan o zone icin eksik veriyi "sifir" sanmasin. Istersen ikisini de brief'e ekleyeyim.

## 👤 Kullanıcı (2026-06-26T14:06:42.283350Z)

biz lite LLM kullanmiyoruz, kendi yazdigimiz agent uzerinde mcp imlement ettik, npx implementasyonu yapildi ona gore promtunu degistir ...

## 🤖 Claude (2026-06-26T14:09:19.685375Z)

Ah, I see—they've built their own custom agent and implemented MCP directly on top of it rather than using LiteLLM. The Superset MCP server runs via npx, and they configured the prompts accordingly to work with their agent setup. I need to revise the prompt to account for the community npx-based MCP servers instead of the native Apache service—these servers expose different tools and don't have the same middleware features like token caps or RBAC redaction. The discovery phase should focus on enumerating whatever tools the specific npx server actually provides, since tool names and capabilities vary significantly across implementations like Winding2020 and bintocher.

For the guardrails, I'm realizing that community servers often persist charts and dashboards immediately rather than using a preview-first workflow, so the safety rules need to be stronger—treating every create/update as a real mutation that requires confirmation. And without server-side token limiting, the agent needs to self-impose pagination and token management rather than relying on the MCP layer to enforce it. RBAC still applies through the Superset API authentication, but there's no additional MCP-level redaction happening.

Now I'm trying to pin down which specific npx-installable Superset server we're talking about, since there are multiple options available—each with different capabilities and connection methods. Since the server is already running and integrated into his custom agent, I don't need to set up the MCP server itself — instead, I should focus on writing the system prompt for his agent that leverages these existing MCP tools, and make sure AntiGravity validates and wires that prompt against the live npx integration he's already built. I need to verify the actual persistence behavior of the Superset MCP server empirically rather than assuming it—whether creates save immediately or require a preview step first, since that's critical for writing Rule 2 correctly. I'll author the system prompt with Rule 2 conditionally, defaulting to immediate persistence unless testing proves otherwise. I should also strip out the native-MCP specifics I mentioned earlier (tool discovery defaults, token limits, SIP-187) since those don't apply to the community npx server, and instead frame everything as server-dependent. I'll build the revised brief to self-discover the tool inventory and persistence behavior in Phase 0, then adapt the system prompt based on what's actually available—assuming immediate persistence as the safer default. Rather than guessing which npx package he's using, I'll design it to empirically verify the tool names and semantics, and I can offer to pin things precisely if he shares the exact package name. I'm settling on treating creation as immediate persistence for community REST-API servers and will set that as the default assumption, with the agent verifying during discovery. Now I'm rewriting the brief to reframe it around the custom agent and npx MCP server architecture—removing claims about native SIP-187 behavior and marking token caps, tool search, and preview modes as server-dependent variables to confirm in Phase 0. The hard rules stay intact, but Phase 0 now explicitly includes empirically determining save semantics and whether response limits exist. Revising Rule 2 to clarify that the MCP tools write to Superset immediately via REST API with no preview step, so I need to always get explicit user approval before calling any create/update/delete tool and state clearly what I'm about to do. I'm also updating Rule 4 to reflect that the agent self-limits based on token budget rather than relying on a server cap, adjusting startup behavior to focus on tool discovery, and removing assumptions about native tool-search — noting instead that these are npx/REST-API tools. on which dataset, get confirmation, then act, then fetch the object back to confirm it persisted.
Distinguish PROPOSED (you described it) from PERSISTED (verified in Superset)."

Rule 4 — revised (token/response budget):
"# Rule 4 — Response budget (self-imposed)
Do not assume the server caps response size. Protect your own context: always paginate and
filter server-side, request only the columns you need, cap row counts, and SUMMARIZE results
(aggregates, top-N, shape) rather than returning raw rows. Never pull a large table into context."

Startup behavior — revised:
"# Startup behavior (first action every session)
Before anything else, list the MCP tools actually available to you and read the instance/datasets
to map the terrain. Use only tool names that exist in your tool list — never assume a tool exists.
Then wait for the task."

I should also note upfront that this is a REST-API-backed MCP server, so raw API responses might surface in errors — I need to be careful not to echo back any secrets or credentials if they appear. For RBAC, the user's permissions still gate everything through the Superset API, but unlike native MCP servers, community servers don't have automatic secret-redaction middleware, so connection strings or tokens could leak in error payloads. I'll add a guard: if a tool error contains a credential, I'll report a generic error instead and flag the issue.

Now I need to update the framing for Superset 6.1 — the backend is still 6.1, but the MCP layer is the npx community server over REST, not the native service. I'll rewrite the whole file cleanly using bash to avoid issues with the existing path and embedded code fences.

For Phase 2, I should shift away from "produce MCP client config" since that's already implemented in their custom agent. Instead, I'll focus on verification: confirming the agent can launch and reach the npx MCP server, that credentials come from environment variables rather than hardcoded, and that a round-trip tool call works. I also need to check that npx invocations aren't passing secrets inline through environment variables.

Now I'll write the revised file and prepare a brief Turkish response explaining the semantic shift from native service to community npx/REST server and how that changes the save behavior and token assumptions.Onemli bir fark — bu duzeltme promptun mantigini degistiriyor: native Apache MCP servisi (Python/FastMCP, `superset_config.py`, preview-first save, 25K token cap, tool-search) ile npx tabanli community MCP server (Node, Superset REST API uzerinden, kendi agent'iniza bagli) farkli davraniyor. En kritik ikisi: community server'larda grafik/dashboard genelde **dogrudan kaydedilir** (preview-draft adimi yok), ve **garantili token cap yoktur**. Yani guardrail'leri sertlestirmek ve token disiplinini ajanin kendisine yuklemek gerekiyor. Brief'i ona gore revize ettim.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Ne degisti:

**LiteLLM ve "runtime'i sor" adimi tamamen kalkti.** Hedef artik net: kendi yazdiginiz agent + npx MCP server, REST API uzerinden Superset 6.1. Eski Phase 2 (client config uretme) yerine "**mevcut entegrasyonu dogrula**" geldi — credential'larin npx spawn args dahil env'den geldigini, kodda hardcoded secret olmadigini grep'leyip round-trip test ediyor.

**Save semantigi tersine cevrildi.** Native serviste grafik kaydedilmez (preview-first); community npx server'da REST API ile **aninda kaydedilir.** Bu yuzden Rule 2 "preview don, kaydetme" yerine "her create/update kalicidir → ayni turda explicit onay almadan calistirma" oldu. Daha tehlikeli oldugu icin guardrail sertlestirildi.

**Token cap varsayimi kaldirildi.** ~25K cap native servisin middleware'i; community server'da garanti yok. Rule 4 artik cap'i ajanin kendisine yukluyor (paginate/filter/summarize zorunlu).

**Secret hygiene eklendi.** Native serviste hata mesajlarindaki connection string / token otomatik rediakte edilir; npx/REST'te edilmez. Ajan artik ham REST hatasini geri yansitmiyor, credential sizarsa generic hata verip flag'liyor.

Bir nokta: brief'i **hangi npx paketi oldugunu varsaymadan** yazdim — Phase 0'da gercek tool isimlerini ve persistence modelini ajanin kendisi kesfedip prompta isliyor. Ama paket adini soylersen (`superset-mcp` / aptro / baska bir sey) tool isimlerini ve save davranisini brief'e kesin olarak sabitlerim, ajanin kesif yapmasina gerek kalmaz. Hangisini kullandiniz?

