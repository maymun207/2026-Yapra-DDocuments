<!-- relay-audit: v1 kind=go -->
# GO-RELAY-AUDIT-GATE-1 · v1 — merge authorization for lane AG-3 · QUEUE POSITION 3

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| branch tip b9ca75d, +3 over base 1b7f8dd | READ: `git rev-list --count` in Architect session | inline |
| fence clean; zero migrations; exemption file lists the four Wave-3 reports by name | READ: diff list + `git show <branch>:docs/relay/RELAY-AUDIT-EXEMPT-HISTORY-v1.txt` greps | inline |
| auditor self-test fails `red=UNPROVEN` when any rule lacks a red sample | READ: `git show <branch>:scripts/relayAudit.ts` grep | inline |
| 3-pair intersection = ∅ except the two `.agents/` files (all pairs) | READ: `comm -12` over sorted diff lists | inline |
| full-suite verdict | NOT-READ | PR-head CI arbitrates (S37-2); STEP 1 reads it |

## STEP 0 — QUEUE (blocking)
You merge THIRD. Do NOT start STEP 2 until the owner relays AG-2's new
`origin/master` SHA. Until then you may complete STEP 1.

## STEP 1 — CI (blocking)
`GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=b9ca75d` — all runs
`completed`+`success`. `in_progress`/`null` is NOT a pass. Red = STOP, name the job.

## STEP 2 — MERGE TURN (S95-1, exactly this order)
1. `git fetch origin --prune`; confirm master == the SHA the owner relayed.
2. Rebase onto `origin/master`. Expected conflict: the two `.agents/` files
   (AG-1 and AG-2 appended before you). RESOLVE AS UNION — keep ALL sides,
   your lines LAST, delete nothing (F-S96-AGENTS-SEAM ruling). Any conflict
   outside those two files = STOP and report the file list.
   Also RE-CHECK after rebase: `docs/relay/PHASE-TOOL-BEHAVIOR-CENSUS-1B-report.md`
   and `docs/relay/PHASE-HARNESS-HONESTY-GATE-1-report.md` are now IN the tree
   (merged by lanes 1–2) — your gate must hold: headerless + listed in your
   exemption file ⇒ pass. Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts`
   in the rebased tree and paste its verdict in your tail report line. If it
   reddens on a sibling report, the exemption list is wrong — STOP and report;
   fixing it is a one-line list edit you make in the SAME rebase, named.
3. `npm run check:doc-drift` in the rebased tree.
   - Green → no seal; proceed.
   - Red FROM YOUR OWN FILES → S95-1 seal turn: read docVersion from
     `origin/master` live, take next, `npm run reseal` + bump SAME commit,
     drift must return green. REDRAW demand = STOP.
4. Merge `--no-ff` with the VERBATIM message below; push; keep the branch.

## VERBATIM MERGE MESSAGE
merge: PHASE-RELAY-AUDIT-GATE-1 — a claim either carries its reading or says it has none (BUG-016 auditor; history frozen at 74+4 by name; class closes by counter: 10 consecutive exemption-free relays)

## AFTER PUSH
One line back through the owner: new `origin/master` SHA (+ rev if pressed) +
the relayAuditGate vitest verdict from step 2. AG-4 merges after you, whenever
its lane completes.

TAIL-ANCHOR: `git rev-parse origin/master` — paste its output as your final line.

## FALSIFIER
Void if: CI not green on b9ca75d · a rebase conflict outside the two `.agents/`
files · relayAuditGate red in the rebased tree for any reason other than the
named one-line exemption fix · drift red after step 3 · any sibling `.agents/`
line lost in union resolution.

<!-- END · GO-RELAY-AUDIT-GATE-1-v1 -->
