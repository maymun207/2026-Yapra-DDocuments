# Stage S2d.2 — `errors` field + ECONN cross-linking

> **stage_id:** S2d.2
> **stage_type:** Phase 1 · Data authoring + UX enhancement · content repo
>   (`agbuilder-platform/revolutionize@main`)
> **author:** Claude (architect · single-author rule)
> **date:** 2026-06-03
> **model_recommended:** Claude Sonnet 4.6, thinking mode
> **model_used_actual:** [AG fills in `lessons.md`]
> **estimated_size:** L — AG 75–95 min · human review 60 min
> **merge_mode:** operator-gated — AG opens PR, reports, stops. Operator
>   spot-checks 8 components + the cross-link UX in browser, signals. AG merges.
> **predecessor:** S2d.1 ✅ (PR #7 · SHA `fe1dedd`)
> **successor:** S6/S7 (the migration plan resumes — the cookbook is feature-complete)

---

## 1. Goal

Two deliverables, both small in code surface, large in developer value:

### 1.1 `errors[]` for the 48 internal components
For each component that already has `ops` + `sample`, add a small array of
**symptom → action** failure modes (2 per component; the runbook tier).
Render a "Failure modes" section in the cookbook panel between Operations
and Inbound connections.

### 1.2 ECONN cross-linking
In S2b's inline detail rows, the FROM and TO names visible in the **data
row** (above the expansion) become clickable. Click → opens that
component's full cookbook panel via `showEarchDetail`. Visual hint: dotted
underline + cursor change on hover.

RCONN does **not** get cross-linking in this stage — RCONN endpoints are
agent/subcomponent names (e.g., `Agent base class`, `MCP client`) that do
not appear in COMPS, so there is no destination panel. Cross-linking for
Rev waits until the Rev cookbook exists.

---

## 2. File in scope

**One file:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`

Read the live file from GitHub before any edit.

---

## 3. Step 0 — Verify ground truth

Report each, stop on any mismatch.

**3a.** S2d.1 symbols present: `_cbSample`, `_cbOps`, `cb-sample`,
`cb-ops`. If any missing, stop.

**3b.** Naming-conflict grep — all expected **0 hits**:
`COMPDATA_ERR`, `_cbErrors`, `openComp`, `handleEconnClick`,
`cb-err`, `cb-err-item`, `cb-err-sym`, `cb-err-act`, `cli`.

**3c.** Field-coverage check on existing COMPDATA: exactly **48** entries
have `ops` and `sample`; exactly **0** entries have `errors`. Report the
counts.

**3d. Pattern #16 reminder.** Reminder from S2d.1 merge: any literal
`</script>` sequence inside ANY string in the script block (single-quote,
double-quote, or backtick) must be written as `<\/script>` in source. AG
must scan the entire COMPDATA_ERR block in §4 below before insertion and
confirm: zero literal `</script>` sequences exist. (None expected — but
verify, do not assume.)

**3e.** Confirm exact text of the S2b `renderEconnTable` function. The
function's `rows.map` callback is where the cross-link wiring lands; the
function must match its post-S2b state (no other stage has touched it).
Report the exact text of the line that starts with
`return '<tr class="cdata" onclick="toggleEconn(` — Step 4 needs an exact
str_replace anchor.

---

## 4. Step 1 — The authored content block

The following object holds `errors` arrays for exactly 48 components.
Names match v6 COMPS exactly. **Insert verbatim** as `COMPDATA_ERR`
immediately after `COMPDATA` (and before `OWNER_COLOR`). Step 2 merges.

```javascript
var COMPDATA_ERR={
 'Channel gateway':{errors:[
  {symptom:'Webhook returns 502 to Meta',action:'Check LangGraph readiness (`kubectl get pod langgraph`). Gateway is a thin proxy — issue is almost always upstream. Verify Redis connectivity too (`redis-cli -h redis ping`).'},
  {symptom:'WhatsApp messages duplicated in logs',action:'Meta retries on 5xx. Confirm the gateway returns 200 within 5s even when LangGraph is slow — enqueue to Redis and ack immediately if needed.'}
 ]},
 'Whisper STT':{errors:[
  {symptom:'Transcription returns empty text for valid audio',action:'Audio format mismatch — Whisper expects 16kHz mono. Channel gateway must resample WhatsApp OGG (48kHz stereo) before forwarding. Check `model_load_seconds` metric for cold-start delay.'},
  {symptom:'GPU OOM on long voice notes (>2min)',action:'Whisper batches audio chunks; reduce `max_chunk_seconds` in deployment config from default 30 to 20. Or scale to a larger GPU.'}
 ]},
 'Embed widget':{errors:[
  {symptom:'Widget does not render after page load',action:'CSP blocking — host page must allow `connect-src` to API URL and `script-src` to CDN. Check browser console for CSP violation reports.'},
  {symptom:'Session lost on page refresh',action:'Widget uses sessionStorage by default; for cross-page persistence, configure with `storage:"local"`. Tenant admin can toggle in dashboard.'}
 ]},
 'Web chat':{errors:[
  {symptom:'WebSocket disconnects every 60s',action:'Kong default idle timeout is 60s. Set `upstream_read_timeout: 3600` for the `/ws/*` route, OR enable WS ping/pong with 30s interval from the client.'},
  {symptom:'Streaming responses arrive all at once instead of incrementally',action:'Check that the response goes through Kong with `request_buffering: false`. Buffering is enabled by default and breaks SSE/streaming.'}
 ]},
 'Teams bot':{errors:[
  {symptom:'Bot does not respond but logs show 200 OK',action:'Bot Framework requires reply within 15s; if LangGraph takes longer, send a typing indicator via `turnContext.sendActivities` and stream the final answer. Check Adaptive Card schema if rich response fails.'},
  {symptom:'Authentication errors on first message after deploy',action:'BF_TOKEN env var must match the Microsoft App registration. Rotate via Vault path `apps/teams-bot/bf-token` and restart pod.'}
 ]},
 'Min. dashboard':{errors:[
  {symptom:'Tenant list shows stale data',action:'Dashboard uses ISR with 60s revalidate. Force refresh via `?refresh=true` query param, or hit the admin API directly (`/api/tenants`).'},
  {symptom:'Login redirects to Keycloak but bounces back to login',action:'Redirect URI mismatch — Keycloak client config must include `https://admin.{tenant}.ardictech.com/api/auth/callback/keycloak` exactly. Wildcards not supported.'}
 ]},
 'Kong':{errors:[
  {symptom:'Random 502s on `/api/*` routes',action:'Kong upstream health check declared FastAPI unhealthy. Inspect `/upstreams/fastapi/health` — usually a transient FastAPI pod restart. Increase `healthy.successes` from default 1 to 3 to be more forgiving.'},
  {symptom:'Plugin not applying to a route',action:'Plugin order matters — `key-auth` must come before `rate-limiting`. List plugins on the route: `GET /routes/{route_id}/plugins` and reorder via `before`/`after`.'}
 ]},
 'FastAPI':{errors:[
  {symptom:'5xx spikes during high traffic',action:'asyncpg pool exhaustion — check `pg_stat_activity` for connection count. Raise pool size (default 20) only if PostgreSQL can handle it (`max_connections` in PG config).'},
  {symptom:'JWT validation fails with "Invalid signature" randomly',action:'Keycloak JWKS cache stale after key rotation. Set cache TTL to <=5min in FastAPI middleware. Manual purge: restart pod or POST `/admin/cache/purge`.'}
 ]},
 'Keycloak':{errors:[
  {symptom:'Login slow (>5s) under load',action:'Realm key cache cold or DB contention. Inspect `pg_stat_activity` for Keycloak queries. Pre-warm by hitting `/realms/{realm}/.well-known/openid-configuration` after each pod start.'},
  {symptom:'Tokens issued but refresh fails',action:'Refresh token TTL exceeded (default 30min). Either extend TTL in realm settings, OR ensure clients refresh proactively at 80% of access token TTL.'}
 ]},
 'OPA':{errors:[
  {symptom:'Policy evaluations slow (>50ms)',action:'Decision log shipping is synchronous by default. Set `decision_logs.console: false` and use the bundle plugin for async shipping. Inspect policy complexity — nested iteration is O(n²).'},
  {symptom:'Bundle fails to load on pod start',action:'Bundle URL (Vault, OCI, HTTPS) unreachable. Check `/v1/status` for bundle status. Fallback: bake the policy into the image as `/policies/` for emergency.'}
 ]},
 'Tenant provisioning':{errors:[
  {symptom:'Provisioning job stuck at "qdrant" step',action:'Qdrant cluster may be over-replica-limit. Inspect Qdrant pod count and `/cluster` endpoint. Service retries with backoff — kill the job manually if Qdrant needs scaling first.'},
  {symptom:'Tenant created but admin cannot log in',action:'Realm created but client credentials not pushed. Check `provision.steps.realm` audit table. Re-run just the credential step: POST `/provision/{tenant}/repair?step=keycloak_client`.'}
 ]},
 'LangGraph':{errors:[
  {symptom:'Agent runs but final output is empty',action:'Guardrails validation failure caught silently. Check Langfuse trace for `guardrails.{rail}.validate` span with `result:fail`. Rail spec mismatch with model output schema — update rail YAML.'},
  {symptom:'Workflow stuck after first node',action:'PostgresSaver checkpoint failure — check `pg_stat_activity` for blocked LangGraph queries. Likely WAL bloat or replication lag. Truncate checkpoint table or restart LangGraph pod.'},
  {symptom:'Same query returns different answers each run',action:'Temperature too high OR retrieval non-deterministic. Set `temperature: 0` for deterministic queries (analytics) and verify Qdrant search uses `consistency: strong`.'}
 ]},
 'Hybrid decision engine':{errors:[
  {symptom:'Decision always falls through to default rule',action:'Rules YAML not loaded — hot reload may have missed the file change. `kubectl logs langgraph | grep "rules loaded"` should show N rules. If 0, fix YAML syntax (most likely indentation).'},
  {symptom:'Audit log missing for some decisions',action:'Async insert may have failed under load. Engine uses fire-and-forget by default. Check `pg_stat_activity` for `INSERT INTO decisions` blocked queries. Switch to sync insert for compliance-critical flows.'}
 ]},
 'n8n':{errors:[
  {symptom:'Webhook trigger fires twice for one event',action:'n8n retries on workflow error. Ensure your workflow is idempotent OR enable "execute once" setting in the workflow settings.'},
  {symptom:'Workflow times out at 30s but should run longer',action:'Default timeout. Set `WORKFLOWS_DEFAULT_TIMEOUT=300` or per-workflow via the settings panel. For >5min workflows, use Temporal instead.'}
 ]},
 'Temporal':{errors:[
  {symptom:'Workflows complete but `await result()` hangs',action:'Client is waiting for a return value the workflow never set. Check Temporal UI for workflow status — if it shows COMPLETED but no result, the workflow returned None. Add return value to workflow function.'},
  {symptom:'High Postgres CPU correlated with Temporal',action:'Persistence cleanup not running — Temporal stores history forever by default. Configure `retention: 30d` per namespace, and verify cleanup workflow is running.'}
 ]},
 'vLLM':{errors:[
  {symptom:'First request after deploy takes 60+ seconds',action:'Model loading on cold start. Pre-warm in pod readiness check — wait for `/health` to return 200 before adding pod to LB. Increase pod start grace period to 90s in K8s deployment.'},
  {symptom:'OOM crash under heavy concurrent load',action:'`gpu_memory_utilization` too aggressive. Reduce from 0.90 to 0.85, OR lower `max_model_len` (default 8192). Check vLLM logs for "CUDA out of memory".'}
 ]},
 'LiteLLM':{errors:[
  {symptom:'Fallback to Ollama in production',action:'Primary provider (vLLM/Anthropic) failed. Check `litellm_fallback_total` metric. Common cause: rate limit hit. Adjust per-key rate limits in `litellm_config.yaml`.'},
  {symptom:'Cost tracking shows zero usage',action:'Langfuse callback not configured. Set `LANGFUSE_HOST` env var. Check LiteLLM logs for "callback init" errors.'}
 ]},
 'Ollama':{errors:[
  {symptom:'"Model not found" error',action:'Pull the model first: `ollama pull llama3:8b`. Persistent volume mounted at `/data/models` — check disk space.'},
  {symptom:'Responses slow in dev environment',action:'Ollama on CPU is slow for >7B models. Use Q4 quantization (`llama3:8b-q4_K_M`) or accept ~30s response times in dev.'}
 ]},
 'MLflow':{errors:[
  {symptom:'Artifacts not appearing in MinIO',action:'MinIO credentials wrong or bucket missing. Verify `mlflow-artifacts/` bucket exists. Check MLflow logs for "NoSuchBucket" errors.'},
  {symptom:'Run names duplicated',action:'MLflow generates random names on duplicate `run_name`. Set `MLFLOW_TRACKING_URI` per-experiment and use `start_run(run_name=)` consistently.'}
 ]},
 'Prompt store':{errors:[
  {symptom:'Wrong language template returned',action:'Cache key includes lang, but client passed wrong header. Verify `?lang=tr` query param OR `Accept-Language: tr` header. Fallback always goes to EN if TR missing.'},
  {symptom:'Version "latest" returns old template',action:'Active version not updated. Check `prompts.versions` table — must mark new version `active=true` and old `active=false` in one tx. Use POST `/admin/prompts/{id}/promote/{version}`.'}
 ]},
 'Langfuse':{errors:[
  {symptom:'Traces appear in UI but no spans visible',action:'Callback fired but spans not flushed. Add `langfuse.flush()` before exit or use context manager. Async batching has a 10s delay by default.'},
  {symptom:'Cost shows $0 for all traces',action:'Model name in trace does not match Langfuse model catalog. Add custom model pricing via `langfuse.create_model(...)` for non-standard names like `sonnet-4.6`.'}
 ]},
 'Guardrails AI':{errors:[
  {symptom:'Validation always passes even when output is bad',action:'Rail file not loaded — check path. Default Guard auto-loads from current working directory. Set `RAILS_DIR=/app/rails` and verify `Guard.from_rail("quality.rail")` succeeds at startup.'},
  {symptom:'ValidationError raised but LangGraph does not retry',action:'LangGraph node must catch ValidationError and re-invoke LLM with feedback. Check the node code — generic `except Exception` may swallow it without retry logic.'}
 ]},
 'LlamaIndex':{errors:[
  {symptom:'Retrieval returns 0 results for valid queries',action:'Collection empty or wrong embedding model. Verify `qc.count(collection_name)` >0. Mismatch between indexing-time and query-time embeddings will return near-random results.'},
  {symptom:'Retrieval slow (>500ms)',action:'Top-K too high or HNSW config off. Reduce `similarity_top_k` to 5. Tune Qdrant HNSW (`ef_construct: 200, m: 16`) at collection creation time — cannot change later.'}
 ]},
 'Qdrant / pgvector':{errors:[
  {symptom:'Upsert silently succeeds but search returns nothing',action:'Vector dimension mismatch — Qdrant accepts the upsert but search filters it. Verify embedding dimension matches collection schema (e.g., 1024 for bge-m3).'},
  {symptom:'Tenant data leaking into wrong collection',action:'Collection name not tenant-scoped. Must use `{tenant}_{purpose}` format (e.g., `kale_catalog`). Audit via `qc.get_collections()` — refactor any non-scoped collection.'}
 ]},
 'Memori':{errors:[
  {symptom:'Session memory empty even after multiple turns',action:'Memori only persists once per turn. Check that LangGraph calls `memori.write(session_id, turn)` after each completion. Race condition possible if multiple instances; use Redis lock if needed.'},
  {symptom:'Profile memory bleeds across tenants',action:'Profile keyed by `user_id` only — must be `{tenant}:{user_id}`. Migration: rewrite all profile keys with tenant prefix; old ones unreachable.'}
 ]},
 'LightRAG':{errors:[
  {symptom:'KG construction takes hours for medium corpus (~1000 docs)',action:'Entity extraction is LLM-bound. Use Sonnet 4.6 not Opus for KG build (4x faster, sufficient quality). Batch size 16 optimal for parallelism.'},
  {symptom:'Multi-hop queries return only single-hop results',action:'Mode set to `local` instead of `hybrid`. Verify request body has `"mode":"hybrid"`. Local is shallow, global is broad, hybrid combines.'}
 ]},
 'Graphiti + FalkorDB':{errors:[
  {symptom:'Causal query returns no edges within time window',action:'CDC events not flowing — check Debezium connector status (`GET /connectors/pg-mfg/status`). Graphiti only knows what arrives via Redpanda topics.'},
  {symptom:'FalkorDB OOM with large graphs',action:'Default Redis memory limit too low. Set `maxmemory 8gb` in falkordb config. Consider time-window pruning: query only last 90 days unless explicitly historical.'}
 ]},
 'Soda Core':{errors:[
  {symptom:'Soda scan passes but data is bad',action:'Checks too lenient. Audit `checks/*.yml` — `freshness < 1d` is common but for OEE you need `< 1h`. Tighten thresholds per dataset.'},
  {symptom:'OpenMetadata not showing scan results',action:'Webhook config missing. Verify `soda_publish_to_openmetadata: true` in profile.yml and check the integration token. Test with `soda scan --verbose`.'}
 ]},
 'dbt Core':{errors:[
  {symptom:'Models fail with "duplicate column" on incremental run',action:'Schema drift — source added a column. dbt incremental needs `on_schema_change: append_new_columns` or `sync_all_columns`. Set in model config.'},
  {symptom:'Gold model has stale data despite Silver being fresh',action:'dbt DAG ordering issue — Gold dependency on Silver not declared via `ref()`. Use `{{ ref("silver_oee") }}` not raw table names. Check `target/manifest.json` for the dependency graph.'}
 ]},
 'OpenMetadata':{errors:[
  {symptom:'Ingestion pipeline fails with "connection timeout"',action:'OpenMetadata `ingestion-bot` user lacks DB permissions. Grant `pg_read_all_data` to the user, OR specify subset of schemas in pipeline config to avoid permission errors on system tables.'},
  {symptom:'Search returns nothing for known tables',action:'Elasticsearch index out of sync. Run reindex: `POST /api/v1/search/reindex` with `{recreateIndex: true}`. Then re-trigger ingestion to populate.'}
 ]},
 'Audit / SPC PDF':{errors:[
  {symptom:'PDF generation succeeds but PDF is blank',action:'WeasyPrint fonts not loaded. Mount font files at `/usr/share/fonts/truetype/` in the container. Most common: Inter, Noto Sans Turkish. Verify with `fc-list | grep Turkish`.'},
  {symptom:'URL returned but file does not exist in MinIO',action:'MinIO write succeeded but bucket policy denies external read. Check bucket policy for `s3:GetObject` on `audit-pdfs/*`. Pre-signed URL bypasses this only if MINIO_BROWSER_REDIRECT_URL is set.'}
 ]},
 'LLM enrichment':{errors:[
  {symptom:'Enrichment job runs but output column is null',action:'LLM returned malformed JSON — enrichment expects strict schema. Check Guardrails validation logs. Add a "fallback to null" policy for production tolerance, not a hard fail.'},
  {symptom:'Cost exceeds budget for large batches',action:'Batch size too aggressive. Switch model to Haiku 4.5 for bulk enrichment, Sonnet only for high-stakes columns. Track via `enrich_cost_usd_total{table}` metric.'}
 ]},
 'PostgreSQL':{errors:[
  {symptom:'Connection pool exhausted ("too many clients")',action:'Application pools too large for PG `max_connections`. Sum all `pool_size * replicas` — must be < max_connections. Use pgBouncer in transaction mode for >100 concurrent.'},
  {symptom:'Slow queries on tenant-scoped tables',action:'Missing index on `tenant_id`. Run `EXPLAIN` — if Seq Scan, add `CREATE INDEX CONCURRENTLY ON {table}(tenant_id, ...)`. RLS without index forces sequential scan.'}
 ]},
 'Redis':{errors:[
  {symptom:'Sessions disappear before TTL expires',action:'Memory pressure causing eviction. Default `maxmemory-policy` is `noeviction` (rejects writes) or `allkeys-lru` (silent loss). Check INFO memory; raise maxmemory or shard.'},
  {symptom:'Rate limit returns "too many requests" for valid users',action:'Clock skew between pods skews sliding window. All apps must use Redis time (`TIME` command) not local time. Audit the rate limiter code.'}
 ]},
 'MinIO':{errors:[
  {symptom:'Pre-signed URL works for some users, 403 for others',action:'URL signed against MinIO internal hostname (`minio:9000`) but accessed via external URL. Set `MINIO_BROWSER_REDIRECT_URL` and re-issue URLs with correct host.'},
  {symptom:'Tenant uploads visible across tenants',action:'Bucket policy missing tenant-prefix isolation. Use a single bucket per purpose (`audit-pdfs`, `catalog-files`) with `{tenant}/` prefix and policy scoped to that prefix only.'}
 ]},
 'Qdrant':{errors:[
  {symptom:'Search latency p95 spikes after collection growth',action:'HNSW index needs rebuild as data grows. Check `index_status` — if BUILDING, queries fall back to brute force. Pre-build off-peak: `POST /collections/{name}/index`.'},
  {symptom:'Tenant collection deleted in error',action:'Qdrant has no soft-delete. Snapshot backups must exist. Restore: `POST /collections/{name}/snapshots/recover` with the latest snapshot URL from MinIO.'}
 ]},
 'ClickHouse':{errors:[
  {symptom:'Inserts succeed but data not visible in SELECT',action:'ReplacingMergeTree dedupes on background merge — not visible until merged. Force with `OPTIMIZE TABLE {name} FINAL` (expensive). For low-latency reads, use `FINAL` keyword in query.'},
  {symptom:'Out-of-memory during large aggregation',action:'`max_memory_usage` too low or query needs disk spill. Set `max_bytes_before_external_group_by=10000000000` (10GB) to spill GROUP BY to disk. Last resort: pre-aggregate with materialized view.'}
 ]},
 'TimescaleDB':{errors:[
  {symptom:'Sensor inserts slow after weeks of data',action:'Hypertable chunks not compressed. Enable `add_compression_policy` for chunks >1 day old. Verify via `chunk_compression_stats`. Compressed chunks are 10x faster to read.'},
  {symptom:'Continuous aggregate stale',action:'Refresh policy missing. Set `add_continuous_aggregate_policy` with `schedule_interval: 1 hour`. Check `timescaledb_information.job_stats` for run history.'}
 ]},
 'Iceberg':{errors:[
  {symptom:'Time-travel query returns no data for old snapshot',action:'Snapshot expired by retention policy. Default 5 days. For audit, set per-table `history.expire.min-snapshots-to-keep: 100` and `history.expire.max-snapshot-age-ms: 31536000000` (1 year).'},
  {symptom:'Write conflicts on concurrent appends',action:'Iceberg uses optimistic concurrency. Two writers can collide. Retry on conflict with exponential backoff in client code. OR partition writes to avoid overlap.'}
 ]},
 'Airflow':{errors:[
  {symptom:'Scheduler runs but no tasks execute',action:'Worker pool full or DAG paused. Check `airflow_pool` and DAG state in UI. Common: pool size 1, all slots held by long-running task. Raise pool or split DAG.'},
  {symptom:'Task succeeds but downstream marked "upstream failed"',action:'XCom serialization issue — task returns non-JSON-serializable object. Check task logs. Convert objects to dict before returning.'}
 ]},
 'File upload':{errors:[
  {symptom:'Upload succeeds but RAG re-index never runs',action:'Airflow DAG trigger failed silently. Check `file_upload.last_triggered_dag` audit field. Re-trigger manually: `curl -X POST {airflow}/api/v1/dags/rag_reindex/dagRuns`.'},
  {symptom:'Large file uploads timeout',action:'Kong has 60s body timeout by default. Set `body_timeout: 300` on the file-upload route OR use multipart resumable uploads via tus.io protocol.'}
 ]},
 'NiFi SMB crawler':{errors:[
  {symptom:'Files in SMB share but not pulled',action:'NiFi `GetSmbFile` processor may have hit `KeepSourceFile=false` and moved them. Verify with `ListSmbFile` instead. Check NiFi UI for processor state — most failures are FAILED with auth errors.'},
  {symptom:'Duplicate processing of same file',action:'NiFi state store reset (e.g., on pod restart with ephemeral storage). Use persistent volume for `state.directory` OR shift dedup to SHA256-based logic at the FastAPI ingest layer.'}
 ]},
 'Airbyte':{errors:[
  {symptom:'Sync runs but no records moved',action:'Source connector schema discovery returned empty. Refresh source schema in UI — common after MariaDB column adds. Check connector logs for "Discovery returned 0 streams".'},
  {symptom:'Destination ClickHouse rejects records',action:'Type mapping issue — Airbyte sends BigDecimal where ClickHouse wants Float64. Either configure type override in destination, or use a transformation step (dbt staging model).'}
 ]},
 'Debezium + Redpanda':{errors:[
  {symptom:'Replication lag growing',action:'Consumer (Graphiti) slow or stopped. Check `kafka_consumer_lag` metric per topic. Common: Graphiti pod restart loop. Restart consumer with `--from-beginning` for full catch-up if acceptable.'},
  {symptom:'WAL bloat on Postgres source',action:'Replication slot `debezium_mfg` inactive. If Debezium pod crashed without graceful shutdown, slot accumulates WAL. Drop and recreate: `SELECT pg_drop_replication_slot("debezium_mfg")` then restart connector.'}
 ]},
 'ARMES MES':{errors:[
  {symptom:'MCP tool calls return "tool not found"',action:'MCP server not advertising the tool. Verify `armes-mcp` tool list: `curl http://armes-mcp:3001/jsonrpc -d "{\\"method\\":\\"tools/list\\"}"`. Common: tool added in code but service not restarted.'},
  {symptom:'ARMES queries slow (>5s)',action:'MariaDB connection pool starved or MES system overloaded. Check `mes_query_latency_ms` p95. Move heavy historical queries to ClickHouse mirror via Airbyte sync.'}
 ]},
 'SAP':{errors:[
  {symptom:'RFC connection drops mid-query',action:'SAP gateway timeout. Set `WDISP/HTTP/MAX_REQUEST_LENGTH` higher on SAP side. Also configure connection pooling in MCP server — do not open RFC per request.'},
  {symptom:'Auth fails after 24h of working fine',action:'SAP service user password expired. Use a service user with "Password Never Expires" or rotate via Vault on schedule. Check SAP login audit (SM21) for the failure reason.'}
 ]},
 'SharePoint':{errors:[
  {symptom:'Search returns no results despite documents existing',action:'Graph API search requires indexing. Check `enable-search` site config. Also: service principal needs `Sites.Read.All` application permission, not just `Sites.Read.Selected`.'},
  {symptom:'Document download returns 401',action:'Token expired between search and download. MCP server must refresh OAuth token if older than 50min. Implement token cache with refresh — do not hold token in memory across requests.'}
 ]},
 'Salesforce':{errors:[
  {symptom:'SOQL returns "INVALID_FIELD" for custom field',action:'Custom field API name (`Foo__c`) used but field renamed in SF. Re-fetch object metadata: `GET /services/data/v59.0/sobjects/Opportunity/describe`. Update field references.'},
  {symptom:'Bulk query hits governor limit',action:'SOQL row limit (50k for sync, 2k chunks for async). Switch to Bulk API 2.0 for >50k. Or paginate via `LIMIT` + `OFFSET` (max OFFSET 2000).'}
 ]}
};
```

**Count verification:** exactly **48** top-level keys. AG must verify
`Object.keys(COMPDATA_ERR).length === 48` before proceeding to Step 2.

---

## 5. Step 2 — Merge COMPDATA_ERR into COMPDATA

Identical pattern to S2d.1. Use a one-off Node script
(`scripts/_merge_compdata_err.js`, delete after use):

1. Read v6 SSoT HTML.
2. Extract both `COMPDATA` and `COMPDATA_ERR` via vm-sandbox.
3. For each key in `COMPDATA_ERR`:
   - **Assert** the key exists in `COMPDATA` and **already has** `ops` +
     `sample` (sanity check — components without ops/sample should not be
     getting errors either). If mismatch → stop.
   - Add `errors` array to the COMPDATA entry.
4. Serialise merged `COMPDATA` back to source. JSON.stringify handles all
   string escaping (apostrophes, backslashes, etc.) automatically. The
   `sample.code` backtick preservation from S2d.1 still applies — the
   merge script must preserve those as template literals when re-emitting.
5. Delete the `COMPDATA_ERR` variable declaration from the file.

Report:
- Entries merged (expected 48)
- Any name mismatches (expected 0)
- Any entries that had `errors` already (expected 0)
- Final byte size of merged COMPDATA literal

---

## 6. Step 3 — Helper for cross-link: `openComp`

**str_replace** — insert `openComp` immediately before `_cbDeploy` (which
S2c added before `showEarchDetail`).

**Old** (confirm from live file):
```
function _cbDeploy(d){
```

**New:**
```
function openComp(name){
 for(var i=0;i<COMPS.length;i++){if(COMPS[i][0]===name){showEarchDetail(i);return;}}
 /* name not in COMPS (e.g., RCONN endpoints) — no-op, caller can ignore */
}
function _cbDeploy(d){
```

`openComp` is forgiving by design — if a caller passes a name that does
not exist in COMPS, nothing happens (no error, no console noise). This
makes it safe to wire into ANY name without pre-validation.

---

## 7. Step 4 — Wire onclick into ECONN FROM/TO cells

**str_replace** — the `renderEconnTable` rows.map callback's return line.
Confirm exact text in Step 0e first.

**Old** (current S2b/S2d.1 state, single line returned from the map):
```
  return '<tr class="cdata" onclick="toggleEconn('+i+')"><td class="cfrom">'+r[0]+'</td><td class="carr">→</td><td class="cto">'+r[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+r[2]+'</span></td><td class="cproto">'+r[3]+'</td><td class="cpu">'+r[pu]+'</td><td><span class="cph" style="background:'+p[0]+'22;color:'+p[0]+';border:1px solid '+p[0]+'55">'+p[lang==='en'?1:2]+'</span></td></tr>'
```

**New** — wrap `r[0]` and `r[1]` in `<span class="cli">` with onclick that
calls `openComp` and `event.stopPropagation()` to prevent the row's
toggle:
```
  return '<tr class="cdata" onclick="toggleEconn('+i+')"><td class="cfrom"><span class="cli" onclick="event.stopPropagation();openComp(\''+r[0]+'\')">'+r[0]+'</span></td><td class="carr">→</td><td class="cto"><span class="cli" onclick="event.stopPropagation();openComp(\''+r[1]+'\')">'+r[1]+'</span></td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+r[2]+'</span></td><td class="cproto">'+r[3]+'</td><td class="cpu">'+r[pu]+'</td><td><span class="cph" style="background:'+p[0]+'22;color:'+p[0]+';border:1px solid '+p[0]+'55">'+p[lang==='en'?1:2]+'</span></td></tr>'
```

**Safety note:** every COMPS name has been verified to contain no
single-quote or double-quote characters. The string interpolation
`openComp(\''+r[0]+'\')` is therefore safe. If a future component name
adds an apostrophe, this becomes brittle — add a `.replace(/'/g,"\\'")` at
that point.

`renderRconnTable` is **not** modified. RCONN endpoints (`Agent base
class`, etc.) are not in COMPS. Adding `openComp` to them would no-op
silently, but the dotted-underline visual cue would mislead developers
into expecting navigation that does not happen. Better to leave Rev
endpoints plain until the Rev cookbook exists.

---

## 8. Step 5 — CSS additions

**str_replace** — append before `</style>`. Anchor on the last S2d.1 CSS
line:

**Old:**
```
.cb-ops td:last-child{font-family:var(--mono);font-size:11px;color:var(--text2);line-height:1.5;word-break:break-word}
</style>
```

**New:**
```
.cb-ops td:last-child{font-family:var(--mono);font-size:11px;color:var(--text2);line-height:1.5;word-break:break-word}
/* === cookbook: failure modes === */
.cb-err{margin-top:2px}
.cb-err-item{background:var(--bg3);border-left:3px solid var(--red);border-radius:0 6px 6px 0;padding:9px 12px;margin-bottom:6px;font-size:11.5px;line-height:1.5}
.cb-err-sym{color:var(--red);font-weight:600;margin-bottom:3px}
.cb-err-act{color:var(--text2)}
/* === clickable endpoint name in connectivity table === */
.cli{cursor:pointer;border-bottom:1px dotted var(--text3);transition:color .12s,border-color .12s}
.cli:hover{color:var(--blue);border-bottom-color:var(--blue)}
</style>
```

---

## 9. Step 6 — Render `errors[]` in `showEarchDetail`

Add one helper before `_cbDeploy` (alongside `openComp` from Step 3):

```javascript
function _cbErrors(arr){
 if(!arr||!arr.length)return '';
 var esc=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};
 var items=arr.map(function(e){return '<div class="cb-err-item"><div class="cb-err-sym">'+esc(e.symptom)+'</div><div class="cb-err-act">'+esc(e.action)+'</div></div>';}).join('');
 return '<div class="cb-sect">Failure modes</div><div class="cb-err">'+items+'</div>';
}
```

**HTML escaping is critical.** Many `action` strings contain `>` and `<`
characters (e.g., `>500ms`, `<1d`). Without escaping, the HTML parser
will interpret these as malformed tags. Smoke test asserts this.

**str_replace** — insert the `_cbErrors` call between `_cbOps(cd.ops)`
and the inbound section in `showEarchDetail`. Confirm S2d.1 left this
exact fragment:

**Old:**
```
  +_cbSample(cd.sample)
  +_cbOps(cd.ops)
  +(inbound.length?'<div class="cb-sect">Inbound connections ('+inbound.length+')</div>'+inbound.map(function(r){return _dpRow(r,'in');}).join(''):'')
```

**New:**
```
  +_cbSample(cd.sample)
  +_cbOps(cd.ops)
  +_cbErrors(cd.errors)
  +(inbound.length?'<div class="cb-sect">Inbound connections ('+inbound.length+')</div>'+inbound.map(function(r){return _dpRow(r,'in');}).join(''):'')
```

---

## 10. Acceptance criteria

**Structural (grep on edited file):**
- [ ] `COMPDATA_ERR` does not appear anywhere (staging var removed)
- [ ] Exactly 48 COMPDATA entries have an `errors` field
- [ ] The same 48 entries that have `ops`+`sample` are the ones with `errors` (set equality)
- [ ] CSS contains `.cb-err`, `.cb-err-item`, `.cb-err-sym`, `.cb-err-act`, `.cli`
- [ ] `openComp` and `_cbErrors` both defined before `_cbDeploy`
- [ ] `renderEconnTable` callback contains `openComp` calls (two: one for r[0], one for r[1])
- [ ] `renderRconnTable` is unchanged (no `openComp` references)
- [ ] All S2/S2b/S2c/S2d.1 symbols still present (regression check)
- [ ] No literal `</script>` in any string — verified via grep

**Functional — Node.js smoke test (`smoke-s2d2.js`):**

```javascript
const fs=require('fs');
const html=fs.readFileSync('path/to/SSoT.html','utf8');
if(html.includes('COMPDATA_ERR')) throw new Error('staging var not cleaned up');

// Hard regression: no literal </script> anywhere in the script block
const scriptOpen=html.indexOf('<script>');
const scriptClose=html.lastIndexOf('</script>');
const scriptBody=html.substring(scriptOpen+8, scriptClose);
const badIdx=scriptBody.indexOf('</script>');
if(badIdx>=0) throw new Error('Literal </script> at script-body offset '+badIdx+' — Pattern #16 violation');

const m=html.match(/<script>([\s\S]*?)<\/script>/);
const els={};
global.document={
 getElementById:id=>{if(!els[id])els[id]={innerHTML:'',value:'',textContent:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}},querySelectorAll:()=>[]};return els[id];},
 querySelectorAll:()=>[],documentElement:{lang:''},addEventListener:()=>{}
};
eval(m[1]);

// errors coverage
const withErrors=Object.keys(COMPDATA).filter(k=>COMPDATA[k].errors);
const withOps=Object.keys(COMPDATA).filter(k=>COMPDATA[k].ops);
if(withErrors.length!==48) throw new Error('expected 48 errors, got '+withErrors.length);
const errSet=new Set(withErrors), opsSet=new Set(withOps);
const diff=[...errSet].filter(x=>!opsSet.has(x)).concat([...opsSet].filter(x=>!errSet.has(x)));
if(diff.length) throw new Error('errors/ops coverage misaligned: '+diff.join(', '));

// errors array schema
withErrors.forEach(k=>{
 const arr=COMPDATA[k].errors;
 if(!Array.isArray(arr)||arr.length<2) throw new Error(k+' errors malformed (need ≥2)');
 arr.forEach((e,i)=>{
  if(!e.symptom||!e.action) throw new Error(k+' error['+i+'] missing symptom or action');
 });
});

// openComp behaviour
if(typeof openComp!=='function') throw new Error('openComp missing');
openComp('NoSuchComponent'); // must not throw
const before=document.getElementById('dpanel').innerHTML;
openComp('Channel gateway'); // must render
const after=document.getElementById('dpanel').innerHTML;
if(after===before||!after.includes('Channel gateway')) throw new Error('openComp did not navigate');
if(!after.includes('cb-err')) throw new Error('Channel gateway panel missing failure modes section');

// HTML-escaping check — LlamaIndex error mentions ">500ms"
const lIdx=COMPS.findIndex(c=>c[0]==='LlamaIndex');
showEarchDetail(lIdx);
const lOut=document.getElementById('dpanel').innerHTML;
if(lOut.includes('>500ms')&&!lOut.includes('&gt;500ms')) throw new Error('errors not HTML-escaped — ">" leaked');

// External component negative check
const wIdx=COMPS.findIndex(c=>c[0]==='WhatsApp');
showEarchDetail(wIdx);
const wOut=document.getElementById('dpanel').innerHTML;
if(wOut.includes('cb-err')) throw new Error('WhatsApp should not have errors section');

// Regression: S2/S2b/S2c/S2d.1 symbols
['_dpRow','_dpSec','closeDetail','DL','toggleEconn','toggleRconn',
 '_cbDeploy','_cbConfig','_cbSample','_cbOps','OWNER_COLOR'].forEach(s=>{
  if(typeof eval(s)==='undefined') throw new Error('regression: '+s+' missing');
});

console.log('SMOKE PASS · 48 components with errors · escaping ✅ · openComp ✅ · no </script> leak ✅');
```

---

## 11. PR and merge gate

PR title: `S2d.2: errors field for 48 components + ECONN cross-linking`

PR body must include:
- Step 0 findings (S2d.1 symbols present, naming conflicts = 0, coverage of ops/sample = 48)
- Pattern #16 grep result (zero literal `</script>` in COMPDATA_ERR block)
- Step 2 merge report (48 entries merged, 0 mismatches, COMPDATA_ERR removed)
- Step 4 confirmation (renderEconnTable now has `openComp` calls; renderRconnTable untouched)
- Smoke test output (`SMOKE PASS · 48 components ...`)
- Structural acceptance items (all checked)

**AG stops after opening the PR.** Operator runs §12. AG merges on signal.

---

## 12. Operator manual verification (standalone browser, pre-merge)

### 12.1 Failure modes section (8 components)

1. **Channel gateway** → panel shows Failure modes section between Operations
   and Inbound. Two items, red left-border, symptom in red, action in
   muted text. First entry symptom: "Webhook returns 502 to Meta".
2. **LangGraph** → **three** failure mode entries (LangGraph is the
   exception with 3, all others have 2).
3. **PostgreSQL** → Failure modes shows ">100 concurrent" rendered as
   text, not as a broken HTML tag.
4. **LlamaIndex** → second entry symptom contains ">500ms" rendered as
   text (HTML-escape working).
5. **SAP** → MCP-specific failure modes (RFC drop, password expiry).
6. **MinIO** → tenant-isolation failure mode visible.
7. **WhatsApp** → **no** Failure modes section (external, expected).
8. **Vault** (L9 infra) → **no** Failure modes section (managed infra, expected).

### 12.2 Cross-linking (ECONN tab)

9. Open EAIP Conn tab → hover over a FROM name (e.g., `Channel gateway`
   in the WhatsApp row) → dotted underline, cursor becomes pointer.
10. Click the FROM name → component panel opens for Channel gateway,
    showing the FULL cookbook (sub, owner, desc, deploy, config, sample,
    ops, **errors**, connections, notes, repo).
11. Click the row body (outside any name) → inline detail row toggles
    open as before (S2b behaviour, no regression).
12. Click the same name again from a different row (e.g., LangGraph as
    FROM in any row) → that component's panel opens. Close (×). All
    other UI clean.
13. Click a name that maps to an EXTERNAL component (e.g., WhatsApp as
    FROM) → its panel opens with S2c content only (no sample/ops/errors).
    Confirms negative case still works.

### 12.3 Rev Conn tab — no cross-linking expected

14. Open Rev Conn tab → click any row → S2b inline detail expands as
    before. FROM and TO names are **plain text** (no dotted underline,
    no cursor change). This is deliberate — Rev endpoints (`Agent base
    class`, etc.) are not in COMPS, so cross-linking is deferred.

### 12.4 Regressions

15. EN/TR toggle still works; Failure modes section content stays EN
    (TR deferred). No console errors.
16. Escape key closes both panel (S2/S2c) and inline detail rows (S2b).

---

## 13. Lessons.md

```
## S2d.2 — errors field for 48 components + ECONN cross-linking
### AG delivery summary
Model: [model] · Lines changed: +[N] · PR: [#N] · Merge SHA: [sha]
Step 0: S2d.1 symbols ✅ · conflicts 0 · ops/sample at 48 · errors at 0 (pre-state) · Pattern #16 grep: clean
Step 1: COMPDATA_ERR staged with 48 entries
Step 2: merge complete · 48 entries updated · 0 mismatches · 0 prior errors · COMPDATA_ERR removed ✅
Step 4: renderEconnTable now has openComp calls (2) · renderRconnTable unchanged ✅
Smoke: errors coverage 48 ✅ · set-equality with ops ✅ · HTML-escape ✅ · openComp ✅ · no </script> leak ✅ · regressions clean ✅
Spot-checks: Channel gateway 2 errors ✅ · LangGraph 3 errors ✅ · LlamaIndex ">500ms" escaped ✅ · WhatsApp no errors ✅ · cross-link navigates ✅
### Operator review
[Maymun fills in 16-point check outcome]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 14. What S2d.2 does NOT touch

- S2's chrome (`dpanel`, `dpoverlay`, `_dpRow`, `_dpSec`, `closeDetail`,
  `DL`) — preserved
- S2b's inline row machinery (`toggleEconn`, `toggleRconn`, `_ecdRow`,
  `_rcdRow`, `.cdr`, `.cdata`, `.ctr-active`) — preserved; cross-linking
  is wired at the data-row cell level, not inside the inline detail
- S2c's existing helpers + CSS — preserved
- S2d.1's existing helpers + CSS (`_cbSample`, `_cbOps`, `cb-sample`,
  `cb-ops`) — preserved
- **`renderRconnTable`** — entirely unchanged. RCONN cross-linking is
  deferred to the future Rev cookbook stage where Rev endpoints get their
  own data and panel
- The 19 external/managed components in COMPDATA — never mutated; their
  panels continue to show S2c content only
- `showRarchDetail` — unchanged; Rev panel deferred
- COMPS, ECONN, RCONN, RSYS, CTYPES, RCTYPES, EPH, RGROUPS, EPLAN,
  RPLAN, LAYERS, T, EROLE, OWNER_COLOR — read only
- TR translations of `errors` — deferred to a future translation pass
- Progress tracker / dev notes — deferred to S2e (post-Phase-0)
- App repo (`maymun207/TheBluePrint23`) — Phase 2 (S6–S7)

---

## 15. Author's note on what changes after this lands

After S2d.2 merges, the EAIP component cookbook is **feature-complete**
for what the team needs in Phase 1:

- All 67 components carry restored v5 richness (S2c)
- 48 internal components carry full operational depth (S2d.1 + S2d.2)
- ECONN cross-linking turns the connectivity table into a navigable graph

The migration plan can now resume its original path:
- **S3–S5** (content corrections) — already authored, ready to run
- **S6–S7** (migration: flip TheBluePrint23 tabs to render the SSoT) —
  the document the tabs render is now the cookbook itself

The next chapter of the program is **S2e** (progress tracker — Supabase
overlay), but that is scheduled for late M0 / early M1 once Phase 1 is
ready to consume real implementation status. Until then, the cookbook is
a static reference: complete, navigable, English, and ready for developers
to read.

The author note from S2d.1 still applies: the operational specifications
in `ops`, `sample`, and `errors` describe **design intent**. Drift between
this cookbook and actual deployments in Phase 1 is expected and healthy —
the S2e tracker exists to capture that drift through developer notes.
