# S129-DISPATCH-RECORD-5 — the second scout window's RED, the measurement it could not take, and v3

## TWO SCOUT WINDOWS, ONE CARD, TWO DIFFERENT VERDICTS

CARD-TOOL-VISIBILITY-B-1-v1 was reviewed independently by two scout windows.

  window one   2026-09-03T11:56:28Z   AMBER   the span-field-versus-context-Set ambiguity
  window two   2026-09-03T12:05:17Z   RED     GATE 2 is born barking

The second window's two AMBERs were the first window's two, arrived at independently. Its RED was
new, and v2 — already cut to answer window one — did not answer it. This is the three-windows-per-
card mitigation from A-REC-S122 working exactly as the owner ruled it should: the second window
found the defect that would have shipped.

## THE RED, AND WHY IT IS THE FINDING OF THE SESSION

GATE 2 as specified in v1 and v2 counted ACTIVE tools appearing in NO published category, and
ordered a badge "rendered whether it is zero or not". The scout measured that zero is UNREACHABLE
BY LAW: ADR-011 CATALOG-WRITE-LOCK-1 forbids any write-annotated tool from appearing in any
category array, held by a CI test that re-derives the write set from the real classifier. The
population is permanently non-empty.

Its consequence, in the scout's own framing: the four invisible tools would have moved the badge
from about forty-four to about forty-eight, and no checker reads that as an event. The project has
already ruled that a signal which barks on the majority case teaches its reader to ignore it and is
worse than no signal — the same rule the Architect ran into from the other side earlier this
session, when CP-2 barked on "the AG-1 row".

The Architect specified a badge that would have been ignored by design, while writing a card whose
entire purpose was that nobody tells the checker.

## THE MEASUREMENT THE SCOUT NAMED AND COULD NOT TAKE

The scout marked its own numbers UNMEASURED and said why: its SQL verb is fenced on the MCP surface
(guard-mcp BLOCKED GM-1, correctly), so the forty-four and the one-forty-one it quoted came from
SOURCE COMMENT PROSE, not from the database. It named the reading as required before the badge is
built and said it needed a principal it does not hold.

The Architect holds that principal and took the reading, at 2026-09-03T12:1xZ, in one grouped
select over `backend_tools` and the published `armes.tool_category` and `armes.tool_annotation`
rows:

  active armes tools in the mirror                                145
  distinct tool names across all published categories              98
  published armes.tool_annotation rows                            142

  ACTIVE and in NO published category                              47
      of which: published exposure = write                         44   <- the ADR-011 floor
                published exposure = read                           0
                NO published annotation at all                      3   <- THE ALARM

  getEmployeesByShiftAndDate    first_seen 2026-08-28 11:31:54+00
  getMaterialListByFactory      first_seen 2026-09-01 08:31:00+00
  getOrdersByDate               first_seen 2026-09-01 09:31:53+00

THE READING CORRECTS THE SCOUT'S OWN REMEDY, IN THE SCOUT'S FAVOUR. It proposed partitioning into
read-exposed-unclassified (the alarm) and write-exposed-unclassified (the floor). The read slice is
ZERO. The real alarm is the UNANNOTATED slice, and its members are exactly the three tools this
session left unpublished — exactly the population that caused the original fault.

The causal chain is measured, not argued: a tool with no published annotation CANNOT enter a
category, because the eval-gate's REFERENTIAL rule refuses the publish. That refusal happened in
this session, in the owner's own hands, with the message naming `getOrdersByDate`. The alarm bucket
read FOUR on the day the fault began and reads THREE now, because the DB half published one. It is
a number that moves when the fault moves — which is the whole property the badge needed and did not
have.

## v3

Cut whole, preflight GREEN eleven of eleven, and TRANSMITTED BY SPLICE under A-REC-S129-10's
standing fix: one hundred and thirty-three of its first two hundred and forty-three lines were
lifted from the v2 row's own array and never passed through the Architect at all. The assembled
prefix matched the file's own hash before the insert was committed.

Two transport faults were caught and repaired in the process, both by digest:

  the fence alignment  the anchor fence's CLOSING marker belongs to the population fence's
                       opening block in v3, and the first splice plan put it in the wrong
                       piece. Caught by a per-piece hash comparison, not by reading prose.
  one trailing byte    the final literal already carried its newline and an explicit empty
                       element was appended on top of it. Caught by octet_length, repaired by
                       trimming the array's last element in SQL.

Neither reached the scout. The void rows stay on the bus, named in a NOTICE row, because the bus is
append-only and RI003 refuses a delete.

A-REC-S129-12 — THE ARCHITECT SPECIFIED A SIGNAL THAT COULD NOT FIRE. The class is not carelessness
about the badge; it is that the Architect specified a COUNT without measuring the POPULATION it
counts. The number forty-seven was available in one query all along, and one query would have shown
that forty-four of it is a legal constant. This is the same class as A-REC-S129-9 and A-REC-S129-11:
reasoning about a quantity from its NAME instead of its VALUE. Third occurrence in one session, on
three different substrates — a field name, a length function, and a badge.

THE MECHANICAL MITIGATION, since the owner has ruled that the cure is mechanical and not moral: a
card that orders a COUNT onto a surface must carry that count's CURRENT VALUE and its FLOOR in the
premise, measured, before the card is dispatched. A badge with no measured opening value is a badge
nobody has seen.

## STATE AT THIS RECORD

- `SCOUT-CARD-REVIEW-TOOL-VISIBILITY-B-1-v3-FINAL` is in the scout box, digest verified against the
  archive file.
- AG-5 (foreman) holds its address, claimed 11:49:47Z by its own write. AG-4 holds `lane/AG-4`, box
  empty, heartbeat 11:53:04Z.
- No producer dispatched. No repository file written. `origin/master` last received a commit on
  2026-08-30.

TAIL ANCHOR: S129-DISPATCH-RECORD-5 ends here.
