ORDER-SCOUT-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1

LANE: scout (window scout-2; scout-1 stays on ORDER-SCOUT-LAND-PR590-S151-1-v1)
FROM: Architect, S152, 2026-09-21T20:30Z
OWNER APPROVAL: OWNER-RULING-S152-BUS-WAKE-HOOK-1 ("tamam onayliyorum", 2026-09-21 23:15 TSI), amending OWNER-RULING-S143-OPERATING-MODEL-1 as the card states.
PRECONDITION: none on master beyond the card's own. Take code context with graft first and write the GRAFT line in your status.

WHAT: adversarial review of the card below — a NEW subject, so it comes to you first (12.1). Card body = the bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
sha256 = b75b9635a2ee002649e1b1876a41ca8653dddd56bb8b2651e2e422024c7b39ea (12694 bytes). The Architect's local cardPreflight is GREEN on all eleven checks; that is grammar, not review.

DO:
1. Run the repository card gate on those bytes, every check; print any refusal verbatim (12.13).
2. Attack the premise from the PRIMARY sources, and MEASURE, do not recall:
   (a) The Stop-hook contract of the installed Claude Code: can a Stop hook continue the assistant by printing {"decision":"block","reason":"..."}? What is the `timeout` unit — seconds or milliseconds? Does the input JSON carry session_id, cwd and stop_hook_active? Print the source you read (the product's docs or a planted probe hook in a scratch worktree), never memory. If a Stop hook CANNOT continue the assistant, the card is VOID: say so first.
   (b) Does Claude Code run the Stop hook when the assistant stops inside AntiGravity's plugin, and does a 120-minute hook keep the tab alive there? If you cannot measure it, print UNMEASURED with the reason — do not guess.
   (c) node scripts/mail-wait.mjs scout --once — exit code, printed. Does the identity guard accept `scout`?
   (d) How do two Stop hooks compose: what does the existing graft stop hook print to stdout, and does a second hook's block decision survive it?
   (e) Is `--since` with an ISO instant sufficient to never re-wake on a row already woken on, given that mail-wait holds its high-water mark only in memory? Is there any path where the hook wakes the window on a row addressed to ANOTHER lane, or on its own slip (direction from_lane)?
   (f) Does anything in .claude/hooks/guard-bash.py (GB-*) or guard-mcp.py refuse the spawn of mail-wait from a hook, or refuse the settings.json edit?
   (g) Token cost: confirm from the product's own description that no model turn runs while a hook process waits. If you cannot confirm, say UNMEASURED.
   (h) Does the paragraph extension in ORDER 3 break the test that pins the NO POLL TASK paragraph (find it; the card says it may not exist)?
   (i) Is 130 minutes an acceptable hook timeout, or does the product cap it? Print the cap if one exists.
3. Verdict: GREEN first line exactly `ADVERSARY-VERDICT: GREEN card=CARD-LANE-BUS-WAKE-HOOK-S152-1-v1 sha256=b75b9635a2ee002649e1b1876a41ca8653dddd56bb8b2651e2e422024c7b39ea`, or RED with each defect by file:line, each marked MUST-CHANGE or MAY-RIDE-AS-EDIT.
FORBIDDEN: read-only on the repository (a probe hook lives only in a scratch worktree you remove, and you print that it is gone). No status post on any PR, no edit to master, no poll task, no cron, never print an environment value.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1. Then stop.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-LANE-BUS-WAKE-HOOK-S152-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T20:25Z (bus clock)
OWNER APPROVAL: OWNER-RULING-S152-BUS-WAKE-HOOK-1, the owner's words at 23:15 TSI: "tamam onayliyorum" to the one path below. It AMENDS OWNER-RULING-S143-OPERATING-MODEL-1: pollers stay banned (no poll, cron or scheduled task, no model turn spent while idle); a SHELL WAIT that spends no model turn until a card arrives is permitted; at most THREE wakes per window, then the window stops and the owner does /clear + boot (his S144 one-card-per-session rule, widened to three by this ruling). Design source by name: the owner's question at 23:12 TSI, "Sen neden bu kartlari direct kendilerine yazmiyorsun da bana cut and paste yaptiriyorsun?" — the Architect's blind spot was reading the S143 ruling as a ban on WAITING rather than a ban on SPENDING (S112-YASA-1, project instructions 12.14).
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (12.1); reaches AG-4 only with a GREEN verdict row.
BRANCH: phase/lane-bus-wake-hook-s152-1 · PUSH: yes · REPORT: docs/relay/LANE-BUS-WAKE-HOOK-S152-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first and write the GRAFT line in your slip.

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch scripts/mail-wait.mjs, scripts/laneBoot.mjs, .claude/settings.json or the four NO POLL TASK files. If one does, STOP and print it.
ON-DISAGREEMENT: if any line or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. The Architect writes every card straight into the lane's box (relay_inbox). A Claude Code tab reads that box only while a turn is running, so a card that lands while the tab is idle waits until a human types into the tab. Until S143 a two-minute poller did the waking and burned a model turn every tick; the owner banned it. Since then the owner pastes "kartını oku" by hand — a PLATINUM breach standing in the open. The bounded waiter already exists: scripts/mail-wait.mjs (PHASE-RELAY-WAKE-1, S109) polls the box from a shell with a cadence and a budget and answers with an exit code. Nothing calls it between turns (CALLER-ABSENT, 12.6). Claude Code's Stop hook is exactly that caller: it runs when the assistant is about to stop, and if it prints a JSON decision of block with a reason, the assistant continues with that reason as its next input. This card WIRES the two: Stop hook -> mail-wait (shell, zero model turns) -> on new mail, wake the tab with the card's name. This is a WIRING card; it builds no second waiter.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the lines below at origin/master | MEASURED: git show and grep over the owner clone on the bridge, 2026-09-21T20:20Z | lines |
| the bus rows this card was born from | MEASURED: select over relay_inbox, Supabase MCP, 2026-09-21T20:12Z | rows |

```evidence:floor
lane-refreshed tracking ref origin/master in the owner clone at 2026-09-21T20:07Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (not ls-remote; your ls-remote measures it)
```

```evidence:lines
.claude/settings.json:192  "Stop": [   (one hook: node .claude/helpers/graft-hooks.cjs stop, timeout 8000)
scripts/mail-wait.mjs:1-16  header: PHASE-RELAY-WAKE-1 (S109); "The only place a wake can live is INSIDE the turn -- a lane that has finished its card does not die, it polls, bounded."
scripts/mail-wait.mjs:90-119  const EXIT_MAIL = 0; EXIT_USAGE = 2; EXIT_NO_MAIL = 3; EXIT_READ_FAILED = 4; EXIT_DIGEST_MISMATCH = 5; EXIT_CARD_REFUSED = 6
scripts/mail-wait.mjs:187-205  usage: node scripts/mail-wait.mjs <lane address> [--cadence-sec n] [--budget-min n] [--since iso] [--once] [--read name] [--take] [--table-lens] [--pre-watermark]
scripts/mail-wait.mjs:225  export const KNOWN_FLAGS   (an unknown flag is refused by name)
scripts/mail-wait.mjs:279-292  resolveEndpoint(): reads the supabase-ro server from .mcp.json, expands ${VAR} headers from the environment, hard-stops on an unset variable
scripts/laneBoot.mjs:369  const r = await runLaneBoot({ lane: parsed.lane, confirm: parsed.confirm }, deps);
CLAUDE.md:72  NO POLL TASK. A lane creates no poll, cron or scheduled task (OWNER-RULING-S143-OPERATING-MODEL-1). ... If a poll or cron task exists in this window, delete it and print the list showing it gone.
.claude/boot/producer.md:234 · .claude/boot/foreman.md:560 · .claude/boot/free.md:271  the same paragraph, byte-identical (CARD-LANE-NO-POLLER-S145-1-v3 order 1)
.claude/boot/producer.md:287  node scripts/mail-wait.mjs AG-N --once --since <an ISO instant before the backlog>
```

```evidence:rows
ORDER-SCOUT-LAND-PR590-S151-1-v1  lane_addr scout  created_at 2026-09-21T19:49:59Z — no scout status row existed on the bus at 20:12Z; the scout tab first acted on it after the owner's paste at 23:12 TSI
CARD-A24-P1C1-METRIC-HINTS-S151-1-v2  lane_addr AG-1  created_at 2026-09-21T19:52:17Z — AG-1's first action on it is stamped 2026-09-21T20:10:06Z, after the owner's paste at 23:10 TSI; the row waited eighteen minutes for a human
```

## PREMISE

MEASURED: 2026-09-21T20:20Z, the Architect's grep/sed over the files in `lines` at the `floor` sha.
MEASURED: 2026-09-21T20:12Z, the two bus rows in `rows`: both waited for a human paste.
UNMEASURED: the UNIT of the hook `timeout` field in the installed Claude Code (the file's existing values read as milliseconds; the scout measures it from the installed product, not from memory). UNMEASURED: whether mail-wait's identity guard accepts the address `scout`. UNMEASURED: how the two Stop hooks' stdout compose. ORDER 0 measures all three.
SELF-INVALIDATION: dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). (a) Print the Stop-hook contract from the installed Claude Code: the input JSON fields (session_id, cwd, stop_hook_active), the output shape {"decision":"block","reason":"..."} and the timeout unit — from the product's own documentation or a planted probe hook, never from memory; print the source. (b) Run node scripts/mail-wait.mjs scout --once and print the exit code: 0/3 means the guard accepts `scout`, 2 means it refuses; print which. (c) Print what node .claude/helpers/graft-hooks.cjs stop writes to stdout on a stop event. (d) Re-print every line in `lines`, SAME or DIFFERENT.

ORDER 1 - THE ADDRESS FILE. The hook must know whose box to wait on, and the bus never tells a window who it is (mail-wait's identity guard, RULE-42). Add ONE writer: on a SUCCESSFUL claim or confirmed takeover, scripts/laneBoot.mjs writes the address as a single line to `.claude/lane-address` in the worktree root; add `npm run lane:addr -- <address>` (a three-line script) for a window that does not boot through laneBoot (the scout). Add `.claude/lane-address` to .gitignore. The file is the ONLY identity source the hook reads; no inference from the bus, no default.

ORDER 2 - THE HOOK. Add `.claude/hooks/bus-wake.mjs` (node, no new dependency) and register it as a SECOND Stop hook in .claude/settings.json after the graft one, with a timeout of 130 minutes in the unit ORDER 0 measured. Behaviour, in order:
 (1) read the hook input JSON from stdin; if `.claude/lane-address` is absent or empty, print one stderr line `[bus-wake] no lane address, no wait` and exit 0 with NO stdout — the window stops exactly as today.
 (2) count this window's wakes in `.claude/bus-wake.state.json` keyed by session_id; if the count is 3, print `[bus-wake] cap reached (3), window ends; owner: /clear + boot` to stderr and exit 0 with no stdout.
 (3) spawn `node scripts/mail-wait.mjs <address> --cadence-sec 30 --budget-min 120 --since <iso>` where <iso> is the newest created_at this state file already woke on (absent: now minus one minute). Branch on the EXIT CODE, never on truthiness (mail-wait header): 
     0 -> parse mail-wait's detection line for artifact_name and created_at (the body is NEVER printed, never passed); record the row in the state file; print to stdout exactly one JSON object {"decision":"block","reason":"<the wake text>"} and exit 0.
     3 -> print `[bus-wake] no mail in 120 min, window ends` to stderr, exit 0, no stdout.
     4 -> print `[bus-wake] READ FAILED: <mail-wait's reason>` to stderr, exit 0, no stdout (the third value never wears the face of no mail).
     2/5/6 -> print the code and mail-wait's line to stderr, exit 0, no stdout.
 (4) the wake text, one line, Turkish, byte-stable: `Kartın: <artifact_name> (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap; kendi worktree'nde çalış. Kod bağlamını önce graft ile al ve slip'ine GRAFT satırını yaz. Slip'ini bus'a yaz ve dur.` Never print an environment value; never print the body.
 (5) the hook spends NO model turn while waiting: it is a shell process; the assistant is not invoked until the JSON is printed. State that in the file header with the owner ruling by name.

ORDER 3 - THE RULE TEXT. In CLAUDE.md:72 and the three boot files, EXTEND the NO POLL TASK paragraph — byte-identical in all four — by appending this sentence and nothing else: ` A bus-wake Stop hook is not a task: it is a shell wait that spends no model turn until a card arrives, wakes the window with the card's name, and stops the window after three wakes (OWNER-RULING-S152-BUS-WAKE-HOOK-1).` Update the test that pins the paragraph (find it by grepping for the paragraph's first sentence under api/ and scripts/; if none exists, say so with the grep and add one under api/cwf/__tests__/ that asserts the four files carry the paragraph byte-identically).

ORDER 4 - TESTS, failing-first, plant proven. Unit-test bus-wake.mjs with mail-wait STUBBED by exit code: exit 0 with a detection line -> exactly one stdout JSON with decision block and the wake text containing the artifact name; exit 3 -> no stdout; exit 4 -> no stdout and a stderr line containing READ FAILED; missing address file -> no stdout; count 3 -> no stdout. Assert the reason string contains no body text and no `=`-joined environment value. Plant: make the stub print a body line and show the test goes red; restore.

ORDER 5 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram in public/architecture/diagrams/ or the description text in src/components/admin/stagesRegistry.ts and run npm run reseal in the SAME commit; if master moved, git merge origin/master first, then reseal). Full suite locally, counts named as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report on the same branch; it follows the landing. Slip with the head, the PR number, ORDER 0's three measurements and the GRAFT line.

## FALSIFIER

If ORDER 0 (a) shows the Stop hook cannot continue the assistant with a reason, STOP: the design has no caller and the card is void; print the source. If ORDER 0 (b) returns 2, the scout window is OUT OF SCOPE for this card: name it in the report and wire AG-* only. If the hook ever prints stdout on exit codes 2, 3, 4, 5 or 6, the test is red. If any wake text differs from ORDER 2 (4) other than the two substituted fields, STOP and name it.

## SHARED SURFACES

```scope
- .claude/hooks/bus-wake.mjs (new)
- .claude/settings.json (the Stop array only: one appended entry)
- scripts/laneBoot.mjs (the address-file write on success only)
- scripts/laneAddr.mjs (new) and package.json (the lane:addr script line only)
- .gitignore (.claude/lane-address and .claude/bus-wake.state.json)
- CLAUDE.md, .claude/boot/producer.md, .claude/boot/foreman.md, .claude/boot/free.md (the one appended sentence)
- the test that pins the NO POLL TASK paragraph, and a new test for bus-wake.mjs
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/LANE-BUS-WAKE-HOOK-S152-1-AG4-report.md
```

## DECISION RIGHTS

You choose the state-file shape, the test names and where in laneBoot.mjs the write sits. FORBIDDEN: no change to scripts/mail-wait.mjs (if one is needed, STOP and name the line); no poll, cron or scheduled task; no new dependency; no production write; no migration; no merge; no adversary/scout post on your own head; never print an environment value or a card body.

END · CARD-LANE-BUS-WAKE-HOOK-S152-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1
