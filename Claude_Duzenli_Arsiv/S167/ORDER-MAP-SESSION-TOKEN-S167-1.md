<!-- relay-audit: v1 kind=notice -->
ORDER-MAP-SESSION-TOKEN-S167-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 order" and stops). First line of every message: `[AG-4]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:50Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 at 20:48Z).
WHY: register 183 / F-S166 duplicate-window finding. Twice in S166 the owner saw what looked like two windows answering as one address ("2 AG3 şeridi var"); GitHub showed ONE lane ref claim and the bus ONE consumption, so from outside a second window at the same address is INVISIBLE. Plain words: if two tabs both think they are AG-3, both can take the same card and nobody can tell. The S166 ruling: every window mints a per-window session token at boot and every slip prints it, so two windows at one address show two tokens.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 4, register 183). This is a MAP (read-only design measurement) so the card can be cut precisely; the card itself then goes to a scout (§12.1, NEW subject).
NO CRON TASK. GRAFT: graft first; your slip carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — measure, change nothing
1. Where does a window's identity live today? Name (file:line) the boot path (`npm run lane:boot` / laneBoot.mjs), the claim (lane ref nonce), the heartbeat writer (factoryState), mail-wait's `--take`/stamp path, and the slip writer (laneSlip.mjs / scout_reply). Which of them could carry a token WITHOUT a migration (e.g. a line in the slip body, a field in an existing JSON column)?
2. Where can a token be minted and kept for the life of ONE Claude Code window but NOT shared with another window in the same clone? (Env of the window's shell does not persist between bash calls; a file in the shared clone is shared. Measure what the harness offers: CLAUDE_SESSION_ID or similar env set by Claude Code — print only the NAME of any such variable and whether it is set, never its value; a per-window scratch dir; the transcript path.) Name the one mechanism you would use and why.
3. Where would the Architect DETECT a duplicate: two different tokens for one address within N minutes on the bus (slips, stamps, heartbeats). Name the read.
4. Draft the card body (WORK, FENCE, tests) in your slip, ≤ 40 lines, with the UI/UX line (§13.3: does the admin lane table show the token?).
5. Slip SLIP-ORDER-MAP-SESSION-TOKEN-S167-1 (bus; first line `[AG-4]`, a `GRAFT:` line). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: ≤ 20 minutes.
FORBIDDEN: any edit, commit, push, PR, merge, cron, migration; printing an environment VALUE.

END · ORDER-MAP-SESSION-TOKEN-S167-1
