# CWF-SESSION-GRAPH-KB-v152

Appends to CWF-SESSION-GRAPH-KB-v151 (read it for S151 and earlier edges). Edges learned in S152, each tagged [S152].

- [S152] owner-paste → lane-wake. A Claude Code tab reads relay_inbox only inside a running turn; with no poller (OWNER-RULING-S143) the owner's paste is the only wake. The landing path therefore depends on the owner being present.
- [S152] scout adversary status → master. Every landing needs `adversary/scout` at the PR head; the scout tab acts only when woken. Scout idle time is landing latency.
- [S152] Claude Code Stop hook (command, asyncRewake:true) → model wake on exit 2; stderr (or stdout if stderr empty) becomes the model's input under the fixed prefix `Stop hook blocking error from command "...":`; timeout is SECONDS; backgrounded in AntiGravity because the extension runs the CLI with --input-format stream-json (scout-2, 2.1.128 binary).
- [S152] Claude Code 2.1.128 (AntiGravity) sets NO CLAUDE_CODE_SESSION_ID for children; 2.1.241 (VS Code) does. transcript_path stem = session_id inside a hook. /clear opens a new session id and a new .jsonl; boot text is not the first user record (caveat and /clear records precede it).
- [S152] scripts/mail-wait.mjs refuses --since when the lane has a claim-row watermark; watermark mode reads the retired delivery-receipt stamp; its created_at predicate is inclusive. It cannot serve a hook without a new named mode.
- [S152] relay_inbox.created_at = default now() (transaction start); (lane_addr, created_at) is not unique; ordering needs (created_at, id).
- [S152] turn_trace_digest.stages ← digestBuilder.buildDigestStages: 20 spans per stage kept, the rest dropped silently (:160-166); db reads carry a kept/total stamp, spans do not. Client type src/lib/adminService.ts:595-601 mirrors the bucket; TurnDigestSection.tsx renders it.
- [S152] OWNER-APPROVAL-S152-LANDINGS-1 → landings. A named list of PRs/cards; each lands on scout GREEN + CI GREEN without a new question. Reconciles §5 S102 (named spend) with S144 (one approval).
- [S152] Vercel production last READY #588 (20c1651c…); production deployments for master commits after it are CANCELED — whether #590 produces a READY build is measured only when it lands.
- [S152] scout bus-write path is intermittent: two statuses posted at 20:51Z/20:54Z, the third refused (no nonce; execute_sql GM-1) at ~21:09Z. Joins item 17.

END · CWF-SESSION-GRAPH-KB-v152
