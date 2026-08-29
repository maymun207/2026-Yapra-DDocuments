# S124 · DISPATCH RECORD 2 — round 24's verdict, v4's construction, round 25 in flight

CUT 2026-08-29T04:55Z.

## 1 · ROUND 24 — RED, one blocking line, everything else agreed

`SCOUT-CARD-REVIEW-24-report`, row `852ad24e-87be-43d7-8799-eeb0fdbffbef`, 04:41:36Z. v2's identity
confirmed in all three units; **preflight on v2: GREEN, zero refused checks** (v3's CP-6 hit was
introduced by the re-cut). The one blocking defect: ORDER D has no disposition for `git add` ITSELF
being refused by the stale lock — the case that will actually happen; its existing fallback is
written for add-succeeded-then-commit-refused and prescribes an unstage of nothing. The scout's own
words: "GREEN THE MOMENT THAT ONE LINE IS IN."

The report opens with a confession that upgrades yesterday's finding: **the scout's own baseline loop
wrote every producer heartbeat in the table** (`mail-wait <addr> --once` beats for the address it
polls; `heartbeat(self)` carries no own-address guard — `writeLane` has one, `heartbeat` does not).
The 20260825153000 migration predicted the exact class: the nonce "is NOT a proof of identity,
because every lane nonce is world-readable via git ls-remote". The scout verified the public half —
ref shas byte-identical to `nonce_sha` for AG-1, AG-4, AG-5. `F-S124-HEARTBEAT-MEASURES-ANY-READER-1`
is therefore CONFIRMED at the mechanism level, with the missing guard named:
**`F-S124-HEARTBEAT-NO-OWN-ADDRESS-GUARD-1`, repository change, uncarded under P-6, GATE-1 pile.**
The AG-5-over-AG-4 liveness discriminator is dead for all readings after 04:24Z.

The scout also drained its entire backlog — rounds 2 through 21 answered in one three-second batch at
04:43:49–52Z, twenty uniform ~2.3KB closures. The box that measured 3.5 days of gate latency
yesterday measures near-zero today; the difference is one open window.

## 2 · v4 — BUILT, VERIFIED, IN THE CONFIRM ROUND

Built server-side from v2's bytes (row `df57e025…`) by EIGHT named substitutions in one statement:
round 24's blocking line (with the lock's measured identity and a DO-NOT-REMOVE), the worth-it
invariant sentence (counts ONE and TEN), the three→four probe fixes in CLAIMS and PREMISE, a
SUPERSEDED-MAIL section that de-races the box where v2 still sits (S102-YASA-2), the rewritten
supersedes fence — in all three units this time — and the exempt version stamps. v3's number is
spent and not reused.

```evidence:v4
round 25 row  01d9e93b-af30-4423-b40c-bd5f71be8862 · to_lane scout · 2026-08-29T04:52:26Z
candidate     CARD-ARCHIVE-PUSH-S123-2 · v4
              sha256 b3c58da6d557c1038cd68c9216088f26434d80da6ad041ffa75d85e3b254cba7
              14975 bytes · 14884 characters
verified      post-insert extraction: v4 stamp 1 · v2 stamp 0 · blocking paragraph 1 ·
              superseded-mail section 1 · claims-four 1 · fences 1 · tail anchor 1
```

Round 25 asks the scout to: reproduce v2's digests, account every changed line against the ledger,
run the preflight, and rule on the superseded-mail shape. On GREEN, v4 is extracted server-side from
the round-25 row under the digest above and dispatched to AG-4's box; the owner then types
"continue" into the standing-by producer window, whose confirmation is already in its context.

## 3 · ONE KNOWN RESIDUAL, DECLARED

v2's sentence "ABSENT IS A NAMED OUTCOME … for all three" survives unchanged in v4 while REQUIRES
names four probes — an unchanged v2 line, so not a silent edit, but a carried mismatch the confirm
round may fairly RED. If it does, the fix is one word and one more ledger entry.

TAIL ANCHOR: S124-DISPATCH-RECORD-2 ends here.
