# S132-DISPATCH-RECORD-5 — the second adversary cycle: MA-RERUN v5 FAIL → v6; WEB-VALVE v3 PASS-WITH-AMENDMENTS → v4; PR 514 landed; AG-4 stopped ticking at a gate

Recorded by the Architect, 2026-09-07T21:40Z (00:40 TSİ, 8 Sept). Every timestamp below is a bus `created_at` or a `factory_state` column read by the Architect; nothing is relayed from a lane's prose unless labelled so.

## 1 · WHAT MOVED ON THE BUS (12:03Z → 21:35Z)

| when (UTC) | row | direction | what it is |
|---|---|---|---|
| 12:03:09 | CARD-MA-RERUN-3-S132-1-v5 | → AG-4 | gated on RELEASE naming v5 |
| 12:04:52 | LAND-MA-RERUN-RUNNER-S132-1-AG5-report | ← AG-5 | PR 514 landed by the foreman under OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1: branch found, two paths exact, three runs green, eval-canary and rule26 SKIPPED and named; `ma-rerun.yml` in the workflow registry; `gh pr list --state open → []` |
| 12:05:26 | CARD-ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-v1 | → scout | review of v5 |
| 12:21:37 | ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report | ← scout | **FAIL** — the stderr artifact publishes `[EntityResolve]` entity surfaces from organic turns; "no workflow change" forbade the fix; `--all` is not an analyser flag; the falsifier's cutoff wording contradicted `chooseCutoff`. AMENDMENTS 1–6 |
| 12:33:26 | CARD-WEB-VALVE-1-S132-1-v3 | → AG-4 | AMENDMENTS 1–11 verbatim, AMENDMENT 10 scope ACCEPTED; consumed 12:35:08 and held at ORDER A.1 (correct) |
| 12:35:28 | CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v3 | → scout | review of v3 |
| 12:41:05 | ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v3 | ← scout | **PASS-WITH-AMENDMENTS** — first PASS of this card's life. Eleven amendments EQUAL character for character (372/298/199/240/223/189/490/307/384/541; 11 carried in the FALSIFIER). Containment under AMENDMENT 7 holds three ways (caller passes a non-nullable `string[]`; an empty array is truthy; the passed set is MCP-only by the function's own comment). AMENDMENTS 12–15 |
| 12:45:23 | CARD-MA-RERUN-3-S132-1-v6 | → AG-4 | AMENDMENTS 1–6 verbatim; workflow edited on `phase/ma-rerun-3-s132-1-v6`; dispatch at the branch ref; gated on RELEASE naming v6. **Unconsumed at 21:35Z** (see §3) |
| 21:13:37 | CARD-ADVERSARY-REVIEW-MA-RERUN-3-v6-S132-1-v1 | → scout | review of v6 (interrupted at 12:5xZ, inserted here); sha 7c1e8bf1… equal |
| 21:30:55 | CARD-WEB-VALVE-1-S132-1-v4 | → AG-4 | AMENDMENTS 12–15 verbatim; ORDER B.6 rewritten, B.6b added; gated on RELEASE naming v4; v3 VOID; sha cb25c6b6… equal |
| 21:35:09 | CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v4 | → scout | review of v4; attacks the Architect's own rendering (both-absent rule, meta shape, render site of the outcome name, the fourth test); sha f25297b3… equal |

Master after PR 514, as the scout read it at 12:41Z (relayed): past PR 514, five WEB-VALVE instrument blobs unchanged. Not re-measured by the Architect.

## 2 · WHAT THE ADVERSARY CAUGHT THIS CYCLE, by class

- **Data publication (v5 FAIL).** A CI artifact would have carried raw stderr with entity surfaces from organic turns. Class: the card said "no workflow change" and thereby forbade the only fix. Finding: **F-S132-STDERR-ARTIFACT-PUBLISHES-ENTITY-SURFACES-1** — a raw stream is never an artifact; only a prefix-filtered file is, and the filtered prefixes themselves are read for values before they are allowed (v6 review ORDER B.3).
- **Silent arming (v3 amendment 12).** The obvious implementation of "local tools push a ToolResultMeta" — reusing `parseToolResultMeta` — would have armed three existing grounding checks for the first time on every local-tool turn, with no line of those checks changing and no test to notice. The Architect's v3 wrote "it must not" with no mechanism behind it; the scout measured the arming rules at :248/:358/:382 and supplied the mechanism (toolName-only meta).
- **Signal fatigue (v3 amendment 14).** AMENDMENT 7's containment — correct — would fire on the MAJORITY of lawful valved turns once the valve opens, because the offered set is MCP-only by construction. A signal that fires on lawful traffic teaches its reader to ignore it. One outcome name fixes it; the Architect had not seen it.
- **Severity (v3 amendment 13).** A text heuristic must not join `empty_as_zero` as a critical kind.
- **Missing test (v3 amendment 15).** No test in the tree pins what the three local mounts push; `ledgerCompleteLocalTools.test.ts` only seeds `toolResultMetas: []`.

Tally over the whole S132 adversary mechanism so far: v1 SSRF redirect hole, v1 SSOT reservation against MCP names, v2 false premise (recorded stage-07 figure), v5 data leak, v3 silent arming + signal fatigue. Five defect classes the Architect's cards carried and the producer would have built. The mechanism is paying for itself on every card.

## 3 · AG-4 STOPPED TICKING AT THE GATE — measured, then witnessed

- `factory_state` AG-4: state WORKING, heartbeat **12:44:33Z**, then silent. `CARD-MA-RERUN-3-S132-1-v6` (12:45:23Z) unconsumed at 21:35Z — 8 h 50 min in the box of a lane that consumed v3 within two minutes.
- Owner's screen (witness, 21:2xZ): the AG-4 window's last tick is `2026-09-07 12:44:07 UTC`, "Both cards held at ORDER A.1 pending their named release rows. Box empty, nothing to act on." — then the turn ENDED and the window sat idle at the prompt. The window is OPEN and alive; it is not polling.
- Reading: a producer that holds at a gate ends its turn instead of continuing its tick loop, so a RELEASE row — the very thing the gate waits for — can never be seen without a human keystroke. This is a PLATINUM breach by construction (a machine-doable wait moved to the owner's hand), and it is the gating mechanism's own defect, not AG-4's: the HOLD/RELEASE design (A-REC-S132-5's cure) assumed the lane keeps ticking. **F-S132-PRODUCER-TICK-LOOP-ENDS-AT-GATE-1**; PLATINUM-BREACH-S132-2 (the nudge the owner is asked for below). Scout: its v6 review card has sat 25 min without a verdict where the two earlier verdicts took 6 and 16 min — same class suspected, unwitnessed.
- Cure (mechanical, carded next): the producer and scout boots keep a bounded tick loop while ANY held card sits in the box (the gate is a wait state, not a terminal state), and the tick line prints the held card names and the RELEASE name it waits for. Home: `.claude/boot/producer.md` and `.claude/boot/free.md`; owner approval for the boot edit as usual.
- Not a cure: the owner typing into the window. It is recorded here because it is what unblocks tonight.

## 4 · OTHER FINDINGS

- **F-S132-PR-515-CLOSED-BY-SHARED-CREDENTIAL-1** (scout B.4, relayed): PR #515 (WEB-VALVE-1) CLOSED unmerged 11:25:36Z by login maymun207 — the credential every lane and the owner push under; WHO is unmeasurable from the API. The branch survives. v4 ORDER A.1b reopens or re-creates on the same branch. Standing question for the credential-by-capability template item: per-lane identities would have answered this in one read.
- **F-S132-GRAMMAR-READS-SECTION-LABELS-AS-COUNTS-1**: CP-1's R-TRIP-COUNT reads "ORDER B.6 tests" as the counted noun "6 tests". Two cards were reworded to satisfy it. Not a bug in the grammar's intent; a bug in how a section reference is written near a plural noun. Noted for the template.
- **Archive bridge**: `rm` of `.git/HEAD.lock` / `maintenance.lock` / `tmp_obj_*` is now refused ("Operation not permitted") on the bridge; the commit at 2842fee succeeded regardless. If a future commit fails on `HEAD.lock exists`, the delete-permission request is the path, not a workaround.

## 5 · STATE AT THIS RECORD

- AG-5 foreman: alive (heartbeat 21:34:46Z), idle, box empty. Owes nothing.
- AG-4: two gated cards in the box (MA-RERUN v6 12:45Z; WEB-VALVE v4 21:30Z), not polling — see §3.
- scout: two review cards in the box (v6 review 21:13Z; WEB-VALVE v4 review 21:35Z), no verdict yet on either.
- Archive: commit 2842fee, 13 ahead of origin/main; push order still owed to the next AG-5 card, fenced by path+ancestry.
- Next Architect actions in order: read the two scout verdicts → RELEASE rows (or v7/v5) → landing cards for both PRs with owner named approvals → producer/scout tick-loop cure card → DISPATCH-RECORD-6.

TAIL ANCHOR: S132-DISPATCH-RECORD-5 ends here.
