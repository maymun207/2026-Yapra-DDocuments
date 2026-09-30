<!-- relay-audit: v1 kind=card -->
CARD-SESSION-TOKEN-S167-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). First line of every message: `[AG-4]`. Built from your SLIP-ORDER-MAP-SESSION-TOKEN-S167-1 and its DRAFT (20:54Z) — your map, your design, carried with credit.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:00Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 at 20:55Z, or later if PR 655 has landed). AG-4's map (MEASURED at that master): every window at one address shares ONE identity — the address nonce (factoryState.mjs:161); boot laneBoot.mjs:280; heartbeat factoryState.mjs:543; stamp mail-wait.mjs:1228; slip laneSlip.mjs:185. The harness sets CLAUDE_CODE_SESSION_ID per window, every bash call inherits it, and it ROTATES on /clear.
ON-DISAGREEMENT: if any of those lines is not what you read, print what is and stop.
WHY: register 183 + two S167 findings. (1) Two windows at one address are invisible from outside (S166: "2 AG3 şeridi var", GitHub and the bus each showed ONE). (2) F-S167-CLEAR-LEAVES-OLD-WAITER-1 (AG-4, 20:54Z): after /clear the previous session's background `mail-wait` KEEPS RUNNING — AG-4's window had two AG-4 waiters and both saw the same card. (3) F-S167-BACKGROUND-WAIT-NO-WAKE-1: scout-2's background waiter did not wake its idle window for a 20:29Z order. Plain words: a tab can hold a ghost listener from before /clear that grabs work meant for the live session, and nobody can see it.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 4, register 183) · §12.1 NEW subject → scout pre-review before this card is sent.
```evidence:adversary
ADVERSARY: PENDING
why: scout pre-review under ORDER-SCOUT-PREREVIEW-SESSION-TOKEN-S167-1; the card is sent only as v2 carrying the verdict.
```
NO CRON TASK. GRAFT: graft first; the slip carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable — the session id is hashed, never printed.
UI/UX (§13.3): no CWF product screen shows lane state (AG-4 measured: factory_state has 0 hits in src/); the surface is `npm run architect:open`. Say so in the report.

## WORK (push-first)
W1. `scripts/windowToken.mjs`: token = first 12 hex of sha256(CLAUDE_CODE_SESSION_ID); unset → `UNMEASURED (<reason>)`, never a default.
W2. laneSlip / postSlip adds ONE `window: <token>` line to every slip body; the boot slip and the claim nonce message carry it too. No migration.
W3. SINGLE WAITER PER ADDRESS PER MACHINE: mail-wait records `<address> <pid> <token>` in a per-address lock file under the OS temp dir (NOT the shared clone) at start; if a live pid for the same address with a DIFFERENT token is found, it prints `[mail-wait] STALE-WAITER <address> pid=<pid> window=<old token> — replaced by window=<new token>`, terminates that pid, and continues; same token → prints `DUPLICATE-WAITER` and exits without taking. A dead pid is overwritten silently.
W4. mail-wait: a FW004 refusal on `--take` of a row it read unstamped posts SLIP-DOUBLE-TAKE-<address> once (carries both tokens where known).
W5. `architect:open`: DUPLICATE-WINDOW line = more than one distinct `window:` token per address among from_lane rows in the last 30 min; one token → silent.
TESTS: token is 12 hex; unset → UNMEASURED; checkSlip accepts the `window:` line; plant two AG-3 tokens in 30 min → flag, one → silent; W3 with a fake live pid + different token → STALE-WAITER + kill called; same token → DUPLICATE-WAITER exit; FW004 posts once.
FENCE: scripts/windowToken.mjs · scripts/laneSlip.mjs · scripts/mail-wait.mjs · scripts/laneBoot.mjs · the architect:open script (name it) · their tests · docs/relay/SESSION-TOKEN-S167-1-AG4-report.md. No migration; no .claude/ file.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-st -b phase/session-token-s167-1 <master sha>`.
2. W1–W5 + tests; first commit + push + `gh pr create --base master` within 10 minutes; proofs after (each new test file ONCE + existing mailWait*/laneSlip* tests ONCE; typecheck:api ONCE).
3. Report, commit (`git commit -F <file>`), push. Slip SLIP-CARD-SESSION-TOKEN-S167-1 (bus; `[AG-4]`, `window:` line, `GRAFT:` line). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 60 min. A permission you cannot pass → slip it and stop.
FORBIDDEN: printing CLAUDE_CODE_SESSION_ID or any env value; --force; paths outside the fence; merging; migration; cron.

END · CARD-SESSION-TOKEN-S167-1
