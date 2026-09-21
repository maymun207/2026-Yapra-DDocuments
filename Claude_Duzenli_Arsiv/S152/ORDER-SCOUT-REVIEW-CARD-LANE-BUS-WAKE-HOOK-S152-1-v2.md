ORDER-SCOUT-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v2

LANE: scout (window scout-2; take this BEFORE ORDER-SCOUT-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1; scout-1 stays on ORDER-SCOUT-LAND-PR590-S151-1-v1)
FROM: Architect, S152, 2026-09-21T20:50Z
OWNER APPROVAL: OWNER-RULING-S152-BUS-WAKE-HOOK-1 ("tamam onayliyorum", 2026-09-21 23:15 TSI).
PRECONDITION: none on master beyond the card's own. Take code context with graft first and write the GRAFT line in your status.
CREDIT: your RED on v1 (M1–M4, R1–R4) is applied by name in the card; the Architect thanks the instrument.

WHAT: adversarial review of v2 — it changes DESIGN beyond your literal delta (a named mail-wait mode --wake-after, session-keyed identity outside the clone, asyncRewake with exit 2), so it comes back to you (12.1). Card body = the bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
sha256 = c9b8b06bda8bbb4fa27526dad8718a08ac4d538eec7a39a7cf458db251815736 (16029 bytes). Architect's local cardPreflight GREEN on all eleven checks; grammar, not review.

DO:
1. Run the repository card gate on those bytes, every check; print any refusal verbatim (12.13).
2. Attack from the PRIMARY sources (the installed binary AntiGravity runs, scripts/mail-wait.mjs, scripts/laneBoot.mjs, api/cwf/__tests__/noPollTask.test.ts):
   (a) IDENTITY KEY: does the product pass the session id to Bash-tool subprocesses as an environment variable? Name it exactly, with the source line, or print that none exists — this decides ORDER 1 and the FALSIFIER. If none exists, say whether transcript_path's stem equals session_id (the v3 fallback the card names).
   (b) asyncRewake contract: exactly which exit code wakes the model, which stream becomes the model's input, and whether the hook's stdout is also consumed; does a background hook survive the owner typing into the tab, or is it aborted (your (b) risk)? Source lines.
   (c) --wake-after: is a strict created_at > <iso> on to_lane rows for one lane sufficient, or can two rows share a created_at at microsecond precision and one be skipped? Is the [MAIL] single-line shape parseable given created_at's format?
   (d) ANCHOR derivation (ORDER 3 (4)): a lane's newest from_lane row names its card with a `card:` line — measure on the live bus that this holds for AG-1, AG-4 and scout slips (print the first line of each lane's newest from_lane row). Where it does not hold, the card's fallback (newest to_lane row) is the blind anchor CLAUDE.md §1 forbids — say so if it is.
   (e) Loop guard (ORDER 3 (1)): with asyncRewake, is stop_hook_active even set on the next Stop? Can a wake → work → Stop → wake chain run past the cap if the state file write fails? 
   (f) The rule-text extension and noPollTask.test.ts:62-67/:156/:85/:101 — does the exact appended sentence keep the detector standing down?
   (g) Any file in the scope fence that a lane window's sandbox cannot write (you noted .claude/settings.json and .claude/hooks are write-denied in YOUR window): is the same true for a producer window? If yes the card cannot land from a lane and must say so.
3. Verdict: GREEN first line exactly `ADVERSARY-VERDICT: GREEN card=CARD-LANE-BUS-WAKE-HOOK-S152-1-v2 sha256=c9b8b06bda8bbb4fa27526dad8718a08ac4d538eec7a39a7cf458db251815736`, or RED with each defect by file:line, each marked MUST-CHANGE or MAY-RIDE-AS-EDIT.
FORBIDDEN: read-only on the repository; no status post on any PR, no edit to master, no poll task, no cron, never print an environment value (naming a VARIABLE is fine; its value is not).
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v2. Then take ORDER-SCOUT-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1 (bus 2026-09-21T20:30:50Z) and stop after its status.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-LANE-BUS-WAKE-HOOK-S152-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T20:45Z (bus clock)
SUPERSEDES CARD-LANE-BUS-WAKE-HOOK-S152-1-v1, which scout-2 held RED (SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1, bus 2026-09-21T20:32:27Z) on M1–M4 with R1–R4 as edits. Every correction below is the scout's and is credited to scout-2 by name (S112-YASA-1): the Stop-hook contract, the timeout unit, asyncRewake, the --since refusal, the watermark and retired-receipt trap, the inclusive predicate, the shared-clone identity defect, the per-row [MAIL] lines, the poll cost, and the existing noPollTask pin test. The Architect's blind spot: it ordered a hook around a waiter it had not run, and put identity in a directory that windows share.
OWNER APPROVAL: OWNER-RULING-S152-BUS-WAKE-HOOK-1, the owner's words at 23:15 TSI: "tamam onayliyorum". It AMENDS OWNER-RULING-S143-OPERATING-MODEL-1: pollers stay banned (no poll, cron or scheduled task, no model turn spent while idle); a background shell wait that spends no model turn until a card arrives is permitted; at most THREE wakes per window, then the window stops and the owner does /clear + boot. Design source by name: the owner's question at 23:12 TSI, "Sen neden bu kartlari direct kendilerine yazmiyorsun da bana cut and paste yaptiriyorsun?".
ADVERSARY GATE: this v2 changes DESIGN (a named mail-wait mode, session-keyed identity, asyncRewake), not only the scout's literal delta, so it GOES TO THE SCOUT AGAIN (12.1); reaches AG-4 only with a GREEN verdict row.
BRANCH: phase/lane-bus-wake-hook-s152-1 · PUSH: yes · REPORT: docs/relay/LANE-BUS-WAKE-HOOK-S152-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first and write the GRAFT line in your slip.

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch scripts/mail-wait.mjs, scripts/laneBoot.mjs, .claude/settings.json, api/cwf/__tests__/noPollTask.test.ts or the four NO POLL TASK files. If one does, STOP and print it.
ON-DISAGREEMENT: if any line or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. The Architect writes every card straight into the lane's box (relay_inbox). A Claude Code tab reads that box only while a turn is running, so a card that lands while the tab is idle waits until a human types into the tab; since S143 that human is the owner. The bounded waiter exists (scripts/mail-wait.mjs, S109) and nothing calls it between turns (CALLER-ABSENT, 12.6). The installed product's Stop hook is the caller, and scout-2 measured the contract from the binary: a command hook with asyncRewake true runs in the background after the assistant stops, and exit code 2 wakes the model with the hook's stderr as its input; the tab stays idle and usable meanwhile. This card WIRES hook → mail-wait → wake, with one NAMED mail-wait mode because the scout measured that the existing modes cannot serve a hook (M1, M2, M3).

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the product contract and the mail-wait behaviour | MEASURED: scout-2's read of the installed binary and its runs of mail-wait, SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1, 2026-09-21T20:32Z | scout |
| the lines below at origin/master | MEASURED: sed and git grep over the owner clone on the bridge, 2026-09-21T20:20Z; re-measured SAME by scout-2 at 20:32Z | lines |

```evidence:floor
lane-refreshed tracking ref origin/master in the owner clone at 2026-09-21T20:07Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (scout-2 ls-remote at 20:32Z: SAME)
```

```evidence:scout
(a) Stop input = {session_id, transcript_path, cwd, permission_mode?, agent_id?, hook_event_name:"Stop", stop_hook_active, last_assistant_message?}; block output continues the loop with the reason; timeout UNIT = SECONDS (schema "Timeout in seconds"; executor H.timeout*1000, default 600000 ms); no cap on the value.
(d) the existing graft Stop hook writes NO stdout; hooks of one event run concurrently and each blocking result is collected.
(f) no repo guard refuses a Stop-hook child; guard-* are PreToolUse on Bash and mcp__.* only.
(g) a command hook is a spawned shell under a timeout signal; the model runs only after hooks resolve: zero model turns while waiting.
(h) api/cwf/__tests__/noPollTask.test.ts:62-67 NO_POLL_TASK_RULE; :156 asserts the set of lines equals the rule exactly; the detector at :85/:101 stands down on a line containing "creates no".
M1 mail-wait REFUSES --since (exit 2, "[BOUNDARY] REFUSED ... watermark") whenever the lane has a claim-row watermark (mail-wait.mjs:640-651, 1536-1538); measured for scout and for AG-4.
M2 watermark mode filters on the retired delivery-receipt stamp being empty (mail-wait.mjs:1594-1599) and excludes only in per-process memory (:1576); lanes do not write that stamp; a hook built on it wakes on stale rows.
M3 the created_at predicate is INCLUSIVE (mail-wait.mjs:453-454, created_at >=); a "now minus one minute" default is anchor blindness.
M4 windows share a clone; the hook runs from CLAUDE_PROJECT_DIR; a per-directory identity file is read by every window, so the last booter wins and a window can be woken on another lane's card.
R2 mail-wait prints one [MAIL] line PER row and pages (mail-wait.mjs:1638-1641); created_at contains a space.
R3 each poll in the existing modes does heartbeat (git ls-remote + write), factory mode, the row read and a count probe.
R4 the product offers command-hook asyncRewake:true (2.1.128): runs in background and wakes the model on exit code 2.
```

```evidence:lines
.claude/settings.json:192  "Stop": [   (one hook: node .claude/helpers/graft-hooks.cjs stop, timeout 8000 — in SECONDS per (a); a side finding outside this fence)
scripts/mail-wait.mjs:90-119  const EXIT_MAIL = 0; EXIT_USAGE = 2; EXIT_NO_MAIL = 3; EXIT_READ_FAILED = 4; EXIT_DIGEST_MISMATCH = 5; EXIT_CARD_REFUSED = 6
scripts/mail-wait.mjs:225  export const KNOWN_FLAGS   (an unknown flag is refused by name)
scripts/mail-wait.mjs:279-292  resolveEndpoint(): reads the supabase-ro server from .mcp.json, expands ${VAR} headers from the environment
scripts/laneBoot.mjs:369  const r = await runLaneBoot({ lane: parsed.lane, confirm: parsed.confirm }, deps);
CLAUDE.md:72 · .claude/boot/producer.md:234 · .claude/boot/foreman.md:560 · .claude/boot/free.md:271  the NO POLL TASK paragraph, byte-identical
```

## PREMISE

MEASURED: 2026-09-21T20:32Z, scout-2's read of the installed binary and its mail-wait runs (evidence scout).
MEASURED: 2026-09-21T20:20Z, the Architect's grep over the files in `lines`; scout-2 re-measured them SAME at 20:32Z.
UNMEASURED: whether the product exposes the session id to Bash-tool subprocesses as an environment variable (the identity key in ORDER 1 depends on it); ORDER 0 (a) measures it from the binary first, and the FALSIFIER says what happens if it is absent. UNMEASURED: whether an AntiGravity tab whose hook runs in the background stays usable to the owner (scout (b)); the first landed window measures it (ORDER 6).
SELF-INVALIDATION: dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). (a) From the installed binary that AntiGravity runs, print whether Bash-tool subprocesses receive the session id as an environment variable and its exact name; print the source line. (b) Print the asyncRewake contract for command hooks (which exit code wakes, which stream is fed to the model, whether stdout is also read); print the source line. (c) Run node scripts/mail-wait.mjs AG-4 --once and print the exit code and the boundary line it prints. (d) Re-print every line in `lines`, SAME or DIFFERENT.

ORDER 1 - IDENTITY, KEYED BY SESSION, OUTSIDE THE CLONE (scout M4). Add ONE writer, `scripts/laneAddr.mjs` (`npm run lane:addr -- <address>`), that writes the address as one line to `$HOME/.cwf-lane/addr/<session-id>` where session-id comes from the environment variable ORDER 0 (a) named; it refuses (exit 2, printed) when that variable is unset. scripts/laneBoot.mjs calls the same writer on a SUCCESSFUL claim or confirmed takeover; the scout window runs `npm run lane:addr -- scout` from its boot text (the Architect updates the boot texts; not this card). The hook resolves its address ONLY from that file for the session_id in its stdin; absent → one stderr line `[bus-wake] no lane address for this session, no wait`, exit 0, and the window stops as today. Nothing under the clone holds identity or state.

ORDER 2 - ONE NAMED MAIL-WAIT MODE (scout M1, M2, M3). Add the flag `--wake-after <iso>` to scripts/mail-wait.mjs, refused by name if combined with --since, --read, --take, --table-lens or --pre-watermark. Semantics: rows with direction to_lane, lane_addr = <address>, created_at STRICTLY GREATER than <iso>; the claim-row watermark and the retired delivery-receipt stamp are NOT consulted (the mode's doc comment says why, citing M1–M3 by name); no heartbeat, no factory-mode read, no count probe per poll — one SELECT per poll (R3); cadence default 90 s in this mode; on mail it prints EXACTLY ONE [MAIL] line for the OLDEST matching row in the shape `[MAIL] artifact=<artifact_name> created_at=<ISO with T, no space> md5=<md5>` and exits 0; exit 3 on budget with zero rows; exit 4 on any read failure, reason printed. The identity guard is unchanged. Existing modes are byte-identical in behaviour; their tests stay unedited.

ORDER 3 - THE HOOK. Add `.claude/hooks/bus-wake.mjs` (node, no new dependency) and register it in .claude/settings.json as a SECOND Stop hook after the graft one, with `"asyncRewake": true` and `"timeout": 7800` (seconds, scout (a)). Behaviour, in order:
 (1) read the hook input JSON from stdin; if stop_hook_active is true AND this hook's own state shows it woke this session less than 30 seconds ago, exit 0 silently (loop guard).
 (2) resolve the address (ORDER 1); absent → exit 0 as stated there.
 (3) state lives at `$HOME/.cwf-lane/wake/<session_id>.json` = { wakes: n, anchor: <iso> }. If wakes is 3: stderr `[bus-wake] cap reached (3), window ends; owner: /clear + boot`, exit 0.
 (4) ANCHOR (scout M3): if the state has an anchor, use it. Otherwise derive it from the bus, printed to stderr as `[bus-wake] anchor=<iso> from <how>`: the created_at of the to_lane row for this lane whose artifact_name equals the `card:` (or `order:`) line of this lane's NEWEST from_lane row; if this lane has no from_lane row, the created_at of the NEWEST to_lane row for this lane at that moment. Never "now minus a minute".
 (5) spawn `node scripts/mail-wait.mjs <address> --wake-after <anchor> --cadence-sec 90 --budget-min 120`. Branch on the EXIT CODE: 0 → parse the single [MAIL] line; write state {wakes+1, anchor=<that created_at>}; print to STDERR exactly the wake text and exit 2 (the asyncRewake wake). 3 → stderr `[bus-wake] no mail in 120 min, window ends`, exit 0. 4 → stderr `[bus-wake] READ FAILED: <reason>`, exit 0. 2/5/6 → stderr the code and the line, exit 0. NEVER exit 2 on anything but a parsed [MAIL] line.
 (6) the wake text, one line, Turkish, byte-stable: `Kartın: <artifact_name> (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap; kendi worktree'nde çalış. Kod bağlamını önce graft ile al ve slip'ine GRAFT satırını yaz. Slip'ini bus'a yaz ve dur.` Never print an environment value; never print a body.
 (7) file header states, with the owner ruling by name, that the hook spends no model turn while waiting and wakes at most three times per window.

ORDER 4 - THE RULE TEXT (scout (h)). In CLAUDE.md:72 and the three boot files, EXTEND the NO POLL TASK paragraph — byte-identical in all four — by appending this sentence and nothing else: ` A bus-wake Stop hook is not a task: it is a background shell wait that spends no model turn until a card arrives, wakes the window with the card's name, and stops the window after three wakes (OWNER-RULING-S152-BUS-WAKE-HOOK-1).` Extend NO_POLL_TASK_RULE in api/cwf/__tests__/noPollTask.test.ts:62-67 to the same bytes so :156 stays exact; the detector at :85/:101 must still stand down on the line (print it).

ORDER 5 - TESTS, failing-first, plant proven. (a) mail-wait --wake-after: strict inequality (a row AT the anchor is not returned), to_lane only, this lane only, oldest-first single line, exit 0/3/4, refusal when combined with --since; the identity guard still refuses a non-lane. (b) bus-wake with mail-wait STUBBED by exit code: 0 with one [MAIL] line → exactly one stderr wake line, exit 2, state advanced; 3/4/2/5/6 → exit 0, no exit-2 path; missing address file → exit 0; wakes at 3 → exit 0; anchor derivation from a stubbed bus (with and without a from_lane row). Assert the wake line contains no `=`-joined environment value and no body text. Plant: make the stub print a body line and show the test red; restore.

ORDER 6 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram in public/architecture/diagrams/ or the description text in src/components/admin/stagesRegistry.ts and run npm run reseal in the SAME commit; if master moved, git merge origin/master first, then reseal). Full suite locally, counts named as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report on the same branch; it follows the landing. Slip with the head, the PR number, ORDER 0's four measurements and the GRAFT line. After the landing the FIRST window booted on the new master measures scout (b) for real: does the tab stay usable while the hook waits, and does the wake arrive — the owner witnesses it and the Architect records it by name.

## FALSIFIER

If ORDER 0 (a) finds NO session-id environment variable for Bash-tool subprocesses, STOP after ORDER 0 and print the source: the Architect cuts v3 with the identity taken from the hook's transcript_path stem instead; do not invent a third key. If ORDER 0 (b) shows asyncRewake does not wake on exit 2 with stderr, STOP: print the contract, the Architect re-cuts. If the hook ever exits 2 without a parsed [MAIL] line, the test is red. If a wake text differs from ORDER 3 (6) other than the two substituted fields, STOP and name it.

## SHARED SURFACES

```scope
- .claude/hooks/bus-wake.mjs (new)
- .claude/settings.json (the Stop array only: one appended entry with asyncRewake and timeout)
- scripts/mail-wait.mjs (the --wake-after mode only: KNOWN_FLAGS, one SQL, one print shape, the refusal when combined)
- scripts/laneBoot.mjs (the address write on success only) · scripts/laneAddr.mjs (new) · package.json (the lane:addr line only)
- CLAUDE.md, .claude/boot/producer.md, .claude/boot/foreman.md, .claude/boot/free.md (the one appended sentence)
- api/cwf/__tests__/noPollTask.test.ts (NO_POLL_TASK_RULE extended to the same bytes) and new tests for --wake-after and bus-wake.mjs
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/LANE-BUS-WAKE-HOOK-S152-1-AG4-report.md
```

## DECISION RIGHTS

You choose the state-file shape, TAIL of the [MAIL] line beyond the three named fields, and the test names. FORBIDDEN: no change to mail-wait's existing modes or their tests; no poll, cron or scheduled task; no new dependency; no identity or state file under the clone; no production write; no migration; no merge; no adversary/scout post on your own head; never print an environment value or a card body. The existing graft hooks' timeouts (seconds, not milliseconds) are OUT OF SCOPE here and are filed for a later card.

END · CARD-LANE-BUS-WAKE-HOOK-S152-1-v2
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v2
