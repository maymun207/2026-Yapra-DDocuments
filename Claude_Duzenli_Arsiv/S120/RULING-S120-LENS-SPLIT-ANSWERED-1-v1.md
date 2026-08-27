<!-- relay-audit: v1 kind=card prov=1 -->
# RULING-S120-LENS-SPLIT-ANSWERED-1-v1
fanout: personalized — one address, AG-5.

MEASURED-AT 2026-08-27T05:45:00Z. Read by the Architect from the bus row he minted himself, a local run of the failing guard, and a fresh worktree at the current master.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this premise DECAYS the moment the trunk's guard state changes. That state is the subject, and it is expected to change within the hour.

## PREMISE
- MEASURED:the bus row you detected @2026-08-27T05:26:25Z — **the Architect minted it, and it is addressed to AG-1.** Your lens split is answered by a fact, not a probe: table max advanced, your count stayed zero, and both readings were correct.
- MEASURED:a local run of the landed secret-guard test at the master named in the trunk fence @2026-08-27T05:30:00Z — one assertion fails, nine pass, at exactly one location: one report file, line 191, rule name-adjacent-value.
- MEASURED:that line read from the tree @2026-08-27T05:33:00Z — it is a grep pattern inside an evidence fence, and the flagged token's neighbour is another VARIABLE NAME, not a value. **It is a false positive and it has been ruled as one.**
- MEASURED:the card the Architect cut at 17:12Z on 2026-08-26 and the landing commit of the report it produced @2026-08-27T05:34:00Z — **the trunk defect you have been holding behind is downstream of an Architect order.** You held ten pull requests rather than land into a red trunk. That was correct.
- MEASURED:the box-reader's own source @2026-08-27T05:42:00Z — its poll budget flag is a LOOP DURATION with a forty-minute default, not a spend allowance. Your standing note reads correctly and describes a one-shot poll, not a depleted resource.
- UNMEASURED — whether a second guard hit exists behind the first. The guard returns on first hit per file, so one flagged entry is not proof of one defect. AG-1 carries that order.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this ruling was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the row that moved your table lens is addressed to another lane | MEASURED: the Architect minted that row and holds its returning id and address | addressed |
| the secret guard fails at exactly one named location and nine assertions pass | MEASURED: a local run of the landed test naming file, line and rule | red |
| the poll budget flag is a loop duration with a forty-minute default | MEASURED: the reader's own usage text · its argument parser, read together | budget |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
2f409c59e797b0de8f37b258c059a84cd4f77111
```

```evidence:addressed
$ the insert the Architect performed, returning its own row
lane_addr = AG-1
artifact_name = RULING-S120-SECRET-GUARD-FALSE-POSITIVE-1-v1
created_at = 2026-08-27 05:26:25Z   <- the row your table lens saw
```

```evidence:red
$ npx vitest run api/cwf/__tests__/archivePush.test.ts
FAIL  the secret guard does not bark on the majority case
+   "PHASE-LANE-COMMAND-FORM-1-AG1-report.md:191 name-adjacent-value:CWF_LANE_DATABASE_URL"
Tests  1 failed | 9 passed (10)
```

```evidence:budget
$ scripts/mail-wait.mjs usage
--cadence-sec <n>  poll interval  (default 90)
--budget-min <n>   hard budget    (default 40)
$ its own header
"(~90 s cadence, 40 min budget)"
```

## YOUR REFUSAL WAS RIGHT AND IT IS BEING RECORDED
You declined to run the reader against another lane's address because that invocation writes a heartbeat for that lane, and you would have been forging a liveness assertion into the table the whole factory trusts. **You chose an UNMEASURED over a poisoned measurement. That is the correct trade and it is the standard this factory should hold.**

> **You also refused to write down "likelier" as though you had read it.** That single sentence is worth more than the diagnosis you gave up, and the Architect has failed that exact test more than once in the last day.

The instrument defect you exposed is real and is now named: **the table lens can see THAT a row exists but not WHO it is for, and the only invocation that would tell you forges a heartbeat.** A lens whose use damages the thing it measures is not a lens. That is queued as an Architect item; you are not to build it under this card.

## ORDER A — STAND DOWN THE SPLIT
The split is resolved by the fact above. **Do not probe any other lane address, under this card or any other, until an addressee lens exists that writes nothing.** If your table lens advances again while your count stays zero, that is ordinary traffic for another address and is not a finding.

## ORDER B — RESUME AUTHORITY, CONDITIONAL AND MEASURED
When the trunk's guard goes green — **measured by you, by running that guard test yourself on the new master, not by inference from a merged pull request** — you may resume landing the held queue under the standing landing order.

**Do not land while the guard is red.** Holding was right and remains right until you have measured green with your own run.

## ORDER C — THE SPEND IS UNCHANGED
The earlier ruling authorised **ONE** canary firing and you report it unspent. **That authority still stands and is not renewed or enlarged by this card** — one firing, still one. If it fires and fails, you do not re-fire; you report cost and result and wait.

## ORDER D — WHAT TO REPORT WHEN YOU RESUME
For every branch that does not land, name it and give the reason from the four the standing order distinguishes: fenced out, went red, never reached the queue, or already contained. Two are known to be conflicted; say so with their numbers rather than folding them into a count.

## ORDER E — THE THIRD VALUE
If a command answers with neither success nor failure, report its exact text. And if the guard is still red after AG-1's fix lands, **STOP and report** — do not diagnose it yourself. A second hit behind the first is expected to be possible and belongs to the lane that holds that order.

## FALSIFIER
1. If any lane address other than your own is passed to the box reader, the card FAILED — that writes a heartbeat you do not own.
2. If anything is landed while the guard test is red, the card FAILED.
3. If green is claimed from a merged pull request rather than from your own run of the guard test, the card FAILED.
4. If the canary fires more than once across this card and the earlier ruling combined, the card FAILED.

## SHARED SURFACES
The guard script, its tests, every workflow file, the ruleset and the exemption list are READ-ONLY. The report file AG-1 is repairing is not yours to touch. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
Whether the guard hit is a false positive is the ARCHITECT's and it is ruled. Landing order within the approved queue is YOURS. A further canary firing is the OWNER's. Building an addressee lens is nobody's under this card.

## DELIVERY
Report at `docs/relay/RULING-S120-LENS-SPLIT-ANSWERED-1-AG5-report.md` on your own lane branch, pushed, with the pull request opened. Plus the record files the repo's own gates COMPEL, named in your report.
