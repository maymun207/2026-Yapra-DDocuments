<!-- relay-audit: v1 kind=card -->
CARD-LANE-BUS-WAKE-HOOK-S152-1-v3

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T21:05Z (bus clock)
SUPERSEDES CARD-LANE-BUS-WAKE-HOOK-S152-1-v2, which scout-2 held RED (SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v2, bus 2026-09-21T20:51:57Z) on M1–M5 with R1–R5 as edits. Every correction is scout-2's and is credited by name (S112-YASA-1): no session-id variable exists for child processes in the product AntiGravity runs (2.1.128); the transcript stem equals session_id but only inside the hook; a failed state write breaks the cap; created_at is not unique per lane; a Date round-trip truncates microseconds; scout replies carry no card line; "newest card in the box" is the blind anchor; the rewake feeds ALL stderr to the model with a fixed prefix. The Architect's blind spot across v1–v2: it designed identity for a runtime it had not measured.
THE ONE NEW DESIGN ELEMENT in v3, and why it comes back to the scout: identity AND the start anchor are both taken from the boot text the OWNER pasted, read by the hook from its own transcript (transcript_path is in the hook input). The owner's boot line names the lane ("Sen AG-4'sin" / "Sen scout'sun") and the card ("Kartın: <name> (bus <created_at>)" / "Emrin: <name> (bus <created_at>)"). That is owner-asserted identity (RULE-42: never inferred from the bus) and it is the card the window was STARTED on (the scout's own M5 suggestion). No Bash-side writer and no environment variable are needed.
OWNER APPROVAL: OWNER-RULING-S152-BUS-WAKE-HOOK-1, the owner's words at 23:15 TSI: "tamam onayliyorum". It AMENDS OWNER-RULING-S143-OPERATING-MODEL-1: pollers stay banned (no poll, cron or scheduled task, no model turn spent while idle); a background shell wait that spends no model turn until a card arrives is permitted; at most THREE wakes per window, then the window stops and the owner does /clear + boot. Design source by name: the owner's question at 23:12 TSI, "Sen neden bu kartlari direct kendilerine yazmiyorsun da bana cut and paste yaptiriyorsun?".
ADVERSARY GATE: NEW DESIGN ELEMENT (transcript-read identity), so it GOES TO THE SCOUT (12.1); reaches AG-4 only with a GREEN verdict row.
BRANCH: phase/lane-bus-wake-hook-s152-1 · PUSH: yes · REPORT: docs/relay/LANE-BUS-WAKE-HOOK-S152-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first and write the GRAFT line in your slip. Edit .claude/settings.json and .claude/hooks/ with the Edit/Write tools; a harness refusal on either is a STOP with the refusal printed, never a route-around (scout R5).

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch scripts/mail-wait.mjs, .claude/settings.json, api/cwf/__tests__/noPollTask.test.ts or the four NO POLL TASK files. If one does, STOP and print it.
ON-DISAGREEMENT: if any line or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. The Architect writes every card straight into the lane's box (relay_inbox). A Claude Code tab reads that box only while a turn is running, so a card that lands while the tab is idle waits until a human types into the tab; since S143 that human is the owner. The bounded waiter exists (scripts/mail-wait.mjs, S109) and nothing calls it between turns (CALLER-ABSENT, 12.6). The product's Stop hook with asyncRewake is the caller: exit 2 wakes the model with the hook's stderr. This card WIRES hook → one named mail-wait mode → wake.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the product contract and the mail-wait behaviour | MEASURED: scout-2's reads of the installed 2.1.128 binary and its mail-wait runs, SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1 and -v2, 2026-09-21T20:32Z and 20:51Z | scout |
| the lines below at origin/master | MEASURED: sed and git grep over the owner clone on the bridge, 2026-09-21T20:20Z; re-measured SAME by scout-2 at 20:32Z and 20:51Z | lines |

```evidence:floor
lane-refreshed tracking ref origin/master in the owner clone at 2026-09-21T20:07Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (scout-2 ls-remote at 20:51Z: SAME)
```

```evidence:scout
Stop input = {session_id, transcript_path, cwd, permission_mode?, agent_id?, hook_event_name:"Stop", stop_hook_active, last_assistant_message?}; timeout UNIT = SECONDS, no cap.
transcript_path = join(dir, `${sessionId}.jsonl`); its stem equals the hook input's session_id.
2.1.128: CLAUDE_CODE_SESSION_ID is never assigned for child processes (it appears only in a delete list); 2.1.241 assigns it.
asyncRewake: on exit code 2 ONLY, the model receives `Stop hook blocking error from command "<name>": ${stderr || stdout}`, queued as a task-notification, priority next, stopHookActive true; stdout is used only when stderr is empty; rewakeMessage/rewakeSummary are unused in 2.1.128. Backgrounded only when (async || asyncRewake && (isInteractive || hasStreamingInput)); which applies in an AntiGravity tab is UNMEASURED.
the existing graft Stop hook writes NO stdout; hooks of one event run concurrently; no repo guard refuses a Stop-hook child.
relay_inbox.created_at is default now() (supabase/migrations/20260813110000_relay_inbox.sql:131) = transaction start; (lane_addr, created_at) is not unique. Postgres prints created_at with trimmed microseconds and a space.
mail-wait REFUSES --since when the lane has a claim-row watermark (exit 2); watermark mode filters on the retired delivery-receipt stamp; its created_at predicate is inclusive (>=).
scout reply rows carry no card:/order: line; AG slips carry card: (laneSlip.mjs:68-75, FW006).
noPollTask.test.ts:62-67 NO_POLL_TASK_RULE, :156 exact set; the detector at :85 returns at :101 on a line containing "creates no".
```

```evidence:lines
.claude/settings.json:192  "Stop": [   (one hook: node .claude/helpers/graft-hooks.cjs stop, timeout 8000 — SECONDS; a side finding outside this fence)
scripts/mail-wait.mjs:90-119  const EXIT_MAIL = 0; EXIT_USAGE = 2; EXIT_NO_MAIL = 3; EXIT_READ_FAILED = 4; EXIT_DIGEST_MISMATCH = 5; EXIT_CARD_REFUSED = 6
scripts/mail-wait.mjs:225  export const KNOWN_FLAGS   (an unknown flag is refused by name)
scripts/mail-wait.mjs:279-292  resolveEndpoint(): reads the supabase-ro server from .mcp.json
CLAUDE.md:72 · .claude/boot/producer.md:234 · .claude/boot/foreman.md:560 · .claude/boot/free.md:271  the NO POLL TASK paragraph, byte-identical
```

## PREMISE

MEASURED: 2026-09-21T20:51Z, scout-2's reads (evidence scout).
MEASURED: 2026-09-21T20:20Z, the Architect's grep over the files in `lines`; SAME at 20:51Z per scout-2.
UNMEASURED: the transcript's line shape for the first user message in 2.1.128 (which JSON field holds the pasted text); ORDER 0 (a) measures it from the binary's writer and from one real transcript on this machine. UNMEASURED: whether the hook is backgrounded in an AntiGravity tab and whether the tab stays usable; ORDER 6 measures both after landing.
SELF-INVALIDATION: dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). (a) Print the JSONL shape of a user message in the 2.1.128 transcript (the writer in the binary, plus the first user line of one real transcript in $HOME/.claude/projects/ with its text REDACTED to the first 40 characters — never print a secret). (b) Re-print every line in `lines`, SAME or DIFFERENT. (c) Run node scripts/mail-wait.mjs AG-4 --once and print the exit code only.

ORDER 1 - IDENTITY AND START ANCHOR FROM THE OWNER'S BOOT TEXT. The hook reads transcript_path from its stdin, finds the FIRST user message whose text matches `^Sen (AG-[0-9]+|scout)'` and extracts: the lane address from that match, and the start card from `(Kartın|Emrin): <NAME> \(bus <TS>\)` in the same message. If no such message exists, or the address is not on the claimable roster, print nothing to stderr, write one line to the hook log (ORDER 3 (6)), exit 0: the window stops as today. The start anchor is the (created_at, id) of the to_lane row for that address whose artifact_name is <NAME>, read from the bus with created_at carried as the DATABASE STRING (never parsed into a Date, scout M4); <TS> in the boot text is only a cross-check, and a mismatch is logged, not guessed around. No environment variable, no file under the clone, no Bash-side writer (scout M1).

ORDER 2 - ONE NAMED MAIL-WAIT MODE (scout M1–M4 of v1, M3–M4 of v2). Add `--wake-after <created_at>,<id>` to scripts/mail-wait.mjs, refused by name if combined with --since, --read, --take, --table-lens or --pre-watermark. Semantics: rows with direction to_lane, lane_addr = <address>, and (created_at > a OR (created_at = a AND id > b)), ordered by created_at, id; the claim-row watermark and the retired delivery-receipt stamp are NOT consulted (doc comment cites the scout's findings by name). The anchor is compared IN SQL against the string cast back with ::timestamptz, never through a JavaScript Date. One SELECT per poll, no heartbeat, no factory-mode read, no count probe; cadence default 90 s. On mail it prints EXACTLY ONE line for the OLDEST match: `[MAIL] artifact=<artifact_name> created_at=<the database string, space replaced by T, nothing else changed> id=<uuid> md5=<md5>` and exits 0; exit 3 on budget with zero rows; exit 4 on any read failure, reason printed. Existing modes and their tests are byte-identical.

ORDER 3 - THE HOOK. Add `.claude/hooks/bus-wake.mjs` (node, no new dependency); register it in .claude/settings.json as a SECOND Stop hook after the graft one with `"asyncRewake": true` and `"timeout": 7800`. Behaviour, in order:
 (1) read stdin; resolve address and start anchor (ORDER 1); absent → exit 0.
 (2) state at `$HOME/.cwf-lane/wake/<session_id>.json` = { wakes: n, anchorCreatedAt: <string>, anchorId: <uuid>, lastWokeAt: <iso> }. If absent, initialise it from the START anchor. If wakes is 3 → log `cap reached (3), window ends; owner: /clear + boot`, exit 0.
 (3) if stop_hook_active is true and lastWokeAt is under 30 seconds ago → log it, exit 0 (loop guard; a woken turn that ends in under 30 s ends the window silently — named, accepted, scout R4).
 (4) spawn `node scripts/mail-wait.mjs <address> --wake-after <anchorCreatedAt>,<anchorId> --cadence-sec 90 --budget-min 120`. Exit 0 → parse the single [MAIL] line; write the new state {wakes+1, anchor = that row's created_at string and id, lastWokeAt}; READ IT BACK and compare field by field; ONLY if equal, print the wake text as the ONLY bytes on stderr and exit 2. If the write or the read-back fails → log it, exit 0, no wake (scout M2: a wake that cannot advance its own state never fires). Exit 3/4/2/5/6 → log code and line, exit 0.
 (5) the wake text, one line, Turkish, byte-stable: `Kartın: <artifact_name> (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap; kendi worktree'nde çalış. Kod bağlamını önce graft ile al ve slip'ine GRAFT satırını yaz. Slip'ini bus'a yaz ve dur.` The model will see it after the product's fixed prefix `Stop hook blocking error from command "...":` — the file header names that prefix so no reader mistakes it for an error (scout R1). Never print an environment value; never print a body. Do not rely on rewakeMessage/rewakeSummary (scout R2).
 (6) ALL diagnostics go to `$HOME/.cwf-lane/log/<session_id>.log`, never to stderr, so the exit-2 input is exactly the wake text (scout R1).
 (7) file header: the owner ruling by name, zero model turns while waiting, at most three wakes per window, and the identity source (the owner's boot text).

ORDER 4 - THE RULE TEXT. In CLAUDE.md:72 and the three boot files, EXTEND the NO POLL TASK paragraph — byte-identical in all four — by appending this sentence and nothing else: ` A bus-wake Stop hook is not a task: it is a background shell wait that spends no model turn until a card arrives, wakes the window with the card's name, and stops the window after three wakes (OWNER-RULING-S152-BUS-WAKE-HOOK-1).` Extend NO_POLL_TASK_RULE at noPollTask.test.ts:62-67 to the same bytes so :156 stays exact; print that the detector still returns at :101 on the line.

ORDER 5 - TESTS, failing-first, plant proven. (a) --wake-after: the tuple predicate (a same-created_at twin with a larger id IS returned; the anchor row itself is not), to_lane only, this lane only, oldest-first single line, created_at printed with microseconds intact, exit 0/3/4, refusal when combined with --since. (b) identity: a synthetic transcript with the AG boot line, the scout boot line, no boot line, and a boot line naming a non-roster address. (c) bus-wake with mail-wait STUBBED: exit 0 → state advanced AND read back → stderr is exactly the wake text → exit 2; a failing state write → exit 0, no stderr; 3/4/2/5/6 → exit 0; wakes at 3 → exit 0; loop guard. Assert stderr on the exit-2 path equals the wake text byte for byte. Plant: make the state write throw and show the no-wake test red if the hook still exits 2; restore.

ORDER 6 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram in public/architecture/diagrams/ or the description text in src/components/admin/stagesRegistry.ts and run npm run reseal in the SAME commit; if master moved, git merge origin/master first, then reseal). Full suite locally, counts named as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report on the same branch; it follows the landing. Slip with the head, the PR number, ORDER 0's measurements and the GRAFT line. After landing, the first AntiGravity window booted on the new master measures, with the owner as witness: whether the hook was backgrounded, whether the tab stays usable, and whether the wake arrives (scout R3).

## FALSIFIER

If ORDER 0 (a) shows the transcript does not carry the pasted user text in a readable field, STOP after ORDER 0 and print the shape: the Architect re-cuts. If the hook ever exits 2 without a written-and-read-back state, or with anything on stderr besides the wake text, the test is red. If a wake text differs from ORDER 3 (5) other than the two substituted fields, STOP and name it.

## SHARED SURFACES

```scope
- .claude/hooks/bus-wake.mjs (new) and its test
- .claude/settings.json (the Stop array only: one appended entry with asyncRewake and timeout)
- scripts/mail-wait.mjs (the --wake-after mode only: KNOWN_FLAGS, one SQL, one print shape, the refusal when combined) and its new test
- CLAUDE.md, .claude/boot/producer.md, .claude/boot/foreman.md, .claude/boot/free.md (the one appended sentence)
- api/cwf/__tests__/noPollTask.test.ts (NO_POLL_TASK_RULE extended to the same bytes)
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/LANE-BUS-WAKE-HOOK-S152-1-AG4-report.md
```

## DECISION RIGHTS

You choose the state and log file shapes, the transcript parser's structure, and the test names. FORBIDDEN: no change to mail-wait's existing modes or their tests; no change to laneBoot.mjs; no poll, cron or scheduled task; no new dependency; no identity or state file under the clone; no production write; no migration; no merge; no adversary/scout post on your own head; never print an environment value, a card body or a transcript's text beyond the redacted 40 characters ORDER 0 allows. The existing graft hooks' timeouts (seconds, not milliseconds) are OUT OF SCOPE and filed for a later card.

END · CARD-LANE-BUS-WAKE-HOOK-S152-1-v3
