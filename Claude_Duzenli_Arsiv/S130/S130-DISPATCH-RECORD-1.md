# S130-DISPATCH-RECORD-1 — landing v2 doubly GREEN; v3 (one-cell conformance) dispatched to the foreman

Written WHOLE (A-REC-S101-7). Every sha, count and timestamp here is a CLAIM (TOTAL-45) measured from the live bus and the scout transcripts at 2026-09-04T04:00–04:29Z; verify against the bus before quoting.

## OPEN MEASUREMENTS (S130, 00:13 TSİ)

- master `d8895114744dbb23ba5633d726a0814cfe0468d5` — the bootstrap's CARRIED-UNVERIFIED anchor is now VERIFIED, by the scout window's own `git ls-remote origin refs/heads/master` and `git rev-parse HEAD` (identical). The Architect bridge still cannot read GitHub (no credential; `could not read Username`) — an absence of reading, recorded as such.
- Bridge container: `$HOME/lens` absent, as the bootstrap warned. Cards are hand-conformed; the scout's `card:preflight` remains the real grammar gate.
- factory mode READY. AG-4 CLAIMED (heartbeat age <1 s at 04:20Z), AG-5 CLAIMED (25 s). Scout row CLOSED with no heartbeat, by design (readable, never claimable).
- Landing v2 (bus row `26d3cea0`): server sha256 byte-equal to the bootstrap claim (`245bd559…397`).
- SOTA's two scoreboards (6/7 · 0/16) NOT re-measured this turn; still CARRIED-UNVERIFIED.

## WHAT HAPPENED TO LANDING v2

Two independent scout windows reviewed it and both returned GREEN TO LAND:

1. Row `eec285da` at 2026-09-03T21:14:28Z — 37 seconds after the Architect's open-turn read found zero verdict rows. Every premise re-measured; the three-way amend proof re-derived (body md5 `f1fc7927…` identical at both heads; tree `e02a5156…`; author lens executed over git-read subjects → AG-4). Owner approval row read and scope-matched. Two findings: F1 the card grammar refuses v2 on exactly ONE cell (CP-1 → R-CLAIM-ROW, fourth CLAIMS row, basis `NOT-READ — <prose>` instead of the bare token); F2 the CARD_GATE arming note in `scripts/mail-wait.mjs` (CP-1 10/10 fail, "0 of 10 would pass", measured 2026-08-25) is FALSE for today's corpus — the amend v2 card passed the gate clean and this card failed on one cell — and misleads in the dangerous direction (says the gate is useless when it is discriminating).
2. Row `c2dec49b` at 2026-09-04T04:01:35Z — the window the owner opened this morning. GREEN; PR 489 OPEN / head `29a87d0e…` / two ground files / MERGEABLE-CLEAN; CI on full-40 hex: build (24.x) SUCCESS, rule26 + eval-canary SKIPPED and named. Three findings needing a repository change: (a) shared clone dirty on `docs/ground/authority-conformance.latest.md` (one `measuredAt` line, superseded by the PR's newer stamp; the S100-3 detached-HEAD form sidesteps it); (b) mail-wait prints `cadence=90s budget=40min` every tick — the budget CLAUDE.md §1 abolished; (c) the scout box is structurally unemptiable — `consumed_at` retired, watermark frozen at the 2026-08-23 CLOSED claim row, so 72 rows stay visible forever and "work until empty" has no terminal state for `scout`. It also self-reported four piped shell calls (§3) and stopped.

## THE DECISION: v3, ONE CELL, NO RE-REVIEW

The Architect does not route around a working refusal (S129 precedent): the artifact is made to conform. `CARD-LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-v3` differs from v2 in exactly four strings — the title version, the supersession paragraph, the fourth CLAIMS basis cell (now the bare token `NOT-READ`; its reason already stood in the `head` fence), and the tail anchor. No order, premise, fence, falsifier or decision right changed. It went to the foreman WITHOUT a third scout round: the edit is the scout's own correction adopted verbatim (D-4; same reasoning as AMENDMENT-1 of the one-live-card ruling), and this record is where that judgement can be disagreed with.

Dispatch: bus row `ba5f9caf`, to_lane AG-5, 2026-09-04T04:28:40Z, base64 transport, server `RETURNING sha256` = local sha256 `afe053baeee1f2f23dd7cec4fa72c11d301d55df63e7c2ce444fee9e1166f809`, 7775 octets — byte-equal, no drift. Supersession notice filed to the scout box in the same turn (row `c2f0fb7b`, per the general form of the standing rule from A-REC-S129-13).

## CARRIED FINDINGS (owed, named, not yet carded — S61-2)

- F-S130-ARMING-NOTE-STALE-1 — `mail-wait.mjs` CARD_GATE arming note carries a 2026-08-25 measurement as present-tense fact; re-measure over the current corpus and rewrite the reason clause. Producer card.
- F-S130-BUDGET-STRING-RETIRED-1 — the `budget=40min` header string prints a doctrine CLAUDE.md abolished. Producer card; trivially small.
- F-S130-SCOUT-BOX-UNEMPTIABLE-1 — a readable-never-claimable address has no watermark that moves and no consumed_at stamp it may write; "box empty" is unreachable. Design question for the Architect before any card: what IS the terminal state for a scout box?
- Shared-clone dirt on the conformance file — already carried from S129; still off the critical path.
- The mechanism gap the owner's screen exposed: a card filed to the scout at 21:08Z was answered at 21:14Z, but the Architect read the bus at 21:13:51Z and reported "no verdict". Correct at the instant, stale 37 seconds later; the owner then opened a second window that re-reviewed the same card. Not a defect of either window — a second independent GREEN is more evidence, not less — but a reminder that the Architect's "no verdict yet" is a timestamp, not a state.

## SEQUENCE FROM HERE (unchanged)

Foreman reads v3 → ORDER A0 lander confirm (expected author=AG-4 / lander=AG-5) → ORDER A (approval row, PR state, CI on full hex) → ORDER B fresh box read then --no-ff detached-HEAD merge, push master → ORDER C ls-remote read-back → ORDER D report `LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-AG-5`. Then master moves and #488 TRUNK-SYNC is the next card — with the open question from the bootstrap (does landing-TOOL-VISIBILITY-B-1-v2's commits-fence RULE reject a `Merge …` subject? measure against land.ts before cutting).
