<!-- relay-audit: v1 kind=card -->
CARD-LANE-RESILIENCE-S166-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). Sent to AG-4 only AFTER scout-2's pre-review is GREEN (ORDER-SCOUT-PREREVIEW-LANE-RESILIENCE-S166-1).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:10Z
PRECONDITION: master = the head you read with `git ls-remote origin refs/heads/master` (fb28343ea332e98aa588bf73acc0762c84e1d9dc or a descendant after PRs 650/651/652). scripts/mail-wait.mjs at that head returns EXIT_READ_FAILED on the FIRST failed read in three places (measured by the Architect at fb28343ea332e98aa588bf73acc0762c84e1d9dc): read-path establishment (catch at ~L1545–1549), the poll (catch at ~L1668–1671), the page read (catch at ~L1740–1746).
ON-DISAGREEMENT: if those three catch blocks are not where/what this card says, STOP and quote the lines you read.
WHY: register 170 / F-S165-MAC-OFFLINE-LANES-DROP: the Mac lost network twice on 2026-09-30 (~7 h); every window's mail-wait exited 4 on the first failed read and left the loop, and each window needed a human re-boot. A network blip must not cost a window. Register 178 / LANE-NO-WAIT-1 Z3: `gh pr close` is ordered by cards and is not on the allow-list, so a window waits silently for a human click.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ), CWF-S166-PLAN-v2 items 1d and Z3 · §13.5 · PLATINUM. ADVERSARY: NEW subject → scout-2 pre-review first (§12.1).
NO CRON TASK. GRAFT: graft first (graft/scripts/mail-wait.md, graft/.graph/wiring.json). SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — no data or architecture change reaches the admin UI; say so in the report.

## WORK (push-first: branch + first commit + push + PR within 10 minutes; proofs after, CI is the certificate)
R1. TRANSIENT RETRY IN mail-wait. Add one exported helper (e.g. `retryTransient(fn, { deadline, sleep, log, label })`) and use it at the three catch sites:
  - TRANSIENT = transport-level failure: ECONNRESET, ECONNREFUSED, ETIMEDOUT, ENOTFOUND, EAI_AGAIN, EPIPE, "socket hang up", "fetch failed", proxy refusal, HTTP 407/408/429/500/502/503/504. Anything else (401/403, SQL error, parse error, digest mismatch, card refusal) is NOT transient and keeps today's behaviour exactly (exit at once).
  - On a transient failure: print `[mail-wait] [READ-FAILED] <label> TRANSIENT (<reason>) — retry <k> in <s>s` and retry with backoff 15 s, 30 s, 60 s, then every 120 s, until the run's deadline.
  - Every failed read is PRINTED (empty ≠ zero): a failed poll is never counted as "no mail". If the deadline passes with only failed reads since the last good read, exit EXIT_READ_FAILED (4) with `[READ-FAILED] <n> transient failures, last: <reason>` — NEVER EXIT_NO_MAIL (3).
  - The first successful read after failures prints `[mail-wait] read path RESTORED after <n> failures (<seconds> s)`.
R2. ALLOW-LIST: add `Bash(gh pr close:*)` to `.claude/settings.json` permissions.allow (next to `gh pr create`). Nothing else changes in that file.
R3. TEST: new `api/cwf/__tests__/mailWaitTransient.test.ts` on the helper with an injected sleep (no real waiting): (a) two transient throws then success → returns the value, prints 2 retries + RESTORED; (b) a 403 → rejects at once, no retry; (c) transient until deadline → rejects as READ-FAILED, never resolves as "no mail"; (d) classification table: each listed code/status → transient true/false.
FENCE: scripts/mail-wait.mjs · api/cwf/__tests__/mailWaitTransient.test.ts · .claude/settings.json · docs/relay/LANE-RESILIENCE-S166-1-AG4-report.md · public/architecture/manifest.json (only if `npm run reseal` is required).

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-lr -b phase/lane-resilience-s166-1 <master sha>`.
2. Implement R1–R3. `npx vitest run api/cwf/__tests__/mailWaitTransient.test.ts` and the existing `api/cwf/__tests__/mailWait*.test.ts` ONCE each (proof budget, register 173; no full-suite repeats).
3. Report (one `FILE-FENCE:` line + the paths above), ONE commit (`git commit -F <file>`), `git push origin phase/lane-resilience-s166-1`, `gh pr create --base master` — print PR number + head 40-hex.
4. Slip SLIP-CARD-LANE-RESILIENCE-S166-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-CARD-LANE-RESILIENCE-S166-1.md"). Remove your worktree (`git worktree remove`, `git worktree prune`). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: first push ≤ 10 min after taking the card; whole card ≤ 30 min. A permission you cannot pass → write it in the slip and stop — never wait silently.
FORBIDDEN: --force; any path outside the fence; changing exit-code numbers or their meaning; merging; migration; cron; printing an environment value.

END · CARD-LANE-RESILIENCE-S166-1
