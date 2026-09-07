# ARCHITECT-CARD-TEMPLATE-v2 — the card shape the gate ACCEPTS, proven against the installed source at master 824fb29d927c6e8c1f59e55ceac49455f3374cb0

Written WHOLE (A-REC-S101-7). Supersedes the implicit S130 template that `scripts/cardPreflight.ts` refused on every block-9 card (F-S130-CARD-GATE-REFUSES-ARCHITECT-TEMPLATE-1). Bootstrap v131 FIRST JOB 1.

## HOW THIS WAS MEASURED, NOT REMEMBERED

The Architect's cloud container now runs the repo's OWN preflight: `scripts/cardPreflight.ts`, `scripts/relayAudit.ts`, `scripts/harnessSelfTest.ts` were staged from the owner's clone at HEAD `824fb29d927c6e8c1f59e55ceac49455f3374cb0` (sha256 of the three files, in that order: `eaed3a5f…`, `4f3cb6c2…`, `4c7f1b28…` — full values in S131-DISPATCH-RECORD-1) and run under `tsx@4` on Node in the container. `--self-test` printed `red=proven green=proven`. The owner's clone itself CANNOT run it over the bridge: its `node_modules/esbuild` is darwin-arm64 and the bridge VM is linux-arm64 (measured 2026-09-06T02:56Z). So the Architect's local preflight lives in the CLOUD container, fed by staged copies — and the copies must be re-staged whenever those three files move on master (their sha256 is the staleness lens).

Three S130 cards were re-run through the installed gate (2026-09-06T02:57Z). The refusals, by check, with the exact rule read from source:

| check | what the S130 template did | what the installed rule requires |
|---|---|---|
| CP-1 / R-CLAIM-ROW | CLAIMS basis cell `UNMEASURED — ORDER B` | basis is `MEASURED: <command>` (or `RELAYED: <artifact>`) or the literal `NOT-READ`, with the reason in the THIRD cell. Under `prov=1` never `READ:`. |
| CP-1 / R-TRIP-HEX | a 40-hex inside a ```scope fence | a 40-hex is legal ONLY in the CLAIMS table or inside `evidence:`/`diff` fences; a ```scope fence is prose to the auditor |
| CP-2 | a line like "two pushes, one commit" / "the 94 archive files" with no tag | any line matching `(two…ten|\d+) (cards|rows|items|reports|mints|copies)` must carry `MEASURED:`/`UNMEASURED` — OR the card carries a ```scope fence with `- ` members (one fence satisfies every such line) |
| CP-4 | `DECAYS on any write …` passed; `DECAYS <bare noun>` failed | `DECAYS` must be followed on the same line by `on`, `when`, `the moment` or `before` |
| CP-6 | `…-AG-4-report` in the report FILENAME and bus row name | a report filename is `…-AG4-report.md`; the regex refuses every `AG-4-report` literal anywhere in the body. Measured corpus at HEAD: `docs/relay/` holds 120 `-AGn-report.md` files against 4 `-AG-n-report.md` — the check follows the majority convention; the 4 hyphenated files (incl. the #490 report) are the drift, and it is the S130 template that produced it. Bus rows: 31 hyphenated / 25 not — the bus name follows the filename from here on. |
| CP-9 | `MEASURED: 2026-09-06T02:1xZ …` | the instant must match ISO-8601 — the Architect's `T02:1xZ` habit is NOT an instant. Write the full minute. |

## THE TEMPLATE (copy whole; every line below is load-bearing for a check)

```
<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-<STEM>-<n> · v<k> — <one-line purpose>
lane: AG-<n>
report: docs/relay/<STEM>-<n>-AG<n>-report.md
fanout: personalized

<prose: why this card exists, what it does NOT touch. No 7–39 hex anywhere; UUIDs only inside an UNANCHORED evidence fence.>

## PREMISE
- MEASURED: <ISO instant, e.g. 2026-09-06T02:54Z>, <instrument> — <what it read>. (at least one line)
- UNMEASURED: <what could not be read and why> (optional)
- ON-DISAGREEMENT: if your re-measure of <X> differs from the `<fence>` fence, STOP and report the value you read.
- DECAYS the moment <trigger>.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| <claim> | MEASURED: <command> | <fence-name> |
| <claim the lane will read> | NOT-READ | <reason — the third cell IS the reason> |

```evidence:<fence-name>
<full 40-hex or the raw transcript; anchored fences hold only full-length values>
```

## SCOPE
```scope
- <member one, no bare hex — name fences instead>
- <member two>
```

## ORDER A — …
## ORDER B — …

## FALSIFIER
<what makes this card wrong>

## SHARED SURFACES
<files/rows this card may touch, or "None">

## DECISION RIGHTS
<who decides what; "None" is legal>

BODIES: <rulings and laws by name>

```deliverables
<one line per deliverable>
```

TAIL ANCHOR: CARD-<STEM>-<n>-v<k> ends here.
```

## THE PROOF

`CARD-TRUNK-CI-VERDICTS-S130-1-v1` — the first S131 card — was written in this shape and run through the installed gate: first pass RED on CP-1/R-TRIP-HEX only (two 40-hex in the scope fence), corrected, second pass `GREEN — every check passed. The card may be inserted.` Its sha256 `7cf4fa5261e64887f9927f8c96e7a834a6eaaf9784b7d4b597aaf41c5c225cc7` was returned byte-identical by the bus INSERT (row minted 2026-09-06T03:01:13Z). The cards the lanes run from here on are gate-accepted, and `CARD_GATE=REPORT` can be re-armed to `REFUSE` on the next AG-4 card that touches mail-wait — that re-arm is ADF scope and waits on the freeze ruling.

## WHAT STAYS OPEN

- CP-6's model (filename ≠ address) is right by the corpus; the Architect's bus naming was the drift. From this template onward bus report rows are `…-AG<n>-report`. The 31 hyphenated rows already on the bus are history, not defects to rename (CP-6 basis: "No lane renames an existing landed file").
- Re-arming `CARD_GATE` (mail-wait.mjs line ~151) is one line, ADF scope, frozen — owner's lift, one AG-4 card.

TAIL ANCHOR: ARCHITECT-CARD-TEMPLATE-v2 ends here.
