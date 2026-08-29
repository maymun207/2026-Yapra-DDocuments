# S124 · DISPATCH RECORD 1 — scout round 23, and the card it carries

CUT 2026-08-29T04:20Z. This is the record of one bus insert. **It is not the card.** Where the card's
bytes actually live, and why they are not in this folder yet, is §4 — read that before assuming.

---

## 1 · WHAT WAS DISPATCHED

```evidence:dispatch
row      5e6f37a1-f461-473a-87d7-b67523fe11e7
         direction to_lane · lane_addr scout · artifact SCOUT-CARD-REVIEW-23-v1
         created_at 2026-08-29T04:10:47Z · 23158 bytes
carries  CARD-ARCHIVE-PUSH-S123-2 · v3, between <<<CANDIDATE-BEGIN>>> and <<<CANDIDATE-END>>>
         sha256 bed46ae0b9ff55fe26fd5f38928e2dad3b70f3337b570e8693feb0f097fada92 over 18684 bytes
built    from CARD-ARCHIVE-PUSH-S123-2-v2, bus row df57e025-6bed-4be8-89d5-73b2b4640eb4
         sha256 371146084f5114674f3eb1cfe38f8b8d64699e1e2ac056c2482ea9c518efb062 over 12789 bytes
```

## 2 · HOW IT WAS BUILT, AND THE GUARD THAT PROVED IT

`v3` was **built server-side from `v2`'s reviewed bytes by ten named substitutions in a single SQL
statement**. It was never written beside `v2` and then compared to it. The reviewed bytes and the
bytes that would be dispatched are one object by construction rather than by comparison — the
strongest form `v124` §4 describes.

**The construction was verified after the insert, not merely intended before it.** The candidate was
extracted back out of the inserted row by its markers and re-digested:

```evidence:guard
extracted length  18684
extracted sha256  bed46ae0b9ff55fe26fd5f38928e2dad3b70f3337b570e8693feb0f097fada92
guard_matches     true
```

Two independent arithmetic controls were run over the constructed body and both came out right for a
reason that had to be worked out rather than assumed: `AG4` occurrences fell from four to two, because
only THREE of `v2`'s four were the `-S123-2-` report name this card renames — the fourth is
`ARCHIVE-PUSH-S123-1-AG4-report`, a correct historical reference to the previous push, and it stays.

## 3 · WHAT THE SCOUT WAS ASKED FOR

Receipts by server-issued row id; `npx tsx scripts/cardPreflight.ts --check` over the candidate, with
the whole output pasted; a line-by-line audit of the `evidence:supersedes` ledger against a recovered
`v2`, where a changed line mapping to nothing is a RED; and a direct challenge to the three things
most likely to be wrong — ORDER E's `ps` probe, which the Architect believes **cannot** discriminate a
git process against one working copy from any other and said so in the card; whether ORDER F reads as
an instruction to keep retrying a refusal; and whether the report's `AG-5` name records the true
author when the commit is the Architect's and the previous push was `AG-4`'s.

## 4 · WHERE THE CARD'S BYTES ARE, STATED PLAINLY

**The full text of `SCOUT-CARD-REVIEW-23-v1` and of `CARD-ARCHIVE-PUSH-S123-2 · v3` is NOT in this
archive folder and this record does not pretend otherwise.** It is in `public.relay_inbox`, which is
append-only and immutable by design, at the row id in §1, and it is recoverable exactly:

```evidence:recovery
select body from public.relay_inbox where id = '5e6f37a1-f461-473a-87d7-b67523fe11e7';
the candidate alone:
select split_part(split_part(body, '<<<CANDIDATE-BEGIN>>>' || chr(10), 2),
                  chr(10) || '<<<CANDIDATE-END>>>', 1)
  from public.relay_inbox where id = '5e6f37a1-f461-473a-87d7-b67523fe11e7';
verify with: encode(sha256(convert_to(<that text>,'UTF8')),'hex') against the digests in §1
```

**Why it is not a file here:** moving 23158 bytes out of the database and into this folder has to pass
through the Architect's own context, and a card that has been retyped is no longer the card that was
digested. The digest is what makes the copy provable, so the copy is deferred to an actor that can
make it without retyping — the scout, which extracts the candidate to a file to run the preflight, or
the lane, which will file its report beside it. **Until one of them does, the bus row is the only
copy, and this record is the pointer to it.**

---

TAIL ANCHOR: S124-DISPATCH-RECORD-1 ends here.
