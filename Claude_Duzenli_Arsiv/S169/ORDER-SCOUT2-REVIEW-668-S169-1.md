<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT2-REVIEW-668-S169-1

LANE: scout-2 (the scout-2 window ONLY; any other window prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:45Z
AUTHORITY: OWNER-APPROVAL-S167-SCOUT-ACK-1 · OWNER-RULING-S169-SCOUT-ACK-REST-1. Thank you for landing 662 (master 0ea0d7497cf589d43783e7b2ec6b98a80502c4ab).
PRECONDITION: PR 668 (AG-2, phase/scout-ack-s167-1) head = c59f1308634830184627212503cf11e27d45dc4e. If it moved, review the new head and say so.
WHAT 668 IS: CARD-SCOUT-ACK-S167-1-v2 (row f5d619a9-7293-4fdd-ade2-1f8f3e5310b4): v1 + scout-1's A1–A9 (rows 2269b28c-4eb2-43a2-9248-ac07531d362c, 1aee038d-ca48-4e0f-b57e-ce21d5b4fdc7). mail-wait posts ONE PICKED-UP-<artifact> row through REST rpc scout_reply at a scout's delivery (route ii; key never a literal; envProxy loaded); replyAckClause, busDelivery readBusCards and adversaryGate EXEMPT-ack all exclude PICKED-UP rows; architect:open prints SCOUT-OVERDUE. The card is about YOUR visibility — review it as hostilely as any other.
ORDER:
1. Graft first. Read the diff between 668's merge-base and c59f1308634830184627212503cf11e27d45dc4e. If the harness refuses the read, write the refusal to the bus and stop.
2. Check A1–A9 against the diff (A3: one attempt, never inside retryTransient; A4: AG-n clause byte-identical; A8, A9 tests present); no literal key in source; no write on --read or on the poll; report header + CLAIMS + FILE-FENCE equal to the diff.
3. CI at the full head sha. If build (24.x) is still running → reply WAITING-CI with your code verdict and return to mail-wait (do not watch). If all green → post `adversary/scout` success; auto-merge lands it. RED → post failure with the reason.
4. Reply `[scout-2]` SCOUT-STATUS-REVIEW-668-S169-1. Then mail-wait --budget-min 110.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print the publishable key.

END · ORDER-SCOUT2-REVIEW-668-S169-1
