# Stage S2d.1 — `ops` and `sample` fields for 48 internal components

> **stage_id:** S2d.1
> **stage_type:** Phase 1 · Data authoring + render enhancement · content repo
>   (`agbuilder-platform/revolutionize@main`)
> **author:** Claude (architect · single-author rule)
> **date:** 2026-06-03
> **model_recommended:** Claude Sonnet 4.6, thinking mode
> **model_used_actual:** [AG fills in `lessons.md`]
> **estimated_size:** L — AG 75–100 min · human review 60 min
> **merge_mode:** operator-gated — AG opens PR, reports, stops. Operator
>   spot-checks 6–8 components in browser, signals. AG merges.
> **predecessor:** S2c ✅
> **successor:** S2d.2 (errors + cross-linking)

---

## 1. Goal

For the 48 **internal** components in COMPDATA (the components we author,
deploy, or wrap with an MCP server), add two new cookbook fields:

- **`ops`** — health endpoint, metrics endpoint, log query, trace name
- **`sample`** — a working copy-paste integration call (bash · python · html)

Render two new sections in the EAIP component panel between Configuration
keys and Connections, in priority order:

1. **Sample call** — "how do I call this?" (comes first; integrate
   action)
2. **Operations** — "where do I check it?" (comes after; diagnose action)

The remaining 19 components (external adapters + L9 managed infra) keep
their S2c shape — no `ops`, no `sample`, no rendered sections. Graceful
degradation in `showEarchDetail` handles this automatically (`if (cd.ops)`
guards both sections).

All content is **English-only**. Sample code is in the natural language for
that component (bash / python / html) — pick is per-component.

---

## 2. File in scope

**One file:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`

Read the live file from GitHub before any edit.

---

## 3. Step 0 — Verify ground truth

Report each, stop on any mismatch.

**3a.** S2c symbols present: `COMPDATA`, `OWNER_COLOR`, `_cbDeploy`,
`_cbConfig`, `showEarchDetail`. If any missing, stop.

**3b.** Naming-conflict grep — all expected **0 hits**:
`_cbSample`, `_cbOps`, `cb-sample`, `cb-ops`, `cb-sample-lang`,
`cb-ops-row`, `cb-ops-k`, `cb-ops-v`.

**3c.** COMPDATA shape verification: `Object.keys(COMPDATA).length === 67`.
Verify no entry already has `ops` or `sample` keys (would indicate prior
partial run).

**3d.** Spot-check 3 COMPDATA entries dump for prior-state confirmation:
`Channel gateway`, `PostgreSQL`, `SAP`. Should all have `sub, desc,
deploy, config, notes, owner` and **no** `ops, sample`. Report their
`owner` values.

---

## 4. Step 1 — The authored content block

The following object holds `ops` and `sample` for exactly 48 components.
Component names match v6 COMPS exactly. **Insert this verbatim** as a new
variable `COMPDATA_OPS` in the script block immediately after `COMPDATA`
(and before `OWNER_COLOR`). Step 2 merges it.

```javascript
var COMPDATA_OPS={
 'Channel gateway':{
  ops:{health:'GET http://channel-gateway:8000/health → {"status":"ok","redis":"connected","langgraph":"reachable"}',
       metrics:'GET http://channel-gateway:8000/metrics (Prometheus exposition)',
       log:'{service="channel-gateway"} | json | level="error" or level="warn"',
       trace:'Langfuse: channel.{name}.inbound (one trace per inbound message)'},
  sample:{lang:'bash',code:`# Receive a WhatsApp webhook (simulated)
curl -X POST http://channel-gateway:8000/webhook/whatsapp \\
  -H "X-Hub-Signature-256: sha256=<meta-hmac>" \\
  -H "Content-Type: application/json" \\
  -d '{"entry":[{"changes":[{"value":{"messages":[{"from":"+90...","text":{"body":"merhaba"}}]}}]}]}'`}
 },
 'Whisper STT':{
  ops:{health:'GET http://whisper:9000/health → {"status":"ok","model":"faster-whisper-large-v3","gpu":"nvidia-l4"}',
       metrics:'GET http://whisper:9000/metrics (request_count, latency_p95_ms, model_load_seconds)',
       log:'{service="whisper-stt"} | json',
       trace:'stt.transcribe.{language}'},
  sample:{lang:'bash',code:`curl -X POST http://whisper:9000/transcribe \\
  -F "audio=@voice-note.ogg" \\
  -F "language=tr" \\
  -F "model=large-v3"
# → {"text":"merhaba nasılsınız","language":"tr","duration_s":3.5}`}
 },
 'Embed widget':{
  ops:{health:'curl -I https://cdn.ardictech.com/widget/v1/widget.js → 200',
       metrics:'Client beacon → POST /api/widget/metrics (session_start, message_sent, errors)',
       log:'Browser console + server-side RUM in Grafana Faro',
       trace:'Widget emits widget.session_start → propagated as X-Trace-Id'},
  sample:{lang:'html',code:`<!-- Drop into the host page -->
<script src="https://cdn.ardictech.com/widget/v1/widget.js" defer></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    ARDICWidget.init({
      tenant: 'kale-seramik',
      apiUrl: 'https://api.kale.ardictech.com',
      locale: 'tr',
      position: 'bottom-right'
    });
  });
</script>`}
 },
 'Web chat':{
  ops:{health:'curl -I https://chat.{tenant}.ardictech.com → 200',
       metrics:'Vercel/Cloudflare edge metrics + browser RUM (Grafana Faro)',
       log:'Edge logs + frontend errors → Grafana Faro',
       trace:'SSR pages emit webchat.page.{route}; WS sessions emit webchat.session.{id}'},
  sample:{lang:'bash',code:`# Open the WebSocket chat stream
wscat -c wss://chat.kale.ardictech.com/ws \\
  -H "Authorization: Bearer $JWT"
# Server hello: {"type":"hello","session":"..."}
# Send a user message:
{"type":"msg","text":"OEE for line 3?"}`}
 },
 'Teams bot':{
  ops:{health:'GET http://teams-bot:3978/api/health → {"status":"ok","bf":"reachable"}',
       metrics:'GET http://teams-bot:3978/metrics (message_count, latency_p95_ms)',
       log:'{service="teams-bot"} | json',
       trace:'teams.{conversation_id}.message'},
  sample:{lang:'bash',code:`# Simulate a Teams message webhook from Bot Framework
curl -X POST http://teams-bot:3978/api/messages \\
  -H "Authorization: Bearer $BF_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"type":"message","from":{"id":"user1"},"text":"OEE status line 3?","conversation":{"id":"c1"}}'`}
 },
 'Min. dashboard':{
  ops:{health:'curl -I https://admin.{tenant}.ardictech.com → 200',
       metrics:'Next.js telemetry + RUM (Grafana Faro)',
       log:'Vercel/edge logs + frontend errors',
       trace:'admin.{page}.{action}'},
  sample:{lang:'bash',code:`# Admin API: list tenants
curl -X GET https://admin.kale.ardictech.com/api/tenants \\
  -H "Authorization: Bearer $ADMIN_JWT"
# → [{"id":"kale-seramik","plan":"enterprise","active":true},...]`}
 },
 'Kong':{
  ops:{health:'GET http://kong:8001/status → {"database":{"reachable":true}}',
       metrics:'GET http://kong:8001/metrics (Prometheus plugin: kong_http_status, kong_latency)',
       log:'{service="kong"} | json | level="error"  (access logs on a separate channel)',
       trace:'kong.route.{name}.upstream'},
  sample:{lang:'bash',code:`# Add a new route forwarding to FastAPI service
curl -X POST http://kong:8001/services/fastapi/routes \\
  -d "name=chat" \\
  -d "paths[]=/api/chat" \\
  -d "strip_path=true"`}
 },
 'FastAPI':{
  ops:{health:'GET http://fastapi:8000/health → {"status":"ok","db":"ok","redis":"ok"}',
       metrics:'GET http://fastapi:8000/metrics (prometheus_fastapi_instrumentator)',
       log:'{service="fastapi"} | json | level="error"',
       trace:'api.{endpoint} via OpenTelemetry FastAPI instrumentation'},
  sample:{lang:'python',code:`import requests
r = requests.post(
    "http://fastapi:8000/api/chat",
    headers={"Authorization": f"Bearer {jwt}"},
    json={"tenant_id":"kale","message":"OEE for line 3?"}
)
# → 200 {"reply":"Line 3 OEE today: 87%...","trace_id":"..."}`}
 },
 'Keycloak':{
  ops:{health:'GET http://keycloak:8080/health/ready → {"status":"UP"}',
       metrics:'GET http://keycloak:9990/metrics (Quarkus / micrometer)',
       log:'{service="keycloak"} | json | level="error"',
       trace:'keycloak.{realm}.token.issue / keycloak.{realm}.login.success'},
  sample:{lang:'bash',code:`# Get an admin token, then list realms
TOKEN=$(curl -s -d "client_id=admin-cli" -d "username=admin" \\
  -d "password=$ADMIN_PASS" -d "grant_type=password" \\
  http://keycloak:8080/realms/master/protocol/openid-connect/token \\
  | jq -r .access_token)
curl -H "Authorization: Bearer $TOKEN" http://keycloak:8080/admin/realms`}
 },
 'OPA':{
  ops:{health:'GET http://opa:8181/health → 200 {}',
       metrics:'GET http://opa:8181/metrics (Prometheus: opa_request_duration_seconds)',
       log:'{service="opa"} | json  (decision logs on a separate sink → Loki tenant)',
       trace:'opa.decide.{policy_path}'},
  sample:{lang:'bash',code:`# Evaluate a tenant access policy
curl -X POST http://opa:8181/v1/data/authz/allow \\
  -H "Content-Type: application/json" \\
  -d '{"input":{"user":{"tenant":"kale","roles":["operator"]},"action":"read","resource":"oee"}}'
# → {"result":true}`}
 },
 'Tenant provisioning':{
  ops:{health:'GET http://tenant-prov:8000/health → {"status":"ok"}',
       metrics:'GET http://tenant-prov:8000/metrics (provision_duration_seconds_bucket)',
       log:'{service="tenant-provisioning"} | json',
       trace:'tenant.provision.{step}  (steps: realm · db · qdrant · k8s · opa)'},
  sample:{lang:'bash',code:`# Provision a new tenant end-to-end
curl -X POST http://tenant-prov:8000/provision \\
  -H "Authorization: Bearer $ADMIN_JWT" \\
  -d '{"tenant_id":"kale-seramik","plan":"enterprise","admin_email":"admin@kale.com.tr"}'
# → 202 {"job_id":"...","status":"queued"}`}
 },
 'LangGraph':{
  ops:{health:'GET http://langgraph:8001/health → {"status":"ok","checkpointer":"postgres-ok"}',
       metrics:'GET http://langgraph:8001/metrics (node_duration_seconds, llm_calls_total, retries)',
       log:'{service="langgraph"} | json | level="error"',
       trace:'langgraph.{agent}.{node}  (every node + every LLM call recorded in Langfuse)'},
  sample:{lang:'python',code:`import requests
r = requests.post("http://langgraph:8001/invoke", json={
    "agent": "galip_usta",
    "tenant_id": "kale-seramik",
    "session_id": "abc123",
    "messages": [{"role":"user","content":"OEE for line 3?"}]
})
# → {"output":"Line 3 OEE today is 87%...","trace_id":"langfuse-..."}`}
 },
 'Hybrid decision engine':{
  ops:{health:'In-process module within LangGraph; health reported via parent service',
       metrics:'decision_engine_rule_evaluations_total{rule,result} exposed by LangGraph /metrics',
       log:'{service="langgraph"} | json | component="decision-engine"',
       trace:'decision.{rule_id}  (every rule evaluation recorded)'},
  sample:{lang:'python',code:`from decision_engine import Engine
eng = Engine.load("/app/rules/insurance/")
result = eng.decide(
    candidates=[{"name":"approve","score":0.82},{"name":"refer","score":0.71}],
    context={"premium":50000,"history":"clean"}
)
# → {"decision":"approve","rule_id":"low_risk_clean","trace":[...]}`}
 },
 'n8n':{
  ops:{health:'GET http://n8n:5678/healthz → {"status":"ok"}',
       metrics:'Set N8N_METRICS=true → GET http://n8n:5678/metrics',
       log:'{service="n8n"} | json',
       trace:'n8n.workflow.{id}.{node}  (workflow executions)'},
  sample:{lang:'bash',code:`# Trigger an OEE-alert webhook workflow
curl -X POST http://n8n:5678/webhook/oee-alert \\
  -H "Content-Type: application/json" \\
  -d '{"line":"3","oee":0.62,"threshold":0.75}'`}
 },
 'Temporal':{
  ops:{health:'grpcurl -plaintext temporal:7233 grpc.health.v1.Health/Check',
       metrics:'GET http://temporal:7233/metrics (Prometheus)',
       log:'{service="temporal"} | json',
       trace:'temporal.{workflow_type}.{run_id}  (workflow_id is the trace key)'},
  sample:{lang:'python',code:`from temporalio.client import Client
client = await Client.connect("temporal:7233")
handle = await client.start_workflow(
    InsuranceTriageWorkflow.run,
    args=["case-12345"],
    id=f"insurance-{case_id}",
    task_queue="insurance"
)
await handle.result()  # awaits completion (may take minutes-to-hours)`}
 },
 'vLLM':{
  ops:{health:'GET http://vllm:8000/health → 200 (returns healthy when model loaded)',
       metrics:'GET http://vllm:8000/metrics (gpu_memory_used, requests_running, generation_tokens_total)',
       log:'{service="vllm"}  (container stdout)',
       trace:'vllm.completions.{model}  (input_tokens, output_tokens, latency_ms)'},
  sample:{lang:'bash',code:`# vLLM is OpenAI-compatible; in production it's called through LiteLLM
curl -X POST http://vllm:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta-llama/Llama-3-8B-Instruct","messages":[{"role":"user","content":"Hello"}]}'`}
 },
 'LiteLLM':{
  ops:{health:'GET http://litellm:4000/health/readiness → {"status":"healthy"}',
       metrics:'GET http://litellm:4000/metrics (litellm_total_requests, litellm_cost_usd, fallback_total)',
       log:'{service="litellm"} | json | event="completion" or event="fallback"',
       trace:'litellm.{model}.completion  (proxies upstream provider trace)'},
  sample:{lang:'python',code:`from openai import OpenAI
client = OpenAI(base_url="http://litellm:4000", api_key=os.getenv("LITELLM_KEY"))
resp = client.chat.completions.create(
    model="sonnet-4.6",  # LiteLLM routes to Anthropic
    messages=[{"role":"user","content":"OEE forecast for line 3?"}]
)
# All LangGraph LLM calls flow through this client, never direct to providers`}
 },
 'Ollama':{
  ops:{health:'GET http://ollama:11434/api/tags → {"models":[...]}',
       metrics:'Not native; expose via ollama-exporter sidecar if needed',
       log:'{service="ollama"}  (container stdout)',
       trace:'Dev / test only; not part of production trace topology'},
  sample:{lang:'bash',code:`curl -X POST http://ollama:11434/api/chat \\
  -d '{"model":"llama3:8b","messages":[{"role":"user","content":"hi"}],"stream":false}'`}
 },
 'MLflow':{
  ops:{health:'GET http://mlflow:5000/health → "OK"',
       metrics:'Not native; instrument client-side or use mlflow-prometheus-exporter',
       log:'{service="mlflow"} | json',
       trace:'experiment-id and run-id are the trace keys; correlate via mlflow.{exp_id}.{run_id}'},
  sample:{lang:'python',code:`import mlflow
mlflow.set_tracking_uri("http://mlflow:5000")
with mlflow.start_run(run_name="ragas-eval-2026-06"):
    mlflow.log_metric("faithfulness", 0.87)
    mlflow.log_metric("answer_relevance", 0.91)
    mlflow.log_artifact("eval_results.json")`}
 },
 'Prompt store':{
  ops:{health:'GET http://prompt-store:8000/health → {"status":"ok"}',
       metrics:'GET http://prompt-store:8000/metrics (fetch_count, cache_hit_ratio)',
       log:'{service="prompt-store"} | json',
       trace:'promptstore.{template_id}.fetch'},
  sample:{lang:'bash',code:`# Fetch the active version of a prompt template
curl http://prompt-store:8000/admin/prompts/galip_usta_oee_query?lang=tr
# → {"id":"galip_usta_oee_query","version":"v3","lang":"tr","template":"..."}`}
 },
 'Langfuse':{
  ops:{health:'GET http://langfuse:3000/api/public/health → {"status":"OK"}',
       metrics:'Ingestion-rate via internal metrics endpoint; UI shows live trace counts',
       log:'{service="langfuse"} | json',
       trace:'Langfuse IS the trace store. Query via UI (http://langfuse:3000) or SDK'},
  sample:{lang:'python',code:`from langfuse import Langfuse
lf = Langfuse(host="http://langfuse:3000")
trace = lf.trace(name="galip_oee_query", user_id="op-123", tenant_id="kale")
trace.span(name="rag.retrieve", input={"q":"OEE line 3"}).end(output=[...])
trace.span(name="llm.generate", model="sonnet-4.6").end(output="...")`}
 },
 'Guardrails AI':{
  ops:{health:'In-process within LangGraph; no separate endpoint',
       metrics:'guardrails_validation_total{rail,result} via LangGraph /metrics',
       log:'{service="langgraph"} | component="guardrails"',
       trace:'guardrails.{rail_name}.validate'},
  sample:{lang:'python',code:`from guardrails import Guard
guard = Guard.from_rail("rails/quality_metric_response.rail")
validated = guard.parse(llm_output)
# Raises ValidationError if rail violated; LangGraph handles retry`}
 },
 'LlamaIndex':{
  ops:{health:'In-process SDK; no endpoint',
       metrics:'llamaindex_retrieve_latency_ms exposed by LangGraph /metrics',
       log:'{service="langgraph"} | component="rag"',
       trace:'rag.retrieve.{tenant}.{collection}'},
  sample:{lang:'python',code:`from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.qdrant import QdrantVectorStore
qstore = QdrantVectorStore(client=qc, collection_name="kale_catalog")
index = VectorStoreIndex.from_vector_store(qstore)
results = index.as_retriever(similarity_top_k=5).retrieve(
    "OEE thresholds for Kale plant line 3"
)`}
 },
 'Qdrant / pgvector':{
  ops:{health:'See Qdrant (L6) for the deployed service; this entry is the SDK + embedding pattern',
       metrics:'Collection-level metrics via Qdrant admin API',
       log:'See Qdrant (L6)',
       trace:'vector.upsert.{collection} / vector.search.{collection}'},
  sample:{lang:'python',code:`from qdrant_client import QdrantClient
qc = QdrantClient(url="http://qdrant:6333")
qc.upsert(
    collection_name="kale_catalog",
    points=[{"id":1,"vector":[0.1]*1024,"payload":{"sku":"K-001","name":"Tile A"}}]
)`}
 },
 'Memori':{
  ops:{health:'GET http://memori:8000/health → {"status":"ok"}',
       metrics:'GET http://memori:8000/metrics (fetch_count, profile_size_bytes)',
       log:'{service="memori"} | json',
       trace:'memori.{session_id}.fetch / memori.profile.{user_id}.fetch'},
  sample:{lang:'bash',code:`# Fetch current session memory (LangGraph injects this every turn)
curl http://memori:8000/session/abc123 \\
  -H "X-Tenant-Id: kale-seramik"
# → {"history":[...],"summary":"User asked about line 3 OEE; concerned about Tuesday dip."}`}
 },
 'LightRAG':{
  ops:{health:'GET http://lightrag:8020/health → {"status":"ok","kg_nodes":15234}',
       metrics:'GET http://lightrag:8020/metrics (query_count, kg_edge_count, embedding_cost_usd)',
       log:'{service="lightrag"} | json',
       trace:'lightrag.query.{mode}  (modes: hybrid · local · global)'},
  sample:{lang:'bash',code:`# Multi-hop query over ARMES SOPs
curl -X POST http://lightrag:8020/query \\
  -H "Content-Type: application/json" \\
  -d '{"query":"What is the procedure when oven temperature exceeds 1180C?","mode":"hybrid","tenant":"kale"}'`}
 },
 'Graphiti + FalkorDB':{
  ops:{health:'GET http://graphiti:8030/health → {"status":"ok","falkor":"connected"}',
       metrics:'GET http://graphiti:8030/metrics + GET http://falkordb:9090/metrics',
       log:'{service=~"graphiti|falkordb"} | json',
       trace:'graphiti.causal_query.{window}  (Cypher-on-temporal-graph queries)'},
  sample:{lang:'bash',code:`# Why did OEE drop on line 3 between 14:00 and 16:00?
curl -X POST http://graphiti:8030/query \\
  -d '{"question":"why did OEE drop","entity":"line-3","window":{"start":"2026-08-15T14:00","end":"2026-08-15T16:00"}}'`}
 },
 'Soda Core':{
  ops:{health:'Not a service; runs as scheduled Airflow tasks',
       metrics:'soda_check_passed_total{check,dataset} emitted via custom callback; also POST results to OpenMetadata',
       log:'Airflow task logs → {dag="soda_clickhouse_scan"}',
       trace:'soda.scan.{dataset}.{run}'},
  sample:{lang:'bash',code:`# Run a Soda scan against the ClickHouse mfg warehouse
soda scan -d clickhouse \\
  -c configuration.yml \\
  checks/oee_quality.yml`}
 },
 'dbt Core':{
  ops:{health:'Not a service; runs as scheduled Airflow tasks',
       metrics:'dbt_run_status_total{model,status} from custom on_run_end callback',
       log:'{dag="dbt_silver_gold"} (also dbt artifacts in MinIO: manifest.json, run_results.json)',
       trace:'dbt.run.{model_name}'},
  sample:{lang:'bash',code:`# Run gold-tier OEE model
dbt run --project-dir /app/dbt \\
  --select gold_oee \\
  --vars '{"tenant":"kale","period":"2026-06"}'`}
 },
 'OpenMetadata':{
  ops:{health:'GET http://openmetadata:8585/api/v1/health → {"status":"healthy"}',
       metrics:'GET http://openmetadata:8585/api/v1/metrics (ingestion_runs, entities_indexed)',
       log:'{service="openmetadata"} | json',
       trace:'om.ingest.{pipeline_id}'},
  sample:{lang:'bash',code:`# Search the catalog
curl "http://openmetadata:8585/api/v1/search/query?q=oee&index=table_search_index" \\
  -H "Authorization: Bearer $OM_TOKEN"`}
 },
 'Audit / SPC PDF':{
  ops:{health:'GET http://audit-pdf:8000/health → {"status":"ok","weasyprint":"ready"}',
       metrics:'GET http://audit-pdf:8000/metrics (generation_count, latency_p95_seconds)',
       log:'{service="audit-pdf"} | json',
       trace:'audit.generate.{period}.{standard}'},
  sample:{lang:'bash',code:`# Generate an IATF 16949 audit PDF
curl -X POST http://audit-pdf:8000/generate \\
  -H "Authorization: Bearer $JWT" \\
  -d '{"tenant":"kale","period":"2026-Q2","standard":"IATF-16949"}'
# → {"job_id":"...","url":"https://minio/audit-pdfs/kale/2026-q2.pdf?...(24h-expiry)"}`}
 },
 'LLM enrichment':{
  ops:{health:'GET http://llm-enrich:8000/health → {"status":"ok"}',
       metrics:'GET http://llm-enrich:8000/metrics (enrichment_count, cost_usd_total)',
       log:'{service="llm-enrichment"} | json',
       trace:'enrich.{table}.{batch_id}'},
  sample:{lang:'bash',code:`# Enrich a batch of catalog rows with descriptions / tags
curl -X POST http://llm-enrich:8000/enrich \\
  -H "Authorization: Bearer $JWT" \\
  -d '{"table":"oee_dimensions","rows":[{"id":1,"sku":"K-001"}]}'`}
 },
 'PostgreSQL':{
  ops:{health:'pg_isready -h postgres -p 5432  OR  SELECT 1',
       metrics:'GET http://postgres-exporter:9187/metrics (pg_up, pg_stat_*)',
       log:'{service="postgresql"} | json',
       trace:'Client-side via OpenTelemetry psycopg/asyncpg instrumentation'},
  sample:{lang:'bash',code:`psql -h postgres -U app -d ardictech -c "SELECT count(*) FROM tenants;"
# Tenant-scoped queries use SET LOCAL app.tenant_id = '...'; for RLS enforcement.`}
 },
 'Redis':{
  ops:{health:'redis-cli -h redis ping → PONG',
       metrics:'GET http://redis-exporter:9121/metrics (redis_connected_clients, redis_memory_used_bytes)',
       log:'{service="redis"}  (container stdout)',
       trace:'Client SDK emits redis.{cmd} (set, get, hgetall, ...)'},
  sample:{lang:'bash',code:`redis-cli -h redis SET session:abc123 '{"user":"op-1"}' EX 14400
redis-cli -h redis GET session:abc123
# DB 0 = sessions; DB 1 = LangGraph hot state; DB 2 = rate-limit windows`}
 },
 'MinIO':{
  ops:{health:'GET http://minio:9000/minio/health/ready → 200',
       metrics:'GET http://minio:9000/minio/v2/metrics/cluster (Prometheus, requires auth header)',
       log:'{service="minio"} | json',
       trace:'mc admin trace minio | grep tenant_id  (or audit-log webhook to Loki)'},
  sample:{lang:'bash',code:`# Upload a quarterly audit PDF and produce a 24h pre-signed URL
mc cp localfile.pdf minio/audit-pdfs/kale/2026-q2.pdf
mc share download --expire 24h minio/audit-pdfs/kale/2026-q2.pdf`}
 },
 'Qdrant':{
  ops:{health:'GET http://qdrant:6333/healthz → {"status":"ok"}',
       metrics:'GET http://qdrant:6333/metrics (Prometheus: collection_points, search_latency)',
       log:'{service="qdrant"} | json',
       trace:'qdrant.{op}.{collection}  (op: search · upsert · scroll · delete)'},
  sample:{lang:'bash',code:`# Search a tenant collection
curl -X POST http://qdrant:6333/collections/kale_catalog/points/search \\
  -H "Content-Type: application/json" \\
  -d '{"vector":[0.1, /*...1024-dim...*/],"limit":5,"with_payload":true}'`}
 },
 'ClickHouse':{
  ops:{health:'GET http://clickhouse:8123/ping → "Ok."',
       metrics:'GET http://clickhouse:9363/metrics + table system.query_log for query-level analysis',
       log:'{service="clickhouse"} | json | level="Error"',
       trace:'system.query_log table is the trace store + OTel via JDBC client'},
  sample:{lang:'bash',code:`# Average OEE for line 3 last 7 days
curl -X POST 'http://clickhouse:8123/?database=mfg' \\
  --data 'SELECT toDate(ts) AS d, avg(oee) FROM gold_oee WHERE line=3 AND ts > now() - INTERVAL 7 DAY GROUP BY d ORDER BY d FORMAT JSON'`}
 },
 'TimescaleDB':{
  ops:{health:'pg_isready (same as PostgreSQL)',
       metrics:'postgres-exporter with TimescaleDB-specific queries enabled (timescaledb_chunks, compression_ratio)',
       log:'{service="timescaledb"} | json',
       trace:'Same as PostgreSQL — OpenTelemetry psycopg instrumentation'},
  sample:{lang:'bash',code:`psql -h timescaledb -d sensors -c "
  SELECT time_bucket('5m', ts) AS t, avg(value)
  FROM sensor_readings
  WHERE device = 'line3.oven' AND ts > now() - INTERVAL '1 hour'
  GROUP BY t ORDER BY t;"`}
 },
 'Iceberg':{
  ops:{health:'GET http://iceberg-catalog:8181/v1/config → {...}',
       metrics:'Catalog-level via JMX or Prometheus exporter; storage-level via MinIO',
       log:'{service="iceberg-catalog"} | json',
       trace:'iceberg.snapshot.{table}.{snapshot_id}'},
  sample:{lang:'python',code:`from pyiceberg.catalog import load_catalog
cat = load_catalog("rest", uri="http://iceberg-catalog:8181")
table = cat.load_table("finance.transactions")
# Time-travel: read the state as of EOD 2026-06-01
df = table.scan(snapshot_id=table.snapshot_by_name("2026-06-01-eod").snapshot_id).to_pandas()`}
 },
 'Airflow':{
  ops:{health:'GET http://airflow:8080/health → {"metadatabase":{"status":"healthy"},"scheduler":{"status":"healthy"}}',
       metrics:'GET http://airflow:8080/metrics (statsd exporter: scheduler_heartbeat, dag_processing_time)',
       log:'{service="airflow"} | json | dag="..."  (task instance logs in MinIO)',
       trace:'airflow.{dag_id}.{task_id}.{run_id}'},
  sample:{lang:'bash',code:`# Trigger a DAG via REST API
curl -X POST http://airflow:8080/api/v1/dags/rag_reindex/dagRuns \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"conf":{"tenant":"kale","collection":"catalog"}}'`}
 },
 'File upload':{
  ops:{health:'GET http://file-upload:8000/health → {"status":"ok","minio":"reachable"}',
       metrics:'GET http://file-upload:8000/metrics (upload_count, bytes_total, dedup_hit_ratio)',
       log:'{service="file-upload"} | json',
       trace:'upload.{tenant}.{sha256}'},
  sample:{lang:'bash',code:`# Upload a catalog file; triggers RAG re-indexing
curl -X POST http://file-upload:8000/upload \\
  -H "Authorization: Bearer $JWT" \\
  -F "file=@catalog.csv" \\
  -F "tenant=kale" \\
  -F "purpose=rag_indexing"
# → {"sha256":"...","triggered_dag":"rag_reindex","run_id":"..."}`}
 },
 'NiFi SMB crawler':{
  ops:{health:'GET http://nifi:8080/nifi-api/system-diagnostics → {...}  (admin API, requires auth)',
       metrics:'GET http://nifi:8080/nifi-api/process-groups/root/state + Prometheus reporting task',
       log:'{service="nifi"} | json',
       trace:'NiFi flowfile lineage via /nifi-api/provenance/lineage (per-flowfile UUID is the trace key)'},
  sample:{lang:'bash',code:`# Trigger an on-demand processor run
curl -X PUT http://nifi:8080/nifi-api/processors/{processor_id}/run-status \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"state":"RUNNING","revision":{"version":1}}'`}
 },
 'Airbyte':{
  ops:{health:'GET http://airbyte:8001/api/v1/health → {"available":true}',
       metrics:'GET http://airbyte:9090/metrics (worker-emitted: sync_duration_seconds, records_emitted_total)',
       log:'{service="airbyte"} | json | level="error"',
       trace:'airbyte.sync.{connection_id}.{job_id}'},
  sample:{lang:'bash',code:`# Trigger a sync manually
curl -X POST http://airbyte:8001/api/v1/connections/sync \\
  -H "Content-Type: application/json" \\
  -d '{"connectionId":"$CONNECTION_ID"}'
# → 200 {"job":{"id":...,"status":"running","createdAt":...}}`}
 },
 'Debezium + Redpanda':{
  ops:{health:'Debezium: GET http://debezium:8083/connectors/{name}/status   ·   Redpanda: rpk cluster health',
       metrics:'Debezium JMX → Prometheus (debezium_replication_lag) · Redpanda GET http://redpanda:9644/metrics',
       log:'{service=~"debezium|redpanda"} | json',
       trace:'CDC events carry LSN + ts; trace as cdc.{table}.{lsn}'},
  sample:{lang:'bash',code:`# Register a new Debezium Postgres source connector
curl -X POST http://debezium:8083/connectors \\
  -H "Content-Type: application/json" \\
  -d '{"name":"pg-mfg","config":{"connector.class":"io.debezium.connector.postgresql.PostgresConnector","database.hostname":"postgres","database.dbname":"mfg","plugin.name":"pgoutput","slot.name":"debezium_mfg","topic.prefix":"mfg"}}'`}
 },
 'ARMES MES':{
  ops:{health:'GET http://armes-mcp:3001/health → {"status":"ok","mes_db":"connected"}',
       metrics:'GET http://armes-mcp:3001/metrics (tool_call_count, mes_query_latency_ms)',
       log:'{service="armes-mcp"} | json',
       trace:'mcp.armes.{tool_name}'},
  sample:{lang:'bash',code:`# Call the ARMES MCP tool via JSON-RPC (LangGraph does this internally)
curl -X POST http://armes-mcp:3001/jsonrpc \\
  -H "Authorization: Bearer $MCP_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"get_work_orders","arguments":{"line":"3","date":"2026-06-03"}},"id":1}'`}
 },
 'SAP':{
  ops:{health:'GET http://sap-mcp:3002/health → {"status":"ok","sap_rfc":"connected"}',
       metrics:'GET http://sap-mcp:3002/metrics (tool_call_count, sap_rfc_latency_ms)',
       log:'{service="sap-mcp"} | json',
       trace:'mcp.sap.{tool}  (read_stock · read_orders · read_financials)'},
  sample:{lang:'bash',code:`# Fetch stock levels via SAP MCP
curl -X POST http://sap-mcp:3002/jsonrpc \\
  -H "Authorization: Bearer $MCP_TOKEN" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"read_stock","arguments":{"plant":"K001","material":"M-1234"}},"id":1}'`}
 },
 'SharePoint':{
  ops:{health:'GET http://sharepoint-mcp:3003/health → {"status":"ok","graph_api":"reachable"}',
       metrics:'GET http://sharepoint-mcp:3003/metrics (search_count, doc_fetch_latency_ms)',
       log:'{service="sharepoint-mcp"} | json',
       trace:'mcp.sharepoint.{tool}'},
  sample:{lang:'bash',code:`# Search documents on an enterprise SharePoint site
curl -X POST http://sharepoint-mcp:3003/jsonrpc \\
  -H "Authorization: Bearer $MCP_TOKEN" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"search_documents","arguments":{"site":"engineering","query":"IATF audit 2026"}},"id":1}'`}
 },
 'Salesforce':{
  ops:{health:'GET http://salesforce-mcp:3004/health → {"status":"ok","sf_oauth":"valid"}',
       metrics:'GET http://salesforce-mcp:3004/metrics (soql_count, latency_ms)',
       log:'{service="salesforce-mcp"} | json',
       trace:'mcp.salesforce.{tool}'},
  sample:{lang:'bash',code:`# Query opportunities via Salesforce MCP
curl -X POST http://salesforce-mcp:3004/jsonrpc \\
  -H "Authorization: Bearer $MCP_TOKEN" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"query_opportunities","arguments":{"soql":"SELECT Id, Name FROM Opportunity WHERE StageName=\\"Closed Won\\" AND CloseDate=THIS_QUARTER"}},"id":1}'`}
 }
};
```

**Count verification:** exactly **48** top-level keys. AG must verify
`Object.keys(COMPDATA_OPS).length === 48` before proceeding.

---

## 5. Step 2 — Merge COMPDATA_OPS into COMPDATA

Use a one-off Node script (`scripts/_merge_compdata_ops.js`, delete after
use) that:

1. Reads the v6 SSoT HTML file
2. Extracts both `COMPDATA` and `COMPDATA_OPS` objects via vm-sandbox
3. For each key in `COMPDATA_OPS`:
   - **Asserts** the key exists in `COMPDATA` (if not → stop, report
     mismatch — name drift indicates a bug to fix before merge)
   - Adds `ops` and `sample` fields to the COMPDATA entry
4. Serialises the merged `COMPDATA` back to its source location in the file
   using `JSON.stringify` (handles all escaping) **with one caveat:** the
   `sample.code` strings must remain as template literals (backticks) in
   the source, so the script must post-process the JSON output to convert
   `sample.code` values back to backtick-quoted strings. (Backtick strings
   preserve newlines without `\n` escapes — much more readable in source.)
5. Deletes the temporary `COMPDATA_OPS` variable declaration from the file
   (it was a staging vehicle only; the merged data lives in `COMPDATA`).

**Final file state:**
- `COMPDATA` has 67 entries; 48 of them now have `ops` and `sample` fields
- `COMPDATA_OPS` no longer exists in the file

Report:
- Number of entries successfully merged (expected: 48)
- Any name mismatches between COMPDATA_OPS keys and COMPDATA keys
- Final byte size of the merged COMPDATA literal in the file

---

## 6. Step 3 — CSS additions

**str_replace** — append before `</style>`. Anchor on the last S2c CSS line:

**Old:**
```
.cb-repo a:hover{text-decoration:underline}
</style>
```

**New:**
```
.cb-repo a:hover{text-decoration:underline}
/* === cookbook: sample call + operations === */
.cb-sample{background:#0A0E14;border:1px solid var(--border);border-radius:7px;padding:10px 12px;font-family:var(--mono);font-size:11.5px;line-height:1.55;color:var(--text);overflow-x:auto;white-space:pre;margin-top:2px}
.cb-sample-lang{display:inline-block;font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.08em;color:var(--text3);background:var(--bg3);border:1px solid var(--border);border-radius:3px;padding:1px 6px;text-transform:uppercase;margin-bottom:5px}
.cb-ops{width:100%;border-collapse:collapse;font-size:11.5px}
.cb-ops td{padding:6px 9px;border-bottom:1px solid var(--border);vertical-align:top}
.cb-ops td:first-child{font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);white-space:nowrap;width:80px;padding-top:8px}
.cb-ops td:last-child{font-family:var(--mono);font-size:11px;color:var(--text2);line-height:1.5;word-break:break-word}
```

---

## 7. Step 4 — Render the new sections in `showEarchDetail`

Two helpers added before `showEarchDetail` (alongside existing `_cbDeploy`,
`_cbConfig` from S2c):

```javascript
function _cbSample(s){
 if(!s||!s.code)return '';
 return '<div class="cb-sect">Sample call</div>'
  +'<span class="cb-sample-lang">'+(s.lang||'code')+'</span>'
  +'<pre class="cb-sample">'+s.code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</pre>';
}
function _cbOps(o){
 if(!o)return '';
 var rows='';
 if(o.health) rows+='<tr><td>Health</td><td>'+o.health+'</td></tr>';
 if(o.metrics)rows+='<tr><td>Metrics</td><td>'+o.metrics+'</td></tr>';
 if(o.log)    rows+='<tr><td>Logs</td><td>'+o.log+'</td></tr>';
 if(o.trace)  rows+='<tr><td>Trace</td><td>'+o.trace+'</td></tr>';
 if(!rows)return '';
 return '<div class="cb-sect">Operations</div><table class="cb-ops"><tbody>'+rows+'</tbody></table>';
}
```

**str_replace** in `showEarchDetail` body — insert two render calls between
the config table and the inbound section. The S2c body has this fragment:

**Old** (confirm from live file):
```
  +_cbConfig(cd.config)
  +(inbound.length?'<div class="cb-sect">Inbound connections ('+inbound.length+')</div>'+inbound.map(function(r){return _dpRow(r,'in');}).join(''):'')
```

**New:**
```
  +_cbConfig(cd.config)
  +_cbSample(cd.sample)
  +_cbOps(cd.ops)
  +(inbound.length?'<div class="cb-sect">Inbound connections ('+inbound.length+')</div>'+inbound.map(function(r){return _dpRow(r,'in');}).join(''):'')
```

Both new sections guard internally on `cd.sample` / `cd.ops` being present.
The 19 components without these fields will simply skip both sections —
unchanged S2c output.

**HTML-escaping note:** `_cbSample` escapes `&`, `<`, `>` in the code
content. This is critical — the sample for `Embed widget` contains literal
`<script>` tags which would otherwise execute inline.

---

## 8. Acceptance criteria

**Structural (grep on edited file):**
- [ ] `COMPDATA_OPS` **does not appear** anywhere (was deleted post-merge)
- [ ] Exactly 48 COMPDATA entries have an `ops` field
- [ ] Exactly 48 COMPDATA entries have a `sample` field
- [ ] The same 48 entries (count by intersection) — no entry has one
  field without the other
- [ ] CSS contains `.cb-sample`, `.cb-sample-lang`, `.cb-ops`
- [ ] `_cbSample`, `_cbOps` defined before `showEarchDetail`
- [ ] S2/S2b/S2c symbols all still present: `_dpRow`, `_dpSec`,
  `closeDetail`, `DL`, `_cbDeploy`, `_cbConfig`, `OWNER_COLOR`,
  `toggleEconn`, `toggleRconn`

**Functional — Node.js smoke test (`smoke-s2d1.js`):**

```javascript
const fs=require('fs');
const html=fs.readFileSync('path/to/SSoT.html','utf8');
if(html.includes('COMPDATA_OPS')) throw new Error('staging var not cleaned up');

const m=html.match(/<script>([\s\S]*?)<\/script>/);
const els={};
global.document={
 getElementById:id=>{if(!els[id])els[id]={innerHTML:'',value:'',textContent:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}},querySelectorAll:()=>[]};return els[id];},
 querySelectorAll:()=>[],documentElement:{lang:''},addEventListener:()=>{}
};
eval(m[1]);

// Field-coverage check
const withOps=Object.keys(COMPDATA).filter(k=>COMPDATA[k].ops);
const withSample=Object.keys(COMPDATA).filter(k=>COMPDATA[k].sample);
if(withOps.length!==48) throw new Error('expected 48 ops fields, got '+withOps.length);
if(withSample.length!==48) throw new Error('expected 48 sample fields, got '+withSample.length);
const diff=withOps.filter(k=>!withSample.includes(k)).concat(withSample.filter(k=>!withOps.includes(k)));
if(diff.length) throw new Error('ops/sample coverage misaligned: '+diff.join(', '));

// Schema check on each ops entry
withOps.forEach(k=>{
 const o=COMPDATA[k].ops;
 ['health','metrics','log','trace'].forEach(f=>{
  if(!o[f]) throw new Error(k+' ops missing field: '+f);
 });
 const s=COMPDATA[k].sample;
 if(!s.lang||!s.code) throw new Error(k+' sample malformed');
 if(!['bash','python','html'].includes(s.lang)) throw new Error(k+' sample.lang invalid: '+s.lang);
});

// 19 components correctly have NO ops/sample
const compsNames=COMPS.map(c=>c[0]);
const noOps=compsNames.filter(n=>!COMPDATA[n].ops);
if(noOps.length!==19) throw new Error('expected 19 components without ops, got '+noOps.length);

// Spot-check render — Channel gateway
const cIdx=COMPS.findIndex(c=>c[0]==='Channel gateway');
showEarchDetail(cIdx);
const out=document.getElementById('dpanel').innerHTML;
if(!out.includes('cb-sample')) throw new Error('Channel gateway sample section missing');
if(!out.includes('cb-ops')) throw new Error('Channel gateway ops section missing');
if(!out.includes('Langfuse: channel')) throw new Error('Channel gateway trace text missing');
if(!out.includes('/webhook/whatsapp')) throw new Error('Channel gateway sample code missing');

// Spot-check render — PostgreSQL (should have ops + sample)
const pIdx=COMPS.findIndex(c=>c[0]==='PostgreSQL');
showEarchDetail(pIdx);
const pOut=document.getElementById('dpanel').innerHTML;
if(!pOut.includes('pg_isready')) throw new Error('PostgreSQL sample missing');

// Spot-check render — WhatsApp (should NOT have ops/sample)
const wIdx=COMPS.findIndex(c=>c[0]==='WhatsApp');
showEarchDetail(wIdx);
const wOut=document.getElementById('dpanel').innerHTML;
if(wOut.includes('cb-sample')) throw new Error('WhatsApp should not have sample section');
if(wOut.includes('cb-ops')) throw new Error('WhatsApp should not have ops section');

// HTML escaping check — Embed widget sample contains <script>
const eIdx=COMPS.findIndex(c=>c[0]==='Embed widget');
showEarchDetail(eIdx);
const eOut=document.getElementById('dpanel').innerHTML;
if(eOut.includes('<script src="https://cdn')) throw new Error('Embed widget sample not HTML-escaped — XSS risk');
if(!eOut.includes('&lt;script src=&quot;https://cdn') && !eOut.includes('&lt;script src="https://cdn')) throw new Error('Embed widget sample escape mangled');

console.log('SMOKE PASS · 48 components with ops+sample · 19 without · escaping ✅');
```

---

## 9. PR and merge gate

PR title: `S2d.1: ops + sample fields for 48 internal components`

PR body must include:
- Step 0 findings (S2c symbols present, naming conflicts = 0, COMPDATA at 67)
- Step 1 confirmation (COMPDATA_OPS staged, count 48)
- Step 2 merge report (entries merged, name mismatches = 0, COMPDATA_OPS deleted)
- Smoke test full output (`SMOKE PASS · 48 components ...`)
- Structural acceptance items (all checked)
- One screenshot suggested: rendered Channel gateway panel with sample + ops sections visible

**AG stops after opening the PR.** Operator runs §10. AG merges only after
operator signals approval.

---

## 10. Operator manual verification (standalone browser, pre-merge)

Spot-check 8 components — covers all major archetypes:

1. **Channel gateway** (L0 FastAPI) → click chip → panel shows Sample call
   (bash, curl webhook) + Operations table (health, metrics, log, trace).
2. **LangGraph** (L2 AI Eng) → Sample is Python; Operations shows
   `langgraph.{agent}.{node}` trace.
3. **LiteLLM** (L3 routing) → Python sample using OpenAI SDK pointed at
   `litellm:4000`. Ops shows readiness endpoint.
4. **PostgreSQL** (L6 storage) → bash `pg_isready` ops. Sample is `psql -h
   postgres`.
5. **MinIO** (L6 storage) → `mc cp` sample. Ops includes the unusual
   metrics endpoint format `/minio/v2/metrics/cluster`.
6. **SAP** (L8 MCP) → JSON-RPC POST sample to `sap-mcp:3002`. Ops shows
   `sap_rfc` health field.
7. **Embed widget** (L0 Frontend) → sample shows literal `<script>` tags
   rendered as text (HTML-escaped, not executed). Language tag reads `HTML`.
8. **WhatsApp** (L0 external) → panel has S2c sections only. **No** Sample
   call section. **No** Operations section. Confirms guard works.

Also:
- Close panel (× or Escape) → no errors.
- EAIP Conn tab → S2b inline detail still works (regression check).
- Lang toggle EN→TR → ops/sample stay English; tab labels switch (expected).
- Browser console clean throughout.

---

## 11. Lessons.md

```
## S2d.1 — ops + sample fields for 48 internal components
### AG delivery summary
Model: [model] · Lines changed: +[N] · PR: [#N] · Merge SHA: [sha]
Step 0: S2c symbols ✅ · naming conflicts: 0 · COMPDATA at 67 · no prior ops/sample
Step 1: COMPDATA_OPS staged with [N] entries (expected 48)
Step 2: merge complete · 48 entries updated · 0 name mismatches · COMPDATA_OPS removed ✅
Smoke: ops coverage 48 ✅ · sample coverage 48 ✅ · 19 without (expected) ✅ · render checks ✅ · HTML escaping ✅
Spot-check renders: Channel gateway ✅ · PostgreSQL ✅ · WhatsApp (no ops/sample) ✅ · Embed widget (HTML-escaped) ✅
### Operator review
[Maymun fills in 8-point check outcome]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 12. What S2d.1 does NOT touch

- S2's chrome (`dpanel`, `dpoverlay`, `_dpRow`, `_dpSec`, `closeDetail`,
  `DL`) — preserved
- S2b's inline connection rows (`toggleEconn`, `toggleRconn`, `_ecdRow`,
  `_rcdRow`, `cdr*`, `cdata`) — preserved (cross-linking is S2d.2 work)
- S2c's helpers (`_cbDeploy`, `_cbConfig`) and CSS (`cb-sub`, `cb-owner`,
  `cb-desc`, `cb-deploy`, `cb-config`, `cb-notes`, `cb-repo`, `cb-sect`)
  — preserved
- All 67 COMPDATA entries' existing fields (`sub, desc, deploy, config,
  notes, owner, repo`) — never mutated; only **added to** for the 48
- `COMPS`, `ECONN`, `RCONN`, `RSYS`, `CTYPES`, `RCTYPES`, `EPH`,
  `RGROUPS`, `EPLAN`, `RPLAN`, `LAYERS`, `T`, `EROLE`, `OWNER_COLOR` —
  read only
- Rev component panel (`showRarchDetail`) — deferred
- `errors` field — deferred to S2d.2
- Cross-linking from S2b inline rows to component panel — deferred to
  S2d.2
- TR translations of new fields — deferred to a later translation pass
- App repo (`maymun207/TheBluePrint23`) — Phase 2 (S6–S7)

---

## 13. Author's note on content authenticity

The `ops` and `sample` values here are **architectural specifications**,
not observations from running systems. Nothing in this stage has been
verified against a live deployment because no live deployment exists yet
(Phase 1 starts M1). The endpoints, metric names, log queries, and trace
names express the design intent — what these components **will** look like
operationally when Phase 1 builds them.

Two consequences worth surfacing:

1. **Drift is expected** between this cookbook and the final implementation.
   When a developer in M1+ deploys (e.g.) LangGraph and finds the health
   endpoint actually exposes different fields, the cookbook should be
   updated to reflect reality. The progress tracker (S2e, planned for late
   M0) is the natural mechanism for capturing those updates.

2. **Sample code is intentional, not aspirational.** Each sample reflects
   the integration pattern described in the corresponding ECONN/RCONN
   entry. Developers in M1+ should be able to literally paste these
   commands once the target component is deployed — and if the paste
   fails, the cookbook is wrong and needs an issue.

This is the gap S2e will close: live notes ("John tried this on 2026-09-03,
returns `{"status":"degraded"}` not `"ok"` — fixed in env var X") will
overlay the cookbook from production reality.
