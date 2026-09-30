<!-- relay-audit: v1 kind=card -->
CARD-SESSION-TOKEN-S167-1-v2

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). First line of every message: `[AG-4]`. Built from your SLIP-ORDER-MAP-SESSION-TOKEN-S167-1 and its DRAFT (20:54Z) — your map, your design, carried with credit.
SUPERSEDES CARD-SESSION-TOKEN-S167-1 (never sent to a lane). v2 = v1 + scout-2's eight amendments from SCOUT-STATUS-PREREVIEW-SESSION-TOKEN-S167-1 (row 4e3524b1-d9bd-49d7-983f-64eee56051c1, verdict RED), pasted VERBATIM below; where an amendment and v1 differ, the amendment wins.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:26Z
TAKE AFTER: NOTICE-INBUCKET-RULING-S167-1 is slipped.
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (1f694e1ff47d84d6e7b321e332446519f443b1f0 at 21:21Z; scout-2 confirmed every cited line at 5e6e691f; stampConsumed is mail-wait.mjs:1175, the relay_mark_consumed call inside it at :1228). AG-4's map (MEASURED at that master): every window at one address shares ONE identity — the address nonce (factoryState.mjs:161); boot laneBoot.mjs:280; heartbeat factoryState.mjs:543; stamp mail-wait.mjs:1228; slip laneSlip.mjs:185. The harness sets CLAUDE_CODE_SESSION_ID per window, every bash call inherits it, and it ROTATES on /clear.
ON-DISAGREEMENT: if any of those lines is not what you read, print what is and stop.
WHY: register 183 + two S167 findings. (1) Two windows at one address are invisible from outside (S166: "2 AG3 şeridi var", GitHub and the bus each showed ONE). (2) F-S167-CLEAR-LEAVES-OLD-WAITER-1 (AG-4, 20:54Z): after /clear the previous session's background `mail-wait` KEEPS RUNNING — AG-4's window had two AG-4 waiters and both saw the same card. (3) F-S167-BACKGROUND-WAIT-NO-WAKE-1: scout-2's background waiter did not wake its idle window for a 20:29Z order. Plain words: a tab can hold a ghost listener from before /clear that grabs work meant for the live session, and nobody can see it.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 4, register 183) · §12.1 NEW subject → scout pre-review before this card is sent.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 4e3524b1-d9bd-49d7-983f-64eee56051c1
why: scout-2 returned RED with eight amendments; v2 carries them verbatim (same subject, loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1).
```
SCOUT-2 MEASURED (summary; full text in the row above): the one-identity claim is CONFIRMED (laneNonce is `git ls-remote origin refs/heads/lane/<lane>`, cached per process). CLAUDE_CODE_SESSION_ID rotates on /clear while background tasks stay keyed by the ORIGINAL process session — the claude process survives /clear, so its earlier children survive too. Live waiters for AG-4 and AG-3 run under TWO DIFFERENT claude processes, so a second live window has a different claude ancestor pid than a /clear ghost: THAT is the discriminator. The harness exports TMPDIR=/tmp/claude-501 for every Bash call (one flat per-user dir); a terminal-launched waiter gets /var/folders/…. Inside the sandbox the process list is DENIED; only unsandboxed `ps` sees other windows. architectOpen.ts reads factory_state only (no relay_inbox read today). checkSlip accepts extra lines; the slip cap is 1024 characters.
AMENDMENTS (scout-2, verbatim; they win over W1–W5 below where they differ):
- W3: "W3 kills ONLY a ghost: a live pid whose command line is `mail-wait.mjs <same address>` AND whose claude ancestor pid equals this waiter's claude ancestor pid (the same window after /clear); for a different claude ancestor it kills NOTHING, prints `[mail-wait] TWO-WINDOWS <address> pid=<pid> window=<old> vs window=<new>`, and exits non-zero without taking."
- W3: "Before any signal, read the pid's command line (`ps -o command= -p <pid>`) and act only if it is mail-wait for that address; any other process at that pid is a dead entry, and a signal that fails (EPERM/ESRCH) is printed as such and never reported as `replaced`."
- W3: "The lock lives at a fixed per-machine path (/tmp/cwf-mail-wait/<address>.lock), not os.tmpdir(), because a terminal-launched waiter's TMPDIR is /var/folders/…; the process-list read is unsandboxed and its denial prints UNMEASURED, never a free lock."
- W4: "SLIP-DOUBLE-TAKE carries the six checkSlip fields (card, branch, head, report, ci, status) or is posted by a verb without the slip contract; state which, because postSlip otherwise refuses it FW006; the report says FW004 is ambiguous by design."
- W4: "Name the retry path the post goes through and prove ONE row under a forced transient retry (test)."
- W5: "W5 adds a relay_inbox from_lane read to scripts/architectOpen.ts over the declared read path, counts `window:` only on rows that pass checkSlip and whose lane_addr is an AG-n, and prints UNMEASURED with its reason when that read fails."
- W1/W2: "A slip within 21 characters of the 1024 cap is refused FW005 once the window line is added; the report names the largest existing slip body length."
- WHY: "State how AG-4 measured the /clear rotation; scout-2 corroborates it (post-/clear env id ≠ the process's background-task session id)."
ORDER CHANGE: this card now lands BEFORE CARD-SCOUT-ACK-S167-1 (both edit scripts/mail-wait.mjs; SCOUT-ACK is still in pre-review and will be carried onto the master this PR produces). PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1 applies; the unsandboxed `ps` read will prompt — announce it with `[AG-4] PROMPT-EXPECTED:` and list it under `PROMPTS:`.
NO CRON TASK. GRAFT: graft first; the slip carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable — the session id is hashed, never printed.
UI/UX (§13.3): no CWF product screen shows lane state (AG-4 measured: factory_state has 0 hits in src/); the surface is `npm run architect:open`. Say so in the report.

## WORK (push-first)
W1. `scripts/windowToken.mjs`: token = first 12 hex of sha256(CLAUDE_CODE_SESSION_ID); unset → `UNMEASURED (<reason>)`, never a default.
W2. laneSlip / postSlip adds ONE `window: <token>` line to every slip body; the boot slip and the claim nonce message carry it too. No migration.
W3. SINGLE WAITER PER ADDRESS PER MACHINE: mail-wait records `<address> <pid> <token>` in a per-address lock file under the OS temp dir (NOT the shared clone) at start; if a live pid for the same address with a DIFFERENT token is found, it prints `[mail-wait] STALE-WAITER <address> pid=<pid> window=<old token> — replaced by window=<new token>`, terminates that pid, and continues; same token → prints `DUPLICATE-WAITER` and exits without taking. A dead pid is overwritten silently.
W4. mail-wait: a FW004 refusal on `--take` of a row it read unstamped posts SLIP-DOUBLE-TAKE-<address> once (carries both tokens where known).
W5. `architect:open`: DUPLICATE-WINDOW line = more than one distinct `window:` token per address among from_lane rows in the last 30 min; one token → silent.
TESTS: token is 12 hex; unset → UNMEASURED; checkSlip accepts the `window:` line; plant two AG-3 tokens in 30 min → flag, one → silent; W3 with a fake live pid + different token → STALE-WAITER + kill called; same token → DUPLICATE-WAITER exit; FW004 posts once.
FENCE: scripts/windowToken.mjs · scripts/laneSlip.mjs · scripts/mail-wait.mjs · scripts/laneBoot.mjs · scripts/architectOpen.ts · their tests · docs/relay/SESSION-TOKEN-S167-1-AG4-report.md. No migration; no .claude/ file.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-st -b phase/session-token-s167-1 <master sha>`.
2. W1–W5 + tests; first commit + push + `gh pr create --base master` within 10 minutes; proofs after (each new test file ONCE + existing mailWait*/laneSlip* tests ONCE; typecheck:api ONCE).
3. Report, commit (`git commit -F <file>`), push. Slip SLIP-CARD-SESSION-TOKEN-S167-1 (bus; `[AG-4]`, `window:` line, `GRAFT:` line). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 60 min. A permission you cannot pass → slip it and stop.
FORBIDDEN: printing CLAUDE_CODE_SESSION_ID or any env value; --force; paths outside the fence; merging; migration; cron.

END · CARD-SESSION-TOKEN-S167-1-v2
