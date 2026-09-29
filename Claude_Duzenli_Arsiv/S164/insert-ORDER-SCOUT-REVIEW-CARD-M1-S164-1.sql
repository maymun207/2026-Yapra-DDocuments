with b as (select $b$<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-M1-S164-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-29T13:50Z
AUTHORITY: OWNER-APPROVAL-S163-MEMORY-PLAN-1 (Track 1, M1) · OWNER-APPROVAL-S164-PLAN-1 item 2 · §12.1 (NEW subject → adversary review).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v1 before it goes to AG-1. Card body: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v1.md" (also project box docs/). Print its md5 first. Base: origin/master 6a3824c2b5efd1764be178d05ba647feec06927c or later — print which; read every file:line from `git archive origin/master`, not the shared clone.

## REVIEW — measure each premise, do not argue it
1. W1: quote mcpClient.ts executeMCPTool's return path and confirm `result.isError` is never read. Check the installed SDK's CallToolResult type (node_modules/@modelcontextprotocol/sdk — the INSTALLED source, not docs): is `isError` top-level and boolean? Quote the line.
2. W2: quote ClassifyInput.transportError and the ONE call site of classifyToolResult in stageTools.ts; confirm no other production caller passes transportError (git grep across api/). §12.6: is there ANY existing path that already carries the MCP verdict (a span attribute, formatToolResult, parseToolResultMeta, observeResult's cut facts)? If one exists, the card must WIRE it, not add D1.
3. D1 vs the rejected sibling: count the production callers and the test mocks of executeMCPTool at master (exact list). Is changing the return type the smaller, safer change, or does the mock count argue for the sibling? Rule on it with the numbers.
4. D2: the refusal arms (:1623-1639) are set `isError: false` — is that right, given callWasSent already guards classification at :1719? Would `isError: false` there ever be READ? Name any reader.
5. The repair path (:1671): if the FIRST call is isError and the repaired call succeeds, the card says the repaired outcome supersedes. Quote what recordToolRepair / the ledger record about the first failure today, so the count semantics (calls, failures, repairs) are stated, not assumed.
6. Downstream truth: from the classification, trace toolError → recordToolOutcome → telemetry payload.ok → recordToolSuccess (tool_experience) → answerUnbackedDespiteFailures → chip. Quote each hop's file:line at master and say whether any hop reads resultText instead of the classification (a hop that re-parses text would NOT follow).
7. What the card misses: files not in its fence (spanIOCompleteness expectations, stageClarify's closure at :1601 region if it wraps executeMCPTool at runtime, the exam scorers, the digest lift of isError), the E1-a honesty metric interaction, and any NO-HARDCODE trap.

## REPLY
scout_reply as SCOUT-STATUS-REVIEW-CARD-M1-S164-1, first line `REVIEW-VERDICT: GREEN|RED card=CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v1 md5=<md5>`, numbered findings each with a paste-ready delta. Over 8192 chars: bus row = verdict line + sha256; full text ALWAYS to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/SCOUT-STATUS-REVIEW-CARD-M1-S164-1.md". Then back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-CARD-M1-S164-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout-2','ORDER-SCOUT-REVIEW-CARD-M1-S164-1', b.t from b where md5(b.t)='45f6cc14fd222aa23cc1309a0b9aac9f' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='32e6162080cf7b20b4cc7140aaf779550ac5211a9d1f1352589a2a6fbdd5f185'
returning id, artifact_name, created_at;
