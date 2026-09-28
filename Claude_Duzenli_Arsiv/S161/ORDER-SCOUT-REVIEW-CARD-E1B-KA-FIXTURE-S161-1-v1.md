<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1

LANE: scout (whichever scout window is FREE first; one order per window; the boot text names this id)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T00:47Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7).
NO POLL OR CRON TASK. FORBIDDEN: any repo edit, commit or push; printing any environment value; any DB write; leaving the sandbox except for gh reads, named as unsandboxed.
PRECONDITION: master is c58438b59cff4d1d403634b28e44af9b01db6dea (verify with gh api, print the 40-hex).

TASK: adversary review of CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v1 (NEW subject, 12.1), read from the doc repo: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v1.md" (md5 in the boot text). MEASURE; print MEASURED/READ/UNMEASURED with the command per item:
1. Which transport(s) does turn/mcpClient.ts connectMcp speak (quote)? Can the official SDK's server package serve that transport in-process on localhost (is @modelcontextprotocol/sdk's server entry in node_modules; quote the import path)?
2. Where is an MCP server REGISTERED — table name (not mcp_servers), the admin handler, the UI tab — and can that handler run in-process against a repository double? Quote.
3. Does syncBackendCatalog → autoDeriveRouteDrafts require a published rule store or a service client that a vitest cannot provide? Name what the test must double.
4. Does any fixture MCP server or in-process MCP double already exist (grep McpServer, Server from the sdk, 'tools/list' under api/ scripts/ e2e/)? If yes, the card becomes wiring.
5. Is there an existing routing-exam entry the card should reuse instead of calling filterToolsByMessage directly (routerAbLens.selectRouterAbSpecimens? routingSlice? stageTools' entry)? Quote.
6. Nightly Compatibility job: can a step run vitest for one file without secrets? quote the job's env/secrets lines.
7. Anything that touches the LIVE routing path (S102-YASA-3) — must be none.
VERDICT: GREEN / RED with the complete delta. Status: SCOUT-STATUS-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1 via laneSlip; if refused, write it to the S161 folder as a .md and print its sha256 (register 109). Stop.

END · ORDER-SCOUT-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1
