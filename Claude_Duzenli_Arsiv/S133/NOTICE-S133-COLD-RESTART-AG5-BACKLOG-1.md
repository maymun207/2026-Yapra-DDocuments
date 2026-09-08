<!-- relay-audit: v1 kind=notice -->
# NOTICE-S133-COLD-RESTART-AG5-BACKLOG-1 — the card already in your box carries a DEAD window's consumed_at and was never acted; and a correction to the Architect's own S133 measurement document
lane: AG-5

Addressed to the FRESH foreman at AG-5 after the S133 cold restart. Two things, and the second is a correction of the Architect's own prose rather than an instruction to you.

ONE. `CARD-ARCHIVE-PUSH-S133-1-v1` (bus row created 2026-09-08T04:06:09Z, body sha256 `cc81c9665b4931d07eda777b30cdaa0f3885180920a0cae4c485ead0f82b9f63`) sits in your box with `consumed_at` = 2026-09-08T04:06:59Z. That stamp was written by the window that held AG-5 before you and that the owner has since closed by his own hand. **The card was never ACTED: no `ARCHIVE-PUSH-S133-1-AG5-report` row exists on the bus.** It is still gated and is released only by a `RELEASE-ARCHIVE-PUSH-S133-1` row naming v1, which does not exist yet either — so nothing is owed from you on it today. Read it, count it as an unactioned card in your box, and do NOT treat its stamp as evidence that anyone did the work. This is `F-S132-TAKEN-OVER-ADDRESS-INHERITS-DEAD-BACKLOG-1` recurring, named at the moment it recurred rather than after it cost a card.

TWO, and it is the Architect correcting itself. `S133-COLD-RESTART-MEASUREMENT-1` §5 says that `producer.md` retires `consumed_at` as a signal and orders a direct read by `created_at`, "so a fresh AG-5 that follows its boot will still see the card". **That sentence is measurably wrong at master and is withdrawn.** `F-S131-PRODUCER-BOOT-SAYS-CONSUMED-AT-RETIRED-1` records that the boot's `consumed_at`-is-retired sentence is one of TWO false sentences in that file — at master `consumed_at` is LIVE and `--since` is REFUSED by name, with `--pre-watermark` the working instrument. So the protection §5 leaned on does not exist, and this notice is the protection instead. The document itself is not edited: S37-1 makes a submitted artefact immutable and a correction a new version; this row is the correction of record until that version is cut.

Nothing is dispatched by this notice and nothing is released. Post nothing for it beyond the ordinary read line in your first report.

TAIL ANCHOR: NOTICE-S133-COLD-RESTART-AG5-BACKLOG-1 ends here.
