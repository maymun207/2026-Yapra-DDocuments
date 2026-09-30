<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR641-S164-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T03:52Z
WHY: M1 (register 140, Track 1) is on PR 641, branch phase/m1-mcp-iserror-passthrough-s164-1, head dbfd228a983c19c5064b9ee01b61ece9ff0f8695, ONE commit whose parent is master 1b2553c960317ab0cc0718e51dda8b7bc92bc112 (AG-1, CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v2). The card is scout-2-reviewed (SCOUT-STATUS-REVIEW-CARD-M1-S164-1, RED, thirteen deltas Δ1–Δ13 all applied in v2). Architect's read at 2026-09-30T03:5xZ by full head: Auto-merge landing · report-schema · Relay corpus · Build and Test — all completed success (four runs). The PR is non-draft and blocked only on adversary/scout.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 item 2 · OWNER-APPROVAL-S163-MEMORY-PLAN-1 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 641, phase/m1-mcp-iserror-passthrough-s164-1, dbfd228a983c19c5064b9ee01b61ece9ff0f8695. Master read twice by ls-remote = 1b2553c960317ab0cc0718e51dda8b7bc92bc112.
2. SHAPE: one commit, parent = master; `git diff --stat 1b2553c960317ab0cc0718e51dda8b7bc92bc112 dbfd228a983c19c5064b9ee01b61ece9ff0f8695` printed.
3. CONTENT vs the card v2 (read it in S164/ and scout-2's M1 review): (a) ONE execute function returning `{ text, isError }` — no sibling; `result.isError === true` spelled as the card says; (b) the four not-sent arms stay TEXT, no manufactured isError for a not-sent call; (c) repair path still text-gated; (d) `modelFacingRefusal` carries `toolMessage` ONLY for reason tool-reported, recognised rejection sentences unchanged (D3); (e) the attempt span `{ok, isError, ms, resultBytes}` with the ok/isError comment; (f) all 25 mock files use okOutcome/errOutcome — the two zero-hit greps of D4 re-run and printed; (g) toolResultClassWiring's transport case now tool-reported AND the okOutcome sibling still reads transport; (h) F1–F6 tests exist and pass locally — re-run them; (i) NOT touched: toolOutcomes.ts, examScorers.ts, fixtureMcpServer.ts, entityDiscoverySync.ts, gatewayEnumerate.ts; (j) no backend/tool/sentence literal in non-test source (F5 diff).
4. CI at dbfd228a983c19c5064b9ee01b61ece9ff0f8695, zero read twice: name EVERY Build and Test step's conclusion (incl. Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted and GREEN; no FORCE-PUSH on the 641 timeline.
5. Clean → post adversary/scout success on dbfd228a983c19c5064b9ee01b61ece9ff0f8695; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — read its STATE and DESCRIPTION (a success whose description says cancelled is not a deploy).
6. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-PR641-S164-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=641 head=dbfd228a983c19c5064b9ee01b61ece9ff0f8695 · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/SCOUT-STATUS-LAND-PR641-S164-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR641-S164-1
