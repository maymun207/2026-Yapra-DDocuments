CWF-S145-FINDINGS-v1

Each finding carries its fix and its date (owner standing rule).

- F-S145-VECTOR-REPAIR-DIFF-PROGRAM-CRASHED-1 — workflow vector-origin-repair.yml:335 `$A | getpath(.)` -> jq exit 5;
  repair impossible, silent-green possible. Found by the scout, reproduced by the Architect. FIX: amended at head
  990ca963 (bound path). CLOSES when PR 587 lands and vector-live-proof passes. WHEN: S146 first work.
- F-S145-VECTOR-REPAIR-QUOTED-DIFF-OUTPUT-1 — found by AG-4, not by scout or Architect: without `-r` every correct path
  read as an offender. FIX: `jq -rn`, pinned by a test. Same closure as above.
- F-S145-EMPTY-DIFF-ALSO-MEANS-TARGET-ABSENT-1 — scout: CHANGED=0 was read as "already repaired" even with the targets
  absent. FIX: census + STALE re-check at 990ca963.
- F-S145-TEXT-ONLY-TESTS-BLIND-TO-RUN-BODIES-1 — the workflow test passed 15/15 while the central program could not
  run. FIX: executing jq lens in the test (990ca963). General cure (other workflows): candidate card, S146 register.
- F-S145-LANE-CLAUDE-MD-STILL-ORDERS-A-POLLER-1 — CLAUDE.md:72-95, .claude/boot/producer.md:233-261,497,
  foreman.md:558-566, free.md:271 order a poll task; the ruling of S143 never reached them. FIX:
  CARD-LANE-NO-POLLER-S145-1-v1 (scout review queued, bus fde80e84); interim: boot text says "poll/cron KURMA".
  WHEN: land by 2026-09-21.
- F-S145-DOC-PUSH-REFUSED-BY-HARNESS-CLASSIFIER-1 — AG-4's doc-repo push refused [Out-of-Place Publication]. FIX: the
  owner's explicit permission in the AG-4 window (given 09:3x TSI, result unmeasured); permanent: the push notice
  carries the owner's standing permission line. WHEN: next push notice (S146).
- F-S145-BUS-GATE-REFUSES-UNHEADED-ROWS-TO-AG-1 — measured: relay_adversary_gate_check refuses any to_lane row to AG-n
  without a relay-audit header (AG001) and any kind=card without a seal (AG002). Not a defect; recorded so the next
  Architect writes the header first.
- F-S145-SCOUT-REPLY-INVISIBLE-UNTIL-SLIP-1 — carried shape of F-S144 (no consumed stamp): an unstarted scout and a
  working scout are identical on the bus. FIX: already in the register as the consumed_at / reply-surface item; no new card.
- F-S145-REGISTER-BUG-BUCKET-STALE-1 — REGISTER-BUG-BUCKET v57 not advanced since S141. FIX: v58 cut at S146 close
  (not done at S145 close; turn budget). WHEN: S146.

END · CWF-S145-FINDINGS-v1
