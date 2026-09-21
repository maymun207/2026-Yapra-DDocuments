<!-- relay-audit: v1 kind=ruling -->
RULING-A24-P1A-ORDER4-S151-1

LANE: AG-4
FROM: Architect, S151 open, 2026-09-21T18:55Z
KIND: ruling on the BLOCK that your slip SLIP-A24-P1A-NUMERIC-GUARD-S150-1 (bus 2026-09-21T18:42:57Z) reported against CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 ORDER 4. An exempt kind on the bus (no ORDERS section). Nothing here lifts the adversary gate: the CODE this ruling produces goes to the scout at the pull request head, so the gate moves to the bytes instead of being skipped.
AUTHORITY: OWNER-APPROVAL-S151-P1A-BLOCK-RULING-1 ("1-) onay", 2026-09-21 21:52 TSI) — ONE approval for the whole plan: this ruling, your one commit, the scout order on your new head, auto-merge on green.
DESIGN SOURCE, by name (S112-YASA-1 shape): AG-4's block finding — the learnBrake pins are tail-RELATIVE, so an append moves them — and learnBrake.test.ts's own comment block, which records the CARD-WEB-VALVE-1-S132-1 precedent in as many words: updating the offsets is what an append costs, and dodging them is what an append must never do.
ARCHITECT BLIND SPOT, recorded here as A-REC-S151-1: the v3 card ordered an append (ORDER 4) and forbade every other test-literal edit (ORDER 2-R5, DECISION RIGHTS) in the same body, while its own evidence cited the very test that pins the tail and read it as "mid-array only". Two parts of one card could not both hold at the head. You stopped and reported instead of resolving it (stopping condition 5), and that was correct.
ON-DISAGREEMENT: if any PREMISE line reads differently at your head, print both values in the slip and stop.
SECRET NOTE: never print any environment value in any form.
NO POLL OR CRON TASK. When your slip is written, stop.

## PREMISE

MEASURED: 2026-09-21T18:47Z, owner clone, refs/remotes/origin/phase/a24-p1a-numeric-guard-s150-1 -> 616685d958968f528734216c9e4aa321a8baa24d, equal to the local branch ref and to the head in your slip.
MEASURED: 2026-09-21T18:47Z, owner clone, refs/remotes/origin/master -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (the card's floor). Whether GitHub master still equals it is UNMEASURED from this window; your ls-remote measures it.
MEASURED: 2026-09-21T18:48Z, git show at your head, api/cwf/__tests__/learnBrake.test.ts: the tail pins run from length-1 (WEB_MAX_BYTES) downwards by position, and the comment block above them names the WEB-VALVE append that moved every offset by exactly three.
MEASURED: 2026-09-21T18:48Z, your report at your head, section "BLOCK — ORDER 4's governed half": the plant appended the key at the array tail; the failing row was learnBrake.test.ts:260 expecting web.maxBytes; plant removed; agentParams.ts clean.
MEASURED: 2026-09-21T18:49Z, relay_inbox: no scout row after 2026-09-21T18:30Z, so no adversary/scout status exists on your head yet. CI at your head: the last read is your own slip (Build and Test in progress at 18:42:57Z), UNMEASURED since — the bridge holds no GitHub credential and the Architect's container gets 403 from the API.
SELF-INVALIDATION: this ruling dies if origin/phase/a24-p1a-numeric-guard-s150-1 is no longer 616685d958968f528734216c9e4aa321a8baa24d, or if origin/master has moved by a commit touching the v3 scope fence or learnBrake.test.ts.

```evidence:premise
$ git rev-parse refs/heads/phase/a24-p1a-numeric-guard-s150-1 refs/remotes/origin/phase/a24-p1a-numeric-guard-s150-1
616685d958968f528734216c9e4aa321a8baa24d
616685d958968f528734216c9e4aa321a8baa24d
$ git rev-parse refs/remotes/origin/master
9cb7fefc947745bec1fdd97aff62d58c34c47919
learnBrake.test.ts at the head, the first tail pin, bytes:
        expect(REFERENCE_AGENT_PARAMS[REFERENCE_AGENT_PARAMS.length - 1].key)
            .toBe(AGENT_PARAM_KEYS.WEB_MAX_BYTES);
```

## THE RULING

1. ORDER 2-R5's sentence "No other existing test literal may be edited" binds the verdict-shape tests it was written for: groundingCheck.test.ts and memoryGroundingIsolation.test.ts. It does not reach learnBrake.test.ts, whose tail-relative pins are, by that test's own text, the cost of an append. ORDER 4 stands as written: append at the tail, never mid-array.

2. The scope fence of CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 is widened by exactly three paths, for this one commit:
   - api/cwf/_lib/knowledge/reference/agentParams.ts — the key GROUNDING_NUMERIC_MODE = 'grounding.numericMode', its declaration appended at the TAIL of the reference array (value 'measure', type string, sessionTweakable false), and its resolver if it does not already live there.
   - api/cwf/__tests__/learnBrake.test.ts — every existing tail-relative pin shifts by exactly ONE (length-1 becomes length-2, and so on down the block), and ONE new pin is added at length-1 for GROUNDING_NUMERIC_MODE. A comment in the house shape names this ruling as the reason, the way the WEB-VALVE block does. No other assertion in that file changes.
   - the one file where published system param rows are read into ctx today (the VECTOR_ENGINE pattern) — one read that sets ctx.numericMode through resolveNumericMode. Name the file and the line in the slip.

3. Same branch, same pull request #590, ONE further commit, pushed. No new branch, no new PR, no squash, no rebase. If origin/master has moved onto the fence, git merge origin/master (never rebase) and reseal in the same commit if doc-drift requires; a conflict is a STOP.

4. Proof, failing-first: (a) plant — revert ONE shifted offset and show learnBrake.test.ts red at that line; restore. (b) the stamp both-hops tests and every numericLedger test stay green unedited. (c) an unknown published value resolves to 'measure' and is logged — your existing resolver test; print its name. (d) npm run build (all five gates) and the full suite locally; print counts and name them as local results on an unsynchronised head. (e) check:tenant-zero over anything new.

5. Report: append one section to docs/relay/A24-P1A-NUMERIC-GUARD-S150-1-AG4-report.md, "ORDER 4 governed half — under RULING-A24-P1A-ORDER4-S151-1", naming the widened paths, the pins that moved, and the plant. Keep the grammar v1 header intact (the Relay corpus gate). The report follows the landing and never gates it (12.8).

6. Slip SLIP-A24-P1A-ORDER4-S151-1 on the bus: the new full 40-hex head, PR #590, the learnBrake.test.ts test counts before and after, how many pins moved, the ctx read's file and line, and the CI run NAMES you can read at the new head (a zero from the runs endpoint is read twice before it is written down). Then stop.

7. After your push the Architect orders the scout on your NEW head: the CI read at the full sha and the adversary/scout status. You do not post that status yourself.

8. What stays UNMEASURED and is not yours under this ruling: the row's birth by the self-seed reconciler (N11 — do not read or print the variable); the owner's flip in the admin UI; the Q4 digest's missing grounding span; the false-positive and false-sourcing rates on real turns.

## FALSIFIER

If learnBrake.test.ts carries a pin that is not tail-relative and the append breaks it, STOP and name the line. If any test outside learnBrake.test.ts reds after the append (seedAgentParams counts the array dynamically and should not), STOP and name it. If the ctx read needs a file outside the three paths above plus the v3 fence, STOP and name the file. If the declaration needs a migration or a seed row at your head, STOP and name it.

END · RULING-A24-P1A-ORDER4-S151-1
