# S124 · DISPATCH RECORD 3 — round 26 GREEN, v5 in AG-4's box, the go-signal is the last moving part

CUT 2026-08-29T05:08Z.

## 1 · ROUND 26 — GREEN-FOR-DISPATCH, defended line by line

`SCOUT-CARD-REVIEW-26-report`, row `593d332a-2806-46bf-a02e-962e601eaae6`, 05:03:10Z — four minutes
after the round was cut. Preflight over the extracted v5: **all eleven checks OK** — the first green
candidate in the chain since v2. The digest check carried real weight this time: the scout had
computed v4's numbers from its OWN extraction in round 25, before my fence ever stated them, and the
two agree to the byte — the server-side construction is proven deterministic by two independent
derivations, not by one derivation trusted twice. Ledger audit clean: eleven changed hunks, six
claimed substitutions, everything maps. Premises re-verified minutes before the verdict, not carried.

## 2 · v5 DISPATCHED

```evidence:dispatch
row 34fa3ccf-b745-44e9-a4db-e471331f04e1 · to_lane AG-4 · CARD-ARCHIVE-PUSH-S123-2-v5
inserted 2026-08-29T05:05:37Z under a WHERE digest guard — the insert itself refuses to fire on a
byte mismatch — and read back from RETURNING:
  sha256 ea43ef62a17f650dda3304280acf192d5dec080232320c90c5158ddb2eb07b09
  15008 bytes · 14919 characters — identical to the reviewed candidate, by construction and by check
```

AG-4's box now holds v2 (superseded, named as such inside v5's SUPERSEDED MAIL section) and v5 (the
only live version). The producer window enters on the owner's go-signal, which carries the
highest-version rule in its own text — the interim de-race carrier round 26 accepted, with its
dependence honestly stated: it is a human step, and if the signal is sent without that sentence the
race is open again.

## 3 · TWO SCOUT OBSERVATIONS, RECORDED AS THE PATTERN THEY ARE

**`F-S124-FENCE-EROSION-UNDER-REWRITTEN-ENTRY-1`** — across three re-cuts, each supersedes-fence
rewrite quietly dropped a self-enforcement sentence, every drop licensed by the one ledger entry
broad enough to hide it ("this fence, rewritten"): v2→v4 dropped "nothing else in either line may
move"; v4→v5 dropped the silent-edit-is-a-RED sentence and the recover-and-account instruction. Not
blocking today — round 26 itself carried the instruction — but the ledger's teeth are being filed
down one re-cut at a time, and card fences have no erosion floor the way the constitution does.
GATE-1 pile, beside its siblings.

**The go-signal is a mechanism no gate can read.** The highest-version rule's carrier is a human
message; nothing in the tree can verify it was sent complete. Same class as the scout's round-1
finding (the unskippable pre-dispatch preflight hook), which today's chain has now argued for three
times over: v3 failed CP-6, v4 failed CP-1/CP-8, each in the section newly written for that re-cut,
and each caught only because a scout ran the check the author skipped.

## 4 · WHAT HAPPENS ON "CONTINUE"

The producer claims AG-4 by the confirmation already in its context, reads its box, acknowledges v2
as superseded-and-not-run, and executes v5: probes (REACH · CREDENTIAL · WRITE · COMMIT), push,
ls-remote read-back, report file, add+commit under the add-itself-refused disposition, bus report
either way. Every failure path leaves the tree as found. On its report:
`F-S124-ARCHIVE-CLOSE-COMMIT-UNPUSHED-1` closes at the ls-remote reading, and ARCHIVE-PUSH-S124-1
(the lock under lsof discipline + the S124 files) becomes the next and last card of the session.

TAIL ANCHOR: S124-DISPATCH-RECORD-3 ends here.
