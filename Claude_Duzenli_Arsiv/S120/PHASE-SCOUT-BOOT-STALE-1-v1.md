<!-- relay-audit: v1 kind=card prov=1 -->
# PHASE-SCOUT-BOOT-STALE-1-v1
fanout: personalized — one address, AG-2.

MEASURED-AT 2026-08-26T19:00:00Z. Read by the Architect from a fresh worktree at the current master, the live bus, and the live table constraint.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference. **ORDER A is built to overturn this card's own reading, and overturning it is a success, not a failure.**
SELF-INVALIDATION: this premise DECAYS on any edit to the boot files or to the roster and box-reader sources named below. Those files are the subject.

## PREMISE
- MEASURED:the scout window's own posted text @2026-08-26T18:55:00Z — it reports its box read at 15:34:50Z found no new card, and a card was addressed to that box at 15:48:38Z, fourteen minutes later. **No reply naming that card has appeared on the bus in the three hours since.**
- MEASURED:the remote branch list @2026-08-26T18:58:00Z — a card addressed to an AUTHOR box at 18:33:08Z already has its working branch pushed. That address picked up and started inside twenty minutes.
- MEASURED:the live table constraint @2026-08-26T18:58:00Z — the bus accepts exactly seven addresses and `scout` is one of them, so a card can always be ADDRESSED there.
- MEASURED:the box reader's own source at the master named in the trunk fence @2026-08-26T19:00:00Z — its shape guard now tests the WIDE pattern, and its own refusal text names a lowercase address as acceptable. Its comment records the narrow guard as a defect measured at S116 and describes the widening in the past tense.
- MEASURED:the roster source at that same master — it carries TWO patterns, a narrow claimable one and a wide box one, and its comment states plainly that the scout and operator addresses have boxes and are readable while never being claimable.
- MEASURED:the scout window's own boot file at that same master — it still prints the narrow call and then states, as a live fact, that the call is REFUSED with exit 2, citing a measurement dated three days before this session. **The sources say the channel was widened. The boot file still tells the window the channel is shut.**
- UNMEASURED — whether the call actually SUCCEEDS end to end today. The Architect read code and cannot run that command against the live bus. **A boot file is not corrected on a code reading alone**, and that is ORDER A.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this card was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the scout window last read its box before the card existed, and no reply naming that card has appeared since | MEASURED: the window's own posted read time · a live listing of that address's bus replies | stranded |
| the author address that received the re-cut work already pushed its working branch | MEASURED: git ls-remote showing the branch at origin | pickedup |
| the bus admits the scout address, so addressing a card there is well-formed | MEASURED: the live CHECK constraint on the table | admits |
| the box reader's shape guard now admits a lowercase address | MEASURED: the guard in the reader's source · the reader's own refusal text naming such an address as acceptable | widened |
| the scout boot file still states the call is refused | MEASURED: the boot file's own text at that master | stale |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
fb648bca8aba67cf8bab7a866b2bdf1b494dd7e9
```

```evidence:stranded
$ the scout window's own words, posted 15:36:32Z
"Direct read at 15:34:50Z - no new to_lane card ... Mode READY."
$ the card addressed to that box
SCOUT-RULESET-REACH-PROBE-1-v1   created 15:48:38Z   <- 14 min AFTER that read
$ replies on the bus from that address since
(none naming it, over three hours)
```

```evidence:pickedup
$ git ls-remote --heads origin | grep ruleset-reach
5bb9d17ed83e8b10ec81e68fbce2d796f5cc0f02  refs/heads/phase/ruleset-reach-probe-2
card addressed 18:33:08Z; branch pushed and visible by 18:58Z
```

```evidence:admits
$ the live CHECK on the bus table
CHECK (lane_addr = ANY (ARRAY['AG-1','AG-2','AG-3','AG-4','AG-5','operator','scout']))
```

```evidence:widened
$ scripts/laneRoster.mjs
export const LANE_ADDR = /^AG-[0-9]+$/;                       // claimable
export const BOX_ADDR  = /^(?:AG-[0-9]+|[a-z][a-z0-9_-]*)$/;  // has a box
$ scripts/mail-wait.mjs
if (!BOX_ADDR.test(args.lane)) {
    return usage(`"${args.lane}" is not shaped like a bus address (AG-<n>, or a lowercase name like scout)`);
}
```

```evidence:stale
$ .claude/boot/free.md
    node scripts/mail-wait.mjs scout --once
**MEASURED 2026-08-23, and true as this lands: that call is REFUSED.**
    [mail-wait] REFUSED: "scout" is not shaped like a claimable lane address (AG-<n>)
    exit 2
```

## WHY THIS CARD EXISTS
The Architect sent a read-only reconnaissance card to the window built for read-only reconnaissance. It was never taken. The Architect then re-cut the same work to an AUTHOR address — which took it in seventeen minutes and is doing it now.

**That remedy treated the symptom and it cost something.** An author lane is doing recon it is not shaped for, and it opened another branch into a backlog this session is actively draining. The owner named the mismatch before the Architect did.

> The cause was reported as "that window is episodic." **That was wrong, and it was a guess wearing the clothes of an explanation.** The measured cause is a boot file carrying a three-day-old measurement as a present-tense fact, after the thing it measured was repaired.

This is the same defect class this project keeps paying for: a document that was TRUE WHEN WRITTEN, went stale, and kept being obeyed. The window is not idle by temperament. **It is obeying a file that tells it the door is locked, and the door was unlocked at S116.**

## ORDER A — MEASURE THE DOOR BEFORE REWRITING THE SIGN
Run the box-read call for the scout address yourself and report EXACTLY what happens — the full output, the exit code, and whether the stranded card named above comes back.

**Three outcomes and all three are acceptable reports:**
- It SUCCEEDS → the boot file is stale and ORDER B applies.
- It REFUSES → **the boot file is right and this card's premise is wrong.** Say so plainly and stop at ORDER D; the Architect read code and drew a conclusion, and code reading loses to a live run.
- It answers with NEITHER → that is the third value; quote it exactly.

**Do not edit the boot file before this measurement.** Rewriting a warning on the strength of a code reading is how a correct warning gets deleted.

## ORDER B — CORRECT THE BOOT FILE, ONLY IF ORDER A SUCCEEDED
Replace the stale claim with what you measured, and **carry its history rather than erasing it**: the refusal was real, it was measured, it was repaired, and the file should say when. A boot file that silently drops a warning teaches the next reader nothing; one that records the repair teaches them the shape of the failure.

Changing a boot file's contract is the ARCHITECT's decision and it is hereby given for this one correction. **The wording is yours; the decision to correct is not a question.**

## ORDER C — THE CENSUS: WHAT ELSE IS A BOOT FILE ASSERTING AS PRESENT-TENSE?
Search every boot file for other claims stated as live facts that rest on a dated measurement. **Two independent lenses at minimum** — a search for measurement-dated phrasing and a search for refusal or failure claims look different ways.

For each hit, say whether the claim is STILL TRUE at the current master or has gone stale. **Name each with file and line, and say plainly if the scout one is the only stale claim.** That answer is entirely acceptable and it would mean the defect is isolated rather than systemic.

## ORDER D — THE STRANDED CARDS
The stale boot has a cost that is still sitting on the bus. Report every card addressed to a non-author box for which NO reply naming it has ever appeared on the bus from that address — oldest first, with its age. **Derive this from the replies themselves, never from the delivery-receipt column: that column is dead and this repo's own card gate refuses any reasoning that leans on it.** **Do not consume, answer, or act on any of them** — they are not addressed to you. This is a census of what the closed door held back.

## ORDER E — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a hang — report its exact text rather than routing around it. The refusal text is the measurement this entire card is built from.

## FALSIFIER
1. If the boot file is edited before ORDER A has produced a live measurement, the card FAILED.
2. If ORDER A reports a success or refusal without quoting the actual output and exit code, the card FAILED.
3. If ORDER C rests on a single lens, the card FAILED.
4. If any card addressed to another box is consumed or answered, the card FAILED.
5. If the corrected boot text erases the history of the refusal instead of recording its repair, the card FAILED.

## SHARED SURFACES
Only `.claude/boot/free.md` may be written, and only after ORDER A. The roster source, the box reader and every other boot file are READ-ONLY. Nothing is written to the database beyond your own address's ordinary state writes. No branch is landed, amended, rebased or force-pushed.

## DECISION RIGHTS
Correcting this boot file's contract is the ARCHITECT's and the decision is given above. Whether the underlying channel works is not anyone's decision — it is a measurement, and ORDER A outranks every sentence in this card including its premise.

## DELIVERY
Branch `phase/scout-boot-stale-1`. Push it, open the pull request, and report at `docs/relay/PHASE-SCOUT-BOOT-STALE-1-AG2-report.md`. Plus the record files the repo's own gates COMPEL, named in your report.
