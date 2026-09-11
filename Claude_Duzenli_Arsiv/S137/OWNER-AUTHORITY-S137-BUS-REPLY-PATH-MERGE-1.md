# OWNER-AUTHORITY-S137-BUS-REPLY-PATH-MERGE-1

Given by the owner in chat, 2026-09-11, session S137. Recorded by the Architect at the moment it was
given, under `S112-YASA-1`.

## THE OWNER'S WORDS, VERBATIM

    OWNER-AUTHORITY-S137-BUS-REPLY-PATH-MERGE-1 — PR 537 birleşmiş ağaçta yeşilse AG-5 indirebilir.

## WHAT IT AUTHORISES

ONE landing of pull request 537 (`BUS-REPLY-PATH-1`, branch `phase/bus-reply-path-1-s136-1`) to master,
by AG-5, which did not author that branch.

The condition is in the owner's own sentence and is not the Architect's gloss: **the merged tree must be
green.** A green at the branch's own tip does not satisfy it. The branch was behind master when the
authority was given, so the tree a landing produces had never been run by the forge.

## WHAT IT DOES NOT AUTHORISE

- It does not override a red gate. This house has a precedent that governs:
  `OWNER-APPROVAL-S134-ENTITY-SCOPE-MERGE-1` was held UNSPENT against a red and AG-5 correctly refused to
  spend it. The same holds here.
- It does not authorise a second landing, nor any other pull request.
- It does not authorise applying the migration. Landing a migration file is not applying it; the
  Operator's card is separate and carries its own three-way proof.

## SPEND

None requested and none needed. `eval-canary` carries `if: false` under
`OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1`, so the master-push spend gate of §5 is retired while
the freeze holds and returns automatically on thaw. The owner asked what the freeze required of him; the
measured answer is nothing.

## HOW IT REACHED THE PRODUCER

Not directly. The adversary gate (`trg_relay_adversary_gate`, BEFORE INSERT on `public.relay_inbox`)
refuses a card addressed to a producer unless it carries a seal naming a scout verdict row whose OWN
printed digest matches the canonical body. So this authority is quoted verbatim inside
`CARD-LAND-BUS-REPLY-PATH-1-S137-1-v1`, and that card reached AG-5 only after the scout's bytes-pass.

The Architect declares no digest of its own; the binding number is the scout's.

## HOW IT WAS SPENT, MEASURED

master `432bb3ba0322aa0fa143c14683b2c18b9df4de4d` became
`0cae062c130b99a94df825f3481537b8251d23b2` — "Merge pull request #537" — at 2026-09-11T20:10:12Z.
The merged tree carried three green pull_request workflows (Build and Test, Relay corpus, report-schema)
with `eval-canary` a named job-level skip. The Operator applied the migration at 20:37:01Z after a first
attempt was refused for key order, and the Architect independently verified the ledger key, the widened
constraint, the armed gate and the new verb at 20:39:46Z.

END · OWNER-AUTHORITY-S137-BUS-REPLY-PATH-MERGE-1
