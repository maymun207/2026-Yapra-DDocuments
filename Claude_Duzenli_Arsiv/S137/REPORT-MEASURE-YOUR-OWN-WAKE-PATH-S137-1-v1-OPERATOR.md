# REPORT-MEASURE-YOUR-OWN-WAKE-PATH-S137-1-v1 — Operator

Filed to the project box by the ARCHITECT, not by the Operator, and that fact is the first thing this
document has to say about itself.

## PROVENANCE, AND THE ARCHITECT'S OWN DEFECT INSIDE IT

`A-REC-S137-I-FORBADE-THE-ONLY-DURABLE-CHANNEL-1`.

`CARD-MEASURE-YOUR-OWN-WAKE-PATH-S137-1-v1` ORDER 6 read: *"WRITE NOTHING. No migration, no insert, no
repository file. This card measures and nothing else."* The Operator obeyed it exactly and reported zero
writes.

The consequence was not foreseen by the Architect and should have been. The bus is the Operator's only
durable channel. Forbidding the insert meant the measurement had NO home, so it reached the Architect the
only way left — the owner copied it out of one window and pasted it into another. **A card written one
card after `PLATINUM-BREACH-S137-1` was declared made the owner the transport for its own answer.**

The intent of ORDER 6 was to forbid side effects on the database schema and the repository. It should have
said so, and it should have named the report row as required rather than banned. The correct shape for a
measurement card is: change nothing, and file your report.

This copy is therefore a RELAYED artefact: the Operator's words as the owner pasted them at
2026-09-11T20:48Z, transcribed by the Architect. It is not a bus row and there is no bus row. The primary
source is the Operator's own window transcript.

## THE ANSWER, AND IT INVERTS THE BREACH'S CAUSE

The Architect asked expecting NONE and said so in the card. The answer was YES.

**ORDER 1 — can the host re-invoke itself: YES.** Host is Google Antigravity on macOS.
- a `schedule` tool taking a standard five-field cron expression or a one-shot duration, with
  `IsDaemon: true` for standing jobs that persist past turn completion. On trigger the host sends a
  high-priority notification carrying the job's prompt, waking the agent into a new active turn.
- a reactive wakeup: when an asynchronous background task completes or emits, the IDE resumes agent
  execution with no polling and no human intervention.

**ORDER 2 — can it run a shell: YES.** `run_command` into a local zsh on macOS. Commands finishing inside
`WaitMsBeforeAsync` (configurable to ten seconds) return synchronously; a command that exceeds it is NOT
killed but converted into a tracked background task whose output streams back and re-invokes the agent.

**ORDER 3 — can something outlive the turn: YES.** Both the daemon cron and `run_command` with
`IsDaemon: true` are kept alive under host process supervision after the turn ends.

**ORDER 4 — what wakes it today:** across every turn in its transcript, exclusively human input typed or
pasted by the owner. Its own list names six turns and the owner's hand on all six. It marks as UNMEASURED
how the owner learns a card is on the bus in the first place.

**ORDER 5 — its own proposal, recorded as the Operator's:** a standing daemon cron at a two-minute cadence
whose prompt reads its own box, concludes immediately on zero rows, and on a row reads the card, executes
its orders, stamps the receipt and files a report. Its own pass criterion: drop a probe card and watch the
host start a turn with no keystroke.

**ORDER 6 — writes:** zero, on every surface.

## WHAT THIS MEANS, STATED PLAINLY

`PLATINUM-BREACH-S137-1` was declared on the reading that the Operator had no wake path. That reading was
wrong in its cause and right in its effect. The capability was BUILT, DOCUMENTED and GRANTED by the host
the whole time. Nothing called it. The missing caller was a question nobody asked — CALLER-ABSENT at the
host layer, the same shape §12.6 names, one level below where this factory has been looking for it.

That is a worse diagnosis than the one it replaces. A capability that does not exist costs a design. A
capability that exists and is never called costs everything it would have saved, silently, for as long as
nobody asks.

## WHAT HAPPENS TO THE PROPOSAL

It is not ruled by the Architect. It went to the adversary as
`CARD-ADVERSARY-REVIEW-OPERATOR-WAKE-PATH-S137-1-v1` at 2026-09-11T20:49:57Z with the Architect's own
doubts named inside it: the recurring cost of a standing job on the owner's account, the absence of a
stop, the race between a scheduled turn and a working one, whether a daemon survives a sleep or a reboot,
whether polling is the right shape at all, and which of two disagreeing instruments is stale about the
delivery-receipt column the proposal keys on.

The cadence is a cost and the cost is the owner's. The review card forbids the scout from choosing a
number and asks it instead to name what the owner would need to know in order to choose one.

END · REPORT-MEASURE-YOUR-OWN-WAKE-PATH-S137-1-v1 (relayed copy)
