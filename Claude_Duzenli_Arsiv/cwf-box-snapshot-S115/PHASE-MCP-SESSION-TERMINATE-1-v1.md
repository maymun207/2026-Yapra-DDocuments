# PHASE-MCP-SESSION-TERMINATE-1 · v1 · lane AG-1

PRECONDITION (S47-1): fresh clone; `git rev-parse origin/master` == `8f8dd2a9345f6a61c3ac9b9dba41c62543cf99f1`. If not: STOP and report.

## Diagnosis (measured, byte-pinned)
All 7 `connectMcp` call-sites close in `finally` — but SDK 1.29.0 `Client.close()` → `StreamableHTTPClientTransport.close()` only does `this._abortController?.abort()` (local). Server-side MCP session termination is a SEPARATE method, `terminateSession()` (HTTP DELETE + `Mcp-Session-Id`), which our codebase calls ZERO times (grep verified). Result: every streamable-HTTP contact (health cron ~4 connects/backend/30min AND turn tool calls) leaves an orphaned session on ARMES; their pool exhausts. Supplier complaint confirmed as OUR defect.

## Build
1. In `api/cwf/_lib/turn/mcpClient.ts`:
   - `connectMcp` must retain the transport reference per client (a `WeakMap<Client, Transport>` or return shape change confined to this module — pick the smaller diff; call-site signatures must NOT change).
   - New export `closeMcp(client: Client, label: string): Promise<void>`:
     a. If transport is `StreamableHTTPClientTransport`: `await terminateSession()` first. HTTP 405 = server doesn't support explicit termination = valid per spec (SDK already treats it so) — record as `session_terminate=unsupported`, not failure.
     b. Then `await client.close()`.
     c. FULL-TRACE: one `console.log('[McpClose]', { label, transport, session_terminated, close_ok, error_head? })` line on EVERY outcome including failures — the swallowed-catch blindness (attempted ≠ confirmed) closes here too. No secrets, no URLs with credentials.
     d. `closeMcp` itself never throws.
2. Replace `client.close()` with `closeMcp(client, label)` at ALL 7 call-sites: `mcpCatalogFetch.ts:37`, `gatewayEnumerate.ts:170`, `entityDiscoverySync.ts:1036`, `toolBehaviorCensus.ts:394`, `mcpDiscovery.ts:176`, `mcpClient.ts` executeMCPTool paths (:185, :196), `admin/mcp-probe.ts` close site. The failed-connect close inside `connectMcp` itself (:70) may stay raw `client.close()` — no session exists pre-connect.
3. Tests (vitest, under existing `__tests__` dirs — NOT `scripts/**`): (a) streamable-HTTP path calls terminateSession before close; (b) 405 from DELETE → success outcome `unsupported`; (c) terminateSession throw → close still called, `[McpClose]` records error_head; (d) SSE path skips terminateSession.

## Gates
- G1: `npm run test` green; new tests present and asserting order (terminate BEFORE close).
- G2: grep proof in report: `terminateSession` now appears in exactly ONE production module (`mcpClient.ts`); zero raw `client.close()` at the 7 listed sites.
- G3 (birth proof, S93-1 — post-merge, named here per S63-1): after deploy, one health tick against ARMES; Vercel logs show `[McpClose] ... session_terminated=true|unsupported` for ARMES label. Owner relays ARMES-side pool observation (human-eye witnessing).

## Delivery (S91 completeness)
Branch `phase/mcp-session-terminate-1` · push · report `docs/relay/PHASE-MCP-SESSION-TERMINATE-1-report.md` (grep proofs + test names + `$?` read WITHOUT pipe) · open PR. DO NOT MERGE — named consent `ONAY-MCP-SESSION-TERMINATE-1-MERGE` required separately.

TAIL ANCHOR (S61-3): report must end with the line `PHASE-MCP-SESSION-TERMINATE-1 COMPLETE · <branch-head-sha>`.
